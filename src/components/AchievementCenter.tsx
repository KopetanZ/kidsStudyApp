'use client';

import { useState, useEffect } from 'react';
import { StorageManager } from '@/lib/storage';
import { AdvancedGamificationManager, AchievementChain, LeaderboardEntry } from '@/lib/advanced-gamification';
import { UserProgress } from '@/types';
import { Trophy, Star, Target, Calendar, Users, Flame, Crown, Award, Brain } from 'lucide-react';
import SkillAssessmentView from './SkillAssessmentView';

interface AchievementCenterProps {
  onClose: () => void;
}

export default function AchievementCenter({ onClose }: AchievementCenterProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard' | 'seasonal' | 'challenges' | 'skills'>('achievements');
  const [achievementChains, setAchievementChains] = useState<AchievementChain[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number>(0);

  useEffect(() => {
    const userProgress = StorageManager.getProgress();
    setProgress(userProgress);
    
    const chains = AdvancedGamificationManager.getAchievementChains();
    setAchievementChains(chains);

    // Generate leaderboard
    const userEntry = AdvancedGamificationManager.createLeaderboardEntry(userProgress);
    const mockLeaderboard = AdvancedGamificationManager.generateMockLeaderboard(userEntry);
    setLeaderboard(mockLeaderboard);
    
    const rank = mockLeaderboard.findIndex(entry => entry.id === userEntry.id) + 1;
    setUserRank(rank);
  }, []);

  const currentEvent = AdvancedGamificationManager.getCurrentSeasonalEvent();
  const dailyChallenge = AdvancedGamificationManager.generateDailyChallenge();
  
  if (!progress) {
    return <div>Loading...</div>;
  }

  const achievementStats = AdvancedGamificationManager.getAchievementStats(progress);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl h-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Trophy size={32} />
              アチーブメントセンター
            </h1>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{progress.playerLevel}</div>
              <div className="text-sm opacity-90">レベル</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{progress.badges.length}</div>
              <div className="text-sm opacity-90">バッジ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{achievementStats.completedAchievements}</div>
              <div className="text-sm opacity-90">達成</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">#{userRank}</div>
              <div className="text-sm opacity-90">ランク</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'achievements', label: '称号', icon: Award },
              { id: 'leaderboard', label: 'ランキング', icon: Users },
              { id: 'seasonal', label: 'イベント', icon: Calendar },
              { id: 'challenges', label: 'チャレンジ', icon: Target },
              { id: 'skills', label: 'スキル分析', icon: Brain }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-500 text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100% - 200px)' }}>
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">進捗概要</h3>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{achievementStats.completionRate}%</div>
                    <div className="text-sm text-gray-600">達成率</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-2">
                      {achievementStats.completedAchievements} / {achievementStats.totalAchievements} 達成
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${achievementStats.completionRate}%` }}
                      />
                    </div>
                    {achievementStats.nextMilestone && (
                      <div className="text-sm text-gray-600 mt-2">
                        次の目標: {achievementStats.nextMilestone}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Achievement Chains */}
              <div className="space-y-4">
                {achievementChains.map(chain => (
                  <div key={chain.id} className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{chain.emoji}</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{chain.name}</h4>
                        <p className="text-gray-600 text-sm">{chain.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      {chain.stages.map((stage, index) => (
                        <div
                          key={stage.id}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                            stage.completed 
                              ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                              : stage.unlocked
                              ? 'bg-white border-2 border-gray-200 hover:border-purple-300'
                              : 'bg-gray-100 text-gray-500 opacity-60'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            stage.completed ? 'bg-green-500 text-white' : 
                            stage.unlocked ? 'bg-purple-500 text-white' : 'bg-gray-400 text-white'
                          }`}>
                            {stage.completed ? '✓' : index + 1}
                          </div>
                          
                          <div className="flex-1">
                            <div className="font-semibold">{stage.name}</div>
                            <div className="text-sm opacity-80">
                              {stage.requirement}問達成で +{stage.reward}pt
                            </div>
                          </div>
                          
                          {stage.badge && (
                            <div className="text-2xl">{stage.badge.emoji}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all bg-white border border-gray-200 hover:shadow-md"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    index === 0 ? 'bg-yellow-400 text-white' :
                    index === 1 ? 'bg-gray-300 text-white' :
                    index === 2 ? 'bg-orange-400 text-white' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {index < 3 ? <Crown size={20} /> : index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-bold text-lg">{entry.name}</div>
                    <div className="text-sm text-gray-600">
                      レベル {entry.level} • {entry.badges} バッジ
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-xl text-purple-600">
                      {entry.totalPoints}pt
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Flame size={14} />
                      {entry.streak}日連続
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'seasonal' && (
            <div className="space-y-6">
              {currentEvent ? (
                <div className={`bg-gradient-to-r ${currentEvent.color} text-white rounded-2xl p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{currentEvent.emoji}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{currentEvent.name}</h3>
                      <p className="opacity-90">{currentEvent.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 rounded-xl p-4 mb-4">
                    <div className="text-lg font-semibold mb-2">特別ボーナス</div>
                    <div className="text-3xl font-bold">
                      ×{currentEvent.bonusMultiplier} ポイント倍率！
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {currentEvent.specialBadges.map(badge => (
                      <div key={badge.id} className="bg-white/20 rounded-xl p-4 text-center">
                        <div className="text-3xl mb-2">{badge.emoji}</div>
                        <div className="font-semibold">{badge.name}</div>
                        <div className="text-sm opacity-80">{badge.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-bold text-gray-600 mb-2">現在イベントはありません</h3>
                  <p className="text-gray-500">次のイベントをお楽しみに！</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{dailyChallenge.emoji}</span>
                  <div>
                    <h3 className="text-2xl font-bold">今日のチャレンジ</h3>
                    <p className="opacity-90">{dailyChallenge.name}</p>
                  </div>
                </div>
                
                <div className="bg-white/20 rounded-xl p-4 mb-4">
                  <div className="font-semibold mb-2">{dailyChallenge.description}</div>
                  <div className="flex justify-between items-center">
                    <span>目標: {dailyChallenge.target}問</span>
                    <span className="font-bold">報酬: {dailyChallenge.reward}pt</span>
                  </div>
                </div>
                
                <div className="text-sm opacity-80">
                  ⏰ 残り時間: {Math.ceil((dailyChallenge.timeLimit.getTime() - Date.now()) / (1000 * 60 * 60))}時間
                </div>
              </div>

              {/* Weekly Challenges */}
              <div className="grid gap-4">
                <h4 className="text-xl font-bold text-gray-800">週間チャレンジ</h4>
                
                {[
                  {
                    name: '算数マラソン',
                    description: '今週中に算数問題を50問解く',
                    progress: 23,
                    target: 50,
                    reward: 300,
                    emoji: '🏃‍♂️'
                  },
                  {
                    name: '完璧な一週間',
                    description: '7日間連続で学習する',
                    progress: 4,
                    target: 7,
                    reward: 500,
                    emoji: '⭐'
                  },
                  {
                    name: '時計マスター',
                    description: '時計問題で95%以上の正解率を維持',
                    progress: 87,
                    target: 95,
                    reward: 200,
                    emoji: '🕐'
                  }
                ].map((challenge, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{challenge.emoji}</span>
                      <div className="flex-1">
                        <h5 className="font-bold">{challenge.name}</h5>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600">+{challenge.reward}pt</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>進捗: {challenge.progress}/{challenge.target}</span>
                        <span>{Math.round((challenge.progress / challenge.target) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-400 to-indigo-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <SkillAssessmentView progress={progress} />
          )}
        </div>
      </div>
    </div>
  );
}