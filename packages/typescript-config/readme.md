<!-- title -->

# @kitschpatrol/typescript-config

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/typescript-config](https://img.shields.io/npm/v/@kitschpatrol/typescript-config.svg)](https://www.npmjs.com/package/@kitschpatrol/typescript-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit)

<!-- /badges -->

<!-- description -->

**TypeScript configuration for @kitschpatrol/shared-config.**

<!-- /description -->

## Overview

It's a shared [TypeScript](https://www.typescriptlang.org/) `tsconfig.json` config, plus a command-line tool `ksc-typescript` to perform TypeScript-related validation and linting.

<!-- recommendation -->

> [!IMPORTANT]
>
> **You can use this package on its own, but it's recommended to use [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) instead for a single-dependency and single-package approach to linting and fixing your project.**
>
> This package is included as a dependency in [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config), which also automatically invokes the command line functionality in this package via its `ksc` command

<!-- /recommendation -->

## Setup

> [!NOTE]
>
> The package treats `typescript` as a peer dependency — it expects you to have `typescript` installed in your project.

To use just this TypeScript config in isolation:

1. Install the basic repository configuration files in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm --package=@kitschpatrol/repo-config dlx ksc-repo init
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/typescript-config
   ```

3. Add the starter `tsconfig.json` and `tsconfig.build.json` files to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec ksc-typescript init
   ```

### Astro and Svelte projects

Framework-specific configs are also exported. Each extends the base config and overrides only what the framework requires.

In an Astro project, the entire `tsconfig.json` is:

```json
{
  "extends": "@kitschpatrol/typescript-config/astro"
}
```

This mirrors the `astro/tsconfigs/strict` preset that `create-astro` scaffolds by default, including the `.astro/types.d.ts` include and `dist` exclude, layered over the base config.

In a SvelteKit project, extend both this config and SvelteKit's generated config, with the generated config last so its per-project `paths`, `rootDirs`, `include`, and `exclude` take precedence:

```json
{
  "extends": ["@kitschpatrol/typescript-config/svelte", "./.svelte-kit/tsconfig.json"]
}
```

This mirrors the `tsconfig.json` that `sv create` scaffolds for SvelteKit projects. Standalone Svelte projects without SvelteKit (Vite's split `tsconfig.app.json` / `tsconfig.node.json` layout) aren't covered by this config.

See the [Svelte and Astro caveat](#svelte-and-astro-caveat) below for how `ksc-typescript lint` handles type checking in these projects.

## Usage

You can call `ksc-typescript` directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
{
  "scripts": {
    "lint": "ksc-typescript lint"
  }
}
```

### Ignoring files

See the `tsconfig.json` [`exclude`](https://www.typescriptlang.org/tsconfig/#exclude) key.

`.gitignore` files are not ignored.

### Ignoring code

See [the TypeScript directive comments documentation](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check) for more details.

Entire files (at top):

`/* @ts-nocheck */`

Next line:

`/* @ts-ignore */`

or

`/* @ts-expect-error - reason */`

### CLI

<!-- cli-help -->

#### Command: `ksc-typescript`

Kitschpatrol's TypeScript shared configuration tools.

This section lists top-level commands for `ksc-typescript`.

Usage:

```txt
ksc-typescript <command>
```

| Command        | Description                                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `init`         | Initialize by copying starter config files to your project root.                                                                        |
| `lint`         | Run type checking on your project. Package-scoped. In a monorepo, it will also run in all packages below the current working directory. |
| `print-config` | Print the TypeScript configuration for the project. Package-scoped. Searches up to the root of a monorepo if necessary.                 |

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

_See the sections below for more information on each subcommand._

#### Subcommand: `ksc-typescript init`

Initialize by copying starter config files to your project root.

Usage:

```txt
ksc-typescript init
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

#### Subcommand: `ksc-typescript lint`

Run type checking on your project. Package-scoped. In a monorepo, it will also run in all packages below the current working directory.

Usage:

```txt
ksc-typescript lint
```

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-typescript print-config`

Print the TypeScript configuration for the project. Package-scoped. Searches up to the root of a monorepo if necessary.

Usage:

```txt
ksc-typescript print-config
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

<!-- /cli-help -->

### VS Code tasks

`ksc-typescript init` adds a `.vscode/tasks.json` with a single task:

- **`ksc-typescript lint`** runs `ksc-typescript lint --format machine`, type checking the project

If you're using the complete [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) package, you'd more likely want to run:

- **`ksc lint`** runs `ksc lint --format machine`, which runs all `ksc lint` tools across the whole project
- **`ksc fix`** runs `ksc fix --format machine`, which applies all `ksc fix` auto-fixes and reports anything unfixable

Run them via the _Tasks: Run Task_ command (or the _Terminal → Run Task…_ menu item).

Each task's problem matcher parses the machine-format output and populates VS Code's [Problems panel](https://code.visualstudio.com/docs/editing/editingevolved#_errors-warnings) with every reported issue, pointing to the offending file, line, and column.

The tasks share a problem matcher owner with the other `@kitschpatrol/shared-config` tasks, so the panel reflects the most recent run rather than stacking duplicates.

If your project already has a `.vscode/tasks.json`, `init` merges by task label: your own tasks are left alone, and same-label tasks are replaced with the latest definitions.

## Notes

### Svelte and Astro caveat

The `tsc` command ignores `.svelte` and `.astro` files, and [errors](https://github.com/sveltejs/language-tools/issues/2527) on plain `.ts` files that import them. So, if `svelte-check` or `@astrojs/check` is declared in your package's dependencies or devDependencies, the `ksc-typescript lint` command runs that checker instead of `tsc --noEmit`:

- `svelte-check` → `svelte-check --tsconfig ./tsconfig.json` (covers `.svelte` and plain `.ts` / `.js` files)
- `@astrojs/check` → `astro check` (covers `.astro` and plain `.ts` / `.js` files)
- Both → `astro check` plus `svelte-check` scoped to `.svelte` files only

If neither checker is declared, `tsc --noEmit` runs as usual, even in projects with a `svelte.config.js` or `astro.config.mjs` file.

### General

- [tsconfig Cheat Sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet)

### Other shared tsconfig projects

- [tsconfig/bases](https://github.com/tsconfig/bases)
- [sindresorhus/tsconfig](https://github.com/sindresorhus/tsconfig)
- [total-typescript/tsconfig](https://github.com/total-typescript/tsconfig)

### Future integrations

- [Are The Types Wrong](https://github.com/arethetypeswrong/arethetypeswrong.github.io),\
  e.g. `attw --format ascii --no-summary --profile esm-only --pack .`

<!-- license -->

## License

[MIT](license.txt) © [Eric Mika](https://ericmika.com)

<!-- /license -->
