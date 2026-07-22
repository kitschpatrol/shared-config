<!-- title -->

# @kitschpatrol/prettier-config

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/prettier-config](https://img.shields.io/npm/v/@kitschpatrol/prettier-config.svg)](https://npmjs.com/package/@kitschpatrol/prettier-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit/)

<!-- /badges -->

<!-- description -->

**Prettier configuration for @kitschpatrol/shared-config.**

<!-- /description -->

## Overview

It's a shared [Prettier](https://prettier.io) config, plus a command-line tool `ksc-prettier` to perform Prettier-related project initialization, linting, and fixing.

<!-- recommendation -->

> [!IMPORTANT]
>
> **You can use this package on its own, but it's recommended to use [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) instead for a single-dependency and single-package approach to linting and fixing your project.**
>
> This package is included as a dependency in [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config), which also automatically invokes the command line functionality in this package via its `ksc` command

<!-- /recommendation -->

## Setup

To use just this Prettier config in isolation:

1. Install the basic repository configuration files in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm --package=@kitschpatrol/repo-config dlx ksc-repo init
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/prettier-config
   ```

3. Add the starter `.prettierrc.js` and `.prettierignore` files to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec ksc-prettier init
   ```

## Usage

The Prettier binary should be picked up automatically by VS Code plugins.

You can call it directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
{
  "scripts": {
    "lint": "ksc-prettier lint",
    "fix": "ksc-prettier fix"
  }
}
```

You might need to pass certain plugins in explicitly if you're calling `prettier` directly. The `ksc-prettier fix` and `ksc-prettier lint` scripts take care of this for you.

### Configuration

To create a `prettier.config.ts` in your project root:

```sh
pnpm exec ksc-prettier init
```

(Note that this will delete the `prettier` property in your `package.json`!)

_Or_

To create a `prettier` property in `package.json`:

```sh
pnpm exec ksc-prettier init --location package
```

(Note that this will delete the `prettier.config.ts` file in your project root!)

### CLI

<!-- cli-help -->

#### Command: `ksc-prettier`

Kitschpatrol's Prettier shared configuration tools.

This section lists top-level commands for `ksc-prettier`.

Usage:

```txt
ksc-prettier <command>
```

| Command        | Argument    | Description                                                                                                                            |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `init`         |             | Initialize by copying starter config files to your project root or to your package.json file.                                          |
| `lint`         | `[files..]` | Check that files are formatted according to your Prettier configuration. Matches files below the current working directory by default. |
| `fix`          | `[files..]` | Format files according to your Prettier configuration. Matches files below the current working directory by default.                   |
| `print-config` |             | Print the effective Prettier configuration. Package-scoped.. Searches up to the root of a monorepo if necessary..                      |

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

_See the sections below for more information on each subcommand._

#### Subcommand: `ksc-prettier init`

Initialize by copying starter config files to your project root or to your package.json file.

Usage:

```txt
ksc-prettier init
```

| Option              | Description                       | Type                 | Default  |
| ------------------- | --------------------------------- | -------------------- | -------- |
| `--location`        | Where to store the configuration. | `"file"` `"package"` | `"file"` |
| `--help`<br>`-h`    | Show help                         | `boolean`            |          |
| `--version`<br>`-v` | Show version number               | `boolean`            |          |

#### Subcommand: `ksc-prettier lint`

Check that files are formatted according to your Prettier configuration. Matches files below the current working directory by default.

Usage:

```txt
ksc-prettier lint [files..]
```

| Positional Argument | Description                    | Type    | Default |
| ------------------- | ------------------------------ | ------- | ------- |
| `files`             | Files or glob pattern to lint. | `array` | `"."`   |

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-prettier fix`

Format files according to your Prettier configuration. Matches files below the current working directory by default.

Usage:

```txt
ksc-prettier fix [files..]
```

| Positional Argument | Description                   | Type    | Default |
| ------------------- | ----------------------------- | ------- | ------- |
| `files`             | Files or glob pattern to fix. | `array` | `"."`   |

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-prettier print-config`

Print the effective Prettier configuration. Package-scoped.. Searches up to the root of a monorepo if necessary..

Usage:

```txt
ksc-prettier print-config
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

<!-- /cli-help -->

### VS Code tasks

`ksc-prettier init` adds a `.vscode/tasks.json` with two tasks:

- **`ksc-prettier lint`** runs `ksc-prettier lint --format machine`, checking that files are formatted
- **`ksc-prettier fix`** runs `ksc-prettier fix --format machine`, formatting files and reporting anything Prettier can't process

If you're using the complete [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) package, you'd more likely want to run:

- **`ksc lint`** runs `ksc lint --format machine`, which runs all `ksc lint` tools across the whole project
- **`ksc fix`** runs `ksc fix --format machine`, which applies all `ksc fix` auto-fixes and reports anything unfixable

Run them via the _Tasks: Run Task_ command (or the _Terminal → Run Task…_ menu item).

Each task's problem matcher parses the machine-format output and populates VS Code's [Problems panel](https://code.visualstudio.com/docs/debugtest/debugging#_errors-and-warnings) with every reported issue, pointing to the offending file, line, and column.

The tasks share a problem matcher owner with the other `@kitschpatrol/shared-config` tasks, so the panel reflects the most recent run rather than stacking duplicates.

If your project already has a `.vscode/tasks.json`, `init` merges by task label: your own tasks are left alone, and same-label tasks are replaced with the latest definitions.

### API

The package also exports `fix`, `fixFile` functions for formatting code programmatically, pre-configured with the shared Prettier configuration.

```typescript
import { clearCache, fix, fixFile } from '@kitschpatrol/prettier-config'

// Format a string (defaults to TypeScript parser)
const formatted = await fix('const x=1')

// Format with a virtual filepath for parser inference and override matching
const markdown = await fix('# Hello\nworld', 'file.md')

// Both filepath and config overrides
const result = await fix('const x = 1', 'file.ts', { printWidth: 80 })

// Format a file in place with config overrides
await fixFile('./src/index.ts', { printWidth: 80 })

// Clear cached Prettier module and resolved plugin paths
clearCache()
```

Config is resolved in priority order: shared defaults < local project config (via `prettier.resolveConfig`) < per-call overrides.

The Prettier module and resolved plugin paths are cached internally for performance across multiple calls. Use `clearCache()` to force re-initialization.

## Astro support

Note that this configuration uses the [@kitschpatrol/prettier-plugin-astro](https://github.com/kitschpatrol/prettier-plugin-astro) fork of the official [Prettier plugin for Astro project](https://github.com/withastro/prettier-plugin-astro).

This fork includes some fixes not yet merged into the official project.

## Ruby support

Ruby formatting Expects a global Ruby install >=2.7 with the following gems:

- `bundler`
- `prettier_print`
- `syntax_tree`
- `syntax_tree-haml`
- `syntax_tree-rbs`

Locally, I provide this via `rbenv` at `~/.rbenv/shims/ruby`, but other install techniques should work.

Note: Do _not_ add `plugins: ['prettier-plugin-ruby']` to the per-file scope, it must be global.

## SQL support

Earlier versions of @kitschpatrol/prettier-config bundled [`prettier-plugin-sql`](https://github.com/un-ts/prettier/tree/master/packages/sql) for SQL formatting, but this has been removed due to the remarkable size of its `node-sql-parser` parser dependency.

## Tabs vs. spaces

Tabs are unambiguously preferred wherever the file format specification does not mandate spaces.

Note that despite widely-accepted FUD regarding JSON requiring spaces, the [specification](https://www.json.org/json-en.html) indicates otherwise. So we use tabs.

The reluctant exceptions are:

### YAML

Spaces are required by the [specification](https://yaml.org/spec/1.2.2/#61-indentation-spaces).

### Markdown and MDX

Spaces are not technically required, but are specified in alignment with the [Remark project's conclusions](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-tabs#recommendation) and to prevent fragility in YAML frontmatter.

## Shared plugins

See discussion in [this prettier issue](https://github.com/prettier/prettier/issues/15667). We set the `plugins` array in the shared config, and make sure that the plugin dependencies are hoisted by PNPM as specified in the `pnpm-workspace.yaml` file.

<!-- license -->

## License

[MIT](license.txt) © [Eric Mika](https://ericmika.com)

<!-- /license -->
