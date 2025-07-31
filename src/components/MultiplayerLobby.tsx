'use client';

import { useState, useEffect } from 'react';
import { MultiplayerManager, MultiplayerSession } from '@/lib/multiplayer-manager';
import { SoundManager } from '@/lib/sound';
import { 
  Users, 
  Play, 
  Settings, 
  Copy, 
  UserPlus, 
  Trophy,
  Clock,
  Target,
  Zap,
  Crown,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface MultiplayerLobbyProps {
  onClose: () => void;
  onGameStart: (sessionId: string) => void;
}

export default function MultiplayerLobby({ onClose, onGameStart }: MultiplayerLobbyProps) {
  const [multiplayerManager] = useState(MultiplayerManager.getInstance());
  const [currentSession, setCurrentSession] = useState<MultiplayerSession | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [soundManager, setSoundManager] = useState<SoundManager | null>(null);
  const [userId] = useState(`user-${Date.now()}`);

  useEffect(() => {
    const initSound = async () => {
      const sound = SoundManager.getInstance();
      await sound.init();
      setSoundManager(sound);
    };
    initSound();

    // 既存セッションチェック
    const existingSession = multiplayerManager.getSession(userId);
    if (existingSession) {
      setCurrentSession(existingSession);
    }
  }, [multiplayerManager, userId]);

  const handleCreateRoom = async (gameType: MultiplayerSession['gameType']) => {
    try {
      soundManager?.playSound('click');
      const roomCode = await multiplayerManager.createRoom(userId, gameType);
      const session = multiplayerManager.getSession(userId);
      setCurrentSession(session);
      setShowCreateRoom(false);
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  const handleJoinRoom = async () => {
    try {
      soundManager?.playSound('click');
      const session = await multiplayerManager.joinRoom(roomCode, userId);
      setCurrentSession(session);
      setShowJoinRoom(false);
      setRoomCode('');
    } catch (error) {
      console.error('Failed to join room:', error);
      alert('ルームに参加できませんでした。ルームコードを確認してください。');
    }
  };

  const handleReadyToggle = async () => {
    if (!currentSession) return;
    
    const currentUser = currentSession.participants.find(p => p.userId === userId);
    if (!currentUser) return;

    soundManager?.playSound('click');
    await multiplayerManager.setReady(userId, !currentUser.ready);
    
    // セッション更新
    const updatedSession = multiplayerManager.getSession(userId);
    setCurrentSession(updatedSession);
  };

  const handleStartGame = async () => {
    if (!currentSession) return;

    try {
      soundManager?.playSound('celebration');
      const started = await multiplayerManager.startGame(userId);
      if (started) {
        onGameStart(currentSession.sessionId);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'ゲームを開始できませんでした');
    }
  };

  const handleLeaveRoom = async () => {
    soundManager?.playSound('click');
    await multiplayerManager.leaveRoom(userId);
    setCurrentSession(null);
  };

  const copyRoomCode = () => {
    if (currentSession) {
      navigator.clipboard.writeText(currentSession.roomCode);
      soundManager?.playSound('click');
      // TODO: Show copied notification
    }
  };

  const getGameTypeDisplay = (gameType: MultiplayerSession['gameType']) => {
    switch (gameType) {
      case 'quiz-battle': return { name: 'クイズバトル', emoji: '⚔️', desc: '早押しクイズで競争' };
      case 'cooperative': return { name: '協力学習', emoji: '🤝', desc: 'みんなで協力して学習' };
      case 'speed-challenge': return { name: 'スピードチャレンジ', emoji: '⚡', desc: '制限時間内に問題を解く' };
      case 'team-relay': return { name: 'チームリレー', emoji: '🏃', desc: 'チームでリレー形式' };
      default: return { name: 'ゲーム', emoji: '🎮', desc: '' };
    }
  };

  // メインメニュー表示
  if (!currentSession) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users size={32} />
                <div>
                  <h2 className="text-2xl font-bold">マルチプレイヤー</h2>
                  <p className="opacity-90">友達と一緒に学習しよう！</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors text-xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-6">
            {!showCreateRoom && !showJoinRoom ? (
              <>
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎮</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">学習ゲームを選択</h3>
                  <p className="text-gray-600">友達や家族と一緒に楽しく学習しましょう</p>
                </div>

                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => setShowCreateRoom(true)}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <UserPlus size={24} />
                    <div className="text-left">
                      <div className="text-lg">ルームを作成</div>
                      <div className="text-sm opacity-90">新しいゲームルームを作る</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowJoinRoom(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <Users size={24} />
                    <div className="text-left">
                      <div className="text-lg">ルームに参加</div>
                      <div className="text-sm opacity-90">ルームコードで参加する</div>
                    </div>
                  </button>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2">💡 ヒント</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 友達や家族と一緒に学習できます</li>
                    <li>• 間違えても大丈夫！みんなで学び合いましょう</li>
                    <li>• ゲーム後は詳しい解説も見られます</li>
                  </ul>
                </div>
              </>
            ) : showCreateRoom ? (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">ゲームタイプを選択</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {(['quiz-battle', 'cooperative', 'speed-challenge', 'team-relay'] as const).map((gameType) => {
                    const display = getGameTypeDisplay(gameType);
                    return (
                      <button
                        key={gameType}
                        onClick={() => handleCreateRoom(gameType)}
                        className="bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 border-2 border-gray-200 hover:border-purple-300 rounded-xl p-4 text-left transition-all transform hover:scale-105"
                      >
                        <div className="text-3xl mb-2">{display.emoji}</div>
                        <div className="font-bold text-gray-800">{display.name}</div>
                        <div className="text-sm text-gray-600">{display.desc}</div>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setShowCreateRoom(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  戻る
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">ルームに参加</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ルームコード
                    </label>
                    <input
                      type="text"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      placeholder="例: ABC123"
                      className="w-full text-center text-2xl font-bold tracking-wider bg-gray-50 border-2 border-gray-300 rounded-xl p-4 focus:border-blue-500 focus:outline-none"
                      maxLength={6}
                    />
                  </div>
                  <button
                    onClick={handleJoinRoom}
                    disabled={roomCode.length !== 6}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:cursor-not-allowed"
                  >
                    参加する
                  </button>
                </div>
                <button
                  onClick={() => setShowJoinRoom(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  戻る
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ルーム内表示
  const gameDisplay = getGameTypeDisplay(currentSession.gameType);
  const currentUser = currentSession.participants.find(p => p.userId === userId);
  const isHost = currentSession.hostId === userId;
  const allReady = currentSession.participants.every(p => p.ready);
  const canStart = allReady && currentSession.participants.length >= 2;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{gameDisplay.emoji}</div>
              <div>
                <h2 className="text-2xl font-bold">{gameDisplay.name}</h2>
                <p className="opacity-90">ルームコード: {currentSession.roomCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={copyRoomCode}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
                title="ルームコードをコピー"
              >
                <Copy size={20} />
              </button>
              <button
                onClick={handleLeaveRoom}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors text-xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 参加者リスト */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="text-purple-600" size={24} />
                参加者 ({currentSession.participants.length}/{currentSession.maxParticipants})
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSession.participants.map((participant, index) => (
                  <div
                    key={participant.userId}
                    className={`bg-gray-50 rounded-xl p-4 border-2 ${
                      participant.ready ? 'border-green-300 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{participant.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800">
                            {participant.displayName}
                          </span>
                          {participant.userId === currentSession.hostId && (
                            <Crown className="text-yellow-500" size={16} />
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          レベル {participant.level} • {participant.badges.length} バッジ
                        </div>
                      </div>
                      <div className="text-right">
                        {participant.ready ? (
                          <CheckCircle className="text-green-600" size={24} />
                        ) : (
                          <XCircle className="text-gray-400" size={24} />
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          {participant.ready ? '準備完了' : '準備中...'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* 空きスロット */}
                {Array.from({ length: currentSession.maxParticipants - currentSession.participants.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="bg-gray-100 rounded-xl p-4 border-2 border-dashed border-gray-300">
                    <div className="text-center text-gray-500">
                      <UserPlus size={32} className="mx-auto mb-2 opacity-50" />
                      <div className="text-sm">参加者を待っています</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ゲーム設定とコントロール */}
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Settings className="text-gray-600" size={20} />
                  ゲーム設定
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">制限時間</span>
                    <span className="font-medium flex items-center gap-1">
                      <Clock size={16} />
                      {currentSession.settings.timeLimit}秒
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">問題数</span>
                    <span className="font-medium flex items-center gap-1">
                      <Target size={16} />
                      {currentSession.settings.rounds}問
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">難易度</span>
                    <span className="font-medium">{currentSession.difficulty}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">フレンドリーモード</span>
                    <span className="font-medium">
                      {currentSession.settings.friendlyMode ? '✅' : '❌'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {currentUser && (
                  <button
                    onClick={handleReadyToggle}
                    className={`w-full font-bold py-3 px-6 rounded-xl transition-all ${
                      currentUser.ready
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    }`}
                  >
                    {currentUser.ready ? '準備完了！' : '準備する'}
                  </button>
                )}

                {isHost && (
                  <button
                    onClick={handleStartGame}
                    disabled={!canStart}
                    className={`w-full font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 ${
                      canStart
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Play size={24} />
                    <div>
                      <div className="text-lg">ゲーム開始！</div>
                      {!canStart && (
                        <div className="text-sm opacity-75">
                          {!allReady ? '全員の準備完了を待っています' : '参加者が足りません'}
                        </div>
                      )}
                    </div>
                  </button>
                )}

                <button
                  onClick={handleLeaveRoom}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  ルームを出る
                </button>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2">🎮 ルール</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {gameDisplay.desc}</li>
                  <li>• 正解すると得点とXPがもらえます</li>
                  <li>• 間違えても大丈夫です</li>
                  <li>• みんなで楽しく学習しましょう！</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}