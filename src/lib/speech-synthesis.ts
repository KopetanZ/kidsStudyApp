// 音声読み上げ機能 - ひらがな・カタカナ・漢字対応

export interface SpeechSettings {
  rate: number; // 読み上げ速度 (0.5-2.0)
  pitch: number; // 音の高さ (0.5-2.0)
  volume: number; // 音量 (0.0-1.0)
  voice: string; // 使用する音声
  lang: string; // 言語設定
}

export class JapaneseSpeechSynthesis {
  private static defaultSettings: SpeechSettings = {
    rate: 0.8, // 子供向けなのでゆっくり
    pitch: 1.2, // 少し高めで親しみやすく
    volume: 0.8,
    voice: 'Japanese Female', // 優先的に使用する音声
    lang: 'ja-JP'
  };

  // 利用可能な日本語音声を取得
  static getAvailableJapaneseVoices(): SpeechSynthesisVoice[] {
    if (!window.speechSynthesis) return [];
    
    const voices = window.speechSynthesis.getVoices();
    return voices.filter(voice => 
      voice.lang.startsWith('ja') || 
      voice.name.includes('Japanese') ||
      voice.name.includes('Japan')
    );
  }

  // 最適な日本語音声を選択
  private static selectBestJapaneseVoice(): SpeechSynthesisVoice | null {
    const japaneseVoices = this.getAvailableJapaneseVoices();
    
    if (japaneseVoices.length === 0) return null;

    // 優先順位: 女性 > 男性、ネイティブ > 非ネイティブ
    const femaleVoices = japaneseVoices.filter(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('girl')
    );

    const nativeVoices = japaneseVoices.filter(voice => voice.localService);

    if (femaleVoices.length > 0) {
      return femaleVoices.find(voice => voice.localService) || femaleVoices[0];
    }

    return nativeVoices[0] || japaneseVoices[0];
  }

  // ひらがなの読み上げ
  static speakHiragana(character: string, settings?: Partial<SpeechSettings>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('音声合成がサポートされていません'));
        return;
      }

      const finalSettings = { ...this.defaultSettings, ...settings };
      const utterance = new SpeechSynthesisUtterance(character);
      
      // 日本語用の設定
      utterance.lang = finalSettings.lang;
      utterance.rate = finalSettings.rate;
      utterance.pitch = finalSettings.pitch;
      utterance.volume = finalSettings.volume;

      // 最適な音声を選択
      const bestVoice = this.selectBestJapaneseVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      window.speechSynthesis.speak(utterance);
    });
  }

  // カタカナの読み上げ
  static speakKatakana(character: string, settings?: Partial<SpeechSettings>): Promise<void> {
    // カタカナも基本的にはひらがなと同じ処理
    return this.speakHiragana(character, settings);
  }

  // 漢字の読み上げ（読み仮名付き）
  static speakKanji(character: string, reading: string, settings?: Partial<SpeechSettings>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('音声合成がサポートされていません'));
        return;
      }

      const finalSettings = { 
        ...this.defaultSettings, 
        rate: 0.7, // 漢字はさらにゆっくり
        ...settings 
      };

      // 漢字＋読み仮名のセット
      const textToSpeak = `${character}、${reading}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      utterance.lang = finalSettings.lang;
      utterance.rate = finalSettings.rate;
      utterance.pitch = finalSettings.pitch;
      utterance.volume = finalSettings.volume;

      const bestVoice = this.selectBestJapaneseVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      window.speechSynthesis.speak(utterance);
    });
  }

  // 単語の読み上げ
  static speakWord(word: string, settings?: Partial<SpeechSettings>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('音声合成がサポートされていません'));
        return;
      }

      const finalSettings = { ...this.defaultSettings, ...settings };
      const utterance = new SpeechSynthesisUtterance(word);
      
      utterance.lang = finalSettings.lang;
      utterance.rate = finalSettings.rate;
      utterance.pitch = finalSettings.pitch;
      utterance.volume = finalSettings.volume;

      const bestVoice = this.selectBestJapaneseVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      window.speechSynthesis.speak(utterance);
    });
  }

  // 問題文の読み上げ
  static speakQuestion(questionText: string, settings?: Partial<SpeechSettings>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('音声合成がサポートされていません'));
        return;
      }

      const finalSettings = { 
        ...this.defaultSettings, 
        rate: 0.9, // 問題文は少し速めでも OK
        ...settings 
      };

      const utterance = new SpeechSynthesisUtterance(questionText);
      
      utterance.lang = finalSettings.lang;
      utterance.rate = finalSettings.rate;
      utterance.pitch = finalSettings.pitch;
      utterance.volume = finalSettings.volume;

      const bestVoice = this.selectBestJapaneseVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      window.speechSynthesis.speak(utterance);
    });
  }

  // 励ましの言葉の読み上げ
  static speakEncouragement(message: string, settings?: Partial<SpeechSettings>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('音声合成がサポートされていません'));
        return;
      }

      const finalSettings = { 
        ...this.defaultSettings, 
        rate: 1.0,
        pitch: 1.3, // 励ましの言葉は明るく
        ...settings 
      };

      const utterance = new SpeechSynthesisUtterance(message);
      
      utterance.lang = finalSettings.lang;
      utterance.rate = finalSettings.rate;
      utterance.pitch = finalSettings.pitch;
      utterance.volume = finalSettings.volume;

      const bestVoice = this.selectBestJapaneseVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      window.speechSynthesis.speak(utterance);
    });
  }

  // 音声合成を停止
  static stopSpeech(): void {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // 音声合成が利用可能かチェック
  static isSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  // 音声設定のテスト
  static async testVoice(settings?: Partial<SpeechSettings>): Promise<void> {
    try {
      await this.speakHiragana('こんにちは', settings);
    } catch (error) {
      console.error('音声テストに失敗しました:', error);
      throw error;
    }
  }
}

// 音声ボタンのHTML生成
export const generateSpeechButton = (
  text: string, 
  type: 'hiragana' | 'katakana' | 'kanji' | 'word' | 'question' | 'encouragement',
  reading?: string
): string => {
  const buttonId = `speech-btn-${Math.random().toString(36).substr(2, 9)}`;
  
  return `
    <button 
      id="${buttonId}"
      class="inline-flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
      title="音声で読み上げ"
      onclick="handleSpeechButtonClick('${buttonId}', '${text}', '${type}', '${reading || ''}')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142m-5.657-2.828a3 3 0 010-4.242M9 12a3 3 0 105.196 2m0 0L9 12m5.196 2L16 12m-5.196 2L9 12"></path>
      </svg>
    </button>
    
    <script>
      function handleSpeechButtonClick(buttonId, text, type, reading) {
        const button = document.getElementById(buttonId);
        if (!button) return;
        
        // ボタンを一時的に無効化
        button.disabled = true;
        button.classList.add('animate-pulse');
        
        // 音声読み上げを実行
        let speechPromise;
        
        switch(type) {
          case 'hiragana':
            speechPromise = JapaneseSpeechSynthesis.speakHiragana(text);
            break;
          case 'katakana':
            speechPromise = JapaneseSpeechSynthesis.speakKatakana(text);
            break;
          case 'kanji':
            speechPromise = JapaneseSpeechSynthesis.speakKanji(text, reading);
            break;
          case 'word':
            speechPromise = JapaneseSpeechSynthesis.speakWord(text);
            break;
          case 'question':
            speechPromise = JapaneseSpeechSynthesis.speakQuestion(text);
            break;
          case 'encouragement':
            speechPromise = JapaneseSpeechSynthesis.speakEncouragement(text);
            break;
          default:
            speechPromise = JapaneseSpeechSynthesis.speakWord(text);
        }
        
        speechPromise
          .then(() => {
            // 読み上げ完了
            button.disabled = false;
            button.classList.remove('animate-pulse');
          })
          .catch((error) => {
            console.error('音声読み上げエラー:', error);
            button.disabled = false;
            button.classList.remove('animate-pulse');
            
            // エラーメッセージを表示
            const errorMsg = document.createElement('div');
            errorMsg.className = 'text-red-500 text-sm mt-2';
            errorMsg.textContent = '音声読み上げに失敗しました';
            button.parentNode.insertBefore(errorMsg, button.nextSibling);
            
            setTimeout(() => {
              if (errorMsg.parentNode) {
                errorMsg.parentNode.removeChild(errorMsg);
              }
            }, 3000);
          });
      }
    </script>
  `;
};

// 学習効果を高める音声ガイド
export class LearningAudioGuide {
  // 正解時の励ましメッセージ
  static correctAnswerMessages = [
    'すばらしい！正解です！',
    'よくできました！その調子です！',
    'せいかい！とてもじょうずですね！',
    'パーフェクト！すごいです！',
    'やったね！がんばりました！'
  ];

  // 不正解時の励ましメッセージ
  static incorrectAnswerMessages = [
    'おしい！もう一度がんばってみましょう！',
    'だいじょうぶ！つぎはきっとできます！',
    'あと少しです！がんばって！',
    'まちがいもべんきょうです！つぎにいかしましょう！',
    'ドンマイ！みんなまちがえることがあります！'
  ];

  // レベル完了時の祝福メッセージ
  static levelCompleteMessages = [
    'レベル完了！おめでとうございます！',
    'やりました！新しいレベルが開放されました！',
    'すごい！どんどん上手になっていますね！',
    'レベルクリア！次のステップに進みましょう！',
    'すばらしい成果です！つぎのレベルもがんばって！'
  ];

  // ランダムメッセージ選択
  static getRandomMessage(messages: string[]): string {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // 正解時のオーディオフィードバック
  static async playCorrectFeedback(): Promise<void> {
    const message = this.getRandomMessage(this.correctAnswerMessages);
    await JapaneseSpeechSynthesis.speakEncouragement(message);
  }

  // 不正解時のオーディオフィードバック
  static async playIncorrectFeedback(): Promise<void> {
    const message = this.getRandomMessage(this.incorrectAnswerMessages);
    await JapaneseSpeechSynthesis.speakEncouragement(message);
  }

  // レベル完了時のオーディオフィードバック
  static async playLevelCompleteFeedback(): Promise<void> {
    const message = this.getRandomMessage(this.levelCompleteMessages);
    await JapaneseSpeechSynthesis.speakEncouragement(message);
  }
}

// 音声機能の初期化
export const initializeSpeechSynthesis = (): void => {
  // 音声がロードされるまで待機
  if (window.speechSynthesis) {
    // iOS Safariでは最初に音声リストが空の場合がある
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log('音声合成が利用可能です。対応音声数:', voices.length);
        const japaneseVoices = JapaneseSpeechSynthesis.getAvailableJapaneseVoices();
        console.log('日本語音声数:', japaneseVoices.length);
      }
    };

    // 音声リストの変更を監視
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    // 初回ロード
    loadVoices();
  } else {
    console.warn('このブラウザは音声合成をサポートしていません');
  }
};