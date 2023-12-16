# @kitschpatrol/cspell-config

## Overview

It's a shared [CSpell](https://cspell.org) config.

**See [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) for the recommended single-package approach.**

## Setup

To use just this CSpell config in isolation:

1. Install the `.npmrc` in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm dlx @kitschpatrol/repo-config --init
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/cspell-config
   ```

3. Add the starter `.cspell.json` file to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec cspell-config --init
   ```

## Usage

The CSpell binary should be picked up automatically by VSCode plugins.

You can call it directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
...
"scripts": {
  "spellcheck": "cspell-config --check"
}
...
```

## Notes

This config includes a bunch of words I've happened to have needed to use. Your preferences will vary.

CSpell is configured to automatically ignore files and paths in `.gitignore` (via `"useGitignore": true`).
