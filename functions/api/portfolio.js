/**
 * GET    /api/portfolio          — public, all active
 * POST   /api/portfolio          — admin, create
 * PUT    /api/portfolio          — admin, update (id in body)
 * DELETE /api/portfolio?id=N     — admin, delete
 */
import { verifyToken, json, preflight } from './_helpers.js';

export async function onRequestOptions() { return preflight(); }

export async function onRequest(ctx) {
  const { request, env } = ctx;
  const method = request.method;

  // ── GET ───────────────────────────────────────────────────
  if (method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT * FROM portfolio WHERE is_active = 1 ORDER BY sort_order, id'
    ).all();

    // Parse highlights JSON and installation_images
    const data = results.map(r => ({
      ...r,
      highlights: (() => { try { return JSON.parse(r.highlights || '[]'); } catch { return []; } })(),
      installation_images: (() => { 
        try { 
          const parsed = JSON.parse(r.installation_images || '[]');
          return Array.isArray(parsed) ? parsed : [];
        } catch { return []; } 
      })(),
      is_featured: r.is_featured === 1,
    }));

    return json({ ok: true, data });
  }

  // Admin guard for mutating operations
  const token = (request.headers.get('Authorization') || '').replace('Bearer ', '');
  if (!await verifyToken(token, env)) return json({ ok: false, error: 'Unauthorized' }, 401);

  // ── POST (create) ─────────────────────────────────────────
  if (method === 'POST') {
    const b = await request.json();
    const highlights = JSON.stringify(Array.isArray(b.highlights) ? b.highlights : []);
    const installation_images = JSON.stringify(Array.isArray(b.installation_images) ? b.installation_images : []);
    const { meta } = await env.DB.prepare(`
      INSERT INTO portfolio
        (category, project_name_th, project_name_en, client_name_th, client_name_en,
         work_description, image_url, completion_date, is_featured, highlights, installation_images, sort_order)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    `).bind(
      b.category || 'signage',
      b.project_name_th, b.project_name_en || '',
      b.client_name_th || '', b.client_name_en || '',
      b.work_description || '', b.image_url || '',
      b.completion_date || new Date().toISOString().split('T')[0],
      b.is_featured ? 1 : 0,
      highlights,
      installation_images,
      b.sort_order || 0,
    ).run();

    return json({ ok: true, id: meta.last_row_id });
  }

  // ── PUT (update) ──────────────────────────────────────────
  if (method === 'PUT') {
    const b = await request.json();
    if (!b.id) return json({ ok: false, error: 'id required' }, 400);

    const allowed = [
      'category','project_name_th','project_name_en','client_name_th','client_name_en',
      'work_description','image_url','completion_date','is_featured','highlights','installation_images','sort_order',
    ];
    const fields = Object.keys(b).filter(k => allowed.includes(k));
    if (!fields.length) return json({ ok: false, error: 'No valid fields' }, 400);

    const vals = fields.map(f => {
      if (f === 'highlights') return JSON.stringify(Array.isArray(b[f]) ? b[f] : []);
      if (f === 'installation_images') return JSON.stringify(Array.isArray(b[f]) ? b[f] : []);
      if (f === 'is_featured') return b[f] ? 1 : 0;
      return b[f];
    });
    vals.push(new Date().toISOString(), b.id);

    const sets = fields.map(f => `${f} = ?`).join(', ');
    await env.DB.prepare(`UPDATE portfolio SET ${sets}, updated_at = ? WHERE id = ?`)
      .bind(...vals).run();

    return json({ ok: true });
  }

  // ── DELETE ────────────────────────────────────────────────
  if (method === 'DELETE') {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return json({ ok: false, error: 'id required' }, 400);

    await env.DB.prepare('UPDATE portfolio SET is_active = 0 WHERE id = ?').bind(id).run();
    return json({ ok: true });
  }

  return json({ ok: false, error: 'Method not allowed' }, 405);
}
