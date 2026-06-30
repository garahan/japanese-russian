// /api/remind.js — sends a gentle DAILY NUDGE to the learner's Telegram.
//
// This is the anti-procrastination piece. A static PWA can't reliably wake
// itself up (especially on iOS), so instead of relying on her to remember,
// Vercel Cron hits this endpoint once a day and Telegram pokes her.
//
// It is deliberately GENERIC ("time for 5 minutes") rather than "12 items due",
// because due-ness lives in her browser's localStorage and the server can't see
// it yet. Once you add progress-sync (Phase 4) this can become specific.
//
// ── Setup ────────────────────────────────────────────────────────────────────
// 1. She must message the bot once (open it in Telegram, tap Start). Telegram
//    won't let a bot message a user who hasn't started a chat with it.
// 2. Get HER chat id (it can be the same chat you already use, or her own):
//      https://api.telegram.org/bot<TELEGRAM_TOKEN>/getUpdates  → read chat.id
// 3. Env vars on Vercel:
//      TELEGRAM_TOKEN     (you already have this)
//      REMIND_CHAT_ID     her chat id   (falls back to TELEGRAM_CHAT_ID if unset)
//      CRON_SECRET        any random string — guards this endpoint
//      REMIND_NAME        optional, defaults to "Mahym"
// 4. The cron schedule is in vercel.json. Vercel cron runs in UTC; the included
//    schedule "0 0 * * *" = 09:00 in Japan (JST = UTC+9). Adjust if she'd rather
//    be nudged at a different hour. 
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.REMIND_CHAT_ID || process.env.TELEGRAM_CHAT_ID;
const CRON_SECRET = process.env.CRON_SECRET;
const NAME = process.env.REMIND_NAME || 'Mahym';

// A small rotating set so the nudge doesn't become wallpaper she stops seeing.
// Tone matches the app's philosophy: a missed day is not a failure, just start.
const MESSAGES = [
  `🌸 <b>${NAME}</b>, 5 minutes of Japanese today?\nJust open the app and tap <b>Start training</b> — that's the whole job.`,
  `⛩ Tiny rep, big compounding.\nEven one mission today keeps the memory alive. 行こう！`,
  `🔥 Momentum loves today more than tomorrow.\nOpen the app — a short session beats a perfect one you skip.`,
  `📖 Today's story is waiting.\nRead it, listen once, answer a few questions. ~5 min.`,
  `💪 Future-N1-${NAME} is built one small day at a time.\nDo the 60-second rescue if you're busy — it still counts.`,
  `🎯 Don't break the chain in your head — break it on the page.\nOne quick mission and you're done for today.`,
  `🍵 Quick check-in: a few cards now means you won't forget them later.\nOpen the app whenever you have a spare minute today.`
];

function pickMessage() {
  // Deterministic by day-of-year so it rotates predictably, not randomly.
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const doy = Math.floor((now - start) / 86400000);
  return MESSAGES[doy % MESSAGES.length];
}

function authorized(req) {
  if (!CRON_SECRET) return true; // unset → open (works immediately on deploy)
  const auth = req.headers['authorization'] || '';
  if (auth === `Bearer ${CRON_SECRET}`) return true;      // Vercel Cron sends this
  const url = new URL(req.url, 'http://x');
  if (url.searchParams.get('secret') === CRON_SECRET) return true; // manual test
  return false;
}

module.exports = async (req, res) => {
  if (!authorized(req)) return res.status(401).json({ ok: false, error: 'Unauthorized' });
  if (!TOKEN || !CHAT_ID) {
    return res.status(500).json({ ok: false, error: 'TELEGRAM_TOKEN and REMIND_CHAT_ID (or TELEGRAM_CHAT_ID) must be set' });
  }
  try {
    const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: pickMessage(), parse_mode: 'HTML' })
    });
    const j = await r.json();
    if (!j.ok) return res.status(502).json({ ok: false, error: j.description || 'Telegram error' });
    return res.status(200).json({ ok: true, sent: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
