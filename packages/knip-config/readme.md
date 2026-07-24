<!-- title -->

# @kitschpatrol/knip-config

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/knip-config](https://img.shields.io/npm/v/@kitschpatrol/knip-config.svg)](https://npmjs.com/package/@kitschpatrol/knip-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit/)

<!-- /badges -->

<!-- description -->

**Knip configuration for @kitschpatrol/shared-config.**

<!-- /description -->

## Overview

It's a shared [Knip](https://knip.dev) config, plus a command-line tool `ksc-knip` to perform Knip-related project initialization, linting, and fixing.

<!-- recommendation -->

> [!IMPORTANT]
>
> **You can use this package on its own, but it's recommended to use [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) instead for a single-dependency and single-package approach to linting and fixing your project.**
>
> This package is included as a dependency in [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config), which also automatically invokes the command line functionality in this package via its `ksc` command

<!-- /recommendation -->

## Setup

To use just this Knip config in isolation:

1. Install the basic repository configuration files in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm --package=@kitschpatrol/repo-config dlx ksc-repo init
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/knip-config
   ```

3. Add the starter `knip.config.ts` files to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec ksc-knip init
   ```

## Usage

Integrate with your `package.json` scripts as you see fit, for example:

```json
{
  "scripts": {
    "lint": "ksc-knip lint"
  }
}
```

### Configuration

To create a `knip.config.ts` in your project root:

```sh
pnpm exec ksc-knip init
```

(Note that this will delete the `knip` property in your `package.json`!)

_Or_

To create a `knip` property in `package.json`:

```sh
pnpm exec ksc-knip init --location package
```

(Note that this will delete the `knip.config.ts` file in your project root!)

### CLI

<!-- cli-help -->

#### Command: `ksc-knip`

Kitschpatrol's Knip shared configuration tools.

This section lists top-level commands for `ksc-knip`.

Usage:

```txt
ksc-knip <command>
```

| Command        | Description                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `init`         | Initialize by copying starter config files to your project root or to your package.json file.                                                |
| `lint`         | Check for unused code and dependencies. Package-scoped. In a monorepo, it will also run in all packages below the current working directory. |
| `print-config` | Print the effective Knip configuration. Package-scoped. Searches up to the root of a monorepo if necessary.                                  |

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

_See the sections below for more information on each subcommand._

#### Subcommand: `ksc-knip init`

Initialize by copying starter config files to your project root or to your package.json file.

Usage:

```txt
ksc-knip init
```

| Option              | Description                       | Type                 | Default  |
| ------------------- | --------------------------------- | -------------------- | -------- |
| `--location`        | Where to store the configuration. | `"file"` `"package"` | `"file"` |
| `--help`<br>`-h`    | Show help                         | `boolean`            |          |
| `--version`<br>`-v` | Show version number               | `boolean`            |          |

#### Subcommand: `ksc-knip lint`

Check for unused code and dependencies. Package-scoped. In a monorepo, it will also run in all packages below the current working directory.

Usage:

```txt
ksc-knip lint
```

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-knip print-config`

Print the effective Knip configuration. Package-scoped. Searches up to the root of a monorepo if necessary.

Usage:

```txt
ksc-knip print-config
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

<!-- /cli-help -->

### VS Code tasks

`ksc-knip init` adds a `.vscode/tasks.json` with a single task:

- **`ksc-knip lint`** runs `ksc-knip lint --format machine`, checking for unused code and dependencies

If you're using the complete [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) package, you'd more likely want to run:

- **`ksc lint`** runs `ksc lint --format machine`, which runs all `ksc lint` tools across the whole project
- **`ksc fix`** runs `ksc fix --format machine`, which applies all `ksc fix` auto-fixes and reports anything unfixable

Run them via the _Tasks: Run Task_ command (or the _Terminal → Run Task…_ menu item).

Each task's problem matcher parses the machine-format output and populates VS Code's [Problems panel](https://code.visualstudio.com/docs/editing/editingevolved#_errors-warnings) with every reported issue, pointing to the offending file, line, and column.

The tasks share a problem matcher owner with the other `@kitschpatrol/shared-config` tasks, so the panel reflects the most recent run rather than stacking duplicates.

If your project already has a `.vscode/tasks.json`, `init` merges by task label: your own tasks are left alone, and same-label tasks are replaced with the latest definitions.

<!-- license -->

## License

[MIT](license.txt) © [Eric Mika](https://ericmika.com)

<!-- /license -->
