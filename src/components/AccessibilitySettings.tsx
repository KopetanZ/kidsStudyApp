'use client';

import { useState, useEffect } from 'react';
import { AccessibilityManager, AccessibilitySettings, AccessibilityPreferences } from '@/lib/accessibility';
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Type, 
  Zap, 
  Keyboard, 
  Palette,
  Settings,
  Check,
  X,
  HelpCircle,
  Target
} from 'lucide-react';

interface AccessibilitySettingsProps {
  onClose: () => void;
}

export default function AccessibilitySettingsComponent({ onClose }: AccessibilitySettingsProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>(AccessibilityManager.getSettings());
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(AccessibilityManager.getPreferences());
  const [activeTab, setActiveTab] = useState<'settings' | 'preferences' | 'help'>('settings');

  useEffect(() => {
    // Apply settings in real-time
    AccessibilityManager.applySettings(settings);
  }, [settings]);

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    AccessibilityManager.saveSettings({ [key]: value });
  };

  const updatePreference = (key: keyof AccessibilityPreferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    AccessibilityManager.savePreferences({ [key]: value });
  };

  const applyRecommendedSettings = () => {
    const recommended = AccessibilityManager.getRecommendedSettings(preferences);
    const newSettings = { ...settings, ...recommended };
    setSettings(newSettings);
    AccessibilityManager.saveSettings(recommended);
    AccessibilityManager.announce('推奨設定が適用されました', 'polite');
  };

  const resetToDefaults = () => {
    const defaultSettings = AccessibilityManager.getSettings();
    setSettings(defaultSettings);
    AccessibilityManager.saveSettings(defaultSettings);
    AccessibilityManager.announce('設定がリセットされました', 'polite');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl h-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Settings size={32} />
              アクセシビリティ設定
            </h1>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="設定を閉じる"
            >
              <X size={20} />
            </button>
          </div>
          <p className="opacity-90">あなたに最適な学習環境を設定しましょう</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'settings', label: '設定', icon: Settings },
              { id: 'preferences', label: '個人設定', icon: Eye },
              { id: 'help', label: 'ヘルプ', icon: HelpCircle }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
                aria-pressed={activeTab === tab.id}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100% - 200px)' }}>
          {activeTab === 'settings' && (
            <div className="space-y-8">
              {/* Visual Settings */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Eye className="text-blue-500" size={24} />
                  視覚設定
                </h3>
                
                <div className="grid gap-6">
                  {/* High Contrast */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-semibold text-gray-700">ハイコントラスト</label>
                      <p className="text-sm text-gray-600">文字と背景のコントラストを強くします</p>
                    </div>
                    <button
                      onClick={() => updateSetting('highContrast', !settings.highContrast)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.highContrast ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      aria-pressed={settings.highContrast}
                      aria-label="ハイコントラスト切り替え"
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Large Text */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-semibold text-gray-700">大きい文字</label>
                      <p className="text-sm text-gray-600">文字サイズを大きくします</p>
                    </div>
                    <button
                      onClick={() => updateSetting('largeText', !settings.largeText)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.largeText ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      aria-pressed={settings.largeText}
                      aria-label="大きい文字切り替え"
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.largeText ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="font-semibold text-gray-700 block mb-2">文字サイズ</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['small', 'medium', 'large', 'extra-large'].map(size => (
                        <button
                          key={size}
                          onClick={() => updateSetting('fontSize', size)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            settings.fontSize === size
                              ? 'bg-blue-500 text-white'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          aria-pressed={settings.fontSize === size}
                        >
                          {size === 'small' ? '小' :
                           size === 'medium' ? '中' :
                           size === 'large' ? '大' : '特大'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Blind Friendly */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-semibold text-gray-700">色覚サポート</label>
                      <p className="text-sm text-gray-600">色の区別がしやすくなります</p>
                    </div>
                    <button
                      onClick={() => updateSetting('colorBlindFriendly', !settings.colorBlindFriendly)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.colorBlindFriendly ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      aria-pressed={settings.colorBlindFriendly}
                      aria-label="色覚サポート切り替え"
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.colorBlindFriendly ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Audio Settings */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Volume2 className="text-green-500" size={24} />
                  音声設定
                </h3>
                
                <div className="grid gap-6">
                  {/* Sound Enabled */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-semibold text-gray-700">音声フィードバック</label>
                      <p className="text-sm text-gray-600">効果音や音声読み上げを有効にします</p>
                    </div>
                    <button
                      onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.soundEnabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      aria-pressed={settings.soundEnabled}
                      aria-label="音声フィードバック切り替え"
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Screen Reader Mode */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-semibold text-gray-700">スクリーンリーダー対応</label>
                      <p className="text-sm text-gray-600">音声読み上げソフトに最適化します</p>
                    </div>
                    <button
                      onClick={() => updateSetting('screenReaderMode', !settings.screenReaderMode)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.screenReaderMode ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      aria-pressed={settings.screenReaderMode}
                      aria-label="スクリーンリーダー対応切り替え"
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.screenReaderMode ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Interaction Settings */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Keyboard className="text-purple-500" size={24} />
                  操作設定
                </h3>
                
                <div className="grid gap-6">
                  {/* Keyboard Navigation */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-semibold text-gray-700">キーボード操作</label>
                      <p className="text-sm text-gray-600">キーボードで全ての操作ができます</p>
                    </div>
                    <button
                      onClick={() => updateSetting('keyboardNavigation', !settings.keyboardNavigation)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.keyboardNavigation ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                      aria-pressed={settings.keyboardNavigation}
                      aria-label="キーボード操作切り替え"
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.keyboardNavigation ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Reduced Motion */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-semibold text-gray-700">アニメーション軽減</label>
                      <p className="text-sm text-gray-600">動きを少なくして集中しやすくします</p>
                    </div>
                    <button
                      onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.reducedMotion ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                      aria-pressed={settings.reducedMotion}
                      aria-label="アニメーション軽減切り替え"
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Focus Indicators */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-semibold text-gray-700">フォーカス表示</label>
                      <p className="text-sm text-gray-600">選択中の項目を明確に表示します</p>
                    </div>
                    <button
                      onClick={() => updateSetting('focusIndicatorEnabled', !settings.focusIndicatorEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.focusIndicatorEnabled ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                      aria-pressed={settings.focusIndicatorEnabled}
                      aria-label="フォーカス表示切り替え"
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.focusIndicatorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">個人の特性に合わせた設定</h3>
                <p className="text-gray-600 mb-4">
                  あてはまる項目を選択すると、最適な設定を提案します
                </p>
                <button
                  onClick={applyRecommendedSettings}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  disabled={!Object.values(preferences).some(p => p)}
                >
                  推奨設定を適用
                </button>
              </div>

              <div className="grid gap-4">
                {[
                  { key: 'visualImpairment', label: '見ることが困難', icon: EyeOff },
                  { key: 'hearingImpairment', label: '聞くことが困難', icon: VolumeX },
                  { key: 'motorImpairment', label: '手の操作が困難', icon: Zap },
                  { key: 'cognitiveSupport', label: '理解に時間が必要', icon: HelpCircle },
                  { key: 'readingDifficulties', label: '読むことが困難', icon: Type },
                  { key: 'attentionDifficulties', label: '集中することが困難', icon: Target }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => updatePreference(key as keyof AccessibilityPreferences, !preferences[key as keyof AccessibilityPreferences])}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      preferences[key as keyof AccessibilityPreferences]
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                    aria-pressed={preferences[key as keyof AccessibilityPreferences]}
                  >
                    <Icon size={24} />
                    <span className="font-medium flex-1 text-left">{label}</span>
                    {preferences[key as keyof AccessibilityPreferences] && (
                      <Check size={20} className="text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">アクセシビリティ機能について</h3>
                <p className="text-blue-700 mb-4">
                  このアプリは、さまざまな学習ニーズに対応するための機能を提供しています。
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'キーボード操作',
                    description: 'Tabキーで項目を移動、Enterキーで決定、Escapeキーでキャンセルができます。'
                  },
                  {
                    title: '音声読み上げ',
                    description: '問題文や選択肢を音声で読み上げることができます。🔊ボタンを押してください。'
                  },
                  {
                    title: 'ハイコントラスト',
                    description: '文字と背景の色の差を大きくして、読みやすくします。'
                  },
                  {
                    title: '大きい文字',
                    description: '文字サイズを大きくして見やすくします。'
                  },
                  {
                    title: 'アニメーション軽減',
                    description: '動きのある表示を少なくして、集中しやすくします。'
                  },
                  {
                    title: '色覚サポート',
                    description: '色の違いが分かりにくい方でも使いやすい色使いにします。'
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-green-800 mb-2">困ったときは</h4>
                <p className="text-green-700 text-sm">
                  設定がうまくいかない場合は、「設定をリセット」ボタンで初期状態に戻すことができます。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-between">
          <button
            onClick={resetToDefaults}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            設定をリセット
          </button>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
}