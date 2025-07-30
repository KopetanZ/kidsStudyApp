import { Question } from '@/types';

// 理科・観察問題用データ
export interface ScienceObservationData {
  topic: string;
  type: 'nature-observation' | 'animal-study' | 'plant-study' | 'weather' | 'seasons' | 'body-parts' | 'simple-experiment';
  category: 'living' | 'non-living' | 'natural-phenomena' | 'human-body';
  difficulty: number;
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
}

export class ScienceQuestionGenerator {
  // レベル1: 身近な自然観察・生き物の基本
  static generateScienceLevel1(): Question[] {
    const questions: Question[] = [];
    
    // 動物の特徴観察問題
    const animals = [
      { name: 'ねこ', features: ['しっぽがある', 'あしが4ほん', 'ひげがある'], sound: 'にゃあ', emoji: '🐱' },
      { name: 'いぬ', features: ['しっぽがある', 'あしが4ほん', 'はしる'], sound: 'わん', emoji: '🐶' },
      { name: 'とり', features: ['はねがある', 'あしが2ほん', 'そらをとぶ'], sound: 'ちゅん', emoji: '🐦' },
      { name: 'うさぎ', features: ['みみがながい', 'あしが4ほん', 'ぴょんぴょん'], sound: '', emoji: '🐰' },
      { name: 'かえる', features: ['みずにすむ', 'ぴょんぴょん', 'あめがすき'], sound: 'げこ', emoji: '🐸' }
    ];

    animals.forEach((animal, index) => {
      // 動物の特徴問題
      questions.push({
        id: `science-animal-${index}`,
        type: 'japanese',
        subtype: 'science-observation',
        question: `${animal.name}のとくちょうはどれ？`,
        options: [animal.features[0], 'およぐのがじょうず', 'つのがある', 'しましまもよう'],
        correctAnswer: animal.features[0],
        visualAid: {
          type: 'science-animal-display',
          content: {
            animal: animal.name,
            emoji: animal.emoji,
            features: animal.features,
            sound: animal.sound
          },
          position: 'top'
        },
        points: 15
      });

      // 動物の鳴き声問題
      if (animal.sound) {
        questions.push({
          id: `science-sound-${index}`,
          type: 'japanese',
          subtype: 'science-observation',
          question: `${animal.name}はどんなこえで なく？`,
          options: [animal.sound, 'もー', 'こけこっこー', 'わおーん'],
          correctAnswer: animal.sound,
          visualAid: {
            type: 'science-animal-display',
            content: {
              animal: animal.name,
              emoji: animal.emoji,
              features: animal.features,
              sound: animal.sound,
              focusSound: true
            },
            position: 'top'
          },
          points: 15
        });
      }
    });

    // 植物の観察問題
    const plants = [
      { name: 'はな', parts: ['はなびら', 'くき', 'はっぱ'], color: 'あか', emoji: '🌸' },
      { name: 'き', parts: ['えだ', 'みき', 'はっぱ'], color: 'みどり', emoji: '🌳' },
      { name: 'くさ', parts: ['はっぱ', 'ね', 'くき'], color: 'みどり', emoji: '🌱' }
    ];

    plants.forEach((plant, index) => {
      questions.push({
        id: `science-plant-${index}`,
        type: 'japanese',
        subtype: 'science-observation',
        question: `${plant.name}のぶぶんはどれ？`,
        options: [plant.parts[0], 'しっぽ', 'つの', 'はね'],
        correctAnswer: plant.parts[0],
        visualAid: {
          type: 'science-plant-display',
          content: {
            plant: plant.name,
            emoji: plant.emoji,
            parts: plant.parts,
            color: plant.color
          },
          position: 'top'
        },
        points: 15
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  // レベル2: 季節の変化・天気・環境
  static generateScienceLevel2(): Question[] {
    const questions: Question[] = [];
    
    // 季節の特徴問題
    const seasons = [
      { 
        name: 'はる', 
        features: ['さくらがさく', 'あたたかい', 'あたらしいはっぱ'], 
        activities: ['おはなみ', 'ピクニック'],
        emoji: '🌸',
        months: ['3がつ', '4がつ', '5がつ']
      },
      { 
        name: 'なつ', 
        features: ['あつい', 'たいようがつよい', 'せみがなく'], 
        activities: ['およぎ', 'かきごおり'],
        emoji: '☀️',
        months: ['6がつ', '7がつ', '8がつ']
      },
      { 
        name: 'あき', 
        features: ['はっぱがあかい', 'すずしい', 'みのりのとき'], 
        activities: ['もみじがり', 'いもほり'],
        emoji: '🍂',
        months: ['9がつ', '10がつ', '11がつ']
      },
      { 
        name: 'ふゆ', 
        features: ['さむい', 'ゆきがふる', 'きがかれる'], 
        activities: ['ゆきだるま', 'こたつ'],
        emoji: '❄️',
        months: ['12がつ', '1がつ', '2がつ']
      }
    ];

    seasons.forEach((season, index) => {
      // 季節の特徴問題
      questions.push({
        id: `science-season-${index}`,
        type: 'japanese',
        subtype: 'science-observation',
        question: `${season.name}のとくちょうはどれ？`,
        options: [season.features[0], seasons[(index + 1) % 4].features[0], seasons[(index + 2) % 4].features[0], seasons[(index + 3) % 4].features[0]],
        correctAnswer: season.features[0],
        visualAid: {
          type: 'science-season-display',
          content: {
            season: season.name,
            emoji: season.emoji,
            features: season.features,
            activities: season.activities,
            months: season.months
          },
          position: 'top'
        },
        points: 20
      });

      // 季節の活動問題
      questions.push({
        id: `science-activity-${index}`,
        type: 'japanese',
        subtype: 'science-observation',
        question: `${season.name}によくすることはどれ？`,
        options: [season.activities[0], seasons[(index + 1) % 4].activities[0], seasons[(index + 2) % 4].activities[0], seasons[(index + 3) % 4].activities[0]],
        correctAnswer: season.activities[0],
        visualAid: {
          type: 'science-season-display',
          content: {
            season: season.name,
            emoji: season.emoji,
            features: season.features,
            activities: season.activities,
            months: season.months,
            focusActivity: true
          },
          position: 'top'
        },
        points: 20
      });
    });

    // 天気の問題
    const weather = [
      { type: 'はれ', description: 'たいようがでている', feeling: 'あたたかい', emoji: '☀️' },
      { type: 'あめ', description: 'みずがそらからふる', feeling: 'じめじめ', emoji: '🌧️' },
      { type: 'くもり', description: 'そらがくらい', feeling: 'すずしい', emoji: '☁️' },
      { type: 'ゆき', description: 'しろいものがふる', feeling: 'つめたい', emoji: '❄️' }
    ];

    weather.forEach((w, index) => {
      questions.push({
        id: `science-weather-${index}`,
        type: 'japanese',
        subtype: 'science-observation',
        question: `${w.description}てんきはなに？`,
        options: [w.type, weather[(index + 1) % 4].type, weather[(index + 2) % 4].type, weather[(index + 3) % 4].type],
        correctAnswer: w.type,
        visualAid: {
          type: 'science-weather-display',
          content: {
            weather: w.type,
            emoji: w.emoji,
            description: w.description,
            feeling: w.feeling
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions).slice(0, 12);
  }

  // レベル3: からだのしくみ・簡単な実験
  static generateScienceLevel3(): Question[] {
    const questions: Question[] = [];
    
    // 体の部分と働き問題
    const bodyParts = [
      { part: 'め', function: 'みる', description: 'ものをみるのにつかう', emoji: '👁️' },
      { part: 'みみ', function: 'きく', description: 'おとをきくのにつかう', emoji: '👂' },
      { part: 'はな', function: 'におう', description: 'においをかぐのにつかう', emoji: '👃' },
      { part: 'くち', function: 'たべる', description: 'たべものをたべるのにつかう', emoji: '👄' },
      { part: 'て', function: 'つかむ', description: 'ものをもつのにつかう', emoji: '✋' },
      { part: 'あし', function: 'あるく', description: 'あるくのにつかう', emoji: '🦵' }
    ];

    bodyParts.forEach((part, index) => {
      questions.push({
        id: `science-body-${index}`,
        type: 'japanese',
        subtype: 'science-observation',
        question: `${part.part}はなにをするのにつかう？`,
        options: [part.function, bodyParts[(index + 1) % 6].function, bodyParts[(index + 2) % 6].function, bodyParts[(index + 3) % 6].function],
        correctAnswer: part.function,
        visualAid: {
          type: 'science-body-display',
          content: {
            bodyPart: part.part,
            emoji: part.emoji,
            function: part.function,
            description: part.description
          },
          position: 'top'
        },
        points: 25
      });
    });

    // 簡単な科学現象問題
    const phenomena = [
      { 
        phenomenon: 'かげ', 
        cause: 'たいようのひかり', 
        description: 'ひかりがものにあたるとできる', 
        example: 'きのかげ',
        emoji: '🌳'
      },
      { 
        phenomenon: 'みずのこおり', 
        cause: 'つめたさ', 
        description: 'みずがつめたくなるとかたくなる', 
        example: 'こおり',
        emoji: '🧊'
      },
      { 
        phenomenon: 'しゃぼんだま', 
        cause: 'せっけんとみず', 
        description: 'せっけんとみずでまるいたまができる', 
        example: 'ふわふわうく',
        emoji: '🫧'
      }
    ];

    phenomena.forEach((p, index) => {
      questions.push({
        id: `science-phenomena-${index}`,
        type: 'japanese',
        subtype: 'science-observation',
        question: `${p.phenomenon}はなにでできる？`,
        options: [p.cause, phenomena[(index + 1) % 3].cause, phenomena[(index + 2) % 3].cause, 'まほう'],
        correctAnswer: p.cause,
        visualAid: {
          type: 'science-phenomena-display',
          content: {
            phenomenon: p.phenomenon,
            emoji: p.emoji,
            cause: p.cause,
            description: p.description,
            example: p.example
          },
          position: 'top'
        },
        points: 30
      });
    });

    // 生き物の成長問題
    const growth = [
      { 
        living: 'ちょう', 
        stages: ['たまご', 'いもむし', 'さなぎ', 'ちょう'], 
        description: 'たまごからちょうになる',
        emoji: '🦋'
      },
      { 
        living: 'かえる', 
        stages: ['たまご', 'おたまじゃくし', 'こがえる', 'かえる'], 
        description: 'みずのなかでそだつ',
        emoji: '🐸'
      }
    ];

    growth.forEach((g, index) => {
      questions.push({
        id: `science-growth-${index}`,
        type: 'japanese',
        subtype: 'science-observation',
        question: `${g.living}のあかちゃんはなに？`,
        options: [g.stages[1], growth[(index + 1) % 2].stages[1], 'こねこ', 'こいぬ'],
        correctAnswer: g.stages[1],
        visualAid: {
          type: 'science-growth-display',
          content: {
            living: g.living,
            emoji: g.emoji,
            stages: g.stages,
            description: g.description
          },
          position: 'top'
        },
        points: 30
      });
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'science-level-1':
        return this.generateScienceLevel1();
      case 'science-level-2':
        return this.generateScienceLevel2();
      case 'science-level-3':
        return this.generateScienceLevel3();
      default:
        return this.generateScienceLevel1();
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

// 理科・観察用視覚化関数
export const generateScienceVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // 動物の特徴表示
  if (question.visualAid.type === 'science-animal-display') {
    const { animal, emoji, features, sound, focusSound } = question.visualAid.content as {
      animal: string;
      emoji: string;
      features: string[];
      sound: string;
      focusSound?: boolean;
    };

    return `
      <div class="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-8xl mb-3 animate-bounce">${emoji}</div>
          <div class="text-2xl font-bold text-gray-800">${animal}</div>
        </div>
        
        ${focusSound && sound ? `
        <div class="bg-yellow-100 rounded-xl p-4 mb-4 shadow-inner">
          <div class="text-center">
            <div class="text-lg font-bold text-orange-600 mb-2">なきごえ</div>
            <div class="text-3xl font-bold text-red-600">${sound}</div>
          </div>
        </div>
        ` : `
        <div class="bg-white rounded-xl p-4 shadow-inner">
          <div class="text-center mb-3">
            <div class="text-lg font-bold text-green-600">とくちょう</div>
          </div>
          <div class="space-y-2">
            ${features.map(feature => `
              <div class="bg-green-100 rounded-lg p-2 text-center">
                <div class="text-gray-800">${feature}</div>
              </div>
            `).join('')}
          </div>
        </div>
        `}
        
        <div class="text-center mt-4 text-sm text-gray-600">
          ${animal}について かんがえてみよう
        </div>
      </div>
    `;
  }

  // 植物の部分表示
  if (question.visualAid.type === 'science-plant-display') {
    const { plant, emoji, parts, color } = question.visualAid.content as {
      plant: string;
      emoji: string;
      parts: string[];
      color: string;
    };

    return `
      <div class="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-8xl mb-3">${emoji}</div>
          <div class="text-2xl font-bold text-gray-800">${plant}</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner">
          <div class="text-center mb-3">
            <div class="text-lg font-bold text-green-600">${plant}のぶぶん</div>
          </div>
          <div class="grid grid-cols-1 gap-2">
            ${parts.map(part => `
              <div class="bg-emerald-100 rounded-lg p-3 text-center">
                <div class="text-gray-800 font-medium">${part}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="text-center mt-4 text-sm text-gray-600">
          ${plant}の ぶぶんを おぼえよう
        </div>
      </div>
    `;
  }

  // 季節の特徴表示
  if (question.visualAid.type === 'science-season-display') {
    const { season, emoji, features, activities, months, focusActivity } = question.visualAid.content as {
      season: string;
      emoji: string;
      features: string[];
      activities: string[];
      months: string[];
      focusActivity?: boolean;
    };

    return `
      <div class="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-8xl mb-3">${emoji}</div>
          <div class="text-2xl font-bold text-gray-800">${season}</div>
          <div class="text-sm text-gray-600">${months.join('・')}</div>
        </div>
        
        ${focusActivity ? `
        <div class="bg-orange-100 rounded-xl p-4 shadow-inner">
          <div class="text-center mb-3">
            <div class="text-lg font-bold text-orange-600">${season}のあそび</div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            ${activities.map(activity => `
              <div class="bg-white rounded-lg p-3 text-center shadow-sm">
                <div class="text-gray-800 font-medium">${activity}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : `
        <div class="bg-white rounded-xl p-4 shadow-inner">
          <div class="text-center mb-3">
            <div class="text-lg font-bold text-blue-600">${season}のとくちょう</div>
          </div>
          <div class="space-y-2">
            ${features.map(feature => `
              <div class="bg-blue-100 rounded-lg p-2 text-center">
                <div class="text-gray-800">${feature}</div>
              </div>
            `).join('')}
          </div>
        </div>
        `}
        
        <div class="text-center mt-4 text-sm text-gray-600">
          ${season}について かんがえてみよう
        </div>
      </div>
    `;
  }

  // 天気の表示
  if (question.visualAid.type === 'science-weather-display') {
    const { weather, emoji, description, feeling } = question.visualAid.content as {
      weather: string;
      emoji: string;
      description: string;
      feeling: string;
    };

    return `
      <div class="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-8xl mb-3 animate-pulse">${emoji}</div>
          <div class="text-2xl font-bold text-gray-800">${weather}</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner">
          <div class="text-center space-y-3">
            <div class="bg-cyan-100 rounded-lg p-3">
              <div class="text-gray-800">${description}</div>
            </div>
            <div class="bg-blue-100 rounded-lg p-3">
              <div class="text-gray-800">きもち: ${feeling}</div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-4 text-sm text-gray-600">
          てんきを かんさつしよう
        </div>
      </div>
    `;
  }

  // 体の部分と働き表示
  if (question.visualAid.type === 'science-body-display') {
    const { bodyPart, emoji, function: func, description } = question.visualAid.content as {
      bodyPart: string;
      emoji: string;
      function: string;
      description: string;
    };

    return `
      <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-4 shadow-lg">
        <div class="text-center mb-4">
          <div class="text-8xl mb-3">${emoji}</div>
          <div class="text-2xl font-bold text-gray-800">${bodyPart}</div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-inner">
          <div class="text-center space-y-3">
            <div class="bg-pink-100 rounded-lg p-3">
              <div class="text-lg font-bold text-pink-600">はたらき</div>
              <div class="text-gray-800">${func}</div>
            </div>
            <div class="bg-rose-100 rounded-lg p-3">
              <div class="text-gray-800">${description}</div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-4 text-sm text-gray-600">
          からだの ぶぶんを おぼえよう
        </div>
      </div>
    `;
  }

  return '';
};