import { Question } from '@/types';
import { NumbersQuestionGenerator } from './numbers-generator';
import { TimeQuestionGenerator } from './time-generator';
import { ShapeQuestionGenerator } from './shape-generator';

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

  // 掛け算レベル1: 基本の九九（2・3・5の段中心）
  static generateMultiplicationLevel1(): Question[] {
    const questions: Question[] = [];
    const tables = [2, 3, 5]; // 覚えやすい段から開始
    
    // 九九の読み方パターン
    const kukuReadings = this.getKukuReadings();
    
    for (let i = 0; i < 12; i++) {
      const table = tables[Math.floor(Math.random() * tables.length)];
      const multiplier = Math.floor(Math.random() * 5) + 1; // 1-5まで（簡単な範囲）
      const result = table * multiplier;
      
      const questionText = `${table} × ${multiplier} = 〇`;
      const correctAnswer = result.toString();
      const reading = kukuReadings[table]?.[multiplier - 1] || '';

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
            pronunciation: reading,
            description: `${table}の段：${reading}`
          },
          position: 'top'
        },
        points: 20
      });
    }

    return this.shuffleArray(questions);
  }

  // 掛け算レベル2: 九九完全習得（全ての段）
  static generateMultiplicationLevel2(): Question[] {
    const questions: Question[] = [];
    const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 全ての段
    
    const kukuReadings = this.getKukuReadings();
    
    for (let i = 0; i < 15; i++) {
      const table = tables[Math.floor(Math.random() * tables.length)];
      const multiplier = Math.floor(Math.random() * 9) + 1; // 1-9
      const result = table * multiplier;
      
      // たまに逆問題も出題
      const placeholderPos = Math.random() < 0.2 ? 'left' : 'result';
      
      let questionText = '';
      let correctAnswer = '';
      
      if (placeholderPos === 'left') {
        questionText = `〇 × ${multiplier} = ${result}`;
        correctAnswer = table.toString();
      } else {
        questionText = `${table} × ${multiplier} = 〇`;
        correctAnswer = result.toString();
      }

      const reading = kukuReadings[table]?.[multiplier - 1] || '';

      questions.push({
        id: `math-mul-2-${i}`,
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
            pronunciation: reading,
            description: `${table}の段：${reading}`
          },
          position: 'top'
        },
        points: 25
      });
    }

    return this.shuffleArray(questions);
  }

  // 掛け算レベル3: 2桁×1桁の筆算
  static generateMultiplicationLevel3(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 12; i++) {
      const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
      const num2 = Math.floor(Math.random() * 9) + 1; // 1-9
      const result = num1 * num2;
      
      questions.push({
        id: `math-mul-3-${i}`,
        type: 'math',
        subtype: 'multiplication-written',
        question: `${num1} × ${num2} = 〇`,
        correctAnswer: result.toString(),
        visualAid: {
          type: 'written-multiplication',
          content: {
            multiplicand: num1,
            multiplier: num2,
            steps: this.getMultiplicationSteps(num1, num2),
            result
          },
          position: 'top'
        },
        points: 35
      });
    }

    return this.shuffleArray(questions);
  }

  // 掛け算レベル4: 2桁×2桁の筆算
  static generateMultiplicationLevel4(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
      const num2 = Math.floor(Math.random() * 90) + 10; // 10-99
      const result = num1 * num2;
      
      questions.push({
        id: `math-mul-4-${i}`,
        type: 'math',
        subtype: 'multiplication-written',
        question: `${num1} × ${num2} = 〇`,
        correctAnswer: result.toString(),
        visualAid: {
          type: 'written-multiplication-2digit',
          content: {
            multiplicand: num1,
            multiplier: num2,
            steps: this.getMultiplicationSteps2Digit(num1, num2),
            result
          },
          position: 'top'
        },
        points: 50
      });
    }

    return this.shuffleArray(questions);
  }

  // 割り算レベル1: 九九の範囲で割り切れる問題
  static generateDivisionLevel1(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 12; i++) {
      const divisor = Math.floor(Math.random() * 7) + 2; // 2-8
      const quotient = Math.floor(Math.random() * 9) + 1; // 1-9
      const dividend = divisor * quotient;
      
      questions.push({
        id: `math-div-1-${i}`,
        type: 'math',
        subtype: 'division',
        question: `${dividend} ÷ ${divisor} = 〇`,
        correctAnswer: quotient.toString(),
        visualAid: {
          type: 'division-visual',
          content: {
            dividend,
            divisor,
            quotient,
            description: `${dividend}を${divisor}つにわけると？`,
            relatedKuku: `${divisor} × ${quotient} = ${dividend}`
          },
          position: 'top'
        },
        points: 25
      });
    }

    return this.shuffleArray(questions);
  }

  // 割り算レベル2: あまりのある割り算
  static generateDivisionLevel2(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 12; i++) {
      const divisor = Math.floor(Math.random() * 7) + 2; // 2-8
      const quotient = Math.floor(Math.random() * 9) + 1; // 1-9
      const remainder = Math.floor(Math.random() * (divisor - 1)) + 1; // 1 to (divisor-1)
      const dividend = divisor * quotient + remainder;
      
      questions.push({
        id: `math-div-2-${i}`,
        type: 'math',
        subtype: 'division-remainder',
        question: `${dividend} ÷ ${divisor} = 〇 あまり〇`,
        correctAnswer: `${quotient} あまり${remainder}`,
        visualAid: {
          type: 'division-remainder-visual',
          content: {
            dividend,
            divisor,
            quotient,
            remainder,
            description: `${dividend}を${divisor}つにわけると${quotient}つずつ、あまり${remainder}`,
            calculation: `${divisor} × ${quotient} + ${remainder} = ${dividend}`
          },
          position: 'top'
        },
        points: 35
      });
    }

    return this.shuffleArray(questions);
  }

  // 割り算レベル3: 2桁÷1桁の筆算（割り切れる）
  static generateDivisionLevel3(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 10; i++) {
      const divisor = Math.floor(Math.random() * 7) + 2; // 2-8
      const quotient = Math.floor(Math.random() * 9) + 11; // 11-19 (2桁の商)
      const dividend = divisor * quotient;
      
      questions.push({
        id: `math-div-3-${i}`,
        type: 'math',
        subtype: 'division-written',
        question: `${dividend} ÷ ${divisor} = 〇`,
        correctAnswer: quotient.toString(),
        visualAid: {
          type: 'written-division',
          content: {
            dividend,
            divisor,
            quotient,
            steps: this.getDivisionSteps(dividend, divisor),
            description: '筆算で計算しよう'
          },
          position: 'top'
        },
        points: 45
      });
    }

    return this.shuffleArray(questions);
  }

  // 割り算レベル4: 2桁÷1桁の筆算（あまりあり）
  static generateDivisionLevel4(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 10; i++) {
      const divisor = Math.floor(Math.random() * 7) + 2; // 2-8
      const quotient = Math.floor(Math.random() * 9) + 11; // 11-19
      const remainder = Math.floor(Math.random() * (divisor - 1)) + 1;
      const dividend = divisor * quotient + remainder;
      
      questions.push({
        id: `math-div-4-${i}`,
        type: 'math',
        subtype: 'division-written-remainder',
        question: `${dividend} ÷ ${divisor} = 〇 あまり〇`,
        correctAnswer: `${quotient} あまり${remainder}`,
        visualAid: {
          type: 'written-division-remainder',
          content: {
            dividend,
            divisor,
            quotient,
            remainder,
            steps: this.getDivisionStepsWithRemainder(dividend, divisor),
            description: '筆算で計算しよう（あまりあり）'
          },
          position: 'top'
        },
        points: 50
      });
    }

    return this.shuffleArray(questions);
  }

  // ヘルパーメソッド: 九九の読み方データ
  private static getKukuReadings(): Record<number, string[]> {
    return {
      1: ['いちいちがいち', 'いちにがに', 'いちさんがさん', 'いちしがし', 'いちごがご', 'いちろくがろく', 'いちしちがしち', 'いちはちがはち', 'いちくがく'],
      2: ['にいちがに', 'ににんがし', 'にさんがろく', 'にしがはち', 'にごがじゅう', 'にろくがじゅうに', 'にしちがじゅうし', 'にはちがじゅうろく', 'にくがじゅうはち'],
      3: ['さんいちがさん', 'さんにがろく', 'さざんがく', 'さんしがじゅうに', 'さんごがじゅうご', 'さぶろくがじゅうはち', 'さんしちがにじゅういち', 'さんぱがにじゅうし', 'さんくがにじゅうなな'],
      4: ['しいちがし', 'しにがはち', 'しさんがじゅうに', 'ししがじゅうろく', 'しごがにじゅう', 'しろくがにじゅうし', 'ししちがにじゅうはち', 'しはちがさんじゅうに', 'しくがさんじゅうろく'],
      5: ['ごいちがご', 'ごにがじゅう', 'ごさんがじゅうご', 'ごしがにじゅう', 'ごごがにじゅうご', 'ごろくがさんじゅう', 'ごしちがさんじゅうご', 'ごはちがよんじゅう', 'ごくがよんじゅうご'],
      6: ['ろくいちがろく', 'ろくにがじゅうに', 'ろくさんがじゅうはち', 'ろくしがにじゅうし', 'ろくごがさんじゅう', 'ろくろくがさんじゅうろく', 'ろくしちがよんじゅうに', 'ろくはちがよんじゅうはち', 'ろっくがごじゅうし'],
      7: ['しちいちがしち', 'しちにがじゅうし', 'しちさんがにじゅういち', 'しちしがにじゅうはち', 'しちごがさんじゅうご', 'しちろくがよんじゅうに', 'しちしちがよんじゅうく', 'しちはちがごじゅうろく', 'しちくがろくじゅうさん'],
      8: ['はちいちがはち', 'はちにがじゅうろく', 'はちさんがにじゅうし', 'はちしがさんじゅうに', 'はちごがよんじゅう', 'はちろくがよんじゅうはち', 'はちしちがごじゅうろく', 'はちはちがろくじゅうし', 'はっくがしちじゅうに'],
      9: ['くいちがく', 'くにがじゅうはち', 'くさんがにじゅうなな', 'くしがさんじゅうろく', 'くごがよんじゅうご', 'くろくがごじゅうし', 'くしちがろくじゅうさん', 'くはちがしちじゅうに', 'くくがはちじゅういち']
    };
  }

  // ヘルパーメソッド: 掛け算の筆算ステップ（2桁×1桁）
  private static getMultiplicationSteps(multiplicand: number, multiplier: number): Array<{step: string, description: string}> {
    const steps = [];
    const onesDigit = multiplicand % 10;
    const tensDigit = Math.floor(multiplicand / 10);
    
    const onesResult = onesDigit * multiplier;
    const tensResult = tensDigit * multiplier;
    
    steps.push({
      step: `${onesDigit} × ${multiplier} = ${onesResult}`,
      description: '一の位の計算'
    });
    
    steps.push({
      step: `${tensDigit} × ${multiplier} = ${tensResult}`,
      description: '十の位の計算'
    });
    
    steps.push({
      step: `${onesResult} + ${tensResult * 10} = ${multiplicand * multiplier}`,
      description: '答えを合計'
    });
    
    return steps;
  }

  // ヘルパーメソッド: 掛け算の筆算ステップ（2桁×2桁）
  private static getMultiplicationSteps2Digit(multiplicand: number, multiplier: number): Array<{step: string, description: string}> {
    const steps = [];
    const multOnes = multiplier % 10;
    const multTens = Math.floor(multiplier / 10);
    
    const firstLine = multiplicand * multOnes;
    const secondLine = multiplicand * multTens * 10;
    
    steps.push({
      step: `${multiplicand} × ${multOnes} = ${firstLine}`,
      description: '一の位との掛け算'
    });
    
    steps.push({
      step: `${multiplicand} × ${multTens}0 = ${secondLine}`,
      description: '十の位との掛け算'
    });
    
    steps.push({
      step: `${firstLine} + ${secondLine} = ${multiplicand * multiplier}`,
      description: '二つの答えを足す'
    });
    
    return steps;
  }

  // ヘルパーメソッド: 割り算の筆算ステップ
  private static getDivisionSteps(dividend: number, divisor: number): Array<{step: string, description: string}> {
    const steps = [];
    const quotient = Math.floor(dividend / divisor);
    const tensQuotient = Math.floor(quotient / 10);
    const onesQuotient = quotient % 10;
    
    if (tensQuotient > 0) {
      const tensDigit = Math.floor(dividend / 10);
      const tensRemainder = dividend - (tensQuotient * divisor * 10);
      
      steps.push({
        step: `${Math.floor(dividend / 10)} ÷ ${divisor} = ${tensQuotient}`,
        description: '十の位から割る'
      });
      
      steps.push({
        step: `${tensRemainder} ÷ ${divisor} = ${onesQuotient}`,
        description: '残りを一の位で割る'
      });
    } else {
      steps.push({
        step: `${dividend} ÷ ${divisor} = ${quotient}`,
        description: '一の位で割る'
      });
    }
    
    return steps;
  }

  // ヘルパーメソッド: あまりのある割り算の筆算ステップ
  private static getDivisionStepsWithRemainder(dividend: number, divisor: number): Array<{step: string, description: string}> {
    const steps = [];
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    
    steps.push({
      step: `${dividend} ÷ ${divisor} = ${quotient}`,
      description: '割り切れる分を計算'
    });
    
    steps.push({
      step: `${quotient} × ${divisor} = ${quotient * divisor}`,
      description: '確認の掛け算'
    });
    
    steps.push({
      step: `${dividend} - ${quotient * divisor} = ${remainder}`,
      description: 'あまりを計算'
    });
    
    return steps;
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
      case 'math-multiplication-2':
        return this.generateMultiplicationLevel2();
      case 'math-multiplication-3':
        return this.generateMultiplicationLevel3();
      case 'math-multiplication-4':
        return this.generateMultiplicationLevel4();
      case 'math-division-1':
        return this.generateDivisionLevel1();
      case 'math-division-2':
        return this.generateDivisionLevel2();
      case 'math-division-3':
        return this.generateDivisionLevel3();
      case 'math-division-4':
        return this.generateDivisionLevel4();
      case 'time-reading-1':
      case 'time-reading-2':
      case 'time-reading-3':
        return TimeQuestionGenerator.generateQuestionsByLevelId(levelId);
      case 'shape-basic':
      case 'shape-comparison':
      case 'shape-pattern':
        return ShapeQuestionGenerator.generateQuestionsByLevelId(levelId);
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
import { generateTimeVisual } from './time-generator';
import { generateShapeVisual } from './shape-generator';

export const generateMathProblemVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // 時計問題の視覚化
  if (question.visualAid.type === 'time-input' || (question.subtype === 'time-reading' && question.visualAid.type === 'image')) {
    return generateTimeVisual(question);
  }

  // 図形問題の視覚化
  if ((question.subtype?.includes('shape') || question.subtype?.includes('pattern')) && question.visualAid.type === 'image') {
    return generateShapeVisual(question);
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

  // Handle enhanced kuku reading visual
  if (question.visualAid.type === 'kuku-reading') {
    const { table, multiplier, reading, description } = question.visualAid.content as { 
      table: number; multiplier: number; reading: string; description?: string; 
    };
    
    return `
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-2">🔢</div>
          <div class="text-xl font-bold text-purple-600">${description || `${table}の段`}</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner mb-4">
          <div class="text-center mb-4">
            <div class="text-3xl font-bold text-gray-800">${table} × ${multiplier}</div>
          </div>
          
          <div class="flex justify-center mb-4">
            <div class="grid gap-2" style="grid-template-columns: repeat(${Math.min(multiplier, 5)}, 1fr);">
              ${Array(Math.min(multiplier, 5)).fill(0).map(() => `
                <div class="bg-blue-100 rounded-lg p-2">
                  <div class="flex flex-wrap gap-1 justify-center">
                    ${Array(Math.min(table, 9)).fill(0).map(() => '<div class="w-3 h-3 bg-blue-500 rounded-full"></div>').join('')}
                  </div>
                </div>
              `).join('')}
              ${multiplier > 5 ? `<div class="text-center text-gray-500">...</div>` : ''}
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-100 rounded-xl p-4 text-center">
          <div class="text-lg font-bold text-yellow-800 mb-2">📢 読み方</div>
          <div class="text-2xl font-bold text-yellow-900">${reading}</div>
        </div>
      </div>
    `;
  }

  // Handle division visual
  if (question.visualAid.type === 'division-visual') {
    const { dividend, divisor, quotient, description, relatedKuku } = question.visualAid.content as {
      dividend: number; divisor: number; quotient: number; description: string; relatedKuku: string;
    };

    return `
      <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-2">➗</div>
          <div class="text-xl font-bold text-green-600">${description}</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner mb-4">
          <div class="text-center mb-4">
            <div class="text-3xl font-bold text-gray-800">${dividend} ÷ ${divisor}</div>
          </div>
          
          <div class="flex justify-center mb-4">
            <div class="grid gap-2" style="grid-template-columns: repeat(${Math.min(divisor, 6)}, 1fr);">
              ${Array(Math.min(divisor, 6)).fill(0).map(() => `
                <div class="bg-green-100 rounded-lg p-2 border-2 border-green-300">
                  <div class="text-center text-sm font-bold text-green-700 mb-1">${quotient}個ずつ</div>
                  <div class="flex flex-wrap gap-1 justify-center">
                    ${Array(Math.min(quotient, 9)).fill(0).map(() => '<div class="w-3 h-3 bg-green-500 rounded-full"></div>').join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="bg-blue-100 rounded-xl p-4 text-center">
          <div class="text-lg font-bold text-blue-800 mb-2">🔄 関連する九九</div>
          <div class="text-xl font-bold text-blue-900">${relatedKuku}</div>
        </div>
      </div>
    `;
  }

  // Handle division with remainder visual
  if (question.visualAid.type === 'division-remainder-visual') {
    const { dividend, divisor, quotient, remainder, description, calculation } = question.visualAid.content as {
      dividend: number; divisor: number; quotient: number; remainder: number; description: string; calculation: string;
    };

    return `
      <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-2">➗</div>
          <div class="text-xl font-bold text-orange-600">${description}</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner mb-4">
          <div class="text-center mb-4">
            <div class="text-3xl font-bold text-gray-800">${dividend} ÷ ${divisor}</div>
          </div>
          
          <div class="flex justify-center items-center gap-4 mb-4">
            <div class="grid gap-2" style="grid-template-columns: repeat(${Math.min(divisor, 5)}, 1fr);">
              ${Array(Math.min(divisor, 5)).fill(0).map(() => `
                <div class="bg-orange-100 rounded-lg p-2 border-2 border-orange-300">
                  <div class="text-center text-sm font-bold text-orange-700 mb-1">${quotient}個ずつ</div>
                  <div class="flex flex-wrap gap-1 justify-center">
                    ${Array(Math.min(quotient, 6)).fill(0).map(() => '<div class="w-3 h-3 bg-orange-500 rounded-full"></div>').join('')}
                  </div>
                </div>
              `).join('')}
            </div>
            
            ${remainder > 0 ? `
              <div class="bg-red-100 rounded-lg p-2 border-2 border-red-300">
                <div class="text-center text-sm font-bold text-red-700 mb-1">あまり</div>
                <div class="flex flex-wrap gap-1 justify-center">
                  ${Array(Math.min(remainder, 9)).fill(0).map(() => '<div class="w-3 h-3 bg-red-500 rounded-full"></div>').join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        
        <div class="bg-yellow-100 rounded-xl p-4 text-center">
          <div class="text-lg font-bold text-yellow-800 mb-2">✓ 確認</div>
          <div class="text-xl font-bold text-yellow-900">${calculation}</div>
        </div>
      </div>
    `;
  }

  // Handle written multiplication visual
  if (question.visualAid.type === 'written-multiplication') {
    const { multiplicand, multiplier, steps, result } = question.visualAid.content as {
      multiplicand: number; multiplier: number; steps: Array<{step: string, description: string}>; result: number;
    };

    return `
      <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-2">📝</div>
          <div class="text-xl font-bold text-indigo-600">筆算で計算しよう</div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-inner">
          <div class="text-center mb-6">
            <div class="text-3xl font-bold text-gray-800 mb-4">${multiplicand} × ${multiplier}</div>
            
            <div class="inline-block border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
              <div class="font-mono text-2xl text-right space-y-1">
                <div class="border-b-2 border-gray-400 pb-1">
                  <span class="text-gray-600">&nbsp;&nbsp;</span>${multiplicand}
                </div>
                <div class="border-b-2 border-gray-400 pb-1">
                  ×&nbsp;&nbsp;${multiplier}
                </div>
                <div class="text-blue-600 font-bold">
                  ${result.toString().padStart(4, ' ')}
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-3">
            ${steps.map((step, index) => `
              <div class="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
                <div class="font-bold text-blue-800">${index + 1}. ${step.description}</div>
                <div class="text-blue-600 font-mono text-lg">${step.step}</div>
              </div>
            `).join('')}
          </div>
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