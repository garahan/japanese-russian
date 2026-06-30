# The math & theory behind the habit engine

Two engines, two jobs:

- **`memory-engine.js`** decides *when each item should be reviewed* and *how
  strong each memory is*. This is learning science.
- **`coach.js`** decides *how much to ask of her today* and *what to say*. This
  is behaviour-design science.

Everything below explains the model and the research it rests on, and is honest
about which numbers are established science versus reasonable tunable defaults.

---

## Part 1 — The memory model

Each item carries three numbers, the same trio modern schedulers (FSRS, which
Anki now ships) use:

| Symbol | Name | Meaning |
|---|---|---|
| **S** | Stability | days until recall probability falls to 90%. The thing we grow. |
| **D** | Difficulty | 1–10, how hard this item is for *her*. High D → slower growth. |
| **R** | Retrievability | probability she can recall it *right now* (0–1). Decays with time. |

### The forgetting curve

Memory fades along a curve first measured by Hermann Ebbinghaus in 1885 and
reconfirmed for over a century: retention drops fast at first, then levels off.
We model it with the power law FSRS uses (a better long-run fit than a plain
exponential):

```
R(t) = (1 + FACTOR · t/S) ^ DECAY        DECAY = −0.5,  FACTOR ≈ 0.2345
```

The constants are calibrated so that **at `t = S`, `R = 0.90`** — which is what
makes "stability" literally mean "the 90%-retention interval." That single
choice is what lets the rest of the system read in plain language.

### Scheduling: review at the edge, not before it

We invert the curve to find the day recall will hit a target retention (default
**90%**) and schedule the review there:

```
interval = (S / FACTOR) · (target^(1/DECAY) − 1)        ≈ S, at target 0.90
```

Why 90% and not, say, 99%? Because of the **spacing effect** — one of the most
replicated findings in cognitive psychology (Cepeda et al., 2006): spacing
reviews out produces far more durable memory than cramming. And **desirable
difficulty** (Robert Bjork): a retrieval that is *effortful but successful*
strengthens memory more than an easy one. Reviewing while recall is still 99%
is wasted effort; letting it slip to ~85–90% makes each rep do more work.

You can see this directly in `engine-demo.js` section 2: the *same* review grows
stability from 7.9 → **20.7 days** when done late (84% recall) versus 7.9 → 18.2
when done early (97% recall). The engine deliberately aims for that edge.

> **Tunable:** `CFG.TARGET_RETENTION`. Lower (e.g. 0.85) = longer intervals,
> fewer reviews, slightly more lapses. Higher = safer but more work. 0.85–0.90
> is the efficiency sweet spot most research points to.

### Growing stability

On a successful review, stability grows by a factor that captures the real
mechanisms:

```
S_new = S · (1 + GAIN · difficultyFactor · desire · gradeFactor · saturation)
```

- **difficultyFactor** `(11−D)/9` — easy items consolidate faster than hard ones.
- **desire** `1 + 2·(1−R)` — the desirable-difficulty bonus: a review done at
  lower recall is worth more (this is the spacing effect, encoded).
- **gradeFactor** — *easy* 1.3, *good* 1.0, *hard* 0.5.
- **saturation** `1/(1 + S/40)` — already-durable memories grow proportionally
  less, so intervals don't blow up unrealistically. Mirrors how FSRS damps
  growth at high stability.

A lapse ("again") sets `S → 0.30·S` (floored), not zero: re-learning something
you once knew is faster than first learning, so the schedule reflects that.

> **Honest note:** real FSRS fits ~19 weights to *your own* review history with
> thousands of data points. This is a transparent, hand-set approximation of the
> same shape. It is principled and behaves correctly (see the demo), but once
> she has a few thousand reviews logged, those weights could be *fit to her*
> instead of assumed — a great Phase 4 upgrade.

### Stages

Stability maps to a stage she can see and feel progress through:

| Stage | Stability | Meaning |
|---|---|---|
| New | reps = 0 | never studied |
| Learning | < 1 day | just met it |
| Young | < 7 days | fragile |
| Consolidating | < 21 days | sticking |
| Mature | < 60 days | solid |
| Mastered | ≥ 60 days | durable for ~2 months at 90% |

### Urgency

For prioritising, each due item gets an urgency score from how far recall has
dropped below target, weighted up for more-learned items (losing a mature memory
costs more than losing a fragile one). The coach feeds her the **highest-urgency
items first** — so whatever time she gives is spent on the memories closest to
being lost.

---

## Part 2 — The coaching model (beating procrastination)

Scheduling is solved above. The real problem with a procrastinator is *starting*,
and not quitting after one missed day. The coach is built on the **Fogg
Behaviour Model**:

```
Behaviour = Motivation × Ability × Prompt        (B = MAP)
```

A behaviour only happens when all three converge. Motivation swings day to day
and can't be relied on, so the coach works the two levers we *can* move:

**1. Ability — make the ask small.**
On low-consistency days the coach prescribes the **minimum viable session**: the
60-second, 3-item rescue. A tiny action she actually does beats a perfect plan
she avoids (BJ Fogg's *Tiny Habits*; the "two-minute rule"). The daily dose
scales with her **adherence** (active days in the last 14):

| Adherence | Daily ceiling |
|---|---|
| < 30% (shaky) | 5 |
| 30–60% | 10 |
| 60–85% | 16 |
| > 85% (solid) | 22 |

It also **refuses to pile on**. When hundreds of items are overdue, dumping them
all on screen triggers avoidance, so the dose is capped at a sustainable level
and the rest simply wait — the urgency sort means the right ones surface first.

**2. Prompt — a well-timed, well-worded nudge.**
`/api/remind` delivers the daily prompt. The message itself is chosen by a small
state machine, each branch tied to a principle:

| Situation | Message intent | Principle |
|---|---|---|
| Back after a gap | "no guilt, just do 3" | shrink Ability after a lapse; block all-or-nothing quitting |
| Many items slipping | "3 min saves the ones on the edge" | loss aversion + spacing effect |
| On a roll | "keep the curve climbing" | reinforce an established routine |
| All caught up | "rest is part of the schedule" | spacing effect — early review is wasted |

The "welcome back, just do the rescue" branch is the most important line in the
whole system for a procrastinator: the thing that kills habits isn't a missed
day, it's the guilt spiral that turns one missed day into ten. The coach
explicitly defuses that.

> **Implementation intentions** (Gollwitzer, 1999): follow-through jumps when a
> behaviour is anchored to an existing cue — "*after my morning coffee, I open
> the app.*" Surfacing a prompt like this occasionally is a cheap, evidence-based
> add-on worth wiring into onboarding.

---

## Part 3 — Wiring it in

### A. Swap the scheduler in `core.js`

The existing `rate(id, quality)` uses an SM-2-style ladder. To adopt this engine,
keep the same call sites and storage key, and replace the body so it delegates to
`Memory.review`:

```js
// in core.js — replace the contents of rate()
function rate(id, quality) {
  const s = getSRS();
  const prev = s[id] || {};
  const next = root.Memory.review(prev, quality);   // 1 again·2 hard·3 good·4 easy
  s[id] = next; saveSRS(s);
  return next;
}
// and point itemMastery / isDue / dimMastery at the new fields:
//   strength  → use Memory.currentR(state) directly (it IS retrievability)
//   isDue(id) → Memory.isDue(s[id])
```

`Memory.currentR()` already returns exactly the "how much survives" number your
mastery and retention math wants, so the dashboard keeps working — it just gets a
better-calibrated curve underneath. Load order in `index.html`:

```html
<script src="/memory-engine.js"></script>
<script src="/coach.js"></script>
<script src="/core.js"></script>
```

### B. Use the coach on the home screen

Build the list the coach expects, then render its plan:

```js
const items = [...C.ITEMS.vocab, ...C.ITEMS.grammar, ...C.ITEMS.kanji,
               ...C.ITEMS.question].map(it => ({
  id: it.id, dim: it.dim, state: C.getSRS()[it.linksTo || it.id] || null
}));
const plan = Coach.planDay(items, {
  activityLog: C.activityLog(),
  momentum: C.getMomentum().value
});
// plan.headline / plan.message → a coaching card on the dashboard
// plan.rescue (3 ids) → wire a "▶ 60-second rescue" button to a micro-quiz
// plan.review / plan.new → the day's session contents
```

The 60-second rescue is just `runQuiz()` (which you already have) fed
`plan.rescue` — the three most-urgent items, nothing else. That's the
near-zero-friction entry point.

### C. Make the server nudge smart (small Phase-4 bridge)

`plan.summary` is a compact blob (due count, at-risk count, adherence, momentum,
recommended dose, headline). Once per session, POST it to a tiny `/api/state`
endpoint that stores it in Upstash; then `/api/remind` reads it and sends a
*specific* nudge ("8 words are slipping — 3 minutes saves them") instead of the
current generic one. That closes the loop between what she's actually doing and
what the daily prompt says.

---

## References (the science, not the code)

- Ebbinghaus, H. (1885). *Memory: A Contribution to Experimental Psychology* — the forgetting curve.
- Cepeda, N. et al. (2006). *Distributed practice in verbal recall tasks* — the spacing effect, meta-analytic.
- Bjork, R. & Bjork, E. (1992 onward). *Desirable difficulties* — effortful retrieval builds durability.
- Roediger & Karpicke (2006). *Test-enhanced learning* — retrieval practice beats rereading.
- FSRS (Open Spaced Repetition) — the Difficulty/Stability/Retrievability model and power-law forgetting.
- Fogg, B.J. (2009; *Tiny Habits*, 2019) — B = MAP, and shrinking Ability to drive behaviour.
- Gollwitzer, P. (1999). *Implementation intentions* — if-then plans improve follow-through.
