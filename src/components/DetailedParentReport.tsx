'use client';

import { useState, useEffect } from 'react';
import { ProgressReportManager, ProgressReport } from '@/lib/progress-report';
import { AdaptiveLearningEngine } from '@/lib/adaptive-learning-engine';
import { StorageManager } from '@/lib/storage';
import { UserProgress } from '@/types';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Clock, 
  Target, 
  Brain,
  Calendar,
  BarChart3,
  Star,
  AlertCircle,
  CheckCircle,
  Mail,
  Printer
} from 'lucide-react';

interface DetailedParentReportProps {
  onClose: () => void;
}

interface DetailedReportData extends ProgressReport {
  learningProfile?: any;
  weeklyTrends: {
    week: string;
    questionsAnswered: number;
    correctRate: number;
    timeSpent: number;
  }[];
  skillAnalysis: {
    subject: string;
    currentLevel: number;
    strengths: string[];
    challenges: string[];
    nextGoals: string[];
  }[];
  behaviorInsights: {
    bestStudyTime: string;
    averageSessionLength: number;
    concentrationSpan: number;
    motivationTrends: 'increasing' | 'stable' | 'decreasing';
  };
  parentalTips: {
    category: string;
    tip: string;
    importance: 'high' | 'medium' | 'low';
  }[];
}

export default function DetailedParentReport({ onClose }: DetailedParentReportProps) {
  const [report, setReport] = useState<DetailedReportData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [studentName, setStudentName] = useState('お子様');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('month');

  useEffect(() => {
    generateDetailedReport();
  }, [selectedTimeframe]);

  const generateDetailedReport = async () => {
    setIsGenerating(true);
    
    try {
      const progress = StorageManager.getProgress();
      const basicReport = ProgressReportManager.generateReport(studentName);
      
      // Get adaptive learning insights
      const adaptiveEngine = AdaptiveLearningEngine.getInstance();
      const userId = 'user-' + (localStorage.getItem('user-id') || Date.now().toString());
      const learningProfile = adaptiveEngine.getProfile(userId);
      
      // Generate enhanced report data
      const detailedReport: DetailedReportData = {
        ...basicReport,
        learningProfile,
        weeklyTrends: generateWeeklyTrends(progress),
        skillAnalysis: generateSkillAnalysis(progress),
        behaviorInsights: generateBehaviorInsights(progress, learningProfile),
        parentalTips: generateParentalTips(progress, learningProfile)
      };
      
      setReport(detailedReport);
    } catch (error) {
      console.error('Failed to generate detailed report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWeeklyTrends = (progress: UserProgress) => {
    // Simulate weekly data - in real app, this would come from stored session data
    const weeks = [];
    const currentDate = new Date();
    
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - (i * 7));
      
      weeks.push({
        week: `${weekStart.getMonth() + 1}月${weekStart.getDate()}日週`,
        questionsAnswered: Math.floor(progress.totalPoints / 10) + (i * 5),
        correctRate: Math.min(95, 70 + (i * 5) + Math.random() * 10),
        timeSpent: 45 + (i * 15) + Math.random() * 30
      });
    }
    
    return weeks;
  };

  const generateSkillAnalysis = (progress: UserProgress) => {
    const subjects = ['math', 'japanese', 'english', 'time', 'shape'];
    
    return subjects.map(subject => {
      const completedLevels = progress.completedLevels.filter(level => 
        level.startsWith(subject)
      ).length;
      
      return {
        subject: subject === 'math' ? '算数' : 
                subject === 'japanese' ? '国語' :
                subject === 'english' ? '英語' :
                subject === 'time' ? '時計' : '図形',
        currentLevel: completedLevels,
        strengths: getSubjectStrengths(subject, progress),
        challenges: getSubjectChallenges(subject, progress),
        nextGoals: getSubjectGoals(subject, completedLevels)
      };
    });
  };

  const getSubjectStrengths = (subject: string, progress: UserProgress): string[] => {
    const strengths = [];
    const completed = progress.completedLevels.filter(l => l.startsWith(subject)).length;
    
    if (completed >= 5) strengths.push('基礎がしっかり身についています');
    if (progress.streaks[subject] >= 3) strengths.push('継続的な学習ができています');
    if (progress.badges.some(b => b.category === subject)) strengths.push('優秀な成績を収めています');
    
    return strengths.length > 0 ? strengths : ['着実に進歩しています'];
  };

  const getSubjectChallenges = (subject: string, progress: UserProgress): string[] => {
    const challenges = [];
    const completed = progress.completedLevels.filter(l => l.startsWith(subject)).length;
    
    if (completed < 3) challenges.push('もう少し練習時間を増やしましょう');
    if (progress.streaks[subject] < 2) challenges.push('継続的な学習を心がけましょう');
    
    return challenges.length > 0 ? challenges : ['順調に進んでいます'];
  };

  const getSubjectGoals = (subject: string, currentLevel: number): string[] => {
    const goals = [];
    
    if (currentLevel < 5) {
      goals.push('基礎レベルの完全習得');
    } else if (currentLevel < 10) {
      goals.push('応用問題への挑戦');
    } else {
      goals.push('上級レベルでの実力向上');
    }
    
    goals.push('毎日少しずつでも継続学習');
    
    return goals;
  };

  const generateBehaviorInsights = (progress: UserProgress, learningProfile: any) => {
    const trends = progress.playerLevel >= 3 ? 'increasing' : 
                   progress.totalPoints > 200 ? 'stable' : 'increasing';
    
    return {
      bestStudyTime: learningProfile?.attentionSpan > 20 ? '夕方' : '午前中',
      averageSessionLength: learningProfile?.attentionSpan || 15,
      concentrationSpan: learningProfile?.attentionSpan || 15,
      motivationTrends: trends as 'increasing' | 'stable' | 'decreasing'
    };
  };

  const generateParentalTips = (progress: UserProgress, learningProfile: any) => {
    const tips = [];
    
    // Learning style based tips
    if (learningProfile?.learningStyle === 'visual') {
      tips.push({
        category: '学習スタイル',
        tip: 'お子様は視覚的な学習が得意です。図や絵を使って説明すると理解しやすくなります。',
        importance: 'high' as const
      });
    }
    
    if (learningProfile?.motivationLevel === 'low') {
      tips.push({
        category: 'モチベーション',
        tip: '小さな目標を設定して、達成したときは一緒に喜んであげましょう。',
        importance: 'high' as const
      });
    }
    
    // General tips
    tips.push(
      {
        category: '継続学習',
        tip: '毎日決まった時間に学習する習慣をつけると効果的です。',
        importance: 'medium' as const
      },
      {
        category: '褒め方',
        tip: '結果だけでなく、努力した過程も褒めてあげましょう。',
        importance: 'medium' as const
      },
      {
        category: '休憩',
        tip: '集中力が続く時間には個人差があります。適度な休憩を取りましょう。',
        importance: 'low' as const
      }
    );
    
    return tips;
  };

  const exportReport = async () => {
    if (!report) return;
    
    try {
      // Generate comprehensive HTML report
      const htmlReport = generateComprehensiveHTML(report);
      
      const blob = new Blob([htmlReport], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `detailed-report-${report.studentName}-${new Date().toISOString().split('T')[0]}.html`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const generateComprehensiveHTML = (report: DetailedReportData): string => {
    return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>詳細学習レポート - ${report.studentName}</title>
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 20px; background: #f8fafc; color: #333; }
        .container { max-width: 900px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .section { padding: 25px; border-bottom: 1px solid #e5e7eb; }
        .section:last-child { border-bottom: none; }
        .section h2 { color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .card { background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .trend-chart { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .tip { background: #fef3c7; border: 1px solid #fbbf24; padding: 15px; border-radius: 8px; margin: 10px 0; }
        .tip.high { background: #fee2e2; border-color: #ef4444; }
        .tip.medium { background: #ddd6fe; border-color: #8b5cf6; }
        ul { padding-left: 20px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        @media print { body { background: white; } .container { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 詳細学習レポート</h1>
            <p>${report.studentName}さんの総合学習分析</p>
            <p>作成日: ${report.reportDate.toLocaleDateString('ja-JP')}</p>
        </div>

        <div class="section">
            <h2>🎯 学習概要</h2>
            <div class="grid">
                <div class="card">
                    <h3>総問題数</h3>
                    <p style="font-size: 24px; font-weight: bold; color: #3b82f6;">${report.totalQuestions}</p>
                </div>
                <div class="card">
                    <h3>正解率</h3>
                    <p style="font-size: 24px; font-weight: bold; color: #10b981;">${report.overallAccuracy}%</p>
                </div>
                <div class="card">
                    <h3>学習時間</h3>
                    <p style="font-size: 24px; font-weight: bold; color: #f59e0b;">${report.totalStudyTime}分</p>
                </div>
                <div class="card">
                    <h3>連続記録</h3>
                    <p style="font-size: 24px; font-weight: bold; color: #ef4444;">${report.streakRecord}日</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>📈 週別学習トレンド</h2>
            ${report.weeklyTrends.map(week => `
                <div class="trend-chart">
                    <h4>${week.week}</h4>
                    <p>問題数: ${week.questionsAnswered}問 | 正解率: ${Math.round(week.correctRate)}% | 学習時間: ${Math.round(week.timeSpent)}分</p>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>📚 科目別詳細分析</h2>
            ${report.skillAnalysis.map(skill => `
                <div class="card" style="margin-bottom: 15px;">
                    <h3>${skill.subject} (レベル ${skill.currentLevel})</h3>
                    <div style="margin: 10px 0;">
                        <h4 style="color: #10b981;">💪 得意な点</h4>
                        <ul>${skill.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
                    </div>
                    <div style="margin: 10px 0;">
                        <h4 style="color: #f59e0b;">📝 改善点</h4>
                        <ul>${skill.challenges.map(c => `<li>${c}</li>`).join('')}</ul>
                    </div>
                    <div style="margin: 10px 0;">
                        <h4 style="color: #3b82f6;">🎯 次の目標</h4>
                        <ul>${skill.nextGoals.map(g => `<li>${g}</li>`).join('')}</ul>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>🧠 学習行動分析</h2>
            <div class="grid">
                <div class="card">
                    <h4>最適学習時間</h4>
                    <p>${report.behaviorInsights.bestStudyTime}</p>
                </div>
                <div class="card">
                    <h4>平均セッション</h4>
                    <p>${report.behaviorInsights.averageSessionLength}分</p>
                </div>
                <div class="card">
                    <h4>集中持続時間</h4>
                    <p>${report.behaviorInsights.concentrationSpan}分</p>
                </div>
                <div class="card">
                    <h4>モチベーション</h4>
                    <p>${report.behaviorInsights.motivationTrends === 'increasing' ? '上昇中 📈' : 
                       report.behaviorInsights.motivationTrends === 'stable' ? '安定 📊' : '要注意 📉'}</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>👨‍👩‍👧‍👦 保護者様へのアドバイス</h2>
            ${report.parentalTips.map(tip => `
                <div class="tip ${tip.importance}">
                    <h4>${tip.category}</h4>
                    <p>${tip.tip}</p>
                </div>
            `).join('')}
        </div>

        <div class="footer">
            <p>このレポートは小学生学習アプリの AI分析システムによって生成されました</p>
            <p>継続的な学習をサポートしています 📚✨</p>
        </div>
    </div>
</body>
</html>`;
  };

  if (isGenerating || !report) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md">
          <BarChart3 className="mx-auto mb-4 text-blue-600 animate-pulse" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">レポート生成中...</h2>
          <p className="text-gray-600">詳細な学習分析を作成しています</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={32} />
              <div>
                <h2 className="text-2xl font-bold">詳細学習レポート</h2>
                <p className="opacity-90">{report.studentName}さんの総合分析</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className="bg-white/20 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="week">1週間</option>
                <option value="month">1ヶ月</option>
                <option value="all">全期間</option>
              </select>
              <button
                onClick={exportReport}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
                title="レポートをエクスポート"
              >
                <Download size={20} />
              </button>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors text-xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center border-2 border-blue-200">
              <div className="text-3xl text-blue-600 mb-2">📚</div>
              <div className="text-2xl font-bold text-blue-800">{report.totalQuestions}</div>
              <div className="text-sm text-blue-600">総問題数</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center border-2 border-green-200">
              <div className="text-3xl text-green-600 mb-2">✅</div>
              <div className="text-2xl font-bold text-green-800">{report.overallAccuracy}%</div>
              <div className="text-sm text-green-600">正解率</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center border-2 border-orange-200">
              <div className="text-3xl text-orange-600 mb-2">⏱️</div>
              <div className="text-2xl font-bold text-orange-800">{report.totalStudyTime}分</div>
              <div className="text-sm text-orange-600">学習時間</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center border-2 border-red-200">
              <div className="text-3xl text-red-600 mb-2">🔥</div>
              <div className="text-2xl font-bold text-red-800">{report.streakRecord}</div>
              <div className="text-sm text-red-600">最長連続日数</div>
            </div>
          </div>

          {/* Weekly Trends */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={24} />
              週別学習トレンド
            </h3>
            <div className="space-y-3">
              {report.weeklyTrends.map((week, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-800">{week.week}</h4>
                    <div className="text-sm text-gray-600">
                      正解率: {Math.round(week.correctRate)}%
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>問題数: {week.questionsAnswered}問</span>
                    <span>学習時間: {Math.round(week.timeSpent)}分</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Analysis */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="text-green-600" size={24} />
              科目別詳細分析
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.skillAnalysis.map((skill, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-3">
                    {skill.subject} (レベル {skill.currentLevel})
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium text-green-700 mb-1 flex items-center gap-1">
                        <CheckCircle size={16} />
                        得意な点
                      </h5>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {skill.strengths.map((strength, i) => (
                          <li key={i}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-orange-700 mb-1 flex items-center gap-1">
                        <AlertCircle size={16} />
                        改善点
                      </h5>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {skill.challenges.map((challenge, i) => (
                          <li key={i}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-blue-700 mb-1 flex items-center gap-1">
                        <Star size={16} />
                        次の目標
                      </h5>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {skill.nextGoals.map((goal, i) => (
                          <li key={i}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavior Insights */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Brain className="text-purple-600" size={24} />
              学習行動分析
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🌅</div>
                <div className="font-medium text-gray-800">最適学習時間</div>
                <div className="text-sm text-gray-600">{report.behaviorInsights.bestStudyTime}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⏰</div>
                <div className="font-medium text-gray-800">平均セッション</div>
                <div className="text-sm text-gray-600">{report.behaviorInsights.averageSessionLength}分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🧘</div>
                <div className="font-medium text-gray-800">集中持続時間</div>
                <div className="text-sm text-gray-600">{report.behaviorInsights.concentrationSpan}分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">
                  {report.behaviorInsights.motivationTrends === 'increasing' ? '📈' : 
                   report.behaviorInsights.motivationTrends === 'stable' ? '📊' : '📉'}
                </div>
                <div className="font-medium text-gray-800">モチベーション</div>
                <div className="text-sm text-gray-600">
                  {report.behaviorInsights.motivationTrends === 'increasing' ? '上昇中' : 
                   report.behaviorInsights.motivationTrends === 'stable' ? '安定' : '要注意'}
                </div>
              </div>
            </div>
          </div>

          {/* Parental Tips */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="text-indigo-600" size={24} />
              保護者様へのアドバイス
            </h3>
            <div className="space-y-3">
              {report.parentalTips.map((tip, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-l-4 ${
                    tip.importance === 'high' ? 'bg-red-50 border-red-500' :
                    tip.importance === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-blue-50 border-blue-500'
                  }`}
                >
                  <h4 className="font-medium text-gray-800 mb-1">{tip.category}</h4>
                  <p className="text-sm text-gray-600">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={exportReport}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Download size={20} />
              レポートをエクスポート
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2"
            >
              <Printer size={20} />
              印刷
            </button>
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}