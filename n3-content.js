/* ============================================================
   N3 CONTENT — Intermediate Japanese Bridge Lessons
   Covers N3 grammar, vocabulary, kanji, reading, listening, questions
   Lessons 51-62 (continuing from Minna no Nihongo L25-50)
   All example sentences are original.
   ============================================================ */
const N3_CONTENT = [

/* ===================== LESSON 51 ===================== */
{
  lessonNum: 51,
  topic: "〜ばかり・〜ところだ",
  topicEn: "Just Finished · About To",
  module: 'L51', moduleLabel: 'L51 — ばかり・ところだ', lesson: 'L51', lessonLabel: 'Just Finished · About To',
  difficulty: "medium",
  level: "N3",
  vocabulary: [
    { id: "L51v1", word: "届く", reading: "とどく", pitch: 0, meaning: "to arrive; to be delivered", example: "荷物が届いたばかりです。", exampleMeaning: "The package just arrived." },
    { id: "L51v2", word: "引っ越す", reading: "ひっこす", pitch: 3, meaning: "to move (house)", example: "先週、引っ越したばかりです。", exampleMeaning: "I just moved last week." },
    { id: "L51v3", word: "転ぶ", reading: "ころぶ", pitch: 0, meaning: "to fall down; to trip", example: "転んで、手をすりむいた。", exampleMeaning: "I fell and scraped my hand." },
    { id: "L51v4", word: "壊す", reading: "こわす", pitch: 2, meaning: "to break (transitive)", example: "古い家を壊しているところです。", exampleMeaning: "They are demolishing the old house." },
    { id: "L51v5", word: "間に合う", reading: "まにあう", pitch: 3, meaning: "to be in time; to make it", example: "電車に間に合うところだった。", exampleMeaning: "I was about to make it in time for the train." },
    { id: "L51v6", word: "準備", reading: "じゅんび", pitch: 1, meaning: "preparation", example: "準備しているところです。", exampleMeaning: "I'm in the middle of preparing." },
    { id: "L51v7", word: "到着", reading: "とうちゃく", pitch: 0, meaning: "arrival", example: "到着したばかりで、まだ疲れています。", exampleMeaning: "I just arrived and am still tired." },
    { id: "L51v8", word: "結局", reading: "けっきょく", pitch: 1, meaning: "in the end; after all", example: "結局、何も食べなかった。", exampleMeaning: "In the end, I didn't eat anything." },
    { id: "L51v9", word: "結構", reading: "けっこう", pitch: 1, meaning: "quite; fairly", example: "結構な量を食べたばかりなのに、もうお腹がすいた。", exampleMeaning: "I just ate quite a lot, but I'm already hungry." },
    { id: "L51v10", word: "急ぐ", reading: "いそぐ", pitch: 2, meaning: "to hurry; to rush", example: "急いでいるところですが、もう少し話せます。", exampleMeaning: "I'm in a hurry, but I can talk a little more." }
  ],
  grammar: [
    {
      id: "L51g1",
      point: "〜たばかり (just did ~)",
      explanation: "Form: verb past tense (た-form) ＋ ばかり. Means 'just finished doing ~' or 'it hasn't been long since ~'. Used for actions completed a short time ago. The time frame is relative — can be minutes, hours, or even months if the speaker feels it was recent.",
      examples: [
        "昼ご飯を食べたばかりなので、お腹がいっぱいです。 (I just ate lunch, so I'm full.)",
        "日本に来たばかりの頃は、何もわからなかった。 (When I had just come to Japan, I didn't understand anything.)",
        "このアプリを始めたばかりです。 (I just started using this app.)"
      ],
      listening: "Listen for た followed immediately by ばかり — the speaker emphasizes recency.",
      production: "Say three things you just did using 〜たばかり."
    },
    {
      id: "L51g2",
      point: "〜ところだ (about to / in the middle of / just finished)",
      explanation: "Form: verb dictionary form ＋ ところだ = about to do; 〜ているところだ = in the middle of doing; 〜たところだ = just finished doing. ところ emphasizes the moment/phase of an action. Similar to ばかり but focuses on the stage of action, not recency.",
      examples: [
        "これから出かけるところです。 (I'm about to go out now.)",
        "今、レポートを書いているところです。 (I'm in the middle of writing a report now.)",
        "会議が終わったところです。 (The meeting has just ended.)"
      ],
      listening: "Listen for ところだ — it tells you the timing/phase of what's happening.",
      production: "Describe what you are about to do, doing now, and just finished using ところだ."
    }
  ],
  kanji: [
    { id: "L51k1", char: "届", reading: "とど（く）", meaning: "deliver; arrive", exampleWord: "届く（とどく）" },
    { id: "L51k2", char: "引", reading: "いん／ひ（く）", meaning: "pull; attract", exampleWord: "引っ越す（ひっこす）" },
    { id: "L51k3", char: "転", reading: "てん／ころ（ぶ）", meaning: "turn; roll; fall", exampleWord: "転ぶ（ころぶ）" },
    { id: "L51k4", char: "準", reading: "じゅん", meaning: "ready; prepare", exampleWord: "準備（じゅんび）" }
  ],
  reading: {
    id: "L51r1",
    title: "引っ越しの日",
    passage: "田中さんは先週引っ越したばかりです。荷物が届いたところで、まだ箱を開けていません。「今、片付けているところですが、なかなか終わりません」と田中さんは言いました。友達に手伝ってもらう予定ですが、友達は「これから来るところだ」と連絡してくれました。結局、二人で夜遅くまで働いて、やっと部屋が少し片付きました。",
    targetWords: [{ word: "引っ越したばかり", id: "L51v2" }, { word: "届いたところ", id: "L51v1" }],
    questions: [
      { id: "rq51-1", q: "田中さんはいつ引っ越しましたか。", o: ["昨日", "先週", "今日", "来週"], c: 1, exp: "先週引っ越したばかりですと書いてあります。" },
      { id: "rq51-2", q: "荷物はどうなっていますか。", o: ["全部片付いた", "まだ箱を開けていない", "壊れた", "届いていない"], c: 1, exp: "荷物が届いたところで、まだ箱を開けていません。" },
      { id: "rq51-3", q: "友達はどうしましたか。", o: ["もう来た", "これから来るところだ", "来られない", "もう帰った"], c: 1, exp: "友達は「これから来るところだ」と連絡してくれました。" }
    ]
  },
  listening: [
    { id: "L51l1", audioText: "A：昼ご飯、もう食べた？ B：うん、食べたばかり。ごめん。", a: "Bさんは昼ご飯をどうしましたか。", o: ["まだ食べていない", "食べたばかり", "これから食べる", "食べたくない"], c: 1, exp: "食べたばかりと言っています。" },
    { id: "L51l2", audioText: "A：準備できた？ B：今、しているところ。あと10分待って。", a: "Bさんは今どうしていますか。", o: ["準備が終わった", "準備しているところ", "準備するつもり", "準備しない"], c: 1, exp: "今、しているところと言っています。" }
  ],
  questions: [
    { id: "L51q1", dim: "grammar", type: "recall", difficulty: "medium", s: "昼ご飯を食べ___なので、お腹がいっぱいです。", a: "たばかり", o: ["たばかり", "ているところ", "るところ", "たところ"], c: 0, exp: "〜たばかり = just finished doing.", linksTo: "L51g1" },
    { id: "L51q2", dim: "grammar", type: "recall", difficulty: "medium", s: "これから出かけ___です。", a: "るところ", o: ["るところ", "たばかり", "ているところ", "たところ"], c: 0, exp: "〜るところだ = about to do.", linksTo: "L51g2" },
    { id: "L51q3", dim: "grammar", type: "recall", difficulty: "medium", s: "今、レポートを書い___です。", a: "ているところ", o: ["ているところ", "たばかり", "るところ", "たところ"], c: 0, exp: "〜ているところだ = in the middle of doing.", linksTo: "L51g2" },
    { id: "L51q4", dim: "vocab", type: "recognition", difficulty: "medium", s: "「届く」の意味は？", a: "to arrive; to be delivered", o: ["to send", "to arrive; to be delivered", "to carry", "to open"], c: 1, exp: "届く（とどく）= to arrive at destination.", linksTo: "L51v1" },
    { id: "L51q5", dim: "kanji", type: "recognition", difficulty: "medium", s: "「準備」の読み方は？", a: "じゅんび", o: ["じゅんび", "じゅんい", "しゅんび", "じょうび"], c: 0, exp: "準備（じゅんび）= preparation.", linksTo: "L51k4" },
    { id: "L51q6", dim: "vocab", type: "recognition", difficulty: "easy", s: "「結局」の意味は？", a: "in the end; after all", o: ["finally", "in the end; after all", "however", "therefore"], c: 1, exp: "結局（けっきょく）= in the end.", linksTo: "L51v8" }
  ]
},

/* ===================== LESSON 52 ===================== */
{
  lessonNum: 52,
  topic: "〜ようになる・〜ことになる",
  topicEn: "Becoming Able To · Decided To",
  module: 'L52', moduleLabel: 'L52 — ようになる・ことになる', lesson: 'L52', lessonLabel: 'Becoming · Decided',
  difficulty: "medium",
  level: "N3",
  vocabulary: [
    { id: "L52v1", word: "慣れる", reading: "なれる", pitch: 0, meaning: "to get used to; to become accustomed", example: "日本の生活に慣れてきました。", exampleMeaning: "I've gotten used to life in Japan." },
    { id: "L52v2", word: "できるようになる", reading: "できるようになる", pitch: 0, meaning: "to become able to do", example: "少しずつ話せるようになりました。", exampleMeaning: "I gradually became able to speak." },
    { id: "L52v3", word: "決まる", reading: "きまる", pitch: 0, meaning: "to be decided; to be settled", example: "日程が決まりました。", exampleMeaning: "The schedule has been decided." },
    { id: "L52v4", word: "予定", reading: "よてい", pitch: 0, meaning: "schedule; plan", example: "来月、大阪へ行くことになりました。", exampleMeaning: "It's been decided that I'll go to Osaka next month." },
    { id: "L52v5", word: "環境", reading: "かんきょう", pitch: 0, meaning: "environment", example: "新しい環境に慣れるのに時間がかかる。", exampleMeaning: "It takes time to get used to a new environment." },
    { id: "L52v6", word: "変化", reading: "へんか", pitch: 1, meaning: "change; alteration", example: "生活が変わることになった。", exampleMeaning: "My lifestyle has changed." },
    { id: "L52v7", word: "機会", reading: "きかい", pitch: 1, meaning: "opportunity; chance", example: "日本で働く機会が増えるようになった。", exampleMeaning: "Opportunities to work in Japan have increased." },
    { id: "L52v8", word: "努力", reading: "どりょく", pitch: 1, meaning: "effort; endeavor", example: "努力すれば、できるようになる。", exampleMeaning: "If you make an effort, you'll become able to do it." },
    { id: "L52v9", word: "改善", reading: "かいぜん", pitch: 0, meaning: "improvement", example: "日本語が改善されるようになった。", exampleMeaning: "My Japanese has improved." },
    { id: "L52v10", word: "実際", reading: "じっさい", pitch: 0, meaning: "actually; in reality", example: "実際に使ってみると、わかるようになる。", exampleMeaning: "When you actually try using it, you'll come to understand." }
  ],
  grammar: [
    {
      id: "L52g1",
      point: "〜ようになる (become able to / come to ~)",
      explanation: "Form: verb potential form ＋ ようになる = 'become able to do ~'. verb dictionary form ＋ ようになる = 'come to do ~' (habit change). This expresses a gradual change in ability or habit over time. Often paired with 少しずつ (gradually) or だんだん (little by little).",
      examples: [
        "日本語が話せるようになりました。 (I became able to speak Japanese.)",
        "最近、早く起きるようになりました。 (Recently, I've come to wake up early.)",
        "漢字が読めるようになりたいです。 (I want to become able to read kanji.)"
      ],
      listening: "Listen for ようになる — it signals a change in state or ability over time.",
      production: "Say three things you've become able to do since studying Japanese."
    },
    {
      id: "L52g2",
      point: "〜ことになる (it has been decided that ~)",
      explanation: "Form: verb dictionary form ＋ ことになる = 'it has been decided that ~'. This expresses a decision made by an external party or organization, not the speaker's personal choice. Passive in nuance. Often used for company transfers, schedule changes, etc.",
      examples: [
        "来月、東京へ転勤することになりました。 (It's been decided that I'll transfer to Tokyo next month.)",
        "会議は水曜日に行われることになりました。 (It's been decided that the meeting will be held on Wednesday.)",
        "このプロジェクトは中止になることになった。 (It's been decided that this project will be cancelled.)"
      ],
      listening: "Listen for ことになる — it signals an organizational or external decision.",
      production: "Say three things that have been decided for you using ことになる."
    }
  ],
  kanji: [
    { id: "L52k1", char: "慣", reading: "な（れる）", meaning: "get used to; accustomed", exampleWord: "慣れる（なれる）" },
    { id: "L52k2", char: "境", reading: "きょう／さかい", meaning: "boundary; environment", exampleWord: "環境（かんきょう）" },
    { id: "L52k3", char: "変", reading: "へん／か（える）", meaning: "change; strange", exampleWord: "変化（へんか）" },
    { id: "L52k4", char: "努", reading: "ど", meaning: "effort; strive", exampleWord: "努力（どりょく）" }
  ],
  reading: {
    id: "L52r1",
    title: "日本での生活",
    passage: "山田さんは一年前日本に来ました。最初は日本語が全然話せませんでしたが、毎日勉強して、少しずつ話せるようになりました。今では友達と日本語で会話ができます。先月、会社から来年大阪へ転勤することになりました。新しい環境に慣れるのは大変ですが、新しい機会もあるので楽しみです。",
    targetWords: [{ word: "話せるようになった", id: "L52v2" }, { word: "転勤することになった", id: "L52v4" }],
    questions: [
      { id: "rq52-1", q: "山田さんは一年前どうでしたか。", o: ["日本語が話せた", "日本語が全然話せなかった", "日本に住んでいた", "大阪にいた"], c: 1, exp: "最初は日本語が全然話せませんでしたと書いてあります。" },
      { id: "rq52-2", q: "今、日本語はどうですか。", o: ["全然話せない", "友達と会話できる", "まだ勉強している", "あきらめた"], c: 1, exp: "今では友達と日本語で会話ができます。" },
      { id: "rq52-3", q: "会社から何が決まりましたか。", o: ["東京へ転勤", "大阪へ転勤", "退職", "昇進"], c: 1, exp: "来年大阪へ転勤することになりました。" }
    ]
  },
  listening: [
    { id: "L52l1", audioText: "A：日本語、上手になりましたね。 B：ありがとうございます。少しずつ話せるようになりました。", a: "Bさんはどうなりましたか。", o: ["日本語が下手になった", "少しずつ話せるようになった", "まだ全然話せない", "日本語をやめた"], c: 1, exp: "少しずつ話せるようになりました。" },
    { id: "L52l2", audioText: "A：来月の会議はいつですか。 B：水曜日に行われることになりました。", a: "会議はいつ行われますか。", o: ["月曜日", "火曜日", "水曜日", "金曜日"], c: 2, exp: "水曜日に行われることになりました。" }
  ],
  questions: [
    { id: "L52q1", dim: "grammar", type: "recall", difficulty: "medium", s: "日本語が話せる___になりました。", a: "よう", o: ["よう", "こと", "ところ", "ばかり"], c: 0, exp: "〜ようになる = become able to.", linksTo: "L52g1" },
    { id: "L52q2", dim: "grammar", type: "recall", difficulty: "medium", s: "来月、大阪へ転勤する___になりました。", a: "こと", o: ["こと", "よう", "ところ", "ばかり"], c: 0, exp: "〜ことになる = it has been decided.", linksTo: "L52g2" },
    { id: "L52q3", dim: "vocab", type: "recognition", difficulty: "medium", s: "「慣れる」の意味は？", a: "to get used to", o: ["to forget", "to get used to", "to change", "to decide"], c: 1, exp: "慣れる（なれる）= to get used to.", linksTo: "L52v1" },
    { id: "L52q4", dim: "kanji", type: "recognition", difficulty: "medium", s: "「環境」の読み方は？", a: "かんきょう", o: ["かんきょう", "かんきょ", "けんきょう", "かんけい"], c: 0, exp: "環境（かんきょう）= environment.", linksTo: "L52k2" },
    { id: "L52q5", dim: "vocab", type: "recognition", difficulty: "easy", s: "「機会」の意味は？", a: "opportunity; chance", o: ["problem", "opportunity; chance", "schedule", "effort"], c: 1, exp: "機会（きかい）= opportunity.", linksTo: "L52v7" },
    { id: "L52q6", dim: "grammar", type: "recall", difficulty: "hard", s: "最近、早く起きる___になりました。", a: "よう", o: ["よう", "こと", "ところ", "ばかり"], c: 0, exp: "〜ようになる = come to do (habit change).", linksTo: "L52g1" }
  ]
},

/* ===================== LESSON 53 ===================== */
{
  lessonNum: 53,
  topic: "〜わけにはいかない・〜に違いない",
  topicEn: "Cannot Afford To · Must Be",
  module: 'L53', moduleLabel: 'L53 — わけにはいかない・に違いない', lesson: 'L53', lessonLabel: 'Cannot · Must Be',
  difficulty: "hard",
  level: "N3",
  vocabulary: [
    { id: "L53v1", word: "確信", reading: "かくしん", pitch: 0, meaning: "conviction; certainty", example: "彼が犯人に違いないと確信している。", exampleMeaning: "I'm convinced he must be the culprit." },
    { id: "L53v2", word: "責任", reading: "せきにん", pitch: 0, meaning: "responsibility; accountability", example: "責任があるから、やめるわけにはいかない。", exampleMeaning: "I have responsibilities, so I can't afford to quit." },
    { id: "L53v3", word: "状況", reading: "じょうきょう", pitch: 0, meaning: "situation; circumstances", example: "状況から見て、彼がやったに違いない。", exampleMeaning: "Judging from the situation, he must have done it." },
    { id: "L53v4", word: "失敗", reading: "しっぱい", pitch: 0, meaning: "failure; mistake", example: "失敗するわけにはいかない。", exampleMeaning: "I can't afford to fail." },
    { id: "L53v5", word: "証拠", reading: "しょうこ", pitch: 1, meaning: "evidence; proof", example: "証拠から見ても、彼に違いない。", exampleMeaning: "Even from the evidence, it must be him." },
    { id: "L53v6", word: "絶対", reading: "ぜったい", pitch: 0, meaning: "absolutely; definitely", example: "絶対に成功するに違いない。", exampleMeaning: "It must definitely succeed." },
    { id: "L53v7", word: "判断", reading: "はんだん", pitch: 1, meaning: "judgment; decision", example: "正しい判断をしなければならない。", exampleMeaning: "I must make the right judgment." },
    { id: "L53v8", word: "影響", reading: "えいきょう", pitch: 0, meaning: "influence; effect", example: "影響が大きいので、失敗するわけにはいかない。", exampleMeaning: "The impact is large, so I can't afford to fail." },
    { id: "L53v9", word: "推測", reading: "すいそく", pitch: 0, meaning: "guess; conjecture", example: "推測にすぎないが、彼が犯人に違いない。", exampleMeaning: "It's just a guess, but he must be the culprit." },
    { id: "L53v10", word: "重大", reading: "じゅうだい", pitch: 0, meaning: "serious; grave", example: "重大な問題に違いない。", exampleMeaning: "It must be a serious problem." }
  ],
  grammar: [
    {
      id: "L53g1",
      point: "〜わけにはいかない (cannot afford to ~ / must not ~)",
      explanation: "Form: verb dictionary form ＋ わけにはいかない. Means 'cannot ~ because of moral/social/logical obligations' — not physical impossibility but situational impossibility. Different from できない (can't): わけにはいかない implies you COULD do it but circumstances forbid it.",
      examples: [
        "約束したので、行かないわけにはいかない。 (I promised, so I can't afford not to go.)",
        "試験が近いから、遊ぶわけにはいかない。 (The exam is near, so I can't afford to play.)",
        "責任者だから、逃げるわけにはいかない。 (I'm the person in charge, so I can't afford to run away.)"
      ],
      listening: "Listen for わけにはいかない — it signals a strong obligation preventing an action.",
      production: "Say three things you can't afford to do because of obligations."
    },
    {
      id: "L53g2",
      point: "〜に違いない (must be ~ / definitely ~)",
      explanation: "Form: noun/na-adj stem ＋ に違いない; i-adj stem ＋ に違いない; verb plain form ＋ に違いない. Means 'I'm sure that ~' or 'there's no doubt that ~'. Expresses strong conviction based on evidence or reasoning. More formal than だろう/はずだ.",
      examples: [
        "彼はもう知っているに違いない。 (He must already know.)",
        "あの表情から見て、怒っているに違いない。 (Judging from that expression, she must be angry.)",
        "この計画は成功するに違いない。 (This plan must succeed.)"
      ],
      listening: "Listen for に違いない — it signals the speaker's strong conviction.",
      production: "Make three guesses about people you know using に違いない."
    }
  ],
  kanji: [
    { id: "L53k1", char: "責", reading: "せき", meaning: "blame; responsibility", exampleWord: "責任（せきにん）" },
    { id: "L53k2", char: "任", reading: "にん", meaning: "duty; responsibility", exampleWord: "責任（せきにん）" },
    { id: "L53k3", char: "証", reading: "しょう", meaning: "evidence; proof", exampleWord: "証拠（しょうこ）" },
    { id: "L53k4", char: "拠", reading: "こ／きょ", meaning: "rely; base", exampleWord: "証拠（しょうこ）" }
  ],
  reading: {
    id: "L53r1",
    title: "重大な決断",
    passage: "田中部長は明日、大切なプレゼンテーションをする。会社の未来に関わるので、失敗するわけにはいかない。部下の山田さんは「部長なら絶対に成功するに違いない」と応援してくれたが、田中部長自身は緊張している。状況から見て、準備は十分だ。しかし、影響が大きいので、どんなに疲れても寝るわけにはいかない夜だった。",
    targetWords: [{ word: "失敗するわけにはいかない", id: "L53v4" }, { word: "成功するに違いない", id: "L53v6" }],
    questions: [
      { id: "rq53-1", q: "田中部長は明日何をしますか。", o: ["休みをとる", "プレゼンテーションをする", "出張する", "退職する"], c: 1, exp: "明日、大切なプレゼンテーションをする。" },
      { id: "rq53-2", q: "なぜ失敗できないのですか。", o: ["時間がないから", "会社の未来に関わるから", "疲れているから", "準備不足だから"], c: 1, exp: "会社の未来に関わるので、失敗するわけにはいかない。" },
      { id: "rq53-3", q: "山田さんはどう言いましたか。", o: ["失敗するに違いない", "成功するに違いない", "やめるわけにはいかない", "無理だ"], c: 1, exp: "絶対に成功するに違いないと言いました。" }
    ]
  },
  listening: [
    { id: "L53l1", audioText: "A：明日の試験、大丈夫？ B：約束したから、勉強しないわけにはいかないんだ。", a: "Bさんはどうしますか。", o: ["勉強しない", "勉強しなければならない", "試験をやめる", "約束をやめる"], c: 1, exp: "勉強しないわけにはいかない＝勉強しなければならない。" },
    { id: "L53l2", audioText: "A：彼、最近元気ないね。 B：仕事が忙しいに違いないよ。", a: "Bさんは何と言いましたか。", o: ["仕事が暇だ", "仕事が忙しいに違いない", "病気に違いない", "わからない"], c: 1, exp: "仕事が忙しいに違いないよと言いました。" }
  ],
  questions: [
    { id: "L53q1", dim: "grammar", type: "recall", difficulty: "hard", s: "約束したので、行かない___いかない。", a: "わけには", o: ["わけには", "ことには", "ようには", "ところには"], c: 0, exp: "〜わけにはいかない = cannot afford to.", linksTo: "L53g1" },
    { id: "L53q2", dim: "grammar", type: "recall", difficulty: "hard", s: "彼はもう知っている___。", a: "に違いない", o: ["に違いない", "わけにはいかない", "ようになる", "ことになる"], c: 0, exp: "〜に違いない = must be / definitely.", linksTo: "L53g2" },
    { id: "L53q3", dim: "vocab", type: "recognition", difficulty: "medium", s: "「責任」の読み方は？", a: "せきにん", o: ["せきにん", "せきじん", "しゃくにん", "せっきん"], c: 0, exp: "責任（せきにん）= responsibility.", linksTo: "L53k1" },
    { id: "L53q4", dim: "vocab", type: "recognition", difficulty: "medium", s: "「証拠」の意味は？", a: "evidence; proof", o: ["situation", "evidence; proof", "judgment", "influence"], c: 1, exp: "証拠（しょうこ）= evidence.", linksTo: "L53v5" },
    { id: "L53q5", dim: "grammar", type: "recall", difficulty: "hard", s: "試験が近いから、遊ぶ___いかない。", a: "わけには", o: ["わけには", "ことには", "ようには", "ばかりには"], c: 0, exp: "〜わけにはいかない = cannot afford to.", linksTo: "L53g1" },
    { id: "L53q6", dim: "kanji", type: "recognition", difficulty: "medium", s: "「判断」の読み方は？", a: "はんだん", o: ["はんだん", "はんたん", "けってい", "はんけつ"], c: 0, exp: "判断（はんだん）= judgment.", linksTo: "L53v7" }
  ]
},

/* ===================== LESSON 54 ===================== */
{
  lessonNum: 54,
  topic: "〜に対して・〜にとって・〜として",
  topicEn: "Towards · For · As",
  module: 'L54', moduleLabel: 'L54 — に対して・にとって・として', lesson: 'L54', lessonLabel: 'Towards · For · As',
  difficulty: "medium",
  level: "N3",
  vocabulary: [
    { id: "L54v1", word: "意見", reading: "いけん", pitch: 1, meaning: "opinion; view", example: "その案に対して意見があります。", exampleMeaning: "I have an opinion regarding that proposal." },
    { id: "L54v2", word: "役割", reading: "やくわり", pitch: 3, meaning: "role; part", example: "彼はリーダーとして役割を果たしている。", exampleMeaning: "He is fulfilling his role as a leader." },
    { id: "L54v3", word: "立場", reading: "たちば", pitch: 1, meaning: "position; standpoint", example: "学生にとって、これは大切な問題だ。", exampleMeaning: "For students, this is an important issue." },
    { id: "L54v4", word: "対応", reading: "たいおう", pitch: 0, meaning: "response; handling", example: "クレームに対して適切に対応する。", exampleMeaning: "Respond appropriately to complaints." },
    { id: "L54v5", word: "専門", reading: "せんもん", pitch: 1, meaning: "specialty; expertise", example: "彼は専門家として知られている。", exampleMeaning: "He is known as a specialist." },
    { id: "L54v6", word: "反対", reading: "はんたい", pitch: 0, meaning: "opposition; contrary", example: "反対に対して理由を説明した。", exampleMeaning: "I explained the reasons against the opposition." },
    { id: "L54v7", word: "共通", reading: "きょうつう", pitch: 0, meaning: "common; shared", example: "共通の趣味を持っている。", exampleMeaning: "We share common hobbies." },
    { id: "L54v8", word: "基準", reading: "きじゅん", pitch: 1, meaning: "standard; criterion", example: "基準として、これを使おう。", exampleMeaning: "Let's use this as a standard." },
    { id: "L54v9", word: "目的", reading: "もくてき", pitch: 1, meaning: "purpose; goal", example: "目的に対して努力している。", exampleMeaning: "I'm working towards my goal." },
    { id: "L54v10", word: "実際", reading: "じっさい", pitch: 0, meaning: "actually; in practice", example: "実際にとってみれば、簡単ではない。", exampleMeaning: "In practice, it's not easy." }
  ],
  grammar: [
    {
      id: "L54g1",
      point: "〜に対して (towards / against / regarding ~)",
      explanation: "Form: noun ＋ に対して. Means 'towards (a person/thing)', 'against', or 'regarding'. Used for attitudes, actions directed at something, or contrast. Different from について (about): に対して implies direction/attitude, について is neutral discussion.",
      examples: [
        "彼の意見に対して反対する。 (I oppose his opinion.)",
        "お客様に対して丁寧に話す。 (Speak politely towards customers.)",
        "南に対して窓がある。 (There's a window facing south.)"
      ],
      listening: "Listen for に対して — it marks the target of an attitude or action.",
      production: "Say three sentences about your attitude towards things using に対して."
    },
    {
      id: "L54g2",
      point: "〜にとって (for / from the perspective of ~)",
      explanation: "Form: noun ＋ にとって. Means 'from the standpoint of ~' or 'for ~'. Used to specify whose perspective we're evaluating from. Often followed by evaluation words like 大切, 重要, 難しい.",
      examples: [
        "私にとって、家族が一番大切です。 (For me, family is the most important.)",
        "学生にとって、この試験は難しすぎる。 (For students, this exam is too difficult.)",
        "子供にとって、遊びは学習だ。 (For children, play is learning.)"
      ],
      listening: "Listen for にとって — it marks whose perspective is being considered.",
      production: "Say three things that are important from your perspective using にとって."
    },
    {
      id: "L54g3",
      point: "〜として (as ~ / in the capacity of ~)",
      explanation: "Form: noun ＋ として. Means 'as ~' or 'in the role/capacity of ~'. Indicates the role, status, or function under which something is done.",
      examples: [
        "彼は医者として働いている。 (He works as a doctor.)",
        "この部屋は会議室として使われている。 (This room is used as a conference room.)",
        "留学生として日本に来ました。 (I came to Japan as an international student.)"
      ],
      listening: "Listen for として — it marks the role or capacity.",
      production: "Say three sentences about roles you have using として."
    }
  ],
  kanji: [
    { id: "L54k1", char: "対", reading: "たい／つ（く）", meaning: "opposite; versus", exampleWord: "対して（たいして）" },
    { id: "L54k2", char: "役", reading: "やく", meaning: "role; duty", exampleWord: "役割（やくわり）" },
    { id: "L54k3", char: "立", reading: "りつ／た（つ）", meaning: "stand; position", exampleWord: "立場（たちば）" },
    { id: "L54k4", char: "専", reading: "せん", meaning: "specialty; exclusive", exampleWord: "専門（せんもん）" }
  ],
  reading: {
    id: "L54r1",
    title: "ボランティア活動",
    passage: "田中さんは大学生として、毎週末ボランティア活動をしている。お年寄りに対して、買い物を手伝ったり、話し相手になったりしている。田中さんにとって、この活動はとても意味がある。お年寄りにとっても、田中さんは孫のような存在だ。田中さんは「将来、医者として働きたいので、今の経験がきっと役に立つ」と言っている。",
    targetWords: [{ word: "大学生として", id: "L54v3" }, { word: "お年寄りに対して", id: "L54v4" }],
    questions: [
      { id: "rq54-1", q: "田中さんは何としてボランティアをしていますか。", o: ["高校生として", "大学生として", "医者として", "会社員として"], c: 1, exp: "大学生として、毎週末ボランティア活動をしている。" },
      { id: "rq54-2", q: "お年寄りに対して何をしていますか。", o: ["料理を教える", "買い物を手伝う", "掃除をする", "病院に連れて行く"], c: 1, exp: "買い物を手伝ったり、話し相手になったりしている。" },
      { id: "rq54-3", q: "田中さんにとって、この活動はどうですか。", o: ["意味がない", "意味がある", "大変すぎる", "時間の無駄"], c: 1, exp: "田中さんにとって、この活動はとても意味がある。" }
    ]
  },
  listening: [
    { id: "L54l1", audioText: "A：田中さんは何として働いていますか。 B：医者として働いています。", a: "田中さんは何として働いていますか。", o: ["教師", "医者", "エンジニア", "会社員"], c: 1, exp: "医者として働いています。" },
    { id: "L54l2", audioText: "A：この問題は難しいですね。 B：ええ、学生にとっては特に難しいと思います。", a: "誰にとって特に難しいですか。", o: ["先生", "学生", "大人", "専門家"], c: 1, exp: "学生にとっては特に難しいと思います。" }
  ],
  questions: [
    { id: "L54q1", dim: "grammar", type: "recall", difficulty: "medium", s: "彼の意見___反対する。", a: "に対して", o: ["に対して", "にとって", "として", "について"], c: 0, exp: "〜に対して = towards/against.", linksTo: "L54g1" },
    { id: "L54q2", dim: "grammar", type: "recall", difficulty: "medium", s: "私___、家族が一番大切です。", a: "にとって", o: ["にとって", "に対して", "として", "について"], c: 0, exp: "〜にとって = from the perspective of.", linksTo: "L54g2" },
    { id: "L54q3", dim: "grammar", type: "recall", difficulty: "medium", s: "彼は医者___働いている。", a: "として", o: ["として", "に対して", "にとって", "について"], c: 0, exp: "〜として = in the capacity of.", linksTo: "L54g3" },
    { id: "L54q4", dim: "vocab", type: "recognition", difficulty: "easy", s: "「役割」の意味は？", a: "role; part", o: ["salary", "role; part", "schedule", "opinion"], c: 1, exp: "役割（やくわり）= role.", linksTo: "L54v2" },
    { id: "L54q5", dim: "kanji", type: "recognition", difficulty: "medium", s: "「専門」の読み方は？", a: "せんもん", o: ["せんもん", "せんも", "そうもん", "せんめん"], c: 0, exp: "専門（せんもん）= specialty.", linksTo: "L54k4" },
    { id: "L54q6", dim: "grammar", type: "recall", difficulty: "medium", s: "お客様___丁寧に話す。", a: "に対して", o: ["に対して", "にとって", "として", "について"], c: 0, exp: "〜に対して = towards (attitude/action direction).", linksTo: "L54g1" }
  ]
},

/* ===================== LESSON 55 ===================== */
{
  lessonNum: 55,
  topic: "〜にしたがって・〜につれて・〜とともに",
  topicEn: "As ~ Changes · Along With",
  module: 'L55', moduleLabel: 'L55 — にしたがって・につれて・とともに', lesson: 'L55', lessonLabel: 'As It Changes',
  difficulty: "medium",
  level: "N3",
  vocabulary: [
    { id: "L55v1", word: "従う", reading: "したがう", pitch: 3, meaning: "to follow (rules); to obey", example: "規則に従って行動する。", exampleMeaning: "Act following the rules." },
    { id: "L55v2", word: "進歩", reading: "しんぽ", pitch: 1, meaning: "progress; advancement", example: "技術の進歩にしたがって、生活が便利になった。", exampleMeaning: "As technology progressed, life became convenient." },
    { id: "L55v3", word: "経済", reading: "けいざい", pitch: 1, meaning: "economy", example: "経済の成長とともに、問題も増えた。", exampleMeaning: "Along with economic growth, problems also increased." },
    { id: "L55v4", word: "成長", reading: "せいちょう", pitch: 0, meaning: "growth; development", example: "子供の成長につれて、親の心配も増える。", exampleMeaning: "As children grow, parents' worries increase." },
    { id: "L55v5", word: "時代", reading: "じだい", pitch: 1, meaning: "era; times; age", example: "時代とともに価値観が変わった。", exampleMeaning: "Values changed along with the times." },
    { id: "L55v6", word: "減少", reading: "げんしょう", pitch: 0, meaning: "decrease; reduction", example: "人口が減少するにつれて、町が静かになった。", exampleMeaning: "As the population decreased, the town became quiet." },
    { id: "L55v7", word: "増加", reading: "ぞうか", pitch: 0, meaning: "increase; growth", example: "観光客の増加にしたがって、問題も起きた。", exampleMeaning: "As tourists increased, problems arose too." },
    { id: "L55v8", word: "変化する", reading: "へんかする", pitch: 1, meaning: "to change; to transform", example: "気候が変化するにつれて、農業も変わる。", exampleMeaning: "As the climate changes, agriculture also changes." },
    { id: "L55v9", word: "発展", reading: "はってん", pitch: 0, meaning: "development; growth", example: "都市の発展にしたがって、人口が増えた。", exampleMeaning: "As the city developed, the population grew." },
    { id: "L55v10", word: "共に", reading: "ともに", pitch: 3, meaning: "together with; along with", example: "時代とともに変わる。", exampleMeaning: "Changes along with the times." }
  ],
  grammar: [
    {
      id: "L55g1",
      point: "〜にしたがって / 〜につれて (as ~ changes, so does ~)",
      explanation: "Form: noun/verb dictionary form ＋ にしたがって / につれて. Both mean 'as X changes, Y also changes proportionally'. につれて emphasizes that Y changes as a consequence of X changing. Often interchangeable.",
      examples: [
        "時間がたつにつれて、痛みが消えていった。 (As time passed, the pain faded.)",
        "経済が発展するにしたがって、贫富の差が広がった。 (As the economy developed, the wealth gap widened.)",
        "年をとるにつれて、健康が大切になる。 (As you get older, health becomes more important.)"
      ],
      listening: "Listen for にしたがって/につれて — they signal proportional change.",
      production: "Say three things that change as something else changes."
    },
    {
      id: "L55g2",
      point: "〜とともに (along with / together with ~)",
      explanation: "Form: noun/verb dictionary form ＋ とともに. Means 'along with ~' or 'at the same time as ~'. Can express simultaneous actions, co-occurrence, or change. More formal/literary than 〜と一緒に.",
      examples: [
        "時代とともに、言葉も変わる。 (Along with the times, language also changes.)",
        "家族とともに日本へ来ました。 (I came to Japan together with my family.)",
        "年をとるとともに、落ち着いてきた。 (Along with getting older, I've calmed down.)"
      ],
      listening: "Listen for とともに — it signals co-occurrence or simultaneous change.",
      production: "Say three things that happen along with something else using とともに."
    }
  ],
  kanji: [
    { id: "L55k1", char: "従", reading: "じゅう／した（がう）", meaning: "follow; obey", exampleWord: "従う（したがう）" },
    { id: "L55k2", char: "進", reading: "しん／すす（む）", meaning: "advance; progress", exampleWord: "進歩（しんぽ）" },
    { id: "L55k3", char: "減", reading: "げん／へ（る）", meaning: "decrease; reduce", exampleWord: "減少（げんしょう）" },
    { id: "L55k4", char: "増", reading: "ぞう／ふ（える）", meaning: "increase; add", exampleWord: "増加（ぞうか）" }
  ],
  reading: {
    id: "L55r1",
    title: "変わる町",
    passage: "この町は十年前に比べて大きく変わった。人口が減少するにつれて、静かな町になった。一方で、観光客の増加にしたがって、新しいカフェやホテルが増えた。時代とともに、人々の生活も変わっている。昔は農業が中心だったが、今は観光業が主力になった。変化するとともに、新しい問題も出てきている。",
    targetWords: [{ word: "減少するにつれて", id: "L55v6" }, { word: "時代とともに", id: "L55v5" }],
    questions: [
      { id: "rq55-1", q: "町はどう変わりましたか。", o: ["大きくなった", "静かになった", "人口が増えた", "何も変わらない"], c: 1, exp: "人口が減少するにつれて、静かな町になった。" },
      { id: "rq55-2", q: "観光客の増加にしたがって何が増えましたか。", o: ["農業", "カフェやホテル", "人口", "学校"], c: 1, exp: "新しいカフェやホテルが増えた。" },
      { id: "rq55-3", q: "昔は何が中心でしたか。", o: ["観光業", "農業", "工業", "サービス業"], c: 1, exp: "昔は農業が中心だった。" }
    ]
  },
  listening: [
    { id: "L55l1", audioText: "A：日本語が上手になりましたね。 B：勉強するにつれて、少しずつ上手になりました。", a: "Bさんはどうして上手になりましたか。", o: ["日本に住んでいるから", "勉強するにつれて上手になった", "才能があるから", "友達が多いから"], c: 1, exp: "勉強するにつれて、少しずつ上手になりました。" },
    { id: "L55l2", audioText: "A：時代とともに、何が変わりましたか。 B：人々の価値観が大きく変わりました。", a: "何が変わりましたか。", o: ["天気", "人々の価値観", "人口", "経済"], c: 1, exp: "人々の価値観が大きく変わりました。" }
  ],
  questions: [
    { id: "L55q1", dim: "grammar", type: "recall", difficulty: "medium", s: "時間がたつ___、痛みが消えていった。", a: "につれて", o: ["につれて", "にとって", "として", "に対して"], c: 0, exp: "〜につれて = as X changes, Y changes.", linksTo: "L55g1" },
    { id: "L55q2", dim: "grammar", type: "recall", difficulty: "medium", s: "時代___、言葉も変わる。", a: "とともに", o: ["とともに", "につれて", "に対して", "にとって"], c: 0, exp: "〜とともに = along with.", linksTo: "L55g2" },
    { id: "L55q3", dim: "vocab", type: "recognition", difficulty: "medium", s: "「減少」の意味は？", a: "decrease; reduction", o: ["increase", "decrease; reduction", "change", "progress"], c: 1, exp: "減少（げんしょう）= decrease.", linksTo: "L55v6" },
    { id: "L55q4", dim: "kanji", type: "recognition", difficulty: "medium", s: "「進歩」の読み方は？", a: "しんぽ", o: ["しんぽ", "しんぼ", "しんぽう", "すすむ"], c: 0, exp: "進歩（しんぽ）= progress.", linksTo: "L55k2" },
    { id: "L55q5", dim: "grammar", type: "recall", difficulty: "medium", s: "年をとる___、健康が大切になる。", a: "につれて", o: ["につれて", "にとって", "として", "とともに"], c: 0, exp: "〜につれて = as X changes.", linksTo: "L55g1" },
    { id: "L55q6", dim: "vocab", type: "recognition", difficulty: "easy", s: "「時代」の読み方は？", a: "じだい", o: ["じだい", "じたい", "ときだい", "じかん"], c: 0, exp: "時代（じだい）= era/times.", linksTo: "L55v5" }
  ]
}

,

/* ===================== LESSON 56 ===================== */
{
  lessonNum: 56,
  topic: "〜からこそ・〜からには・〜以上",
  topicEn: "Because (Emphatic) · Since · As Long As",
  module: 'L56', moduleLabel: 'L56 — からこそ・からには・以上', lesson: 'L56', lessonLabel: 'Because · Since',
  difficulty: "hard",
  level: "N3",
  vocabulary: [
    { id: "L56v1", word: "夢", reading: "ゆめ", pitch: 2, meaning: "dream; aspiration", example: "夢があるからこそ、頑張れる。", exampleMeaning: "It's because I have a dream that I can try hard." },
    { id: "L56v2", word: "決意", reading: "けつい", pitch: 1, meaning: "determination; resolve", example: "決意したからには、やり遂げる。", exampleMeaning: "Since I've made up my mind, I'll see it through." },
    { id: "L56v3", word: "責任感", reading: "せきにんかん", pitch: 4, meaning: "sense of responsibility", example: "責任感がある以上、最後までやる。", exampleMeaning: "As long as I have a sense of responsibility, I'll do it to the end." },
    { id: "L56v4", word: "約束", reading: "やくそく", pitch: 0, meaning: "promise; commitment", example: "約束したからには、守らなければならない。", exampleMeaning: "Since I promised, I must keep it." },
    { id: "L56v5", word: "挑戦", reading: "ちょうせん", pitch: 1, meaning: "challenge; attempt", example: "挑戦するからこそ、成長できる。", exampleMeaning: "It's because I challenge myself that I can grow." },
    { id: "L56v6", word: "覚悟", reading: "かくご", pitch: 1, meaning: "preparedness; readiness", example: "覚悟した上でやったことだ。", exampleMeaning: "I did it with preparedness." },
    { id: "L56v7", word: "諦める", reading: "あきらめる", pitch: 4, meaning: "to give up; to abandon", example: "諦めないからこそ、成功できる。", exampleMeaning: "It's because I don't give up that I can succeed." },
    { id: "L56v8", word: "達成", reading: "たっせい", pitch: 0, meaning: "achievement; accomplishment", example: "目標を達成するからには、努力が必要だ。", exampleMeaning: "Since achieving a goal requires effort." },
    { id: "L56v9", word: "後悔", reading: "こうかい", pitch: 1, meaning: "regret; remorse", example: "後悔しない以上、自分の選択を信じる。", exampleMeaning: "As long as I don't regret, I trust my choices." },
    { id: "L56v10", word: "一生懸命", reading: "いっしょうけんめい", pitch: 5, meaning: "with utmost effort", example: "一生懸命やるからこそ、結果が出る。", exampleMeaning: "It's because I try my hardest that results come." }
  ],
  grammar: [
    {
      id: "L56g1",
      point: "〜からこそ (it's precisely because ~)",
      explanation: "Form: plain form ＋ からこそ. Emphasizes the reason: 'it's PRECISELY because ~ that...'. Used when the speaker wants to stress that this reason is the main/only cause. Often used for emotional or motivational statements.",
      examples: [
        "あなたのことが好きだからこそ、厳しいことを言うんです。 (It's precisely because I like you that I say harsh things.)",
        "夢があるからこそ、頑張れるんです。 (It's precisely because I have a dream that I can work hard.)",
        "難しいからこそ、やりがいがある。 (It's precisely because it's difficult that it's worth doing.)"
      ],
      listening: "Listen for からこそ — the speaker is emphasizing the reason strongly.",
      production: "Say three things you do precisely because of a specific reason using からこそ."
    },
    {
      id: "L56g2",
      point: "〜からには / 〜以上 (since ~, then must ~)",
      explanation: "Form: plain form ＋ からには / 以上. Both mean 'since ~ is the case, then ~ must follow'. They express obligation or determination based on a condition. からには is slightly more formal. 以上 is more literary. Both are followed by strong expressions like べきだ, なければならない, つもりだ.",
      examples: [
        "約束したからには、守らなければならない。 (Since I promised, I must keep it.)",
        "学生である以上、勉強すべきだ。 (As long as you're a student, you should study.)",
        "引き受けたからには、最後までやる。 (Since I took it on, I'll do it to the end.)"
      ],
      listening: "Listen for からには/以上 — they signal 'since X, Y is obligatory'.",
      production: "Say three obligations that follow from conditions using からには or 以上."
    }
  ],
  kanji: [
    { id: "L56k1", char: "夢", reading: "む／ゆめ", meaning: "dream", exampleWord: "夢（ゆめ）" },
    { id: "L56k2", char: "決", reading: "けつ／き（める）", meaning: "decide; resolve", exampleWord: "決意（けつい）" },
    { id: "L56k3", char: "挑", reading: "ちょう", meaning: "challenge", exampleWord: "挑戦（ちょうせん）" },
    { id: "L56k4", char: "達", reading: "たつ／たち", meaning: "achieve; reach", exampleWord: "達成（たっせい）" }
  ],
  reading: {
    id: "L56r1",
    title: "夢に向かって",
    passage: "田中さんは子供の時から医者になる夢を持っていた。難しいとわかっていても、夢があるからこそ、諦めなかった。「医学部に入るからには、絶対に卒業する」と決意した。学生である以上、勉強はもちろん大切だが、田中さんはボランティアも続けた。挑戦するからこそ、成長できると信じているからだ。今、一生懸命努力している。",
    targetWords: [{ word: "夢があるからこそ", id: "L56v1" }, { word: "決意したからには", id: "L56v2" }],
    questions: [
      { id: "rq56-1", q: "田中さんは何になりたいですか。", o: ["教師", "医者", "エンジニア", "弁護士"], c: 1, exp: "医者になる夢を持っていた。" },
      { id: "rq56-2", q: "なぜ諦めなかったのですか。", o: ["簡単だから", "夢があるからこそ", "親に言われたから", "お金のため"], c: 1, exp: "夢があるからこそ、諦めなかった。" },
      { id: "rq56-3", q: "田中さんは何を信じていますか。", o: ["挑戦するからこそ成長できる", "勉強だけが大切", "ボランティアは無駄", "夢は諦めるべき"], c: 0, exp: "挑戦するからこそ、成長できると信じている。" }
    ]
  },
  listening: [
    { id: "L56l1", audioText: "A：どうしてそんなに頑張れるんですか。 B：夢があるからこそ、頑張れるんです。", a: "Bさんはなぜ頑張れると言っていますか。", o: ["才能があるから", "夢があるからこそ", "時間があるから", "お金のため"], c: 1, exp: "夢があるからこそ、頑張れるんです。" },
    { id: "L56l2", audioText: "A：約束したからには、守らなければならないよね。 B：もちろん。絶対に守るよ。", a: "Aさんは何と言いましたか。", o: ["約束は守らなくてもいい", "約束したからには守らなければならない", "約束を忘れた", "新しい約束をしたい"], c: 1, exp: "約束したからには、守らなければならない。" }
  ],
  questions: [
    { id: "L56q1", dim: "grammar", type: "recall", difficulty: "hard", s: "夢がある___、頑張れるんです。", a: "からこそ", o: ["からこそ", "からには", "以上", "につれて"], c: 0, exp: "〜からこそ = precisely because.", linksTo: "L56g1" },
    { id: "L56q2", dim: "grammar", type: "recall", difficulty: "hard", s: "約束した___、守らなければならない。", a: "からには", o: ["からには", "からこそ", "に対して", "にとって"], c: 0, exp: "〜からには = since X, must do Y.", linksTo: "L56g2" },
    { id: "L56q3", dim: "grammar", type: "recall", difficulty: "hard", s: "学生である___、勉強すべきだ。", a: "以上", o: ["以上", "からこそ", "につれて", "にとって"], c: 0, exp: "〜以上 = as long as X, should do Y.", linksTo: "L56g2" },
    { id: "L56q4", dim: "vocab", type: "recognition", difficulty: "medium", s: "「諦める」の意味は？", a: "to give up", o: ["to start", "to give up", "to continue", "to decide"], c: 1, exp: "諦める（あきらめる）= to give up.", linksTo: "L56v7" },
    { id: "L56q5", dim: "kanji", type: "recognition", difficulty: "medium", s: "「挑戦」の読み方は？", a: "ちょうせん", o: ["ちょうせん", "たっせん", "とうせん", "ちょうせん"], c: 0, exp: "挑戦（ちょうせん）= challenge.", linksTo: "L56k3" },
    { id: "L56q6", dim: "vocab", type: "recognition", difficulty: "easy", s: "「後悔」の意味は？", a: "regret; remorse", o: ["happiness", "regret; remorse", "effort", "success"], c: 1, exp: "後悔（こうかい）= regret.", linksTo: "L56v9" }
  ]
},

/* ===================== LESSON 57 ===================== */
{
  lessonNum: 57,
  topic: "〜どころか・〜ばかりか・〜どころではない",
  topicEn: "Far From · Not Only · No Time For",
  module: 'L57', moduleLabel: 'L57 — どころか・ばかりか・どころではない', lesson: 'L57', lessonLabel: 'Far From · Not Only',
  difficulty: "hard",
  level: "N3",
  vocabulary: [
    { id: "L57v1", word: "余裕", reading: "よゆう", pitch: 1, meaning: "margin; leeway; room", example: "忙しくて、休む余裕などない。", exampleMeaning: "I'm so busy I have no leeway to rest." },
    { id: "L57v2", word: "損害", reading: "そんがい", pitch: 0, meaning: "damage; loss", example: "損害どころか、利益が出た。", exampleMeaning: "Far from damage, we made a profit." },
    { id: "L57v3", word: "失敗", reading: "しっぱい", pitch: 0, meaning: "failure; mistake", example: "失敗ばかりか、病気にもなった。", exampleMeaning: "Not only failure, I also got sick." },
    { id: "L57v4", word: "困難", reading: "こんなん", pitch: 1, meaning: "difficulty; hardship", example: "困難どころか、簡単すぎた。", exampleMeaning: "Far from difficult, it was too easy." },
    { id: "L57v5", word: "回復", reading: "かいふく", pitch: 0, meaning: "recovery; restoration", example: "回復どころか、悪化している。", exampleMeaning: "Far from recovering, it's getting worse." },
    { id: "L57v6", word: "最悪", reading: "さいあく", pitch: 0, meaning: "worst; terrible", example: "最悪どころではないが、よくもない。", exampleMeaning: "It's not the worst, but not good either." },
    { id: "L57v7", word: "暇", reading: "ひま", pitch: 0, meaning: "free time; leisure", example: "暇どころか、寝る時間もない。", exampleMeaning: "Free time? I don't even have time to sleep." },
    { id: "L57v8", word: "後退", reading: "こうたい", pitch: 0, meaning: "regression; setback", example: "進歩どころか、後退している。", exampleMeaning: "Far from progress, we're regressing." },
    { id: "L57v9", word: "借金", reading: "しゃっきん", pitch: 3, meaning: "debt; borrowing", example: "失敗したばかりか、借金まで作った。", exampleMeaning: "Not only did I fail, I also went into debt." },
    { id: "L57v10", word: "不平不満", reading: "ふへいふまん", pitch: 5, meaning: "complaints; dissatisfaction", example: "不平不満ばかり言っている。", exampleMeaning: "He's always complaining." }
  ],
  grammar: [
    {
      id: "L57g1",
      point: "〜どころか (far from ~ / let alone ~)",
      explanation: "Form: noun/na-adj stem/i-adj/verb plain ＋ どころか. Means 'far from ~' or 'not to mention ~'. Used to strongly deny an expectation and state the opposite is true. Very expressive and colloquial.",
      examples: [
        "簡単どころか、とても難しかった。 (Far from easy, it was very difficult.)",
        "暇どころか、寝る時間もない。 (Free time? I don't even have time to sleep.)",
        "少しどころか、全部使ってしまった。 (Not just a little, I used it all.)"
      ],
      listening: "Listen for どころか — it signals the reality is the opposite of expectation.",
      production: "Say three things that are far from what you expected using どころか."
    },
    {
      id: "L57g2",
      point: "〜ばかりか (not only ~ but also ~)",
      explanation: "Form: noun/na-adj stem/i-adj/verb plain ＋ ばかりか. Means 'not only ~ but also ~'. Often followed by も or まで. More formal than 〜だけでなく. Used for both positive and negative escalation.",
      examples: [
        "日本語ばかりか、英語も話せる。 (Not only Japanese, but also English.)",
        "失敗したばかりか、借金まで作ってしまった。 (Not only did I fail, I also went into debt.)",
        "彼は頭がいいばかりか、性格もいい。 (He's not only smart, but also has a good personality.)"
      ],
      listening: "Listen for ばかりか — it signals additional information beyond the first point.",
      production: "Say three things that are 'not only X but also Y' using ばかりか."
    },
    {
      id: "L57g3",
      point: "〜どころではない (this is no time for ~ / far from it)",
      explanation: "Form: noun/verb stem ＋ どころではない. Means 'this is no time for ~' or 'I'm in no position to ~'. Used when the situation is too serious/busy/urgent for something.",
      examples: [
        "今は遊んでいるどころではない。 (This is no time to be playing.)",
        "試験前で、寝ているどころではない。 (It's before exams, no time to be sleeping.)",
        "仕事が忙しくて、旅行どころではない。 (Work is so busy, no time for travel.)"
      ],
      listening: "Listen for どころではない — it means the situation doesn't allow for ~.",
      production: "Say three things you have no time/room for using どころではない."
    }
  ],
  kanji: [
    { id: "L57k1", char: "余", reading: "よ", meaning: "surplus; leeway", exampleWord: "余裕（よゆう）" },
    { id: "L57k2", char: "損", reading: "そん", meaning: "loss; damage", exampleWord: "損害（そんがい）" },
    { id: "L57k3", char: "困", reading: "こん／こま（る）", meaning: "trouble; difficulty", exampleWord: "困難（こんなん）" },
    { id: "L57k4", char: "復", reading: "ふく", meaning: "restore; recover", exampleWord: "回復（かいふく）" }
  ],
  reading: {
    id: "L57r1",
    title: "忙しすぎる毎日",
    passage: "田中さんは最近、新しいプロジェクトを任された。仕事が忙しくて、暇どころか、寝る時間もない。簡単どころか、とても難しい仕事だ。失敗ばかりか、損害を出してはいけないから、プレッシャーが大きい。友達から「週末、遊びに行かない？」と誘われたが、遊んでいるどころではない。まず仕事を終わらせなければならない。",
    targetWords: [{ word: "暇どころか", id: "L57v7" }, { word: "失敗ばかりか", id: "L57v3" }],
    questions: [
      { id: "rq57-1", q: "田中さんは今どうですか。", o: ["暇だ", "忙しくて寝る時間もない", "仕事が簡単だ", "遊んでいる"], c: 1, exp: "暇どころか、寝る時間もない。" },
      { id: "rq57-2", q: "仕事はどうですか。", o: ["簡単だ", "難しい", "暇だ", "終わった"], c: 1, exp: "簡単どころか、とても難しい仕事だ。" },
      { id: "rq57-3", q: "友達は何を誘いましたか。", o: ["仕事を手伝う", "週末遊びに行く", "一緒に勉強する", "旅行に行く"], c: 1, exp: "週末、遊びに行かないと誘われた。" }
    ]
  },
  listening: [
    { id: "L57l1", audioText: "A：週末、暇ですか？ B：暇どころか、寝る時間もないくらい忙しいです。", a: "Bさんは週末どうですか。", o: ["暇だ", "暇どころか忙しい", "遊びに行く", "寝ている"], c: 1, exp: "暇どころか、寝る時間もないくらい忙しいです。" },
    { id: "L57l2", audioText: "A：彼、日本語が上手ですね。 B：ええ、日本語ばかりか、英語も話せるんですよ。", a: "彼は何が話せますか。", o: ["日本語だけ", "日本語ばかりか英語も", "英語だけ", "何も話せない"], c: 1, exp: "日本語ばかりか、英語も話せる。" }
  ],
  questions: [
    { id: "L57q1", dim: "grammar", type: "recall", difficulty: "hard", s: "簡単___、とても難しかった。", a: "どころか", o: ["どころか", "ばかりか", "からこそ", "につれて"], c: 0, exp: "〜どころか = far from.", linksTo: "L57g1" },
    { id: "L57q2", dim: "grammar", type: "recall", difficulty: "hard", s: "日本語___、英語も話せる。", a: "ばかりか", o: ["ばかりか", "どころか", "からこそ", "以上"], c: 0, exp: "〜ばかりか = not only...but also.", linksTo: "L57g2" },
    { id: "L57q3", dim: "grammar", type: "recall", difficulty: "hard", s: "今は遊んでいる___ない。", a: "どころでは", o: ["どころでは", "ばかりか", "からこそ", "以上"], c: 0, exp: "〜どころではない = no time for.", linksTo: "L57g3" },
    { id: "L57q4", dim: "vocab", type: "recognition", difficulty: "medium", s: "「余裕」の意味は？", a: "margin; leeway", o: ["time", "margin; leeway", "money", "energy"], c: 1, exp: "余裕（よゆう）= leeway.", linksTo: "L57v1" },
    { id: "L57q5", dim: "kanji", type: "recognition", difficulty: "medium", s: "「損害」の読み方は？", a: "そんがい", o: ["そんがい", "そんが", "しょうがい", "そんかい"], c: 0, exp: "損害（そんがい）= damage.", linksTo: "L57k2" },
    { id: "L57q6", dim: "grammar", type: "recall", difficulty: "hard", s: "失敗した___、借金まで作ってしまった。", a: "ばかりか", o: ["ばかりか", "どころか", "からこそ", "以上"], c: 0, exp: "〜ばかりか = not only...but also.", linksTo: "L57g2" }
  ]
},

/* ===================== LESSON 58 ===================== */
{
  lessonNum: 58,
  topic: "〜かねない・〜かねる・〜恐れがある",
  topicEn: "Might (Negative) · Cannot Do · Risk Of",
  module: 'L58', moduleLabel: 'L58 — かねない・かねる・恐れがある', lesson: 'L58', lessonLabel: 'Risk · Cannot',
  difficulty: "hard",
  level: "N3",
  vocabulary: [
    { id: "L58v1", word: "危険", reading: "きけん", pitch: 1, meaning: "danger; hazard", example: "危険が起こりかねない。", exampleMeaning: "A danger might occur." },
    { id: "L58v2", word: "恐れ", reading: "おそれ", pitch: 3, meaning: "fear; risk", example: "失敗する恐れがある。", exampleMeaning: "There's a risk of failure." },
    { id: "L58v3", word: "承知", reading: "しょうち", pitch: 1, meaning: "understanding; consent", example: "承知しかねます。", exampleMeaning: "I cannot agree/accept." },
    { id: "L58v4", word: "判断", reading: "はんだん", pitch: 1, meaning: "judgment; decision", example: "判断しかねる。", exampleMeaning: "I cannot make a judgment." },
    { id: "L58v5", word: "大事故", reading: "だいじこ", pitch: 3, meaning: "major accident", example: "大事故になりかねない。", exampleMeaning: "It could lead to a major accident." },
    { id: "L58v6", word: "感染", reading: "かんせん", pitch: 0, meaning: "infection", example: "感染の恐れがある。", exampleMeaning: "There's a risk of infection." },
    { id: "L58v7", word: "遅延", reading: "ちえん", pitch: 0, meaning: "delay", example: "遅延の恐れがあります。", exampleMeaning: "There's a risk of delay." },
    { id: "L58v8", word: "許可", reading: "きょか", pitch: 1, meaning: "permission; approval", example: "許可しかねます。", exampleMeaning: "I cannot grant permission." },
    { id: "L58v9", word: "回避", reading: "かいひ", pitch: 1, meaning: "avoidance; evasion", example: "リスクを回避する。", exampleMeaning: "Avoid risk." },
    { id: "L58v10", word: "重大", reading: "じゅうだい", pitch: 0, meaning: "serious; grave", example: "重大な問題になりかねない。", exampleMeaning: "It could become a serious problem." }
  ],
  grammar: [
    {
      id: "L58g1",
      point: "〜かねない (might ~ / could ~ — negative outcome)",
      explanation: "Form: verb stem (ます form without ます) ＋ かねない. Means 'might (do something undesirable)'. Used for negative possibilities. Different from 〜かもしれない: かねない specifically implies a negative/unwelcome outcome. Often used in warnings.",
      examples: [
        "このままでは、大事故になりかねない。 (At this rate, it could become a major accident.)",
        "彼ならやりかねない。 (He might actually do it — and that would be bad.)",
        "油断すると失敗しかねない。 (If you're careless, you could fail.)"
      ],
      listening: "Listen for かねない — it warns about a negative possibility.",
      production: "Say three negative things that might happen using かねない."
    },
    {
      id: "L58g2",
      point: "〜かねる (cannot do ~ / find it difficult to ~)",
      explanation: "Form: verb stem (ます form without ます) ＋ かねる. Means 'I find it difficult to ~' or 'I cannot bring myself to ~'. This is NOT physical inability but psychological/social difficulty. Very polite and formal. Used in business to decline requests softly.",
      examples: [
        "そのお願いはお受けしかねます。 (I find it difficult to accept that request.)",
        "私では判断しかねます。 (I find it difficult to make a judgment.)",
        "こんな大きなことは決めかねる。 (I can't decide on something this big.)"
      ],
      listening: "Listen for かねる — it signals polite refusal or inability.",
      production: "Say three things you find difficult to do (politely) using かねる."
    },
    {
      id: "L58g3",
      point: "〜恐れがある (there is a risk of ~)",
      explanation: "Form: noun ＋ の恐れがある / verb stem or plain form ＋ 恐れがある. Means 'there is a risk/danger of ~'. More formal than かねない. Used in official announcements, news, and warnings. Always implies a negative outcome.",
      examples: [
        "台風による被害が出る恐れがある。 (There's a risk of damage from the typhoon.)",
        "感染の恐れがある方は、病院へ行ってください。 (Those at risk of infection should go to a hospital.)",
        "列車が遅延する恐れがあります。 (There is a risk that trains may be delayed.)"
      ],
      listening: "Listen for 恐れがある — it's a formal warning about risk.",
      production: "Say three risks you know about using 恐れがある."
    }
  ],
  kanji: [
    { id: "L58k1", char: "危", reading: "き", meaning: "danger; risk", exampleWord: "危険（きけん）" },
    { id: "L58k2", char: "恐", reading: "きょう／おそ（れる）", meaning: "fear; dread", exampleWord: "恐れ（おそれ）" },
    { id: "L58k3", char: "承", reading: "しょう", meaning: "accept; understand", exampleWord: "承知（しょうち）" },
    { id: "L58k4", char: "染", reading: "せん／そ（める）", meaning: "dye; infect", exampleWord: "感染（かんせん）" }
  ],
  reading: {
    id: "L58r1",
    title: "台風の警告",
    passage: "明日は大型台風が接近する恐れがある。気象庁は「強風による被害が出かねないので、注意してほしい」と警告した。外出を控え、不要不急の外出は避けることが推奨されている。もし被害が出た場合、保険の適用については判断しかねる場合もあるという。重大な事故になりかねないので、十分な準備が必要だ。",
    targetWords: [{ word: "接近する恐れがある", id: "L58v2" }, { word: "判断しかねる", id: "L58v4" }],
    questions: [
      { id: "rq58-1", q: "明日何が来る恐れがありますか。", o: ["地震", "大型台風", "津波", "大雪"], c: 1, exp: "大型台風が接近する恐れがある。" },
      { id: "rq58-2", q: "気象庁は何と言いましたか。", o: ["外出してよい", "注意してほしい", "心配ない", "避難しなさい"], c: 1, exp: "注意してほしいと警告した。" },
      { id: "rq58-3", q: "何が推奨されていますか。", o: ["外出すること", "外出を控えること", "仕事を休まないこと", "旅行に行くこと"], c: 1, exp: "外出を控えることが推奨されている。" }
    ]
  },
  listening: [
    { id: "L58l1", audioText: "A：この依頼、お受けできますか？ B：申し訳ありませんが、お受けしかねます。", a: "Bさんはどう答えましたか。", o: ["受けると言った", "受けかねると言った", "明日答える", "引き受けた"], c: 1, exp: "お受けしかねます＝受けられません。" },
    { id: "L58l2", audioText: "A：台風で電車が遅れるそうですよ。 B：遅延の恐れがありますね。早く出発しましょう。", a: "何の恐れがありますか。", o: ["事故", "遅延", "感染", "台風"], c: 1, exp: "遅延の恐れがあります。" }
  ],
  questions: [
    { id: "L58q1", dim: "grammar", type: "recall", difficulty: "hard", s: "このままでは、大事故になり___。", a: "かねない", o: ["かねない", "かねる", "恐れがある", "どころか"], c: 0, exp: "〜かねない = might (negative).", linksTo: "L58g1" },
    { id: "L58q2", dim: "grammar", type: "recall", difficulty: "hard", s: "そのお願いはお受け___。", a: "しかねます", o: ["しかねます", "かねません", "する恐れがある", "どころか"], c: 0, exp: "〜かねる = cannot (polite refusal).", linksTo: "L58g2" },
    { id: "L58q3", dim: "grammar", type: "recall", difficulty: "hard", s: "台風による被害が出る___がある。", a: "恐れ", o: ["恐れ", "かねない", "どころか", "ばかりか"], c: 0, exp: "〜恐れがある = there is a risk of.", linksTo: "L58g3" },
    { id: "L58q4", dim: "vocab", type: "recognition", difficulty: "medium", s: "「承知」の意味は？", a: "understanding; consent", o: ["danger", "understanding; consent", "delay", "infection"], c: 1, exp: "承知（しょうち）= understanding.", linksTo: "L58v3" },
    { id: "L58q5", dim: "kanji", type: "recognition", difficulty: "medium", s: "「感染」の読み方は？", a: "かんせん", o: ["かんせん", "かんぜん", "せんかん", "かんねん"], c: 0, exp: "感染（かんせん）= infection.", linksTo: "L58k4" },
    { id: "L58q6", dim: "vocab", type: "recognition", difficulty: "easy", s: "「重大」の読み方は？", a: "じゅうだい", o: ["じゅうだい", "じゅうたい", "おもたい", "ちょうだい"], c: 0, exp: "重大（じゅうだい）= serious.", linksTo: "L58v10" }
  ]
},

/* ===================== LESSON 59 ===================== */
{
  lessonNum: 59,
  topic: "〜にかけて・〜を通じて・〜を通して",
  topicEn: "Over (Period) · Through · Via",
  module: 'L59', moduleLabel: 'L59 — にかけて・を通じて・を通して', lesson: 'L59', lessonLabel: 'Over · Through',
  difficulty: "medium",
  level: "N3",
  vocabulary: [
    { id: "L59v1", word: "期間", reading: "きかん", pitch: 1, meaning: "period; term", example: "この期間にかけて、特別なイベントがある。", exampleMeaning: "Over this period, there are special events." },
    { id: "L59v2", word: "通信", reading: "つうしん", pitch: 0, meaning: "communication; correspondence", example: "通信を通じて情報を交換する。", exampleMeaning: "Exchange information through communication." },
    { id: "L59v3", word: "経験", reading: "けいけん", pitch: 1, meaning: "experience", example: "経験を通して学ぶ。", exampleMeaning: "Learn through experience." },
    { id: "L59v4", word: "四季", reading: "しき", pitch: 1, meaning: "four seasons", example: "日本は四季を通じて美しい。", exampleMeaning: "Japan is beautiful throughout the four seasons." },
    { id: "L59v5", word: "交流", reading: "こうりゅう", pitch: 0, meaning: "exchange; interaction", example: "交流を通じて友情が生まれる。", exampleMeaning: "Friendship is born through exchange." },
    { id: "L59v6", word: "夜中", reading: "よなか", pitch: 0, meaning: "midnight; middle of night", example: "夜中にかけて雨が降った。", exampleMeaning: "It rained through the middle of the night." },
    { id: "L59v7", word: "仲介", reading: "ちゅうかい", pitch: 0, meaning: "mediation; intermediary", example: "仲介を通して契約を結ぶ。", exampleMeaning: "Sign a contract through mediation." },
    { id: "L59v8", word: "直接", reading: "ちょくせつ", pitch: 0, meaning: "directly", example: "直接ではなく、通して伝える。", exampleMeaning: "Not directly, but communicate through someone." },
    { id: "L59v9", word: "影響", reading: "えいきょう", pitch: 0, meaning: "influence; effect", example: "メディアを通じて影響を受ける。", exampleMeaning: "Be influenced through media." },
    { id: "L59v10", word: "全期間", reading: "ぜんきかん", pitch: 3, meaning: "entire period", example: "全期間を通じて出席率が高い。", exampleMeaning: "Attendance rate is high throughout the entire period." }
  ],
  grammar: [
    {
      id: "L59g1",
      point: "〜にかけて (over / through / during ~)",
      explanation: "Form: noun (time/place) ＋ にかけて. Means 'over (a period)' or 'throughout ~'. Used for time spans or spatial ranges. Can also mean 'in the area of ~' for expertise.",
      examples: [
        "今週末にかけて、台風が接近する。 (A typhoon will approach over this weekend.)",
        "春から夏にかけて、この花が咲く。 (From spring to summer, this flower blooms.)",
        "彼は数学にかけてはクラス一番だ。 (When it comes to math, he's the best in class.)"
      ],
      listening: "Listen for にかけて — it marks a span or range.",
      production: "Say three things that happen over a time span using にかけて."
    },
    {
      id: "L59g2",
      point: "〜を通じて / 〜を通して (through / throughout / via ~)",
      explanation: "Form: noun ＋ を通じて / を通して. Both mean 'through ~' or 'throughout ~'. Two uses: (1) means/method — 'via X'; (2) duration — 'throughout X'. を通じて is slightly more formal.",
      examples: [
        "インターネットを通じて情報を集める。 (Gather information through the internet.)",
        "一年を通じて、この町は賑わっている。 (Throughout the year, this town is bustling.)",
        "友人を通して彼と知り合った。 (I met him through a friend.)"
      ],
      listening: "Listen for を通じて/を通して — they mark the medium or duration.",
      production: "Say three things you do through a medium or throughout a period."
    }
  ],
  kanji: [
    { id: "L59k1", char: "期", reading: "き／ご", meaning: "period; term", exampleWord: "期間（きかん）" },
    { id: "L59k2", char: "通", reading: "つう／とお（る）", meaning: "pass through; commute", exampleWord: "通じて（つうじて）" },
    { id: "L59k3", char: "交", reading: "こう／まじ（える）", meaning: "mix; exchange", exampleWord: "交流（こうりゅう）" },
    { id: "L59k4", char: "直", reading: "ちょく／じか", meaning: "direct; straight", exampleWord: "直接（ちょくせつ）" }
  ],
  reading: {
    id: "L59r1",
    title: "国際交流",
    passage: "田中さんは一年を通じて、国際交流活動をしている。インターネットを通じて、世界中の人と情報を交換している。春から秋にかけては、留学生を家に泊める活動もしている。直接会って交流することを通じて、文化の違いを理解できるという。経験を通して学ぶことが大切だと田中さんは信じている。",
    targetWords: [{ word: "一年を通じて", id: "L59v1" }, { word: "インターネットを通じて", id: "L59v2" }],
    questions: [
      { id: "rq59-1", q: "田中さんは何をしていますか。", o: ["国際交流活動", "会社員", "留学生", "旅行"], c: 0, exp: "国際交流活動をしている。" },
      { id: "rq59-2", q: "いつ活動していますか。", o: ["春だけ", "一年を通じて", "秋だけ", "夏だけ"], c: 1, exp: "一年を通じて、国際交流活動をしている。" },
      { id: "rq59-3", q: "何を通じて情報を交換していますか。", o: ["電話", "手紙", "インターネット", "直接"], c: 2, exp: "インターネットを通じて、世界中の人と情報を交換している。" }
    ]
  },
  listening: [
    { id: "L59l1", audioText: "A：いつからいつにかけてイベントがありますか。 B：春から夏にかけてです。", a: "イベントはいつありますか。", o: ["秋から冬", "春から夏", "一年中", "夏だけ"], c: 1, exp: "春から夏にかけてです。" },
    { id: "L59l2", audioText: "A：彼とどうやって知り合いましたか。 B：友人を通して知り合いました。", a: "どうやって知り合いましたか。", o: ["直接", "友人を通して", "インターネット", "仕事で"], c: 1, exp: "友人を通して知り合いました。" }
  ],
  questions: [
    { id: "L59q1", dim: "grammar", type: "recall", difficulty: "medium", s: "春から夏___、この花が咲く。", a: "にかけて", o: ["にかけて", "を通じて", "を通して", "に対して"], c: 0, exp: "〜にかけて = over a span.", linksTo: "L59g1" },
    { id: "L59q2", dim: "grammar", type: "recall", difficulty: "medium", s: "インターネット___情報を集める。", a: "を通じて", o: ["を通じて", "にかけて", "に対して", "にとって"], c: 0, exp: "〜を通じて = through (medium).", linksTo: "L59g2" },
    { id: "L59q3", dim: "grammar", type: "recall", difficulty: "medium", s: "一年___、この町は賑わっている。", a: "を通じて", o: ["を通じて", "にかけて", "に対して", "にとって"], c: 0, exp: "〜を通じて = throughout (duration).", linksTo: "L59g2" },
    { id: "L59q4", dim: "vocab", type: "recognition", difficulty: "easy", s: "「交流」の読み方は？", a: "こうりゅう", o: ["こうりゅう", "こうりょ", "こりゅう", "こうるい"], c: 0, exp: "交流（こうりゅう）= exchange.", linksTo: "L59v5" },
    { id: "L59q5", dim: "kanji", type: "recognition", difficulty: "medium", s: "「直接」の読み方は？", a: "ちょくせつ", o: ["ちょくせつ", "とうせつ", "じかせつ", "ちょくせつ"], c: 0, exp: "直接（ちょくせつ）= directly.", linksTo: "L59k4" },
    { id: "L59q6", dim: "vocab", type: "recognition", difficulty: "medium", s: "「経験」の意味は？", a: "experience", o: ["experiment", "experience", "expert", "expense"], c: 1, exp: "経験（けいけん）= experience.", linksTo: "L59v3" }
  ]
},

/* ===================== LESSON 60 ===================== */
{
  lessonNum: 60,
  topic: "〜きる・〜きれない・〜抜く",
  topicEn: "Completely · Cannot Completely · Through To End",
  module: 'L60', moduleLabel: 'L60 — きる・きれない・抜く', lesson: 'L60', lessonLabel: 'Completely · Through',
  difficulty: "medium",
  level: "N3",
  vocabulary: [
    { id: "L60v1", word: "使い切る", reading: "つかいきる", pitch: 4, meaning: "to use up completely", example: "お金を使い切ってしまった。", exampleMeaning: "I used up all my money." },
    { id: "L60v2", word: "信じきれない", reading: "しんじきれない", pitch: 6, meaning: "cannot completely believe", example: "その話は信じきれない。", exampleMeaning: "I can't completely believe that story." },
    { id: "L60v3", word: "やり抜く", reading: "やりぬく", pitch: 3, meaning: "to do to the end; to carry through", example: "最後までやり抜く。", exampleMeaning: "Carry it through to the end." },
    { id: "L60v4", word: "困り抜く", reading: "こまりぬく", pitch: 4, meaning: "to be completely at a loss", example: "困り抜いた末に決めた。", exampleMeaning: "I decided after being completely stuck." },
    { id: "L60v5", word: "疲れ切る", reading: "つかれきる", pitch: 4, meaning: "to be completely exhausted", example: "疲れ切って倒れた。", exampleMeaning: "I was completely exhausted and collapsed." },
    { id: "L60v6", word: "考え抜く", reading: "かんがえぬく", pitch: 5, meaning: "to think through thoroughly", example: "考え抜いた結果、決めた。", exampleMeaning: "I decided after thinking it through." },
    { id: "L60v7", word: "迷い抜く", reading: "まよいぬく", pitch: 4, meaning: "to struggle through indecision", example: "迷い抜いた末に結論が出た。", exampleMeaning: "After struggling with indecision, I reached a conclusion." },
    { id: "L60v8", word: "走り抜く", reading: "はしりぬく", pitch: 4, meaning: "to run all the way through", example: "最後まで走り抜いた。", exampleMeaning: "I ran all the way to the end." },
    { id: "L60v9", word: "勝ち抜く", reading: "かちぬく", pitch: 3, meaning: "to win through; to triumph", example: "厳しい競争を勝ち抜く。", exampleMeaning: "Win through tough competition." },
    { id: "L60v10", word: "理解し切る", reading: "りかいしきる", pitch: 5, meaning: "to understand completely", example: "理解し切れない問題がある。", exampleMeaning: "There are problems I can't fully understand." }
  ],
  grammar: [
    {
      id: "L60g1",
      point: "〜きる / 〜きれない (completely / cannot completely ~)",
      explanation: "Form: verb stem (ます form without ます) ＋ きる = 'do completely / to the end'. 〜きれない = 'cannot do completely / cannot finish'. きる emphasizes doing something 100%, while きれない emphasizes being unable to fully do something.",
      examples: [
        "本を読みきった。 (I read the book completely.)",
        "食べきれないほど料理があった。 (There was so much food I couldn't eat it all.)",
        "信じきれないという顔をしていた。 (He had a face that said 'I can't believe it.')"
      ],
      listening: "Listen for きる/きれない — they signal completeness or inability to complete.",
      production: "Say three things you've done completely and three you couldn't complete."
    },
    {
      id: "L60g2",
      point: "〜抜く (do ~ through to the end / thoroughly)",
      explanation: "Form: verb stem (ます form without ます) ＋ 抜く. Means 'to do something through to the end' or 'to do thoroughly despite difficulty'. Similar to きる but 抜く emphasizes perseverance through hardship. The nuance is 'pushing through obstacles to complete ~'.",
      examples: [
        "考え抜いた結果、会社を辞めることにした。 (After thinking it through completely, I decided to quit the company.)",
        "最後まで走り抜いた。 (I ran all the way through to the end.)",
        "困り抜いた末に、親に頼った。 (After struggling to the limit, I relied on my parents.)"
      ],
      listening: "Listen for 抜く — it signals perseverance through difficulty to completion.",
      production: "Say three things you've done through to the end despite difficulty using 抜く."
    }
  ],
  kanji: [
    { id: "L60k1", char: "切", reading: "せつ／き（る）", meaning: "cut; complete", exampleWord: "使い切る（つかいきる）" },
    { id: "L60k2", char: "抜", reading: "ばつ／ぬ（く）", meaning: "extract; pull out", exampleWord: "やり抜く（やりぬく）" },
    { id: "L60k3", char: "疲", reading: "ひ", meaning: "exhausted; tired", exampleWord: "疲れ切る（つかれきる）" },
    { id: "L60k4", char: "迷", reading: "めい／まよ（う）", meaning: "lost; hesitate", exampleWord: "迷い抜く（まよいぬく）" }
  ],
  reading: {
    id: "L60r1",
    title: "最後までやり抜く",
    passage: "田中さんはマラソン大会に出ることになった。練習は厳しくて、何度も諦めそうになった。しかし、考え抜いた末に、最後までやり抜くと決めた。当日、途中で疲れ切ってしまったが、走り抜くことができた。ゴールした時、信じきれないという表情だった。困り抜いた練習の日々が、結果につながったのだ。",
    targetWords: [{ word: "考え抜いた", id: "L60v6" }, { word: "やり抜く", id: "L60v3" }],
    questions: [
      { id: "rq60-1", q: "田中さんは何に出ることになりましたか。", o: ["サッカー大会", "マラソン大会", "弁論大会", "テスト"], c: 1, exp: "マラソン大会に出ることになった。" },
      { id: "rq60-2", q: "練習はどうでしたか。", o: ["簡単だった", "厳しくて諦めそうになった", "楽しかった", "短かった"], c: 1, exp: "練習は厳しくて、何度も諦めそうになった。" },
      { id: "rq60-3", q: "ゴールした時どうしましたか。", o: ["泣いた", "信じきれない表情だった", "笑った", "倒れた"], c: 1, exp: "信じきれないという表情だった。" }
    ]
  },
  listening: [
    { id: "L60l1", audioText: "A：このケーキ、全部食べられる？ B：無理！食べきれないよ。", a: "Bさんはどう言いましたか。", o: ["全部食べられる", "食べきれない", "もう食べた", "食べたくない"], c: 1, exp: "食べきれないよ。" },
    { id: "L60l2", audioText: "A：最後までやり抜きましたか？ B：はい、考え抜いた結果、最後までやりました。", a: "Bさんはどうしましたか。", o: ["途中でやめた", "最後までやり抜いた", "まだやっている", "やっていない"], c: 1, exp: "最後までやり抜いた。" }
  ],
  questions: [
    { id: "L60q1", dim: "grammar", type: "recall", difficulty: "medium", s: "本を読み___。", a: "きった", o: ["きった", "ぬいた", "どころか", "ばかりか"], c: 0, exp: "〜きる = do completely.", linksTo: "L60g1" },
    { id: "L60q2", dim: "grammar", type: "recall", difficulty: "medium", s: "食べ___ほど料理があった。", a: "きれない", o: ["きれない", "ぬけない", "どころか", "ばかりか"], c: 0, exp: "〜きれない = cannot completely.", linksTo: "L60g1" },
    { id: "L60q3", dim: "grammar", type: "recall", difficulty: "medium", s: "考え___結果、会社を辞めることにした。", a: "抜いた", o: ["抜いた", "きった", "どころか", "ばかりか"], c: 0, exp: "〜抜く = do through to the end.", linksTo: "L60g2" },
    { id: "L60q4", dim: "vocab", type: "recognition", difficulty: "medium", s: "「使い切る」の意味は？", a: "to use up completely", o: ["to start using", "to use up completely", "to stop using", "to reuse"], c: 1, exp: "使い切る（つかいきる）= to use up.", linksTo: "L60v1" },
    { id: "L60q5", dim: "kanji", type: "recognition", difficulty: "medium", s: "「疲れ切る」の読み方は？", a: "つかれきる", o: ["つかれきる", "つかぎる", "ひれきる", "つかれる"], c: 0, exp: "疲れ切る（つかれきる）= completely exhausted.", linksTo: "L60k3" },
    { id: "L60q6", dim: "vocab", type: "recognition", difficulty: "easy", s: "「勝ち抜く」の意味は？", a: "to win through", o: ["to give up", "to win through", "to lose", "to stop"], c: 1, exp: "勝ち抜く（かちぬく）= to win through.", linksTo: "L60v9" }
  ]
}
];

if (typeof window !== 'undefined') window.N3_CONTENT = N3_CONTENT;
else if (typeof module !== 'undefined') module.exports = N3_CONTENT;
