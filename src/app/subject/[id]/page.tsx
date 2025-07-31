'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { subjects, getLevelsBySubject } from '@/lib/subjects';
import { StorageManager } from '@/lib/storage';
import { SoundManager } from '@/lib/sound';
import { LevelVisibilityManager } from '@/lib/level-visibility';
import { Subject, Level, UserProgress } from '@/types';
import Link from 'next/link';
import { ArrowLeft, Lock, Star, Trophy, Eye } from 'lucide-react';

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.id as string;
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [soundManager, setSoundManager] = useState<SoundManager | null>(null);

  useEffect(() => {
    const initializePage = async () => {
      const foundSubject = subjects.find(s => s.id === subjectId);
      if (!foundSubject) {
        router.push('/');
        return;
      }
      
      setSubject(foundSubject);
      
      const allLevels = getLevelsBySubject(subjectId);
      const visibleLevels = LevelVisibilityManager.getVisibleLevels(allLevels);
      setLevels(visibleLevels);
      
      const userProgress = StorageManager.getProgress();
      setProgress(userProgress);

      const sound = SoundManager.getInstance();
      await sound.init();
      setSoundManager(sound);
    };

    initializePage();
  }, [subjectId, router]);

  const isLevelUnlocked = (level: Level): boolean => {
    if (!progress) return false;
    return progress.totalPoints >= level.requiredPoints;
  };

  const isLevelCompleted = (levelId: string): boolean => {
    if (!progress) return false;
    return progress.completedLevels.includes(levelId);
  };

  const handleLevelClick = (levelId: string, unlocked: boolean) => {
    if (!unlocked) {
      soundManager?.playSound('incorrect');
      return;
    }
    
    soundManager?.playSound('click');
    router.push(`/level/${levelId}`);
  };

  const handleBackClick = () => {
    soundManager?.playSound('click');
    router.push('/');
  };

  if (!subject || !progress) {
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
        <header className="mb-8">
          <button
            onClick={handleBackClick}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="text-lg font-medium">戻る</span>
          </button>

          <div className={`bg-gradient-to-br ${subject.color} rounded-2xl p-8 text-white mb-6`}>
            <div className="text-center">
              <div className="text-8xl mb-4">{subject.emoji}</div>
              <h1 className="text-4xl font-bold mb-2">{subject.name}</h1>
              <p className="text-xl opacity-90">{subject.description}</p>
            </div>
          </div>

          {/* Progress Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-2 text-yellow-600">
                <Star size={24} />
                <div>
                  <div className="text-lg font-bold">{progress.totalPoints}</div>
                  <div className="text-sm text-gray-600">総ポイント</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-2 text-purple-600">
                <Trophy size={24} />
                <div>
                  <div className="text-lg font-bold">
                    {levels.filter(l => isLevelCompleted(l.id)).length}
                  </div>
                  <div className="text-sm text-gray-600">クリア済み</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-2xl">🔥</span>
                <div>
                  <div className="text-lg font-bold">{progress.streaks[subjectId] || 0}</div>
                  <div className="text-sm text-gray-600">連続日数</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, index) => {
            const unlocked = isLevelUnlocked(level);
            const completed = isLevelCompleted(level.id);
            
            return (
              <div
                key={level.id}
                className={`
                  relative bg-white/80 rounded-2xl p-6 shadow-lg transition-all duration-300
                  ${unlocked 
                    ? 'hover:shadow-xl hover:scale-105 cursor-pointer border-2 border-transparent hover:border-primary' 
                    : 'opacity-60 cursor-not-allowed'
                  }
                  ${completed ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' : ''}
                  animate-bounce-in
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleLevelClick(level.id, unlocked)}
              >
                {/* Badge - Priority: Completed > Locked > Hidden > None */}
                {completed ? (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                    <Trophy size={16} />
                  </div>
                ) : !unlocked ? (
                  <div className="absolute -top-2 -right-2 bg-gray-400 text-white rounded-full p-2 shadow-lg">
                    <Lock size={16} />
                  </div>
                ) : level.isHidden ? (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-2 shadow-lg">
                    <Eye size={16} />
                  </div>
                ) : null}

                {/* Level Content */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">
                    {completed ? '🏆' : unlocked ? '⭐' : '🔒'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {level.name}
                  </h3>
                  <p className={`text-sm ${level.isHidden ? 'text-purple-600 font-medium' : 'text-gray-600'}`}>
                    {level.isHidden && '✨ 特別チャレンジ ✨ '}
                    {level.description}
                  </p>
                </div>

                {/* Level Info */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">難易度</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < level.difficulty ? 'bg-yellow-400' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">必要ポイント</span>
                    <span className={`font-medium ${
                      progress.totalPoints >= level.requiredPoints 
                        ? 'text-green-600' 
                        : 'text-red-500'
                    }`}>
                      {level.requiredPoints}
                    </span>
                  </div>

                  {unlocked && !completed && (
                    <div className="mt-4 text-center">
                      <div className="kid-button text-sm py-2 px-4">
                        始める！
                      </div>
                    </div>
                  )}

                  {completed && (
                    <div className="mt-4 text-center">
                      <div className="bg-green-500 text-white font-bold py-2 px-4 rounded-full text-sm">
                        クリア済み！
                      </div>
                    </div>
                  )}

                  {!unlocked && (
                    <div className="mt-4 text-center">
                      <div className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full text-sm">
                        ロック中
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Encouragement */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 rounded-2xl p-8 shadow-lg">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              頑張って学習しよう！
            </h2>
            <p className="text-gray-600">
              レベルをクリアして新しいステージを解放しよう。
              毎日少しずつでも続けることが大切だよ！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}