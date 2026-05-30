/**
 * GET  /api/settings         — public, returns site settings
 * PUT  /api/settings         — admin only, update settings
 * GET  /api/services         — public, returns all active services
 * PUT  /api/services/:id     — admin only (handled separately)
 */
import { verifyToken, json, preflight } from './_helpers.js';

export async function onRequestOptions() { return preflight(); }

export async function onRequest(ctx) {
  const { request, env } = ctx;
  const url = new URL(request.url);
  const path = url.pathname; // e.g. /api/settings  or /api/services

  // ── GET /api/services ──────────────────────────────────────
  if (request.method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order'
    ).all();
    // Also fetch price catalogue
    const { results: prices } = await env.DB.prepare(
      'SELECT * FROM price_catalogue ORDER BY service_id, sort_order'
    ).all();
    return json({ ok: true, data: results, prices });
  }

  return json({ ok: false, error: 'Method not allowed' }, 405);
}

