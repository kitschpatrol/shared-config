# shared-config

## Overview

A collection of shared configurations for various linters and tools.

This package takes a maximalist approach, bundling plugins I need on a regular basis into a single dependency.

It takes care of dependencies and configurations for:

- CSpell
- ESLint (including Svelte, Astro, and Typescript support)
- Stylelint
- markdownlint
- NPM (`.npmrc` config)
- Prettier (including a bunch of extra plugins)
- VSCode (extension recommendations and extension settings)

It's only been tested with `pnpm`.

## Setup

1. Install the requisite `.npmrc`:

   ```sh
   pnpm dlx @kitschpatrol/npm-config
   ```

2. Install the package:

   ```sh
   pnpm add -D @kitschpatrol/shared-config
   ```

3. Add default config files for all the tools to your project root:

   ```sh
   pnpm shared-config --init
   ```

4. Add helper scripts to your `package.json`:

   These work a bit like [npm-run-all](https://github.com/mysticatea/npm-run-all) to invoke all of the bundled tools.

   ```json
   ...
   "scripts": {
     "format": "shared-config --fix",
     "lint": "shared-config --lint",
   }
   ...
   ```

   Note that Prettier formatting for Ruby requires some extra legwork to configure, see [`@kitschpatrol/prettier-config`](https://github.com/kitschpatrol/prettier-config) for more details.

## Usage

Various VSCode plugins should "just work".

To lint your entire project, after configuring the `package.json` as shown above:

```sh
pnpm run lint
```

To run all of the tools in a _potentially destructive_ "fix" capacity:

```sh
pnpm run format
```

## Todo

- [ ] `.tsconfig`?
- [ ] Interactive override / merge prompt
- [ ] DRY script invocation / initial config copying?

## Issues

- CSpell, markdownlint, ESLint, and Prettier all need to be hoisted via `public-hoist-pattern` to be accessible in `pnpm exec` scripts and to VSCode plugins.

- Even basic file-only packages like `vscode-config` and `npm-config` seem to need to be hoisted via for their bin scripts to be accessible via `pnpm exec`

## Dev Notes

- Note that `prettier` and `eslint` packages are [hoisted by default](https://pnpm.io/npmrc#public-hoist-pattern) in `pnpm`

- For local development via `pnpm`, use `file:` dependency protocol instead of `link:`

## Reference projects

- [1stG/configs](https://github.com/1stG/configs)
- [sheriff](https://www.eslint-config-sheriff.dev)
- [xo](https://github.com/xojs/xo)
- [standard](https://standardjs.com)
- [routine-npm-packages](https://github.com/kachkaev/routine-npm-packages) and [example](https://github.com/kachkaev/website)
- [trunk](https://trunk.io)
