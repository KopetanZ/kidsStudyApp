// マルチプレイヤー学習システム
import { UserProgress, Question } from '@/types';
import { StorageManager } from './storage';

export interface MultiplayerSession {
  sessionId: string;
  roomCode: string;
  hostId: string;
  participants: MultiplayerUser[];
  gameType: 'quiz-battle' | 'cooperative' | 'speed-challenge' | 'team-relay';
  subject: string;
  difficulty: number;
  maxParticipants: number;
  status: 'waiting' | 'in-progress' | 'completed';
  questions: Question[];
  currentQuestionIndex: number;
  startTime?: Date;
  endTime?: Date;
  settings: {
    timeLimit: number; // seconds per question
    rounds: number;
    allowHints: boolean;
    friendlyMode: boolean; // no elimination, focus on learning
  };
}

export interface MultiplayerUser {
  userId: string;
  displayName: string;
  avatar: string;
  score: number;
  correctAnswers: number;
  currentAnswer?: string;
  responseTime?: number;
  ready: boolean;
  connected: boolean;
  badges: string[];
  level: number;
}

export interface MultiplayerResult {
  position: number;
  score: number;
  accuracy: number;
  averageTime: number;
  badges: string[];
  xpGained: number;
  improvements: string[];
}

export class MultiplayerManager {
  private static instance: MultiplayerManager;
  private sessions: Map<string, MultiplayerSession> = new Map();
  private userSessions: Map<string, string> = new Map(); // userId -> sessionId
  
  private constructor() {
    this.loadSessions();
  }

  static getInstance(): MultiplayerManager {
    if (!MultiplayerManager.instance) {
      MultiplayerManager.instance = new MultiplayerManager();
    }
    return MultiplayerManager.instance;
  }

  // ルーム作成
  async createRoom(hostId: string, gameType: MultiplayerSession['gameType'], settings: Partial<MultiplayerSession['settings']> = {}): Promise<string> {
    const roomCode = this.generateRoomCode();
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const hostProgress = StorageManager.getProgress();
    const hostUser: MultiplayerUser = {
      userId: hostId,
      displayName: this.getUserDisplayName(hostId),
      avatar: this.getUserAvatar(hostId),
      score: 0,
      correctAnswers: 0,
      ready: true,
      connected: true,
      badges: hostProgress.badges.map(b => b.id),
      level: hostProgress.playerLevel
    };

    const session: MultiplayerSession = {
      sessionId,
      roomCode,
      hostId,
      participants: [hostUser],
      gameType,
      subject: 'mixed', // デフォルト、後で変更可能
      difficulty: 3,
      maxParticipants: gameType === 'team-relay' ? 6 : 4,
      status: 'waiting',
      questions: [],
      currentQuestionIndex: 0,
      settings: {
        timeLimit: 30,
        rounds: 10,
        allowHints: true,
        friendlyMode: true,
        ...settings
      }
    };

    this.sessions.set(sessionId, session);
    this.userSessions.set(hostId, sessionId);
    this.saveSessions();

    return roomCode;
  }

  // ルーム参加
  async joinRoom(roomCode: string, userId: string): Promise<MultiplayerSession | null> {
    const session = this.findSessionByRoomCode(roomCode);
    if (!session) return null;

    if (session.status !== 'waiting') {
      throw new Error('ゲームが既に開始されています');
    }

    if (session.participants.length >= session.maxParticipants) {
      throw new Error('参加者が満員です');
    }

    // 既に参加しているかチェック
    if (session.participants.some(p => p.userId === userId)) {
      throw new Error('既に参加しています');
    }

    const userProgress = StorageManager.getProgress();
    const newUser: MultiplayerUser = {
      userId,
      displayName: this.getUserDisplayName(userId),
      avatar: this.getUserAvatar(userId),
      score: 0,
      correctAnswers: 0,
      ready: false,
      connected: true,
      badges: userProgress.badges.map(b => b.id),
      level: userProgress.playerLevel
    };

    session.participants.push(newUser);
    this.userSessions.set(userId, session.sessionId);
    this.saveSessions();

    return session;
  }

  // 準備完了
  async setReady(userId: string, ready: boolean): Promise<void> {
    const sessionId = this.userSessions.get(userId);
    if (!sessionId) return;

    const session = this.sessions.get(sessionId);
    if (!session) return;

    const user = session.participants.find(p => p.userId === userId);
    if (user) {
      user.ready = ready;
      this.saveSessions();
    }
  }

  // ゲーム設定更新（ホストのみ）
  async updateGameSettings(hostId: string, updates: Partial<{
    gameType: MultiplayerSession['gameType'];
    subject: string;
    difficulty: number;
    settings: Partial<MultiplayerSession['settings']>;
  }>): Promise<void> {
    const sessionId = this.userSessions.get(hostId);
    if (!sessionId) return;

    const session = this.sessions.get(sessionId);
    if (!session || session.hostId !== hostId) return;

    if (updates.gameType) session.gameType = updates.gameType;
    if (updates.subject) session.subject = updates.subject;
    if (updates.difficulty) session.difficulty = updates.difficulty;
    if (updates.settings) {
      session.settings = { ...session.settings, ...updates.settings };
    }

    this.saveSessions();
  }

  // ゲーム開始
  async startGame(hostId: string): Promise<boolean> {
    const sessionId = this.userSessions.get(hostId);
    if (!sessionId) return false;

    const session = this.sessions.get(sessionId);
    if (!session || session.hostId !== hostId) return false;

    // 全員準備完了チェック
    if (!session.participants.every(p => p.ready)) {
      throw new Error('全員の準備が完了していません');
    }

    if (session.participants.length < 2) {
      throw new Error('最低2人の参加者が必要です');
    }

    // 問題生成
    session.questions = await this.generateQuestions(session);
    session.status = 'in-progress';
    session.startTime = new Date();
    session.currentQuestionIndex = 0;

    // 参加者スコアリセット
    session.participants.forEach(p => {
      p.score = 0;
      p.correctAnswers = 0;
    });

    this.saveSessions();
    return true;
  }

  // 回答提出
  async submitAnswer(userId: string, answer: string, responseTime: number): Promise<{
    correct: boolean;
    explanation?: string;
    currentRanking: MultiplayerUser[];
  }> {
    const sessionId = this.userSessions.get(userId);
    if (!sessionId) throw new Error('セッションが見つかりません');

    const session = this.sessions.get(sessionId);
    if (!session || session.status !== 'in-progress') {
      throw new Error('ゲームが進行中ではありません');
    }

    const user = session.participants.find(p => p.userId === userId);
    if (!user) throw new Error('参加者として登録されていません');

    const currentQuestion = session.questions[session.currentQuestionIndex];
    if (!currentQuestion) throw new Error('現在の問題が見つかりません');

    const correct = answer === currentQuestion.correctAnswer;
    
    // スコア計算
    if (correct) {
      user.correctAnswers++;
      let points = currentQuestion.points;
      
      // 時間ボーナス（早く答えるほど高得点）
      const timeBonus = Math.max(0, (session.settings.timeLimit - responseTime) / session.settings.timeLimit * 10);
      points += Math.round(timeBonus);
      
      user.score += points;
    }

    user.currentAnswer = answer;
    user.responseTime = responseTime;

    // 現在のランキング
    const ranking = [...session.participants].sort((a, b) => b.score - a.score);

    this.saveSessions();

    return {
      correct,
      explanation: correct ? undefined : `正解は「${currentQuestion.correctAnswer}」でした`,
      currentRanking: ranking
    };
  }

  // 次の問題へ
  async nextQuestion(hostId: string): Promise<boolean> {
    const sessionId = this.userSessions.get(hostId);
    if (!sessionId) return false;

    const session = this.sessions.get(sessionId);
    if (!session || session.hostId !== hostId) return false;

    session.currentQuestionIndex++;
    
    // 全問題終了チェック
    if (session.currentQuestionIndex >= session.questions.length) {
      await this.endGame(sessionId);
      return false;
    }

    // 参加者の回答状態リセット
    session.participants.forEach(p => {
      p.currentAnswer = undefined;
      p.responseTime = undefined;
    });

    this.saveSessions();
    return true;
  }

  // ゲーム終了
  private async endGame(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.status = 'completed';
    session.endTime = new Date();

    // 最終ランキング
    const finalRanking = [...session.participants].sort((a, b) => b.score - a.score);

    // 各参加者に結果とXP付与
    finalRanking.forEach((user, index) => {
      const result: MultiplayerResult = {
        position: index + 1,
        score: user.score,
        accuracy: user.correctAnswers / session.questions.length,
        averageTime: session.settings.timeLimit / 2, // 簡易計算
        badges: this.calculateEarnedBadges(user, session),
        xpGained: this.calculateXPGain(user, session, index + 1),
        improvements: this.generateImprovements(user, session)
      };

      // 実際のプログレスに反映
      this.applyMultiplayerResults(user.userId, result);
    });

    this.saveSessions();
  }

  // セッション取得
  getSession(userId: string): MultiplayerSession | null {
    const sessionId = this.userSessions.get(userId);
    if (!sessionId) return null;
    return this.sessions.get(sessionId) || null;
  }

  // ルーム離脱
  async leaveRoom(userId: string): Promise<void> {
    const sessionId = this.userSessions.get(userId);
    if (!sessionId) return;

    const session = this.sessions.get(sessionId);
    if (!session) return;

    // 参加者リストから削除
    session.participants = session.participants.filter(p => p.userId !== userId);
    this.userSessions.delete(userId);

    // ホストが離脱した場合の処理
    if (session.hostId === userId && session.participants.length > 0) {
      session.hostId = session.participants[0].userId;
    }

    // 参加者がいなくなった場合はセッション削除
    if (session.participants.length === 0) {
      this.sessions.delete(sessionId);
    }

    this.saveSessions();
  }

  // ヘルパーメソッド
  private generateRoomCode(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }

  private findSessionByRoomCode(roomCode: string): MultiplayerSession | null {
    for (const session of this.sessions.values()) {
      if (session.roomCode === roomCode) {
        return session;
      }
    }
    return null;
  }

  private getUserDisplayName(userId: string): string {
    // 実際のアプリでは、ユーザー設定から取得
    return `プレイヤー${userId.slice(-4)}`;
  }

  private getUserAvatar(userId: string): string {
    const avatars = ['🐰', '🐱', '🐼', '🐨', '🦊', '🐸', '🐵', '🐯'];
    const index = parseInt(userId.slice(-1), 36) % avatars.length;
    return avatars[index];
  }

  private async generateQuestions(session: MultiplayerSession): Promise<Question[]> {
    // 実際のアプリでは、各教科の問題ジェネレーターを使用
    // ここではダミーデータ
    const questions: Question[] = [];
    
    for (let i = 0; i < session.settings.rounds; i++) {
      questions.push({
        id: `mp-q-${i}`,
        type: 'math',
        subtype: 'arithmetic',
        question: `${Math.floor(Math.random() * 10) + 1} + ${Math.floor(Math.random() * 10) + 1} は？`,
        correctAnswer: '10', // 簡単な例
        points: 10,
        difficulty: session.difficulty,
        timeLimit: session.settings.timeLimit
      });
    }
    
    return questions;
  }

  private calculateEarnedBadges(user: MultiplayerUser, session: MultiplayerSession): string[] {
    const badges = [];
    
    if (user.correctAnswers === session.questions.length) {
      badges.push('perfect-multiplayer');
    }
    
    if (user.score > 0) {
      badges.push('multiplayer-participant');
    }
    
    return badges;
  }

  private calculateXPGain(user: MultiplayerUser, session: MultiplayerSession, position: number): number {
    let baseXP = user.correctAnswers * 5;
    
    // 順位ボーナス
    if (position === 1) baseXP += 20;
    else if (position === 2) baseXP += 15;
    else if (position === 3) baseXP += 10;
    else baseXP += 5;

    // 参加ボーナス
    baseXP += 10;
    
    return baseXP;
  }

  private generateImprovements(user: MultiplayerUser, session: MultiplayerSession): string[] {
    const improvements = [];
    
    const accuracy = user.correctAnswers / session.questions.length;
    if (accuracy < 0.7) {
      improvements.push('基礎練習を増やしましょう');
    }
    
    if (user.responseTime && user.responseTime > session.settings.timeLimit * 0.8) {
      improvements.push('もう少し素早く回答してみましょう');
    }
    
    improvements.push('みんなで一緒に学習すると楽しいですね！');
    
    return improvements;
  }

  private applyMultiplayerResults(userId: string, result: MultiplayerResult): void {
    // 実際のプログレスに結果を反映
    let progress = StorageManager.getProgress();
    
    // XP追加
    progress = StorageManager.addExperience(result.xpGained);
    
    // ポイント追加
    progress = StorageManager.addPoints(result.score);
    
    // 新しいバッジがあれば追加
    result.badges.forEach(badgeId => {
      StorageManager.checkAndAwardBadges('multiplayer', { badgeId });
    });
  }

  // データ保存・読み込み
  private saveSessions(): void {
    if (typeof window !== 'undefined') {
      const data = {
        sessions: Array.from(this.sessions.entries()),
        userSessions: Array.from(this.userSessions.entries())
      };
      localStorage.setItem('multiplayer-sessions', JSON.stringify(data));
    }
  }

  private loadSessions(): void {
    if (typeof window !== 'undefined') {
      try {
        const data = localStorage.getItem('multiplayer-sessions');
        if (data) {
          const parsed = JSON.parse(data);
          this.sessions = new Map(parsed.sessions || []);
          this.userSessions = new Map(parsed.userSessions || []);
          
          // 古いセッション削除（24時間以上前）
          this.cleanupOldSessions();
        }
      } catch (error) {
        console.error('Failed to load multiplayer sessions:', error);
      }
    }
  }

  private cleanupOldSessions(): void {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    for (const [sessionId, session] of this.sessions.entries()) {
      const sessionTime = session.startTime || new Date(0);
      if (sessionTime < oneDayAgo) {
        this.sessions.delete(sessionId);
        
        // ユーザーセッションマップからも削除
        for (const [userId, userSessionId] of this.userSessions.entries()) {
          if (userSessionId === sessionId) {
            this.userSessions.delete(userId);
          }
        }
      }
    }
    
    this.saveSessions();
  }

  // アクティブなセッション一覧取得
  getActiveSessions(): MultiplayerSession[] {
    return Array.from(this.sessions.values()).filter(session => 
      session.status === 'waiting' || session.status === 'in-progress'
    );
  }
}