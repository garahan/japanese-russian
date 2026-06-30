const seed = require('./seed-data.js');

const ITEMS = { vocab: [], grammar: [], kanji: [], reading: [], listening: [], question: [] };
for (const p of seed) {
  (p.vocabulary || []).forEach(v => ITEMS.vocab.push({ ...v, dim: 'vocab' }));
  (p.questions || []).forEach(q => ITEMS.question.push({ ...q }));
  if (p.reading) {
    (p.reading.questions || []).forEach(rq => {
      ITEMS.question.push({ id: rq.id, dim: 'reading', s: rq.q, o: rq.o, c: rq.c, exp: rq.exp });
    });
  }
}

function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function difficultyOf(item) { if (item && item.difficulty) return item.difficulty; return 'medium'; }

const diff = 'easy';
const qPool = ITEMS.question;
const pick = (dim, n) => {
  let p = qPool.filter(q => q.dim === dim && difficultyOf(q) === diff);
  if (p.length < n) p = p.concat(qPool.filter(q => q.dim === dim && difficultyOf(q) !== diff));
  return shuffle(p).slice(0, n);
};

const vocabQs = pick('vocab', 6).map(q => ({ q: q.s, o: q.o, c: q.c, exp: q.exp }));
console.log('Vocab questions for N4 (easy):');
vocabQs.forEach((q, i) => {
  console.log('  Q' + (i+1) + ': ' + JSON.stringify(q.q).substring(0, 80));
  console.log('    Options:', JSON.stringify(q.o).substring(0, 120));
  console.log('    Correct:', q.c);
  if (!q.q || !q.o || q.o.length < 2 || q.c == null) {
    console.log('    *** PROBLEM: Missing data! ***');
  }
});

const grammarQs = pick('grammar', 5).map(q => ({ q: q.s, o: q.o, c: q.c }));
console.log('\nGrammar questions for N4:');
grammarQs.forEach((q, i) => {
  console.log('  Q' + (i+1) + ': ' + JSON.stringify(q.q).substring(0, 80));
  console.log('    Options:', JSON.stringify(q.o).substring(0, 120));
  if (!q.q || !q.o || q.o.length < 2 || q.c == null) {
    console.log('    *** PROBLEM: Missing data! ***');
  }
});

const kanjiQs = pick('kanji', 2).map(q => ({ q: q.s, o: q.o, c: q.c }));
console.log('\nKanji questions for N4:');
kanjiQs.forEach((q, i) => {
  console.log('  Q' + (i+1) + ': ' + JSON.stringify(q.q).substring(0, 80));
  console.log('    Options:', JSON.stringify(q.o));
  if (!q.q || !q.o || q.o.length < 2 || q.c == null) {
    console.log('    *** PROBLEM: Missing data! ***');
  }
});

// Check all questions for data integrity
const allQs = [...vocabQs, ...grammarQs, ...kanjiQs];
const bad = allQs.filter(q => !q.q || !q.o || q.o.length < 2 || q.c == null || q.c < 0 || q.c >= q.o.length);
console.log('\nBad questions:', bad.length);
if (bad.length) bad.forEach(q => console.log('  ', JSON.stringify(q).substring(0, 200)));
