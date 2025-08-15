export const $ = (sel, el=document)=> el.querySelector(sel);
export const $$ = (sel, el=document)=> Array.from(el.querySelectorAll(sel));
export const html = (strings, ...values) => strings.map((s,i)=>s+(values[i]??"")).join("");
export const escapeHTML = (s='') => s.toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');

export const normalize = (s='') => s.toString()
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .toLowerCase();

export const splitStanzas = (lyrics='') => {
  const t = lyrics.replace(/\r\n/g,'\n').trim();
  return t.length ? t.split(/\n\s*\n/) : [];
};

export const STOP = new Set(["the","a","an","and","or","to","of","in","on","for","with","at","by","is","it","be","as","we","i","you","he","she","they","them","our","us","me","my","your","his","her","their"]);
