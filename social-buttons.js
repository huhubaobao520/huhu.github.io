// social-buttons.js
const tpl = document.createElement('template');
tpl.innerHTML = `
  <style>
    :host{display:inline-block}
    .social{display:flex;gap:var(--gap,12px);align-items:center;flex-wrap:wrap}
    .btn{
      width:var(--size,44px);height:var(--size,44px);border-radius:50%;
      display:inline-grid;place-items:center;text-decoration:none;color:var(--icon-color,#666);
      background:linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.03));
      box-shadow:0 2px 6px rgba(16,24,40,0.06);position:relative;outline:none;border:0;
      transition:transform 180ms cubic-bezier(.2,.9,.2,1),box-shadow 180ms;
    }
    .btn:hover,.btn:focus,.btn.active{transform:translateY(-4px) scale(1.06);box-shadow:0 6px 18px rgba(16,24,40,0.12)}
    .btn svg{width:20px;height:20px;display:block}
    .btn::after{
      content:attr(data-tooltip);position:absolute;left:50%;transform:translate(-50%,8px) scale(.96);
      white-space:nowrap;background:var(--tooltip-bg,#111);color:var(--tooltip-color,#fff);
      padding:6px 10px;border-radius:6px;font-size:13px;box-shadow:0 6px 18px rgba(8,12,20,0.12);
      opacity:0;pointer-events:none;transition:opacity 180ms,transform 180ms;bottom:calc(100% + 10px);z-index:10;
    }
    .btn::before{content:"";position:absolute;left:50%;transform:translateX(-50%);bottom:calc(100% + 4px);
      width:10px;height:10px;background:var(--tooltip-bg,#111);transform-origin:center;rotate:45deg;border-radius:1px;opacity:0;transition:opacity 180ms;z-index:9}
    .btn:hover::after,.btn:focus::after,.btn.active::after{opacity:1;transform:translate(-50%,-2px) scale(1)}
    .btn:hover::before,.btn:focus::before,.btn.active::before{opacity:1}

    /* brand colors (can be overridden by page CSS via ::part if needed) */
    .github{color:#fff;background:linear-gradient(180deg,#24292e,#111)}
    .facebook{color:#1877F2;background:linear-gradient(180deg,rgba(24,119,242,0.06),transparent)}
    .youtube{color:#FF0000;background:linear-gradient(180deg,rgba(255,0,0,0.06),transparent)}
    .tiktok{color:#000;background:linear-gradient(180deg,rgba(0,0,0,0.04),transparent)}
    .bilibili{color:#00A1D6;background:linear-gradient(180deg,rgba(0,161,214,0.06),transparent)}
    .kuaishou{color:#FF6A00;background:linear-gradient(180deg,rgba(255,106,0,0.06),transparent)}
    .x{color:#0f0f0f;background:linear-gradient(180deg,rgba(15,15,15,0.05),transparent)}
    @media (max-width:420px){
      .btn::after{font-size:12px;padding:5px 8px;bottom:auto;top:calc(100% + 10px);transform:translate(-50%,-8px) scale(.96)}
      .btn::before{bottom:auto;top:calc(100% + 4px)}
    }
  </style>
  <div class="social" part="social"></div>
`;

class SocialButtons extends HTMLElement {
  static get observedAttributes(){ return ['links','hide']; }
  constructor(){ super(); this._shadow = this.attachShadow({mode:'open'}); this._shadow.appendChild(tpl.content.cloneNode(true)); this._container = this._shadow.querySelector('.social'); }
  connectedCallback(){ this._render(); this._bind(); }
  attributeChangedCallback(){ this._render(); }

  _defaults(){
    return {
      github: 'https://github.com/',
      x: 'https://x.com/',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
      tiktok: 'https://www.tiktok.com/',
      bilibili: 'https://b23.tv/9SoR6Rq/',
      kuaishou: 'https://v.kuaishou.com/7a4nPUZ3/'
    };
  }

  _parseLinks(){
    const attr = this.getAttribute('links');
    if (!attr) return this._defaults();
    try {
      const parsed = JSON.parse(attr);
      return Object.assign(this._defaults(), parsed);
    } catch(e){
      console.warn('social-buttons: invalid JSON in links attribute', e);
      return this._defaults();
    }
  }

  _parseLinks(){
    const attr = this.getAttribute('links');
    if (!attr) return this._defaults();
    try {
      const parsed = JSON.parse(attr);
      return Object.assign(this._defaults(), parsed);
    } catch(e){
      console.warn('social-buttons: invalid JSON in links attribute', e);
      return this._defaults();
    }
  }

  _parseHide(){
    const h = this.getAttribute('hide') || '';
    return h.split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
  }

  _items(){
    return [
      {key:'github', tooltip:'GitHub — 仓库', cls:'github', svg: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.77 5.46.77 11.72c0 4.9 3.16 9.07 7.56 10.53.55.1.75-.24.75-.53 0-.26-.01-1-.02-1.95-3.08.67-3.73-1.49-3.73-1.49-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.08-.66.08-.66 1.1.08 1.68 1.13 1.68 1.13.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.46-.28-5.05-1.23-5.05-5.47 0-1.21.43-2.2 1.14-2.97-.12-.28-.5-1.4.11-2.92 0 0 .93-.3 3.06 1.14a10.6 10.6 0 012.79-.38c.95.01 1.9.13 2.79.38 2.12-1.44 3.05-1.14 3.05-1.14.62 1.52.24 2.64.12 2.92.71.77 1.14 1.76 1.14 2.97 0 4.25-2.6 5.19-5.07 5.46.39.34.74 1.01.74 2.04 0 1.48-.01 2.67-.01 3.03 0 .29.19.64.76.53 4.4-1.46 7.56-5.63 7.56-10.53C23.23 5.46 18.27.5 12 .5z"/></svg>`},
      {key:'x', tooltip:'X — 关注我', cls:'x', svg:`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 4.5L19.5 19.5"></path><path d="M19.5 4.5L4.5 19.5"></path></svg>`},
      {key:'facebook', tooltip:'Facebook — 关注/联系', cls:'facebook', svg:`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.5 3.3-3.5.95 0 1.95.17 1.95.17v2.15h-1.1c-1.08 0-1.42.68-1.42 1.38v1.65h2.42l-.39 2.9h-2.03v7A10 10 0 0022 12z"/></svg>`},
      {key:'youtube', tooltip:'YouTube — 订阅', cls:'youtube', svg:`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 7.2s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1-2.9-.2-7.25-.2-7.25-.2s-4.35 0-7.25.2c-.45.05-1.35.1-2.1 1C.7 5.5.5 7.2.5 7.2S.25 9 .25 10.8v.4C.25 13.6.5 15.3.5 15.3s.2 1.7.8 2.4c.8.9 1.9.9 2.4 1 1.75.13 7.05.2 7.05.2s4.35-.01 7.25-.2c.45-.05 1.3-.1 2.1-1 .6-.7.8-2.4.8-2.4s.25-1.7.25-3.5v-.4c0-1.8-.25-3.6-.25-3.6zM9.75 15.02V8.98l6.2 3.02-6.2 3.02z"/></svg>`},
      {key:'tiktok', tooltip:'TikTok — 关注', cls:'tiktok', svg:`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 7.5v6.6a3.9 3.9 0 11-2-3.5V6h3zM8 17.5a2.5 2.5 0 102.5-2.5V8.7h2V6.2a5.5 5.5 0 11-4.5 11.3z"/></svg>`},
      {key:'bilibili', tooltip:'哔哩哔哩 — 观看', cls:'bilibili', svg:`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="2.5" y="6" width="19" height="10" rx="2" ry="2" /><rect x="8.2" y="9.2" width="2.6" height="2.6" rx="0.4" fill="#fff" opacity="0.9"/><rect x="13.2" y="9.2" width="2.6" height="2.6" rx="0.4" fill="#fff" opacity="0.9"/><circle cx="8" cy="6.2" r="0.6" fill="#fff" /><circle cx="16" cy="6.2" r="0.6" fill="#fff" /></svg>`},
      {key:'kuaishou', tooltip:'快手 — 关注/作品', cls:'kuaishou', svg:`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 6a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm7 1.5V17a2 2 0 01-2 2H7a2 2 0 01-2-2V7.5A1.5 1.5 0 016.5 6h11A1.5 1.5 0 0119 7.5zM9 15.5a3 3 0 100-6 3 3 0 000 6z"/></svg>`}
    ];
  }

  _render(){
    const links = this._parseLinks();
    const hide = this._parseHide();
    this._container.innerHTML = '';
    this._items().forEach(item => {
      if (hide.includes(item.key)) return;
      const a = document.createElement('a');
      a.className = `btn ${item.cls}`;
      a.setAttribute('data-tooltip', item.tooltip);
      a.setAttribute('aria-label', item.tooltip);
      a.href = links[item.key] || '#';
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = item.svg;
      this._container.appendChild(a);
    });
   

  _bind(){
    // touch-friendly toggle in shadow root
    this._container.addEventListener('click', (e) => {
      const btn = e.composedPath().find(n => n && n.classList && n.classList.contains('btn'));
      if (!btn) return;
      if ('ontouchstart' in window) {
        if (!btn.classList.contains('active')) {
          e.preventDefault();
          this._container.querySelectorAll('.btn.active').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          setTimeout(()=>btn.classList.remove('active'),3000);
        } // second tap will follow link
      }
    });

    // allow keyboard ESC to remove active
    this._container.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') this._container.querySelectorAll('.btn.active').forEach(b=>b.classList.remove('active'));
    });
  }
}

customElements.define('social-buttons', SocialButtons);