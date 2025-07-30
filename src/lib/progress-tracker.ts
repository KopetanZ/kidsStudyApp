import { UserProgress, Badge, DailyGoal } from '@/types';

export interface LearningMilestone {
  id: string;
  name: string;
  description: string;
  requiredPoints: number;
  rewards: string[];
  emoji: string;
  category: 'math' | 'japanese' | 'english' | 'time' | 'shape' | 'overall';
}

export interface StudyStreak {
  currentStreak: number;
  bestStreak: number;
  lastStudyDate: Date;
  streakRewards: string[];
}

export interface LearningStats {
  totalQuestionsAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageAccuracy: number;
  timeSpentLearning: number; // in minutes
  favoriteSubject: string;
  strongestArea: string;
  improvementArea: string;
  dailyGoalStreak: number;
}

// 学習マイルストーン定義
export const learningMilestones: LearningMilestone[] = [
  // 数学マイルストーン
  {
    id: 'math-first-steps',
    name: '数学の第一歩',
    description: '1から10までの数が完璧に！',
    requiredPoints: 100,
    rewards: ['数字マスターバッジ', '特別スタンプ×3'],
    emoji: '🔢',
    category: 'math'
  },
  {
    id: 'math-addition-master',
    name: 'たし算マスター',
    description: '繰り上がりのたし算ができるように！',
    requiredPoints: 300,
    rewards: ['さくらんぼマスターバッジ', '特別スタンプ×5'],
    emoji: '🌸',
    category: 'math'
  },
  {
    id: 'math-subtraction-hero',
    name: 'ひき算ヒーロー',
    description: '繰り下がりのひき算も完璧！',
    requiredPoints: 500,
    rewards: ['計算ヒーローバッジ', '新しいアバター'],
    emoji: '🦸',
    category: 'math'
  },

  // 日本語マイルストーン
  {
    id: 'japanese-hiragana-complete',
    name: 'ひらがなマスター',
    description: 'ひらがな46文字すべて覚えた！',
    requiredPoints: 400,
    rewards: ['ひらがなマスターバッジ', 'かわいいスタンプ×10'],
    emoji: '🇯🇵',
    category: 'japanese'
  },
  {
    id: 'japanese-katakana-complete',
    name: 'カタカナマスター',
    description: 'カタカナ46文字すべて習得！',
    requiredPoints: 600,
    rewards: ['カタカナマスターバッジ', '外来語スタンプセット'],
    emoji: '🌟',
    category: 'japanese'
  },
  {
    id: 'japanese-kanji-beginner',
    name: '漢字デビュー',
    description: '最初の漢字10個を覚えた！',
    requiredPoints: 700,
    rewards: ['漢字デビューバッジ', '書道セット（デジタル）'],
    emoji: '🎌',
    category: 'japanese'
  },

  // 総合マイルストーン
  {
    id: 'overall-dedicated-learner',
    name: '毎日がんばるマン',
    description: '7日連続で勉強した！',
    requiredPoints: 0, // ストリークベース
    rewards: ['継続バッジ', '特別称号「がんばりや」'],
    emoji: '🏆',
    category: 'overall'
  },
  {
    id: 'overall-knowledge-seeker',
    name: '知識ハンター',
    description: '全科目で問題を解いた！',
    requiredPoints: 200,
    rewards: ['オールラウンダーバッジ', '虹色スタンプ'],
    emoji: '🌈',
    category: 'overall'
  }
];

export class ProgressTracker {
  // 現在の学習レベルを計算
  static calculateLearningLevel(totalPoints: number): { level: number; pointsToNext: number; levelName: string } {
    const levels = [
      { threshold: 0, name: 'しょしんしゃ' },
      { threshold: 100, name: 'がんばりや' },
      { threshold: 300, name: 'べんきょうか' },
      { threshold: 600, name: 'ちえのわ' },
      { threshold: 1000, name: 'がくしゃ' },
      { threshold: 1500, name: 'てんさい' },
      { threshold: 2500, name: 'だいはかせ' }
    ];

    let currentLevel = 0;
    let currentLevelName = levels[0].name;
    
    for (let i = levels.length - 1; i >= 0; i--) {
      if (totalPoints >= levels[i].threshold) {
        currentLevel = i + 1;
        currentLevelName = levels[i].name;
        break;
      }
    }

    const nextLevelIndex = Math.min(currentLevel, levels.length - 1);
    const pointsToNext = nextLevelIndex < levels.length - 1 
      ? levels[nextLevelIndex].threshold - totalPoints 
      : 0;

    return { level: currentLevel, pointsToNext, levelName: currentLevelName };
  }

  // 達成可能なマイルストーンをチェック
  static checkMilestones(progress: UserProgress): LearningMilestone[] {
    const achievableMilestones: LearningMilestone[] = [];
    
    for (const milestone of learningMilestones) {
      // すでに達成済みかチェック
      const alreadyAchieved = progress.achievements.includes(milestone.id);
      if (alreadyAchieved) continue;

      // 達成条件をチェック
      if (milestone.id === 'overall-dedicated-learner') {
        // ストリークベースのマイルストーン
        const currentStreak = progress.streaks.daily || 0;
        if (currentStreak >= 7) {
          achievableMilestones.push(milestone);
        }
      } else if (milestone.id === 'overall-knowledge-seeker') {
        // 全科目体験のマイルストーン
        const subjectCount = Object.keys(progress.currentLevel).length;
        if (subjectCount >= 5 && progress.totalPoints >= milestone.requiredPoints) {
          achievableMilestones.push(milestone);
        }
      } else {
        // ポイントベースのマイルストーン
        if (progress.totalPoints >= milestone.requiredPoints) {
          achievableMilestones.push(milestone);
        }
      }
    }

    return achievableMilestones;
  }

  // 学習統計を計算
  static calculateLearningStats(progress: UserProgress): LearningStats {
    const totalQuestions = progress.weeklyStats.questionsAnswered || 0;
    const correctRate = progress.weeklyStats.correctRate || 0;
    const correctAnswers = Math.round(totalQuestions * correctRate);
    const incorrectAnswers = totalQuestions - correctAnswers;

    // 最も得意な科目を判定
    const subjectProgress = Object.entries(progress.currentLevel);
    let strongestSubject = 'math';
    let maxLevel = 0;
    
    for (const [subject, level] of subjectProgress) {
      const levelNum = this.extractLevelNumber(level);
      if (levelNum > maxLevel) {
        maxLevel = levelNum;
        strongestSubject = subject;
      }
    }

    return {
      totalQuestionsAnswered: totalQuestions,
      correctAnswers,
      incorrectAnswers,
      averageAccuracy: correctRate,
      timeSpentLearning: progress.weeklyStats.timeSpent || 0,
      favoriteSubject: progress.weeklyStats.subjectsStudied[0] || 'math',
      strongestArea: strongestSubject,
      improvementArea: this.findImprovementArea(progress),
      dailyGoalStreak: progress.streaks.daily || 0
    };
  }

  // レベル番号を抽出
  private static extractLevelNumber(levelId: string): number {
    const match = levelId.match(/(\d+)$/);
    return match ? parseInt(match[1]) : 0;
  }

  // 改善が必要な分野を特定
  private static findImprovementArea(progress: UserProgress): string {
    const subjectProgress = Object.entries(progress.currentLevel);
    let weakestSubject = 'math';
    let minLevel = Infinity;
    
    for (const [subject, level] of subjectProgress) {
      const levelNum = this.extractLevelNumber(level);
      if (levelNum < minLevel) {
        minLevel = levelNum;
        weakestSubject = subject;
      }
    }

    return weakestSubject;
  }

  // 今日の学習目標を生成
  static generateDailyGoals(progress: UserProgress): DailyGoal[] {
    const goals: DailyGoal[] = [];
    const currentLevel = this.calculateLearningLevel(progress.totalPoints);

    // 基本的な問題解答目標
    goals.push({
      id: 'daily-questions',
      type: 'questions',
      target: Math.max(5, Math.min(20, currentLevel.level * 3)),
      current: 0,
      completed: false,
      reward: 10,
      emoji: '🎯',
      description: '今日の問題を解こう！'
    });

    // ポイント獲得目標
    goals.push({
      id: 'daily-points',
      type: 'points',
      target: Math.max(50, Math.min(200, currentLevel.level * 25)),
      current: 0,
      completed: false,
      reward: 15,
      emoji: '⭐',
      description: 'ポイントを集めよう！'
    });

    // 正答率目標
    goals.push({
      id: 'daily-accuracy',
      type: 'streak',
      target: 80, // 80%以上の正答率
      current: 0,
      completed: false,
      reward: 20,
      emoji: '🎊',
      description: '正確に答えよう！'
    });

    // 学習時間目標
    goals.push({
      id: 'daily-time',
      type: 'time',
      target: Math.max(10, Math.min(60, currentLevel.level * 5)), // 分単位
      current: 0,
      completed: false,
      reward: 12,
      emoji: '⏰',
      description: '集中して勉強しよう！'
    });

    return goals;
  }

  // 成果を可視化するためのデータ生成
  static generateProgressVisualization(progress: UserProgress) {
    const currentLevel = this.calculateLearningLevel(progress.totalPoints);
    const stats = this.calculateLearningStats(progress);
    const nextMilestones = this.checkMilestones(progress);

    return {
      level: currentLevel,
      stats,
      nextMilestones: nextMilestones.slice(0, 3), // 次の3つのマイルストーン
      recentAchievements: progress.achievements.slice(-5), // 最近の5つの達成
      subjectProgress: this.calculateSubjectProgress(progress),
      motivationalMessage: this.generateMotivationalMessage(currentLevel, stats)
    };
  }

  // 科目別進捗を計算
  private static calculateSubjectProgress(progress: UserProgress) {
    const subjects = ['math', 'japanese', 'english', 'time', 'shape'];
    
    return subjects.map(subject => {
      const currentLevelId = progress.currentLevel[subject];
      const levelNumber = currentLevelId ? this.extractLevelNumber(currentLevelId) : 0;
      const maxLevel = subject === 'math' ? 15 : subject === 'japanese' ? 12 : 8;
      const progressPercentage = Math.round((levelNumber / maxLevel) * 100);

      return {
        subject,
        currentLevel: levelNumber,
        maxLevel,
        progressPercentage,
        emoji: this.getSubjectEmoji(subject)
      };
    });
  }

  // 科目のEmoji取得
  private static getSubjectEmoji(subject: string): string {
    const emojiMap: { [key: string]: string } = {
      math: '🔢',
      japanese: '🇯🇵',
      english: '🇺🇸',
      time: '🕐',
      shape: '🔺'
    };
    return emojiMap[subject] || '📚';
  }

  // やる気を起こすメッセージを生成
  private static generateMotivationalMessage(
    currentLevel: { level: number; levelName: string }, 
    stats: LearningStats
  ): string {
    const messages = [
      `${currentLevel.levelName}として素晴らしい成長ですね！🌟`,
      `正答率${Math.round(stats.averageAccuracy * 100)}%、とても頑張っています！👏`,
      `${stats.totalQuestionsAnswered}問も解いて、本当にすごい！💪`,
      `毎日の積み重ねが大きな力になっています！🚀`,
      `次のレベルまであと少し、頑張って！✨`
    ];

    // 状況に応じてメッセージを選択
    if (stats.dailyGoalStreak >= 7) {
      return '7日連続の学習、素晴らしい習慣ですね！🏆';
    } else if (stats.averageAccuracy >= 0.9) {
      return `正答率${Math.round(stats.averageAccuracy * 100)}%！完璧に近い成績です！🎯`;
    } else if (currentLevel.level >= 5) {
      return `レベル${currentLevel.level}まで到達！真の学習者ですね！🎓`;
    }

    return messages[Math.floor(Math.random() * messages.length)];
  }
}

// 進捗表示用のHTML生成
export const generateProgressHTML = (progress: UserProgress): string => {
  const visualization = ProgressTracker.generateProgressVisualization(progress);
  
  return `
    <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
      <div class="text-center mb-6">
        <div class="text-2xl font-bold text-gray-800 mb-2">
          📊 あなたの学習レポート
        </div>
        <div class="text-lg text-purple-600 font-semibold">
          レベル ${visualization.level.level}: ${visualization.level.levelName}
        </div>
      </div>

      <!-- レベル進捗バー -->
      <div class="bg-white rounded-xl p-4 mb-4 shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-bold text-gray-600">次のレベルまで</span>
          <span class="text-sm text-purple-600">${visualization.level.pointsToNext}ポイント</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" 
               style="width: ${Math.max(10, 100 - (visualization.level.pointsToNext / 100) * 100)}%"></div>
        </div>
      </div>

      <!-- 学習統計 -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-white rounded-xl p-4 text-center shadow-lg">
          <div class="text-2xl font-bold text-green-600">${visualization.stats.totalQuestionsAnswered}</div>
          <div class="text-sm text-gray-600">解いた問題数</div>
        </div>
        <div class="bg-white rounded-xl p-4 text-center shadow-lg">
          <div class="text-2xl font-bold text-blue-600">${Math.round(visualization.stats.averageAccuracy * 100)}%</div>
          <div class="text-sm text-gray-600">正答率</div>
        </div>
      </div>

      <!-- 科目別進捗 -->
      <div class="bg-white rounded-xl p-4 mb-4 shadow-lg">
        <div class="text-lg font-bold text-gray-700 mb-3">📈 科目別進捗</div>
        <div class="space-y-3">
          ${visualization.subjectProgress.map(subject => `
            <div class="flex items-center gap-3">
              <span class="text-xl">${subject.emoji}</span>
              <div class="flex-1">
                <div class="flex justify-between text-sm mb-1">
                  <span class="font-medium">${subject.subject}</span>
                  <span class="text-gray-500">Lv.${subject.currentLevel}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full transition-all duration-500" 
                       style="width: ${subject.progressPercentage}%"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- やる気メッセージ -->
      <div class="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 text-center">
        <div class="text-lg font-bold text-orange-800">
          ${visualization.motivationalMessage}
        </div>
      </div>
    </div>
  `;
};