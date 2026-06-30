// /api/results.js — sends a study report to the coach's Telegram AND stores
// an activity log in Upstash Redis so the admin panel can display a dashboard.
// Fire-and-forget from the client. Auth: a shared secret.
//
// Security model: this is a static PWA, so the secret lives in client source
// and only deters casual abuse. That's acceptable because the endpoint can do
// exactly one thing — message your own Telegram chat. If the secret ever leaks,
// rotate RESULTS_SECRET (env + the constant in index.html) and the spam stops.
//
// Behaviour:
//   • If RESULTS_SECRET env var is SET  → the request must match it, else 401.
//   • If RESULTS_SECRET env var is UNSET → requests pass (unsecured) so the app
//     works the moment you deploy; set the env var to lock it down.

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const SECRET = process.env.RESULTS_SECRET; // optional
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const LOG_KEY = 'logs:activity';
const MAX_LOGS = 200;

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

async function readLogs() {
  try { const v = await redis(['GET', LOG_KEY]); return v ? JSON.parse(v) : []; } catch { return []; }
}
async function writeLogs(arr) {
  try { await redis(['SET', LOG_KEY, JSON.stringify(arr)]); } catch (e) { /* non-fatal */ }
}

const bar = (pct) => {
  const n = Math.max(0, Math.min(10, Math.round((pct || 0) / 10)));
  return '█'.repeat(n) + '░'.repeat(10 - n);
};
const pct = (correct, total) => (total ? Math.round((correct / total) * 100) : 0);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildMessage(b) {
  const name = esc(b.name || 'Study');
  const overall = typeof b.overall === 'number' ? b.overall : null;
  const mom = typeof b.momentum === 'number' ? b.momentum : null;
  const score = (b.total != null) ? `${b.correct ?? 0}/${b.total} (${pct(b.correct, b.total)}%)` : null;

  let head, lines = [];
  if (b.type === 'mission') {
    head = `🏆 <b>${name} finished today's mission</b>`;
    if (b.focus) lines.push(`🎯 Focus: <b>${esc(b.focus)}</b>`);
    if (score) lines.push(`✅ Recall: ${score}`);
    if (b.mins) lines.push(`⏱ ~${b.mins} min`);
  } else if (b.type === 'reading') {
    head = `📖 <b>${name} read a story</b>`;
    if (b.title) lines.push(`“${esc(b.title)}”`);
    if (score) lines.push(`✅ Comprehension: ${score}`);
  } else if (b.type === 'exam') {
    head = `📝 <b>${name} сдала пробный тест</b>`;
    if (b.examLevel) lines.push(`Level: ${esc(b.examLevel)}`);
    if (b.examPct != null) lines.push(`Score: ${b.examPct}% ${b.examPassed ? '✅ Passed' : '❌ Not yet'}`);
  } else if (b.type === 'jlpt') {
    head = `🎯 <b>${name} took a JLPT placement test</b>`;
    if (b.jlptLevel) lines.push(`Level: ${esc(b.jlptLevel)}`);
    if (b.jlptScore != null) lines.push(`Score: ${b.jlptScore}/180 ${b.jlptPassed ? '✅ Passed' : '❌ Not yet'}`);
  } else if (b.type === 'lesson-quiz') {
    head = `📝 <b>${name} finished a lesson quiz</b>`;
    if (b.lesson) lines.push(`Lesson ${b.lesson}`);
    if (score) lines.push(`✅ ${score}`);
  } else if (b.type === 'lesson-write') {
    head = `✍️ <b>${name} finished a writing drill</b>`;
    if (b.lesson) lines.push(`Lesson ${b.lesson}`);
    if (b.good != null && b.total != null) lines.push(`✅ ${b.good}/${b.total} recalled`);
  } else if (b.type === 'review') {
    head = `🔁 <b>${name} completed a review session</b>`;
    if (b.good != null && b.total != null) lines.push(`✅ ${b.good}/${b.total} solid`);
  } else if (b.type === 'flashcards') {
    head = `🃏 <b>${name} finished flashcards</b>`;
    if (b.good != null && b.total != null) lines.push(`✅ ${b.good}/${b.total} known`);
  } else if (b.type === 'practice') {
    head = `💪 <b>${name} did a practice session</b>`;
    if (score) lines.push(`✅ ${score}`);
  } else if (b.type === 'drill') {
    head = `🏋️ <b>${name} did a drill practice</b>`;
    if (b.lesson) lines.push(`Lesson ${b.lesson}`);
    if (b.good != null && b.total != null) lines.push(`✅ ${b.good}/${b.total} recalled`);
  } else if (b.type === 'listening') {
    head = `🎧 <b>${name} did a listening exercise</b>`;
    if (b.lesson) lines.push(`Lesson ${b.lesson}`);
    if (score) lines.push(`✅ ${score}`);
  } else if (b.type === 'mistakes') {
    head = `🔧 <b>${name} reviewed mistakes</b>`;
    if (score) lines.push(`✅ ${score}`);
  } else if (b.type === 'test') {
    head = `🧪 <b>${name} took a weakness test</b>`;
    if (score) lines.push(`✅ ${score}`);
    if (b.time) lines.push(`⏱ ${Math.floor(b.time/60)}m ${b.time%60}s`);
    if (b.weakIds && b.weakIds.length) lines.push(`⚠️ ${b.weakIds.length} items still weak`);
  } else {
    head = `📚 <b>${name} studied</b>`;
    if (score) lines.push(`✅ ${score}`);
  }

  if (overall != null) lines.push(`\n<b>Mastery</b> ${overall}%\n${bar(overall)}`);
  if (mom != null) lines.push(`🔥 Momentum: ${mom}`);
  return head + '\n' + lines.join('\n');
}

module.exports = async (req, res) => {
  // Lock CORS to the requesting origin; the secret is the real gate.
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'POST only' });

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); }
  catch { return res.status(400).json({ ok: false, error: 'Bad JSON' }); }

  // Auth (only enforced if a secret is configured)
  if (SECRET && body.secret !== SECRET) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  // Store activity log in Redis (non-fatal if Redis isn't configured)
  const logEntry = {
    type: body.type || 'study',
    name: body.name || 'Ученик',
    timestamp: new Date().toISOString(),
    overall: body.overall ?? null,
    momentum: body.momentum ?? null,
    correct: body.correct ?? body.good ?? null,
    total: body.total ?? null,
    pct: body.total != null ? pct(body.correct ?? body.good, body.total) : null,
    lesson: body.lesson ?? null,
    examLevel: body.examLevel ?? null,
    examPct: body.examPct ?? null,
    examPassed: body.examPassed ?? null,
    jlptLevel: body.jlptLevel ?? null,
    jlptScore: body.jlptScore ?? null,
    jlptPassed: body.jlptPassed ?? null,
    focus: body.focus ?? null,
    title: body.title ?? null,
    mins: body.mins ?? null,
  };
  try {
    const logs = await readLogs();
    logs.unshift(logEntry);
    if (logs.length > MAX_LOGS) logs.length = MAX_LOGS;
    await writeLogs(logs);
  } catch (e) { /* non-fatal */ }

  // If Telegram isn't configured, succeed quietly so the client never errors.
  if (!TOKEN || !CHAT_ID) {
    return res.status(200).json({ ok: true, sent: false, note: 'Telegram not configured' });
  }

  try {
    const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: buildMessage(body),
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
    const j = await r.json().catch(() => ({}));
    return res.status(200).json({ ok: true, sent: !!j.ok });
  } catch (e) {
    // Never fail the client over a reporting hiccup.
    return res.status(200).json({ ok: true, sent: false, error: e.message });
  }
};
