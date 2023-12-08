# @kitschpatrol/markdownlint-config

## Overview

It's a shared [markdownlint](https://github.com/DavidAnson/markdownlint) config.

**See [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) for the recommended single-package approach.**

## Setup

To use just this markdownlint config in isolation:

1. Install the `.npmrc` in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm dlx @kitschpatrol/npm-config
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/markdownlint-config
   ```

3. Add the starter `.markdownlint.json` file to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec markdownlint-config --init
   ```

## Usage

The markdownlint binary should be picked up automatically by VSCode plugins.

You can call it directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
...
"scripts": {
  "lint": "markdownlint-config"
}
...
```

## Notes

Ignores files in `.gitignore`
