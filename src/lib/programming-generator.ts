import { Question } from '@/types';

// プログラミング基礎問題用データ
export interface ProgrammingConceptData {
  concept: string;
  type: 'sequence' | 'loop' | 'condition' | 'algorithm' | 'debug';
  level: number;
  description: string;
  visualExample?: string;
}

export class ProgrammingQuestionGenerator {
  // レベル1: 順序とアルゴリズムの基本
  static generateProgrammingLevel1(): Question[] {
    const questions: Question[] = [];
    
    // 順序・手順の問題
    const sequences = [
      {
        activity: 'はみがき',
        steps: ['はブラシにはみがきこをつける', 'はをみがく', 'くちをゆすぐ', 'はブラシをあらう'],
        correctOrder: [1, 2, 3, 4],
        emoji: '🦷'
      },
      {
        activity: 'あさのじゅんび',
        steps: ['きがえる', 'かおをあらう', 'あさごはんをたべる', 'がっこうにいく'],
        correctOrder: [1, 2, 3, 4],
        emoji: '🌅'
      },
      {
        activity: 'おりょうり',
        steps: ['ざいりょうをじゅんびする', 'りょうりをつくる', 'おさらにもる', 'たべる'],
        correctOrder: [1, 2, 3, 4],
        emoji: '🍳'
      }
    ];

    sequences.forEach((seq, index) => {
      questions.push({
        id: `programming-sequence-${index}`,
        type: 'japanese',
        subtype: 'programming-sequence',
        question: `${seq.activity}のじゅんばんはどれがただしい？`,
        options: [
          'さいしょ→' + seq.steps[0],
          'さいしょ→' + seq.steps[1], 
          'さいしょ→' + seq.steps[2],
          'さいしょ→' + seq.steps[3]
        ],
        correctAnswer: 'さいしょ→' + seq.steps[0],
        visualAid: {
          type: 'programming-sequence-display',
          content: {
            activity: seq.activity,
            steps: seq.steps,
            emoji: seq.emoji,
            showOrder: false
          },
          position: 'top'
        },
        points: 15
      });
    });

    // 簡単なアルゴリズム問題
    const algorithms = [
      {
        problem: 'おもちゃをかたづける',
        steps: ['おもちゃをひろう', 'はこにいれる', 'ふたをしめる'],
        question: '2ばんめにすることは？',
        answer: 'はこにいれる',
        emoji: '🧸'
      },
      {
        problem: 'ほんをよむ',
        steps: ['ほんをえらぶ', 'ほんをひらく', 'よむ', 'ほんをとじる'],
        question: '3ばんめにすることは？',
        answer: 'よむ',
        emoji: '📖'
      }
    ];

    algorithms.forEach((alg, index) => {
      questions.push({
        id: `programming-algorithm-${index}`,
        type: 'japanese',
        subtype: 'programming-algorithm',
        question: `${alg.problem}とき、${alg.question}`,
        options: [alg.answer, alg.steps[0], alg.steps[alg.steps.length - 1], 'わからない'],
        correctAnswer: alg.answer,
        visualAid: {
          type: 'programming-algorithm-display',
          content: {
            problem: alg.problem,
            steps: alg.steps,
            emoji: alg.emoji,
            highlightStep: alg.steps.indexOf(alg.answer)
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 8);
  }

  // レベル2: 繰り返しと条件分岐の基本
  static generateProgrammingLevel2(): Question[] {
    const questions: Question[] = [];
    
    // 繰り返しの概念問題
    const loops = [
      {
        action: 'てをあらう',
        repeat: 'ごしごし',
        times: '10かい',
        reason: 'きれいになるまで',
        emoji: '🤲'
      },
      {
        action: 'なわとび',
        repeat: 'ぴょんぴょん',
        times: '20かい',
        reason: 'つかれるまで',
        emoji: '🪢'
      },
      {
        action: 'うたをうたう',
        repeat: 'らららら',
        times: '3ばん',
        reason: 'おわりまで',
        emoji: '🎵'
      }
    ];

    loops.forEach((loop, index) => {
      questions.push({
        id: `programming-loop-${index}`,
        type: 'japanese',
        subtype: 'programming-loop',
        question: `${loop.action}とき、「${loop.repeat}」を${loop.times}くりかえす。これを「くりかえし」といいます。`,
        options: ['くりかえし', 'じゅんばん', 'えらぶ', 'おわり'],
        correctAnswer: 'くりかえし',
        visualAid: {
          type: 'programming-loop-display',
          content: {
            action: loop.action,
            repeat: loop.repeat,
            times: loop.times,
            emoji: loop.emoji
          },
          position: 'top'
        },
        points: 20
      });
    });

    // 条件分岐の概念問題
    const conditions = [
      {
        situation: 'そとにでる',
        condition: 'あめがふっている',
        ifTrue: 'かさをもつ',
        ifFalse: 'そのままでる',
        emoji: '☔'
      },
      {
        situation: 'べんきょう',
        condition: 'しゅくだいがある',
        ifTrue: 'しゅくだいをする',
        ifFalse: 'ほんをよむ',
        emoji: '📚'
      },
      {
        situation: 'おやつ',
        condition: 'おなかがすいている',
        ifTrue: 'おやつをたべる',
        ifFalse: 'みずをのむ',
        emoji: '🍪'
      }
    ];

    conditions.forEach((cond, index) => {
      questions.push({
        id: `programming-condition-${index}`,
        type: 'japanese',
        subtype: 'programming-condition',
        question: `${cond.situation}とき、もし${cond.condition}なら？`,
        options: [cond.ifTrue, cond.ifFalse, 'なにもしない', 'わからない'],
        correctAnswer: cond.ifTrue,
        visualAid: {
          type: 'programming-condition-display',
          content: {
            situation: cond.situation,
            condition: cond.condition,
            ifTrue: cond.ifTrue,
            ifFalse: cond.ifFalse,
            emoji: cond.emoji
          },
          position: 'top'
        },
        points: 25
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  // レベル3: デバッグと問題解決
  static generateProgrammingLevel3(): Question[] {
    const questions: Question[] = [];
    
    // デバッグ問題（間違い探し）
    const debugProblems = [
      {
        task: 'すいとうにみずをいれる',
        wrongSteps: ['すいとうのふたをしめる', 'みずをいれる', 'すいとうをかばんにいれる'],
        correctSteps: ['すいとうのふたをあける', 'みずをいれる', 'ふたをしめる', 'すいとうをかばんにいれる'],
        error: 'ふたをあけるのをわすれている',
        emoji: '💧'
      },
      {
        task: 'えんぴつでかく',
        wrongSteps: ['かみをじゅんびする', 'えんぴつでかく', 'けしゴムでけす'],
        correctSteps: ['かみをじゅんびする', 'えんぴつをけずる', 'えんぴつでかく'],
        error: 'えんぴつをけずるのをわすれている',
        emoji: '✏️'
      }
    ];

    debugProblems.forEach((debug, index) => {
      questions.push({
        id: `programming-debug-${index}`,
        type: 'japanese',
        subtype: 'programming-debug',
        question: `${debug.task}じゅんばんで、まちがいはどこ？\n1.${debug.wrongSteps[0]}\n2.${debug.wrongSteps[1]}\n3.${debug.wrongSteps[2]}`,
        options: ['1ばんめ', '2ばんめ', '3ばんめ', 'まちがいなし'],
        correctAnswer: '1ばんめ',
        visualAid: {
          type: 'programming-debug-display',
          content: {
            task: debug.task,
            wrongSteps: debug.wrongSteps,
            correctSteps: debug.correctSteps,
            error: debug.error,
            emoji: debug.emoji
          },
          position: 'top'
        },
        points: 30
      });
    });

    // パターン認識問題
    const patterns = [
      {
        sequence: ['あか', 'あお', 'あか', 'あお', '?'],
        answer: 'あか',
        description: 'いろのパターン',
        emoji: '🔴'
      },
      {
        sequence: ['1', '2', '1', '2', '?'],
        answer: '1',
        description: 'すうじのパターン',
        emoji: '🔢'
      },
      {
        sequence: ['おおきい', 'ちいさい', 'おおきい', 'ちいさい', '?'],
        answer: 'おおきい',
        description: 'おおきさのパターン',
        emoji: '📏'
      }
    ];

    patterns.forEach((pattern, index) => {
      questions.push({
        id: `programming-pattern-${index}`,
        type: 'japanese',
        subtype: 'programming-pattern',
        question: `つぎのパターンで「?」にはいるのは？\n${pattern.sequence.join(' → ')}`,
        options: [pattern.answer, pattern.sequence[0], pattern.sequence[1], 'わからない'],
        correctAnswer: pattern.answer,
        visualAid: {
          type: 'programming-pattern-display',
          content: {
            sequence: pattern.sequence,
            answer: pattern.answer,
            description: pattern.description,
            emoji: pattern.emoji
          },
          position: 'top'
        },
        points: 35
      });
    });

    // 論理的思考問題
    const logic = [
      {
        problem: 'みんなでおそうじ',
        rules: ['1にんが1つのへやをそうじする', '5つのへやがある'],
        question: 'なんにんひつよう？',
        answer: '5にん',
        emoji: '🧹'
      },
      {
        problem: 'えんそく',
        rules: ['1だいのバスに20にんのれる', '60にんがいく'],
        question: 'バスはなんだいひつよう？',
        answer: '3だい',
        emoji: '🚌'
      }
    ];

    logic.forEach((log, index) => {
      questions.push({
        id: `programming-logic-${index}`,
        type: 'japanese',
        subtype: 'programming-logic',
        question: `${log.problem}\n${log.rules.join('\n')}\n${log.question}`,
        options: [log.answer, '1', '10', 'わからない'],
        correctAnswer: log.answer,
        visualAid: {
          type: 'programming-logic-display',
          content: {
            problem: log.problem,
            rules: log.rules,
            question: log.question,
            answer: log.answer,
            emoji: log.emoji
          },
          position: 'top'
        },
        points: 40
      });
    });

    return this.shuffleArray(questions).slice(0, 8);
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'programming-level-1':
        return this.generateProgrammingLevel1();
      case 'programming-level-2':
        return this.generateProgrammingLevel2();
      case 'programming-level-3':
        return this.generateProgrammingLevel3();
      default:
        return this.generateProgrammingLevel1();
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

// プログラミング基礎用視覚化関数
export const generateProgrammingVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // 順序・手順表示
  if (question.visualAid.type === 'programming-sequence-display') {
    const { activity, steps, emoji, showOrder } = question.visualAid.content as {
      activity: string;
      steps: string[];
      emoji: string;
      showOrder: boolean;
    };

    return `
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-3">${emoji}</div>
          <div class="text-xl font-bold text-blue-600">${activity}のじゅんばん</div>
        </div>
        
        <div class="space-y-3 mb-4">
          ${steps.map((step, index) => `
            <div class="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4">
              <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                ${showOrder ? index + 1 : '?'}
              </div>
              <div class="flex-1 text-lg text-gray-800">${step}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="text-center bg-yellow-100 rounded-xl p-3 shadow-inner">
          <div class="text-lg text-gray-700">ただしいじゅんばんをえらんでね</div>
        </div>
      </div>
    `;
  }

  // アルゴリズム表示
  if (question.visualAid.type === 'programming-algorithm-display') {
    const { problem, steps, emoji, highlightStep } = question.visualAid.content as {
      problem: string;
      steps: string[];
      emoji: string;
      highlightStep: number;
    };

    return `
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-3">${emoji}</div>
          <div class="text-xl font-bold text-green-600">${problem}</div>
        </div>
        
        <div class="space-y-2 mb-4">
          ${steps.map((step, index) => `
            <div class="bg-white rounded-xl p-3 shadow-lg flex items-center gap-3 ${index === highlightStep ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}">
              <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ${index + 1}
              </div>
              <div class="flex-1 text-gray-800">${step}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="text-center bg-green-100 rounded-xl p-3 shadow-inner">
          <div class="text-lg text-gray-700">きいろくなっているのがこたえ</div>
        </div>
      </div>
    `;
  }

  // 繰り返し表示
  if (question.visualAid.type === 'programming-loop-display') {
    const { action, repeat, times, emoji } = question.visualAid.content as {
      action: string;
      repeat: string;
      times: string;
      emoji: string;
    };

    return `
      <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-3">${emoji}</div>
          <div class="text-xl font-bold text-purple-600">${action}</div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-inner mb-4">
          <div class="text-center">
            <div class="text-lg text-gray-800 mb-4">「${repeat}」を ${times} くりかえす</div>
            
            <div class="flex items-center justify-center gap-2 mb-4">
              ${Array.from({length: 3}, (_, i) => `
                <div class="bg-purple-100 rounded-lg p-2 text-purple-700 font-bold">
                  ${repeat}
                </div>
                ${i < 2 ? '<div class="text-purple-400">→</div>' : ''}
              `).join('')}
              <div class="text-purple-400">...</div>
            </div>
            
            <div class="bg-yellow-200 rounded-lg p-3">
              <div class="text-lg font-bold text-orange-700">これが「くりかえし」</div>
            </div>
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-600">
          おなじことを なんかいも すること
        </div>
      </div>
    `;
  }

  // 条件分岐表示
  if (question.visualAid.type === 'programming-condition-display') {
    const { situation, condition, ifTrue, ifFalse, emoji } = question.visualAid.content as {
      situation: string;
      condition: string;
      ifTrue: string;
      ifFalse: string;
      emoji: string;
    };

    return `
      <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-3">${emoji}</div>
          <div class="text-xl font-bold text-orange-600">${situation}</div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-inner">
          <div class="text-center mb-4">
            <div class="text-lg font-bold text-gray-800 mb-3">もし「${condition}」なら？</div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-green-100 rounded-xl p-4 text-center">
              <div class="text-sm font-bold text-green-600 mb-2">はい の ばあい</div>
              <div class="text-gray-800">${ifTrue}</div>
            </div>
            
            <div class="bg-blue-100 rounded-xl p-4 text-center">
              <div class="text-sm font-bold text-blue-600 mb-2">いいえ の ばあい</div>
              <div class="text-gray-800">${ifFalse}</div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-4 bg-yellow-100 rounded-xl p-3 shadow-inner">
          <div class="text-lg text-gray-700">じょうきょうで えらぶことを「じょうけん」といいます</div>
        </div>
      </div>
    `;
  }

  // デバッグ表示
  if (question.visualAid.type === 'programming-debug-display') {
    const { task, wrongSteps, correctSteps, error, emoji } = question.visualAid.content as {
      task: string;
      wrongSteps: string[];
      correctSteps: string[];
      error: string;
      emoji: string;
    };

    return `
      <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-3">${emoji}</div>
          <div class="text-xl font-bold text-red-600">${task}</div>
          <div class="text-sm text-gray-600">まちがいさがし</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner mb-4">
          <div class="text-center mb-3">
            <div class="text-lg font-bold text-red-600">まちがった じゅんばん</div>
          </div>
          <div class="space-y-2">
            ${wrongSteps.map((step, index) => `
              <div class="bg-red-100 rounded-lg p-3 flex items-center gap-3">
                <div class="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ${index + 1}
                </div>
                <div class="flex-1 text-gray-800">${step}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="bg-yellow-100 rounded-xl p-3 shadow-inner">
          <div class="text-center">
            <div class="text-sm font-bold text-orange-600 mb-1">ヒント</div>
            <div class="text-gray-700">${error}</div>
          </div>
        </div>
      </div>
    `;
  }

  // パターン認識表示
  if (question.visualAid.type === 'programming-pattern-display') {
    const { sequence, answer, description, emoji } = question.visualAid.content as {
      sequence: string[];
      answer: string;
      description: string;
      emoji: string;
    };

    return `
      <div class="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-3">${emoji}</div>
          <div class="text-xl font-bold text-cyan-600">${description}</div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-inner mb-4">
          <div class="flex items-center justify-center gap-3">
            ${sequence.map((item, index) => `
              <div class="text-center">
                <div class="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center text-lg font-bold ${item === '?' ? 'bg-yellow-200 text-orange-600' : 'text-cyan-700'}">
                  ${item}
                </div>
              </div>
              ${index < sequence.length - 1 ? '<div class="text-2xl text-gray-400">→</div>' : ''}
            `).join('')}
          </div>
        </div>
        
        <div class="text-center bg-cyan-100 rounded-xl p-3 shadow-inner">
          <div class="text-lg text-gray-700">パターンを みつけて つぎを よそうしよう</div>
        </div>
      </div>
    `;
  }

  return '';
};