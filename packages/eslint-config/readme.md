# @kitschpatrol/eslint-config

## Overview

It's a shared [ESLint](https://eslint.org) config.

**See [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) for the recommended single-package approach.**

## Setup

To use just this ESLint config in isolation:

1. Install the `.npmrc` in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm dlx @kitschpatrol/npm-config
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

The ESLint binary should be picked up automatically by VSCode plugins.

You can call it directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
...
"scripts": {
  "lint": "eslint-config --check"
  "fix": "eslint-config --fix"
}
...
```

## Notes

The whole flat file config thing is pending...
