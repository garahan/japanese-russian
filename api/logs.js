// /api/logs.js — fetch activity logs from Redis (admin-protected)
// GET /api/logs?limit=50  → { ok, logs:[...], summary:{...} }

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const LOG_KEY = 'logs:activity';

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

function buildSummary(logs) {
  const now = Date.now();
  const dayMs = 86400000;
  const last24 = logs.filter(l => now - new Date(l.timestamp).getTime() < dayMs);
  const last7 = logs.filter(l => now - new Date(l.timestamp).getTime() < 7 * dayMs);

  const byType = {};
  logs.forEach(l => { byType[l.type] = (byType[l.type] || 0) + 1; });

  const examLogs = logs.filter(l => l.type === 'exam');
  const jlptLogs = logs.filter(l => l.type === 'jlpt');
  const studyLogs = logs.filter(l => ['lesson-quiz', 'lesson-write', 'review', 'flashcards', 'practice', 'mission', 'reading', 'drill', 'listening', 'mistakes', 'test'].includes(l.type));

  const avgPct = (arr) => {
    const vals = arr.map(l => l.pct).filter(v => v != null);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  };

  // Build streak: consecutive days with at least one log entry (local dates)
  const localKey = d => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const days = new Set();
  logs.forEach(l => { const d=new Date(l.timestamp); days.add(localKey(d)); });
  let streak = 0;
  const today = localKey(new Date());
  let cursor = new Date();
  for (let i = 0; i < 365; i++) {
    const ds = localKey(cursor);
    if (days.has(ds)) { streak++; cursor.setDate(cursor.getDate() - 1); }
    else if (ds === today) { cursor.setDate(cursor.getDate() - 1); } // today not yet active
    else break;
  }

  // Last activity
  const lastActivity = logs.length ? logs[0].timestamp : null;

  // JLPT results
  const jlptResults = jlptLogs.map(l => ({
    level: l.jlptLevel, score: l.jlptScore, passed: l.jlptPassed, date: l.timestamp
  }));

  // Exam results
  const examResults = examLogs.map(l => ({
    level: l.examLevel, pct: l.examPct, passed: l.examPassed, date: l.timestamp
  }));

  return {
    totalLogs: logs.length,
    sessions24h: last24.length,
    sessions7d: last7.length,
    byType,
    streak,
    lastActivity,
    avgStudyPct: avgPct(studyLogs),
    avgExamPct: avgPct(examLogs),
    examResults: examResults.slice(0, 10),
    jlptResults: jlptResults.slice(0, 10),
  };
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'DELETE') {
    if ((req.headers['x-admin-password'] || '') !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }
    try { await redis(['DEL', LOG_KEY]); } catch (e) { /* non-fatal */ }
    return res.status(200).json({ ok: true });
  }
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'GET or DELETE only' });

  // Admin auth
  if ((req.headers['x-admin-password'] || '') !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  const limit = Math.min(parseInt(req.query && req.query.limit || '100', 10), 200);

  try {
    const v = await redis(['GET', LOG_KEY]);
    const logs = v ? JSON.parse(v) : [];
    const sliced = logs.slice(0, limit);
    return res.status(200).json({ ok: true, logs: sliced, summary: buildSummary(logs) });
  } catch (e) {
    // If Redis isn't configured, return empty
    return res.status(200).json({ ok: true, logs: [], summary: buildSummary([]), note: 'Redis not configured' });
  }
};
