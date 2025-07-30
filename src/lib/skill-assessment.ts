import { UserProgress, Question } from '@/types';
import { StorageManager } from './storage';

export interface SkillAssessment {
  id: string;
  subjectId: string;
  skillName: string;
  currentLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  proficiency: number; // 0-100
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  consistency: number; // How consistent performance is
  growthRate: number; // Rate of improvement
  lastAssessed: Date;
  recommendations: string[];
  strengthAreas: string[];
  improvementAreas: string[];
}

export interface LearningAnalytics {
  overallProficiency: number;
  strongestSubject: string;
  weakestSubject: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  optimalStudyTime: number; // minutes per session
  difficultyPreference: 'gradual' | 'challenging' | 'mixed';
  motivationFactors: string[];
  nextRecommendedLevel: string | null;
}

export class SkillAssessmentManager {
  private static skillCategories = {
    math: [
      'addition',
      'subtraction', 
      'multiplication',
      'division',
      'problem_solving',
      'number_recognition'
    ],
    japanese: [
      'hiragana_reading',
      'hiragana_writing',
      'katakana_reading',
      'katakana_writing',
      'vocabulary',
      'comprehension'
    ],
    english: [
      'alphabet_recognition',
      'vocabulary',
      'pronunciation',
      'basic_grammar',
      'listening',
      'speaking'
    ],
    time: [
      'hour_reading',
      'minute_reading',
      'time_concepts',
      'digital_analog_conversion'
    ],
    shape: [
      'shape_recognition',
      'shape_properties',
      'pattern_recognition',
      'spatial_reasoning'
    ]
  };

  static assessSkills(progress: UserProgress): SkillAssessment[] {
    const assessments: SkillAssessment[] = [];

    Object.entries(this.skillCategories).forEach(([subjectId, skills]) => {
      skills.forEach(skillName => {
        const assessment = this.assessIndividualSkill(progress, subjectId, skillName);
        assessments.push(assessment);
      });
    });

    return assessments;
  }

  private static assessIndividualSkill(
    progress: UserProgress, 
    subjectId: string, 
    skillName: string
  ): SkillAssessment {
    // Get relevant level completions
    const relevantLevels = progress.completedLevels.filter(level => 
      level.startsWith(subjectId)
    );

    // Calculate base metrics
    const questionsAnswered = this.estimateQuestionsForSkill(relevantLevels.length);
    const accuracy = this.calculateSkillAccuracy(progress, subjectId, skillName);
    const correctAnswers = Math.round(questionsAnswered * (accuracy / 100));

    // Determine proficiency level
    let proficiency = this.calculateProficiency(accuracy, questionsAnswered, progress.playerLevel);
    let currentLevel: SkillAssessment['currentLevel'] = 'beginner';

    if (proficiency >= 90) currentLevel = 'expert';
    else if (proficiency >= 75) currentLevel = 'advanced';
    else if (proficiency >= 50) currentLevel = 'intermediate';

    // Calculate consistency (how stable performance is)
    const consistency = this.calculateConsistency(progress, subjectId);

    // Calculate growth rate
    const growthRate = this.calculateGrowthRate(progress, subjectId);

    // Generate recommendations
    const recommendations = this.generateSkillRecommendations(
      subjectId, 
      skillName, 
      proficiency, 
      accuracy,
      consistency
    );

    // Identify strength and improvement areas
    const { strengthAreas, improvementAreas } = this.analyzeSkillAreas(
      subjectId,
      skillName,
      proficiency,
      accuracy
    );

    return {
      id: `${subjectId}_${skillName}`,
      subjectId,
      skillName: this.formatSkillName(skillName),
      currentLevel,
      proficiency,
      questionsAnswered,
      correctAnswers,
      accuracy,
      consistency,
      growthRate,
      lastAssessed: new Date(),
      recommendations,
      strengthAreas,
      improvementAreas
    };
  }

  private static calculateSkillAccuracy(
    progress: UserProgress, 
    subjectId: string, 
    skillName: string
  ): number {
    // Base accuracy from weekly stats, adjusted for subject performance
    let baseAccuracy = progress.weeklyStats.correctRate;
    
    // Adjust based on subject performance
    const subjectLevels = progress.completedLevels.filter(level => 
      level.startsWith(subjectId)
    ).length;
    
    // More completed levels = better accuracy for that subject
    const subjectBonus = Math.min(subjectLevels * 2, 15);
    
    // Skill-specific adjustments
    let skillModifier = 0;
    if (skillName.includes('basic') || skillName.includes('recognition')) {
      skillModifier = 5; // Basic skills tend to have higher accuracy
    } else if (skillName.includes('advanced') || skillName.includes('complex')) {
      skillModifier = -10; // Advanced skills are more challenging
    }

    return Math.max(60, Math.min(100, baseAccuracy + subjectBonus + skillModifier));
  }

  private static calculateProficiency(
    accuracy: number, 
    questionsAnswered: number, 
    playerLevel: number
  ): number {
    // Base proficiency from accuracy
    let proficiency = accuracy;

    // Adjust for experience (more questions = higher confidence in proficiency)
    const experienceMultiplier = Math.min(1 + (questionsAnswered / 100), 1.2);
    proficiency *= experienceMultiplier;

    // Player level bonus
    const levelBonus = Math.min(playerLevel * 2, 20);
    proficiency += levelBonus;

    return Math.max(0, Math.min(100, proficiency));
  }

  private static calculateConsistency(progress: UserProgress, subjectId: string): number {
    // Simulate consistency based on streaks and level completion patterns
    const subjectStreak = progress.streaks[subjectId] || 0;
    const totalLevels = progress.completedLevels.filter(level => 
      level.startsWith(subjectId)
    ).length;

    // Higher streaks = more consistency
    const streakFactor = Math.min(subjectStreak * 8, 40);
    
    // Regular completion pattern = consistency
    const completionFactor = Math.min(totalLevels * 5, 30);
    
    // Base consistency
    const baseConsistency = 60;

    return Math.min(100, baseConsistency + streakFactor + completionFactor);
  }

  private static calculateGrowthRate(progress: UserProgress, subjectId: string): number {
    // Simulate growth rate based on recent activity and level progression
    const recentBadges = progress.badges.filter(badge => 
      badge.category === subjectId && 
      (Date.now() - badge.unlockedAt.getTime()) < 7 * 24 * 60 * 60 * 1000
    );

    const playerLevel = progress.playerLevel;
    
    // Recent badges indicate growth
    const badgeGrowth = recentBadges.length * 15;
    
    // Higher player level indicates sustained growth
    const levelGrowth = Math.min(playerLevel * 3, 30);
    
    // Random variation for realism
    const variation = (Math.random() - 0.5) * 20;

    return Math.max(0, Math.min(100, 50 + badgeGrowth + levelGrowth + variation));
  }

  private static estimateQuestionsForSkill(completedLevels: number): number {
    // Estimate questions based on completed levels
    return completedLevels * 8 + Math.floor(Math.random() * 10);
  }

  private static generateSkillRecommendations(
    subjectId: string,
    skillName: string,
    proficiency: number,
    accuracy: number,
    consistency: number
  ): string[] {
    const recommendations = [];

    if (proficiency < 50) {
      recommendations.push(`${this.formatSkillName(skillName)}の基礎練習を重点的に行いましょう`);
      recommendations.push('短時間の集中学習から始めることをお勧めします');
    } else if (proficiency < 75) {
      recommendations.push(`${this.formatSkillName(skillName)}のより高度な問題に挑戦してみましょう`);
      recommendations.push('定期的な復習で知識を定着させましょう');
    } else {
      recommendations.push(`${this.formatSkillName(skillName)}の応用問題に取り組んでみましょう`);
      recommendations.push('他の分野との関連性を意識した学習が効果的です');
    }

    if (accuracy < 70) {
      recommendations.push('正確性を重視したゆっくりとした解答を心がけましょう');
    }

    if (consistency < 60) {
      recommendations.push('学習の習慣化を図り、継続的な取り組みを心がけましょう');
    }

    return recommendations;
  }

  private static analyzeSkillAreas(
    subjectId: string,
    skillName: string,
    proficiency: number,
    accuracy: number
  ): { strengthAreas: string[]; improvementAreas: string[] } {
    const strengthAreas = [];
    const improvementAreas = [];

    if (proficiency >= 80) {
      strengthAreas.push(`${this.formatSkillName(skillName)}への理解が深い`);
    }

    if (accuracy >= 85) {
      strengthAreas.push('高い正確性を維持している');
    }

    if (proficiency < 60) {
      improvementAreas.push(`${this.formatSkillName(skillName)}の基礎理解`);
    }

    if (accuracy < 70) {
      improvementAreas.push('解答の正確性');
    }

    return { strengthAreas, improvementAreas };
  }

  private static formatSkillName(skillName: string): string {
    const nameMap: { [key: string]: string } = {
      'addition': '足し算',
      'subtraction': '引き算',
      'multiplication': 'かけ算',
      'division': '割り算',
      'problem_solving': '文章問題',
      'number_recognition': '数の認識',
      'hiragana_reading': 'ひらがな読み',
      'hiragana_writing': 'ひらがな書き',
      'katakana_reading': 'カタカナ読み',
      'katakana_writing': 'カタカナ書き',
      'vocabulary': '語彙',
      'comprehension': '読解',
      'alphabet_recognition': 'アルファベット認識',
      'pronunciation': '発音',
      'basic_grammar': '基本文法',
      'listening': 'リスニング',
      'speaking': 'スピーキング',
      'hour_reading': '時刻読み取り',
      'minute_reading': '分読み取り',
      'time_concepts': '時間概念',
      'digital_analog_conversion': 'デジタル・アナログ変換',
      'shape_recognition': '図形認識',
      'shape_properties': '図形の性質',
      'pattern_recognition': 'パターン認識',
      'spatial_reasoning': '空間認識'
    };

    return nameMap[skillName] || skillName;
  }

  static generateLearningAnalytics(progress: UserProgress): LearningAnalytics {
    const assessments = this.assessSkills(progress);
    
    // Calculate overall proficiency
    const overallProficiency = Math.round(
      assessments.reduce((sum, assessment) => sum + assessment.proficiency, 0) / assessments.length
    );

    // Find strongest and weakest subjects
    const subjectScores: { [key: string]: number[] } = {};
    assessments.forEach(assessment => {
      if (!subjectScores[assessment.subjectId]) {
        subjectScores[assessment.subjectId] = [];
      }
      subjectScores[assessment.subjectId].push(assessment.proficiency);
    });

    const subjectAverages = Object.entries(subjectScores).map(([subjectId, scores]) => ({
      subjectId,
      average: scores.reduce((sum, score) => sum + score, 0) / scores.length
    }));

    const strongestSubject = subjectAverages.reduce((prev, current) => 
      prev.average > current.average ? prev : current
    ).subjectId;

    const weakestSubject = subjectAverages.reduce((prev, current) => 
      prev.average < current.average ? prev : current
    ).subjectId;

    // Determine learning style (simulated based on performance patterns)
    const learningStyle = this.determineLearningStyle(progress);

    // Calculate optimal study time
    const optimalStudyTime = this.calculateOptimalStudyTime(progress);

    // Determine difficulty preference
    const difficultyPreference = this.determineDifficultyPreference(progress);

    // Identify motivation factors
    const motivationFactors = this.identifyMotivationFactors(progress);

    // Recommend next level
    const nextRecommendedLevel = this.recommendNextLevel(progress, assessments);

    return {
      overallProficiency,
      strongestSubject: this.formatSubjectName(strongestSubject),
      weakestSubject: this.formatSubjectName(weakestSubject),
      learningStyle,
      optimalStudyTime,
      difficultyPreference,
      motivationFactors,
      nextRecommendedLevel
    };
  }

  private static determineLearningStyle(progress: UserProgress): LearningAnalytics['learningStyle'] {
    // Simulate learning style determination based on performance patterns
    const mathLevels = progress.completedLevels.filter(level => level.startsWith('math')).length;
    const visualLevels = progress.completedLevels.filter(level => 
      level.includes('shape') || level.includes('time')
    ).length;
    
    if (visualLevels > mathLevels) return 'visual';
    if (progress.streaks.japanese > 5) return 'kinesthetic'; // Writing practice
    if (progress.playerLevel > 5) return 'mixed'; // Balanced learner
    return 'auditory';
  }

  private static calculateOptimalStudyTime(progress: UserProgress): number {
    // Base time on player level and streaks
    const baseTime = 15; // minutes
    const levelBonus = Math.min(progress.playerLevel * 2, 15);
    const streakBonus = Math.max(...Object.values(progress.streaks)) * 0.5;
    
    return Math.round(baseTime + levelBonus + streakBonus);
  }

  private static determineDifficultyPreference(progress: UserProgress): LearningAnalytics['difficultyPreference'] {
    if (progress.playerLevel < 3) return 'gradual';
    if (progress.playerLevel > 7) return 'challenging';
    return 'mixed';
  }

  private static identifyMotivationFactors(progress: UserProgress): string[] {
    const factors = [];
    
    if (progress.badges.length > 5) factors.push('バッジ獲得');
    if (Math.max(...Object.values(progress.streaks)) > 5) factors.push('継続性');
    if (progress.totalPoints > 500) factors.push('ポイント獲得');
    if (progress.playerLevel > 5) factors.push('レベルアップ');
    
    return factors.length > 0 ? factors : ['新しい学習内容', '視覚的な学習'];
  }

  private static recommendNextLevel(progress: UserProgress, assessments: SkillAssessment[]): string | null {
    // Find the subject with highest proficiency but not maxed out
    const sortedAssessments = assessments
      .filter(assessment => assessment.proficiency < 90)
      .sort((a, b) => b.proficiency - a.proficiency);

    if (sortedAssessments.length === 0) return null;

    const bestSubject = sortedAssessments[0].subjectId;
    const completedLevels = progress.completedLevels.filter(level => 
      level.startsWith(bestSubject)
    );

    // Recommend next level in the strongest subject
    const nextLevelNumber = completedLevels.length + 1;
    return `${bestSubject}-level-${nextLevelNumber}`;
  }

  private static formatSubjectName(subjectId: string): string {
    const nameMap: { [key: string]: string } = {
      'math': '算数',
      'japanese': '国語',
      'english': '英語',
      'time': '時計',
      'shape': '図形'
    };

    return nameMap[subjectId] || subjectId;
  }

  // Method to create detailed skill report
  static generateSkillReport(progress: UserProgress): {
    assessments: SkillAssessment[];
    analytics: LearningAnalytics;
    overallScore: number;
    recommendations: string[];
  } {
    const assessments = this.assessSkills(progress);
    const analytics = this.generateLearningAnalytics(progress);
    
    const overallScore = Math.round(
      assessments.reduce((sum, assessment) => sum + assessment.proficiency, 0) / assessments.length
    );

    const recommendations = [
      `最も得意な分野は${analytics.strongestSubject}です`,
      `${analytics.weakestSubject}の学習時間を増やすことをお勧めします`,
      `1回の学習時間は${analytics.optimalStudyTime}分程度が最適です`,
      `学習スタイルは${this.formatLearningStyle(analytics.learningStyle)}型です`
    ];

    return {
      assessments,
      analytics,
      overallScore,
      recommendations
    };
  }

  private static formatLearningStyle(style: LearningAnalytics['learningStyle']): string {
    const styleMap = {
      'visual': '視覚',
      'auditory': '聴覚',
      'kinesthetic': '体感',
      'mixed': '総合'
    };

    return styleMap[style];
  }
}