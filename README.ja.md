# furo-boilerplate-nuxt

[furo-nuxt](https://github.com/openreachtech/furo-nuxt) で作る Nuxt アプリケーションの動くスケルトンです。GraphQL / RESTful API のクライアント、アクセストークンのゲートウェイ、そしてコンテキストクラス群が、すでに組み上がっています。

## 目次

- [概要](#概要)
- [インストール](#インストール)
- [使い方](#使い方)
- [API](#api)
- [アクセストークンの流れ](#アクセストークンの流れ)
- [コントリビューション](#コントリビューション)
- [ライセンス](#ライセンス)
- [開発者](#開発者)
- [著作権](#著作権)

## 概要

[furo](https://github.com/openreachtech/furo) は、リクエストを 1 本ずつ書くのではなく、クラス（launcher・payload・capsule）から組み立てるクライアントサイドのフレームワークです。`furo-nuxt` は、それを Nuxt と Vue に橋渡しします。本リポジトリは、その 2 つの上に作るアプリケーションの出発点です。

`nuxt init` が残すものとは違います。クローンして install すれば、シングルページアプリケーションがすでに動きます。GraphQL / RESTful API のクライアントは環境ファイルからエンドポイントを受け取り、出ていくリクエストはすべてストレージのアクセストークンを携え、グローバルミドルウェアが未サインインのアクセスをサインインページへの遷移に変え、各ページは自分のタイトルをルートメタで名乗ります。残っているのは、アプリケーション固有のクエリ・ページ・コンポーネントです。

## インストール

Node.js LTS が必要です（CI がビルド対象とするバージョン）。

boilerplate はパッケージとして install するものではなく、クローンして使います。

```sh
git clone https://github.com/openreachtech/furo-boilerplate-nuxt.git <your-project>
cd <your-project>
npm install
cp .furo-env.example .furo-env.development
npm run dev
```

CI は `npm ci --legacy-peer-deps` で install します。クリーンな install が peer dependency で止まるときは、同じフラグを使ってください。

`package.json` の `name` / `version` / `description` は `TODO` のプレースホルダーのまま同梱されています。最初に埋めてください。

ES モジュール（`"type": "module"`）です。import は ESM の `import` 構文で記述してください。

## 使い方

### コマンド

| コマンド | 内容 |
| :-- | :-- |
| `npm run dev` | `node_modules/.cache` を捨ててから、Nuxt の開発サーバーを起動する |
| `npm run build` | 本番向けに `.output/` へビルドする |
| `npm run generate` | ビルドして、全ルートを静的ファイルとして事前レンダリングする |
| `npm start` | `npm run build` の成果物をローカル確認用に配信する |
| `npm test` | `tests/` に対して Jest を実行する |
| `npm run lint` | リポジトリ全体に ESLint をかける（別名: `npm run l`） |
| `npm run cache` | `node_modules/.cache` を削除する |

`npm test` は Jest と同じ引数を取ります。

```sh
npm test tests/__tests__/node/
npm test -- --watch
```

### 設定が既に決めていること

`nuxt.config.js` は、いくつかの箇所で Nuxt の既定から離れています。そのどれもが、アプリケーションが引き継ぐルールです。

| 設定 | 意味 |
| :-- | :-- |
| `ssr: false` | シングルページアプリケーションであり、描画はブラウザーだけで行う |
| `imports.autoImport: false` | Nuxt の auto-import は無効。composable もヘルパーも、名前を書いて import する |
| `components.dirs: []` | コンポーネントは自動登録しない。import して `components:` に宣言する |
| `modules: ['@nuxt/icon']` | 登録されている唯一のモジュール。`<Icon>` が使えるのはこれによる |
| `pages:extend` フック | `pages/` 配下の `.js` はルートテーブルから外れる。ページのコンテキストクラスを `.vue` の隣に置けるようにするため |
| `runtimeConfig` | 環境ファイルの値を、サーバー側の設定と `public` の両方に展開する |
| `watch` | `.furo-env.development` を編集すると開発サーバーが再起動する |

グローバル CSS の読み込み順は 1 つに決まっています。furo-nuxt の骨組みとなる 3 枚 — カスケードレイヤーの宣言、z-index の階層、リセット — 次に `assets/css/main.css`。

furo-nuxt はさらに 3 枚のスタイルシートを同梱していますが、このボイラープレートでは意図的に読み込みません。これらが決めることは、アプリケーションが決めるべきことだからです。

| スタイルシート | 何を決めてしまうか |
| :-- | :-- |
| `0010.variables-palette-color-scale.css` | 名前付きカラースケールのパレット |
| `0200.base.css` | 素の `<button>` `<h1>`〜`<h3>` `<input>` `<p>` `<section>` のデザイン |
| `0300.gimmick.css` | `.-trigger-unlock-*` / `.-aim-unlock` クラスと、`<dialog>` が開いている間の `<body>` のロック |

`nuxt.config.js` の `css` に戻すことは妨げませんが、アプリケーションが自前で書くことを意図しています。

furo-nuxt が読むだけで定義していないカスタムプロパティがあります。アプリケーション側で定義してください。リセットは `<p>` の行の高さに `--value-golden-ratio` を必要とします。残りは、それを読むコンポーネントを使う場合にだけ必要です。

| 読んでいるもの | カスタムプロパティ |
| :-- | :-- |
| `0100.reset.css` | `--value-golden-ratio` |
| `<FuroButtonDialog>` | `--size-thinnest` |
| `<FuroDialog>` | `--color-background-highlight`, `--color-text-highlight` |
| `<FuroOffCanvasMenuLayout>` | `--color-background-header`, `--color-background-nav`, `--size-header-height`, `--size-nav-width`, `--size-screen-height` |
| `<FuroPagination>` | `--color-background-highlight`, `--color-text-highlight`, `--color-background-hover`, `--color-text-hover`, `--color-disabled` |
| `<FuroTabLayout>` | `--color-background-highlight`, `--color-text-highlight` |

自前のスタイルシートで定義し、`nuxt.config.js` の `css` に、furo-nuxt の 3 枚より後・`main.css` より前で追加してください。

### アプリケーションのコードを置く場所

```
├── app/                          # アプリケーション全体で共有するコード
│   ├── constants.js              # ヘッダーキーとストレージキー
│   ├── globals/furo-env.js       # パース済みの .furo-env ファイル
│   ├── graphql/
│   │   ├── graphql.config.js     # エンドポイント URL。プラグイン時に埋まる
│   │   └── client/               # 基底クラス。クエリとミューテーションはここに書く
│   ├── restfulapi/renchan/       # renchan の RESTful API 向けの基底クラス
│   ├── shares/AppShare.js        # `$furo` として provide されるオブジェクト
│   └── vue/                      # コンテキストの基底クラスとページコンポーネントのファクトリー
├── assets/css/main.css           # アプリケーション全体のスタイルシート 1 枚
├── components/                   # コンポーネントはここに書く
├── composables/                  # composable はここに書く
├── layouts/default.vue           # 空のレイアウト。slot だけ
├── middleware/                   # グローバルミドルウェア。ファイル名順に実行される
├── pages/                        # ページはここに書く
├── plugins/000.furo.js           # 各 config を結線し、`$furo` を provide する
├── public/                       # そのまま配信されるファイル
├── tests/__tests__/              # Jest のテスト。環境ごとにディレクトリを分ける
└── types/                        # アンビエントな型宣言
```

アプリケーションによる実装を待っている箇所が、コード中にいくつか示されています。

| 対象 | 場所 |
| :-- | :-- |
| ゲートウェイが遷移させるサインインページ | `middleware/000.gateway.global.js` の `SIGN_IN_PATH`。同梱されているページは `pages/index.vue` だけ |
| クエリとミューテーション | `app/graphql/client/queries/`、`app/graphql/client/mutations/` |
| 全ページコンポーネントで共有する setup オプション | `app/vue/defineAppPageComponent.js` の `options` |
| ページタイトルのフォールバック | `middleware/010.pageTitle.global.js` |
| 環境変数の値 | `.furo-env.development`（`.furo-env.example` からコピーする） |
| パッケージ自身の識別情報 | `package.json` の `name` / `version` / `description` |

### クライアント

2 つのクライアント群は、アプリケーションが継承するための基底クラスとして置かれています。リポジトリに基底クラスがあることで、プロジェクト全体で 1 度だけ決めればよい判断 — 認証情報をどのヘッダーで運ぶか、URL をどのオブジェクトが持つか — を 1 箇所に置けます。

```
app/graphql/client/
├── BaseAppGraphqlLauncher.js              # launcher を graphql.config.js に結び付ける
├── BaseAppGraphqlPayload.js               # アクセストークンのヘッダーを足す
├── BaseAppGraphqlCapsule.js
├── BaseAppGraphqlSubscriber.js            # subscription の 3 クラス
├── BaseAppSubscriptionGraphqlPayload.js
├── BaseAppSubscriptionGraphqlCapsule.js
├── queries/                               # クエリはここに書く
└── mutations/                             # ミューテーションはここに書く
```

`app/restfulapi/renchan/` は、renchan の RESTful API に対する同じ役割のクラス群です。payload クラスは、加えて `/v1` のパスプレフィックスを固定します。

どちらの config オブジェクトも手で書くものではありません。`plugins/000.furo.js` が起動時に `runtimeConfig.public` からエンドポイント URL を `app/graphql/graphql.config.js` と `app/restfulapi/renchan/restfulapi.config.js` に写し（GraphQL 側は、すでに何かが設定していればそのまま残します）、続けて subscription のコネクターを含む `AppShare` を `$furo` として provide します。

### コンテキストとページコンポーネント

コンポーネントのロジックは `setup()` ではなくコンテキストクラスに置きます。`BaseAppContext` は furo-nuxt の `BaseFuroContext` を継承したクラスで、すべてのコンテキストに必要なヘルパーはここに置きます。コンポーネントは `setup()` で自分のコンテキストを生成して 1 つの名前で公開し、テンプレートはそこからだけ読みます。

`app/vue/defineAppPageComponent.js` は、共有の setup オプションをコンポーネント自身の `setup()` より先に実行する `defineComponent` を組み立てます。そのリストは空の状態で同梱されており、`app/vue/shared-component-options.js` が、そこへの登録を待っているオプションです。マウント時に `runtimeConfig.public` をセッションストレージの `furoEnv` へ書き込みます。

### グローバルミドルウェア

| ミドルウェア | 内容 |
| :-- | :-- |
| `000.gateway.global.js` | アクセストークンが無ければ `/sign-in?redirect=<要求されたパス>` へ遷移させる |
| `010.pageTitle.global.js` | ページのタイトルをルートメタから付ける。無ければ `Furo Nuxt` |

どちらも `FuroMeta` を通してルートの `$furo` メタを読みます。つまりページは、自分の条件を自分で宣言します。

```js
definePageMeta({
  $furo: {
    pageTitle: 'Home',
    skipFilter: true,
  },
})
```

`skipFilter` は、サインインせずに到達できるページが宣言するものです。`composables/useRedirect.js` はゲートウェイのもう半分で、サインイン後に、ミドルウェアが付けた `redirect` クエリの先へ送り出します。

### 環境変数

値は `NuxtFuroEnvLoader` 経由で読みます。リポジトリルートにある、`NODE_ENV` の名前が付いた dotenv ファイルをパースします。development なら `.furo-env.development`、Jest なら `.furo-env.test`、production なら `.furo-env` です。Nuxt はその値を `runtimeConfig` と `runtimeConfig.public` の両方に展開し、`public` はブラウザーに届きます。秘密の値をこのファイルに置いてはいけません。

| 変数 | 決めるもの |
| :-- | :-- |
| `ENDPOINT_URL` | launcher が POST する GraphQL のエンドポイント |
| `WEBSOCKET_URL` | subscription が接続するエンドポイント |
| `RENCHAN_RESTFUL_API_BASE_URL` | RESTful API の launcher が `/v1` を付ける前のオリジン |

コピー元は `.furo-env.example` です。`.furo-env` と `.furo-env.development` は git の管理外で、`.furo-env.test` は同梱されています。テストが固定値を前提に検証するためです。

### テスト

Jest は 2 つのプロジェクトを実行します。テストの環境を決めるのは、その置き場所です。DOM やウェブストレージに触れるものは `tests/__tests__/jsdom/`、それ以外は `tests/__tests__/node/` に置きます。`@/` と `~/` は、アプリケーションコードと同じくリポジトリルートを指します。

## API

クラスメンバーは以下の表記に従って記述します。

| notation | members |
| :-- | :-- |
| `#instanceProperty` | instance property |
| `#instanceMethod()` | instance method |
| `#get:instanceGetter` | instance getter |
| `#set:instanceSetter` | instance setter |
| `.staticProperty` | static property |
| `.staticMethod()` | static method |
| `.get:staticGetter` | static getter |
| `.set:staticSetter` | static setter |

### `BaseAppGraphqlPayload`

アクセストークンはここで付きます。クエリの側が覚えておく必要はありません。subscription 向けには `BaseAppSubscriptionGraphqlPayload` が同じ 3 メンバーを持ちます。

| メンバー | 説明 |
| :-- | :-- |
| `.collectBasedHeadersOptions()` | furo が集めるヘッダーオプションに、トークンが保存されていればアクセストークンのヘッダーを加えて返す |
| `.loadAccessToken()` | ストレージからアクセストークンを読む |
| `.createStorageClerk()` | 上記 2 つが経由するストレージ clerk を生成する（ローカルストレージ） |

トークンを別の場所に持つアプリケーションは、`.createStorageClerk()` だけを override します。

### `BaseAppRenchanRestfulApiPayload`

| メンバー | 説明 |
| :-- | :-- |
| `.get:ACCESS_TOKEN_HEADER_KEY` | アクセストークンを送るヘッダー |
| `.get:ACCESS_TOKEN_STORAGE_KEY` | アクセストークンを読み出すストレージキー |
| `.get:prefixPathname` | `/v1`。launcher が要求する全パスの前に付く |

### `BaseAppGraphqlLauncher`, `BaseAppRenchanRestfulApiLauncher`

| メンバー | 説明 |
| :-- | :-- |
| `.get:graphqlConfig` | GraphQL の config オブジェクト（`app/graphql/graphql.config.js`） |
| `.get:restfulApiConfig` | RESTful API の config オブジェクト（`app/restfulapi/renchan/restfulapi.config.js`） |

### `useRedirect()`

```js
const {
  redirectTo,
} = useRedirect({
  defaultPath: '/',
})

await redirectTo()
```

| メンバー | 説明 |
| :-- | :-- |
| `redirectTo()` | `path` へ遷移する。指定が無ければルートの `redirect` クエリへ、それも無ければ `defaultPath` へ |

## アクセストークンの流れ

アクセストークンは、クライアントが持つ認証情報のすべてであり、ローカルストレージに置かれます。そのキーは 2 箇所に書かれています。payload クラスが読む `app/constants.js` の `STORAGE_KEY.ACCESS_TOKEN` と、ゲートウェイのミドルウェアが読む furo-nuxt 内の `AccessTokenClerk.STORAGE_KEY` です。どちらも `access_token` であり、一致していなければなりません。

出ていくとき、トークンを付けるのは呼び出し側ではなく payload クラスです。`collectBasedHeadersOptions()` が `x-renchan-access-token` に載せます。renchan のサーバーが認証情報を読むヘッダーです。したがって「トークンを送り忘れたクエリ」は、アプリケーションが書こうとしても書けません。

ゲートウェイが問うのは、トークンが存在するかどうかだけです。まだ有効かどうかは問いません。その答えはエンドポイントのものであり、失効したトークンを載せたリクエストは拒否されて返ってきます。つまりこのミドルウェアは、データを守る門ではなく訪問者への便宜です。クライアントが何を見られるかは、毎回サーバーが決めます。

boilerplate 自身はサインインを行いません。サインインはアプリケーションが書くものであり、その結果が入る先が `AccessTokenClerk#saveToken()` です。以後、すべての launcher がヘッダーを携え、ゲートウェイは訪問者を通します。`ssr: false` なので、これらはすべてブラウザーで起きます。だからこそ、最初の遷移の時点でストレージに手が届きます。

## コントリビューション

バグ報告・機能要望・コード貢献を歓迎します。

GitHub Issues からお気軽にご連絡ください。

```sh
git clone https://github.com/openreachtech/furo-boilerplate-nuxt.git
cd furo-boilerplate-nuxt
npm install
npm run lint
npm test
```

## ライセンス

本プロジェクトは Apache License 2.0 で公開されています。

詳細は [LICENSE ファイル](./LICENSE) を参照してください。

## 開発者

[Open Reach Tech Inc.](https://openreach.tech)

## 著作権

© 2026 Open Reach Tech Inc.
