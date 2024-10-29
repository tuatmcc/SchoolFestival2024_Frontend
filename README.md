# School Festival 2024 Frontend

## 技術スタック

- [Remix](https://remix.run/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Supabase](https://supabase.com/docs)

## 必要なもの

- Node.js
- Docker (ローカルで Supabase を使う際に必要になります)

Mac や WSL では [mise](https://mise.jdx.dev/getting-started.html) 等を経由してインストールすることをお勧めします。

## セットアップ

このプロジェクトをクローンしたら、まずは pnpm を使えるようにするために以下のコマンドを実行してください。

```sh
corepack enable
```

次に、依存関係をインストールします。このコマンドは依存関係が更新された際にも必要なため、pull した後などにも実行が必要な場合があります。

```sh
pnpm install
```

次に、Supabase の設定を行います。ローカルの Supabase を使う場合は、以下のコマンドを実行して Supabase を起動してください。(要 Docker)

```sh
pnpm supabase start
```

しばらくすると、Supabase の各種パラメータが表示されるため、`API URL`と`anon key`を`.env`ファイルに設定してください。また、 http://127.0.0.1:54323 で Supabase のダッシュボードにアクセスできます。

リモートの Supabase を使う場合は、Supabase のダッシュボードから取得した`API URL`と`anon key`を`.env`ファイルに設定してください。

## 開発

### 開発サーバーの起動

開発サーバーを起動するには以下のコマンドを実行してください。

```sh
pnpm run dev
```

ブラウザから `http://localhost:5173` でアクセスできます。ファイルの変更を検知して自動でリロードされます。

### リンター

Biome を用いてコードのチェックを行います。VSCode で Biome 拡張をインストールしておくと、エディタ上でエラーを確認できます。

```sh
pnpm run lint
```

### フォーマット

Biome を用いてコードのフォーマットを行います。

```sh
pnpm run fmt
```

### ビルド

以下のコマンドでプロジェクトをビルドできます。基本的にデプロイ時に自動で行われるので、手動でビルドする必要はありません。

```sh
pnpm run build
```

### Supabase

Supabase のテーブルを編集する場合はローカルの Supabase が必要となります。セットアップの手順に従ってローカルの Supabase を起動してください。

```sh
pnpm supabase start
```

参考: https://supabase.com/docs/guides/local-development/overview

#### Supabase を止める

```sh
pnpm supabase stop
```

#### データをリセットする

マイグレーションからやり直されるため、認証情報も含めてテーブル内のすべてのデータが消去されます。

```sh
pnpm supabase db reset
```

#### 新しくテーブルを作る・テーブルを編集する

テーブルを編集したい場合はマイグレーションファイルを使用します。以下のコマンドで新しいマイグレーションファイルを作成できます。

```sh
pnpm supabase migration new <マイグレーション名>
```

実行すると、`supabase/migrations` ディレクトリに新しいマイグレーションファイルが作成されます。このファイルを編集して、テーブルの変更を記述してください。

マイグレーションファイルが完成したらデータリセットを行うことでマイグレーションが行えます。

なお、テーブルに変更を加えた場合は TypeScript の型を再生成する必要があります。

```sh
pnpm supabase gen types --lang=typescript --local > app/libs/database.ts
```

忘れずにコミットしてください。

#### リモートの Supabase にマイグレーションを反映する

マイグレーションを反映する場合は以下のコマンドを実行してください。

```sh
# ログインする
# 一回だけでOK
pnpm supabase login

# プロジェクトをリンクする
# 一回だけでOK
# project-id は Supabase のダッシュボードから取得してください
pnpm supabase link --project-ref <project-id>

pnpm supabase db push
```

> [!CAUTION]
> マイグレーションを実行した場合、リモートのデータベースに変更が加えられます。場合によってはデータが消失する可能性があるため、十分に注意をしてください。
> このコマンドは頻繁に実行されることはありません。通常は今からマージされる PR のブランチ上で実行されるはずです。

## ブランチ

`main` にマージすると Cloudflare へデプロイされるよう設定する予定です。`main` からブランチを切り、プルリクエスト経由で`main`へマージしてください。
