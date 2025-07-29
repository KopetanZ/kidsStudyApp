import { Badge, DailyGoal, WeeklyStats, UserProgress } from '@/types';

export class GamificationManager {
  private static badges: Badge[] = [
    // Math badges
    { id: 'first_math', name: '算数デビュー', description: '初めての算数問題を解いた', emoji: '🔢', type: 'bronze', category: 'math', unlockedAt: new Date() },
    { id: 'math_streak_3', name: '算数連続3日', description: '3日連続で算数を学習', emoji: '🔥', type: 'silver', category: 'math', unlockedAt: new Date() },
    { id: 'math_master', name: '算数マスター', description: '算数で100問正解', emoji: '🧮', type: 'gold', category: 'math', unlockedAt: new Date() },
    
    // Japanese badges
    { id: 'first_hiragana', name: 'ひらがなデビュー', description: '初めてひらがなを書いた', emoji: '🇯🇵', type: 'bronze', category: 'japanese', unlockedAt: new Date() },
    { id: 'katakana_complete', name: 'カタカナ完了', description: 'カタカナをすべて覚えた', emoji: '📝', type: 'gold', category: 'japanese', unlockedAt: new Date() },
    
    // English badges
    { id: 'first_english', name: 'English Start', description: '初めての英語学習', emoji: '🇺🇸', type: 'bronze', category: 'english', unlockedAt: new Date() },
    { id: 'alphabet_master', name: 'アルファベットマスター', description: 'アルファベットを完全制覇', emoji: '🔤', type: 'gold', category: 'english', unlockedAt: new Date() },
    
    // General badges
    { id: 'early_bird', name: '早起き学習者', description: '朝6時前に学習開始', emoji: '🌅', type: 'special', category: 'general', unlockedAt: new Date() },
    { id: 'night_owl', name: '夜更かし学習者', description: '夜9時以降に学習', emoji: '🦉', type: 'special', category: 'general', unlockedAt: new Date() },
    { id: 'week_warrior', name: '1週間チャレンジャー', description: '7日連続で学習', emoji: '⚡', type: 'gold', category: 'general', unlockedAt: new Date() },
    { id: 'perfect_score', name: 'パーフェクト', description: '10問連続正解', emoji: '💯', type: 'gold', category: 'general', unlockedAt: new Date() }
  ];

  private static dailyGoalTemplates: Omit<DailyGoal, 'current' | 'completed'>[] = [
    { id: 'daily_questions', type: 'questions', target: 10, reward: 50, emoji: '❓', description: '10問解く' },
    { id: 'daily_points', type: 'points', target: 100, reward: 30, emoji: '⭐', description: '100ポイント獲得' },
    { id: 'daily_streak', type: 'streak', target: 1, reward: 20, emoji: '🔥', description: '連続学習を継続' },
    { id: 'daily_time', type: 'time', target: 15, reward: 40, emoji: '⏰', description: '15分間学習' }
  ];

  static generateDailyGoals(): DailyGoal[] {
    return this.dailyGoalTemplates.map(template => ({
      ...template,
      current: 0,
      completed: false
    }));
  }

  static checkBadgeUnlock(progress: UserProgress, action: string, data?: unknown): Badge[] {
    const newBadges: Badge[] = [];
    const currentBadgeIds = progress.badges.map(b => b.id);

    // Check specific badge conditions
    switch (action) {
      case 'first_question':
        if (data && typeof data === 'object' && 'subject' in data) {
          const subject = data.subject as string;
          if (subject === 'math' && !currentBadgeIds.includes('first_math')) {
            newBadges.push(this.badges.find(b => b.id === 'first_math')!);
          }
          if (subject === 'japanese' && !currentBadgeIds.includes('first_hiragana')) {
            newBadges.push(this.badges.find(b => b.id === 'first_hiragana')!);
          }
          if (subject === 'english' && !currentBadgeIds.includes('first_english')) {
            newBadges.push(this.badges.find(b => b.id === 'first_english')!);
          }
        }
        break;

      case 'streak_update':
        if (data && typeof data === 'object') {
          if ('subject' in data && 'streak' in data) {
            const subject = data.subject as string;
            const streak = data.streak as number;
            if (subject === 'math' && streak >= 3 && !currentBadgeIds.includes('math_streak_3')) {
              newBadges.push(this.badges.find(b => b.id === 'math_streak_3')!);
            }
            if (streak >= 7 && !currentBadgeIds.includes('week_warrior')) {
              newBadges.push(this.badges.find(b => b.id === 'week_warrior')!);
            }
          }
        }
        break;

      case 'perfect_score':
        if (data && typeof data === 'object' && 'consecutiveCorrect' in data) {
          const consecutiveCorrect = data.consecutiveCorrect as number;
          if (consecutiveCorrect >= 10 && !currentBadgeIds.includes('perfect_score')) {
            newBadges.push(this.badges.find(b => b.id === 'perfect_score')!);
          }
        }
        break;

      case 'time_check':
        const hour = new Date().getHours();
        if (hour < 6 && !currentBadgeIds.includes('early_bird')) {
          newBadges.push(this.badges.find(b => b.id === 'early_bird')!);
        }
        if (hour >= 21 && !currentBadgeIds.includes('night_owl')) {
          newBadges.push(this.badges.find(b => b.id === 'night_owl')!);
        }
        break;
    }

    return newBadges;
  }

  static calculatePlayerLevel(experiencePoints: number): number {
    // レベルアップに必要な経験値: 100, 250, 450, 700, 1000, ...
    let level = 1;
    let requiredXP = 100;
    let totalXP = 0;

    while (totalXP + requiredXP <= experiencePoints) {
      totalXP += requiredXP;
      level++;
      requiredXP = level * 150;
    }

    return level;
  }

  static getXPForNextLevel(currentXP: number): { current: number; required: number; level: number } {
    const currentLevel = this.calculatePlayerLevel(currentXP);
    let totalXP = 0;
    
    for (let i = 1; i < currentLevel; i++) {
      totalXP += i * 150;
    }

    const requiredForNext = currentLevel * 150;
    const currentLevelXP = currentXP - totalXP;

    return {
      current: currentLevelXP,
      required: requiredForNext,
      level: currentLevel
    };
  }

  static updateDailyGoals(goals: DailyGoal[], action: string, amount: number = 1): DailyGoal[] {
    return goals.map(goal => {
      const updatedGoal = { ...goal };

      switch (action) {
        case 'answer_question':
          if (goal.type === 'questions') {
            updatedGoal.current = Math.min(goal.current + amount, goal.target);
          }
          break;
        case 'earn_points':
          if (goal.type === 'points') {
            updatedGoal.current = Math.min(goal.current + amount, goal.target);
          }
          break;
        case 'study_time':
          if (goal.type === 'time') {
            updatedGoal.current = Math.min(goal.current + amount, goal.target);
          }
          break;
        case 'update_streak':
          if (goal.type === 'streak') {
            updatedGoal.current = Math.min(goal.current + amount, goal.target);
          }
          break;
      }

      updatedGoal.completed = updatedGoal.current >= updatedGoal.target;
      return updatedGoal;
    });
  }

  static getLevelUpRewards(newLevel: number): { points: number; badges: Badge[] } {
    const rewards = {
      points: newLevel * 50,
      badges: [] as Badge[]
    };

    // Special level rewards
    if (newLevel === 5) {
      rewards.badges.push({
        id: 'level_5',
        name: 'レベル5達成',
        description: 'プレイヤーレベル5に到達',
        emoji: '🌟',
        type: 'silver',
        category: 'general',
        unlockedAt: new Date()
      });
    }

    if (newLevel === 10) {
      rewards.badges.push({
        id: 'level_10',
        name: 'レベル10達成',
        description: 'プレイヤーレベル10に到達',
        emoji: '🏆',
        type: 'gold',
        category: 'general',
        unlockedAt: new Date()
      });
    }

    return rewards;
  }

  static createWeeklyStats(): WeeklyStats {
    return {
      questionsAnswered: 0,
      correctRate: 0,
      timeSpent: 0,
      subjectsStudied: [],
      bestStreak: 0
    };
  }

  static updateWeeklyStats(stats: WeeklyStats, data: {
    questionsAnswered?: number;
    correctAnswers?: number;
    timeSpent?: number;
    subject?: string;
    streak?: number;
  }): WeeklyStats {
    const updated = { ...stats };

    if (data.questionsAnswered) {
      updated.questionsAnswered += data.questionsAnswered;
      
      if (data.correctAnswers) {
        const totalCorrect = (stats.correctRate * stats.questionsAnswered + data.correctAnswers) / 100;
        updated.correctRate = Math.round((totalCorrect / updated.questionsAnswered) * 100);
      }
    }

    if (data.timeSpent) {
      updated.timeSpent += data.timeSpent;
    }

    if (data.subject && !updated.subjectsStudied.includes(data.subject)) {
      updated.subjectsStudied.push(data.subject);
    }

    if (data.streak && data.streak > updated.bestStreak) {
      updated.bestStreak = data.streak;
    }

    return updated;
  }
}