import { Question } from '@/types';

// デジタルリテラシー教材用データ
export interface DigitalLiteracyData {
  topic: string;
  category: 'internet-safety' | 'youtube-safety' | 'sns-safety' | 'digital-citizenship';
  level: number;
  content: string;
  keyPoints: string[];
  examples?: string[];
  warnings?: string[];
}

export const digitalLiteracyContent: DigitalLiteracyData[] = [
  // インターネット基礎
  {
    topic: 'インターネットってなに？',
    category: 'internet-safety',
    level: 1,
    content: 'インターネットは せかいじゅうの コンピュータが つながった おおきな ネットワークです。いろいろな じょうほうを みたり、ひととお はなしが できます。',
    keyPoints: [
      'せかいじゅうの コンピュータが つながっている',
      'いろいろな じょうほうが ある',
      'とおくの ひととも はなせる',
      'とても べんりだけど きをつけることも ある'
    ],
    examples: [
      'ゲームを する',
      'どうがを みる', 
      'べんきょうの しらべもの',
      'かぞくや ともだちと はなす'
    ]
  },
  {
    topic: 'あんぜんにつかうために',
    category: 'internet-safety',
    level: 1,
    content: 'インターネットを あんぜんに つかうために、いくつか やくそくが あります。この やくそくを まもって、たのしく あんぜんに インターネットを つかいましょう。',
    keyPoints: [
      'おとなの ひとと いっしょに つかう',
      'じぶんの なまえや じゅうしょを おしえない',
      'しらない ひとと あわない',
      'へんな サイトは みない'
    ],
    warnings: [
      'しらない ひとから メッセージが きても へんじしない',
      'あやしい サイトは すぐに とぢる',
      'なにか こまったことが あったら すぐに おとなに そうだんする'
    ]
  },
  {
    topic: 'パスワードのひみつ',
    category: 'internet-safety',
    level: 2,
    content: 'パスワードは インターネットの せかいでの「かぎ」です。この かぎを ひとに おしえてしまうと、あなたの たいせつな じょうほうを みられて しまいます。',
    keyPoints: [
      'パスワードは ひとに おしえない「ひみつ」',
      'かんたんすぎる パスワードは だめ',
      'ともだちにも おしえない',
      'おうちの ひとと いっしょに きめる'
    ],
    examples: [
      'だめな パスワード: 123456、password',
      'いい パスワード: すうじと もじを まぜる',
      'ひとりひとり ちがう パスワードを つかう'
    ]
  }
];

export const youtubeContent: DigitalLiteracyData[] = [
  {
    topic: 'YouTubeってなに？',
    category: 'youtube-safety',
    level: 1,
    content: 'YouTubeは いろいろな どうがを みることが できる サイトです。おもしろい どうがや べんきょうに やくだつ どうがが たくさん あります。でも、すべての どうがが こどもに よいわけでは ありません。',
    keyPoints: [
      'いろいろな どうがが みられる',
      'べんきょうに やくだつ どうがも ある',
      'すべての どうがが こどもむけでは ない',
      'おとなと いっしょに みる'
    ],
    examples: [
      'どうぶつの どうが',
      'おんがくの どうが',
      'べんきょうの せつめい',
      'こうさくの つくりかた'
    ]
  },
  {
    topic: 'あんぜんなみかた',
    category: 'youtube-safety',
    level: 1,
    content: 'YouTubeを あんぜんに みるために、やくそくが あります。おうちの ひとと いっしょに みて、よくない どうがを みつけたら すぐに やめましょう。',
    keyPoints: [
      'おうちの ひとと いっしょに みる',
      'じかんを きめて みる',
      'よくない どうがは みない',
      'こまったら すぐに そうだんする'
    ],
    warnings: [
      'こわい どうがは みない',
      'ひとを いじめる どうがは みない',
      'あぶない ことを まねしない',
      'ながく みすぎない'
    ]
  },
  {
    topic: 'コメントきのう',
    category: 'youtube-safety',
    level: 2,
    content: 'YouTubeには コメントを かく きのうが あります。でも、こどもは コメントを かいたり、ひとの コメントを よんだり しないほうが あんぜんです。',
    keyPoints: [
      'コメントは おとなが つかう きのう',
      'しらない ひとの コメントは あぶない',
      'じぶんの なまえや がっこうの ことは かかない',
      'いやな コメントを みたら おとなに つげる'
    ],
    warnings: [
      'コメントで ひとを きずつけない',
      'じぶんの しゃしんや どうがは のせない',
      'あった ことの ない ひととは はなさない'
    ]
  }
];

export const snsContent: DigitalLiteracyData[] = [
  {
    topic: 'SNSってなに？',
    category: 'sns-safety',
    level: 1,
    content: 'SNSは ひとと ひとが つながる サービスです。しゃしんや メッセージを おくったり、ひとの とうこうを みたり できます。でも、こどもには まだ むずかしい サービスです。',
    keyPoints: [
      'ひとと つながる サービス',
      'しゃしんや メッセージを おくれる',
      'こどもには まだ はやい',
      'おとなに なってから つかう'
    ],
    examples: [
      'LINE、Instagram、Twitter（X）',
      'Facebook、TikTok',
      'どれも おとなの サービス'
    ]
  },
  {
    topic: 'なぜ こどもには あぶないの？',
    category: 'sns-safety',
    level: 2,
    content: 'SNSは とても べんりですが、あぶない ことも あります。しらない ひとが ちかづいてきたり、いじめが おこったり、じぶんの じょうほうが ひろがったり します。',
    keyPoints: [
      'しらない ひとが ちかづいてくる',
      'いじめが おこりやすい',
      'じょうほうが ひろがって しまう',
      'いちど おくった ものは けせない'
    ],
    warnings: [
      'しらない ひとと はなさない',
      'しゃしんを かってに おくらない',
      'ひとの わるぐちは かかない',
      'こまったら すぐに おとなに そうだんする'
    ]
  },
  {
    topic: 'みらいの ために',
    category: 'sns-safety',
    level: 2,
    content: 'おとなに なったら SNSを つかう ひが くるかも しれません。そのときの ために、いまから ただしい つかいかたを べんきょうして おきましょう。',
    keyPoints: [
      'おとなに なったら つかえる',
      'ただしい つかいかたを まなぶ',
      'ひとに やさしく する',
      'じぶんを まもる ちからを つける'
    ],
    examples: [
      'れいぎただしく はなす',
      'ひとを たいせつに する',
      'うその じょうほうに だまされない',
      'じぶんで かんがえて こうどうする'
    ]
  }
];

export class DigitalLiteracyQuestionGenerator {
  // インターネットリテラシー問題
  static generateInternetLiteracy(): Question[] {
    const questions: Question[] = [];
    
    digitalLiteracyContent.forEach((content, index) => {
      // 理解度チェック問題
      questions.push({
        id: `internet-literacy-${index}`,
        type: 'japanese',
        subtype: 'digital-literacy-reading',
        question: `つぎの ぶんしょうを よんで、だいじな ポイントを かくにんしましょう`,
        correctAnswer: 'よみました',
        options: ['よみました', 'まだです', 'むずかしいです', 'わからない'],
        visualAid: {
          type: 'digital-literacy-display',
          content: {
            topic: content.topic,
            content: content.content,
            keyPoints: content.keyPoints,
            category: content.category,
            examples: content.examples,
            warnings: content.warnings
          },
          position: 'top'
        },
        points: 10
      });

      // キーポイント確認問題
      if (content.keyPoints.length > 0) {
        questions.push({
          id: `internet-key-${index}`,
          type: 'japanese',
          subtype: 'digital-literacy-quiz',
          question: `${content.topic}で いちばん たいせつな ことは？`,
          options: [
            content.keyPoints[0],
            'なんでも じゆうに つかう',
            'はやく おぼえる',
            'ともだちに おしえる'
          ],
          correctAnswer: content.keyPoints[0],
          visualAid: {
            type: 'digital-literacy-quiz-display',
            content: {
              topic: content.topic,
              keyPoints: content.keyPoints,
              correctPoint: content.keyPoints[0]
            },
            position: 'top'
          },
          points: 15
        });
      }
    });

    return this.shuffleArray(questions).slice(0, 6);
  }

  // YouTube安全利用問題
  static generateYoutubeLiteracy(): Question[] {
    const questions: Question[] = [];
    
    youtubeContent.forEach((content, index) => {
      questions.push({
        id: `youtube-literacy-${index}`,
        type: 'japanese',
        subtype: 'digital-literacy-reading',
        question: `YouTubeについて べんきょうしましょう`,
        correctAnswer: 'べんきょうしました',
        options: ['べんきょうしました', 'もういちど', 'わからない', 'むずかしい'],
        visualAid: {
          type: 'digital-literacy-display',
          content: {
            topic: content.topic,
            content: content.content,
            keyPoints: content.keyPoints,
            category: content.category,
            examples: content.examples,
            warnings: content.warnings
          },
          position: 'top'
        },
        points: 10
      });

      // 安全利用クイズ
      if (content.warnings && content.warnings.length > 0) {
        questions.push({
          id: `youtube-safety-${index}`,
          type: 'japanese',
          subtype: 'digital-literacy-quiz',
          question: `YouTubeで きをつけることは？`,
          options: [
            content.warnings[0],
            'なんでも みる',
            'ひとりで みる',
            'いちにちじゅう みる'
          ],
          correctAnswer: content.warnings[0],
          visualAid: {
            type: 'digital-literacy-quiz-display',
            content: {
              topic: content.topic,
              keyPoints: content.keyPoints,
              correctPoint: content.warnings[0]
            },
            position: 'top'
          },
          points: 20
        });
      }
    });

    return this.shuffleArray(questions).slice(0, 6);
  }

  // SNS安全利用問題
  static generateSNSLiteracy(): Question[] {
    const questions: Question[] = [];
    
    snsContent.forEach((content, index) => {
      questions.push({
        id: `sns-literacy-${index}`,
        type: 'japanese',
        subtype: 'digital-literacy-reading',
        question: `SNSについて べんきょうしましょう`,
        correctAnswer: 'べんきょうしました',
        options: ['べんきょうしました', 'もういちど', 'わからない', 'あとで'],
        visualAid: {
          type: 'digital-literacy-display',
          content: {
            topic: content.topic,
            content: content.content,
            keyPoints: content.keyPoints,
            category: content.category,
            examples: content.examples,
            warnings: content.warnings
          },
          position: 'top'
        },
        points: 10
      });

      // 危険認識問題
      if (content.warnings && content.warnings.length > 0) {
        questions.push({
          id: `sns-danger-${index}`,
          type: 'japanese',
          subtype: 'digital-literacy-quiz',
          question: `SNSで きけんな ことは？`,
          options: [
            content.warnings[0],
            'たのしく つかう',
            'ともだちと はなす',
            'しゃしんを みる'
          ],
          correctAnswer: content.warnings[0],
          visualAid: {
            type: 'digital-literacy-quiz-display',
            content: {
              topic: content.topic,
              keyPoints: content.keyPoints,
              correctPoint: content.warnings[0]
            },
            position: 'top'
          },
          points: 25
        });
      }
    });

    return this.shuffleArray(questions).slice(0, 6);
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'internet-literacy':
        return this.generateInternetLiteracy();
      case 'youtube-literacy':
        return this.generateYoutubeLiteracy();
      case 'sns-literacy':
        return this.generateSNSLiteracy();
      default:
        return this.generateInternetLiteracy();
    }
  }

  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

// デジタルリテラシー用視覚化関数
export const generateDigitalLiteracyVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // デジタルリテラシー読み物表示
  if (question.visualAid.type === 'digital-literacy-display') {
    const { topic, content, keyPoints, category, examples, warnings } = question.visualAid.content as {
      topic: string;
      content: string;
      keyPoints: string[];
      category: string;
      examples?: string[];
      warnings?: string[];
    };

    const categoryColors = {
      'internet-safety': 'from-blue-50 to-cyan-50',
      'youtube-safety': 'from-red-50 to-pink-50',
      'sns-safety': 'from-green-50 to-emerald-50',
      'digital-citizenship': 'from-purple-50 to-violet-50'
    };

    const categoryEmojis = {
      'internet-safety': '🌐',
      'youtube-safety': '📺',
      'sns-safety': '💬',
      'digital-citizenship': '👨‍💻'
    };

    return `
      <div class="bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors] || 'from-gray-50 to-gray-100'} rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-6">
          <div class="text-6xl mb-3">${categoryEmojis[category as keyof typeof categoryEmojis] || '📱'}</div>
          <div class="text-2xl font-bold text-gray-800 mb-2">${topic}</div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-inner mb-6">
          <div class="text-lg leading-relaxed text-gray-800">
            ${content}
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner mb-4">
          <div class="text-center mb-3">
            <div class="text-lg font-bold text-blue-600">たいせつな ポイント</div>
          </div>
          <div class="space-y-2">
            ${keyPoints.map(point => `
              <div class="flex items-start gap-3 p-2">
                <div class="text-blue-500 text-xl">✓</div>
                <div class="text-gray-800 flex-1">${point}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        ${examples ? `
        <div class="bg-green-100 rounded-xl p-4 shadow-inner mb-4">
          <div class="text-center mb-3">
            <div class="text-lg font-bold text-green-600">れい</div>
          </div>
          <div class="space-y-1">
            ${examples.map(example => `
              <div class="text-gray-800 text-center py-1">${example}</div>
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        ${warnings ? `
        <div class="bg-yellow-100 rounded-xl p-4 shadow-inner">
          <div class="text-center mb-3">
            <div class="text-lg font-bold text-orange-600">⚠️ ちゅうい</div>
          </div>
          <div class="space-y-2">
            ${warnings.map(warning => `
              <div class="flex items-start gap-3 p-2">
                <div class="text-orange-500 text-xl">⚠️</div>
                <div class="text-gray-800 flex-1">${warning}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        <div class="text-center mt-6 bg-blue-100 rounded-xl p-3 shadow-inner">
          <div class="text-lg text-gray-700">よく よんで おぼえよう</div>
        </div>
      </div>
    `;
  }

  // クイズ表示
  if (question.visualAid.type === 'digital-literacy-quiz-display') {
    const { topic, keyPoints, correctPoint } = question.visualAid.content as {
      topic: string;
      keyPoints: string[];
      correctPoint: string;
    };

    return `
      <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-4xl mb-3">🤔</div>
          <div class="text-xl font-bold text-indigo-600">${topic} クイズ</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner mb-4">
          <div class="text-center mb-3">
            <div class="text-lg font-bold text-purple-600">おもいだそう</div>
          </div>
          <div class="space-y-2">
            ${keyPoints.slice(0, 3).map(point => `
              <div class="bg-purple-100 rounded-lg p-2 text-center text-gray-800">
                ${point}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="text-center bg-indigo-100 rounded-xl p-3 shadow-inner">
          <div class="text-lg text-gray-700">ただしい こたえを えらんでね</div>
        </div>
      </div>
    `;
  }

  return '';
};