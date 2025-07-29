'use client';

import { useEffect, useState } from 'react';
import { subjects } from '@/lib/subjects';
import { StorageManager } from '@/lib/storage';
import { SoundManager } from '@/lib/sound';
import { UserProgress } from '@/types';
import Link from 'next/link';

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [soundManager, setSoundManager] = useState<SoundManager | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      const userProgress = StorageManager.getProgress();
      setProgress(userProgress);

      const sound = SoundManager.getInstance();
      await sound.init();
      setSoundManager(sound);
    };

    initializeApp();
  }, []);

  const handleSubjectClick = () => {
    soundManager?.playSound('click');
  };

  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-bounce-in">
            🌟 がくしゅうアプリ 🌟
          </h1>
          <p className="text-lg text-gray-600">楽しく勉強しよう！</p>
          
          {/* Progress Display */}
          <div className="mt-4 bg-white/80 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-xl font-bold text-yellow-600">
                  {progress.totalPoints} ポイント
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span className="text-lg font-semibold text-purple-600">
                  {progress.completedLevels.length} レベルクリア
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Subject Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <Link 
              key={subject.id} 
              href={`/subject/${subject.id}`}
              onClick={handleSubjectClick}
            >
              <div 
                className={`subject-card animate-bounce-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`bg-gradient-to-br ${subject.color} rounded-xl p-6 text-white mb-4`}>
                  <div className="text-6xl mb-2 text-center">
                    {subject.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-center">
                    {subject.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-center mb-4">
                  {subject.description}
                </p>
                
                {/* Subject Progress */}
                <div className="flex justify-between items-center text-sm">
                  <span className="level-badge">
                    レベル {progress.currentLevel[subject.id] ? 
                      progress.currentLevel[subject.id].split('-').pop() : '1'}
                  </span>
                  <span className="text-gray-500">
                    🔥 {progress.streaks[subject.id] || 0}日連続
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🎯 今日の目標
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>算数の問題を5問解く</span>
                <span className="text-green-600">✅</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ひらがなを3文字書く</span>
                <span className="text-yellow-600">⏳</span>
              </div>
              <div className="flex justify-between items-center">
                <span>英語を10分勉強する</span>
                <span className="text-gray-400">📝</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🏅 実績
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {progress.achievements.slice(0, 4).map((achievement, index) => (
                <div key={achievement} className="flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <span className="text-sm font-medium">実績 {index + 1}</span>
                </div>
              ))}
              {progress.achievements.length === 0 && (
                <div className="col-span-2 text-center text-gray-500">
                  まだ実績がありません<br />
                  勉強を始めて実績を獲得しよう！
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fun Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-6 py-3 shadow-lg">
            <span className="animate-sparkle text-2xl">✨</span>
            <span className="text-lg font-semibold text-gray-700">
              今日も頑張ろう！
            </span>
            <span className="animate-sparkle text-2xl" style={{ animationDelay: '0.5s' }}>
              ✨
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
