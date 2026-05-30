const fs = require('fs');
let code = fs.readFileSync('src/composables/useApi.js', 'utf8');

// Replace standard fetch/json patterns with safer ones
code = code.replace(/const data = await res\.json\(\);/g, `
  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error('API Error:', res.status, res.statusText);
    return null;
  }
`);

// Also fix the services one which returns { services: [], prices: [] }
code = code.replace(/return data\.ok \? \{ services: data\.data, prices: data\.prices \} : \{ services: \[\], prices: \[\] \};/g, `
  if (!data) return { services: [], prices: [] };
  return data.ok ? { services: data.data, prices: data.prices } : { services: [], prices: [] };
`);

// Settings
code = code.replace(/return data\.ok \? data\.data : null;/g, `
  if (!data) return null;
  return data.ok ? data.data : null;
`);

// Portfolio
code = code.replace(/return data\.ok \? data\.data : \[\];/g, `
  if (!data) return [];
  return data.ok ? data.data : [];
`);

fs.writeFileSync('src/composables/useApi.js', code);
