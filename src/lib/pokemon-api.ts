// PokeAPI統合システム
import { StorageManager } from './storage';

export interface Pokemon {
  id: number;
  name: string;
  japaneseName: string;
  sprites: {
    front_default: string;
    front_shiny?: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      home: {
        front_default: string;
        front_shiny?: string;
      };
    };
  };
  types: PokemonType[];
  height: number; // デシメートル単位
  weight: number; // ヘクトグラム単位
  stats: PokemonStat[];
  cries?: {
    latest: string;
    legacy?: string;
  };
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  names: {
    language: {
      name: string;
    };
    name: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

export interface TypeInfo {
  id: number;
  name: string;
  names: {
    language: {
      name: string;
    };
    name: string;
  }[];
}

// ポケモンタイプの日本語名マッピング
const TYPE_JAPANESE_NAMES: Record<string, string> = {
  'normal': 'ノーマル',
  'fire': 'ほのお',
  'water': 'みず', 
  'electric': 'でんき',
  'grass': 'くさ',
  'ice': 'こおり',
  'fighting': 'かくとう',
  'poison': 'どく',
  'ground': 'じめん',
  'flying': 'ひこう',
  'psychic': 'エスパー',
  'bug': 'むし',
  'rock': 'いわ',
  'ghost': 'ゴースト',
  'dragon': 'ドラゴン',
  'dark': 'あく',
  'steel': 'はがね',
  'fairy': 'フェアリー'
};

// 学習に適したポケモンID（人気＆教育的に適切）
const EDUCATIONAL_POKEMON_IDS = [
  1, 4, 7, 25, 39, 52, 54, 58, 77, 104, 113, 129, 131, 133, 138, 140, 144, 145, 146, 150,
  151, 155, 158, 161, 172, 173, 174, 175, 179, 183, 194, 202, 220, 225, 258, 261, 264, 280,
  287, 293, 298, 302, 311, 312, 320, 333, 341, 349, 359, 363, 370, 374, 387, 390, 393, 399,
  403, 417, 422, 427, 447, 448, 453, 459, 479, 489, 493, 494, 495, 498, 501, 504, 506, 509,
  519, 524, 531, 540, 548, 564, 570, 572, 580, 585, 613, 619, 633, 650, 653, 656, 661, 667,
  674, 677, 692, 696, 698, 702, 704, 714, 722, 725, 728, 734, 742, 761, 772, 775, 778, 792,
  793, 807, 810, 813, 816, 819, 827, 831, 833, 840, 845, 848, 850, 867, 870, 875, 877, 885
];

export class PokemonAPI {
  private static instance: PokemonAPI;
  private cache: Map<string, any> = new Map();
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  
  private constructor() {
    this.loadCache();
  }

  static getInstance(): PokemonAPI {
    if (!PokemonAPI.instance) {
      PokemonAPI.instance = new PokemonAPI();
    }
    return PokemonAPI.instance;
  }

  // ポケモンデータ取得（キャッシュ対応）
  async getPokemon(id: number): Promise<Pokemon | null> {
    const cacheKey = `pokemon-${id}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/pokemon/${id}`);
      if (!response.ok) return null;
      
      const pokemonData = await response.json();
      
      // 日本語名を取得
      const speciesResponse = await fetch(pokemonData.species.url);
      const speciesData = await speciesResponse.json();
      const japaneseName = this.extractJapaneseName(speciesData);
      
      const pokemon: Pokemon = {
        ...pokemonData,
        japaneseName
      };
      
      this.cache.set(cacheKey, pokemon);
      this.saveCache();
      
      return pokemon;
    } catch (error) {
      console.error('Failed to fetch Pokemon:', error);
      return null;
    }
  }

  // ランダムな教育向けポケモン取得
  async getRandomEducationalPokemon(): Promise<Pokemon | null> {
    const randomId = EDUCATIONAL_POKEMON_IDS[
      Math.floor(Math.random() * EDUCATIONAL_POKEMON_IDS.length)
    ];
    return this.getPokemon(randomId);
  }

  // 複数のポケモンを一括取得
  async getMultiplePokemon(ids: number[]): Promise<Pokemon[]> {
    const promises = ids.map(id => this.getPokemon(id));
    const results = await Promise.all(promises);
    return results.filter(pokemon => pokemon !== null) as Pokemon[];
  }

  // タイプ別ポケモン取得
  async getPokemonByType(typeName: string, limit: number = 10): Promise<Pokemon[]> {
    const cacheKey = `type-${typeName}-${limit}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/type/${typeName}`);
      if (!response.ok) return [];
      
      const typeData = await response.json();
      
      // 教育向けポケモンのみフィルタリング
      const educationalPokemon = typeData.pokemon
        .filter((p: any) => {
          const id = parseInt(p.pokemon.url.split('/').slice(-2, -1)[0]);
          return EDUCATIONAL_POKEMON_IDS.includes(id);
        })
        .slice(0, limit);
      
      const pokemonPromises = educationalPokemon.map((p: any) => {
        const id = parseInt(p.pokemon.url.split('/').slice(-2, -1)[0]);
        return this.getPokemon(id);
      });
      
      const results = await Promise.all(pokemonPromises);
      const validResults = results.filter(p => p !== null) as Pokemon[];
      
      this.cache.set(cacheKey, validResults);
      this.saveCache();
      
      return validResults;
    } catch (error) {
      console.error('Failed to fetch Pokemon by type:', error);
      return [];
    }
  }

  // ポケモンの日本語名を抽出
  private extractJapaneseName(speciesData: PokemonSpecies): string {
    const japaneseName = speciesData.names.find(
      name => name.language.name === 'ja-Hrkt' || name.language.name === 'ja'
    );
    return japaneseName?.name || speciesData.name;
  }

  // タイプの日本語名を取得
  getTypeJapaneseName(englishName: string): string {
    return TYPE_JAPANESE_NAMES[englishName] || englishName;
  }

  // ポケモンの身長をセンチメートルに変換
  getHeightInCm(pokemon: Pokemon): number {
    return pokemon.height * 10; // デシメートル → センチメートル
  }

  // ポケモンの体重をキログラムに変換
  getWeightInKg(pokemon: Pokemon): number {
    return pokemon.weight / 10; // ヘクトグラム → キログラム
  }

  // ポケモンの説明文取得（日本語）
  async getPokemonDescription(pokemon: Pokemon): Promise<string> {
    const cacheKey = `description-${pokemon.id}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(pokemon.species.url);
      const speciesData = await response.json();
      
      const japaneseDescription = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'ja-Hrkt' || entry.language.name === 'ja'
      );
      
      const description = japaneseDescription?.flavor_text
        .replace(/\f/g, '\n')
        .replace(/\n/g, ' ') || 'ふしぎなポケモンです。';
      
      this.cache.set(cacheKey, description);
      this.saveCache();
      
      return description;
    } catch (error) {
      console.error('Failed to fetch Pokemon description:', error);
      return 'ふしぎなポケモンです。';
    }
  }

  // 学習進捗に応じたポケモン報酬システム
  async getRewardPokemon(category: string, level: number): Promise<Pokemon | null> {
    let pokemonId;
    
    switch (category) {
      case 'math':
        // 算数 - でんきタイプ（頭が良いイメージ）
        pokemonId = [25, 125, 135, 172, 311, 312, 479][level % 7];
        break;
      case 'japanese':
        // 国語 - エスパータイプ（知的なイメージ）
        pokemonId = [63, 64, 65, 96, 97, 150, 151][level % 7];
        break;
      case 'english':
        // 英語 - ひこうタイプ（世界を飛び回るイメージ）
        pokemonId = [16, 17, 18, 144, 145, 146, 149][level % 7];
        break;
      case 'time':
        // 時計 - はがねタイプ（機械的なイメージ）
        pokemonId = [81, 82, 374, 375, 376, 436, 437][level % 7];
        break;
      case 'shape':
        // 図形 - いわタイプ（形がはっきりしているイメージ）
        pokemonId = [74, 75, 76, 95, 138, 140, 142][level % 7];
        break;
      default:
        pokemonId = EDUCATIONAL_POKEMON_IDS[level % EDUCATIONAL_POKEMON_IDS.length];
    }
    
    return this.getPokemon(pokemonId);
  }

  // ユーザーのポケモンコレクション管理
  getUserPokemonCollection(): number[] {
    const progress = StorageManager.getProgress();
    return progress.pokemonCollection || [];
  }

  addPokemonToCollection(pokemonId: number): void {
    const progress = StorageManager.getProgress();
    if (!progress.pokemonCollection) {
      progress.pokemonCollection = [];
    }
    
    if (!progress.pokemonCollection.includes(pokemonId)) {
      progress.pokemonCollection.push(pokemonId);
      StorageManager.saveProgress(progress);
    }
  }

  // キャッシュ管理
  private loadCache(): void {
    try {
      const cached = localStorage.getItem('pokemon-cache');
      if (cached) {
        const data = JSON.parse(cached);
        this.cache = new Map(data);
      }
    } catch (error) {
      console.error('Failed to load Pokemon cache:', error);
    }
  }

  private saveCache(): void {
    try {
      // キャッシュサイズを制限（最大100エントリ）
      if (this.cache.size > 100) {
        const entries = Array.from(this.cache.entries());
        this.cache = new Map(entries.slice(-50)); // 最新50件のみ保持
      }
      
      localStorage.setItem('pokemon-cache', JSON.stringify(Array.from(this.cache.entries())));
    } catch (error) {
      console.error('Failed to save Pokemon cache:', error);
    }
  }

  // 学習タイプに応じたポケモンタイプ取得
  getEducationalTypeForSubject(subject: string): string {
    const typeMapping: Record<string, string> = {
      'math': 'electric',
      'japanese': 'psychic', 
      'english': 'flying',
      'time': 'steel',
      'shape': 'rock',
      'science': 'grass',
      'money': 'normal'
    };
    
    return typeMapping[subject] || 'normal';
  }

  // ポケモンの鳴き声URL取得
  getPokemonCryUrl(pokemon: Pokemon): string | null {
    return pokemon.cries?.latest || pokemon.cries?.legacy || null;
  }

  // 高画質画像URL取得
  getHighQualityImageUrl(pokemon: Pokemon): string {
    return pokemon.sprites.other['official-artwork']?.front_default || 
           pokemon.sprites.other.home?.front_default ||
           pokemon.sprites.front_default;
  }

  // シャイニー画像URL取得
  getShinyImageUrl(pokemon: Pokemon): string | null {
    return pokemon.sprites.other.home?.front_shiny || 
           pokemon.sprites.front_shiny || null;
  }

  // 学習達成度に応じたポケモン進化システム
  async getEvolutionReward(basePoints: number): Promise<{pokemon: Pokemon, isShiny: boolean} | null> {
    // ポイントに応じてレア度を決定
    let pokemonId: number;
    let isShiny = false;
    
    if (basePoints >= 10000) {
      // 伝説ポケモン + シャイニー
      pokemonId = [150, 151, 144, 145, 146, 249, 250][Math.floor(Math.random() * 7)];
      isShiny = true;
    } else if (basePoints >= 5000) {
      // 伝説ポケモン
      pokemonId = [150, 151, 144, 145, 146][Math.floor(Math.random() * 5)];
    } else if (basePoints >= 2000) {
      // 進化系ポケモン + 時々シャイニー  
      pokemonId = [9, 6, 3, 65, 68, 94, 130][Math.floor(Math.random() * 7)];
      isShiny = Math.random() < 0.1; // 10%の確率
    } else if (basePoints >= 1000) {
      // 中間進化ポケモン
      pokemonId = [8, 5, 2, 64, 67, 93][Math.floor(Math.random() * 6)];
    } else {
      // 基本ポケモン
      pokemonId = [7, 4, 1, 63, 66, 92, 25][Math.floor(Math.random() * 7)];
    }
    
    const pokemon = await this.getPokemon(pokemonId);
    return pokemon ? { pokemon, isShiny } : null;
  }
}