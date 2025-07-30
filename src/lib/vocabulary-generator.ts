import { Question } from '@/types';

// 語彙力強化問題用データ
export interface VocabularyData {
  word: string;
  meaning: string;
  category: 'opposite' | 'classification' | 'description' | 'emotion' | 'action';
  level: number;
  example?: string;
  relatedWords?: string[];
}

export const vocabularyDatabase: VocabularyData[] = [
  // 反対語レベル1（基本的な対義語）
  { word: 'おおきい', meaning: 'ちいさい', category: 'opposite', level: 1, example: 'ぞうはおおきい、ありはちいさい' },
  { word: 'たかい', meaning: 'ひくい', category: 'opposite', level: 1, example: 'やまはたかい、のはらはひくい' },
  { word: 'あつい', meaning: 'つめたい', category: 'opposite', level: 1, example: 'おちゃはあつい、こおりはつめたい' },
  { word: 'はやい', meaning: 'おそい', category: 'opposite', level: 1, example: 'うさぎははやい、かめはおそい' },
  { word: 'あかるい', meaning: 'くらい', category: 'opposite', level: 1, example: 'ひるまはあかるい、よるはくらい' },
  { word: 'ながい', meaning: 'みじかい', category: 'opposite', level: 1, example: 'へびはながい、ねずみはみじかい' },

  // 仲間分けレベル1（動物）
  { word: 'いぬ', meaning: 'どうぶつ', category: 'classification', level: 1, relatedWords: ['ねこ', 'うさぎ', 'ぞう'] },
  { word: 'ねこ', meaning: 'どうぶつ', category: 'classification', level: 1, relatedWords: ['いぬ', 'うさぎ', 'とら'] },
  { word: 'りんご', meaning: 'くだもの', category: 'classification', level: 1, relatedWords: ['みかん', 'バナナ', 'いちご'] },
  { word: 'にんじん', meaning: 'やさい', category: 'classification', level: 1, relatedWords: ['キャベツ', 'たまねぎ', 'だいこん'] },

  // 感情・様子の表現レベル1
  { word: 'うれしい', meaning: 'よろこんでいる', category: 'emotion', level: 1, example: 'プレゼントをもらってうれしい' },
  { word: 'かなしい', meaning: 'なみだがでる', category: 'emotion', level: 1, example: 'ともだちとわかれてかなしい' },
  { word: 'おこる', meaning: 'きぶんがわるい', category: 'emotion', level: 1, example: 'やくそくをやぶられておこる' },
  { word: 'こまる', meaning: 'どうしていいかわからない', category: 'emotion', level: 1, example: 'みちにまよってこまる' }
];

export class VocabularyQuestionGenerator {
  // レベル1: 基本的な反対語
  static generateVocabularyLevel1(): Question[] {
    const questions: Question[] = [];
    const oppositeWords = vocabularyDatabase.filter(w => w.category === 'opposite' && w.level === 1);

    oppositeWords.forEach((wordData, index) => {
      // 反対語を答える問題
      questions.push({
        id: `vocab-opposite-${index}`,
        type: 'japanese',
        subtype: 'vocabulary-opposite',
        question: `「${wordData.word}」のはんたいのことばは？`,
        options: [
          wordData.meaning,
          oppositeWords[(index + 1) % oppositeWords.length].meaning,
          oppositeWords[(index + 2) % oppositeWords.length].meaning,
          oppositeWords[(index + 3) % oppositeWords.length].meaning
        ],
        correctAnswer: wordData.meaning,
        visualAid: {
          type: 'vocabulary-opposite-display',
          content: {
            word: wordData.word,
            opposite: wordData.meaning,
            example: wordData.example,
            showExample: true
          },
          position: 'top'
        },
        points: 15
      });

      // 例文から適切な言葉を選ぶ問題
      if (wordData.example) {
        const exampleQuestion = wordData.example.replace(wordData.word, '？');
        questions.push({
          id: `vocab-context-${index}`,
          type: 'japanese',
          subtype: 'vocabulary-context',
          question: `ぶんの「？」にはいることばは？\n「${exampleQuestion}」`,
          options: [
            wordData.word,
            wordData.meaning,
            oppositeWords[(index + 1) % oppositeWords.length].word,
            oppositeWords[(index + 2) % oppositeWords.length].word
          ],
          correctAnswer: wordData.word,
          visualAid: {
            type: 'vocabulary-context-display',
            content: {
              sentence: exampleQuestion,
              word: wordData.word,
              meaning: wordData.meaning
            },
            position: 'top'
          },
          points: 20
        });
      }
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  // レベル2: 仲間分け・分類
  static generateVocabularyLevel2(): Question[] {
    const questions: Question[] = [];
    const classificationWords = vocabularyDatabase.filter(w => w.category === 'classification' && w.level === 1);

    // 仲間分け問題を作成
    const categories = [
      {
        name: 'どうぶつ',
        words: ['いぬ', 'ねこ', 'うさぎ', 'ぞう'],
        otherWords: ['りんご', 'みかん', 'にんじん', 'くつ']
      },
      {
        name: 'くだもの',
        words: ['りんご', 'みかん', 'バナナ', 'いちご'],
        otherWords: ['いぬ', 'ねこ', 'にんじん', 'くつ']
      },
      {
        name: 'やさい',
        words: ['にんじん', 'キャベツ', 'たまねぎ', 'だいこん'],
        otherWords: ['りんご', 'みかん', 'いぬ', 'くつ']
      },
      {
        name: 'のりもの',
        words: ['でんしゃ', 'バス', 'じどうしゃ', 'ひこうき'],
        otherWords: ['りんご', 'いぬ', 'にんじん', 'くつ']
      }
    ];

    categories.forEach((category, categoryIndex) => {
      // この仲間に属する言葉を選ぶ問題
      const correctWord = category.words[0];
      const wrongOptions = category.otherWords.slice(0, 3);
      
      questions.push({
        id: `vocab-classification-${categoryIndex}`,
        type: 'japanese',
        subtype: 'vocabulary-classification',
        question: `「${category.name}」のなかまはどれ？`,
        options: [correctWord, ...wrongOptions],
        correctAnswer: correctWord,
        visualAid: {
          type: 'vocabulary-classification-display',
          content: {
            category: category.name,
            examples: category.words,
            correctWord: correctWord
          },
          position: 'top'
        },
        points: 20
      });

      // 仲間外れを見つける問題
      const mixedWords = [...category.words.slice(0, 3), category.otherWords[0]];
      const shuffledMixed = this.shuffleArray(mixedWords);
      
      questions.push({
        id: `vocab-odd-one-out-${categoryIndex}`,
        type: 'japanese',
        subtype: 'vocabulary-classification',
        question: `このなかで なかまはずれは どれ？`,
        options: shuffledMixed,
        correctAnswer: category.otherWords[0],
        visualAid: {
          type: 'vocabulary-odd-out-display',
          content: {
            words: shuffledMixed,
            category: category.name,
            oddWord: category.otherWords[0]
          },
          position: 'top'
        },
        points: 25
      });
    });

    return this.shuffleArray(questions).slice(0, 8);
  }

  // レベル3: 感情・表現力向上
  static generateVocabularyLevel3(): Question[] {
    const questions: Question[] = [];
    const emotionWords = vocabularyDatabase.filter(w => w.category === 'emotion' && w.level === 1);

    emotionWords.forEach((wordData, index) => {
      // 気持ちを表す言葉問題
      questions.push({
        id: `vocab-emotion-${index}`,
        type: 'japanese',
        subtype: 'vocabulary-emotion',
        question: `「${wordData.meaning}」きもちをあらわすことばは？`,
        options: [
          wordData.word,
          emotionWords[(index + 1) % emotionWords.length].word,
          emotionWords[(index + 2) % emotionWords.length].word,
          emotionWords[(index + 3) % emotionWords.length].word
        ],
        correctAnswer: wordData.word,
        visualAid: {
          type: 'vocabulary-emotion-display',
          content: {
            emotion: wordData.word,
            meaning: wordData.meaning,
            example: wordData.example,
            emoji: this.getEmotionEmoji(wordData.word)
          },
          position: 'top'
        },
        points: 25
      });

      // 場面に適した表現問題
      if (wordData.example) {
        questions.push({
          id: `vocab-situation-${index}`,
          type: 'japanese',
          subtype: 'vocabulary-emotion',
          question: `「${wordData.example}」このときのきもちは？`,
          options: [
            wordData.word,
            emotionWords[(index + 1) % emotionWords.length].word,
            emotionWords[(index + 2) % emotionWords.length].word,
            'わからない'
          ],
          correctAnswer: wordData.word,
          visualAid: {
            type: 'vocabulary-situation-display',
            content: {
              situation: wordData.example,
              emotion: wordData.word,
              emoji: this.getEmotionEmoji(wordData.word)
            },
            position: 'top'
          },
          points: 30
        });
      }
    });

    // より高度な表現問題
    const advancedExpressions = [
      { situation: 'ともだちがたすけてくれた', feeling: 'ありがたい', options: ['ありがたい', 'うれしい', 'かなしい', 'おこる'] },
      { situation: 'しらないばしょにいった', feeling: 'ふあん', options: ['ふあん', 'うれしい', 'たのしい', 'げんき'] },
      { situation: 'がんばってできた', feeling: 'ほこらしい', options: ['ほこらしい', 'かなしい', 'おこる', 'こまる'] }
    ];

    advancedExpressions.forEach((expr, index) => {
      questions.push({
        id: `vocab-advanced-${index}`,
        type: 'japanese',
        subtype: 'vocabulary-emotion',
        question: `「${expr.situation}」このときのきもちは？`,
        options: expr.options,
        correctAnswer: expr.feeling,
        visualAid: {
          type: 'vocabulary-situation-display',
          content: {
            situation: expr.situation,
            emotion: expr.feeling,
            emoji: this.getEmotionEmoji(expr.feeling)
          },
          position: 'top'
        },
        points: 35
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  private static getEmotionEmoji(emotion: string): string {
    const emojiMap: { [key: string]: string } = {
      'うれしい': '😊',
      'かなしい': '😢',
      'おこる': '😠',
      'こまる': '😟',
      'ありがたい': '🙏',
      'ふあん': '😰',
      'ほこらしい': '😤',
      'たのしい': '😄',
      'げんき': '💪'
    };
    return emojiMap[emotion] || '😊';
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'vocabulary-level-1':
        return this.generateVocabularyLevel1();
      case 'vocabulary-level-2':
        return this.generateVocabularyLevel2();
      case 'vocabulary-level-3':
        return this.generateVocabularyLevel3();
      default:
        return this.generateVocabularyLevel1();
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

// 語彙力強化用視覚化関数
export const generateVocabularyVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // 反対語表示
  if (question.visualAid.type === 'vocabulary-opposite-display') {
    const { word, opposite, example, showExample } = question.visualAid.content as {
      word: string;
      opposite: string;
      example: string;
      showExample: boolean;
    };

    return `
      <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-2xl font-bold text-purple-600 mb-2">はんたいのことば</div>
        </div>
        
        <div class="flex items-center justify-center gap-6 mb-4">
          <div class="bg-white rounded-xl p-4 shadow-lg text-center">
            <div class="text-2xl font-bold text-blue-600">${word}</div>
          </div>
          
          <div class="text-4xl text-gray-400">↔️</div>
          
          <div class="bg-white rounded-xl p-4 shadow-lg text-center">
            <div class="text-2xl font-bold text-red-600">？</div>
          </div>
        </div>
        
        ${showExample && example ? `
        <div class="bg-yellow-100 rounded-xl p-4 shadow-inner">
          <div class="text-center">
            <div class="text-sm font-bold text-orange-600 mb-2">れい</div>
            <div class="text-lg text-gray-800">${example}</div>
          </div>
        </div>
        ` : ''}
        
        <div class="text-center mt-4 text-sm text-gray-600">
          はんたいの いみの ことばを えらんでね
        </div>
      </div>
    `;
  }

  // 文脈問題表示
  if (question.visualAid.type === 'vocabulary-context-display') {
    const { sentence, word, meaning } = question.visualAid.content as {
      sentence: string;
      word: string;
      meaning: string;
    };

    return `
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-xl font-bold text-green-600 mb-2">ぶんのなかの ことば</div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-inner mb-4">
          <div class="text-lg text-gray-800 text-center leading-relaxed">
            ${sentence.replace('？', '<span class="bg-yellow-200 px-2 py-1 rounded font-bold text-red-600">？</span>')}
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-600">
          「？」に はいる ことばを えらんでね
        </div>
      </div>
    `;
  }

  // 分類問題表示
  if (question.visualAid.type === 'vocabulary-classification-display') {
    const { category, examples, correctWord } = question.visualAid.content as {
      category: string;
      examples: string[];
      correctWord: string;
    };

    return `
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-2xl font-bold text-blue-600 mb-2">${category}</div>
          <div class="text-sm text-gray-600">のなかま</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner mb-4">
          <div class="text-center mb-3">
            <div class="text-lg font-bold text-cyan-600">れい</div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            ${examples.slice(1).map(example => `
              <div class="bg-cyan-100 rounded-lg p-2 text-center">
                <div class="text-gray-800">${example}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-600">
          ${category}の なかまを えらんでね
        </div>
      </div>
    `;
  }

  // 仲間外れ表示
  if (question.visualAid.type === 'vocabulary-odd-out-display') {
    const { words, category, oddWord } = question.visualAid.content as {
      words: string[];
      category: string;
      oddWord: string;
    };

    return `
      <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-xl font-bold text-orange-600 mb-2">なかまはずれ</div>
          <div class="text-sm text-gray-600">ちがう ものを みつけよう</div>
        </div>
        
        <div class="grid grid-cols-2 gap-3 mb-4">
          ${words.map(word => `
            <div class="bg-white rounded-xl p-4 shadow-lg text-center">
              <div class="text-lg font-bold text-gray-800">${word}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="text-center text-sm text-gray-600">
          1つだけ ちがう ものが あります
        </div>
      </div>
    `;
  }

  // 感情表現表示
  if (question.visualAid.type === 'vocabulary-emotion-display') {
    const { emotion, meaning, example, emoji } = question.visualAid.content as {
      emotion: string;
      meaning: string;
      example: string;
      emoji: string;
    };

    return `
      <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-3">${emoji}</div>
          <div class="text-xl font-bold text-pink-600">きもちの ことば</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner mb-4">
          <div class="text-center">
            <div class="text-lg text-gray-800 mb-2">${meaning}</div>
            <div class="text-sm text-gray-600">↓</div>
            <div class="text-2xl font-bold text-pink-600">？</div>
          </div>
        </div>
        
        ${example ? `
        <div class="bg-yellow-100 rounded-xl p-3 shadow-inner">
          <div class="text-center text-sm text-gray-700">${example}</div>
        </div>
        ` : ''}
        
        <div class="text-center mt-4 text-sm text-gray-600">
          この きもちを あらわす ことばは？
        </div>
      </div>
    `;
  }

  // 場面・状況表示
  if (question.visualAid.type === 'vocabulary-situation-display') {
    const { situation, emotion, emoji } = question.visualAid.content as {
      situation: string;
      emotion: string;
      emoji: string;
    };

    return `
      <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-xl font-bold text-indigo-600 mb-2">この ばめんでは？</div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-inner mb-4">
          <div class="text-center">
            <div class="text-lg text-gray-800 mb-4">${situation}</div>
            <div class="text-6xl">${emoji}</div>
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-600">
          どんな きもちに なる？
        </div>
      </div>
    `;
  }

  return '';
};