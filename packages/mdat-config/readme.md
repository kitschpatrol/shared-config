<!-- title -->

# @kitschpatrol/mdat-config

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/mdat-config](https://img.shields.io/npm/v/@kitschpatrol/mdat-config.svg)](https://npmjs.com/package/@kitschpatrol/mdat-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit/)

<!-- /badges -->

<!-- description -->

**MDAT configuration for @kitschpatrol/shared-config.**

<!-- /description -->

## Overview

It's a shared [MDAT (Markdown Autophagic Template)](https://github.com/kitschpatrol/mdat) system config, plus a command-line tool `ksc-mdat` to perform mdat-related project initialization, linting, and fixing.

<!-- recommendation -->

> [!IMPORTANT]
>
> **You can use this package on its own, but it's recommended to use [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) instead for a single-dependency and single-package approach to linting and fixing your project.**
>
> This package is included as a dependency in [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config), which also automatically invokes the command line functionality in this package via its `ksc` command

<!-- /recommendation -->

## Setup

To use just `mdat-config` in isolation:

1. Install the basic repository configuration files in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm --package=@kitschpatrol/repo-config dlx ksc-repo init
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/mdat-config
   ```

3. Add the starter `.mdatrc.ts` file to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec ksc-mdat init
   ```

## Usage

The `mdat` binary is specified as a peer dependency, and should be installed up automatically by PNPM.

You can call it directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
{
  "scripts": {
    "lint": "ksc-mdat lint",
    "fix": "ksc-mdat fix"
  }
}
```

"Fix" in this case is a slight misnomer for consistency with the other shared-config tools.

It runs `mdat expand` to expand placeholder comments in your readme.md using the bundled [`mdat`](https://github.com/kitschpatrol/mdat/blob/main/packages/mdat/readme.md) expansion rules, plus custom rules provided by `mdat-config`'s `mdat.config.ts` file, plus any additional rules specified in the repository-specific `mdat.config.ts` file.

### Configuration

To create a `mdat.config.ts` in your project root:

```sh
pnpm exec ksc-mdat init
```

(Note that this will delete the `mdat` property in your `package.json`!)

_Or_

To create a `mdat` property in `package.json`:

```sh
pnpm exec ksc-mdat init --location package
```

(Note that this will delete the `mdat.config.ts` file in your project root!)

### CLI

<!-- cli-help -->

#### Command: `ksc-mdat`

Kitschpatrol's Mdat shared configuration tools.

This section lists top-level commands for `ksc-mdat`.

Usage:

```txt
ksc-mdat <command>
```

| Command        | Description                                                                                                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `init`         | Initialize by copying starter config files to your project root or to your package.json file.                                                                                                                     |
| `lint`         | Validate that all Mdat content placeholders in your readme.md file(s) have been expanded and are up to date. Package-scoped. In a monorepo, it will also run in all packages below the current working directory. |
| `fix`          | Expand all Mdat content placeholders in your readme.md file(s). Package-scoped. In a monorepo, it will also run in all packages below the current working directory.                                              |
| `print-config` | Print the effective Mdat configuration. Package-scoped.. Searches up to the root of a monorepo if necessary..                                                                                                     |

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

_See the sections below for more information on each subcommand._

#### Subcommand: `ksc-mdat init`

Initialize by copying starter config files to your project root or to your package.json file.

Usage:

```txt
ksc-mdat init
```

| Option              | Description                       | Type                 | Default  |
| ------------------- | --------------------------------- | -------------------- | -------- |
| `--location`        | Where to store the configuration. | `"file"` `"package"` | `"file"` |
| `--help`<br>`-h`    | Show help                         | `boolean`            |          |
| `--version`<br>`-v` | Show version number               | `boolean`            |          |

#### Subcommand: `ksc-mdat lint`

Validate that all Mdat content placeholders in your readme.md file(s) have been expanded and are up to date. Package-scoped. In a monorepo, it will also run in all packages below the current working directory.

Usage:

```txt
ksc-mdat lint
```

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-mdat fix`

Expand all Mdat content placeholders in your readme.md file(s). Package-scoped. In a monorepo, it will also run in all packages below the current working directory.

Usage:

```txt
ksc-mdat fix
```

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-mdat print-config`

Print the effective Mdat configuration. Package-scoped.. Searches up to the root of a monorepo if necessary..

Usage:

```txt
ksc-mdat print-config
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

<!-- /cli-help -->

### VS Code tasks

`ksc-mdat init` adds a `.vscode/tasks.json` with two tasks:

- **`ksc-mdat lint`** runs `ksc-mdat lint --format machine`, validating that readme content placeholders are expanded and up to date
- **`ksc-mdat fix`** runs `ksc-mdat fix --format machine`, expanding readme content placeholders

If you're using the complete [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) package, you'd more likely want to run:

- **`ksc lint`** runs `ksc lint --format machine`, which runs all `ksc lint` tools across the whole project
- **`ksc fix`** runs `ksc fix --format machine`, which applies all `ksc fix` auto-fixes and reports anything unfixable

Run them via the _Tasks: Run Task_ command (or the _Terminal → Run Task…_ menu item).

Each task's problem matcher parses the machine-format output and populates VS Code's [Problems panel](https://code.visualstudio.com/docs/debugtest/debugging#_errors-and-warnings) with every reported issue, pointing to the offending file, line, and column.

The tasks share a problem matcher owner with the other `@kitschpatrol/shared-config` tasks, so the panel reflects the most recent run rather than stacking duplicates.

If your project already has a `.vscode/tasks.json`, `init` merges by task label: your own tasks are left alone, and same-label tasks are replaced with the latest definitions.

### API

The package also exports `fix`, `fixFile` functions for expanding Mdat comment placeholders programmatically, pre-configured with the shared Mdat configuration. The [mdat](https://github.com/kitschpatrol/mdat) project already provides a robust TypeScript API and CLI for general use cases, but these proxies are provided for convenience in @kitschpatrol/shared-config projects.

```typescript
import { clearCache, fix, fixFile } from '@kitschpatrol/mdat-config'

// Expand mdat placeholders in a string using the default config
const expanded = await fix('<!-- shared-config -->\n<!-- /shared-config -->\n')

// Expand with custom rules
const customExpanded = await fix(source, { 'my-rule': '**Custom content.**' })

// Expand with custom rules in a file in place
await fixFile('./readme.md', { 'my-rule': '**Custom content.**' })

// Clear cached Mdat module
clearCache()
```

Config is merged in priority order: shared defaults < per-call overrides (via mdat's `mergeConfig`).

The Mdat module is cached internally for performance across multiple calls. Use `clearCache()` to force re-initialization.

## Troubleshooting

### `No readme found` errors

Running `ksc-mdat fix` can sometimes throw this error in complex repos that have additional `package.json` files that are not actually defining additional packages in the monorepo, e.g. a `package.json` that's part of a test fixture or demo project.

In these cases, make sure your workspace is explicitly defined in your `pnpm-workspace.yaml`, even if there's just one package in the repo:

```yml
packages:
  - '.'
```

<!-- license -->

## License

[MIT](license.txt) © [Eric Mika](https://ericmika.com)

<!-- /license -->
