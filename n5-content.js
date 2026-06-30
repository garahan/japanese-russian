/* N5 CONTENT — Beginner Japanese (JLPT N5), Lessons 1-8 */
const N5_CONTENT = [
{
  lessonNum:1,topic:"挨拶・自己紹介",topicEn:"Greetings",module:'N5L1',moduleLabel:'N5 L1 — Greetings',lesson:'N5L1',lessonLabel:'Greetings',difficulty:"easy",level:"N5",
  vocabulary:[
    {id:"N5L1v1",word:"こんにちは",reading:"こんにちは",pitch:0,meaning:"hello",example:"こんにちは。",exampleMeaning:"Hello."},
    {id:"N5L1v2",word:"はじめまして",reading:"はじめまして",pitch:4,meaning:"nice to meet you",example:"はじめまして。",exampleMeaning:"Nice to meet you."},
    {id:"N5L1v3",word:"ありがとうございます",reading:"ありがとうございます",pitch:5,meaning:"thank you",example:"ありがとうございます。",exampleMeaning:"Thank you."},
    {id:"N5L1v4",word:"すみません",reading:"すみません",pitch:3,meaning:"excuse me; sorry",example:"すみません、駅はどこですか。",exampleMeaning:"Excuse me, where is the station?"},
    {id:"N5L1v5",word:"おはようございます",reading:"おはようございます",pitch:6,meaning:"good morning",example:"おはようございます。",exampleMeaning:"Good morning."},
    {id:"N5L1v6",word:"こんばんは",reading:"こんばんは",pitch:0,meaning:"good evening",example:"こんばんは。",exampleMeaning:"Good evening."},
    {id:"N5L1v7",word:"さようなら",reading:"さようなら",pitch:4,meaning:"goodbye",example:"さようなら。",exampleMeaning:"Goodbye."},
    {id:"N5L1v8",word:"はい",reading:"はい",pitch:0,meaning:"yes",example:"はい、そうです。",exampleMeaning:"Yes, that's right."},
    {id:"N5L1v9",word:"いいえ",reading:"いいえ",pitch:3,meaning:"no",example:"いいえ、違います。",exampleMeaning:"No, that's wrong."},
    {id:"N5L1v10",word:"名前",reading:"なまえ",pitch:2,meaning:"name",example:"名前は何ですか。",exampleMeaning:"What is your name?"},
    {id:"N5L1v11",word:"私",reading:"わたし",pitch:0,meaning:"I; me",example:"私は学生です。",exampleMeaning:"I am a student."},
    {id:"N5L1v12",word:"先生",reading:"せんせい",pitch:3,meaning:"teacher",example:"先生は日本人です。",exampleMeaning:"The teacher is Japanese."},
    {id:"N5L1v13",word:"学生",reading:"がくせい",pitch:0,meaning:"student",example:"私は学生です。",exampleMeaning:"I am a student."},
    {id:"N5L1v14",word:"会社員",reading:"かいしゃいん",pitch:3,meaning:"company employee",example:"父は会社員です。",exampleMeaning:"My father is a company employee."},
    {id:"N5L1v15",word:"日本人",reading:"にほんじん",pitch:4,meaning:"Japanese person",example:"田中さんは日本人です。",exampleMeaning:"Tanaka is Japanese."},
    {id:"N5L1v16",word:"何",reading:"なん／なに",pitch:0,meaning:"what",example:"これは何ですか。",exampleMeaning:"What is this?"},
    {id:"N5L1v17",word:"誰",reading:"だれ",pitch:1,meaning:"who",example:"あの人は誰ですか。",exampleMeaning:"Who is that person?"},
    {id:"N5L1v18",word:"国",reading:"くに",pitch:2,meaning:"country",example:"どこの国から来ましたか。",exampleMeaning:"Which country are you from?"},
    {id:"N5L1v19",word:"日本",reading:"にほん",pitch:2,meaning:"Japan",example:"日本へ行きたいです。",exampleMeaning:"I want to go to Japan."},
    {id:"N5L1v20",word:"大学",reading:"だいがく",pitch:0,meaning:"university",example:"大学の学生です。",exampleMeaning:"I'm a university student."},
    {id:"N5L1v21",word:"仕事",reading:"しごと",pitch:0,meaning:"work; job",example:"仕事は何ですか。",exampleMeaning:"What is your job?"},
    {id:"N5L1v22",word:"アメリカ",reading:"アメリカ",pitch:0,meaning:"USA",example:"アメリカから来ました。",exampleMeaning:"I came from America."},
    {id:"N5L1v23",word:"中国",reading:"ちゅうごく",pitch:1,meaning:"China",example:"中国から来ました。",exampleMeaning:"I came from China."},
    {id:"N5L1v24",word:"韓国",reading:"かんこく",pitch:1,meaning:"Korea",example:"韓国から来ました。",exampleMeaning:"I came from Korea."},
    {id:"N5L1v25",word:"どうぞ",reading:"どうぞ",pitch:1,meaning:"please (offering)",example:"どうぞ、お座りください。",exampleMeaning:"Please, have a seat."},
    {id:"N5L1v26",word:"お願いします",reading:"おねがいします",pitch:5,meaning:"please (requesting)",example:"コーヒーをお願いします。",exampleMeaning:"A coffee, please."},
    {id:"N5L1v27",word:"〜さん",reading:"〜さん",pitch:0,meaning:"Mr./Ms. (honorific)",example:"田中さんは先生です。",exampleMeaning:"Mr. Tanaka is a teacher."},
    {id:"N5L1v28",word:"〜歳",reading:"〜さい",pitch:0,meaning:"years old",example:"20歳です。",exampleMeaning:"I'm 20 years old."},
    {id:"N5L1v29",word:"どうぞよろしく",reading:"どうぞよろしく",pitch:5,meaning:"please treat me well",example:"どうぞよろしくお願いします。",exampleMeaning:"Please treat me well."},
    {id:"N5L1v30",word:"あなた",reading:"あなた",pitch:2,meaning:"you",example:"あなたは学生ですか。",exampleMeaning:"Are you a student?"}
  ],
  grammar:[
    {id:"N5L1g1",point:"〜は〜です (A is B)",explanation:"Basic sentence: [topic] は [noun] です. Negative: 〜じゃないです. Question: 〜ですか.",examples:["私は学生です。 (I am a student.)","田中さんは先生ですか。 (Is Tanaka a teacher?)"],listening:"は = topic, です = polite copula.",production:"Introduce yourself using 〜は〜です."},
    {id:"N5L1g2",point:"〜の (possessive)",explanation:"Noun の Noun links nouns. 私の本 (my book). 日本語の先生 (Japanese teacher).",examples:["私の名前は田中です。 (My name is Tanaka.)","これは田中さんの傘です。 (This is Tanaka's umbrella.)"],listening:"の connects two nouns.",production:"Say 'my book' and 'Japanese teacher' using の."}
  ],
  kanji:[
    {id:"N5L1k1",char:"日",reading:"にち／に／ひ",meaning:"day; sun; Japan",exampleWord:"日本（にほん）"},
    {id:"N5L1k2",char:"本",reading:"ほん／もと",meaning:"book; origin",exampleWord:"日本（にほん）"},
    {id:"N5L1k3",char:"人",reading:"じん／にん／ひと",meaning:"person",exampleWord:"日本人（にほんじん）"},
    {id:"N5L1k4",char:"学",reading:"がく／まな（ぶ）",meaning:"study; learn",exampleWord:"学生（がくせい）"},
    {id:"N5L1k5",char:"生",reading:"せい／なま",meaning:"life; birth",exampleWord:"学生（がくせい）"},
    {id:"N5L1k6",char:"先",reading:"せん／さき",meaning:"before; ahead",exampleWord:"先生（せんせい）"},
    {id:"N5L1k7",char:"名",reading:"めい／な",meaning:"name",exampleWord:"名前（なまえ）"},
    {id:"N5L1k8",char:"私",reading:"し／わたし",meaning:"I; private",exampleWord:"私（わたし）"}
  ],
  reading:{id:"N5L1r1",title:"自己紹介",passage:"はじめまして。私の名前は田中太郎です。日本人です。東京大学の学生です。20歳です。専門は日本語です。どうぞよろしくお願いします。",targetWords:[{word:"はじめまして",id:"N5L1v2"},{word:"学生",id:"N5L1v13"}],questions:[
    {id:"rqN5L1-1",q:"田中さんは何歳ですか。",o:["18歳","20歳","22歳","25歳"],c:1,exp:"20歳です。"},
    {id:"rqN5L1-2",q:"どこの国の人ですか。",o:["アメリカ","中国","日本","韓国"],c:2,exp:"日本人です。"},
    {id:"rqN5L1-3",q:"何の学生ですか。",o:["英語","日本語","中国語","歴史"],c:1,exp:"専門は日本語です。"}
  ]},
  listening:[
    {id:"N5L1l1",audioText:"A：はじめまして。田中です。B：はじめまして。山田です。",a:"二人は何をしていますか。",o:["挨拶している","仕事している","勉強している","食べている"],c:0,exp:"自己紹介しています。"},
    {id:"N5L1l2",audioText:"A：おはようございます。B：おはよう。",a:"いつの挨拶ですか。",o:["朝","昼","夜","夜中"],c:0,exp:"おはようは朝の挨拶。"}
  ],
  questions:[
    {id:"N5L1q1",dim:"grammar",type:"recall",difficulty:"easy",s:"私___学生です。",a:"は",o:["は","が","を","の"],c:0,exp:"は marks the topic.",linksTo:"N5L1g1"},
    {id:"N5L1q2",dim:"grammar",type:"recall",difficulty:"easy",s:"これは田中さん___本です。",a:"の",o:["の","は","が","を"],c:0,exp:"の links nouns (possession).",linksTo:"N5L1g2"},
    {id:"N5L1q3",dim:"grammar",type:"recall",difficulty:"easy",s:"田中さんは学生___か。",a:"です",o:["です","だ","する","いる"],c:0,exp:"ですか = polite question.",linksTo:"N5L1g1"},
    {id:"N5L1q4",dim:"vocab",type:"recognition",difficulty:"easy",s:"「はじめまして」の意味は？",a:"nice to meet you",o:["good morning","nice to meet you","thank you","goodbye"],c:1,exp:"はじめまして = nice to meet you.",linksTo:"N5L1v2"},
    {id:"N5L1q5",dim:"vocab",type:"recognition",difficulty:"easy",s:"「すみません」の意味は？",a:"excuse me; sorry",o:["thank you","hello","excuse me; sorry","goodbye"],c:2,exp:"すみません = excuse me / sorry.",linksTo:"N5L1v4"},
    {id:"N5L1q6",dim:"kanji",type:"recognition",difficulty:"easy",s:"「日」の漢字の意味は？",a:"day; sun",o:["book","day; sun","person","name"],c:1,exp:"日 = day / sun.",linksTo:"N5L1k1"},
    {id:"N5L1q7",dim:"grammar",type:"recall",difficulty:"medium",s:"これは私の本___。(negative)",a:"じゃないです",o:["です","じゃないです","ます","ました"],c:1,exp:"Negative of です: じゃないです.",linksTo:"N5L1g1"},
    {id:"N5L1q8",dim:"vocab",type:"recognition",difficulty:"easy",s:"「先生」の読み方は？",a:"せんせい",o:["がくせい","せんせい","かいしゃいん","にほんじん"],c:1,exp:"先生 = せんせい.",linksTo:"N5L1v12"},
    {id:"N5L1q9",dim:"vocab",type:"recall",difficulty:"easy",s:"___は何ですか。(What is your ___? — name)",a:"名前",o:["名前","仕事","国","大学"],c:0,exp:"名前 = name.",linksTo:"N5L1v10"},
    {id:"N5L1q10",dim:"kanji",type:"recognition",difficulty:"easy",s:"「人」の漢字の意味は？",a:"person",o:["book","day","person","study"],c:2,exp:"人 = person.",linksTo:"N5L1k3"},
    {id:"N5L1q11",dim:"vocab",type:"recall",difficulty:"medium",s:"どこの___から来ましたか。(country)",a:"国",o:["国","大学","仕事","名前"],c:0,exp:"国 = country.",linksTo:"N5L1v18"},
    {id:"N5L1q12",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'study / learn'?",a:"学",o:["日","本","学","私"],c:2,exp:"学 → 学生 (student).",linksTo:"N5L1k4"}
  ]
},
{
  lessonNum:2,topic:"数字と時間",topicEn:"Numbers & Time",module:'N5L2',moduleLabel:'N5 L2 — Numbers & Time',lesson:'N5L2',lessonLabel:'Numbers & Time',difficulty:"easy",level:"N5",
  vocabulary:[
    {id:"N5L2v1",word:"一",reading:"いち",pitch:2,meaning:"one",example:"一つください。",exampleMeaning:"One, please."},
    {id:"N5L2v2",word:"二",reading:"に",pitch:1,meaning:"two",example:"二人で行きます。",exampleMeaning:"Two people go."},
    {id:"N5L2v3",word:"三",reading:"さん",pitch:1,meaning:"three",example:"三時に会いましょう。",exampleMeaning:"Let's meet at 3."},
    {id:"N5L2v4",word:"四",reading:"よん／し",pitch:1,meaning:"four",example:"四月は桜の季節です。",exampleMeaning:"April is cherry blossom season."},
    {id:"N5L2v5",word:"五",reading:"ご",pitch:1,meaning:"five",example:"五分待ってください。",exampleMeaning:"Please wait 5 minutes."},
    {id:"N5L2v6",word:"時間",reading:"じかん",pitch:0,meaning:"time; hour",example:"時間がありません。",exampleMeaning:"There's no time."},
    {id:"N5L2v7",word:"時",reading:"じ",pitch:0,meaning:"o'clock",example:"三時です。",exampleMeaning:"It's 3 o'clock."},
    {id:"N5L2v8",word:"分",reading:"ふん／ぷん",pitch:1,meaning:"minute",example:"十分待ちました。",exampleMeaning:"I waited 10 minutes."},
    {id:"N5L2v9",word:"半",reading:"はん",pitch:1,meaning:"half",example:"三時半に会いましょう。",exampleMeaning:"Let's meet at 3:30."},
    {id:"N5L2v10",word:"今",reading:"いま",pitch:2,meaning:"now",example:"今何時ですか。",exampleMeaning:"What time is it now?"},
    {id:"N5L2v11",word:"朝",reading:"あさ",pitch:1,meaning:"morning",example:"朝六時に起きます。",exampleMeaning:"I get up at 6 AM."},
    {id:"N5L2v12",word:"昼",reading:"ひる",pitch:2,meaning:"noon; daytime",example:"昼ご飯を食べます。",exampleMeaning:"I eat lunch."},
    {id:"N5L2v13",word:"夜",reading:"よる",pitch:1,meaning:"night",example:"夜十時に寝ます。",exampleMeaning:"I go to bed at 10 PM."},
    {id:"N5L2v14",word:"今日",reading:"きょう",pitch:1,meaning:"today",example:"今日は忙しいです。",exampleMeaning:"I'm busy today."},
    {id:"N5L2v15",word:"明日",reading:"あした",pitch:3,meaning:"tomorrow",example:"明日学校へ行きます。",exampleMeaning:"I'll go to school tomorrow."},
    {id:"N5L2v16",word:"昨日",reading:"きのう",pitch:2,meaning:"yesterday",example:"昨日映画を見ました。",exampleMeaning:"I watched a movie yesterday."},
    {id:"N5L2v17",word:"週末",reading:"しゅうまつ",pitch:1,meaning:"weekend",example:"週末は何をしますか。",exampleMeaning:"What do you do on weekends?"},
    {id:"N5L2v18",word:"今朝",reading:"けさ",pitch:1,meaning:"this morning",example:"今朝パンを食べました。",exampleMeaning:"I ate bread this morning."},
    {id:"N5L2v19",word:"毎日",reading:"まいにち",pitch:1,meaning:"every day",example:"毎日日本語を勉強します。",exampleMeaning:"I study Japanese every day."},
    {id:"N5L2v20",word:"〜月",reading:"〜がつ",pitch:0,meaning:"month (counter)",example:"一月は寒いです。",exampleMeaning:"January is cold."},
    {id:"N5L2v21",word:"年",reading:"とし／ねん",pitch:0,meaning:"year",example:"来年日本へ行きます。",exampleMeaning:"I'll go to Japan next year."},
    {id:"N5L2v22",word:"来年",reading:"らいねん",pitch:0,meaning:"next year",example:"来年大学に入ります。",exampleMeaning:"I'll enter university next year."},
    {id:"N5L2v23",word:"去年",reading:"きょねん",pitch:1,meaning:"last year",example:"去年日本へ行きました。",exampleMeaning:"I went to Japan last year."},
    {id:"N5L2v24",word:"何時",reading:"なんじ",pitch:0,meaning:"what time",example:"今何時ですか。",exampleMeaning:"What time is it now?"},
    {id:"N5L2v25",word:"〜から",reading:"〜から",pitch:0,meaning:"from (time/place)",example:"九時から始まります。",exampleMeaning:"It starts from 9."},
    {id:"N5L2v26",word:"〜まで",reading:"〜まで",pitch:0,meaning:"until (time/place)",example:"五時まで働きます。",exampleMeaning:"I work until 5."},
    {id:"N5L2v27",word:"〜ごろ",reading:"〜ごろ",pitch:0,meaning:"around (approximate time)",example:"六時ごろ起きます。",exampleMeaning:"I get up around 6."},
    {id:"N5L2v28",word:"〜日",reading:"〜にち",pitch:0,meaning:"day of month",example:"三月三日です。",exampleMeaning:"It's March 3rd."},
    {id:"N5L2v29",word:"週間",reading:"しゅうかん",pitch:0,meaning:"weeks (duration)",example:"二週間休みます。",exampleMeaning:"I'll take 2 weeks off."},
    {id:"N5L2v30",word:"何分",reading:"なんぷん",pitch:0,meaning:"how many minutes",example:"何分かかりますか。",exampleMeaning:"How many minutes does it take?"}
  ],
  grammar:[
    {id:"N5L2g1",point:"〜時に〜ます (at [time] I do ~)",explanation:"Specific time takes に: 六時に起きます. Omitted with relative time words like 今日, 明日, 毎日.",examples:["七時に朝ご飯を食べます。 (I eat breakfast at 7.)","毎日日本語を勉強します。 (I study Japanese every day.)"],listening:"に marks specific times.",production:"Say what time you get up and go to bed."},
    {id:"N5L2g2",point:"〜から〜まで (from ~ to ~)",explanation:"から = 'from', まで = 'until/to'. Used for time and place ranges.",examples:["九時から五時まで働きます。 (I work from 9 to 5.)","東京から大阪まで行きます。 (From Tokyo to Osaka.)"],listening:"から = start, まで = end.",production:"Say your schedule using 〜から〜まで."}
  ],
  kanji:[
    {id:"N5L2k1",char:"時",reading:"じ／とき",meaning:"time; o'clock",exampleWord:"時間（じかん）"},
    {id:"N5L2k2",char:"間",reading:"かん／あいだ",meaning:"interval; between",exampleWord:"時間（じかん）"},
    {id:"N5L2k3",char:"分",reading:"ふん／ぷん／わ（ける）",meaning:"minute; divide",exampleWord:"分（ふん）"},
    {id:"N5L2k4",char:"半",reading:"はん",meaning:"half",exampleWord:"三時半（さんじはん）"},
    {id:"N5L2k5",char:"今",reading:"こん／いま",meaning:"now",exampleWord:"今（いま）"},
    {id:"N5L2k6",char:"朝",reading:"ちょう／あさ",meaning:"morning",exampleWord:"朝（あさ）"},
    {id:"N5L2k7",char:"夜",reading:"や／よる",meaning:"night",exampleWord:"夜（よる）"},
    {id:"N5L2k8",char:"来",reading:"らい／く（る）",meaning:"come; next",exampleWord:"来年（らいねん）"}
  ],
  reading:{id:"N5L2r1",title:"毎日のスケジュール",passage:"毎朝六時に起きます。七時に朝ご飯を食べます。八時に家を出ます。九時から五時まで会社で働きます。六時に家に帰ります。夜七時に晩ご飯を食べます。十時に寝ます。",targetWords:[{word:"起きます",id:"N5L2v10"},{word:"働きます",id:"N5L2v6"}],questions:[
    {id:"rqN5L2-1",q:"何時に起きますか。",o:["五時","六時","七時","八時"],c:1,exp:"六時に起きます。"},
    {id:"rqN5L2-2",q:"何時から何時まで働きますか。",o:["8時〜4時","9時〜5時","9時〜6時","8時〜5時"],c:1,exp:"九時から五時まで働きます。"},
    {id:"rqN5L2-3",q:"何時に寝ますか。",o:["九時","十時","十一時","十二時"],c:1,exp:"十時に寝ます。"}
  ]},
  listening:[
    {id:"N5L2l1",audioText:"A：今何時ですか。B：三時半です。",a:"今何時ですか。",o:["三時","三時半","四時","四時半"],c:1,exp:"三時半です。"},
    {id:"N5L2l2",audioText:"A：明日何時に来ますか。B：九時ごろ来ます。",a:"何時に来ますか。",o:["八時ごろ","九時ごろ","十時ごろ","十一時ごろ"],c:1,exp:"九時ごろ来ます。"}
  ],
  questions:[
    {id:"N5L2q1",dim:"grammar",type:"recall",difficulty:"easy",s:"六時___起きます。",a:"に",o:["に","で","を","が"],c:0,exp:"Specific time takes に.",linksTo:"N5L2g1"},
    {id:"N5L2q2",dim:"grammar",type:"recall",difficulty:"easy",s:"九時___五時___働きます。",a:"から・まで",o:["から・まで","に・で","で・に","を・が"],c:0,exp:"から〜まで = from ~ to ~.",linksTo:"N5L2g2"},
    {id:"N5L2q3",dim:"grammar",type:"recall",difficulty:"medium",s:"毎日日本語___勉強します。",a:"を",o:["を","に","で","が"],c:0,exp:"を marks direct object. 毎日 doesn't take に.",linksTo:"N5L2g1"},
    {id:"N5L2q4",dim:"vocab",type:"recognition",difficulty:"easy",s:"「今」の読み方は？",a:"いま",o:["いま","きょう","あした","けさ"],c:0,exp:"今 = いま (now).",linksTo:"N5L2v10"},
    {id:"N5L2q5",dim:"vocab",type:"recognition",difficulty:"easy",s:"「明日」の意味は？",a:"tomorrow",o:["today","tomorrow","yesterday","now"],c:1,exp:"明日 = tomorrow.",linksTo:"N5L2v15"},
    {id:"N5L2q6",dim:"kanji",type:"recognition",difficulty:"easy",s:"「時」の漢字の意味は？",a:"time; o'clock",o:["day","time; o'clock","person","name"],c:1,exp:"時 = time.",linksTo:"N5L2k1"},
    {id:"N5L2q7",dim:"grammar",type:"recall",difficulty:"medium",s:"月曜日___学校へ行きます。",a:"に",o:["に","で","を","から"],c:0,exp:"Specific days take に.",linksTo:"N5L2g1"},
    {id:"N5L2q8",dim:"vocab",type:"recognition",difficulty:"easy",s:"「半」の読み方は？",a:"はん",o:["はん","さん","じ","ふん"],c:0,exp:"半 = はん (half).",linksTo:"N5L2v9"},
    {id:"N5L2q9",dim:"vocab",type:"recall",difficulty:"medium",s:"三時___に会いましょう。(around 3)",a:"ごろ",o:["ごろ","まで","から","に"],c:0,exp:"ごろ = around (approximate time).",linksTo:"N5L2v27"},
    {id:"N5L2q10",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'morning'?",a:"朝",o:["今","朝","夜","時"],c:1,exp:"朝 = morning.",linksTo:"N5L2k6"},
    {id:"N5L2q11",dim:"vocab",type:"recall",difficulty:"medium",s:"去年日本___行きました。",a:"へ",o:["へ","で","を","に"],c:0,exp:"へ marks destination.",linksTo:"N5L2v23"},
    {id:"N5L2q12",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'night'?",a:"夜",o:["朝","今","夜","半"],c:2,exp:"夜 = night.",linksTo:"N5L2k7"}
  ]
},
{
  lessonNum:3,topic:"日常の活動",topicEn:"Daily Activities",module:'N5L3',moduleLabel:'N5 L3 — Daily Activities',lesson:'N5L3',lessonLabel:'Daily Activities',difficulty:"easy",level:"N5",
  vocabulary:[
    {id:"N5L3v1",word:"行きます",reading:"いきます",pitch:3,meaning:"to go",example:"学校へ行きます。",exampleMeaning:"I go to school."},
    {id:"N5L3v2",word:"来ます",reading:"きます",pitch:0,meaning:"to come",example:"友達が家に来ます。",exampleMeaning:"A friend comes to my house."},
    {id:"N5L3v3",word:"帰ります",reading:"かえります",pitch:3,meaning:"to return; go home",example:"六時に帰ります。",exampleMeaning:"I go home at 6."},
    {id:"N5L3v4",word:"食べます",reading:"たべます",pitch:2,meaning:"to eat",example:"朝ご飯を食べます。",exampleMeaning:"I eat breakfast."},
    {id:"N5L3v5",word:"飲みます",reading:"のみます",pitch:2,meaning:"to drink",example:"コーヒーを飲みます。",exampleMeaning:"I drink coffee."},
    {id:"N5L3v6",word:"見ます",reading:"みます",pitch:2,meaning:"to see; watch",example:"テレビを見ます。",exampleMeaning:"I watch TV."},
    {id:"N5L3v7",word:"聞きます",reading:"ききます",pitch:3,meaning:"to listen; ask",example:"音楽を聞きます。",exampleMeaning:"I listen to music."},
    {id:"N5L3v8",word:"読みます",reading:"よみます",pitch:2,meaning:"to read",example:"本を読みます。",exampleMeaning:"I read a book."},
    {id:"N5L3v9",word:"書きます",reading:"かきます",pitch:2,meaning:"to write",example:"手紙を書きます。",exampleMeaning:"I write a letter."},
    {id:"N5L3v10",word:"買います",reading:"かいます",pitch:2,meaning:"to buy",example:"パンを買います。",exampleMeaning:"I buy bread."},
    {id:"N5L3v11",word:"します",reading:"します",pitch:2,meaning:"to do",example:"宿題をします。",exampleMeaning:"I do homework."},
    {id:"N5L3v12",word:"勉強します",reading:"べんきょうします",pitch:0,meaning:"to study",example:"日本語を勉強します。",exampleMeaning:"I study Japanese."},
    {id:"N5L3v13",word:"働きます",reading:"はたらきます",pitch:4,meaning:"to work",example:"会社で働きます。",exampleMeaning:"I work at a company."},
    {id:"N5L3v14",word:"寝ます",reading:"ねます",pitch:2,meaning:"to sleep; go to bed",example:"十時に寝ます。",exampleMeaning:"I go to bed at 10."},
    {id:"N5L3v15",word:"起きます",reading:"おきます",pitch:2,meaning:"to get up",example:"六時に起きます。",exampleMeaning:"I get up at 6."},
    {id:"N5L3v16",word:"学校",reading:"がっこう",pitch:0,meaning:"school",example:"学校へ行きます。",exampleMeaning:"I go to school."},
    {id:"N5L3v17",word:"会社",reading:"かいしゃ",pitch:0,meaning:"company",example:"会社で働きます。",exampleMeaning:"I work at a company."},
    {id:"N5L3v18",word:"家",reading:"いえ／うち",pitch:2,meaning:"house; home",example:"家に帰ります。",exampleMeaning:"I go home."},
    {id:"N5L3v19",word:"店",reading:"みせ",pitch:2,meaning:"shop; store",example:"あの店で買います。",exampleMeaning:"I buy at that shop."},
    {id:"N5L3v20",word:"病院",reading:"びょういん",pitch:0,meaning:"hospital",example:"病院へ行きます。",exampleMeaning:"I go to the hospital."},
    {id:"N5L3v21",word:"銀行",reading:"ぎんこう",pitch:0,meaning:"bank",example:"銀行でお金を出します。",exampleMeaning:"I withdraw money at the bank."},
    {id:"N5L3v22",word:"駅",reading:"えき",pitch:1,meaning:"station",example:"駅前で会いましょう。",exampleMeaning:"Let's meet at the station."},
    {id:"N5L3v23",word:"本",reading:"ほん",pitch:1,meaning:"book",example:"本を読みます。",exampleMeaning:"I read a book."},
    {id:"N5L3v24",word:"テレビ",reading:"テレビ",pitch:1,meaning:"TV",example:"テレビを見ます。",exampleMeaning:"I watch TV."},
    {id:"N5L3v25",word:"音楽",reading:"おんがく",pitch:1,meaning:"music",example:"音楽を聞きます。",exampleMeaning:"I listen to music."},
    {id:"N5L3v26",word:"映画",reading:"えいが",pitch:1,meaning:"movie",example:"映画を見ます。",exampleMeaning:"I watch a movie."},
    {id:"N5L3v27",word:"ご飯",reading:"ごはん",pitch:1,meaning:"rice; meal",example:"ご飯を食べます。",exampleMeaning:"I eat a meal."},
    {id:"N5L3v28",word:"お茶",reading:"おちゃ",pitch:1,meaning:"tea",example:"お茶を飲みます。",exampleMeaning:"I drink tea."},
    {id:"N5L3v29",word:"水",reading:"みず",pitch:0,meaning:"water",example:"水を飲みます。",exampleMeaning:"I drink water."},
    {id:"N5L3v30",word:"パン",reading:"パン",pitch:1,meaning:"bread",example:"パンを食べます。",exampleMeaning:"I eat bread."}
  ],
  grammar:[
    {id:"N5L3g1",point:"〜へ / 〜で / 〜を (place & object particles)",explanation:"へ = destination. で = location of action. を = direct object.",examples:["学校へ行きます。 (Go to school.)","図書館で本を読みます。 (Read a book at the library.)","コーヒーを飲みます。 (Drink coffee.)"],listening:"へ = destination, で = place of action, を = direct object.",production:"Say where you go, where you study, what you eat."},
    {id:"N5L3g2",point:"〜ます / 〜ません / 〜ました (verb forms)",explanation:"Present: 食べます. Negative: 食べません. Past: 食べました. Past neg: 食べませんでした.",examples:["毎朝パンを食べます。 (I eat bread every morning.)","昨日映画を見ませんでした。 (I didn't watch a movie yesterday.)"],listening:"ません = negative, ました = past.",production:"Say what you did yesterday and what you usually do."}
  ],
  kanji:[
    {id:"N5L3k1",char:"行",reading:"こう／い（く）",meaning:"go",exampleWord:"行きます（いきます）"},
    {id:"N5L3k2",char:"来",reading:"らい／く（る）",meaning:"come",exampleWord:"来ます（きます）"},
    {id:"N5L3k3",char:"帰",reading:"き／かえ（る）",meaning:"return",exampleWord:"帰ります（かえります）"},
    {id:"N5L3k4",char:"食",reading:"しょく／た（べる）",meaning:"eat; food",exampleWord:"食べます（たべます）"},
    {id:"N5L3k5",char:"飲",reading:"いん／の（む）",meaning:"drink",exampleWord:"飲みます（のみます）"},
    {id:"N5L3k6",char:"見",reading:"けん／み（る）",meaning:"see; look",exampleWord:"見ます（みます）"},
    {id:"N5L3k7",char:"読",reading:"どく／よ（む）",meaning:"read",exampleWord:"読みます（よみます）"},
    {id:"N5L3k8",char:"書",reading:"しょ／か（く）",meaning:"write",exampleWord:"書きます（かきます）"}
  ],
  reading:{id:"N5L3r1",title:"休みの一日",passage:"日曜日は休みです。朝十時に起きました。お茶を飲んで、パンを食べました。十一時に駅へ行きました。友達と映画を見ました。一時にレストランで昼ご飯を食べました。午後は本を読みました。夜はテレビを見ました。",targetWords:[{word:"起きました",id:"N5L3v15"},{word:"見ました",id:"N5L3v6"}],questions:[
    {id:"rqN5L3-1",q:"何時に起きましたか。",o:["八時","九時","十時","十一時"],c:2,exp:"十時に起きました。"},
    {id:"rqN5L3-2",q:"何をしましたか。",o:["働いた","映画を見た","勉強した","買い物した"],c:1,exp:"映画を見ました。"},
    {id:"rqN5L3-3",q:"午後は何をしましたか。",o:["テレビを見た","本を読んだ","寝た","買い物した"],c:1,exp:"本を読みました。"}
  ]},
  listening:[
    {id:"N5L3l1",audioText:"A：日曜日は何をしましたか。B：朝は本を読みました。午後は買い物に行きました。",a:"午後は何をしましたか。",o:["本を読んだ","買い物に行った","家にいた","映画を見た"],c:1,exp:"買い物に行きました。"},
    {id:"N5L3l2",audioText:"A：毎朝何を食べますか。B：パンと卵を食べます。コーヒーを飲みます。",a:"何を飲みますか。",o:["お茶","水","コーヒー","ジュース"],c:2,exp:"コーヒーを飲みます。"}
  ],
  questions:[
    {id:"N5L3q1",dim:"grammar",type:"recall",difficulty:"easy",s:"学校___行きます。",a:"へ",o:["へ","で","を","に"],c:0,exp:"へ marks destination.",linksTo:"N5L3g1"},
    {id:"N5L3q2",dim:"grammar",type:"recall",difficulty:"easy",s:"図書館___本を読みます。",a:"で",o:["で","へ","を","が"],c:0,exp:"で marks place of action.",linksTo:"N5L3g1"},
    {id:"N5L3q3",dim:"grammar",type:"recall",difficulty:"easy",s:"昨日、映画を見___。(past negative)",a:"ませんでした",o:["ました","ませんでした","ません","ます"],c:1,exp:"Past negative: 見ませんでした。",linksTo:"N5L3g2"},
    {id:"N5L3q4",dim:"vocab",type:"recognition",difficulty:"easy",s:"「食べます」の意味は？",a:"to eat",o:["to drink","to eat","to buy","to read"],c:1,exp:"食べます = to eat.",linksTo:"N5L3v4"},
    {id:"N5L3q5",dim:"vocab",type:"recognition",difficulty:"easy",s:"「学校」の読み方は？",a:"がっこう",o:["がっこう","かいしゃ","びょういん","ぎんこう"],c:0,exp:"学校 = がっこう.",linksTo:"N5L3v16"},
    {id:"N5L3q6",dim:"kanji",type:"recognition",difficulty:"easy",s:"「行」の漢字の意味は？",a:"go",o:["come","go","return","eat"],c:1,exp:"行 = go.",linksTo:"N5L3k1"},
    {id:"N5L3q7",dim:"grammar",type:"recall",difficulty:"medium",s:"本___読みます。",a:"を",o:["を","で","へ","に"],c:0,exp:"を marks direct object.",linksTo:"N5L3g1"},
    {id:"N5L3q8",dim:"vocab",type:"recognition",difficulty:"easy",s:"「飲みます」の意味は？",a:"to drink",o:["to eat","to drink","to see","to write"],c:1,exp:"飲みます = to drink.",linksTo:"N5L3v5"},
    {id:"N5L3q9",dim:"vocab",type:"recall",difficulty:"medium",s:"テレビを___。(watch)",a:"見ます",o:["見ます","読みます","聞きます","書きます"],c:0,exp:"テレビを見ます = watch TV.",linksTo:"N5L3v6"},
    {id:"N5L3q10",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'write'?",a:"書",o:["見","読","書","食"],c:2,exp:"書 → 書きます (to write).",linksTo:"N5L3k8"},
    {id:"N5L3q11",dim:"vocab",type:"recall",difficulty:"medium",s:"音楽を___。(listen)",a:"聞きます",o:["聞きます","見ます","読みます","書きます"],c:0,exp:"音楽を聞きます = listen to music.",linksTo:"N5L3v7"},
    {id:"N5L3q12",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'eat / food'?",a:"食",o:["行","食","見","書"],c:1,exp:"食 → 食べます (to eat).",linksTo:"N5L3k4"}
  ]
},
{
  lessonNum:4,topic:"家族と指示詞",topicEn:"Family & Demonstratives",module:'N5L4',moduleLabel:'N5 L4 — Family & Demonstratives',lesson:'N5L4',lessonLabel:'Family & Demonstratives',difficulty:"easy",level:"N5",
  vocabulary:[
    {id:"N5L4v1",word:"家族",reading:"かぞく",pitch:1,meaning:"family",example:"家族は五人です。",exampleMeaning:"My family has 5 people."},
    {id:"N5L4v2",word:"父",reading:"ちち",pitch:2,meaning:"father (own)",example:"父は会社員です。",exampleMeaning:"My father is a company employee."},
    {id:"N5L4v3",word:"母",reading:"はは",pitch:1,meaning:"mother (own)",example:"母は先生です。",exampleMeaning:"My mother is a teacher."},
    {id:"N5L4v4",word:"兄",reading:"あに",pitch:1,meaning:"older brother (own)",example:"兄は大学生です。",exampleMeaning:"My older brother is a university student."},
    {id:"N5L4v5",word:"姉",reading:"あね",pitch:1,meaning:"older sister (own)",example:"姉は東京に住んでいます。",exampleMeaning:"My older sister lives in Tokyo."},
    {id:"N5L4v6",word:"弟",reading:"おとうと",pitch:4,meaning:"younger brother",example:"弟は高校生です。",exampleMeaning:"My younger brother is a high school student."},
    {id:"N5L4v7",word:"妹",reading:"いもうと",pitch:4,meaning:"younger sister",example:"妹は十五歳です。",exampleMeaning:"My younger sister is 15."},
    {id:"N5L4v8",word:"祖父",reading:"そふ",pitch:1,meaning:"grandfather",example:"祖父は七十八歳です。",exampleMeaning:"My grandfather is 78."},
    {id:"N5L4v9",word:"祖母",reading:"そぼ",pitch:1,meaning:"grandmother",example:"祖母は元気です。",exampleMeaning:"My grandmother is healthy."},
    {id:"N5L4v10",word:"これ",reading:"これ",pitch:0,meaning:"this (near speaker)",example:"これは何ですか。",exampleMeaning:"What is this?"},
    {id:"N5L4v11",word:"それ",reading:"それ",pitch:0,meaning:"that (near listener)",example:"それは私の本です。",exampleMeaning:"That is my book."},
    {id:"N5L4v12",word:"あれ",reading:"あれ",pitch:0,meaning:"that over there",example:"あれは山です。",exampleMeaning:"That over there is a mountain."},
    {id:"N5L4v13",word:"どれ",reading:"どれ",pitch:0,meaning:"which one",example:"あなたの傘はどれですか。",exampleMeaning:"Which one is your umbrella?"},
    {id:"N5L4v14",word:"この",reading:"この",pitch:1,meaning:"this (near speaker)",example:"この人は父です。",exampleMeaning:"This person is my father."},
    {id:"N5L4v15",word:"その",reading:"その",pitch:1,meaning:"that (near listener)",example:"その本は面白いです。",exampleMeaning:"That book is interesting."},
    {id:"N5L4v16",word:"あの",reading:"あの",pitch:1,meaning:"that over there",example:"あの建物は病院です。",exampleMeaning:"That building over there is a hospital."},
    {id:"N5L4v17",word:"どの",reading:"どの",pitch:1,meaning:"which (of items)",example:"どのかばんですか。",exampleMeaning:"Which bag is it?"},
    {id:"N5L4v18",word:"ここ",reading:"ここ",pitch:0,meaning:"here",example:"ここに座ってください。",exampleMeaning:"Please sit here."},
    {id:"N5L4v19",word:"そこ",reading:"そこ",pitch:0,meaning:"there (near listener)",example:"そこに本があります。",exampleMeaning:"There is a book there."},
    {id:"N5L4v20",word:"あそこ",reading:"あそこ",pitch:3,meaning:"over there",example:"あそこに学校があります。",exampleMeaning:"Over there is a school."},
    {id:"N5L4v21",word:"どこ",reading:"どこ",pitch:0,meaning:"where",example:"トイレはどこですか。",exampleMeaning:"Where is the toilet?"},
    {id:"N5L4v22",word:"だれ",reading:"だれ",pitch:1,meaning:"who",example:"あの人はだれですか。",exampleMeaning:"Who is that person?"},
    {id:"N5L4v23",word:"何",reading:"なに／なん",pitch:0,meaning:"what",example:"これは何ですか。",exampleMeaning:"What is this?"},
    {id:"N5L4v24",word:"どれ",reading:"どれ",pitch:0,meaning:"which one",example:"あなたのかばんはどれですか。",exampleMeaning:"Which one is your bag?"},
    {id:"N5L4v25",word:"犬",reading:"いぬ",pitch:2,meaning:"dog",example:"犬が好きです。",exampleMeaning:"I like dogs."},
    {id:"N5L4v26",word:"猫",reading:"ねこ",pitch:0,meaning:"cat",example:"猫がいます。",exampleMeaning:"There is a cat."},
    {id:"N5L4v27",word:"車",reading:"くるま",pitch:0,meaning:"car",example:"車を運転します。",exampleMeaning:"I drive a car."},
    {id:"N5L4v28",word:"傘",reading:"かさ",pitch:0,meaning:"umbrella",example:"傘を忘れました。",exampleMeaning:"I forgot my umbrella."},
    {id:"N5L4v29",word:"鍵",reading:"かぎ",pitch:2,meaning:"key",example:"鍵をなくしました。",exampleMeaning:"I lost my key."},
    {id:"N5L4v30",word:"時計",reading:"とけい",pitch:0,meaning:"clock; watch",example:"この時計は高いです。",exampleMeaning:"This watch is expensive."}
  ],
  grammar:[
    {id:"N5L4g1",point:"これ / それ / あれ (this / that / that over there)",explanation:"これ = thing near speaker. それ = thing near listener. あれ = thing far from both. どれ = which one.",examples:["これは本です。 (This is a book.)","それはペンですか。 (Is that a pen?)","あれは学校です。 (That over there is a school.)"],listening:"これ = near me, それ = near you, あれ = far from both.",production:"Point at things and say what they are using これ/それ/あれ."},
    {id:"N5L4g2",point:"この / その / あの + noun (this/that + noun)",explanation:"この + noun = this [noun]. その + noun = that [noun]. あの + noun = that [noun] over there. Must be followed by a noun.",examples:["この本は面白いです。 (This book is interesting.)","その人は先生です。 (That person is a teacher.)","あの犬は大きいです。 (That dog over there is big.)"],listening:"の connects the demonstrative to a noun.",production:"Describe objects using この/その/あの + noun."}
  ],
  kanji:[
    {id:"N5L4k1",char:"父",reading:"ふ／ちち",meaning:"father",exampleWord:"父（ちち）"},
    {id:"N5L4k2",char:"母",reading:"ぼ／はは",meaning:"mother",exampleWord:"母（はは）"},
    {id:"N5L4k3",char:"兄",reading:"きょう／あに",meaning:"older brother",exampleWord:"兄（あに）"},
    {id:"N5L4k4",char:"姉",reading:"し／あね",meaning:"older sister",exampleWord:"姉（あね）"},
    {id:"N5L4k5",char:"犬",reading:"けん／いぬ",meaning:"dog",exampleWord:"犬（いぬ）"},
    {id:"N5L4k6",char:"猫",reading:"びょう／ねこ",meaning:"cat",exampleWord:"猫（ねこ）"},
    {id:"N5L4k7",char:"車",reading:"しゃ／くるま",meaning:"car",exampleWord:"車（くるま）"},
    {id:"N5L4k8",char:"何",reading:"なに／なん",meaning:"what",exampleWord:"何（なに）"}
  ],
  reading:{id:"N5L4r1",title:"私の家族",passage:"私の家族は四人です。父は会社員です。毎日電車で通勤します。母は小学校の先生です。兄は東京の大学に通っています。私は末っ子です。毎日家族で晩ご飯を一緒に食べます。日曜日は皆で公園に行きます。犬も一緒です。犬の名前はポチです。",targetWords:[{word:"家族",id:"N5L4v1"},{word:"父",id:"N5L4v2"}],questions:[
    {id:"rqN5L4-1",q:"家族は何人ですか。",o:["三人","四人","五人","六人"],c:1,exp:"家族は四人です。"},
    {id:"rqN5L4-2",q:"父の仕事は何ですか。",o:["先生","会社員","医者","学生"],c:1,exp:"父は会社員です。"},
    {id:"rqN5L4-3",q:"日曜日は何をしますか。",o:["家にいる","公園に行く","買い物する","映画を見る"],c:1,exp:"日曜日は皆で公園に行きます。"}
  ]},
  listening:[
    {id:"N5L4l1",audioText:"A：これは何ですか。B：それは日本語の辞書です。",a:"それは何ですか。",o:["日本語の本","日本語の辞書","英語の辞書","雑誌"],c:1,exp:"日本語の辞書です。"},
    {id:"N5L4l2",audioText:"A：あの人はだれですか。B：あの人は田中先生です。",a:"あの人はだれですか。",o:["田中さん","田中先生","山田先生","山田さん"],c:1,exp:"田中先生です。"}
  ],
  questions:[
    {id:"N5L4q1",dim:"grammar",type:"recall",difficulty:"easy",s:"___は私の本です。(this, near me)",a:"これ",o:["これ","それ","あれ","どれ"],c:0,exp:"これ = thing near speaker.",linksTo:"N5L4g1"},
    {id:"N5L4q2",dim:"grammar",type:"recall",difficulty:"easy",s:"___はあなたのかばんですか。(that, near you)",a:"それ",o:["これ","それ","あれ","どれ"],c:1,exp:"それ = thing near listener.",linksTo:"N5L4g1"},
    {id:"N5L4q3",dim:"grammar",type:"recall",difficulty:"easy",s:"___人は私の父です。(this, near me + noun)",a:"この",o:["この","その","あの","どの"],c:0,exp:"この + noun = this [noun].",linksTo:"N5L4g2"},
    {id:"N5L4q4",dim:"vocab",type:"recognition",difficulty:"easy",s:"「父」の読み方は？",a:"ちち",o:["ちち","はは","あに","あね"],c:0,exp:"父 = ちち (own father).",linksTo:"N5L4v2"},
    {id:"N5L4q5",dim:"vocab",type:"recognition",difficulty:"easy",s:"「妹」の意味は？",a:"younger sister",o:["older sister","younger sister","older brother","younger brother"],c:1,exp:"妹 = younger sister.",linksTo:"N5L4v7"},
    {id:"N5L4q6",dim:"kanji",type:"recognition",difficulty:"easy",s:"「犬」の漢字の意味は？",a:"dog",o:["cat","dog","car","key"],c:1,exp:"犬 = dog.",linksTo:"N5L4k5"},
    {id:"N5L4q7",dim:"grammar",type:"recall",difficulty:"medium",s:"あれは___ですか。(what is that over there?)",a:"何",o:["何","だれ","どこ","どれ"],c:0,exp:"何 = what.",linksTo:"N5L4g1"},
    {id:"N5L4q8",dim:"vocab",type:"recognition",difficulty:"easy",s:"「あそこ」の意味は？",a:"over there",o:["here","there","over there","where"],c:2,exp:"あそこ = over there.",linksTo:"N5L4v20"},
    {id:"N5L4q9",dim:"vocab",type:"recall",difficulty:"medium",s:"___はどこですか。(where is the toilet?)",a:"トイレ",o:["トイレ","これ","それ","あれ"],c:0,exp:"トイレはどこですか = Where is the toilet?",linksTo:"N5L4v21"},
    {id:"N5L4q10",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'mother'?",a:"母",o:["父","母","兄","姉"],c:1,exp:"母 = mother.",linksTo:"N5L4k2"},
    {id:"N5L4q11",dim:"vocab",type:"recall",difficulty:"medium",s:"私の___は五人です。(family)",a:"家族",o:["家族","会社","学校","仕事"],c:0,exp:"家族 = family.",linksTo:"N5L4v1"},
    {id:"N5L4q12",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'what'?",a:"何",o:["何","犬","猫","車"],c:0,exp:"何 = what.",linksTo:"N5L4k8"}
  ]
},
{
  lessonNum:5,topic:"形容詞",topicEn:"Adjectives",module:'N5L5',moduleLabel:'N5 L5 — Adjectives',lesson:'N5L5',lessonLabel:'Adjectives',difficulty:"easy",level:"N5",
  vocabulary:[
    {id:"N5L5v1",word:"大きい",reading:"おおきい",pitch:3,meaning:"big; large",example:"この部屋は大きいです。",exampleMeaning:"This room is big."},
    {id:"N5L5v2",word:"小さい",reading:"ちいさい",pitch:3,meaning:"small",example:"猫は小さいです。",exampleMeaning:"Cats are small."},
    {id:"N5L5v3",word:"高い",reading:"たかい",pitch:2,meaning:"expensive; tall; high",example:"この時計は高いです。",exampleMeaning:"This watch is expensive."},
    {id:"N5L5v4",word:"安い",reading:"やすい",pitch:2,meaning:"cheap",example:"このりんごは安いです。",exampleMeaning:"This apple is cheap."},
    {id:"N5L5v5",word:"いい",reading:"いい",pitch:1,meaning:"good",example:"天気はいいです。",exampleMeaning:"The weather is good."},
    {id:"N5L5v6",word:"悪い",reading:"わるい",pitch:2,meaning:"bad",example:"天気が悪いです。",exampleMeaning:"The weather is bad."},
    {id:"N5L5v7",word:"新しい",reading:"あたらしい",pitch:4,meaning:"new",example:"新しい車を買いました。",exampleMeaning:"I bought a new car."},
    {id:"N5L5v8",word:"古い",reading:"ふるい",pitch:2,meaning:"old (things)",example:"この本は古いです。",exampleMeaning:"This book is old."},
    {id:"N5L5v9",word:"暑い",reading:"あつい",pitch:2,meaning:"hot (weather)",example:"今日は暑いです。",exampleMeaning:"Today is hot."},
    {id:"N5L5v10",word:"寒い",reading:"さむい",pitch:2,meaning:"cold (weather)",example:"冬は寒いです。",exampleMeaning:"Winter is cold."},
    {id:"N5L5v11",word:"美味しい",reading:"おいしい",pitch:3,meaning:"delicious",example:"この寿司は美味しいです。",exampleMeaning:"This sushi is delicious."},
    {id:"N5L5v12",word:"難しい",reading:"むずかしい",pitch:4,meaning:"difficult",example:"日本語は難しいです。",exampleMeaning:"Japanese is difficult."},
    {id:"N5L5v13",word:"易しい",reading:"やさしい",pitch:3,meaning:"easy; simple",example:"この問題は易しいです。",exampleMeaning:"This question is easy."},
    {id:"N5L5v14",word:"面白い",reading:"おもしろい",pitch:4,meaning:"interesting; funny",example:"この映画は面白いです。",exampleMeaning:"This movie is interesting."},
    {id:"N5L5v15",word:"楽しい",reading:"たのしい",pitch:3,meaning:"fun; enjoyable",example:"旅行は楽しかったです。",exampleMeaning:"The trip was fun."},
    {id:"N5L5v16",word:"元気",reading:"げんき",pitch:1,meaning:"healthy; energetic",example:"元気ですか。",exampleMeaning:"Are you well?"},
    {id:"N5L5v17",word:"静か",reading:"しずか",pitch:1,meaning:"quiet",example:"図書館は静かです。",exampleMeaning:"The library is quiet."},
    {id:"N5L5v18",word:"にぎやか",reading:"にぎやか",pitch:3,meaning:"lively; bustling",example:"渋谷はにぎやかです。",exampleMeaning:"Shibuya is lively."},
    {id:"N5L5v19",word:"きれい",reading:"きれい",pitch:1,meaning:"beautiful; clean",example:"この公園はきれいです。",exampleMeaning:"This park is beautiful."},
    {id:"N5L5v20",word:"好き",reading:"すき",pitch:1,meaning:"liked; favorite",example:"猫が好きです。",exampleMeaning:"I like cats."},
    {id:"N5L5v21",word:"嫌い",reading:"きらい",pitch:1,meaning:"disliked",example:"野菜が嫌いです。",exampleMeaning:"I dislike vegetables."},
    {id:"N5L5v22",word:"便利",reading:"べんり",pitch:1,meaning:"convenient",example:"コンビニは便利です。",exampleMeaning:"Convenience stores are convenient."},
    {id:"N5L5v23",word:"大変",reading:"たいへん",pitch:0,meaning:"tough; difficult",example:"仕事が大変です。",exampleMeaning:"Work is tough."},
    {id:"N5L5v24",word:"有名",reading:"ゆうめい",pitch:0,meaning:"famous",example:"富士山は有名です。",exampleMeaning:"Mt. Fuji is famous."},
    {id:"N5L5v25",word:"部屋",reading:"へや",pitch:2,meaning:"room",example:"部屋はきれいです。",exampleMeaning:"The room is clean."},
    {id:"N5L5v26",word:"天気",reading:"てんき",pitch:1,meaning:"weather",example:"天気がいいです。",exampleMeaning:"The weather is good."},
    {id:"N5L5v27",word:"町",reading:"まち",pitch:0,meaning:"town; city",example:"この町は静かです。",exampleMeaning:"This town is quiet."},
    {id:"N5L5v28",word:"建物",reading:"たてもの",pitch:3,meaning:"building",example:"あの建物は高いです。",exampleMeaning:"That building is tall."},
    {id:"N5L5v29",word:"花",reading:"はな",pitch:1,meaning:"flower",example:"花がきれいです。",exampleMeaning:"The flowers are beautiful."},
    {id:"N5L5v30",word:"山",reading:"やま",pitch:1,meaning:"mountain",example:"山が好きです。",exampleMeaning:"I like mountains."}
  ],
  grammar:[
    {id:"N5L5g1",point:"い-adjectives (conjugation)",explanation:"Present: 高いです. Negative: 高くないです. Past: 高かったです. Past neg: 高くなかったです. いい is irregular: いい→よかったです.",examples:["このりんごは美味しいです。 (This apple is delicious.)","昨日は暑くなかったです。 (It wasn't hot yesterday.)","旅行は楽しかったです。 (The trip was fun.)"],listening:"い-adjectives end in い. Drop い and add くない for negative, かった for past.",production:"Describe things around you using 3 different い-adjectives."},
    {id:"N5L5g2",point:"な-adjectives (conjugation)",explanation:"Present: 静かです. Negative: 静かじゃないです. Past: 静かでした. Past neg: 静かじゃなかったです. The な drops before です.",examples:["この町は静かです。 (This town is quiet.)","昨日は元気じゃなかったです。 (I wasn't energetic yesterday.)","公園はきれいでした。 (The park was beautiful.)"],listening:"な-adjectives need な before a noun: 静かな町. Before です, drop な.",production:"Describe 3 things using な-adjectives."}
  ],
  kanji:[
    {id:"N5L5k1",char:"大",reading:"だい／おお（きい）",meaning:"big; large",exampleWord:"大きい（おおきい）"},
    {id:"N5L5k2",char:"小",reading:"しょう／ちい（さい）",meaning:"small",exampleWord:"小さい（ちいさい）"},
    {id:"N5L5k3",char:"高",reading:"こう／たか（い）",meaning:"high; expensive",exampleWord:"高い（たかい）"},
    {id:"N5L5k4",char:"新",reading:"しん／あたら（しい）",meaning:"new",exampleWord:"新しい（あたらしい）"},
    {id:"N5L5k5",char:"古",reading:"こ／ふる（い）",meaning:"old",exampleWord:"古い（ふるい）"},
    {id:"N5L5k6",char:"花",reading:"か／はな",meaning:"flower",exampleWord:"花（はな）"},
    {id:"N5L5k7",char:"山",reading:"さん／やま",meaning:"mountain",exampleWord:"山（やま）"},
    {id:"N5L5k8",char:"天",reading:"てん",meaning:"sky; heaven",exampleWord:"天気（てんき）"}
  ],
  reading:{id:"N5L5r1",title:"日本の町",passage:"日本の町はとても便利です。駅の近くはにぎやかで、店がたくさんあります。でも、少し離れると静かになります。私の町は小さいですが、きれいな公園があります。春には花がたくさん咲きます。とても美しいです。近くに古いお寺もあります。お寺は静かで、とても好きです。",targetWords:[{word:"静か",id:"N5L5v17"},{word:"きれい",id:"N5L5v19"}],questions:[
    {id:"rqN5L5-1",q:"駅の近くはどうですか。",o:["静か","にぎやか","古い","悪い"],c:1,exp:"駅の近くはにぎやかです。"},
    {id:"rqN5L5-2",q:"春には何が咲きますか。",o:["木","花","桜","草"],c:1,exp:"花がたくさん咲きます。"},
    {id:"rqN5L5-3",q:"お寺はどうですか。",o:["大きい","新しい","静か","にぎやか"],c:2,exp:"お寺は静かです。"}
  ]},
  listening:[
    {id:"N5L5l1",audioText:"A：この部屋は大きいですか。B：いいえ、少し小さいです。",a:"部屋はどうですか。",o:["大きい","小さい","新しい","古い"],c:1,exp:"少し小さいです。"},
    {id:"N5L5l2",audioText:"A：昨日の天気はどうでしたか。B：とても暑かったです。",a:"昨日の天気はどうでしたか。",o:["寒かった","涼しかった","暑かった","いい天気だった"],c:2,exp:"とても暑かったです。"}
  ],
  questions:[
    {id:"N5L5q1",dim:"grammar",type:"recall",difficulty:"easy",s:"このりんごは___です。(delicious)",a:"美味しい",o:["美味しい","美味しかった","美味しくない","美味しな"],c:0,exp:"美味しいです = present positive.",linksTo:"N5L5g1"},
    {id:"N5L5q2",dim:"grammar",type:"recall",difficulty:"medium",s:"昨日は暑___。(past negative)",a:"くなかったです",o:["かったです","くなかったです","くないです","でした"],c:1,exp:"Past neg of い-adj: 暑くなかったです。",linksTo:"N5L5g1"},
    {id:"N5L5q3",dim:"grammar",type:"recall",difficulty:"easy",s:"この町は静か___。(present)",a:"です",o:["です","なです","いです","だったです"],c:0,exp:"な-adj + です (drop な).",linksTo:"N5L5g2"},
    {id:"N5L5q4",dim:"vocab",type:"recognition",difficulty:"easy",s:"「高い」の意味は？",a:"expensive; tall; high",o:["cheap","expensive; tall; high","small","old"],c:1,exp:"高い = expensive/tall/high.",linksTo:"N5L5v3"},
    {id:"N5L5q5",dim:"vocab",type:"recognition",difficulty:"easy",s:"「元気」の読み方は？",a:"げんき",o:["げんき","しずか","べんり","ゆうめい"],c:0,exp:"元気 = げんき.",linksTo:"N5L5v16"},
    {id:"N5L5q6",dim:"kanji",type:"recognition",difficulty:"easy",s:"「大」の漢字の意味は？",a:"big; large",o:["small","big; large","high","new"],c:1,exp:"大 = big.",linksTo:"N5L5k1"},
    {id:"N5L5q7",dim:"grammar",type:"recall",difficulty:"medium",s:"旅行は楽___。(past positive)",a:"しかったです",o:["しいです","しかったです","しくないです","しかった"],c:1,exp:"Past of い-adj: 楽しかったです。",linksTo:"N5L5g1"},
    {id:"N5L5q8",dim:"vocab",type:"recognition",difficulty:"easy",s:"「便利」の意味は？",a:"convenient",o:["beautiful","convenient","quiet","famous"],c:1,exp:"便利 = convenient.",linksTo:"N5L5v22"},
    {id:"N5L5q9",dim:"vocab",type:"recall",difficulty:"medium",s:"この映画は___です。(interesting)",a:"面白い",o:["面白い","新しい","古い","悪い"],c:0,exp:"面白い = interesting.",linksTo:"N5L5v14"},
    {id:"N5L5q10",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'flower'?",a:"花",o:["山","花","天","古"],c:1,exp:"花 = flower.",linksTo:"N5L5k6"},
    {id:"N5L5q11",dim:"vocab",type:"recall",difficulty:"medium",s:"冬は___です。(cold)",a:"寒い",o:["寒い","暑い","涼しい","暖かい"],c:0,exp:"寒い = cold (weather).",linksTo:"N5L5v10"},
    {id:"N5L5q12",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'new'?",a:"新",o:["古","大","新","高"],c:2,exp:"新 = new.",linksTo:"N5L5k4"}
  ]
},
{
  lessonNum:6,topic:"好き・欲しい・たい",topicEn:"Likes, Wants & Desires",module:'N5L6',moduleLabel:'N5 L6 — Likes, Wants & Desires',lesson:'N5L6',lessonLabel:'Likes, Wants & Desires',difficulty:"easy",level:"N5",
  vocabulary:[
    {id:"N5L6v1",word:"好き",reading:"すき",pitch:1,meaning:"liked; favorite",example:"音楽が好きです。",exampleMeaning:"I like music."},
    {id:"N5L6v2",word:"嫌い",reading:"きらい",pitch:1,meaning:"disliked",example:"納豆が嫌いです。",exampleMeaning:"I dislike natto."},
    {id:"N5L6v3",word:"上手",reading:"じょうず",pitch:1,meaning:"good at; skilled",example:"料理が上手です。",exampleMeaning:"Good at cooking."},
    {id:"N5L6v4",word:"下手",reading:"へた",pitch:2,meaning:"bad at; poor",example:"絵が下手です。",exampleMeaning:"Bad at drawing."},
    {id:"N5L6v5",word:"欲しい",reading:"ほしい",pitch:2,meaning:"want (thing)",example:"新しいスマホが欲しいです。",exampleMeaning:"I want a new smartphone."},
    {id:"N5L6v6",word:"料理",reading:"りょうり",pitch:1,meaning:"cooking; cuisine",example:"日本料理が好きです。",exampleMeaning:"I like Japanese cuisine."},
    {id:"N5L6v7",word:"音楽",reading:"おんがく",pitch:1,meaning:"music",example:"音楽を聞きます。",exampleMeaning:"I listen to music."},
    {id:"N5L6v8",word:"映画",reading:"えいが",pitch:1,meaning:"movie",example:"映画が好きです。",exampleMeaning:"I like movies."},
    {id:"N5L6v9",word:"スポーツ",reading:"スポーツ",pitch:1,meaning:"sports",example:"スポーツが好きです。",exampleMeaning:"I like sports."},
    {id:"N5L6v10",word:"動物",reading:"どうぶつ",pitch:1,meaning:"animal",example:"動物が好きです。",exampleMeaning:"I like animals."},
    {id:"N5L6v11",word:"甘い",reading:"あまい",pitch:2,meaning:"sweet",example:"このケーキは甘いです。",exampleMeaning:"This cake is sweet."},
    {id:"N5L6v12",word:"辛い",reading:"からい",pitch:2,meaning:"spicy",example:"カレーは辛いです。",exampleMeaning:"Curry is spicy."},
    {id:"N5L6v13",word:"飲み物",reading:"のみもの",pitch:3,meaning:"drink; beverage",example:"冷たい飲み物が欲しいです。",exampleMeaning:"I want a cold drink."},
    {id:"N5L6v14",word:"食べ物",reading:"たべもの",pitch:3,meaning:"food",example:"好きな食べ物は何ですか。",exampleMeaning:"What's your favorite food?"},
    {id:"N5L6v15",word:"旅行",reading:"りょこう",pitch:1,meaning:"travel; trip",example:"旅行に行きたいです。",exampleMeaning:"I want to go on a trip."},
    {id:"N5L6v16",word:"買い物",reading:"かいもの",pitch:1,meaning:"shopping",example:"買い物に行きます。",exampleMeaning:"I go shopping."},
    {id:"N5L6v17",word:"何",reading:"なに",pitch:0,meaning:"what",example:"何が欲しいですか。",exampleMeaning:"What do you want?"},
    {id:"N5L6v18",word:"一番",reading:"いちばん",pitch:1,meaning:"best; most; #1",example:"一番好きな季節は秋です。",exampleMeaning:"My favorite season is autumn."},
    {id:"N5L6v19",word:"本当",reading:"ほんとう",pitch:0,meaning:"true; really",example:"本当ですか。",exampleMeaning:"Really?"},
    {id:"N5L6v20",word:"〜が",reading:"〜が",pitch:0,meaning:"subject marker (for likes)",example:"猫が好きです。",exampleMeaning:"I like cats."},
    {id:"N5L6v21",word:"〜たい",reading:"〜たい",pitch:0,meaning:"want to (verb)",example:"行きたいです。",exampleMeaning:"I want to go."},
    {id:"N5L6v22",word:"〜たくない",reading:"〜たくない",pitch:0,meaning:"don't want to (verb)",example:"行きたくないです。",exampleMeaning:"I don't want to go."},
    {id:"N5L6v23",word:"ケーキ",reading:"ケーキ",pitch:1,meaning:"cake",example:"ケーキが好きです。",exampleMeaning:"I like cake."},
    {id:"N5L6v24",word:"犬",reading:"いぬ",pitch:2,meaning:"dog",example:"犬が欲しいです。",exampleMeaning:"I want a dog."},
    {id:"N5L6v25",word:"猫",reading:"ねこ",pitch:0,meaning:"cat",example:"猫が好きです。",exampleMeaning:"I like cats."},
    {id:"N5L6v26",word:"納豆",reading:"なっとう",pitch:3,meaning:"natto (fermented soybeans)",example:"納豆が嫌いです。",exampleMeaning:"I dislike natto."},
    {id:"N5L6v27",word:"寿司",reading:"すし",pitch:1,meaning:"sushi",example:"寿司が一番好きです。",exampleMeaning:"Sushi is my favorite."},
    {id:"N5L6v28",word:"ラーメン",reading:"ラーメン",pitch:3,meaning:"ramen",example:"ラーメンを食べたいです。",exampleMeaning:"I want to eat ramen."},
    {id:"N5L6v29",word:"スマホ",reading:"スマホ",pitch:0,meaning:"smartphone",example:"スマホが欲しいです。",exampleMeaning:"I want a smartphone."},
    {id:"N5L6v30",word:"車",reading:"くるま",pitch:0,meaning:"car",example:"車を買いたいです。",exampleMeaning:"I want to buy a car."}
  ],
  grammar:[
    {id:"N5L6g1",point:"〜が好きです / 〜が嫌いです (likes & dislikes)",explanation:"Use が (not を) with 好き/嫌い. Noun が好きです = I like [noun]. が marks the object of preference.",examples:["猫が好きです。 (I like cats.)","野菜が嫌いです。 (I dislike vegetables.)","一番好きな食べ物は何ですか。 (What's your favorite food?)"],listening:"が marks what you like/dislike, not を.",production:"Say 3 things you like and 1 thing you dislike."},
    {id:"N5L6g2",point:"〜たいです / 〜たくないです (want to / don't want to)",explanation:"Verb stem + たいです = want to do. 〜たくないです = don't want to do. 〜たかったです = wanted to (past).",examples:["日本へ行きたいです。 (I want to go to Japan.)","今日は勉強したくないです。 (I don't want to study today.)","昨日、寿司を食べたかったです。 (I wanted to eat sushi yesterday.)"],listening:"たい attaches to the verb stem. Conjugates like い-adj.",production:"Say 3 things you want to do this weekend."}
  ],
  kanji:[
    {id:"N5L6k1",char:"好",reading:"こう／す（き）",meaning:"like; good",exampleWord:"好き（すき）"},
    {id:"N5L6k2",char:"嫌",reading:"けん／きら（い）",meaning:"dislike",exampleWord:"嫌い（きらい）"},
    {id:"N5L6k3",char:"欲",reading:"よく／ほ（しい）",meaning:"want; desire",exampleWord:"欲しい（ほしい）"},
    {id:"N5L6k4",char:"物",reading:"ぶつ／もの",meaning:"thing; object",exampleWord:"食べ物（たべもの）"},
    {id:"N5L6k5",char:"旅",reading:"りょ／たび",meaning:"travel",exampleWord:"旅行（りょこう）"},
    {id:"N5L6k6",char:"音",reading:"おん／ね／おと",meaning:"sound; music",exampleWord:"音楽（おんがく）"},
    {id:"N5L6k7",char:"楽",reading:"らく／たの（しい）",meaning:"fun; easy",exampleWord:"楽しい（たのしい）"},
    {id:"N5L6k8",char:"一",reading:"いち／ひと（つ）",meaning:"one; first",exampleWord:"一番（いちばん）"}
  ],
  reading:{id:"N5L6r1",title:"好きなもの",passage:"私の一番好きな食べ物は寿司です。特にマグロの寿司が好きです。でも、納豆は嫌いです。匂いが苦手です。趣味は音楽を聞くことです。J-POPが一番好きです。将来、日本へ行きたいです。東京でラーメンを食べたいです。新しいスマホも欲しいです。でも、高いから、まだ買えません。",targetWords:[{word:"好き",id:"N5L6v1"},{word:"欲しい",id:"N5L6v5"}],questions:[
    {id:"rqN5L6-1",q:"一番好きな食べ物は何ですか。",o:["ラーメン","寿司","納豆","ケーキ"],c:1,exp:"一番好きな食べ物は寿司です。"},
    {id:"rqN5L6-2",q:"何が嫌いですか。",o:["寿司","納豆","ラーメン","音楽"],c:1,exp:"納豆は嫌いです。"},
    {id:"rqN5L6-3",q:"何が欲しいですか。",o:["新しいスマホ","新しい車","ラーメン","ケーキ"],c:0,exp:"新しいスマホが欲しいです。"}
  ]},
  listening:[
    {id:"N5L6l1",audioText:"A：休みに何をしたいですか。B：映画を見たいです。そして、買い物に行きたいです。",a:"休みに何をしたいですか。",o:["勉強したい","映画を見たい、買い物に行きたい","寝たい","料理したい"],c:1,exp:"映画を見たいです。そして、買い物に行きたいです。"},
    {id:"N5L6l2",audioText:"A：何が欲しいですか。B：新しい自転車が欲しいです。",a:"何が欲しいですか。",o:["新しいスマホ","新しい自転車","新しい車","新しいかばん"],c:1,exp:"新しい自転車が欲しいです。"}
  ],
  questions:[
    {id:"N5L6q1",dim:"grammar",type:"recall",difficulty:"easy",s:"猫___好きです。",a:"が",o:["が","を","に","で"],c:0,exp:"が marks the object of 好き.",linksTo:"N5L6g1"},
    {id:"N5L6q2",dim:"grammar",type:"recall",difficulty:"easy",s:"日本___行きたいです。",a:"へ",o:["へ","が","を","で"],c:0,exp:"へ marks destination. 行きたい = want to go.",linksTo:"N5L6g2"},
    {id:"N5L6q3",dim:"grammar",type:"recall",difficulty:"medium",s:"今日は勉強した___。(don't want to)",a:"くないです",o:["たいです","たくないです","たかったです","たくありません"],c:1,exp:"たくないです = don't want to.",linksTo:"N5L6g2"},
    {id:"N5L6q4",dim:"vocab",type:"recognition",difficulty:"easy",s:"「上手」の意味は？",a:"good at; skilled",o:["bad at","good at; skilled","like","dislike"],c:1,exp:"上手 = good at.",linksTo:"N5L6v3"},
    {id:"N5L6q5",dim:"vocab",type:"recognition",difficulty:"easy",s:"「欲しい」の読み方は？",a:"ほしい",o:["すき","ほしい","きらい","じょうず"],c:1,exp:"欲しい = ほしい.",linksTo:"N5L6v5"},
    {id:"N5L6q6",dim:"kanji",type:"recognition",difficulty:"easy",s:"「好」の漢字の意味は？",a:"like; good",o:["dislike","want","like; good","thing"],c:2,exp:"好 = like.",linksTo:"N5L6k1"},
    {id:"N5L6q7",dim:"grammar",type:"recall",difficulty:"medium",s:"一番___な食べ物は何ですか。(like)",a:"好き",o:["好き","嫌い","上手","下手"],c:0,exp:"一番好きな = favorite.",linksTo:"N5L6g1"},
    {id:"N5L6q8",dim:"vocab",type:"recognition",difficulty:"easy",s:"「一番」の意味は？",a:"best; most; #1",o:["first time","best; most; #1","only","never"],c:1,exp:"一番 = best/most.",linksTo:"N5L6v18"},
    {id:"N5L6q9",dim:"vocab",type:"recall",difficulty:"medium",s:"___が欲しいです。(new smartphone)",a:"新しいスマホ",o:["新しいスマホ","古いスマホ","新しい車","古い車"],c:0,exp:"新しいスマホが欲しいです。",linksTo:"N5L6v5"},
    {id:"N5L6q10",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'thing / object'?",a:"物",o:["好","物","旅","音"],c:1,exp:"物 = thing/object.",linksTo:"N5L6k4"},
    {id:"N5L6q11",dim:"vocab",type:"recall",difficulty:"medium",s:"ラーメンを___。(want to eat)",a:"食べたいです",o:["食べたいです","食べたくないです","食べました","食べません"],c:0,exp:"食べたいです = want to eat.",linksTo:"N5L6g2"},
    {id:"N5L6q12",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'travel'?",a:"旅",o:["旅","物","好","楽"],c:0,exp:"旅 = travel.",linksTo:"N5L6k5"}
  ]
},
{
  lessonNum:7,topic:"て形",topicEn:"Te-form & Requests",module:'N5L7',moduleLabel:'N5 L7 — Te-form & Requests',lesson:'N5L7',lessonLabel:'Te-form & Requests',difficulty:"medium",level:"N5",
  vocabulary:[
    {id:"N5L7v1",word:"書いて",reading:"かいて",pitch:2,meaning:"write and... (te-form)",example:"手紙を書いてください。",exampleMeaning:"Please write a letter."},
    {id:"N5L7v2",word:"飲んで",reading:"のんで",pitch:2,meaning:"drink and... (te-form)",example:"お茶を飲んでください。",exampleMeaning:"Please drink tea."},
    {id:"N5L7v3",word:"食べて",reading:"たべて",pitch:2,meaning:"eat and... (te-form)",example:"ゆっくり食べてください。",exampleMeaning:"Please eat slowly."},
    {id:"N5L7v4",word:"見て",reading:"みて",pitch:1,meaning:"look; see and... (te-form)",example:"これを見てください。",exampleMeaning:"Please look at this."},
    {id:"N5L7v5",word:"聞いて",reading:"きいて",pitch:2,meaning:"listen; ask and... (te-form)",example:"私の話を聞いてください。",exampleMeaning:"Please listen to my story."},
    {id:"N5L7v6",word:"待って",reading:"まって",pitch:3,meaning:"wait (te-form)",example:"ちょっと待ってください。",exampleMeaning:"Please wait a moment."},
    {id:"N5L7v7",word:"座って",reading:"すわって",pitch:3,meaning:"sit down (te-form)",example:"ここに座ってください。",exampleMeaning:"Please sit here."},
    {id:"N5L7v8",word:"立って",reading:"たって",pitch:2,meaning:"stand up (te-form)",example:"立ってください。",exampleMeaning:"Please stand up."},
    {id:"N5L7v9",word:"帰って",reading:"かえって",pitch:3,meaning:"return; go home (te-form)",example:"早く帰ってください。",exampleMeaning:"Please go home early."},
    {id:"N5L7v10",word:"買って",reading:"かって",pitch:2,meaning:"buy (te-form)",example:"パンを買ってきてください。",exampleMeaning:"Please go buy bread."},
    {id:"N5L7v11",word:"やって",reading:"やって",pitch:2,meaning:"do (te-form of やる)",example:"宿題をやってください。",exampleMeaning:"Please do your homework."},
    {id:"N5L7v12",word:"使って",reading:"つかって",pitch:2,meaning:"use (te-form)",example:"このペンを使ってください。",exampleMeaning:"Please use this pen."},
    {id:"N5L7v13",word:"入って",reading:"はいって",pitch:3,meaning:"enter (te-form)",example:"部屋に入ってください。",exampleMeaning:"Please enter the room."},
    {id:"N5L7v14",word:"出て",reading:"でて",pitch:1,meaning:"exit; go out (te-form)",example:"外に出てください。",exampleMeaning:"Please go outside."},
    {id:"N5L7v15",word:"開けて",reading:"あけて",pitch:2,meaning:"open (te-form)",example:"窓を開けてください。",exampleMeaning:"Please open the window."},
    {id:"N5L7v16",word:"閉めて",reading:"しめて",pitch:2,meaning:"close (te-form)",example:"ドアを閉めてください。",exampleMeaning:"Please close the door."},
    {id:"N5L7v17",word:"付けて",reading:"つけて",pitch:2,meaning:"turn on (te-form)",example:"電気をつけてください。",exampleMeaning:"Please turn on the light."},
    {id:"N5L7v18",word:"消して",reading:"けして",pitch:2,meaning:"turn off (te-form)",example:"電気を消してください。",exampleMeaning:"Please turn off the light."},
    {id:"N5L7v19",word:"ゆっくり",reading:"ゆっくり",pitch:3,meaning:"slowly; relaxed",example:"ゆっくり話してください。",exampleMeaning:"Please speak slowly."},
    {id:"N5L7v20",word:"ちょっと",reading:"ちょっと",pitch:1,meaning:"a moment; a little",example:"ちょっと待って。",exampleMeaning:"Wait a moment."},
    {id:"N5L7v21",word:"もう一度",reading:"もういちど",pitch:4,meaning:"once more; again",example:"もう一度言ってください。",exampleMeaning:"Please say it once more."},
    {id:"N5L7v22",word:"窓",reading:"まど",pitch:1,meaning:"window",example:"窓を開けてください。",exampleMeaning:"Please open the window."},
    {id:"N5L7v23",word:"ドア",reading:"ドア",pitch:1,meaning:"door",example:"ドアを閉めて。",exampleMeaning:"Close the door."},
    {id:"N5L7v24",word:"電気",reading:"でんき",pitch:1,meaning:"electricity; light",example:"電気をつけて。",exampleMeaning:"Turn on the light."},
    {id:"N5L7v25",word:"大事",reading:"だいじ",pitch:1,meaning:"important",example:"これは大事です。",exampleMeaning:"This is important."},
    {id:"N5L7v26",word:"急いで",reading:"いそいで",pitch:3,meaning:"in a hurry (te-form)",example:"急いでください。",exampleMeaning:"Please hurry."},
    {id:"N5L7v27",word:"もう",reading:"もう",pitch:1,meaning:"already; more",example:"もう食べましたか。",exampleMeaning:"Have you eaten already?"},
    {id:"N5L7v28",word:"まだ",reading:"まだ",pitch:1,meaning:"still; not yet",example:"まだ終わっていません。",exampleMeaning:"Not finished yet."},
    {id:"N5L7v29",word:"〜てください",reading:"〜てください",pitch:0,meaning:"please do ~",example:"聞いてください。",exampleMeaning:"Please listen."},
    {id:"N5L7v30",word:"〜て",reading:"〜て",pitch:0,meaning:"do ~ and then...",example:"朝起きて、顔を洗います。",exampleMeaning:"I wake up and wash my face."}
  ],
  grammar:[
    {id:"N5L7g1",point:"〜てください (please do ~)",explanation:"Verb て-form + ください = polite request. Te-form rules: ます stem + て for most verbs. Special: 聞く→聞いて, 待つ→待って, 飲む→飲んで, 買う→買って, する→して, くる→きて.",examples:["ちょっと待ってください。 (Please wait a moment.)","ゆっくり話してください。 (Please speak slowly.)","もう一度言ってください。 (Please say it once more.)"],listening:"て + ください = polite request. Not a command, but a soft request.",production:"Make 3 polite requests using 〜てください."},
    {id:"N5L7g2",point:"〜て、〜 (joining actions in sequence)",explanation:"Verb て-form links sequential actions: 'do A, then do B'. The tense is determined by the final verb.",examples:["朝起きて、顔を洗います。 (I wake up and wash my face.)","家に帰って、晩ご飯を食べました。 (I went home and ate dinner.)","駅で電車に乗って、会社へ行きます。 (I get on the train at the station and go to work.)"],listening:"て connects actions in order. Last verb shows tense.",production:"Describe your morning routine using 〜て to connect 3 actions."}
  ],
  kanji:[
    {id:"N5L7k1",char:"立",reading:"りつ／た（つ）",meaning:"stand",exampleWord:"立って（たって）"},
    {id:"N5L7k2",char:"開",reading:"かい／あ（ける）",meaning:"open",exampleWord:"開けて（あけて）"},
    {id:"N5L7k3",char:"閉",reading:"へい／し（める）",meaning:"close",exampleWord:"閉めて（しめて）"},
    {id:"N5L7k4",char:"電",reading:"でん",meaning:"electricity",exampleWord:"電気（でんき）"},
    {id:"N5L7k5",char:"窓",reading:"そう／まど",meaning:"window",exampleWord:"窓（まど）"},
    {id:"N5L7k6",char:"待",reading:"たい／ま（つ）",meaning:"wait",exampleWord:"待って（まって）"},
    {id:"N5L7k7",char:"使",reading:"し／つか（う）",meaning:"use",exampleWord:"使って（つかって）"},
    {id:"N5L7k8",char:"大事",reading:"だいじ",meaning:"important",exampleWord:"大事（だいじ）"}
  ],
  reading:{id:"N5L7r1",title:"先生の指示",passage:"授業が始まりました。先生が言いました。「皆さん、座ってください。教科書を開いて、三十ページを見てください。まず、この文章を読んでください。わからない言葉があったら、手を挙げてください。質問は後で聞きます。じゃ、始めてください。」学生たちは静かに読み始めました。",targetWords:[{word:"座って",id:"N5L7v7"},{word:"待って",id:"N5L7v6"}],questions:[
    {id:"rqN5L7-1",q:"先生は何をしましたか。",o:["本を読んだ","指示を出した","質問に答えた","テストを返した"],c:1,exp:"先生が指示を出しました。"},
    {id:"rqN5L7-2",q:"学生は何をしましたか。",o:["帰った","質問した","文章を読み始めた","話した"],c:2,exp:"学生たちは静かに読み始めました。"},
    {id:"rqN5L7-3",q:"わからない時、どうしますか。",o:["先生に聞く","手を挙げる","無視する","隣の人に聞く"],c:1,exp:"手を挙げてください。"}
  ]},
  listening:[
    {id:"N5L7l1",audioText:"A：すみません、もう一度言ってください。B：はい、ゆっくり言います。",a:"Aさんは何をお願いしましたか。",o:["ゆっくり話して","もう一度言って","大きい声で言って","もう一度書いて"],c:1,exp:"もう一度言ってください。"},
    {id:"N5L7l2",audioText:"A：窓を開けてもいいですか。B：はい、どうぞ。",a:"Aさんは何をしますか。",o:["ドアを開ける","窓を開ける","窓を閉める","ドアを閉める"],c:1,exp:"窓を開けます。"}
  ],
  questions:[
    {id:"N5L7q1",dim:"grammar",type:"recall",difficulty:"easy",s:"ちょっと___ください。(wait)",a:"待って",o:["待って","待ちて","待うて","待ってい"],c:0,exp:"待つ→待って (te-form).",linksTo:"N5L7g1"},
    {id:"N5L7q2",dim:"grammar",type:"recall",difficulty:"easy",s:"ゆっくり___ください。(speak)",a:"話して",o:["話して","話ちて","話いて","話って"],c:0,exp:"話す→話して (te-form).",linksTo:"N5L7g1"},
    {id:"N5L7q3",dim:"grammar",type:"recall",difficulty:"medium",s:"朝起___、顔を洗います。",a:"きて",o:["きて","って","いて","して"],c:0,exp:"起きる→起きて. て links sequential actions.",linksTo:"N5L7g2"},
    {id:"N5L7q4",dim:"vocab",type:"recognition",difficulty:"easy",s:"「待って」の意味は？",a:"wait",o:["sit","wait","stand","open"],c:1,exp:"待って = wait (te-form of 待つ).",linksTo:"N5L7v6"},
    {id:"N5L7q5",dim:"vocab",type:"recognition",difficulty:"easy",s:"「窓」の読み方は？",a:"まど",o:["まど","どあ","でんき","かべ"],c:0,exp:"窓 = まど (window).",linksTo:"N5L7v22"},
    {id:"N5L7q6",dim:"kanji",type:"recognition",difficulty:"easy",s:"「立」の漢字の意味は？",a:"stand",o:["sit","stand","wait","open"],c:1,exp:"立 = stand.",linksTo:"N5L7k1"},
    {id:"N5L7q7",dim:"grammar",type:"recall",difficulty:"medium",s:"電気を___ください。(turn off)",a:"消して",o:["消して","消ちて","消って","消いて"],c:0,exp:"消す→消して (te-form).",linksTo:"N5L7g1"},
    {id:"N5L7q8",dim:"vocab",type:"recognition",difficulty:"easy",s:"「もう一度」の意味は？",a:"once more; again",o:["first time","once more; again","never","always"],c:1,exp:"もう一度 = once more.",linksTo:"N5L7v21"},
    {id:"N5L7q9",dim:"vocab",type:"recall",difficulty:"medium",s:"ここに___ください。(sit down)",a:"座って",o:["座って","座て","座いて","座ってい"],c:0,exp:"座る→座って (te-form).",linksTo:"N5L7v7"},
    {id:"N5L7q10",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'open'?",a:"開",o:["閉","開","電","窓"],c:1,exp:"開 = open.",linksTo:"N5L7k2"},
    {id:"N5L7q11",dim:"vocab",type:"recall",difficulty:"medium",s:"ドアを___ください。(close)",a:"閉めて",o:["閉めて","閉めって","閉めいて","閉めちて"],c:0,exp:"閉める→閉めて (te-form).",linksTo:"N5L7v16"},
    {id:"N5L7q12",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'window'?",a:"窓",o:["窓","電","開","閉"],c:0,exp:"窓 = window.",linksTo:"N5L7k5"}
  ]
},
{
  lessonNum:8,topic:"場所と存在",topicEn:"Location & Existence",module:'N5L8',moduleLabel:'N5 L8 — Location & Existence',lesson:'N5L8',lessonLabel:'Location & Existence',difficulty:"easy",level:"N5",
  vocabulary:[
    {id:"N5L8v1",word:"あります",reading:"あります",pitch:3,meaning:"there is (inanimate)",example:"机の上に本があります。",exampleMeaning:"There is a book on the desk."},
    {id:"N5L8v2",word:"います",reading:"います",pitch:2,meaning:"there is (living thing)",example:"公園に犬がいます。",exampleMeaning:"There is a dog in the park."},
    {id:"N5L8v3",word:"上",reading:"うえ",pitch:0,meaning:"on; above",example:"机の上に電話があります。",exampleMeaning:"There's a phone on the desk."},
    {id:"N5L8v4",word:"下",reading:"した",pitch:2,meaning:"under; below",example:"机の下にかばんがあります。",exampleMeaning:"There's a bag under the desk."},
    {id:"N5L8v5",word:"中",reading:"なか",pitch:2,meaning:"inside; in",example:"かばんの中に何がありますか。",exampleMeaning:"What's inside the bag?"},
    {id:"N5L8v6",word:"外",reading:"そと",pitch:2,meaning:"outside",example:"外は寒いです。",exampleMeaning:"It's cold outside."},
    {id:"N5L8v7",word:"前",reading:"まえ",pitch:2,meaning:"front; before",example:"駅の前にバス停があります。",exampleMeaning:"There's a bus stop in front of the station."},
    {id:"N5L8v8",word:"後ろ",reading:"うしろ",pitch:3,meaning:"behind; back",example:"家の後ろに木があります。",exampleMeaning:"There's a tree behind the house."},
    {id:"N5L8v9",word:"横",reading:"よこ",pitch:0,meaning:"side; next to",example:"銀行の横に郵便局があります。",exampleMeaning:"Next to the bank there's a post office."},
    {id:"N5L8v10",word:"右",reading:"みぎ",pitch:2,meaning:"right",example:"右に曲がってください。",exampleMeaning:"Please turn right."},
    {id:"N5L8v11",word:"左",reading:"ひだり",pitch:3,meaning:"left",example:"左に学校があります。",exampleMeaning:"There's a school on the left."},
    {id:"N5L8v12",word:"隣",reading:"となり",pitch:3,meaning:"next door; next to",example:"隣の部屋は静かです。",exampleMeaning:"The next room is quiet."},
    {id:"N5L8v13",word:"間",reading:"あいだ",pitch:3,meaning:"between",example:"銀行と郵便局の間に店があります。",exampleMeaning:"Between the bank and post office there's a shop."},
    {id:"N5L8v14",word:"近く",reading:"ちかく",pitch:2,meaning:"near; nearby",example:"駅の近くにコンビニがあります。",exampleMeaning:"There's a konbini near the station."},
    {id:"N5L8v15",word:"中",reading:"ちゅう",pitch:0,meaning:"throughout; during",example:"一日中雨でした。",exampleMeaning:"It rained all day."},
    {id:"N5L8v16",word:"机",reading:"つくえ",pitch:0,meaning:"desk",example:"机の上に本があります。",exampleMeaning:"There's a book on the desk."},
    {id:"N5L8v17",word:"椅子",reading:"いす",pitch:2,meaning:"chair",example:"椅子に座ってください。",exampleMeaning:"Please sit on the chair."},
    {id:"N5L8v18",word:"電話",reading:"でんわ",pitch:1,meaning:"phone",example:"電話はどこにありますか。",exampleMeaning:"Where is the phone?"},
    {id:"N5L8v19",word:"郵便局",reading:"ゆうびんきょく",pitch:3,meaning:"post office",example:"郵便局は駅の隣です。",exampleMeaning:"The post office is next to the station."},
    {id:"N5L8v20",word:"病院",reading:"びょういん",pitch:0,meaning:"hospital",example:"病院はあそこにあります。",exampleMeaning:"The hospital is over there."},
    {id:"N5L8v21",word:"公園",reading:"こうえん",pitch:0,meaning:"park",example:"公園に子供がいます。",exampleMeaning:"There are children in the park."},
    {id:"N5L8v22",word:"子供",reading:"こども",pitch:1,meaning:"child; children",example:"子供が遊んでいます。",exampleMeaning:"Children are playing."},
    {id:"N5L8v23",word:"木",reading:"き",pitch:1,meaning:"tree",example:"公園に木がたくさんあります。",exampleMeaning:"There are many trees in the park."},
    {id:"N5L8v24",word:"花",reading:"はな",pitch:1,meaning:"flower",example:"花が咲いています。",exampleMeaning:"Flowers are blooming."},
    {id:"N5L8v25",word:"バス停",reading:"バスてい",pitch:3,meaning:"bus stop",example:"バス停は前にあります。",exampleMeaning:"The bus stop is in front."},
    {id:"N5L8v26",word:"地図",reading:"ちず",pitch:1,meaning:"map",example:"地図を見てください。",exampleMeaning:"Please look at the map."},
    {id:"N5L8v27",word:"曲がります",reading:"まがります",pitch:3,meaning:"to turn (corner)",example:"右に曲がってください。",exampleMeaning:"Please turn right."},
    {id:"N5L8v28",word:"渡ります",reading:"わたります",pitch:3,meaning:"to cross (street/bridge)",example:"信号を渡ってください。",exampleMeaning:"Please cross at the signal."},
    {id:"N5L8v29",word:"〜にあります",reading:"〜にあります",pitch:0,meaning:"is at/in/on (inanimate)",example:"本は机の上にあります。",exampleMeaning:"The book is on the desk."},
    {id:"N5L8v30",word:"〜にいます",reading:"〜にいます",pitch:0,meaning:"is at/in/on (living)",example:"先生は教室にいます。",exampleMeaning:"The teacher is in the classroom."}
  ],
  grammar:[
    {id:"N5L8g1",point:"〜に〜があります / います (there is ~ at ~)",explanation:"Place に Thing が あります (inanimate) / います (living). あります = for things, います = for people/animals.",examples:["机の上に本があります。 (There's a book on the desk.)","公園に犬がいます。 (There's a dog in the park.)","部屋に誰がいますか。 (Who is in the room?)"],listening:"に = location, が = subject. あります for things, います for living.",production:"Describe what's in your room using あります/います."},
    {id:"N5L8g2",point:"〜は〜にあります / います (X is at Y)",explanation:"Topic は Location に あります/います. Used when answering 'where is X?'",examples:["本は机の上にあります。 (The book is on the desk.)","先生は教室にいます。 (The teacher is in the classroom.)","トイレはあそこにあります。 (The toilet is over there.)"],listening:"は marks the topic (what we're looking for), に marks where it is.",production:"Ask and answer where 3 things are."}
  ],
  kanji:[
    {id:"N5L8k1",char:"上",reading:"じょう／うえ／あ（がる）",meaning:"up; above",exampleWord:"上（うえ）"},
    {id:"N5L8k2",char:"下",reading:"か／した／さ（がる）",meaning:"down; below",exampleWord:"下（した）"},
    {id:"N5L8k3",char:"前",reading:"ぜん／まえ",meaning:"front; before",exampleWord:"前（まえ）"},
    {id:"N5L8k4",char:"右",reading:"う／みぎ",meaning:"right",exampleWord:"右（みぎ）"},
    {id:"N5L8k5",char:"左",reading:"さ／ひだり",meaning:"left",exampleWord:"左（ひだり）"},
    {id:"N5L8k6",char:"中",reading:"ちゅう／なか",meaning:"inside; middle",exampleWord:"中（なか）"},
    {id:"N5L8k7",char:"木",reading:"もく／き",meaning:"tree; wood",exampleWord:"木（き）"},
    {id:"N5L8k8",char:"図",reading:"と／ず",meaning:"drawing; map",exampleWord:"地図（ちず）"}
  ],
  reading:{id:"N5L8r1",title:"私の部屋",passage:"私の部屋は小さいですが、きれいです。部屋に入ると、右にベッドがあります。ベッドの上に猫がいます。左に机があります。机の上に本とノートがあります。机の下にかばんがあります。窓の前に椅子があります。窓の外に木があります。壁に写真があります。部屋は静かで、とても好きです。",targetWords:[{word:"あります",id:"N5L8v1"},{word:"います",id:"N5L8v2"}],questions:[
    {id:"rqN5L8-1",q:"部屋に入ると、右に何がありますか。",o:["机","ベッド","椅子","窓"],c:1,exp:"右にベッドがあります。"},
    {id:"rqN5L8-2",q:"ベッドの上に何がいますか。",o:["犬","猫","鳥","子供"],c:1,exp:"ベッドの上に猫がいます。"},
    {id:"rqN5L8-3",q:"机の下に何がありますか。",o:["かばん","本","ノート","椅子"],c:0,exp:"机の下にかばんがあります。"}
  ]},
  listening:[
    {id:"N5L8l1",audioText:"A：郵便局はどこにありますか。B：駅の隣にあります。",a:"郵便局はどこにありますか。",o:["駅の中","駅の隣","駅の前","駅の後ろ"],c:1,exp:"駅の隣にあります。"},
    {id:"N5L8l2",audioText:"A：教室に誰がいますか。B：田中先生と学生がいます。",a:"教室に誰がいますか。",o:["田中先生だけ","学生だけ","田中先生と学生","誰もいない"],c:2,exp:"田中先生と学生がいます。"}
  ],
  questions:[
    {id:"N5L8q1",dim:"grammar",type:"recall",difficulty:"easy",s:"机の上に本___。",a:"があります",o:["があります","がいます","をします","でします"],c:0,exp:"あります for inanimate objects.",linksTo:"N5L8g1"},
    {id:"N5L8q2",dim:"grammar",type:"recall",difficulty:"easy",s:"公園に犬___。",a:"がいます",o:["があります","がいます","をします","でします"],c:1,exp:"います for living things.",linksTo:"N5L8g1"},
    {id:"N5L8q3",dim:"grammar",type:"recall",difficulty:"medium",s:"先生は教室___います。",a:"に",o:["に","で","を","が"],c:0,exp:"に marks location of existence.",linksTo:"N5L8g2"},
    {id:"N5L8q4",dim:"vocab",type:"recognition",difficulty:"easy",s:"「上」の読み方は？",a:"うえ",o:["した","うえ","まえ","よこ"],c:1,exp:"上 = うえ (on/above).",linksTo:"N5L8v3"},
    {id:"N5L8q5",dim:"vocab",type:"recognition",difficulty:"easy",s:"「右」の意味は？",a:"right",o:["left","right","front","back"],c:1,exp:"右 = right.",linksTo:"N5L8v10"},
    {id:"N5L8q6",dim:"kanji",type:"recognition",difficulty:"easy",s:"「中」の漢字の意味は？",a:"inside; middle",o:["outside","inside; middle","above","below"],c:1,exp:"中 = inside.",linksTo:"N5L8k6"},
    {id:"N5L8q7",dim:"grammar",type:"recall",difficulty:"medium",s:"本は机の上___あります。",a:"に",o:["に","で","を","が"],c:0,exp:"に marks where the topic is.",linksTo:"N5L8g2"},
    {id:"N5L8q8",dim:"vocab",type:"recognition",difficulty:"easy",s:"「隣」の読み方は？",a:"となり",o:["となり","よこ","まえ","うしろ"],c:0,exp:"隣 = となり (next to).",linksTo:"N5L8v12"},
    {id:"N5L8q9",dim:"vocab",type:"recall",difficulty:"medium",s:"銀行___郵便局___店があります。(between)",a:"と・の間に",o:["と・の間に","と・の上に","と・の下に","と・の前に"],c:0,exp:"〜と〜の間に = between ~ and ~.",linksTo:"N5L8v13"},
    {id:"N5L8q10",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'left'?",a:"左",o:["右","左","前","中"],c:1,exp:"左 = left.",linksTo:"N5L8k5"},
    {id:"N5L8q11",dim:"vocab",type:"recall",difficulty:"medium",s:"駅の___にコンビニがあります。(near)",a:"近く",o:["近く","隣","間","上"],c:0,exp:"近く = near.",linksTo:"N5L8v14"},
    {id:"N5L8q12",dim:"kanji",type:"recognition",difficulty:"easy",s:"Which kanji means 'tree / wood'?",a:"木",o:["木","中","上","図"],c:0,exp:"木 = tree/wood.",linksTo:"N5L8k7"}
  ]
}
];
if (typeof window !== 'undefined') window.N5_CONTENT = N5_CONTENT;
if (typeof module !== 'undefined' && module.exports) module.exports = N5_CONTENT;
