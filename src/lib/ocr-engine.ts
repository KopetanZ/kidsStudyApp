import { createWorker, Worker } from 'tesseract.js';

export interface OCRResult {
  text: string;
  confidence: number;
  alternatives: Array<{
    text: string;
    confidence: number;
  }>;
}

export class OCREngine {
  private static instance: OCREngine;
  private worker: Worker | null = null;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): OCREngine {
    if (!OCREngine.instance) {
      OCREngine.instance = new OCREngine();
    }
    return OCREngine.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.worker = await createWorker();
      
      // 日本語とアルファベットの混在に対応
      await (this.worker as any).loadLanguage('jpn+eng');
      await (this.worker as any).initialize('jpn+eng');
      
      // OCRの精度向上のための設定
      await (this.worker as any).setParameters({
        // 文字認識の精度を向上させる設定
        tessedit_char_whitelist: 'あいうえおかきくけこさしすせそたちつてのはひふへほまみすめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっゃゅょゎっガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポッャュョヮッ123456789０１２３４５６７８９',
        // ページレイアウト分析を無効化（単一文字用）
        tessedit_pageseg_mode: '8', // 単一文字モード
        // OCRエンジンモード（LLSTMが推奨）
        tessedit_ocr_engine_mode: '1'
      });

      this.isInitialized = true;
      console.log('OCR Engine initialized successfully');
    } catch (error) {
      console.error('Failed to initialize OCR Engine:', error);
      throw new Error('OCR Engine initialization failed');
    }
  }

  async recognizeCharacter(imageData: string): Promise<OCRResult> {
    if (!this.isInitialized || !this.worker) {
      await this.initialize();
    }

    if (!this.worker) {
      throw new Error('OCR Engine not available');
    }

    try {
      // 画像の前処理
      const processedImage = await this.preprocessImage(imageData);
      
      // OCR実行
      const { data } = await (this.worker as any).recognize(processedImage);
      
      // 結果の後処理
      const result = await this.postprocessResult(data);
      
      return result;
    } catch (error) {
      console.error('OCR recognition failed:', error);
      return {
        text: '',
        confidence: 0,
        alternatives: []
      };
    }
  }

  private async preprocessImage(imageData: string): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // キャンバスサイズを設定（OCRに最適なサイズ）
        canvas.width = 200;
        canvas.height = 200;

        // 白背景で塗りつぶし
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 画像を中央に配置
        const size = Math.min(img.width, img.height);
        const x = (canvas.width - size) / 2;
        const y = (canvas.height - size) / 2;

        ctx.drawImage(img, x, y, size, size);

        // コントラストとシャープネスを向上
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // シンプルな二値化処理
        for (let i = 0; i < data.length; i += 4) {
          const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const threshold = grayscale > 200 ? 255 : 0;
          
          data[i] = threshold;     // R
          data[i + 1] = threshold; // G
          data[i + 2] = threshold; // B
          // data[i + 3] はalpha値なのでそのまま
        }
        
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };

      img.src = imageData;
    });
  }

  private async postprocessResult(data: any): Promise<OCRResult> {
    const rawText = data.text.trim();
    const confidence = data.confidence;

    // ひらがな・カタカナ・数字の文字候補を生成
    const alternatives = this.generateAlternatives(rawText, confidence);

    return {
      text: this.cleanupText(rawText),
      confidence: confidence,
      alternatives: alternatives
    };
  }

  private cleanupText(text: string): string {
    // 余分な文字や記号を除去
    return text
      .replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF0-9０-９]/g, '')
      .trim();
  }

  private generateAlternatives(text: string, confidence: number): Array<{text: string, confidence: number}> {
    const alternatives: Array<{text: string, confidence: number}> = [];
    
    if (text.length > 0) {
      // 類似文字の候補を生成
      const similarChars = this.getSimilarCharacters(text[0]);
      
      similarChars.forEach(char => {
        if (char !== text[0]) {
          alternatives.push({
            text: char,
            confidence: Math.max(0, confidence - 10 - Math.random() * 20)
          });
        }
      });
    }

    // 信頼度でソート
    return alternatives.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
  }

  private getSimilarCharacters(char: string): string[] {
    // よく間違えやすい文字のマッピング
    const similarityMap: Record<string, string[]> = {
      // ひらがな
      'あ': ['お', 'む', 'ぬ'],
      'い': ['り', 'し'],
      'う': ['ふ', 'つ'],
      'え': ['ん'],
      'お': ['あ', 'む'],
      'か': ['が', 'に'],
      'き': ['さ', 'ち'],
      'く': ['へ', 'し'],
      'け': ['は', 'ほ'],
      'こ': ['ご', 'て'],
      'さ': ['ち', 'き'],
      'し': ['り', 'い'],
      'す': ['む', 'ら'],
      'せ': ['も', 'ね'],
      'そ': ['ん'],
      'た': ['だ', 'な'],
      'ち': ['さ', 'き'],
      'つ': ['う', 'ら'],
      'て': ['こ', 'で'],
      'と': ['ど', 'け'],
      'な': ['た', 'だ'],
      'に': ['か', 'が'],
      'ぬ': ['あ', 'む'],
      'ね': ['せ', 'も'],
      'の': ['め'],
      'は': ['ほ', 'け'],
      'ひ': ['と', 'ど'],
      'ふ': ['う', 'つ'],
      'へ': ['く', 'し'],
      'ほ': ['は', 'け'],
      'ま': ['も'],
      'み': ['ら'],
      'む': ['あ', 'お', 'ぬ'],
      'め': ['の'],
      'も': ['ま', 'せ'],
      'や': ['ゃ'],
      'ゆ': ['ゅ'],
      'よ': ['ょ'],
      'ら': ['み', 'つ'],
      'り': ['し', 'い'],
      'る': ['ろ'],
      'れ': ['わ'],
      'ろ': ['る'],
      'わ': ['れ'],
      'ん': ['え', 'そ'],
      
      // 数字
      '1': ['7', 'l'],
      '2': ['7'],
      '3': ['8'],
      '5': ['6', 'S'],
      '6': ['5', '9'],
      '7': ['1', '2'],
      '8': ['3', '0'],
      '9': ['6', '4'],
      '0': ['8', 'O']
    };

    return similarityMap[char] || [char];
  }

  // 日本語専用の文字認識（ひらがな・カタカナ特化）
  async recognizeJapaneseCharacter(imageData: string): Promise<OCRResult> {
    if (!this.worker) {
      await this.initialize();
    }

    if (!this.worker) {
      throw new Error('OCR Engine not available');
    }

    try {
      // 日本語文字認識に特化した設定
      await (this.worker as any).setParameters({
        tessedit_char_whitelist: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっゃゅょゎアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポッャュョヮ',
        tessedit_pageseg_mode: '10', // 単一文字モード（より厳密）
      });

      const processedImage = await this.preprocessImage(imageData);
      const { data } = await (this.worker as any).recognize(processedImage);
      
      return await this.postprocessResult(data);
    } catch (error) {
      console.error('Japanese character recognition failed:', error);
      return {
        text: '',
        confidence: 0,
        alternatives: []
      };
    }
  }

  // 数字専用の認識
  async recognizeNumber(imageData: string): Promise<OCRResult> {
    if (!this.worker) {
      await this.initialize();
    }

    if (!this.worker) {
      throw new Error('OCR Engine not available');
    }

    try {
      // 数字認識に特化した設定
      await (this.worker as any).setParameters({
        tessedit_char_whitelist: '0123456789０１２３４５６７８９',
        tessedit_pageseg_mode: '8',
      });

      const processedImage = await this.preprocessImage(imageData);
      const { data } = await (this.worker as any).recognize(processedImage);
      
      const result = await this.postprocessResult(data);
      
      // 全角数字を半角に変換
      result.text = result.text.replace(/[０-９]/g, (match) => {
        return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
      });
      
      return result;
    } catch (error) {
      console.error('Number recognition failed:', error);
      return {
        text: '',
        confidence: 0,
        alternatives: []
      };
    }
  }

  async terminate(): Promise<void> {
    if (this.worker) {
      await (this.worker as any).terminate();
      this.worker = null;
      this.isInitialized = false;
    }
  }

  // OCR結果の妥当性チェック
  validateResult(result: OCRResult, expectedType: 'hiragana' | 'katakana' | 'number' | 'any'): boolean {
    const text = result.text;
    
    if (!text || text.length === 0) return false;
    if (result.confidence < 30) return false; // 信頼度が低すぎる場合

    switch (expectedType) {
      case 'hiragana':
        return /^[\u3040-\u309F]+$/.test(text);
      case 'katakana':
        return /^[\u30A0-\u30FF]+$/.test(text);
      case 'number':
        return /^[0-9]+$/.test(text);
      case 'any':
        return true;
      default:
        return false;
    }
  }

  // 認識精度向上のためのフィードバック学習（将来の拡張用）
  async submitFeedback(imageData: string, correctAnswer: string, ocrResult: OCRResult): Promise<void> {
    // 将来的にはこのデータを使って認識精度を向上させる
    console.log('OCR Feedback:', {
      correct: correctAnswer,
      recognized: ocrResult.text,
      confidence: ocrResult.confidence,
      timestamp: new Date().toISOString()
    });
    
    // LocalStorageに学習データを保存（実際の実装では外部APIに送信）
    const feedbackData = {
      imageData,
      correctAnswer,
      ocrResult,
      timestamp: Date.now()
    };
    
    const existingData = JSON.parse(localStorage.getItem('ocr_feedback') || '[]');
    existingData.push(feedbackData);
    
    // 最新の100件のみ保持
    if (existingData.length > 100) {
      existingData.splice(0, existingData.length - 100);
    }
    
    localStorage.setItem('ocr_feedback', JSON.stringify(existingData));
  }
}