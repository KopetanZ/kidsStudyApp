'use client';

import { useState, useEffect } from 'react';
import { Pokemon, PokemonAPI } from '@/lib/pokemon-api';
import { PokemonAchievementSystem } from '@/lib/pokemon-achievement-system';
import { StorageManager } from '@/lib/storage';
import { UserProgress } from '@/types';
import { 
  Search, 
  Filter, 
  Star, 
  Trophy, 
  Sparkles,
  X,
  Volume2,
  Heart,
  Award
} from 'lucide-react';

interface PokemonCollectionProps {
  onClose: () => void;
}

export default function PokemonCollection({ onClose }: PokemonCollectionProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [pokemonCollection, setPokemonCollection] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [collectionStats, setCollectionStats] = useState({
    total: 0,
    shinyCount: 0,
    completion: 0
  });

  const pokemonAPI = PokemonAPI.getInstance();
  const achievementSystem = PokemonAchievementSystem.getInstance();

  useEffect(() => {
    loadPokemonCollection();
  }, []);

  const loadPokemonCollection = async () => {
    try {
      const userProgress = StorageManager.getProgress();
      setProgress(userProgress);

      const stats = await achievementSystem.getPokemonCollection(userProgress);
      setPokemonCollection(stats.collected);
      setCollectionStats({
        total: stats.total,
        shinyCount: stats.shinyCount,
        completion: stats.completion
      });
    } catch (error) {
      console.error('Failed to load Pokemon collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPokemon = pokemonCollection.filter(pokemon => {
    const matchesSearch = pokemon.japaneseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'shiny') {
      return matchesSearch && progress?.shinyCounts?.[pokemon.id];
    }
    
    return matchesSearch && pokemon.types.some(type => type.type.name === filterType);
  });

  const getTypeColor = (typeName: string): string => {
    const typeColors: Record<string, string> = {
      'normal': 'bg-gray-400',
      'fire': 'bg-red-500',
      'water': 'bg-blue-500',
      'electric': 'bg-yellow-500',
      'grass': 'bg-green-500',
      'ice': 'bg-blue-300',
      'fighting': 'bg-red-700',
      'poison': 'bg-purple-500',
      'ground': 'bg-yellow-600',
      'flying': 'bg-indigo-400',
      'psychic': 'bg-pink-500',
      'bug': 'bg-green-400',
      'rock': 'bg-yellow-800',
      'ghost': 'bg-purple-700',
      'dragon': 'bg-indigo-700',
      'dark': 'bg-gray-800',
      'steel': 'bg-gray-500',
      'fairy': 'bg-pink-300'
    };
    return typeColors[typeName] || 'bg-gray-400';
  };

  const playPokemonCry = (pokemon: Pokemon) => {
    const cryUrl = pokemonAPI.getPokemonCryUrl(pokemon);
    if (cryUrl) {
      const audio = new Audio(cryUrl);
      audio.volume = 0.5;
      audio.play().catch(console.error);
    }
  };

  const setFavoritePokemon = (pokemonId: number) => {
    if (!progress) return;
    
    const updatedProgress = { ...progress, favoritePokemon: pokemonId };
    StorageManager.saveProgress(updatedProgress);
    setProgress(updatedProgress);
  };

  const isShiny = (pokemon: Pokemon): boolean => {
    return progress?.shinyCounts?.[pokemon.id] || false;
  };

  const getImageUrl = (pokemon: Pokemon): string => {
    if (isShiny(pokemon)) {
      return pokemonAPI.getShinyImageUrl(pokemon) || pokemonAPI.getHighQualityImageUrl(pokemon);
    }
    return pokemonAPI.getHighQualityImageUrl(pokemon);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="text-2xl text-gray-600 mb-4">ポケモン図鑑を読み込み中...</div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📚</div>
              <div>
                <h2 className="text-2xl font-bold">ポケモン図鑑</h2>
                <p className="opacity-90">捕まえたポケモンのコレクション</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* 統計情報 */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{collectionStats.total}</div>
              <div className="text-sm opacity-90">捕獲数</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{collectionStats.shinyCount}</div>
              <div className="text-sm opacity-90">色違い</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{collectionStats.completion}%</div>
              <div className="text-sm opacity-90">完成度</div>
            </div>
          </div>
        </div>

        <div className="flex h-full">
          {/* メインコンテンツ */}
          <div className="flex-1 p-6">
            {/* 検索・フィルター */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="ポケモン名で検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">すべて</option>
                  <option value="shiny">色違い</option>
                  <option value="fire">ほのお</option>
                  <option value="water">みず</option>
                  <option value="grass">くさ</option>
                  <option value="electric">でんき</option>
                  <option value="psychic">エスパー</option>
                  <option value="flying">ひこう</option>
                </select>
              </div>
            </div>

            {/* ポケモングリッド */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-96 overflow-y-auto">
              {filteredPokemon.map((pokemon) => (
                <div
                  key={pokemon.id}
                  onClick={() => setSelectedPokemon(pokemon)}
                  className={`relative bg-gray-50 rounded-xl p-3 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    selectedPokemon?.id === pokemon.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  {/* シャイニーアイコン */}
                  {isShiny(pokemon) && (
                    <div className="absolute top-1 right-1 text-yellow-400">
                      <Sparkles size={16} />
                    </div>
                  )}
                  
                  {/* お気に入りアイコン */}
                  {progress?.favoritePokemon === pokemon.id && (
                    <div className="absolute top-1 left-1 text-red-500">
                      <Heart size={16} fill="currentColor" />
                    </div>
                  )}

                  <img
                    src={getImageUrl(pokemon)}
                    alt={pokemon.japaneseName}
                    className="w-16 h-16 mx-auto mb-2 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = pokemon.sprites.front_default;
                    }}
                  />
                  
                  <div className="text-center">
                    <div className="text-xs text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</div>
                    <div className="text-sm font-semibold text-gray-800 truncate">
                      {pokemon.japaneseName}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPokemon.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🔍</div>
                <div>該当するポケモンが見つかりません</div>
              </div>
            )}
          </div>

          {/* 詳細パネル */}
          {selectedPokemon && (
            <div className="w-80 bg-gray-50 p-6 border-l">
              <div className="space-y-4">
                {/* ポケモン画像 */}
                <div className="text-center">
                  <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    isShiny(selectedPokemon) 
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-300' 
                      : 'bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-300'
                  }`}>
                    <img
                      src={getImageUrl(selectedPokemon)}
                      alt={selectedPokemon.japaneseName}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedPokemon.japaneseName}
                  </h3>
                  <div className="text-sm text-gray-500 mb-2">
                    #{selectedPokemon.id.toString().padStart(3, '0')} {selectedPokemon.name}
                  </div>
                  
                  {isShiny(selectedPokemon) && (
                    <div className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      <Sparkles size={12} />
                      色違い
                    </div>
                  )}
                </div>

                {/* タイプ */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">タイプ</h4>
                  <div className="flex gap-2">
                    {selectedPokemon.types.map((type, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          getTypeColor(type.type.name)
                        }`}
                      >
                        {pokemonAPI.getTypeJapaneseName(type.type.name)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 基本情報 */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">基本情報</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>身長:</span>
                      <span>{pokemonAPI.getHeightInCm(selectedPokemon)}cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>体重:</span>
                      <span>{pokemonAPI.getWeightInKg(selectedPokemon)}kg</span>
                    </div>
                  </div>
                </div>

                {/* アクションボタン */}
                <div className="space-y-2">
                  <button
                    onClick={() => playPokemonCry(selectedPokemon)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Volume2 size={16} />
                    鳴き声を聞く
                  </button>
                  
                  <button
                    onClick={() => setFavoritePokemon(selectedPokemon.id)}
                    disabled={progress?.favoritePokemon === selectedPokemon.id}
                    className={`w-full font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      progress?.favoritePokemon === selectedPokemon.id
                        ? 'bg-red-500 text-white cursor-not-allowed'
                        : 'bg-red-100 hover:bg-red-200 text-red-700'
                    }`}
                  >
                    <Heart size={16} />
                    {progress?.favoritePokemon === selectedPokemon.id ? 'お気に入り中' : 'お気に入りに設定'}
                  </button>
                </div>

                {/* 獲得バッジ */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Award size={16} />
                    関連バッジ
                  </h4>
                  <div className="space-y-1">
                    {progress?.badges
                      .filter(badge => (badge as any).pokemonId === selectedPokemon.id)
                      .map(badge => (
                        <div key={badge.id} className="bg-white rounded-lg p-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span>{badge.emoji}</span>
                            <span className="font-medium">{badge.name}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}