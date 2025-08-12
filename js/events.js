// js/events.js - Render events
import { getEvents } from './api.js';

function createEventCard(ev) {
  const card = document.createElement('article'); card.className = 'card glass';
  const body = document.createElement('div'); body.className = 'body';
  const h3 = document.createElement('h3'); h3.textContent = ev.title; body.appendChild(h3);
  const p = document.createElement('p'); p.textContent = ev.description || ''; body.appendChild(p);
  const meta = document.createElement('div'); meta.className = 'meta';
  const dt = new Date(ev.date + (ev.time ? ('T' + ev.time) : ''));
  meta.textContent = dt.toLocaleString();
  body.appendChild(meta);
  if (ev.location) { const loc = document.createElement('div'); loc.className = 'helper'; loc.textContent = ev.location; body.appendChild(loc); }
  card.appendChild(body);
  return card;
}

(async function initEvents() {
  const events = await getEvents();
  const gridHome = document.getElementById('events-grid');
  const listPage = document.getElementById('events-list');
  if (gridHome) {
    gridHome.innerHTML = '';
    events.slice(0, 3).forEach(ev => gridHome.appendChild(createEventCard(ev)));
  }
  if (listPage) {
    listPage.innerHTML = '';
    events.forEach(ev => listPage.appendChild(createEventCard(ev)));
  }
})(); 