'use client';

import { useState, useEffect } from 'react';
import { MultiplayerManager, MultiplayerSession, MultiplayerUser } from '@/lib/multiplayer-manager';
import { SoundManager } from '@/lib/sound';
import { 
  Clock, 
  Users, 
  Trophy, 
  Star,
  CheckCircle,
  XCircle,
  ArrowRight,
  Crown,
  Target,
  Zap
} from 'lucide-react';

interface MultiplayerGameProps {
  sessionId: string;
  userId: string;
  onGameEnd: (results: any) => void;
  onClose: () => void;
}

export default function MultiplayerGame({ sessionId, userId, onGameEnd, onClose }: MultiplayerGameProps) {
  const [multiplayerManager] = useState(MultiplayerManager.getInstance());
  const [session, setSession] = useState<MultiplayerSession | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswer, setUserAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentResult, setCurrentResult] = useState<any>(null);
  const [soundManager, setSoundManager] = useState<SoundManager | null>(null);
  const [gamePhase, setGamePhase] = useState<'question' | 'results' | 'final'>('question');

  useEffect(() => {
    const initSound = async () => {
      const sound = SoundManager.getInstance();
      await sound.init();
      setSoundManager(sound);
    };
    initSound();

    // セッション取得
    const currentSession = multiplayerManager.getSession(userId);
    setSession(currentSession);

    if (currentSession) {
      setTimeLeft(currentSession.settings.timeLimit);
    }
  }, [multiplayerManager, userId]);

  useEffect(() => {
    if (gamePhase !== 'question' || hasAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // 時間切れ
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gamePhase, hasAnswered]);

  const handleTimeUp = async () => {
    if (!hasAnswered) {
      await handleAnswerSubmit(''); // 空回答として提出
    }
  };

  const handleAnswerSubmit = async (answer?: string) => {
    if (!session || hasAnswered) return;

    const finalAnswer = answer || userAnswer;
    const responseTime = session.settings.timeLimit - timeLeft;

    try {
      soundManager?.playSound('click');
      const result = await multiplayerManager.submitAnswer(userId, finalAnswer, responseTime);
      
      setCurrentResult(result);
      setHasAnswered(true);
      setShowResults(true);
      setGamePhase('results');

      // 効果音
      if (result.correct) {
        soundManager?.playSound('correct');
      } else {
        soundManager?.playSound('incorrect');
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleNextQuestion = async () => {
    if (!session || session.hostId !== userId) return;

    try {
      const hasMore = await multiplayerManager.nextQuestion(userId);
      
      if (hasMore) {
        // 次の問題へ
        const updatedSession = multiplayerManager.getSession(userId);
        setSession(updatedSession);
        setTimeLeft(session.settings.timeLimit);
        setUserAnswer('');
        setHasAnswered(false);
        setShowResults(false);
        setCurrentResult(null);
        setGamePhase('question');
      } else {
        // ゲーム終了
        setGamePhase('final');
        setTimeout(() => {
          onGameEnd(session);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to go to next question:', error);
    }
  };

  if (!session) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="text-2xl text-gray-600">ゲームを読み込み中...</div>
        </div>
      </div>
    );
  }

  const currentQuestion = session.questions[session.currentQuestionIndex];
  const currentUser = session.participants.find(p => p.userId === userId);
  const isHost = session.hostId === userId;

  // ゲーム終了画面
  if (gamePhase === 'final') {
    const finalRanking = [...session.participants].sort((a, b) => b.score - a.score);
    const userPosition = finalRanking.findIndex(p => p.userId === userId) + 1;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl text-center">
            <Trophy className="mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold mb-2">ゲーム終了！</h2>
            <p className="opacity-90">みんなよく頑張りました！</p>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                {userPosition === 1 ? '🏆' : userPosition === 2 ? '🥈' : userPosition === 3 ? '🥉' : '🎖️'}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {userPosition}位おめでとう！
              </h3>
              <div className="text-lg text-gray-600">
                {currentUser?.score}ポイント獲得
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">最終ランキング</h4>
              <div className="space-y-3">
                {finalRanking.map((participant, index) => (
                  <div
                    key={participant.userId}
                    className={`flex items-center gap-4 p-3 rounded-lg ${
                      index === 0 ? 'bg-yellow-50 border-2 border-yellow-300' :
                      index === 1 ? 'bg-gray-50 border-2 border-gray-300' :
                      index === 2 ? 'bg-orange-50 border-2 border-orange-300' :
                      'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <div className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}位`}
                    </div>
                    <div className="text-2xl">{participant.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">
                          {participant.displayName}
                        </span>
                        {participant.userId === session.hostId && (
                          <Crown className="text-yellow-500" size={16} />
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        正解: {participant.correctAnswers}/{session.questions.length}問
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">
                        {participant.score}pt
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-3">
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105"
              >
                ホームに戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl">🎮</div>
              <div>
                <div className="font-bold">問題 {session.currentQuestionIndex + 1}/{session.questions.length}</div>
                <div className="text-sm opacity-75">マルチプレイヤーゲーム</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* タイマー */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                timeLeft <= 10 ? 'bg-red-500/80 animate-pulse' : 'bg-white/20'
              }`}>
                <Clock size={20} />
                <span className="font-bold text-lg">{timeLeft}s</span>
              </div>
              
              {/* 参加者数 */}
              <div className="bg-white/20 px-3 py-2 rounded-lg flex items-center gap-2">
                <Users size={20} />
                <span>{session.participants.length}</span>
              </div>
            </div>
          </div>

          {/* プログレスバー */}
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((session.currentQuestionIndex + 1) / session.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 問題エリア */}
            <div className="lg:col-span-2">
              {currentQuestion && (
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {currentQuestion.question}
                    </h3>
                    
                    <div className="flex justify-center items-center gap-2 mb-4">
                      <Target className="text-blue-600" size={20} />
                      <span className="text-blue-600 font-medium">
                        {currentQuestion.points}ポイント
                      </span>
                    </div>
                  </div>

                  {!hasAnswered && gamePhase === 'question' ? (
                    <div className="space-y-4">
                      {currentQuestion.options ? (
                        // 選択肢問題
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {currentQuestion.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleAnswerSubmit(option)}
                              className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : (
                        // 入力問題
                        <div className="text-center">
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="text-2xl font-bold text-center w-48 h-16 border-4 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none mb-4"
                            placeholder="答えを入力"
                            autoFocus
                            onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                          />
                          <div>
                            <button
                              onClick={() => handleAnswerSubmit()}
                              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105"
                            >
                              回答する
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // 結果表示
                    <div className="text-center">
                      {currentResult && (
                        <div className={`p-6 rounded-xl mb-4 ${
                          currentResult.correct ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'
                        }`}>
                          <div className="flex items-center justify-center gap-3 mb-2">
                            {currentResult.correct ? (
                              <CheckCircle className="text-green-600" size={32} />
                            ) : (
                              <XCircle className="text-red-600" size={32} />
                            )}
                            <span className={`text-2xl font-bold ${
                              currentResult.correct ? 'text-green-700' : 'text-red-700'
                            }`}>
                              {currentResult.correct ? '正解！' : '不正解'}
                            </span>
                          </div>
                          
                          {currentResult.explanation && (
                            <p className="text-gray-700 mb-4">{currentResult.explanation}</p>
                          )}
                        </div>
                      )}
                      
                      <div className="text-gray-600">
                        {isHost ? '次の問題に進むボタンを押してください' : 'ホストが次の問題に進むのを待っています...'}
                      </div>
                      
                      {isHost && (
                        <button
                          onClick={handleNextQuestion}
                          className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
                        >
                          <ArrowRight size={20} />
                          次の問題へ
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* サイドバー */}
            <div className="space-y-4">
              {/* 現在のランキング */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Trophy className="text-yellow-500" size={20} />
                  現在のランキング
                </h4>
                <div className="space-y-2">
                  {[...session.participants]
                    .sort((a, b) => b.score - a.score)
                    .map((participant, index) => (
                      <div
                        key={participant.userId}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          participant.userId === userId ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                        }`}
                      >
                        <div className="text-sm font-bold w-6">
                          #{index + 1}
                        </div>
                        <div className="text-lg">{participant.avatar}</div>
                        <div className="flex-1 text-sm">
                          <div className="font-medium truncate">
                            {participant.displayName}
                            {participant.userId === session.hostId && (
                              <Crown className="inline ml-1" size={12} />
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">{participant.score}</div>
                          <div className="text-xs text-gray-500">
                            {participant.correctAnswers}問正解
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 回答状況 */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Zap className="text-green-500" size={20} />
                  回答状況
                </h4>
                <div className="space-y-2">
                  {session.participants.map((participant) => (
                    <div
                      key={participant.userId}
                      className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
                    >
                      <div className="text-lg">{participant.avatar}</div>
                      <div className="flex-1 text-sm font-medium truncate">
                        {participant.displayName}
                      </div>
                      <div>
                        {participant.currentAnswer !== undefined ? (
                          <CheckCircle className="text-green-500" size={16} />
                        ) : (
                          <Clock className="text-orange-500" size={16} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ゲーム情報 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-2">ゲーム情報</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>制限時間: {session.settings.timeLimit}秒</div>
                  <div>総問題数: {session.settings.rounds}問</div>
                  <div>フレンドリーモード: {session.settings.friendlyMode ? 'ON' : 'OFF'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}