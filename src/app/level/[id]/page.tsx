'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MathQuestionGenerator, generateMathProblemVisual } from '@/lib/math-generator';
import { JapaneseQuestionGenerator, generateJapaneseVisual } from '@/lib/japanese-generator';
import { EnglishQuestionGenerator, generateEnglishVisual } from '@/lib/english-generator';
import { StorageManager } from '@/lib/storage';
import { SoundManager } from '@/lib/sound';
import { Question, GameSession, UserProgress } from '@/types';
import { ArrowLeft, CheckCircle, XCircle, Star } from 'lucide-react';
import DrawingCanvas from '@/components/DrawingCanvas';

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = params.id as string;
  
  const [session, setSession] = useState<GameSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [soundManager, setSoundManager] = useState<SoundManager | null>(null);
  const [inputError, setInputError] = useState(false);
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);

  useEffect(() => {
    const initializeLevel = async () => {
      // Generate questions based on level and subject
      let questions: Question[] = [];
      
      if (levelId.startsWith('math-')) {
        questions = MathQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('japanese-')) {
        questions = JapaneseQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else if (levelId.startsWith('english-')) {
        questions = EnglishQuestionGenerator.generateQuestionsByLevelId(levelId);
      } else {
        questions = MathQuestionGenerator.generateQuestionsByLevelId(levelId);
      }
      
      const newSession: GameSession = {
        id: `session-${Date.now()}`,
        subjectId: levelId.split('-')[0],
        levelId,
        questions,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        startTime: new Date(),
        completed: false
      };

      setSession(newSession);
      setCurrentQuestion(questions[0]);
      
      const userProgress = StorageManager.getProgress();
      setProgress(userProgress);

      const sound = SoundManager.getInstance();
      await sound.init();
      setSoundManager(sound);
    };

    initializeLevel();
  }, [levelId]);

  const handleAnswerSubmit = async (userInput?: string) => {
    const finalAnswer = userInput || userAnswer.trim();
    
    if (!currentQuestion || !session || finalAnswer === '') {
      setInputError(true);
      setTimeout(() => setInputError(false), 500);
      return;
    }

    const correct = finalAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setShowDrawingCanvas(false);

    // Play sound
    if (correct) {
      soundManager?.playSound('correct');
    } else {
      soundManager?.playSound('incorrect');
    }

    // Update session
    const updatedSession = {
      ...session,
      score: session.score + (correct ? currentQuestion.points : 0),
      correctAnswers: session.correctAnswers + (correct ? 1 : 0)
    };
    setSession(updatedSession);

    // Update progress
    if (correct) {
      const newProgress = StorageManager.addPoints(currentQuestion.points);
      setProgress(newProgress);
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      handleNextQuestion(updatedSession);
    }, 2000);
  };

  const handleDrawingComplete = (_drawing: string) => {
    // Simple character recognition placeholder
    // In a real app, you'd use tesseract.js here
    handleAnswerSubmit(currentQuestion?.correctAnswer || '');
  };

  const handleDrawingClear = () => {
    // Reset any drawing state if needed
  };

  const handleNextQuestion = (currentSession: GameSession) => {
    const nextIndex = currentSession.currentQuestionIndex + 1;
    
    if (nextIndex >= currentSession.questions.length) {
      // Level completed
      completeLevel(currentSession);
      return;
    }

    // Move to next question
    const updatedSession = {
      ...currentSession,
      currentQuestionIndex: nextIndex
    };
    
    setSession(updatedSession);
    setCurrentQuestion(currentSession.questions[nextIndex]);
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setShowDrawingCanvas(false);
  };

  const completeLevel = (finalSession: GameSession) => {
    const completedSession = {
      ...finalSession,
      completed: true,
      endTime: new Date()
    };
    
    setSession(completedSession);
    
    // Save completion
    const newProgress = StorageManager.completeLevel(levelId);
    setProgress(newProgress);
    
    // Play celebration sound
    soundManager?.playSound('celebration');
    
    // Show results screen
    setShowResult(false);
    setCurrentQuestion(null);
  };

  const handleBackClick = () => {
    soundManager?.playSound('click');
    router.back();
  };

  const handleRetry = () => {
    soundManager?.playSound('click');
    router.refresh();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit();
    }
  };

  if (!session || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">読み込み中...</div>
      </div>
    );
  }

  // Level completed screen
  if (session.completed) {
    const percentage = Math.round((session.correctAnswers / session.questions.length) * 100);
    const isPerfect = percentage === 100;
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full animate-bounce-in">
          <div className="text-8xl mb-6">
            {isPerfect ? '🏆' : percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '📚'}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {isPerfect ? 'パーフェクト！' : percentage >= 80 ? 'すごいね！' : percentage >= 60 ? 'よくできました！' : 'もう少し！'}
          </h1>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">
              <span className="font-medium">正解数</span>
              <span className="text-2xl font-bold text-green-600">
                {session.correctAnswers} / {session.questions.length}
              </span>
            </div>
            
            <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">
              <span className="font-medium">獲得ポイント</span>
              <span className="text-2xl font-bold text-yellow-600">
                {session.score}
              </span>
            </div>
            
            <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">
              <span className="font-medium">正解率</span>
              <span className="text-2xl font-bold text-blue-600">
                {percentage}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="kid-button w-full"
            >
              ホームに戻る
            </button>
            
            <button
              onClick={handleRetry}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full transition-colors"
            >
              もう一度挑戦
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-medium">戻る</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-md">
              <Star className="text-yellow-500" size={20} />
              <span className="font-bold text-yellow-600">{session.score}</span>
            </div>
            
            <div className="bg-white/80 rounded-full px-4 py-2 shadow-md">
              <span className="font-bold text-gray-700">
                {session.currentQuestionIndex + 1} / {session.questions.length}
              </span>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((session.currentQuestionIndex + 1) / session.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl animate-bounce-in">
            {/* Visual Aid */}
            {currentQuestion.type === 'math' && (
              <div dangerouslySetInnerHTML={{ __html: generateMathProblemVisual(currentQuestion) }} />
            )}
            {currentQuestion.type === 'japanese' && (
              <div dangerouslySetInnerHTML={{ __html: generateJapaneseVisual(currentQuestion) }} />
            )}
            {currentQuestion.type === 'english' && (
              <div dangerouslySetInnerHTML={{ __html: generateEnglishVisual(currentQuestion) }} />
            )}

            {/* Question */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {currentQuestion.question}
              </h2>

              {/* Answer Input - Different types based on question */}
              {!showDrawingCanvas && (
                <>
                  {currentQuestion.options ? (
                    // Multiple choice for English questions
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSubmit(option)}
                          disabled={showResult}
                          className="kid-button text-xl py-3 px-6 text-white bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : currentQuestion.type === 'japanese' && 
                       (currentQuestion.subtype?.includes('writing') || currentQuestion.subtype?.includes('word')) ? (
                    // Drawing canvas for Japanese character writing
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => setShowDrawingCanvas(true)}
                        className="kid-button text-xl py-3 px-8"
                      >
                        文字を書く
                      </button>
                      <div className="text-gray-600">
                        または下に直接入力してください
                      </div>
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={`
                          text-3xl font-bold text-center w-32 h-16 border-4 rounded-2xl mx-auto
                          focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all
                          ${inputError ? 'border-red-500 animate-wiggle' : 'border-gray-300'}
                        `}
                        placeholder="?"
                        autoFocus
                      />
                    </div>
                  ) : (
                    // Regular text/number input
                    <div className="flex justify-center">
                      <input
                        type={currentQuestion.type === 'math' ? 'number' : 'text'}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={`
                          text-3xl font-bold text-center w-32 h-16 border-4 rounded-2xl
                          focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all
                          ${inputError ? 'border-red-500 animate-wiggle' : 'border-gray-300'}
                        `}
                        placeholder="?"
                        autoFocus
                      />
                    </div>
                  )}
                </>
              )}

              {/* Drawing Canvas for Japanese */}
              {showDrawingCanvas && (
                <div className="mt-6">
                  <DrawingCanvas
                    onDrawingComplete={handleDrawingComplete}
                    onClear={handleDrawingClear}
                    expectedCharacter={currentQuestion.correctAnswer}
                  />
                </div>
              )}
            </div>

            {/* Submit Button - Only show for non-multiple choice */}
            {!currentQuestion.options && !showDrawingCanvas && (
              <div className="text-center">
                <button
                  onClick={() => handleAnswerSubmit()}
                  className="kid-button text-2xl py-4 px-12"
                  disabled={showResult}
                >
                  答える！
                </button>
              </div>
            )}

            {/* Result Display */}
            {showResult && (
              <div className={`
                mt-6 p-6 rounded-2xl text-center animate-bounce-in
                ${isCorrect 
                  ? 'bg-green-100 border-2 border-green-300' 
                  : 'bg-red-100 border-2 border-red-300'
                }
              `}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-600" size={32} />
                  ) : (
                    <XCircle className="text-red-600" size={32} />
                  )}
                  <span className={`text-2xl font-bold ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {isCorrect ? '正解！' : '不正解'}
                  </span>
                </div>
                
                {!isCorrect && (
                  <p className="text-red-600">
                    正解は <span className="font-bold text-2xl">{currentQuestion.correctAnswer}</span> でした
                  </p>
                )}
                
                {isCorrect && (
                  <p className="text-green-600">
                    <span className="font-bold">+{currentQuestion.points}</span> ポイント！
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}