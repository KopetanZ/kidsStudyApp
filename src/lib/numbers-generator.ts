import { Question } from '@/types';

export class NumbersQuestionGenerator {
  // 1-10の数理解問題
  static generateNumbersLevel1(): Question[] {
    const questions: Question[] = [];
    
    // 数の認識問題（1-10）
    for (let i = 1; i <= 10; i++) {
      // 数を数える問題
      questions.push({
        id: `numbers-count-${i}`,
        type: 'math',
        subtype: 'number-recognition',
        question: `●の数を数えてください`,
        correctAnswer: i.toString(),
        visualAid: {
          type: 'counting-dots',
          content: { count: i, maxCount: 10 },
          position: 'top'
        },
        points: 5
      });

      // 数字の読み方問題
      questions.push({
        id: `numbers-read-${i}`,
        type: 'math',
        subtype: 'number-reading',
        question: `この数字を読んでください`,
        correctAnswer: i.toString(),
        visualAid: {
          type: 'number-display',
          content: { number: i, showDots: true },
          position: 'top'
        },
        points: 5
      });
    }

    // 数の順序問題
    for (let i = 1; i <= 8; i++) {
      questions.push({
        id: `numbers-sequence-${i}`,
        type: 'math',
        subtype: 'number-sequence',
        question: `${i}の次の数は何ですか？`,
        correctAnswer: (i + 1).toString(),
        visualAid: {
          type: 'number-sequence',
          content: { current: i, showNext: false },
          position: 'top'
        },
        points: 8
      });
    }

    return this.shuffleArray(questions).slice(0, 15);
  }

  // 1-20の数理解問題
  static generateNumbersLevel2(): Question[] {
    const questions: Question[] = [];
    
    // 11-20の特別な読み方に注目
    for (let i = 11; i <= 20; i++) {
      // 10の位と1の位の理解
      questions.push({
        id: `numbers-teens-${i}`,
        type: 'math',
        subtype: 'number-place-value',
        question: `この数字は何ですか？`,
        correctAnswer: i.toString(),
        visualAid: {
          type: 'place-value-teens',
          content: { number: i, showBreakdown: true },
          position: 'top'
        },
        points: 10
      });
    }

    // 大小比較問題
    const comparisons = [
      { a: 5, b: 15 }, { a: 12, b: 8 }, { a: 20, b: 19 },
      { a: 14, b: 17 }, { a: 6, b: 16 }
    ];

    comparisons.forEach((comp, index) => {
      const larger = Math.max(comp.a, comp.b);
      questions.push({
        id: `numbers-compare-${index}`,
        type: 'math',
        subtype: 'number-comparison',
        question: `${comp.a}と${comp.b}、どちらが大きいですか？`,
        correctAnswer: larger.toString(),
        visualAid: {
          type: 'number-comparison',
          content: { numberA: comp.a, numberB: comp.b },
          position: 'top'
        },
        points: 12
      });
    });

    return this.shuffleArray(questions).slice(0, 12);
  }

  // 1-100の数理解問題
  static generateNumbersLevel3(): Question[] {
    const questions: Question[] = [];
    
    // 10の倍数の理解
    const tensNumbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    tensNumbers.forEach((num, index) => {
      questions.push({
        id: `numbers-tens-${num}`,
        type: 'math',
        subtype: 'number-tens',
        question: `この数字は何ですか？`,
        correctAnswer: num.toString(),
        visualAid: {
          type: 'tens-visualization',
          content: { number: num, showTensBlocks: true },
          position: 'top'
        },
        points: 15
      });
    });

    // 2桁数の位の理解
    const twoDigitNumbers = [23, 35, 47, 56, 68, 79, 84, 92];
    twoDigitNumbers.forEach((num, index) => {
      const tens = Math.floor(num / 10);
      const ones = num % 10;
      questions.push({
        id: `numbers-place-${num}`,
        type: 'math',
        subtype: 'place-value',
        question: `${num}は10が何個と1が何個ですか？（10の個数を答えてください）`,
        correctAnswer: tens.toString(),
        visualAid: {
          type: 'place-value-blocks',
          content: { number: num, tens: tens, ones: ones },
          position: 'top'
        },
        points: 18
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'math-numbers-1':
        return this.generateNumbersLevel1();
      case 'math-numbers-2':
        return this.generateNumbersLevel2();
      case 'math-numbers-3':
        return this.generateNumbersLevel3();
      default:
        return this.generateNumbersLevel1();
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

// 数理解用の視覚的サポート関数
export const generateNumbersVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // 数を数える視覚化
  if (question.visualAid.type === 'counting-dots') {
    const { count } = question.visualAid.content as { count: number; maxCount: number };
    let dotsHtml = '';
    
    // 5個ずつ区切って表示
    for (let i = 0; i < count; i++) {
      const color = i < 5 ? 'bg-blue-500' : 'bg-green-500';
      dotsHtml += `<div class="w-8 h-8 ${color} rounded-full shadow-md animate-bounce-in" style="animation-delay: ${i * 0.1}s"></div>`;
    }

    return `
      <div class="bg-yellow-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">●を数えてみよう！</div>
        <div class="flex flex-wrap gap-2 justify-center mb-4 p-4 bg-white rounded-xl">
          ${dotsHtml}
        </div>
        <div class="text-center text-sm text-gray-600">全部で何個ありますか？</div>
      </div>
    `;
  }

  // 数字と●の対応表示
  if (question.visualAid.type === 'number-display') {
    const { number, showDots } = question.visualAid.content as { number: number; showDots: boolean };
    let dotsHtml = '';
    
    if (showDots) {
      for (let i = 0; i < number; i++) {
        dotsHtml += `<div class="w-6 h-6 bg-orange-500 rounded-full shadow-md animate-bounce-in" style="animation-delay: ${i * 0.1}s"></div>`;
      }
    }

    return `
      <div class="bg-blue-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">この数字を読もう！</div>
        <div class="text-center mb-4">
          <div class="text-8xl font-bold text-blue-800 mb-4">${number}</div>
          ${showDots ? `<div class="flex flex-wrap gap-1 justify-center p-3 bg-white rounded-xl">${dotsHtml}</div>` : ''}
        </div>
      </div>
    `;
  }

  // 数の順序表示
  if (question.visualAid.type === 'number-sequence') {
    const { current } = question.visualAid.content as { current: number };
    
    return `
      <div class="bg-green-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">数の順番を覚えよう！</div>
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="text-4xl font-bold text-gray-400">${current - 1 > 0 ? current - 1 : '?'}</div>
          <div class="text-6xl font-bold text-green-800 bg-white rounded-xl p-4 shadow-lg">${current}</div>
          <div class="text-4xl font-bold text-orange-600">?</div>
        </div>
        <div class="text-center text-sm text-gray-600">${current}の次の数は何でしょう？</div>
      </div>
    `;
  }

  // 10代の数の分解表示
  if (question.visualAid.type === 'place-value-teens') {
    const { number } = question.visualAid.content as { number: number };
    const tens = Math.floor(number / 10);
    const ones = number % 10;
    
    return `
      <div class="bg-purple-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">10といくつに分けて考えよう！</div>
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="bg-white rounded-xl p-4 shadow-lg">
            <div class="text-2xl font-bold text-purple-800 mb-2">10</div>
            <div class="grid grid-cols-5 gap-1">
              ${Array(10).fill(0).map(() => '<div class="w-4 h-4 bg-purple-500 rounded-full"></div>').join('')}
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-600">+</div>
          <div class="bg-white rounded-xl p-4 shadow-lg">
            <div class="text-2xl font-bold text-orange-800 mb-2">${ones}</div>
            <div class="grid grid-cols-5 gap-1">
              ${Array(ones).fill(0).map(() => '<div class="w-4 h-4 bg-orange-500 rounded-full"></div>').join('')}
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-600">=</div>
          <div class="text-6xl font-bold text-blue-800 bg-white rounded-xl p-4 shadow-lg">${number}</div>
        </div>
      </div>
    `;
  }

  return '';
};