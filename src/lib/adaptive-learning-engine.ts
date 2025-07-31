// AIベース適応学習エンジン
import { UserProgress, Question } from '@/types';
import { DifficultyAnalysisManager } from './difficulty-analysis';

export interface LearningProfile {
  userId: string;
  strongAreas: string[];
  weakAreas: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
  attentionSpan: number; // 分
  preferredDifficulty: number; // 1-10
  learningSpeed: 'slow' | 'average' | 'fast';
  motivationLevel: 'low' | 'medium' | 'high';
  lastUpdated: Date;
}

export interface LearningSession {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  questions: Question[];
  responses: Array<{
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
    timeSpent: number;
    attempts: number;
    helpUsed: boolean;
  }>;
  focusLevel: number; // 1-10
  engagementScore: number; // 1-10
}

export interface AdaptiveRecommendation {
  nextTopics: string[];
  suggestedDifficulty: number;
  recommendedStudyTime: number; // 分
  breakRecommended: boolean;
  motivationalMessage: string;
  parentalGuidance?: string;
}

export class AdaptiveLearningEngine {
  private static instance: AdaptiveLearningEngine;
  private profiles: Map<string, LearningProfile> = new Map();
  private sessions: LearningSession[] = [];

  private constructor() {
    this.loadData();
  }

  static getInstance(): AdaptiveLearningEngine {
    if (!AdaptiveLearningEngine.instance) {
      AdaptiveLearningEngine.instance = new AdaptiveLearningEngine();
    }
    return AdaptiveLearningEngine.instance;
  }

  // 学習プロファイルの分析と生成
  async analyzeAndCreateProfile(userId: string, progress: UserProgress): Promise<LearningProfile> {
    const existingProfile = this.profiles.get(userId);
    
    // 学習データから特性を分析
    const strongAreas = await this.identifyStrongAreas(progress);
    const weakAreas = await this.identifyWeakAreas(progress);
    const learningStyle = await this.detectLearningStyle(userId);
    const attentionSpan = await this.estimateAttentionSpan(userId);
    const learningSpeed = await this.assessLearningSpeed(userId);
    const motivationLevel = await this.evaluateMotivation(progress);

    const profile: LearningProfile = {
      userId,
      strongAreas,
      weakAreas,
      learningStyle,
      attentionSpan,
      preferredDifficulty: this.calculateOptimalDifficulty(progress),
      learningSpeed,
      motivationLevel,
      lastUpdated: new Date()
    };

    this.profiles.set(userId, profile);
    this.saveData();
    
    return profile;
  }

  // 強い分野の特定
  private async identifyStrongAreas(progress: UserProgress): Promise<string[]> {
    const subjectPerformance = new Map<string, number>();
    
    // 完了レベルから各教科の成績を分析
    progress.completedLevels.forEach(levelId => {
      const subject = levelId.split('-')[0];
      const current = subjectPerformance.get(subject) || 0;
      subjectPerformance.set(subject, current + 1);
    });

    // バッジから得意分野を推定
    progress.badges.forEach(badge => {
      if (badge.category) {
        const current = subjectPerformance.get(badge.category) || 0;
        subjectPerformance.set(badge.category, current + 2); // バッジは高重み
      }
    });

    // 上位の分野を返す
    return Array.from(subjectPerformance.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([subject]) => subject);
  }

  // 弱い分野の特定
  private async identifyWeakAreas(progress: UserProgress): Promise<string[]> {
    const subjects = ['math', 'japanese', 'english', 'time', 'shape', 'money'];
    const completedBySubject = new Map<string, number>();
    
    subjects.forEach(subject => {
      const completed = progress.completedLevels.filter(level => 
        level.startsWith(subject)).length;
      completedBySubject.set(subject, completed);
    });

    // 完了数が少ない分野を弱点として特定
    return Array.from(completedBySubject.entries())
      .sort((a, b) => a[1] - b[1])
      .slice(0, 2)
      .map(([subject]) => subject);
  }

  // 学習スタイルの検出
  private async detectLearningStyle(userId: string): Promise<LearningProfile['learningStyle']> {
    const recentSessions = this.sessions.filter(s => s.sessionId.includes(userId)).slice(-10);
    
    if (recentSessions.length === 0) return 'mixed';

    // セッションデータから学習スタイルを推定
    let visualScore = 0;
    let auditoryScore = 0;
    let kinestheticScore = 0;
    
    recentSessions.forEach(session => {
      session.responses.forEach(response => {
        // ヒント使用頻度で視覚的学習傾向を判定
        if (response.helpUsed) visualScore++;
        
        // 回答時間で聴覚的学習傾向を判定
        if (response.timeSpent < 15) auditoryScore++;
        
        // 試行回数で体験的学習傾向を判定
        if (response.attempts > 1) kinestheticScore++;
      });
    });

    const maxScore = Math.max(visualScore, auditoryScore, kinestheticScore);
    if (maxScore === visualScore) return 'visual';
    if (maxScore === auditoryScore) return 'auditory';
    if (maxScore === kinestheticScore) return 'kinesthetic';
    
    return 'mixed';
  }

  // 集中力の推定
  private async estimateAttentionSpan(userId: string): Promise<number> {
    const recentSessions = this.sessions.filter(s => s.sessionId.includes(userId)).slice(-5);
    
    if (recentSessions.length === 0) return 15; // デフォルト15分

    const avgSessionTime = recentSessions.reduce((sum, session) => {
      const duration = session.endTime 
        ? (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60)
        : 10;
      return sum + Math.min(duration, 60); // 最大60分でキャップ
    }, 0) / recentSessions.length;

    return Math.round(avgSessionTime);
  }

  // 学習速度の評価
  private async assessLearningSpeed(userId: string): Promise<LearningProfile['learningSpeed']> {
    const recentSessions = this.sessions.filter(s => s.sessionId.includes(userId)).slice(-10);
    
    if (recentSessions.length === 0) return 'average';

    const avgTimePerQuestion = recentSessions.reduce((sum, session) => {
      const sessionAvg = session.responses.reduce((qSum, response) => 
        qSum + response.timeSpent, 0) / session.responses.length;
      return sum + sessionAvg;
    }, 0) / recentSessions.length;

    if (avgTimePerQuestion < 20) return 'fast';
    if (avgTimePerQuestion > 45) return 'slow';
    return 'average';
  }

  // モチベーション評価
  private async evaluateMotivation(progress: UserProgress): Promise<LearningProfile['motivationLevel']> {
    // 最近の学習活動から判定
    const recentActivity = progress.completedLevels.length;
    const badgeCount = progress.badges.length;
    const currentStreak = Math.max(...Object.values(progress.streaks));

    const motivationScore = recentActivity * 2 + badgeCount * 3 + currentStreak * 5;

    if (motivationScore >= 50) return 'high';
    if (motivationScore >= 20) return 'medium';
    return 'low';
  }

  // 最適難易度の計算
  private calculateOptimalDifficulty(progress: UserProgress): number {
    const totalQuestions = progress.completedLevels.length * 10; // 概算
    const estimatedCorrect = Math.floor(progress.totalPoints / 15);
    const accuracy = totalQuestions > 0 ? estimatedCorrect / totalQuestions : 0.5;

    // 正解率に基づく難易度調整
    if (accuracy >= 0.9) return Math.min(10, 7); // 高精度なら難易度上げる
    if (accuracy >= 0.8) return 6;
    if (accuracy >= 0.7) return 5;
    if (accuracy >= 0.6) return 4;
    return 3; // 低精度なら基礎に戻る
  }

  // 適応的推奨の生成
  async generateRecommendation(userId: string, currentSession?: LearningSession): Promise<AdaptiveRecommendation> {
    const profile = this.profiles.get(userId);
    if (!profile) {
      return this.getDefaultRecommendation();
    }

    const nextTopics = await this.selectOptimalTopics(profile);
    const suggestedDifficulty = await this.adjustDifficulty(profile, currentSession);
    const studyTime = this.calculateOptimalStudyTime(profile);
    const needsBreak = await this.assessBreakNeed(userId);
    const message = this.generateMotivationalMessage(profile);
    const parentalGuidance = this.generateParentalGuidance(profile);

    return {
      nextTopics,
      suggestedDifficulty,
      recommendedStudyTime: studyTime,
      breakRecommended: needsBreak,
      motivationalMessage: message,
      parentalGuidance
    };
  }

  // 最適なトピック選択
  private async selectOptimalTopics(profile: LearningProfile): Promise<string[]> {
    const topics: string[] = [];

    // 弱点分野を優先的に含める（スパイラル学習）
    if (profile.weakAreas.length > 0) {
      topics.push(...profile.weakAreas.slice(0, 2));
    }

    // 強い分野で自信をつける
    if (profile.strongAreas.length > 0) {
      topics.push(profile.strongAreas[0]);
    }

    // 学習スタイルに適したトピックを追加
    switch (profile.learningStyle) {
      case 'visual':
        topics.push('shape', 'money'); // 視覚的な要素が強い
        break;
      case 'auditory':
        topics.push('japanese', 'english'); // 音声要素が強い
        break;
      case 'kinesthetic':
        topics.push('math', 'time'); // 操作的要素が強い
        break;
    }

    return [...new Set(topics)].slice(0, 3); // 重複除去して最大3つ
  }

  // 難易度の動的調整
  private async adjustDifficulty(profile: LearningProfile, session?: LearningSession): Promise<number> {
    let baseDifficulty = profile.preferredDifficulty;

    if (session) {
      // 現在のセッションの成績に基づく調整
      const currentAccuracy = session.responses.length > 0 
        ? session.responses.filter(r => r.isCorrect).length / session.responses.length
        : 0.5;

      if (currentAccuracy >= 0.9) {
        baseDifficulty = Math.min(10, baseDifficulty + 1);
      } else if (currentAccuracy < 0.6) {
        baseDifficulty = Math.max(1, baseDifficulty - 1);
      }

      // 集中力レベルに基づく調整
      if (session.focusLevel < 5) {
        baseDifficulty = Math.max(1, baseDifficulty - 1);
      }
    }

    // モチベーションレベルによる調整
    switch (profile.motivationLevel) {
      case 'low':
        baseDifficulty = Math.max(1, baseDifficulty - 1);
        break;
      case 'high':
        baseDifficulty = Math.min(10, baseDifficulty + 1);
        break;
    }

    return baseDifficulty;
  }

  // 最適学習時間の計算
  private calculateOptimalStudyTime(profile: LearningProfile): number {
    let baseTime = profile.attentionSpan;

    // 学習速度による調整
    switch (profile.learningSpeed) {
      case 'slow':
        baseTime *= 1.3;
        break;
      case 'fast':
        baseTime *= 0.8;
        break;
    }

    // モチベーションによる調整
    switch (profile.motivationLevel) {
      case 'low':
        baseTime *= 0.7;
        break;
      case 'high':
        baseTime *= 1.2;
        break;
    }

    return Math.round(Math.min(Math.max(baseTime, 5), 45)); // 5-45分の範囲
  }

  // 休憩必要性の判定
  private async assessBreakNeed(userId: string): Promise<boolean> {
    const recentSessions = this.sessions
      .filter(s => s.sessionId.includes(userId))
      .slice(-3);

    if (recentSessions.length === 0) return false;

    // 最近のセッションの集中力が低下している場合
    const avgFocus = recentSessions.reduce((sum, s) => sum + s.focusLevel, 0) / recentSessions.length;
    
    // 連続学習時間をチェック
    const totalRecentTime = recentSessions.reduce((sum, session) => {
      const duration = session.endTime 
        ? (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60)
        : 0;
      return sum + duration;
    }, 0);

    return avgFocus < 6 || totalRecentTime > 60; // 集中力低下または1時間超過
  }

  // モチベーションメッセージ生成
  private generateMotivationalMessage(profile: LearningProfile): string {
    const messages = {
      high: [
        '素晴らしい調子です！この勢いで続けましょう！',
        '君の頑張りが実を結んでいますね！',
        '完璧な学習ペースを保っています！'
      ],
      medium: [
        '良いペースで進んでいます！',
        'コツコツ続けることが大切ですね！',
        '着実に力をつけています！'
      ],
      low: [
        '一歩ずつ進んでいきましょう！',
        '今日も学習を始めてえらいね！',
        '小さな積み重ねが大きな成果になります！'
      ]
    };

    const messageList = messages[profile.motivationLevel];
    return messageList[Math.floor(Math.random() * messageList.length)];
  }

  // 保護者向けガイダンス生成
  private generateParentalGuidance(profile: LearningProfile): string {
    let guidance = '';

    switch (profile.motivationLevel) {
      case 'low':
        guidance += '学習への動機づけをサポートしてあげてください。';
        break;
      case 'high':
        guidance += 'とても意欲的に取り組んでいます。適度な休憩も大切です。';
        break;
    }

    switch (profile.learningStyle) {
      case 'visual':
        guidance += ' 図や絵を使った説明が効果的です。';
        break;
      case 'auditory':
        guidance += ' 一緒に音読したり歌で覚えたりすると良いでしょう。';
        break;
      case 'kinesthetic':
        guidance += ' 実際に手を動かす活動を取り入れてみてください。';
        break;
    }

    return guidance;
  }

  // デフォルト推奨の生成
  private getDefaultRecommendation(): AdaptiveRecommendation {
    return {
      nextTopics: ['math', 'japanese'],
      suggestedDifficulty: 3,
      recommendedStudyTime: 15,
      breakRecommended: false,
      motivationalMessage: '今日も一緒に頑張りましょう！',
      parentalGuidance: 'お子様の学習をサポートしてあげてください。'
    };
  }

  // セッション記録
  recordSession(session: LearningSession): void {
    this.sessions.push(session);
    
    // 最新の100セッションのみ保持
    if (this.sessions.length > 100) {
      this.sessions = this.sessions.slice(-100);
    }
    
    this.saveData();
  }

  // リアルタイム学習調整
  async adjustRealTime(userId: string, questionResponse: {
    isCorrect: boolean;
    timeSpent: number;
    attempts: number;
  }): Promise<{
    nextDifficultyAdjustment: number;
    encouragementMessage: string;
    suggestBreak: boolean;
  }> {
    const profile = this.profiles.get(userId);
    if (!profile) {
      return {
        nextDifficultyAdjustment: 0,
        encouragementMessage: 'よく頑張りました！',
        suggestBreak: false
      };
    }

    let difficultyAdjustment = 0;
    let encouragementMessage = '';
    let suggestBreak = false;

    // 正解率による調整
    if (questionResponse.isCorrect) {
      if (questionResponse.timeSpent < 10) {
        difficultyAdjustment = 1;
        encouragementMessage = 'すばやく正解できましたね！次はもう少し難しい問題に挑戦しましょう！';
      } else {
        encouragementMessage = 'よく考えて正解できました！';
      }
    } else {
      if (questionResponse.attempts > 2) {
        difficultyAdjustment = -1;
        encouragementMessage = '大丈夫！もう少し簡単な問題から始めましょう。';
      } else {
        encouragementMessage = 'あと一歩でした！次も頑張りましょう！';
      }
    }

    // 疲労度チェック
    if (questionResponse.timeSpent > 60) {
      suggestBreak = true;
      encouragementMessage += ' 少し休憩を取りませんか？';
    }

    return {
      nextDifficultyAdjustment: difficultyAdjustment,
      encouragementMessage,
      suggestBreak
    };
  }

  // データの保存・読み込み
  private saveData(): void {
    if (typeof window !== 'undefined') {
      const data = {
        profiles: Array.from(this.profiles.entries()),
        sessions: this.sessions.slice(-50) // 最新50セッションのみ保存
      };
      localStorage.setItem('adaptive-learning-data', JSON.stringify(data));
    }
  }

  private loadData(): void {
    if (typeof window !== 'undefined') {
      try {
        const data = localStorage.getItem('adaptive-learning-data');
        if (data) {
          const parsed = JSON.parse(data);
          this.profiles = new Map(parsed.profiles);
          this.sessions = parsed.sessions || [];
        }
      } catch (error) {
        console.error('Failed to load adaptive learning data:', error);
      }
    }
  }

  // プロファイルの取得
  getProfile(userId: string): LearningProfile | null {
    return this.profiles.get(userId) || null;
  }
  
  // セッション履歴の取得
  getSessionHistory(userId: string, limit: number = 10): LearningSession[] {
    return this.sessions
      .filter(s => s.sessionId.includes(userId))
      .slice(-limit);
  }
}