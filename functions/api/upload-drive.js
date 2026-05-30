// Cloudflare Functions: upload image to Google Drive and return public URL
// Path: /functions/api/upload-drive.js

export async function onRequest(context) {
  const { env, request } = context;
  const token = env.GOOGLE_DRIVE_ACCESS_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing Google Drive access token' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  // Only accept POST with multipart/form-data
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return new Response(JSON.stringify({ ok: false, error: 'Expected multipart/form-data' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  if (!file) {
    return new Response(JSON.stringify({ ok: false, error: 'No file provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const fileName = file.name || 'upload.jpg';
  const mimeType = file.type || 'application/octet-stream';
  const arrayBuffer = await file.arrayBuffer();
  const fileData = new Uint8Array(arrayBuffer);

  // Define metadata for Drive file
  const metadata = { name: fileName, mimeType };
  // Build multipart/related body for Drive upload using Blob to preserve binary data
  const boundary = 'gc_boundary_' + Date.now();
  const metadataPart = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`;
  const filePartHeader = `--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;
  const multipartBody = new Blob([
    metadataPart,
    filePartHeader,
    file,
    closeDelimiter,
  ], { type: `multipart/related; boundary=${boundary}` });

  // Perform upload to Drive (multipart upload endpoint)
  const uploadRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // Content-Type is set automatically by Blob
    },
    body: multipartBody,
  });

  if (!uploadRes.ok) {
    const errTxt = await uploadRes.text();
    return new Response(JSON.stringify({ ok: false, error: 'Drive upload failed', details: errTxt }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  const driveData = await uploadRes.json();
  const fileId = driveData.id;

  // Make the file publicly readable
  await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role: 'reader', type: 'anyone' }),
  });

  // Build direct link (uc?)
  const publicUrl = `https://drive.google.com/uc?id=${fileId}`;
  return new Response(JSON.stringify({ ok: true, url: publicUrl }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
