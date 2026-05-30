/**
 * Shared auth helper — validates the token created by auth.js
 */
export async function verifyToken(token, env) {
  try {
    const [payloadB64, sig] = token.split('.');
    if (!payloadB64 || !sig) return false;

    const payload = atob(payloadB64);
    const [username, expiryStr] = payload.split(':');
    if (!username || !expiryStr) return false;

    if (Date.now() > parseInt(expiryStr, 10)) return false;

    const secret = env.JWT_SECRET || 'default-secret-change-me';
    const encoder = new TextEncoder();
    const sigData = encoder.encode(payload + secret);
    const sigBuffer = await crypto.subtle.digest('SHA-256', sigData);
    const sigArray = Array.from(new Uint8Array(sigBuffer));
    const expected = sigArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return expected === sig;
  } catch {
    return false;
  }
}

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS });
}

export function preflight() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
