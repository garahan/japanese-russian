// /api/seed.js — one-time content seeder.
// Visit /api/seed?secret=YOUR_SECRET once after deploy to load the sample
// Lesson Packs into Upstash. MERGES by pack id (never overwrites packs you've
// already created in the admin), so it is safe to run more than once.
//
// Guard: process.env.SEED_SECRET, falling back to 'seed_nihongo_2024'.

const SEED_CONTENT = require('../seed-data.js');

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const SECRET = process.env.SEED_SECRET || 'seed_nihongo_2024';

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
const idOf = (p) => p.id || (p.level + '_' + p.module + '_' + p.lesson);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const given = (req.query && req.query.secret) || '';
  if (given !== SECRET) {
    return res.status(401).json({ ok: false, error: 'Wrong or missing ?secret=' });
  }

  try {
    const existingRaw = await redis(['GET', 'content:lessons']);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    const have = new Set(existing.map(idOf));

    let added = 0;
    SEED_CONTENT.forEach(pack => {
      if (!have.has(idOf(pack))) { existing.push(pack); have.add(idOf(pack)); added++; }
    });

    await redis(['SET', 'content:lessons', JSON.stringify(existing)]);
    return res.status(200).json({
      ok: true,
      added,
      skipped: SEED_CONTENT.length - added,
      totalPacks: existing.length,
      note: added ? 'Seed packs merged.' : 'All seed packs already present — nothing changed.'
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
