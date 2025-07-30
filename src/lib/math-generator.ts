import { Question } from '@/types';
import { NumbersQuestionGenerator } from './numbers-generator';

export class MathQuestionGenerator {
  // 繰り上がりの足し算（1年生2学期の最重要単元）
  static generateCarryAddition(): Question[] {
    const questions: Question[] = [];
    
    // さくらんぼ計算を使った繰り上がり問題
    const carryProblems = [
      { a: 9, b: 2 }, { a: 9, b: 3 }, { a: 9, b: 4 }, { a: 9, b: 5 },
      { a: 8, b: 3 }, { a: 8, b: 4 }, { a: 8, b: 5 }, { a: 8, b: 6 },
      { a: 7, b: 4 }, { a: 7, b: 5 }, { a: 7, b: 6 }, { a: 7, b: 7 },
      { a: 6, b: 5 }, { a: 6, b: 6 }, { a: 6, b: 7 }, { a: 6, b: 8 }
    ];

    carryProblems.forEach((prob, index) => {
      const result = prob.a + prob.b;
      const complement = 10 - prob.a; // 10にするために必要な数
      const remaining = prob.b - complement; // 残りの数
      
      questions.push({
        id: `carry-add-${index}`,
        type: 'math',
        subtype: 'carry-addition',
        question: `${prob.a} + ${prob.b} = 〇`,
        correctAnswer: result.toString(),
        visualAid: {
          type: 'carry-addition-sakura',
          content: { 
            a: prob.a, 
            b: prob.b, 
            complement: complement,
            remaining: remaining,
            result 
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 12);
  }

  // 繰り下がりの引き算（1年生2学期の最重要単元）
  static generateBorrowSubtraction(): Question[] {
    const questions: Question[] = [];
    
    // 繰り下がりの引き算問題
    const borrowProblems = [
      { a: 11, b: 2 }, { a: 11, b: 3 }, { a: 11, b: 4 }, { a: 11, b: 5 },
      { a: 12, b: 3 }, { a: 12, b: 4 }, { a: 12, b: 5 }, { a: 12, b: 6 },
      { a: 13, b: 4 }, { a: 13, b: 5 }, { a: 13, b: 6 }, { a: 13, b: 7 },
      { a: 14, b: 5 }, { a: 14, b: 6 }, { a: 14, b: 7 }, { a: 14, b: 8 }
    ];

    borrowProblems.forEach((prob, index) => {
      const result = prob.a - prob.b;
      const onesA = prob.a % 10;
      const tensA = Math.floor(prob.a / 10);
      
      questions.push({
        id: `borrow-sub-${index}`,
        type: 'math',
        subtype: 'borrow-subtraction',
        question: `${prob.a} - ${prob.b} = 〇`,
        correctAnswer: result.toString(),
        visualAid: {
          type: 'borrow-subtraction-blocks',
          content: { 
            a: prob.a,
            b: prob.b,
            onesA: onesA,
            tensA: tensA,
            result 
          },
          position: 'top'
        },
        points: 25
      });
    });

    return this.shuffleArray(questions).slice(0, 12);
  }

  static generateAdditionLevel1(): Question[] {
    const questions: Question[] = [];
    
    // Generate 12 addition problems with visual dot support (like 2+3=5 shown as ●●+●●●=●●●●●)
    for (let i = 0; i < 12; i++) {
      const num1 = Math.floor(Math.random() * 4) + 1; // 1-4
      const num2 = Math.floor(Math.random() * 4) + 1; // 1-4
      const result = num1 + num2;
      
      // Only show result placeholder for level 1 to keep it simple
      const questionText = `${num1} + ${num2} = 〇`;
      const correctAnswer = result.toString();

      questions.push({
        id: `math-add-1-${i}`,
        type: 'math',
        subtype: 'addition-visual',
        question: questionText,
        correctAnswer,
        visualAid: {
          type: 'addition-dots',
          content: { num1, num2, result },
          position: 'top'
        },
        points: 10
      });
    }

    return this.shuffleArray(questions);
  }

  static generateAdditionLevel2(): Question[] {
    const questions: Question[] = [];
    
    // Generate addition problems without visual support (numbers only)
    for (let i = 0; i < 12; i++) {
      const num1 = Math.floor(Math.random() * 8) + 1; // 1-8
      const num2 = Math.floor(Math.random() * 8) + 1; // 1-8
      const result = num1 + num2;
      
      // Add more variety in placeholder positions
      const placeholderPos = Math.random() < 0.3 ? 'left' : Math.random() < 0.5 ? 'right' : 'result';
      
      let questionText = '';
      let correctAnswer = '';
      
      if (placeholderPos === 'left') {
        questionText = `〇 + ${num2} = ${result}`;
        correctAnswer = num1.toString();
      } else if (placeholderPos === 'right') {
        questionText = `${num1} + 〇 = ${result}`;
        correctAnswer = num2.toString();
      } else {
        questionText = `${num1} + ${num2} = 〇`;
        correctAnswer = result.toString();
      }

      questions.push({
        id: `math-add-2-${i}`,
        type: 'math',
        subtype: 'addition',
        question: questionText,
        correctAnswer,
        points: 15
      });
    }

    return this.shuffleArray(questions);
  }

  static generateAdditionLevel3(): Question[] {
    const questions: Question[] = [];
    
    // 二桁の足し算（繰り上がりなし）
    for (let i = 0; i < 12; i++) {
      let num1, num2;
      do {
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        num2 = Math.floor(Math.random() * 90) + 10; // 10-99
      } while ((num1 % 10) + (num2 % 10) >= 10 || Math.floor(num1 / 10) + Math.floor(num2 / 10) >= 10); // 繰り上がりなし
      
      const result = num1 + num2;
      
      questions.push({
        id: `math-add-3-${i}`,
        type: 'math',
        subtype: 'addition',
        question: `${num1} + ${num2} = 〇`,
        correctAnswer: result.toString(),
        points: 25
      });
    }

    return this.shuffleArray(questions);
  }

  static generateAdditionLevel4(): Question[] {
    const questions: Question[] = [];
    
    // 二桁の足し算（繰り上がりあり）
    for (let i = 0; i < 12; i++) {
      let num1, num2;
      do {
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99  
        num2 = Math.floor(Math.random() * 90) + 10; // 10-99
      } while ((num1 % 10) + (num2 % 10) < 10); // 繰り上がりありに限定
      
      const result = num1 + num2;
      
      questions.push({
        id: `math-add-4-${i}`,
        type: 'math',
        subtype: 'addition',
        question: `${num1} + ${num2} = 〇`,
        correctAnswer: result.toString(),
        points: 30
      });
    }

    return this.shuffleArray(questions);
  }

  static generateAdditionLevel5(): Question[] {
    const questions: Question[] = [];
    
    // 三桁の足し算（繰り上がりなし）
    for (let i = 0; i < 10; i++) {
      let num1, num2;
      do {
        num1 = Math.floor(Math.random() * 900) + 100; // 100-999
        num2 = Math.floor(Math.random() * 900) + 100; // 100-999
      } while (
        (num1 % 10) + (num2 % 10) >= 10 || 
        (Math.floor(num1 / 10) % 10) + (Math.floor(num2 / 10) % 10) >= 10 ||
        Math.floor(num1 / 100) + Math.floor(num2 / 100) >= 10
      ); // 全ての桁で繰り上がりなし
      
      const result = num1 + num2;
      
      questions.push({
        id: `math-add-5-${i}`,
        type: 'math',
        subtype: 'addition',
        question: `${num1} + ${num2} = 〇`,
        correctAnswer: result.toString(),
        points: 35
      });
    }

    return this.shuffleArray(questions);
  }

  static generateAdditionLevel6(): Question[] {
    const questions: Question[] = [];
    
    // 三桁の足し算（繰り上がりあり）
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 900) + 100; // 100-999
      const num2 = Math.floor(Math.random() * 900) + 100; // 100-999
      const result = num1 + num2;
      
      questions.push({
        id: `math-add-6-${i}`,
        type: 'math',
        subtype: 'addition',
        question: `${num1} + ${num2} = 〇`,
        correctAnswer: result.toString(),
        points: 40
      });
    }

    return this.shuffleArray(questions);
  }

  static generateSubtractionLevel1(): Question[] {
    const questions: Question[] = [];
    
    // Generate 12 subtraction problems with visual support (like 5-2=3 shown as ●●●●●-●●=●●●)
    for (let i = 0; i < 12; i++) {
      const num1 = Math.floor(Math.random() * 5) + 3; // 3-7 (to ensure positive results)
      const num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // 1 to num1-1
      const result = num1 - num2;
      
      // Only show result placeholder for level 1 to keep it simple
      const questionText = `${num1} - ${num2} = 〇`;
      const correctAnswer = result.toString();

      questions.push({
        id: `math-sub-1-${i}`,
        type: 'math',
        subtype: 'subtraction-visual',
        question: questionText,
        correctAnswer,
        visualAid: {
          type: 'subtraction-dots',
          content: { num1, num2, result },
          position: 'top'
        },
        points: 12
      });
    }

    return this.shuffleArray(questions);
  }

  // Add subtraction level 2 without visual support
  static generateSubtractionLevel2(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 12; i++) {
      const num1 = Math.floor(Math.random() * 15) + 5; // 5-19
      const num2 = Math.floor(Math.random() * num1) + 1; // 1 to num1
      const result = num1 - num2;
      
      const placeholderPos = Math.random() < 0.3 ? 'left' : Math.random() < 0.5 ? 'right' : 'result';
      
      let questionText = '';
      let correctAnswer = '';
      
      if (placeholderPos === 'left') {
        questionText = `〇 - ${num2} = ${result}`;
        correctAnswer = num1.toString();
      } else if (placeholderPos === 'right') {
        questionText = `${num1} - 〇 = ${result}`;
        correctAnswer = num2.toString();
      } else {
        questionText = `${num1} - ${num2} = 〇`;
        correctAnswer = result.toString();
      }

      questions.push({
        id: `math-sub-2-${i}`,
        type: 'math',
        subtype: 'subtraction',
        question: questionText,
        correctAnswer,
        points: 18
      });
    }

    return this.shuffleArray(questions);
  }

  static generateSubtractionLevel3(): Question[] {
    const questions: Question[] = [];
    
    // 二桁の引き算（繰り下がりなし）
    for (let i = 0; i < 12; i++) {
      let num1, num2;
      do {
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        num2 = Math.floor(Math.random() * 90) + 10; // 10-99
      } while (num1 <= num2 || (num1 % 10) < (num2 % 10) || Math.floor(num1 / 10) < Math.floor(num2 / 10)); // 繰り下がりなし
      
      const result = num1 - num2;
      
      questions.push({
        id: `math-sub-3-${i}`,
        type: 'math',
        subtype: 'subtraction',
        question: `${num1} - ${num2} = 〇`,
        correctAnswer: result.toString(),
        points: 25
      });
    }

    return this.shuffleArray(questions);
  }

  static generateSubtractionLevel4(): Question[] {
    const questions: Question[] = [];
    
    // 二桁の引き算（繰り下がりあり）
    for (let i = 0; i < 12; i++) {
      let num1, num2;
      do {
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        num2 = Math.floor(Math.random() * 90) + 10; // 10-99
      } while (num1 <= num2 || (num1 % 10) >= (num2 % 10)); // 繰り下がりありに限定
      
      const result = num1 - num2;
      
      questions.push({
        id: `math-sub-4-${i}`,
        type: 'math',
        subtype: 'subtraction',
        question: `${num1} - ${num2} = 〇`,
        correctAnswer: result.toString(),
        points: 30
      });
    }

    return this.shuffleArray(questions);
  }

  static generateSubtractionLevel5(): Question[] {
    const questions: Question[] = [];
    
    // 三桁の引き算（繰り下がりなし）
    for (let i = 0; i < 10; i++) {
      let num1, num2;
      do {
        num1 = Math.floor(Math.random() * 900) + 100; // 100-999
        num2 = Math.floor(Math.random() * 900) + 100; // 100-999
      } while (
        num1 <= num2 ||
        (num1 % 10) < (num2 % 10) ||
        (Math.floor(num1 / 10) % 10) < (Math.floor(num2 / 10) % 10) ||
        Math.floor(num1 / 100) < Math.floor(num2 / 100)
      ); // 全ての桁で繰り下がりなし
      
      const result = num1 - num2;
      
      questions.push({
        id: `math-sub-5-${i}`,
        type: 'math',
        subtype: 'subtraction',
        question: `${num1} - ${num2} = 〇`,
        correctAnswer: result.toString(),
        points: 35
      });
    }

    return this.shuffleArray(questions);
  }

  static generateSubtractionLevel6(): Question[] {
    const questions: Question[] = [];
    
    // 三桁の引き算（繰り下がりあり）
    for (let i = 0; i < 10; i++) {
      let num1, num2;
      do {
        num1 = Math.floor(Math.random() * 900) + 100; // 100-999
        num2 = Math.floor(Math.random() * 900) + 100; // 100-999
      } while (num1 <= num2);
      
      const result = num1 - num2;
      
      questions.push({
        id: `math-sub-6-${i}`,
        type: 'math',
        subtype: 'subtraction',
        question: `${num1} - ${num2} = 〇`,
        correctAnswer: result.toString(),
        points: 40
      });
    }

    return this.shuffleArray(questions);
  }

  static generateMultiplicationLevel1(): Question[] {
    const questions: Question[] = [];
    const tables = [2, 3, 4, 5]; // Start with easier tables
    
    // Create reading patterns for kuku
    const kukuReadings = {
      1: ['いちいちがいち', 'いちにがに', 'いちさんがさん', 'いちしがし', 'いちごがご', 'いちろくがろく', 'いちしちがしち', 'いちはちがはち', 'いちくがく'],
      2: ['にいちがに', 'ににんがし', 'にさんがろく', 'にしがはち', 'にごがじゅう', 'にろくがじゅうに', 'にしちがじゅうし', 'にはちがじゅうろく', 'にくがじゅうはち'],
      3: ['さんいちがさん', 'さんにがろく', 'さざんがく', 'さんしがじゅうに', 'さんごがじゅうご', 'さぶろくがじゅうはち', 'さんしちがにじゅういち', 'さんぱがにじゅうし', 'さんくがにじゅうなな'],
      4: ['しいちがし', 'しにがはち', 'しさんがじゅうに', 'ししがじゅうろく', 'しごがにじゅう', 'しろくがにじゅうし', 'ししちがにじゅうはち', 'しはちがさんじゅうに', 'しくがさんじゅうろく'],
      5: ['ごいちがご', 'ごにがじゅう', 'ごさんがじゅうご', 'ごしがにじゅう', 'ごごがにじゅうご', 'ごろくがさんじゅう', 'ごしちがさんじゅうご', 'ごはちがよんじゅう', 'ごくがよんじゅうご']
    };
    
    for (let i = 0; i < 15; i++) {
      const table = tables[Math.floor(Math.random() * tables.length)];
      const multiplier = Math.floor(Math.random() * 9) + 1; // 1-9
      const result = table * multiplier;
      
      const placeholderPos = Math.random() < 0.3 ? 'left' : 'result';
      
      let questionText = '';
      let correctAnswer = '';
      
      if (placeholderPos === 'left') {
        questionText = `〇 × ${multiplier} = ${result}`;
        correctAnswer = table.toString();
      } else {
        questionText = `${table} × ${multiplier} = 〇`;
        correctAnswer = result.toString();
      }

      // Get the kuku reading
      const reading = kukuReadings[table as keyof typeof kukuReadings]?.[multiplier - 1] || '';

      questions.push({
        id: `math-mul-1-${i}`,
        type: 'math',
        subtype: 'multiplication',
        question: questionText,
        correctAnswer,
        visualAid: {
          type: 'kuku-reading',
          content: {
            table,
            multiplier,
            reading,
            pronunciation: reading
          },
          position: 'bottom'
        },
        points: 25
      });
    }

    return this.shuffleArray(questions);
  }

  static generateDivisionLevel1(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 10; i++) {
      const divisor = Math.floor(Math.random() * 5) + 2; // 2-6
      const quotient = Math.floor(Math.random() * 8) + 1; // 1-8
      const dividend = divisor * quotient;
      
      questions.push({
        id: `math-div-1-${i}`,
        type: 'math',
        subtype: 'division',
        question: `${dividend} ÷ ${divisor} = 〇`,
        correctAnswer: quotient.toString(),
        points: 30
      });
    }

    return this.shuffleArray(questions);
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'math-numbers-1':
      case 'math-numbers-2':
      case 'math-numbers-3':
        return NumbersQuestionGenerator.generateQuestionsByLevelId(levelId);
      case 'math-carry-addition':
        return this.generateCarryAddition();
      case 'math-borrow-subtraction':
        return this.generateBorrowSubtraction();
      case 'math-addition-1':
        return this.generateAdditionLevel1();
      case 'math-addition-2':
        return this.generateAdditionLevel2();
      case 'math-addition-3':
        return this.generateAdditionLevel3();
      case 'math-addition-4':
        return this.generateAdditionLevel4();
      case 'math-addition-5':
        return this.generateAdditionLevel5();
      case 'math-addition-6':
        return this.generateAdditionLevel6();
      case 'math-subtraction-1':
        return this.generateSubtractionLevel1();
      case 'math-subtraction-2':
        return this.generateSubtractionLevel2();
      case 'math-subtraction-3':
        return this.generateSubtractionLevel3();
      case 'math-subtraction-4':
        return this.generateSubtractionLevel4();
      case 'math-subtraction-5':
        return this.generateSubtractionLevel5();
      case 'math-subtraction-6':
        return this.generateSubtractionLevel6();
      case 'math-multiplication-1':
        return this.generateMultiplicationLevel1();
      case 'math-division-1':
        return this.generateDivisionLevel1();
      default:
        return this.generateAdditionLevel1();
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

import { generateNumbersVisual } from './numbers-generator';

export const generateMathProblemVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // 数理解問題の視覚化
  const numbersVisualTypes = ['counting-dots', 'number-display', 'number-sequence', 'place-value-teens', 'number-comparison', 'tens-visualization', 'place-value-blocks'];
  if (numbersVisualTypes.includes(question.visualAid.type)) {
    return generateNumbersVisual(question);
  }

  // さくらんぼ計算による繰り上がりの視覚化
  if (question.visualAid.type === 'carry-addition-sakura') {
    const { a, b, complement, remaining, result } = question.visualAid.content as { 
      a: number; b: number; complement: number; remaining: number; result: number 
    };
    
    return `
      <div class="bg-pink-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">🌸 さくらんぼ計算でやってみよう！</div>
        <div class="space-y-4">
          <div class="text-center text-2xl font-bold text-gray-800">
            ${a} + ${b} = ?
          </div>
          
          <div class="flex justify-center items-center gap-4">
            <div class="bg-white rounded-xl p-4 shadow-lg border-2 border-pink-200">
              <div class="text-lg font-bold text-center mb-2">${a}</div>
              <div class="flex gap-1 justify-center">
                ${Array(a).fill(0).map(() => '<div class="w-4 h-4 bg-blue-500 rounded-full"></div>').join('')}
              </div>
            </div>
            
            <div class="text-2xl font-bold text-gray-600">+</div>
            
            <div class="bg-white rounded-xl p-4 shadow-lg border-2 border-pink-200">
              <div class="text-lg font-bold text-center mb-2">${b}</div>
              <div class="space-y-2">
                <div class="text-sm text-pink-600 text-center">${complement} + ${remaining}</div>
                <div class="flex gap-1 justify-center">
                  ${Array(complement).fill(0).map(() => '<div class="w-4 h-4 bg-pink-500 rounded-full"></div>').join('')}
                  <div class="w-1"></div>
                  ${Array(remaining).fill(0).map(() => '<div class="w-4 h-4 bg-green-500 rounded-full"></div>').join('')}
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center">
            <div class="inline-block bg-yellow-100 rounded-xl p-4 border-2 border-yellow-300">
              <div class="text-sm text-gray-600 mb-2">${a} + ${complement} = 10</div>
              <div class="text-sm text-gray-600 mb-2">10 + ${remaining} = ${result}</div>
              <div class="text-xl font-bold text-yellow-800">答え: ${result}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 繰り下がりの引き算の視覚化
  if (question.visualAid.type === 'borrow-subtraction-blocks') {
    const { a, b, onesA, tensA, result } = question.visualAid.content as { 
      a: number; b: number; onesA: number; tensA: number; result: number 
    };
    
    return `
      <div class="bg-orange-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">🧮 10のかたまりから借りよう！</div>
        <div class="space-y-4">
          <div class="text-center text-2xl font-bold text-gray-800">
            ${a} - ${b} = ?
          </div>
          
          <div class="flex justify-center gap-6">
            <div class="bg-white rounded-xl p-4 shadow-lg border-2 border-orange-200">
              <div class="text-lg font-bold text-center mb-2">${a}</div>
              <div class="space-y-2">
                <div class="text-sm text-center text-gray-600">10のかたまり: ${tensA}個</div>
                <div class="flex gap-1 justify-center">
                  ${Array(tensA).fill(0).map(() => '<div class="w-8 h-6 bg-blue-500 rounded border-2 border-blue-700 flex items-center justify-center text-white text-xs font-bold">10</div>').join('')}
                </div>
                <div class="text-sm text-center text-gray-600">ばらの数: ${onesA}個</div>
                <div class="flex gap-1 justify-center">
                  ${Array(onesA).fill(0).map(() => '<div class="w-4 h-4 bg-green-500 rounded-full"></div>').join('')}
                </div>
              </div>
            </div>
            
            <div class="text-2xl font-bold text-gray-600">-</div>
            
            <div class="bg-white rounded-xl p-4 shadow-lg border-2 border-red-200">
              <div class="text-lg font-bold text-center mb-2">${b}</div>
              <div class="flex gap-1 justify-center">
                ${Array(b).fill(0).map(() => '<div class="w-4 h-4 bg-red-500 rounded-full"></div>').join('')}
              </div>
            </div>
          </div>
          
          <div class="text-center">
            <div class="inline-block bg-yellow-100 rounded-xl p-4 border-2 border-yellow-300">
              <div class="text-sm text-gray-600 mb-2">10のかたまりから10個借りて...</div>
              <div class="text-sm text-gray-600 mb-2">${onesA + 10} - ${b} = ${result}</div>
              <div class="text-xl font-bold text-orange-800">答え: ${result}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Handle addition with dots visual (2+3=5 → ●●+●●●=●●●●●)
  if (question.visualAid.type === 'addition-dots') {
    const { num1, num2, result } = question.visualAid.content as { num1: number; num2: number; result: number };
    
    let dots1Html = '';
    let dots2Html = '';
    let resultDotsHtml = '';
    
    // Generate dots for first number (blue)
    for (let i = 0; i < num1; i++) {
      dots1Html += `<div class="w-6 h-6 bg-blue-500 rounded-full shadow-md animate-bounce-in" style="animation-delay: ${i * 0.1}s"></div>`;
    }
    
    // Generate dots for second number (green)
    for (let i = 0; i < num2; i++) {
      dots2Html += `<div class="w-6 h-6 bg-green-500 rounded-full shadow-md animate-bounce-in" style="animation-delay: ${(i + num1) * 0.1}s"></div>`;
    }
    
    // Generate dots for result (orange)
    for (let i = 0; i < result; i++) {
      resultDotsHtml += `<div class="w-6 h-6 bg-orange-500 rounded-full shadow-md animate-bounce-in" style="animation-delay: ${(i + num1 + num2) * 0.1 + 0.5}s"></div>`;
    }
    
    return `
      <div class="bg-yellow-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">●の数で計算してみよう！</div>
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="flex flex-wrap gap-1 justify-center p-3 bg-blue-100 rounded-xl">
            ${dots1Html}
          </div>
          <div class="text-3xl font-bold text-gray-600">+</div>
          <div class="flex flex-wrap gap-1 justify-center p-3 bg-green-100 rounded-xl">
            ${dots2Html}
          </div>
          <div class="text-3xl font-bold text-gray-600">=</div>
          <div class="flex flex-wrap gap-1 justify-center p-3 bg-orange-100 rounded-xl">
            ${resultDotsHtml}
          </div>
        </div>
        <div class="text-center text-sm text-gray-600">
          ${num1} + ${num2} = 〇
        </div>
      </div>
    `;
  }

  // Handle subtraction with dots visual (5-2=3 → ●●●●● → ❌❌●●● = ●●●)
  if (question.visualAid.type === 'subtraction-dots') {
    const { num1, num2, result } = question.visualAid.content as { num1: number; num2: number; result: number };
    
    let originalDotsHtml = '';
    let subtractedDotsHtml = '';
    let resultDotsHtml = '';
    
    // Generate original dots (blue)
    for (let i = 0; i < num1; i++) {
      originalDotsHtml += `<div class="w-6 h-6 bg-blue-500 rounded-full shadow-md animate-bounce-in" style="animation-delay: ${i * 0.1}s"></div>`;
    }
    
    // Generate subtracted visualization (some crossed out)
    for (let i = 0; i < num1; i++) {
      if (i < num2) {
        subtractedDotsHtml += `<div class="relative w-6 h-6">
          <div class="w-6 h-6 bg-red-300 rounded-full shadow-md"></div>
          <div class="absolute inset-0 flex items-center justify-center text-red-700 font-bold text-lg">×</div>
        </div>`;
      } else {
        subtractedDotsHtml += `<div class="w-6 h-6 bg-blue-500 rounded-full shadow-md animate-bounce-in" style="animation-delay: ${(i + 2) * 0.1}s"></div>`;
      }
    }
    
    // Generate result dots (green)
    for (let i = 0; i < result; i++) {
      resultDotsHtml += `<div class="w-6 h-6 bg-green-500 rounded-full shadow-md animate-bounce-in" style="animation-delay: ${(i + num1 + 2) * 0.1 + 0.5}s"></div>`;
    }
    
    return `
      <div class="bg-yellow-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">●の数で計算してみよう！</div>
        <div class="space-y-4">
          <div class="flex items-center justify-center gap-4">
            <div class="text-sm text-gray-600">はじめ:</div>
            <div class="flex flex-wrap gap-1 justify-center p-3 bg-blue-100 rounded-xl">
              ${originalDotsHtml}
            </div>
          </div>
          <div class="flex items-center justify-center gap-4">
            <div class="text-sm text-gray-600">${num2}こ取ると:</div>
            <div class="flex flex-wrap gap-1 justify-center p-3 bg-gray-100 rounded-xl">
              ${subtractedDotsHtml}
            </div>
          </div>
          <div class="flex items-center justify-center gap-4">
            <div class="text-sm text-gray-600">残り:</div>
            <div class="flex flex-wrap gap-1 justify-center p-3 bg-green-100 rounded-xl">
              ${resultDotsHtml}
            </div>
          </div>
        </div>
        <div class="text-center text-sm text-gray-600 mt-4">
          ${num1} - ${num2} = 〇
        </div>
      </div>
    `;
  }

  // Handle kuku reading visual
  if (question.visualAid.type === 'kuku-reading') {
    const { table, multiplier, reading } = question.visualAid.content as { table: number; multiplier: number; reading: string };
    
    return `
      <div class="bg-purple-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-purple-700 mb-4">🗣️ 九九の読み方</div>
        <div class="text-center">
          <div class="text-3xl font-bold text-purple-800 mb-2">${table} × ${multiplier}</div>
          <div class="text-xl text-purple-600 mb-2">「${reading}」</div>
          <div class="text-sm text-gray-600">${table}の段</div>
        </div>
      </div>
    `;
  }

  // Fallback for old dot system
  if (question.visualAid.type === 'dots') {
    const numDots = question.visualAid.content as number;
    let dotsHtml = '';
    
    for (let i = 0; i < numDots; i++) {
      dotsHtml += `<div class="w-8 h-8 bg-blue-400 rounded-full shadow-md animate-bounce-in" style="animation-delay: ${i * 0.1}s"></div>`;
    }

    return `<div class="flex flex-wrap gap-2 justify-center mb-4 p-4 bg-blue-50 rounded-xl">${dotsHtml}</div>`;
  }

  return '';
};