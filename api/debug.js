// /api/debug.js — quick health check. Reports which env vars are present
// (booleans only, never the values) and how many Lesson Packs are stored.
// Visit /api/debug in a browser after deploy to confirm wiring.

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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const env = {
    ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
    REDIS_URL: !!REDIS_URL,
    REDIS_TOKEN: !!REDIS_TOKEN,
    TELEGRAM_TOKEN: !!process.env.TELEGRAM_TOKEN,
    TELEGRAM_CHAT_ID: !!process.env.TELEGRAM_CHAT_ID,
    RESULTS_SECRET: !!process.env.RESULTS_SECRET,
    SEED_SECRET: !!process.env.SEED_SECRET
  };

  let lessons = null, redisOk = false, error = null;
  try {
    const v = await redis(['GET', 'content:lessons']);
    const arr = v ? JSON.parse(v) : [];
    lessons = Array.isArray(arr) ? arr.length : 0;
    redisOk = true;
  } catch (e) { error = e.message; }

  return res.status(200).json({
    ok: true,
    time: new Date().toISOString(),
    env,
    redis: { connected: redisOk, lessonPacks: lessons, error }
  });
};
