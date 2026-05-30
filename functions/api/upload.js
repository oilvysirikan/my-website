/**
 * POST /api/upload  — admin only, uploads image to R2
 * Returns: { ok, url }  where url is /api/images/<name>
 */
import { verifyToken, json, preflight } from './_helpers.js';

export async function onRequestOptions() { return preflight(); }

export async function onRequestPost(ctx) {
  const { request, env } = ctx;

  const token = (request.headers.get('Authorization') || '').replace('Bearer ', '');
  if (!await verifyToken(token, env)) return json({ ok: false, error: 'Unauthorized' }, 401);

  const formData = await request.formData();
  const file = formData.get('file');
  if (!file) return json({ ok: false, error: 'No file provided' }, 400);

  // Sanitise filename
  const ext = file.name.split('.').pop().toLowerCase();
  const allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  if (!allowed.includes(ext)) return json({ ok: false, error: 'File type not allowed' }, 400);

  const key = `portfolio/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = await file.arrayBuffer();

  await env.IMAGES.put(key, buffer, {
    httpMetadata: { contentType: file.type || `image/${ext}` },
  });

  return json({ ok: true, url: `/api/images/${key}`, key });
}
