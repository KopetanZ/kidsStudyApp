import { MuteDetection } from './device-mute-detection';

export class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private muteDetection: MuteDetection;
  private isGloballyMuted: boolean = false;

  private constructor() {
    this.muteDetection = MuteDetection.getInstance();
    
    // ミュート状態変更時のコールバック登録
    this.muteDetection.onMuteStateChange((isMuted) => {
      this.isGloballyMuted = isMuted;
      console.log(`Silent switch detected: ${isMuted ? 'ON (muted)' : 'OFF (unmuted)'}`);
    });
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  async init(): Promise<void> {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      await this.loadSounds();
      
      // ミュート検出を開始
      this.startMuteDetection();
    }
  }

  // ミュート検出を開始
  private startMuteDetection(): void {
    // 初期状態をチェック
    this.checkInitialMuteState();
    
    // 定期的な検出を開始
    this.muteDetection.startMuteDetection(2000); // 2秒間隔
  }

  // 初期のミュート状態をチェック
  private async checkInitialMuteState(): Promise<void> {
    try {
      const isMuted = await this.muteDetection.detectMuteStateReliable();
      this.isGloballyMuted = isMuted;
      console.log(`Initial silent switch state: ${isMuted ? 'ON (muted)' : 'OFF (unmuted)'}`);
    } catch (error) {
      console.warn('Failed to detect initial mute state:', error);
    }
  }

  private async loadSounds(): Promise<void> {
    const soundFiles = {
      correct: this.generateCorrectSound(),
      incorrect: this.generateIncorrectSound(),
      celebration: this.generateCelebrationSound(),
      click: this.generateClickSound(),
    };

    for (const [name, buffer] of Object.entries(soundFiles)) {
      this.sounds.set(name, buffer);
    }
  }

  private generateCorrectSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.3, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Happy ascending tone
      data[i] = Math.sin(2 * Math.PI * (440 + t * 200) * t) * Math.exp(-t * 3) * 0.3;
    }
    
    return buffer;
  }

  private generateIncorrectSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.5, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Descending tone
      data[i] = Math.sin(2 * Math.PI * (300 - t * 100) * t) * Math.exp(-t * 2) * 0.2;
    }
    
    return buffer;
  }

  private generateCelebrationSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 1, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Multiple tones for celebration
      const tone1 = Math.sin(2 * Math.PI * 523 * t); // C
      const tone2 = Math.sin(2 * Math.PI * 659 * t); // E
      const tone3 = Math.sin(2 * Math.PI * 784 * t); // G
      data[i] = (tone1 + tone2 + tone3) * Math.exp(-t * 1) * 0.15;
    }
    
    return buffer;
  }

  private generateClickSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      data[i] = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 30) * 0.2;
    }
    
    return buffer;
  }

  async playSound(soundName: string): Promise<void> {
    if (!this.audioContext || !this.sounds.has(soundName)) {
      console.warn(`Sound ${soundName} not found`);
      return;
    }

    // サイレントスイッチがONの場合は音声を再生しない
    if (this.isGloballyMuted) {
      console.log(`Sound ${soundName} blocked by silent switch`);
      return;
    }

    try {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const source = this.audioContext.createBufferSource();
      source.buffer = this.sounds.get(soundName)!;
      source.connect(this.audioContext.destination);
      source.start();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Text-to-Speech for character pronunciation
  speak(text: string, lang: string = 'ja-JP'): void {
    // サイレントスイッチがONの場合は音声読み上げしない
    if (this.isGloballyMuted) {
      console.log(`Speech "${text}" blocked by silent switch`);
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  }

  // 手動でミュート状態を設定（設定メニュー用）
  setManualMute(isMuted: boolean): void {
    this.muteDetection.setManualMuteState(isMuted);
    this.isGloballyMuted = isMuted;
    console.log(`Manual mute set to: ${isMuted}`);
  }

  // 現在のミュート状態を取得
  isMuted(): boolean {
    return this.isGloballyMuted;
  }

  // ミュート状態変更時のコールバックを追加
  onMuteStateChange(callback: (isMuted: boolean) => void): void {
    this.muteDetection.onMuteStateChange(callback);
  }

  // サイレントスイッチ検出を手動で実行
  async checkSilentSwitch(): Promise<boolean> {
    const isMuted = await this.muteDetection.detectMuteStateReliable();
    this.isGloballyMuted = isMuted;
    return isMuted;
  }

  // Enhanced question reading with proper pronunciation
  async speakQuestion(question: string, type: 'math' | 'japanese' | 'english'): Promise<void> {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    let lang = 'ja-JP';
    let processedText = question;

    // Remove emojis and special characters for better speech
    processedText = processedText.replace(/[🌟⭐🏆💫]/g, '');
    
    switch (type) {
      case 'english':
        lang = 'en-US';
        break;
      case 'japanese':
        // Replace reading hints with proper pronunciation
        processedText = processedText.replace(/「(.+?)」/g, '$1');
        break;
      case 'math':
        // Convert math symbols to Japanese words
        processedText = processedText
          .replace(/\+/g, 'たす')
          .replace(/-/g, 'ひく')
          .replace(/×/g, 'かける')
          .replace(/÷/g, 'わる')
          .replace(/=/g, 'は')
          .replace(/〇/g, 'なに');
        break;
    }

    const utterance = new SpeechSynthesisUtterance(processedText);
    utterance.lang = lang;
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    window.speechSynthesis.speak(utterance);
  }

  // Encouragement phrases
  speakEncouragement(isCorrect: boolean): void {
    const correctPhrases = [
      'よくできました！',
      'すばらしい！',
      'せいかい！',
      'がんばったね！',
      'やったね！'
    ];
    
    const tryAgainPhrases = [
      'もういちど やってみよう',
      'だいじょうぶ がんばって',
      'つぎは きっと できるよ',
      'おしい！ もうすこしだよ'
    ];
    
    const phrases = isCorrect ? correctPhrases : tryAgainPhrases;
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    this.speak(randomPhrase);
  }

  // Level completion celebration
  speakLevelComplete(score: number): void {
    const celebrationPhrases = [
      `${score}てん！ レベル かんりょう！ すごいね！`,
      `やったね！ ${score}ポイント かくとく！`,
      `かんぺき！ つぎの レベルも がんばろう！`
    ];
    
    const randomPhrase = celebrationPhrases[Math.floor(Math.random() * celebrationPhrases.length)];
    this.speak(randomPhrase);
  }
}