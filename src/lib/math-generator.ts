import { Question } from '@/types';

export class MathQuestionGenerator {
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
    
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
      const num2 = Math.floor(Math.random() * 90) + 10; // 10-99
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
      case 'math-addition-1':
        return this.generateAdditionLevel1();
      case 'math-addition-2':
        return this.generateAdditionLevel2();
      case 'math-addition-3':
        return this.generateAdditionLevel3();
      case 'math-subtraction-1':
        return this.generateSubtractionLevel1();
      case 'math-subtraction-2':
        return this.generateSubtractionLevel2();
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

export const generateMathProblemVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
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
          ${num1} + ${num2} = ${result}
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
          ${num1} - ${num2} = ${result}
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