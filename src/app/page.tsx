'use client';

import { useEffect, useState } from 'react';
import { subjects } from '@/lib/subjects';
import { StorageManager } from '@/lib/storage';
import { SoundManager } from '@/lib/sound';
import { GamificationManager } from '@/lib/gamification';
import { ProgressReportManager } from '@/lib/progress-report';
import { AdvancedGamificationManager } from '@/lib/advanced-gamification';
import { AccessibilityManager } from '@/lib/accessibility';
import { UserProgress } from '@/types';
import Link from 'next/link';
import AchievementCenter from '@/components/AchievementCenter';
import AccessibilitySettingsComponent from '@/components/AccessibilitySettings';
import UserSettings from '@/components/UserSettings';
import LearningAnalyticsDashboard from '@/components/LearningAnalyticsDashboard';

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [soundManager, setSoundManager] = useState<SoundManager | null>(null);
  const [showAchievementCenter, setShowAchievementCenter] = useState(false);
  const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [showAnalyticsDashboard, setShowAnalyticsDashboard] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      const userProgress = StorageManager.getProgress();
      setProgress(userProgress);

      const sound = SoundManager.getInstance();
      await sound.init();
      setSoundManager(sound);

      // Initialize accessibility
      AccessibilityManager.initialize();
    };

    initializeApp();
  }, []);

  const handleSubjectClick = () => {
    soundManager?.playSound('click');
  };

  const handleAchievementCenterOpen = () => {
    soundManager?.playSound('click');
    setShowAchievementCenter(true);
  };

  const handleAccessibilityOpen = () => {
    soundManager?.playSound('click');
    setShowAccessibilitySettings(true);
  };

  const handleUserSettingsOpen = () => {
    soundManager?.playSound('click');
    setShowUserSettings(true);
  };

  const handleAnalyticsDashboardOpen = () => {
    soundManager?.playSound('click');
    setShowAnalyticsDashboard(true);
  };

  const currentSeasonalEvent = AdvancedGamificationManager.getCurrentSeasonalEvent();
  const seasonalBonus = AdvancedGamificationManager.getSeasonalBonus();

  const handleProgressReport = async () => {
    soundManager?.playSound('click');
    const report = ProgressReportManager.generateReport();
    
    // Show report in a modal first
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      padding: 20px;
      box-sizing: border-box;
    `;

    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 20px;
        padding: 20px;
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;
        position: relative;
      ">
        <button onclick="this.closest('.modal').remove()" style="
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 20px;
          cursor: pointer;
          z-index: 1;
        ">×</button>
        ${ProgressReportManager.generateReportHTML(report)}
        <div style="text-align: center; margin-top: 20px;">
          <button onclick="window.reportManager.downloadReport(window.currentReport)" style="
            background: #22c55e;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-size: 16px;
            cursor: pointer;
            margin-right: 10px;
          ">📥 レポートをダウンロード</button>
          <button onclick="this.closest('.modal').remove()" style="
            background: #6b7280;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-size: 16px;
            cursor: pointer;
          ">閉じる</button>
        </div>
      </div>
    `;

    modal.className = 'modal';
    
    // Store report for download
    (window as any).currentReport = report;
    (window as any).reportManager = ProgressReportManager;

    document.body.appendChild(modal);

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
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
        <main id="main-content">
        {/* Seasonal Event Banner */}
        {currentSeasonalEvent && (
          <div className={`bg-gradient-to-r ${currentSeasonalEvent.color} text-white rounded-2xl p-4 mb-6 shadow-lg animate-bounce-in`}>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">{currentSeasonalEvent.emoji}</span>
              <div className="text-center">
                <div className="font-bold text-lg">{currentSeasonalEvent.name} 開催中！</div>
                <div className="text-sm opacity-90">
                  ×{seasonalBonus} ポイントボーナス中！ {currentSeasonalEvent.description}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="text-center mb-8 relative">
          {/* Accessibility Button */}
          <button
            onClick={handleAccessibilityOpen}
            className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
            aria-label="アクセシビリティ設定を開く"
            title="アクセシビリティ設定"
          >
            ⚙️
          </button>

          <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-bounce-in">
            🌟 がくしゅうアプリ 🌟
          </h1>
          <p className="text-lg text-gray-600">楽しく勉強しよう！</p>
          
          {/* Player Level and XP */}
          <div className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">👑</span>
                <span className="text-2xl font-bold">
                  レベル {progress.playerLevel}
                </span>
              </div>
            </div>
            
            {/* XP Progress Bar */}
            {(() => {
              const xpInfo = GamificationManager.getXPForNextLevel(progress.experiencePoints);
              const xpPercentage = (xpInfo.current / xpInfo.required) * 100;
              
              return (
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>EXP: {xpInfo.current}/{xpInfo.required}</span>
                    <span>次のレベルまで {xpInfo.required - xpInfo.current} XP</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div 
                      className="bg-white h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-1"
                      style={{ width: `${xpPercentage}%` }}
                    >
                      {xpPercentage > 20 && <span className="text-xs text-purple-600 font-bold">⚡</span>}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
          
          {/* Stats Display */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-yellow-100 rounded-xl p-3 shadow-lg">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-lg font-bold text-yellow-700">{progress.totalPoints}</div>
              <div className="text-xs text-yellow-600">ポイント</div>
            </div>
            <div className="bg-purple-100 rounded-xl p-3 shadow-lg">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-lg font-bold text-purple-700">{progress.completedLevels.length}</div>
              <div className="text-xs text-purple-600">クリア</div>
            </div>
            <div className="bg-blue-100 rounded-xl p-3 shadow-lg">
              <div className="text-2xl mb-1">🎖️</div>
              <div className="text-lg font-bold text-blue-700">{progress.badges.length}</div>
              <div className="text-xs text-blue-600">バッジ</div>
            </div>
            <div className="bg-green-100 rounded-xl p-3 shadow-lg">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-lg font-bold text-green-700">
                {Math.max(...Object.values(progress.streaks), 0)}
              </div>
              <div className="text-xs text-green-600">最高連続</div>
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

        {/* Daily Goals and Badges */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🎯 今日の目標
            </h3>
            <div className="space-y-3">
              {progress.dailyGoals.map((goal) => {
                const progressPercent = Math.min((goal.current / goal.target) * 100, 100);
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{goal.emoji}</span>
                        <span className="text-sm font-medium">{goal.description}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">
                          {goal.current}/{goal.target}
                        </span>
                        {goal.completed ? (
                          <span className="text-green-600 text-lg">✅</span>
                        ) : (
                          <span className="text-orange-500 text-lg">⏳</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          goal.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    {goal.completed && (
                      <div className="text-xs text-green-600 font-medium">
                        🎉 +{goal.reward} ポイント獲得！
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🎖️ 最近のバッジ
            </h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {progress.badges.length > 0 ? (
                progress.badges.slice(-6).reverse().map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <span className="text-2xl">{badge.emoji}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-gray-800">{badge.name}</div>
                      <div className="text-xs text-gray-600">{badge.description}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                      badge.type === 'gold' ? 'bg-yellow-200 text-yellow-800' :
                      badge.type === 'silver' ? 'bg-gray-200 text-gray-800' :
                      badge.type === 'special' ? 'bg-purple-200 text-purple-800' :
                      'bg-orange-200 text-orange-800'
                    }`}>
                      {badge.type.toUpperCase()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-2">🏆</div>
                  <div className="text-sm">まだバッジがありません</div>
                  <div className="text-xs">勉強を始めてバッジを獲得しよう！</div>
                </div>
              )}
            </div>
            
            {progress.badges.length > 6 && (
              <div className="mt-3 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  すべてのバッジを見る →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleAchievementCenterOpen}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <span className="text-2xl">🏆</span>
            <div className="text-left">
              <div className="text-lg">アチーブメント</div>
              <div className="text-sm opacity-90">称号・ランキング・チャレンジ</div>
            </div>
          </button>
          
          <button
            onClick={handleProgressReport}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <span className="text-2xl">📊</span>
            <div className="text-left">
              <div className="text-lg">学習レポート</div>
              <div className="text-sm opacity-90">保護者向け進捗報告書</div>
            </div>
          </button>

          <button
            onClick={handleUserSettingsOpen}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <span className="text-2xl">⚙️</span>
            <div className="text-left">
              <div className="text-lg">設定</div>
              <div className="text-sm opacity-90">音声・ミュート・表示設定</div>
            </div>
          </button>

          <button
            onClick={handleAnalyticsDashboardOpen}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <span className="text-2xl">📈</span>
            <div className="text-left">
              <div className="text-lg">学習分析</div>
              <div className="text-sm opacity-90">詳細な成績・傾向分析</div>
            </div>
          </button>
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
        </main>
      </div>

      {/* Achievement Center Modal */}
      {showAchievementCenter && (
        <AchievementCenter onClose={() => setShowAchievementCenter(false)} />
      )}

      {/* Accessibility Settings Modal */}
      {showAccessibilitySettings && (
        <AccessibilitySettingsComponent onClose={() => setShowAccessibilitySettings(false)} />
      )}

      {/* User Settings Modal */}
      {showUserSettings && (
        <UserSettings isOpen={showUserSettings} onClose={() => setShowUserSettings(false)} />
      )}

      {/* Learning Analytics Dashboard */}
      {showAnalyticsDashboard && (
        <LearningAnalyticsDashboard onClose={() => setShowAnalyticsDashboard(false)} />
      )}
    </div>
  );
}
