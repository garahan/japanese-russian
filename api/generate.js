// /api/generate.js — generates ONE Lesson Pack from a target list using the
// Gemini API (free tier), then returns it for the admin to validate + save.
//
// POST /api/generate   (x-admin-password)
//   body: { level, module, moduleLabel, lesson, lessonLabel,
//           targets: { vocab:[], grammar:[], kanji:[] } }
//   → { ok:true, pack:{...} }   (NOT saved — review in the admin, then add)
//
// Env: GEMINI_API_KEY (required), ADMIN_PASSWORD (gate), GEMINI_MODEL (optional).
// The key stays server-side — never put it in client source like RESULTS_SECRET.

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

// Kept identical to the harness + admin Golden Rule so generated packs pass.
const SYSTEM = `You generate JLPT study content for a personal Japanese app. Output ONE Lesson Pack as a single JSON object and NOTHING else — no markdown fences, no commentary, no trailing text.

Lesson Pack shape:
{
  "level","module","moduleLabel","lesson","lessonLabel",
  "vocabulary":[{"id","word","reading","meaning","example","exampleMeaning"}],
  "grammar":[{"id","point","explanation","examples":["日本語 — English","...","..."],"listening","production"}],
  "kanji":[{"id","char","reading","meaning","exampleWord"}],
  "reading":{"id","title","passage","targetWords":[],"targetGrammar":[],"questions":[{"id","q","o":["","","",""],"c","exp"}]},
  "listening":[{"id","audioText","a","o":["","","",""],"c","exp"}],
  "questions":[{"id","dim","type","s","a","o":["","","",""],"c","exp","linksTo"}]
}

HARD RULES (pack is rejected otherwise):
- Every vocabulary item has word, reading, meaning, AND a natural example sentence (sentence-first).
- Every grammar item has point, explanation, and at least 3 examples; also give a 'listening' sentence and a 'production' prompt.
- Every kanji item has char, reading, meaning, exampleWord.
- reading.passage must actually USE the target vocab and grammar. Give at least 5 comprehension questions. Each question has EXACTLY 4 options; "c" is the 0-based index of the correct option.
- Each listening item has audioText (the spoken Japanese line), exactly 4 options, valid "c".
- Every standalone question has exactly 4 options and a valid "c". The "dim" is one of vocab|grammar|kanji|reading|listening. If dim is vocab/grammar/kanji it MUST set "linksTo" to the id of the item it reinforces.

ID RULES (critical — the spaced-repetition engine tracks by id):
- Assign stable ids: vocab v_*, grammar g_*, kanji k_*, reading r_*, reading questions rq_*, listening l_*, quiz questions q_*.
- Every linksTo, and every entry in reading.targetWords / reading.targetGrammar, MUST be an id that exists in THIS pack.

EXAM QUALITY:
- Write exam-style distractors: similar-looking kanji, wrong particle, off-by-one politeness level, near-synonyms. Never random wrong answers.
- Keep all content at the requested JLPT level.
- Make at least 3 standalone questions, mixing dims, each linksTo a real item.`;

function buildUser(p) {
  const t = p.targets || {};
  const fmt = (a) => (a || []).filter(Boolean).map((s) => '  - ' + s).join('\n') || '  (none)';
  return `Generate a Lesson Pack.
level: ${p.level || 'N4'}
module: ${p.module || ''}   moduleLabel: ${p.moduleLabel || ''}
lesson: ${p.lesson || ''}   lessonLabel: ${p.lessonLabel || ''}

Build it around exactly these target items (add only the scaffolding — reading, listening, quiz questions — needed to teach and test them):

Vocabulary:
${fmt(t.vocab)}

Grammar points:
${fmt(t.grammar)}

Kanji:
${fmt(t.kanji)}

Return ONLY the JSON object.`;
}

const stripFences = (s) => s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'POST only' });

  if ((req.headers['x-admin-password'] || '') !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ ok: false, error: 'GEMINI_API_KEY not set' });
  }

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); }
  catch { return res.status(400).json({ ok: false, error: 'Bad JSON' }); }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ parts: [{ text: buildUser(body) }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 8000 }
      })
    });
    const j = await r.json();
    if (j.error) return res.status(502).json({ ok: false, error: j.error.message || 'API error' });

    const text = (j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] && j.candidates[0].content.parts[0].text || '').trim();
    let pack;
    try { pack = JSON.parse(stripFences(text)); }
    catch (e) { return res.status(422).json({ ok: false, error: 'Model did not return valid JSON', raw: text.slice(0, 400) }); }

    // Form metadata wins, so slugs/labels are exactly what the admin requested.
    ['level', 'module', 'moduleLabel', 'lesson', 'lessonLabel'].forEach((k) => { if (body[k]) pack[k] = body[k]; });

    return res.status(200).json({ ok: true, pack });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
