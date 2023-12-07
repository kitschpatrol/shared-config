# @kitschpatrol/stylelint-config

## Overview

It's a shared [Stylelint](https://stylelint.io) config.

**See [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) for the recommended single-package approach.**

## Setup

To use just this Stylelint config in isolation:

1. Install the `.npmrc` in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm dlx @kitschpatrol/npm-config
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/stylelint-config
   ```

3. Add the starter `.stylelintrc.cjs` file to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec stylelint-config-init
   ```

## Usage

The Stylelint binary should be picked up automatically by VSCode plugins.

Integrate with your `package.json` scripts as you see fit, for example:

```json
...
"scripts": {
  "lint": "stylelint --allow-empty-input '**/*.{css,scss,sass,svelte,html,astro}'"
  "format": "stylelint --allow-empty-input --fix '**/*.{css,scss,sass,svelte,html,astro}'"
}
...
```

## Notes

Ignores files in `.gitignore`
