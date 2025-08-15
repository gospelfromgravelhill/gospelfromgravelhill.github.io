import {Router} from './router.js';
import {html, escapeHTML, splitStanzas, $, $$} from './utils.js';
import {buildIndex, search} from './search.js';

const state = {
  config: null,
  datasets: [],
  currentDatasetIndex: 0,
  rows: [],
  index: null,
  baseUrl: '',
};

function normalizeRow(row, map){
  const resolve = (spec) => {
    if (!spec) return null;
    if (typeof spec === 'string'){
      const parts = spec.split('.'); let v = row; for (const p of parts) v = v?.[p];
      return v ?? null;
    }
    if (typeof spec === 'object' && spec.joinArrays){
      const arrFields = Array.isArray(spec.joinArrays) ? spec.joinArrays : [];
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
  const toArray = (v) => Array.isArray(v) ? v : (v ? [v] : []);
  return {
    id: (resolve(map.id) ?? resolve(map.number) ?? resolve(map.title) ?? crypto.randomUUID()).toString(),
    number: resolve(map.number)?.toString() || '',
    title: resolve(map.title) || '',
    lyrics: resolve(map.lyrics) || '',
    author: resolve(map.author) || '',
    tune: resolve(map.tune) || resolve(map.tuneName) || '',
    meter: resolve(map.meter) || '',
    scripture: resolve(map.scripture) || '',
    topics: toArray(resolve(map.topics) ?? []),
    _raw: row
  };
}

async function loadConfig(){
  const res = await fetch('config.json'); state.config = await res.json();
  state.baseUrl = state.config.baseUrl || '';
  state.datasets = state.config.datasets || [];
  renderDatasetPicker();
}

function renderDatasetPicker(){
  const sel = $('#datasetSelect');
  sel.innerHTML = state.datasets.map((d,i)=> html`<option value="${i}">${escapeHTML(d.name)}</option>`).join('');
  sel.value = String(state.currentDatasetIndex);
  sel.addEventListener('change', ()=>{
    state.currentDatasetIndex = parseInt(sel.value,10);
    hydrate();
  });
}

async function hydrate(){
  const ds = state.datasets[state.currentDatasetIndex];
  $('#sourceLink').href = ds.path;
  const res = await fetch(ds.path); const data = await res.json();
  const arr = Array.isArray(data) ? data : (data.hymns || data.items || data.rows || []);
  state.rows = arr.map(r=> normalizeRow(r, ds.mapping||{}));
  state.index = buildIndex(state.rows);
  drawList(state.rows);
  router.handle(); // apply route on dataset switch
}

function drawList(rows){
  const ul = $('#results');
  ul.innerHTML = rows.map(r=> html`
    <li data-id="${escapeHTML(r.id)}">
      <span class="hymn-no">${escapeHTML(r.number || '—')}</span>
      <a href="#/hymn/${state.currentDatasetIndex}/${encodeURIComponent(r.id)}" class="hymn-title">${escapeHTML(r.title || '(Untitled)')}</a>
    </li>
  `).join('');
  $('#resultStats').textContent = rows.length ? `${rows.length} hymns` : 'No hymns';
}

function renderDetail(h){
  $('#hymnTitle').textContent = (h.number ? h.number + '. ' : '') + (h.title || '(Untitled)');
  const metaBits = [];
  if (h.author) metaBits.push('Author: ' + escapeHTML(h.author));
  if (h.tune) metaBits.push('Tune: ' + escapeHTML(h.tune));
  if (h.meter) metaBits.push('Meter: ' + escapeHTML(h.meter));
  if (h.scripture) metaBits.push('Scripture: ' + escapeHTML(h.scripture));
  $('#hymnMeta').innerHTML = metaBits.join(' • ');

  const raw = h._raw || {};
  const verses = Array.isArray(raw.verses) ? raw.verses : null;
  const chorus = Array.isArray(raw.chorus) && raw.chorus.length ? raw.chorus : null;
  const addChorus = Array.isArray(raw.addedChorus) && raw.addedChorus.length ? raw.addedChorus : null;

  const hasStructured = Array.isArray(verses);
  const container = $('#hymnLyrics');
  container.innerHTML = '';

  if (hasStructured){
    verses.forEach((stanza, i)=>{
      const p = document.createElement('p'); p.className = 'stanza';
      const strong = document.createElement('strong'); strong.className='stanza-number'; strong.textContent = (i+1)+'.';
      p.appendChild(strong);
      const stanzaHtml = escapeHTML(stanza.join('\n')).replace(/\n/g,'<br>');
      const span = document.createElement('span'); span.innerHTML = ' ' + stanzaHtml;
      p.appendChild(span);
      container.appendChild(p);

      if (chorus){
        const c = document.createElement('div'); c.className='chorus';
        c.innerHTML = '<span class="label">Chorus</span>' + escapeHTML(chorus.join('\n')).replace(/\n/g,'<br>');
        container.appendChild(c);
      }
      if (addChorus){
        const c2 = document.createElement('div'); c2.className='chorus';
        c2.innerHTML = '<span class="label">Refrain</span>' + escapeHTML(addChorus.join('\n')).replace(/\n/g,'<br>');
        container.appendChild(c2);
      }
    });
  } else {
    const stanzas = splitStanzas(h.lyrics || '');
    container.innerHTML = stanzas.map((s,i)=> html`
      <p class="stanza"><strong class="stanza-number">${i+1}.</strong> ${escapeHTML(s).replace(/\n/g,'<br>')}</p>
    `).join('');
  }
}

function showList(){
  $('#detailView').classList.add('hidden');
  $('#listView').classList.remove('hidden');
  history.replaceState(null, '', '#');
}
function showDetail(id, push=true){
  const h = state.rows.find(r=> r.id===id);
  if (!h) { showList(); return; }
  renderDetail(h);
  $('#listView').classList.add('hidden');
  $('#detailView').classList.remove('hidden');
  if (push) location.hash = `#/hymn/${state.currentDatasetIndex}/${encodeURIComponent(id)}`;
}

function setupSearch(){
  const input = $('#q');
  const clearBtn = $('#clearBtn');
  const run = ()=>{
    const q = input.value.trim();
    if (!q){
      drawList(state.rows);
      $('#resultStats').textContent = `${state.rows.length} hymns`;
      return;
    }
    const results = search(state.index, state.rows, q);
    drawList(results);
    $('#resultStats').textContent = `${results.length} results for “${q}”`;
  };
  input.addEventListener('input', run);
  clearBtn.addEventListener('click', ()=>{ input.value=''; run(); input.focus(); });
}

function setupDetailButtons(){
  $('#backBtn').addEventListener('click', showList);
  $('#copyBtn').addEventListener('click', async ()=>{
    const title = $('#hymnTitle').textContent;
    const text = title + '\n\n' + $('#hymnLyrics').innerText;
    try{ await navigator.clipboard.writeText(text); alert('Copied hymn to clipboard.'); }
    catch{ alert('Copy failed. Select text and copy manually.'); }
  });
  $('#printBtn').addEventListener('click', ()=> window.print());
}

const router = new Router();
router.onRoute = (parts)=>{
  if (parts[0]==='hymn' && parts.length>=3){
    const ds = parseInt(parts[1],10);
    const id = decodeURIComponent(parts[2]);
    if (!Number.isNaN(ds) && ds !== state.currentDatasetIndex){
      state.currentDatasetIndex = Math.max(0, Math.min(ds, state.datasets.length-1));
      $('#datasetSelect').value = String(state.currentDatasetIndex);
      hydrate().then(()=> showDetail(id, false));
      return;
    }
    showDetail(id, false);
  } else {
    showList();
  }
};

(async function init(){
  await loadConfig();
  await hydrate();
  setupSearch();
  setupDetailButtons();
  router.start();
})();
