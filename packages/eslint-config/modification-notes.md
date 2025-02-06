# Modification notes

This file notes some of the changes made to Anthony Fu's [@antfu/eslint-config](https://github.com/antfu/eslint-config) in the process of adapting it for use in [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config).

These might be out of date.

## Changes

### Modifications

- [x] Remove CLI
- [x] Remove formatters (use prettier separately instead)
- [x] Make Unicorn mandatory
- [x] Remove @stylistic/eslint-plugin, but retain `stylistic` option flag for plugin rules
- [x] Remove UnoCSS
- [x] Remove prettier dependencies
- [x] Remove eslint-plugin-command
- [x] Bundle packages instead of installing on demand
- [x] ESM only
- [x] Remove deprecated overrides approach
- [x] Rename wrapper config function to `sharedConfig`
- [x] Replace markdown-lint with eslint-plugin-mdx
- [x] Handle markdown and mdx separately
- [x] Remove Solid
- [x] Remove Vue
- [x] Package-detection-based activation for Svelte, React, and Astro
- [x] type-aware JS in Astro
- [x] remove stylistic
- [x] remove eslint-plugin-antfu
- [x] Use eslint-plugin-package-json to sort package instead of a custom jsonc sort rule
- [x] Structure configs by file type instead of plugin for clarity / reuse
- [x] Upgrade eslint and remove unstable feature flags related to ts config file <https://eslint.org/blog/2025/01/eslint-v9.18.0-released/> (Need to add jiti dependency?)

### @kitschpatrol/eslint-config 4.x reimplementation

- [x] eslint-plugin-jsdoc
- [x] eslint-plugin-mdx
- [x] eslint-plugin-n
- [x] eslint-plugin-import-x
- [x] eslint-plugin-perfectionist
- [x] eslint-plugin-unicorn
- [x] astro-eslint-parser
- [x] eslint-plugin-astro
- [x] eslint-config-prettier (added to `disables.ts`)
- [x] eslint-plugin-html
- [x] @html-eslint
- [x] @eslint/js (js.configs.recommended,)
- [x] @typescript-eslint/eslint-plugin (tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked)
- [x] svelte-eslint-parser
- [x] eslint-plugin-svelte

### @kitschpatrol/eslint-config additions

- [x] eslint-plugin-regexp
- [ ] eslint-plugin-unused-imports (Skipping this pending [#50](https://github.com/sweepline/eslint-plugin-unused-imports/issues/50))
- [x] @eslint-community/eslint-plugin-eslint-comments
- [x] @vitest/eslint-plugin
- [x] eslint-plugin-package-json (instead of function in `sort.ts`)
- [x] jsonc-eslint-parser
- [x] eslint-plugin-jsonc
- [x] @eslint-react/eslint-plugin (eslint-plugin-react?)
- [x] eslint-plugin-jsx-a11y
- [x] eslint-plugin-react-hooks
- [x] eslint-plugin-react-refresh
- [x] toml-eslint-parser
- [x] eslint-plugin-tom
- [x] yaml-eslint-parser
- [x] eslint-plugin-yml
- [x] eslint-config-flat-gitignore
- [x] eslint-flat-config-utils
- [x] [xo](https://github.com/xojs/eslint-config-xo-typescript/blob/main/index.js) rules inline (revisit if / when preset configs are exported)
- [x] [eslint-plugin-depend](https://github.com/es-tooling/eslint-plugin-depend)

### Consider

- [ ] prettier-plugin-curly
- [ ] sentences-per-line
- [ ] console-fail-test
- [ ] resolving tsconfig `checkJs` to determine how to handle js (<https://github.com/privatenumber/get-tsconfig>)
- [ ] [eslint-plugin-sonarjs](https://github.com/SonarSource/SonarJS/blob/master/packages/jsts/src/rules/README.md) (hmm)
- [ ] [eslint-plugin-write-good-comments](https://github.com/kantord/eslint-plugin-write-good-comments)
