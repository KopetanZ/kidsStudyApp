// ポケモンテーマ問題ジェネレーター
import { Question } from '@/types';
import { PokemonAPI, Pokemon } from './pokemon-api';

export class PokemonQuestionGenerator {
  private static pokemonAPI = PokemonAPI.getInstance();

  // ポケモンの身長・体重を使った算数問題
  static async generatePokemonMathQuestions(): Promise<Question[]> {
    const questions: Question[] = [];
    
    try {
      // 複数のポケモンを取得
      const pokemon = await this.pokemonAPI.getMultiplePokemon([25, 4, 7, 1, 39, 52]);
      
      if (pokemon.length < 2) return [];

      for (let i = 0; i < Math.min(6, pokemon.length - 1); i++) {
        const pokemon1 = pokemon[i];
        const pokemon2 = pokemon[i + 1];
        
        // 身長比較問題
        const height1 = this.pokemonAPI.getHeightInCm(pokemon1);
        const height2 = this.pokemonAPI.getHeightInCm(pokemon2);
        
        questions.push({
          id: `pokemon-height-${pokemon1.id}-${pokemon2.id}`,
          type: 'math',
          subtype: 'pokemon-comparison',
          question: `${pokemon1.japaneseName}の身長は ${height1}cm、${pokemon2.japaneseName}の身長は ${height2}cm です。どちらが高いでしょう？`,
          options: [pokemon1.japaneseName, pokemon2.japaneseName],
          correctAnswer: height1 > height2 ? pokemon1.japaneseName : pokemon2.japaneseName,
          visualAid: {
            type: 'pokemon-comparison',
            content: {
              pokemon1: {
                name: pokemon1.japaneseName,
                image: this.pokemonAPI.getHighQualityImageUrl(pokemon1),
                height: height1
              },
              pokemon2: {
                name: pokemon2.japaneseName,
                image: this.pokemonAPI.getHighQualityImageUrl(pokemon2),
                height: height2
              },
              comparisonType: 'height'
            }
          },
          points: 15
        });

        // 体重計算問題
        if (i < 3) {
          const weight1 = this.pokemonAPI.getWeightInKg(pokemon1);
          const weight2 = this.pokemonAPI.getWeightInKg(pokemon2);
          const totalWeight = Math.round((weight1 + weight2) * 10) / 10;
          
          questions.push({
            id: `pokemon-weight-${pokemon1.id}-${pokemon2.id}`,
            type: 'math', 
            subtype: 'pokemon-addition',
            question: `${pokemon1.japaneseName}(${weight1}kg)と${pokemon2.japaneseName}(${weight2}kg)の体重の合計は何kgでしょう？`,
            correctAnswer: totalWeight.toString(),
            visualAid: {
              type: 'pokemon-math',
              content: {
                pokemon1: {
                  name: pokemon1.japaneseName,
                  image: this.pokemonAPI.getHighQualityImageUrl(pokemon1),
                  weight: weight1
                },
                pokemon2: {
                  name: pokemon2.japaneseName,
                  image: this.pokemonAPI.getHighQualityImageUrl(pokemon2),
                  weight: weight2
                },
                operation: 'addition',
                result: totalWeight
              }
            },
            points: 20
          });
        }
      }
    } catch (error) {
      console.error('Failed to generate Pokemon math questions:', error);
    }

    return questions;
  }

  // ポケモンタイプを使った分類問題
  static async generatePokemonTypeQuestions(): Promise<Question[]> {
    const questions: Question[] = [];
    
    try {
      // 各タイプから代表的なポケモンを取得
      const fireType = await this.pokemonAPI.getPokemonByType('fire', 3);
      const waterType = await this.pokemonAPI.getPokemonByType('water', 3);
      const grassType = await this.pokemonAPI.getPokemonByType('grass', 3);
      
      if (fireType.length > 0 && waterType.length > 0 && grassType.length > 0) {
        // タイプ判定問題
        const allPokemon = [...fireType, ...waterType, ...grassType];
        
        for (let i = 0; i < Math.min(4, allPokemon.length); i++) {
          const pokemon = allPokemon[i];
          const mainType = pokemon.types[0].type.name;
          const typeJapanese = this.pokemonAPI.getTypeJapaneseName(mainType);
          
          questions.push({
            id: `pokemon-type-${pokemon.id}`,
            type: 'math',
            subtype: 'pokemon-classification',
            question: `${pokemon.japaneseName}のタイプは何でしょう？`,
            options: ['ほのお', 'みず', 'くさ', 'でんき'],
            correctAnswer: typeJapanese,
            visualAid: {
              type: 'pokemon-type-quiz',
              content: {
                pokemon: {
                  name: pokemon.japaneseName,
                  image: this.pokemonAPI.getHighQualityImageUrl(pokemon),
                  types: pokemon.types.map(t => this.pokemonAPI.getTypeJapaneseName(t.type.name))
                }
              }
            },
            points: 10
          });
        }
      }
    } catch (error) {
      console.error('Failed to generate Pokemon type questions:', error);
    }

    return questions;
  }

  // ポケモン名の読み方問題（国語）
  static async generatePokemonReadingQuestions(): Promise<Question[]> {
    const questions: Question[] = [];
    
    // 読み方が特徴的なポケモンのデータ
    const readingData = [
      { id: 25, name: 'ピカチュウ', reading: 'ぴかちゅう', difficulty: 1 },
      { id: 4, name: 'ヒトカゲ', reading: 'ひとかげ', difficulty: 1 },
      { id: 7, name: 'ゼニガメ', reading: 'ぜにがめ', difficulty: 1 },
      { id: 1, name: 'フシギダネ', reading: 'ふしぎだね', difficulty: 2 },
      { id: 104, name: 'カラカラ', reading: 'からから', difficulty: 1 },
      { id: 129, name: 'コイキング', reading: 'こいきんぐ', difficulty: 2 }
    ];

    try {
      for (const data of readingData.slice(0, 4)) {
        const pokemon = await this.pokemonAPI.getPokemon(data.id);
        if (!pokemon) continue;

        // ひらがな読み問題
        questions.push({
          id: `pokemon-reading-${pokemon.id}`,
          type: 'japanese',
          subtype: 'pokemon-reading',
          question: `このポケモンの名前をひらがなで書いてください`,
          correctAnswer: data.reading,
          visualAid: {
            type: 'pokemon-name-quiz',
            content: {
              pokemon: {
                name: data.name,
                image: this.pokemonAPI.getHighQualityImageUrl(pokemon),
                cry: this.pokemonAPI.getPokemonCryUrl(pokemon)
              },
              showName: true
            }
          },
          points: 15
        });

        // 名前の文字数問題
        questions.push({
          id: `pokemon-length-${pokemon.id}`,
          type: 'japanese',
          subtype: 'pokemon-counting',
          question: `${data.name}は何文字でしょう？`,
          options: ['3文字', '4文字', '5文字', '6文字'],
          correctAnswer: `${data.name.length}文字`,
          visualAid: {
            type: 'pokemon-name-quiz',
            content: {
              pokemon: {
                name: data.name,
                image: this.pokemonAPI.getHighQualityImageUrl(pokemon)
              },
              showName: true,
              highlightLength: true
            }
          },
          points: 10
        });
      }
    } catch (error) {
      console.error('Failed to generate Pokemon reading questions:', error);
    }

    return questions;
  }

  // ポケモンの英語名学習問題
  static async generatePokemonEnglishQuestions(): Promise<Question[]> {
    const questions: Question[] = [];
    
    // 英語学習に適したポケモン
    const englishData = [
      { id: 25, japanese: 'ピカチュウ', english: 'Pikachu' },
      { id: 52, japanese: 'ニャース', english: 'Meowth' },
      { id: 54, japanese: 'コダック', english: 'Psyduck' },
      { id: 77, japanese: 'ポニータ', english: 'Ponyta' },
      { id: 104, japanese: 'カラカラ', english: 'Cubone' },
      { id: 113, japanese: 'ラッキー', english: 'Chansey' }
    ];

    try {
      for (const data of englishData.slice(0, 4)) {
        const pokemon = await this.pokemonAPI.getPokemon(data.id);
        if (!pokemon) continue;

        questions.push({
          id: `pokemon-english-${pokemon.id}`,
          type: 'english',
          subtype: 'pokemon-translation',
          question: `${data.japanese}の英語名は何でしょう？`,
          options: [data.english, 'Pikachu', 'Eevee', 'Mew'],
          correctAnswer: data.english,
          visualAid: {
            type: 'pokemon-english-quiz',
            content: {
              pokemon: {
                japanese: data.japanese,
                english: data.english,
                image: this.pokemonAPI.getHighQualityImageUrl(pokemon),
                cry: this.pokemonAPI.getPokemonCryUrl(pokemon)
              }
            }
          },
          points: 20
        });
      }
    } catch (error) {
      console.error('Failed to generate Pokemon English questions:', error);
    }

    return questions;
  }

  // ポケモン進化チェーン問題
  static async generatePokemonEvolutionQuestions(): Promise<Question[]> {
    const questions: Question[] = [];
    
    // 有名な進化チェーン
    const evolutionChains = [
      { base: 1, evolved: 2, final: 3, names: ['フシギダネ', 'フシギソウ', 'フシギバナ'] },
      { base: 4, evolved: 5, final: 6, names: ['ヒトカゲ', 'リザード', 'リザードン'] },
      { base: 7, evolved: 8, final: 9, names: ['ゼニガメ', 'カメール', 'カメックス'] },
      { base: 25, evolved: 26, final: null, names: ['ピカチュウ', 'ライチュウ', null] }
    ];

    try {
      for (const chain of evolutionChains.slice(0, 3)) {
        if (!chain.names[1]) continue; // Skip chains without second evolution
        
        const basePokemon = await this.pokemonAPI.getPokemon(chain.base);
        const evolvedPokemon = await this.pokemonAPI.getPokemon(chain.evolved);
        
        if (!basePokemon || !evolvedPokemon) continue;

        questions.push({
          id: `pokemon-evolution-${chain.base}`,
          type: 'math',
          subtype: 'pokemon-sequence',
          question: `${chain.names[0]}が進化すると何になるでしょう？`,
          options: [chain.names[1]!, chain.names[2] || 'ピカチュウ', 'イーブイ', 'ミュウ'],
          correctAnswer: chain.names[1]!,
          visualAid: {
            type: 'pokemon-evolution',
            content: {
              basePokemon: {
                name: chain.names[0],
                image: this.pokemonAPI.getHighQualityImageUrl(basePokemon)
              },
              evolvedPokemon: {
                name: chain.names[1],
                image: this.pokemonAPI.getHighQualityImageUrl(evolvedPokemon)
              }
            }
          },
          points: 25
        });
      }
    } catch (error) {
      console.error('Failed to generate Pokemon evolution questions:', error);
    }

    return questions;
  }

  // ポケモンの鳴き声クイズ
  static async generatePokemonCryQuestions(): Promise<Question[]> {
    const questions: Question[] = [];
    
    // 特徴的な鳴き声のポケモン
    const cryPokemon = [25, 4, 7, 1, 39, 52, 104]; // ピカチュウ等
    
    try {
      const pokemon = await this.pokemonAPI.getMultiplePokemon(cryPokemon.slice(0, 4));
      
      for (const poke of pokemon) {
        const cryUrl = this.pokemonAPI.getPokemonCryUrl(poke);
        if (!cryUrl) continue;

        // 他のポケモンを選択肢として追加
        const otherPokemon = pokemon.filter(p => p.id !== poke.id).slice(0, 3);
        const options = [poke.japaneseName, ...otherPokemon.map(p => p.japaneseName)];
        
        questions.push({
          id: `pokemon-cry-${poke.id}`,
          type: 'math',
          subtype: 'pokemon-audio',
          question: `この鳴き声はどのポケモンでしょう？🔊`,
          options: this.shuffleArray(options),
          correctAnswer: poke.japaneseName,
          visualAid: {
            type: 'pokemon-cry-quiz',
            content: {
              audioUrl: cryUrl,
              options: options.map(name => {
                const optionPokemon = pokemon.find(p => p.japaneseName === name);
                return {
                  name,
                  image: optionPokemon ? this.pokemonAPI.getHighQualityImageUrl(optionPokemon) : ''
                };
              }),
              correctAnswer: poke.japaneseName
            }
          },
          points: 30
        });
      }
    } catch (error) {
      console.error('Failed to generate Pokemon cry questions:', error);
    }

    return questions;
  }

  // レベルIDに応じたポケモン問題生成
  static async generateQuestionsByLevelId(levelId: string): Promise<Question[]> {
    switch (levelId) {
      case 'pokemon-math-basic':
        return this.generatePokemonMathQuestions();
      case 'pokemon-types':
        return this.generatePokemonTypeQuestions();
      case 'pokemon-reading':
        return this.generatePokemonReadingQuestions();
      case 'pokemon-english':
        return this.generatePokemonEnglishQuestions();
      case 'pokemon-evolution':
        return this.generatePokemonEvolutionQuestions();
      case 'pokemon-cries':
        return this.generatePokemonCryQuestions();
      case 'pokemon-mixed':
        // 複数タイプのミックス
        const [math, types, reading] = await Promise.all([
          this.generatePokemonMathQuestions(),
          this.generatePokemonTypeQuestions(),
          this.generatePokemonReadingQuestions()
        ]);
        return this.shuffleArray([...math.slice(0, 2), ...types.slice(0, 2), ...reading.slice(0, 2)]);
      default:
        return [];
    }
  }

  // ユーティリティ: 配列をシャッフル
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // ポケモン報酬問題（特別な問題で特別なポケモンがもらえる）
  static async generateLegendaryQuestions(): Promise<Question[]> {
    const questions: Question[] = [];
    
    try {
      // 伝説ポケモンに関する特別な問題
      const legendaries = [
        { id: 150, name: 'ミュウツー', question: '人工的に作られた最強のポケモンは？' },
        { id: 151, name: 'ミュウ', question: '幻のポケモンとして有名なピンク色のポケモンは？' },
        { id: 144, name: 'フリーザー', question: '氷タイプの伝説の鳥ポケモンは？' }
      ];

      for (const legendary of legendaries) {
        const pokemon = await this.pokemonAPI.getPokemon(legendary.id);
        if (!pokemon) continue;

        questions.push({
          id: `legendary-${legendary.id}`,
          type: 'math',
          subtype: 'pokemon-legendary',
          question: legendary.question,
          options: [legendary.name, 'ピカチュウ', 'イーブイ', 'カビゴン'],
          correctAnswer: legendary.name,
          visualAid: {
            type: 'pokemon-legendary-quiz',
            content: {
              pokemon: {
                name: legendary.name,
                image: this.pokemonAPI.getHighQualityImageUrl(pokemon),
                isShiny: true // 特別感を演出
              },
              specialEffect: true
            }
          },
          points: 100 // 高得点
        });
      }
    } catch (error) {
      console.error('Failed to generate legendary questions:', error);
    }

    return questions;
  }
}