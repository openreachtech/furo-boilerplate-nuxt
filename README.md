# furo-boilerplate-nuxt

A running skeleton for a Nuxt application built on [furo-nuxt](https://github.com/openreachtech/furo-nuxt) — GraphQL and RESTful API clients, an access-token gateway, and the context class family, already wired together.

## Table of contents

- [Concept](#concept)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [How the access token travels](#how-the-access-token-travels)
- [Contribution](#contribution)
- [License](#license)
- [Developer](#developer)
- [Copyright](#copyright)

## Concept

[furo](https://github.com/openreachtech/furo) is a client-side framework whose requests are assembled from classes — a launcher, a payload, a capsule — instead of being written call by call, and `furo-nuxt` binds it to Nuxt and Vue. This repository is the starting point for an application built on the two.

It is not what `nuxt init` leaves behind. Clone it, install, and a single-page application already runs: the GraphQL and RESTful API clients take their endpoints from an environment file, every request that leaves carries the access token out of storage, a global middleware turns an anonymous visit into a redirect to the sign-in page, and each page names its own title in its route meta. What is left is the application's own queries, pages and components.

## Installation

Requires Node.js LTS (the version the CI builds against).

A boilerplate is cloned, not installed as a package.

```sh
git clone https://github.com/openreachtech/furo-boilerplate-nuxt.git <your-project>
cd <your-project>
npm install
cp .furo-env.example .furo-env.development
npm run dev
```

CI installs with `npm ci --legacy-peer-deps`. Reach for the same flag if a peer dependency stops a clean install.

`package.json` ships `name`, `version` and `description` as `TODO` placeholders — fill them in first.

The project is an ES module (`"type": "module"`); write imports with ESM `import` syntax.

## Usage

### Commands

| command | what it does |
| :-- | :-- |
| `npm run dev` | discard `node_modules/.cache`, then run the Nuxt dev server |
| `npm run build` | build for production, into `.output/` |
| `npm run generate` | build and pre-render every route as static files |
| `npm start` | serve what `npm run build` produced, for local testing |
| `npm test` | run Jest over `tests/` |
| `npm run lint` | ESLint over the repository (alias: `npm run l`) |
| `npm run cache` | delete `node_modules/.cache` |

`npm test` takes the same arguments as Jest.

```sh
npm test tests/__tests__/node/
npm test -- --watch
```

### What the configuration has already decided

`nuxt.config.js` departs from the Nuxt defaults in a few places, and every one of them is a rule the application inherits.

| setting | what it means |
| :-- | :-- |
| `ssr: false` | the application is a single-page application, rendered in the browser alone |
| `imports.autoImport: false` | Nuxt's auto-imports are off — every composable and helper is imported by name |
| `components.dirs: []` | components are not auto-registered — a component is imported and declared in `components:` |
| `modules: ['@nuxt/icon']` | the one module registered, and what makes `<Icon>` available |
| the `pages:extend` hook | `.js` files under `pages/` are dropped from the route table, so a page's context class can sit beside its `.vue` file |
| `runtimeConfig` | the environment file's values, spread into the server config and into `public` alike |
| `watch` | editing `.furo-env.development` restarts the dev server |

Global CSS is loaded in one order: furo-nuxt's three structural stylesheets — the cascade layer declaration, the z-index layers and the reset — then `assets/css/variables.css` and `assets/css/main.css`.

furo-nuxt ships three more stylesheets that this boilerplate deliberately does not load, because what they decide belongs to the application:

| stylesheet | what it would decide |
| :-- | :-- |
| `0010.variables-palette-color-scale.css` | a palette of named colour scales |
| `0200.base.css` | a design for bare `<button>`, `<h1>`~`<h3>`, `<input>`, `<p>` and `<section>` |
| `0300.gimmick.css` | the `.-trigger-unlock-*` / `.-aim-unlock` classes, and locking `<body>` behind an open `<dialog>` |

Nothing stops you from adding one back to `css` in `nuxt.config.js`, but the intent is that the application writes its own.

Some custom properties furo-nuxt reads it never declares, so the application has to. `assets/css/variables.css` is where they go: it names every one of them and sets none of them — each is commented out, waiting for the application to choose a value. The reset reads `--value-golden-ratio` and so is always in effect; the rest matter only when the component that reads them is used.

| what reads it | custom properties |
| :-- | :-- |
| `0100.reset.css` | `--value-golden-ratio` |
| `<FuroButtonDialog>` | `--size-thinnest` |
| `<FuroDialog>` | `--color-background-highlight`, `--color-text-highlight` |
| `<FuroOffCanvasMenuLayout>` | `--color-background-header`, `--color-background-nav`, `--size-header-height`, `--size-nav-width`, `--size-screen-height` |
| `<FuroPagination>` | `--color-background-highlight`, `--color-text-highlight`, `--color-background-hover`, `--color-text-hover`, `--color-disabled` |
| `<FuroTabLayout>` | `--color-background-highlight`, `--color-text-highlight` |

None of this is the application's whole set of variables — it is the contract with furo-nuxt and no more. A palette and the sizes the application chooses for itself belong in a stylesheet of their own, added to `css` in `nuxt.config.js`.

### Where the application code goes

```
├── app/                          # code the whole application shares
│   ├── constants.js              # the header key and the storage keys
│   ├── globals/furo-env.js       # the parsed .furo-env file
│   ├── graphql/
│   │   ├── graphql.config.js     # the endpoint URLs, filled in at plugin time
│   │   └── client/               # base classes; write the queries and mutations here
│   ├── restfulapi/renchan/       # base classes for a renchan RESTful API
│   ├── shares/AppShare.js        # the object provided as `$furo`
│   └── vue/                      # the context base class and the page component factory
├── assets/css/
│   ├── variables.css             # the custom properties furo-nuxt expects, none of them set
│   └── main.css                  # application-wide styles
├── components/                   # write the components here
├── composables/                  # write the composables here
├── layouts/default.vue           # an empty layout — a slot and nothing else
├── middleware/                   # global middlewares, run in file name order
├── pages/                        # write the pages here
├── plugins/000.furo.js           # wires the configs, and provides `$furo`
├── public/                       # files served as they are
├── tests/__tests__/              # Jest tests, one directory per environment
└── types/                        # ambient type declarations
```

Several places are marked in the code as waiting for the application.

| what | where |
| :-- | :-- |
| the sign-in page the gateway redirects to | `SIGN_IN_PATH` of `middleware/000.gateway.global.js`; `pages/index.vue` is the only page that ships |
| the queries and the mutations | `app/graphql/client/queries/`, `app/graphql/client/mutations/` |
| the setup options every page component shares | `options` of `app/vue/defineAppPageComponent.js` |
| the fallback page title | `middleware/010.pageTitle.global.js` |
| the environment values | `.furo-env.development`, copied from `.furo-env.example` |
| the package's own identity | `name`, `version`, `description` of `package.json` |

### The clients

Both client families arrive as base classes for the application to extend. Having them in the repository is what lets a project-wide decision — which header carries the credential, which object holds the URL — be made once.

```
app/graphql/client/
├── BaseAppGraphqlLauncher.js              # binds the launcher to graphql.config.js
├── BaseAppGraphqlPayload.js               # adds the access-token header
├── BaseAppGraphqlCapsule.js
├── BaseAppGraphqlSubscriber.js            # the subscription trio
├── BaseAppSubscriptionGraphqlPayload.js
├── BaseAppSubscriptionGraphqlCapsule.js
├── queries/                               # write the queries here
└── mutations/                             # write the mutations here
```

`app/restfulapi/renchan/` holds the same roles for a renchan RESTful API, where the payload class also fixes the `/v1` path prefix.

Neither config object is filled in by hand. `plugins/000.furo.js` copies the endpoint URLs out of `runtimeConfig.public` into `app/graphql/graphql.config.js` and `app/restfulapi/renchan/restfulapi.config.js` at startup — leaving the GraphQL one alone if something has already set it — and then provides `AppShare` as `$furo`, the subscription connector included.

### Contexts and page components

Component logic goes into a context class rather than into `setup()`. `BaseAppContext` extends furo-nuxt's `BaseFuroContext` and is where a helper every context needs belongs. A component creates its context in `setup()` and exposes it under one name, and the template reads from that alone.

`app/vue/defineAppPageComponent.js` builds a `defineComponent` whose shared setup options run before the component's own `setup()`. The list ships empty, and `app/vue/shared-component-options.js` is the option waiting to be registered in it — on mount it writes `runtimeConfig.public` into session storage under `furoEnv`.

### Global middleware

| middleware | what it does |
| :-- | :-- |
| `000.gateway.global.js` | without an access token, redirect to `/sign-in?redirect=<the path asked for>` |
| `010.pageTitle.global.js` | title the page from its route meta, or `Furo Nuxt` |

Both read the route's `$furo` meta through `FuroMeta`, so a page states its own terms.

```js
definePageMeta({
  $furo: {
    pageTitle: 'Home',
    skipFilter: true,
  },
})
```

`skipFilter` is what a page reachable without signing in declares. `composables/useRedirect.js` is the other half of the gateway: once signed in, it sends the visitor to the `redirect` query the middleware attached.

### Environment variables

Values are read through `NuxtFuroEnvLoader`, which parses the dotenv file named after `NODE_ENV` in the repository root — `.furo-env.development` in development, `.furo-env.test` under Jest, and `.furo-env` in production. Nuxt spreads them into `runtimeConfig` and `runtimeConfig.public` alike, and `public` reaches the browser, so nothing secret belongs in the file.

| variable | what it decides |
| :-- | :-- |
| `ENDPOINT_URL` | the GraphQL endpoint the launchers post to |
| `WEBSOCKET_URL` | the endpoint a subscription connects to |
| `RENCHAN_RESTFUL_API_BASE_URL` | the origin the RESTful API launchers prefix with `/v1` |

`.furo-env.example` is the file to copy. `.furo-env` and `.furo-env.development` are ignored by git; `.furo-env.test` is committed, because the tests assert against fixed values.

### Tests

Jest runs two projects, and a test's directory is what chooses its environment — `tests/__tests__/jsdom/` for anything that touches the DOM or web storage, `tests/__tests__/node/` for everything else. `@/` and `~/` map to the repository root, as they do in the application code.

## API

Class members are written with the following notation.

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

The access token is attached here, so that no query has to remember it. `BaseAppSubscriptionGraphqlPayload` carries the same three members for subscriptions.

| member | description |
| :-- | :-- |
| `.collectBasedHeadersOptions()` | Return the header options furo collects, plus the access-token header when a token is stored |
| `.loadAccessToken()` | Read the access token out of storage |
| `.createStorageClerk()` | Build the storage clerk the two above go through — local storage |

An application that keeps the token somewhere else overrides `.createStorageClerk()` alone.

### `BaseAppRenchanRestfulApiPayload`

| member | description |
| :-- | :-- |
| `.get:ACCESS_TOKEN_HEADER_KEY` | The header the access token is sent in |
| `.get:ACCESS_TOKEN_STORAGE_KEY` | The storage key it is read from |
| `.get:prefixPathname` | `/v1`, prefixed to every path the launchers request |

### `BaseAppGraphqlLauncher`, `BaseAppRenchanRestfulApiLauncher`

| member | description |
| :-- | :-- |
| `.get:graphqlConfig` | The GraphQL config object — `app/graphql/graphql.config.js` |
| `.get:restfulApiConfig` | The RESTful API config object — `app/restfulapi/renchan/restfulapi.config.js` |

### `useRedirect()`

```js
const {
  redirectTo,
} = useRedirect({
  defaultPath: '/',
})

await redirectTo()
```

| member | description |
| :-- | :-- |
| `redirectTo()` | Navigate to `path`; with none given, to the route's `redirect` query, and failing that to `defaultPath` |

## How the access token travels

The access token is the whole of the client's credential, and it lives in local storage. Two places spell its key: `STORAGE_KEY.ACCESS_TOKEN` of `app/constants.js`, which the payload classes read, and `AccessTokenClerk.STORAGE_KEY` inside furo-nuxt, which the gateway middleware reads. Both are `access_token`, and they have to agree.

On the way out, the token is attached by the payload class rather than by the caller — `collectBasedHeadersOptions()` puts it into `x-renchan-access-token`, the header a renchan server reads a credential from. A query that forgets to send it is therefore not something the application can write.

The gateway asks only whether a token exists, never whether it is still valid. That answer belongs to the endpoint, and a request carrying a stale token comes back rejected. So the middleware is a convenience for the visitor rather than a guard on the data: what a client may see is decided at the server, every time.

Nothing in the boilerplate signs in. The sign-in itself is the application's to write, and `AccessTokenClerk#saveToken()` is where its answer goes; from that moment every launcher carries the header, and the gateway lets the visitor through. Since `ssr: false`, all of this happens in the browser, which is why storage is already reachable on the very first navigation.

## Contribution

Bug reports, feature requests, and code contributions are welcome.

Feel free to contact us through GitHub Issues.

```sh
git clone https://github.com/openreachtech/furo-boilerplate-nuxt.git
cd furo-boilerplate-nuxt
npm install
npm run lint
npm test
```

## License

This project is released under the Apache License 2.0.

For more details, please see [in the LICENSE file](./LICENSE).

## Developer

[Open Reach Tech Inc.](https://openreach.tech)

## Copyright

© 2026 Open Reach Tech Inc.
