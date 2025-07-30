import { Badge, UserProgress } from '@/types';
import { StorageManager } from './storage';

export interface AchievementChain {
  id: string;
  name: string;
  description: string;
  stages: AchievementStage[];
  category: 'math' | 'japanese' | 'english' | 'time' | 'shape' | 'general';
  emoji: string;
}

export interface AchievementStage {
  id: string;
  name: string;
  requirement: number;
  reward: number;
  badge?: Badge;
  unlocked: boolean;
  completed: boolean;
}

export interface SeasonalEvent {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  emoji: string;
  color: string;
  specialBadges: Badge[];
  bonusMultiplier: number;
  isActive: boolean;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  level: number;
  totalPoints: number;
  badges: number;
  streak: number;
  lastActive: Date;
}

export class AdvancedGamificationManager {
  // Achievement Chains
  private static achievementChains: AchievementChain[] = [
    {
      id: 'math_journey',
      name: '算数の冒険',
      description: '算数問題をたくさん解いて数学の達人になろう！',
      category: 'math',
      emoji: '🧮',
      stages: [
        {
          id: 'math_1',
          name: '算数初心者',
          requirement: 10,
          reward: 50,
          badge: {
            id: 'math_novice',
            name: '算数初心者',
            description: '算数問題を10問解いた',
            emoji: '🔢',
            type: 'bronze',
            category: 'math',
            unlockedAt: new Date()
          },
          unlocked: true,
          completed: false
        },
        {
          id: 'math_2',
          name: '算数の友達',
          requirement: 50,
          reward: 100,
          badge: {
            id: 'math_friend',
            name: '算数の友達',
            description: '算数問題を50問解いた',
            emoji: '➕',
            type: 'silver',
            category: 'math',
            unlockedAt: new Date()
          },
          unlocked: false,
          completed: false
        },
        {
          id: 'math_3',
          name: '算数マスター',
          requirement: 100,
          reward: 200,
          badge: {
            id: 'math_master_chain',
            name: '算数マスター',
            description: '算数問題を100問解いた',
            emoji: '🏅',
            type: 'gold',
            category: 'math',
            unlockedAt: new Date()
          },
          unlocked: false,
          completed: false
        }
      ]
    },
    {
      id: 'streak_master',
      name: '連続学習チャンピオン',
      description: '毎日学習を続けて継続の力を身につけよう！',
      category: 'general',
      emoji: '🔥',
      stages: [
        {
          id: 'streak_3',
          name: '3日連続',
          requirement: 3,
          reward: 75,
          badge: {
            id: 'streak_3_days',
            name: '3日連続学習',
            description: '3日連続で学習した',
            emoji: '🔥',
            type: 'bronze',
            category: 'general',
            unlockedAt: new Date()
          },
          unlocked: true,
          completed: false
        },
        {
          id: 'streak_7',
          name: '1週間連続',
          requirement: 7,
          reward: 150,
          badge: {
            id: 'streak_week',
            name: '1週間連続学習',
            description: '7日連続で学習した',
            emoji: '⚡',
            type: 'silver',
            category: 'general',
            unlockedAt: new Date()
          },
          unlocked: false,
          completed: false
        },
        {
          id: 'streak_30',
          name: '1ヶ月連続',
          requirement: 30,
          reward: 500,
          badge: {
            id: 'streak_month',
            name: '1ヶ月連続学習',
            description: '30日連続で学習した',
            emoji: '👑',
            type: 'gold',
            category: 'general',
            unlockedAt: new Date()
          },
          unlocked: false,
          completed: false
        }
      ]
    },
    {
      id: 'time_master',
      name: '時計読みの名人',
      description: '時計の読み方をマスターしよう！',
      category: 'time',
      emoji: '🕐',
      stages: [
        {
          id: 'time_basic',
          name: '時計ビギナー',
          requirement: 5,
          reward: 40,
          badge: {
            id: 'time_beginner',
            name: '時計ビギナー',
            description: '時計問題を5問解いた',
            emoji: '⏰',
            type: 'bronze',
            category: 'time',
            unlockedAt: new Date()
          },
          unlocked: true,
          completed: false
        },
        {
          id: 'time_advanced',
          name: '時計マスター',
          requirement: 20,
          reward: 120,
          badge: {
            id: 'time_master_badge',
            name: '時計マスター',
            description: '時計問題を20問解いた',
            emoji: '🕰️',
            type: 'gold',
            category: 'time',
            unlockedAt: new Date()
          },
          unlocked: false,
          completed: false
        }
      ]
    },
    {
      id: 'shape_explorer',
      name: '図形探検家',
      description: 'いろいろな図形を覚えて図形の専門家になろう！',
      category: 'shape',
      emoji: '🔺',
      stages: [
        {
          id: 'shape_basic',
          name: '図形ビギナー',
          requirement: 5,
          reward: 40,
          badge: {
            id: 'shape_beginner',
            name: '図形ビギナー',
            description: '図形問題を5問解いた',
            emoji: '⭐',
            type: 'bronze',
            category: 'shape',
            unlockedAt: new Date()
          },
          unlocked: true,
          completed: false
        },
        {
          id: 'shape_expert',
          name: '図形エキスパート',
          requirement: 15,
          reward: 100,
          badge: {
            id: 'shape_expert_badge',
            name: '図形エキスパート',
            description: '図形問題を15問解いた',
            emoji: '🔷',
            type: 'gold',
            category: 'shape',
            unlockedAt: new Date()
          },
          unlocked: false,
          completed: false
        }
      ]
    }
  ];

  // Seasonal Events
  private static seasonalEvents: SeasonalEvent[] = [
    {
      id: 'spring_festival',
      name: '春の学習祭り',
      description: '桜の季節に特別ボーナス！',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-05-31'),
      emoji: '🌸',
      color: 'from-pink-400 to-rose-500',
      bonusMultiplier: 1.5,
      isActive: false,
      specialBadges: [
        {
          id: 'spring_learner',
          name: '春の学習者',
          description: '春の学習祭りに参加した',
          emoji: '🌸',
          type: 'special',
          category: 'general',
          unlockedAt: new Date()
        }
      ]
    },
    {
      id: 'summer_adventure',
      name: '夏の大冒険',
      description: '夏休みの特別イベント！',
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-08-31'),
      emoji: '🌞',
      color: 'from-yellow-400 to-orange-500',
      bonusMultiplier: 2.0,
      isActive: false,
      specialBadges: [
        {
          id: 'summer_explorer',
          name: '夏の探検家',
          description: '夏の大冒険に参加した',
          emoji: '🌞',
          type: 'special',
          category: 'general',
          unlockedAt: new Date()
        }
      ]
    },
    {
      id: 'winter_challenge',
      name: '冬のチャレンジ',
      description: '雪の季節の特別チャレンジ！',
      startDate: new Date('2024-12-01'),
      endDate: new Date('2025-02-28'),
      emoji: '❄️',
      color: 'from-blue-400 to-cyan-500',
      bonusMultiplier: 1.8,
      isActive: true, // Currently active for demo
      specialBadges: [
        {
          id: 'winter_warrior',
          name: '冬の戦士',
          description: '冬のチャレンジに参加した',
          emoji: '❄️',
          type: 'special',
          category: 'general',
          unlockedAt: new Date()
        }
      ]
    }
  ];

  // Achievement Chain Management
  static getAchievementChains(): AchievementChain[] {
    return this.achievementChains;
  }

  static updateAchievementProgress(
    progress: UserProgress,
    category: string,
    type: 'questions' | 'streak' | 'points',
    amount: number
  ): { updatedChains: AchievementChain[]; newBadges: Badge[]; pointsEarned: number } {
    const newBadges: Badge[] = [];
    let pointsEarned = 0;
    
    const updatedChains = this.achievementChains.map(chain => {
      if (chain.category !== category && chain.category !== 'general') {
        return chain;
      }

      const updatedStages = chain.stages.map(stage => {
        if (stage.completed) return stage;

        let currentProgress = 0;
        
        // Determine current progress based on type
        switch (type) {
          case 'questions':
            if (chain.category === 'math' && category === 'math') {
              currentProgress = this.getMathQuestionsCount(progress);
            } else if (chain.category === 'time' && category === 'time') {
              currentProgress = this.getTimeQuestionsCount(progress);
            } else if (chain.category === 'shape' && category === 'shape') {
              currentProgress = this.getShapeQuestionsCount(progress);
            }
            break;
          case 'streak':
            if (chain.id === 'streak_master') {
              currentProgress = Math.max(...Object.values(progress.streaks));
            }
            break;
          case 'points':
            currentProgress = progress.totalPoints;
            break;
        }

        if (currentProgress >= stage.requirement && !stage.completed) {
          const updatedStage = {
            ...stage,
            completed: true
          };

          if (stage.badge) {
            newBadges.push(stage.badge);
          }
          pointsEarned += stage.reward;

          return updatedStage;
        }

        return stage;
      });

      return {
        ...chain,
        stages: updatedStages
      };
    });

    return { updatedChains, newBadges, pointsEarned };
  }

  private static getMathQuestionsCount(progress: UserProgress): number {
    // Estimate based on completed levels and current activity
    return progress.completedLevels.filter(level => level.startsWith('math-')).length * 8;
  }

  private static getTimeQuestionsCount(progress: UserProgress): number {
    return progress.completedLevels.filter(level => level.startsWith('time-')).length * 6;
  }

  private static getShapeQuestionsCount(progress: UserProgress): number {
    return progress.completedLevels.filter(level => level.startsWith('shape-')).length * 6;
  }

  // Seasonal Events
  static getCurrentSeasonalEvent(): SeasonalEvent | null {
    const now = new Date();
    return this.seasonalEvents.find(event => 
      now >= event.startDate && now <= event.endDate && event.isActive
    ) || null;
  }

  static getSeasonalBonus(): number {
    const currentEvent = this.getCurrentSeasonalEvent();
    return currentEvent ? currentEvent.bonusMultiplier : 1.0;
  }

  static getSeasonalBadges(): Badge[] {
    const currentEvent = this.getCurrentSeasonalEvent();
    return currentEvent ? currentEvent.specialBadges : [];
  }

  // Leaderboard System
  static createLeaderboardEntry(progress: UserProgress, name: string = 'プレイヤー'): LeaderboardEntry {
    return {
      id: `player-${Math.random().toString(36).substr(2, 9)}`,
      name: name,
      level: progress.playerLevel,
      totalPoints: progress.totalPoints,
      badges: progress.badges.length,
      streak: Math.max(...Object.values(progress.streaks), 0),
      lastActive: new Date()
    };
  }

  static generateMockLeaderboard(userEntry: LeaderboardEntry): LeaderboardEntry[] {
    const mockEntries: LeaderboardEntry[] = [
      {
        id: 'player_1',
        name: 'さくらちゃん',
        level: 8,
        totalPoints: 1250,
        badges: 12,
        streak: 15,
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000)
      },
      {
        id: 'player_2',
        name: 'ひろきくん',
        level: 7,
        totalPoints: 980,
        badges: 9,
        streak: 8,
        lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'player_3',
        name: 'あいちゃん',
        level: 6,
        totalPoints: 750,
        badges: 8,
        streak: 12,
        lastActive: new Date()
      },
      {
        id: 'player_4',
        name: 'たくみくん',
        level: 5,
        totalPoints: 600,
        badges: 6,
        streak: 5,
        lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'player_5',
        name: 'ゆきちゃん',
        level: 4,
        totalPoints: 450,
        badges: 5,
        streak: 3,
        lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ];

    // Add user entry and sort by total points
    const allEntries = [...mockEntries, userEntry];
    return allEntries.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  // Daily Challenge System
  static generateDailyChallenge(): {
    id: string;
    name: string;
    description: string;
    subject: string;
    target: number;
    reward: number;
    emoji: string;
    timeLimit: Date;
  } {
    const challenges = [
      {
        id: 'math_sprint',
        name: '算数スプリント',
        description: '算数問題を15問連続で正解しよう',
        subject: 'math',
        target: 15,
        reward: 200,
        emoji: '🏃‍♂️'
      },
      {
        id: 'perfect_time',
        name: '時計完璧チャレンジ',
        description: '時計問題を10問連続正解',
        subject: 'time',
        target: 10,
        reward: 150,
        emoji: '⏰'
      },
      {
        id: 'shape_master',
        name: '図形マスターチャレンジ',
        description: '図形問題を12問連続正解',
        subject: 'shape',
        target: 12,
        reward: 180,
        emoji: '🔺'
      },
      {
        id: 'speed_learning',
        name: 'スピード学習',
        description: '20分以内に25問解く',
        subject: 'any',
        target: 25,
        reward: 250,
        emoji: '⚡'
      }
    ];

    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999);

    return {
      ...challenge,
      timeLimit: tomorrow
    };
  }

  // Achievement Statistics
  static getAchievementStats(progress: UserProgress): {
    totalAchievements: number;
    completedAchievements: number;
    completionRate: number;
    nextMilestone: string | null;
  } {
    let totalAchievements = 0;
    let completedAchievements = 0;
    let nextMilestone: string | null = null;

    for (const chain of this.achievementChains) {
      for (const stage of chain.stages) {
        totalAchievements++;
        if (stage.completed) {
          completedAchievements++;
        } else if (!nextMilestone && stage.unlocked) {
          nextMilestone = stage.name;
        }
      }
    }

    return {
      totalAchievements,
      completedAchievements,
      completionRate: Math.round((completedAchievements / totalAchievements) * 100),
      nextMilestone
    };
  }

  // Helper function to create celebration effects
  static createAchievementUnlockEffect(achievement: AchievementStage): void {
    if (typeof window === 'undefined') return;

    // Create confetti effect
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
    
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);

        const animation = confetti.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
        ], {
          duration: 3000 + Math.random() * 2000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        animation.onfinish = () => {
          confetti.remove();
        };
      }, i * 100);
    }

    // Create achievement notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        z-index: 10001;
        animation: achievementPop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      ">
        <div style="font-size: 48px; margin-bottom: 10px;">${achievement.badge?.emoji || '🏆'}</div>
        <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">新しい称号獲得！</div>
        <div style="font-size: 18px; margin-bottom: 10px;">${achievement.name}</div>
        <div style="font-size: 14px; opacity: 0.9;">+${achievement.reward} ポイント獲得！</div>
      </div>
    `;

    // Add keyframes if not already added
    if (!document.getElementById('achievement-keyframes')) {
      const style = document.createElement('style');
      style.id = 'achievement-keyframes';
      style.textContent = `
        @keyframes achievementPop {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
      notification.remove();
    }, 4000);
  }
}