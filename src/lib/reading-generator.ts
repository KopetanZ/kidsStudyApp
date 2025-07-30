import { Question } from '@/types';

// 文章読解問題用データ
export interface ReadingPassageData {
  title: string;
  content: string;
  level: number;
  type: 'short-sentence' | 'simple-story' | 'dialogue' | 'description';
  mainIdea: string;
  characters?: string[];
  setting?: string;
}

export const readingPassages: ReadingPassageData[] = [
  // レベル1: 短文読解（1-2文）
  {
    title: 'ねこのたま',
    content: 'たまはしろいねこです。まいにちおにわであそびます。',
    level: 1,
    type: 'short-sentence',
    mainIdea: 'ねこのたまについて',
    characters: ['たま'],
    setting: 'おにわ'
  },
  {
    title: 'あさごはん',
    content: 'きょうのあさごはんはパンとぎゅうにゅうです。とてもおいしいです。',
    level: 1,
    type: 'short-sentence',
    mainIdea: 'あさごはんについて'
  },
  {
    title: 'そらのいろ',
    content: 'きょうのそらはとてもあおいです。しろいくもがういています。',
    level: 1,
    type: 'description',
    mainIdea: 'そらのようす'
  },
  {
    title: 'ともだち',
    content: 'ゆきちゃんはわたしのともだちです。いっしょにあそぶのがたのしいです。',
    level: 1,
    type: 'short-sentence',
    mainIdea: 'ともだちについて',
    characters: ['ゆきちゃん', 'わたし']
  },

  // レベル2: 簡単な物語（3-4文）
  {
    title: 'はなのみずやり',
    content: 'たろうくんはまいにちはなにみずをやります。あかいはなとしろいはながさいています。はなはとてもげんきです。たろうくんはうれしいです。',
    level: 2,
    type: 'simple-story',
    mainIdea: 'はなのみずやり',
    characters: ['たろうくん'],
    setting: 'にわ'
  },
  {
    title: 'おかいもの',
    content: 'おかあさんといっしょにおみせにいきました。りんごとバナナをかいました。おうちにかえってたべました。とてもおいしかったです。',
    level: 2,
    type: 'simple-story',
    mainIdea: 'おかいもの',
    characters: ['おかあさん', 'わたし'],
    setting: 'おみせ'
  },
  {
    title: 'あめのひ',
    content: 'きょうはあめがふっています。そとであそべません。おうちでほんをよみました。おもしろいおはなしでした。',
    level: 2,
    type: 'simple-story',
    mainIdea: 'あめのひのすごしかた',
    setting: 'おうち'
  },

  // レベル3: 会話・複雑な物語（5-6文）
  {
    title: 'こうえんであそぼう',
    content: 'はなちゃんがいいました。「こうえんであそびませんか。」たけしくんは「はいいきましょう。」といいました。ふたりはこうえんにいきました。すべりだいやブランコであそびました。とてもたのしかったです。またあしたもあそぼうとやくそくしました。',
    level: 3,
    type: 'dialogue',
    mainIdea: 'こうえんであそぶ',
    characters: ['はなちゃん', 'たけしくん'],
    setting: 'こうえん'
  },
  {
    title: 'おたんじょうび',
    content: 'きょうはゆうきくんのおたんじょうびです。ともだちがたくさんきました。おかあさんがケーキをつくってくれました。ろうそくをふいてねがいごとをしました。みんなでうたをうたいました。とてもたのしいおたんじょうびでした。',
    level: 3,
    type: 'simple-story',
    mainIdea: 'おたんじょうびパーティー',
    characters: ['ゆうきくん', 'ともだち', 'おかあさん'],
    setting: 'おうち'
  }
];

export class ReadingQuestionGenerator {
  // レベル1: 短文読解問題
  static generateReadingLevel1(): Question[] {
    const questions: Question[] = [];
    const level1Passages = readingPassages.filter(p => p.level === 1);

    level1Passages.forEach((passage, index) => {
      // 主人公を答える問題
      if (passage.characters && passage.characters.length > 0) {
        questions.push({
          id: `reading-character-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `このぶんしょうのしゅじんこうはだれですか？`,
          correctAnswer: passage.characters[0],
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'character'
            },
            position: 'top'
          },
          points: 15
        });
      }

      // 内容理解問題
      if (passage.type === 'description' && passage.title === 'そらのいろ') {
        questions.push({
          id: `reading-content-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `そらのいろはなにいろですか？`,
          options: ['あかい', 'あおい', 'みどり', 'きいろ'],
          correctAnswer: 'あおい',
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'content'
            },
            position: 'top'
          },
          points: 20
        });
      }

      if (passage.title === 'あさごはん') {
        questions.push({
          id: `reading-food-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `あさごはんはなにをたべましたか？`,
          options: ['パンとぎゅうにゅう', 'ごはんとみそしる', 'シリアルとジュース', 'たまごとパン'],
          correctAnswer: 'パンとぎゅうにゅう',
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'content'
            },
            position: 'top'
          },
          points: 20
        });
      }
    });

    return this.shuffleArray(questions).slice(0, 8);
  }

  // レベル2: 簡単な物語理解
  static generateReadingLevel2(): Question[] {
    const questions: Question[] = [];
    const level2Passages = readingPassages.filter(p => p.level === 2);

    level2Passages.forEach((passage, index) => {
      // 行動・活動に関する問題
      if (passage.title === 'はなのみずやり') {
        questions.push({
          id: `reading-action-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `たろうくんはまいにちなにをしますか？`,
          options: ['はなにみずをやる', 'はなをつむ', 'はなをうえる', 'はなのしゃしんをとる'],
          correctAnswer: 'はなにみずをやる',
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'action'
            },
            position: 'top'
          },
          points: 25
        });

        questions.push({
          id: `reading-feeling-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `たろうくんのきもちはどうですか？`,
          options: ['うれしい', 'かなしい', 'おこっている', 'こまっている'],
          correctAnswer: 'うれしい',
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'emotion'
            },
            position: 'top'
          },
          points: 25
        });
      }

      if (passage.title === 'おかいもの') {
        questions.push({
          id: `reading-shopping-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `なにをかいましたか？`,
          options: ['りんごとバナナ', 'りんごとみかん', 'バナナといちご', 'みかんといちご'],
          correctAnswer: 'りんごとバナナ',
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'content'
            },
            position: 'top'
          },
          points: 25
        });
      }

      if (passage.title === 'あめのひ') {
        questions.push({
          id: `reading-weather-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `あめのひになにをしましたか？`,
          options: ['ほんをよんだ', 'テレビをみた', 'えをかいた', 'おんがくをきいた'],
          correctAnswer: 'ほんをよんだ',
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'action'
            },
            position: 'top'
          },
          points: 25
        });
      }
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  // レベル3: 会話・複雑な物語理解
  static generateReadingLevel3(): Question[] {
    const questions: Question[] = [];
    const level3Passages = readingPassages.filter(p => p.level === 3);

    level3Passages.forEach((passage, index) => {
      if (passage.title === 'こうえんであそぼう') {
        questions.push({
          id: `reading-invitation-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `だれがこうえんであそぼうとさそいましたか？`,
          options: ['はなちゃん', 'たけしくん', 'ふたりとも', 'わからない'],
          correctAnswer: 'はなちゃん',
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'dialogue'
            },
            position: 'top'
          },
          points: 30
        });

        questions.push({
          id: `reading-playground-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `こうえんでなにであそびましたか？`,
          options: ['すべりだいとブランコ', 'サッカーとやきゅう', 'おにごっことかくれんぼ', 'てつぼうとうんてい'],
          correctAnswer: 'すべりだいとブランコ',
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'action'
            },
            position: 'top'
          },
          points: 30
        });
      }

      if (passage.title === 'おたんじょうび') {
        questions.push({
          id: `reading-birthday-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `だれのおたんじょうびでしたか？`,
          options: ['ゆうきくん', 'ともだち', 'おかあさん', 'みんな'],
          correctAnswer: 'ゆうきくん',
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'character'
            },
            position: 'top'
          },
          points: 30
        });

        questions.push({
          id: `reading-cake-${index}`,
          type: 'japanese',
          subtype: 'reading-comprehension',
          question: `ケーキをつくったのはだれですか？`,
          options: ['おかあさん', 'ゆうきくん', 'ともだち', 'みんなで'],
          correctAnswer: 'おかあさん',
          visualAid: {
            type: 'reading-passage-display',
            content: {
              title: passage.title,
              content: passage.content,
              highlightType: 'character'
            },
            position: 'top'
          },
          points: 30
        });
      }
    });

    return this.shuffleArray(questions).slice(0, 8);
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'reading-level-1':
        return this.generateReadingLevel1();
      case 'reading-level-2':
        return this.generateReadingLevel2();
      case 'reading-level-3':
        return this.generateReadingLevel3();
      default:
        return this.generateReadingLevel1();
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

// 文章読解用視覚化関数
export const generateReadingVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  if (question.visualAid.type === 'reading-passage-display') {
    const { title, content, highlightType } = question.visualAid.content as {
      title: string;
      content: string;
      highlightType: 'character' | 'content' | 'action' | 'emotion' | 'dialogue';
    };

    // ハイライト用の文字色設定
    const highlightColors = {
      character: 'text-blue-600',
      content: 'text-green-600',
      action: 'text-orange-600',
      emotion: 'text-pink-600',
      dialogue: 'text-purple-600'
    };

    // 文章にハイライトを適用（簡単な実装）
    let highlightedContent = content;
    
    // 基本的なハイライト処理
    if (highlightType === 'character') {
      highlightedContent = content.replace(/(たま|たろうくん|はなちゃん|たけしくん|ゆうきくん|ゆきちゃん|おかあさん)/g, 
        `<span class="${highlightColors.character} font-bold">$1</span>`);
    } else if (highlightType === 'action') {
      highlightedContent = content.replace(/(あそびます|みずをやります|よみました|かいました|あそびました)/g,
        `<span class="${highlightColors.action} font-bold">$1</span>`);
    } else if (highlightType === 'emotion') {
      highlightedContent = content.replace(/(うれしい|たのしい|おいしい|げんき)/g,
        `<span class="${highlightColors.emotion} font-bold">$1</span>`);
    } else if (highlightType === 'dialogue') {
      highlightedContent = content.replace(/(「[^」]*」)/g,
        `<span class="${highlightColors.dialogue} font-bold">$1</span>`);
    }

    return `
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="inline-block bg-white rounded-xl px-4 py-2 shadow-md">
            <h3 class="text-xl font-bold text-gray-800 mb-1">${title}</h3>
            <div class="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-inner">
          <div class="text-lg leading-relaxed text-gray-800 font-medium">
            ${highlightedContent.split('。').map((sentence, index) => {
              if (sentence.trim()) {
                return `<p class="mb-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">${sentence.trim()}。</p>`;
              }
              return '';
            }).join('')}
          </div>
        </div>
        
        <div class="text-center mt-4">
          <div class="inline-flex items-center gap-2 text-sm text-gray-600 bg-white rounded-full px-4 py-2 shadow-sm">
            <span class="text-blue-500">📖</span>
            よくよんでからこたえてね
          </div>
        </div>
      </div>
    `;
  }

  return '';
};