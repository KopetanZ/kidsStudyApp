import { Question, EnglishLetter } from '@/types';

export const alphabetData: EnglishLetter[] = [
  { letter: 'A', uppercase: 'A', lowercase: 'a', pronunciation: 'エー', image: '🍎', word: 'Apple' },
  { letter: 'B', uppercase: 'B', lowercase: 'b', pronunciation: 'ビー', image: '🐻', word: 'Bear' },
  { letter: 'C', uppercase: 'C', lowercase: 'c', pronunciation: 'シー', image: '🐱', word: 'Cat' },
  { letter: 'D', uppercase: 'D', lowercase: 'd', pronunciation: 'ディー', image: '🐶', word: 'Dog' },
  { letter: 'E', uppercase: 'E', lowercase: 'e', pronunciation: 'イー', image: '🐘', word: 'Elephant' },
  { letter: 'F', uppercase: 'F', lowercase: 'f', pronunciation: 'エフ', image: '🐟', word: 'Fish' },
  { letter: 'G', uppercase: 'G', lowercase: 'g', pronunciation: 'ジー', image: '🍇', word: 'Grape' },
  { letter: 'H', uppercase: 'H', lowercase: 'h', pronunciation: 'エイチ', image: '🏠', word: 'House' },
  { letter: 'I', uppercase: 'I', lowercase: 'i', pronunciation: 'アイ', image: '🍦', word: 'Ice cream' },
  { letter: 'J', uppercase: 'J', lowercase: 'j', pronunciation: 'ジェー', image: '🦒', word: 'Giraffe' },
  { letter: 'K', uppercase: 'K', lowercase: 'k', pronunciation: 'ケー', image: '🔑', word: 'Key' },
  { letter: 'L', uppercase: 'L', lowercase: 'l', pronunciation: 'エル', image: '🦁', word: 'Lion' },
  { letter: 'M', uppercase: 'M', lowercase: 'm', pronunciation: 'エム', image: '🐵', word: 'Monkey' },
  { letter: 'N', uppercase: 'N', lowercase: 'n', pronunciation: 'エン', image: '🥜', word: 'Nut' },
  { letter: 'O', uppercase: 'O', lowercase: 'o', pronunciation: 'オー', image: '🐙', word: 'Octopus' },
  { letter: 'P', uppercase: 'P', lowercase: 'p', pronunciation: 'ピー', image: '🐧', word: 'Penguin' },
  { letter: 'Q', uppercase: 'Q', lowercase: 'q', pronunciation: 'キュー', image: '👸', word: 'Queen' },
  { letter: 'R', uppercase: 'R', lowercase: 'r', pronunciation: 'アール', image: '🌈', word: 'Rainbow' },
  { letter: 'S', uppercase: 'S', lowercase: 's', pronunciation: 'エス', image: '⭐', word: 'Star' },
  { letter: 'T', uppercase: 'T', lowercase: 't', pronunciation: 'ティー', image: '🐅', word: 'Tiger' },
  { letter: 'U', uppercase: 'U', lowercase: 'u', pronunciation: 'ユー', image: '☂️', word: 'Umbrella' },
  { letter: 'V', uppercase: 'V', lowercase: 'v', pronunciation: 'ブイ', image: '🌋', word: 'Volcano' },
  { letter: 'W', uppercase: 'W', lowercase: 'w', pronunciation: 'ダブリュー', image: '🐺', word: 'Wolf' },
  { letter: 'X', uppercase: 'X', lowercase: 'x', pronunciation: 'エックス', image: '🎄', word: 'Xmas tree' },
  { letter: 'Y', uppercase: 'Y', lowercase: 'y', pronunciation: 'ワイ', image: '🧶', word: 'Yarn' },
  { letter: 'Z', uppercase: 'Z', lowercase: 'z', pronunciation: 'ゼット', image: '🦓', word: 'Zebra' }
];

export const basicWords = [
  { word: 'cat', image: '🐱', meaning: 'ねこ', pronunciation: 'キャット' },
  { word: 'dog', image: '🐶', meaning: 'いぬ', pronunciation: 'ドッグ' },
  { word: 'apple', image: '🍎', meaning: 'りんご', pronunciation: 'アップル' },
  { word: 'fish', image: '🐟', meaning: 'さかな', pronunciation: 'フィッシュ' },
  { word: 'bird', image: '🐦', meaning: 'とり', pronunciation: 'バード' },
  { word: 'flower', image: '🌸', meaning: 'はな', pronunciation: 'フラワー' },
  { word: 'tree', image: '🌳', meaning: 'き', pronunciation: 'ツリー' },
  { word: 'sun', image: '☀️', meaning: 'たいよう', pronunciation: 'サン' },
  { word: 'moon', image: '🌙', meaning: 'つき', pronunciation: 'ムーン' },
  { word: 'star', image: '⭐', meaning: 'ほし', pronunciation: 'スター' },
  { word: 'car', image: '🚗', meaning: 'くるま', pronunciation: 'カー' },
  { word: 'house', image: '🏠', meaning: 'いえ', pronunciation: 'ハウス' },
  { word: 'book', image: '📚', meaning: 'ほん', pronunciation: 'ブック' },
  { word: 'ball', image: '⚽', meaning: 'ボール', pronunciation: 'ボール' },
  { word: 'cake', image: '🎂', meaning: 'ケーキ', pronunciation: 'ケーキ' }
];

export const colors = [
  { word: 'red', image: '🔴', meaning: 'あか', pronunciation: 'レッド' },
  { word: 'blue', image: '🔵', meaning: 'あお', pronunciation: 'ブルー' },
  { word: 'yellow', image: '🟡', meaning: 'きいろ', pronunciation: 'イエロー' },
  { word: 'green', image: '🟢', meaning: 'みどり', pronunciation: 'グリーン' },
  { word: 'purple', image: '🟣', meaning: 'むらさき', pronunciation: 'パープル' },
  { word: 'orange', image: '🟠', meaning: 'オレンジ', pronunciation: 'オレンジ' },
  { word: 'pink', image: '🩷', meaning: 'ピンク', pronunciation: 'ピンク' },
  { word: 'black', image: '⚫', meaning: 'くろ', pronunciation: 'ブラック' },
  { word: 'white', image: '⚪', meaning: 'しろ', pronunciation: 'ホワイト' },
  { word: 'brown', image: '🤎', meaning: 'ちゃいろ', pronunciation: 'ブラウン' }
];

export class EnglishQuestionGenerator {
  static generateAlphabetLevel1(): Question[] {
    const questions: Question[] = [];
    const letters = alphabetData.slice(0, 13); // A-M
    
    letters.forEach((letter, index) => {
      // Letter recognition questions
      const wrongOptions = this.getRandomLetters(letter.letter, 3);
      
      questions.push({
        id: `en-alpha-1-${index}`,
        type: 'english',
        subtype: 'alphabet-recognition',
        question: `「${letter.pronunciation}」はどの文字？`,
        options: this.shuffleArray([letter.letter, ...wrongOptions]),
        correctAnswer: letter.letter,
        visualAid: {
          type: 'image',
          content: letter.image || '',
          position: 'top'
        },
        points: 10
      });
    });

    return this.shuffleArray(questions);
  }

  static generateAlphabetLevel2(): Question[] {
    const questions: Question[] = [];
    const letters = alphabetData.slice(13); // N-Z
    
    letters.forEach((letter, index) => {
      const wrongOptions = this.getRandomLetters(letter.letter, 3);
      
      questions.push({
        id: `en-alpha-2-${index}`,
        type: 'english',
        subtype: 'alphabet-recognition',
        question: `「${letter.pronunciation}」はどの文字？`,
        options: this.shuffleArray([letter.letter, ...wrongOptions]),
        correctAnswer: letter.letter,
        visualAid: {
          type: 'image',
          content: letter.image || '',
          position: 'top'
        },
        points: 10
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateWordsLevel1(): Question[] {
    const questions: Question[] = [];
    const selectedWords = [...basicWords, ...colors].slice(0, 15);
    
    selectedWords.forEach((wordData, index) => {
      // Word recognition questions
      const wrongOptions = this.getRandomWords(wordData.word, 3);
      
      questions.push({
        id: `en-words-1-${index}`,
        type: 'english',
        subtype: 'word-recognition',
        question: `この絵は英語で何？`,
        options: this.shuffleArray([wordData.word, ...wrongOptions]),
        correctAnswer: wordData.word,
        visualAid: {
          type: 'image',
          content: wordData.image,
          position: 'top'
        },
        points: 15
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generatePhonicsLevel1(): Question[] {
    const questions: Question[] = [];
    const phonicsLetters = alphabetData.slice(0, 10); // First 10 letters for phonics
    
    phonicsLetters.forEach((letter, index) => {
      // Phonics questions - what sound does this letter make?
      const wrongSounds = this.getRandomSounds(letter.pronunciation, 3);
      
      questions.push({
        id: `en-phonics-1-${index}`,
        type: 'english',
        subtype: 'phonics',
        question: `この文字の音は？`,
        options: this.shuffleArray([letter.pronunciation, ...wrongSounds]),
        correctAnswer: letter.pronunciation,
        visualAid: {
          type: 'text',
          content: letter.uppercase,
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions);
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'english-alphabet-1':
        return this.generateAlphabetLevel1();
      case 'english-alphabet-2':
        return this.generateAlphabetLevel2();
      case 'english-words-1':
        return this.generateWordsLevel1();
      case 'english-phonics-1':
        return this.generatePhonicsLevel1();
      default:
        return this.generateAlphabetLevel1();
    }
  }

  private static getRandomLetters(excludeLetter: string, count: number): string[] {
    const availableLetters = alphabetData
      .filter(l => l.letter !== excludeLetter)
      .map(l => l.letter);
    
    return this.shuffleArray(availableLetters).slice(0, count);
  }

  private static getRandomWords(excludeWord: string, count: number): string[] {
    const availableWords = [...basicWords, ...colors]
      .filter(w => w.word !== excludeWord)
      .map(w => w.word);
    
    return this.shuffleArray(availableWords).slice(0, count);
  }

  private static getRandomSounds(excludeSound: string, count: number): string[] {
    const availableSounds = alphabetData
      .filter(l => l.pronunciation !== excludeSound)
      .map(l => l.pronunciation);
    
    return this.shuffleArray(availableSounds).slice(0, count);
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

export const generateEnglishVisual = (question: Question): string => {
  if (!question.visualAid) return '';

  if (question.visualAid.type === 'image') {
    return `
      <div class="flex justify-center mb-6">
        <div class="bg-white rounded-2xl p-8 shadow-lg border-4 border-green-200">
          <div class="text-8xl text-center animate-bounce-in">
            ${question.visualAid.content}
          </div>
        </div>
      </div>
    `;
  }

  if (question.visualAid.type === 'text') {
    return `
      <div class="flex justify-center mb-6">
        <div class="bg-white rounded-2xl p-8 shadow-lg border-4 border-green-200">
          <div class="text-8xl text-center font-bold text-green-600 animate-bounce-in">
            ${question.visualAid.content}
          </div>
        </div>
      </div>
    `;
  }

  return '';
};