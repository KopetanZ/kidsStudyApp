'use client';

import { useState, useEffect } from 'react';
import { PokemonReward } from '@/lib/pokemon-achievement-system';
import { PokemonAPI } from '@/lib/pokemon-api';
import { SoundManager } from '@/lib/sound';

interface PokemonRewardModalProps {
  reward: PokemonReward;
  onClose: () => void;
}

export default function PokemonRewardModal({ reward, onClose }: PokemonRewardModalProps) {
  const [showPokemon, setShowPokemon] = useState(false);
  const [soundManager, setSoundManager] = useState<SoundManager | null>(null);
  const pokemonAPI = PokemonAPI.getInstance();

  useEffect(() => {
    const initSound = async () => {
      const sound = SoundManager.getInstance();
      await sound.init();
      setSoundManager(sound);
    };
    initSound();

    // アニメーション演出
    const timer = setTimeout(() => {
      setShowPokemon(true);
      soundManager?.playSound('celebration');
      
      // ポケモンの鳴き声を再生
      const cryUrl = pokemonAPI.getPokemonCryUrl(reward.pokemon);
      if (cryUrl) {
        const audio = new Audio(cryUrl);
        audio.volume = 0.3;
        audio.play().catch(console.error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [reward, soundManager, pokemonAPI]);

  const getRewardTypeEmoji = () => {
    switch (reward.rewardType) {
      case 'achievement': return '🏆';
      case 'milestone': return '🎯';
      case 'special': return '⭐';
      case 'daily': return '📅';
      default: return '🎁';
    }
  };

  const getRewardTypeText = () => {
    switch (reward.rewardType) {
      case 'achievement': return 'アチーブメント達成！';
      case 'milestone': return 'マイルストーン達成！';
      case 'special': return '特別報酬！';
      case 'daily': return '本日のポケモン！';
      default: return '報酬獲得！';
    }
  };

  const imageUrl = reward.isShiny 
    ? pokemonAPI.getShinyImageUrl(reward.pokemon) || pokemonAPI.getHighQualityImageUrl(reward.pokemon)
    : pokemonAPI.getHighQualityImageUrl(reward.pokemon);

  // タイプ別の色を取得
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden">
        {/* ヘッダー */}
        <div className={`text-white p-6 text-center relative overflow-hidden ${
          reward.isShiny 
            ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500' 
            : 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600'
        }`}>
          {/* キラキラエフェクト */}
          {reward.isShiny && (
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          )}
          
          <div className="relative z-10">
            <div className="text-4xl mb-2">{getRewardTypeEmoji()}</div>
            <h2 className="text-2xl font-bold mb-1">{getRewardTypeText()}</h2>
            {reward.isShiny && (
              <div className="text-yellow-200 text-sm font-semibold flex items-center justify-center gap-1">
                ✨ 色違い ✨
              </div>
            )}
          </div>
        </div>

        {/* ポケモン表示エリア */}
        <div className="p-8 text-center">
          <div className={`transition-all duration-1000 ${
            showPokemon ? 'transform scale-100 opacity-100' : 'transform scale-0 opacity-0'
          }`}>
            {/* ポケモン画像 */}
            <div className="relative mb-6">
              <div className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center ${
                reward.isShiny 
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-300' 
                  : 'bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-300'
              }`}>
                <img
                  src={imageUrl}
                  alt={reward.pokemon.japaneseName}
                  className="w-40 h-40 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = reward.pokemon.sprites.front_default;
                  }}
                />
              </div>
              
              {/* エフェクトリング */}
              <div className={`absolute inset-0 rounded-full border-4 animate-ping ${
                reward.isShiny ? 'border-yellow-400' : 'border-blue-400'
              }`} style={{ animationDuration: '2s' }} />
            </div>

            {/* ポケモン情報 */}
            <div className="space-y-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {reward.pokemon.japaneseName}
                </h3>
                <div className="flex justify-center gap-2 mb-3">
                  {reward.pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                        getTypeColor(type.type.name)
                      }`}
                    >
                      {pokemonAPI.getTypeJapaneseName(type.type.name)}
                    </span>
                  ))}
                </div>
              </div>

              {/* ポケモンの基本情報 */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">身長:</span>
                  <span className="font-semibold">{pokemonAPI.getHeightInCm(reward.pokemon)}cm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">体重:</span>
                  <span className="font-semibold">{pokemonAPI.getWeightInKg(reward.pokemon)}kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">図鑑No.:</span>
                  <span className="font-semibold">#{reward.pokemon.id.toString().padStart(3, '0')}</span>
                </div>
              </div>

              {/* 報酬メッセージ */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-gray-700 font-medium">{reward.message}</p>
              </div>

              {/* ボタン */}
              <div className="flex gap-3 justify-center pt-4">
                <button
                  onClick={() => {
                    // ポケモンの鳴き声を再生
                    const cryUrl = pokemonAPI.getPokemonCryUrl(reward.pokemon);
                    if (cryUrl) {
                      const audio = new Audio(cryUrl);
                      audio.volume = 0.5;
                      audio.play().catch(console.error);
                    }
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition-colors flex items-center gap-2"
                >
                  🔊 鳴き声
                </button>
                <button
                  onClick={onClose}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors transform hover:scale-105"
                >
                  図鑑に登録！
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}