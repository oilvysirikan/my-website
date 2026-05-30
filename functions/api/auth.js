/**
 * POST /api/auth
 * Body: { username, password }
 * Returns: { token, ok }
 */
export async function onRequestPost(ctx) {
  const { request, env } = ctx;

  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const { username, password } = await request.json();

    // Look up admin user
    const row = await env.DB.prepare(
      'SELECT password_hash FROM admin_users WHERE username = ?'
    ).bind(username).first();

    if (!row) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid credentials' }), {
        status: 401, headers: cors,
      });
    }

    // Hash the provided password with SHA-256 and compare
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashHex !== row.password_hash) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid credentials' }), {
        status: 401, headers: cors,
      });
    }

    // Create a simple signed token: base64(username + ":" + expiry) + "." + signature
    const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24h
    const payload = `${username}:${expiry}`;
    const secret = env.JWT_SECRET || 'default-secret-change-me';
    const sigData = encoder.encode(payload + secret);
    const sigBuffer = await crypto.subtle.digest('SHA-256', sigData);
    const sigArray = Array.from(new Uint8Array(sigBuffer));
    const sig = sigArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const token = btoa(payload) + '.' + sig;

    return new Response(JSON.stringify({ ok: true, token }), { headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500, headers: cors,
    });
  }
}

// Handle preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
