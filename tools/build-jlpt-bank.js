#!/usr/bin/env node
/* ============================================================
   tools/build-jlpt-bank.js
   ------------------------------------------------------------
   Downloads MIT/CC-BY licensed JLPT vocab + kanji data,
   auto-generates thousands of MCQ questions in the app's format,
   and writes a bundled jlpt-question-bank.js file.

   Run:  node tools/build-jlpt-bank.js

   Data sources (all open-licensed):
   - elzup/jlpt-word-list  (MIT)    → vocab CSVs N5-N1
   - AnchorI/jlpt-kanji-dictionary (MIT) → kanji JSON

   Output: jlpt-question-bank.js  (global JLPT_BANK array)
   ============================================================ */

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'jlpt-question-bank.js');

const VOCAB_URLS = {
  N5: 'https://raw.githubusercontent.com/elzup/jlpt-word-list/master/src/n5.csv',
  N4: 'https://raw.githubusercontent.com/elzup/jlpt-word-list/master/src/n4.csv',
  N3: 'https://raw.githubusercontent.com/elzup/jlpt-word-list/master/src/n3.csv',
  N2: 'https://raw.githubusercontent.com/elzup/jlpt-word-list/master/src/n2.csv',
  N1: 'https://raw.githubusercontent.com/elzup/jlpt-word-list/master/src/n1.csv',
};

const KANJI_URL = 'https://raw.githubusercontent.com/AnchorI/jlpt-kanji-dictionary/main/jlpt-kanji.json';

const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

const DIFFICULTY = { N5: 'easy', N4: 'easy', N3: 'medium', N2: 'medium', N1: 'hard' };

const CAPS = { N5: 300, N4: 400, N3: 500, N2: 500, N1: 500 };

const hasKanji = (s) => /[\u4e00-\u9faf]/.test(s || '');

/* ── simple CSV parser (handles quoted fields) ── */
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (c === '\r') { /* skip */ }
      else field += c;
    }
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/* ── helpers ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(pool, correct, n) {
  const filtered = pool.filter(x => x !== correct && !x.includes(correct) && !correct.includes(x));
  return shuffle(filtered).slice(0, n);
}

function makeOptions(correct, distractors) {
  const opts = shuffle([correct, ...distractors]);
  return { o: opts, c: opts.indexOf(correct) };
}

function cleanMeaning(m) {
  return m.replace(/^"|"$/g, '').trim().split(/[;,]/)[0].trim();
}

function cleanExpression(e) {
  return e.replace(/^～/, '').trim();
}

/* ── download helper ── */
async function download(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Failed to fetch ${url}: ${r.status}`);
  return r.text();
}

async function downloadJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Failed to fetch ${url}: ${r.status}`);
  return r.json();
}

/* ── extract meaning from kanji description ── */
function extractKanjiMeaning(desc) {
  // "人 is a Japanese kanji that means person."
  // "日 is a Japanese kanji that means sun; day."
  const m = desc.match(/means\s+(.+?)\./);
  if (!m) return null;
  return m[1].split(';')[0].trim();
}

/* ── main ── */
async function main() {
  console.log('Building JLPT question bank...\n');

  // 1. Download vocab CSVs
  const vocabByLevel = {};
  for (const lvl of LEVELS) {
    console.log(`  Downloading ${lvl} vocab...`);
    const csv = await download(VOCAB_URLS[lvl]);
    const rows = parseCSV(csv);
    // skip header: expression,reading,meaning,tags
    const entries = rows.slice(1).filter(r => r.length >= 3).map(r => ({
      expression: cleanExpression(r[0]),
      reading: r[1].trim(),
      meaning: r[2] || '',
    })).filter(e => e.expression && e.reading && e.meaning);
    vocabByLevel[lvl] = entries;
    console.log(`    ${entries.length} vocab entries`);
  }

  // 2. Download kanji JSON
  console.log('\n  Downloading kanji dictionary...');
  const kanjiData = await downloadJSON(KANJI_URL);
  const kanjiByLevel = {};
  for (const lvl of LEVELS) {
    kanjiByLevel[lvl] = kanjiData
      .filter(k => k.jlpt === lvl)
      .map(k => ({ kanji: k.kanji, meaning: extractKanjiMeaning(k.description) }))
      .filter(k => k.kanji && k.meaning);
    console.log(`    ${lvl}: ${kanjiByLevel[lvl].length} kanji entries`);
  }

  // 3. Generate questions
  const allQuestions = [];
  let qid = 0;

  for (const lvl of LEVELS) {
    const vocab = vocabByLevel[lvl];
    const kanji = kanjiByLevel[lvl];
    const diff = DIFFICULTY[lvl];
    const levelQs = [];

    // Pools for distractors
    const meaningPool = vocab.map(v => cleanMeaning(v.meaning)).filter(m => m && m.length > 1);
    const readingPool = vocab.map(v => v.reading).filter(r => r);
    const exprPool = vocab.filter(v => hasKanji(v.expression)).map(v => v.expression);
    const kanjiMeaningPool = kanji.map(k => k.meaning).filter(m => m);

    // Type 1: Word → Meaning (vocab)
    for (const v of shuffle(vocab).slice(0, Math.min(vocab.length, 100))) {
      const meaning = cleanMeaning(v.meaning);
      if (!meaning || meaning.length < 2) continue;
      const dists = pickDistractors(meaningPool, meaning, 3);
      if (dists.length < 3) continue;
      const { o, c } = makeOptions(meaning, dists);
      levelQs.push({
        id: `bk_${lvl}_${++qid}`,
        dim: 'vocab', type: 'meaning',
        level: lvl, difficulty: diff,
        s: `「${v.expression}」の意味はどれですか。`,
        a: meaning,
        o, c,
        exp: `${v.expression}（${v.reading}）= ${v.meaning}`,
      });
    }

    // Type 2: Word → Reading (kanji)
    const kanjiVocab = vocab.filter(v => hasKanji(v.expression));
    for (const v of shuffle(kanjiVocab).slice(0, Math.min(kanjiVocab.length, 80))) {
      const dists = pickDistractors(readingPool, v.reading, 3);
      if (dists.length < 3) continue;
      const { o, c } = makeOptions(v.reading, dists);
      levelQs.push({
        id: `bk_${lvl}_${++qid}`,
        dim: 'kanji', type: 'reading',
        level: lvl, difficulty: diff,
        s: `「${v.expression}」の読み方は？`,
        a: v.reading,
        o, c,
        exp: `${v.expression} = ${v.reading}（${cleanMeaning(v.meaning)}）`,
      });
    }

    // Type 3: Reading → Word (kanji writing)
    for (const v of shuffle(kanjiVocab).slice(0, Math.min(kanjiVocab.length, 60))) {
      const dists = pickDistractors(exprPool, v.expression, 3);
      if (dists.length < 3) continue;
      const { o, c } = makeOptions(v.expression, dists);
      levelQs.push({
        id: `bk_${lvl}_${++qid}`,
        dim: 'kanji', type: 'kanji_writing',
        level: lvl, difficulty: diff,
        s: `「${v.reading}」を漢字で書くと？`,
        a: v.expression,
        o, c,
        exp: `${v.reading} → ${v.expression}（${cleanMeaning(v.meaning)}）`,
      });
    }

    // Type 4: Meaning → Word (vocab reverse)
    for (const v of shuffle(vocab).slice(0, Math.min(vocab.length, 60))) {
      const meaning = cleanMeaning(v.meaning);
      if (!meaning || meaning.length < 3) continue;
      const pool = vocab.map(x => x.expression);
      const dists = pickDistractors(pool, v.expression, 3);
      if (dists.length < 3) continue;
      const { o, c } = makeOptions(v.expression, dists);
      levelQs.push({
        id: `bk_${lvl}_${++qid}`,
        dim: 'vocab', type: 'meaning_reverse',
        level: lvl, difficulty: diff,
        s: `「${meaning}」という意味の単語はどれですか。`,
        a: v.expression,
        o, c,
        exp: `${v.expression}（${v.reading}）= ${v.meaning}`,
      });
    }

    // Type 5: Kanji → Meaning (from kanji dict)
    for (const k of shuffle(kanji).slice(0, Math.min(kanji.length, 60))) {
      const dists = pickDistractors(kanjiMeaningPool, k.meaning, 3);
      if (dists.length < 3) continue;
      const { o, c } = makeOptions(k.meaning, dists);
      levelQs.push({
        id: `bk_${lvl}_${++qid}`,
        dim: 'kanji', type: 'kanji_meaning',
        level: lvl, difficulty: diff,
        s: `「${k.kanji}」の漢字の意味は？`,
        a: k.meaning,
        o, c,
        exp: `${k.kanji} = ${k.meaning}`,
      });
    }

    // Cap and shuffle
    const capped = shuffle(levelQs).slice(0, CAPS[lvl]);
    allQuestions.push(...capped);
    console.log(`\n  ${lvl}: generated ${levelQs.length} questions, kept ${capped.length} (cap ${CAPS[lvl]})`);
  }

  // 4. Write output file
  const total = allQuestions.length;
  console.log(`\nTotal questions: ${total}`);

  const js = `/* jlpt-question-bank.js — auto-generated by tools/build-jlpt-bank.js
   Sources: elzup/jlpt-word-list (MIT), AnchorI/jlpt-kanji-dictionary (MIT)
   ${total} questions across N5-N1.
   DO NOT EDIT BY HAND — re-run the generator to update. */
if (typeof window !== 'undefined') window.JLPT_BANK = ${JSON.stringify(allQuestions)};
else if (typeof module !== 'undefined') module.exports = ${JSON.stringify(allQuestions)};
`;

  fs.writeFileSync(OUT, js);
  const sizeKB = Math.round(Buffer.byteLength(js, 'utf8') / 1024);
  console.log(`Written: ${path.relative(process.cwd(), OUT)} (${sizeKB} KB)`);
}

main().catch(e => { console.error(e); process.exit(1); });
