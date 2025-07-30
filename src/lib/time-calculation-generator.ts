import { Question } from '@/types';

// 時間計算問題用データ
export interface TimeCalculationData {
  type: 'duration' | 'elapsed' | 'schedule' | 'comparison';
  startTime?: string;
  endTime?: string;
  duration?: number;  // minutes
  activity?: string;
  emoji?: string;
}

export class TimeCalculationQuestionGenerator {
  // レベル1: 簡単な時間の長さ理解（30分単位）
  static generateTimeCalculationLevel1(): Question[] {
    const questions: Question[] = [];
    
    // 時間の長さ認識問題
    const durations = [
      { duration: 30, activity: 'テレビをみる', emoji: '📺' },
      { duration: 60, activity: 'こうえんであそぶ', emoji: '🎈' },
      { duration: 15, activity: 'おやつをたべる', emoji: '🍪' },
      { duration: 45, activity: 'ほんをよむ', emoji: '📖' },
      { duration: 30, activity: 'おふろにはいる', emoji: '🛁' },
      { duration: 20, activity: 'はみがきをする', emoji: '🦷' }
    ];

    durations.forEach((item, index) => {
      // 時間の長さを選ぶ問題
      questions.push({
        id: `time-duration-${index}`,
        type: 'math',
        subtype: 'time-calculation',
        question: `${item.activity}のじかんは どのくらい？`,
        options: ['15ぷん', '30ぷん', '45ぷん', '60ぷん'],
        correctAnswer: `${item.duration}ぷん`,
        visualAid: {
          type: 'time-duration-display',
          content: {
            activity: item.activity,
            duration: item.duration,
            emoji: item.emoji,
            showClock: true
          },
          position: 'top'
        },
        points: 15
      });
    });

    // 時間の比較問題
    const comparisons = [
      { activity1: 'はみがき', duration1: 5, activity2: 'おふろ', duration2: 30 },
      { activity1: 'あさごはん', duration1: 15, activity2: 'よるごはん', duration2: 45 },
      { activity1: 'うた1きょく', duration1: 3, activity2: 'テレビ1ばんぐみ', duration2: 30 }
    ];

    comparisons.forEach((comp, index) => {
      const longer = comp.duration1 > comp.duration2 ? comp.activity1 : comp.activity2;
      questions.push({
        id: `time-compare-${index}`,
        type: 'math',
        subtype: 'time-calculation',
        question: `${comp.activity1}と${comp.activity2}、どちらがながいじかん？`,
        options: [comp.activity1, comp.activity2, 'おなじ', 'わからない'],
        correctAnswer: longer,
        visualAid: {
          type: 'time-comparison-display',
          content: {
            activity1: comp.activity1,
            duration1: comp.duration1,
            activity2: comp.activity2,
            duration2: comp.duration2
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  // レベル2: 時刻から時刻の計算（1時間以内）
  static generateTimeCalculationLevel2(): Question[] {
    const questions: Question[] = [];
    
    // 開始時刻と終了時刻から時間の長さを求める問題
    const timeRanges = [
      { start: '9:00', end: '9:30', activity: 'そうじ', emoji: '🧹' },
      { start: '10:00', end: '11:00', activity: 'おべんきょう', emoji: '📚' },
      { start: '2:00', end: '2:15', activity: 'おやつ', emoji: '🍎' },
      { start: '3:00', end: '4:00', activity: 'あそび', emoji: '🎯' },
      { start: '6:00', end: '6:45', activity: 'ばんごはん', emoji: '🍽️' },
      { start: '8:00', end: '8:20', activity: 'あらいもの', emoji: '🧽' }
    ];

    timeRanges.forEach((range, index) => {
      const startHour = parseInt(range.start.split(':')[0]);
      const startMinute = parseInt(range.start.split(':')[1]);
      const endHour = parseInt(range.end.split(':')[0]);
      const endMinute = parseInt(range.end.split(':')[1]);
      
      const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
      
      questions.push({
        id: `time-elapsed-${index}`,
        type: 'math',
        subtype: 'time-calculation',
        question: `${range.start}から${range.end}まで ${range.activity}をしました。なんぷんかん？`,
        options: [`${totalMinutes - 15}ぷん`, `${totalMinutes}ぷん`, `${totalMinutes + 15}ぷん`, `${totalMinutes + 30}ぷん`],
        correctAnswer: `${totalMinutes}ぷん`,
        visualAid: {
          type: 'time-elapsed-display',
          content: {
            startTime: range.start,
            endTime: range.end,
            activity: range.activity,
            emoji: range.emoji,
            duration: totalMinutes
          },
          position: 'top'
        },
        points: 25
      });
    });

    // 時間を足す問題
    const additions = [
      { startTime: '10:00', addMinutes: 30, activity: 'さんぽ' },
      { startTime: '2:15', addMinutes: 45, activity: 'ゲーム' },
      { startTime: '4:00', addMinutes: 20, activity: 'しゅくだい' }
    ];

    additions.forEach((add, index) => {
      const [hour, minute] = add.startTime.split(':').map(Number);
      const totalMinutes = hour * 60 + minute + add.addMinutes;
      const newHour = Math.floor(totalMinutes / 60);
      const newMinute = totalMinutes % 60;
      const endTime = `${newHour}:${newMinute.toString().padStart(2, '0')}`;

      questions.push({
        id: `time-addition-${index}`,
        type: 'math',
        subtype: 'time-calculation',
        question: `${add.startTime}から${add.addMinutes}ぷんかん ${add.activity}をしました。おわったじこくは？`,
        options: [
          `${newHour - 1}:${newMinute.toString().padStart(2, '0')}`,
          endTime,
          `${newHour + 1}:${newMinute.toString().padStart(2, '0')}`,
          `${newHour}:${(newMinute + 15).toString().padStart(2, '0')}`
        ],
        correctAnswer: endTime,
        visualAid: {
          type: 'time-addition-display',
          content: {
            startTime: add.startTime,
            addMinutes: add.addMinutes,
            endTime: endTime,
            activity: add.activity
          },
          position: 'top'
        },
        points: 30
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  // レベル3: 1日のスケジュール・時間感覚
  static generateTimeCalculationLevel3(): Question[] {
    const questions: Question[] = [];
    
    // 1日のスケジュール問題
    const schedules = [
      {
        activities: [
          { time: '7:00', activity: 'きがえ', duration: 10 },
          { time: '7:10', activity: 'あさごはん', duration: 20 },
          { time: '7:30', activity: 'はみがき', duration: 5 },
          { time: '7:35', activity: 'じゅんび', duration: 15 }
        ],
        question: 'がっこうにいくじゅんびが おわるじこくは？',
        answer: '7:50'
      },
      {
        activities: [
          { time: '16:00', activity: 'おやつ', duration: 15 },
          { time: '16:15', activity: 'しゅくだい', duration: 45 },
          { time: '17:00', activity: 'あそび', duration: 60 }
        ],
        question: 'あそびが おわるじこくは？',
        answer: '18:00'
      }
    ];

    schedules.forEach((schedule, index) => {
      questions.push({
        id: `time-schedule-${index}`,
        type: 'math',
        subtype: 'time-calculation',
        question: schedule.question,
        options: [
          schedule.answer,
          this.addMinutesToTime(schedule.answer, 15),
          this.addMinutesToTime(schedule.answer, -15),
          this.addMinutesToTime(schedule.answer, 30)
        ],
        correctAnswer: schedule.answer,
        visualAid: {
          type: 'time-schedule-display',
          content: {
            activities: schedule.activities,
            title: 'いちにちのスケジュール'
          },
          position: 'top'
        },
        points: 35
      });
    });

    // 時間感覚問題
    const timeSense = [
      { activity: '学校の1じかんめ', duration: 45, unit: 'ぷん' },
      { activity: 'えいがを1ぽん', duration: 90, unit: 'ぷん' },
      { activity: 'よる ねるじかん', duration: 8, unit: 'じかん' },
      { activity: '1しゅうかん', duration: 7, unit: 'にち' }
    ];

    timeSense.forEach((item, index) => {
      questions.push({
        id: `time-sense-${index}`,
        type: 'math',
        subtype: 'time-calculation', 
        question: `${item.activity}は だいたい どのくらい？`,
        options: [
          `${item.duration - 15}${item.unit}`,
          `${item.duration}${item.unit}`,
          `${item.duration + 15}${item.unit}`,
          `${item.duration * 2}${item.unit}`
        ],
        correctAnswer: `${item.duration}${item.unit}`,
        visualAid: {
          type: 'time-sense-display',
          content: {
            activity: item.activity,
            duration: item.duration,
            unit: item.unit
          },
          position: 'top'
        },
        points: 30
      });
    });

    return this.shuffleArray(questions).slice(0, 8);
  }

  private static addMinutesToTime(timeStr: string, minutes: number): string {
    const [hour, minute] = timeStr.split(':').map(Number);
    const totalMinutes = hour * 60 + minute + minutes;
    const newHour = Math.max(0, Math.floor(totalMinutes / 60) % 24);
    const newMinute = Math.max(0, totalMinutes % 60);
    return `${newHour}:${newMinute.toString().padStart(2, '0')}`;
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'time-calc-level-1':
        return this.generateTimeCalculationLevel1();
      case 'time-calc-level-2':
        return this.generateTimeCalculationLevel2();
      case 'time-calc-level-3':
        return this.generateTimeCalculationLevel3();
      default:
        return this.generateTimeCalculationLevel1();
    }
  }

  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

// 時間計算用視覚化関数
export const generateTimeCalculationVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // 時間の長さ表示
  if (question.visualAid.type === 'time-duration-display') {
    const { activity, duration, emoji, showClock } = question.visualAid.content as {
      activity: string;
      duration: number;
      emoji: string;
      showClock: boolean;
    };

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const timeDisplay = hours > 0 ? `${hours}じかん${minutes}ぷん` : `${minutes}ぷん`;

    return `
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-6xl mb-3">${emoji}</div>
          <div class="text-xl font-bold text-gray-800">${activity}</div>
        </div>
        
        ${showClock ? `
        <div class="flex justify-center mb-4">
          <div class="bg-white rounded-xl p-4 shadow-lg">
            <div class="text-4xl font-bold text-blue-600">${timeDisplay}</div>
          </div>
        </div>
        ` : ''}
        
        <div class="bg-white rounded-xl p-4 shadow-inner">
          <div class="flex items-center justify-center gap-2">
            <div class="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div class="text-lg text-gray-700">どのくらいの じかん かかるかな？</div>
          </div>
        </div>
      </div>
    `;
  }

  // 時間比較表示
  if (question.visualAid.type === 'time-comparison-display') {
    const { activity1, duration1, activity2, duration2 } = question.visualAid.content as {
      activity1: string;
      duration1: number;
      activity2: string;
      duration2: number;
    };

    return `
      <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">じかんの ながさを くらべよう</div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-white rounded-xl p-4 shadow-lg text-center">
            <div class="text-lg font-bold text-blue-600 mb-2">${activity1}</div>
            <div class="text-2xl font-bold text-gray-800">${duration1}ぷん</div>
            <div class="mt-2">
              ${Array.from({length: Math.min(duration1 / 5, 10)}, () => '<div class="inline-block w-2 h-6 bg-blue-400 rounded mr-1"></div>').join('')}
            </div>
          </div>
          
          <div class="bg-white rounded-xl p-4 shadow-lg text-center">
            <div class="text-lg font-bold text-green-600 mb-2">${activity2}</div>
            <div class="text-2xl font-bold text-gray-800">${duration2}ぷん</div>
            <div class="mt-2">
              ${Array.from({length: Math.min(duration2 / 5, 10)}, () => '<div class="inline-block w-2 h-6 bg-green-400 rounded mr-1"></div>').join('')}
            </div>
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-600">
          どちらが ながい じかん でしょう？
        </div>
      </div>
    `;
  }

  // 経過時間表示
  if (question.visualAid.type === 'time-elapsed-display') {
    const { startTime, endTime, activity, emoji, duration } = question.visualAid.content as {
      startTime: string;
      endTime: string;
      activity: string;
      emoji: string;
      duration: number;
    };

    return `
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-4xl mb-2">${emoji}</div>
          <div class="text-xl font-bold text-gray-800">${activity}</div>
        </div>
        
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="bg-white rounded-xl p-4 shadow-lg text-center">
            <div class="text-sm text-gray-600 mb-1">はじまり</div>
            <div class="text-2xl font-bold text-purple-600">${startTime}</div>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="text-2xl">⏰</div>
            <div class="text-sm text-gray-600">？ぷん</div>
          </div>
          
          <div class="bg-white rounded-xl p-4 shadow-lg text-center">
            <div class="text-sm text-gray-600 mb-1">おわり</div>
            <div class="text-2xl font-bold text-pink-600">${endTime}</div>
          </div>
        </div>
        
        <div class="text-center bg-white rounded-xl p-3 shadow-inner">
          <div class="text-lg text-gray-700">なんぷんかん したでしょう？</div>
        </div>
      </div>
    `;
  }

  // スケジュール表示
  if (question.visualAid.type === 'time-schedule-display') {
    const { activities, title } = question.visualAid.content as {
      activities: Array<{ time: string; activity: string; duration: number }>;
      title: string;
    };

    return `
      <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center text-xl font-bold text-gray-800 mb-4">${title}</div>
        
        <div class="space-y-3 mb-4">
          ${activities.map((act, index) => `
            <div class="bg-white rounded-xl p-3 shadow-lg flex items-center gap-4">
              <div class="text-lg font-bold text-orange-600 min-w-[60px]">${act.time}</div>
              <div class="flex-1 text-lg text-gray-800">${act.activity}</div>
              <div class="text-sm text-gray-600">${act.duration}ぷん</div>
            </div>
          `).join('')}
        </div>
        
        <div class="text-center bg-white rounded-xl p-3 shadow-inner">
          <div class="text-lg text-gray-700">ぜんぶ おわるのは なんじ？</div>
        </div>
      </div>
    `;
  }

  return '';
};