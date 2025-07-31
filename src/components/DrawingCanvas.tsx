'use client';

import { useRef, useEffect, useState } from 'react';
import { Trash2, Check, Eye, Loader } from 'lucide-react';
import { OCREngine, OCRResult } from '@/lib/ocr-engine';

interface DrawingCanvasProps {
  onDrawingComplete: (recognizedText: string) => void;
  onClear: () => void;
  expectedCharacter?: string;
  recognitionType?: 'hiragana' | 'katakana' | 'number' | 'any';
}

export default function DrawingCanvas({ 
  onDrawingComplete, 
  onClear, 
  expectedCharacter,
  recognitionType = 'any'
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [ocrEngine, setOcrEngine] = useState<OCREngine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas
    canvas.width = 300;
    canvas.height = 300;
    
    // Configure drawing style
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#333';
    
    // Clear canvas
    clearCanvas();

    // Initialize OCR Engine
    const initializeOCR = async () => {
      try {
        const engine = OCREngine.getInstance();
        await engine.initialize();
        setOcrEngine(engine);
      } catch (error) {
        console.error('Failed to initialize OCR engine:', error);
      }
    };

    initializeOCR();
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Add grid lines to help with character positioning
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    
    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    
    // Reset drawing style
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 8;
    
    setHasDrawing(false);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
      setHasDrawing(true);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    clearCanvas();
    setOcrResult(null);
    setShowAlternatives(false);
    onClear();
  };

  const performOCR = async () => {
    if (!hasDrawing || !ocrEngine) return;

    setIsRecognizing(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dataURL = canvas.toDataURL('image/png');
      let result: OCRResult;

      // 認識タイプに応じた処理
      switch (recognitionType) {
        case 'hiragana':
        case 'katakana':
          result = await ocrEngine.recognizeJapaneseCharacter(dataURL);
          break;
        case 'number':
          result = await ocrEngine.recognizeNumber(dataURL);
          break;
        default:
          result = await ocrEngine.recognizeCharacter(dataURL);
      }

      // 結果の妥当性チェック
      if (ocrEngine.validateResult(result, recognitionType)) {
        setOcrResult(result);
        if (result.alternatives.length > 0) {
          setShowAlternatives(true);
        }
      } else {
        setOcrResult({
          text: '',
          confidence: 0,
          alternatives: []
        });
      }
    } catch (error) {
      console.error('OCR failed:', error);
      setOcrResult({
        text: '',
        confidence: 0,
        alternatives: []
      });
    } finally {
      setIsRecognizing(false);
    }
  };

  const handleSubmit = (selectedText?: string) => {
    const finalText = selectedText || ocrResult?.text || '';
    
    if (finalText && expectedCharacter && ocrEngine && ocrResult) {
      // フィードバック学習のためのデータ収集
      const canvas = canvasRef.current;
      if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        ocrEngine.submitFeedback(dataURL, expectedCharacter, ocrResult);
      }
    }
    
    onDrawingComplete(finalText);
  };

  const handleAlternativeSelect = (text: string) => {
    setShowAlternatives(false);
    handleSubmit(text);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Character hint */}
      {expectedCharacter && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <p className="text-center text-gray-600 mb-2">書いてみよう：</p>
          <div className="text-6xl text-center text-blue-600 font-bold">
            {expectedCharacter}
          </div>
        </div>
      )}

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border-4 border-gray-300 rounded-2xl shadow-lg bg-white cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        
        {/* Instructions overlay */}
        {!hasDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-gray-100/90 rounded-xl p-4 text-center">
              <p className="text-gray-600 text-lg font-medium">
                ここに文字を書いてね
              </p>
              <p className="text-gray-500 text-sm mt-1">
                線に沿って丁寧に書こう
              </p>
            </div>
          </div>
        )}
      </div>

      {/* OCR Results */}
      {ocrResult && (
        <div className="w-full max-w-md">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-blue-800 mb-2">認識結果</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {ocrResult.text || '？'}
              </div>
              <div className="text-sm text-blue-600">
                信頼度: {ocrResult.confidence.toFixed(1)}%
              </div>
            </div>
            
            {ocrResult.text && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => handleSubmit()}
                  className="kid-button text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition-all"
                >
                  この文字で決定！
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Alternative Suggestions */}
      {showAlternatives && ocrResult && ocrResult.alternatives.length > 0 && (
        <div className="w-full max-w-md">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
            <h4 className="text-center font-bold text-yellow-800 mb-3">他の候補</h4>
            <div className="grid grid-cols-3 gap-2">
              {ocrResult.alternatives.map((alt, index) => (
                <button
                  key={index}
                  onClick={() => handleAlternativeSelect(alt.text)}
                  className="bg-white hover:bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 transition-colors"
                >
                  <div className="text-2xl font-bold text-yellow-800">{alt.text}</div>
                  <div className="text-xs text-yellow-600">{alt.confidence.toFixed(0)}%</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Control buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleClear}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full transition-colors"
        >
          <Trash2 size={20} />
          消す
        </button>
        
        <button
          onClick={performOCR}
          disabled={!hasDrawing || isRecognizing}
          className={`
            flex items-center gap-2 font-bold py-3 px-8 rounded-full transition-all
            ${hasDrawing && !isRecognizing
              ? 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isRecognizing ? (
            <>
              <Loader size={20} className="animate-spin" />
              認識中...
            </>
          ) : (
            <>
              <Eye size={20} />
              文字を認識
            </>
          )}
        </button>
        
        {!ocrResult && hasDrawing && !isRecognizing && (
          <button
            onClick={() => handleSubmit('')}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all hover:scale-105"
          >
            <Check size={20} />
            直接入力
          </button>
        )}
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 max-w-sm">
        <p className="text-sm text-yellow-800 text-center">
          💡 <strong>コツ：</strong> 
          {isRecognizing ? '文字を認識しています...' : 
           ocrEngine ? 'ゆっくり丁寧に書いて、「文字を認識」ボタンを押してね！' :
           'OCRエンジンを読み込み中...'}
        </p>
        {!ocrEngine && (
          <div className="text-center mt-2">
            <Loader size={16} className="animate-spin inline" />
            <span className="text-xs text-yellow-600 ml-2">初期化中...</span>
          </div>
        )}
      </div>
    </div>
  );
}