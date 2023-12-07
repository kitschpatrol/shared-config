# shared-config

## Using

First install the `.npmrc`, this is required for correct PNPM behavior:

pnpm dlx @kitschpatrol/npm-config

pnpm add @kitschpatrol/shared-config

pnpm init-shared-config

## Dev Notes

- Note that `prettier` and `eslint` packages are [hoisted by default](https://pnpm.io/npmrc#public-hoist-pattern) in `pnpm`
- For local development via `pnpm`, use `file:` dependency protocol instead of `link:`

-https://github.com/1stG/configs

## TODO

- cspell
- vscode
