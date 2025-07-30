import { Subject, Level } from '@/types';

export const subjects: Subject[] = [
  {
    id: 'math',
    name: '算数',
    emoji: '🔢',
    color: 'from-blue-400 to-blue-600',
    description: '足し算から割り算まで楽しく学ぼう！'
  },
  {
    id: 'japanese',
    name: '国語',
    emoji: '🇯🇵',
    color: 'from-red-400 to-red-600',
    description: 'ひらがな・カタカナを書いて覚えよう！'
  },
  {
    id: 'english',
    name: '英語',
    emoji: '🇺🇸',
    color: 'from-green-400 to-green-600',
    description: 'アルファベットと英単語を学ぼう！'
  },
  {
    id: 'time',
    name: '時計',
    emoji: '🕐',
    color: 'from-purple-400 to-purple-600',
    description: '時計の読み方を覚えよう！'
  },
  {
    id: 'shape',
    name: '図形',
    emoji: '🔺',
    color: 'from-orange-400 to-orange-600',
    description: 'いろいろな図形を学ぼう！'
  },
  {
    id: 'money',
    name: 'おかね',
    emoji: '💰',
    color: 'from-yellow-400 to-yellow-600',
    description: 'おかねのかぞえかたを覚えよう！'
  },
  {
    id: 'reading',
    name: 'ぶんしょう',
    emoji: '📚',
    color: 'from-indigo-400 to-indigo-600',
    description: 'ぶんしょうをよんでりかいしよう！'
  },
  {
    id: 'time-calc',
    name: 'じかんけいさん',
    emoji: '⏰',
    color: 'from-pink-400 to-pink-600',
    description: 'じかんのけいさんをおぼえよう！'
  },
  {
    id: 'science',
    name: 'りか',
    emoji: '🔬',
    color: 'from-teal-400 to-teal-600',
    description: 'しぜんやいきものをかんさつしよう！'
  },
  {
    id: 'vocabulary',
    name: 'ごい',
    emoji: '💭',
    color: 'from-violet-400 to-violet-600',
    description: 'ことばのちからをつけよう！'
  },
  {
    id: 'programming',
    name: 'プログラミング',
    emoji: '💻',
    color: 'from-gray-400 to-gray-600',
    description: 'かんがえるちからをそだてよう！'
  },
  {
    id: 'digital-literacy',
    name: 'デジタル',
    emoji: '📱',
    color: 'from-emerald-400 to-emerald-600',
    description: 'あんぜんにつかうほうほうをまなぼう！'
  }
];

export const mathLevels: Level[] = [
  {
    id: 'math-numbers-1',
    subjectId: 'math',
    name: '数の理解 1-10',
    description: '1から10までの数を覚えよう',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'math-numbers-2',
    subjectId: 'math',
    name: '数の理解 1-20',
    description: '1から20までの数を覚えよう',
    difficulty: 1,
    requiredPoints: 50,
    isUnlocked: false
  },
  {
    id: 'math-numbers-3',
    subjectId: 'math',
    name: '数の理解 1-100',
    description: '1から100までの数を覚えよう',
    difficulty: 2,
    requiredPoints: 100,
    isUnlocked: false
  },
  {
    id: 'math-addition-1',
    subjectId: 'math',
    name: '足し算 レベル1',
    description: '●で視覚サポート付きの足し算（一桁）',
    difficulty: 2,
    requiredPoints: 150,
    isUnlocked: false
  },
  {
    id: 'math-carry-addition',
    subjectId: 'math',
    name: '繰り上がりの足し算',
    description: '10を超える足し算をマスターしよう',
    difficulty: 3,
    requiredPoints: 250,
    isUnlocked: false
  },
  {
    id: 'math-borrow-subtraction',
    subjectId: 'math',
    name: '繰り下がりの引き算',
    description: '10から借りる引き算をマスターしよう',
    difficulty: 3,
    requiredPoints: 300,
    isUnlocked: false
  },
  {
    id: 'math-addition-2',
    subjectId: 'math',
    name: '足し算 レベル2',
    description: '視覚サポートなしの足し算（一桁）',
    difficulty: 4,
    requiredPoints: 350,
    isUnlocked: false
  },
  {
    id: 'math-addition-3',
    subjectId: 'math',
    name: '足し算 レベル3',
    description: '二桁の足し算（繰り上がりなし）',
    difficulty: 3,
    requiredPoints: 250,
    isUnlocked: false
  },
  {
    id: 'math-addition-4',
    subjectId: 'math',
    name: '足し算 レベル4',
    description: '二桁の足し算（繰り上がりあり）',
    difficulty: 4,
    requiredPoints: 400,
    isUnlocked: false
  },
  {
    id: 'math-addition-5',
    subjectId: 'math',
    name: '足し算 レベル5',
    description: '三桁の足し算（繰り上がりなし）',
    difficulty: 5,
    requiredPoints: 600,
    isUnlocked: false
  },
  {
    id: 'math-addition-6',
    subjectId: 'math',
    name: '足し算 レベル6',
    description: '三桁の足し算（繰り上がりあり）',
    difficulty: 6,
    requiredPoints: 800,
    isUnlocked: false
  },
  {
    id: 'math-subtraction-1',
    subjectId: 'math',
    name: '引き算 レベル1',
    description: '●で視覚サポート付きの引き算',
    difficulty: 2,
    requiredPoints: 150,
    isUnlocked: false
  },
  {
    id: 'math-subtraction-2',
    subjectId: 'math',
    name: '引き算 レベル2',
    description: '視覚サポートなしの引き算',
    difficulty: 3,
    requiredPoints: 300,
    isUnlocked: false
  },
  {
    id: 'math-subtraction-3',
    subjectId: 'math',
    name: '引き算 レベル3',
    description: '二桁の引き算（繰り下がりなし）',
    difficulty: 4,
    requiredPoints: 450,
    isUnlocked: false
  },
  {
    id: 'math-subtraction-4',
    subjectId: 'math',
    name: '引き算 レベル4',
    description: '二桁の引き算（繰り下がりあり）',
    difficulty: 5,
    requiredPoints: 650,
    isUnlocked: false
  },
  {
    id: 'math-subtraction-5',
    subjectId: 'math',
    name: '引き算 レベル5',
    description: '三桁の引き算（繰り下がりなし）',
    difficulty: 6,
    requiredPoints: 850,
    isUnlocked: false
  },
  {
    id: 'math-subtraction-6',
    subjectId: 'math',
    name: '引き算 レベル6',
    description: '三桁の引き算（繰り下がりあり）',
    difficulty: 7,
    requiredPoints: 1100,
    isUnlocked: false
  },
  {
    id: 'math-multiplication-1',
    subjectId: 'math',
    name: 'かけ算 レベル1',
    description: '九九の読み方と計算',
    difficulty: 4,
    requiredPoints: 450,
    isUnlocked: false
  },
  {
    id: 'math-division-1',
    subjectId: 'math',
    name: '割り算 レベル1',
    description: '簡単な割り算',
    difficulty: 5,
    requiredPoints: 800,
    isUnlocked: false
  }
];

export const japaneseLevels: Level[] = [
  {
    id: 'japanese-hiragana-1',
    subjectId: 'japanese',
    name: 'ひらがな あ〜さ行',
    description: 'あ、か、さ行のひらがなを書こう',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'japanese-hiragana-2',
    subjectId: 'japanese',
    name: 'ひらがな た〜は行',
    description: 'た、な、は行のひらがなを書こう',
    difficulty: 2,
    requiredPoints: 150,
    isUnlocked: false
  },
  {
    id: 'japanese-hiragana-3',
    subjectId: 'japanese',
    name: 'ひらがな ま〜わ行',
    description: 'ま、や、ら、わ行のひらがなを書こう',
    difficulty: 3,
    requiredPoints: 300,
    isUnlocked: false
  },
  {
    id: 'japanese-hiragana-quiz-1',
    subjectId: 'japanese',
    name: 'ひらがなクイズ あ〜さ行',
    description: '絵を見て文字を当てよう（あ〜さ行）',
    difficulty: 2,
    requiredPoints: 200,
    isUnlocked: false
  },
  {
    id: 'japanese-hiragana-quiz-2',
    subjectId: 'japanese',
    name: 'ひらがなクイズ た〜は行',
    description: '絵を見て文字を当てよう（た〜は行）',
    difficulty: 3,
    requiredPoints: 350,
    isUnlocked: false
  },
  {
    id: 'japanese-hiragana-quiz-3',
    subjectId: 'japanese',
    name: 'ひらがなクイズ ま〜わ行',
    description: '絵を見て文字を当てよう（ま〜わ行）',
    difficulty: 4,
    requiredPoints: 500,
    isUnlocked: false
  },
  {
    id: 'japanese-katakana-1',
    subjectId: 'japanese',
    name: 'カタカナ ア〜サ行',
    description: '直線文字で漢字の基礎を作ろう',
    difficulty: 2,
    requiredPoints: 200,
    isUnlocked: false
  },
  {
    id: 'japanese-katakana-2',
    subjectId: 'japanese',
    name: 'カタカナ タ〜ハ行',
    description: '外来語によく使われる文字を覚えよう',
    difficulty: 3,
    requiredPoints: 250,
    isUnlocked: false
  },
  {
    id: 'japanese-katakana-3',
    subjectId: 'japanese',
    name: 'カタカナ マ〜ワ行',
    description: 'すべてのカタカナを完成させよう',
    difficulty: 3,
    requiredPoints: 300,
    isUnlocked: false
  },
  {
    id: 'japanese-katakana-words',
    subjectId: 'japanese',
    name: 'カタカナ単語',
    description: '外来語を読んで書こう',
    difficulty: 4,
    requiredPoints: 400,
    isUnlocked: false
  },
  {
    id: 'japanese-kanji-g1-1',
    subjectId: 'japanese',
    name: '漢字1年 数字と基本',
    description: '一、二、三、日、月、火を覚えよう',
    difficulty: 4,
    requiredPoints: 450,
    isUnlocked: false
  },
  {
    id: 'japanese-kanji-g1-2',
    subjectId: 'japanese',
    name: '漢字1年 自然',
    description: '水、木、金、土など自然の漢字',
    difficulty: 5,
    requiredPoints: 550,
    isUnlocked: false
  },
  {
    id: 'japanese-kanji-g1-3',
    subjectId: 'japanese',
    name: '漢字1年 人と体',
    description: '人、口、手など体の漢字',
    difficulty: 5,
    requiredPoints: 650,
    isUnlocked: false
  },
  {
    id: 'japanese-kanji-g2-1',
    subjectId: 'japanese',
    name: '漢字2年 学校生活',
    description: '学、校、年など学校の漢字',
    difficulty: 6,
    requiredPoints: 800,
    isUnlocked: false
  },
  {
    id: 'japanese-words-1',
    subjectId: 'japanese',
    name: '単語練習',
    description: '絵を見て単語を書こう',
    difficulty: 4,
    requiredPoints: 600,
    isUnlocked: false
  }
];

export const englishLevels: Level[] = [
  {
    id: 'english-alphabet-1',
    subjectId: 'english',
    name: 'アルファベット A-M',
    description: 'A から M までのアルファベット',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'english-alphabet-2',
    subjectId: 'english',
    name: 'アルファベット N-Z',
    description: 'N から Z までのアルファベット',
    difficulty: 2,
    requiredPoints: 120,
    isUnlocked: false
  },
  {
    id: 'english-words-1',
    subjectId: 'english',
    name: '基本単語',
    description: '動物や色の英単語',
    difficulty: 3,
    requiredPoints: 300,
    isUnlocked: false
  },
  {
    id: 'english-phonics-1',
    subjectId: 'english',
    name: 'フォニックス',
    description: '文字の音を覚えよう',
    difficulty: 4,
    requiredPoints: 500,
    isUnlocked: false
  }
];

export const timeLevels: Level[] = [
  {
    id: 'time-reading-1',
    subjectId: 'time',
    name: '時計の読み方 レベル1',
    description: '○時を読んでみよう',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'time-reading-2',
    subjectId: 'time',
    name: '時計の読み方 レベル2',
    description: '○時30分を読んでみよう',
    difficulty: 2,
    requiredPoints: 120,
    isUnlocked: false
  },
  {
    id: 'time-reading-3',
    subjectId: 'time',
    name: '時計の読み方 レベル3',
    description: '15分と45分を読んでみよう',
    difficulty: 3,
    requiredPoints: 300,
    isUnlocked: false
  }
];

export const shapeLevels: Level[] = [
  {
    id: 'shape-basic',
    subjectId: 'shape',
    name: '基本図形',
    description: '円・三角形・四角形を覚えよう',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'shape-comparison',
    subjectId: 'shape',
    name: '図形の比較',
    description: '仲間はずれを見つけよう',
    difficulty: 2,
    requiredPoints: 150,
    isUnlocked: false
  },
  {
    id: 'shape-pattern',
    subjectId: 'shape',
    name: '図形のパターン',
    description: 'パターンを見つけて答えよう',
    difficulty: 3,
    requiredPoints: 350,
    isUnlocked: false
  }
];

export const moneyLevels: Level[] = [
  {
    id: 'money-level-1',
    subjectId: 'money',
    name: 'こうかのにんしき',
    description: '1えん、5えん、10えん、100えんを覚えよう',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'money-level-2',
    subjectId: 'money',
    name: 'こうかのくみあわせ',
    description: 'いくつかのこうかを たしてみよう',
    difficulty: 2,
    requiredPoints: 120,
    isUnlocked: false
  },
  {
    id: 'money-level-3',
    subjectId: 'money',
    name: 'かいものとおつり',
    description: 'かいものをして おつりを けいさんしよう',
    difficulty: 3,
    requiredPoints: 240,
    isUnlocked: false
  }
];

export const readingLevels: Level[] = [
  {
    id: 'reading-level-1',
    subjectId: 'reading',
    name: 'たんぶんよみかい',
    description: 'みじかいぶんしょうをよんでりかいしよう',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'reading-level-2',
    subjectId: 'reading',
    name: 'かんたんなおはなし',
    description: 'みじかいおはなしをよんでりかいしよう',
    difficulty: 2,
    requiredPoints: 120,
    isUnlocked: false
  },
  {
    id: 'reading-level-3',
    subjectId: 'reading',
    name: 'かいわとものがたり',
    description: 'かいわやふくざつなおはなしをりかいしよう',
    difficulty: 3,
    requiredPoints: 280,
    isUnlocked: false
  }
];

export const timeCalcLevels: Level[] = [
  {
    id: 'time-calc-level-1',
    subjectId: 'time-calc',
    name: 'じかんのながさ',
    description: 'みじかいじかん・ながいじかんをりかいしよう',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'time-calc-level-2',
    subjectId: 'time-calc',
    name: 'じこくけいさん',
    description: 'じこくとじこくから じかんをけいさんしよう',
    difficulty: 2,
    requiredPoints: 150,
    isUnlocked: false
  },
  {
    id: 'time-calc-level-3',
    subjectId: 'time-calc',
    name: 'スケジュール',
    description: '1にちのよていを かんがえよう',
    difficulty: 3,
    requiredPoints: 350,
    isUnlocked: false
  }
];

export const scienceLevels: Level[] = [
  {
    id: 'science-level-1',
    subjectId: 'science',
    name: 'いきものかんさつ',
    description: 'みぢかないきものをかんさつしよう',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'science-level-2',
    subjectId: 'science',
    name: 'きせつとてんき',
    description: 'きせつのへんかやてんきをまなぼう',
    difficulty: 2,
    requiredPoints: 150,
    isUnlocked: false
  },
  {
    id: 'science-level-3',
    subjectId: 'science',
    name: 'からだとしぜん',
    description: 'からだのしくみやしぜんのふしぎをしろう',
    difficulty: 3,
    requiredPoints: 350,
    isUnlocked: false
  }
];

export const vocabularyLevels: Level[] = [
  {
    id: 'vocabulary-level-1',
    subjectId: 'vocabulary',
    name: 'はんたいごとき',
    description: 'はんたいのいみのことばをおぼえよう',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'vocabulary-level-2',
    subjectId: 'vocabulary',
    name: 'なかまわけ',
    description: 'おなじなかまのことばをあつめよう',
    difficulty: 2,
    requiredPoints: 120,
    isUnlocked: false
  },
  {
    id: 'vocabulary-level-3',
    subjectId: 'vocabulary',
    name: 'きもちのことば',
    description: 'きもちをあらわすことばをふやそう',
    difficulty: 3,
    requiredPoints: 280,
    isUnlocked: false
  }
];

export const programmingLevels: Level[] = [
  {
    id: 'programming-level-1',
    subjectId: 'programming',
    name: 'じゅんばんとてじゅん',
    description: 'ものごとのじゅんばんをかんがえよう',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'programming-level-2',
    subjectId: 'programming',
    name: 'くりかえしとじょうけん',
    description: 'くりかえしやじょうけんをまなぼう',
    difficulty: 2,
    requiredPoints: 120,
    isUnlocked: false
  },
  {
    id: 'programming-level-3',
    subjectId: 'programming',
    name: 'もんだいかいけつ',
    description: 'まちがいをみつけてなおそう',
    difficulty: 3,
    requiredPoints: 300,
    isUnlocked: false
  }
];

export const digitalLiteracyLevels: Level[] = [
  {
    id: 'internet-literacy',
    subjectId: 'digital-literacy',
    name: 'インターネット',
    description: 'インターネットのあんぜんなつかいかた',
    difficulty: 1,
    requiredPoints: 0,
    isUnlocked: true
  },
  {
    id: 'youtube-literacy',
    subjectId: 'digital-literacy',
    name: 'YouTube',
    description: 'YouTubeのあんぜんなみかた',
    difficulty: 2,
    requiredPoints: 60,
    isUnlocked: false
  },
  {
    id: 'sns-literacy',
    subjectId: 'digital-literacy',
    name: 'SNS',
    description: 'SNSのきけんとたいさく',
    difficulty: 3,
    requiredPoints: 120,
    isUnlocked: false
  }
];

export const getAllLevels = (): Level[] => {
  return [...mathLevels, ...japaneseLevels, ...englishLevels, ...timeLevels, ...shapeLevels, ...moneyLevels, ...readingLevels, ...timeCalcLevels, ...scienceLevels, ...vocabularyLevels, ...programmingLevels, ...digitalLiteracyLevels];
};

export const getLevelsBySubject = (subjectId: string): Level[] => {
  switch (subjectId) {
    case 'math':
      return mathLevels;
    case 'japanese':
      return japaneseLevels;
    case 'english':
      return englishLevels;
    case 'time':
      return timeLevels;
    case 'shape':
      return shapeLevels;
    case 'money':
      return moneyLevels;
    case 'reading':
      return readingLevels;
    case 'time-calc':
      return timeCalcLevels;
    case 'science':
      return scienceLevels;
    case 'vocabulary':
      return vocabularyLevels;
    case 'programming':
      return programmingLevels;
    case 'digital-literacy':
      return digitalLiteracyLevels;
    default:
      return [];
  }
};