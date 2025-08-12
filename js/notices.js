// js/notices.js - Render notices ticker
import { getNotices } from './api.js';
import { startTicker } from './ui.js';

(async function initNotices() {
  const notices = await getNotices();
  const ticker = document.querySelector('#notice-ticker [data-ticker-track]');
  if (ticker && notices.length) {
    ticker.innerHTML = '';
    notices.forEach(n => {
      const a = document.createElement('a');
      a.href = n.url || '#';
      a.textContent = n.title;
      a.target = n.url ? '_blank' : '_self';
      a.className = 'badge';
      a.setAttribute('aria-label', `Notice: ${n.title}`);
      ticker.appendChild(a);
    });
    startTicker(ticker, { speed: 50 });
  }
})(); 