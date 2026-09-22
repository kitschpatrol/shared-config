<!-- title -->

# @kitschpatrol/eslint-config

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/eslint-config](https://img.shields.io/npm/v/@kitschpatrol/eslint-config.svg)](https://www.npmjs.com/package/@kitschpatrol/eslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit)

<!-- /badges -->

<!-- description -->

**ESLint configuration for @kitschpatrol/shared-config.**

<!-- /description -->

## Overview

It's a shared [ESLint](https://eslint.org) config, plus a command-line tool `ksc-eslint` to perform ESLint-related project initialization, linting, and fixing.

<!-- recommendation -->

> [!IMPORTANT]
>
> **You can use this package on its own, but it's recommended to use [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) instead for a single-dependency and single-package approach to linting and fixing your project.**
>
> This package is included as a dependency in [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config), which also automatically invokes the command line functionality in this package via its `ksc` command

<!-- /recommendation -->

## Setup

To use just this ESLint config in isolation:

1. Install the basic repository configuration files in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm --package=@kitschpatrol/repo-config dlx ksc-repo init
   ```

2. Install and initialize the required TypeScript `tsconfig.json` configuration in your project root:

   ```sh
   pnpm add -D @kitschpatrol/typescript-config
   pnpm --package=@kitschpatrol/typescript-config dlx ksc-typescript init
   ```

3. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/eslint-config
   ```

4. Add the starter `eslint.config.ts` config files to your project root, and add any overrides you'd like:

   ```sh
   pnpm exec eslint-ksc init
   ```

## Usage

The ESLint binary should be picked up automatically by VS Code plugins.

You can call it directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
{
  "scripts": {
    "lint": "eslint-config lint",
    "fix": "eslint-config fix"
  }
}
```

### CLI

<!-- cli-help -->

#### Command: `ksc-eslint`

Kitschpatrol's ESLint shared configuration tools.

This section lists top-level commands for `ksc-eslint`.

Usage:

```txt
ksc-eslint <command>
```

| Command        | Argument    | Description                                                                                                                                                               |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `init`         |             | Initialize by copying starter config files to your project root.                                                                                                          |
| `lint`         | `[files..]` | Lint your project with ESLint. Matches files below the current working directory by default.                                                                              |
| `fix`          | `[files..]` | Fix your project with ESLint. Matches files below the current working directory by default.                                                                               |
| `print-config` | `[file]`    | Print the effective ESLint configuration. Package-scoped by default, file-scoped if a file argument is provided. Use `@eslint/config-inspector` for a more detailed view. |

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

_See the sections below for more information on each subcommand._

#### Subcommand: `ksc-eslint init`

Initialize by copying starter config files to your project root.

Usage:

```txt
ksc-eslint init
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

#### Subcommand: `ksc-eslint lint`

Lint your project with ESLint. Matches files below the current working directory by default.

Usage:

```txt
ksc-eslint lint [files..]
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

#### Subcommand: `ksc-eslint fix`

Fix your project with ESLint. Matches files below the current working directory by default.

Usage:

```txt
ksc-eslint fix [files..]
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

#### Subcommand: `ksc-eslint print-config`

Print the effective ESLint configuration. Package-scoped by default, file-scoped if a file argument is provided. Use `@eslint/config-inspector` for a more detailed view.

Usage:

```txt
ksc-eslint print-config [file]
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

`ksc-eslint init` adds a `.vscode/tasks.json` with two tasks:

- **`ksc-eslint lint`** runs `ksc-eslint lint --format machine` across the whole project
- **`ksc-eslint fix`** runs `ksc-eslint fix --format machine`, applying auto-fixes and reporting whatever couldn't be fixed

If you're using the complete [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) package, you'd more likely want to run:

- **`ksc lint`** runs `ksc lint --format machine`, which runs all `ksc lint` tools across the whole project
- **`ksc fix`** runs `ksc fix --format machine`, which applies all `ksc fix` auto-fixes and reports anything unfixable

Run them via the _Tasks: Run Task_ command (or the _Terminal → Run Task…_ menu item).

Each task's problem matcher parses the machine-format output and populates VS Code's [Problems panel](https://code.visualstudio.com/docs/editing/editingevolved#_errors-warnings) with every reported issue, pointing to the offending file, line, and column.

The tasks share a problem matcher owner with the other `@kitschpatrol/shared-config` tasks, so the panel reflects the most recent run rather than stacking duplicates.

If your project already has a `.vscode/tasks.json`, `init` merges by task label: your own tasks are left alone, and same-label tasks are replaced with the latest definitions.

### API

The package also exports `fix`, `fixFile` functions for linting and fixing code programmatically, pre-configured with the shared ESLint configuration.

```typescript
import { clearCache, fix, fixFile } from '@kitschpatrol/eslint-config'

// Fix a string (defaults to TypeScript parser)
const fixed = await fix('let x = 1\nconsole.log(x)\n')

// Fix with a bare file extension for parser inference
const withExtension = await fix(code, 'tsx')

// Fix with ESLint options
const withOptions = await fix(code, { react: true })

// Both file type and options
const withBoth = await fix(code, 'tsx', { react: true })

// Fix a file in place with options
await fixFile('./src/index.ts', { type: 'lib' })

// Clear cached ESLint module and instances
clearCache()
```

Config is resolved using the shared `eslintConfig()` factory with `isInEditor: false`. Per-call options accept the same `OptionsConfig` shape as the factory.

The ESLint module and instances are cached internally for performance across multiple calls. Use `clearCache()` to force re-initialization.

## Notes

### Caching

`ksc-eslint lint` and `ksc-eslint fix` never pass `--cache` to ESLint, and the shared `--cache` option has no effect on them.

ESLint's cache is per-file: a result is reused whenever the file's own content and the resolved config are unchanged. Type-aware rules (enabled by default whenever a `tsconfig.json` is found) and cross-file rules like `import/no-cycle` also depend on the types and exports of other files, on `tsconfig.json`, on declaration files, and on generated types like Astro's `.astro/` output, none of which are part of the cache key. Changing a function's return type in `a.ts` can make a cached result for `b.ts` wrong in either direction: a stale error that `--no-cache` clears, or a stale pass that hides a real one. The `metadata` and `content` cache strategies differ only in how they detect changes to the file itself, so neither helps. typescript-eslint's [FAQ](https://typescript-eslint.io/troubleshooting/faqs/eslint#can-i-use-eslints---cache-with-typescript-eslint) recommends against `--cache` for the same reason.

The other tools that cache (CSpell, Prettier, and Stylelint) evaluate each file in isolation, so their per-file caches remain enabled.

### Config location

Regrettably the `eslint-config init --location package` option is not supported due to ESLint's removal of support for putting configuration in `package.json`. See ESLint discussion thread [18131](https://github.com/eslint/eslint/discussions/18131).

### Preset generation

The `update-rules` script is used to manually regenerate preset rule sets when plugin dependencies are updated.

The script requires two calls to `ksc-prettier fix` to accommodate a lack of idempotence in Prettier's handling of the resulting `typegen.d.ts` file. This surfaced a few Prettier versions ago, and the necessity of this work-around should be reevaluated periodically against future versions of Prettier.

### ESLint version pin

ESLint is pinned to `~10.10.0`. ESLint 10.11.0 added a private rule-definition cache to its `Config` class, which breaks the config cloning in [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html) and crashes linting of `.html` files. Restore the caret range once [eslint-plugin-html#342](https://github.com/BenoitZugmeyer/eslint-plugin-html/issues/342) is resolved.

### Origins

This config is a heavily modified variation on Anthony Fu's [@antfu/eslint-config](https://github.com/antfu/eslint-config). This package is a somewhat leaner approach intended to work with other tools wrapped behind a monolithic CLI instead of handling everything on its own. It mainly leverages the factory / type generation implementation from the original repo, which itself builds on Kevin Deng's [@sxzz/eslint-config](https://github.com/sxzz/eslint-config). See the [modification notes](./modification-notes.md) for more details on what's changed from Anthony's approach.

### References

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)
- [linting-setup-using-eslint](https://chris.lu/web_development/tutorials/next-js-static-mdx-blog/linting-setup-using-eslint)
- On [prefer-repository-shorthand](https://github.com/michaelfaith/eslint-plugin-package-json/issues/223)

<!-- license -->

## License

[MIT](license.txt) © [Eric Mika](https://ericmika.com)

<!-- /license -->
