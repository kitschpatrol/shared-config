# @kitschpatrol/mdat-config

## Overview

It's a shared [mdat](https://github.com/kitschpatrol/mdat) config.

**See [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) for the recommended single-package approach.**

## Setup

To use just this mdat config in isolation:

1. Install the `.npmrc` in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm dlx @kitschpatrol/repo-config --init
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/mdat-config
   ```

3. Add the starter `.mdatrc.ts` file to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec mdat-config --init
   ```

## Usage

The `mdat` binary is specified as a peer dependency, and should be installed up automatically by PNPM.

You can call it directly, or use the script bundled with the config.

Integrate with your `package.json` scripts as you see fit, for example:

```json
"scripts": {
  "lint": "mdat-config --check"
  "format": "mdat-config --fix"
}
```

"Fix" in this case is a slight misnomer for consistency with the other shared-config tools.

It runs `mdat readme expand` to expand placeholder comments in your readme.md using the bundled [`mdat readme`](https://github.com/kitschpatrol/mdat/blob/main/packages/mdat/readme.md#the-mdat-readme-subcommand) expansion rules, plus custom rules provided by `mdat-config`'s `mdat.config.ts` file, plus any additional rules specified in the repository-specific `.mdatrc.ts` file.

## Ruby support

Ruby formatting Expects a global Ruby install >=2.7 via `rbenv` at `~/.rbenv/shims/ruby` with the following gems:

- `bundler`
- `prettier_print`
- `syntax_tree`
- `syntax_tree-haml`
- `syntax_tree-rbs`

Note: Do _not_ add `plugins: ['prettier-plugin-ruby']` to, the per-file scope, it must be global.
