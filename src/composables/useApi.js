/**
 * useApi.js — Vue composable สำหรับ fetch ข้อมูลจาก Cloudflare Pages Functions
 */

const BASE = '/api';

// ── Auth ────────────────────────────────────────────────────
export function getToken() {
  return sessionStorage.getItem('admin_token') || '';
}

export function setToken(t) {
  sessionStorage.setItem('admin_token', t);
}

export function clearToken() {
  sessionStorage.removeItem('admin_token');
}

export function isLoggedIn() {
  return !!getToken();
}

export async function login(username, password) {
  const res = await fetch(`${BASE}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error('API Error:', res.status, res.statusText);
    return null;
  }

  if (data.ok) setToken(data.token);
  return data;
}

// ── Site Settings ────────────────────────────────────────────
export async function getSettings() {
  const res = await fetch(`${BASE}/settings`);
  
  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error('API Error:', res.status, res.statusText);
    return null;
  }

  
  if (!data) return null;
  return data.ok ? data.data : null;

}

export async function saveSettings(payload) {
  const res = await fetch(`${BASE}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// ── Services ─────────────────────────────────────────────────
export async function getServices() {
  const res = await fetch(`${BASE}/services`);
  
  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error('API Error:', res.status, res.statusText);
    return null;
  }

  
  if (!data) return { services: [], prices: [] };
  return data.ok ? { services: data.data, prices: data.prices } : { services: [], prices: [] };

}

// ── Portfolio ─────────────────────────────────────────────────
export async function getPortfolio() {
  const res = await fetch(`${BASE}/portfolio`);
  
  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error('API Error:', res.status, res.statusText);
    return null;
  }

  
  if (!data) return [];
  return data.ok ? data.data : [];

}

export async function createPortfolioItem(payload) {
  const res = await fetch(`${BASE}/portfolio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updatePortfolioItem(payload) {
  const res = await fetch(`${BASE}/portfolio`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deletePortfolioItem(id) {
  const res = await fetch(`${BASE}/portfolio?id=${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}

// ── Image Upload ──────────────────────────────────────────────
export async function uploadImage(file) {
  const form = new FormData();
  form.append('file', file);
    const res = await fetch(`${BASE}/upload-drive`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: form,
  });
  return res.json();
}
