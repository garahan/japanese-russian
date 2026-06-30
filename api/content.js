// /api/content.js — Lesson Pack storage (Upstash Redis REST, dependency-free)
// GET  /api/content?type=lessons            → { ok, data:[...packs] }
// POST /api/content  (x-admin-password)      → add | update | delete | bulk_add

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(cmd) {
  if (!REDIS_URL || !REDIS_TOKEN) throw new Error('Redis env vars missing');
  const r = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + REDIS_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd)
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
const key = (type) => 'content:' + (type || 'lessons');
async function readArr(type) { try { const v = await redis(['GET', key(type)]); return v ? JSON.parse(v) : []; } catch (e) { return []; } }
async function writeArr(type, arr) { return redis(['SET', key(type), JSON.stringify(arr)]); }
const idOf = (p) => p.id || (p.level + '_' + p.module + '_' + p.lesson);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const type = (req.query && req.query.type) || 'lessons';
      const data = await readArr(type);
      return res.status(200).json({ ok: true, data });
    }

    if (req.method === 'POST') {
      if ((req.headers['x-admin-password'] || '') !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ ok: false, error: 'Unauthorized' });
      }
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { type = 'lessons', action, item, items } = body;
      let arr = await readArr(type);

      if (action === 'add') {
        arr = arr.filter(x => idOf(x) !== idOf(item)); arr.push(item);
      } else if (action === 'update') {
        const i = arr.findIndex(x => idOf(x) === idOf(item));
        if (i >= 0) arr[i] = item; else arr.push(item);
      } else if (action === 'delete') {
        arr = arr.filter(x => idOf(x) !== (item.id || idOf(item)));
      } else if (action === 'bulk_add') {
        const have = new Set(arr.map(idOf));
        (items || []).forEach(p => { if (!have.has(idOf(p))) { arr.push(p); have.add(idOf(p)); } });
      } else {
        return res.status(400).json({ ok: false, error: 'Unknown action' });
      }

      await writeArr(type, arr);
      return res.status(200).json({ ok: true, count: arr.length });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
