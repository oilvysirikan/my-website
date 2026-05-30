/**
 * GET /api/images/[...path]  — serves R2 images publicly
 */
export async function onRequestGet(ctx) {
  const { params, env } = ctx;
  // params.path is an array of path segments after /api/images/
  const key = Array.isArray(params.path) ? params.path.join('/') : params.path;

  const obj = await env.IMAGES.get(key);
  if (!obj) {
    return new Response('Image not found', { status: 404 });
  }

  const headers = new Headers();
  headers.set('Content-Type', obj.httpMetadata?.contentType || 'image/jpeg');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(obj.body, { headers });
}
