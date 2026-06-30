// /api/thread.js — generates dopamine-rich Japanese learning threads
// Twitter-style threads that make learning addictive.
// Uses Gemini Flash (free tier) if available, then Anthropic, then static fallback.
//
// GET  /api/thread           → { ok, thread:{...} }  (one random thread)
// POST /api/thread  (admin)  → { ok, thread:{...} }  (generate fresh via AI)
//
// Env: GEMINI_API_KEY (free tier, preferred), ANTHROPIC_API_KEY (fallback paid)

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = process.env.GEN_MODEL || 'claude-sonnet-4-6';

// ── Static thread bank (40+ threads) ─────────────────────────────────────────
const STATIC_THREADS = [
  {
    id:'kanji-secret', emoji:'🧩', title:'The kanji that contains 3 others', tag:'Kanji',
    posts:[
      'Did you know? The kanji 森 (forest) is just three trees (木) stacked together. Once you know 木, you get 森 for free.',
      'But it goes deeper: 林 (woods) = two trees. 森 (forest) = three trees. Japanese literally counts trees to name forests.',
      'This pattern is everywhere: 火→炎→焱 (fire→blaze→inferno). 水→沝→淼 (water→→→ocean). One kanji unlocks a whole family.',
      'Today\'s challenge: look up 休 (rest). It\'s a person (人) leaning against a tree (木). Even kanji tells stories. 🌳',
    ],
    cta:'Learn 木 and its family in the kanji drills →',
  },
  {
    id:'ha-ga-mystery', emoji:'🔍', title:'は vs が: the mystery nobody explains', tag:'Grammar',
    posts:[
      'Every Japanese learner struggles with は vs が. Here\'s the secret nobody tells you:',
      'は marks the TOPIC — "as for X..." It\'s what the sentence is ABOUT.',
      'が marks the SUBJECT — the DOER. It introduces NEW information.',
      '猫はいる ("As for cats, they exist") vs 猫がいる ("A cat exists — and that\'s the point").',
      'The real mind-bend: 私は学生です = "I\'ll tell you about me — I\'m a student." 私が学生です = "I\'M the one who\'s the student."',
      'Once you feel this difference, 200 grammar points suddenly click. It\'s that foundational. 🎯',
    ],
    cta:'Practice は vs が in grammar drills →',
  },
  {
    id:'kanji-water', emoji:'🌊', title:'The kanji that flows through 200 words', tag:'Kanji',
    posts:[
      '水 (water) appears in over 200 common words. But look at what it creates:',
      '水曜日 (Wednesday = water day), 水泳 (swimming), 水道 (plumbing), 氷 (ice = water frozen solid)',
      'The radical 氵(water variant) flows through 海 (sea), 池 (pond), 洗 (wash), 涙 (tears)...',
      'One kanji radical = 200+ vocabulary words. That\'s why kanji isn\'t memorization — it\'s multiplication. ✖️',
    ],
    cta:'Study water-kanji words in vocabulary drills →',
  },
  {
    id:'four-readings', emoji:'🤯', title:'Why one kanji has 4+ readings', tag:'Kanji',
    posts:[
      '生 — one kanji, at least 7 readings: せい, しょう, いきる, うむ, はえる, なま, き.',
      'Why? Because Japanese bolted Chinese readings (音読み) onto native Japanese words (訓読み).',
      '生活 (せいかつ = life), 先生 (せんせい = teacher), 生きる (いきる = to live), 生まれる (うまれる = to be born)',
      'Don\'t memorize readings. Memorize WORDS. The readings reveal themselves naturally. That\'s the shortcut. 🔑',
    ],
    cta:'Learn 生 and its words in vocabulary drills →',
  },
  {
    id:'politeness-levels', emoji:'🙇', title:'The 4 politeness levels that change everything', tag:'Culture',
    posts:[
      'Japanese has 4+ politeness levels. Saying "I understand" can be:',
      '分かる (casual — to friends), 分かります (polite — to strangers), かしこまりました (formal — to superiors), 存じます (humble — about yourself to clients)',
      'Using the wrong one isn\'t just rude — it can end a business relationship. Japanese isn\'t just words. It\'s social GPS. 🗾',
      'The good news: the casual→polite jump is just adding ます. One suffix, huge social upgrade.',
    ],
    cta:'Practice polite form in grammar drills →',
  },
  {
    id:'sound-words', emoji:'🔊', title:'Japanese has words for sounds English can\'t describe', tag:'Vocabulary',
    posts:[
      'Japanese has 擬音語 (onomatopoeia) for things English has NO word for:',
      'シーン = the sound of silence. ドキドキ = heartbeat from excitement. ワクワク = trembling with anticipation.',
      'フワフワ = fluffy/floating feeling. ピカピカ = sparkling shiny. ギンギン = buzzing with energy.',
      'These aren\'t childish — adults use them daily in business emails. They\'re the COLOR of Japanese. Without them, you sound like a textbook. 🎨',
    ],
    cta:'Learn onomatopoeia in vocabulary drills →',
  },
  {
    id:'kanji-person', emoji:'🧑', title:'The kanji that drew a person', tag:'Kanji',
    posts:[
      'Look at 大 (big). It\'s literally a person standing with arms spread wide: "I\'m THIS big."',
      'Now look at 小 (small). Same person, arms tucked in: "I\'m small."',
      '休 (rest) = person (人) leaning against tree (木). 木 itself looks like a tree with roots.',
      'Japanese isn\'t an alphabet. It\'s a picture language where every character tells a 3000-year-old story. 📜',
    ],
    cta:'Explore kanji stories in kanji drills →',
  },
  {
    id:'counting-trap', emoji:'🔢', title:'The counting system that trips up everyone', tag:'Grammar',
    posts:[
      'Japanese has different counters for different shapes. You don\'t say "3 cats" — you say "3匹 of cats."',
      '匹 (small animals), 本 (long objects), 枚 (flat things), 台 (machines), 冊 (books), 杯 (cups)',
      'So: 猫三匹 (3 cats), ペン三本 (3 pens), 紙三枚 (3 papers), 車三台 (3 cars), 本三冊 (3 books), コーヒー三杯 (3 coffees)',
      'Yes, there are 500+ counters. But 20 cover 95% of daily life. Learn those 20 and you\'re set. 🎯',
    ],
    cta:'Practice counters in grammar drills →',
  },
  {
    id:'pitch-accent', emoji:'🎵', title:'The secret pronunciation rule nobody teaches', tag:'Listening',
    posts:[
      '橋 (bridge) and 箸 (chopsticks) are both はし. But they sound DIFFERENT.',
      '橋 goes HIGH→LOW. 箸 goes LOW→HIGH. Wrong pitch = calling chopsticks a bridge. 🥢',
      'Japanese has pitch accent — a hidden melody that changes meaning. It\'s why "I\'ll do it" (やるよ) sounds different from "I\'ll do it?" (やる？)',
      'You don\'t need to study it explicitly. Just listen + repeat. Your brain will absorb the melody. 🎧',
    ],
    cta:'Train your ear in listening drills →',
  },
  {
    id:'kanji-fear', emoji:'😨', title:'The kanji that means "fear" looks terrifying', tag:'Kanji',
    posts:[
      '恐怖 (fear/terror). Look at 恐:',
      'The top 巩 looks like hands gripping something. The bottom 心 is heart. Literally: "gripping your heart."',
      'That\'s not a coincidence. Kanji were designed to be VISUAL MNEMONICS. The meaning is IN the shape.',
      'Once you start seeing the pictures inside kanji, you stop memorizing and start UNDERSTANDING. 恐 stops being scary. 😌',
    ],
    cta:'Face your kanji fears in kanji drills →',
  },
  {
    id:'japanese-speed', emoji:'⚡', title:'Japanese is actually FASTER than English', tag:'Culture',
    posts:[
      'A study measured the "information density" of languages. Japanese is LOW density — you need more syllables to say the same thing.',
      'But Japanese speakers talk FAST. The result? Same information per second as English.',
      'That\'s why anime sounds rapid-fire. It\'s not dramatic — it\'s just how the language works.',
      'For learners: don\'t panic when native speech feels too fast. Your brain WILL catch up. Start with the listening drills. 🎧',
    ],
    cta:'Build listening speed in listening drills →',
  },
  {
    id:'one-word-culture', emoji:'🌸', title:'Words that don\'t exist in English', tag:'Culture',
    posts:[
      '木漏れ日 (こもれび) = sunlight filtering through tree leaves. One word. English needs 7.',
      '侘寂 (わびさび) = beauty in imperfection and transience. The aesthetic behind Japanese gardens, tea ceremony, and kintsugi.',
      '一生懸命 (いっしょうけんめい) = with utmost effort, as if your life depends on it. Used by kids doing homework and CEOs alike.',
      'These words don\'t just translate concepts — they reveal how Japanese people SEE the world. Learning vocabulary is learning a worldview. 🌍',
    ],
    cta:'Discover more beautiful words in vocabulary drills →',
  },
  {
    id:'kanji-mouth', emoji:'👄', title:'The kanji that is literally a mouth', tag:'Kanji',
    posts:[
      '口 means "mouth." Look at it: it\'s literally a square that looks like an open mouth.',
      'But it gets wild: 品 (product/goods) = three mouths. Because goods = things people consume.',
      '告 (tell/inform) = mouth + cow. Why? Because in ancient China, oxen were used for serious oaths.',
      'Every kanji is a tiny poem. Once you learn to read the pictures, 2000 characters feels like 2000 stories, not 2000 flashcards. 📖',
    ],
    cta:'Learn 口 and its family in kanji drills →',
  },
  {
    id:'verb-conjugation', emoji:'🔄', title:'Japanese verbs are actually EASIER than English', tag:'Grammar',
    posts:[
      'English has: go/went/gone/going/am going/was going/have been going... 15+ forms per verb.',
      'Japanese verbs have exactly 2 irregular verbs: する (do) and 来る (come). Everything else follows ONE pattern.',
      '食べる → 食べない (don\'t eat), 食べた (ate), 食べて (eat-please), 食べれば (if I eat). All from one stem.',
      'Once you learn the pattern, you can conjugate ANY verb. It\'s a formula, not memorization. English is harder. 🧮',
    ],
    cta:'Practice verb conjugation in grammar drills →',
  },
  {
    id:'kanji-tree-family', emoji:'🌳', title:'How one tree grew 50 kanji', tag:'Kanji',
    posts:[
      '木 (tree) is one of the most productive kanji in the language. Look at its family:',
      '本 (origin/book) = tree with a line at the base marking the root. 林 (woods) = two trees. 森 (forest) = three.',
      '机 (desk) = tree + few. 材 (lumber) = tree + talent. 桜 (cherry) = tree + woman. Each tells a story.',
      'Learn ONE kanji well, and 50 others become easier. That\'s the kanji multiplier effect. 🌱',
    ],
    cta:'Study the tree family in kanji drills →',
  },
  {
    id:'no-future-tense', emoji:'⏰', title:'Japanese has NO future tense', tag:'Grammar',
    posts:[
      'In English: "I eat" vs "I will eat" — two tenses. In Japanese? Just 食べる. Same form.',
      'How do you know if it\'s present or future? Context + time words: 明日食べる = "I\'ll eat tomorrow." 今食べる = "I\'m eating now."',
      'This means Japanese grammar has fewer forms to memorize. The trade-off: you must pay attention to context.',
      'It\'s actually freeing. No more worrying about "will" vs "going to" vs "shall." Just say the verb and add a time word. 🕐',
    ],
    cta:'Practice tense in grammar drills →',
  },
  {
    id:'kanji-hand', emoji:'✋', title:'The kanji for "hand" is everywhere', tag:'Kanji',
    posts:[
      '手 (hand) appears in dozens of common words: 手紙 (letter = hand paper), 手帳 (notebook = hand book), 手品 (magic = hand thing).',
      'The radical 扌(hand variant) is in 打 (hit), 投 (throw), 押 (push), 取 (take), 指 (finger)...',
      'Once you spot 扌, you can GUESS the meaning of unknown kanji. See 持? It has a hand radical — probably involves holding. (It does: "to hold.")',
      'Kanji radicals aren\'t decoration. They\'re a reading-comprehension superpower. 🦸',
    ],
    cta:'Learn hand-kanji in kanji drills →',
  },
  {
    id:'apology-culture', emoji:'🙏', title:'The word that can fix ANYTHING in Japan', tag:'Culture',
    posts:[
      'すみません — it means "sorry," "excuse me," "thank you," and "I acknowledge your effort." All at once.',
      'Someone holds the door? すみません. You bump into someone? すみません. You want to ask a question? すみません.',
      'It\'s the Swiss Army knife of Japanese social interaction. One word, infinite situations.',
      'Fun fact: saying すみません too much is actually a stereotype of overly polite people. But foreigners get a pass. 😅',
    ],
    cta:'Learn polite expressions in vocabulary drills →',
  },
  {
    id:'kanji-eye', emoji:'👁️', title:'The kanji that watches you learn', tag:'Kanji',
    posts:[
      '目 means "eye." It literally looks like an eye with a pupil in the middle.',
      'But look: 見 (see) = eye on legs. Because seeing = your eye walking toward something.',
      '覚 (memorize) = ...wait for it... hand gripping your heart with your eye on top. "To see with your heart and grip it."',
      'That\'s what 覚える (to remember) literally means. You\'re not memorizing — you\'re gripping with your eyes. 👁️',
    ],
    cta:'Learn 見 and 覚 in kanji drills →',
  },
  {
    id:'te-form', emoji:'🔗', title:'The one grammar form that unlocks everything', tag:'Grammar',
    posts:[
      'The て-form is the Swiss Army knife of Japanese grammar. Master it and 30 grammar patterns unlock at once.',
      '食べてください = please eat. 食べている = am eating. 食べてから = after eating. 食べてもいい = it\'s okay to eat.',
      '食べてしまう = accidentally ate it all. 食べてみる = try eating. 食べておく = eat in advance.',
      'All of these use the SAME て-form as the base. Learn one form, get 7 grammar patterns for free. That\'s ROI. 📈',
    ],
    cta:'Master the て-form in grammar drills →',
  },
  {
    id:'kanji-sun', emoji:'☀️', title:'The kanji that became "day"', tag:'Kanji',
    posts:[
      '日 means "sun" AND "day." Because in ancient times, the sun WAS the clock.',
      '日曜日 (Sunday = sun day), 日本 (Japan = sun origin), 日常 (daily = usual day), 日記 (diary = day record).',
      'The radical 日 appears in 時 (time = sun + temple), 晴 (clear weather = sun + blue), 暖 (warm = sun + soft).',
      'One circle became 100+ words. That\'s the power of kanji — one image, infinite meanings. ☀️',
    ],
    cta:'Learn 日 and its family in kanji drills →',
  },
  {
    id:'silent-vowels', emoji:'🤫', title:'Japanese has "silent" vowels', tag:'Listening',
    posts:[
      'In です (desu), the す is barely pronounced. It sounds like "des." Same with ます → "mas."',
      'This isn\'t sloppy speech — it\'s STANDARD Japanese. Pronouncing every vowel sounds unnatural.',
      'The rule: vowel devoicing happens when い or う comes between two voiceless consonants (k, s, t, p, h).',
      'So きた (kita) keeps the vowel, but くつ (kutsu) → the う almost disappears. Listen for it in anime. You\'ll start hearing it everywhere. 🎧',
    ],
    cta:'Train your ear in listening drills →',
  },
  {
    id:'kanji-heart', emoji:'❤️', title:'The kanji that explains Japanese emotions', tag:'Kanji',
    posts:[
      '心 means "heart." It appears in words about feelings, thinking, and character.',
      '心理 (psychology = heart logic), 感心 (admiration = feel heart), 安心 (relief = peaceful heart), 心配 (worry = heart distribution).',
      'The radical ⺗(heart variant) is in 恭 (respect = heart + hands), 慕 (yearn = heart + to grow).',
      'In Japanese, you don\'t think with your brain — you think with your heart. 考える (think) literally involves the heart radical. 💭',
    ],
    cta:'Learn heart-kanji in kanji drills →',
  },
  {
    id:'three-writing-systems', emoji:'📝', title:'Why Japanese has 3 writing systems', tag:'Culture',
    posts:[
      'Japanese uses hiragana, katakana, AND kanji simultaneously. It looks chaotic. But each has a job:',
      'Hiragana = grammar. Verb endings, particles, connective words. The "glue" of sentences.',
      'Katakana = foreign words, emphasis, onomatopoeia. コーヒー (coffee), パン (bread), ドキドキ (heartbeat).',
      'Kanji = meaning. Nouns, verb stems, adjective stems. The "content" of sentences.',
      'Once you understand the division of labor, reading Japanese stops feeling overwhelming. Each system does ONE thing. 🧩',
    ],
    cta:'Build reading skills in reading drills →',
  },
  {
    id:'kanji-gold', emoji:'✨', title:'The kanji that means "gold" but also "Friday"', tag:'Kanji',
    posts:[
      '金 means "gold," "money," AND "Friday." How? 金曜日 = gold day (named after Venus, associated with metal in Chinese astrology).',
      'But 金 also appears in: 金色 (golden color), 金額 (amount of money), 賞金 (prize money), 金属 (metal).',
      'The radical 金 is in 鉄 (iron), 銀 (silver), 銅 (copper), 鉛 (lead). It\'s the "metal" radical.',
      'One kanji = a day of the week + an element + a color + money. That\'s kanji efficiency. 💰',
    ],
    cta:'Learn 金 and metals in kanji drills →',
  },
  {
    id:'keigo-trap', emoji:'⚠️', title:'The politeness trap that even Japanese people fall into', tag:'Culture',
    posts:[
      '敬語 (keigo = honorific language) is so complex that Japanese COMPANIES send employees to TRAINING COURSES on it.',
      'The trap: using 尊敬語 (honorific) when you should use 謙譲語 (humble). It\'s called "keigo misuse" and it\'s a social landmine.',
      'Example: saying お客様が参られる (customer will go — humble form for the customer\'s action) is WRONG. It should be お客様がいらっしゃる (honorific).',
      'You\'re learning N4. You don\'t need keigo yet. But knowing it exists means you can relax — even natives struggle. 😅',
    ],
    cta:'Focus on basics first in grammar drills →',
  },
  {
    id:'kanji-fire', emoji:'🔥', title:'The kanji that started as a flame', tag:'Kanji',
    posts:[
      '火 means "fire." Look at it: it\'s literally flames leaping up with sparks flying.',
      'But fire kanji tell stories: 災 (disaster) = fire + river. Because in ancient China, floods and fires were the two great disasters.',
      '燃 (burn) = fire + however. "However it burns." 焼 (grill) = fire + show. "To show fire."',
      'The fire radical 灬 appears at the bottom of kanji like 煮 (boil) and 熊 (bear — because bears were associated with fire mountains?).',
      'OK that last one is debated. But kanji etymology is FULL of these wild stories. It\'s not memorization — it\'s mythology. 📚',
    ],
    cta:'Learn fire-kanji in kanji drills →',
  },
  {
    id:'no-articles', emoji:'🚫', title:'Japanese has NO "a" or "the"', tag:'Grammar',
    posts:[
      'English forces you to choose: "a cat" vs "the cat" vs "cats." Get it wrong and you sound broken.',
      'Japanese? Just say 猫. That\'s it. No article. No plural marker. Context handles everything.',
      '猫がいる = "there is a cat" or "there are cats" — depends on context. 猫を見た = "I saw a cat" or "I saw the cat."',
      'One less thing to worry about. Japanese grammar isn\'t harder — it\'s just different. In some ways, it\'s simpler. 🧘',
    ],
    cta:'Practice noun usage in grammar drills →',
  },
  {
    id:'kanji-rain', emoji:'🌧️', title:'The kanji that literally draws rain', tag:'Kanji',
    posts:[
      '雨 means "rain." Look at it: the top line is clouds, the four drops are rain falling. It\'s a weather diagram.',
      'But rain connects to: 雷 (thunder = rain + field), 雪 (snow = rain + broom), 雲 (cloud = rain + say).',
      '霜 (frost = rain + each other), 霧 (fog = rain + spirit), 電 (electricity = rain + lightning).',
      'The rain radical 雨appears in every weather word. Once you see it, weather forecasts become kanji puzzles you can solve. 🌦️',
    ],
    cta:'Learn weather kanji in kanji drills →',
  },
  {
    id:'sentence-ending', emoji:'💭', title:'The tiny particle that changes the entire sentence', tag:'Grammar',
    posts:[
      'Japanese sentence-ending particles are emotional seasoning. Same sentence, different particle = completely different vibe:',
      'いい天気だ (neutral statement: "Good weather.")',
      'いい天気ね (seeking agreement: "Nice weather, isn\'t it?")',
      'いい天気よ (assertive/feminine: "It IS nice weather.")',
      'いい天気な (explanatory: "It\'s good weather, you see.")',
      'Same words. Different emotion. These particles are why Japanese sounds so nuanced. They\'re the emoji of grammar. 😏',
    ],
    cta:'Practice sentence-ending particles in grammar drills →',
  },
  {
    id:'kanji-mountain', emoji:'⛰️', title:'The kanji that is literally a mountain', tag:'Kanji',
    posts:[
      '山 means "mountain." It\'s literally three peaks. The middle one is tallest. It\'s a picture.',
      'But look: 岩 (rock) = mountain + stone. 崖 (cliff) = mountain + danger. 島 (island) = mountain + bird.',
      'The mountain radical appears in: 岩 (rock), 岬 (cape), 崩 (collapse = mountain + month).',
      'My favorite: 岳 (high peak) = mountain + prison. Because climbing a high mountain feels like being trapped? Ancient humor. ⛰️',
    ],
    cta:'Learn mountain-kanji in kanji drills →',
  },
  {
    id:'reading-direction', emoji:'📖', title:'Japanese can be read in ANY direction', tag:'Culture',
    posts:[
      'Japanese can be written left-to-right (like English), right-to-left (traditional), OR top-to-bottom.',
      'Traditional books open from what Westerners call the "back" and read right-to-left, top-to-bottom.',
      'Modern websites and textbooks usually go left-to-right. But novels and manga often go traditional.',
      'As a learner, you\'ll mostly see left-to-right. But knowing this explains why manga panels flow differently — they\'re designed for top-to-bottom reading. 📚',
    ],
    cta:'Practice reading in reading drills →',
  },
  {
    id:'kanji-door', emoji:'🚪', title:'The kanji that opens your understanding', tag:'Kanji',
    posts:[
      '門 means "gate." It\'s literally two doors side by side. But it\'s also a radical that means "entrance to knowledge."',
      '問 (ask) = gate + mouth. Because asking = opening the gate of your mouth to let knowledge in.',
      '聞 (hear) = gate + ear. Because hearing = opening the gate of your ear.',
      '閉 (close) = gate + talent. Because closing = using your talent to shut the gate.',
      'See the pattern? 門 is about ACCESS. Opening gates to understanding. That\'s exactly what learning Japanese is. 🚪',
    ],
    cta:'Learn gate-kanji in kanji drills →',
  },
  {
    id:'adjective-types', emoji:'🎨', title:'Japanese has TWO types of adjectives', tag:'Grammar',
    posts:[
      'English adjectives don\'t change: "beautiful flower," "beautiful flowers." Easy.',
      'Japanese has い-adjectives (end in い) and な-adjectives (need な before nouns). They conjugate differently.',
      'い-adjectives: 美しい花 (beautiful flower), 美しくない (not beautiful), 美しかった (was beautiful).',
      'な-adjectives: 静かな部屋 (quiet room), 静かではない (not quiet), 静かだった (was quiet).',
      'The trick: if it ends in い, it\'s an い-adjective. If not, it\'s な. 90% accuracy with one rule. 🎯',
    ],
    cta:'Practice adjectives in grammar drills →',
  },
  {
    id:'kanji-rice', emoji:'🍚', title:'The kanji that means "rice" but also "Japan"', tag:'Kanji',
    posts:[
      '米 means "rice." But it\'s also in 米国 (USA = rice country), 米袋 (rice bag), 精米 (polished rice).',
      'Why is the US called "rice country"? It\'s short for 亜米利加 (America) — they picked 米 from the phonetic reading.',
      'But rice is deeper: ご飯 (cooked rice = meal), 朝ご飯 (breakfast), 晩ご飯 (dinner). In Japanese, rice IS the meal.',
      'The radical 米 appears in 粉 (flour = rice + divide), 糖 (sugar = rice + Tang dynasty). Rice is the foundation of Japanese food AND language. 🍙',
    ],
    cta:'Learn food kanji in kanji drills →',
  },
  {
    id:'sokuon', emoji:'⏸️', title:'The small っ that changes everything', tag:'Grammar',
    posts:[
      'The small っ (sokuon) doubles the next consonant. It looks tiny but it changes meaning:',
      'まち (machi = town) vs まっち (matchi = match). きて (kite = wear and come) vs きって (kitte = stamp).',
      'さき (saki = ahead) vs さっき (sakki = a moment ago). まて (mate = wait) vs まって (matte = waiting).',
      'It\'s not just spelling — it\'s a PAUSE. You literally stop for a beat. きって = "ki-[pause]-te." Get the pause wrong and you\'re saying a different word. ⏸️',
    ],
    cta:'Practice pronunciation in listening drills →',
  },
  {
    id:'kanji-woman', emoji:'👩', title:'The kanji that sparked a debate', tag:'Kanji',
    posts:[
      '女 means "woman." It\'s said to depict a woman sitting gracefully. But look at its combinations:',
      '好 (like/love) = woman + child. Because love = a mother holding her child.',
      '安 (safe/cheap) = roof + woman. Because a home is peaceful when a woman is inside. (Ancient gender roles, but that\'s the etymology.)',
      '妹 (younger sister) = woman + not-yet. Because she\'s not yet fully grown.',
      'Kanji etymology isn\'t always politically correct — it\'s 3000 years old. But it reveals how ancient people saw the world. 📜',
    ],
    cta:'Learn people-kanji in kanji drills →',
  },
  {
    id:'passive-voice', emoji:'🔄', title:'Japanese passive voice is WEIRD', tag:'Grammar',
    posts:[
      'English passive: "The cake was eaten." Simple. Japanese passive: ケーキが食べられた.',
      'But Japanese has a SECOND passive that English doesn\'t: the "suffering passive."',
      '友達に来られた = "I was come-to by a friend" = "My friend came (and it was annoying/inconvenient)."',
      '雨に降られた = "I was rained on" = "It rained on me (and I suffered)."',
      'The passive isn\'t just about switching subject/object — it can express that something happened TO YOU and you didn\'t want it. Japanese grammar has built-in feelings. 🌀',
    ],
    cta:'Practice passive voice in grammar drills →',
  },
  {
    id:'kanji-book', emoji:'📚', title:'The kanji that means "book" but started as "tree"', tag:'Kanji',
    posts:[
      '本 means "book" today. But originally it meant "root" or "origin" — it\'s 木 (tree) with a line marking the base.',
      'So "book" in Japanese literally means "the root/origin." Books are the roots of knowledge.',
      '本 appears in: 日本 (Japan = sun origin), 本当 (true = origin hit), 本気 (serious = origin spirit).',
      'And: 資本 (capital = resources origin), 忘本 (forget origins = root forget).',
      'Every time you read a book in Japanese, you\'re going back to the roots. That\'s poetry in a single character. 🌳',
    ],
    cta:'Learn 本 and its family in kanji drills →',
  },
  {
    id:'kanji-king', emoji:'👑', title:'The kanji that rules them all', tag:'Kanji',
    posts:[
      '王 means "king." It\'s a person with a horizontal line connecting heaven, earth, and humanity. The king connects all three.',
      'But look at its family: 玉 (jewel = king + drop), 皇 (emperor = king + white), 琴 (koto = king + present).',
      'And the plot twist: 全 (all/complete) = king + enter. Because a king\'s domain encompasses everything.',
      'Kanji isn\'t random strokes. It\'s a 3000-year-old visual language where every line has meaning. Learn the stories, not the strokes. 👑',
    ],
    cta:'Learn king-kanji in kanji drills →',
  },
  {
    id:'kanji-school', emoji:'🏫', title:'The kanji that explains Japanese education', tag:'Kanji',
    posts:[
      '学校 (school). 学 means "learning" — it\'s a child (子) under a roof with hands reaching up to knowledge.',
      '校 means "school building" — it\'s tree (木) + cross. Because a school is structured like a tree: roots, branches, growth.',
      'But the deeper one: 先生 (teacher) = "one who lives ahead." Your teacher has walked the path before you.',
      'And 学生 (student) = "one who lives learning." Your job isn\'t to know — it\'s to GROW. That\'s the Japanese philosophy of education in 4 characters. 🎓',
    ],
    cta:'Keep growing in your drills →',
  },
  {
    id:'kanji-love', emoji:'💕', title:'The kanji that has TWO words for love', tag:'Culture',
    posts:[
      'Japanese has two words for "love": 愛 (ai) and 恋 (koi). They\'re not interchangeable.',
      '愛 = deep, unconditional love. Parent for child, lifelong devotion, universal compassion.',
      '恋 = romantic love, passion, the feeling of falling for someone. 恋人 = lover. 恋しい = to yearn for.',
      '愛する人 = the person you love deeply. 恋する人 = the person you\'re in love with.',
      'English has one word "love" for everything. Japanese splits it: 愛 is the roots, 恋 is the flowers. 🌸',
    ],
    cta:'Learn love-words in vocabulary drills →',
  },
  {
    id:'kanji-time', emoji:'⌚', title:'The kanji that measured time with a temple', tag:'Kanji',
    posts:[
      '時間 (time). 時 = sun (日) + temple (寺). Because in ancient China, temples measured time by the sun.',
      '寺 (temple) itself = earth (土) + measure. A temple is a place where you measure the earth — and the heavens.',
      'So 時 literally means "sun measured at the temple." Time = the sun\'s position measured by priests.',
      'Every time you ask 何時？ (what time?), you\'re invoking a 3000-year-old tradition of monks tracking shadows. ⌚',
    ],
    cta:'Learn time-words in vocabulary drills →',
  },
  {
    id:'kanji-power', emoji:'💪', title:'The kanji that means "power" but started as "muscle"', tag:'Kanji',
    posts:[
      '力 means "power/strength." It\'s literally a flexed arm muscle. One stroke, one picture.',
      'But it builds: 効 (effect) = power + intersection. "Where power meets reality."',
      '助 (help) = power + mouth. "Using your strength to speak up for someone."',
      '動 (move) = heavy + power. "Power applied to weight." 勤 (diligence) = power + only. "Only power (effort) matters."',
      'The 力 radical appears in 50+ kanji. Once you see the muscle, you see strength everywhere in Japanese. 💪',
    ],
    cta:'Build your power in kanji drills →',
  },
  {
    id:'kanji-language', emoji:'🗣️', title:'The kanji that means "language" but is 5 mouths', tag:'Kanji',
    posts:[
      '語 (language/word) = 言 (say) + 五 (five) + 口 (mouth). Literally: "saying five mouths."',
      'Why five mouths? Because language = speaking to many people. Five = many in Japanese symbolism.',
      'But 言 (say) itself is a mouth with words coming out. And 口 (mouth) is a literal mouth.',
      'So 語 = "words from a mouth spoken to many mouths." That\'s what language IS, drawn in one character. 🗣️',
    ],
    cta:'Learn language-words in vocabulary drills →',
  },
  {
    id:'kanji-light', emoji:'💡', title:'The kanji that is literally a lightbulb', tag:'Kanji',
    posts:[
      '明 (bright) = 日 (sun) + 月 (moon). Two light sources = brightness. Simple and beautiful.',
      'But look deeper: 明 is in 明白 (obvious = bright white), 説明 (explanation = speak bright), 明日 (tomorrow = bright day).',
      'And 明るい (cheerful) = "bright." Because in Japanese, brightness isn\'t just physical — it\'s personality.',
      'A cheerful person is "bright." A dark mood is "dark" (暗い). Japanese maps emotions onto light and shadow. Every character is a metaphor. 💡',
    ],
    cta:'Learn light-words in vocabulary drills →',
  },
  {
    id:'kanji-old', emoji:'👴', title:'The kanji that means "old" but also "experienced"', tag:'Kanji',
    posts:[
      '古 (old) = 十 (ten) + 口 (mouth). Ten mouths = old. Because old = many years of speaking = many stories told.',
      'But "old" in Japanese isn\'t always negative. 古い (old) can mean "vintage, time-tested, respected."',
      '昔 (long ago) = literally "days stacked up." 昔話 = old tale = folktale.',
      'In Japan, old things aren\'t discarded — they\'re treasured. 古典 = classics. 古都 = ancient capital. "Old" = "proven." 👴',
    ],
    cta:'Learn time-words in vocabulary drills →',
  },
  // ── 30 NEW THREADS: longer posts, difficulty-marked, dopamine-driven reading practice ──
  {
    id:'tokyo-metro-mystery', emoji:'🚇', title:'The Tokyo metro mystery that stumps tourists', tag:'Reading', difficulty:'easy',
    posts:[
      'Tokyo has 882 train stations. That\'s more than London, Paris, and New York combined. But here\'s what nobody tells you:',
      'The announcements switch between Japanese and English — but the English versions are shorter. They drop details. 駅に到着します (we are arriving at the station) becomes just "arriving."',
      'So Japanese listeners get MORE information. They hear: まもなく千代田線、御茶ノ水駅です。お出口は左側です (Shortly: Chiyoda Line, Ochanomizu Station. Exit is on the left side).',
      'English listeners hear: "Ochanomizu, left side." That\'s it. No line name. No "shortly." Learning Japanese literally gives you more data about your world. 🚃',
      'Challenge: Next time you hear a station announcement, catch the full Japanese version. You\'ll hear details the English never mentions. The language IS the culture.',
    ],
    cta:'Practice station-name readings in vocabulary drills →',
  },
  {
    id:'convenience-store-gods', emoji:'🏪', title:'Why Japanese convenience stores are engineering marvels', tag:'Culture', difficulty:'easy',
    posts:[
      'コンビニ (konbini) in Japan aren\'t just stores. They\'re a national infrastructure. 7-Eleven, FamilyMart, Lawson — over 55,000 locations nationwide.',
      'Here\'s the crazy part: every konbini receives 3-4 deliveries PER DAY. Fresh food arrives at dawn, lunch sets at 11am, evening bentos at 5pm. The system is so precise that eggs from yesterday are already removed.',
      'The word 便利 (benri) means "convenient" — but it literally means 変 (change) + 理 (reason). Convenience = "the reason things change smoothly." Japanese didn\'t borrow the concept. They named the philosophy.',
      'And the fried chicken? Famichiki (FamilyMart chicken) has fan clubs. Lawson\'s karage has Instagram accounts. 7-Eleven\'s potato chips have ranking websites. This is convenience elevated to art. 🍗',
      'Language hack: コンビニで買う (buy at konbini) is one of the most common phrases in daily Japanese. Practice it — you\'ll use it every day in Japan.',
    ],
    cta:'Learn shopping vocabulary in the drills →',
  },
  {
    id:'emoji-japanese-roots', emoji:'😀', title:'The emoji you use daily were invented in Japan', tag:'Culture', difficulty:'easy',
    posts:[
      'The word "emoji" comes from Japanese: 絵 (e = picture) + 文字 (moji = character). They were literally "picture characters" created by Shigetaka Kurita in 1999 for a Japanese mobile carrier.',
      'The first 176 emoji were 12×12 pixel images. Hearts, weather, faces — all designed for a tiny screen. They were so popular that they spread globally and became the Unicode standard we use today.',
      'But here\'s the twist: Japan had "emoji" for centuries. 絵文字 originally referred to decorative kanji in Heian-era poetry. Noblewomen drew little pictures beside their waka poems to add emotional context.',
      'So when you send 😂 to a friend, you\'re continuing a 1,200-year-old Japanese tradition of combining pictures with text to express what words alone cannot. The digital age just made it global. 🎨',
      'The original 176 emoji are now in MoMA\'s permanent collection. A Japanese phone feature became world art. That\'s cultural influence on a pixel budget.',
    ],
    cta:'Explore culture-related vocabulary in the drills →',
  },
  {
    id:'sumo-life-secrets', emoji:'🤼', title:'A day in the life of a sumo wrestler (it\'s not what you think)', tag:'Reading', difficulty:'medium',
    posts:[
      '力士 (rikishi = sumo wrestler) wake up at 4:30 AM. Not to lift weights — but to train on an empty stomach. Training fasted is believed to build 気力 (kiriki = willpower) and 精神 (seishin = spirit).',
      'By 11:30 AM, training ends. Then comes the massive meal: 千円 (chankonabe = a stew with chicken, fish, tofu, vegetables, and rice). A typical rikishi eats 4,000-6,000 calories in one sitting. But it\'s all fresh, balanced, and cooked by the junior wrestlers.',
      'Here\'s what surprises people: rikishi don\'t eat junk food. No snacks, no soda. The weight comes from rice volume and chankonabe, not from garbage calories. The heaviest wrestler ever was 700 lbs — and his bloodwork was healthier than most office workers.',
      'After lunch, they nap for 3-4 hours. This is intentional: sleeping immediately after a huge meal maximizes weight retention. The body absorbs everything while at rest.',
      'At 6 PM, they wake, clean the stable, and have dinner (lighter than lunch). By 10 PM, all wrestlers are asleep. No phones, no nightlife. The 部屋 (heya = stable) is their entire world. 🏯',
      'The word 相撲 (sumou) means "mutual striking" — 相 (ai = mutual) + 撲 (bou = strike). But there\'s no punching in sumo. The "strike" is the clash of bodies at the tachi-ai (initial charge). It\'s two mountains colliding. That\'s the poetry of sumo.',
    ],
    cta:'Practice sports and daily-life vocabulary →',
  },
  {
    id:'kanji-suicide-myth', emoji:'💀', title:'The kanji so scary Japan tried to change it', tag:'Kanji', difficulty:'medium',
    posts:[
      '死 (shi = death) has 6 strokes and appears in 50+ common words: 死亡 (death), 死体 (corpse), 死刑 (death penalty), 必死 (desperate = "certain death").',
      'But in modern Japan, 死 is being quietly replaced. Hospitals use 終了 (completion) instead of 死亡. News says 急死 (sudden death) less often, preferring 亡くなる (to pass away) — which uses 亡 (to vanish), a softer character.',
      'The cultural reason: 死 carries 気 (ki = energy) that Japanese people avoid. Saying 死 directly is called 縁起が悪い (engi ga warui = bad luck). So Japanese has 20+ euphemisms for death: 逝去, 永眠, 昇天, 他界, 物故...',
      'Even the number 4 (四/し) is avoided because it\'s a homophone with 死. Hospitals skip the 4th floor. Parking lots skip stall #4. This isn\'t superstition — it\'s linguistic empathy built into architecture.',
      'But here\'s the beautiful part: 死 also appears in 死に物狂い (shinimono-gurui = fighting to the death = giving everything you have). And in 死ぬ気で (shinu ki de = "with the spirit of death" = with all your might). Death-energy, channeled into effort. That\'s the Japanese way. ⚡',
    ],
    cta:'Learn emotional kanji in the kanji drills →',
  },
  {
    id:'vending-machine-nation', emoji:'🥤', title:'Japan has 5.5 million vending machines (that\'s 1 per 23 people)', tag:'Culture', difficulty:'easy',
    posts:[
      '自販機 (jihanki = vending machine) are everywhere in Japan. 5.5 million of them. That\'s one for every 23 people. You can find them on mountain hiking trails, in temple gardens, even on remote islands.',
      'What do they sell? Everything. Hot corn soup in winter. Ice cream in summer. Fresh eggs. Flowers. Ties. Umbrellas. Toilet paper. Fishing bait. One in Osaka sells 50+ types of ramen tickets.',
      'The word 自販機 breaks down: 自 (ji = self) + 販 (han = sell) + 機 (ki = machine). "Self-selling machine." But the philosophy is deeper — it\'s about 信用 (shinyou = trust). The machine trusts you to pay. You trust the machine to deliver. No human needed.',
      'Crime rate is so low that machines in rural areas are never vandalized. Some have been standing for 40 years, maintained by elderly owners who refill them daily. It\'s not commerce — it\'s community. 🤝',
      'Language tip: 自販機で買う (buy from a vending machine) is everyday Japanese. Learn 自 (self) — it appears in 自分 (oneself), 自由 (freedom), 自然 (nature). One kanji, a whole worldview.',
    ],
    cta:'Learn daily-life kanji in the drills →',
  },
  {
    id:'haiku-in-space', emoji:'🌌', title:'The haiku that went to space (and changed NASA)', tag:'Reading', difficulty:'hard',
    posts:[
      'In 1998, Japanese astronaut Mamoru Mohri carried a haiku to the Space Shuttle Discovery. The poem, by 17th-century master Basho, was: 古池や蛙飛び込む水の音 (furu ike ya / kawazu tobikomu / mizu no oto).',
      'Translation: "Old pond — a frog jumps in, sound of water." 17 syllables. Three images. A still pond, a sudden movement, a single sound. That\'s all. But Basho captured the entire philosophy of 間 (ma = negative space) in one poem.',
      'NASA published the haiku in their mission archive. Engineers noted that the poem\'s structure — maximum meaning in minimum form — was exactly what spacecraft communication needed. When every byte costs thousands of dollars, you learn to write like Basho.',
      'The concept of 間 (ma) is uniquely Japanese. It\'s the silence between notes that makes music. The pause between words that gives meaning. The empty space in a painting that defines the subject. Western culture fills space. Japanese culture respects it.',
      'Here\'s your challenge: write a haiku about your day. 5-7-5 syllables. No wasted words. Feel the constraint that makes every character precious. This is why Japanese is a language of precision — it was built by people who counted syllables. 📝',
    ],
    cta:'Practice reading comprehension in the drills →',
  },
  {
    id:'why-japanese-no-pan', emoji:'🍞', title:'The word "pan" traveled from Portugal to Japan to your kitchen', tag:'Vocabulary', difficulty:'easy',
    posts:[
      'パン (pan = bread) is one of the first words Japanese learners know. But it\'s not originally Japanese. It came from Portuguese in the 1500s — the first European traders to reach Japan.',
      'Portuguese missionaries brought bread, castella cake, tempura (from temperar), and even the word botan (button). Japan absorbed these words so completely that today, most Japanese people think パン is native.',
      'This is called 和製英語 (wasei-eigo = Japanese-made English) when the source is English, but パン is 和製ポルトガル語 (wasei-portugalugo). There are over 300 Portuguese-derived words still used daily.',
      'The lesson? Languages are living things. They borrow, adapt, and make foreign concepts their own. Japanese didn\'t "steal" パン — it adopted it, gave it hiragana, and made it Japanese. That\'s not impurity. That\'s evolution. 🍞',
      'Try this: next time you eat bread, say パンを食べる (pan wo taberu). You\'re speaking 500-year-old globalized Japanese. History in every bite.',
    ],
    cta:'Learn food vocabulary in the drills →',
  },
  {
    id:'apology-grammar-labyrinth', emoji:'🙇', title:'Japan has 15+ ways to apologize (and each is different)', tag:'Grammar', difficulty:'medium',
    posts:[
      '謝る (ayamaru = to apologize) in Japanese is a labyrinth. The level of formality changes the word entirely. Let\'s map the hierarchy:',
      'ごめん (gomen) — casual, friends. "Sorry." ごめんなさい (gomen nasai) — slightly formal, to family. すみません (sumimasen) — standard, to strangers. It also means "excuse me" — because acknowledging you bothered someone IS the apology.',
      '申し訳ありません (moushiwake arimasen) — business formal. Literally "there is no way to express (my regret)." This is used when you messed up at work. 失礼しました (shitsurei shimashita) — "I was rude." Used after a social faux pas.',
      'Then there\'s 反省します (hansei shimasu = "I will reflect on this"). This isn\'t an apology — it\'s a commitment. Japanese culture values 反省 (self-reflection) more than the word "sorry." Saying sorry without reflection is meaningless.',
      'The deepest form? 土下座 (dogeza = dropping to one\'s knees and bowing). This is for serious wrongs — and in modern Japan, it\'s considered excessive. Over-apologizing is actually a social mistake. The art is matching the apology to the situation. 🎭',
      'Grammar hack: すみませんが (sumimasen ga = "I\'m sorry but...") is the most useful phrase in Japanese. It softens any request. "Sumimasen ga, kore wo kudasai" = "Sorry to bother you, but can I have this?" Learn it. Live it.',
    ],
    cta:'Master apology grammar in the grammar drills →',
  },
  {
    id:'cat-cafe-language', emoji:'🐱', title:'The hidden language of Japanese cat cafes', tag:'Culture', difficulty:'easy',
    posts:[
      '猫カフェ (neko cafe = cat cafe) started in Taiwan but became a Japanese cultural phenomenon. Tokyo alone has 60+ cat cafes. The reason? Most apartments ban pets. Cat cafes fill the gap.',
      'The vocabulary of cat cafes is unique: 入店 (nyuuten = entering), 制服 (seifuku = the cafe\'s uniform for cats — yes, some cats wear outfits), and 常連客 (jourenkyaku = regular customers who have favorite cats).',
      'The most common phrase you\'ll hear: 寝てるね (neteru ne = "sleeping, huh"). Cats sleep 16 hours a day, so most visits involve watching cats sleep. Japanese people find this relaxing. The word 癒やし (iyashi = healing) is used — cat cafes are "healing spaces."',
      'There\'s even a ranking system. Some cafes display each cat\'s 人気度 (ninkido = popularity score). The top cat gets a special cushion. The bottom cat gets... also a cushion. This is Japan — everyone gets a cushion. 🐈',
      'Language tip: 猫 (neko) appears in dozens of idioms. 猫の手も借りたい (neko no te mo karitai = "want to borrow even a cat\'s hand" = extremely busy). 猫をかぶる (neko wo kaburu = "wear a cat" = hide your true self). Cats aren\'t just pets in Japanese — they\'re metaphors for life.',
    ],
    cta:'Learn animal-related vocabulary in the drills →',
  },
  {
    id:'train-bentou-art', emoji:'🍱', title:'The 1,000-year evolution of the Japanese bento', tag:'Reading', difficulty:'medium',
    posts:[
      '弁当 (bentou = boxed meal) has been around since the 5th century. Originally, it was dried rice carried in bags by hunters and soldiers. By the Kamakura period (1185), it became 弁当 — cooked rice in lacquered boxes.',
      'The word 弁当 breaks down beautifully: 弁 (ben = convenience) + 当 (tou = appropriate). A "convenient appropriate" meal. The kanji themselves describe the philosophy: the right food, at the right time, in the right container.',
      'During the Edo period (1603), bentou became art. 風景弁当 (fuukei bentou = landscape bento) arranged food to look like seasons — cherry blossoms in spring, maple leaves in autumn. Mothers spent hours making 食育 (shokuiku = food education) bentou for children.',
      'Modern キャラ弁 (kyara-ben = character bento) turns rice into Totoro, Pikachu, or Doraemon. Some mothers spend 2 hours daily on these. It\'s not just food — it\'s 愛情 (aijou = affection) made edible. The bento IS a love letter.',
      'Station bentou (駅弁, ekiben) are regional masterpieces. Tokyo Station sells 200+ varieties from across Japan. Each represents its region: crab bento from Hokkaido, eel bento from Shizuoka, beef bento from Kobe. You can travel Japan through bentou. 🚄',
      'Challenge: Learn 弁当 (bentou) and 駅弁 (ekiben). They\'re among the most useful words for travel. And next time you pack lunch, think about 食育 — what is your food teaching you?',
    ],
    cta:'Practice food and travel vocabulary →',
  },
  {
    id:'four-writing-systems', emoji:'✍️', title:'Why Japan uses 4 writing systems (and why it works)', tag:'Kanji', difficulty:'hard',
    posts:[
      'Japanese uses FOUR writing systems simultaneously: 漢字 (kanji = Chinese characters), ひらがな (hiragana = native syllabary), カタカナ (katakana = foreign word syllabary), and ローマ字 (romaji = Latin alphabet). It looks chaotic. It\'s actually genius.',
      'Each system has a job. Kanji carries meaning — 木 means "tree" regardless of pronunciation. Hiragana handles grammar — は, が, を, conjugations. Katakana marks foreign words — コーヒー (coffee), アメリカ (America). Romaji is for international contexts.',
      'The magic happens when they combine. 食べられなかった (taberarenakatta = couldn\'t eat) mixes kanji 食 (eat) with hiragana べられなかった (grammar). Your brain processes meaning (kanji) and grammar (hiragana) in parallel. It\'s like reading two languages at once.',
      'Studies show Japanese readers use different brain regions for each system. Kanji activates the visual recognition area (like seeing logos). Hiragana activates the phonetic area (like hearing sounds). This dual-pathway reading makes Japanese uniquely fast for skilled readers.',
      'The proof: Japanese has the highest reading speed per character in the world. A skilled reader processes 700+ characters per minute. The "inefficiency" of 4 systems is actually a feature — each system is optimized for its role. 🧠',
      'Learning hack: don\'t fight the 4 systems. Embrace them. Learn kanji for meaning, hiragana for grammar, katakana for loanwords. They\'re not redundant — they\'re specialized tools. You don\'t use a hammer for everything. Same principle.',
    ],
    cta:'Master all four writing systems in the drills →',
  },
  {
    id:'silence-is-speaking', emoji:'🤫', title:'In Japanese, silence is a word (and it has grammar)', tag:'Grammar', difficulty:'hard',
    posts:[
      'Japanese has a concept called 沈黙 (chinmoku = silence) that functions as communication. In Western cultures, silence is awkward — people fill it with "um," "well," "you know." In Japanese, silence is meaningful.',
      'There\'s a famous phrase: 沈黙は金 (chinmoku wa kin = silence is golden). But in Japanese communication, silence isn\'t just golden — it\'s grammatical. A pause after a question can mean "I\'m thinking," "I disagree but won\'t say it," or "I heard you."',
      'The word 黙る (damaru = to be silent) has rich usage. 黙って従う (damatte shitagau = silently obey). 黙って去る (damatte saru = silently leave). 黙れ (damare = shut up!). The silence has agency — it\'s an action, not an absence.',
      'In business meetings, Japanese participants often pause for 5-10 seconds before responding. Westerners interpret this as hesitation. It\'s actually 検討中 (kentou-chuu = under consideration). The silence means "I take your words seriously enough to think before responding."',
      'The deepest form: 返事をしない (henji wo shinai = not replying) can itself be a reply. In Japanese culture, not answering IS an answer — usually "no, but I don\'t want to say it directly." This is 空気を読む (kuuki wo yomu = reading the air). 🌸',
      'Challenge: In your next conversation, try a 3-second pause before responding. Notice how it changes the dynamic. That\'s Japanese communication — the spaces between words matter as much as the words themselves.',
    ],
    cta:'Practice conversational grammar in the drills →',
  },
  {
    id:'pokemon-name-secrets', emoji:'⚡', title:'Pokémon names are Japanese puns you didn\'t notice', tag:'Vocabulary', difficulty:'medium',
    posts:[
      'Pokémon names are linguistic masterpieces. Each Japanese name is a portmanteau that reveals the creature\'s nature. Let\'s decode a few:',
      'ピカチュウ (Pikachu) = ピカピカ (pika-pika = sparkling/onomatopoeia for electric flashes) + チュウ (chuu = squeak, the sound a mouse makes). Pikachu literally means "sparkling squeak." The English name kept it — but you lost the poetry.',
      'フシギダネ (Fushigidane = Bulbasaur) = 不思議 (fushigi = mysterious) + 種 (dane = seed). "Mysterious seed." Every time you say Bulbasaur, you\'re missing the mystery. The Japanese name tells you what it IS.',
      'ゼニガメ (Zenigame = Squirtle) = 銭亀 (zeni-game = coin turtle). Because its shell looks like an old Japanese coin. The English name "Squirtle" (squirt + turtle) is cute. But the Japanese name has cultural depth — it references actual currency.',
      'The pattern continues: リザードン (Lizardon = Charizard) = リザード (lizard) + ドン (don = boss/king). Charizard isn\'t just a char-lizard. In Japanese, he\'s the Lizard King. 🐉',
      'Language insight: Japanese wordplay (駄洒落, dajare = pun) is a national art form. Pokémon names are dajare at the highest level — each one teaches vocabulary, onomatopoeia, and cultural references in a single word. You\'re not just catching monsters. You\'re catching language. ⚡',
    ],
    cta:'Learn onomatopoeia and wordplay in vocabulary drills →',
  },
  {
    id:'japanese-toilet-civilization', emoji:'🚽', title:'Japanese toilets are smarter than your phone (literally)', tag:'Reading', difficulty:'easy',
    posts:[
      '日本のトイレ (Nihon no toire = Japanese toilets) are world-famous. The Washlet, made by TOTO, has: heated seats, bidet spray, air dryer, deodorizer, white noise, and automatic lid. Some models analyze your waste for health metrics.',
      'The word 洗浄 (senjou = cleansing) is on every button. 音姫 (oto-hime = sound princess) is a device that plays running water sounds to mask bathroom noise. It was invented because Japanese women were flushing twice to cover sounds — wasting water. The oto-hime saved millions of liters.',
      'But here\'s the cultural depth: トイレ (toire) comes from English "toilet," but the old Japanese word is 雪隠 (setchin = "snow hiding"). Why "snow hiding"? Because ancient Japanese outhouses were cold, and "snow" was a euphemism for what you did there. Poetry, even for toilets.',
      'Public toilets in Japan are FREE and CLEAN. Every convenience store, park, and station has one. The cultural logic: 衛生 (eisei = hygiene) is a public responsibility, not a private luxury. Clean toilets = civilized society. 🧼',
      'Language hack: お手洗い (otearai = restroom) literally means "hand-washing place." It\'s the polite word for toilet. トイレ is casual. 便所 (benjo) is crude. Knowing which to use is a social skill. Start with お手洗い — you can\'t go wrong.',
    ],
    cta:'Learn daily-life vocabulary in the drills →',
  },
  {
    id:'cherry-blossom-military', emoji:'🌸', title:'How cherry blossoms became a military symbol (and why it matters)', tag:'Culture', difficulty:'hard',
    posts:[
      '桜 (sakura = cherry blossom) is Japan\'s national flower. But its meaning goes far deeper than "pretty pink petals." The sakura blooms for exactly 7 days, then falls. This ephemerality — 儚さ (hakanasa = fleetingness) — is the core of Japanese aesthetics.',
      'During WWII, the military government used sakura as propaganda. Kamikaze pilots painted cherry blossoms on their planes. The message: like sakura, you bloom briefly but beautifully, then fall for your country. 桜花散る (ouka chiru = cherry blossoms fall) became code for dying in battle.',
      'But this was a corruption of the original meaning. In Heian poetry (794-1185), sakura represented 物の哀れ (mono no aware = the pathos of things) — the gentle sadness that beautiful things don\'t last. It was never about death being noble. It was about appreciating life BECAUSE it\'s brief.',
      'After the war, Japan reclaimed sakura. Today, お花見 (ohanami = flower viewing) is a celebration of life. Millions sit under sakura trees, eat, drink, and laugh. The petals fall on their food, and nobody minds. The fleeting beauty is the point, not the sadness.',
      'The word 散る (chiru = to fall/scatter) is used for both petals and death. But 散る also means "to give your all" — 散り際 (chiri-zawa = the way one falls/finals moments) is about how you end, not just that you end. A sakura falls beautifully. So should a life. 🌸',
      'Reflection: When you learn 桜, you\'re not just learning "cherry blossom." You\'re learning a 1,300-year philosophy about impermanence, beauty, and how to live fully because nothing lasts. That\'s the weight of a single kanji.',
    ],
    cta:'Explore cultural kanji in the drills →',
  },
  {
    id:'japanese-laughter-words', emoji:'😂', title:'Japanese has 20+ words for laughing (each is different)', tag:'Vocabulary', difficulty:'medium',
    posts:[
      '笑う (warau = to laugh) is the basic word. But Japanese has a rainbow of laughter words, each with a different nuance:',
      'クスクス (kusukusu) = giggling quietly, like children trying not to be heard. ニヤニヤ (niyaniya) = smirking, a sly smile. ゲラゲラ (geragera) = belly laughing, loud and uncontrolled. フフフ (fufufu) = a knowing chuckle, like a villain or someone with a secret.',
      'Then there\'s 苦笑 (kushou = bitter smile) — laughing when something is painful but you smile anyway. 満面の笑み (manmen no emi = a face full of smiles) — beaming, the biggest possible smile. 爆笑 (bakushou = explosive laughter) — the kind that makes you double over.',
      'The onomatopoeia is where it gets wild: ぷっ (pu) = a sudden snort of laughter you couldn\'t hold in. うける (ukeru) = "that\'s hilarious" (slang). ウケる (ukeru) = same but with katakana emphasis. テヘペロ (tehepero) = sticking your tongue out after a mistake, laughing it off.',
      'And the most Japanese one: 照れ笑い (tere-warai = embarrassed laugh) — the smile you make when someone compliments you and you don\'t know how to respond. Japanese culture values 謙遜 (kenson = humility), so 照れ笑い is the most common laugh in daily life. 😊',
      'Challenge: Learn 3 laughter words today. クスクス (giggle), ゲラゲラ (belly laugh), 苦笑 (bitter smile). You\'ll hear them in anime, dramas, and real life. Japanese laughter is a spectrum — each type tells you exactly how someone feels.',
    ],
    cta:'Master onomatopoeia in vocabulary drills →',
  },
  {
    id:'mount-fuji-secret-name', emoji:'🗻', title:'Mount Fuji has a secret name that most Japanese don\'t know', tag:'Culture', difficulty:'medium',
    posts:[
      '富士山 (Fuji-san) is Japan\'s tallest mountain (3,776m) and most iconic symbol. But its "real" name in ancient texts was 不二山 (Fuji-san = "not-two mountain") — meaning there is no second mountain like it. Unique. Peerless. One of a kind.',
      'Another old name is 不尽山 (Fujisan = "never-ending mountain") — because from any angle, Fuji seems to go on forever. The kanji 不尽 (fujin) means "inexhaustible." Fuji wasn\'t just a mountain — it was a concept of eternity.',
      'The current kanji 富士 (fuji) means "rich + gentleman/samurai." This was chosen in the Edo period for elegance. But the mountain\'s spiritual name, used by Shinto priests, is 富士山本宮浅間大社 (Fujisan Honguu Sengen Taisha) — the great shrine that guards Fuji.',
      'Here\'s the crazy part: Fuji is owned by... a shrine. From the 8th station up, the mountain belongs to Sengen Taisha. The Japanese government can\'t build on it without the shrine\'s permission. A mountain owned by gods. That\'s why Fuji has no buildings on its summit. ⛰️',
      'And the climbing season? Only 2 months: July and August. Outside that, Fuji is officially closed. The word 閉山 (heizan = mountain closing) is a real legal term. Fuji isn\'t a tourist attraction — it\'s a sacred entity that allows visitors for 60 days a year.',
      'Language tip: 山 (yama/san = mountain) has two readings. 富士山 is "Fuji-san" (onyomi), but 火山 (kazan = volcano) uses "zan." 山 itself alone is "yama" (kunyomi). One kanji, three readings. That\'s Japanese.',
    ],
    cta:'Learn geography kanji in the drills →',
  },
  {
    id:'work-culture-overwork', emoji:'💼', title:'The word for "death by overwork" exists only in Japanese', tag:'Reading', difficulty:'hard',
    posts:[
      '過労死 (karoushi = death from overwork) is a word that exists only in Japanese. It was coined in the 1980s when factory workers began dying from stress-induced heart attacks and strokes. The word has since entered international medical literature — because no other language needed it.',
      'The breakdown: 過 (ka = excess) + 労 (rou = labor) + 死 (shi = death). "Excess-labor-death." Three kanji that describe a social crisis so specific that the WHO adopted the term untranslated.',
      'Japan\'s work culture is built on 根性 (konjou = willpower/grit) and 会社人間 (kaisha ningen = company human). The idea that your identity IS your company. Salarymen (サラリーマン) work 60+ hour weeks, then drink with colleagues until midnight. It\'s not just expected — it\'s considered virtuous.',
      'But change is coming. The government introduced プレミアムフライデー (Premium Friday = leaving work at 3 PM on the last Friday of each month). Results? 11% participation. Because in Japanese culture, leaving early while others stay is 恥ずかしい (hazukashii = shameful).',
      'The newer generation pushes back. 過労死ライン (karoushi line = the threshold of 80 hours overtime/month) is now a legal standard. If you exceed it, your company is liable. Young workers use the word 退勤 (taikin = clocking out) with pride. Leaving on time is becoming an act of rebellion. ✊',
      'Reflection: 過労死 teaches us that languages create words for what matters to their culture. Japanese needed a word for overwork death because it was happening. What social problems does YOUR language name? What does that say about your culture?',
    ],
    cta:'Learn workplace vocabulary in the drills →',
  },
  {
    id:'japanese-ghost-grammar', emoji:'👻', title:'Japanese ghost stories use grammar that doesn\'t exist in English', tag:'Reading', difficulty:'hard',
    posts:[
      'Japanese horror (怪談, kaidan = ghost stories) uses a specific grammatical form that creates unease: the 〜たら (tara = if/when) conditional left unresolved. "扉を開けたら..." (When I opened the door...) — and then silence. The sentence just... stops.',
      'In English, an incomplete sentence is a mistake. In Japanese horror, it\'s a technique. The unfinished たら implies something happened that the speaker cannot — or will not — describe. Your brain fills in the horror. The grammar makes YOU the storyteller.',
      'Another technique: using た (ta = past tense) for present events. 急に背後に気配を感じた (I suddenly felt a presence behind me) — but the narrator uses past tense even while narrating in present. This creates 時制のズレ (jisei no zure = tense slippage), making the reader feel time is wrong.',
      'The word 怪談 (kaidan) breaks down: 怪 (kai = strange/mysterious) + 読 (dan = recitation). A "strange recitation." But 怪 also appears in 妖怪 (youkai = supernatural creatures), 怪物 (kaibutsu = monster), and 7月の怪談 (shichigatsu no kaidan = July ghost stories — because summer is ghost season in Japan).',
      'The most chilling Japanese word: ふと (futo = suddenly, without warning). ふと振り返ると (futo furikaeru to = when I suddenly turned around...). This word appears in 90% of Japanese ghost stories. It\'s the linguistic trigger for fear. When you read ふと, something is about to appear. 👻',
      'Challenge: Read a Japanese ghost story (try 怪談 by Lafcadio Hearn, available free online). Notice the grammar — the unfinished sentences, the tense shifts, the ふと moments. Japanese horror isn\'t about monsters. It\'s about the language of uncertainty.',
    ],
    cta:'Practice advanced reading in the drills →',
  },
  {
    id:'anime-subtitle-lies', emoji:'🎬', title:'What anime subtitles hide from you (and why it matters)', tag:'Reading', difficulty:'medium',
    posts:[
      'Anime subtitles are translations, and translations lie. Not intentionally — but they lose things. Let\'s decode what you\'re missing:',
      'When a character says 仕方ない (shikata nai = "it can\'t be helped"), subtitles often say "whatever" or "I guess so." But 仕方ない carries a philosophy: 受容 (juyou = acceptance). It\'s not apathy — it\'s the Japanese art of making peace with what you cannot change. "Whatever" is wrong.',
      'When a tsundere says うるさい (urusai = "shut up"), subtitles translate it literally. But うるさい has 5+ meanings: "you\'re annoying," "I\'m embarrassed," "stop being nice to me," "I like you but won\'t admit it," and "I\'m overwhelmed." The context IS the meaning. Subtitles can\'t show that.',
      '先輩 (senpai = senior) is translated as the person\'s name. But senpai is a RELATIONSHIP word. It implies hierarchy, respect, and sometimes romantic tension. When a character says "Senpai..." the subtitle says "Takashi..." — and you lose the entire social dynamic in one word.',
      'The biggest loss: 沈黙 (chinmoku = silence). Anime characters often pause for 3-5 seconds with no dialogue. Subtitles show nothing. But in Japanese, that silence is loaded — it means hesitation, embarrassment, anger, or love. The silence IS the line. Subtitles erase it.',
      'Here\'s the truth: watching anime with subtitles is watching a shadow of the original. Learning Japanese lets you see the real thing. Every 仕方ない, every うるさい, every silent pause — you\'ll finally hear what was always there. 🎌',
      'Challenge: Watch a 5-minute anime clip WITHOUT subtitles. Write down words you catch. Then watch with subtitles. Notice what was added, changed, or erased. That gap is what learning Japanese gives you.',
    ],
    cta:'Practice listening comprehension in the drills →',
  },
  {
    id:'japanese-sound-words', emoji:'🔊', title:'Japanese has 1,000+ sound words that don\'t exist in English', tag:'Vocabulary', difficulty:'medium',
    posts:[
      'オノマトペ (onomatope = onomatopoeia) in Japanese is a universe. English has "buzz," "splash," "bang." Japanese has over 1,000 sound words — and they\'re used constantly, in daily conversation, by adults.',
      'Heartbeat: ドキドキ (doki-doki = heart pounding, from excitement or love). ゾクゾク (zoku-zoku = shivering with thrill/fear). ヒヤヒヤ (hiya-hiya = nervous, cold sweat). Each describes a DIFFERENT type of heartbeat. English says "heart pounding" for all three.',
      'Silence: シーン (shiin = dead silence). ジリジリ (jiri-jiri = tense silence, like waiting for results). ピリピリ (piri-piri = electric tension, like before a fight). Japanese doesn\'t just describe silence — it describes the FEELING of silence.',
      'Eating: パクパク (paku-paku = eating in big bites). ペチャペチャ (pecha-pecha = eating with mouth open). チュパチュパ (chupa-chupa = sucking, like a lollipop). ゴクリ (gokuri = swallowing hard, from thirst or nervousness). Each is a precise eating sound.',
      'The wildest ones: テクテク (teku-teku = walking steadily), ヨチヨチ (yochi-yochi = toddler walking), ドタドタ (dota-dota = running with heavy footsteps), スタスタ (suta-suta = walking briskly/confidently). Japanese has 30+ words just for WALKING. 🚶',
      'Why this matters: onomatopoeia appears in 50% of Japanese sentences. If you don\'t learn them, you understand half the language. Start with ドキドキ (excited), ワクワク (anticipating), ギリギリ (just barely), and ピンポン (correct!). You\'ll hear them everywhere.',
    ],
    cta:'Master onomatopoeia in vocabulary drills →',
  },
  {
    id:'tea-ceremony-philosophy', emoji:'🍵', title:'The tea ceremony is a philosophy disguised as a drink', tag:'Culture', difficulty:'hard',
    posts:[
      '茶道 (sadou = the way of tea) looks simple: someone makes tea, you drink it. But each movement takes years to master. The bow, the turn of the bowl, the placement of the whisk — every gesture has 意味 (imi = meaning) rooted in 400 years of tradition.',
      'The core philosophy is 侘寂 (wabi-sabi): beauty in imperfection, impermanence, and incompleteness. A tea bowl with an uneven rim is MORE valuable than a perfect one. The crack is the character. The asymmetry is the art.',
      'There are 4 principles: 和 (wa = harmony), 敬 (kei = respect), 清 (sei = purity), 寂 (jaku = tranquility). These aren\'t abstract — they\'re physical. 和 means sitting in harmony with the room. 敬 means bowing to the tea. 清 means cleaning the bowl visibly. 寂 means the silence of the moment.',
      'The word 一期一会 (ichigo ichie = one time, one meeting) comes from tea ceremony. It means: this exact moment, with these exact people, will never happen again. So treat it with full presence. The tea you\'re served right now is the only tea that will ever exist in this moment. 🍵',
      'A full tea ceremony lasts 4 hours. The tea itself takes 2 minutes to make. The rest is: admiring the scroll, eating sweets, viewing the garden, cleaning, bowing. The tea is the excuse. The ceremony is the point. You\'re not drinking tea — you\'re practicing being alive.',
      'Language insight: 茶道 (sadou) uses 道 (dou = the way). This appears in 剣道 (kendo = way of the sword), 書道 (shodou = way of calligraphy), 花道 (kadou = way of flowers). In Japan, anything practiced deeply becomes a 道 — a path. The destination is the practice itself.',
    ],
    cta:'Learn philosophical kanji in the drills →',
  },
  {
    id:'japanese-prison-food', emoji:'🍚', title:'Japanese prison food is better than school lunches (seriously)', tag:'Reading', difficulty:'medium',
    posts:[
      'Japanese prisons serve nutritionally balanced meals: rice, miso soup, fish, vegetables, and pickles. Calories are calculated precisely: 2,400-2,600 per day. The food is so good that some elderly people commit minor crimes just to get free meals. This is a documented social issue.',
      'The word 刑務所 (keimusho = prison) food follows 食事規定 (shokuji kitei = meal regulations) set by the Ministry of Justice. Every meal must meet nutritional standards. Breakfast: rice, miso, grilled fish. Lunch: noodles or curry. Dinner: rice, soup, meat, vegetables.',
      'Prisoners cook the food themselves — under supervision. This is part of 更生 (kousei = rehabilitation). Learning to cook is considered a skill for reintegration. The kitchen is the most coveted job in prison. Waiting lists are years long.',
      'Compare: Japanese school lunches (給食, kyushoku) are also excellent — but prisons actually have HIGHER food standards. Schools sometimes use processed foods. Prisons use fresh ingredients because the law requires it. The irony is not lost on Japanese commentators.',
      'But don\'t romanticize it. Prison life is strict: meals eaten in 20 minutes, no seconds, no snacks, no coffee. The food is good but the freedom is zero. The word 拘禁 (koukin = confinement) reminds us: good food doesn\'t make a good life. 🍽️',
      'Language tip: 食事 (shokuji = meal) is one of the most useful words. 朝食 (choushoku = breakfast), 昼食 (chuushoku = lunch), 夕食 (yuushoku = dinner). Learn the pattern — one kanji (食) unlocks the entire meal vocabulary.',
    ],
    cta:'Learn food-related vocabulary in the drills →',
  },
  {
    id:'why-japanese-so-fast', emoji:'⚡', title:'Japanese is the fastest spoken language (science says so)', tag:'Reading', difficulty:'medium',
    posts:[
      'A 2011 University of Lyon study measured speech speed in 7 languages. Japanese was the FASTEST: 7.84 syllables per second. English: 6.19. Spanish: 7.84. Mandarin: 5.18. Japanese speakers pack more sounds into every second than any other language.',
      'But here\'s the twist: Japanese transmits information at the SAME rate as other languages. How? Because each syllable carries LESS information. Japanese uses more syllables to say the same thing, but says them faster. The information-per-second is equal.',
      'This means: Japanese isn\'t "fast" — it\'s "dense in syllables, light in meaning per syllable." The language compensates for having fewer meaning-units (simple syllables, no tones) by speaking them rapidly. It\'s an efficiency trade-off.',
      'For learners, this explains why Japanese sounds overwhelming at first. Your brain processes English at 6 syllables/second. Japanese hits you at 8. That\'s 30% more data per second. The solution? Your brain adapts. After 3 months of listening practice, the speed feels normal.',
      'The word 速い (hayai = fast) vs 早い (hayai = early) — same pronunciation, different kanji. 速い is for speed (cars, speech). 早い is for time (morning, early arrival). Japanese separates concepts that English conflates. Precision through kanji. ⚡',
      'Challenge: Watch a Japanese news clip. It\'ll feel impossibly fast. Then watch the same clip 3 times. By the third, you\'ll catch individual words. That\'s your brain recalibrating to 7.84 syllables/second. You\'re upgrading your processing speed.',
    ],
    cta:'Practice listening speed in the drills →',
  },
  {
    id:'japanese-name-kanji-lottery', emoji:'🎰', title:'Japanese parents play kanji lottery with their children\'s names', tag:'Culture', difficulty:'hard',
    posts:[
      'Japanese names are chosen from a government-approved list of 2,136 常用漢字 (jouyou kanji = regular-use kanji) plus 863 人名用漢字 (jinmeiyou kanji = name-only kanji). That\'s nearly 3,000 characters parents can use to name a child. Each combination creates a unique meaning.',
      'The same name can have completely different meanings depending on kanji choice. "Haruka" can be: 遥か (far/distant), 春香 (spring fragrance), 晴香 (sunny fragrance), 遥花 (distant flower), or 20+ other combinations. The pronunciation is the same. The meaning is the parents\' choice.',
      'This creates a naming philosophy. Parents don\'t just pick a name — they pick the KANJI, which determines the child\'s 言霊 (kotodama = spirit of the word). A child named 勇気 (Yuuki = courage) carries that kanji for life. The name is a wish, a blessing, and a destiny.',
      'Recent trends: キラキラネーム (kira-kira neemu = sparkly names) use unusual kanji readings. A child named 光宙 (pikachin) — yes, that\'s a real name. Or 王子 (ouji = prince) read as "Prince." These names are controversial. Some can\'t be read by teachers. Japan is debating whether to regulate them.',
      'The deepest tradition: 四字熟語 (yoji-jukugo = four-character idioms) sometimes inspire names. A family might name their child after 志堅 (shiken = strong will) hoping the kanji\'s spirit shapes the child. It\'s not superstition — it\'s intention. The name is the first gift. 🎁',
      'Language insight: Learning to read Japanese names is a skill unto itself. Even native speakers sometimes can\'t read unfamiliar names. That\'s why 名刺 (meishi = business cards) often include furigana. In Japan, reading someone\'s name correctly is a sign of respect.',
    ],
    cta:'Learn name-related kanji in the drills →',
  },
  {
    id:'japanese-sleep-words', emoji:'😴', title:'Japan has 15 words for sleeping (and they\'re all different)', tag:'Vocabulary', difficulty:'easy',
    posts:[
      '寝る (neru = to sleep) is basic. But Japanese has a spectrum: 眠る (nemuru = to fall asleep naturally), いねむり (inemuri = nodding off, usually in meetings — and it\'s socially acceptable!), 昼寝 (hirune = nap), and 仮眠 (kamin = short rest, like on a train).',
      'The most cultural one: 居眠り (inemuri = sleeping while present). In Japan, falling asleep at work is seen as a sign of 勤勉 (kinben = diligence) — you\'re so dedicated you\'re exhausted. Western bosses would fire you. Japanese bosses think "this person is working hard."',
      'Then there\'s 熟睡 (jukusui = deep sleep, literally "ripe sleep"). 浅い眠り (asai nemuri = light sleep). 転寝 (tenmin = sleeping while sitting up, like on a train). 仮眠をとる (kamin wo toru = taking a power nap). Each describes a different TYPE of sleep.',
      'The poetic one: 眠りにつく (nemuri ni tsuku = to enter sleep). つく (tsuku = to arrive/attach). You don\'t "fall" asleep in Japanese — you ARRIVE at sleep. It\'s a destination. The language frames sleep as a place you go, not a state you fall into. 😴',
      'And the cutest: すやすや (suya-suya = sleeping peacefully, the sound of gentle breathing). ぐっすり (gussuri = sleeping soundly, deeply). うとうと (uto-uto = drowsy, half-asleep). These onomatopoeia appear in children\'s books AND adult conversation. Japanese never outgrows sound-words.',
      'Challenge: Learn 3 sleep words. 寝る (sleep), 昼寝 (nap), 熟睡 (deep sleep). Then learn すやすや (peaceful sleep) — it\'s so cute you\'ll use it daily. Japanese sleep vocabulary is a gateway into the culture\'s relationship with rest.',
    ],
    cta:'Learn daily-life vocabulary in the drills →',
  },
  {
    id:'japanese-rain-vocabulary', emoji:'🌧️', title:'Japan has 40+ words for rain (each is a different rain)', tag:'Vocabulary', difficulty:'hard',
    posts:[
      '雨 (ame = rain) seems simple. But Japanese has over 40 specific rain words. Each describes a different TYPE of rain — by season, intensity, duration, and feeling. This isn\'t redundancy. It\'s meteorological poetry.',
      '春雨 (harusame = spring rain) — gentle, warm. 五月雨 (samidare = early-summer rain) — persistent, heavy. 夕立 (yuudachi = sudden evening downpour) — violent, brief. 時雨 (shigure = late-autumn rain) — intermittent, cold. 氷雨 (hisame = hail/sleet) — freezing, painful.',
      'The most poetic: 緑雨 (ryokuu = green rain) — rain that falls on new spring leaves, making them glisten. 穠雨 (nouu = dense rain) — heavy, continuous, like a wall. 慈雨 (jiu = merciful rain) — welcome rain after a drought. Each word paints a picture.',
      'Even the sounds are categorized: ポツポツ (potsu-potsu = rain starting, drop by drop). ザーザー (zaa-zaa = heavy downpour). シトシト (shito-shito = steady, quiet rain). パラパラ (para-para = scattered light rain). Japanese doesn\'t just name rain — it names the SOUND of rain.',
      'The cultural reason: Japan\'s rice farming history required precise rain prediction. Farmers needed to distinguish between a gentle spring rain (good for seedlings) and a summer storm (dangerous for crops). The vocabulary was survival. Now it\'s beauty. 🌾',
      'The word 梅雨 (tsuyu = rainy season) literally means "plum rain" — because it coincides with plum ripening season (June-July). 梅雨明け (tsuyu-ake = end of rainy season) is a national event. News programs announce it. The end of rain is news. That\'s how central rain is to Japanese life.',
      'Challenge: Learn 3 rain words. 春雨 (spring rain), 夕立 (evening downpour), 梅雨 (rainy season). You\'ll start noticing that English "rain" is a blunt instrument. Japanese has a word for every drop.',
    ],
    cta:'Master weather vocabulary in the drills →',
  },
  {
    id:'japanese-convenience-phrases', emoji:'💬', title:'5 Japanese phrases that instantly sound native', tag:'Grammar', difficulty:'easy',
    posts:[
      'Want to sound like you\'ve lived in Japan for years? These 5 phrases are what native speakers use daily — but textbooks never teach:',
      '1. とりあえず (toriaezu = "for now") — the most Japanese word. とりあえずビール (toriaezu biiru = "beer for now") is what 90% of Japanese people say first at an izakaya. It means "let\'s start with this, we\'ll decide the rest later." It\'s the language of flexibility.',
      '2. なんか (nanka = "like, sort of") — the filler word that makes you sound natural. なんかさー (nanka saa) = "like, you know..." Use it at the start of sentences. It softens everything. Without なんか, Japanese sounds stiff. With it, you sound relaxed.',
      '3. よかったら (yokattara = "if you\'d like") — the polite offer. よかったらどうぞ (yokattara douzo = "if you\'d like, please go ahead"). Use it when offering anything: a seat, food, a suggestion. It\'s the gentlest way to offer without pressuring.',
      '4. まあまあ (maa-maa = "so-so, not bad") — the humble response. How\'s your Japanese? まあまあです. How was the food? まあまあ. Japanese culture values humility, so even if something is great, you say まあまあ. It\'s not dishonest — it\'s 謙遜 (kenson = modesty).',
      '5. じゃあね (jaa ne = "see ya") — the casual goodbye. Textbooks teach さようなら (sayounara), but NOBODY says that in daily life. じゃあね is what friends say. またね (mata ne = see you later) also works. さようなら is for final goodbyes — it carries a sense of "I won\'t see you again." Use じゃあね instead. 👋',
      'Bonus: お疲れ様です (otsukaresama desu = "you\'re working hard / good work"). Say this to coworkers. At morning, at night, when leaving, when arriving. It\'s the lubricant of Japanese social life. Without it, you\'re not speaking Japanese — you\'re speaking textbook.',
    ],
    cta:'Practice conversational grammar in the drills →',
  },
  {
    id:'japanese-music-words', emoji:'🎵', title:'The Japanese word for "music" means "enjoying sound"', tag:'Culture', difficulty:'medium',
    posts:[
      '音楽 (ongaku = music) breaks down: 音 (on = sound) + 楽 (gaku = enjoyment/comfort). Music is literally "enjoying sound." Not "organized sound," not "art of sound" — ENJOYING sound. The kanji defines music by the FEELING it creates, not the structure it follows.',
      'This philosophy runs deep. 楽 (raku/gaku) appears in 楽しい (tanoshii = fun), 楽園 (rakuen = paradise), 安楽 (anraku = comfort). The character shows a tree (木) with drums (白) on top — making music under a tree. The origin of 楽 IS music. Fun, comfort, and music share one kanji.',
      'Traditional Japanese music: 雅楽 (gagaku = court music, 1,300 years old), 尺八 (shakuhachi = bamboo flute), 三味線 (shamisen = three-stringed instrument), 琴 (koto = 13-string zither). Each has a specific spiritual purpose — gagaku for the emperor, shakuhachi for Zen monks, shamisen for geisha.',
      'The concept of 間 (ma = silence/negative space) is central to Japanese music. A shamisen piece has long pauses between notes. Western music fills every measure. Japanese music respects the silence between sounds. The silence is part of the music — without it, the notes are just noise.',
      'Modern Japanese music: J-pop, 唄 (uta = song), and カラオケ (karaoke = "empty orchestra," invented in Japan in 1971). The word カラオケ breaks down: カラ (kara = empty) + オケ (oke = orchestra, shortened from "orchestra"). You sing with an EMPTY orchestra. The concept is pure Japanese efficiency. 🎤',
      'Language insight: 音 (on/oto = sound) appears in 音読み (onyomi = kanji reading from Chinese), 音声 (onsei = audio), 音楽家 (ongakuka = musician). Learn 音 — it connects sound, language, and art. One kanji, a whole cultural network.',
    ],
    cta:'Learn music and art vocabulary in the drills →',
  },
  {
    id:'japanese-school-system', emoji:'🎒', title:'The Japanese school system that creates order from chaos', tag:'Reading', difficulty:'medium',
    posts:[
      '日本の学校 (Nihon no gakkou = Japanese schools) have a unique feature: students clean them. お掃除 (osouji = cleaning) is a daily 15-minute period where ALL students — from elementary to high school — sweep, mop, and scrub their classrooms. No janitors. The students ARE the janitors.',
      'The philosophy: 清掃 (seisou = cleaning) teaches 責任 (sekinin = responsibility). If you make a mess, you clean it. If the classroom is dirty, it\'s YOUR fault, not a janitor\'s. This creates a culture where littering is rare — because everyone has cleaned, everyone respects clean spaces.',
      'Lunch is also student-run. 給食当番 (kyushoku touban = lunch duty) rotates weekly. Students wear white caps and aprons, serve food to classmates, and clean up afterward. They eat in their classrooms with their teacher. The meal is a lesson in 共同生活 (kyoudou seikatsu = communal living).',
      'The word 先生 (sensei = teacher) literally means "born before" — 先 (sen = before) + 生 (sei = born). A teacher isn\'t someone who knows more. They\'re someone who was BORN before you and therefore experienced life first. Respect isn\'t about knowledge — it\'s about experience.',
      'School year starts in April, not September. 入学式 (nyuugakushiki = entrance ceremony) happens under cherry blossoms. The symbolism: new beginnings bloom with spring. Students associate their school start with sakura — beauty, freshness, and the bittersweet knowledge that petals fall. 🌸',
      'Challenge: Learn 学校 (gakkou = school), 先生 (sensei = teacher), and 友達 (tomodachi = friend). These three words are the foundation of school-life Japanese. And remember: in Japan, cleaning the classroom isn\'t a punishment. It\'s education.',
    ],
    cta:'Practice school-related vocabulary →',
  },
  {
    id:'lost-in-translation-words', emoji:'🗺️', title:'7 Japanese words that have no English translation', tag:'Vocabulary', difficulty:'hard',
    posts:[
      'Japanese has words for feelings that English can\'t name. These aren\'t exotic curiosities — they\'re daily vocabulary for emotions you\'ve had but couldn\'t describe:',
      '1. 木漏れ日 (komorebi = sunlight filtering through tree leaves). There\'s no English word for this exact light. It\'s the dappled, dancing shadows under a tree on a sunny day. Japanese gave it a name because someone thought it was beautiful enough to deserve one.',
      '2. 親孝行 (oyakoukou = filial piety, but warmer). It\'s not just "respecting parents." It\'s the ACT of making your parents happy — calling them, visiting, bringing gifts. The word implies action, not just attitude. English "filial piety" is cold. 親孝行 is warm.',
      '3. 侘寂 (wabi-sabi = beauty in imperfection and transience). A cracked tea bowl. A weathered wooden gate. Autumn leaves turning brown. Wabi-sabi is finding beauty in things that are imperfect, impermanent, and incomplete. It\'s an entire aesthetic philosophy in two kanji.',
      '4. 生き甲斐 (ikigai = reason for being / that which makes life worth living). Your ikigai might be your work, your family, your art, or your morning coffee. It\'s the thing that gets you out of bed. English needs a sentence. Japanese needs one word.',
      '5. しょうがない (shou ga nai = it can\'t be helped, but with acceptance, not defeat). It\'s not "giving up." It\'s making peace with reality. The train is late? しょうがない. It\'s raining? しょうがない. It\'s the philosophy of not fighting what you can\'t control — and saving your energy for what you can.',
      '6. 浮世 (ukiyo = floating world). The transient, pleasure-seeking world of Edo-period urban life. But it also means "the world we live in is temporary." 憂き (uki = melancholy) + 世 (yo = world). The world is sad AND beautiful AND temporary. All in one word.',
      '7. 物の哀れ (mono no aware = the pathos of things). The gentle sadness that beautiful things don\'t last. The feeling when cherry blossoms fall. When summer ends. When you finish a book you loved. It\'s not depression — it\'s appreciation mixed with impermanence. English has no word for this. Japanese has always had one. 🍂',
    ],
    cta:'Explore deep vocabulary in the drills →',
  },
  {
    id:'japanese-train-punctuality', emoji:'⏰', title:'When a Japanese train is 1 minute late, they give you a certificate', tag:'Reading', difficulty:'easy',
    posts:[
      '日本の電車 (Nihon no densha = Japanese trains) are famous for punctuality. The average delay on the Shinkansen: 0.6 minutes. That\'s 36 seconds. When a train is more than 1 minute late, station staff print 遅延証明書 (chien shoumeisho = delay certificate) for commuters to show their employers.',
      'The word 遅延 (chien = delay) breaks down: 遅 (chi = late) + 延 (en = extend). "Late-extended." Even the kanji implies that lateness is an extension of time, not a failure. The delay certificate is an apology — the railway takes responsibility so YOU don\'t have to.',
      'The Shinkansen (新幹線 = "new trunk line") has carried over 10 billion passengers since 1964. Derailments: 0 (in normal operation). The safety record is so perfect that the Tokaido Shinkansen has never had a single passenger fatality in 60 years of operation. Not one.',
      'Train etiquette is cultural: no phone calls (携帯電話はマナー mode = phone in manner mode), no eating on local trains (only on long-distance), priority seats (優先席) for elderly/pregnant/disabled. The word 混雑 (konzatsu = crowding) is used for rush hour — Tokyo stations move 3.5 million people daily without pushing.',
      'The pushers: 乗客整理係 (joukyaku seiri gakari = passenger arrangement staff) — the white-gloved attendants who physically push people into crowded trains. They\'re called オシヤ (oshiya) in slang. They push with precision, not force. The gloves are white because they touch people respectfully. 🧤',
      'Language tip: 電車 (densha = train) vs 列車 (ressha = train, more formal) vs 新幹線 (shinkansen = bullet train). Learn 駅 (eki = station) — it appears in 駅員 (ekiin = station staff), 駅前 (ekimae = in front of station), 改札 (kaisatsu = ticket gate). One kanji, the entire train system.',
    ],
    cta:'Learn transportation vocabulary in the drills →',
  },
];

function pickStatic(excludeIds) {
  let pool = STATIC_THREADS;
  if (excludeIds && excludeIds.length) {
    pool = STATIC_THREADS.filter(t => !excludeIds.includes(t.id));
    if (!pool.length) pool = STATIC_THREADS;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Gemini Flash (free tier) ─────────────────────────────────────────────────
async function generateViaGemini(userLevel) {
  if (!GEMINI_KEY) return null;
  const prompt = `Generate one short, dopamine-triggering Japanese learning thread in Twitter/X style.

Output a JSON object and NOTHING else — no markdown fences, no commentary.

Shape:
{
  "id": "unique-slug",
  "emoji": "one emoji",
  "title": "catchy clickbait title (max 60 chars)",
  "tag": "Kanji|Grammar|Vocabulary|Culture|Listening|Reading",
  "difficulty": "easy|medium|hard",
  "posts": ["short post 1", "short post 2", ...],
  "cta": "call to action pointing to a drill type"
}

RULES:
- 4-7 posts per thread, each post 100-300 chars (longer posts for reading practice)
- Include a "difficulty" field: easy (N5/N4), medium (N3), hard (N2/N1)
- Match difficulty to the learner's level
- Make it SURPRISING, funny, or mind-blowing — the kind of thing you'd share
- Every thread must teach something real about Japanese
- Use Japanese characters naturally (kanji, kana) with romaji/English explanations
- The last post should have a learning hook (challenge or curiosity gap)
- NO age-inappropriate content, NO politics, NO controversy
- Vary topics: kanji secrets, grammar aha moments, cultural insights, pronunciation surprises, learning hacks, crazy world news, casual stories
- The title should trigger curiosity (like a tweet you HAVE to click)
- The learner's level is ${userLevel || 'N4'}`;
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 1.0, maxOutputTokens: 1200 },
      }),
    });
    const j = await r.json();
    const text = j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] && j.candidates[0].content.parts[0].text;
    if (!text) return null;
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    return null;
  }
}

// ── Anthropic (paid fallback) ────────────────────────────────────────────────
async function generateViaAnthropic(userLevel) {
  if (!ANTHROPIC_KEY) return null;
  const system = `You generate short, dopamine-triggering Japanese learning threads in Twitter/X style.
Output a JSON object and NOTHING else — no markdown fences, no commentary.
Shape:
{ "id":"unique-slug","emoji":"one emoji","title":"catchy title (max 60 chars)","tag":"Kanji|Grammar|Vocabulary|Culture|Listening|Reading","difficulty":"easy|medium|hard","posts":["short post 1","short post 2",...],"cta":"call to action pointing to a drill type" }
RULES: 4-7 posts, each 100-300 chars. Include difficulty field (easy/medium/hard). SURPRISING/funny/mind-blowing. Teach real Japanese. Use kanji/kana with English. Last post = learning hook. NO inappropriate content. Title must trigger curiosity.`;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL, max_tokens: 1200, system,
        messages: [{ role: 'user', content: `Generate one fresh Japanese learning thread. Level: ${userLevel || 'N4'}. Random surprising topic.` }],
      }),
    });
    const j = await r.json();
    const text = j.content && j.content[0] && j.content[0].text;
    if (!text) return null;
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    return null;
  }
}

// ── Main handler ─────────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    if ((req.headers['x-admin-password'] || '') !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }
    let body = {};
    try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); } catch {}
    const level = body.level || 'N4';
    let thread = await generateViaGemini(level);
    let source = 'gemini';
    if (!thread) { thread = await generateViaAnthropic(level); source = 'anthropic'; }
    if (!thread) { thread = pickStatic(); source = 'static'; }
    return res.status(200).json({ ok: true, thread, source });
  }

  if (req.method === 'GET') {
    const level = (req.query && req.query.level) || 'N4';
    // 50% chance to try AI (conserve free tier quota), 50% static
    const useAI = GEMINI_KEY && Math.random() < 0.5;
    if (useAI) {
      let thread = await generateViaGemini(level);
      if (thread) return res.status(200).json({ ok: true, thread, source: 'gemini' });
      thread = await generateViaAnthropic(level);
      if (thread) return res.status(200).json({ ok: true, thread, source: 'anthropic' });
    }
    return res.status(200).json({ ok: true, thread: pickStatic(), source: 'static' });
  }

  return res.status(405).json({ ok: false, error: 'GET or POST only' });
};
