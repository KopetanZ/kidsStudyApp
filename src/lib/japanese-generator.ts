import { Question, JapaneseCharacter } from '@/types';

export const hiraganaData: JapaneseCharacter[] = [
  // あ行
  { character: 'あ', reading: 'a', type: 'hiragana', image: '🍎' }, // Apple
  { character: 'い', reading: 'i', type: 'hiragana', image: '🍄' }, // Mushroom (いぬ dog alternative)
  { character: 'う', reading: 'u', type: 'hiragana', image: '🐄' }, // Cow (うし)
  { character: 'え', reading: 'e', type: 'hiragana', image: '🦐' }, // Shrimp (えび)
  { character: 'お', reading: 'o', type: 'hiragana', image: '👹' }, // Demon (おに)
  
  // か行
  { character: 'か', reading: 'ka', type: 'hiragana', image: '🔑' }, // Key (かぎ)
  { character: 'き', reading: 'ki', type: 'hiragana', image: '🌳' }, // Tree (き)
  { character: 'く', reading: 'ku', type: 'hiragana', image: '☁️' }, // Cloud (くも)
  { character: 'け', reading: 'ke', type: 'hiragana', image: '🐸' }, // Frog (かえる alternative)
  { character: 'こ', reading: 'ko', type: 'hiragana', image: '👶' }, // Child (こども)
  
  // さ行
  { character: 'さ', reading: 'sa', type: 'hiragana', image: '🐟' }, // Fish (さかな)
  { character: 'し', reading: 'shi', type: 'hiragana', image: '🦁' }, // Lion (しし)
  { character: 'す', reading: 'su', type: 'hiragana', image: '🍉' }, // Watermelon (すいか)
  { character: 'せ', reading: 'se', type: 'hiragana', image: '🌍' }, // World (せかい)
  { character: 'そ', reading: 'so', type: 'hiragana', image: '🌌' }, // Sky (そら)
  
  // た行
  { character: 'た', reading: 'ta', type: 'hiragana', image: '🥚' }, // Egg (たまご)
  { character: 'ち', reading: 'chi', type: 'hiragana', image: '🧀' }, // Cheese (チーズ sound)
  { character: 'つ', reading: 'tsu', type: 'hiragana', image: '🌙' }, // Moon (つき)
  { character: 'て', reading: 'te', type: 'hiragana', image: '✋' }, // Hand (て)
  { character: 'と', reading: 'to', type: 'hiragana', image: '🐅' }, // Tiger (とら)
  
  // な行
  { character: 'な', reading: 'na', type: 'hiragana', image: '🍆' }, // Eggplant (なす)
  { character: 'に', reading: 'ni', type: 'hiragana', image: '🌈' }, // Rainbow (にじ)
  { character: 'ぬ', reading: 'nu', type: 'hiragana', image: '🧵' }, // Thread (ぬの cloth)
  { character: 'ね', reading: 'ne', type: 'hiragana', image: '🐱' }, // Cat (ねこ)
  { character: 'の', reading: 'no', type: 'hiragana', image: '🏔️' }, // Mountain (のやま field)
  
  // は行
  { character: 'は', reading: 'ha', type: 'hiragana', image: '🌸' }, // Flower (はな)
  { character: 'ひ', reading: 'hi', type: 'hiragana', image: '☀️' }, // Sun (ひ)
  { character: 'ふ', reading: 'fu', type: 'hiragana', image: '⛵' }, // Boat (ふね)
  { character: 'へ', reading: 'he', type: 'hiragana', image: '🐍' }, // Snake (へび)
  { character: 'ほ', reading: 'ho', type: 'hiragana', image: '⭐' }, // Star (ほし)
  
  // ま行
  { character: 'ま', reading: 'ma', type: 'hiragana', image: '🎭' }, // Mask (まく curtain)
  { character: 'み', reading: 'mi', type: 'hiragana', image: '👁️' }, // Eye (め eye sound similar)
  { character: 'む', reading: 'mu', type: 'hiragana', image: '🐛' }, // Bug (むし)
  { character: 'め', reading: 'me', type: 'hiragana', image: '👁️' }, // Eye (め)
  { character: 'も', reading: 'mo', type: 'hiragana', image: '🍑' }, // Peach (もも)
  
  // や行
  { character: 'や', reading: 'ya', type: 'hiragana', image: '🏠' }, // House (やね roof)
  { character: 'ゆ', reading: 'yu', type: 'hiragana', image: '♨️' }, // Hot spring (ゆ)
  { character: 'よ', reading: 'yo', type: 'hiragana', image: '🌃' }, // Night (よる)
  
  // ら行
  { character: 'ら', reading: 'ra', type: 'hiragana', image: '📻' }, // Radio (ラジオ sound)
  { character: 'り', reading: 'ri', type: 'hiragana', image: '🍎' }, // Apple (りんご)
  { character: 'る', reading: 'ru', type: 'hiragana', image: '🏠' }, // House (いえ alternative)
  { character: 'れ', reading: 're', type: 'hiragana', image: '🧊' }, // Ice (れい)
  { character: 'ろ', reading: 'ro', type: 'hiragana', image: '🤖' }, // Robot (ロボット sound)
  
  // わ行
  { character: 'わ', reading: 'wa', type: 'hiragana', image: '🔵' }, // Circle (わ)
  { character: 'を', reading: 'wo', type: 'hiragana', image: '🎯' }, // Target (を particle)
  { character: 'ん', reading: 'n', type: 'hiragana', image: '🤔' }, // Thinking (ん sound)
];

export const katakanaData: JapaneseCharacter[] = [
  // ア行
  { character: 'ア', reading: 'a', type: 'katakana', image: '🐜' }, // Ant (アリ)
  { character: 'イ', reading: 'i', type: 'katakana', image: '🪑' }, // Chair (イス)
  { character: 'ウ', reading: 'u', type: 'katakana', image: '🐄' }, // Cow (ウシ)
  { character: 'エ', reading: 'e', type: 'katakana', image: '🦐' }, // Shrimp (エビ)
  { character: 'オ', reading: 'o', type: 'katakana', image: '🐺' }, // Wolf (オオカミ)
  
  // カ行
  { character: 'カ', reading: 'ka', type: 'katakana', image: '🐸' }, // Frog (カエル)
  { character: 'キ', reading: 'ki', type: 'katakana', image: '🔑' }, // Key (キー)
  { character: 'ク', reading: 'ku', type: 'katakana', image: '🚗' }, // Car (クルマ)
  { character: 'ケ', reading: 'ke', type: 'katakana', image: '🎂' }, // Cake (ケーキ)
  { character: 'コ', reading: 'ko', type: 'katakana', image: '☕' }, // Coffee (コーヒー)
];

export class JapaneseQuestionGenerator {
  static generateHiraganaLevel1(): Question[] {
    const questions: Question[] = [];
    const characters = hiraganaData.slice(0, 15); // あ〜さ行
    
    // Generate character writing questions
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-hira-1-${index}`,
        type: 'japanese',
        subtype: 'hiragana-writing',
        question: `「${char.reading}」の音を表すひらがなを書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'image',
          content: char.image || '',
          position: 'top'
        },
        points: 15
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateHiraganaLevel2(): Question[] {
    const questions: Question[] = [];
    const characters = hiraganaData.slice(15, 30); // た〜は行
    
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-hira-2-${index}`,
        type: 'japanese',
        subtype: 'hiragana-writing',
        question: `「${char.reading}」の音を表すひらがなを書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'image',
          content: char.image || '',
          position: 'top'
        },
        points: 15
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateHiraganaLevel3(): Question[] {
    const questions: Question[] = [];
    const characters = hiraganaData.slice(30); // ま〜わ行
    
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-hira-3-${index}`,
        type: 'japanese',
        subtype: 'hiragana-writing',
        question: `「${char.reading}」の音を表すひらがなを書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'image',
          content: char.image || '',
          position: 'top'
        },
        points: 15
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateKatakanaLevel1(): Question[] {
    const questions: Question[] = [];
    const characters = katakanaData; // ア〜サ行（available data）
    
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-kata-1-${index}`,
        type: 'japanese',
        subtype: 'katakana-writing',
        question: `「${char.reading}」の音を表すカタカナを書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'image',
          content: char.image || '',
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateWordsLevel1(): Question[] {
    const words = [
      { word: 'ねこ', image: '🐱', hiragana: 'ねこ' },
      { word: 'いぬ', image: '🐶', hiragana: 'いぬ' },
      { word: 'はな', image: '🌸', hiragana: 'はな' },
      { word: 'ほし', image: '⭐', hiragana: 'ほし' },
      { word: 'つき', image: '🌙', hiragana: 'つき' },
      { word: 'やま', image: '🏔️', hiragana: 'やま' },
      { word: 'うみ', image: '🌊', hiragana: 'うみ' },
      { word: 'そら', image: '🌌', hiragana: 'そら' },
      { word: 'かお', image: '😊', hiragana: 'かお' },
      { word: 'て', image: '✋', hiragana: 'て' }
    ];

    const questions: Question[] = words.map((word, index) => ({
      id: `jp-words-1-${index}`,
      type: 'japanese',
      subtype: 'word-writing',
      question: `この絵の単語をひらがなで書いてください`,
      correctAnswer: word.hiragana,
      visualAid: {
        type: 'image',
        content: word.image,
        position: 'top'
      },
      points: 25
    }));

    return this.shuffleArray(questions);
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'japanese-hiragana-1':
        return this.generateHiraganaLevel1();
      case 'japanese-hiragana-2':
        return this.generateHiraganaLevel2();
      case 'japanese-hiragana-3':
        return this.generateHiraganaLevel3();
      case 'japanese-katakana-1':
        return this.generateKatakanaLevel1();
      case 'japanese-words-1':
        return this.generateWordsLevel1();
      default:
        return this.generateHiraganaLevel1();
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

// Character recognition utility (simplified version without tesseract.js for now)
export const recognizeCharacter = async (_imageData: string): Promise<string> => {
  // This is a placeholder implementation
  // In a real implementation, you would use tesseract.js or a similar OCR library
  // For now, we'll return a random character for testing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('あ'); // Placeholder
    }, 1000);
  });
};

export const generateJapaneseVisual = (question: Question): string => {
  if (!question.visualAid || question.visualAid.type !== 'image') {
    return '';
  }

  return `
    <div class="flex justify-center mb-6">
      <div class="bg-white rounded-2xl p-8 shadow-lg border-4 border-blue-200">
        <div class="text-8xl text-center animate-bounce-in">
          ${question.visualAid.content}
        </div>
      </div>
    </div>
  `;
};