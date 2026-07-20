# Ignore checklist

<!-- cspell:ignore remarkignore stylelintignore subpackages globber lockfiles -->

Where to add an ignore pattern for every tool in this repo, plus what each tool ignores on its own. Two scenarios: ignoring something **in this repo only**, and shipping a **new default ignore to all shared-config consumers**.

Facts verified 2026-07 against the installed versions: ESLint 10.7, Prettier 3.9, CSpell 10.0, Stylelint 17.14, Knip 6.27, TypeScript 6.0, Vitest 4.1.

## Scenario 1: Ignore a file type in this repo

`.gitignore` is the highest-leverage file — five tools besides Git read it (see the propagation table below). If the file type is git-ignorable, start and often end there.

| Tool                   | Edit                                            | Key / mechanism                                                              |
| ---------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| Git (+ 5 others)       | [`.gitignore`](../.gitignore)                   | gitignore syntax                                                             |
| Prettier               | [`.prettierignore`](../.prettierignore)         | gitignore syntax                                                             |
| ESLint (+ remark)      | [`eslint.config.ts`](../eslint.config.ts)       | `ignores` array passed to `eslintConfig()`                                   |
| CSpell (+ Case Police) | [`cspell.config.ts`](../cspell.config.ts)       | `ignorePaths` array (merges with package defaults)                           |
| Stylelint              | [`stylelint.config.js`](../stylelint.config.js) | `ignoreFiles` array                                                          |
| Knip                   | [`knip.config.ts`](../knip.config.ts)           | `ignore` array (deep-merged with package defaults)                           |
| TypeScript             | [`tsconfig.json`](../tsconfig.json)             | `exclude` array                                                              |
| Vitest                 | [`vitest.config.ts`](../vitest.config.ts)       | `test.exclude` (only matters if the path matches the test-file include glob) |
| mdat                   | n/a                                             | Only touches the readme files it's pointed at; no ignore concept             |

### Who reads `.gitignore`?

| Tool      | How                                                                                                                                                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Git       | Natively                                                                                                                                                                                                                                               |
| ESLint    | `eslint-config-flat-gitignore`, enabled by default (`gitignore: true`, `strict: false`) in [`packages/eslint-config/src/config.ts`](../packages/eslint-config/src/config.ts)                                                                           |
| Prettier  | `ksc` passes `--ignore-path <workspace root>/.gitignore` (plus root `.prettierignore`) in [`packages/prettier-config/src/command.ts`](../packages/prettier-config/src/command.ts). Prettier's own default is the same pair, but resolved from the cwd. |
| Stylelint | `ksc` passes `--ignore-path <workspace root>/.gitignore` in [`packages/stylelint-config/src/command.ts`](../packages/stylelint-config/src/command.ts)                                                                                                  |
| CSpell    | `useGitignore: true` in [`packages/cspell-config/src/config.ts`](../packages/cspell-config/src/config.ts) (CSpell's own default is `false`)                                                                                                            |
| Knip      | Respects all `.gitignore` files by default (`--no-gitignore` to disable)                                                                                                                                                                               |

## Scenario 2: Ship a new default ignore to all consumers

Edit the package defaults, then release. Note the two `init/` boilerplate files only land on `ksc init` — existing consumer projects never pick up changes to them.

| Tool          | Edit                                                                                                | Key / mechanism                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ESLint        | [`packages/eslint-config/src/globs.ts`](../packages/eslint-config/src/globs.ts)                     | `GLOB_EXCLUDE`, merged into the `kp/ignores` config by [`configs/ignores.ts`](../packages/eslint-config/src/configs/ignores.ts)                                                                       |
| CSpell        | [`packages/cspell-config/src/config.ts`](../packages/cspell-config/src/config.ts)                   | `ignorePaths` — also flows to Case Police (see gotchas)                                                                                                                                               |
| Prettier      | [`packages/prettier-config/init/.prettierignore`](../packages/prettier-config/init/.prettierignore) | Boilerplate only — existing consumers edit their own `.prettierignore`                                                                                                                                |
| Git & friends | [`packages/repo-config/init/.gitignore`](../packages/repo-config/init/.gitignore)                   | Boilerplate only — same caveat                                                                                                                                                                        |
| Stylelint     | [`packages/stylelint-config/src/command.ts`](../packages/stylelint-config/src/command.ts)           | `positionalArgumentDefaultSuffix` — stylelint only ever sees `**/*.{css,scss,sass,svelte,html,astro,tsx,jsx,php,vue}`, so removing an extension here un-lints it everywhere                           |
| Knip          | [`packages/knip-config/src/config.ts`](../packages/knip-config/src/config.ts)                       | No `ignore` array today; add one to ship a default                                                                                                                                                    |
| TypeScript    | [`packages/typescript-config/init/tsconfig.json`](../packages/typescript-config/init/tsconfig.json) | `exclude` boilerplate (init-only). The shared [`tsconfigs/base.json`](../packages/typescript-config/tsconfigs/base.json) has no `include`/`exclude` — the consumer's tsconfig controls file selection |

## Will the tool even see a new file type?

For a brand-new extension, most tools ignore it implicitly — only some need an explicit entry:

- **Always sees it:** Git (tracks anything), CSpell (spell-checks any text file — `enabledFileTypes: { '*': true }` in CSpell 10's defaults). These two are the usual mandatory edits.
- **Sees it only if configured for it:** ESLint (a config's `files` glob must match — see `GLOB_*` in [`globs.ts`](../packages/eslint-config/src/globs.ts)), Prettier (must have a parser/plugin for the extension), Stylelint (extension must be in the `ksc` default glob list), TypeScript (JS/TS files only), Knip (default `project` glob is `**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`), Vitest (must match `**/*.{test,spec}.?(c|m)[jt]s?(x)`).

## Per-tool default ignore behavior

### Git

No built-in patterns. Reads nested `.gitignore` files, `.git/info/exclude`, and the global `core.excludesFile` (default `~/.config/git/ignore`).

### ESLint 10 (flat config) — [docs](https://eslint.org/docs/latest/use/configure/ignore)

- Built-in defaults: exactly `**/node_modules/` and `.git/`. **Dotfiles are not ignored** in flat config.
- Layers in our setup, all additive: built-ins → `.gitignore` (flat-gitignore, non-strict) → `GLOB_EXCLUDE` → the consumer's `ignores` option.
- `ignores` is global only when it's the sole key in a config object (aside from `name`); alongside `files`/`rules` it's per-config and can't match bare directories.
- Remark markdown linting runs inside ESLint (see [`packages/remark-config/src/command.ts`](../packages/remark-config/src/command.ts)), so ignoring `.md` files is an ESLint ignore. `.remarkrc.js` has no ignore role here; `.remarkignore` is unused.

### Prettier 3.9 — [ignore docs](https://prettier.io/docs/ignore) · [CLI docs](https://prettier.io/docs/cli)

- Always ignores `node_modules` (opt out: `--with-node-modules`) and VCS dirs: `.git`, `.jj`, `.sl`, `.svn`, `.hg`.
- Default `--ignore-path` is _both_ `./.gitignore` and `./.prettierignore`. Passing `--ignore-path` explicitly **replaces** that default — which `ksc` does, resolving both files at the workspace root so runs from subdirectories behave. Consequence: nested `.prettierignore`/`.gitignore` files in monorepo subpackages are **not** consulted under `ksc`.
- Given a directory, Prettier only formats files whose extension/filename maps to a known parser (built-in or plugin).

### CSpell 10 — [docs](https://cspell.org/configuration/) (defaults verified from installed source)

- Default settings ship an **empty** `ignorePaths`; the CLI's globber excludes only `node_modules/**` (and `--exclude` on the command line replaces that, it doesn't merge).
- Hidden files/dirs are skipped by default (`enableGlobDot` defaults to `false`; our config sets it explicitly).
- `useGitignore` defaults to `false`; our shared config turns it on.
- `ignorePaths` from imported configs **merge** — the consumer's list adds to the shared package's list (which already covers media/binary extensions, lockfiles, `.claude/`, etc.).
- **Case Police**: `ksc-cspell lint` passes the resolved CSpell `ignorePaths` to case-police via `--ignore` ([`command.ts`](../packages/cspell-config/src/command.ts)) — but `.gitignore` does _not_ flow through, only `ignorePaths` entries.

### Stylelint 17

Docs: [`ignoreFiles`](https://stylelint.io/user-guide/configure/#ignorefiles) · [`--ignore-path`](https://stylelint.io/user-guide/options/#ignorepath). Behavior below verified from installed source.

- Always ignores `**/node_modules/**`.
- Default ignore file is `.stylelintignore` in the cwd — but **only when no `--ignore-path` is given**. `ksc` passes `--ignore-path <root>/.gitignore`, so a `.stylelintignore` file would be **silently ignored** in ksc projects. Use `ignoreFiles` in `stylelint.config.js` instead.
- Only lints files matching the extension glob `ksc` passes (see Scenario 2 table).

### Knip 6 — [config docs](https://knip.dev/reference/configuration)

- Respects all `.gitignore` files by default (`--no-gitignore` to disable; with `--cache`, newly added `.gitignore` files need a cache delete to register).
- `ignore` suppresses all issue types for matching files (docs discourage it); `ignoreFiles` only suppresses the unused-`files` issue type. `ignoreBinaries`/`ignoreDependencies` cover unlisted binaries and package names.
- Default `project` glob only covers JS/TS extensions, so non-JS file types are invisible to Knip anyway.

### TypeScript 6 — [tsconfig `exclude`](https://www.typescriptlang.org/tsconfig/#exclude)

- Default `exclude` (only when unspecified): `node_modules`, `bower_components`, `jspm_packages`, and `outDir`. Specifying your own `exclude` replaces that list.
- `exclude` only filters `include` glob expansion — it does **not** stop a file from entering the program via an `import`, `types`, or `/// <reference>`.

### Vitest 4 — [`exclude` docs](https://vitest.dev/config/exclude)

- Default include: `**/*.{test,spec}.?(c|m)[jt]s?(x)`. Default exclude shrank in v4 to just `**/node_modules/**` and `**/.git/**`.
- Setting `include`/`exclude` in config **replaces** the defaults — spread `configDefaults.exclude` to extend. (CLI `--exclude` adds instead.)

### mdat

No ignore mechanism — it only processes the readme files it's invoked on.
