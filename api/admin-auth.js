// /api/admin-auth.js — checks the admin password against the env var.
// Returns { ok:true } on match. The client then stores the password in
// sessionStorage and sends it as x-admin-password on /api/content writes,
// where it is verified again (this endpoint alone is not the security boundary).

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'POST only' });

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); }
  catch { return res.status(400).json({ ok: false, error: 'Bad JSON' }); }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return res.status(500).json({ ok: false, error: 'ADMIN_PASSWORD not set' });

  if ((body.password || '') === expected) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false, error: 'Wrong password' });
};
