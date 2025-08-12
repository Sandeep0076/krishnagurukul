// js/news.js - Render news cards
import { getNews } from './api.js';

function createCard(n) {
  const card = document.createElement('article');
  card.className = 'card glass';
  const media = document.createElement('div'); media.className = 'media';
  if (n.image) {
    const img = document.createElement('img');
    img.loading = 'lazy'; img.decoding = 'async';
    img.src = n.image; img.alt = n.title || 'News image';
    media.appendChild(img);
  }
  const body = document.createElement('div'); body.className = 'body';
  const h3 = document.createElement('h3'); h3.textContent = n.title; body.appendChild(h3);
  if (n.summary) { const p = document.createElement('p'); p.textContent = n.summary; body.appendChild(p); }
  const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = new Date(n.date).toLocaleDateString();
  body.appendChild(meta);
  if (n.url) {
    const a = document.createElement('a'); a.href = n.url; a.textContent = 'Read more'; a.className = 'btn'; a.target = '_blank';
    body.appendChild(a);
  }
  card.append(media, body);
  return card;
}

(async function initNews() {
  const news = await getNews();
  const gridHome = document.getElementById('news-grid');
  const listPage = document.getElementById('news-list');

  if (gridHome) {
    gridHome.innerHTML = '';
    news.slice(0, 3).forEach(n => gridHome.appendChild(createCard(n)));
  }
  if (listPage) {
    listPage.innerHTML = '';
    news.forEach(n => listPage.appendChild(createCard(n)));
  }
})(); 