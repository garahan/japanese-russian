# Mahym's Japanese — 道

A personal Japanese **acquisition system** (not a quiz app). It tracks *mastery*,
*retention*, and *momentum* across five skills — Reading, Listening, Vocabulary,
Grammar, Kanji — and walks one path: **N4 → MEXT → N3 → N2 → N1**.

Built as a no-build, vanilla HTML/CSS/JS PWA. Deploys to Vercel as static files
plus a handful of serverless functions in `/api`. Content lives in Upstash Redis.
Study reports are pushed to your Telegram.

---

## Works immediately (no setup)

Open `index.html` from any static host (or `npx serve` locally) and it runs
**offline** using the bundled sample content in `seed-data.js` — two N4 Lesson
Packs (Travel 旅行, Daily Life 毎日の生活). All progress is saved on-device in
`localStorage`. This is enough for your wife to start today.

The backend (Upstash + Telegram) only adds: editing content from the admin page,
and getting study reports on your phone.

---

## Files

```
index.html        Home — hero, coach whisper, continue card, practice, badges
roadmap.html      Journey — rank ladder, projections, heatmap, modules
admin.html        Content Studio — create/edit Lesson Packs, bulk import, backup, insights dashboard
test.html         Weakness Test — timed test page for shareable links targeting weak points
core.js           The engine: SRS, mastery math, momentum, mission builder
seed-data.js      Bundled sample content (also used by /api/seed)
feed-threads.js   Twitter-style learning threads (dopamine-rich cultural posts)
jlpt-question-bank.js  JLPT question bank (N5–N1, 6 sections each)
manifest.json     PWA manifest (with quick-action shortcuts)
sw.js             Service worker (offline, stale-while-revalidate, notifications)
icon-*.png        App icons (道)
Coach.js          Coach whisper engine — motivational messaging
memory-engine.js  Memory & retention tracking module
grammar-reference.html  Searchable grammar cheat-sheet (all lessons)
engine-demo.js    Demo/test harness for the engine
api/
  content.js      Lesson Pack storage (GET read / POST write)
  admin-auth.js   Admin password check
  results.js      Telegram study reporter + activity log storage
  logs.js         Fetch activity logs for admin dashboard
  seed.js         One-time content seeder (merge, safe to re-run)
  debug.js        Health check (env presence + lesson count)
  remind.js       Scheduled reminder notifications (cron)
  generate.js     AI content generation (Anthropic) for lesson packs
  thread.js       AI thread generation (Gemini/Anthropic) for feed
```

---

## Deploy to Vercel (full version)

### 1. Create an Upstash Redis database
At [upstash.com](https://upstash.com), create a Redis database and copy its
**REST URL** and **REST token**.

### 2. Create a Telegram bot (for reports)
Message [@BotFather](https://t.me/BotFather) → `/newbot` → copy the **token**.
Then message your new bot once, and get your **chat id** (e.g. open
`https://api.telegram.org/bot<TOKEN>/getUpdates` and read `chat.id`).

### 3. Push this folder to Vercel
Import the folder as a new Vercel project. No build command — it's static + `/api`.

### 4. Set environment variables (Vercel → Settings → Environment Variables)

| Variable | What it's for | Required |
|---|---|---|
| `ADMIN_PASSWORD` | Login for the admin page + gate on content writes | Yes (to edit content) |
| `KV_REST_API_URL` | Upstash REST URL | Yes (for shared content) |
| `KV_REST_API_TOKEN` | Upstash REST token | Yes (for shared content) |
| `TELEGRAM_TOKEN` | Bot token | Optional (reports) |
| `TELEGRAM_CHAT_ID` | Your chat id | Optional (reports) |
| `RESULTS_SECRET` | Shared secret protecting the report endpoint | Optional but recommended |
| `SEED_SECRET` | Guards `/api/seed` (defaults to `seed_nihongo_2024`) | Optional |

### 5. Seed the content (once)
Visit:
```
https://YOUR-APP.vercel.app/api/seed?secret=seed_nihongo_2024
```
(or your `SEED_SECRET`). This **merges** the sample packs into Upstash — it never
overwrites packs you've made, so it's safe to run again.

### 6. Lock down reports (recommended)
If you set `RESULTS_SECRET`, also open `index.html` and set the matching value:
```js
const RESULTS_SECRET = 'CHANGE_ME_to_match_env';
```
> Note: this constant is visible in client source, so it only deters casual
> abuse. That's fine here — the endpoint can only message *your* Telegram, so a
> leak means at worst some spam, which you stop by rotating the secret. If you
> leave `RESULTS_SECRET` unset, reports still work, just unauthenticated.

### 7. Confirm everything
Visit `https://YOUR-APP.vercel.app/api/debug` — you'll see which env vars are
present and how many Lesson Packs are stored.

### 8. Install the app
Open the site on the phone → browser menu → **Add to Home Screen**.

---

## Features

- **Dopamine-first home page** — Time-based greeting, animated streak flame, count-up stats, breathing continue card, coach whisper (rotating motivational messages), skeleton loading, staggered card entrances, shine sweeps, achievement toasts, XP float numbers
- **Growth tree badge system** — Visual tree (🌰→🌱→🌿→🌲→🌳) that grows/wilts based on retention + momentum. 32 badges with tooltips, leaf rewards, animated sway
- **Weak points dashboard** — Color-coded weak items with dimension tags (vocab/grammar/kanji), consecutive-wrong tracking, one-tap strengthen mode
- **Journey map** — Compact 10-per-row grid (Lessons 25→50) with difficulty dots, progress bar, and legend
- **Admin insights dashboard** — Mini stats (8 metrics), insight cards (growth, retention, momentum, weak spots, daily goals, streak power, micro-movement detection), 14-day activity heatmap, weak points detail, badge progress, Generate Test button
- **Weakness test generation** — 30-question MCQ test targeting weak points, encoded as shareable URL with timer, question navigation, and results review
- **JLPT Placement Test** — N5→N1 levels with real JLPT scoring (3 sections, 180 points, sectional + total pass marks), placement detection, study recommendations
- **MEXT Exam Practice** — Government scholarship exam simulation, 3 difficulty levels (初級/中級/上級), timed, 5 sections
- **Learning threads** — Twitter-style cultural posts (kanji secrets, grammar mysteries) with AI-generated fresh content via Gemini/Anthropic
- **Notifications** — Streak reminders, review-due alerts, daily-goal nudges (iOS 16.4+ with home-screen install)
- **PWA shortcuts** — Long-press app icon for quick actions: Continue Lesson, Flashcards, JLPT Test, My Journey
- **Dark mode** — Synced across all pages (home, roadmap, grammar reference, admin, test)
- **Offline-first** — Service worker caches all assets + Google Fonts for full offline use

## Daily use

- **Mission** — one tap. Builds itself: reviews what's due, teaches a little new
  vocab/grammar, reads a short story (with tap-to-listen TTS), then a quick recall
  check. It automatically leans on your **weakest skill**.
- **Mastery** never goes up from just opening the app — only from real reps.
- **Momentum** decays gently if you skip days (×0.85/day) instead of resetting to
  zero, so a missed day isn't a punishment.
- **Reading** and **Flashcards** are there for extra self-directed practice.
- **Journey** (roadmap) shows where you are on the ladder and projects, from your
  recent growth rate, roughly how many days to MEXT / N3 / N2 / N1.

## Adding content

Open `/admin.html`, log in with `ADMIN_PASSWORD`. Create a **Lesson Pack** (JSON)
or paste many at once in **Bulk Import**. The editor validates each pack against
the "Golden Rule" before saving (e.g. grammar needs an explanation + examples;
vocab needs an example sentence). New packs flow into everyone's app on next load.

---

## Listening / audio

Listening uses the browser's built-in Japanese **text-to-speech** (free, no audio
files). Quality depends on the device's installed `ja-JP` voice — iOS and modern
Android both ship good ones. No recordings to host for V1.

## Notes

- All learner progress is **on-device** (`localStorage`). Telegram reports are how
  you (the coach) see progress from another device; there's no cross-device sync of
  the learner's stats in V1 by design.
- Pinch-zoom is left enabled — useful for inspecting kanji.
