// js/ui.js - UI behaviors (vanilla JS)

// Backdrop-filter support detection
(function detectBackdrop() {
  const supports = CSS && (CSS.supports('backdrop-filter: blur(1px)') || CSS.supports('-webkit-backdrop-filter: blur(1px)'));
  if (!supports) document.documentElement.classList.add('no-backdrop');
})();

// Sticky header elevation on scroll
(function headerElevation() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let elevated = false;
  const onScroll = () => {
    const shouldElevate = window.scrollY > 8;
    if (shouldElevate !== elevated) {
      elevated = shouldElevate;
      header.classList.toggle('elevated', elevated);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile navigation toggle
(function mobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav]');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
  });
})();

// Set copyright year
(function year() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// Ticker animation using requestAnimationFrame
export function startTicker(trackEl, { speed = 40 } = {}) {
  if (!trackEl) return () => {};
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return () => {};

  let rafId = 0; let x = 0; let running = true; let lastTs = 0;
  const step = (ts) => {
    if (!running) return;
    const dt = lastTs ? (ts - lastTs) / 1000 : 0; // seconds
    lastTs = ts;
    x -= speed * dt; // px per second
    trackEl.style.transform = `translateX(${x}px)`;
    const first = trackEl.firstElementChild;
    if (first) {
      const w = first.getBoundingClientRect().width + 32; // include gap
      if (-x >= w) {
        trackEl.appendChild(first);
        x += w;
      }
    }
    rafId = requestAnimationFrame(step);
  };
  const onEnter = () => { running = false; cancelAnimationFrame(rafId); };
  const onLeave = () => { if (!prefersReduced && document.visibilityState === 'visible') { running = true; lastTs = 0; rafId = requestAnimationFrame(step); } };
  const onVisibility = () => { if (document.visibilityState === 'hidden') onEnter(); else onLeave(); };
  const tickerRoot = trackEl.closest('.ticker');
  tickerRoot?.addEventListener('mouseenter', onEnter);
  tickerRoot?.addEventListener('mouseleave', onLeave);
  tickerRoot?.addEventListener('focusin', onEnter);
  tickerRoot?.addEventListener('focusout', onLeave);
  document.addEventListener('visibilitychange', onVisibility);

  rafId = requestAnimationFrame(step);
  return () => { running = false; cancelAnimationFrame(rafId); document.removeEventListener('visibilitychange', onVisibility); };
}

// Tabs
(function tabs() {
  document.querySelectorAll('[role="tablist"]').forEach((list) => {
    const tabs = list.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const selectedId = tab.getAttribute('aria-controls');
        tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
        const root = list.parentElement;
        root.querySelectorAll('[role="tabpanel"]').forEach(p => {
          p.classList.toggle('hidden', p.id !== selectedId);
        });
      });
    });
  });
})();

// Lightbox (minimal)
(function lightbox() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = '<div class="frame"><img alt="" /></div>';
  document.body.appendChild(overlay);
  const imgEl = overlay.querySelector('img');

  gallery.addEventListener('click', (e) => {
    const target = e.target.closest('.thumb');
    if (!target) return;
    const src = target.querySelector('img')?.getAttribute('src');
    if (!src) return;
    imgEl.src = src;
    overlay.classList.add('open');
  });
  overlay.addEventListener('click', () => overlay.classList.remove('open'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.classList.remove('open'); });
})();

// Toast utility
export function showToast(message, { timeout = 3000 } = {}) {
  const toast = document.createElement('div');
  toast.className = 'glass';
  toast.style.position = 'fixed'; toast.style.bottom = '16px'; toast.style.right = '16px'; toast.style.padding = '12px 14px'; toast.style.borderRadius = '12px';
  toast.textContent = message;
  toast.style.zIndex = 1500;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), timeout);
} 