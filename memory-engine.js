/* ============================================================================
   MEMORY ENGINE — the math behind "when and how to review"
   ----------------------------------------------------------------------------
   Pure, dependency-free, runs in browser AND node (for tests).
   Every item's memory is described by three numbers (the FSRS model):

     S  Stability      — how many days until recall probability falls to 90%.
                         Big S = durable memory. This is the thing we grow.
     D  Difficulty     — 1..10, how hard THIS item is for THIS learner.
                         High D items grow stability more slowly.
     R  Retrievability — probability she can recall it RIGHT NOW (0..1).
                         Derived from S and time-since-review. This decays.

   We schedule the next review for the moment R is predicted to hit a target
   (default 90%). Reviewing right at that edge is the spacing-effect sweet spot:
   late enough that the retrieval is effortful (which strengthens memory — a
   "desirable difficulty", Bjork) but early enough that she doesn't actually
   forget. See theory-and-integration.md for the research behind each piece.

   The constants are transparent, reasonable defaults — clearly labelled and
   tunable. This is an FSRS-STYLE model, not a replica of FSRS's trained weights
   (those need thousands of reviews to fit; with that data you'd train them).
   ============================================================================ */
(function (root) {
  'use strict';

  // ---- forgetting-curve constants (power law, FSRS form) --------------------
  // R(t) = (1 + FACTOR * t/S) ^ DECAY.  Calibrated so that at t = S, R = 0.90,
  // which is what makes "S" mean "the 90%-retention interval".
  const DECAY = -0.5;
  const FACTOR = Math.pow(0.9, 1 / DECAY) - 1; // ≈ 0.2345

  const CFG = {
    TARGET_RETENTION: 0.90,   // review when recall prob. drops to here. 0.85–0.9 is the efficiency sweet spot.
    RISK_RETENTION:   0.85,   // below this, an item counts as "at risk today"
    MIN_INTERVAL:     1,      // days (don't schedule sub-day reviews in this app)
    MAX_INTERVAL:     365,
    MIN_STABILITY:    0.4,    // floor so a freshly-lapsed item still comes back soon
    // first-exposure stability seed by grade (1 again · 2 hard · 3 good · 4 easy), in days
    INIT_S:   { 1: 0.5, 2: 1.2, 3: 3.0, 4: 8.0 },
    // stability-growth tuning (see growStability)
    GAIN:        2.2,   // overall growth scale for a "good" review
    DESIRE_W:    2.0,   // how much a lower-retrievability review is rewarded (spacing effect)
    SAT_S:       40,    // saturation: very stable memories grow proportionally less
    LAPSE_FRAC:  0.30,  // on "again", new S = LAPSE_FRAC * old S (post-lapse memory is weaker, not zero)
    // stage thresholds (days of stability)
    YOUNG_S:     7,
    MATURE_S:    21,
    MASTERED_S:  60     // ~2 months of 90%-retention durability → "mastered"
  };

  const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
  const DAY = 86400000;

  // ---- core curves ----------------------------------------------------------
  // Recall probability after `days` since last review, given stability S.
  function retrievability(S, days) {
    if (!S || S <= 0) return 0;
    return Math.pow(1 + FACTOR * (days / S), DECAY);
  }
  // The interval (days) at which retrievability will equal `r`. Inverse of above.
  function intervalForRetention(S, r) {
    r = r || CFG.TARGET_RETENTION;
    const i = (S / FACTOR) * (Math.pow(r, 1 / DECAY) - 1);
    return clamp(Math.round(i), CFG.MIN_INTERVAL, CFG.MAX_INTERVAL);
  }

  // ---- difficulty -----------------------------------------------------------
  function initDifficulty(grade) {
    // good(3) → 5.0 (neutral). easy → easier, hard/again → harder.
    return clamp(5 - 1.2 * (grade - 3), 1, 10);
  }
  function updateDifficulty(D, grade) {
    let d = D - 0.6 * (grade - 3);       // good leaves it, easy lowers, again raises
    d = d + 0.08 * (5 - d);              // gentle mean-reversion toward neutral
    return clamp(d, 1, 10);
  }

  // ---- stability ------------------------------------------------------------
  // Growth on a SUCCESSFUL review. Bigger when: item is easy (low D), the review
  // happened at lower retrievability (desirable difficulty), the grade is high,
  // and the memory isn't already very stable (saturation).
  function growStability(S, D, R, grade) {
    const difficultyFactor = (11 - D) / 9;                 // 0.11 (D=10) .. 1.11 (D=1)
    const Reff = clamp(R, 0.3, 0.97);                      // floor the bonus so it can't explode
    const desire = 1 + CFG.DESIRE_W * (1 - Reff);          // reward reviewing closer to the forgetting edge
    const gradeFactor = grade >= 4 ? 1.3 : grade === 3 ? 1.0 : 0.5; // easy / good / hard
    const saturation = 1 / (1 + S / CFG.SAT_S);            // tall memories grow proportionally less
    const G = CFG.GAIN * difficultyFactor * desire * gradeFactor * saturation;
    return clamp(S * (1 + G), CFG.MIN_STABILITY, CFG.MAX_INTERVAL);
  }

  // ---- the one call the app makes after every answer ------------------------
  // state: {S, D, reps, lapses, last, lastKey, next, attempts, correct}
  // grade: 1 again · 2 hard · 3 good · 4 easy
  function review(state, grade, nowMs) {
    const now = (nowMs == null) ? Date.now() : nowMs;
    const s = Object.assign(
      { S: 0, D: 0, reps: 0, lapses: 0, last: 0, next: 0, attempts: 0, correct: 0 },
      state || {}
    );
    s.attempts++;

    if (s.reps === 0 || !s.S) {
      // first real exposure → seed stability + difficulty
      s.S = CFG.INIT_S[grade] || CFG.INIT_S[3];
      s.D = initDifficulty(grade);
      if (grade >= 2) { s.reps = 1; if (grade >= 3) s.correct++; }
      else { s.reps = 0; s.lapses++; s.S = CFG.MIN_STABILITY; } // "again" on a new card → stays in learning
    } else {
      const days = (now - (s.last || now)) / DAY;
      const R = retrievability(s.S, days);
      s.D = updateDifficulty(s.D, grade);
      if (grade === 1) {                    // lapse
        s.lapses++; s.reps = 0;
        s.S = Math.max(CFG.MIN_STABILITY, CFG.LAPSE_FRAC * s.S);
      } else {                              // pass (hard/good/easy)
        s.reps++; if (grade >= 3) s.correct++;
        s.S = growStability(s.S, s.D, R, grade);
      }
    }

    const interval = intervalForRetention(s.S, CFG.TARGET_RETENTION);
    s.last = now;
    s.next = now + interval * DAY;
    s.interval = interval;
    return s;
  }

  // ---- read-outs the UI / coach use -----------------------------------------
  function currentR(state, nowMs) {
    if (!state || !state.S || !state.last) return 0;
    const days = (((nowMs == null) ? Date.now() : nowMs) - state.last) / DAY;
    return retrievability(state.S, days);
  }
  function isDue(state, nowMs) {
    if (!state || !state.attempts) return false;
    return (state.next || 0) <= ((nowMs == null) ? Date.now() : nowMs);
  }
  function stageOf(state) {
    if (!state || !state.reps || !state.S) return 'new';
    if (state.reps < 2 || state.S < 1)        return 'learning';
    if (state.S < CFG.YOUNG_S)                return 'young';
    if (state.S < CFG.MATURE_S)               return 'consolidating';
    if (state.S < CFG.MASTERED_S)             return 'mature';
    return 'mastered';
  }
  // How badly this item needs attention right now (0..~1.5). Drives the rescue
  // queue and the at-risk count. Losing a more-learned item hurts more, so a
  // small stage weight is added.
  function urgency(state, nowMs) {
    if (!state || !state.attempts) return 0;
    const R = currentR(state, nowMs);
    const gap = Math.max(0, CFG.TARGET_RETENTION - R);   // how far past the review edge
    const stageW = { learning: 0.2, young: 0.4, consolidating: 0.7, mature: 1.0, mastered: 1.0 }[stageOf(state)] || 0.3;
    return gap * (0.6 + 0.4 * stageW);
  }
  function atRisk(state, nowMs) {
    return !!(state && state.reps > 0 && currentR(state, nowMs) < CFG.RISK_RETENTION);
  }

  const Memory = {
    CFG, DECAY, FACTOR,
    retrievability, intervalForRetention,
    initDifficulty, updateDifficulty, growStability,
    review, currentR, isDue, stageOf, urgency, atRisk
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = Memory;
  if (root) root.Memory = Memory;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
