<!--+ Warning: Content inside HTML comment blocks was generated by mdat and may be overwritten. +-->

<!-- title -->

# @kitschpatrol/eslint-config

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/eslint-config](https://img.shields.io/npm/v/@kitschpatrol/eslint-config.svg)](https://npmjs.com/package/@kitschpatrol/eslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- /badges -->

<!-- description -->

**ESLint configuration for @kitschpatrol/shared-config.**

<!-- /description -->

## Overview

It's a shared [ESLint](https://eslint.org) config.

**See [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) for the recommended single-package approach.**

## Setup

To use just this ESLint config in isolation:

1. Install the `.npmrc` in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm dlx @kitschpatrol/repo-config --init
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/eslint-config
   ```

3. Add the starter `.eslintrc.cjs` config and `.eslintignore` files to your project root, and add any overrides you'd like:

   ```sh
   pnpm exec eslint-config --init
   ```

## Usage

The ESLint binary should be picked up automatically by VS Code plugins.

You can call it directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
"scripts": {
  "lint": "eslint-config --check"
  "fix": "eslint-config --fix"
}
```

### CLI

<!-- cli-help -->

#### Command: `eslint-config`

ESLint configuration for @kitschpatrol/shared-config.

Usage:

```txt
eslint-config [<file|glob> ...]
```

| Option                   | Argument | Description                                                      |
| ------------------------ | -------- | ---------------------------------------------------------------- |
| `--check`<br>`-c`        |          | Check for and report issues. Same as `eslint-config`.            |
| `--fix`<br>`-f`          |          | Fix all auto-fixable issues, and report the un-fixable.          |
| `--init`<br>`-i`         |          | Initialize by copying starter config files to your project root. |
| `--print-config`<br>`-p` | `<path>` | Print the effective configuration at a certain path.             |
| `--help`<br>`-h`         |          | Print this help info.                                            |
| `--version`<br>`-v`      |          | Print the package version.                                       |

<!-- /cli-help -->

## Notes

The whole flat file config thing is pending...

ESLint does not inherit files and paths from `.gitignore`. Ignored paths must be specified in `.eslintignore`.

This shared config will also initialize a `tsconfig.json` and a `tsconfig.eslint.json`. These should probably live in a separate configuration package, but they'll reside here for now.

<!-- license -->

## License

[MIT](license.txt) © Eric Mika

<!-- /license -->
