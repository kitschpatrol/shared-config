<!-- title -->

# @kitschpatrol/stylelint-config

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/stylelint-config](https://img.shields.io/npm/v/@kitschpatrol/stylelint-config.svg)](https://npmjs.com/package/@kitschpatrol/stylelint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit/)

<!-- /badges -->

<!-- description -->

**Stylelint configuration for @kitschpatrol/shared-config.**

<!-- /description -->

## Overview

It's a shared [Stylelint](https://stylelint.io) config, plus a command-line tool `ksc-stylelint` to perform Stylelint-related project initialization, linting, and fixing.

<!-- recommendation -->

> [!IMPORTANT]
>
> **You can use this package on its own, but it's recommended to use [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) instead for a single-dependency and single-package approach to linting and fixing your project.**
>
> This package is included as a dependency in [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config), which also automatically invokes the command line functionality in this package via its `ksc` command

<!-- /recommendation -->

## Setup

To use just this Stylelint config in isolation:

1. Install the basic repository configuration files in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm --package=@kitschpatrol/repo-config dlx ksc-repo init
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/stylelint-config
   ```

3. Add the starter `stylelint.config.js` file to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec ksc-stylelint init
   ```

## Rules

- [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended) _([Rules](https://github.com/stylelint/stylelint-config-recommended/blob/main/index.js))_
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) _(Extends the above with [additional rules](https://github.com/stylelint/stylelint-config-standard/blob/main/index.js))_
- [stylelint-config-clean-order](https://github.com/kutsan/stylelint-config-clean-order)
- [stylelint-config-html](https://www.npmjs.com/package/stylelint-config-html) _(Parses HTML, XML, Vue, Svelte, Astro, and PHP files)_
- [stylelint-plugin-defensive-css](https://github.com/yuschick/stylelint-plugin-defensive-css) _(Recommended preset for defensive and accessible CSS)_
- [Additional customizations](./src/index.ts)

## Usage

The Stylelint binary should be picked up automatically by VS Code plugins.

You can call it directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
{
  "scripts": {
    "lint": "ksc-stylelint lint",
    "fix": "ksc-stylelint fix"
  }
}
```

### Configuration

To create a `stylelint.config.js` in your project root:

```sh
pnpm exec ksc-stylelint init
```

(Note that this will delete the `stylelint` property in your `package.json`!)

_Or_

To create a `stylelint` property in `package.json`:

```sh
pnpm exec ksc-stylelint init --location package
```

(Note that this will delete the `stylelint.config.js` file in your project root!)

#### Ignoring files

Ignores all files in `.gitignore` by default.

Additional tool-specific ignores may be added to the config via the [`ignoreFiles`](https://stylelint.io/user-guide/configure#ignorefiles) key.

#### Ignoring code

See [the Stylelint documentation](https://stylelint.io/user-guide/ignore-code/).

Blocks:

`/* stylelint-disable */ ...  /* stylelint-enable */`

Inline:

`/* stylelint-disable-line */`

Next line:

`/* stylelint-disable-next-line`

### CLI

<!-- cli-help -->

#### Command: `ksc-stylelint`

Kitschpatrol's Stylelint shared configuration tools.

This section lists top-level commands for `ksc-stylelint`.

Usage:

```txt
ksc-stylelint <command>
```

| Command        | Argument    | Description                                                                                                          |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `init`         |             | Initialize by copying starter config files to your project root or to your package.json file.                        |
| `lint`         | `[files..]` | Lint your project with Stylelint. Matches files below the current working directory by default.                      |
| `fix`          | `[files..]` | Fix your project with Stylelint. Matches files below the current working directory by default.                       |
| `print-config` | `[file]`    | Print the effective Stylelint configuration. Package-scoped by default, file-scoped if a file argument is provided.. |

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

_See the sections below for more information on each subcommand._

#### Subcommand: `ksc-stylelint init`

Initialize by copying starter config files to your project root or to your package.json file.

Usage:

```txt
ksc-stylelint init
```

| Option              | Description                       | Type                 | Default  |
| ------------------- | --------------------------------- | -------------------- | -------- |
| `--location`        | Where to store the configuration. | `"file"` `"package"` | `"file"` |
| `--help`<br>`-h`    | Show help                         | `boolean`            |          |
| `--version`<br>`-v` | Show version number               | `boolean`            |          |

#### Subcommand: `ksc-stylelint lint`

Lint your project with Stylelint. Matches files below the current working directory by default.

Usage:

```txt
ksc-stylelint lint [files..]
```

| Positional Argument | Description                    | Type    | Default                                                    |
| ------------------- | ------------------------------ | ------- | ---------------------------------------------------------- |
| `files`             | Files or glob pattern to lint. | `array` | `"**/*.{css,scss,sass,svelte,html,astro,tsx,jsx,php,vue}"` |

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-stylelint fix`

Fix your project with Stylelint. Matches files below the current working directory by default.

Usage:

```txt
ksc-stylelint fix [files..]
```

| Positional Argument | Description                   | Type    | Default                                                    |
| ------------------- | ----------------------------- | ------- | ---------------------------------------------------------- |
| `files`             | Files or glob pattern to fix. | `array` | `"**/*.{css,scss,sass,svelte,html,astro,tsx,jsx,php,vue}"` |

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-stylelint print-config`

Print the effective Stylelint configuration. Package-scoped by default, file-scoped if a file argument is provided..

Usage:

```txt
ksc-stylelint print-config [file]
```

| Positional Argument | Description                                      | Type     |
| ------------------- | ------------------------------------------------ | -------- |
| `file`              | File or glob pattern to print configuration for. | `string` |

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

<!-- /cli-help -->

### VS Code tasks

`ksc-stylelint init` adds a `.vscode/tasks.json` with two tasks:

- **`ksc-stylelint lint`** runs `ksc-stylelint lint --format machine` across the whole project
- **`ksc-stylelint fix`** runs `ksc-stylelint fix --format machine`, applying auto-fixes and reporting whatever couldn't be fixed

If you're using the complete [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) package, you'd more likely want to run:

- **`ksc lint`** runs `ksc lint --format machine`, which runs all `ksc lint` tools across the whole project
- **`ksc fix`** runs `ksc fix --format machine`, which applies all `ksc fix` auto-fixes and reports anything unfixable

Run them via the _Tasks: Run Task_ command (or the _Terminal → Run Task…_ menu item).

Each task's problem matcher parses the machine-format output and populates VS Code's [Problems panel](https://code.visualstudio.com/docs/debugtest/debugging#_errors-and-warnings) with every reported issue, pointing to the offending file, line, and column.

The tasks share a problem matcher owner with the other `@kitschpatrol/shared-config` tasks, so the panel reflects the most recent run rather than stacking duplicates.

If your project already has a `.vscode/tasks.json`, `init` merges by task label: your own tasks are left alone, and same-label tasks are replaced with the latest definitions.

### API

The package also exports `fix`, `fixFile` functions for linting and fixing CSS programmatically, pre-configured with the shared Stylelint configuration.

```typescript
import { clearCache, fix, fixFile } from '@kitschpatrol/stylelint-config'

// Fix a CSS string
const fixed = await fix('a { color: rgb(0, 0, 0); }\n')

// Fix with a bare file extension for syntax inference
const scss = await fix(source, 'scss')

// Fix with config overrides
const withOverrides = await fix(source, { rules: { 'color-hex-length': 'long' } })

// Both file type and config overrides
const both = await fix(source, 'scss', { rules: { 'color-hex-length': 'long' } })

// Fix a file in place
await fixFile('./src/styles.css')

// Clear cached Stylelint module
clearCache()
```

Config is resolved in priority order: shared defaults < per-call overrides.

The Stylelint module is cached internally for performance across multiple calls. Use `clearCache()` to force re-initialization.

<!-- license -->

## License

[MIT](license.txt) © [Eric Mika](https://ericmika.com)

<!-- /license -->
