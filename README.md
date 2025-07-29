# 🌟 がくしゅうアプリ - 小学生向け学習アプリ

小学生低学年向けの楽しい学習アプリです。算数、国語、英語を遊びながら学べます。

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)

## ✨ 特徴

### 🔢 算数モジュール
- **視覚的サポート**: 足し算では●を使って数を視覚化
- **段階的学習**: 足し算 → 引き算 → かけ算 → 割り算の順で学習
- **公文式スタイル**: レベルアップ方式で着実にスキルを向上
- **プレースホルダー学習**: 〇 + 1 = 2 のような形式で応用力を育成

### 🇯🇵 国語モジュール
- **ひらがな・カタカナ練習**: あ〜わ行まで段階的に学習
- **視覚的学習**: 絵と文字を組み合わせた記憶法
- **文字認識**: 手書き入力での文字判定（簡易版）
- **単語練習**: 絵を見て単語を書く練習

### 🇺🇸 英語モジュール
- **アルファベット学習**: A-Z大文字小文字の読み方
- **4択問題**: 選択式で楽しく学習
- **フォニックス**: 文字の音を覚える
- **基本単語**: 動物や色の英単語を学習

### 🎵 その他の機能
- **音声フィードバック**: 正解音・不正解音でモチベーション向上
- **ポイントシステム**: 問題を解いてポイントを獲得
- **進捗管理**: レベル別の学習進度を記録
- **PWA対応**: オフラインでも使用可能
- **レスポンシブデザイン**: スマホ・タブレット対応

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **音声**: Web Audio API + Speech Synthesis API
- **文字認識**: Canvas API（tesseract.js対応予定）
- **状態管理**: React Hooks + LocalStorage
- **PWA**: Service Worker + Web App Manifest
- **デプロイ**: Vercel

## 📦 インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-username/kids-study-app.git
cd kids-study-app

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 🎯 使用方法

1. **ホーム画面**: 3つの教科（算数・国語・英語）から選択
2. **教科選択**: レベル一覧から挑戦したいレベルを選択
3. **学習開始**: 問題を解いてポイントを獲得
4. **進捗確認**: ホーム画面で総ポイントと実績を確認

### 算数の学習
- 視覚的な●を参考に計算
- 〇の位置が変わる問題で応用力を鍛える
- レベルクリアで次のステージへ

### 国語の学習
- 絵を見てひらがな・カタカナを学習
- 手書き入力で文字認識
- 単語練習で語彙力向上

### 英語の学習
- アルファベットの形と音を覚える
- 4択問題で楽しく学習
- 基本的な英単語を習得

## 🏗️ プロジェクト構造

```
src/
├── app/                  # Next.js App Router
│   ├── page.tsx         # ホーム画面
│   ├── subject/[id]/    # 教科選択画面
│   └── level/[id]/      # 学習画面
├── components/          # 再利用可能コンポーネント
│   └── DrawingCanvas.tsx # 手書き入力コンポーネント
├── lib/                 # ビジネスロジック
│   ├── math-generator.ts     # 算数問題生成
│   ├── japanese-generator.ts # 国語問題生成
│   ├── english-generator.ts  # 英語問題生成
│   ├── sound.ts             # 音声管理
│   ├── storage.ts           # データ永続化
│   └── subjects.ts          # 教科・レベル定義
└── types/               # TypeScript型定義
    └── index.ts
```

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# 型チェック
npm run type-check

# Linter実行
npm run lint
```

## 🌐 PWA機能

このアプリはProgressive Web App (PWA)として動作します：

- **オフライン対応**: Service Workerによるキャッシュ
- **ホーム画面追加**: スマートフォンのホーム画面に追加可能
- **ネイティブアプリ風**: フルスクリーンでの動作
- **高速読み込み**: キャッシュによる高速表示

## 📱 対応ブラウザ

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！

1. フォークする
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. コミット (`git commit -m 'Add some amazing feature'`)
4. プッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- 公文教育研究会の学習メソッドにインスパイアされた段階的学習システム
- 小学生の学習体験を向上させるためのUI/UXデザイン
- オープンソースコミュニティからの素晴らしいライブラリとツール

## 📞 サポート

問題や質問がある場合は、GitHubのIssuesページでお知らせください。

---

**楽しく学んで、一緒に成長しよう！** 🌟📚✨
