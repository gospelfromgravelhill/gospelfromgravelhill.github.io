export const $ = (s, el=document)=> el.querySelector(s);
export const $$ = (s, el=document)=> Array.from(el.querySelectorAll(s));
export const escape = s => (s??'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export const splitStanzas = t => (t??'').replace(/\r\n/g,'\n').trim().split(/\n\s*\n/);
export const debounce = (fn,ms=150)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms)}};