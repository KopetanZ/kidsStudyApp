export interface Subject {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface Level {
  id: string;
  subjectId: string;
  name: string;
  description: string;
  difficulty: number;
  requiredPoints: number;
  isUnlocked: boolean;
}

export interface Question {
  id: string;
  type: 'math' | 'japanese' | 'english';
  subtype: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  visualAid?: VisualAid;
  points: number;
}

export interface VisualAid {
  type: 'dots' | 'image' | 'text' | 'addition-dots' | 'subtraction-dots' | 'kuku-reading' | 'hiragana-with-image' | 'hiragana-quiz' | 'counting-dots' | 'number-display' | 'number-sequence' | 'place-value-teens' | 'number-comparison' | 'tens-visualization' | 'place-value-blocks' | 'carry-addition-sakura' | 'borrow-subtraction-blocks' | 'katakana-with-stroke' | 'time-input' | 'kanji-with-meaning' | 'kanji-stroke-guide' | 'kanji-compound-display' | 'kanji-with-furigana' | 'kanji-compound-with-furigana' | 'money-coin-display' | 'money-coin-counting' | 'money-combination-display' | 'money-shopping-display' | 'money-change-display' | 'reading-passage-display' | 'time-duration-display' | 'time-comparison-display' | 'time-elapsed-display' | 'time-addition-display' | 'time-schedule-display' | 'time-sense-display' | 'science-animal-display' | 'science-plant-display' | 'science-season-display' | 'science-weather-display' | 'science-body-display' | 'science-phenomena-display' | 'science-growth-display' | 'vocabulary-opposite-display' | 'vocabulary-context-display' | 'vocabulary-classification-display' | 'vocabulary-odd-out-display' | 'vocabulary-emotion-display' | 'vocabulary-situation-display';
  content: string | number | object;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export interface UserProgress {
  totalPoints: number;
  completedLevels: string[];
  currentLevel: Record<string, string>;
  achievements: string[];
  streaks: Record<string, number>;
  badges: Badge[];
  experiencePoints: number;
  playerLevel: number;
  dailyGoals: DailyGoal[];
  weeklyStats: WeeklyStats;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  type: 'bronze' | 'silver' | 'gold' | 'special';
  unlockedAt: Date;
  category: 'math' | 'japanese' | 'english' | 'time' | 'shape' | 'general';
}

export interface DailyGoal {
  id: string;
  type: 'questions' | 'points' | 'streak' | 'time';
  target: number;
  current: number;
  completed: boolean;
  reward: number;
  emoji: string;
  description: string;
}

export interface WeeklyStats {
  questionsAnswered: number;
  correctRate: number;
  timeSpent: number;
  subjectsStudied: string[];
  bestStreak: number;
}

export interface GameSession {
  id: string;
  subjectId: string;
  levelId: string;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  correctAnswers: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
}

export interface SoundEffect {
  type: 'correct' | 'incorrect' | 'celebration' | 'click';
  url: string;
}

// Math specific types
export interface MathProblem {
  operation: '+' | '-' | '×' | '÷';
  operand1: number;
  operand2: number;
  result: number;
  showDots?: boolean;
  showPlaceholder?: boolean;
}

// Japanese specific types
export interface JapaneseCharacter {
  character: string;
  reading: string;
  type: 'hiragana' | 'katakana';
  strokeOrder?: string[];
  image?: string;
}

// English specific types
export interface EnglishLetter {
  letter: string;
  uppercase: string;
  lowercase: string;
  pronunciation: string;
  image?: string;
  word?: string;
}