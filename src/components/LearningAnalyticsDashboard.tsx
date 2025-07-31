'use client';

import { useState, useEffect } from 'react';
import { StorageManager } from '@/lib/storage';
import { DifficultyAnalysisManager } from '@/lib/difficulty-analysis';
import { UserProgress } from '@/types';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  Award, 
  AlertCircle,
  CheckCircle,
  Brain,
  BarChart3,
  PieChart
} from 'lucide-react';

interface AnalyticsData {
  overallAccuracy: number;
  totalQuestionsAnswered: number;
  averageTimePerQuestion: number;
  strongSubjects: string[];
  weakSubjects: string[];
  learningTrends: Array<{
    date: string;
    accuracy: number;
    questionsAnswered: number;
  }>;
  difficultyDistribution: Array<{
    level: number;
    count: number;
    accuracy: number;
  }>;
  recommendations: string[];
}

interface LearningAnalyticsDashboardProps {
  onClose: () => void;
}

export default function LearningAnalyticsDashboard({ onClose }: LearningAnalyticsDashboardProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    const loadAnalytics = () => {
      const userProgress = StorageManager.getProgress();
      setProgress(userProgress);
      
      // 分析データを生成
      const analyticsData = generateAnalytics(userProgress);
      setAnalytics(analyticsData);
    };

    loadAnalytics();
  }, [selectedPeriod]);

  const generateAnalytics = (progress: UserProgress): AnalyticsData => {
    // 実際の実装では、より詳細な学習履歴データを使用
    const mockData: AnalyticsData = {
      overallAccuracy: calculateOverallAccuracy(progress),
      totalQuestionsAnswered: progress.completedLevels.length * 12, // 概算
      averageTimePerQuestion: 25, // 概算（秒）
      strongSubjects: getStrongSubjects(progress),
      weakSubjects: getWeakSubjects(progress),
      learningTrends: generateLearningTrends(),
      difficultyDistribution: generateDifficultyDistribution(),
      recommendations: DifficultyAnalysisManager.generateLearningSupport(
        {
          correctAnswers: Math.floor(progress.totalPoints / 10),
          incorrectAnswers: Math.floor(progress.totalPoints / 30),
          commonErrors: ['九九の暗記ミス', '桁の計算ミス'],
          timeSpent: 1500,
          consecutiveCorrect: 3,
          strugglingTopics: ['multiplication', 'division']
        },
        'math'
      )
    };

    return mockData;
  };

  const calculateOverallAccuracy = (progress: UserProgress): number => {
    // 簡易計算（実際にはより詳細な履歴が必要）
    const estimatedCorrect = Math.floor(progress.totalPoints / 15);
    const estimatedTotal = estimatedCorrect + Math.floor(progress.totalPoints / 45);
    return estimatedTotal > 0 ? (estimatedCorrect / estimatedTotal) * 100 : 0;
  };

  const getStrongSubjects = (progress: UserProgress): string[] => {
    const subjects = ['算数', '国語', '英語'];
    return subjects.filter(() => Math.random() > 0.5); // モック実装
  };

  const getWeakSubjects = (progress: UserProgress): string[] => {
    const subjects = ['時計', '図形'];
    return subjects.filter(() => Math.random() > 0.7); // モック実装
  };

  const generateLearningTrends = () => {
    const trends = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      trends.push({
        date: date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
        accuracy: 60 + Math.random() * 30,
        questionsAnswered: Math.floor(10 + Math.random() * 20)
      });
    }
    
    return trends;
  };

  const generateDifficultyDistribution = () => {
    return [
      { level: 1, count: 45, accuracy: 92 },
      { level: 2, count: 38, accuracy: 85 },
      { level: 3, count: 25, accuracy: 78 },
      { level: 4, count: 12, accuracy: 65 },
      { level: 5, count: 5, accuracy: 55 }
    ];
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600 bg-green-100';
    if (accuracy >= 75) return 'text-blue-600 bg-blue-100';
    if (accuracy >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getAccuracyIcon = (accuracy: number) => {
    if (accuracy >= 90) return <TrendingUp className="text-green-600" size={20} />;
    if (accuracy >= 75) return <CheckCircle className="text-blue-600" size={20} />;
    if (accuracy >= 60) return <AlertCircle className="text-yellow-600" size={20} />;
    return <TrendingDown className="text-red-600" size={20} />;
  };

  if (!progress || !analytics) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="text-2xl text-gray-600">データを読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-purple-600" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">学習分析ダッシュボード</h2>
                <p className="text-gray-600">あなたの学習状況を詳しく見てみましょう</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* 期間選択 */}
          <div className="flex gap-2 mt-4">
            {(['week', 'month', 'all'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period === 'week' ? '1週間' : period === 'month' ? '1ヶ月' : '全期間'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 概要統計 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-purple-600" size={24} />
                <span className="font-bold text-purple-800">総合正解率</span>
              </div>
              <div className={`text-3xl font-bold rounded-lg px-3 py-1 ${getAccuracyColor(analytics.overallAccuracy)}`}>
                {analytics.overallAccuracy.toFixed(1)}%
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="text-blue-600" size={24} />
                <span className="font-bold text-blue-800">回答数</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {analytics.totalQuestionsAnswered}
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="text-green-600" size={24} />
                <span className="font-bold text-green-800">平均時間</span>
              </div>
              <div className="text-3xl font-bold text-green-600">
                {analytics.averageTimePerQuestion}秒
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-yellow-600" size={24} />
                <span className="font-bold text-yellow-800">獲得ポイント</span>
              </div>
              <div className="text-3xl font-bold text-yellow-600">
                {progress.totalPoints}
              </div>
            </div>
          </div>

          {/* 学習トレンド */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-purple-600" size={24} />
              学習トレンド
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {analytics.learningTrends.map((trend, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm text-gray-600 mb-1">{trend.date}</div>
                  <div 
                    className={`rounded-lg p-2 ${getAccuracyColor(trend.accuracy)}`}
                  >
                    <div className="font-bold">{trend.accuracy.toFixed(0)}%</div>
                    <div className="text-xs">{trend.questionsAnswered}問</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 得意・苦手分野 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={24} />
                得意分野
              </h3>
              <div className="space-y-2">
                {analytics.strongSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-800">{subject}</span>
                  </div>
                ))}
                {analytics.strongSubjects.length === 0 && (
                  <p className="text-green-600">得意分野を見つけるため、もっと学習を続けましょう！</p>
                )}
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                <AlertCircle className="text-orange-600" size={24} />
                改善が必要な分野
              </h3>
              <div className="space-y-2">
                {analytics.weakSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="font-medium text-orange-800">{subject}</span>
                  </div>
                ))}
                {analytics.weakSubjects.length === 0 && (
                  <p className="text-orange-600">素晴らしい！特に苦手な分野はありません。</p>
                )}
              </div>
            </div>
          </div>

          {/* 難易度別分析 */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PieChart className="text-purple-600" size={24} />
              難易度別成績
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {analytics.difficultyDistribution.map((diff) => (
                <div key={diff.level} className="text-center">
                  <div className="text-lg font-bold text-gray-700 mb-2">
                    レベル {diff.level}
                  </div>
                  <div className={`rounded-lg p-3 ${getAccuracyColor(diff.accuracy)}`}>
                    <div className="font-bold text-xl">{diff.accuracy}%</div>
                    <div className="text-sm">{diff.count}問回答</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 学習アドバイス */}
          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Brain className="text-blue-600" size={24} />
              個別学習アドバイス
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analytics.recommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-blue-800 font-medium">{rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 学習継続モチベーション */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              <Award className="text-purple-600" size={24} />
              あなたの学習状況
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-bold text-purple-800">レベル {progress.playerLevel}</div>
                <div className="text-sm text-purple-600">プレイヤーレベル</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="font-bold text-purple-800">{progress.badges.length}</div>
                <div className="text-sm text-purple-600">獲得バッジ数</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <div className="font-bold text-purple-800">{progress.completedLevels.length}</div>
                <div className="text-sm text-purple-600">クリア済みレベル</div>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}