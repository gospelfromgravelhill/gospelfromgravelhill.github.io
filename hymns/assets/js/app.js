import { $, $$, escape, splitStanzas, debounce } from './utils.js';

const state = { cfg:null, ds:[], rows:[], index:[], cur:0 };

function normalizeRow(row, map){
  const resolve = (spec) => {
    if (!spec) return null;
    if (typeof spec === 'string'){
      const parts = spec.split('.'); let v=row; for(const p of parts){ v=v?.[p]; }
      return v ?? null;
    }
    if (typeof spec === 'object' && spec.joinArrays){
      const arrFields = Array.isArray(spec.joinArrays)? spec.joinArrays : [];
      const sep = typeof spec.separator==='string'? spec.separator : '\n';
      const labels = spec.labels || {};
      const blocks = [];
      for (const key of arrFields){
        const block = row?.[key];
        if (Array.isArray(block)){
          if (block.length && Array.isArray(block[0])){
            for (const stanza of block){ blocks.push(stanza.join('\n')); }
          } else {
            const label = labels[key]; if (label) blocks.push(label);
            blocks.push(block.join('\n'));
          }
        }
      }
      return blocks.join('\n\n').trim();
    }
    return null;
  };
  const toArray = v => Array.isArray(v) ? v : (v? [v] : []);
  return {
    id: (resolve(map.id) ?? resolve(map.number) ?? resolve(map.title) ?? (Math.random().toString(36).slice(2))).toString(),
    number: (resolve(map.number)?.toString()) || '',
    title: resolve(map.title) || '',
    lyrics: resolve(map.lyrics) || '',
    author: resolve(map.author) || '',
    tune: resolve(map.tune) || resolve(map.tuneName) || '',
    meter: resolve(map.meter) || '',
    scripture: resolve(map.scripture) || '',
    topics: toArray(resolve(map.topics) ?? [])
  };
}

function buildIndex(rows){
  return rows.map(r => ({
    id:r.id, hay:[r.number,r.title,r.author,r.tune,r.meter,r.scripture,(Array.isArray(r.topics)?r.topics.join(' '):r.topics)||'', r.lyrics].join(' \n ').toLowerCase()
  }));
}
function searchIndex(index, q){
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if(!terms.length) return [];
  return index.map(it=>{
    let score=0;
    for(const t of terms){ if(it.hay.includes(t)) score++; }
    return {...it, score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,500).map(x=>x.id);
}

async function load(){
  const res = await fetch('config.json'); state.cfg = await res.json();
  state.ds = state.cfg.datasets || [];
  const sel = $('#datasetSelect');
  sel.innerHTML = state.ds.map((d,i)=>`<option value="${i}">${escape(d.name)}</option>`).join('');
  sel.value = '0';
  sel.addEventListener('change', ()=>{ state.cur = parseInt(sel.value,10) || 0; hydrate(); });
  await hydrate();
  setupSearch();
}

async function hydrate(){
  const ds = state.ds[state.cur];
  const res = await fetch(ds.path); const data = await res.json();
  const arr = Array.isArray(data) ? data : (data.hymns || data.items || data.rows || []);
  state.rows = arr.map(r=> normalizeRow(r, ds.mapping||{}));
  state.index = buildIndex(state.rows);
  drawList(state.rows);
}

function drawList(rows){
  const ul = $('#results');
  ul.innerHTML = rows.map(r=> `<li><a href="#/hymn/${state.cur}/${encodeURIComponent(r.id)}">${escape(r.number||'—')} ${escape(r.title||'(Untitled)')}</a></li>`).join('');
  ul.onclick = (e)=>{
    const a = e.target.closest('a'); if(!a) return;
    e.preventDefault();
    const id = decodeURIComponent(a.getAttribute('href').split('/').pop());
    showDetail(id);
  };
}

function showDetail(id){
  const h = state.rows.find(x=> x.id===id);
  if(!h) return;
  $('#list').hidden = true; $('#detail').hidden = false;
  $('#hymnTitle').textContent = (h.number? h.number+'. ' : '') + (h.title||'(Untitled)');
  const metas = [];
  if(h.author) metas.push('Author: '+escape(h.author));
  if(h.tune) metas.push('Tune: '+escape(h.tune));
  if(h.meter) metas.push('Meter: '+escape(h.meter));
  if(h.scripture) metas.push('Scripture: '+escape(h.scripture));
  $('#meta').innerHTML = metas.join(' • ');
  const stanzas = splitStanzas(h.lyrics||'');
  $('#lyrics').innerHTML = stanzas.map((s,i)=> (i+1)+'. '+escape(s)).join('\n\n');
}

function setupSearch(){
  const q = $('#q');
  const run = ()=>{
    const val = q.value.trim();
    if(!val){ drawList(state.rows); return; }
    const ids = searchIndex(state.index, val);
    drawList(ids.map(id=> state.rows.find(r=> r.id===id)).filter(Boolean));
  };
  q.addEventListener('input', debounce(run, 120));
  $('#backBtn').onclick = ()=>{ $('#detail').hidden = true; $('#list').hidden = false; };
  $('#copyBtn').onclick = async ()=>{
    const title = $('#hymnTitle').textContent;
    const txt = title + "\n\n" + $('#lyrics').innerText;
    try { await navigator.clipboard.writeText(txt); alert('Copied.'); } catch(e){ alert('Copy failed.'); }
  };
  $('#printBtn').onclick = ()=> window.print();
}

load();
