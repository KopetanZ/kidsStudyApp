import { UserProgress, Badge } from '@/types';
import { GamificationManager } from './gamification';

const STORAGE_KEY = 'kids-study-progress';
const SETTINGS_KEY = 'kids-study-settings';

export class StorageManager {
  static getProgress(): UserProgress {
    if (typeof window === 'undefined') {
      return this.getDefaultProgress();
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }

    return this.getDefaultProgress();
  }

  static saveProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  static addPoints(points: number): UserProgress {
    const progress = this.getProgress();
    progress.totalPoints += points;
    this.saveProgress(progress);
    return progress;
  }

  static completeLevel(levelId: string): UserProgress {
    const progress = this.getProgress();
    if (!progress.completedLevels.includes(levelId)) {
      progress.completedLevels.push(levelId);
    }
    this.saveProgress(progress);
    return progress;
  }

  static updateStreak(subjectId: string): UserProgress {
    const progress = this.getProgress();
    progress.streaks[subjectId] = (progress.streaks[subjectId] || 0) + 1;
    this.saveProgress(progress);
    return progress;
  }

  static resetStreak(subjectId: string): UserProgress {
    const progress = this.getProgress();
    progress.streaks[subjectId] = 0;
    this.saveProgress(progress);
    return progress;
  }

  static setCurrentLevel(subjectId: string, levelId: string): UserProgress {
    const progress = this.getProgress();
    progress.currentLevel[subjectId] = levelId;
    this.saveProgress(progress);
    return progress;
  }

  static addAchievement(achievementId: string): UserProgress {
    const progress = this.getProgress();
    if (!progress.achievements.includes(achievementId)) {
      progress.achievements.push(achievementId);
    }
    this.saveProgress(progress);
    return progress;
  }

  static clearProgress(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing progress:', error);
    }
  }

  private static getDefaultProgress(): UserProgress {
    return {
      totalPoints: 0,
      completedLevels: [],
      currentLevel: {
        math: 'math-addition-1',
        japanese: 'japanese-hiragana-1',
        english: 'english-alphabet-1'
      },
      achievements: [],
      streaks: {
        math: 0,
        japanese: 0,
        english: 0
      },
      badges: [],
      experiencePoints: 0,
      playerLevel: 1,
      dailyGoals: GamificationManager.generateDailyGoals(),
      weeklyStats: GamificationManager.createWeeklyStats()
    };
  }

  static addExperience(xp: number): UserProgress {
    const progress = this.getProgress();
    const oldLevel = progress.playerLevel;
    progress.experiencePoints += xp;
    progress.playerLevel = GamificationManager.calculatePlayerLevel(progress.experiencePoints);
    
    // Check for level up rewards
    if (progress.playerLevel > oldLevel) {
      const rewards = GamificationManager.getLevelUpRewards(progress.playerLevel);
      progress.totalPoints += rewards.points;
      progress.badges.push(...rewards.badges);
    }
    
    this.saveProgress(progress);
    return progress;
  }

  static addBadge(badge: Badge): UserProgress {
    const progress = this.getProgress();
    const existingBadge = progress.badges.find(b => b.id === badge.id);
    if (!existingBadge) {
      progress.badges.push({ ...badge, unlockedAt: new Date() });
    }
    this.saveProgress(progress);
    return progress;
  }

  static updateDailyGoals(action: string, amount: number = 1): UserProgress {
    const progress = this.getProgress();
    progress.dailyGoals = GamificationManager.updateDailyGoals(
      progress.dailyGoals, 
      action, 
      amount
    );
    
    // Award points for completed goals
    progress.dailyGoals.forEach(goal => {
      if (goal.completed && goal.current === goal.target) {
        progress.totalPoints += goal.reward;
        progress.experiencePoints += goal.reward / 2;
      }
    });
    
    this.saveProgress(progress);
    return progress;
  }

  static updateWeeklyStats(data: {
    questionsAnswered?: number;
    correctAnswers?: number;
    timeSpent?: number;
    subject?: string;
    streak?: number;
  }): UserProgress {
    const progress = this.getProgress();
    progress.weeklyStats = GamificationManager.updateWeeklyStats(
      progress.weeklyStats, 
      data
    );
    this.saveProgress(progress);
    return progress;
  }

  static resetDailyGoals(): UserProgress {
    const progress = this.getProgress();
    progress.dailyGoals = GamificationManager.generateDailyGoals();
    this.saveProgress(progress);
    return progress;
  }

  static checkAndAwardBadges(action: string, data?: unknown): UserProgress {
    const progress = this.getProgress();
    const newBadges = GamificationManager.checkBadgeUnlock(progress, action, data);
    
    newBadges.forEach(badge => {
      progress.badges.push({ ...badge, unlockedAt: new Date() });
      // Award bonus XP for badge unlock
      progress.experiencePoints += 25;
    });
    
    if (newBadges.length > 0) {
      this.saveProgress(progress);
    }
    
    return progress;
  }

  // Settings management
  static getSettings(): any {
    if (typeof window === 'undefined') return this.getDefaultSettings();
    
    try {
      const settings = localStorage.getItem(SETTINGS_KEY);
      return settings ? JSON.parse(settings) : this.getDefaultSettings();
    } catch (error) {
      console.error('Failed to load settings:', error);
      return this.getDefaultSettings();
    }
  }

  static updateSettings(newSettings: any): void {
    if (typeof window === 'undefined') return;
    
    try {
      const currentSettings = this.getSettings();
      const updatedSettings = { ...currentSettings, ...newSettings };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  private static getDefaultSettings(): any {
    return {
      muteOverride: false,
      silentSwitchDetection: true,
      soundVolume: 1.0,
      speechRate: 0.8,
      notifications: true
    };
  }
}

// Achievement system
export const achievements = [
  {
    id: 'first-correct',
    name: '初回正解！',
    description: '初めて問題に正解しました',
    icon: '🎉',
    condition: (progress: UserProgress) => progress.totalPoints >= 10
  },
  {
    id: 'math-master',
    name: '算数マスター',
    description: '算数で100ポイント獲得',
    icon: '🔢',
    condition: (progress: UserProgress) => progress.totalPoints >= 100
  },
  {
    id: 'streak-master',
    name: '連続記録！',
    description: '5日連続で学習',
    icon: '🔥',
    condition: (progress: UserProgress) => 
      Object.values(progress.streaks).some(streak => streak >= 5)
  },
  {
    id: 'level-completer',
    name: 'レベルクリア',
    description: '10個のレベルをクリア',
    icon: '🏆',
    condition: (progress: UserProgress) => progress.completedLevels.length >= 10
  }
];

export const checkAchievements = (progress: UserProgress): string[] => {
  const newAchievements: string[] = [];
  
  achievements.forEach(achievement => {
    if (!progress.achievements.includes(achievement.id) && 
        achievement.condition(progress)) {
      newAchievements.push(achievement.id);
    }
  });

  return newAchievements;
};