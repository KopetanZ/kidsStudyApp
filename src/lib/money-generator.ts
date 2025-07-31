import { Question } from '@/types';

// 日本の通貨データ
export interface CoinData {
  value: number;
  name: string;
  emoji: string;
  color: string;
}

export const japaneseCoins: CoinData[] = [
  { value: 1, name: '1えん', emoji: '🪙', color: '#C0C0C0' },
  { value: 5, name: '5えん', emoji: '🟤', color: '#CD7F32' },
  { value: 10, name: '10えん', emoji: '🪙', color: '#B87333' },
  { value: 50, name: '50えん', emoji: '⚪', color: '#E5E4E2' },
  { value: 100, name: '100えん', emoji: '🪙', color: '#C0C0C0' },
  { value: 500, name: '500えん', emoji: '🟡', color: '#FFD700' }
];

export const japaneseBills: CoinData[] = [
  { value: 1000, name: '1000えん', emoji: '💴', color: '#8FBC8F' },
  { value: 5000, name: '5000えん', emoji: '💵', color: '#87CEEB' },
  { value: 10000, name: '10000えん', emoji: '💶', color: '#F4A460' }
];

export class MoneyQuestionGenerator {
  // レベル1: 硬貨の認識（1円〜100円）
  static generateMoneyLevel1(): Question[] {
    const questions: Question[] = [];
    const basicCoins = japaneseCoins.filter(coin => coin.value <= 100);
    
    basicCoins.forEach((coin, index) => {
      // 4択選択肢を生成
      const generateOptions = (correctValue: number): string[] => {
        const options = [`${correctValue}えん`];
        const otherValues = basicCoins
          .map(c => c.value)
          .filter(v => v !== correctValue);
        
        // ランダムに3つの間違った選択肢を追加
        while (options.length < 4 && otherValues.length > 0) {
          const randomIndex = Math.floor(Math.random() * otherValues.length);
          const wrongValue = otherValues[randomIndex];
          options.push(`${wrongValue}えん`);
          otherValues.splice(randomIndex, 1);
        }
        
        // 足りない場合は適当な値を追加
        while (options.length < 4) {
          const randomValue = [2, 3, 20, 30, 200, 300][Math.floor(Math.random() * 6)];
          if (!options.includes(`${randomValue}えん`)) {
            options.push(`${randomValue}えん`);
          }
        }
        
        return this.shuffleArray(options);
      };

      // 硬貨認識問題（4択）
      questions.push({
        id: `money-coin-${coin.value}`,
        type: 'math',
        subtype: 'money-recognition',
        question: `このこうかは いくら？`,
        options: generateOptions(coin.value),
        correctAnswer: `${coin.value}えん`,
        visualAid: {
          type: 'money-coin-display',
          content: {
            coin: coin,
            showValue: false
          },
          position: 'top'
        },
        points: 10
      });

      // 硬貨の数え方問題（4択）
      if (coin.value <= 10) {
        for (let count = 2; count <= 5; count++) {
          const correctTotal = coin.value * count;
          const generateCountOptions = (correctValue: number): string[] => {
            const options = [`${correctValue}えん`];
            
            // 間違った選択肢を生成（±1枚、±2枚、間違った硬貨での計算など）
            const wrongOptions = [
              `${correctValue + coin.value}えん`, // +1枚
              `${correctValue - coin.value}えん`, // -1枚
              `${correctValue * 2}えん`, // 2倍
              `${Math.max(1, correctValue - coin.value * 2)}えん`, // -2枚
              `${correctValue + 5}えん`, // +5円
              `${Math.max(1, correctValue - 5)}えん` // -5円
            ];
            
            // 負の値や重複を除いて3つ選択
            const validWrongOptions = wrongOptions
              .filter(opt => !opt.includes('-') && opt !== `${correctValue}えん`)
              .slice(0, 3);
            
            options.push(...validWrongOptions);
            
            return this.shuffleArray(options.slice(0, 4));
          };

          questions.push({
            id: `money-count-${coin.value}-${count}`,
            type: 'math',
            subtype: 'money-counting',
            question: `${coin.name}が ${count}まい あります。ぜんぶで いくら？`,
            options: generateCountOptions(correctTotal),
            correctAnswer: `${correctTotal}えん`,
            visualAid: {
              type: 'money-coin-counting',
              content: {
                coin: coin,
                count: count,
                total: correctTotal
              },
              position: 'top'
            },
            points: 15
          });
        }
      }
    });

    return this.shuffleArray(questions).slice(0, 12);
  }

  // レベル2: 硬貨の組み合わせ（100円以下）
  static generateMoneyLevel2(): Question[] {
    const questions: Question[] = [];
    
    // よくある組み合わせパターン
    const combinations = [
      { coins: [{ value: 100, count: 1 }, { value: 10, count: 2 }], total: 120 },
      { coins: [{ value: 50, count: 1 }, { value: 10, count: 3 }], total: 80 },
      { coins: [{ value: 100, count: 1 }, { value: 50, count: 1 }], total: 150 },
      { coins: [{ value: 10, count: 5 }], total: 50 },
      { coins: [{ value: 50, count: 2 }, { value: 10, count: 1 }], total: 110 },
      { coins: [{ value: 100, count: 1 }, { value: 10, count: 4 }], total: 140 }
    ];

    combinations.forEach((combo, index) => {
      // 組み合わせ問題用の4択選択肢生成
      const generateComboOptions = (correctValue: number): string[] => {
        const options = [`${correctValue}えん`];
        
        // 間違った選択肢を生成
        const wrongOptions = [
          `${correctValue + 10}えん`,
          `${correctValue - 10}えん`,
          `${correctValue + 20}えん`,
          `${Math.max(10, correctValue - 20)}えん`,
          `${correctValue + 50}えん`,
          `${Math.max(10, correctValue - 50)}えん`
        ];
        
        // 負の値や重複を除いて3つ選択
        const validWrongOptions = wrongOptions
          .filter(opt => !opt.includes('-') && opt !== `${correctValue}えん`)
          .slice(0, 3);
        
        options.push(...validWrongOptions);
        
        return this.shuffleArray(options.slice(0, 4));
      };

      questions.push({
        id: `money-combo-${index}`,
        type: 'math',
        subtype: 'money-combination',
        question: `このこうかを ぜんぶ たすと いくら？`,
        options: generateComboOptions(combo.total),
        correctAnswer: `${combo.total}えん`,
        visualAid: {
          type: 'money-combination-display',
          content: {
            coinGroups: combo.coins,
            total: combo.total,
            showCalculation: true
          },
          position: 'top'
        },
        points: 20
      });
    });

    return this.shuffleArray(questions);
  }

  // レベル3: 買い物とお釣り（簡単な計算）
  static generateMoneyLevel3(): Question[] {
    const questions: Question[] = [];
    
    // 買い物シチュエーション
    const shoppingItems = [
      { item: 'あめ', price: 10, emoji: '🍬' },
      { item: 'ガム', price: 20, emoji: '🫧' },
      { item: 'ジュース', price: 50, emoji: '🧃' },
      { item: 'パン', price: 80, emoji: '🥖' },
      { item: 'おにぎり', price: 100, emoji: '🍙' },
      { item: 'ノート', price: 120, emoji: '📓' }
    ];

    shoppingItems.forEach((item, index) => {
      // 買い物問題用の4択選択肢生成
      const generateShoppingOptions = (correctPrice: number): string[] => {
        const options = [`${correctPrice}えん`];
        
        // 間違った選択肢（近い価格）
        const wrongOptions = [
          `${correctPrice + 10}えん`,
          `${Math.max(5, correctPrice - 10)}えん`,
          `${correctPrice + 20}えん`,
          `${Math.max(5, correctPrice - 20)}えん`,
          `${correctPrice * 2}えん`,
          `${Math.ceil(correctPrice / 2)}えん`
        ];
        
        const validWrongOptions = wrongOptions
          .filter(opt => !opt.includes('-') && opt !== `${correctPrice}えん`)
          .slice(0, 3);
        
        options.push(...validWrongOptions);
        
        return this.shuffleArray(options.slice(0, 4));
      };

      // 簡単な買い物問題（4択）
      questions.push({
        id: `money-shopping-${index}`,
        type: 'math',
        subtype: 'money-shopping',
        question: `${item.item}を かいます。いくら でしょう？`,
        options: generateShoppingOptions(item.price),
        correctAnswer: `${item.price}えん`,
        visualAid: {
          type: 'money-shopping-display',
          content: {
            item: item.item,
            price: item.price,
            emoji: item.emoji,
            showPrice: false
          },
          position: 'top'
        },
        points: 15
      });

      // お釣り計算（簡単なパターン・4択）
      if (item.price <= 80) {
        const payment = 100;
        const change = payment - item.price;
        
        const generateChangeOptions = (correctChange: number): string[] => {
          const options = [`${correctChange}えん`];
          
          // お釣り計算の間違いパターン
          const wrongOptions = [
            `${correctChange + 10}えん`,
            `${Math.max(0, correctChange - 10)}えん`,
            `${payment}えん`, // 支払い金額と間違える
            `${item.price}えん`, // 商品価格と間違える
            `${correctChange + 5}えん`,
            `${Math.max(0, correctChange - 5)}えん`
          ];
          
          const validWrongOptions = wrongOptions
            .filter(opt => opt !== `${correctChange}えん`)
            .slice(0, 3);
          
          options.push(...validWrongOptions);
          
          return this.shuffleArray(options.slice(0, 4));
        };

        questions.push({
          id: `money-change-${index}`,
          type: 'math',
          subtype: 'money-change',
          question: `${item.item}を ${item.price}えんで かいました。100えん はらったら おつりは いくら？`,
          options: generateChangeOptions(change),
          correctAnswer: `${change}えん`,
          visualAid: {
            type: 'money-change-display',
            content: {
              item: item.item,
              price: item.price,
              payment: payment,
              change: change,
              emoji: item.emoji
            },
            position: 'top'
          },
          points: 25
        });
      }
    });

    return this.shuffleArray(questions).slice(0, 10);
  }

  static generateQuestionsByLevelId(levelId: string): Question[] {
    switch (levelId) {
      case 'money-level-1':
        return this.generateMoneyLevel1();
      case 'money-level-2':
        return this.generateMoneyLevel2();
      case 'money-level-3':
        return this.generateMoneyLevel3();
      default:
        return this.generateMoneyLevel1();
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

// お金学習用視覚化関数
export const generateMoneyVisual = (question: Question): string => {
  if (!question.visualAid) {
    return '';
  }

  // 硬貨表示
  if (question.visualAid.type === 'money-coin-display') {
    const { coin, showValue } = question.visualAid.content as {
      coin: CoinData;
      showValue: boolean;
    };

    // 実際の硬貨画像があるかチェック
    const coinImagePath = `/images/coins/${coin.value}yen.png`;
    const useImage = false; // 画像が配置されたらtrueに変更

    return `
      <div class="bg-green-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">このこうかは いくら？</div>
        
        <div class="flex justify-center mb-6">
          <div class="bg-white rounded-full p-8 shadow-lg border-4 border-green-200 w-32 h-32 flex items-center justify-center">
            <div class="text-center">
              ${useImage ? 
                `<img src="${coinImagePath}" alt="${coin.name}" class="w-20 h-20 object-contain" />` :
                `<div class="text-6xl mb-2">${coin.emoji}</div>`
              }
              ${showValue ? `<div class="text-lg font-bold" style="color: ${coin.color}">${coin.name}</div>` : ''}
            </div>
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-500">
          こうかの ねだん を こたえてね
        </div>
      </div>
    `;
  }

  // 硬貨の数え方表示
  if (question.visualAid.type === 'money-coin-counting') {
    const { coin, count, total } = question.visualAid.content as {
      coin: CoinData;
      count: number;
      total: number;
    };

    return `
      <div class="bg-blue-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">${coin.name}を かぞえよう！</div>
        
        <div class="flex justify-center mb-6">
          ${Array.from({ length: count }, (_, i) => {
            const coinImagePath = `/images/coins/${coin.value}yen.png`;
            const useImage = false; // 画像が配置されたらtrueに変更
            
            return `
              <div class="bg-white rounded-full p-4 shadow-lg border-2 border-blue-200 w-20 h-20 flex items-center justify-center mx-1">
                ${useImage ? 
                  `<img src="${coinImagePath}" alt="${coin.name}" class="w-12 h-12 object-contain" />` :
                  `<div class="text-3xl">${coin.emoji}</div>`
                }
              </div>
            `;
          }).join('')}
        </div>
        
        <div class="text-center mb-4">
          <div class="text-xl text-gray-700">
            ${coin.name} × ${count}まい = ?
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-500">
          ぜんぶで いくら に なるかな？
        </div>
      </div>
    `;
  }

  // 硬貨の組み合わせ表示
  if (question.visualAid.type === 'money-combination-display') {
    const { coinGroups, total, showCalculation } = question.visualAid.content as {
      coinGroups: { value: number; count: number }[];
      total: number;
      showCalculation: boolean;
    };

    return `
      <div class="bg-yellow-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">こうかを ぜんぶ たそう！</div>
        
        <div class="flex justify-center items-center gap-4 mb-6">
          ${coinGroups.map(group => {
            const coinData = japaneseCoins.find(c => c.value === group.value);
            return `
              <div class="text-center">
                <div class="flex justify-center mb-2">
                  ${Array.from({ length: group.count }, () => {
                    const coinImagePath = `/images/coins/${group.value}yen.png`;
                    const useImage = false; // 画像が配置されたらtrueに変更
                    
                    return `
                      <div class="bg-white rounded-full p-2 shadow-lg border-2 border-yellow-200 w-16 h-16 flex items-center justify-center mx-1">
                        ${useImage ? 
                          `<img src="${coinImagePath}" alt="${group.value}えん" class="w-10 h-10 object-contain" />` :
                          `<div class="text-2xl">${coinData?.emoji || '🪙'}</div>`
                        }
                      </div>
                    `;
                  }).join('')}
                </div>
                <div class="text-sm font-bold text-gray-600">${group.value}えん × ${group.count}</div>
              </div>
            `;
          }).join('<div class="text-3xl text-gray-400">+</div>')}
        </div>
        
        ${showCalculation ? `
        <div class="bg-white rounded-xl p-4 shadow-lg">
          <div class="text-center text-lg font-bold text-gray-700">
            ${coinGroups.map(group => `${group.value} × ${group.count} = ${group.value * group.count}`).join(' + ')} = ?
          </div>
        </div>
        ` : ''}
        
        <div class="text-center mt-4 text-sm text-gray-500">
          ぜんぶで いくら に なるかな？
        </div>
      </div>
    `;
  }

  // 買い物表示
  if (question.visualAid.type === 'money-shopping-display') {
    const { item, price, emoji, showPrice } = question.visualAid.content as {
      item: string;
      price: number;
      emoji: string;
      showPrice: boolean;
    };

    return `
      <div class="bg-pink-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">${item}を かいます</div>
        
        <div class="flex justify-center mb-6">
          <div class="bg-white rounded-2xl p-8 shadow-lg border-4 border-pink-200">
            <div class="text-center">
              <div class="text-8xl mb-4">${emoji}</div>
              <div class="text-2xl font-bold text-gray-800">${item}</div>
              ${showPrice ? `<div class="text-xl text-red-600 mt-2">${price}えん</div>` : ''}
            </div>
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-500">
          この ${item} は いくら でしょう？
        </div>
      </div>
    `;
  }

  // お釣り計算表示
  if (question.visualAid.type === 'money-change-display') {
    const { item, price, payment, change, emoji } = question.visualAid.content as {
      item: string;
      price: number;
      payment: number;
      change: number;
      emoji: string;
    };

    return `
      <div class="bg-purple-50 rounded-2xl p-6 mb-4">
        <div class="text-center text-lg font-bold text-gray-700 mb-4">おつりを けいさんしよう！</div>
        
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="text-center">
            <div class="bg-white rounded-xl p-4 shadow-lg border-2 border-purple-200">
              <div class="text-4xl mb-2">${emoji}</div>
              <div class="text-sm text-gray-600">${item}</div>
              <div class="text-lg font-bold text-red-600">${price}えん</div>
            </div>
          </div>
          
          <div class="text-center">
            <div class="bg-white rounded-xl p-4 shadow-lg border-2 border-purple-200">
              <div class="text-4xl mb-2">💴</div>
              <div class="text-sm text-gray-600">はらった</div>
              <div class="text-lg font-bold text-blue-600">${payment}えん</div>
            </div>
          </div>
          
          <div class="text-center">
            <div class="bg-white rounded-xl p-4 shadow-lg border-2 border-purple-200">
              <div class="text-4xl mb-2">💰</div>
              <div class="text-sm text-gray-600">おつり</div>
              <div class="text-lg font-bold text-green-600">？えん</div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-4 shadow-lg">
          <div class="text-center text-lg text-gray-700">
            ${payment}えん - ${price}えん = ？
          </div>
        </div>
        
        <div class="text-center mt-4 text-sm text-gray-500">
          おつりは いくら かな？
        </div>
      </div>
    `;
  }

  return '';
};