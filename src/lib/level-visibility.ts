import { Level } from '@/types';
import { StorageManager } from './storage';

export class LevelVisibilityManager {
  // 表示するレベルを決定する
  static getVisibleLevels(levels: Level[]): Level[] {
    const progress = StorageManager.getProgress();
    const completedLevels = new Set(progress.completedLevels);
    const totalPoints = progress.totalPoints;
    
    return levels.filter(level => {
      // 隠しレベルでない場合は常に表示
      if (!level.isHidden) {
        return true;
      }
      
      // 隠しレベルの表示条件をチェック
      return this.shouldShowHiddenLevel(level, completedLevels, totalPoints, levels);
    });
  }
  
  // 隠しレベルを表示するかどうかの判定
  private static shouldShowHiddenLevel(
    level: Level, 
    completedLevels: Set<string>, 
    totalPoints: number,
    allLevels: Level[]
  ): boolean {
    // 同じ科目の表示済みレベルを取得
    const visibleLevelsInSubject = allLevels
      .filter(l => l.subjectId === level.subjectId && !l.isHidden)
      .sort((a, b) => a.requiredPoints - b.requiredPoints);
    
    // 同じ科目の表示済みレベルを一定数クリアしていたら隠しレベルを表示
    const completedVisibleLevels = visibleLevelsInSubject
      .filter(l => completedLevels.has(l.id));
    
    // 科目別の隠しレベル表示条件
    const showConditions = {
      'math': completedVisibleLevels.length >= 4, // 算数は4レベルクリアで隠しレベル表示
      'japanese': completedVisibleLevels.length >= 5, // 国語は5レベルクリアで隠しレベル表示
      'english': completedVisibleLevels.length >= 3, // 英語は3レベルクリアで隠しレベル表示
      'trivia': completedVisibleLevels.length >= 2, // 豆知識は2レベルクリアで隠しレベル表示
      'money': completedVisibleLevels.length >= 2, // お金は2レベルクリアで隠しレベル表示
      'reading': completedVisibleLevels.length >= 2, // 読解は2レベルクリアで隠しレベル表示
      'science': completedVisibleLevels.length >= 2, // 理科は2レベルクリアで隠しレベル表示
      'vocabulary': completedVisibleLevels.length >= 2, // 語彙は2レベルクリアで隠しレベル表示
      'programming': completedVisibleLevels.length >= 2, // プログラミングは2レベルクリアで隠しレベル表示
      'digital-literacy': completedVisibleLevels.length >= 2, // デジタルは2レベルクリアで隠しレベル表示
      'time': completedVisibleLevels.length >= 2, // 時計は2レベルクリアで隠しレベル表示
      'time-calc': completedVisibleLevels.length >= 2, // 時間計算は2レベルクリアで隠しレベル表示
      'shape': completedVisibleLevels.length >= 2, // 図形は2レベルクリア隠しレベル表示
    };
    
    return showConditions[level.subjectId as keyof typeof showConditions] || false;
  }
  
  // 新しく表示されるレベル数を取得（進捗表示用）
  static getNewlyVisibleLevelsCount(subjectId: string, allLevels: Level[]): number {
    const progress = StorageManager.getProgress();
    const completedLevels = new Set(progress.completedLevels);
    
    const subjectLevels = allLevels.filter(l => l.subjectId === subjectId);
    const currentlyVisible = this.getVisibleLevels(subjectLevels);
    
    // 前回の進捗状態での表示レベル数と比較
    // この実装では簡略化して、隠しレベルの総数を返す
    const hiddenLevels = subjectLevels.filter(l => l.isHidden);
    const visibleHiddenLevels = hiddenLevels.filter(level => 
      this.shouldShowHiddenLevel(level, completedLevels, progress.totalPoints, allLevels)
    );
    
    return visibleHiddenLevels.length;
  }
  
  // レベルアップ時の通知メッセージ
  static getLevelUpMessage(subjectId: string, newLevelsUnlocked: number): string {
    if (newLevelsUnlocked === 0) return '';
    
    const subjectNames = {
      'math': '算数',
      'japanese': '国語', 
      'english': '英語',
      'trivia': 'まめちしき',
      'money': 'おかね',
      'reading': 'ぶんしょう',
      'science': 'りか',
      'vocabulary': 'ごい',
      'programming': 'プログラミング',
      'digital-literacy': 'デジタル',
      'time': '時計',
      'time-calc': 'じかんけいさん',
      'shape': '図形'
    };
    
    const subjectName = subjectNames[subjectId as keyof typeof subjectNames] || '学習';
    
    return `🎉 ${subjectName}の あたらしい チャレンジが ${newLevelsUnlocked}個 ひらかれました！`;
  }
}