// 子供の学習における躓きやすいポイントを分析・考慮したシステム

export interface LearningDifficulty {
  topic: string;
  commonMistakes: string[];
  difficultyFactors: string[];
  teachingStrategies: string[];
  progressiveSteps: string[];
}

export interface StudentProgress {
  correctAnswers: number;
  incorrectAnswers: number;
  commonErrors: string[];
  timeSpent: number;
  consecutiveCorrect: number;
  strugglingTopics: string[];
}

export class DifficultyAnalysisManager {
  // 掛け算の躓きやすいポイント
  static multiplicationDifficulties: LearningDifficulty = {
    topic: 'multiplication',
    commonMistakes: [
      '九九の暗記不足',
      '0との掛け算の理解不足',
      '桁の概念の混乱',
      '筆算での位取りミス',
      '繰り上がりの忘れ',
      'かけられる数とかける数の混同'
    ],
    difficultyFactors: [
      '6の段、7の段、8の段が特に困難',
      '大きな数同士の掛け算',
      '0が含まれる数の掛け算',
      '筆算での位揃え'
    ],
    teachingStrategies: [
      '具体物を使った視覚化',
      '九九の歌やリズムでの暗記',
      'かけ算の意味理解（同じ数の繰り返し足し算）',
      '段階的な筆算指導',
      '間違いやすいパターンの重点練習'
    ],
    progressiveSteps: [
      '2・3・5の段から開始（覚えやすい）',
      '4・6・8の段追加（偶数パターン）',
      '7・9の段追加（最難関）',
      '1の段と10の段で完成',
      '2桁×1桁の筆算',
      '2桁×2桁の筆算'
    ]
  };

  // 割り算の躓きやすいポイント
  static divisionDifficulties: LearningDifficulty = {
    topic: 'division',
    commonMistakes: [
      '割り算の意味理解不足',
      'あまりの概念の混乱',
      '九九の逆算ができない',
      '筆算での商の桁間違い',
      '0の商の処理ミス',
      '検算の軽視'
    ],
    difficultyFactors: [
      '掛け算の完全習得が前提',
      'あまりのある割り算',
      '2桁以上の割り算',
      '商が2桁以上になる場合'
    ],
    teachingStrategies: [
      '分配・分割の具体例での説明',
      '九九の逆から入る',
      'あまりの意味の丁寧な説明',
      '筆算の段階的指導',
      '検算習慣の定着'
    ],
    progressiveSteps: [
      '九九の範囲での割り切れる問題',
      'あまりのある1桁同士',
      '2桁÷1桁（割り切れる）',
      '2桁÷1桁（あまりあり）',
      '3桁÷1桁の基礎'
    ]
  };

  // 学年別の学習目標と注意点
  static gradeTargets = {
    grade2: {
      targets: ['九九の完全暗記', '掛け算の意味理解'],
      difficulties: ['6・7・8・9の段', '0との掛け算', '順序の理解'],
      strategies: ['視覚的教材の活用', '毎日の反復練習', '歌・リズムの活用']
    },
    grade3: {
      targets: ['割り算の導入', '筆算の基礎', 'あまりの理解'],
      difficulties: ['掛け算と割り算の関係', 'あまりの概念', '文章問題'],
      strategies: ['具体物での操作', '図表の活用', '段階的指導']
    },
    grade4: {
      targets: ['2桁×2桁の筆算', '複雑な割り算', '文章問題'],
      difficulties: ['筆算の位取り', '0を含む計算', '複合的思考'],
      strategies: ['筆算練習の徹底', 'エラーパターンの分析', '文章問題の段階指導']
    }
  };

  // 間違いパターンの分析
  static analyzeError(userAnswer: string, correctAnswer: string, questionType: string): string[] {
    const errors: string[] = [];
    
    if (questionType.includes('multiplication')) {
      // 掛け算のエラー分析
      const userNum = parseInt(userAnswer);
      const correctNum = parseInt(correctAnswer);
      
      if (isNaN(userNum)) {
        errors.push('数字以外の文字が入力されています');
        return errors;
      }
      
      const difference = Math.abs(userNum - correctNum);
      
      // よくある間違いパターンを分析
      if (difference === 0) return []; // 正解
      
      if (userNum === 0) {
        errors.push('0との掛け算の理解不足の可能性');
      } else if (difference <= 10) {
        errors.push('九九の暗記ミスの可能性');
      } else if (userNum < correctNum) {
        errors.push('計算不足、または九九の記憶違い');
      } else {
        errors.push('桁の計算ミス、または九九の記憶違い');
      }
    }
    
    if (questionType.includes('division')) {
      // 割り算のエラー分析
      if (userAnswer.includes('あまり')) {
        const [quotientStr, remainderStr] = userAnswer.split('あまり');
        const [correctQuotientStr, correctRemainderStr] = correctAnswer.split('あまり');
        
        const userQuotient = parseInt(quotientStr.trim());
        const userRemainder = parseInt(remainderStr.trim());
        const correctQuotient = parseInt(correctQuotientStr.trim());
        const correctRemainder = parseInt(correctRemainderStr.trim());
        
        if (userQuotient !== correctQuotient) {
          errors.push('商の計算ミス');
        }
        if (userRemainder !== correctRemainder) {
          errors.push('あまりの計算ミス');
        }
      } else {
        const userNum = parseInt(userAnswer);
        const correctNum = parseInt(correctAnswer);
        
        if (userNum !== correctNum) {
          errors.push('割り算の基本計算ミス');
        }
      }
    }
    
    return errors;
  }

  // 学習支援提案の生成
  static generateLearningSupport(studentProgress: StudentProgress, topic: string): string[] {
    const suggestions: string[] = [];
    
    const accuracy = studentProgress.correctAnswers / 
      (studentProgress.correctAnswers + studentProgress.incorrectAnswers);
    
    if (accuracy < 0.6) {
      suggestions.push('基礎に戻って復習しましょう');
      suggestions.push('具体物を使って概念を確認しましょう');
    } else if (accuracy < 0.8) {
      suggestions.push('練習量を増やしましょう');
      suggestions.push('間違いやすいパターンを重点的に練習しましょう');
    } else {
      suggestions.push('よくできています！次のレベルに進みましょう');
    }
    
    // 共通エラーに基づく提案
    studentProgress.commonErrors.forEach(error => {
      switch (error) {
        case '九九の暗記ミス':
          suggestions.push('九九表を見ながら練習しましょう');
          suggestions.push('歌やリズムで覚えましょう');
          break;
        case '桁の計算ミス':
          suggestions.push('筆算の位取りを確認しましょう');
          suggestions.push('一の位、十の位を意識して計算しましょう');
          break;
        case 'あまりの計算ミス':
          suggestions.push('あまりの意味を確認しましょう');
          suggestions.push('検算をする習慣をつけましょう');
          break;
      }
    });
    
    return suggestions;
  }

  // 問題難易度の動的調整
  static adjustDifficulty(studentProgress: StudentProgress, currentLevel: number): number {
    const accuracy = studentProgress.correctAnswers / 
      (studentProgress.correctAnswers + studentProgress.incorrectAnswers);
    
    // 正解率が高く、連続正解も多い場合は難易度を上げる
    if (accuracy >= 0.9 && studentProgress.consecutiveCorrect >= 5) {
      return Math.min(currentLevel + 1, 10); // 最大レベル10
    }
    
    // 正解率が低い場合は難易度を下げる
    if (accuracy < 0.5) {
      return Math.max(currentLevel - 1, 1); // 最小レベル1
    }
    
    return currentLevel;
  }

  // 学習時間の分析
  static analyzeStudyTime(timeSpent: number, questionCount: number): string {
    const averageTime = timeSpent / questionCount;
    
    if (averageTime < 10) {
      return '速すぎます。もう少しゆっくり考えましょう';
    } else if (averageTime > 60) {
      return '時間がかかりすぎています。基礎を復習しましょう';
    } else if (averageTime > 30) {
      return '少し時間がかかっています。練習を続けましょう';
    } else {
      return '良いペースです！';
    }
  }

  // 学習継続のモチベーション分析
  static getMotivationLevel(studentProgress: StudentProgress): {
    level: 'high' | 'medium' | 'low',
    suggestions: string[]
  } {
    const accuracy = studentProgress.correctAnswers / 
      (studentProgress.correctAnswers + studentProgress.incorrectAnswers);
    
    if (accuracy >= 0.8 && studentProgress.consecutiveCorrect >= 3) {
      return {
        level: 'high',
        suggestions: [
          '素晴らしい！この調子で続けましょう',
          '新しいチャレンジに挑戦してみましょう'
        ]
      };
    } else if (accuracy >= 0.6) {
      return {
        level: 'medium',
        suggestions: [
          '頑張っています！もう少しで上達しますよ',
          '間違いを恐れずに挑戦しましょう'
        ]
      };
    } else {
      return {
        level: 'low',
        suggestions: [
          '大丈夫です。みんな最初は間違えます',
          '基礎から一歩ずつ進みましょう',
          '分からないときは遠慮なく聞きましょう'
        ]
      };
    }
  }

  // 個別学習計画の生成
  static generatePersonalizedPlan(studentProgress: StudentProgress, topic: string): {
    currentLevel: string,
    nextSteps: string[],
    practiceAreas: string[],
    timeRecommendation: string
  } {
    const accuracy = studentProgress.correctAnswers / 
      (studentProgress.correctAnswers + studentProgress.incorrectAnswers);
    
    let currentLevel = '';
    let nextSteps: string[] = [];
    let practiceAreas: string[] = [];
    
    if (topic === 'multiplication') {
      if (accuracy < 0.5) {
        currentLevel = '九九の基礎練習';
        nextSteps = ['2・3・5の段を完璧に覚える', '視覚教材で意味を理解する'];
        practiceAreas = ['2の段', '3の段', '5の段'];
      } else if (accuracy < 0.8) {
        currentLevel = '九九の習得中';
        nextSteps = ['残りの段を覚える', '混合問題に挑戦する'];
        practiceAreas = ['6の段', '7の段', '8の段', '9の段'];
      } else {
        currentLevel = '九九習得済み';
        nextSteps = ['筆算に進む', '文章問題に挑戦する'];
        practiceAreas = ['2桁×1桁の筆算', '文章問題'];
      }
    }
    
    const timeRecommendation = this.analyzeStudyTime(
      studentProgress.timeSpent, 
      studentProgress.correctAnswers + studentProgress.incorrectAnswers
    );
    
    return {
      currentLevel,
      nextSteps,
      practiceAreas,
      timeRecommendation
    };
  }
}