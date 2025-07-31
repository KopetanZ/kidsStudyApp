'use client';

import { useState, useEffect } from 'react';
import { SoundManager } from '@/lib/sound';
import { StorageManager } from '@/lib/storage';
import { Settings, Volume, VolumeX, Smartphone, Monitor, Headphones } from 'lucide-react';

interface UserSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSettings({ isOpen, onClose }: UserSettingsProps) {
  const [soundManager, setSoundManager] = useState<SoundManager | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [silentSwitchState, setSilentSwitchState] = useState<boolean | null>(null);
  const [userMutePreference, setUserMutePreference] = useState(false);
  const [detectionEnabled, setDetectionEnabled] = useState(true);

  useEffect(() => {
    const initializeSettings = async () => {
      const sound = SoundManager.getInstance();
      await sound.init();
      setSoundManager(sound);
      
      // 現在のミュート状態を取得
      setIsMuted(sound.isMuted());
      
      // サイレント スイッチ状態をチェック
      const silentState = await sound.checkSilentSwitch();
      setSilentSwitchState(silentState);

      // ユーザー設定を読み込み
      const settings = StorageManager.getSettings();
      setUserMutePreference(settings.muteOverride || false);
      setDetectionEnabled(settings.silentSwitchDetection !== false);

      // ミュート状態変更のコールバックを設定
      sound.onMuteStateChange((muted) => {
        setIsMuted(muted);
      });
    };

    if (isOpen) {
      initializeSettings();
    }
  }, [isOpen]);

  const handleUserMuteToggle = () => {
    if (!soundManager) return;
    
    const newMuteState = !userMutePreference;
    setUserMutePreference(newMuteState);
    
    // 手動ミュート設定を適用
    soundManager.setManualMute(newMuteState);
    
    // 設定を保存
    StorageManager.updateSettings({ muteOverride: newMuteState });
    
    console.log(`User mute preference set to: ${newMuteState}`);
  };

  const handleDetectionToggle = () => {
    const newDetectionState = !detectionEnabled;
    setDetectionEnabled(newDetectionState);
    
    // 設定を保存
    StorageManager.updateSettings({ silentSwitchDetection: newDetectionState });
    
    console.log(`Silent switch detection set to: ${newDetectionState}`);
  };

  const handleTestSound = () => {
    if (!soundManager) return;
    soundManager.playSound('click');
  };

  const refreshSilentSwitchState = async () => {
    if (!soundManager) return;
    const state = await soundManager.checkSilentSwitch();
    setSilentSwitchState(state);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 animate-bounce-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Settings className="text-gray-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">設定</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* 音声設定セクション */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Volume size={20} />
              音声設定
            </h3>

            {/* 現在の状態表示 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-600 mb-2">現在の状態:</div>
              <div className="flex items-center gap-2 mb-2">
                {isMuted ? (
                  <VolumeX className="text-red-500" size={16} />
                ) : (
                  <Volume className="text-green-500" size={16} />
                )}
                <span className={`font-medium ${isMuted ? 'text-red-600' : 'text-green-600'}`}>
                  {isMuted ? 'ミュート中' : '音声ON'}
                </span>
              </div>
              
              {/* サイレントスイッチ状態 */}
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="text-blue-500" size={16} />
                <span className="text-sm text-gray-600">
                  サイレントスイッチ: 
                  <span className={`ml-1 font-medium ${
                    silentSwitchState === null ? 'text-gray-500' : 
                    silentSwitchState ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {silentSwitchState === null ? '検出中...' : 
                     silentSwitchState ? 'ON (無音)' : 'OFF (音あり)'}
                  </span>
                </span>
                <button
                  onClick={refreshSilentSwitchState}
                  className="text-blue-500 text-xs underline"
                >
                  更新
                </button>
              </div>
            </div>

            {/* ユーザーミュート設定 */}
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <div className="font-medium text-gray-700">手動ミュート</div>
                <div className="text-sm text-gray-500">
                  アプリの音声を手動で切り替え
                </div>
              </div>
              <button
                onClick={handleUserMuteToggle}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${userMutePreference ? 'bg-red-500' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${userMutePreference ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* サイレントスイッチ検出設定 */}
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <div className="font-medium text-gray-700">サイレントスイッチ検出</div>
                <div className="text-sm text-gray-500">
                  iPhoneのサイレントスイッチを自動検出
                </div>
              </div>
              <button
                onClick={handleDetectionToggle}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${detectionEnabled ? 'bg-blue-500' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${detectionEnabled ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* テスト機能 */}
            <div className="mt-4">
              <button
                onClick={handleTestSound}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Headphones size={16} />
                音声テスト
              </button>
            </div>
          </div>

          {/* 説明文 */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-bold text-blue-800 mb-2">💡 使い方</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• サイレントスイッチ検出：iPhoneの物理スイッチに連動</li>
              <li>• 手動ミュート：アプリ内での音声を個別制御</li>
              <li>• 両方ONの場合は音声が再生されません</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}