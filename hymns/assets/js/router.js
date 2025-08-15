export class Router {
  constructor(){ addEventListener('hashchange', ()=> this.handle()); }
  start(){ this.handle(); }
  parse(){
    const h = location.hash.slice(1);
    return h.split('/').filter(Boolean);
  }
  handle(){
    const parts = this.parse();
    this.onRoute && this.onRoute(parts);
  }
}
