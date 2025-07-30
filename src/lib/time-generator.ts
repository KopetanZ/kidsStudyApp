import { Question } from '@/types';

export class TimeQuestionGenerator {
  static generateTimeReading1(): Question[] {
    const questions: Question[] = [];
    
    // Simple hour reading (1時, 2時, etc.)
    for (let hour = 1; hour <= 12; hour++) {
      questions.push({
        id: `time-hour-${hour}`,
        type: 'japanese',
        subtype: 'time-reading',
        question: `この時計は何時ですか？`,
        correctAnswer: `${hour}:00`,
        visualAid: {
          type: 'time-input',
          content: {
            clock: this.generateClockHTML(hour, 0),
            correctHour: hour,
            correctMinute: 0,
            showMinute: false,
            template: 'X時'
          },
          position: 'top'
        },
        points: 15
      });
    }

    return this.shuffleArray(questions).slice(0, 8);
  }

  static generateTimeReading2(): Question[] {
    const questions: Question[] = [];
    
    // Half hour reading (1時30分, 2時30分, etc.)
    for (let hour = 1; hour <= 12; hour++) {
      questions.push({
        id: `time-half-${hour}`,
        type: 'japanese',
        subtype: 'time-reading',
        question: `この時計は何時何分ですか？`,
        correctAnswer: `${hour}:30`,
        visualAid: {
          type: 'time-input',
          content: {
            clock: this.generateClockHTML(hour, 30),
            correctHour: hour,
            correctMinute: 30,
            showMinute: true,
            template: 'X時Y分'
          },
          position: 'top'
        },
        points: 20
      });
    }

    return this.shuffleArray(questions).slice(0, 8);
  }

  static generateTimeReading3(): Question[] {
    const questions: Question[] = [];
    
    // Quarter hour reading
    const times = [
      { hour: 3, minute: 15 },
      { hour: 6, minute: 45 },
      { hour: 9, minute: 15 },
      { hour: 12, minute: 45 },
      { hour: 2, minute: 15 },
      { hour: 4, minute: 45 },
      { hour: 7, minute: 15 },
      { hour: 10, minute: 45 }
    ];

    times.forEach((time, index) => {
      questions.push({
        id: `time-quarter-${index}`,
        type: 'japanese',
        subtype: 'time-reading',
        question: `この時計は何時何分ですか？`,
        correctAnswer: `${time.hour}:${time.minute.toString().padStart(2, '0')}`,
        visualAid: {
          type: 'time-input',
          content: {
            clock: this.generateClockHTML(time.hour, time.minute),
            correctHour: time.hour,
            correctMinute: time.minute,
            showMinute: true,
            template: 'X時Y分'
          },
          position: 'top'
        },
        points: 25
      });
    });

    return this.shuffleArray(questions);
  }

  private static generateClockHTML(hour: number, minute: number): string {
    // Convert to 12-hour format for display
    const displayHour = hour > 12 ? hour - 12 : hour;
    
    // Calculate angles for clock hands
    const hourAngle = (displayHour % 12) * 30 + (minute * 0.5); // 30 degrees per hour + minute adjustment
    const minuteAngle = minute * 6; // 6 degrees per minute

    return `
      <svg width="200" height="200" viewBox="0 0 200 200" style="margin: 20px auto; display: block;">
        <!-- Clock face -->
        <circle cx="100" cy="100" r="90" fill="#f0f9ff" stroke="#1e40af" stroke-width="4"/>
        
        <!-- Hour markers -->
        ${Array.from({ length: 12 }, (_, i) => {
          const angle = (i + 1) * 30 - 90; // Start from 12 o'clock
          const x1 = 100 + 75 * Math.cos(angle * Math.PI / 180);
          const y1 = 100 + 75 * Math.sin(angle * Math.PI / 180);
          const x2 = 100 + 85 * Math.cos(angle * Math.PI / 180);
          const y2 = 100 + 85 * Math.sin(angle * Math.PI / 180);
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1e40af" stroke-width="3"/>`;
        }).join('')}
        
        <!-- Numbers -->
        ${Array.from({ length: 12 }, (_, i) => {
          const num = i + 1;
          const angle = num * 30 - 90;
          const x = 100 + 65 * Math.cos(angle * Math.PI / 180);
          const y = 100 + 65 * Math.sin(angle * Math.PI / 180) + 5;
          return `<text x="${x}" y="${y}" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e40af">${num}</text>`;
        }).join('')}
        
        <!-- Hour hand -->
        <line 
          x1="100" y1="100" 
          x2="${100 + 50 * Math.cos((hourAngle - 90) * Math.PI / 180)}" 
          y2="${100 + 50 * Math.sin((hourAngle - 90) * Math.PI / 180)}" 
          stroke="#dc2626" stroke-width="6" stroke-linecap="round"
        />
        
        <!-- Minute hand -->
        <line 
          x1="100" y1="100" 
          x2="${100 + 70 * Math.cos((minuteAngle - 90) * Math.PI / 180)}" 
          y2="${100 + 70 * Math.sin((minuteAngle - 90) * Math.PI / 180)}" 
          stroke="#059669" stroke-width="4" stroke-linecap="round"
        />
        
        <!-- Center dot -->
        <circle cx="100" cy="100" r="6" fill="#374151"/>
      </svg>
    `;
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'time-reading-1':
        return this.generateTimeReading1();
      case 'time-reading-2':
        return this.generateTimeReading2();
      case 'time-reading-3':
        return this.generateTimeReading3();
      default:
        return this.generateTimeReading1();
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

export const generateTimeVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // Handle new time-input visual aid type
  if (question.visualAid.type === 'time-input') {
    const { clock, template, showMinute } = question.visualAid.content as {
      clock: string;
      correctHour: number;
      correctMinute: number;
      showMinute: boolean;
      template: string;
    };

    return `
      <div class="bg-blue-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">時計を読んでみよう！</div>
        
        <!-- Clock Display -->
        <div class="flex justify-center mb-6">
          <div class="bg-white rounded-2xl p-6 shadow-lg border-4 border-blue-200">
            ${clock}
          </div>
        </div>
        
        <!-- Time Input Interface -->
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <div class="text-center mb-4">
            <div class="text-lg font-bold text-gray-700 mb-2">時間を選んでください</div>
            <div class="text-sm text-gray-600">${template.replace('X', '*').replace('Y', showMinute ? '*' : '')}</div>
          </div>
          
          <div class="flex items-center justify-center gap-4">
            <!-- Hour Selector -->
            <div class="text-center">
              <div class="text-sm font-bold text-gray-600 mb-2">時</div>
              <div class="relative">
                <select class="time-hour-input appearance-none bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-2 text-xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  ${Array.from({length: 12}, (_, i) => i + 1).map(h => 
                    `<option value="${h}">${h}</option>`
                  ).join('')}
                </select>
                <div class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="text-2xl font-bold text-gray-400">:</div>
            
            <!-- Minute Selector -->
            ${showMinute ? `
            <div class="text-center">
              <div class="text-sm font-bold text-gray-600 mb-2">分</div>
              <div class="relative">
                <select class="time-minute-input appearance-none bg-green-100 border-2 border-green-300 rounded-lg px-4 py-2 text-xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  ${[0, 15, 30, 45].map(m => 
                    `<option value="${m}">${m.toString().padStart(2, '0')}</option>`
                  ).join('')}
                </select>
                <div class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            ` : `
            <div class="text-center">
              <div class="text-sm font-bold text-gray-400 mb-2">分</div>
              <div class="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-2 text-xl font-bold text-center text-gray-400">
                00
              </div>
            </div>
            `}
          </div>
          
          <div class="text-center mt-4 text-sm text-gray-500">
            上の時間選択で時計の時間を合わせてください
          </div>
        </div>
      </div>
    `;
  }

  // Handle legacy image type
  if (question.visualAid.type === 'image') {
    return `
      <div style="display: flex; justify-content: center; margin-bottom: 24px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); border: 4px solid #dbeafe;">
          ${question.visualAid.content}
          <div style="text-align: center; margin-top: 15px; font-size: 14px; color: #6b7280;">
            時計を読んでください
          </div>
        </div>
      </div>
    `;
  }

  return '';
};