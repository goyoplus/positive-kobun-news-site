# モール画像ととのえ

Next.js App Router + TypeScript + Tailwind CSS で作成した、EC 出品者向けの画像一括整形 MVP です。  
商品画像をまとめてアップロードすると、ブラウザだけで以下をまとめて処理できます。

- JPEG 化
- 3MB 以下への圧縮
- 1:1 正方形化
- 余白の自動調整
- 型番ベースのファイル名生成
- ZIP 一括ダウンロード
- Amazon / 楽天 / ヤフー向けプリセット切替

DB なし、ログインなし、画像はサーバー保存なしの構成です。Vercel Hobby にそのまま載せやすい形を前提にしています。

## セットアップ手順

```bash
npm install
```

お問い合わせフォームを使う場合は、SMTP 設定を `.env.local` に追加してください。

```bash
cp .env.example .env.local
```

Gmail 宛に送る場合は、`SMTP_USER` と `CONTACT_TO_EMAIL` に送信先 Gmail、`SMTP_PASS` に Gmail のアプリ パスワードを設定します。

## ローカル起動方法

開発サーバー:

```bash
npm run dev
```

本番ビルド確認:

```bash
npm run build
npm run start
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## 実装内容

### 画面構成

- トップ画面
  - サービス名
  - 一言説明
  - 「使ってみる」ボタン
  - 特徴紹介
  - やわらかい SaaS 風のヒーロー UI
- メイン画面
  - ドラッグ&ドロップ対応アップロード
  - モール別プリセット選択
  - 型番入力欄
  - 出力設定表示
  - 一括変換ボタン
  - 処理前 / 処理後プレビュー
  - 画像ごとのファイル名編集
  - ZIP 一括ダウンロード
  - 個別ダウンロード

### 画像処理

- `canvas` ベースでブラウザ内処理
- 出力形式は JPEG 固定
- プリセットごとに出力サイズ、余白率、初期品質を変更
- 画像の四隅から背景色を推定し、商品領域らしい範囲を検出
- 商品領域を基準に全体を拡大縮小して、切れにくい正方形配置に調整
- 3MB 以下になるまで品質と出力サイズを段階的に調整

### 通信量を抑える工夫

- 日本語 Web フォントをやめ、端末の標準フォントを優先して初期読込量を削減
- 説明画像は `next/image` で配信し、AVIF / WebP 優先で軽量化
- 説明画像は表示サイズに応じた `sizes` を指定し、必要以上に大きい画像を配信しない
- 画像キャッシュを長めに設定し、再訪時の通信量を抑制

### ファイル名

- 型番ベースを入力すると `ABC123_01.jpg` のような連番名を自動生成
- 画像ごとに個別ファイル名の手修正が可能
- ZIP 生成時も編集済みファイル名を反映

## Vercel 公開方法

1. GitHub にこのプロジェクトを push
2. Vercel で `Add New...` → `Project`
3. 対象リポジトリを選択
4. Framework Preset は `Next.js` のまま
5. Build Command / Output Directory はデフォルトのまま
6. `Deploy` を実行

### Vercel Analytics の有効化

1. Vercel ダッシュボードで対象プロジェクトを開く
2. `Analytics` を開いて `Enable` する
3. 有効化後に再デプロイする
4. データは Vercel ダッシュボードの `Analytics` 画面で確認する

このプロジェクトでは `@vercel/analytics` と `app/layout.tsx` の `<Analytics />` を組み込み済みなので、Vercel 側で Enable して再デプロイすればページアクセス計測が始まります。

お問い合わせフォームを使う場合のみ、以下の環境変数が必要です。

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=owner@example.com
SMTP_PASS=your_app_password
CONTACT_FROM_EMAIL=owner@example.com
CONTACT_TO_EMAIL=owner@example.com
```

## 現時点の制約

- 商品の自動検出は簡易ロジックです。白背景に白い商品などは余白調整が弱くなる場合があります
- 背景除去や影補正は未実装です
- ブラウザ内処理のため、大量枚数や超高解像度画像では端末性能に依存します
- プリセットは実務向けの初期値であり、モール規格の厳密完全再現ではありません
- サーバー保存なしのため、ページ再読込で処理結果は保持されません
- お問い合わせフォームの送信には SMTP 設定が必要です

## 次の拡張案

- 白背景の自動補正
- 商品中心の自動検出精度向上
- AI で型番を画像から読んでファイル名提案
- モール規格の厳密最適化
- 個別トリミング / 回転 / 並び替え
- ログイン
- 保存機能
- 課金

## ディレクトリ構成

```text
app/
components/
lib/
public/
```

## 起動コマンド

```bash
npm install
npm run dev
```
