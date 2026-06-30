# 日本語 — 道

A spaced-repetition Japanese learning PWA. Tracks mastery, retention, and momentum across five skills — vocabulary, grammar, kanji, reading, listening — on one path: **N5 → N4 → N3 → N2 → N1**.

No build step. Vanilla HTML/CSS/JS. Deploys to Vercel as static files + serverless functions. Works offline.

---

## Vision

Most apps quiz you. This one **teaches you to remember**. The core loop:

1. **Mission** — one tap builds a personalized session: due reviews, a little new content, a short reading, a recall check. Leans on your weakest skill automatically.
2. **Mastery** grows only from real reps — never from opening the app.
3. **Momentum** decays gently (×0.85/day) so a missed day isn't a reset.
4. **Reports** go to your Telegram after each session — study logs, scores, streaks.

The roadmap page projects, from your recent growth rate, how many days until you're ready for each JLPT level.

---

## Structure

```
index.html              Home — greeting, streak, mission, coach, badges, journey map
roadmap.html            Journey — rank ladder (N5→N1), projections, heatmap, skills, milestones
admin.html              Content studio — create/edit lesson packs, bulk import, insights dashboard
test.html               Weakness test — timed, shareable URL, targets weak points
grammar-reference.html  Searchable grammar cheat-sheet

core.js                 Engine: SRS, mastery math, momentum, mission builder, lesson system
memory-engine.js        Memory & retention tracking
Coach.js                Coach whisper — motivational messaging
seed-data.js            Bundled lesson content (N4, lessons 25–50)
n5-content.js           N5 beginner content (lessons 1–8)
n3-content.js           N3 intermediate content
jlpt-question-bank.js   JLPT question bank (N5–N1)
manga-data.js           Graded reading content
feed-threads.js         Cultural learning threads

sw.js                   Service worker (offline cache, notifications)
manifest.json           PWA manifest

api/
  content.js            Lesson pack CRUD (Redis-backed)
  admin-auth.js         Admin password check
  results.js            Telegram study reporter + activity log storage
  logs.js               Fetch activity logs for admin dashboard
  seed.js               One-time content seeder (merge, idempotent)
  remind.js             Scheduled Telegram reminders (cron)
  generate.js           AI lesson pack generation (Anthropic)
  thread.js             AI cultural thread generation (Gemini/Anthropic)
  debug.js              Health check endpoint
```

---

## Quick start

Open `index.html` in any browser. The app runs offline with bundled content. All progress saves to `localStorage`.

For the full version (content editing, Telegram reports, shared content across devices):

### 1. Deploy to Vercel
Import this folder as a new project. No build command needed.

### 2. Set environment variables

| Variable | Purpose | Required |
|---|---|---|
| `ADMIN_PASSWORD` | Admin page login | For content editing |
| `KV_REST_API_URL` | Upstash Redis REST URL | For shared content |
| `KV_REST_API_TOKEN` | Upstash Redis REST token | For shared content |
| `TELEGRAM_TOKEN` | Bot token from @BotFather | For reports |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID | For reports |
| `RESULTS_SECRET` | Shared secret for report endpoint | Recommended |
| `SEED_SECRET` | Guards `/api/seed` | Optional |

### 3. Seed content (once)
```
https://YOUR-APP.vercel.app/api/seed?secret=YOUR_SEED_SECRET
```
Merges bundled packs into Redis. Safe to re-run — never overwrites existing packs.

### 4. Verify
Visit `/api/debug` to check env vars and lesson pack count.

### 5. Install on phone
Open the site → browser menu → **Add to Home Screen**.

---

## Adding content

Open `/admin.html` → log in → create a **Lesson Pack** (JSON) or use **Bulk Import**. Packs validate against structural rules (grammar needs explanation + examples, vocab needs example sentences). New packs appear on next app load.

---

## Notes

- Learner progress is **on-device** (`localStorage`). Telegram reports are the cross-device visibility layer.
- Listening uses browser TTS (`ja-JP` voice) — no audio files to host.
- Pinch-zoom enabled for kanji inspection.
- Dark mode syncs across all pages.
