'use client';

import { useState, useEffect } from 'react';
import { AdaptiveLearningEngine, LearningProfile, AdaptiveRecommendation } from '@/lib/adaptive-learning-engine';
import { StorageManager } from '@/lib/storage';
import { UserProgress } from '@/types';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Target, 
  Lightbulb,
  User,
  BarChart3,
  Settings,
  Coffee,
  Zap,
  Heart,
  BookOpen
} from 'lucide-react';

interface AdaptiveLearningDashboardProps {
  onClose: () => void;
}

export default function AdaptiveLearningDashboard({ onClose }: AdaptiveLearningDashboardProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [profile, setProfile] = useState<LearningProfile | null>(null);
  const [recommendation, setRecommendation] = useState<AdaptiveRecommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [engine] = useState(AdaptiveLearningEngine.getInstance());

  useEffect(() => {
    const initializeAdaptiveLearning = async () => {
      setIsAnalyzing(true);
      
      try {
        const userProgress = StorageManager.getProgress();
        setProgress(userProgress);

        // ダミーのユーザーIDを生成（実際のアプリでは認証システムから取得）
        const userId = 'user-' + (localStorage.getItem('user-id') || Date.now().toString());
        localStorage.setItem('user-id', userId.replace('user-', ''));

        // 学習プロファイルを分析・生成
        const learningProfile = await engine.analyzeAndCreateProfile(userId, userProgress);
        setProfile(learningProfile);

        // 適応的推奨を生成
        const adaptiveRecommendation = await engine.generateRecommendation(userId);
        setRecommendation(adaptiveRecommendation);

      } catch (error) {
        console.error('Failed to initialize adaptive learning:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    initializeAdaptiveLearning();
  }, [engine]);

  const getLearningStyleIcon = (style: LearningProfile['learningStyle']) => {
    switch (style) {
      case 'visual': return '👁️';
      case 'auditory': return '👂';
      case 'kinesthetic': return '✋';
      case 'reading': return '📖';
      case 'mixed': return '🎯';
      default: return '🎯';
    }
  };

  const getLearningStyleDescription = (style: LearningProfile['learningStyle']) => {
    switch (style) {
      case 'visual': return '図や絵で理解するのが得意';
      case 'auditory': return '音で聞いて理解するのが得意';
      case 'kinesthetic': return '実際に触って体験するのが得意';
      case 'reading': return '文字を読んで理解するのが得意';
      case 'mixed': return 'いろいろな方法で学習';
      default: return 'バランス良く学習';
    }
  };

  const getMotivationColor = (level: LearningProfile['motivationLevel']) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-blue-600 bg-blue-100';
      case 'low': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSpeedColor = (speed: LearningProfile['learningSpeed']) => {
    switch (speed) {
      case 'fast': return 'text-purple-600 bg-purple-100';
      case 'average': return 'text-blue-600 bg-blue-100';
      case 'slow': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isAnalyzing || !profile || !recommendation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md">
          <Brain className="mx-auto mb-4 text-purple-600 animate-pulse" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">学習分析中...</h2>
          <p className="text-gray-600">あなたの学習パターンを分析しています</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="text-purple-600" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">AI学習アシスタント</h2>
                <p className="text-gray-600">あなた専用の学習プランを提案します</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 学習プロファイル */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              <User className="text-purple-600" size={24} />
              あなたの学習プロファイル
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">{getLearningStyleIcon(profile.learningStyle)}</div>
                <div className="font-bold text-gray-800">学習スタイル</div>
                <div className="text-sm text-gray-600 mt-1">
                  {getLearningStyleDescription(profile.learningStyle)}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">⏱️</div>
                <div className="font-bold text-gray-800">集中時間</div>
                <div className="text-2xl font-bold text-blue-600">{profile.attentionSpan}分</div>
                <div className="text-sm text-gray-600">最適な学習時間</div>
              </div>

              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">⚡</div>
                <div className="font-bold text-gray-800">学習ペース</div>
                <div className={`text-lg font-bold rounded-lg px-3 py-1 ${getSpeedColor(profile.learningSpeed)}`}>
                  {profile.learningSpeed === 'fast' ? '速い' : 
                   profile.learningSpeed === 'slow' ? 'ゆっくり' : '普通'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white rounded-lg p-4">
                <div className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="text-green-600" size={20} />
                  得意分野
                </div>
                <div className="space-y-1">
                  {profile.strongAreas.map((area, index) => (
                    <div key={index} className="bg-green-100 text-green-800 rounded-lg px-3 py-1 text-sm font-medium">
                      {area === 'math' ? '算数' : 
                       area === 'japanese' ? '国語' : 
                       area === 'english' ? '英語' : area}
                    </div>
                  ))}
                  {profile.strongAreas.length === 0 && (
                    <div className="text-gray-500 text-sm">データ収集中...</div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Target className="text-orange-600" size={20} />
                  重点強化分野
                </div>
                <div className="space-y-1">
                  {profile.weakAreas.map((area, index) => (
                    <div key={index} className="bg-orange-100 text-orange-800 rounded-lg px-3 py-1 text-sm font-medium">
                      {area === 'math' ? '算数' : 
                       area === 'japanese' ? '国語' : 
                       area === 'english' ? '英語' : area}
                    </div>
                  ))}
                  {profile.weakAreas.length === 0 && (
                    <div className="text-gray-500 text-sm">バランス良く学習中</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AI推奨プラン */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Lightbulb className="text-blue-600" size={24} />
              今日のAI推奨プラン
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="text-blue-600" size={20} />
                  おすすめの学習内容
                </h4>
                <div className="space-y-2">
                  {recommendation.nextTopics.map((topic, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-blue-200">
                      <div className="font-medium text-blue-800">
                        {topic === 'math' ? '🔢 算数' : 
                         topic === 'japanese' ? '🇯🇵 国語' : 
                         topic === 'english' ? '🇺🇸 英語' : 
                         topic === 'time' ? '🕐 時計' : 
                         topic === 'shape' ? '🔺 図形' : 
                         topic === 'money' ? '💰 おかね' : topic}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        難易度レベル {recommendation.suggestedDifficulty}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Settings className="text-blue-600" size={20} />
                  学習設定
                </h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="text-blue-600" size={16} />
                      <span className="font-medium text-gray-800">推奨学習時間</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {recommendation.recommendedStudyTime}分
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="text-blue-600" size={16} />
                      <span className="font-medium text-gray-800">難易度レベル</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {recommendation.suggestedDifficulty}/10
                    </div>
                  </div>

                  {recommendation.breakRecommended && (
                    <div className="bg-yellow-100 rounded-lg p-3 border border-yellow-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Coffee className="text-yellow-600" size={16} />
                        <span className="font-medium text-yellow-800">休憩推奨</span>
                      </div>
                      <div className="text-sm text-yellow-700">
                        少し休憩を取ってから始めましょう
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* モチベーションメッセージ */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <Heart className="text-green-600" size={24} />
              今日の応援メッセージ
            </h3>
            
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="text-lg text-green-800 font-medium text-center">
                "{recommendation.motivationalMessage}"
              </div>
            </div>

            <div className={`mt-4 rounded-lg p-3 ${getMotivationColor(profile.motivationLevel)}`}>
              <div className="text-center">
                <div className="font-bold">現在のやる気レベル</div>
                <div className="text-2xl font-bold mt-1">
                  {profile.motivationLevel === 'high' ? '🔥 高い' : 
                   profile.motivationLevel === 'medium' ? '😊 普通' : 
                   '💪 成長中'}
                </div>
              </div>
            </div>
          </div>

          {/* 保護者向けガイダンス */}
          {recommendation.parentalGuidance && (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                <User className="text-orange-600" size={24} />
                保護者の方へのアドバイス
              </h3>
              
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="text-orange-800">
                  {recommendation.parentalGuidance}
                </div>
              </div>
            </div>
          )}

          {/* プロファイル更新情報 */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="text-center text-sm text-gray-600">
              <BarChart3 className="inline mr-2" size={16} />
              最終分析日時: {profile.lastUpdated.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div className="text-center text-xs text-gray-500 mt-1">
              学習を続けることで、より正確な分析とアドバイスを提供できます
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-8 rounded-xl transition-colors"
            >
              閉じる
            </button>
            <button
              onClick={() => {
                // 推奨プランに基づいて学習を開始
                onClose();
                // 実際の実装では、推奨されたトピックの最初のレベルに遷移
              }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105"
            >
              <Zap className="inline mr-2" size={20} />
              推奨プランで学習開始！
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}