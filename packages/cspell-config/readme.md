<!-- title -->

# @kitschpatrol/cspell-config

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/cspell-config](https://img.shields.io/npm/v/@kitschpatrol/cspell-config.svg)](https://npmjs.com/package/@kitschpatrol/cspell-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit/)

<!-- /badges -->

<!-- description -->

**CSpell configuration for @kitschpatrol/shared-config.**

<!-- /description -->

## Overview

It's a shared [CSpell](https://cspell.org) config, plus a command-line tool `ksc-cspell` to perform CSpell-related project initialization, linting, and fixing.

In addition to core CSpell functionality, `ksc-cspell` bundles a few extensions:

- **Unused word detection:** `ksc-cspell lint` identifies "unused" words in your local CSpell configuration's `words` array that don't actually appear anywhere in your project.
- **Case consistency:** `ksc-cspell lint` incorporates [Case Police](https://github.com/antfu/case-police) to catch incorrectly-cased proper nouns, brands, and acronyms.
- **Configuration cleanup:** `ksc-cspell fix` removes unused words from your local CSpell configuration's `words` array and sorts it alphabetically.

Note that the `fix` command only maintains your CSpell configuration — it never touches the spelling issues themselves.

<!-- recommendation -->

> [!IMPORTANT]
>
> **You can use this package on its own, but it's recommended to use [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) instead for a single-dependency and single-package approach to linting and fixing your project.**
>
> This package is included as a dependency in [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config), which also automatically invokes the command line functionality in this package via its `ksc` command

<!-- /recommendation -->

## Setup

To use just this CSpell config in isolation:

1. Install the basic repository configuration files in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm --package=@kitschpatrol/repo-config dlx ksc-repo init
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/cspell-config
   ```

3. Add the starter `.cspell.json` file to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec ksc-cspell init
   ```

## Usage

The CSpell binary should be picked up automatically by VS Code plugins.

You can call it directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
{
  "scripts": {
    "spellcheck": "ksc-cspell lint"
  }
}
```

### Configuration

To create a `cspell.config.ts` in your project root:

```sh
pnpm exec ksc-knip init
```

(Note that this will delete the `cspell` property in your `package.json`!)

_Or_

To create a `cspell` property in `package.json`:

```sh
pnpm exec ksc-cspell init --location package
```

(Note that this will delete the `cspell.config.ts` file in your project root!)

#### Ignoring files

CSpell is configured to automatically ignore files and paths in `.gitignore` (via `"useGitignore": true`), and to ignore words inside of ` ``` ` code fences in Markdown and MDX files.

Additional ignore patterns may be added to your project's CSpell config via the `ignorePaths` key.

Ignored files are automatically excluded from Case Police checks as well.

To exclude a specific file from Case Police checks, but to still check it with CSpell, include a comment:

`// @case-police-disable`

#### Ignoring specific words

Many words are included in the bundled dictionaries used by the shared configuration.

Additional words may be added to your project's CSpell config via the `words` key.

Specific words may be ignored on a per-file basis by including a comment:

`/* spell-checker: ignore $WORD, $ANOTHER_WORD, $YET_ANOTHER_WORD*/`

Likewise to ignore certain Case Police words:

`// @case-police-ignore $WORD, $ANOTHER_WORD, $YET_ANOTHER_WORD`

#### Ignoring code

See [the CSpell documentation](https://cspell.org/docs/Configuration/document-settings).

Blocks:

`/* spell-checker:disable */ ...  /* spell-checker:enable */`

#### Disabling bundled dictionaries

In additional to CSpell's default dictionary configuration, this shared configuration enables a number of dictionaries that ship with CSpell for all file types:

- [`lorem-ipsum`](https://github.com/streetsidesoftware/cspell-dicts/blob/main/dictionaries/lorem-ipsum/dict/lorem.txt)
- [`git`](https://github.com/streetsidesoftware/cspell-dicts/blob/main/dictionaries/git/cspell-ext.json)
- [`gaming-terms`](https://github.com/streetsidesoftware/cspell-dicts/blob/main/dictionaries/gaming-terms/dict/gaming-terms.txt)
- [`npm`](https://github.com/streetsidesoftware/cspell-dicts/blob/main/dictionaries/npm/dict/npm.txt)
- [`data-science`](https://github.com/streetsidesoftware/cspell-dicts/blob/main/dictionaries/data-science/dict/data-science.txt)
- [`fullstack`](https://github.com/streetsidesoftware/cspell-dicts/blob/main/dictionaries/fullstack/dict/fullstack.txt)

It also includes a number of _custom_ dictionaries distributed with this package, all of which are enabled by default:

- `kp-acronyms` Contains acronyms
- `kp-brands` Contains proper nouns like brand names
- `kp-eslint` Names seen in eslint rules provided by `@kitschpatrol/eslint-config`
- `kp-files` File extensions and types
- `kp-misc` Contains general and miscellaneous words
- `kp-names` Human names and usernames
- `kp-tech` Tech-specific terminology, some ambiguity vs. "brands"

In your project's root `.cspell.json`, you can disable any combination of these dictionaries by adding them to the `dictionaries` array with a `!` prefix.

For example, do disable the `kp-acronyms` and `kp-brands` dictionaries:

```jsonc
{
  "import": "@kitschpatrol/cspell-config",
  "dictionaries": [
    "!kp-acronyms",
    "!kp-brands",
    // ...Addtional !-prefixed dicitonary names
  ],
}
```

If you need a massive and permissive dictionary for large writing project, take a look at [@kitschpatrol/dict-en-wiktionary](https://github.com/kitschpatrol/dict-en-wiktionary).

#### Adding project-scoped words

In your project's root `.cspell.json`:

```jsonc
{
  "import": "@kitschpatrol/cspell-config",
  "words": [
    "mountweazel",
    "steinlaus",
    "jungftak",
    "esquivalience",
    // ...Additional words
  ],
}
```

### CLI

<!-- cli-help -->

#### Command: `ksc-cspell`

Kitschpatrol's CSpell shared configuration tools.

This section lists top-level commands for `ksc-cspell`.

Usage:

```txt
ksc-cspell <command>
```

| Command        | Argument    | Description                                                                                                                                                                                                        |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `init`         |             | Initialize by copying starter config files to your project root or to your package.json file.                                                                                                                      |
| `lint`         | `[files..]` | Check for spelling mistakes. Matches files below the current working directory by default.                                                                                                                         |
| `fix`          | `[files..]` | Fix letter casing issues, remove unused words from the local CSpell configuration's "words" array, and report remaining (unfixable) spelling errors. Matches files below the current working directory by default. |
| `print-config` |             | Print the resolved CSpell configuration. Package-scoped. Searches up to the root of a monorepo if necessary.                                                                                                       |

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

_See the sections below for more information on each subcommand._

#### Subcommand: `ksc-cspell init`

Initialize by copying starter config files to your project root or to your package.json file.

Usage:

```txt
ksc-cspell init
```

| Option              | Description                       | Type                 | Default  |
| ------------------- | --------------------------------- | -------------------- | -------- |
| `--location`        | Where to store the configuration. | `"file"` `"package"` | `"file"` |
| `--help`<br>`-h`    | Show help                         | `boolean`            |          |
| `--version`<br>`-v` | Show version number               | `boolean`            |          |

#### Subcommand: `ksc-cspell lint`

Check for spelling mistakes. Matches files below the current working directory by default.

Usage:

```txt
ksc-cspell lint [files..]
```

| Positional Argument | Description                    | Type    | Default  |
| ------------------- | ------------------------------ | ------- | -------- |
| `files`             | Files or glob pattern to lint. | `array` | `"**/*"` |

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-cspell fix`

Fix letter casing issues, remove unused words from the local CSpell configuration's "words" array, and report remaining (unfixable) spelling errors. Matches files below the current working directory by default.

Usage:

```txt
ksc-cspell fix [files..]
```

| Positional Argument | Description                   | Type    | Default  |
| ------------------- | ----------------------------- | ------- | -------- |
| `files`             | Files or glob pattern to fix. | `array` | `"**/*"` |

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-cspell print-config`

Print the resolved CSpell configuration. Package-scoped. Searches up to the root of a monorepo if necessary.

Usage:

```txt
ksc-cspell print-config
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

<!-- /cli-help -->

### VS Code tasks

`ksc-cspell init` adds a `.vscode/tasks.json` with two tasks:

- **`ksc-cspell lint`** runs `ksc-cspell lint --format machine`, checking the project for spelling mistakes
- **`ksc-cspell fix`** runs `ksc-cspell fix --format machine`, removing unused words from the CSpell configuration's "words" array and sorting it alphabetically

If you're using the complete [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) package, you'd more likely want to run:

- **`ksc lint`** runs `ksc lint --format machine`, which runs all `ksc lint` tools across the whole project
- **`ksc fix`** runs `ksc fix --format machine`, which applies all `ksc fix` auto-fixes and reports anything unfixable

Run them via the _Tasks: Run Task_ command (or the _Terminal → Run Task…_ menu item).

Each task's problem matcher parses the machine-format output and populates VS Code's [Problems panel](https://code.visualstudio.com/docs/editing/editingevolved#_errors-warnings) with every reported issue, pointing to the offending file, line, and column.

The tasks share a problem matcher owner with the other `@kitschpatrol/shared-config` tasks, so the panel reflects the most recent run rather than stacking duplicates.

If your project already has a `.vscode/tasks.json`, `init` merges by task label: your own tasks are left alone, and same-label tasks are replaced with the latest definitions.

## Notes

This config includes a bunch of words I've happened to have needed to use. Your preferences will vary.

As part of the `lint` command process, `@kitschpatrol/cspell-config` also runs a check to identify any words in your config file's `"words"` array that are _do not_ actually appear anywhere else in your project. This was inspired by [Zamiell's](https://github.com/Zamiell) [cspell-check-unused-words](https://github.com/complete-ts/cspell-check-unused-words) project.

<!-- license -->

## License

[MIT](license.txt) © [Eric Mika](https://ericmika.com)

<!-- /license -->
