import { Question } from '@/types';

export interface KanjiData {
  character: string;
  readings: {
    onyomi: string[];
    kunyomi: string[];
  };
  meanings: string[];
  strokeCount: number;
  grade: number;
  examples: {
    word: string;
    reading: string;
    meaning: string;
  }[];
  radicals: string[];
  image?: string;
  strokeOrder?: string[];
}

// 1年生の教育漢字（80字）- 最重要な基礎漢字
export const grade1Kanji: KanjiData[] = [
  // 数字・基本概念
  {
    character: '一',
    readings: { onyomi: ['イチ', 'イツ'], kunyomi: ['ひと', 'ひと.つ'] },
    meanings: ['one', 'いち'],
    strokeCount: 1,
    grade: 1,
    examples: [
      { word: '一つ', reading: 'ひとつ', meaning: 'ひとつ' },
      { word: '一人', reading: 'ひとり', meaning: 'ひとりの人' }
    ],
    radicals: ['一'],
    image: '1️⃣'
  },
  {
    character: '二',
    readings: { onyomi: ['ニ'], kunyomi: ['ふた', 'ふた.つ'] },
    meanings: ['two', 'に'],
    strokeCount: 2,
    grade: 1,
    examples: [
      { word: '二つ', reading: 'ふたつ', meaning: 'ふたつ' },
      { word: '二人', reading: 'ふたり', meaning: 'ふたりの人' }
    ],
    radicals: ['二'],
    image: '2️⃣'
  },
  {
    character: '三',
    readings: { onyomi: ['サン'], kunyomi: ['みっ.つ', 'み'] },
    meanings: ['three', 'さん'],
    strokeCount: 3,
    grade: 1,
    examples: [
      { word: '三つ', reading: 'みっつ', meaning: 'みっつ' },
      { word: '三人', reading: 'さんにん', meaning: 'さんにんの人' }
    ],
    radicals: ['三'],
    image: '3️⃣'
  },
  // 自然・身近なもの
  {
    character: '日',
    readings: { onyomi: ['ニチ', 'ジツ'], kunyomi: ['ひ', 'か'] },
    meanings: ['sun', 'day', 'ひ'],
    strokeCount: 4,
    grade: 1,
    examples: [
      { word: '太陽', reading: 'たいよう', meaning: 'たいよう' },
      { word: '今日', reading: 'きょう', meaning: 'きょう' }
    ],
    radicals: ['日'],
    image: '☀️'
  },
  {
    character: '月',
    readings: { onyomi: ['ゲツ', 'ガツ'], kunyomi: ['つき'] },
    meanings: ['moon', 'month', 'つき'],
    strokeCount: 4,
    grade: 1,
    examples: [
      { word: '月', reading: 'つき', meaning: 'つき' },
      { word: '一月', reading: 'いちがつ', meaning: 'いちがつ' }
    ],
    radicals: ['月'],
    image: '🌙'
  },
  {
    character: '火',
    readings: { onyomi: ['カ'], kunyomi: ['ひ', 'ほ'] },
    meanings: ['fire', 'ひ'],
    strokeCount: 4,
    grade: 1,
    examples: [
      { word: '火', reading: 'ひ', meaning: 'ひ' },
      { word: '火曜日', reading: 'かようび', meaning: 'かようび' }
    ],
    radicals: ['火'],
    image: '🔥'
  },
  {
    character: '水',
    readings: { onyomi: ['スイ'], kunyomi: ['みず'] },
    meanings: ['water', 'みず'],
    strokeCount: 4,
    grade: 1,
    examples: [
      { word: '水', reading: 'みず', meaning: 'みず' },
      { word: '水曜日', reading: 'すいようび', meaning: 'すいようび' }
    ],
    radicals: ['水'],
    image: '💧'
  },
  {
    character: '木',
    readings: { onyomi: ['ボク', 'モク'], kunyomi: ['き'] },
    meanings: ['tree', 'wood', 'き'],
    strokeCount: 4,
    grade: 1,
    examples: [
      { word: '木', reading: 'き', meaning: 'き' },
      { word: '木曜日', reading: 'もくようび', meaning: 'もくようび' }
    ],
    radicals: ['木'],
    image: '🌳'
  },
  {
    character: '金',
    readings: { onyomi: ['キン', 'コン'], kunyomi: ['かね', 'かな'] },
    meanings: ['gold', 'metal', 'money', 'きん'],
    strokeCount: 8,
    grade: 1,
    examples: [
      { word: 'お金', reading: 'おかね', meaning: 'おかね' },
      { word: '金曜日', reading: 'きんようび', meaning: 'きんようび' }
    ],
    radicals: ['金'],
    image: '🪙'
  },
  {
    character: '土',
    readings: { onyomi: ['ド', 'ト'], kunyomi: ['つち'] },
    meanings: ['earth', 'soil', 'つち'],
    strokeCount: 3,
    grade: 1,
    examples: [
      { word: '土', reading: 'つち', meaning: 'つち' },
      { word: '土曜日', reading: 'どようび', meaning: 'どようび' }
    ],
    radicals: ['土'],
    image: '🌍'
  },
  // 人・体
  {
    character: '人',
    readings: { onyomi: ['ジン', 'ニン'], kunyomi: ['ひと'] },
    meanings: ['person', 'people', 'ひと'],
    strokeCount: 2,
    grade: 1,
    examples: [
      { word: '人', reading: 'ひと', meaning: 'ひと' },
      { word: '大人', reading: 'おとな', meaning: 'おとな' }
    ],
    radicals: ['人'],
    image: '👤'
  },
  {
    character: '口',
    readings: { onyomi: ['コウ', 'ク'], kunyomi: ['くち'] },
    meanings: ['mouth', 'opening', 'くち'],
    strokeCount: 3,
    grade: 1,
    examples: [
      { word: '口', reading: 'くち', meaning: 'くち' },
      { word: '入口', reading: 'いりぐち', meaning: 'いりぐち' }
    ],
    radicals: ['口'],
    image: '👄'
  },
  {
    character: '手',
    readings: { onyomi: ['シュ'], kunyomi: ['て'] },
    meanings: ['hand', 'て'],
    strokeCount: 4,
    grade: 1,
    examples: [
      { word: '手', reading: 'て', meaning: 'て' },
      { word: '右手', reading: 'みぎて', meaning: 'みぎて' }
    ],
    radicals: ['手'],
    image: '✋'
  }
];

// 2年生の重要漢字（抜粋）
export const grade2Kanji: KanjiData[] = [
  {
    character: '学',
    readings: { onyomi: ['ガク'], kunyomi: ['まな.ぶ'] },
    meanings: ['study', 'learning', 'がく'],
    strokeCount: 8,
    grade: 2,
    examples: [
      { word: '学校', reading: 'がっこう', meaning: 'がっこう' },
      { word: '勉強', reading: 'べんきょう', meaning: 'べんきょう' }
    ],
    radicals: ['学'],
    image: '🎓'
  },
  {
    character: '校',
    readings: { onyomi: ['コウ'], kunyomi: [] },
    meanings: ['school', 'こう'],
    strokeCount: 10,
    grade: 2,
    examples: [
      { word: '学校', reading: 'がっこう', meaning: 'がっこう' },
      { word: '小学校', reading: 'しょうがっこう', meaning: 'しょうがっこう' }
    ],
    radicals: ['木'],
    image: '🏫'
  },
  {
    character: '年',
    readings: { onyomi: ['ネン'], kunyomi: ['とし'] },
    meanings: ['year', 'ねん'],
    strokeCount: 6,
    grade: 2,
    examples: [
      { word: '今年', reading: 'ことし', meaning: 'ことし' },
      { word: '一年生', reading: 'いちねんせい', meaning: 'いちねんせい' }
    ],
    radicals: ['年'],
    image: '📅'
  }
];

export class KanjiQuestionGenerator {
  // 1年生漢字レベル1: 数字と基本概念
  static generateKanjiGrade1Level1(): Question[] {
    const questions: Question[] = [];
    const basicKanji = grade1Kanji.slice(0, 6); // 一二三日月火
    
    basicKanji.forEach((kanji, index) => {
      // 漢字認識問題
      questions.push({
        id: `kanji-g1-1-${index}`,
        type: 'japanese',
        subtype: 'kanji-recognition',
        question: `この漢字を読んでください`,
        correctAnswer: kanji.readings.kunyomi[0] || kanji.readings.onyomi[0],
        visualAid: {
          type: 'kanji-with-meaning',
          content: {
            character: kanji.character,
            meanings: kanji.meanings,
            strokeCount: kanji.strokeCount,
            image: kanji.image,
            examples: kanji.examples.slice(0, 2)
          },
          position: 'top'
        },
        points: 25
      });

      // 意味理解問題
      questions.push({
        id: `kanji-meaning-g1-1-${index}`,
        type: 'japanese',
        subtype: 'kanji-meaning',
        question: `「${kanji.character}」の意味として正しいものを選んでください`,
        correctAnswer: kanji.meanings[0],
        options: [kanji.meanings[0], '間違い1', '間違い2', '間違い3'],
        visualAid: {
          type: 'kanji-with-meaning',
          content: {
            character: kanji.character,
            strokeCount: kanji.strokeCount,
            image: kanji.image,
            hideAnswer: true
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  // 1年生漢字レベル2: 自然・身近なもの
  static generateKanjiGrade1Level2(): Question[] {
    const questions: Question[] = [];
    const natureKanji = grade1Kanji.slice(3, 10); // 日月火水木金土
    
    natureKanji.forEach((kanji, index) => {
      // 漢字書き問題
      questions.push({
        id: `kanji-write-g1-2-${index}`,
        type: 'japanese',
        subtype: 'kanji-writing',
        question: `「${kanji.readings.kunyomi[0] || kanji.readings.onyomi[0]}」を漢字で書いてください`,
        correctAnswer: kanji.character,
        visualAid: {
          type: 'kanji-stroke-guide',
          content: {
            reading: kanji.readings.kunyomi[0] || kanji.readings.onyomi[0],
            strokeCount: kanji.strokeCount,
            radicals: kanji.radicals,
            image: kanji.image,
            hint: `${kanji.strokeCount}画の漢字です`
          },
          position: 'top'
        },
        points: 30
      });
    });

    return this.shuffleArray(questions).slice(0, 8);
  }

  // 1年生漢字レベル3: 人・体
  static generateKanjiGrade1Level3(): Question[] {
    const questions: Question[] = [];
    const bodyKanji = grade1Kanji.slice(10); // 人口手
    
    bodyKanji.forEach((kanji, index) => {
      // 漢字熟語問題
      questions.push({
        id: `kanji-compound-g1-3-${index}`,
        type: 'japanese',
        subtype: 'kanji-compound',
        question: `「${kanji.examples[0].word}」の読み方を選んでください`,
        correctAnswer: kanji.examples[0].reading,
        options: [
          kanji.examples[0].reading,
          'ダミー1',
          'ダミー2',
          'ダミー3'
        ],
        visualAid: {
          type: 'kanji-compound-display',
          content: {
            word: kanji.examples[0].word,
            meaning: kanji.examples[0].meaning,
            character: kanji.character,
            image: kanji.image
          },
          position: 'top'
        },
        points: 35
      });
    });

    return this.shuffleArray(questions).slice(0, 6);
  }

  // 2年生漢字レベル1: 学校生活
  static generateKanjiGrade2Level1(): Question[] {
    const questions: Question[] = [];
    
    grade2Kanji.forEach((kanji, index) => {
      questions.push({
        id: `kanji-g2-1-${index}`,
        type: 'japanese',
        subtype: 'kanji-recognition',
        question: `この漢字を読んでください`,
        correctAnswer: kanji.readings.kunyomi[0] || kanji.readings.onyomi[0],
        visualAid: {
          type: 'kanji-with-meaning',
          content: {
            character: kanji.character,
            meanings: kanji.meanings,
            strokeCount: kanji.strokeCount,
            image: kanji.image,
            examples: kanji.examples
          },
          position: 'top'
        },
        points: 30
      });
    });

    return this.shuffleArray(questions);
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'japanese-kanji-g1-1':
        return this.generateKanjiGrade1Level1();
      case 'japanese-kanji-g1-2':
        return this.generateKanjiGrade1Level2();
      case 'japanese-kanji-g1-3':
        return this.generateKanjiGrade1Level3();
      case 'japanese-kanji-g2-1':
        return this.generateKanjiGrade2Level1();
      default:
        return this.generateKanjiGrade1Level1();
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

// 漢字学習用視覚化関数
export const generateKanjiVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // 漢字+意味表示
  if (question.visualAid.type === 'kanji-with-meaning') {
    const { character, meanings, strokeCount, image, examples, hideAnswer } = question.visualAid.content as {
      character: string;
      meanings?: string[];
      strokeCount: number;
      image?: string;
      examples?: any[];
      hideAnswer?: boolean;
    };

    return `
      <div class="bg-orange-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">漢字を覚えよう！</div>
        
        <div class="flex items-center justify-center gap-8 mb-6">
          ${image ? `
          <div class="bg-white rounded-xl p-4 shadow-lg border-4 border-orange-200">
            <div class="text-6xl text-center animate-bounce-in">
              ${image}
            </div>
          </div>
          ` : ''}
          
          <div class="text-center">
            <div class="bg-white rounded-xl p-6 shadow-lg border-4 border-red-200 mb-4">
              <div class="text-8xl font-bold text-red-800 mb-2">${character}</div>
              <div class="text-sm text-gray-600">${strokeCount}画</div>
            </div>
          </div>
        </div>
        
        ${!hideAnswer && meanings ? `
        <div class="text-center mb-4">
          <div class="text-lg text-gray-700 mb-2">
            <strong>意味:</strong> ${meanings.join('、')}
          </div>
        </div>
        ` : ''}
        
        ${!hideAnswer && examples ? `
        <div class="bg-white rounded-xl p-4 shadow-lg">
          <div class="text-center text-md font-bold text-gray-700 mb-3">使い方の例</div>
          <div class="grid grid-cols-1 gap-2">
            ${examples.map(ex => `
              <div class="text-center p-2 bg-gray-50 rounded-lg">
                <span class="text-lg font-bold text-blue-800">${ex.word}</span>
                <span class="text-md text-gray-600 ml-2">(${ex.reading})</span>
                <div class="text-sm text-gray-500">${ex.meaning}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        <div class="text-center mt-4 text-sm text-gray-500">
          カタカナで覚えた直線を使って、漢字を書いてみよう！
        </div>
      </div>
    `;
  }

  // 筆順ガイド表示
  if (question.visualAid.type === 'kanji-stroke-guide') {
    const { reading, strokeCount, radicals, hint, image } = question.visualAid.content as {
      reading: string;
      strokeCount: number;
      radicals: string[];
      hint: string;
      image?: string;
    };

    return `
      <div class="bg-green-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">漢字を書いてみよう！</div>
        
        <div class="flex items-center justify-center gap-6 mb-6">
          ${image ? `
          <div class="bg-white rounded-xl p-4 shadow-lg border-4 border-green-200">
            <div class="text-6xl text-center animate-bounce-in">
              ${image}
            </div>
          </div>
          ` : ''}
          
          <div class="text-center">
            <div class="text-3xl font-bold text-green-800 mb-2">「${reading}」</div>
            <div class="text-lg text-gray-600">${hint}</div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-lg">
          <div class="text-center mb-3">
            <div class="text-md font-bold text-gray-700">部首のヒント</div>
            <div class="text-lg text-blue-700">${radicals.join('、')}</div>
          </div>
          
          <div class="grid grid-cols-1 gap-2 mt-4">
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-sm text-gray-600">書き順を意識して、丁寧に書いてみましょう</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 熟語表示
  if (question.visualAid.type === 'kanji-compound-display') {
    const { word, meaning, character, image } = question.visualAid.content as {
      word: string;
      meaning: string;
      character: string;
      image?: string;
    };

    return `
      <div class="bg-purple-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">漢字の組み合わせを読もう！</div>
        
        <div class="flex items-center justify-center gap-6 mb-6">
          ${image ? `
          <div class="bg-white rounded-xl p-4 shadow-lg border-4 border-purple-200">
            <div class="text-6xl text-center animate-bounce-in">
              ${image}
            </div>
          </div>
          ` : ''}
          
          <div class="bg-white rounded-xl p-6 shadow-lg border-4 border-purple-200">
            <div class="text-6xl font-bold text-purple-800 text-center">${word}</div>
          </div>
        </div>
        
        <div class="text-center mb-4">
          <div class="text-lg text-gray-700">
            <strong>意味:</strong> ${meaning}
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-500">
          この漢字の組み合わせをどう読むか選んでください
        </div>
      </div>
    `;
  }

  return '';
};