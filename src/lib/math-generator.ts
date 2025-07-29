import { Question } from '@/types';

export class MathQuestionGenerator {
  static generateAdditionLevel1(): Question[] {
    const questions: Question[] = [];
    
    // Generate 15 addition problems with visual dots (increased from 10)
    for (let i = 0; i < 15; i++) {
      const num1 = Math.floor(Math.random() * 5) + 1; // 1-5
      const num2 = Math.floor(Math.random() * 5) + 1; // 1-5
      const result = num1 + num2;
      
      // More variety in placeholder positions
      const placeholderPos = Math.random() < 0.4 ? (Math.random() < 0.33 ? 'left' : (Math.random() < 0.5 ? 'right' : 'result')) : 'result';
      
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

      // Add encouraging emoji for very easy problems
      const difficultyEmoji = result <= 6 ? '🌟' : result <= 8 ? '⭐' : '🏆';

      questions.push({
        id: `math-add-1-${i}`,
        type: 'math',
        subtype: 'addition',
        question: `${difficultyEmoji} ${questionText}`,
        correctAnswer,
        visualAid: {
          type: 'dots',
          content: placeholderPos === 'left' ? num2 : placeholderPos === 'right' ? num1 : Math.min(num1, num2),
          position: 'top'
        },
        points: result <= 6 ? 8 : result <= 8 ? 10 : 12 // Variable points based on difficulty
      });
    }

    return this.shuffleArray(questions);
  }

  static generateAdditionLevel2(): Question[] {
    const questions: Question[] = [];
    
    // Generate 12 harder addition problems (increased from 10)
    for (let i = 0; i < 12; i++) {
      const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
      const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
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

      // Difficulty-based emoji and points
      const difficultyEmoji = result <= 10 ? '⭐' : result <= 15 ? '🏆' : '💫';
      const points = result <= 10 ? 12 : result <= 15 ? 15 : 18;

      questions.push({
        id: `math-add-2-${i}`,
        type: 'math',
        subtype: 'addition',
        question: `${difficultyEmoji} ${questionText}`,
        correctAnswer,
        visualAid: {
          type: 'dots',
          content: Math.min(num1, num2, 8), // Show dots for smaller number, max 8
          position: 'top'
        },
        points
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
    
    // Generate 12 subtraction problems (increased from 10)
    for (let i = 0; i < 12; i++) {
      const result = Math.floor(Math.random() * 8) + 1; // 1-8
      const num2 = Math.floor(Math.random() * result) + 1; // 1 to result
      const num1 = result + num2;
      
      const placeholderPos = Math.random() < 0.3 ? 'left' : Math.random() < 0.6 ? 'right' : 'result';
      
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

      // Add difficulty-based emoji and points
      const difficultyEmoji = num1 <= 8 ? '🌟' : num1 <= 12 ? '⭐' : '🏆';
      const points = num1 <= 8 ? 12 : num1 <= 12 ? 15 : 18;

      questions.push({
        id: `math-sub-1-${i}`,
        type: 'math',
        subtype: 'subtraction',
        question: `${difficultyEmoji} ${questionText}`,
        correctAnswer,
        visualAid: {
          type: 'dots',
          content: Math.min(num1, 10), // Visual aid for minuend, max 10
          position: 'top'
        },
        points
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