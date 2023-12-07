# shared-config

## Using

First install the `.npmrc`, this is required for correct PNPM behavior:

```sh
pnpm dlx @kitschpatrol/npm-config
```

Then, to install all configs, run:

```sh
pnpm add @kitschpatrol/shared-config
```

To create default config files in your project root:

```sh
pnpm shared-config-init
```

## Dev Notes

- Note that `prettier` and `eslint` packages are [hoisted by default](https://pnpm.io/npmrc#public-hoist-pattern) in `pnpm`
- For local development via `pnpm`, use `file:` dependency protocol instead of `link:`

-https://github.com/1stG/configs

## TODO

-[ ] tsconfig?

## Issues

- Markdownlint, CSpell, Eslint, and Prettier all need to be hoisted via `public-hoist-pattern` to be accessible in `pnpm exec` scripts and to VSCode plugins.

- Even basic file-only packages like `vscode-config` and `npm-config` seem to need to be hoisted via for their bin scripts to be accessible via `pnpm exec`
