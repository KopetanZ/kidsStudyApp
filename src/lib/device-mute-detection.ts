// iPhone/iPad のサイレントスイッチ検出システム
export class MuteDetection {
  private static instance: MuteDetection;
  private isMuted: boolean = false;
  private callbacks: Array<(isMuted: boolean) => void> = [];
  private detectionInterval: number | null = null;

  static getInstance(): MuteDetection {
    if (!MuteDetection.instance) {
      MuteDetection.instance = new MuteDetection();
    }
    return MuteDetection.instance;
  }

  // サイレントスイッチの状態を検出
  async detectMuteState(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        // iOS デバイスでのみ実行
        if (!this.isIOSDevice()) {
          resolve(false);
          return;
        }

        // 非常に短い無音を再生してサイレント状態を検出
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        // 人間に聞こえない周波数と音量で設定
        oscillator.frequency.setValueAtTime(20000, context.currentTime);
        gainNode.gain.setValueAtTime(0.001, context.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        // 再生開始
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.01);
        
        // 音声の実際の出力を監視
        const analyser = context.createAnalyser();
        gainNode.connect(analyser);
        
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        setTimeout(() => {
          analyser.getByteFrequencyData(dataArray);
          
          // 音声出力が検出されない場合はミュート状態
          const hasSound = dataArray.some(value => value > 0);
          const isMuted = !hasSound;
          
          this.isMuted = isMuted;
          context.close();
          resolve(isMuted);
        }, 50);
        
      } catch (error) {
        console.warn('Mute detection failed:', error);
        resolve(false);
      }
    });
  }

  // 代替検出方法: バイブレーション API を使用
  async detectMuteStateAlternative(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        if (!navigator.vibrate || !this.isIOSDevice()) {
          resolve(false);
          return;
        }

        // iOS Safari では、サイレントモード時にバイブレーションAPIの動作が変わる
        const vibrationSupported = navigator.vibrate([1]);
        
        // サイレントスイッチがONの場合、一部のブラウザでfalseを返す
        setTimeout(() => {
          resolve(!vibrationSupported);
        }, 100);
        
      } catch (error) {
        resolve(false);
      }
    });
  }

  // 最も確実な方法: 音声再生テスト
  async detectMuteStateReliable(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        if (!this.isIOSDevice()) {
          resolve(false);
          return;
        }

        // 短い無音ファイルを作成
        const audio = new Audio();
        
        // Base64エンコードされた超短い無音MP3（10ms）
        audio.src = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjQ1LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/////////////////////////////////////////////////////////////////////////////////////AAAAAExhdmM1OC45MQAAAAAAAAAAAAAAACQCgAAAAAAAAAEgAOkMlQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//OEZAAADwAAAAAAAGkAAAAIAAANElQAAQU=';
        
        // 音量を最小に設定（聞こえないレベル）
        audio.volume = 0.01;
        
        let resolved = false;
        
        // 再生開始を試行
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            if (!resolved) {
              resolved = true;
              // 再生成功 = サイレントスイッチOFF
              resolve(false);
            }
          }).catch(() => {
            if (!resolved) {
              resolved = true;
              // 再生失敗 = サイレントスイッチON
              resolve(true);
            }
          });
        }
        
        // タイムアウト処理
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            resolve(false);
          }
        }, 200);
        
      } catch (error) {
        resolve(false);
      }
    });
  }

  // iOS デバイスかどうかを判定
  private isIOSDevice(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  }

  // 定期的にミュート状態をチェック
  startMuteDetection(interval: number = 2000): void {
    if (this.detectionInterval) {
      this.stopMuteDetection();
    }

    this.detectionInterval = window.setInterval(async () => {
      const wasMuted = this.isMuted;
      const currentMuted = await this.detectMuteStateReliable();
      
      if (wasMuted !== currentMuted) {
        this.isMuted = currentMuted;
        this.notifyCallbacks(currentMuted);
      }
    }, interval);
  }

  // ミュート検出を停止
  stopMuteDetection(): void {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = null;
    }
  }

  // ミュート状態変更時のコールバックを登録
  onMuteStateChange(callback: (isMuted: boolean) => void): void {
    this.callbacks.push(callback);
  }

  // コールバックを削除
  removeMuteStateCallback(callback: (isMuted: boolean) => void): void {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  }

  // 全てのコールバックに通知
  private notifyCallbacks(isMuted: boolean): void {
    this.callbacks.forEach(callback => {
      try {
        callback(isMuted);
      } catch (error) {
        console.error('Mute callback error:', error);
      }
    });
  }

  // 現在のミュート状態を取得
  getCurrentMuteState(): boolean {
    return this.isMuted;
  }

  // 手動でミュート状態を設定（ユーザー設定用）
  setManualMuteState(isMuted: boolean): void {
    if (this.isMuted !== isMuted) {
      this.isMuted = isMuted;
      this.notifyCallbacks(isMuted);
    }
  }
}

// 使用例とヘルパー関数
export class MuteAwareSoundManager {
  private muteDetection: MuteDetection;
  private sounds: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    this.muteDetection = MuteDetection.getInstance();
    
    // ミュート状態変更時に全音声を制御
    this.muteDetection.onMuteStateChange((isMuted) => {
      this.handleMuteStateChange(isMuted);
    });
  }

  // 音声を追加
  addSound(id: string, src: string): void {
    const audio = new Audio(src);
    this.sounds.set(id, audio);
  }

  // 音声を再生（ミュート状態を考慮）
  async playSound(id: string): Promise<void> {
    const audio = this.sounds.get(id);
    if (!audio) return;

    // サイレントスイッチの状態をチェック
    const isMuted = await this.muteDetection.detectMuteStateReliable();
    
    if (isMuted) {
      console.log(`Sound ${id} blocked by silent switch`);
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      console.warn(`Failed to play sound ${id}:`, error);
    }
  }

  // ミュート状態変更時の処理
  private handleMuteStateChange(isMuted: boolean): void {
    if (isMuted) {
      // 全ての音声を停止
      this.sounds.forEach((audio) => {
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      
      console.log('All sounds muted due to silent switch');
    } else {
      console.log('Sounds unmuted - silent switch off');
    }
  }

  // ミュート検出を開始
  startMuteDetection(): void {
    this.muteDetection.startMuteDetection(3000); // 3秒間隔でチェック
  }

  // ミュート検出を停止
  stopMuteDetection(): void {
    this.muteDetection.stopMuteDetection();
  }
}