import { Question } from '@/types';

export class ShapeQuestionGenerator {
  static generateBasicShapes(): Question[] {
    const shapes = [
      { name: '円', english: 'circle', sides: 0, color: '#3b82f6' },
      { name: '三角形', english: 'triangle', sides: 3, color: '#ef4444' },
      { name: '四角形', english: 'square', sides: 4, color: '#10b981' },
      { name: '五角形', english: 'pentagon', sides: 5, color: '#f59e0b' },
      { name: '六角形', english: 'hexagon', sides: 6, color: '#8b5cf6' }
    ];

    const questions: Question[] = [];

    shapes.forEach((shape, index) => {
      // Shape name questions
      questions.push({
        id: `shape-name-${index}`,
        type: 'math',
        subtype: 'shape-recognition',
        question: `この図形の名前は何ですか？`,
        correctAnswer: shape.name,
        visualAid: {
          type: 'image',
          content: this.generateShapeHTML(shape.name, shape.color, 120),
          position: 'top'
        },
        points: 15
      });

      // Side counting questions (except circle)
      if (shape.sides > 0) {
        questions.push({
          id: `shape-sides-${index}`,
          type: 'math',
          subtype: 'shape-counting',
          question: `この図形には何本の辺がありますか？`,
          correctAnswer: shape.sides.toString(),
          visualAid: {
            type: 'image',
            content: this.generateShapeHTML(shape.name, shape.color, 120, true),
            position: 'top'
          },
          points: 20
        });
      }
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateShapeComparison(): Question[] {
    const questions: Question[] = [];
    const shapes = ['三角形', '四角形', '円', '五角形'];
    
    // Generate "which is different" questions
    for (let i = 0; i < 5; i++) {
      const sameShape = shapes[Math.floor(Math.random() * shapes.length)];
      const differentShape = shapes.find(s => s !== sameShape)!;
      
      // Create array with 3 same shapes and 1 different shape
      const shapeArray = [sameShape, sameShape, sameShape, differentShape];
      
      // Shuffle the array to randomize positions
      const shuffledShapes = this.shuffleArray([...shapeArray]);
      
      // Find the position of the different shape (1-indexed)
      const differentPosition = shuffledShapes.findIndex(shape => shape === differentShape) + 1;
      
      questions.push({
        id: `shape-different-${i}`,
        type: 'math',
        subtype: 'shape-comparison',
        question: `仲間はずれの図形はどれですか？`,
        correctAnswer: `図形${differentPosition}`,
        options: ['図形1', '図形2', '図形3', '図形4'],
        visualAid: {
          type: 'image',
          content: this.generateShapeComparisonHTML(shuffledShapes),
          position: 'top'
        },
        points: 25
      });
    }

    return this.shuffleArray(questions);
  }

  static generatePatternRecognition(): Question[] {
    const questions: Question[] = [];
    const shapes = ['○', '△', '□'];
    const colors = ['#3b82f6', '#ef4444', '#10b981'];

    // Simple patterns
    const patterns = [
      { sequence: ['○', '△', '○', '△', '?'], answer: '○' },
      { sequence: ['□', '○', '□', '○', '?'], answer: '□' },
      { sequence: ['△', '△', '○', '△', '△', '?'], answer: '○' },
      { sequence: ['○', '□', '△', '○', '□', '?'], answer: '△' },
      { sequence: ['□', '□', '○', '□', '□', '?'], answer: '○' }
    ];

    patterns.forEach((pattern, index) => {
      questions.push({
        id: `pattern-${index}`,
        type: 'math',
        subtype: 'pattern-recognition',
        question: `パターンを見つけて、？に入る図形を選んでください`,
        correctAnswer: pattern.answer,
        options: shapes,
        visualAid: {
          type: 'image',
          content: this.generatePatternHTML(pattern.sequence),
          position: 'top'
        },
        points: 30
      });
    });

    return this.shuffleArray(questions);
  }

  private static generateShapeHTML(shapeName: string, color: string, size: number, showSides: boolean = false): string {
    let shapeElement = '';
    const centerX = size / 2;
    const centerY = size / 2;

    switch (shapeName) {
      case '円':
        shapeElement = `<circle cx="${centerX}" cy="${centerY}" r="${size * 0.4}" fill="${color}" stroke="#1f2937" stroke-width="3"/>`;
        break;
      case '三角形':
        const trianglePoints = `${centerX},${size * 0.1} ${size * 0.1},${size * 0.9} ${size * 0.9},${size * 0.9}`;
        shapeElement = `<polygon points="${trianglePoints}" fill="${color}" stroke="#1f2937" stroke-width="3"/>`;
        break;
      case '四角形':
        shapeElement = `<rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" fill="${color}" stroke="#1f2937" stroke-width="3"/>`;
        break;
      case '五角形':
        const pentagonPoints = this.generateRegularPolygonPoints(5, centerX, centerY, size * 0.4);
        shapeElement = `<polygon points="${pentagonPoints}" fill="${color}" stroke="#1f2937" stroke-width="3"/>`;
        break;
      case '六角形':
        const hexagonPoints = this.generateRegularPolygonPoints(6, centerX, centerY, size * 0.4);
        shapeElement = `<polygon points="${hexagonPoints}" fill="${color}" stroke="#1f2937" stroke-width="3"/>`;
        break;
    }

    return `
      <svg width="${size}" height="${size}" style="margin: 10px;">
        ${shapeElement}
        ${showSides ? this.addSideNumbers(shapeName, size) : ''}
      </svg>
    `;
  }

  private static generateRegularPolygonPoints(sides: number, centerX: number, centerY: number, radius: number): string {
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI / sides) - (Math.PI / 2); // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  }

  private static addSideNumbers(shapeName: string, size: number): string {
    // Add small numbers on each side for counting
    if (shapeName === '円') return '';
    
    const sideCount = shapeName === '三角形' ? 3 : shapeName === '四角形' ? 4 : shapeName === '五角形' ? 5 : 6;
    let numbers = '';
    
    for (let i = 1; i <= sideCount; i++) {
      const angle = ((i - 1) * 2 * Math.PI / sideCount) - (Math.PI / 2);
      const x = size / 2 + (size * 0.5) * Math.cos(angle);
      const y = size / 2 + (size * 0.5) * Math.sin(angle);
      numbers += `<text x="${x}" y="${y}" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff" stroke="#000000" stroke-width="1">${i}</text>`;
    }
    
    return numbers;
  }

  private static generateShapeComparisonHTML(shapes: string[]): string {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
    
    return `
      <div class="bg-gray-50 rounded-2xl p-6">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">どれが仲間外れでしょうか？</div>
        <div class="grid grid-cols-2 gap-6 max-w-md mx-auto">
          ${shapes.map((shape, index) => `
            <div class="text-center bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div class="text-xl font-bold text-gray-800 mb-3">図形${index + 1}</div>
              <div class="flex justify-center">
                ${this.generateShapeHTML(shape, colors[index], 100)}
              </div>
              <div class="text-sm text-gray-600 mt-2">${shape}</div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-4 text-sm text-gray-500">
          4つの図形の中で、1つだけ違う図形があります
        </div>
      </div>
    `;
  }

  private static generatePatternHTML(sequence: string[]): string {
    return `
      <div style="display: flex; justify-content: center; align-items: center; gap: 15px; margin: 20px; padding: 20px; background: #f8fafc; border-radius: 12px;">
        ${sequence.map((item, index) => {
          if (item === '?') {
            return `<div style="width: 60px; height: 60px; border: 3px dashed #6b7280; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; color: #6b7280;">?</div>`;
          } else {
            const color = item === '○' ? '#3b82f6' : item === '△' ? '#ef4444' : '#10b981';
            return `<div style="font-size: 48px; color: ${color}; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${item}</div>`;
          }
        }).join('')}
      </div>
    `;
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'shape-basic':
        return this.generateBasicShapes();
      case 'shape-comparison':
        return this.generateShapeComparison();
      case 'shape-pattern':
        return this.generatePatternRecognition();
      default:
        return this.generateBasicShapes();
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

export const generateShapeVisual = (question: Question): string => {
  if (!question.visualAid || question.visualAid.type !== 'image') {
    return '';
  }

  // For shape comparison questions, the content is already a complete HTML with styling
  if (question.subtype === 'shape-comparison') {
    return question.visualAid.content as string;
  }

  // For basic shape questions, wrap the SVG content
  return `
    <div style="display: flex; justify-content: center; margin-bottom: 24px;">
      <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); border: 4px solid #dbeafe;">
        ${question.visualAid.content}
      </div>
    </div>
  `;
};