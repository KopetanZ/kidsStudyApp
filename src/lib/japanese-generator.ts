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
  
  // サ行
  { character: 'サ', reading: 'sa', type: 'katakana', image: '🥗' }, // Salad (サラダ)
  { character: 'シ', reading: 'shi', type: 'katakana', image: '👔' }, // Shirt (シャツ)
  { character: 'ス', reading: 'su', type: 'katakana', image: '🥄' }, // Spoon (スプーン)
  { character: 'セ', reading: 'se', type: 'katakana', image: '🎽' }, // Set (セット)
  { character: 'ソ', reading: 'so', type: 'katakana', image: '🧦' }, // Socks (ソックス)
  
  // タ行
  { character: 'タ', reading: 'ta', type: 'katakana', image: '🚕' }, // Taxi (タクシー)
  { character: 'チ', reading: 'chi', type: 'katakana', image: '🧀' }, // Cheese (チーズ)
  { character: 'ツ', reading: 'tsu', type: 'katakana', image: '🔧' }, // Tool (ツール)
  { character: 'テ', reading: 'te', type: 'katakana', image: '🎾' }, // Tennis (テニス)
  { character: 'ト', reading: 'to', type: 'katakana', image: '🚛' }, // Truck (トラック)
  
  // ナ行
  { character: 'ナ', reading: 'na', type: 'katakana', image: '🔢' }, // Number (ナンバー)
  { character: 'ニ', reading: 'ni', type: 'katakana', image: '🌃' }, // News (ニュース)
  { character: 'ヌ', reading: 'nu', type: 'katakana', image: '🍜' }, // Noodle (ヌードル)
  { character: 'ネ', reading: 'ne', type: 'katakana', image: '🌐' }, // Net (ネット)
  { character: 'ノ', reading: 'no', type: 'katakana', image: '📓' }, // Note (ノート)
  
  // ハ行
  { character: 'ハ', reading: 'ha', type: 'katakana', image: '🍔' }, // Hamburger (ハンバーガー)
  { character: 'ヒ', reading: 'hi', type: 'katakana', image: '👠' }, // Heel (ヒール)
  { character: 'フ', reading: 'fu', type: 'katakana', image: '🍴' }, // Fork (フォーク)
  { character: 'ヘ', reading: 'he', type: 'katakana', image: '🪖' }, // Helmet (ヘルメット)
  { character: 'ホ', reading: 'ho', type: 'katakana', image: '🏨' }, // Hotel (ホテル)
  
  // マ行
  { character: 'マ', reading: 'ma', type: 'katakana', image: '🗾' }, // Map (マップ)
  { character: 'ミ', reading: 'mi', type: 'katakana', image: '🥛' }, // Milk (ミルク)
  { character: 'ム', reading: 'mu', type: 'katakana', image: '🎬' }, // Movie (ムービー)
  { character: 'メ', reading: 'me', type: 'katakana', image: '📧' }, // Email (メール)
  { character: 'モ', reading: 'mo', type: 'katakana', image: '🖥️' }, // Monitor (モニター)
  
  // ヤ行
  { character: 'ヤ', reading: 'ya', type: 'katakana', image: '🏢' }, // Yard (ヤード)
  { character: 'ユ', reading: 'yu', type: 'katakana', image: '🦄' }, // Unicorn (ユニコーン)
  { character: 'ヨ', reading: 'yo', type: 'katakana', image: '🧘' }, // Yoga (ヨーガ)
  
  // ラ行
  { character: 'ラ', reading: 'ra', type: 'katakana', image: '📻' }, // Radio (ラジオ)
  { character: 'リ', reading: 'ri', type: 'katakana', image: '🎀' }, // Ribbon (リボン)
  { character: 'ル', reading: 'ru', type: 'katakana', image: '📏' }, // Rule (ルール)
  { character: 'レ', reading: 're', type: 'katakana', image: '🍋' }, // Lemon (レモン)
  { character: 'ロ', reading: 'ro', type: 'katakana', image: '🤖' }, // Robot (ロボット)
  
  // ワ行
  { character: 'ワ', reading: 'wa', type: 'katakana', image: '🍷' }, // Wine (ワイン)
  { character: 'ヲ', reading: 'wo', type: 'katakana', image: '🌊' }, // Wave (ウェーブ)
  { character: 'ン', reading: 'n', type: 'katakana', image: '📰' }, // News (ニュース)
];

export class JapaneseQuestionGenerator {
  static generateHiraganaLevel1(): Question[] {
    const questions: Question[] = [];
    const characters = hiraganaData.slice(0, 15); // あ〜さ行
    
    // Generate character writing questions with visual support
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-hira-1-${index}`,
        type: 'japanese',
        subtype: 'hiragana-writing',
        question: `この文字を書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'hiragana-with-image',
          content: {
            image: char.image,
            character: char.character,
            reading: char.reading,
            example: this.getExampleWord(char.character)
          },
          position: 'top'
        },
        points: 15
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  // Helper function to get example words
  private static getExampleWord(character: string): string {
    const examples: { [key: string]: string } = {
      // あ行
      'あ': 'あり（蟻）',
      'い': 'いぬ（犬）',
      'う': 'うし（牛）',
      'え': 'えび（海老）',
      'お': 'おに（鬼）',
      // か行
      'か': 'かぎ（鍵）',
      'き': 'き（木）',
      'く': 'くも（雲）',
      'け': 'けーき（ケーキ）',
      'こ': 'こども（子供）',
      // さ行
      'さ': 'さかな（魚）',
      'し': 'しし（獅子）',
      'す': 'すいか（西瓜）',
      'せ': 'せかい（世界）',
      'そ': 'そら（空）',
      // た行
      'た': 'たまご（卵）',
      'ち': 'ちーず（チーズ）',
      'つ': 'つき（月）',
      'て': 'て（手）',
      'と': 'とら（虎）',
      // な行
      'な': 'なす（茄子）',
      'に': 'にじ（虹）',
      'ぬ': 'ぬの（布）',
      'ね': 'ねこ（猫）',
      'の': 'のやま（野山）',
      // は行
      'は': 'はな（花）',
      'ひ': 'ひ（日）',
      'ふ': 'ふね（船）',
      'へ': 'へび（蛇）',
      'ほ': 'ほし（星）',
      // ま行
      'ま': 'まく（幕）',
      'み': 'め（目）',
      'む': 'むし（虫）',
      'め': 'め（目）',
      'も': 'もも（桃）',
      // や行
      'や': 'やね（屋根）',
      'ゆ': 'ゆ（湯）',
      'よ': 'よる（夜）',
      // ら行
      'ら': 'らじお（ラジオ）',
      'り': 'りんご（林檎）',
      'る': 'るーむ（ルーム）',
      'れ': 'れい（礼）',
      'ろ': 'ろぼっと（ロボット）',
      // わ行
      'わ': 'わ（輪）',
      'を': 'を（助詞）',
      'ん': 'ん（音）'
    };
    return examples[character] || character;
  }

  static generateHiraganaLevel2(): Question[] {
    const questions: Question[] = [];
    const characters = hiraganaData.slice(15, 30); // た〜は行
    
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-hira-2-${index}`,
        type: 'japanese',
        subtype: 'hiragana-writing',
        question: `この文字を書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'hiragana-with-image',
          content: {
            image: char.image,
            character: char.character,
            reading: char.reading,
            example: this.getExampleWord(char.character)
          },
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
        question: `この文字を書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'hiragana-with-image',
          content: {
            image: char.image,
            character: char.character,
            reading: char.reading,
            example: this.getExampleWord(char.character)
          },
          position: 'top'
        },
        points: 15
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  // クイズ形式のひらがなレベル - 答えを隠して文字を当てる
  static generateHiraganaQuizLevel1(): Question[] {
    const questions: Question[] = [];
    const characters = hiraganaData.slice(0, 15); // あ〜さ行
    
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-hira-quiz-1-${index}`,
        type: 'japanese',
        subtype: 'hiragana-quiz',
        question: `〇の中に入る文字を書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'hiragana-quiz',
          content: {
            image: char.image,
            hiddenCharacter: char.character,
            example: this.getExampleWord(char.character)
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateHiraganaQuizLevel2(): Question[] {
    const questions: Question[] = [];
    const characters = hiraganaData.slice(15, 30); // た〜は行
    
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-hira-quiz-2-${index}`,
        type: 'japanese',
        subtype: 'hiragana-quiz',
        question: `〇の中に入る文字を書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'hiragana-quiz',
          content: {
            image: char.image,
            hiddenCharacter: char.character,
            example: this.getExampleWord(char.character)
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateHiraganaQuizLevel3(): Question[] {
    const questions: Question[] = [];
    const characters = hiraganaData.slice(30); // ま〜わ行
    
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-hira-quiz-3-${index}`,
        type: 'japanese',
        subtype: 'hiragana-quiz',
        question: `〇の中に入る文字を書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'hiragana-quiz',
          content: {
            image: char.image,
            hiddenCharacter: char.character,
            example: this.getExampleWord(char.character)
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateKatakanaLevel1(): Question[] {
    const questions: Question[] = [];
    const characters = katakanaData.slice(0, 15); // ア〜サ行
    
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-kata-1-${index}`,
        type: 'japanese',
        subtype: 'katakana-writing',
        question: `この文字を書いてください（直線をしっかり意識して）`,
        correctAnswer: char.character,
        visualAid: {
          type: 'katakana-with-stroke',
          content: {
            image: char.image,
            character: char.character,
            reading: char.reading,
            strokeInfo: this.getKatakanaStrokeInfo(char.character)
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateKatakanaLevel2(): Question[] {
    const questions: Question[] = [];
    const characters = katakanaData.slice(15, 30); // タ〜ハ行
    
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-kata-2-${index}`,
        type: 'japanese',
        subtype: 'katakana-writing',
        question: `この文字を書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'katakana-with-stroke',
          content: {
            image: char.image,
            character: char.character,
            reading: char.reading,
            strokeInfo: this.getKatakanaStrokeInfo(char.character)
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateKatakanaLevel3(): Question[] {
    const questions: Question[] = [];
    const characters = katakanaData.slice(30); // マ〜ワ行
    
    characters.forEach((char, index) => {
      questions.push({
        id: `jp-kata-3-${index}`,
        type: 'japanese',
        subtype: 'katakana-writing',
        question: `この文字を書いてください`,
        correctAnswer: char.character,
        visualAid: {
          type: 'katakana-with-stroke',
          content: {
            image: char.image,
            character: char.character,
            reading: char.reading,
            strokeInfo: this.getKatakanaStrokeInfo(char.character)
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateKatakanaWords(): Question[] {
    const words = [
      { word: 'ケーキ', image: '🎂', katakana: 'ケーキ' },
      { word: 'コーヒー', image: '☕', katakana: 'コーヒー' },
      { word: 'サラダ', image: '🥗', katakana: 'サラダ' },
      { word: 'チーズ', image: '🧀', katakana: 'チーズ' },
      { word: 'ノート', image: '📓', katakana: 'ノート' },
      { word: 'ハンバーガー', image: '🍔', katakana: 'ハンバーガー' },
      { word: 'ミルク', image: '🥛', katakana: 'ミルク' },
      { word: 'ラジオ', image: '📻', katakana: 'ラジオ' },
      { word: 'ロボット', image: '🤖', katakana: 'ロボット' },
      { word: 'ワイン', image: '🍷', katakana: 'ワイン' }
    ];

    const questions: Question[] = words.map((word, index) => ({
      id: `jp-kata-words-${index}`,
      type: 'japanese',
      subtype: 'katakana-word-writing',
      question: `この外来語をカタカナで書いてください`,
      correctAnswer: word.katakana,
      visualAid: {
        type: 'image',
        content: word.image,
        position: 'top'
      },
      points: 30
    }));

    return this.shuffleArray(questions);
  }

  // カタカナの筆順情報を取得する関数
  private static getKatakanaStrokeInfo(character: string): string {
    const strokeInfo: { [key: string]: string } = {
      // ア行
      'ア': '縦線→斜め線（直線がしっかり）',
      'イ': '縦線→点（シンプルな直線）',
      'ウ': '横線→縦線→点（3画で構成）',
      'エ': '横線→縦線→横線→横線（工の字に似る）',
      'オ': '横線→縦線→点→横線（バランス重要）',
      // カ行  
      'カ': '横線→縦線→点（力の字に似る）',
      'キ': '横線→縦線→横線→点（十字の基本）',
      'ク': '横線→縦線（最もシンプル）',
      'ケ': '横線→縦線→横線→縦線（ケの字構造）',
      'コ': '横線→縦線（コの字形）',
      // サ行
      'サ': '横線→縦線→横線（三画構成）',
      'シ': '縦線→点→点（三本線）',
      'ス': '横線→縦線→点（ス字形）',
      'セ': '横線→縦線→横線（セの構造）',
      'ソ': '横線→点（シンプル二画）',
      // タ行
      'タ': '横線→縦線→点（夕に似る）',
      'チ': '横線→縦線→点→縦線（千の字）',
      'ツ': '横線→点→点（シとは点の向きが違う）',
      'テ': '横線→横線→縦線（テの字形）',
      'ト': '横線→縦線（トの字形）',
      // ナ行
      'ナ': '横線→斜め線→縦線（ナの字）',
      'ニ': '横線→横線（二本線）',
      'ヌ': '横線→曲線→点（ヌの字）',
      'ネ': '横線→縦線→横線→点（ネの字）',
      'ノ': '斜め線（一画のみ）',
      // ハ行
      'ハ': '縦線→点（ハの字）',
      'ヒ': '縦線→横線（ヒの字）',
      'フ': '横線→縦線（フの字）',
      'ヘ': '斜め線（一画）',
      'ホ': '横線→縦線→横線→縦線（ホの字）',
      // マ行
      'マ': '横線→縦線→縦線（マの字）',
      'ミ': '横線→横線→横線（三本線）',
      'ム': '縦線→縦線→横線（ムの字）',
      'メ': '縦線→斜め線（メの字）',
      'モ': '横線→縦線→横線→縦線（モの字）',
      // ヤ行
      'ヤ': '縦線→斜め線→縦線（ヤの字）',
      'ユ': '横線→縦線→横線（ユの字）',
      'ヨ': '横線→横線→縦線（ヨの字）',
      // ラ行
      'ラ': '横線→縦線→点（ラの字）',
      'リ': '縦線→縦線（リの字）',
      'ル': '横線→曲線（ルの字）',
      'レ': '横線→縦線（レの字）',
      'ロ': '横線→縦線→横線→縦線（口の字）',
      // ワ行
      'ワ': '横線→縦線→点（ワの字）',
      'ヲ': '横線→縦線→横線→点（ヲの字）',
      'ン': '横線→斜め線（ンの字）'
    };
    return strokeInfo[character] || '基本の直線を意識して書こう';
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
      case 'japanese-hiragana-quiz-1':
        return this.generateHiraganaQuizLevel1();
      case 'japanese-hiragana-quiz-2':
        return this.generateHiraganaQuizLevel2();
      case 'japanese-hiragana-quiz-3':
        return this.generateHiraganaQuizLevel3();
      case 'japanese-katakana-1':
        return this.generateKatakanaLevel1();
      case 'japanese-katakana-2':
        return this.generateKatakanaLevel2();
      case 'japanese-katakana-3':
        return this.generateKatakanaLevel3();
      case 'japanese-katakana-words':
        return this.generateKatakanaWords();
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
  if (!question.visualAid) {
    return '';
  }

  // Handle the new hiragana-with-image visual aid type
  if (question.visualAid.type === 'hiragana-with-image') {
    const { image, character, example } = question.visualAid.content as {
      image: string;
      character: string;
      reading: string;
      example: string;
    };

    return `
      <div class="bg-yellow-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">この文字を覚えよう！</div>
        <div class="flex items-center justify-center gap-6 mb-4">
          <div class="bg-white rounded-xl p-4 shadow-lg border-4 border-pink-200">
            <div class="text-6xl text-center animate-bounce-in">
              ${image}
            </div>
          </div>
          <div class="text-4xl font-bold text-gray-600">+</div>
          <div class="bg-white rounded-xl p-4 shadow-lg border-4 border-blue-200">
            <div class="text-6xl text-center animate-bounce-in font-bold text-blue-800" style="animation-delay: 0.2s">
              ${character}
            </div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-lg text-gray-600 mb-2">${example}</div>
          <div class="text-sm text-gray-500">絵と文字をおぼえて書いてみよう！</div>
        </div>
      </div>
    `;
  }

  // Handle hiragana quiz visual aid type
  if (question.visualAid.type === 'hiragana-quiz') {
    const { image, example } = question.visualAid.content as {
      image: string;
      hiddenCharacter: string;
      example: string;
    };

    return `
      <div class="bg-blue-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">どの文字が入るかな？</div>
        <div class="flex items-center justify-center gap-6 mb-4">
          <div class="bg-white rounded-xl p-4 shadow-lg border-4 border-pink-200">
            <div class="text-6xl text-center animate-bounce-in">
              ${image}
            </div>
          </div>
          <div class="text-4xl font-bold text-gray-600">+</div>
          <div class="bg-white rounded-xl p-4 shadow-lg border-4 border-orange-200">
            <div class="text-6xl text-center animate-bounce-in font-bold text-orange-600" style="animation-delay: 0.2s">
              〇
            </div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-lg text-gray-600 mb-2">${example}</div>
          <div class="text-sm text-gray-500">絵を見て〇に入る文字を書いてみよう！</div>
        </div>
      </div>
    `;
  }

  // Handle katakana with stroke information
  if (question.visualAid.type === 'katakana-with-stroke') {
    const { image, character, reading, strokeInfo } = question.visualAid.content as {
      image: string;
      character: string;
      reading: string;
      strokeInfo: string;
    };

    return `
      <div class="bg-red-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">カタカナを覚えよう！（漢字の基礎）</div>
        <div class="flex items-center justify-center gap-6 mb-4">
          <div class="bg-white rounded-xl p-4 shadow-lg border-4 border-green-200">
            <div class="text-6xl text-center animate-bounce-in">
              ${image}
            </div>
          </div>
          <div class="text-4xl font-bold text-gray-600">+</div>
          <div class="bg-white rounded-xl p-4 shadow-lg border-4 border-red-200">
            <div class="text-6xl text-center animate-bounce-in font-bold text-red-800" style="animation-delay: 0.2s">
              ${character}
            </div>
          </div>
        </div>
        <div class="text-center mb-4">
          <div class="text-lg text-gray-600 mb-2">読み方: ${reading}</div>
          <div class="text-md text-blue-700 bg-blue-100 rounded-lg p-3 mb-2">
            <strong>筆順のコツ:</strong> ${strokeInfo}
          </div>
          <div class="text-sm text-gray-500">直線をしっかり意識して、漢字の基礎を作ろう！</div>
        </div>
      </div>
    `;
  }

  // Handle old image type for backward compatibility
  if (question.visualAid.type === 'image') {
    return `
      <div class="flex justify-center mb-6">
        <div class="bg-white rounded-2xl p-8 shadow-lg border-4 border-blue-200">
          <div class="text-8xl text-center animate-bounce-in">
            ${question.visualAid.content}
          </div>
        </div>
      </div>
    `;
  }

  return '';
};