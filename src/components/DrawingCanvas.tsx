'use client';

import { useRef, useEffect, useState } from 'react';
import { Trash2, Check } from 'lucide-react';

interface DrawingCanvasProps {
  onDrawingComplete: (drawing: string) => void;
  onClear: () => void;
  expectedCharacter?: string;
}

export default function DrawingCanvas({ 
  onDrawingComplete, 
  onClear, 
  expectedCharacter 
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);

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
    onClear();
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawing) return;

    // Convert canvas to base64
    const dataURL = canvas.toDataURL('image/png');
    onDrawingComplete(dataURL);
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
          onClick={handleSubmit}
          disabled={!hasDrawing}
          className={`
            flex items-center gap-2 font-bold py-3 px-8 rounded-full transition-all
            ${hasDrawing 
              ? 'kid-button hover:scale-105' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <Check size={20} />
          できた！
        </button>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 max-w-sm">
        <p className="text-sm text-yellow-800 text-center">
          💡 <strong>コツ：</strong> 
          ゆっくり丁寧に書くと、より正確に認識されるよ！
        </p>
      </div>
    </div>
  );
}