import {normalize, STOP} from './utils.js';

/** Build an inverted index with field weights to reduce false positives. */
export function buildIndex(rows){
  const fieldWeight = { number:5, title:3, author:2, tune:2, meter:1, scripture:1, topics:1, lyrics:1 };
  const inv = new Map(); // token -> Map(docId -> scoreContribution)
  const haystack = new Map(); // docId -> normalized full text (for phrase checks)
  for (const r of rows){
    const tokensByField = new Map();
    const addTokens = (field, text) => {
      if (!text) return;
      const toks = tokenize(text);
      tokensByField.set(field, toks);
      for (const t of toks){
        if (!t || STOP.has(t)) continue;
        if (!inv.has(t)) inv.set(t, new Map());
        const m = inv.get(t);
        m.set(r.id, (m.get(r.id)||0) + (fieldWeight[field]||1));
      }
    };
    addTokens('number', r.number);
    addTokens('title', r.title);
    addTokens('author', r.author);
    addTokens('tune', r.tune);
    addTokens('meter', r.meter);
    addTokens('scripture', r.scripture);
    addTokens('topics', Array.isArray(r.topics) ? r.topics.join(' ') : r.topics);
    addTokens('lyrics', r.lyrics);

    haystack.set(r.id, normalize([r.number, r.title, r.author, r.tune, r.meter, r.scripture, Array.isArray(r.topics)? r.topics.join(' '):r.topics, r.lyrics].filter(Boolean).join('\n')));
  }
  return {inv, haystack};
}

export function search(index, rows, query){
  const {tokens, phrases, numberExact} = parseQuery(query);
  if (!tokens.length && !phrases.length && !numberExact) return rows;

  // AND semantics: start with intersection for tokens
  let cand = null;
  for (const t of tokens){
    const posting = index.inv.get(t);
    if (!posting) { cand = new Map(); break; } // no docs contain this token
    const docs = posting;
    if (cand === null){
      cand = new Map(docs); // copy
    } else {
      const next = new Map();
      for (const [id,score] of cand){
        if (docs.has(id)) next.set(id, score + docs.get(id));
      }
      cand = next;
    }
  }
  // If no tokens provided, seed with all docs
  if (cand === null) cand = new Map(rows.map(r=> [r.id, 0]));

  // Phrase filter
  if (phrases.length){
    const filtered = new Map();
    outer: for (const [id,score] of cand){
      const hay = index.haystack.get(id) || '';
      for (const p of phrases){
        if (!hay.includes(p)) continue outer;
      }
      filtered.set(id, score + 10*phrases.length);
    }
    cand = filtered;
  }

  // Number exact boost
  if (numberExact){
    for (const [id,score] of cand){
      const r = rowsById(rows).get(id);
      if (r?.number && normalize(r.number)===numberExact) cand.set(id, score + 25);
    }
  }

  const ranked = [...cand.entries()]
    .sort((a,b)=> b[1]-a[1] || (a[0]>b[0]?1:-1))
    .map(([id])=> rows.find(r=> r.id===id))
    .filter(Boolean);

  return ranked;
}

function rowsById(rows){
  const m = new Map();
  for (const r of rows) m.set(r.id, r);
  return m;
}

function tokenize(text){
  return normalize(text).replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(Boolean);
}

function parseQuery(q){
  const s = normalize(q||'');
  const phrases = [];
  const phraseRe = /"([^"]+)"/g;
  let m; let rest = s;
  while ((m = phraseRe.exec(s))){
    phrases.push(m[1]);
  }
  rest = s.replace(phraseRe, ' ').trim();
  const tokens = tokenize(rest).filter(t=> !STOP.has(t));
  const numberExact = /^\d+$/.test(rest) ? rest : null;
  return {tokens, phrases, numberExact};
}
