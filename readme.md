# 🔬 @kitschpatrol/shared-config

## Overview

A collection of shared configurations for various linters and tools.

This package takes a maximalist approach, bundling plugins I need on a regular basis into a single dependency.

It takes care of dependencies and configurations for:

- [CSpell](https://cspell.org)
- [ESLint](https://eslint.org) (including Svelte, Astro, and TypeScript support)
- [Stylelint](https://stylelint.io)
- [remarklint](https://github.com/remarkjs/remark-lint)
- [Prettier](https://prettier.io) (including a bunch of extra plugins)
- [VS Code](https://code.visualstudio.com) (extension recommendations and extension settings)
- Minimal repo boilerplate (`.npmrc`, `.gitignore`, etc.)

This collection of pre-configured tools may be added to a project as a single dependency, and run simultaneously over a repo with a single command with options to either check or (where possible) fix.

It's only been tested with `pnpm`.

## Quick setup

Assumes a completely empty folder.

```sh
pnpm init && pnpm pkg set type="module" && pnpm dlx @kitschpatrol/repo-config --init && pnpm add -D @kitschpatrol/shared-config && pnpm shared-config --init
```

## Quick add

Assumes an existing project, might overwrite certain config file so commit first.

```sh
pnpm dlx @kitschpatrol/repo-config --init && pnpm i && pnpm add -D @kitschpatrol/shared-config && pnpm shared-config --init
```

## Setup

1. Install the requisite `.npmrc`:

   ```sh
   pnpm dlx @kitschpatrol/repo-config --init
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

Various VS Code plugins should "just work".

To lint your entire project, after configuring the `package.json` as shown above:

```sh
pnpm run lint
```

To run all of the tools in a _potentially destructive_ "fix" capacity:

```sh
pnpm run format
```

## Package architecture

Each package has a simple `/src/cli.ts` file which defines the behavior of its eponymous binary. The build step turns these into node scripts, providing default implementations where feasible.

The monorepo must be kept intact, as the sub-packages depend on scripts in the parent during build.

## Building

The repo uses placeholders for the bin script for each tool to avoid circular dependency issues during `pnpm install`.

To tell git to ignore changes to the placeholders, run `pnpm run bin-ignore`.

## Issues

- CSpell, markdownlint, ESLint, and Prettier all need to be hoisted via `public-hoist-pattern` to be accessible in `pnpm exec` scripts and to VS Code plugins.

- Even basic file-only packages like `repo-config` seem to need to be hoisted via for their bin scripts to be accessible via `pnpm exec`

## Dev notes

- Note that `prettier` and `eslint` packages are [hoisted by default](https://pnpm.io/npmrc#public-hoist-pattern) in `pnpm`

- For local development via `pnpm`, use `file:` dependency protocol instead of `link:`

- [Approach](https://github.com/antfu/eslint-config#vs-code-support-auto-fix) to ignoring style rules in VS Code.

## Reference projects

- [1stG/configs](https://github.com/1stG/configs)
- [antfu/eslint-config](https://github.com/antfu/eslint-config)
- [awesome-eslint](https://github.com/dustinspecker/awesome-eslint)
- [lass](https://lass.js.org) (xo etc.)
- [routine-npm-packages](https://github.com/kachkaev/routine-npm-packages) and [example](https://github.com/kachkaev/website)
- [sheriff](https://www.eslint-config-sheriff.dev)
- [standard](https://standardjs.com)
- [trunk](https://trunk.io)
- [xo](https://github.com/xojs/xo)
- [vscode-file-nesting-config](https://github.com/antfu/vscode-file-nesting-config)
- [NullVoxPopuli/eslint-configs](https://github.com/NullVoxPopuli/eslint-configs)
- [tsconfig/bases](https://github.com/tsconfig/bases/tree/main)
