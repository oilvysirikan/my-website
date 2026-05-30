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

  // ── GET /api/settings ──────────────────────────────────────
  if (request.method === 'GET') {
    const row = await env.DB.prepare('SELECT * FROM site_settings WHERE id = 1').first();
    return json({ ok: true, data: row });
  }

  // ── PUT /api/settings ──────────────────────────────────────
  if (request.method === 'PUT') {
    const token = (request.headers.get('Authorization') || '').replace('Bearer ', '');
    if (!await verifyToken(token, env)) return json({ ok: false, error: 'Unauthorized' }, 401);

    const body = await request.json();
    const allowed = [
      'company_name_th','company_name_en','tagline_th','tagline_en','hero_subtitle_th',
      'phone','phone2','line_id','email','address_th',
      'stat_years','stat_area','stat_team','stat_projects',
    ];
    const fields = Object.keys(body).filter(k => allowed.includes(k));
    if (!fields.length) return json({ ok: false, error: 'No valid fields' }, 400);

    const sets = fields.map(f => `${f} = ?`).join(', ');
    const vals = fields.map(f => body[f]);
    vals.push(new Date().toISOString());
    await env.DB.prepare(`UPDATE site_settings SET ${sets}, updated_at = ? WHERE id = 1`)
      .bind(...vals).run();

    return json({ ok: true });
  }

  return json({ ok: false, error: 'Method not allowed' }, 405);
}
