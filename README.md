# School Festival 2024 Frontend

## 技術スタック

- [Remix](https://remix.run/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Supabase](https://supabase.com/docs)

## 必要なもの 

- Node.js

Mac や WSL では [mise](https://mise.jdx.dev/getting-started.html) 等を経由してインストールすることをお勧めします。

## セットアップ

このプロジェクトをクローンしたら、以下のコマンドを実行してください。

```sh
npm install
```

## 開発

### 開発サーバーの起動

開発サーバーを起動するには以下のコマンドを実行してください。

```sh
npm run dev
```

ブラウザから `http://localhost:5173` でアクセスできます。ファイルの変更を検知して自動でリロードされます。

### リンター

Biome を用いてコードのチェックを行います。VSCode で Biome 拡張をインストールしておくと、エディタ上でエラーを確認できます。

```sh
npm run lint
```

### フォーマット

Biome を用いてコードのフォーマットを行います。

```sh
npm run fmt
```

### ビルド

以下のコマンドでプロジェクトをビルドできます。基本的にデプロイ時に自動で行われるので、手動でビルドする必要はありません。

```sh
npm run build
```

## ブランチ

`main` にマージするとCloudflareへデプロイされるよう設定する予定です。`main` からブランチを切り、プルリクエスト経由で`main`へマージしてください。
