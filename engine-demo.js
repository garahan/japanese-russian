/* Run: node engine-demo.js
   Simulates realistic study so you can SEE the math: intervals lengthening,
   stages progressing, stability responding to WHEN you review, and the coach
   adapting both the daily dose and the message. Nothing here ships. */
const Memory = require('./memory-engine.js');
const Coach  = require('./Coach.js');

const DAY = 86400000;
const T0  = Date.UTC(2026, 0, 1);            // a fixed base time for reproducible output
const fmt = (n, d = 1) => (Number.isFinite(n) ? Number(n).toFixed(d) : '—');
const line = (s='') => console.log(s);

line('══════════ 1) ONE WORD, REVIEWED ON SCHEDULE ══════════');
line('Grade "good" each time it comes due. S (stability) and interval grow; the');
line('stage climbs New → … → Mastered; recall lands back on the 90% target.\n');
let st = {}, t = T0;
line('rep  S(days)   interval   stage          recall-at-review');
for (let i = 0; i < 8; i++) {
  const R = st.last ? Memory.currentR(st, t) : 1;
  st = Memory.review(st, 3, t);
  line(String(i+1).padEnd(5) + fmt(st.S).padStart(6) + '   ' +
       (st.interval+'d').padStart(7) + '    ' + Memory.stageOf(st).padEnd(14) + ' ' +
       fmt(R*100,0)+'%');
  t += st.interval * DAY;
}

line('\n══════════ 2) DESIRABLE DIFFICULTY (the spacing effect, in numbers) ══════════');
line('Same word, same "good" grade — but reviewed at different delays. Reviewing');
line('LATER (memory weaker) grows stability MORE than reviewing early.\n');
line('reviewed after   recall%   stability:  before → after');
[2, 5, 9, 14].forEach(delay => {
  let s = Memory.review({}, 3, T0);
  s = Memory.review(s, 3, s.last + s.interval*DAY);   // one on-schedule rep to settle
  const at = s.last + delay*DAY;
  const R = Memory.currentR(s, at);
  const before = s.S;
  const after = Memory.review(s, 3, at).S;
  line(`${(delay+'d').padStart(12)}      ${fmt(R*100,0).padStart(4)}%      ${fmt(before)} → ${fmt(after)} days`);
});
line('→ lower recall at review = bigger durable-memory gain. That is the engine');
line('  deliberately scheduling reviews near the forgetting edge, not before it.');

line('\n══════════ 3) A LAPSE IS GENTLE ══════════');
line('Forgetting ("again") cuts stability but not to zero — relearning is fast.\n');
let lap = Memory.review({}, 3, T0);
lap = Memory.review(lap, 3, lap.last + lap.interval*DAY);
lap = Memory.review(lap, 3, lap.last + lap.interval*DAY);
line(`before:  S=${fmt(lap.S)}d  stage=${Memory.stageOf(lap)}  next=${lap.interval}d`);
lap = Memory.review(lap, 1, lap.last + lap.interval*DAY);
line(`forgot:  S=${fmt(lap.S)}d  stage=${Memory.stageOf(lap)}  next=${lap.interval}d  (lapses=${lap.lapses})`);

line('\n══════════ 4) THE COACH SIZES THE DAY TO THE LEARNER HABIT ══════════');
line('Identical backlog. The only difference is how consistent the learner has been.');
line('Shaky habit → tiny ask (protect Ability). Solid habit → a real session.\n');
const backlog = [];
for (let i = 0; i < 40; i++) {
  let s = Memory.review({}, 3, T0 - 60*DAY);
  s = Memory.review(s, 3, s.last + s.interval*DAY);
  backlog.push({ id: 'it'+i, dim: 'vocab', state: s });
}
const NOW = T0 + 120*DAY;
const logDays = (n, end=NOW) => { const L={}; for (let i=1;i<=n;i++){ const d=new Date(end); d.setDate(d.getDate()-i); L[Coach.dayKey(d)]={items:5,minutes:5}; } return L; };
[['Procrastinating  (2/14 days)', 2], ['Building        (7/14 days)', 7], ['Consistent      (13/14 days)', 13]]
  .forEach(([label, n]) => {
    const p = Coach.planDay(backlog, { activityLog: logDays(n), momentum: n*6, now: NOW });
    line(`• ${label} → dose ${String(p.focusDose).padStart(2)}   rescueMode=${p.rescueMode}`);
  });

line('\n══════════ 5) THE COACH PICKS THE MESSAGE (state machine) ══════════');
function scenario(label, items, log, mom, now) {
  const p = Coach.planDay(items, { activityLog: log, momentum: mom, now });
  line(`• ${label}`);
  line(`    "${p.headline}" — ${p.message}`);
  line(`    rationale: ${p.principle}\n`);
}
// returning after a 4-day gap (was active before that)
const gapLog = logDays(10, NOW - 5*DAY);  // last active = 5 days ago
scenario('Back after 5 days off', backlog, gapLog, 8, NOW);
// healthy: a few due, nothing slipping
const few = backlog.slice(0, 6).map(it => ({ ...it, state: Memory.review(it.state, 4, NOW - 1*DAY) }));
scenario('On a roll, light load', few, logDays(13), 40, NOW);
// all caught up
scenario('Everything above target', [], logDays(13), 40, NOW);
