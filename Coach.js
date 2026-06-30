/* ============================================================================
   КОУЧ — превращает математику памяти в ежедневное решение и человеческое сообщение.
   ----------------------------------------------------------------------------
   Главная проблема прокрастинатора — не расписание (движок и так знает,
   что пора повторять). Проблема — заставить её *начать* и не бросить после
   пропущенного дня. Поэтому коуч построен на модели поведения Фогга:

        Поведение возникает, когда Мотивация × Способность × Триггер совпадают.
        B = MAP

   Мотивация меняется день ото дня, и мы не можем её контролировать, поэтому
   коуч опирается на два рычага, которые мы МОЖЕМ двигать:
     • Способность — сделать задачу маленькой. В дни низкой дисциплины
       назначается МИНИМАЛЬНО жизнеспособная сессия (60-секундное спасение),
       потому что крошечное действие, которое она реально выполнит, лучше
       идеального плана, которого она избегает.
     • Триггер — вовремя и хорошо сформулированное напоминание (через /api/remind).

   Коуч также не позволяет накапливать долги. Когда много просрочено, вывалить
   200 повторений вызывает избегание; коуч ограничивает дневную дозу на
   устойчивом уровне и выдаёт сначала самые срочные элементы, чтобы
   ограниченное время тратилось на памяти, ближайшие к забыванию.

   Чистый код, без зависимостей. Нужен движок Memory. Возвращает план + краткую
   сводку, достаточную для синхронизации с сервером для умного напоминания.
   ============================================================================ */
(function (root) {
  'use strict';

  const Memory = (typeof require !== 'undefined') ? require('./memory-engine.js')
                 : (root && root.Memory);

  const CFG = {
    WINDOW: 14,          // дней, за которые измеряем дисциплину
    GAP_RETURN: 2,       // пропуск столько дней → «с возвращением», уменьшаем нагрузку
    RESCUE_DOSE: 3,      // размер минимальной 60-секундной сессии
    REVIEW_CAP: 30,      // максимум повторений в день (анти-лавина)
    CATCHUP_MODE: 50,    // когда просрочено > этого, режим догонялки (по срочности)
    DOSE_BY_ADHERENCE: [ // устойчивая дневная нагрузка по мере укрепления привычки
      { upTo: 0.30, dose: 5  },   // слабая привычка → держим минимум
      { upTo: 0.60, dose: 10 },
      { upTo: 0.85, dose: 16 },
      { upTo: 1.01, dose: 22 }    // крепкая привычка → можно полноценную сессию
    ],
    NEW_RATIO: 0.30      // максимум эта доля сессии — совершенно новые элементы
  };

  const dayKey = (d) => {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);

  // дисциплина = доля активных дней из последних WINDOW дней (любое занятие).
  function adherence(activityLog, today) {
    today = today || dayKey();
    let active = 0;
    for (let i = 0; i < CFG.WINDOW; i++) {
      const d = new Date(today + 'T00:00:00'); d.setDate(d.getDate() - i);
      if (activityLog && activityLog[dayKey(d)]) active++;
    }
    return active / CFG.WINDOW;
  }
  function lastActiveGap(activityLog, today) {
    today = today || dayKey();
    const days = Object.keys(activityLog || {}).filter(k => k <= today).sort();
    if (!days.length) return null;                 // никогда не занималась
    const last = days[days.length - 1];
    return last === today ? 0 : daysBetween(last, today);
  }
  function doseFor(a) {
    for (const row of CFG.DOSE_BY_ADHERENCE) if (a <= row.upTo) return row.dose;
    return CFG.DOSE_BY_ADHERENCE[CFG.DOSE_BY_ADHERENCE.length - 1].dose;
  }

  /* --------------------------------------------------------------------------
     planDay(items, ctx)
       items : [{ id, dim, state, isNew }]   state = состояние элемента Memory (или null)
       ctx   : { activityLog, momentum, now, name }
     возвращает полный дневной план + компактную `summary` для напоминания сервера.
  --------------------------------------------------------------------------- */
  function planDay(items, ctx) {
    ctx = ctx || {};
    const now = ctx.now || Date.now();
    const today = dayKey(new Date(now));
    const name = ctx.name || 'Mahym';

    const seen = items.filter(it => it.state && it.state.attempts);
    const due  = seen.filter(it => Memory.isDue(it.state, now));
    const risk = seen.filter(it => Memory.atRisk(it.state, now));
    const fresh = items.filter(it => !it.state || !it.state.attempts);

    // перепись стадий (для отображения прогресса + отчёта коуча)
    const stages = { new: 0, learning: 0, young: 0, consolidating: 0, mature: 0, mastered: 0 };
    items.forEach(it => { stages[Memory.stageOf(it.state)]++; });

    const a = adherence(ctx.activityLog, today);
    const gap = lastActiveGap(ctx.activityLog, today);
    const returning = gap !== null && gap >= CFG.GAP_RETURN;

    // ---- сколько просить сегодня (Фогг: защищаем Способность) ----
    let dose = doseFor(a);
    if (returning) dose = Math.min(dose, CFG.RESCUE_DOSE * 2); // плавное возвращение после перерыва
    const rescueMode = a < 0.30 || returning;

    // ---- анти-лавина: ограничиваем повторения, включаем режим догонялки при перегрузке ----
    const avalanche = due.length > CFG.CATCHUP_MODE;
    const reviewCap = avalanche ? CFG.REVIEW_CAP : dose;
    const catchUpMode = avalanche && !rescueMode;

    // ---- выбираем элементы: сначала самые срочные, затем добиваем новыми ----
    const byUrgency = due.slice().sort((x, y) => Memory.urgency(y.state, now) - Memory.urgency(x.state, now));
    const reviewPick = byUrgency.slice(0, Math.min(reviewCap, dose));
    const room = Math.max(0, Math.min(reviewCap, dose) - reviewPick.length);
    const newAllowance = Math.min(room, Math.ceil(dose * CFG.NEW_RATIO));
    const newPick = fresh.slice(0, newAllowance);

    // 60-секундное спасение — всегда 3 самых срочных элемента (или новые, если нет просроченных)
    const rescue = (byUrgency.length ? byUrgency : fresh).slice(0, CFG.RESCUE_DOSE).map(it => it.id);

    // «всего одна карточка» — один самый срочный элемент, всегда предлагается
    const justOne = (byUrgency.length ? byUrgency : fresh)[0];
    const justOneId = justOne ? justOne.id : null;

    const coach = chooseMessage({
      name, returning, gap, rescueMode, catchUpMode, avalanche,
      due: due.length, risk: risk.length, fresh: fresh.length,
      adherence: a, momentum: ctx.momentum || 0, stages
    });

    return {
      date: today,
      focusDose: Math.min(reviewCap, dose),
      rescueMode,
      catchUpMode,
      avalanche,
      review: reviewPick.map(it => it.id),
      new: newPick.map(it => it.id),
      rescue,
      justOne: justOneId,
      stages,
      headline: coach.headline,
      message: coach.message,
      principle: coach.principle,
      // компактный блок для POST на сервер, чтобы /api/remind был конкретным
      summary: {
        date: today, name,
        due: due.length, atRisk: risk.length,
        adherence: +a.toFixed(2), gap, momentum: ctx.momentum || 0,
        recommended: rescueMode ? CFG.RESCUE_DOSE : Math.min(reviewCap, dose),
        avalanche, stages, headline: coach.headline
      }
    };
  }

  /* ---- выбор сообщения: небольшой конечный автомат, каждый вариант помечен
          принципом поведенческой науки, который он применяет (чтобы логика была ясна) -- */
  function chooseMessage(s) {
    const name = s.name;
    if (s.avalanche && !s.returning) {
      return {
        headline: `${s.due} повторений ждут — давай нагонять`,
        message: `У тебя ${s.due} просроченных элементов. Не волнуйся — я выбрал ${CFG.REVIEW_CAP} самых критичных. Сделай сколько сможешь; остальные перенесутся. Даже 5 минут — это зачёт.`,
        principle: 'Анти-лавина: ограничиваем дневную нагрузку, чтобы избежать избегания; сортируем по срочности, чтобы спасти самое важное'
      };
    }
    if (s.returning) {
      return {
        headline: 'С возвращением',
        message: `Без чувства вины — ${s.gap} дней без занятий — это пустяк. Просто сделай 3-элементное спасение, чтобы разбудить память. Это уже полная победа за сегодня.`,
        principle: 'Фогг: уменьшаем Способность после перерыва; избегаем принципа «всё или ничего»'
      };
    }
    if (s.risk >= 8) {
      return {
        headline: `${s.risk} воспоминаний ускользают`,
        message: `${s.risk} элементов на пути к «забытому». 3 минуты сейчас спасут те, что ближе всего к краю — там повторения дают максимальную отдачу.`,
        principle: 'Неприятие потери + эффект интервала: спасаем элементы с низкой восстанавливаемостью для максимального укрепления памяти'
      };
    }
    if (s.due === 0 && s.fresh > 0) {
      return {
        headline: 'Всё повторено ✅',
        message: `Ничего не просрочено — память в норме. Если есть силы, изучи ${Math.min(s.fresh, 3)} новых элемента. Если нет — сегодня уже победа.`,
        principle: 'Подкрепляем успех; оставляем нагрузку новыми элементами необязательной, чтобы беречь мотивацию'
      };
    }
    if (s.due === 0) {
      return {
        headline: 'Всё повторено ✅',
        message: `Все воспоминания сейчас выше целевого уровня. Отдых — часть расписания — увидимся завтра.`,
        principle: 'Эффект интервала: слишком раннее повторение — пустая трата сил'
      };
    }
    if (s.adherence >= 0.6 && s.momentum >= 30) {
      return {
        headline: 'На волне 🔥',
        message: `${s.due} к повторению и импульс ${s.momentum}. Выбей сегодняшнюю порцию и продолжай наращивать кривую.`,
        principle: 'Подкрепляем устоявшуюся привычку, пока мотивация высокая'
      };
    }
    return {
      headline: `${s.due} готово к повторению`,
      message: `${s.due} элементов сейчас в идеальной точке повторения (~${Math.min(s.due, 10)} мин). Повторить их сейчас — дешевле, чем когда-либо.`,
      principle: 'Эффект интервала: повторение на грани восстанавливаемости для эффективной и прочной памяти'
    };
  }

  const Coach = { CFG, adherence, lastActiveGap, doseFor, planDay, chooseMessage, dayKey };
  if (typeof module !== 'undefined' && module.exports) module.exports = Coach;
  if (root) root.Coach = Coach;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
