import { Level } from '@/types';
import { LevelVisibilityManager } from './level-visibility';
import { getAllLevels } from './subjects';

export interface LevelUpNotification {
  subjectId: string;
  newLevelsCount: number;
  message: string;
  levels: Level[];
}

export class LevelUpNotificationManager {
  // レベルアップ通知を生成
  static checkForLevelUps(
    previousProgress: { totalPoints: number; completedLevels: string[] },
    currentProgress: { totalPoints: number; completedLevels: string[] }
  ): LevelUpNotification[] {
    const notifications: LevelUpNotification[] = [];
    const allLevels = getAllLevels();
    
    // 各科目について新しく表示されるレベルをチェック
    const subjects = [...new Set(allLevels.map(l => l.subjectId))];
    
    subjects.forEach(subjectId => {
      const subjectLevels = allLevels.filter(l => l.subjectId === subjectId);
      
      // 以前の状態で表示されていたレベル
      const previousVisibleLevels = this.getVisibleLevelsForProgress(subjectLevels, previousProgress);
      
      // 現在の状態で表示されているレベル
      const currentVisibleLevels = this.getVisibleLevelsForProgress(subjectLevels, currentProgress);
      
      // 新しく表示されるようになったレベル
      const newlyVisibleLevels = currentVisibleLevels.filter(level => 
        !previousVisibleLevels.some(prevLevel => prevLevel.id === level.id)
      );
      
      if (newlyVisibleLevels.length > 0) {
        notifications.push({
          subjectId,
          newLevelsCount: newlyVisibleLevels.length,
          message: LevelVisibilityManager.getLevelUpMessage(subjectId, newlyVisibleLevels.length),
          levels: newlyVisibleLevels
        });
      }
    });
    
    return notifications;
  }
  
  // 指定された進捗状態での表示可能レベルを取得
  private static getVisibleLevelsForProgress(
    levels: Level[], 
    progress: { totalPoints: number; completedLevels: string[] }
  ): Level[] {
    const completedLevels = new Set(progress.completedLevels);
    
    return levels.filter(level => {
      if (!level.isHidden) return true;
      
      // 同じ科目の表示済みレベルを取得
      const visibleLevelsInSubject = levels
        .filter(l => !l.isHidden)
        .sort((a, b) => a.requiredPoints - b.requiredPoints);
      
      const completedVisibleLevels = visibleLevelsInSubject
        .filter(l => completedLevels.has(l.id));
      
      // 科目別の隠しレベル表示条件（level-visibility.tsと同じ）
      const showConditions = {
        'math': completedVisibleLevels.length >= 4,
        'japanese': completedVisibleLevels.length >= 5,
        'english': completedVisibleLevels.length >= 3,
        'trivia': completedVisibleLevels.length >= 2,
        'money': completedVisibleLevels.length >= 2,
        'reading': completedVisibleLevels.length >= 2,
        'science': completedVisibleLevels.length >= 2,
        'vocabulary': completedVisibleLevels.length >= 2,
        'programming': completedVisibleLevels.length >= 2,
        'digital-literacy': completedVisibleLevels.length >= 2,
        'time': completedVisibleLevels.length >= 2,
        'time-calc': completedVisibleLevels.length >= 2,
        'shape': completedVisibleLevels.length >= 2,
      };
      
      return showConditions[level.subjectId as keyof typeof showConditions] || false;
    });
  }
  
  // 通知の表示形式を生成
  static formatNotification(notification: LevelUpNotification): string {
    const levelNames = notification.levels.map(l => `・${l.name}`).join('\n');
    return `${notification.message}\n\n${levelNames}`;
  }
  
  // 通知をHTML形式で生成（モーダル表示用）
  static generateNotificationHTML(notifications: LevelUpNotification[]): string {
    if (notifications.length === 0) return '';
    
    return `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4 animate-bounce-in">
          <div class="text-center mb-6">
            <div class="text-6xl mb-4">🎉</div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">レベルアップ！</h2>
            <p class="text-gray-600">あたらしい チャレンジが ひらかれました！</p>
          </div>
          
          <div class="space-y-4 mb-6">
            ${notifications.map(notification => `
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                <div class="text-center">
                  <div class="text-purple-600 font-bold mb-2">${notification.message}</div>
                  <div class="space-y-1">
                    ${notification.levels.map(level => `
                      <div class="text-sm text-gray-700">✨ ${level.name}</div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="text-center">
            <button 
              class="kid-button bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold"
              onclick="this.parentElement.parentElement.parentElement.remove()"
            >
              わかった！
            </button>
          </div>
        </div>
      </div>
    `;
  }
}