/* ============================================================
   CORE ENGINE — Japanese Mastery System
   Loaded by index.html and roadmap.html.
   Pure-ish: defines functions/objects, no DOM work at load time
   (so it can also be sanity-checked in Node).
   ============================================================ */
(function (root) {
  'use strict';

  // ---- storage (browser localStorage, or in-memory for tests) ----
  const mem = {};
  const store = (typeof localStorage !== 'undefined') ? localStorage : {
    getItem: k => (k in mem ? mem[k] : null),
    setItem: (k, v) => { mem[k] = String(v); },
    removeItem: k => { delete mem[k]; }
  };
  const DB = {
    get(k) { try { return JSON.parse(store.getItem('mnn_' + k)); } catch (e) { return null; } },
    set(k, v) { store.setItem('mnn_' + k, JSON.stringify(v)); }
  };

  // ---- tunable dials (see blueprint Appendix) ----
  const DIALS = {
    I_TARGET: 30,                 // interval (days) that counts as "mastered"
    TAU: 21,                      // forgetting time-constant for accuracy decay
    SRS_LADDER: [1, 3, 7, 14, 30, 90],
    MISS_RESET: 1,
    MOMENTUM_DECAY: 0.85,
    PROJECTION_WINDOW: 14,
    WEIGHTS: { vocab: 0.25, grammar: 0.25, reading: 0.20, listening: 0.20, kanji: 0.10 },
    UNLOCK: { mastery: 80, retention: 70 }
  };
  const DIMS = ['vocab', 'grammar', 'reading', 'listening', 'kanji'];

  // ---- date helpers (timezone-safe local key) ----
  function dateKey(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function daysBetween(aKey, bKey) {
    const a = new Date(aKey + 'T00:00:00'), b = new Date(bKey + 'T00:00:00');
    return Math.round((b - a) / 86400000);
  }

  // ---- haptics + shuffle (the "juice", preserved) ----
  function haptic(type) {
    if (typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      ({ light: () => navigator.vibrate(15),
         success: () => navigator.vibrate([15, 30, 20]),
         error: () => navigator.vibrate([40, 50, 40]),
         heavy: () => navigator.vibrate(40),
         celebrate: () => navigator.vibrate([30, 50, 30, 50, 40, 40, 80]) }[type] || (() => {}))();
    } catch (e) {}
  }
  function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  // ============================================================
  // CONTENT — flatten Lesson Packs into per-dimension item pools
  // ============================================================
  let PACKS = [];
  const ITEMS = { vocab: [], grammar: [], kanji: [], reading: [], listening: [], question: [] };
  const BY_ID = {};

  function indexContent(packs) {
    PACKS = packs || [];
    // Robustness: content saved via the admin / generate API carries module/lesson
    // labels (e.g. 'L25') but often no numeric lessonNum (or a string one). The lesson
    // UI keys off a numeric lessonNum, so coerce/derive it for every pack.
    for (const p of PACKS) {
      let ln = p.lessonNum;
      if (ln == null || ln === '' || isNaN(+ln)) {
        const m = String(p.lesson || p.module || p.lessonLabel || p.moduleLabel || p.title || '').match(/\d+/);
        ln = m ? parseInt(m[0], 10) : null;
      } else { ln = +ln; }
      if (ln != null) p.lessonNum = ln; else delete p.lessonNum;
    }
    for (const d of Object.keys(ITEMS)) ITEMS[d] = [];
    for (const k in BY_ID) delete BY_ID[k];

    for (const p of PACKS) {
      const meta = { level: p.level, module: p.module, moduleLabel: p.moduleLabel, lesson: p.lesson, lessonLabel: p.lessonLabel, lessonNum: p.lessonNum };
      (p.vocabulary || []).forEach(v => add({ ...v, dim: 'vocab', ...meta }));
      (p.grammar || []).forEach(g => add({ ...g, dim: 'grammar', ...meta }));
      (p.kanji || []).forEach(k => add({ ...k, dim: 'kanji', ...meta }));
      (p.listening || []).forEach(l => add({ ...l, dim: 'listening', ...meta }));
      // standalone questions feed the quiz pool, tagged by their own dim
      (p.questions || []).forEach(q => { const it = { ...q, ...meta }; ITEMS.question.push(it); BY_ID[it.id] = it; });
      // reading passage is an item; its comprehension questions also feed the quiz pool (dim=reading)
      if (p.reading) {
        add({ ...p.reading, dim: 'reading', ...meta });
        (p.reading.questions || []).forEach(rq => {
          const it = { id: rq.id, dim: 'reading', type: 'comprehension', s: rq.q, a: '読解 — понимание', o: rq.o, c: rq.c, exp: rq.exp, parent: p.reading.id, ...meta };
          ITEMS.question.push(it); BY_ID[it.id] = it;
        });
      }
      // listening items double as quiz questions
      (p.listening || []).forEach(l => {
        const it = { id: 'lq_' + l.id, dim: 'listening', type: 'listening', audioText: l.audioText, s: '🎧 ' + (l.a || 'Слушай и выбери'), a: 'Нажми ▶ чтобы слушать', o: l.o, c: l.c, exp: l.exp, parent: l.id, ...meta };
        ITEMS.question.push(it); BY_ID[it.id] = it;
      });
    }
    function add(it) { ITEMS[it.dim].push(it); BY_ID[it.id] = it; }
  }

  // load order: instant from cache → fallback seed → background API refresh
  const CACHE_VER = 4; // bump when seed structure changes to force cache refresh
  async function loadContent(onReady) {
    const cached = DB.get('cache_packs');
    const cachedVer = DB.get('cache_ver');
    if (cached && cached.length && cachedVer === CACHE_VER) { indexContent(cached); if (onReady) onReady('cache'); }
    else if (root.SEED_CONTENT) { indexContent(root.SEED_CONTENT); DB.set('cache_packs', root.SEED_CONTENT); DB.set('cache_ver', CACHE_VER); if (onReady) onReady('seed'); }

    try {
      const r = await fetch('/api/content?type=lessons');
      const j = await r.json();
      const packs = (j && j.data) || [];
      if (packs.length) {
        indexContent(packs);
        if (!lessonNums().length && root.SEED_CONTENT) {
          indexContent(root.SEED_CONTENT);
          DB.set('cache_packs', root.SEED_CONTENT); DB.set('cache_ver', CACHE_VER);
        } else {
          DB.set('cache_packs', packs); DB.set('cache_ver', CACHE_VER);
        }
        if (onReady) onReady('api');
      } else { throw new Error('empty response'); }
    } catch (e) {
      // API unavailable — always re-index with the latest bundled seed (includes N5+N3)
      if (root.SEED_CONTENT) { indexContent(root.SEED_CONTENT); DB.set('cache_packs', root.SEED_CONTENT); DB.set('cache_ver', CACHE_VER); if (onReady) onReady('seed'); }
    }
  }

  // ============================================================
  // UNIFIED SRS  (every answer — quiz, flashcard, listening, reading — rates the linked item)
  // quality: 1 again · 2 hard · 3 good · 4 easy
  // ============================================================
  // The scheduler now delegates to the FSRS-style Memory engine (memory-engine.js).
  // Every item carries Stability (S), Difficulty (D), Retrievability (R). Reviews
  // are timed to the ~90% recall edge — the spacing-effect sweet spot. The old
  // SM-2 ladder (ease/interval snapping) has been retired.
  function MEM() {
    if (!root.Memory) throw new Error('memory-engine.js must load before core.js');
    return root.Memory;
  }
  function getSRS() { return DB.get('srs') || {}; }
  function saveSRS(s) { DB.set('srs', s); }
  function itemState(id) {
    const s = getSRS();
    return s[id] || { S: 0, D: 0, reps: 0, lapses: 0, last: 0, lastKey: null, next: 0, attempts: 0, correct: 0 };
  }
  // quality / grade: 1 again · 2 hard · 3 good · 4 easy
  function rate(id, grade) {
    const s = getSRS();
    const next = MEM().review(s[id] || null, grade);
    next.lastKey = dateKey();
    s[id] = next; saveSRS(s);
    return next;
  }
  function isDue(id) { return MEM().isDue(getSRS()[id]); }
  function dueQuestions(limit) {
    const due = ITEMS.question.filter(q => isDue(q.id));
    return shuffle(due).slice(0, limit || 999);
  }

  // ============================================================
  // MASTERY MATH (coverage-aware) — see blueprint §3.1
  // ============================================================
  // Item mastery = durability: how close this memory is to being ~2-month-durable.
  // Driven by Stability (S) from the Memory engine — 0 when never learned, 1.0 once
  // the memory reaches the "mastered" stage (S ≥ MASTERED_S). It only climbs with
  // successful reviews and dips on a lapse, so the progress bar doesn't oscillate
  // day-to-day the way raw recall does. (Live recall is reported as retention, below.)
  function itemMastery(id) {
    const c = itemState(id);
    if (!c.attempts || !c.S) return 0;                        // never studied → 0
    return Math.min(1, c.S / MEM().CFG.MASTERED_S);
  }
  // The pool for a dimension must be exactly the ids that actually get RATED,
  // or coverage math silently caps the bar below 100%.
  //  • vocab / grammar / kanji are rated at the item level (flashcards rate the
  //    base item; linked quiz questions rate it too via q.linksTo). Pool = items.
  //  • reading / listening are rated at the QUESTION level (comprehension and
  //    audio questions rate their own id; the passage/audio item itself is never
  //    rated). Pool = those questions — never the un-rated base items, which
  //    would otherwise be dead weight pinning reading ≤75% and listening ≤50%.
  function poolForDim(dim) {
    if (dim === 'reading' || dim === 'listening') {
      return ITEMS.question.filter(i => i.dim === dim).map(i => i.id);
    }
    // vocab / grammar / kanji: base items (rated via flashcards + linked quizzes).
    // ALSO include any standalone question of this dim that has no linksTo — it
    // is rated by its own id, so it must be in the pool or it counts for nothing.
    const base = (ITEMS[dim] || []).map(i => i.id);
    const orphan = ITEMS.question.filter(i => i.dim === dim && !i.linksTo).map(i => i.id);
    return Array.from(new Set([...base, ...orphan]));
  }
  function dimMastery(dim) {
    const pool = poolForDim(dim);
    if (!pool.length) return null;
    const sum = pool.reduce((s, id) => s + itemMastery(id), 0);
    return Math.round((sum / pool.length) * 100);
  }
  function overallMastery() {
    let total = 0, wsum = 0;
    for (const d of DIMS) {
      const m = dimMastery(d);
      if (m === null) continue;
      total += DIALS.WEIGHTS[d] * m; wsum += DIALS.WEIGHTS[d];
    }
    return wsum ? Math.round(total / wsum) : 0;
  }
  // Retention: right now, of everything she has learned, how much can she still
  // recall? = mean current Retrievability (R) across items with ≥1 rep. This is the
  // live "is my memory healthy today" number — it dips as reviews fall due and snaps
  // back up when she clears them.
  function retention() {
    const s = getSRS(); const ids = Object.keys(s).filter(id => s[id].attempts > 0);
    if (!ids.length) return null;
    const M = MEM();
    const sum = ids.reduce((acc, id) => acc + M.currentR(s[id]), 0);
    return Math.round((sum / ids.length) * 100);
  }

  // ============================================================
  // GROWTH SNAPSHOTS + heatmap data
  // ============================================================
  function snapshots() { return DB.get('mastery_snaps') || {}; }
  function snapshotToday() {
    const snaps = snapshots(); const k = dateKey();
    snaps[k] = overallMastery(); DB.set('mastery_snaps', snaps); return snaps;
  }
  function growthToday() {
    const snaps = snapshots(); const today = dateKey();
    if (snaps[today] == null) return 0;
    // compare to the most recent PRIOR active day (snapshots only exist on days
    // studied), so a gap day before today doesn't force this to read 0.
    const prior = Object.keys(snaps).filter(k => k < today).sort();
    if (!prior.length) return 0;
    return +(snaps[today] - snaps[prior[prior.length - 1]]).toFixed(1);
  }
  function growthRate() { // avg daily Overall growth across the window (active days)
    const snaps = snapshots(); const keys = Object.keys(snaps).sort();
    if (keys.length < 2) return 0.1;
    const recent = keys.slice(-DIALS.PROJECTION_WINDOW);
    let deltas = [];
    for (let i = 1; i < recent.length; i++) { const d = snaps[recent[i]] - snaps[recent[i - 1]]; if (d > 0) deltas.push(d); }
    if (!deltas.length) return 0.1;
    return Math.max(0.05, deltas.reduce((a, b) => a + b, 0) / deltas.length);
  }
  function daysToReady(targetMastery) {
    const gap = (targetMastery || DIALS.UNLOCK.mastery) - overallMastery();
    if (gap <= 0) return 0;
    return Math.ceil(gap / growthRate());
  }

  // ============================================================
  // ACTIVITY LOG (drives the study heatmap)
  // ============================================================
  function activityLog() { return DB.get('activity_log') || {}; }
  function logActivity(units, minutes) {
    const log = activityLog(); const k = dateKey();
    const e = log[k] || { items: 0, minutes: 0 };
    e.items += units || 0; e.minutes += minutes || 0; log[k] = e;
    DB.set('activity_log', log);
    // Time-based badge tracking
    const h = new Date().getHours();
    if (h >= 22 || h < 2) DB.set('night_owl', true);
    if (h >= 4 && h < 7) DB.set('early_bird', true);
  }

  // ============================================================
  // MOMENTUM (replaces streak — gentle decay, never resets to 0)
  // ============================================================
  function getMomentum() {
    const m = DB.get('momentum') || { value: 0, lastDate: null };
    const today = dateKey();
    if (m.lastDate && m.lastDate !== today) {
      const gap = Math.max(0, daysBetween(m.lastDate, today));
      if (gap > 0) { m.value = Math.round(m.value * Math.pow(DIALS.MOMENTUM_DECAY, gap)); }
    }
    return m;
  }
  function bumpMomentum(gain) {
    const m = getMomentum(); const today = dateKey();
    m.value = Math.min(100, m.value + (gain || 8));
    m.lastDate = today; DB.set('momentum', m); return m.value;
  }

  // ============================================================
  // SMART DAILY MISSION  (deterministic — blueprint keystone)
  // ============================================================
  function weakestDim() {
    let worst = null, worstVal = 999;
    for (const d of DIMS) { const m = dimMastery(d); if (m !== null && m < worstVal) { worstVal = m; worst = d; } }
    return worst || 'reading';
  }
  function unseen(dim) {
    return (ITEMS[dim] || []).filter(i => itemState(i.id).attempts === 0);
  }
  function pickStory() {
    const stories = ITEMS.reading;
    if (!stories.length) return null;
    // The passage item itself is never rated, so judge recency by the most
    // recent answer among its own comprehension questions → rotate fairly.
    const lastTouch = (st) => ITEMS.question
      .filter(q => q.parent === st.id)
      .reduce((mx, q) => Math.max(mx, itemState(q.id).last || 0), 0);
    return stories.slice().sort((a, b) => lastTouch(a) - lastTouch(b))[0];
  }
  // ---- Coach: ask the behaviour engine how big today's session should be ----
  // Assembles every learnable item with its memory state, then lets Coach.planDay
  // (Fogg B=MAP) decide the dose and the message. Returns null if Coach not loaded.
  function coachItems() {
    const s = getSRS();
    const out = [];
    for (const d of ['vocab', 'grammar', 'kanji']) {
      (ITEMS[d] || []).forEach(it => out.push({ id: it.id, dim: d, state: s[it.id] || null }));
    }
    ITEMS.question.filter(q => q.dim === 'reading' || q.dim === 'listening')
      .forEach(q => out.push({ id: q.id, dim: q.dim, state: s[q.id] || null }));
    return out;
  }
  function coachPlan() {
    if (!root.Coach) return null;
    return root.Coach.planDay(coachItems(), {
      activityLog: activityLog(),
      momentum: getMomentum().value
    });
  }

  function buildMission() {
    const focus = weakestDim();
    const plan = coachPlan();                       // Coach decides today's dose + message
    const rescueMode = !!(plan && plan.rescueMode);
    const dose = plan ? plan.focusDose : 12;
    const reviewCap = rescueMode ? Math.max(3, Math.round(dose * 0.7)) : dose;

    // weakness attack: surface due reviews from the focus dimension first, capped to the dose
    const allDue = dueQuestions(99);
    const due = [...allDue.filter(q => q.dim === focus), ...allDue.filter(q => q.dim !== focus)].slice(0, reviewCap);

    // new chunk: scaled down on shaky days so a low-motivation session stays tiny
    const newBudget = rescueMode ? 1 : 3;
    const newVocab = unseen('vocab').slice(0, Math.min(2, newBudget));
    const newGrammar = unseen('grammar').slice(0, Math.max(0, newBudget - newVocab.length));
    const newKanji = (focus === 'kanji' && !rescueMode) ? unseen('kanji').slice(0, 2) : [];

    const story = pickStory();
    // recall: skewed toward the focus dimension
    const focusQs = shuffle(ITEMS.question.filter(q => q.dim === focus));
    const otherQs = shuffle(ITEMS.question.filter(q => q.dim !== focus));
    const recall = [...focusQs.slice(0, 3), ...otherQs.slice(0, 2)].slice(0, 5);
    const estMin = 5 + (newVocab.length + newGrammar.length + newKanji.length) * 2 + 8 + 3 + recall.length;
    return {
      focus, due, newVocab, newGrammar, newKanji, story, recall, estMin,
      coach: plan ? { headline: plan.headline, message: plan.message, rescueMode } : null,
      rescue: plan ? plan.rescue : []
    };
  }

  // ============================================================
  // LESSON PROGRESS — track 5 steps per MnN lesson
  // Steps: 'vocab' | 'grammar' | 'reading' | 'quiz' | 'write'
  // ============================================================
  const LESSON_STEPS = ['vocab','grammar','reading','quiz','write'];

  function getLessonByNum(n) {
    return PACKS.find(p => p.lessonNum === n) || null;
  }
  function getLessonProgress(n) {
    return DB.get('lp_' + n) || { steps: [] };
  }
  function markLessonStep(n, step) {
    const p = getLessonProgress(n);
    if (!p.steps.includes(step)) p.steps.push(step);
    if (LESSON_STEPS.every(s => p.steps.includes(s))) {
      p.completedAt = dateKey();
      seedLessonIntoDrills(n);
    }
    DB.set('lp_' + n, p);
    logActivity(1, 3);
    bumpMomentum(5);
  }
  function isLessonComplete(n) {
    const p = getLessonProgress(n);
    return LESSON_STEPS.every(s => p.steps.includes(s));
  }
  function lessonNums() {
    return PACKS.map(p => p.lessonNum).filter(Boolean).sort((a, b) => a - b);
  }
  function isLessonUnlocked(n) {
    const nums = lessonNums();
    if (!nums.length || n <= nums[0]) return true;        // first available lesson is always open
    const prev = nums.filter(x => x < n).pop();            // previous EXISTING lesson
    return prev == null ? true : isLessonComplete(prev);
  }

  // Which lesson a content item belongs to, and how hard that lesson is.
  function lessonOf(item) {
    if (!item) return null;
    return PACKS.find(p =>
      (item.lesson && p.lesson === item.lesson) ||
      (item.module && p.module === item.module) ||
      (item.lessonNum && p.lessonNum === item.lessonNum)) || null;
  }
  function difficultyOf(item) {
    if (item && item.difficulty) return item.difficulty;   // explicit per-item difficulty wins
    const p = lessonOf(item);
    return (p && p.difficulty) || 'medium';
  }

  // ============================================================
  // DRILL ENGINE — standalone SRS flashcard system
  // Separate from quiz SRS so drills can be both directions
  // Grades: 1=again 2=hard 3=good 4=easy
  // ============================================================
  const DRILL_DAILY_CAP = 50;

  function drillGet(cardId) {
    try { return JSON.parse(store.getItem('mnn_d_' + cardId)); } catch(e) { return null; }
  }
  function drillSet(cardId, data) {
    store.setItem('mnn_d_' + cardId, JSON.stringify(data));
  }
  function drillIsDue(cardId) {
    const r = drillGet(cardId);
    if (!r) return true; // new card
    return MEM().isDue(r);
  }
  function rateDrill(cardId, grade) {
    const next = MEM().review(drillGet(cardId), grade);   // 1 again·2 hard·3 good·4 easy
    next.lastReviewed = dateKey();
    drillSet(cardId, next);
    logActivity(1, 1); bumpMomentum(2);
  }

  function getDrillPool() {
    const pool = [];
    for (const pack of PACKS) {
      if (!pack.lessonNum || !isLessonComplete(pack.lessonNum)) continue;
      (pack.vocabulary  || []).forEach(v => {
        pool.push({ id:'jpen_'+v.id, type:'vocab-jpen', item:v, lesson:pack.lessonNum, pack });
        pool.push({ id:'enjp_'+v.id, type:'vocab-enjp', item:v, lesson:pack.lessonNum, pack });
      });
      (pack.grammar || []).forEach(g => {
        pool.push({ id:'gram_'+g.id, type:'grammar', item:g, lesson:pack.lessonNum, pack });
      });
      (pack.kanji   || []).forEach(k => {
        pool.push({ id:'kan_'+k.id, type:'kanji', item:k, lesson:pack.lessonNum, pack });
      });
    }
    return pool;
  }

  function seedLessonIntoDrills(n) {
    // Mark all cards for this lesson as "seeded" so they appear in the pool.
    // Actual SRS records are created lazily on first rating.
    DB.set('drill_seeded_'+n, true);
  }

  function getDrillDue(cap) {
    cap = cap || DRILL_DAILY_CAP;
    const M = MEM();
    const pool = getDrillPool();
    const dueCards = [], newCards = [];
    for (const card of pool) {
      const rec = drillGet(card.id);
      if (!rec) { newCards.push(card); continue; }
      if (M.isDue(rec)) dueCards.push(card);
    }
    // most-urgent (closest to being forgotten) first
    dueCards.sort((a, b) => M.urgency(drillGet(b.id)) - M.urgency(drillGet(a.id)));
    const result = dueCards.slice(0, cap);
    const remaining = Math.max(0, cap - result.length);
    result.push(...shuffle(newCards).slice(0, remaining));
    return result;
  }

  function getDrillDueCount() { return getDrillDue().length; }

  function getDrillStats() {
    const pool = getDrillPool();
    const M = MEM();
    let due = 0, total = pool.length, rSum = 0, ratedCount = 0;
    for (const card of pool) {
      const rec = drillGet(card.id);
      if (!rec) { due++; continue; }
      if (M.isDue(rec)) due++;
      if (rec.reps > 0) { rSum += M.currentR(rec); ratedCount++; }
    }
    return { due, total, retention: ratedCount ? Math.round((rSum / ratedCount) * 100) : null };
  }

  // Streak: consecutive days with any lesson step or drill card rated
  function getStreak() {
    const log = activityLog();
    const keys = Object.keys(log).sort().reverse();
    if (!keys.length) return 0;
    let streak = 0, cursor = new Date();
    for (const k of keys) {
      const kDate = new Date(k + 'T00:00:00');
      const diff = Math.round((new Date(dateKey()+'T00:00:00') - kDate) / 86400000);
      if (diff === streak) streak++;
      else break;
    }
    return streak;
  }

  // Previous lesson questions for interleaving in quiz step
  function getPrevLessonQuestions(lessonNum, n) {
    const qs = [];
    for (const pack of PACKS) {
      if (!pack.lessonNum || pack.lessonNum >= lessonNum || !isLessonComplete(pack.lessonNum)) continue;
      qs.push(...(pack.questions || []));
    }
    return shuffle(qs).slice(0, n || 2);
  }

  // ============================================================
  // XP & LEVEL SYSTEM
  // ============================================================
  function getXP() { return DB.get('xp') || { total: 0, level: 1, todayXP: 0, lastDate: null }; }
  function xpForLevel(lv) { return Math.round(100 * (lv - 1) * lv / 2); }
  function levelForXP(total) {
    let lv = 1;
    while (xpForLevel(lv + 1) <= total) lv++;
    return lv;
  }
  function levelProgress() {
    const xp = getXP();
    const lv = xp.level || levelForXP(xp.total);
    const cur = xpForLevel(lv);
    const next = xpForLevel(lv + 1);
    const pct = next > cur ? Math.round((xp.total - cur) / (next - cur) * 100) : 100;
    return { level: lv, total: xp.total, intoLevel: xp.total - cur, levelSpan: next - cur, pct, toNext: next - xp.total };
  }
  function addXP(amount) {
    const xp = getXP();
    const today = dateKey();
    if (xp.lastDate !== today) { xp.todayXP = 0; xp.lastDate = today; }
    xp.total += amount;
    xp.todayXP += amount;
    const newLevel = levelForXP(xp.total);
    const leveledUp = newLevel > xp.level;
    xp.level = newLevel;
    DB.set('xp', xp);
    return { amount, total: xp.total, level: xp.level, leveledUp, todayXP: xp.todayXP };
  }

  // ============================================================
  // STREAK WITH FREEZE / GRACE DAY
  // ============================================================
  function getStreakData() { return DB.get('streak_v2') || { count: 0, longest: 0, freezes: 1, lastDate: null, freezeUsed: {} }; }
  function updateStreak() {
    const s = getStreakData();
    const today = dateKey();
    if (s.lastDate === today) return s;
    if (s.lastDate) {
      const gap = daysBetween(s.lastDate, today);
      if (gap === 1) { s.count++; }
      else if (gap === 2 && s.freezes > 0) { s.freezes--; s.freezeUsed[today] = true; s.count++; }
      else if (gap > 2 || s.freezes === 0) { s.count = 1; }
      // Track comeback after 7+ day gap
      if (gap >= 7) DB.set('comeback_king', true);
    } else { s.count = 1; }
    s.lastDate = today;
    // Earn a freeze every 7 consecutive days (max 2)
    if (s.count > 0 && s.count % 7 === 0 && s.freezes < 2) s.freezes++;
    if (s.count > s.longest) s.longest = s.count;
    DB.set('streak_v2', s);
    return s;
  }

  // ============================================================
  // WEAK-POINT ENGINE — track wrong answers, rank weak items
  // ============================================================
  function getWeakLog() { return DB.get('weak_log') || {}; }
  function logWrong(id, dim, ctx) {
    const wl = getWeakLog();
    const e = wl[id] || { count: 0, dim, lastWrong: 0, consecutive: 0, history: [] };
    e.count++; e.consecutive++; e.dim = dim || e.dim; e.lastWrong = Date.now();
    if (ctx) {
      e.history = (e.history || []).slice(-9).concat({ t: Date.now(), lesson: ctx.lesson || null, type: ctx.type || null });
    }
    wl[id] = e; DB.set('weak_log', wl);
  }
  function clearWeak(id) {
    const wl = getWeakLog();
    if (wl[id]) { wl[id].consecutive = 0; DB.set('weak_log', wl); }
  }
  function getWeakItems(limit) {
    const wl = getWeakLog();
    const srs = getSRS();
    const entries = Object.entries(wl)
      .filter(([id, e]) => e.consecutive > 0 && BY_ID[id])
      .map(([id, e]) => {
        const st = srs[id] || {};
        const mastery = itemMastery(id);
        const recencyDays = (Date.now() - e.lastWrong) / 86400000;
        const score = e.consecutive * 3 + (10 - mastery / 10) + Math.max(0, 5 - recencyDays);
        return { id, dim: e.dim, wrongCount: e.count, consecutive: e.consecutive, mastery, score, item: BY_ID[id] };
      })
      .sort((a, b) => b.score - a.score);
    return entries.slice(0, limit || 20);
  }
  function weakCount() { return Object.values(getWeakLog()).filter(e => e.consecutive > 0).length; }

  // ============================================================
  // DAILY GOAL RING
  // ============================================================
  function getDailyGoal() { return DB.get('daily_goal') || { target: 10, current: 0, date: null }; }
  function setDailyGoal(target) { const g = getDailyGoal(); g.target = target; DB.set('daily_goal', g); }
  function progressDailyGoal(n) {
    const g = getDailyGoal(); const today = dateKey();
    if (g.date !== today) { g.current = 0; g.date = today; }
    g.current += n || 1;
    DB.set('daily_goal', g);
    return g;
  }
  function isDailyGoalDone() { const g = getDailyGoal(); return g.date === dateKey() && g.current >= g.target; }
  function dailyGoalPct() { const g = getDailyGoal(); if (g.date !== dateKey()) return 0; return Math.min(100, Math.round(g.current / g.target * 100)); }

  // ============================================================
  // REVIEW CAPS (anti-avalanche for returning users)
  // ============================================================
  const REVIEW_CAP = 30;
  function getCappedDue(limit) {
    const M = MEM();
    const allDue = ITEMS.question.filter(q => isDue(q.id));
    // Sort by urgency (most at-risk first)
    allDue.sort((a, b) => M.urgency(itemState(b.id)) - M.urgency(itemState(a.id)));
    return allDue.slice(0, limit || REVIEW_CAP);
  }

  // ============================================================
  // STRENGTHEN MODE — drill weakest items until accuracy recovers
  // ============================================================
  function getStrengthenCards(limit) {
    const weak = getWeakItems(limit || 15);
    return weak.map(w => {
      const it = BY_ID[w.id];
      if (!it) return null;
      return Object.assign({}, it, { _weak: true, _weakScore: w.score });
    }).filter(Boolean);
  }

  // ============================================================
  // CONSECUTIVE-CORRECT MASTERY GATING
  // MCQ has 25% chance of lucky guess. Require consecutive correct
  // + production answers before an item counts as truly mastered.
  // ============================================================
  function getConsecutiveCorrect(id) {
    const cc = DB.get('consecutive_correct') || {};
    return cc[id] || 0;
  }
  function bumpConsecutiveCorrect(id, correct) {
    const cc = DB.get('consecutive_correct') || {};
    if (correct) cc[id] = (cc[id] || 0) + 1;
    else cc[id] = 0;
    DB.set('consecutive_correct', cc);
    return cc[id];
  }
  function isReliablyMastered(id) {
    return itemMastery(id) >= 80 && getConsecutiveCorrect(id) >= 3;
  }

  // ============================================================
  // VARIABLE BONUS REWARDS (occasional surprise XP)
  // ============================================================
  function maybeBonus() {
    // ~12% chance of a bonus on any correct answer
    if (Math.random() < 0.12) {
      const bonuses = [5, 10, 15, 20, 25];
      const amt = bonuses[Math.floor(Math.random() * bonuses.length)];
      return { amount: amt, label: '🎁 Счастливый бонус!' };
    }
    return null;
  }

  // ============================================================
  // BADGE / MILESTONE SYSTEM
  // ============================================================
  function getBadges() { return DB.get('badges') || {}; }

  const BADGE_LIST = [
    { id: 'first_steps', icon: '🌱', title: 'Первые шаги', desc: 'Изучи первые 5 элементов', check: (ctx) => ctx.learned >= 5 },
    { id: 'first_lesson', icon: '📚', title: 'Первый урок', desc: 'Заверши первый урок', check: (ctx) => ctx.lessonNums.some(n => isLessonComplete(n)) },
    { id: 'momentum_30', icon: '⚡', title: 'Заряжена', desc: 'Достигни импульса 30', check: (ctx) => ctx.mom >= 30 },
    { id: 'streak_7', icon: '🔥', title: 'Воин недели', desc: 'Стрик 7 дней', check: (ctx) => ctx.streak.count >= 7 },
    { id: 'streak_30', icon: '🏆', title: 'Несокрушимая', desc: 'Стрик 30 дней', check: (ctx) => ctx.streak.count >= 30 },
    { id: 'items_50', icon: '🧠', title: 'Полсотни', desc: 'Изучи 50 элементов', check: (ctx) => ctx.learned >= 50 },
    { id: 'items_100', icon: '💯', title: 'Сто элементов', desc: 'Изучи 100 элементов', check: (ctx) => ctx.learned >= 100 },
    { id: 'mastered_25', icon: '✨', title: 'Хранитель памяти', desc: 'Освой 25 элементов', check: (ctx) => ctx.mastered >= 25 },
    { id: 'mastered_50', icon: '🌟', title: 'Мастер памяти', desc: 'Освой 50 элементов', check: (ctx) => ctx.mastered >= 50 },
    { id: 'mastery_50', icon: '🎯', title: 'На полпути', desc: 'Достигни 50% общего освоения', check: (ctx) => ctx.overall >= 50 },
    { id: 'mastery_80', icon: '👑', title: 'Мастер знаний', desc: 'Достигни 80% общего освоения', check: (ctx) => ctx.overall >= 80 },
    { id: 'level_5', icon: '🎖️', title: 'Восходящая звезда', desc: 'Достигни уровня 5', check: (ctx) => ctx.xp.level >= 5 },
    { id: 'level_10', icon: '🏅', title: 'Ученица', desc: 'Достигни уровня 10', check: (ctx) => ctx.xp.level >= 10 },
    { id: 'exam_a', icon: '📝', title: 'Тест: новичок', desc: 'Сдай тест уровня A', check: () => !!DB.get('exam_pass_A') },
    { id: 'exam_b', icon: '📑', title: 'Тест: претендент', desc: 'Сдай тест уровня B', check: () => !!DB.get('exam_pass_B') },
    { id: 'exam_c', icon: '📜', title: 'Тест: победитель', desc: 'Сдай тест уровня C', check: () => !!DB.get('exam_pass_C') },
    { id: 'streak_3', icon: '🌼', title: 'Начало пути', desc: 'Стрик 3 дня', check: (ctx) => ctx.streak.count >= 3 },
    { id: 'streak_14', icon: '🌿', title: 'Две недели', desc: 'Стрик 14 дней', check: (ctx) => ctx.streak.count >= 14 },
    { id: 'streak_60', icon: '💎', title: 'Алмазный ум', desc: 'Стрик 60 дней', check: (ctx) => ctx.streak.count >= 60 },
    { id: 'items_200', icon: '🧩', title: 'Словесный кузнец', desc: 'Изучи 200 элементов', check: (ctx) => ctx.learned >= 200 },
    { id: 'mastered_100', icon: '🏆', title: 'Мастер ста', desc: 'Освой 100 элементов', check: (ctx) => ctx.mastered >= 100 },
    { id: 'mastery_25', icon: '🌾', title: 'Росток', desc: 'Достигни 25% общего освоения', check: (ctx) => ctx.overall >= 25 },
    { id: 'mastery_100', icon: '🦁', title: 'Лев учения', desc: 'Достигни 100% общего освоения', check: (ctx) => ctx.overall >= 100 },
    { id: 'level_15', icon: '🎓', title: 'Выпускница', desc: 'Достигни уровня 15', check: (ctx) => ctx.xp.level >= 15 },
    { id: 'level_20', icon: '🦉', title: 'Мудрец', desc: 'Достигни уровня 20', check: (ctx) => ctx.xp.level >= 20 },
    { id: 'retention_90', icon: '🌳', title: 'Глубокие корни', desc: '90% удержания', check: () => { const r = retention(); return r != null && r >= 90; } },
    { id: 'retention_75', icon: '🌲', title: 'Вечнозелёная', desc: '75% удержания', check: () => { const r = retention(); return r != null && r >= 75; } },
    { id: 'perfect_session', icon: '🎯', title: 'Безупречно', desc: '100% на сессии из 10+', check: () => !!DB.get('perfect_session') },
    { id: 'speed_demon', icon: '⚡', title: 'Молния', desc: '20 ответов за 3 минуты', check: () => !!DB.get('speed_demon') },
    { id: 'comeback_king', icon: '🔄', title: 'Возвращение', desc: 'Вернись после перерыва 7+ дней', check: () => !!DB.get('comeback_king') },
    { id: 'night_owl', icon: '🦇', title: 'Ночная сова', desc: 'Занимайся после 22:00', check: () => !!DB.get('night_owl') },
    { id: 'early_bird', icon: '🐦', title: 'Жаворонок', desc: 'Занимайся до 7:00', check: () => !!DB.get('early_bird') },
  ];

  function checkBadges() {
    const earned = getBadges();
    const newly = [];
    const ctx = {
      xp: getXP(), streak: getStreakData(),
      learned: Object.values(getSRS()).filter(s => s.reps > 0).length,
      mastered: Object.keys(getSRS()).filter(id => itemMastery(id) >= 80).length,
      overall: overallMastery(), mom: getMomentum().value,
      lessonNums: lessonNums(),
    };

    for (const b of BADGE_LIST) {
      if (!earned[b.id] && b.check(ctx)) {
        earned[b.id] = { icon: b.icon, title: b.title, desc: b.desc, date: dateKey() };
        newly.push(b);
      }
    }
    if (newly.length) DB.set('badges', earned);
    return { earned, newly };
  }

  // ============================================================
  // ADAPTIVE DIFFICULTY — pick questions near the learner's edge
  // ============================================================
  function adaptiveDifficulty() {
    const overall = overallMastery();
    if (overall < 20) return 'easy';
    if (overall < 50) return 'medium';
    if (overall < 75) return 'medium';
    return 'hard';
  }
  function pickAdaptiveQuestions(pool, n) {
    const target = adaptiveDifficulty();
    const match = pool.filter(q => difficultyOf(q) === target);
    const rest = pool.filter(q => difficultyOf(q) !== target);
    // 70% at target difficulty, 30% mixed (interleaving)
    const matchN = Math.min(match.length, Math.ceil(n * 0.7));
    const restN = Math.min(rest.length, n - matchN);
    return [...shuffle(match).slice(0, matchN), ...shuffle(rest).slice(0, restN)];
  }

  // ============================================================
  // DATA EXPORT / IMPORT
  // ============================================================
  function exportData() {
    const keys = [];
    try {
      for (let i = 0; i < store.length; i++) {
        const k = store.key(i);
        if (k && k.startsWith('mnn_')) keys.push(k);
      }
    } catch (e) {}
    const data = {};
    keys.forEach(k => { try { data[k] = store.getItem(k); } catch (e) {} });
    return { exportedAt: dateKey(), version: 2, data };
  }
  function importData(json) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    if (!obj || !obj.data) throw new Error('Неверный формат резервной копии');
    for (const k in obj.data) {
      try { store.setItem(k, obj.data[k]); } catch (e) {}
    }
    return Object.keys(obj.data).length;
  }

  // ============================================================
  // SETTINGS
  // ============================================================
  function getSettings() { return DB.get('settings') || { sound: true, haptics: true, furigana: 'off', darkMode: false }; }
  function setSettings(s) { const cur = getSettings(); Object.assign(cur, s); DB.set('settings', cur); return cur; }

  // ============================================================
  // COMBO SYSTEM (upgraded — multiplier + XP bonus)
  // ============================================================
  function comboMultiplier(combo) {
    if (combo < 3) return 1;
    if (combo < 6) return 1.5;
    if (combo < 10) return 2;
    if (combo < 15) return 3;
    return 4;
  }

  // ============================================================
  // FLOW STATE ENGINE — keeps learner in the optimal zone
  // between boredom (too easy) and anxiety (too hard).
  //
  // Based on Csikszentmihalyi's flow theory + the same variable-
  // ratio reinforcement principle that makes TikTok addictive:
  //   1. Real-time difficulty adjustment (~75% accuracy target)
  //   2. Response-time tracking (fast+correct = ramp up, slow+wrong = ease)
  //   3. Frustration detection → insert "relief" question
  //   4. Autopilot detection → insert "challenge" question
  //   5. Variable reward density (strategic, not just random)
  //   6. Near-miss detection for "so close!" feedback
  // ============================================================
  const FLOW = {
    TARGET_MIN: 0.65,
    TARGET_MAX: 0.85,
    TARGET_IDEAL: 0.75,
    FAST: 3000,
    SLOW: 10000,
    FRUSTRATION_STREAK: 3,
    AUTOPILOT_STREAK: 7,
    RAMP_SPEED: 18,
  };

  function getFlowState() {
    return DB.get('flow_state') || {
      responses: [],
      currentAccuracy: null,
      currentDifficulty: 'medium',
      consecutiveWrong: 0,
      consecutiveRight: 0,
      flowScore: 50,
      totalReviews: 0,
      sessionStartTime: null,
      lastResponseTime: null,
    };
  }

  function startFlowSession() {
    const f = getFlowState();
    f.responses = [];
    f.consecutiveWrong = 0;
    f.consecutiveRight = 0;
    f.sessionStartTime = Date.now();
    DB.set('flow_state', f);
    return f;
  }

  function recordFlowResponse(correct, timeMs, difficulty, dim) {
    const f = getFlowState();
    f.responses.push({ correct: correct ? 1 : 0, time: timeMs, difficulty, dim, ts: Date.now() });
    f.totalReviews++;
    f.lastResponseTime = timeMs;

    if (correct) { f.consecutiveRight++; f.consecutiveWrong = 0; }
    else { f.consecutiveWrong++; f.consecutiveRight = 0; }

    // Rolling accuracy (last 8 responses)
    const recent = f.responses.slice(-8);
    f.currentAccuracy = recent.filter(r => r.correct).length / recent.length;

    // Flow score: 0 = anxiety, 50 = flow, 100 = boredom
    if (f.currentAccuracy > FLOW.TARGET_MAX) {
      f.flowScore = Math.min(100, f.flowScore + FLOW.RAMP_SPEED);
    } else if (f.currentAccuracy < FLOW.TARGET_MIN) {
      f.flowScore = Math.max(0, f.flowScore - FLOW.RAMP_SPEED);
    } else {
      // In the zone — pull toward center
      f.flowScore += (50 - f.flowScore) * 0.1;
    }

    // Response time influence: fast+correct = confident, ramp up
    if (correct && timeMs < FLOW.FAST && f.consecutiveRight >= 2) {
      f.flowScore = Math.min(100, f.flowScore + 5);
    }
    // Slow+wrong = struggling, ease down
    if (!correct && timeMs > FLOW.SLOW) {
      f.flowScore = Math.max(0, f.flowScore - 8);
    }

    // Map flow score to difficulty
    if (f.flowScore > 68) f.currentDifficulty = 'hard';
    else if (f.flowScore > 32) f.currentDifficulty = 'medium';
    else f.currentDifficulty = 'easy';

    DB.set('flow_state', f);
    return f;
  }

  function flowNeedsRelief() {
    const f = getFlowState();
    return f.consecutiveWrong >= FLOW.FRUSTRATION_STREAK;
  }

  function flowNeedsChallenge() {
    const f = getFlowState();
    return f.consecutiveRight >= FLOW.AUTOPILOT_STREAK;
  }

  function flowTargetDifficulty() {
    const f = getFlowState();
    if (flowNeedsRelief()) return 'easy';
    if (flowNeedsChallenge()) return 'hard';
    return f.currentDifficulty;
  }

  // Pick the next question from a pool based on flow state
  function flowPickNext(pool) {
    const target = flowTargetDifficulty();
    const remaining = pool.filter(q => !q._used);
    if (!remaining.length) return null;

    // 80% chance: pick from target difficulty
    // 20% chance: pick from any (variety + novelty)
    if (Math.random() < 0.8) {
      const match = remaining.filter(q => difficultyOf(q) === target);
      if (match.length) return shuffle(match)[0];
    }
    return shuffle(remaining)[0];
  }

  // Build a flow-optimized session from a pool
  function flowBuildSession(pool, n) {
    startFlowSession();
    const session = [];
    const poolCopy = pool.map(q => ({ ...q, _used: false }));
    for (let i = 0; i < n; i++) {
      const q = flowPickNext(poolCopy);
      if (!q) break;
      q._used = true;
      session.push(q);
    }
    return session;
  }

  // Near-miss detection: was the wrong answer "close"?
  // Returns true if the chosen option shares key characters/meaning with the correct one
  function isNearMiss(chosen, correct, options) {
    if (chosen === correct) return false;
    const a = String(options[chosen] || '').trim();
    const b = String(options[correct] || '').trim();
    if (!a || !b) return false;
    // Same length and differ by 1-2 characters (Japanese: similar kanji/reading)
    if (a.length === b.length && a.length > 0) {
      let diffs = 0;
      for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diffs++;
      if (diffs <= 2 && diffs > 0) return true;
    }
    // One is a substring of the other
    if (a.length > 2 && b.length > 2 && (a.includes(b) || b.includes(a))) return true;
    // Share first 2+ characters
    if (a.length >= 2 && b.length >= 2 && a.slice(0, 2) === b.slice(0, 2)) return true;
    return false;
  }

  // Enhanced variable reward: strategic, not just random
  function flowBonus(context) {
    const f = getFlowState();
    // After frustration streak → relief bonus (celebrate recovery)
    if (f.consecutiveRight === 1 && f.consecutiveWrong >= 3) {
      return { amount: 15, label: '💪 Бонус возвращения!' };
    }
    // After a challenge question correct → jackpot
    if (f.consecutiveRight >= 5 && f.flowScore > 60) {
      if (Math.random() < 0.25) {
        return { amount: 30, label: '🔥 На огне!' };
      }
    }
    // Random surprise (variable ratio)
    if (Math.random() < 0.10) {
      const bonuses = [5, 10, 15, 20, 25];
      const amt = bonuses[Math.floor(Math.random() * bonuses.length)];
      return { amount: amt, label: '🎁 Счастливый бонус!' };
    }
    return null;
  }

  // Curiosity gap teasers — shown at session end
  const CURIOSITY_TEASERS = [
    'Завтра: почему は и が на самом деле совершенно разные',
    'Далее: кандзи, который содержит секрет ещё трёх',
    'Скоро: грамматика, которая сделает твой японский как у носителя',
    'Завтра: слово, которое японцы используют 50 раз в день',
    'Далее: тренировка чтения, которая откроет 200+ слов',
    'Скоро: почему одна частица меняет всё',
    'Завтра: история кандзи, которая заставит 覚える запомниться навсегда',
    'Далее: грамматика, которую ты использовала неправильно не зная',
    'Скоро: приём аудирования, который тренирует ухо за 30 секунд',
    'Завтра: два кандзи, которые выглядят одинаково, но значат противоположное',
  ];

  function curiosityTeaser() {
    const idx = (getFlowState().totalReviews || 0) % CURIOSITY_TEASERS.length;
    return CURIOSITY_TEASERS[idx];
  }

  // Sunk-cost / investment display
  function totalInvestment() {
    const srs = getSRS();
    const totalReviews = Object.values(srs).reduce((sum, s) => sum + (s.reps || 0), 0);
    const learned = Object.values(srs).filter(s => s.reps > 0).length;
    const mastered = Object.keys(srs).filter(id => itemMastery(id) >= 80).length;
    const streak = getStreakData();
    return { totalReviews, learned, mastered, streakDays: streak.count, longestStreak: streak.longest };
  }

  // ---- expose ----
  root.Core = {
    DB, DIALS, DIMS, dateKey, daysBetween, haptic, shuffle,
    loadContent, indexContent, PACKS: () => PACKS, ITEMS, BY_ID,
    rate, itemState, isDue, dueQuestions, getSRS,
    itemMastery, dimMastery, overallMastery, retention,
    snapshotToday, growthToday, growthRate, daysToReady, snapshots,
    activityLog, logActivity,
    getMomentum, bumpMomentum,
    weakestDim, buildMission, pickStory, coachPlan,
    // lesson system
    LESSON_STEPS, getLessonByNum, getLessonProgress, markLessonStep,
    isLessonComplete, isLessonUnlocked, lessonNums, lessonOf, difficultyOf,
    // drill engine
    getDrillPool, getDrillDue, getDrillDueCount, getDrillStats,
    rateDrill, drillGet,
    getPrevLessonQuestions, getStreak,
    // XP & level
    getXP, addXP, levelForXP, xpForLevel, levelProgress,
    // streak with freeze
    getStreakData, updateStreak,
    // weak-point engine
    getWeakLog, logWrong, clearWeak, getWeakItems, weakCount,
    // daily goal
    getDailyGoal, setDailyGoal, progressDailyGoal, isDailyGoalDone, dailyGoalPct,
    // review caps
    getCappedDue, REVIEW_CAP,
    // strengthen mode
    getStrengthenCards,
    // consecutive-correct mastery
    getConsecutiveCorrect, bumpConsecutiveCorrect, isReliablyMastered,
    // variable bonus
    maybeBonus,
    // badges
    getBadges, checkBadges, BADGE_LIST,
    // adaptive difficulty
    adaptiveDifficulty, pickAdaptiveQuestions,
    // data export/import
    exportData, importData,
    // settings
    getSettings, setSettings,
    // combo
    comboMultiplier,
    // flow state engine
    FLOW, getFlowState, startFlowSession, recordFlowResponse,
    flowNeedsRelief, flowNeedsChallenge, flowTargetDifficulty,
    flowPickNext, flowBuildSession, isNearMiss, flowBonus,
    curiosityTeaser, totalInvestment
  };
})(typeof window !== 'undefined' ? window : globalThis);

if (typeof module !== 'undefined' && module.exports) module.exports = (typeof window !== 'undefined' ? window : globalThis).Core;
