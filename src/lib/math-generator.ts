import { Question, MathProblem } from '@/types';

export class MathQuestionGenerator {
  static generateAdditionLevel1(): Question[] {
    const questions: Question[] = [];
    
    // Generate 10 addition problems with visual dots
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 5) + 1; // 1-5
      const num2 = Math.floor(Math.random() * 5) + 1; // 1-5
      const result = num1 + num2;
      
      // Sometimes use placeholder in different positions
      const placeholderPos = Math.random() < 0.3 ? (Math.random() < 0.5 ? 'left' : 'result') : 'none';
      
      let questionText = '';
      let correctAnswer = '';
      
      if (placeholderPos === 'left') {
        questionText = `〇 + ${num2} = ${result}`;
        correctAnswer = num1.toString();
      } else if (placeholderPos === 'result') {
        questionText = `${num1} + ${num2} = 〇`;
        correctAnswer = result.toString();
      } else {
        questionText = `${num1} + ${num2} = 〇`;
        correctAnswer = result.toString();
      }

      questions.push({
        id: `math-add-1-${i}`,
        type: 'math',
        subtype: 'addition',
        question: questionText,
        correctAnswer,
        visualAid: {
          type: 'dots',
          content: placeholderPos === 'left' ? num2 : num1,
          position: 'top'
        },
        points: 10
      });
    }

    return this.shuffleArray(questions);
  }

  static generateAdditionLevel2(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
      const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
      const result = num1 + num2;
      
      const placeholderPos = Math.random() < 0.2 ? 'left' : 'result';
      
      let questionText = '';
      let correctAnswer = '';
      
      if (placeholderPos === 'left') {
        questionText = `〇 + ${num2} = ${result}`;
        correctAnswer = num1.toString();
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
    
    for (let i = 0; i < 10; i++) {
      const result = Math.floor(Math.random() * 5) + 1; // 1-5
      const num2 = Math.floor(Math.random() * result) + 1; // 1 to result
      const num1 = result + num2;
      
      const placeholderPos = Math.random() < 0.3 ? 'left' : 'result';
      
      let questionText = '';
      let correctAnswer = '';
      
      if (placeholderPos === 'left') {
        questionText = `〇 - ${num2} = ${result}`;
        correctAnswer = num1.toString();
      } else {
        questionText = `${num1} - ${num2} = 〇`;
        correctAnswer = result.toString();
      }

      questions.push({
        id: `math-sub-1-${i}`,
        type: 'math',
        subtype: 'subtraction',
        question: questionText,
        correctAnswer,
        visualAid: {
          type: 'dots',
          content: num1,
          position: 'top'
        },
        points: 15
      });
    }

    return this.shuffleArray(questions);
  }

  static generateMultiplicationLevel1(): Question[] {
    const questions: Question[] = [];
    const tables = [1, 2, 3, 4, 5]; // Start with easier tables
    
    for (let i = 0; i < 10; i++) {
      const table = tables[Math.floor(Math.random() * tables.length)];
      const multiplier = Math.floor(Math.random() * 9) + 1; // 1-9
      const result = table * multiplier;
      
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

      questions.push({
        id: `math-mul-1-${i}`,
        type: 'math',
        subtype: 'multiplication',
        question: questionText,
        correctAnswer,
        visualAid: {
          type: 'text',
          content: `${table}の段`,
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
  if (!question.visualAid || question.visualAid.type !== 'dots') {
    return '';
  }

  const numDots = question.visualAid.content as number;
  let dotsHtml = '';
  
  for (let i = 0; i < numDots; i++) {
    dotsHtml += `<div class="w-8 h-8 bg-blue-400 rounded-full shadow-md animate-bounce-in" style="animation-delay: ${i * 0.1}s"></div>`;
  }

  return `<div class="flex flex-wrap gap-2 justify-center mb-4 p-4 bg-blue-50 rounded-xl">${dotsHtml}</div>`;
};