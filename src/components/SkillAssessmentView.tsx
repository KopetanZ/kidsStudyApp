'use client';

import { useState, useEffect } from 'react';
import { SkillAssessmentManager, SkillAssessment, LearningAnalytics } from '@/lib/skill-assessment';
import { StorageManager } from '@/lib/storage';
import { UserProgress } from '@/types';
import { Brain, TrendingUp, Target, Clock, Book, Star, ChevronRight } from 'lucide-react';

interface SkillAssessmentViewProps {
  progress: UserProgress;
}

export default function SkillAssessmentView({ progress }: SkillAssessmentViewProps) {
  const [skillReport, setSkillReport] = useState<{
    assessments: SkillAssessment[];
    analytics: LearningAnalytics;
    overallScore: number;
    recommendations: string[];
  } | null>(null);
  const [activeSubject, setActiveSubject] = useState<string>('all');

  useEffect(() => {
    const report = SkillAssessmentManager.generateSkillReport(progress);
    setSkillReport(report);
  }, [progress]);

  if (!skillReport) {
    return <div className="text-center py-8">分析中...</div>;
  }

  const { assessments, analytics, overallScore, recommendations } = skillReport;

  // Group assessments by subject
  const assessmentsBySubject = assessments.reduce((acc, assessment) => {
    if (!acc[assessment.subjectId]) {
      acc[assessment.subjectId] = [];
    }
    acc[assessment.subjectId].push(assessment);
    return acc;
  }, {} as { [key: string]: SkillAssessment[] });

  const subjects = Object.keys(assessmentsBySubject);
  const filteredAssessments = activeSubject === 'all' 
    ? assessments 
    : assessmentsBySubject[activeSubject] || [];

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return 'text-purple-600 bg-purple-100';
    if (proficiency >= 75) return 'text-green-600 bg-green-100';
    if (proficiency >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getLevelIcon = (level: string) => {
    const icons = {
      'beginner': '🌱',
      'intermediate': '🌿',
      'advanced': '🌳',
      'expert': '🏆'
    };
    return icons[level as keyof typeof icons] || '📚';
  };

  return (
    <div className="space-y-6">
      {/* Overall Analytics */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain size={32} />
          <div>
            <h3 className="text-2xl font-bold">学習能力分析</h3>
            <p className="opacity-90">あなたの学習パターンと強みを分析しました</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">{overallScore}</div>
            <div className="text-sm opacity-90">総合スコア</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-lg font-bold">{analytics.strongestSubject}</div>
            <div className="text-sm opacity-90">得意分野</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-lg font-bold">{analytics.optimalStudyTime}分</div>
            <div className="text-sm opacity-90">最適学習時間</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-lg font-bold">{analytics.learningStyle === 'visual' ? '視覚型' : 
              analytics.learningStyle === 'auditory' ? '聴覚型' : 
              analytics.learningStyle === 'kinesthetic' ? '体感型' : '総合型'}</div>
            <div className="text-sm opacity-90">学習タイプ</div>
          </div>
        </div>
      </div>

      {/* Learning Style Details */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Star className="text-yellow-500" size={24} />
          あなたの学習特性
        </h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">強み</h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {analytics.strongestSubject}が得意
              </li>
              {analytics.motivationFactors.map((factor, index) => (
                <li key={index} className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {factor}への高いモチベーション
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">改善のヒント</h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                {analytics.weakestSubject}の強化
              </li>
              <li className="flex items-center gap-2 text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                {analytics.difficultyPreference === 'gradual' ? '段階的な' : 
                 analytics.difficultyPreference === 'challenging' ? '挑戦的な' : '多様な'}学習アプローチ
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Subject Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveSubject('all')}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            activeSubject === 'all'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          すべて
        </button>
        {subjects.map(subject => (
          <button
            key={subject}
            onClick={() => setActiveSubject(subject)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeSubject === subject
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {subject === 'math' ? '算数' :
             subject === 'japanese' ? '国語' :
             subject === 'english' ? '英語' :
             subject === 'time' ? '時計' :
             subject === 'shape' ? '図形' : subject}
          </button>
        ))}
      </div>

      {/* Skill Assessments */}
      <div className="space-y-4">
        {filteredAssessments.map(assessment => (
          <div key={assessment.id} className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getLevelIcon(assessment.currentLevel)}</span>
                <div>
                  <h5 className="font-bold text-gray-800">{assessment.skillName}</h5>
                  <div className="text-sm text-gray-600">
                    {assessment.subjectId === 'math' ? '算数' :
                     assessment.subjectId === 'japanese' ? '国語' :
                     assessment.subjectId === 'english' ? '英語' :
                     assessment.subjectId === 'time' ? '時計' :
                     assessment.subjectId === 'shape' ? '図形' : assessment.subjectId}
                  </div>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${getProficiencyColor(assessment.proficiency)}`}>
                {assessment.proficiency}%
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>習熟度</span>
                  <span>{assessment.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${assessment.proficiency}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>正確性</span>
                  <span>{assessment.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${assessment.accuracy}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>安定性</span>
                  <span>{assessment.consistency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${assessment.consistency}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="font-bold text-lg">{assessment.questionsAnswered}</div>
                <div className="text-xs text-gray-600">問題数</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{assessment.correctAnswers}</div>
                <div className="text-xs text-gray-600">正解数</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{assessment.growthRate}%</div>
                <div className="text-xs text-gray-600">成長率</div>
              </div>
            </div>

            {/* Recommendations */}
            {assessment.recommendations.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h6 className="font-semibold text-blue-800 mb-2 flex items-center gap-1">
                  <Target size={16} />
                  おすすめの学習方法
                </h6>
                <ul className="space-y-1">
                  {assessment.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                      <ChevronRight size={14} className="mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overall Recommendations */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6">
        <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="text-orange-500" size={24} />
          学習アドバイス
        </h4>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}