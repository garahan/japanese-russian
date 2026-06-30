/* manga-data.js — Original graded Japanese reading content for the manga reader.
   Each story has: id, title, level (N5/N4/N3), cover emoji, description,
   and panels with Japanese text, reading (furigana), translation, and vocab links.
   Stories are original, inspired by slice-of-life manga tropes. */

if (typeof window !== 'undefined') window.MANGA_STORIES = [
  {
    id: 'cafe_encounter',
    title: 'カフェでのできごと',
    titleEn: 'The Cafe Encounter',
    level: 'N5',
    cover: '☕',
    desc: 'A girl meets a mysterious boy at a cafe. Simple N5 grammar and daily vocabulary.',
    chapters: [
      {
        id: 'ch1',
        title: 'はじめてのカフェ',
        titleEn: 'First Time at the Cafe',
        panels: [
          {
            emoji: '👧',
            jp: 'わたしはまいあさ、カフェに行きます。',
            reading: 'わたしは まいあさ、カフェに いきます。',
            romaji: 'Watashi wa maiasa, cafe ni ikimasu.',
            en: 'I go to a cafe every morning.',
            vocab: [
              { w: 'わたし', m: 'I, me' },
              { w: 'まいあさ', m: 'every morning' },
              { w: 'カフェ', m: 'cafe' },
              { w: '行きます', m: 'to go' }
            ]
          },
          {
            emoji: '☕',
            jp: 'コーヒーを飲みながら、本を読みます。',
            reading: 'コーヒーを のみながら、ほんを よみます。',
            romaji: 'Kōhī o nominagara, hon o yomimasu.',
            en: 'While drinking coffee, I read a book.',
            vocab: [
              { w: 'コーヒー', m: 'coffee' },
              { w: '飲みます', m: 'to drink' },
              { w: '本', m: 'book' },
              { w: '読みます', m: 'to read' }
            ]
          },
          {
            emoji: '🚪',
            jp: 'ある日、男の人が入ってきました。',
            reading: 'あるひ、おとこのひとが はいってきました。',
            romaji: 'Aru hi, otoko no hito ga haittekimashita.',
            en: 'One day, a man came in.',
            vocab: [
              { w: 'ある日', m: 'one day' },
              { w: '男の人', m: 'man' },
              { w: '入ってくる', m: 'to come in' }
            ]
          },
          {
            emoji: '📚',
            jp: '彼は本をたくさん持っていました。',
            reading: 'かれは ほんを たくさん もっていました。',
            romaji: 'Kare wa hon o takusan motteimashita.',
            en: 'He was carrying many books.',
            vocab: [
              { w: '彼', m: 'he' },
              { w: '本', m: 'book' },
              { w: 'たくさん', m: 'many, a lot' },
              { w: '持つ', m: 'to hold, carry' }
            ]
          },
          {
            emoji: '😳',
            jp: 'わたしはちょっとどきどきしました。',
            reading: 'わたしは ちょっと どきどきしました。',
            romaji: 'Watashi wa chotto dokidoki shimashita.',
            en: 'My heart beat a little faster.',
            vocab: [
              { w: 'ちょっと', m: 'a little' },
              { w: 'どきどき', m: 'heart pounding (onomatopoeia)' }
            ]
          }
        ]
      },
      {
        id: 'ch2',
        title: 'こわれたコーヒー',
        titleEn: 'The Spilled Coffee',
        panels: [
          {
            emoji: '💥',
            jp: '彼がすわったとき、コーヒーがこぼれました！',
            reading: 'かれが すわったとき、コーヒーが こぼれました！',
            romaji: 'Kare ga suwatta toki, kōhī ga koboremashita!',
            en: 'When he sat down, the coffee spilled!',
            vocab: [
              { w: '座る', m: 'to sit' },
              { w: 'とき', m: 'when' },
              { w: 'こぼれる', m: 'to spill' }
            ]
          },
          {
            emoji: '😱',
            jp: '「あ！すみません！」',
            reading: '「あ！すみません！」',
            romaji: '"A! Sumimasen!"',
            en: '"Ah! I\'m sorry!"',
            vocab: [
              { w: 'すみません', m: 'excuse me, I\'m sorry' }
            ]
          },
          {
            emoji: '🧻',
            jp: 'わたしはティッシュをわたしました。',
            reading: 'わたしは ティッシュを わたしました。',
            romaji: 'Watashi wa tissyu o watashimashita.',
            en: 'I handed him a tissue.',
            vocab: [
              { w: 'ティッシュ', m: 'tissue' },
              { w: '渡す', m: 'to hand over' }
            ]
          },
          {
            emoji: '😊',
            jp: '彼はわらって、「ありがとう」といいました。',
            reading: 'かれは わらって、「ありがとう」と いいました。',
            romaji: 'Kare wa waratte, "arigatō" to iimashita.',
            en: 'He smiled and said, "Thank you."',
            vocab: [
              { w: '笑う', m: 'to laugh, smile' },
              { w: 'ありがとう', m: 'thank you' },
              { w: '言う', m: 'to say' }
            ]
          },
          {
            emoji: '🌸',
            jp: 'それから、わたしたちは友だちになりました。',
            reading: 'それから、わたしたちは ともだちに なりました。',
            romaji: 'Sorekara, watashitachi wa tomodachi ni narimashita.',
            en: 'After that, we became friends.',
            vocab: [
              { w: 'それから', m: 'after that, then' },
              { w: '友だち', m: 'friend' },
              { w: 'なる', m: 'to become' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'rainy_day',
    title: 'あめのひのぼうけん',
    titleEn: 'A Rainy Day Adventure',
    level: 'N4',
    cover: '🌧️',
    desc: 'Two friends get caught in the rain. N4 grammar with conditionals and te-forms.',
    chapters: [
      {
        id: 'ch1',
        title: 'かさをわすれて',
        titleEn: 'Forgot the Umbrella',
        panels: [
          {
            emoji: '🌧️',
            jp: 'きのう、学校からかえるとき、雨がふっていました。',
            reading: 'きのう、がっこうから かえるとき、あめが ふっていました。',
            romaji: 'Kinō, gakkō kara kaeru toki, ame ga futteimashita.',
            en: 'Yesterday, when I was going home from school, it was raining.',
            vocab: [
              { w: '昨日', m: 'yesterday' },
              { w: '学校', m: 'school' },
              { w: '帰る', m: 'to return home' },
              { w: '雨', m: 'rain' },
              { w: '降る', m: 'to fall (rain)' }
            ]
          },
          {
            emoji: '🤔',
            jp: 'かさをわすれたので、こまっていました。',
            reading: 'かさを わすれたので、こまっていました。',
            romaji: 'Kasa o wasureta node, komatteimashita.',
            en: 'I had forgotten my umbrella, so I was in trouble.',
            vocab: [
              { w: '傘', m: 'umbrella' },
              { w: '忘れる', m: 'to forget' },
              { w: '〜ので', m: 'because (reason)' },
              { w: '困る', m: 'to be in trouble' }
            ]
          },
          {
            emoji: '👫',
            jp: 'ともだちのメイさんが、「いっしょにいこう」といってくれました。',
            reading: 'ともだちの メイさんが、「いっしょに いこう」と いってくれました。',
            romaji: 'Tomodachi no Mei-san ga, "issho ni ikō" to itte kuremashita.',
            en: 'My friend Mei said, "Let\'s go together" for me.',
            vocab: [
              { w: '友だち', m: 'friend' },
              { w: '一緒に', m: 'together' },
              { w: '〜てくれる', m: 'someone does something for me' }
            ]
          },
          {
            emoji: '🏪',
            jp: 'わたしたちはコンビニにはいって、ねまものをかいました。',
            reading: 'わたしたちは コンビニに はって、ねまものを かいました。',
            romaji: 'Watashitachi wa konbini ni haitte, nemamono o kaimashita.',
            en: 'We went into a convenience store and bought snacks.',
            vocab: [
              { w: 'コンビニ', m: 'convenience store' },
              { w: '入る', m: 'to enter' },
              { w: 'お菓子', m: 'snacks, sweets' },
              { w: '買う', m: 'to buy' }
            ]
          },
          {
            emoji: '😄',
            jp: '雨の日も、ともだちといればたのしいです。',
            reading: 'あめのひも、ともだちと いれば たのしいです。',
            romaji: 'Ame no hi mo, tomodachi to ireba tanoshii desu.',
            en: 'Even on rainy days, if you\'re with friends, it\'s fun.',
            vocab: [
              { w: '雨の日', m: 'rainy day' },
              { w: '〜といれば', m: 'if you are with...' },
              { w: '楽しい', m: 'fun, enjoyable' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'summer_festival',
    title: 'なつまつりのやくそく',
    titleEn: 'The Summer Festival Promise',
    level: 'N4',
    cover: '🎆',
    desc: 'A summer festival, yukata, and a promise. N4-N3 grammar with conditionals and volitionals.',
    chapters: [
      {
        id: 'ch1',
        title: 'ゆかたをきて',
        titleEn: 'Wearing a Yukata',
        panels: [
          {
            emoji: '👘',
            jp: 'なつまつりの日、ゆかたをきました。',
            reading: 'なつまつりの ひ、ゆかたを きました。',
            romaji: 'Natumatsuri no hi, yukata o kimashita.',
            en: 'On the day of the summer festival, I wore a yukata.',
            vocab: [
              { w: '夏祭り', m: 'summer festival' },
              { w: '浴衣', m: 'yukata (summer kimono)' },
              { w: '着る', m: 'to wear' }
            ]
          },
          {
            emoji: '🤩',
            jp: 'まちをあるいていると、はなびが見えました。',
            reading: 'まちを あるいていると、はなびが みえました。',
            romaji: 'Machi o aruiteiru to, hanabi ga miemashita.',
            en: 'As I was walking through the town, I could see fireworks.',
            vocab: [
              { w: '町', m: 'town' },
              { w: '歩く', m: 'to walk' },
              { w: '花火', m: 'fireworks' },
              { w: '見える', m: 'to be visible' }
            ]
          },
          {
            emoji: '🍡',
            jp: 'りんごあめをたべながら、おまつりをたのしみました。',
            reading: 'りんごあめを たべながら、おまつりを たのしみました。',
            romaji: 'Ringo ame o tabenagara, omatsuri o tanoshimimashita.',
            en: 'While eating a candy apple, I enjoyed the festival.',
            vocab: [
              { w: 'りんごあめ', m: 'candy apple' },
              { w: '食べる', m: 'to eat' },
              { w: '〜ながら', m: 'while doing...' },
              { w: '楽しむ', m: 'to enjoy' }
            ]
          },
          {
            emoji: '🎆',
            jp: 'はなびはとてもきれいで、こころがうごきました。',
            reading: 'はなびは とても きれいで、こころが うごきました。',
            romaji: 'Hanabi wa totemo kirei de, kokoro ga ugokimashita.',
            en: 'The fireworks were so beautiful that my heart was moved.',
            vocab: [
              { w: '花火', m: 'fireworks' },
              { w: 'きれい', m: 'beautiful' },
              { w: '心', m: 'heart, mind' },
              { w: '動く', m: 'to move' }
            ]
          },
          {
            emoji: '🤝',
            jp: '「来年もいっしょにこよう」とやくそくしました。',
            reading: '「らいねんも いっしょに こよう」と やくそくしました。',
            romaji: '"Rainen mo issho ni koyō" to yakusoku shimashita.',
            en: 'We promised, "Let\'s come together next year too."',
            vocab: [
              { w: '来年', m: 'next year' },
              { w: '一緒に', m: 'together' },
              { w: '〜よう', m: 'let\'s do (volitional)' },
              { w: '約束', m: 'promise' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'library_secret',
    title: 'としょかんのひみつ',
    titleEn: 'The Library Secret',
    level: 'N3',
    cover: '📚',
    desc: 'A mysterious book leads to an unexpected discovery. N3 grammar with conditionals, conditionals, and formal expressions.',
    chapters: [
      {
        id: 'ch1',
        title: 'ふしぎなほん',
        titleEn: 'The Mysterious Book',
        panels: [
          {
            emoji: '🏫',
            jp: '大学の図書館で、古い本を見つけました。',
            reading: 'だいがくの としょかんで、ふるい ほんを みつけました。',
            romaji: 'Daigaku no toshokan de, furui hon o mitsukemashita.',
            en: 'At the university library, I found an old book.',
            vocab: [
              { w: '大学', m: 'university' },
              { w: '図書館', m: 'library' },
              { w: '古い', m: 'old' },
              { w: '見つける', m: 'to find' }
            ]
          },
          {
            emoji: '📖',
            jp: '本をひらいてみると、手紙がはいっていました。',
            reading: 'ほんを ひらいてみると、てがみが はいっていました。',
            romaji: 'Hon o hiraite miru to, tegami ga haitteimashita.',
            en: 'When I tried opening the book, a letter was inside.',
            vocab: [
              { w: '開く', m: 'to open' },
              { w: '〜てみる', m: 'to try doing...' },
              { w: '手紙', m: 'letter' },
              { w: '入る', m: 'to be inside' }
            ]
          },
          {
            emoji: '✉️',
            jp: '手紙には、「この本をよんだ人に」と書いてありました。',
            reading: 'てがみには、「このほんを よんだひとに」と かいてありました。',
            romaji: 'Tegami ni wa, "kono hon o yonda hito ni" to kaite arimashita.',
            en: 'The letter said, "To the person who reads this book."',
            vocab: [
              { w: '手紙', m: 'letter' },
              { w: '読む', m: 'to read' },
              { w: '人', m: 'person' },
              { w: '〜てある', m: 'something is in a state (result of action)' }
            ]
          },
          {
            emoji: '🧐',
            jp: '手紙によると、十年まえに学生が書いたものだそうです。',
            reading: 'てがみに よると、じゅうねんまえに がくせいが かいたものだそうです。',
            romaji: 'Tegami ni yoru to, jūnen mae ni gakusei ga kaita mono da sō desu.',
            en: 'According to the letter, it was written by a student ten years ago.',
            vocab: [
              { w: '〜によると', m: 'according to...' },
              { w: '十年', m: 'ten years' },
              { w: '学生', m: 'student' },
              { w: '〜そうだ', m: 'I heard that (hearsay)' }
            ]
          },
          {
            emoji: '🌟',
            jp: '日本語を勉強している人に、勇気をあたえたいと書いてありました。',
            reading: 'にほんごを べんきょうしている ひとに、ゆうきを あたえたいと かいてありました。',
            romaji: 'Nihongo o benkyō shiteiru hito ni, yūki o ataetai to kaite arimashita.',
            en: 'It said, "I want to give courage to those studying Japanese."',
            vocab: [
              { w: '日本語', m: 'Japanese language' },
              { w: '勉強する', m: 'to study' },
              { w: '勇気', m: 'courage' },
              { w: '与える', m: 'to give' },
              { w: '〜たい', m: 'want to do...' }
            ]
          }
        ]
      }
    ]
  }
];
