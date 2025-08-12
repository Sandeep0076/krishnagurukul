// js/api.js - fetch helpers for JSON data

const preferPhp = new URLSearchParams(location.search).get('api') === 'php';
const apiBase = preferPhp ? '/api' : '/data';

/**
 * Fetch JSON with sensible defaults and error handling
 */
export async function fetchJSON(path, { cache = 'force-cache' } = {}) {
  const url = `${apiBase}${path}`;
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' }, cache });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('fetchJSON error:', url, err);
    return null;
  }
}

export async function getNotices() {
  const data = await fetchJSON('/notices.json', { cache: 'no-store' });
  return Array.isArray(data) ? data : [];
}

export async function getNews() {
  const data = await fetchJSON('/news.json');
  return Array.isArray(data) ? data : [];
}

export async function getEvents() {
  const data = await fetchJSON('/events.json', { cache: 'no-store' });
  return Array.isArray(data) ? data : [];
} 