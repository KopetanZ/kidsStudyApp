// ポケモンアチーブメントシステム
import { Badge, UserProgress } from '@/types';
import { PokemonAPI, Pokemon } from './pokemon-api';
import { StorageManager } from './storage';

export interface PokemonBadge extends Badge {
  pokemonId: number;
  pokemonName: string;
  typeElement: string; // ポケモンタイプ（ほのお、みず等）
  isShiny: boolean;
  requirements: {
    type: 'points' | 'streak' | 'levels' | 'accuracy' | 'special';
    value: number;
    subject?: string;
  };
}

export interface PokemonReward {
  pokemon: Pokemon;
  isShiny: boolean;
  rewardType: 'achievement' | 'milestone' | 'special' | 'daily';
  message: string;
}

export class PokemonAchievementSystem {
  private static instance: PokemonAchievementSystem;
  private pokemonAPI = PokemonAPI.getInstance();

  private constructor() {}

  static getInstance(): PokemonAchievementSystem {
    if (!PokemonAchievementSystem.instance) {
      PokemonAchievementSystem.instance = new PokemonAchievementSystem();
    }
    return PokemonAchievementSystem.instance;
  }

  // ポケモンバッジの定義
  private getPokemonBadgeDefinitions(): PokemonBadge[] {
    return [
      // 算数系バッジ（でんきタイプ）
      {
        id: 'pokemon-math-starter',
        name: 'でんきタイプトレーナー',
        description: '算数の問題を10問正解してピカチュウをゲット！',
        emoji: '⚡',
        pokemonId: 25,
        pokemonName: 'ピカチュウ',
        typeElement: 'でんき',
        type: 'gold',
        category: 'math',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'points', value: 100, subject: 'math' }
      },
      {
        id: 'pokemon-math-expert',
        name: 'でんきタイプエキスパート',
        description: '算数マスター！ライチュウをゲット！',
        emoji: '⚡',
        pokemonId: 26,
        pokemonName: 'ライチュウ',
        typeElement: 'でんき',
        type: 'gold',
        category: 'math',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'points', value: 500, subject: 'math' }
      },
      {
        id: 'pokemon-math-legend',
        name: 'でんきタイプレジェンド',
        description: '算数の神！色違いライチュウをゲット！',
        emoji: '⚡',
        pokemonId: 26,
        pokemonName: 'ライチュウ',
        typeElement: 'でんき',
        type: 'special',
        category: 'math',
        unlockedAt: new Date(),
        isShiny: true,
        requirements: { type: 'points', value: 2000, subject: 'math' }
      },

      // 国語系バッジ（エスパータイプ）
      {
        id: 'pokemon-japanese-starter',
        name: 'エスパータイプトレーナー',
        description: '国語の問題を10問正解してケーシィをゲット！',
        emoji: '🔮',
        pokemonId: 63,
        pokemonName: 'ケーシィ',
        typeElement: 'エスパー',
        type: 'gold',
        category: 'japanese',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'points', value: 100, subject: 'japanese' }
      },
      {
        id: 'pokemon-japanese-expert',
        name: 'エスパータイプエキスパート',
        description: '国語マスター！フーディンをゲット！',
        emoji: '🔮',
        pokemonId: 65,
        pokemonName: 'フーディン',
        typeElement: 'エスパー',
        type: 'gold',
        category: 'japanese',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'points', value: 500, subject: 'japanese' }
      },

      // 英語系バッジ（ひこうタイプ）
      {
        id: 'pokemon-english-starter',
        name: 'ひこうタイプトレーナー',
        description: '英語の問題を10問正解してポッポをゲット！',
        emoji: '🕊️',
        pokemonId: 16,
        pokemonName: 'ポッポ',
        typeElement: 'ひこう',
        type: 'gold',
        category: 'english',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'points', value: 100, subject: 'english' }
      },

      // 連続学習バッジ（ほのおタイプ）
      {
        id: 'pokemon-streak-fire',
        name: 'ほのおタイプトレーナー',
        description: '3日連続学習でヒトカゲをゲット！',
        emoji: '🔥',
        pokemonId: 4,
        pokemonName: 'ヒトカゲ',
        typeElement: 'ほのお',
        type: 'gold',
        category: 'general',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'streak', value: 3 }
      },
      {
        id: 'pokemon-streak-fire-expert',
        name: 'ほのおタイプエキスパート',
        description: '7日連続学習でリザードンをゲット！',
        emoji: '🔥',
        pokemonId: 6,
        pokemonName: 'リザードン',
        typeElement: 'ほのお',
        type: 'special',
        category: 'general',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'streak', value: 7 }
      },

      // 高精度バッジ（みずタイプ）
      {
        id: 'pokemon-accuracy-water',
        name: 'みずタイプトレーナー',
        description: '正解率90%以上でゼニガメをゲット！',
        emoji: '💧',
        pokemonId: 7,
        pokemonName: 'ゼニガメ',
        typeElement: 'みず',
        type: 'gold',
        category: 'general',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'accuracy', value: 90 }
      },

      // 総レベル完了バッジ（くさタイプ）
      {
        id: 'pokemon-levels-grass',
        name: 'くさタイプトレーナー',
        description: '10レベル完了でフシギダネをゲット！',
        emoji: '🌱',
        pokemonId: 1,
        pokemonName: 'フシギダネ',
        typeElement: 'くさ',
        type: 'gold',
        category: 'general',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'levels', value: 10 }
      },

      // 特別バッジ（伝説ポケモン）
      {
        id: 'pokemon-special-mew',
        name: '幻のポケモントレーナー',
        description: '全科目で高得点を取ってミュウをゲット！',
        emoji: '🌟',
        pokemonId: 151,
        pokemonName: 'ミュウ',
        typeElement: 'エスパー',
        type: 'special',
        category: 'general',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'special', value: 1000 }
      },
      {
        id: 'pokemon-special-mewtwo',
        name: '最強のポケモントレーナー',
        description: '総合ポイント5000以上でミュウツーをゲット！',
        emoji: '💜',
        pokemonId: 150,
        pokemonName: 'ミュウツー',
        typeElement: 'エスパー',
        type: 'special',
        category: 'general',
        unlockedAt: new Date(),
        isShiny: false,
        requirements: { type: 'points', value: 5000 }
      }
    ];
  }

  // 新しいバッジをチェックして付与
  async checkAndAwardBadges(progress: UserProgress): Promise<PokemonReward[]> {
    const rewards: PokemonReward[] = [];
    const badges = this.getPokemonBadgeDefinitions();
    const currentBadgeIds = progress.badges.map(b => b.id);

    for (const badge of badges) {
      if (currentBadgeIds.includes(badge.id)) continue;

      if (this.checkBadgeRequirements(badge, progress)) {
        // バッジを付与
        progress.badges.push(badge);
        
        // ポケモンをコレクションに追加
        if (!progress.pokemonCollection) progress.pokemonCollection = [];
        if (!progress.pokemonCollection.includes(badge.pokemonId)) {
          progress.pokemonCollection.push(badge.pokemonId);
        }
        
        // シャイニーの記録
        if (badge.isShiny) {
          if (!progress.shinyCounts) progress.shinyCounts = {};
          progress.shinyCounts[badge.pokemonId] = true;
        }

        // ポケモンデータを取得してリワードに追加
        const pokemon = await this.pokemonAPI.getPokemon(badge.pokemonId);
        if (pokemon) {
          rewards.push({
            pokemon,
            isShiny: badge.isShiny,
            rewardType: 'achievement',
            message: `${badge.name}を獲得！${badge.pokemonName}をゲットしました！`
          });
        }
      }
    }

    if (rewards.length > 0) {
      StorageManager.saveProgress(progress);
    }

    return rewards;
  }

  // バッジ要件をチェック
  private checkBadgeRequirements(badge: PokemonBadge, progress: UserProgress): boolean {
    const req = badge.requirements;

    switch (req.type) {
      case 'points':
        if (req.subject) {
          // 特定の科目のポイント
          return this.getSubjectPoints(progress, req.subject) >= req.value;
        } else {
          // 総ポイント
          return progress.totalPoints >= req.value;
        }

      case 'streak':
        const maxStreak = Math.max(...Object.values(progress.streaks));
        return maxStreak >= req.value;

      case 'levels':
        return progress.completedLevels.length >= req.value;

      case 'accuracy':
        return progress.weeklyStats.correctRate >= req.value;

      case 'special':
        // 特別条件：全科目でそれぞれ一定以上のポイント
        const subjects = ['math', 'japanese', 'english', 'time', 'shape'];
        return subjects.every(subject => 
          this.getSubjectPoints(progress, subject) >= req.value / subjects.length
        );

      default:
        return false;
    }
  }

  // 科目別ポイント計算
  private getSubjectPoints(progress: UserProgress, subject: string): number {
    const subjectLevels = progress.completedLevels.filter(level => 
      level.startsWith(subject)
    );
    return subjectLevels.length * 20; // レベルあたり20ポイントと仮定
  }

  // 日次ポケモン報酬
  async getDailyPokemonReward(): Promise<PokemonReward | null> {
    const today = new Date().toDateString();
    const lastReward = localStorage.getItem('pokemon-daily-reward');

    if (lastReward === today) return null;

    try {
      const randomPokemon = await this.pokemonAPI.getRandomEducationalPokemon();
      if (!randomPokemon) return null;

      localStorage.setItem('pokemon-daily-reward', today);

      return {
        pokemon: randomPokemon,
        isShiny: Math.random() < 0.05, // 5%の確率でシャイニー
        rewardType: 'daily',
        message: '今日のポケモンです！毎日ログインしてコレクションを増やそう！'
      };
    } catch (error) {
      console.error('Failed to get daily Pokemon reward:', error);
      return null;
    }
  }

  // レベル完了時のポケモン報酬
  async getLevelCompletionReward(levelId: string, score: number): Promise<PokemonReward | null> {
    try {
      // レベルIDから科目を特定
      const subject = levelId.split('-')[0];
      const pokemon = await this.pokemonAPI.getRewardPokemon(subject, score);
      
      if (!pokemon) return null;

      // 高得点の場合はシャイニーの確率アップ
      const isShiny = score >= 90 ? Math.random() < 0.3 : Math.random() < 0.05;

      return {
        pokemon,
        isShiny,
        rewardType: 'milestone',
        message: `レベルクリア報酬！${pokemon.japaneseName}をゲットしました！`
      };
    } catch (error) {
      console.error('Failed to get level completion reward:', error);
      return null;
    }
  }

  // ポケモン図鑑機能
  async getPokemonCollection(progress: UserProgress): Promise<{
    collected: Pokemon[];
    total: number;
    shinyCount: number;
    completion: number;
  }> {
    const collection = progress.pokemonCollection || [];
    const shinyCounts = progress.shinyCounts || {};
    
    try {
      const collectedPokemon = await this.pokemonAPI.getMultiplePokemon(collection);
      const shinyCount = Object.keys(shinyCounts).length;
      const totalEducationalPokemon = 150; // 教育向けポケモンの総数
      
      return {
        collected: collectedPokemon,
        total: collection.length,
        shinyCount,
        completion: Math.round((collection.length / totalEducationalPokemon) * 100)
      };
    } catch (error) {
      console.error('Failed to get Pokemon collection:', error);
      return {
        collected: [],
        total: 0,
        shinyCount: 0,
        completion: 0
      };
    }
  }

  // 特別イベント用ポケモン
  async getSpecialEventPokemon(eventType: string): Promise<PokemonReward | null> {
    const eventPokemon: Record<string, number> = {
      'perfect_score': 151, // ミュウ（満点時）
      'week_streak': 4,     // ヒトカゲ（週間連続）
      'month_complete': 150, // ミュウツー（月間達成）
      'first_pokemon': 25   // ピカチュウ（初回）
    };

    const pokemonId = eventPokemon[eventType];
    if (!pokemonId) return null;

    try {
      const pokemon = await this.pokemonAPI.getPokemon(pokemonId);
      if (!pokemon) return null;

      return {
        pokemon,
        isShiny: eventType === 'month_complete', // 月間達成は必ずシャイニー
        rewardType: 'special',
        message: `特別イベント達成！${pokemon.japaneseName}をゲットしました！`
      };
    } catch (error) {
      console.error('Failed to get special event Pokemon:', error);
      return null;
    }
  }

  // 学習進捗に応じたポケモンアドバイス
  async getPokemonLearningAdvice(progress: UserProgress): Promise<{
    pokemon: Pokemon;
    advice: string;
  } | null> {
    try {
      // 最近獲得したポケモンまたはランダムなポケモン
      const collection = progress.pokemonCollection || [];
      const pokemonId = collection.length > 0 ? 
        collection[collection.length - 1] : 25; // ピカチュウ

      const pokemon = await this.pokemonAPI.getPokemon(pokemonId);
      if (!pokemon) return null;

      const advices = [
        `${pokemon.japaneseName}と一緒に今日も頑張ろう！`,
        `${pokemon.japaneseName}が応援してるよ！継続が大切だよ。`,
        `${pokemon.japaneseName}みたいに強くなるために、毎日少しずつ学習しよう！`,
        `${pokemon.japaneseName}と一緒なら何でもできる！今日の目標を決めよう。`,
        `${pokemon.japaneseName}が見てるから、最後まで諦めないで！`
      ];

      return {
        pokemon,
        advice: advices[Math.floor(Math.random() * advices.length)]
      };
    } catch (error) {
      console.error('Failed to get Pokemon learning advice:', error);
      return null;
    }
  }
}