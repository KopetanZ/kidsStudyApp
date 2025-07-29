import { UserProgress, Badge } from '@/types';
import { StorageManager } from './storage';
import { subjects, getAllLevels } from './subjects';

export interface ProgressReport {
  studentName: string;
  reportDate: Date;
  totalStudyTime: number;
  totalQuestions: number;
  correctAnswers: number;
  overallAccuracy: number;
  subjectProgress: SubjectProgress[];
  recentBadges: Badge[];
  streakRecord: number;
  recommendations: string[];
  strengths: string[];
  areasForImprovement: string[];
}

export interface SubjectProgress {
  subjectId: string;
  subjectName: string;
  completedLevels: number;
  totalLevels: number;
  averageScore: number;
  timeSpent: number;
  lastStudied: Date | null;
  mastery: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export class ProgressReportManager {
  static generateReport(studentName: string = 'お子様'): ProgressReport {
    const progress = StorageManager.getProgress();
    const weeklyStats = progress.weeklyStats;
    
    return {
      studentName,
      reportDate: new Date(),
      totalStudyTime: weeklyStats.timeSpent,
      totalQuestions: weeklyStats.questionsAnswered,
      correctAnswers: Math.round(weeklyStats.questionsAnswered * (weeklyStats.correctRate / 100)),
      overallAccuracy: weeklyStats.correctRate,
      subjectProgress: this.getSubjectProgress(progress),
      recentBadges: progress.badges.slice(-5), // Last 5 badges
      streakRecord: weeklyStats.bestStreak,
      recommendations: this.generateRecommendations(progress),
      strengths: this.identifyStrengths(progress),
      areasForImprovement: this.identifyImprovementAreas(progress)
    };
  }

  private static getSubjectProgress(progress: UserProgress): SubjectProgress[] {
    return subjects.map(subject => {
      const subjectLevels = getAllLevels().filter(level => level.subjectId === subject.id);
      const completedLevels = subjectLevels.filter(level => 
        progress.completedLevels.includes(level.id)
      );
      
      // Calculate mastery level
      const completionRate = completedLevels.length / subjectLevels.length;
      let mastery: SubjectProgress['mastery'] = 'beginner';
      if (completionRate >= 0.8) mastery = 'expert';
      else if (completionRate >= 0.6) mastery = 'advanced';
      else if (completionRate >= 0.3) mastery = 'intermediate';

      return {
        subjectId: subject.id,
        subjectName: subject.name,
        completedLevels: completedLevels.length,
        totalLevels: subjectLevels.length,
        averageScore: this.calculateAverageScore(subject.id, progress),
        timeSpent: this.estimateTimeSpent(completedLevels.length),
        lastStudied: this.getLastStudiedDate(subject.id, progress),
        mastery
      };
    });
  }

  private static calculateAverageScore(subjectId: string, progress: UserProgress): number {
    // Simplified calculation - in a real app, you'd track individual session scores
    const subjectLevels = getAllLevels().filter(level => level.subjectId === subjectId);
    const completedLevels = subjectLevels.filter(level => 
      progress.completedLevels.includes(level.id)
    );
    
    if (completedLevels.length === 0) return 0;
    
    // Estimate based on total points and XP
    const estimatedScore = (progress.totalPoints / Math.max(completedLevels.length, 1)) * 0.8;
    return Math.min(100, Math.max(60, estimatedScore));
  }

  private static estimateTimeSpent(completedLevels: number): number {
    // Estimate 3-5 minutes per level
    return completedLevels * 4;
  }

  private static getLastStudiedDate(subjectId: string, progress: UserProgress): Date | null {
    // In a real app, you'd track this properly
    // For now, estimate based on recent activity
    return progress.badges.length > 0 ? new Date() : null;
  }

  private static generateRecommendations(progress: UserProgress): string[] {
    const recommendations = [];
    
    // Check daily goal completion
    const completedGoals = progress.dailyGoals.filter(goal => goal.completed).length;
    if (completedGoals < 2) {
      recommendations.push('毎日少しずつでも学習を続けましょう');
    }
    
    // Check streak
    const maxStreak = Math.max(...Object.values(progress.streaks));
    if (maxStreak < 3) {
      recommendations.push('連続学習記録を作ってみましょう');
    }
    
    // Check subject balance
    const subjectProgress = this.getSubjectProgress(progress);
    const completionRates = subjectProgress.map(sp => sp.completedLevels / sp.totalLevels);
    const maxRate = Math.max(...completionRates);
    const minRate = Math.min(...completionRates);
    
    if (maxRate - minRate > 0.5) {
      const weakestSubject = subjectProgress.find(sp => 
        sp.completedLevels / sp.totalLevels === minRate
      );
      recommendations.push(`${weakestSubject?.subjectName}の学習時間を増やしてみましょう`);
    }
    
    // Level-based recommendations
    if (progress.playerLevel >= 5) {
      recommendations.push('素晴らしい進歩です！より難しいレベルに挑戦してみましょう');
    }
    
    return recommendations;
  }

  private static identifyStrengths(progress: UserProgress): string[] {
    const strengths = [];
    
    if (progress.totalPoints > 500) {
      strengths.push('継続的な学習で多くのポイントを獲得');
    }
    
    if (progress.badges.length > 5) {
      strengths.push('様々な分野でバッジを獲得');
    }
    
    const maxStreak = Math.max(...Object.values(progress.streaks));
    if (maxStreak >= 5) {
      strengths.push('優秀な連続学習記録');
    }
    
    if (progress.playerLevel >= 3) {
      strengths.push('着実なレベルアップ');
    }
    
    return strengths;
  }

  private static identifyImprovementAreas(progress: UserProgress): string[] {
    const areas = [];
    
    // Check completion rates
    const subjectProgress = this.getSubjectProgress(progress);
    subjectProgress.forEach(sp => {
      const completionRate = sp.completedLevels / sp.totalLevels;
      if (completionRate < 0.3) {
        areas.push(`${sp.subjectName}の基礎レベルの強化`);
      }
    });
    
    // Check daily goals
    const completedGoals = progress.dailyGoals.filter(goal => goal.completed).length;
    if (completedGoals < progress.dailyGoals.length / 2) {
      areas.push('日々の学習目標達成');
    }
    
    return areas;
  }

  static generateReportHTML(report: ProgressReport): string {
    const today = report.reportDate.toLocaleDateString('ja-JP');
    
    return `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Helvetica Neue', Arial, sans-serif; background: #f8fafc;">
        <header style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
          <h1 style="margin: 0; font-size: 28px;">📊 学習進捗レポート</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">${report.studentName}さんの学習記録</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">${today} 時点</p>
        </header>

        <!-- Overview Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
          <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 24px; color: #3b82f6; margin-bottom: 5px;">📚</div>
            <div style="font-size: 20px; font-weight: bold; color: #1f2937;">${report.totalQuestions}</div>
            <div style="font-size: 12px; color: #6b7280;">問題数</div>
          </div>
          <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 24px; color: #10b981; margin-bottom: 5px;">✅</div>
            <div style="font-size: 20px; font-weight: bold; color: #1f2937;">${report.overallAccuracy}%</div>
            <div style="font-size: 12px; color: #6b7280;">正解率</div>
          </div>
          <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 24px; color: #f59e0b; margin-bottom: 5px;">🔥</div>
            <div style="font-size: 20px; font-weight: bold; color: #1f2937;">${report.streakRecord}</div>
            <div style="font-size: 12px; color: #6b7280;">最長連続日数</div>
          </div>
          <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 24px; color: #8b5cf6; margin-bottom: 5px;">🏅</div>
            <div style="font-size: 20px; font-weight: bold; color: #1f2937;">${report.recentBadges.length}</div>
            <div style="font-size: 12px; color: #6b7280;">獲得バッジ</div>
          </div>
        </div>

        <!-- Subject Progress -->
        <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="margin: 0 0 20px 0; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">📖 科目別進捗</h2>
          ${report.subjectProgress.map(sp => `
            <div style="margin-bottom: 20px; padding: 15px; background: #f9fafb; border-radius: 8px;">
              <h3 style="margin: 0 0 10px 0; color: #374151;">${sp.subjectName}</h3>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-size: 14px; color: #6b7280;">進捗: ${sp.completedLevels}/${sp.totalLevels} レベル</span>
                <span style="font-size: 12px; padding: 4px 8px; border-radius: 12px; background: ${
                  sp.mastery === 'expert' ? '#dcfce7; color: #166534' :
                  sp.mastery === 'advanced' ? '#ddd6fe; color: #5b21b6' :
                  sp.mastery === 'intermediate' ? '#fef3c7; color: #92400e' :
                  '#f3f4f6; color: #374151'
                };">${
                  sp.mastery === 'expert' ? 'エキスパート' :
                  sp.mastery === 'advanced' ? '上級' :
                  sp.mastery === 'intermediate' ? '中級' : '初級'
                }</span>
              </div>
              <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="background: #3b82f6; height: 100%; width: ${(sp.completedLevels / sp.totalLevels) * 100}%; transition: width 0.3s;"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Strengths -->
        ${report.strengths.length > 0 ? `
          <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin: 0 0 15px 0; color: #059669; border-bottom: 2px solid #10b981; padding-bottom: 10px;">💪 優れている点</h2>
            <ul style="margin: 0; padding-left: 20px;">
              ${report.strengths.map(strength => `<li style="margin-bottom: 8px; color: #374151;">${strength}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Recommendations -->
        ${report.recommendations.length > 0 ? `
          <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin: 0 0 15px 0; color: #d97706; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">💡 おすすめの学習方法</h2>
            <ul style="margin: 0; padding-left: 20px;">
              ${report.recommendations.map(rec => `<li style="margin-bottom: 8px; color: #374151;">${rec}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Recent Badges -->
        ${report.recentBadges.length > 0 ? `
          <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin: 0 0 15px 0; color: #7c3aed; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">🏆 最近の獲得バッジ</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              ${report.recentBadges.map(badge => `
                <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #f3f4f6; border-radius: 20px; font-size: 14px;">
                  <span style="font-size: 16px;">${badge.emoji}</span>
                  <span style="color: #374151; font-weight: 500;">${badge.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <footer style="text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 12px;">
          <p>この学習レポートは小学生学習アプリによって自動生成されました</p>
          <p>継続的な学習をサポートしています 📚✨</p>
        </footer>
      </div>
    `;
  }

  static async downloadReport(report: ProgressReport): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const htmlContent = this.generateReportHTML(report);
      
      // Create a temporary container
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      // Try to use html2canvas if available
      if ((window as any).html2canvas) {
        const canvas = await (window as any).html2canvas(container.firstElementChild);
        const link = document.createElement('a');
        link.download = `progress-report-${report.reportDate.toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } else {
        // Fallback: create a downloadable HTML file
        const blob = new Blob([`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>学習進捗レポート - ${report.studentName}</title>
              <style>
                body { margin: 0; padding: 20px; background: #f8fafc; }
                @media print { body { background: white; } }
              </style>
            </head>
            <body>
              ${htmlContent}
            </body>
          </html>
        `], { type: 'text/html' });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `progress-report-${report.reportDate.toISOString().split('T')[0]}.html`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }

      // Clean up
      document.body.removeChild(container);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  }
}