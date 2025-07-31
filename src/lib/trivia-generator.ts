import { Question } from '@/types';

// 豆知識クイズ用データ
export interface TriviaData {
  category: 'animals' | 'nature' | 'space' | 'body' | 'food' | 'history' | 'science' | 'world';
  difficulty: 1 | 2 | 3;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  funFact: string;
  emoji: string;
}

export const triviaQuestions: TriviaData[] = [
  // 動物の豆知識
  {
    category: 'animals',
    difficulty: 1,
    question: '🐧 ペンギンは どこで たまごを あたためる？',
    options: ['おなかの うえ', 'すなの なか', 'きの うえ', 'みずの なか'],
    correctAnswer: 'おなかの うえ',
    explanation: 'おとうさんペンギンが あしの うえに たまごを のせて、おなかの ひだで あたためるんだよ！',
    funFact: 'おとうさんペンギンは 2かげつも たべものを たべずに たまごを まもるんだって！',
    emoji: '🐧'
  },
  {
    category: 'animals',
    difficulty: 1,
    question: '🦒 キリンの したは なにいろ？',
    options: ['むらさきいろ', 'あかいろ', 'きいろ', 'みどりいろ'],
    correctAnswer: 'むらさきいろ',
    explanation: 'キリンの したは むらさきいろで、ながさは 50センチも あるんだよ！',
    funFact: 'ながい したで たかい きの はっぱを たべることが できるんだ！',
    emoji: '🦒'
  },
  {
    category: 'animals',
    difficulty: 2,
    question: '🐘 ゾウが いちばん こわがる どうぶつは？',
    options: ['ネズミ', 'ライオン', 'ハチ', 'ヘビ'],
    correctAnswer: 'ハチ',
    explanation: 'おおきな ゾウも ちいさな ハチを とても こわがるんだよ！',
    funFact: 'ハチに さされると いたいし、はなの あなに はいってくると こきゅうが くるしくなるからなんだ！',
    emoji: '🐘'
  },
  {
    category: 'animals',
    difficulty: 2,
    question: '🐱 ネコが のどを ゴロゴロ ならすのは なぜ？',
    options: ['うれしいとき', 'おこっているとき', 'おなかが すいたとき', 'ねむいとき'],
    correctAnswer: 'うれしいとき',
    explanation: 'ネコは きもちが いいときや あまえているときに のどを ゴロゴロ ならすんだよ！',
    funFact: 'でも びょうきのときや いたいときにも ゴロゴロ いうことが あるんだって！',
    emoji: '🐱'
  },

  // 自然・植物の豆知識
  {
    category: 'nature',
    difficulty: 1,
    question: '🌻 ひまわりは いつも どっちを むいている？',
    options: ['たいよう', 'つき', 'きた', 'みなみ'],
    correctAnswer: 'たいよう',
    explanation: 'ひまわりは たいようの ほうこうを むいて さくから「ひまわり」って いうんだよ！',
    funFact: 'でも おおきくなると ひがしを むいたまま うごかなくなるんだ！',
    emoji: '🌻'
  },
  {
    category: 'nature',
    difficulty: 2,
    question: '🌈 にじは ぜんぶで なんしょく？',
    options: ['5しょく', '6しょく', '7しょく', '8しょく'],
    correctAnswer: '7しょく',
    explanation: 'にじは あか・だいだい・きいろ・みどり・あお・あい・むらさきの 7しょくだよ！',
    funFact: '「あかだいきみあいむ」って おぼえると いいよ！',
    emoji: '🌈'
  },
  {
    category: 'nature',
    difficulty: 2,
    question: '❄️ ゆきの けっしょうは ぜんぶで なんかく？',
    options: ['4かく', '5かく', '6かく', '8かく'],
    correctAnswer: '6かく',
    explanation: 'ゆきの けっしょうは ぜんぶ 6かくの かたちを しているんだよ！',
    funFact: 'でも おなじ かたちの ゆきは ひとつも ないんだって！ふしぎだね！',
    emoji: '❄️'
  },

  // 宇宙・地球の豆知識
  {
    category: 'space',
    difficulty: 2,
    question: '🌍 ちきゅうで いちばん たかい やまは？',
    options: ['エベレスト', 'フジサン', 'キリマンジャロ', 'アルプス'],
    correctAnswer: 'エベレスト',
    explanation: 'エベレストは たかさ 8848メートルで せかいで いちばん たかい やまだよ！',
    funFact: 'エベレストは まいとし 4ミリずつ たかくなっているんだって！',
    emoji: '🏔️'
  },
  {
    category: 'space',
    difficulty: 1,
    question: '🌙 つきは ちきゅうから どんどん とおくなっている？',
    options: ['ほんとう', 'うそ', 'ときどき', 'わからない'],
    correctAnswer: 'ほんとう',
    explanation: 'つきは まいとし 3.8センチずつ ちきゅうから はなれているんだよ！',
    funFact: 'むかしの つきは いまより おおきく みえていたんだ！',
    emoji: '🌙'
  },
  {
    category: 'space',
    difficulty: 3,
    question: '🪐 わせいの わっかは なにで できている？',
    options: ['こおり', 'いし', 'きんぞく', 'ガス'],
    correctAnswer: 'こおり',
    explanation: 'どせいの わっかは こおりの つぶつぶが あつまって できているんだよ！',
    funFact: 'わっかの あつさは とても うすくて、1キロメートルも ないんだ！',
    emoji: '🪐'
  },

  // 人間の体の豆知識
  {
    category: 'body',
    difficulty: 1,
    question: '👃 においを かんじるのは はなの どこ？',
    options: ['はなの あな', 'はなの おく', 'はなの さき', 'はなの よこ'],
    correctAnswer: 'はなの おく',
    explanation: 'においを かんじる ところは はなの おくの ほうに あるんだよ！',
    funFact: 'いちど に 1ちょうこの においを かぎわけることが できるんだって！',
    emoji: '👃'
  },
  {
    category: 'body',
    difficulty: 2,
    question: '🦷 おとなの はは ぜんぶで なんぼん？',
    options: ['28ほん', '30ほん', '32ほん', '36ほん'],
    correctAnswer: '32ほん',
    explanation: 'おとなの はは ぜんぶで 32ほん あるんだよ！',
    funFact: 'こどもの はは 20ほんだから、おとなになると 12ほん ふえるんだ！',
    emoji: '🦷'
  },
  {
    category: 'body',
    difficulty: 2,
    question: '👁️ ひとは いちにちに なんかい まばたきする？',
    options: ['1000かい', '5000かい', '15000かい', '30000かい'],
    correctAnswer: '15000かい',
    explanation: 'ひとは いちにちに やく 15000かい まばたきを しているんだよ！',
    funFact: 'まばたきで めを しっとり させて、ゴミから まもっているんだ！',
    emoji: '👁️'
  },

  // 食べ物の豆知識
  {
    category: 'food',
    difficulty: 1,
    question: '🍌 バナナは なんの なかま？',
    options: ['くだもの', 'やさい', 'きのみ', 'くさ'],
    correctAnswer: 'くさ',
    explanation: 'バナナは きのみ ではなく、くさの なかまなんだよ！',
    funFact: 'バナナの きは ほんとうは くきで、1ねんで 10メートルも のびるんだ！',
    emoji: '🍌'
  },
  {
    category: 'food',
    difficulty: 2,
    question: '🍯 はちみつは くさらない？',
    options: ['ほんとう', 'うそ', 'ときどき', 'あついときだけ'],
    correctAnswer: 'ほんとう',
    explanation: 'はちみつは くさらない たべものなんだよ！',
    funFact: '3000ねんまえの はちみつが みつかって、まだ たべられたんだって！',
    emoji: '🍯'
  },
  {
    category: 'food',
    difficulty: 2,
    question: '🥕 にんじんは むかし なにいろだった？',
    options: ['むらさきいろ', 'しろいろ', 'きいろ', 'みどりいろ'],
    correctAnswer: 'むらさきいろ',
    explanation: 'むかしの にんじんは むらさきいろ だったんだよ！',
    funFact: 'オランダで あたらしい しゅるいを つくって、だいだいいろに なったんだ！',
    emoji: '🥕'
  },

  // 世界・文化の豆知識
  {
    category: 'world',
    difficulty: 2,
    question: '🗼 とうきょうタワーは なにいろ？',
    options: ['あかと しろ', 'あかと きいろ', 'しろと あお', 'きんいろ'],
    correctAnswer: 'あかと しろ',
    explanation: 'とうきょうタワーは あかと しろに ぬられているんだよ！',
    funFact: 'ひこうきが ぶつからないように、あかく ぬってあるんだ！',
    emoji: '🗼'
  },
  {
    category: 'world',
    difficulty: 1,
    question: '🇯🇵 にほんで いちばん おおきい けんは？',
    options: ['ほっかいどう', 'いわてけん', 'ふくしまけん', 'ながのけん'],
    correctAnswer: 'いわてけん',
    explanation: 'いわてけんが にほんで いちばん おおきい けんなんだよ！',
    funFact: 'ほっかいどうは けんじゃなくて どうだから、けんでは いわてけんが いちばん！',
    emoji: '🗾'
  },

  // 科学の豆知識
  {
    category: 'science',
    difficulty: 2,
    question: '💎 ダイヤモンドと えんぴつの しんは おなじもの？',
    options: ['ほんとう', 'うそ', 'にている', 'ぜんぜんちがう'],
    correctAnswer: 'ほんとう',
    explanation: 'ダイヤモンドと えんぴつの しんは どちらも たんそで できているんだよ！',
    funFact: 'ならびかたが ちがうだけで、せかいで いちばん かたいものと やわらかいものに なるんだ！',
    emoji: '💎'
  },
  {
    category: 'science',
    difficulty: 3,
    question: '🔥 せかいで いちばん あつい ばしょは？',
    options: ['たいようの ひょうめん', 'ちきゅうの ちゅうしん', 'かざんの なか', 'さばくの すな'],
    correctAnswer: 'ちきゅうの ちゅうしん',
    explanation: 'ちきゅうの ちゅうしんは 6000どで、たいようの ひょうめんより あついんだよ！',
    funFact: 'きんぞくも こおりも ぜんぶ とけちゃう あつさなんだ！',
    emoji: '🌍'
  },

  // 上級レベル用の謎解き問題（難易度4）
  {
    category: 'animals',
    difficulty: 3,
    question: '🦋 ちょうちょは どうやって あじを かんじる？',
    options: ['はねで', 'あしで', 'しっぽで', 'はなで'],
    correctAnswer: 'あしで',
    explanation: 'ちょうちょは あしに あじを かんじる きかんが あって、はなに とまったときに あまいかどうか わかるんだよ！',
    funFact: 'にんげんより 2000ばいも あまいものを かんじることが できるんだ！',
    emoji: '🦋'
  },
  {
    category: 'space',
    difficulty: 3,
    question: '🌟 よるそらで いちばん あかるい ほしは？',
    options: ['ほくきょくしつ', 'シリウス', 'ベガ', 'スピカ'],
    correctAnswer: 'シリウス',
    explanation: 'シリウスは よるそらで いちばん あかるく みえる ほしなんだよ！',
    funFact: 'たいようの 25ばいも あかるくて、8.6こうねん はなれた ところに あるんだ！',
    emoji: '⭐'
  },
  {
    category: 'science',
    difficulty: 3,
    question: '🧲 じしゃくが いつも きたを むくのは なぜ？',
    options: ['ちきゅうが じしゃくだから', 'かぜが ふくから', 'たいようが あるから', 'つきが あるから'],
    correctAnswer: 'ちきゅうが じしゃくだから',
    explanation: 'ちきゅう ぜんたいが おおきな じしゃくに なっていて、じしゃくの はりが ちきゅうの きたを むくんだよ！',
    funFact: 'ちきゅうの じしゃくの ちからは とても よわくて、れいぞうこの じしゃくの ほうが つよいんだ！',
    emoji: '🧲'
  },

  // 超上級レベル用の問題（難易度5）
  {
    category: 'animals',
    difficulty: 3,
    question: '🐙 タコの しんぞうは いくつ？',
    options: ['1つ', '2つ', '3つ', '4つ'],
    correctAnswer: '3つ',
    explanation: 'タコには しんぞうが 3つ あって、2つは えらに ちを おくり、1つは からだ ぜんたいに ちを おくるんだよ！',
    funFact: 'だから タコは とても はやく およぐことが できるけど、つかれやすいんだ！',
    emoji: '🐙'
  },
  {
    category: 'space',
    difficulty: 3,
    question: '🌌 ぎんがけいには ほしが なんこ ある？',
    options: ['100おく こ', '1000おく こ', '2000おく こ', '10000おく こ'],
    correctAnswer: '2000おく こ',
    explanation: 'わたしたちの ぎんがけいには やく 2000おくこの ほしが あるんだよ！',
    funFact: 'そのなかで たいようみたいな ほしは 10パーセントぐらいしか ないんだ！',
    emoji: '🌌'
  },
  {
    category: 'science',
    difficulty: 3,
    question: '⚡ かみなりの でんきは どのくらい？',
    options: ['かでんせいひん 1かげつぶん', 'かでんせいひん 1ねんぶん', 'かでんせいひん 10ねんぶん', 'かでんせいひん 100ねんぶん'],
    correctAnswer: 'かでんせいひん 1かげつぶん',
    explanation: 'かみなり いっぽんの でんきで いえの かでんせいひんを 1かげつ つかうことが できるんだよ！',
    funFact: 'でも かみなりは 0.2びょうしか つづかないから、でんきを ためるのは とても むずかしいんだ！',
    emoji: '⚡'
  }
];

export class TriviaQuestionGenerator {
  // カテゴリ別問題生成
  static generateByCategory(category: string): Question[] {
    const categoryQuestions = triviaQuestions.filter(q => q.category === category);
    return this.convertToQuestions(categoryQuestions);
  }

  // 難易度別問題生成
  static generateByDifficulty(difficulty: 1 | 2 | 3): Question[] {
    const difficultyQuestions = triviaQuestions.filter(q => q.difficulty === difficulty);
    return this.convertToQuestions(difficultyQuestions);
  }

  // ランダム問題生成
  static generateRandom(count: number = 10): Question[] {
    const shuffled = this.shuffleArray([...triviaQuestions]);
    return this.convertToQuestions(shuffled.slice(0, count));
  }

  // 小学校低学年向け（難易度1-2）
  static generateForBeginners(): Question[] {
    const beginnerQuestions = triviaQuestions.filter(q => q.difficulty <= 2);
    return this.convertToQuestions(this.shuffleArray(beginnerQuestions).slice(0, 12));
  }

  // 小学校高学年向け（難易度2-3）
  static generateForAdvanced(): Question[] {
    const advancedQuestions = triviaQuestions.filter(q => q.difficulty >= 2);
    return this.convertToQuestions(this.shuffleArray(advancedQuestions).slice(0, 12));
  }

  // 謎解きクイズ（難易度4）
  static generateMysteryQuiz(): Question[] {
    const mysteryQuestions = triviaQuestions.filter(q => q.difficulty === 3);
    return this.convertToQuestions(this.shuffleArray(mysteryQuestions).slice(0, 10));
  }

  // 超上級クイズ（難易度5）
  static generateSuperExpert(): Question[] {
    const superExpertQuestions = triviaQuestions.filter(q => q.difficulty === 3);
    return this.convertToQuestions(this.shuffleArray(superExpertQuestions).slice(0, 8));
  }

  // レベルID別問題生成
  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'trivia-beginner':
        return this.generateForBeginners();
      case 'trivia-advanced':
        return this.generateForAdvanced();
      case 'trivia-mystery':
        return this.generateMysteryQuiz();
      case 'trivia-super-expert':
        return this.generateSuperExpert();
      case 'trivia-animals':
        return this.generateByCategory('animals');
      case 'trivia-nature':
        return this.generateByCategory('nature');
      case 'trivia-space':
        return this.generateByCategory('space');
      case 'trivia-body':
        return this.generateByCategory('body');
      case 'trivia-food':
        return this.generateByCategory('food');
      case 'trivia-world':
        return this.generateByCategory('world');
      case 'trivia-science':
        return this.generateByCategory('science');
      default:
        return this.generateRandom();
    }
  }

  // 豆知識データをQuestion形式に変換
  private static convertToQuestions(triviaData: TriviaData[]): Question[] {
    return triviaData.map((trivia, index) => ({
      id: `trivia-${trivia.category}-${index}`,
      type: 'japanese' as const,
      subtype: 'trivia-quiz',
      question: trivia.question,
      options: trivia.options,
      correctAnswer: trivia.correctAnswer,
      visualAid: {
        type: 'trivia-display',
        content: {
          emoji: trivia.emoji,
          category: trivia.category,
          difficulty: trivia.difficulty,
          explanation: trivia.explanation,
          funFact: trivia.funFact
        },
        position: 'top'
      },
      points: trivia.difficulty * 10
    }));
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

// 豆知識クイズ用視覚化関数
export const generateTriviaVisual = (question: Question): string => {
  if (!question.visualAid || question.visualAid.type !== 'trivia-display') {
    return '';
  }

  const { emoji, category, difficulty, explanation, funFact } = question.visualAid.content as {
    emoji: string;
    category: string;
    difficulty: number;
    explanation: string;
    funFact: string;
  };

  const categoryNames = {
    animals: 'どうぶつ',
    nature: 'しぜん',
    space: 'うちゅう',
    body: 'からだ',
    food: 'たべもの',
    world: 'せかい',
    science: 'かがく',
    history: 'れきし'
  };

  const difficultyStars = '⭐'.repeat(difficulty);

  return `
    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-4 shadow-lg">
      <div class="text-center mb-6">
        <div class="text-8xl mb-3">${emoji}</div>
        <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
          <span class="text-lg font-bold text-orange-600">${categoryNames[category as keyof typeof categoryNames] || 'まめちしき'}</span>
          <span class="text-yellow-500">${difficultyStars}</span>
        </div>
      </div>
      
      <div class="text-center bg-white rounded-xl p-4 shadow-inner mb-4">
        <div class="text-lg text-gray-700">
          クイズに こたえて まめちしきを ふやそう！
        </div>
      </div>
      
      <div class="grid grid-cols-1 gap-3">
        <div class="bg-blue-100 rounded-xl p-3 text-center">
          <div class="text-sm font-bold text-blue-600 mb-1">🤔 かんがえてみよう</div>
          <div class="text-gray-700">どれが せいかい かな？</div>
        </div>
      </div>
    </div>
  `;
};

// 正解後の解説表示用関数
export const generateTriviaExplanation = (triviaData: { explanation: string, funFact: string, emoji: string }): string => {
  return `
    <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mt-4 shadow-lg animate-bounce-in">
      <div class="text-center mb-4">
        <div class="text-6xl mb-2">${triviaData.emoji}</div>
        <div class="text-xl font-bold text-green-600">🎉 せいかい！</div>
      </div>
      
      <div class="bg-white rounded-xl p-4 shadow-inner mb-4">
        <div class="text-center mb-2">
          <div class="text-lg font-bold text-blue-600">💡 せつめい</div>
        </div>
        <div class="text-gray-800 leading-relaxed">
          ${triviaData.explanation}
        </div>
      </div>
      
      <div class="bg-yellow-100 rounded-xl p-4 shadow-inner">
        <div class="text-center mb-2">
          <div class="text-lg font-bold text-orange-600">✨ まめちしき</div>
        </div>
        <div class="text-gray-800 leading-relaxed">
          ${triviaData.funFact}
        </div>
      </div>
      
      <div class="text-center mt-4 text-sm text-gray-600">
        すごいね！あたらしい ちしきを おぼえたよ！
      </div>
    </div>
  `;
};