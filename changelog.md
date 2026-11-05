# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [Unreleased]

### Changed

- Exclude `changelog.md` files from CSpell and ESLint checks.
- [@kitschpatrol/cspell-config Unreleased](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#unreleased): Exclude `**/changelog.md` from default spell checks.
- [@kitschpatrol/eslint-config Unreleased](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#unreleased): Exclude lowercase `changelog.md` files from default ESLint linting.

## [8.14.1] - 2026-11-03

### Added

- Require ATX Markdown headings and provide targeted Setext-to-ATX fixes.

### Fixed

- Prevent remark auto-fixes from splitting Markdown lists or inserting `&#x20;`, while retaining safe heading conversion.
- Use Knip's CSpell integration to discover dictionary dependencies and report dictionaries that are no longer imported.
- Normalize and escape Windows directory paths when constructing extension-filtered globs.
- [@kitschpatrol/eslint-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8141---2026-11-03): Prevent remark autofixes from corrupting Markdown/MDX lists and emphasis while retaining targeted Setext-to-ATX heading fixes.
- [@kitschpatrol/eslint-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8141---2026-11-03): Accept MDX content expressions and JSX comments while retaining unused-expression checks inside exported JavaScript.
- [@kitschpatrol/knip-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8141---2026-11-03): Enable CSpell configuration discovery without a direct CSpell dependency, resolve dictionary imports across configuration locations, and report dictionaries that are no longer used.
- [@kitschpatrol/shared-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8141---2026-11-03): Normalize Windows directory arguments before glob expansion and escape literal backslashes in POSIX directory names.

### Maintenance

- Refresh dependencies, including the TOML formatter, and update the dependency-maintenance workflow action.
- [@kitschpatrol/cspell-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8141---2026-11-03): See the package changelog.
- [@kitschpatrol/eslint-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8141---2026-11-03): Refresh ESLint, MDX, package.json, regexp, and type-generation dependencies and expand Markdown regression tests.
- [@kitschpatrol/knip-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8141---2026-11-03): Update Knip to 6.44.1 and add CSpell dependency-discovery integration tests.
- [@kitschpatrol/mdat-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#8141---2026-11-03): See the package changelog.
- [@kitschpatrol/prettier-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8141---2026-11-03): Update `prettier-plugin-packagejson` to 3.1 and `prettier-plugin-toml` to 4.1.
- [@kitschpatrol/remark-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#8141---2026-11-03): Update `mdast-util-to-markdown` to 2.2.1.
- [@kitschpatrol/repo-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8141---2026-11-03): Update the pnpm lockfile reader and the dependency-update workflow's Skill to PR action.
- [@kitschpatrol/shared-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8141---2026-11-03): Update pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8141---2026-11-03): See the package changelog.
- [@kitschpatrol/typescript-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8141---2026-11-03): See the package changelog.

### Changed

- [@kitschpatrol/remark-config 8.14.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#8141---2026-11-03): Require ATX (`#`) headings through `remark-lint-heading-style`, since Prettier preserves the existing heading style.

## [8.14.0] - 2026-10-27

### Added

- Bundle MDAT usage and plugin-authoring skills, with pnpm skill linking configured in starter workspaces.

### Fixed

- Expand directory arguments into extension-filtered globs so each CLI tool checks only its supported files.
- Update only the final copyright notice in a license, preserving earlier upstream notices.
- Include repo-config's `.gitignore` template in the published package.
- [@kitschpatrol/repo-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8140---2026-10-27): Update only the last copyright notice containing a year, preserving earlier upstream notices in forked licenses.
- [@kitschpatrol/repo-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8140---2026-10-27): Explicitly include the starter `.gitignore` in published package files.
- [@kitschpatrol/shared-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8140---2026-10-27): Expand directory arguments to globs restricted to each tool's supported extensions, escaping special characters in directory names.
- [@kitschpatrol/stylelint-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8140---2026-10-27): Restrict directory arguments to supported file extensions so Stylelint does not lint unrelated files.

### Maintenance

- Refresh dependencies and GitHub actions, and change scheduled dependency updates to monthly.
- [@kitschpatrol/cspell-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8140---2026-10-27): Update CSpell to 10.4.0 and refresh CLI and formatting dependencies.
- [@kitschpatrol/eslint-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8140---2026-10-27): Refresh ESLint, framework plugins, CLI dependencies, and generated presets, and declare tslib as a runtime dependency.
- [@kitschpatrol/knip-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8140---2026-10-27): Refresh runtime dependencies, including Knip 6.43.0, Execa, and Prettier.
- [@kitschpatrol/mdat-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#8140---2026-10-27): Refresh MDAT, Prettier, and Execa dependencies.
- [@kitschpatrol/prettier-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8140---2026-10-27): Refresh Prettier, Astro, PHP, package.json formatting, Execa, and package-sorting dependencies.
- [@kitschpatrol/remark-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#8140---2026-10-27): Update Execa to 10.2.1 and Prettier to 3.9.10.
- [@kitschpatrol/stylelint-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8140---2026-10-27): Refresh Execa and Prettier, and normalize published package inclusion paths.
- [@kitschpatrol/typescript-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8140---2026-10-27): Update Execa and Prettier and simplify checker-adapter validation.

### Changed

- [@kitschpatrol/repo-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8140---2026-10-27): Use pnpm's built-in agent-skill linking into `.agents/skills` and `.claude/skills` instead of copying an embedded guide.

### Documentation

- [@kitschpatrol/shared-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8140---2026-10-27): Bundle mdat usage and plugin-authoring skills and document automatic skill linking with pnpm 12.11 or later.
- [@kitschpatrol/shared-config 8.14.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8140---2026-10-27): Update dependency-workflow scheduling guidance and add an npm download badge.

## [8.13.1] - 2026-10-08

### Fixed

- Isolate update-skill scratch files and metadata caches in an explicitly selected run directory to prevent path collisions.

### Documentation

- [@kitschpatrol/shared-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8131---2026-10-08): Require a unique per-run directory in `ksc-update` to avoid collisions between concurrent checkouts.

### Maintenance

- [@kitschpatrol/cspell-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8131---2026-10-08): See the package changelog.
- [@kitschpatrol/eslint-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8131---2026-10-08): See the package changelog.
- [@kitschpatrol/knip-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8131---2026-10-08): See the package changelog.
- [@kitschpatrol/mdat-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#8131---2026-10-08): See the package changelog.
- [@kitschpatrol/prettier-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8131---2026-10-08): See the package changelog.
- [@kitschpatrol/remark-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#8131---2026-10-08): See the package changelog.
- [@kitschpatrol/repo-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8131---2026-10-08): See the package changelog.
- [@kitschpatrol/shared-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8131---2026-10-08): Require verification helpers to use an absolute `KSC_UPDATE_RUN_DIR` instead of a shared temporary directory.
- [@kitschpatrol/stylelint-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8131---2026-10-08): See the package changelog.
- [@kitschpatrol/typescript-config 8.13.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8131---2026-10-08): See the package changelog.

## [8.13.0] - 2026-10-08

### Added

- Sort pnpm workspace keys and selected sequence values through ESLint.
- Expand `ksc-update` with reusable helpers for release-age checks, consumer dependency ranges, packed installations, and Node.js compatibility verification.
- [@kitschpatrol/eslint-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8130---2026-10-08): Sort pnpm-workspace.yaml keys and selected list fields while preserving order-sensitive hoist patterns and hooks.

### Fixed

- Exclude Vite's temporary configuration files from spelling checks.
- [@kitschpatrol/cspell-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8130---2026-10-08): Ignore transient Vite configuration bundles that can disappear during concurrent CI scans.

### Documentation

- Explain how Knip workspace entry patterns must be configured explicitly in monorepos.
- [@kitschpatrol/knip-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8130---2026-10-08): Explain monorepo entry-pattern behavior and show how to apply shared entries to the root and package workspaces.
- [@kitschpatrol/shared-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8130---2026-10-08): Expand `ksc-update` into a full repository maintenance workflow with configuration policies and revised verification guidance.
- [@kitschpatrol/typescript-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8130---2026-10-08): Move the `exactOptionalPropertyTypes` recommendation into the README and remove obsolete starter-config comments.

### Maintenance

- Refresh dependencies and workflows, repair Windows readme builds, and make link checks tolerate loopback URLs and empty scans.
- [@kitschpatrol/cspell-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8130---2026-10-08): Update Execa and package discovery keywords.
- [@kitschpatrol/eslint-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8130---2026-10-08): Refresh React, Execa, and Svelte development dependencies and update package keywords.
- [@kitschpatrol/knip-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8130---2026-10-08): Update Knip to 6.40.0 and Execa to 10.1.0.
- [@kitschpatrol/mdat-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#8130---2026-10-08): Update MDAT to 3.6.2 and Execa to 10.1.0.
- [@kitschpatrol/prettier-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8130---2026-10-08): Update Execa to 10.1 and refresh package discovery keywords.
- [@kitschpatrol/remark-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#8130---2026-10-08): Update Execa to 10.1 and refresh package discovery keywords.
- [@kitschpatrol/repo-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8130---2026-10-08): Allow loopback links and empty scan results in the starter link-check workflow.
- [@kitschpatrol/shared-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8130---2026-10-08): Add maintenance helpers for release-age checks, consumer dependency resolution, packed installs, engine inventories, and output comparisons.
- [@kitschpatrol/shared-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8130---2026-10-08): Update Execa, mdat, and pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8130---2026-10-08): Update Execa to version 10.1 and refresh package discovery metadata.
- [@kitschpatrol/typescript-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8130---2026-10-08): Update Execa and npm package-discovery metadata.

### Changed

- [@kitschpatrol/eslint-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8130---2026-10-08): Allow `repo` as an abbreviation for `repository`.
- [@kitschpatrol/repo-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8130---2026-10-08): Ignore Netlify and Wrangler scratch directories in starter repositories.
- [@kitschpatrol/repo-config 8.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8130---2026-10-08): Narrow the ESLint peer-dependency exception and remove the starter minimum-release-age exemption for `@kitschpatrol/*`.

## [8.12.1] - 2026-10-06

### Changed

- Ignore `.agents` folders and skill lockfiles in starter repository and formatting settings.
- [@kitschpatrol/prettier-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8121---2026-10-06): Exclude `.agents/` from formatting in newly initialized projects.
- [@kitschpatrol/repo-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8121---2026-10-06): Ignore agent directories and `skills-lock.json` in starter repositories.

### Documentation

- Refine update-skill guidance for release maturity, pnpm selection, peer compatibility, and package side-effects declarations.
- [@kitschpatrol/repo-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8121---2026-10-06): Document the Workflows token permission needed to update GitHub Actions.
- [@kitschpatrol/shared-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8121---2026-10-06): Refine `ksc-update` guidance for pnpm upgrades, release-age exemptions, scoped peer warnings, and side-effect declarations.

### Maintenance

- Adopt the Skill to PR action for dependency-update workflows and synchronize skills during local installation.
- [@kitschpatrol/cspell-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8121---2026-10-06): See the package changelog.
- [@kitschpatrol/eslint-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8121---2026-10-06): See the package changelog.
- [@kitschpatrol/knip-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8121---2026-10-06): See the package changelog.
- [@kitschpatrol/mdat-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#8121---2026-10-06): See the package changelog.
- [@kitschpatrol/remark-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#8121---2026-10-06): See the package changelog.
- [@kitschpatrol/repo-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8121---2026-10-06): Replace inline dependency-update orchestration with the reusable Skill to PR action.
- [@kitschpatrol/stylelint-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8121---2026-10-06): See the package changelog.
- [@kitschpatrol/typescript-config 8.12.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8121---2026-10-06): See the package changelog.

## [8.12.0] - 2026-10-06

### Added

- Bundle a `ksc-update` agent skill for dependency upgrades, compatibility review, and repository maintenance.

### Fixed

- Recognize Tailwind classes in Svelte projects, preserve string-form CSS imports, and disable conflicting array-splice lint rules.
- [@kitschpatrol/eslint-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8120---2026-10-06): Avoid unused-class errors for Svelte Tailwind classes, including package-local Tailwind installations in monorepos.
- [@kitschpatrol/eslint-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8120---2026-10-06): Disable the array-splice rule that conflicts with negative-index autofixes.
- [@kitschpatrol/stylelint-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8120---2026-10-06): Preserve string-form CSS imports and convert URL imports to strings so Tailwind's PostCSS plugin can inline its styles.

### Maintenance

- Add a scheduled dependency-update workflow that runs the update skill and opens a pull request, and refresh dependencies.
- [@kitschpatrol/cspell-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8120---2026-10-06): Update README generation tooling and explicitly configure generated CLI-reference headings.
- [@kitschpatrol/eslint-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8120---2026-10-06): Refresh TypeScript and React linting dependencies and add compatibility regression tests.
- [@kitschpatrol/knip-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8120---2026-10-06): See the package changelog.
- [@kitschpatrol/mdat-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#8120---2026-10-06): Update MDAT to 3.6.1 and adjust CLI-help generation settings.
- [@kitschpatrol/prettier-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8120---2026-10-06): Specify heading options explicitly in the README's CLI-help generation template.
- [@kitschpatrol/remark-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#8120---2026-10-06): Specify heading options explicitly in the README's CLI-help generation template.
- [@kitschpatrol/repo-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8120---2026-10-06): Ship a weekly and manually runnable Claude Code dependency-update workflow that runs `ksc-update` and opens a pull request with its report.
- [@kitschpatrol/shared-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8120---2026-10-06): Update mdat.

### Changed

- [@kitschpatrol/cspell-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8120---2026-10-06): Recognize additional shell, filesystem, and sandbox terminology.

### Documentation

- [@kitschpatrol/repo-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8120---2026-10-06): Document dependency-update workflow secrets, token permissions, scheduling, and generated pull requests.
- [@kitschpatrol/shared-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8120---2026-10-06): Bundle the `ksc-update` skill with dependency compatibility, migration, and verification guidance.
- [@kitschpatrol/shared-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8120---2026-10-06): Document dependency-update workflow credentials and global skill installation.
- [@kitschpatrol/typescript-config 8.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8120---2026-10-06): Suppress the extra heading when generating CLI help in the package README.

## [8.11.0] - 2026-10-04

### Added

- Bundle an installable `ksc` agent skill in the main package.
- [@kitschpatrol/eslint-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8110---2026-10-04): Support Agent Skills Markdown conventions, including `SKILL.md` filenames and unresolved example imports, and export skill/config-file glob patterns.
- [@kitschpatrol/knip-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8110---2026-10-04): Treat scripts bundled under `skills/*/scripts` as entry points.

### Changed

- Accommodate agent skill documents and bundled scripts in ESLint and Knip defaults.
- [@kitschpatrol/eslint-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8110---2026-10-04): Refresh TypeScript and Unicorn recommended checks.

### Fixed

- Prevent unused-dependency reports for `svelte-check` and relax conflicting ESLint rules for configuration files and JSDoc comments.
- [@kitschpatrol/eslint-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8110---2026-10-04): Allow conventional top-level configuration calls in config files and code examples.
- [@kitschpatrol/knip-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8110---2026-10-04): Avoid false unused-dependency reports for `svelte-check`.

### Documentation

- [@kitschpatrol/repo-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8110---2026-10-04): Rewrite the bundled agent guide with current lint/fix workflows, tool commands, rule prefixes, and configuration examples.
- [@kitschpatrol/shared-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8110---2026-10-04): Bundle the `ksc` agent skill covering code conventions, configuration, and lint workflows, with installation instructions.

### Maintenance

- [@kitschpatrol/cspell-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8110---2026-10-04): Update CSpell and its libraries to 10.3.6.
- [@kitschpatrol/knip-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8110---2026-10-04): Update Knip to 6.39.0.
- [@kitschpatrol/mdat-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#8110---2026-10-04): Update MDAT to 3.5.0.
- [@kitschpatrol/prettier-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8110---2026-10-04): See the package changelog.
- [@kitschpatrol/remark-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#8110---2026-10-04): Update `mdast-util-to-markdown` to 2.2.
- [@kitschpatrol/repo-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8110---2026-10-04): Update the pnpm lockfile reader dependency.
- [@kitschpatrol/shared-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8110---2026-10-04): Refresh runtime dependencies and simplify aggregate command construction.
- [@kitschpatrol/stylelint-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8110---2026-10-04): Update the Stylelint runtime dependency to `^17.16.0`.
- [@kitschpatrol/typescript-config 8.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8110---2026-10-04): See the package changelog.

## [8.10.1] - 2026-09-28

### Changed

- Exclude coverage reports from shared checks and simplify starter tsconfig files to inherit shared include and exclude settings.
- [@kitschpatrol/cspell-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8101---2026-09-28): Exclude coverage directories from spell checking.
- [@kitschpatrol/cspell-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8101---2026-09-28): Expand dictionaries and normalize acronym capitalization and possessive entries.
- [@kitschpatrol/eslint-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8101---2026-09-28): Allow known-safe `node:test` calls in floating-promise checks.
- [@kitschpatrol/typescript-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8101---2026-09-28): Exclude coverage directories from the base preset and let starter configurations inherit file-selection defaults.

### Fixed

- Update the HTML processor and remove the temporary ESLint version pin.
- [@kitschpatrol/eslint-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8101---2026-09-28): Upgrade eslint-plugin-html and restore support for ESLint 10.11 and later.
- [@kitschpatrol/repo-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8101---2026-09-28): Allow ESLint 10 with eslint-plugin-jsx-a11y in starter pnpm peer-dependency rules.

### Maintenance

- Refresh dependencies, including TOML formatting support, improve dictionary-maintenance prompts, and repair link-checker stderr capture.
- [@kitschpatrol/cspell-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8101---2026-09-28): Improve dictionary-suggestion prompts with explicit file destinations and duplicate-handling guidance.
- [@kitschpatrol/knip-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8101---2026-09-28): Refresh runtime dependencies, including Knip 6.38.0, fs-extra, and Prettier.
- [@kitschpatrol/mdat-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#8101---2026-09-28): Update MDAT, Prettier, and filesystem dependencies.
- [@kitschpatrol/mdat-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#8101---2026-09-28): Update configuration-resolution tests for the newer MDAT loader.
- [@kitschpatrol/prettier-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8101---2026-09-28): Refresh Prettier and formatter plugins, including Astro, shell, and TOML support; upgrade the TOML plugin to version 3.
- [@kitschpatrol/remark-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#8101---2026-09-28): Refresh mdast-util-to-markdown, Prettier, and filesystem runtime dependencies.
- [@kitschpatrol/repo-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8101---2026-09-28): Correct stderr capture during sitemap discovery in the link-check workflow.
- [@kitschpatrol/repo-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8101---2026-09-28): Refresh the pnpm lockfile reader, fs-extra, and Prettier runtime dependencies.
- [@kitschpatrol/shared-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8101---2026-09-28): Refresh runtime dependencies, including CSpell, mdat, Prettier, fs-extra, and pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8101---2026-09-28): Refresh filesystem and Prettier runtime dependencies.
- [@kitschpatrol/typescript-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8101---2026-09-28): Update fs-extra and Prettier.

### Documentation

- [@kitschpatrol/eslint-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8101---2026-09-28): Remove the resolved ESLint version-pin warning.
- [@kitschpatrol/shared-config 8.10.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8101---2026-09-28): Recommend pnpm 12.

## [8.10.0] - 2026-09-22

### Changed

- Return Astro formatting to the upstream `prettier-plugin-astro` package.
- [@kitschpatrol/cspell-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8100---2026-09-22): Recognize `rviscomi` in the names dictionary.
- [@kitschpatrol/prettier-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8100---2026-09-22): Switch Astro formatting from the maintained fork back to upstream `prettier-plugin-astro` 1.x.

### Fixed

- Disable ESLint caching to avoid stale results with type-aware rules.
- Filter explicit mixed file lists by each tool's supported extensions and skip tools with no applicable files.
- Pin ESLint 10.10.0 to preserve compatibility with the HTML script processor.
- [@kitschpatrol/eslint-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8100---2026-09-22): Disable ESLint caching to prevent stale results from type-aware and cross-file rules.
- [@kitschpatrol/eslint-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8100---2026-09-22): Keep ESLint on 10.10.x to avoid an HTML-plugin crash with newer ESLint releases.
- [@kitschpatrol/eslint-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#8100---2026-09-22): Skip ignored or unmatched explicit file arguments without failing the warnings limit.
- [@kitschpatrol/prettier-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8100---2026-09-22): Skip explicitly supplied files with unsupported extensions instead of failing with a missing-parser error.
- [@kitschpatrol/shared-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8100---2026-09-22): Filter mixed explicit file lists for each tool's supported extensions and skip tools with no applicable files.
- [@kitschpatrol/stylelint-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8100---2026-09-22): Filter mixed explicit file lists to supported extensions and skip Stylelint when no applicable files remain.

### Documentation

- Document the upstream limitation affecting Tailwind class sorting in Astro files.
- [@kitschpatrol/prettier-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#8100---2026-09-22): Document the temporary loss of Tailwind class sorting in Astro files with the upstream Astro plugin's new syntax tree.
- [@kitschpatrol/shared-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8100---2026-09-22): Explain which tools use caches and why ESLint caching is disabled.

### Maintenance

- [@kitschpatrol/cspell-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#8100---2026-09-22): Update Prettier and Yargs.
- [@kitschpatrol/knip-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#8100---2026-09-22): Refresh runtime dependencies, including Knip 6.37.0, Yargs, and Prettier.
- [@kitschpatrol/mdat-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#8100---2026-09-22): Update Yargs to 18.2.0 and Prettier to 3.9.8.
- [@kitschpatrol/remark-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#8100---2026-09-22): Update Prettier to 3.9.8 and Yargs to 18.2.
- [@kitschpatrol/repo-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#8100---2026-09-22): Refresh runtime dependencies, including the pnpm lockfile reader, Prettier, and Yargs.
- [@kitschpatrol/shared-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#8100---2026-09-22): Update Prettier, Yargs, and pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#8100---2026-09-22): Refresh Prettier and Yargs runtime dependencies.
- [@kitschpatrol/typescript-config 8.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#8100---2026-09-22): Update Prettier and Yargs.

## [8.9.0] - 2026-09-17

### Maintenance

- Disable Prettier caching during ESLint preset generation to prevent stale generated output.
- Refresh dependencies and pin release and metadata actions to specific revisions.
- [@kitschpatrol/cspell-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#890---2026-09-17): Update CSpell to 10.3.3 and refresh configuration-editing and formatting dependencies.
- [@kitschpatrol/eslint-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#890---2026-09-17): Refresh dependencies and disable Prettier caching during rule regeneration to prevent stale generated formatting.
- [@kitschpatrol/knip-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#890---2026-09-17): Update Knip to 6.36.0 and refresh Prettier.
- [@kitschpatrol/mdat-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#890---2026-09-17): Update MDAT to 3.2.1 and Prettier to 3.9.7.
- [@kitschpatrol/prettier-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#890---2026-09-17): Update Prettier to 3.9.7 and simplify internal configuration-resolution helpers.
- [@kitschpatrol/remark-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#890---2026-09-17): Update the Prettier runtime dependency to 3.9.7.
- [@kitschpatrol/repo-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#890---2026-09-17): Refresh runtime dependencies and pin release and metadata actions to specific revisions.
- [@kitschpatrol/shared-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#890---2026-09-17): Refresh runtime dependencies, including CSpell, mdat, Prettier, magicast, and pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#890---2026-09-17): Update the Prettier runtime dependency to `^3.9.7`.
- [@kitschpatrol/typescript-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#890---2026-09-17): Update Prettier and simplify checker-adapter control flow.

### Changed

- [@kitschpatrol/eslint-config 8.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#890---2026-09-17): Refresh TypeScript, JSDoc, and Unicorn rules, including generated empty-object types and newer async/iterator checks.

## [8.8.0] - 2026-09-07

### Fixed

- Prevent scoped CSpell runs from reporting or deleting configuration words used elsewhere in the project.
- Parse JavaScript dependency exports correctly from Astro and Svelte files and keep framework parser extensions consistent across script configurations.
- [@kitschpatrol/cspell-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#880---2026-09-07): Skip unused-word reporting and removal for file-scoped runs so words used elsewhere are preserved.
- [@kitschpatrol/eslint-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#880---2026-09-07): Keep parser extra-file extensions consistent across scripts and enabled frameworks to avoid repeated TypeScript project reloads.
- [@kitschpatrol/eslint-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#880---2026-09-07): Parse JavaScript dependencies with the TypeScript parser when checking imports from Svelte or Astro files.

### Maintenance

- Migrate to Vitest 5, tsdown 0.23, and pnpm 12; update build validation and ignore Vitest artifacts.
- [@kitschpatrol/knip-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#880---2026-09-07): Update Knip to 6.34.0 and refresh Cosmiconfig.
- [@kitschpatrol/knip-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#880---2026-09-07): Adapt package type validation to tsdown 0.23.
- [@kitschpatrol/mdat-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#880---2026-09-07): Update MDAT and configuration-loading dependencies.
- [@kitschpatrol/mdat-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#880---2026-09-07): Adapt test/build configuration for Vitest 5 and tsdown 0.23, including the shared Vitest config and updated type validation.
- [@kitschpatrol/prettier-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#880---2026-09-07): Update Cosmiconfig to 10.0.1.
- [@kitschpatrol/prettier-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#880---2026-09-07): Adapt package type validation to tsdown 0.23 and run package tests with the shared Vitest configuration.
- [@kitschpatrol/remark-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#880---2026-09-07): Update Cosmiconfig to 10.0.1.
- [@kitschpatrol/remark-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#880---2026-09-07): Adapt package type-validation configuration to tsdown 0.23.
- [@kitschpatrol/repo-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#880---2026-09-07): Update the pnpm lockfile reader and Cosmiconfig dependencies.
- [@kitschpatrol/shared-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#880---2026-09-07): Refresh runtime dependencies and update test and package-type validation settings for newer Vitest and tsdown.
- [@kitschpatrol/stylelint-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#880---2026-09-07): Refresh Stylelint, Cosmiconfig, and the defensive CSS plugin.
- [@kitschpatrol/stylelint-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#880---2026-09-07): Use the shared Vitest configuration and update tsdown package-type validation settings.
- [@kitschpatrol/typescript-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#880---2026-09-07): Update Cosmiconfig to 10.0.1.

### Changed

- [@kitschpatrol/cspell-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#880---2026-09-07): Exclude Vitest scratch directories from spell checking.
- [@kitschpatrol/eslint-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#880---2026-09-07): Exclude Vitest's generated `.vitest` directory by default.
- [@kitschpatrol/repo-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#880---2026-09-07): Ignore `.vitest/` and exempt `@kitschpatrol/*` packages from pnpm's minimum release age in starter settings.

### Documentation

- [@kitschpatrol/cspell-config 8.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#880---2026-09-07): Explain that unused-word checks and pruning require a full-project run.

## [8.7.0] - 2026-08-26

### Added

- Expand spelling dictionaries and recognize the proper CSpell capitalization in Case Police.

### Fixed

- Disable Unicorn's single-line block-comment rule because it conflicts with JSDoc formatting.
- [@kitschpatrol/eslint-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#870---2026-08-26): Disable the block-comment style rule that conflicts with Prettier's JSDoc formatting.
- [@kitschpatrol/knip-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#870---2026-08-26): Avoid false unused-dependency reports for `@astrojs/check` and `sharp`.

### Maintenance

- Refresh dependencies, simplify release automation, and improve link-checker configuration and sitemap discovery.
- [@kitschpatrol/knip-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#870---2026-08-26): Refresh runtime dependencies, including Knip 6.32.2, Cosmiconfig 10, and deepmerge-ts 8.
- [@kitschpatrol/mdat-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#870---2026-08-26): Update MDAT to 3.1.0 and cosmiconfig to 10.
- [@kitschpatrol/prettier-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#870---2026-08-26): Upgrade Cosmiconfig to version 10 and `deepmerge-ts` to version 8.
- [@kitschpatrol/remark-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#870---2026-08-26): Upgrade Cosmiconfig to version 10 while retaining the dedicated TypeScript configuration loader.
- [@kitschpatrol/repo-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#870---2026-08-26): Simplify the release workflow, validate tags against the repository's default branch, and use the triggering tag directly.
- [@kitschpatrol/shared-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#870---2026-08-26): Refresh runtime dependencies, including cosmiconfig 10, deepmerge-ts 8, CSpell, and mdat.
- [@kitschpatrol/stylelint-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#870---2026-08-26): Upgrade to Cosmiconfig 10 and `stylelint-config-html` 2, and refresh the defensive CSS plugin.
- [@kitschpatrol/typescript-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#870---2026-08-26): Upgrade Cosmiconfig to 10.

### Changed

- [@kitschpatrol/cspell-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#870---2026-08-26): Enforce `CSpell` capitalization through Case Police.
- [@kitschpatrol/cspell-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#870---2026-08-26): Expand and correct acronym, brand, miscellaneous, name, and technical dictionaries.
- [@kitschpatrol/eslint-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#870---2026-08-26): Refresh Unicorn recommended rules.
- [@kitschpatrol/repo-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#870---2026-08-26): Nest `lychee.toml` beneath `package.json` in VS Code.

### Documentation

- [@kitschpatrol/cspell-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#870---2026-08-26): Correct CSpell naming and add its reference link in configuration API documentation.
- [@kitschpatrol/eslint-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#870---2026-08-26): Expand `eslintConfig()` API documentation with a composition example and reference links.
- [@kitschpatrol/knip-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#870---2026-08-26): Link `knipConfig()` API documentation to Knip.
- [@kitschpatrol/prettier-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#870---2026-08-26): Link the configuration factory's API documentation to Prettier.
- [@kitschpatrol/remark-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#870---2026-08-26): Clarify the configuration factory's API description and link it to Remark.
- [@kitschpatrol/repo-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#870---2026-08-26): Correct the pnpm workspace settings documentation link.
- [@kitschpatrol/shared-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#870---2026-08-26): Fix the repository-configuration guide link.
- [@kitschpatrol/stylelint-config 8.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#870---2026-08-26): Link Stylelint's homepage from configuration-factory API documentation.

## [8.6.0] - 2026-07-31

### Changed

- Configure Astro JSX imports and include project dotfiles in the shared TypeScript presets.
- [@kitschpatrol/typescript-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#860---2026-07-31): Add project-relative default file inclusion, including dotfiles, and a `dist` exclusion to the base preset.
- [@kitschpatrol/typescript-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#860---2026-07-31): Set Astro's `jsxImportSource` to `astro` and include dotfiles in the Astro preset.

### Fixed

- Resolve inherited TypeScript include and exclude paths relative to the consuming configuration.

### Maintenance

- Migrate link checking from Linkinator to Lychee and refresh dependencies.
- [@kitschpatrol/cspell-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#860---2026-07-31): Update Execa and Yargs.
- [@kitschpatrol/eslint-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#860---2026-07-31): Refresh ESLint, JSDoc, package.json, TOML, Execa, Yargs, globals, and development dependencies.
- [@kitschpatrol/knip-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#860---2026-07-31): Refresh Execa and Yargs runtime dependencies.
- [@kitschpatrol/mdat-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#860---2026-07-31): Update Execa and Yargs dependencies.
- [@kitschpatrol/mdat-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#860---2026-07-31): Replace CI documentation-link checking with Lychee.
- [@kitschpatrol/prettier-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#860---2026-07-31): Update Execa and Yargs runtime dependencies.
- [@kitschpatrol/remark-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#860---2026-07-31): Update Execa and Yargs runtime dependencies.
- [@kitschpatrol/repo-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#860---2026-07-31): Migrate starter link checks from Linkinator to Lychee, with separate cached repository and website scans and sitemap-based URL discovery.
- [@kitschpatrol/repo-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#860---2026-07-31): Update runtime dependencies, including Execa and Yargs.
- [@kitschpatrol/shared-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#860---2026-07-31): Update Execa, Yargs, and pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#860---2026-07-31): Refresh Execa and Yargs runtime dependencies.
- [@kitschpatrol/typescript-config 8.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#860---2026-07-31): Update Execa and Yargs.

## [8.5.0] - 2026-07-24

### Changed

- Relax JSDoc parameter-description and return-tag requirements inside Markdown examples.
- [@kitschpatrol/cspell-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#850---2026-07-24): Recognize `Beckwith` in the names dictionary.
- [@kitschpatrol/eslint-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#850---2026-07-24): Stop requiring complete JSDoc parameter descriptions and return documentation in Markdown/MDX code examples.

### Fixed

- Upgrade to MDAT 3, including its link-redirect handling fix.
- [@kitschpatrol/mdat-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#850---2026-07-24): Upgrade to MDAT 3.0.0 to pick up its redirected-link fix.

### Maintenance

- Add repository and website link-checking workflows, repair Windows CI tests, and refresh dependencies and action pins.
- [@kitschpatrol/cspell-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#850---2026-07-24): Refresh filesystem and dictionary-harvesting dependencies.
- [@kitschpatrol/eslint-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#850---2026-07-24): Fix Windows path comparisons in tests and refresh linting dependencies.
- [@kitschpatrol/knip-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#850---2026-07-24): Update Knip to 6.29.0 and refresh fs-extra.
- [@kitschpatrol/mdat-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#850---2026-07-24): Update filesystem dependencies, make configuration-path tests portable on Windows, and add CI documentation-link checks.
- [@kitschpatrol/prettier-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#850---2026-07-24): Update `fs-extra` to 11.4.
- [@kitschpatrol/remark-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#850---2026-07-24): Update `fs-extra` to 11.4.
- [@kitschpatrol/repo-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#850---2026-07-24): Ship a scheduled and manually runnable link-check workflow for repository Markdown and the configured project homepage.
- [@kitschpatrol/repo-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#850---2026-07-24): Refresh runtime dependencies, including the pnpm lockfile reader.
- [@kitschpatrol/shared-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#850---2026-07-24): Refresh runtime dependencies, including mdat 3, fs-extra, globby, and pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#850---2026-07-24): Update the `fs-extra` runtime dependency to version 11.4.
- [@kitschpatrol/typescript-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#850---2026-07-24): Update fs-extra.

### Documentation

- [@kitschpatrol/cspell-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#850---2026-07-24): Correct VS Code Problems-panel, npm package, and license links.
- [@kitschpatrol/eslint-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#850---2026-07-24): Correct package, license, VS Code, and plugin reference links.
- [@kitschpatrol/knip-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#850---2026-07-24): Correct README links to npm, the MIT license, and VS Code's Problems-panel documentation.
- [@kitschpatrol/mdat-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#850---2026-07-24): Correct README links to npm, the MIT license, MDAT documentation, and VS Code documentation.
- [@kitschpatrol/remark-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#850---2026-07-24): Update npm and license badge links to their canonical URLs.
- [@kitschpatrol/repo-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#850---2026-07-24): Correct README links for authentication setup, VS Code diagnostics, and package/license badges.
- [@kitschpatrol/shared-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#850---2026-07-24): Refresh outdated documentation links.
- [@kitschpatrol/stylelint-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#850---2026-07-24): Correct package, license, Stylelint documentation, and VS Code Problems-panel links.
- [@kitschpatrol/typescript-config 8.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#850---2026-07-24): Correct TypeScript directive, VS Code Problems panel, npm, and license links.

## [8.4.0] - 2026-07-22

### Added

- Restore Tailwind CSS class sorting alongside JSDoc formatting, including Astro and Svelte overrides.
- [@kitschpatrol/eslint-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#840---2026-07-22): Support `tsconfigRootDirectory` and optional partial `typeAware` settings in configuration APIs.
- [@kitschpatrol/prettier-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#840---2026-07-22): Include Tailwind plugin options in the exported `PrettierConfig` type.

### Fixed

- Limit MDAT's file API to Markdown, apply Prettier overrides programmatically, and propagate formatting errors through the aggregate API.
- Resolve workspace type checks and ESLint type awareness from the appropriate tsconfig, honoring inherited `checkJs` and explicit overrides.
- Correct ESLint handling of Svelte modules, Astro scripts, Markdown code fences, and JSON, and activate Vitest rules for matching test files.
- [@kitschpatrol/cspell-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#840---2026-07-22): Resolve initialization assets from the package containing the built executable.
- [@kitschpatrol/knip-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#840---2026-07-22): Avoid false unused-dependency reports for native build tooling `node-addon-api` and `node-gyp`.
- [@kitschpatrol/mdat-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#840---2026-07-22): Leave files other than `.md` and `.markdown` unchanged in `fixFile`.
- [@kitschpatrol/mdat-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#840---2026-07-22): Load `print-config` configuration once to avoid duplicating array-valued built-in rules.
- [@kitschpatrol/mdat-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#840---2026-07-22): Locate initialization assets from the built CLI's package directory.
- [@kitschpatrol/prettier-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#840---2026-07-22): Apply file-specific parser and formatting overrides in the programmatic API when using the shared configuration without a local config file.
- [@kitschpatrol/repo-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#840---2026-07-22): Resolve initialization templates from the package containing the built CLI.
- [@kitschpatrol/shared-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#840---2026-07-22): Apply Mdat only to Markdown in `fix` and `fixFile`, preventing other source formats from being rewritten as Markdown.
- [@kitschpatrol/stylelint-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#840---2026-07-22): Locate starter files relative to the installed CLI package so `init` copies the correct configuration.
- [@kitschpatrol/stylelint-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#840---2026-07-22): Return failure in machine and JSON modes when parsed diagnostics contain errors, even if the tool exits successfully.
- [@kitschpatrol/typescript-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#840---2026-07-22): Parse Astro and Svelte diagnostics into structured reports, including project warnings and fallback errors for unrecognized checker failures.
- [@kitschpatrol/typescript-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#840---2026-07-22): Discover workspace packages and run their appropriate checkers without repeatedly checking an inherited root tsconfig.

### Maintenance

- Refresh dependencies and reactivate CLI integration tests with updated formatting fixtures.
- [@kitschpatrol/cspell-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#840---2026-07-22): Simplify Markdown code-fence exclusions and add CSpell API regression tests for multiple fenced blocks.
- [@kitschpatrol/cspell-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#840---2026-07-22): Update Prettier to 3.9.6.
- [@kitschpatrol/knip-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#840---2026-07-22): Update the Prettier runtime dependency.
- [@kitschpatrol/knip-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#840---2026-07-22): Harden initialization-asset lookup and JSON-stream handling in the shared CLI runner.
- [@kitschpatrol/remark-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#840---2026-07-22): Update the Prettier runtime dependency to 3.9.6.
- [@kitschpatrol/repo-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#840---2026-07-22): Update the Prettier runtime dependency.
- [@kitschpatrol/stylelint-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#840---2026-07-22): Refresh Stylelint, the defensive CSS plugin, and Prettier.

### Changed

- [@kitschpatrol/eslint-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#840---2026-07-22): Accept additional generated-code and directive patterns in capitalization checks.
- [@kitschpatrol/prettier-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#840---2026-07-22): Restore Tailwind class sorting alongside JSDoc formatting, including Astro and Svelte parser overrides.
- [@kitschpatrol/repo-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#840---2026-07-22): Nest `electron-builder.ts` and `audit.json` beneath `package.json` in VS Code.
- [@kitschpatrol/shared-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#840---2026-07-22): Show the underlying checker commands in aggregate TypeScript execution logs.
- **Breaking:** [@kitschpatrol/shared-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#840---2026-07-22): Propagate Mdat and Prettier errors from `fix` and `fixFile` instead of silently swallowing them.
- [@kitschpatrol/typescript-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#840---2026-07-22): Identify the underlying checker in command logs and suppress non-actionable Astro output.

### Removed

- **Breaking:** [@kitschpatrol/eslint-config 8.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#840---2026-07-22): Remove the exported `GLOB_ASTRO_JS` constant for the unused Astro JavaScript virtual-file path.

## [8.3.0] - 2026-07-20

### Added

- Add default tool caches with `--cache` and `--no-cache`, and run independent checks concurrently while preserving fixer order.
- Export dedicated Astro and Svelte TypeScript presets.
- [@kitschpatrol/cspell-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#830---2026-07-20): Enable content-based CSpell caches for lint/fix with `--cache` and `--no-cache` controls.
- [@kitschpatrol/eslint-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#830---2026-07-20): Enable ESLint content caching for lint/fix commands, with `--cache` and `--no-cache` controls.
- [@kitschpatrol/knip-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#830---2026-07-20): Expose the shared `--cache` and `--no-cache` options on `lint`.
- [@kitschpatrol/mdat-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#830---2026-07-20): Expose shared `--cache` and `--no-cache` options on lint/fix commands.
- [@kitschpatrol/prettier-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#830---2026-07-20): Enable content-based Prettier caching for lint and fix, stored under `node_modules/.cache/ksc`, with `--no-cache` to disable it.
- [@kitschpatrol/repo-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#830---2026-07-20): Expose `--cache` and `--no-cache` options on repository lint and fix commands.
- [@kitschpatrol/shared-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#830---2026-07-20): Enable tool-native caches for lint and fix, with `--no-cache` to disable them and storage under the workspace's `node_modules/.cache/ksc`.
- [@kitschpatrol/stylelint-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#830---2026-07-20): Enable content-based Stylelint caching under the workspace's `node_modules/.cache/ksc`, controlled by `--cache` and `--no-cache`.
- [@kitschpatrol/typescript-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#830---2026-07-20): Export dedicated `/astro` and `/svelte` tsconfig presets.
- [@kitschpatrol/typescript-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#830---2026-07-20): Expose the shared `--cache` and `--no-cache` lint options.

### Changed

- Expand Svelte lint checks, sort attributes, and require kebab-case names for `.svelte.ts` and `.svelte.js` modules.
- [@kitschpatrol/cspell-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#830---2026-07-20): Make `fix` correct capitalization with Case Police, then check and report remaining spelling errors.
- [@kitschpatrol/cspell-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#830---2026-07-20): Render compact JSON reports and respect terminal/color settings when coloring CLI output.
- [@kitschpatrol/eslint-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#830---2026-07-20): Make JSON reports compact and optionally colorized.
- [@kitschpatrol/eslint-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#830---2026-07-20): Expand Svelte template checks, require TypeScript script blocks, and sort attributes.
- [@kitschpatrol/knip-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#830---2026-07-20): Render JSON reports compactly and apply terminal-aware color handling consistently with `NO_COLOR`, `FORCE_COLOR`, and `TERM`.
- [@kitschpatrol/mdat-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#830---2026-07-20): Run independent workspace MDAT checks and expansions concurrently.
- [@kitschpatrol/mdat-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#830---2026-07-20): Refine JSON output formatting and honor terminal, `NO_COLOR`, and `FORCE_COLOR` settings consistently.
- [@kitschpatrol/prettier-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#830---2026-07-20): Render compact JSON reports with terminal-aware coloring and consistent `NO_COLOR` and `FORCE_COLOR` handling.
- [@kitschpatrol/prettier-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#830---2026-07-20): Exclude `.claude/` from formatting in newly initialized projects.
- [@kitschpatrol/repo-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#830---2026-07-20): Refine JSON rendering and terminal colors to respect output destinations, `NO_COLOR`, and `FORCE_COLOR`.
- [@kitschpatrol/repo-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#830---2026-07-20): Ignore `.worktrees/` in starter repositories.
- [@kitschpatrol/shared-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#830---2026-07-20): Run lint tools concurrently and schedule fixes in ordered stages under a shared concurrency limit.
- [@kitschpatrol/shared-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#830---2026-07-20): Render compact JSON reports with terminal-aware color handling and respect `NO_COLOR`, `FORCE_COLOR`, and redirected output.
- [@kitschpatrol/stylelint-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#830---2026-07-20): Render JSON reports compactly and colorize them when appropriate for the output destination.
- [@kitschpatrol/typescript-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#830---2026-07-20): Limit starter build configurations to `src/` and simplify project file selection and build-output exclusions.

### Fixed

- Make `ksc fix` report remaining spelling, type, unused-code, and lint issues consistently with a subsequent lint run.
- [@kitschpatrol/remark-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#830---2026-07-20): Make printed configuration colors respect terminal detection, `NO_COLOR`, and `FORCE_COLOR`, keeping redirected output plain by default.
- [@kitschpatrol/stylelint-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#830---2026-07-20): Respect color overrides and output destinations, keeping machine-format diagnostics free of ANSI codes.

### Documentation

- Document ignore behavior across tools and how to exclude nested worktrees.

### Maintenance

- [@kitschpatrol/knip-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#830---2026-07-20): Update Knip to 6.26.0 and Execa to version 10.
- [@kitschpatrol/remark-config 8.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#830---2026-07-20): Upgrade Execa to version 10.

## [8.2.0] - 2026-07-16

### Added

- Add `--format json` and `--format machine` to lint and fix commands, with aggregate diagnostics and VS Code tasks feeding the Problems panel.
- [@kitschpatrol/cspell-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#820---2026-07-16): Support `--format native|machine|json` for lint and fix, including structured spelling, capitalization, and unused-word diagnostics.
- [@kitschpatrol/cspell-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#820---2026-07-16): Install VS Code lint/fix tasks with problem matchers and merge existing tasks by label.
- [@kitschpatrol/eslint-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#820---2026-07-16): Support `--format native`, `machine`, and `json` for lint and fix output.
- [@kitschpatrol/eslint-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#820---2026-07-16): Initialize VS Code lint/fix tasks with Problems-panel integration, merging existing tasks by label.
- [@kitschpatrol/knip-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#820---2026-07-16): Add `lint --format native|machine|json` with normalized Knip diagnostics for editor integrations and structured reports.
- [@kitschpatrol/knip-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#820---2026-07-16): Have `init` install a VS Code lint task with a Problems-panel matcher, merging existing tasks by label.
- [@kitschpatrol/mdat-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#820---2026-07-16): Support `--format native|machine|json` on `ksc-mdat lint` and `fix`.
- [@kitschpatrol/mdat-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#820---2026-07-16): Install VS Code lint/fix tasks with problem matchers through `ksc-mdat init`.
- [@kitschpatrol/prettier-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#820---2026-07-16): Add `--format native|machine|json` to `ksc-prettier lint` and `fix`, supporting editor diagnostics and structured reports.
- [@kitschpatrol/prettier-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#820---2026-07-16): Install VS Code lint and fix tasks through `init`, with problem matchers that populate the Problems panel.
- [@kitschpatrol/repo-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#820---2026-07-16): Support native, machine-readable, and JSON output through `--format` on repository `lint` and `fix` commands.
- [@kitschpatrol/repo-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#820---2026-07-16): Ship VS Code lint/fix tasks with problem matchers, merging existing tasks by label during initialization.
- [@kitschpatrol/shared-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#820---2026-07-16): Add `--format native|machine|json` to `ksc lint` and `ksc fix`, with normalized diagnostics and aggregate JSON reports.
- [@kitschpatrol/shared-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#820---2026-07-16): Install aggregate VS Code lint and fix tasks with Problems panel matchers, merging existing tasks by label.
- [@kitschpatrol/stylelint-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#820---2026-07-16): Add `--format native|machine|json` to lint and fix commands, including normalized diagnostics and aggregate JSON reports.
- [@kitschpatrol/stylelint-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#820---2026-07-16): Install VS Code lint and fix tasks with Problems-panel integration, merging existing tasks by label.
- [@kitschpatrol/typescript-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#820---2026-07-16): Add `--format json` and `--format machine` output for TypeScript diagnostics.
- [@kitschpatrol/typescript-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#820---2026-07-16): Install a VS Code type-checking task that populates the Problems panel, merging existing tasks by label.

### Changed

- Make `exactOptionalPropertyTypes` opt-in again and refine semantic object sorting.
- [@kitschpatrol/eslint-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#820---2026-07-16): Expand semantic object/type key ordering for dimensions, colors, coordinates, and Itson configurations.
- [@kitschpatrol/typescript-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#820---2026-07-16): Stop enabling `exactOptionalPropertyTypes` by default and suggest it as an opt-in starter configuration option.

### Fixed

- Run declared Svelte and Astro type checkers instead of skipping framework projects or checking them with plain tsc.
- Restore typed ESLint rule configuration and editor IntelliSense.
- [@kitschpatrol/mdat-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#820---2026-07-16): Keep the configuration-printer command label stable in minified builds.
- [@kitschpatrol/repo-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#820---2026-07-16): Preserve readable `copyright-year` and `node-version` command labels in minified builds.
- [@kitschpatrol/stylelint-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#820---2026-07-16): Preserve complete CLI output lines when subprocess streams split them across chunks.

### Documentation

- [@kitschpatrol/cspell-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#820---2026-07-16): Document output formats and running the VS Code tasks.
- [@kitschpatrol/knip-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#820---2026-07-16): Document output formats, VS Code task usage, and task-merging behavior.
- [@kitschpatrol/prettier-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#820---2026-07-16): Document VS Code task usage, diagnostic reporting, and merging tasks into existing projects.
- [@kitschpatrol/shared-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#820---2026-07-16): Document output formats and VS Code task integration.

### Maintenance

- [@kitschpatrol/remark-config 8.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#820---2026-07-16): See the package changelog.

## [8.1.0] - 2026-07-10

### Changed

- **Breaking:** Enable exact optional properties, checked indexed access, explicit overrides and returns, and verbatim module syntax in the shared TypeScript configuration.
- Enforce separate type imports and exports, and allow deeply nested function calls.
- [@kitschpatrol/eslint-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#810---2026-07-10): Require top-level type import/export statements.
- [@kitschpatrol/eslint-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#810---2026-07-10): Disable the nested-call-depth rule.
- **Breaking:** [@kitschpatrol/typescript-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#810---2026-07-10): Enable `exactOptionalPropertyTypes`, `noImplicitOverride`, `noImplicitReturns`, `noUncheckedIndexedAccess`, and `verbatimModuleSyntax` in the base configuration.

### Documentation

- Update agent guidance for current compiler and lint defaults, and explain the preset-generation formatting workaround.
- [@kitschpatrol/repo-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#810---2026-07-10): Update the bundled agent guide for current ESLint, TypeScript, and code-style conventions.

### Maintenance

- Refresh dependencies and workflow pins, and stabilize formatting of generated ESLint rule declarations.
- [@kitschpatrol/cspell-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#810---2026-07-10): Update Prettier and adapt source/type exports to stricter TypeScript checks.
- [@kitschpatrol/knip-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#810---2026-07-10): Update Knip to 6.25.0 and refresh Prettier.
- [@kitschpatrol/mdat-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#810---2026-07-10): Update the bundled Prettier dependency to 3.9.5.
- [@kitschpatrol/prettier-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#810---2026-07-10): Update Prettier to 3.9.5 and adjust internal plugin-resolution typing for stricter TypeScript checks.
- [@kitschpatrol/remark-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#810---2026-07-10): Update the Prettier runtime dependency to 3.9.5.
- [@kitschpatrol/repo-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#810---2026-07-10): Refresh starter GitHub Actions pins and align internal code with stricter TypeScript checks.
- [@kitschpatrol/shared-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#810---2026-07-10): Update Prettier and align internal code with stricter TypeScript checks.
- [@kitschpatrol/stylelint-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#810---2026-07-10): Update the Prettier runtime dependency to `^3.9.5`.
- [@kitschpatrol/typescript-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#810---2026-07-10): Update the bundled Prettier dependency.

### Fixed

- [@kitschpatrol/eslint-config 8.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#810---2026-07-10): Avoid crashes when the fixing API receives no ESLint result for a file.

## [8.0.0] - 2026-07-07

### Added

- Add `ksc-cspell fix` to remove unused configuration words, deduplicate them, and sort the words array.
- Enable recommended defensive and accessible CSS checks through `stylelint-plugin-defensive-css`.
- [@kitschpatrol/cspell-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#800---2026-07-07): Add `ksc-cspell fix` to remove unused local words, deduplicate entries, and sort configuration word lists across supported configuration formats.
- [@kitschpatrol/stylelint-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#800---2026-07-07): Enable the recommended defensive CSS preset, with exceptions for intentional text-selection restrictions, simple grids, and scoped element selectors.

### Changed

- **Breaking:** Raise the suite's Node.js requirement to `^24.16.0 || >=26.3.0`.
- **Breaking:** Require TypeScript 6 and target ES2025 in the shared compiler configuration.
- **Breaking:** Migrate to ESLint 10 and React ESLint plugin 5, including consolidated React rule names under the `react` namespace.
- **Breaking:** [@kitschpatrol/cspell-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#800---2026-07-07): Drop Node.js 22 support; require `^24.15.0 || >=26.0.0`.
- [@kitschpatrol/cspell-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#800---2026-07-07): Expand ESLint and technical dictionaries.
- **Breaking:** [@kitschpatrol/eslint-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#800---2026-07-07): Require Node.js `^24.16.0 || >=26.3.0`.
- **Breaking:** [@kitschpatrol/eslint-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#800---2026-07-07): Migrate to ESLint 10 with updated XO, Astro, and Unicorn defaults, including renamed Unicorn rules.
- **Breaking:** [@kitschpatrol/eslint-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#800---2026-07-07): Adopt eslint-react 5's unified `react/*` rule namespace and updated React checks.
- **Breaking:** [@kitschpatrol/knip-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#800---2026-07-07): Require Node.js `^24.16.0 || >=26.3.0`, dropping Node.js 22 support.
- **Breaking:** [@kitschpatrol/mdat-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#800---2026-07-07): Require Node.js `^24.16.0 || >=26.3.0`.
- **Breaking:** [@kitschpatrol/prettier-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#800---2026-07-07): Require Node.js `^24.16.0 || >=26.3.0`, dropping support for earlier Node releases.
- **Breaking:** [@kitschpatrol/remark-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#800---2026-07-07): Require Node.js `^24.16.0 || >=26.3.0`, dropping support for earlier Node releases.
- **Breaking:** [@kitschpatrol/repo-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#800---2026-07-07): Require Node.js `^24.16.0 || >=26.3.0`, dropping Node.js 22 support.
- **Breaking:** [@kitschpatrol/shared-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#800---2026-07-07): Require Node.js versions matching `^24.16.0 || >=26.3.0`.
- **Breaking:** [@kitschpatrol/stylelint-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#800---2026-07-07): Require Node.js `^24.16.0 || >=26.3.0`.
- **Breaking:** [@kitschpatrol/typescript-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#800---2026-07-07): Require TypeScript 6.
- **Breaking:** [@kitschpatrol/typescript-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#800---2026-07-07): Require Node.js `^24.16.0 || >=26.3.0`.
- **Breaking:** [@kitschpatrol/typescript-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#800---2026-07-07): Target ES2025 and use ES2025/DOM libraries, removing DOM.Iterable from the shared defaults.

### Fixed

- Lint source files in arbitrary `bin` directories instead of globally excluding them.
- Disable complete-document HTML requirements for fragments inside Markdown and MDX code fences.

### Documentation

- [@kitschpatrol/shared-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#800---2026-07-07): Update the documented Node.js requirement.
- [@kitschpatrol/stylelint-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#800---2026-07-07): Document the defensive CSS preset among the included rule sets.

### Maintenance

- [@kitschpatrol/knip-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#800---2026-07-07): Refresh runtime dependencies, including Knip 6.23.0, Cosmiconfig, Prettier, and fs-extra, and modernize shared CLI internals.
- [@kitschpatrol/mdat-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#800---2026-07-07): Refresh Prettier, filesystem, and configuration-loading dependencies.
- [@kitschpatrol/prettier-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#800---2026-07-07): Upgrade Prettier to 3.9.4 and refresh configuration-loading and filesystem dependencies.
- [@kitschpatrol/remark-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#800---2026-07-07): Refresh Prettier, Cosmiconfig, and filesystem runtime dependencies.
- [@kitschpatrol/repo-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#800---2026-07-07): Refresh runtime dependencies and tighten internal typing in Node-version analysis.
- [@kitschpatrol/shared-config 8.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#800---2026-07-07): Refresh runtime dependencies, including Prettier, Stylelint, and CSpell configuration-editing utilities.

## [7.6.4] - 2026-06-11

### Added

- Expand CSpell dictionaries with additional names, brands, acronyms, and technical vocabulary.

### Documentation

- Explain how explicit workspace definitions resolve MDAT's `No readme found` errors in repositories containing fixture package manifests.
- [@kitschpatrol/mdat-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#764---2026-06-11): Explain how an explicit pnpm workspace definition avoids spurious `No readme found` errors in repositories with fixture packages.

### Maintenance

- Refresh dependencies, including sort-package-json 4, and update dependency release-age exceptions.
- [@kitschpatrol/cspell-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#764---2026-06-11): Update CSpell and its libraries to 10.0.1 and refresh build/test dependencies.
- [@kitschpatrol/eslint-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#764---2026-06-11): Refresh TypeScript, MDX, Svelte, JSDoc, package.json, import resolution, and sorting dependencies.
- [@kitschpatrol/knip-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#764---2026-06-11): Update Knip to 6.15.0.
- [@kitschpatrol/mdat-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#764---2026-06-11): Update MDAT to 2.3.6.
- [@kitschpatrol/prettier-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#764---2026-06-11): Update the Astro formatter fork and upgrade `sort-package-json` to version 4.
- [@kitschpatrol/remark-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#764---2026-06-11): See the package changelog.
- [@kitschpatrol/repo-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#764---2026-06-11): Update the SemVer runtime dependency.
- [@kitschpatrol/shared-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#764---2026-06-11): Refresh CSpell, mdat, and semver dependencies and package metadata.
- [@kitschpatrol/stylelint-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#764---2026-06-11): See the package changelog.
- [@kitschpatrol/typescript-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#764---2026-06-11): See the package changelog.

### Changed

- [@kitschpatrol/cspell-config 7.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#764---2026-06-11): Expand the custom dictionaries with additional tools, file types, names, brands, and acronyms.

## [7.6.3] - 2026-06-05

### Changed

- **Breaking:** Restrict CSpell's Node.js support to `^22.22.2 || ^24.15.0 || >=26.0.0`.
- **Breaking:** [@kitschpatrol/cspell-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#763---2026-06-05): Set supported Node.js versions to `^22.22.2 || ^24.15.0 || >=26.0.0`.

### Maintenance

- Refresh dependencies and remove the fflate workaround after updating the package-type checker.
- [@kitschpatrol/cspell-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#763---2026-06-05): Refresh build/test tooling and update package-type validation to resolve its fflate compatibility issue.
- [@kitschpatrol/eslint-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#763---2026-06-05): Refresh linting dependencies and package-validation tooling.
- [@kitschpatrol/knip-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#763---2026-06-05): Update Knip to 6.14.2.
- [@kitschpatrol/knip-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#763---2026-06-05): Update package-type validation tooling and remove the fflate compatibility pin.
- [@kitschpatrol/mdat-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#763---2026-06-05): See the package changelog.
- [@kitschpatrol/prettier-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#763---2026-06-05): Update `prettier-plugin-jsdoc` to 1.8.1.
- [@kitschpatrol/prettier-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#763---2026-06-05): Refresh build and package-validation tooling, resolving the Are the Types Wrong/fflate tooling issue and removing its dependency override.
- [@kitschpatrol/remark-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#763---2026-06-05): See the package changelog.
- [@kitschpatrol/repo-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#763---2026-06-05): Update the pnpm lockfile reader and SemVer runtime dependencies.
- [@kitschpatrol/shared-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#763---2026-06-05): Update Stylelint, semver, and pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#763---2026-06-05): Update Stylelint to `^17.12.0` and upgrade `stylelint-config-clean-order` to version 10.
- [@kitschpatrol/stylelint-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#763---2026-06-05): Refresh package-validation tooling to resolve the attw/fflate build compatibility issue.
- [@kitschpatrol/typescript-config 7.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#763---2026-06-05): See the package changelog.

## [7.6.2] - 2026-05-18

### Fixed

- Update MDAT to restore license and badge expansion.
- [@kitschpatrol/mdat-config 7.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#762---2026-05-18): Update MDAT to 2.3.5 to fix license and badge expansion regressions.
- [@kitschpatrol/shared-config 7.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#762---2026-05-18): Update mdat to fix license and badge expansion regressions.

### Maintenance

- [@kitschpatrol/cspell-config 7.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#762---2026-05-18): See the package changelog.
- [@kitschpatrol/eslint-config 7.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#762---2026-05-18): See the package changelog.
- [@kitschpatrol/knip-config 7.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#762---2026-05-18): See the package changelog.
- [@kitschpatrol/prettier-config 7.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#762---2026-05-18): See the package changelog.
- [@kitschpatrol/remark-config 7.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#762---2026-05-18): See the package changelog.
- [@kitschpatrol/repo-config 7.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#762---2026-05-18): See the package changelog.
- [@kitschpatrol/stylelint-config 7.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#762---2026-05-18): See the package changelog.
- [@kitschpatrol/typescript-config 7.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#762---2026-05-18): See the package changelog.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Standardize package Node.js requirements on `^22.22.2 || >=24.0.0`.
- Validate additional package.json fields, including browser, libc, gypfile, and peer-dependency metadata.
- **Breaking:** [@kitschpatrol/cspell-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#761---2026-05-17): Raise the supported Node.js 22 minimum to 22.22.2 while retaining Node.js 24 and newer.
- [@kitschpatrol/cspell-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#761---2026-05-17): Recognize `fflate`, `gypfile`, and `libc`.
- **Breaking:** [@kitschpatrol/eslint-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#761---2026-05-17): Require Node.js `^22.22.2 || >=24.0.0`.
- [@kitschpatrol/eslint-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#761---2026-05-17): Adopt eslint-plugin-package-json 1 and its expanded package metadata checks.
- **Breaking:** [@kitschpatrol/knip-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#761---2026-05-17): Require Node.js `^22.22.2 || >=24.0.0`.
- **Breaking:** [@kitschpatrol/mdat-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#761---2026-05-17): Change supported Node.js versions to `^22.22.2 || >=24.0.0`.
- **Breaking:** [@kitschpatrol/prettier-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#761---2026-05-17): Require Node.js `^22.22.2 || >=24.0.0`, raising the minimum supported Node 22 version.
- **Breaking:** [@kitschpatrol/remark-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#761---2026-05-17): Require Node.js `^22.22.2 || >=24.0.0`, raising the Node 22 minimum and dropping Node 23 support.
- **Breaking:** [@kitschpatrol/repo-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#761---2026-05-17): Set supported Node.js versions to `^22.22.2 || >=24.0.0`.
- [@kitschpatrol/repo-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#761---2026-05-17): Allow the unrs-resolver dependency build script in starter pnpm settings.
- **Breaking:** [@kitschpatrol/shared-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#761---2026-05-17): Change supported Node.js versions to `^22.22.2 || >=24.0.0`.
- **Breaking:** [@kitschpatrol/stylelint-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#761---2026-05-17): Set supported Node.js versions to `^22.22.2 || >=24.0.0`.
- **Breaking:** [@kitschpatrol/typescript-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#761---2026-05-17): Set supported Node.js versions to `^22.22.2 || >=24.0.0`.

### Maintenance

- Refresh dependencies, use `pnpm ci` in workflows, and update starter build approvals.
- [@kitschpatrol/eslint-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#761---2026-05-17): Update linting and Svelte development dependencies.
- [@kitschpatrol/knip-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#761---2026-05-17): Update Knip to 6.14.1.
- [@kitschpatrol/mdat-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#761---2026-05-17): Update MDAT to 2.3.4.
- [@kitschpatrol/repo-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#761---2026-05-17): Update the lockfile reader and use `pnpm ci` in the starter CI workflow.
- [@kitschpatrol/shared-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#761---2026-05-17): Update mdat, Stylelint, and pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#761---2026-05-17): Update the Stylelint runtime dependency to `^17.11.1`.

### Documentation

- [@kitschpatrol/shared-config 7.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#761---2026-05-17): Update the documented Node.js requirement.

## [7.6.0] - 2026-05-14

### Changed

- **Breaking:** Restrict CSpell, ESLint, and Prettier packages to Node.js `^22.18.0 || >=24.0.0`, dropping Node.js 23 support.
- **Breaking:** [@kitschpatrol/cspell-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#760---2026-05-14): Restrict supported Node.js versions to `^22.18.0 || >=24.0.0`.
- **Breaking:** [@kitschpatrol/eslint-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#760---2026-05-14): Restrict Node.js support to `^22.18.0 || >=24.0.0`.
- **Breaking:** [@kitschpatrol/prettier-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#760---2026-05-14): Change supported Node.js versions to `^22.18.0 || >=24.0.0`.
- [@kitschpatrol/repo-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#760---2026-05-14): Migrate starter workspace build permissions to pnpm 11's `allowBuilds`, including esbuild and oxc-resolver.

### Documentation

- Update installation guidance for pnpm 11 and correct CLI help grammar.
- [@kitschpatrol/shared-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#760---2026-05-14): Recommend pnpm 11, correct CLI help grammar, and add Vite+ to related projects.

### Maintenance

- Migrate repository and starter settings to pnpm 11's `allowBuilds`, refresh dependencies and actions, and repair release-token propagation.
- [@kitschpatrol/cspell-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#760---2026-05-14): Update filesystem utilities.
- [@kitschpatrol/eslint-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#760---2026-05-14): Refresh linting dependencies, including eslint-plugin-n 18, and regenerate presets.
- [@kitschpatrol/knip-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#760---2026-05-14): Update Knip to 6.13.1 and refresh fs-extra.
- [@kitschpatrol/mdat-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#760---2026-05-14): Refresh dependencies and migrate contributor/CI tooling to pnpm 11.
- [@kitschpatrol/mdat-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#760---2026-05-14): Fix npm-token propagation during package publishing.
- [@kitschpatrol/prettier-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#760---2026-05-14): Update filesystem/Svelte dependencies and migrate contributor/CI tooling to pnpm 11.
- [@kitschpatrol/prettier-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#760---2026-05-14): Fix npm-token propagation during package publishing.
- [@kitschpatrol/remark-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#760---2026-05-14): Update `fs-extra` to 11.3.5.
- [@kitschpatrol/repo-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#760---2026-05-14): Refresh runtime dependencies and starter GitHub Actions pins.
- [@kitschpatrol/shared-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#760---2026-05-14): Update Stylelint, fs-extra, semver, and pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#760---2026-05-14): Update Stylelint to `^17.11.0` and refresh filesystem runtime dependencies.
- [@kitschpatrol/typescript-config 7.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#760---2026-05-14): Refresh filesystem runtime dependencies.

## [7.5.3] - 2026-05-03

### Added

- Expand the bundled CSpell dictionaries.

### Fixed

- Preserve JSDoc plugin options in Astro, Svelte, and shell formatting overrides to eliminate unknown-option warnings.
- Update the HTML spacing rule name to match the installed ESLint plugin.
- [@kitschpatrol/eslint-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#753---2026-05-03): Use the renamed HTML spacing rule while retaining the override that delegates spacing to Prettier.
- [@kitschpatrol/prettier-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#753---2026-05-03): Keep the JSDoc plugin in Astro, Svelte, and shell overrides to eliminate unknown-option warnings without suppressing output.

### Maintenance

- Refresh linting, repository, and Markdown tooling dependencies.
- [@kitschpatrol/eslint-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#753---2026-05-03): Refresh e18e, HTML, flat-config, globals, and other linting dependencies.
- [@kitschpatrol/knip-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#753---2026-05-03): Update Knip to 6.11.0.
- [@kitschpatrol/mdat-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#753---2026-05-03): Update MDAT to 2.3.2.
- [@kitschpatrol/repo-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#753---2026-05-03): Update the pnpm lockfile reader dependency.
- [@kitschpatrol/shared-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#753---2026-05-03): Update mdat and pnpm lockfile tooling.

### Changed

- [@kitschpatrol/cspell-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#753---2026-05-03): Recognize `Ango`, `Steph`, and `unlighthouse`.

### Documentation

- [@kitschpatrol/eslint-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#753---2026-05-03): Update the MIT license badge link.
- [@kitschpatrol/knip-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#753---2026-05-03): Correct the MIT license badge link.
- [@kitschpatrol/mdat-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#753---2026-05-03): Update the README's MIT license link.
- [@kitschpatrol/prettier-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#753---2026-05-03): Update the README's MIT license link.
- [@kitschpatrol/remark-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#753---2026-05-03): Correct the README's MIT license link.
- [@kitschpatrol/repo-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#753---2026-05-03): Correct the README's MIT license link.
- [@kitschpatrol/stylelint-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#753---2026-05-03): Correct the MIT license badge link.
- [@kitschpatrol/typescript-config 7.5.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#753---2026-05-03): Correct the MIT license badge link.

## [7.5.2] - 2026-04-28

### Added

- Expand the bundled CSpell dictionaries.

### Fixed

- Restore JSDoc formatting in the Prettier CLI by loading the plugin explicitly alongside other CLI plugins.
- [@kitschpatrol/prettier-config 7.5.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#752---2026-04-28): Explicitly load prettier-plugin-jsdoc in CLI commands so other `--plugin` flags do not disable JSDoc formatting.

### Maintenance

- Refresh ESLint dependencies and generated rule types.
- [@kitschpatrol/eslint-config 7.5.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#752---2026-04-28): Update TypeScript ESLint and package.json linting dependencies.
- [@kitschpatrol/knip-config 7.5.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#752---2026-04-28): See the package changelog.
- [@kitschpatrol/mdat-config 7.5.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#752---2026-04-28): See the package changelog.
- [@kitschpatrol/remark-config 7.5.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#752---2026-04-28): See the package changelog.
- [@kitschpatrol/repo-config 7.5.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#752---2026-04-28): See the package changelog.
- [@kitschpatrol/shared-config 7.5.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#752---2026-04-28): See the package changelog.
- [@kitschpatrol/stylelint-config 7.5.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#752---2026-04-28): See the package changelog.
- [@kitschpatrol/typescript-config 7.5.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#752---2026-04-28): See the package changelog.

### Changed

- [@kitschpatrol/cspell-config 7.5.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#752---2026-04-28): Recognize `Arjun`, `Ashuk`, and `oembed`.

## [7.5.1] - 2026-04-27

### Added

- Expand CSpell coverage for technical terms, acronyms, and file extensions.

### Changed

- Require a blank line after block-like statements through the Stylistic ESLint plugin.
- [@kitschpatrol/cspell-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#751---2026-04-27): Expand acronym, ESLint, file-extension, and technical dictionaries.
- [@kitschpatrol/eslint-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#751---2026-04-27): Require a blank line after block-like statements through the Stylistic plugin.

### Maintenance

- Refresh linting, formatting, and CLI documentation dependencies.
- [@kitschpatrol/eslint-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#751---2026-04-27): Add the Stylistic dependency and update the Svelte development dependency.
- [@kitschpatrol/knip-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#751---2026-04-27): Update Knip to 6.7.0.
- [@kitschpatrol/mdat-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#751---2026-04-27): See the package changelog.
- [@kitschpatrol/prettier-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#751---2026-04-27): Update the Tailwind formatting plugin to 0.8.0.
- [@kitschpatrol/remark-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#751---2026-04-27): See the package changelog.
- [@kitschpatrol/repo-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#751---2026-04-27): See the package changelog.
- [@kitschpatrol/shared-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#751---2026-04-27): Update Stylelint and package discovery keywords.
- [@kitschpatrol/stylelint-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#751---2026-04-27): Update the Stylelint runtime dependency to `^17.9.1`.
- [@kitschpatrol/typescript-config 7.5.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#751---2026-04-27): See the package changelog.

## [7.5.0] - 2026-04-22

### Changed

- Require braces around all control-flow bodies through ESLint's `curly` rule.
- [@kitschpatrol/eslint-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#750---2026-04-22): Require braces for all control-flow bodies.

### Fixed

- Keep object members last when sorting Astro intersection types to avoid esbuild parsing failures.
- [@kitschpatrol/eslint-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#750---2026-04-22): Keep object types last in Astro intersections to avoid compiler errors.
- [@kitschpatrol/eslint-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#750---2026-04-22): Allow null values in Stylelint configuration files.

### Maintenance

- Refresh runtime and development dependencies.
- [@kitschpatrol/cspell-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#750---2026-04-22): Update Case Police to 2.2.1 and refresh Prettier.
- [@kitschpatrol/knip-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#750---2026-04-22): Update Knip to 6.6.1 and refresh Prettier.
- [@kitschpatrol/mdat-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#750---2026-04-22): Update MDAT to 2.3.0 and Prettier to 3.8.3.
- [@kitschpatrol/prettier-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#750---2026-04-22): Update Prettier to 3.8.3.
- [@kitschpatrol/remark-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#750---2026-04-22): Update the Prettier runtime dependency to 3.8.3.
- [@kitschpatrol/repo-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#750---2026-04-22): Refresh the pnpm lockfile reader and Prettier runtime dependencies.
- [@kitschpatrol/shared-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#750---2026-04-22): Update mdat, Prettier, Stylelint, and pnpm lockfile tooling.
- [@kitschpatrol/stylelint-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#750---2026-04-22): Update Stylelint to `^17.8.0` and Prettier to `^3.8.3`.
- [@kitschpatrol/typescript-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#750---2026-04-22): Refresh runtime dependencies, including Prettier 3.8.3.

### Documentation

- [@kitschpatrol/knip-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#750---2026-04-22): Link the README's license attribution to the author's website.
- [@kitschpatrol/remark-config 7.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#750---2026-04-22): Link the README's license attribution to the author's website.

## [7.4.1] - 2026-04-13

### Fixed

- Resolve Astro Prettier plugin loading failures by updating to the fork's default-export release.
- Prevent Knip from reporting Astro-related remark dependencies referenced through tsconfig as unused.
- [@kitschpatrol/knip-config 7.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#741---2026-04-13): Ignore `remark-attribute-list` and `remark-directive` dependencies required by certain Astro TypeScript configurations.
- [@kitschpatrol/prettier-config 7.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#741---2026-04-13): Update the Astro plugin fork to restore module resolution through its default export.

### Maintenance

- [@kitschpatrol/cspell-config 7.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#741---2026-04-13): See the package changelog.
- [@kitschpatrol/eslint-config 7.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#741---2026-04-13): Update the TypeScript ESLint parser and plugin.
- [@kitschpatrol/mdat-config 7.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#741---2026-04-13): See the package changelog.
- [@kitschpatrol/remark-config 7.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#741---2026-04-13): See the package changelog.
- [@kitschpatrol/repo-config 7.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#741---2026-04-13): See the package changelog.
- [@kitschpatrol/shared-config 7.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#741---2026-04-13): See the package changelog.
- [@kitschpatrol/stylelint-config 7.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#741---2026-04-13): See the package changelog.
- [@kitschpatrol/typescript-config 7.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#741---2026-04-13): See the package changelog.

## [7.4.0] - 2026-04-13

### Added

- Expand the bundled CSpell dictionaries.

### Changed

- Switch Astro formatting to the `@kitschpatrol/prettier-plugin-astro` fork.
- [@kitschpatrol/cspell-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#740---2026-04-13): Recognize `CCPL`, `unported`, `armadillu`, and `Berne`.
- [@kitschpatrol/prettier-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#740---2026-04-13): Use the @kitschpatrol/prettier-plugin-astro fork for Astro formatting.

### Maintenance

- Refresh dependencies, including pnpm lockfile libraries and tsdown.
- [@kitschpatrol/cspell-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#740---2026-04-13): Update Prettier to 3.8.2.
- [@kitschpatrol/eslint-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#740---2026-04-13): Refresh global definitions, Prettier, Svelte development dependencies, and shared build tooling.
- [@kitschpatrol/knip-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#740---2026-04-13): Update Knip to 6.4.1 and refresh Prettier.
- [@kitschpatrol/mdat-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#740---2026-04-13): Update the bundled Prettier dependency to 3.8.2.
- [@kitschpatrol/prettier-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#740---2026-04-13): Update Prettier to 3.8.2 and refresh build tooling.
- [@kitschpatrol/remark-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#740---2026-04-13): Update the Prettier runtime dependency to 3.8.2.
- [@kitschpatrol/repo-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#740---2026-04-13): Upgrade the pnpm lockfile reader to the 1100 series and update Prettier.
- [@kitschpatrol/shared-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#740---2026-04-13): Update pnpm lockfile tooling, Prettier, and Stylelint.
- [@kitschpatrol/stylelint-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#740---2026-04-13): Update Stylelint to `^17.7.0` and Prettier to `^3.8.2`.
- [@kitschpatrol/typescript-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#740---2026-04-13): Update the Prettier runtime dependency to `^3.8.2`.

### Documentation

- [@kitschpatrol/prettier-config 7.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#740---2026-04-13): Explain the Astro plugin fork and its unmerged upstream fixes.

## [7.3.0] - 2026-04-09

### Added

- Support Markdown attribute lists through `remark-attribute-list`.
- Export shared configuration objects and configuration types from the CSpell, Knip, and remark packages.
- [@kitschpatrol/cspell-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#730---2026-04-09): Export the `CspellConfig` type and named `sharedCspellConfig` preset alongside the existing factory and default export.
- [@kitschpatrol/knip-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#730---2026-04-09): Export `sharedKnipConfig` and the `KnipConfig` type alongside the existing default preset and `knipConfig()` factory.
- [@kitschpatrol/remark-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#730---2026-04-09): Support Markdown attribute-list syntax through `remark-attribute-list`.
- [@kitschpatrol/remark-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#730---2026-04-09): Export the `RemarkConfig` type and named `remarkSharedConfig` preset alongside the existing factory and default export.

### Changed

- Allow TypeScript 6 alongside supported TypeScript 5 releases.
- [@kitschpatrol/repo-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#730---2026-04-09): Update starter ignore rules for the pnpm store and Claude configuration; environment-file patterns now also ignore `.env.example`.
- [@kitschpatrol/typescript-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#730---2026-04-09): Allow TypeScript 6 alongside supported TypeScript 5 releases.

### Maintenance

- Refresh dependencies and starter workflows, support release tags without a `v` prefix, and expand Prettier CLI coverage.
- [@kitschpatrol/cspell-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#730---2026-04-09): Separate configuration definitions from the public entry point and update the TypeScript configuration loader.
- [@kitschpatrol/eslint-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#730---2026-04-09): Update Vitest linting and TypeScript configuration loading dependencies and simplify the publish build command.
- [@kitschpatrol/knip-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#730---2026-04-09): Update Knip to 6.3.1 and refresh the Cosmiconfig TypeScript loader.
- [@kitschpatrol/mdat-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#730---2026-04-09): Update the TypeScript configuration loader and refresh package release scripts.
- [@kitschpatrol/prettier-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#730---2026-04-09): Add CLI integration coverage for file/glob targeting, multiple arguments, and default-directory behavior.
- [@kitschpatrol/prettier-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#730---2026-04-09): Update the TypeScript configuration loader and package release scripts.
- [@kitschpatrol/remark-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#730---2026-04-09): Separate configuration implementation from the package entry point and update the Cosmiconfig TypeScript loader to 6.3.
- [@kitschpatrol/repo-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#730---2026-04-09): Support release tags with or without a `v` prefix and simplify metadata workflow checkout.
- [@kitschpatrol/repo-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#730---2026-04-09): Update the TypeScript configuration loader dependency.
- [@kitschpatrol/shared-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#730---2026-04-09): Update the TypeScript configuration loader and simplify package build scripts.
- [@kitschpatrol/stylelint-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#730---2026-04-09): Update the TypeScript configuration loader to version 6.3.
- [@kitschpatrol/typescript-config 7.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#730---2026-04-09): Update the TypeScript configuration loader to version 6.3.

## [7.2.0] - 2026-04-08

### Added

- Export `fix`, `fixFile`, and `clearCache` APIs from shared-config and the ESLint, Prettier, MDAT, and Stylelint packages.
- [@kitschpatrol/eslint-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#720---2026-04-08): Export `fix()`, `fixFile()`, `clearCache()`, and `FileType` for programmatic fixes with shared configuration, file-type hints, and per-call options.
- [@kitschpatrol/mdat-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#720---2026-04-08): Export `fix`, `fixFile`, and `clearCache` for expanding Markdown strings and files with shared rules and per-call overrides.
- [@kitschpatrol/mdat-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#720---2026-04-08): Export the shared configuration as `sharedMdatConfig` and expose the `MdatConfig` type.
- [@kitschpatrol/prettier-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#720---2026-04-08): Export `fix`, `fixFile`, and `clearCache` for formatting strings/files with parser inference, project configuration, and per-call overrides.
- [@kitschpatrol/prettier-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#720---2026-04-08): Export `FileType`, `PrettierConfig`, and `sharedPrettierConfig` for programmatic use.
- [@kitschpatrol/shared-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#720---2026-04-08): Export typed `fix`, `fixFile`, `clearCache`, and `FileType` APIs for the Mdat → ESLint → Stylelint → Prettier pipeline.
- [@kitschpatrol/stylelint-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#720---2026-04-08): Export `fix`, `fixFile`, and `clearCache` APIs with syntax hints and configuration overrides, plus `sharedStylelintConfig`, `FileType`, and `StylelintConfig`.

### Documentation

- Document the programmatic string and file APIs with usage examples.
- [@kitschpatrol/eslint-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#720---2026-04-08): Document the fixing API, configuration options, and instance caching.
- [@kitschpatrol/mdat-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#720---2026-04-08): Add programmatic expansion examples and explain configuration merging and caching.
- [@kitschpatrol/prettier-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#720---2026-04-08): Add API examples and clarify that Ruby installations other than rbenv are supported.
- [@kitschpatrol/shared-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#720---2026-04-08): Add API usage examples for formatting strings and files and clearing cached tool instances.
- [@kitschpatrol/stylelint-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#720---2026-04-08): Add examples for programmatic CSS fixing, per-call overrides, syntax selection, and cache clearing.

### Maintenance

- Upgrade to CSpell 10, refresh dependencies, and add API tests with longer CI timeouts.
- [@kitschpatrol/cspell-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#720---2026-04-08): Upgrade CSpell and its libraries to 10.0.0.
- [@kitschpatrol/eslint-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#720---2026-04-08): Add API regression tests and refresh TypeScript, Astro, and Svelte development dependencies.
- [@kitschpatrol/knip-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#720---2026-04-08): See the package changelog.
- [@kitschpatrol/remark-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#720---2026-04-08): See the package changelog.
- [@kitschpatrol/repo-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#720---2026-04-08): See the package changelog.
- [@kitschpatrol/shared-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#720---2026-04-08): Add API tests and library declaration builds, and update dependencies including CSpell 10.
- [@kitschpatrol/stylelint-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#720---2026-04-08): Add regression tests for the programmatic fixing API.
- [@kitschpatrol/typescript-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#720---2026-04-08): See the package changelog.

### Changed

- [@kitschpatrol/cspell-config 7.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#720---2026-04-08): Recognize `cjsx`, `ctsx`, `mjsx`, and `mtsx` file-extension terminology.

## [7.1.0] - 2026-04-05

### Added

- Add `--skip` to aggregate ksc commands, accepting comma-separated or repeated tool names with or without the `ksc-` prefix.
- [@kitschpatrol/shared-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#710---2026-04-05): Add `--skip` to aggregate commands, accepting tool names with or without `ksc-` prefixes and comma-separated or repeated values.

### Maintenance

- Refresh CSpell, ESLint, and shared CLI dependencies.
- [@kitschpatrol/cspell-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#710---2026-04-05): Update CSpell and its libraries to 9.8.0.
- [@kitschpatrol/eslint-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#710---2026-04-05): Update HTML linting and parsing dependencies.
- [@kitschpatrol/knip-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#710---2026-04-05): See the package changelog.
- [@kitschpatrol/mdat-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#710---2026-04-05): See the package changelog.
- [@kitschpatrol/prettier-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#710---2026-04-05): See the package changelog.
- [@kitschpatrol/remark-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#710---2026-04-05): See the package changelog.
- [@kitschpatrol/repo-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#710---2026-04-05): See the package changelog.
- [@kitschpatrol/shared-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#710---2026-04-05): Update CSpell dependencies.
- [@kitschpatrol/stylelint-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#710---2026-04-05): See the package changelog.
- [@kitschpatrol/typescript-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#710---2026-04-05): See the package changelog.

### Documentation

- [@kitschpatrol/shared-config 7.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#710---2026-04-05): Document the `--skip` option for each aggregate subcommand.

## [7.0.2] - 2026-04-04

### Maintenance

- Strip MDAT placeholders from the copied root readme during builds to keep CI checks stable.
- Update MDAT, Knip, and related dependencies.
- [@kitschpatrol/cspell-config 7.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#702---2026-04-04): See the package changelog.
- [@kitschpatrol/eslint-config 7.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#702---2026-04-04): See the package changelog.
- [@kitschpatrol/knip-config 7.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#702---2026-04-04): Update Knip to 6.3.0.
- [@kitschpatrol/mdat-config 7.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#702---2026-04-04): Update MDAT to 2.2.0 and adjust documentation-generation tooling for CI.
- [@kitschpatrol/prettier-config 7.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#702---2026-04-04): See the package changelog.
- [@kitschpatrol/remark-config 7.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#702---2026-04-04): See the package changelog.
- [@kitschpatrol/repo-config 7.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#702---2026-04-04): See the package changelog.
- [@kitschpatrol/shared-config 7.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#702---2026-04-04): Update mdat to 2.2.
- [@kitschpatrol/stylelint-config 7.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#702---2026-04-04): See the package changelog.
- [@kitschpatrol/typescript-config 7.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#702---2026-04-04): See the package changelog.

## [7.0.1] - 2026-04-03

### Documentation

- Correct the root readme's package identity and badges.

### Maintenance

- Ship a `.gitattributes` template enforcing LF line endings.
- Repair readme generation during builds and refresh ESLint, MDAT, and build dependencies.
- [@kitschpatrol/eslint-config 7.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#701---2026-04-03): Update the Svelte linting dependency.
- [@kitschpatrol/knip-config 7.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#701---2026-04-03): See the package changelog.
- [@kitschpatrol/mdat-config 7.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#701---2026-04-03): Update MDAT to 2.0.1.
- [@kitschpatrol/prettier-config 7.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#701---2026-04-03): See the package changelog.
- [@kitschpatrol/remark-config 7.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#701---2026-04-03): See the package changelog.
- [@kitschpatrol/shared-config 7.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#701---2026-04-03): Simplify badge generation to repair the documentation build and update mdat.
- [@kitschpatrol/stylelint-config 7.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#701---2026-04-03): See the package changelog.
- [@kitschpatrol/typescript-config 7.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#701---2026-04-03): See the package changelog.

### Added

- [@kitschpatrol/repo-config 7.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#701---2026-04-03): Ship a `.gitattributes` starter that enforces LF line endings across platforms.

### Changed

- [@kitschpatrol/cspell-config 7.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#701---2026-04-03): Recognize `cinderblock`, `pbxproj`, and `publiccode`.

## [7.0.0] - 2026-04-02

### Added

- Enable mathematical correctness rules and selected e18e modernization rules in ESLint.
- [@kitschpatrol/eslint-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#700---2026-04-02): Enable recommended mathematical simplification rules and selected e18e modernization rules.
- [@kitschpatrol/prettier-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#700---2026-04-02): Format JSDoc comments and examples with prettier-plugin-jsdoc and shared JSDoc options.

### Changed

- **Breaking:** Require Node.js 22.18.0 or later throughout the suite.
- **Breaking:** Migrate to MDAT 2, with expansion rules declared directly in the configuration object.
- Format JSDoc comments and examples with `prettier-plugin-jsdoc`.
- **Breaking:** [@kitschpatrol/cspell-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#700---2026-04-02): Require Node.js 22.18.0 or newer, dropping Node.js 20 support.
- [@kitschpatrol/cspell-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#700---2026-04-02): Recognize `canparse` in the technical dictionary.
- **Breaking:** [@kitschpatrol/eslint-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#700---2026-04-02): Require Node.js 22.18.0 or later.
- **Breaking:** [@kitschpatrol/knip-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#700---2026-04-02): Require Node.js 22.18.0 or newer, replacing the separate contributor-runtime requirement.
- **Breaking:** [@kitschpatrol/mdat-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#700---2026-04-02): Adopt MDAT 2's flat configuration: pass rules directly to `mdatConfig` instead of nesting them under `rules`.
- **Breaking:** [@kitschpatrol/mdat-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#700---2026-04-02): Require Node.js 22.18.0 or later.
- [@kitschpatrol/mdat-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#700---2026-04-02): Run MDAT's `check` and `expand` commands directly with formatting enabled.
- **Breaking:** [@kitschpatrol/prettier-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#700---2026-04-02): Require Node.js 22.18.0 or later.
- **Breaking:** [@kitschpatrol/remark-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#700---2026-04-02): Require Node.js 22.18+, replacing the previous Node.js 20 runtime support.
- **Breaking:** [@kitschpatrol/repo-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#700---2026-04-02): Require Node.js 22.18.0 or newer.
- **Breaking:** [@kitschpatrol/shared-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#700---2026-04-02): Require Node.js 22.18.0 or later.
- **Breaking:** [@kitschpatrol/stylelint-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#700---2026-04-02): Require Node.js 22.18 or newer, dropping Node.js 20 support.
- **Breaking:** [@kitschpatrol/typescript-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#700---2026-04-02): Require Node.js 22.18 or newer, dropping Node.js 20 support.

### Removed

- **Breaking:** Temporarily disable Tailwind CSS class sorting because of JSDoc plugin compatibility issues.
- **Breaking:** [@kitschpatrol/prettier-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#700---2026-04-02): Disable built-in Tailwind CSS class sorting while its plugin conflicts with JSDoc formatting.
- [@kitschpatrol/repo-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#700---2026-04-02): Stop shipping the starter `.npmrc` authentication configuration.

### Documentation

- Replace placeholder CLI help descriptions and update usage guidance for MDAT 2.
- [@kitschpatrol/cspell-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#700---2026-04-02): Replace placeholder `--location` help with an explanation of where configuration is stored.
- [@kitschpatrol/knip-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#700---2026-04-02): Replace placeholder `init --location` help with an explanation of configuration storage.
- [@kitschpatrol/remark-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#700---2026-04-02): Replace the placeholder `--location` help text with an explanation of configuration storage, and improve factory API examples.
- [@kitschpatrol/repo-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#700---2026-04-02): Update the starter-file overview for the removed `.npmrc` and added CI workflow.
- [@kitschpatrol/shared-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#700---2026-04-02): Replace placeholder CLI help for configuration locations and print-config arguments.
- [@kitschpatrol/stylelint-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#700---2026-04-02): Replace placeholder descriptions for `init --location` and `print-config` file arguments in CLI help.

### Maintenance

- Add cross-platform CI to the repository and starter templates, and stop distributing the npm authentication configuration.
- [@kitschpatrol/shared-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#700---2026-04-02): Upgrade mdat to 2.0 and migrate README generation directives.

### Fixed

- [@kitschpatrol/eslint-config 7.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#700---2026-04-02): Disable JSDoc tag spacing checks that conflict with Prettier's JSDoc formatting.

## [6.2.0] - 2026-04-01

### Changed

- Distinguish imports with different query strings and enable additional recommended Unicorn rules.
- [@kitschpatrol/cspell-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#620---2026-04-01): Recognize `farmfe` in the technical dictionary.
- [@kitschpatrol/eslint-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#620---2026-04-01): Refresh Unicorn recommended rules.
- [@kitschpatrol/repo-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#620---2026-04-01): Nest Git attribute files beneath `package.json` in VS Code.

### Fixed

- Normalize Windows workspace paths to prevent Knip's workspace-directory errors.
- [@kitschpatrol/eslint-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#620---2026-04-01): Treat imports with different query strings as distinct in duplicate-import checks.
- [@kitschpatrol/knip-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#620---2026-04-01): Normalize Windows workspace paths and pass POSIX workspace names to Knip to prevent workspace-directory errors.
- [@kitschpatrol/mdat-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#620---2026-04-01): Normalize Windows workspace paths when discovering packages and the workspace root.
- [@kitschpatrol/prettier-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#620---2026-04-01): Normalize Windows workspace-root paths used to locate project ignore files.
- [@kitschpatrol/repo-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#620---2026-04-01): Avoid adding a development Node requirement when `engines.node` is absent.
- [@kitschpatrol/repo-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#620---2026-04-01): Normalize workspace paths on Windows for repository-wide package discovery.
- [@kitschpatrol/shared-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#620---2026-04-01): Normalize workspace paths on Windows before resolving package directories.
- [@kitschpatrol/stylelint-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#620---2026-04-01): Normalize Windows workspace paths when resolving package directories and project roots.

### Maintenance

- Refresh dependencies and harden GitHub workflows with pinned checkout actions, explicit permissions, and safer variable handling.
- [@kitschpatrol/cspell-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#620---2026-04-01): Update dictionary-harvesting dependencies.
- [@kitschpatrol/eslint-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#620---2026-04-01): Refresh TypeScript, Vitest, JSDoc, package.json, Unicorn, and development dependencies.
- [@kitschpatrol/knip-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#620---2026-04-01): Update Knip to 6.2.0.
- [@kitschpatrol/mdat-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#620---2026-04-01): Update MDAT to 1.4.2.
- [@kitschpatrol/prettier-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#620---2026-04-01): Update the PHP formatting plugin.
- [@kitschpatrol/remark-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#620---2026-04-01): See the package changelog.
- [@kitschpatrol/shared-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#620---2026-04-01): Update globby, mdat, and Stylelint.
- [@kitschpatrol/stylelint-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#620---2026-04-01): Update the Stylelint runtime dependency to `^17.6.0`.
- [@kitschpatrol/typescript-config 6.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#620---2026-04-01): See the package changelog.

## [6.1.0] - 2026-03-24

### Changed

- Exclude agent configuration folders and skill lockfiles from linting and spell checking defaults.
- [@kitschpatrol/cspell-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#610---2026-03-24): Exclude agent configuration directories and npm/skills lockfiles from spell checking.
- [@kitschpatrol/cspell-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#610---2026-03-24): Recognize additional acronyms and `metascope`.
- [@kitschpatrol/eslint-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#610---2026-03-24): Ignore `.agents`, `.claude`, and `skills-lock.json` by default and refresh package.json validation rules.
- [@kitschpatrol/prettier-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#610---2026-03-24): Exclude `skills-lock.json` in the starter ignore file.
- [@kitschpatrol/repo-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#610---2026-03-24): Nest `skills-lock.json` beneath `package.json` in VS Code.
- [@kitschpatrol/typescript-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#610---2026-03-24): Update starter VS Code settings to the `js/ts.tsdk.path` and `js/ts.tsdk.promptToUseWorkspaceVersion` keys.

### Fixed

- Respect an existing higher `engines.node` minimum when deciding whether `devEngines.runtime` is necessary.
- [@kitschpatrol/eslint-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#610---2026-03-24): Update initialized VS Code settings to the current workspace TypeScript SDK keys.
- [@kitschpatrol/repo-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#610---2026-03-24): Avoid redundant development Node requirements when an existing `engines.node` already specifies a higher minimum.

### Documentation

- Provide Claude Code guidance for ksc conventions and explain shared Prettier plugin hoisting.
- [@kitschpatrol/prettier-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#610---2026-03-24): Explain shared plugin configuration and pnpm dependency hoisting.
- [@kitschpatrol/repo-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#610---2026-03-24): Ship a Claude Code guide covering shared-config conventions, configuration, and lint workflows.

### Maintenance

- Refresh dependencies, including Knip 6, and update editor settings and GitHub metadata automation.
- [@kitschpatrol/eslint-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#610---2026-03-24): Refresh linting dependencies and simplify flat-config typings.
- [@kitschpatrol/knip-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#610---2026-03-24): Upgrade the Knip runtime dependency from version 5 to 6.0.4.
- [@kitschpatrol/mdat-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#610---2026-03-24): See the package changelog.
- [@kitschpatrol/remark-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#610---2026-03-24): See the package changelog.
- [@kitschpatrol/shared-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#610---2026-03-24): Update pnpm lockfile tooling and Stylelint dependencies.
- [@kitschpatrol/stylelint-config 6.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#610---2026-03-24): Update the Stylelint runtime dependency to `^17.5.0`.

## [6.0.3] - 2026-03-08

### Fixed

- Base `engines.node` checks on production dependencies and preserve manually raised development Node.js requirements.
- Preserve license boilerplate dates and exclude test fixtures when updating copyright years.
- [@kitschpatrol/repo-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#603---2026-03-08): Base `engines.node` on production dependencies and preserve intentionally higher development Node requirements.
- [@kitschpatrol/repo-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#603---2026-03-08): Exclude standard license boilerplate dates and test fixtures from copyright-year updates.

### Maintenance

- Refresh dependencies, declare the build tooling's Node.js requirement through `devEngines`, and remove the deprecated npm publish-branch setting.
- [@kitschpatrol/cspell-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#603---2026-03-08): Refresh configuration/filesystem dependencies and build tooling, and require Node.js 22.18 or newer for development.
- [@kitschpatrol/eslint-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#603---2026-03-08): Refresh linting dependencies and declare the newer Node.js requirement for development tooling separately from consumer engines.
- [@kitschpatrol/knip-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#603---2026-03-08): Refresh runtime dependencies, including Knip 5.86.0, Cosmiconfig, and fs-extra.
- [@kitschpatrol/knip-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#603---2026-03-08): Declare Node.js 22.18+ as the contributor runtime required by the updated tsdown build tooling.
- [@kitschpatrol/mdat-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#603---2026-03-08): Update MDAT and configuration-loading dependencies, and declare Node.js 22.18.0 or later for contributor builds.
- [@kitschpatrol/prettier-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#603---2026-03-08): Refresh formatting/configuration-loading dependencies and declare Node.js 22.18.0 or later for contributor builds.
- [@kitschpatrol/remark-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#603---2026-03-08): Refresh Cosmiconfig and filesystem runtime dependencies.
- [@kitschpatrol/remark-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#603---2026-03-08): Declare Node.js 22.18+ for development tooling separately from the package's Node.js 20.19+ runtime requirement.
- [@kitschpatrol/repo-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#603---2026-03-08): Remove deprecated `publish-branch` configuration and refresh runtime dependencies and contributor Node requirements.
- [@kitschpatrol/shared-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#603---2026-03-08): Update cosmiconfig, fs-extra, and mdat, and declare Node.js 22.18 or later for development tooling.
- [@kitschpatrol/stylelint-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#603---2026-03-08): Refresh Cosmiconfig and filesystem runtime dependencies.
- [@kitschpatrol/stylelint-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#603---2026-03-08): Require Node.js 22.18 or newer for contributor build tooling.
- [@kitschpatrol/typescript-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#603---2026-03-08): Refresh Cosmiconfig and filesystem runtime dependencies.
- [@kitschpatrol/typescript-config 6.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#603---2026-03-08): Require Node.js 22.18 or newer for contributor build tooling.

## [6.0.2] - 2026-02-28

### Changed

- Restore checks for unsupported Node.js built-ins and expand CSpell vocabulary.
- [@kitschpatrol/cspell-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#602---2026-02-28): Expand the technical dictionary with additional development and research terminology.
- [@kitschpatrol/eslint-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#602---2026-02-28): Check `fs/promises.glob` against the project's supported Node.js versions instead of exempting it.

### Fixed

- Accept project Node.js engine minimums that exceed dependency requirements.
- [@kitschpatrol/repo-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#602---2026-02-28): Accept explicitly configured Node runtime and development minimums above the dependency requirements.

### Maintenance

- Refresh MDX linting dependencies and update the release-workflow checkout action.
- [@kitschpatrol/eslint-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#602---2026-02-28): Update MDX, package.json linting, and Svelte development dependencies.
- [@kitschpatrol/knip-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#602---2026-02-28): See the package changelog.
- [@kitschpatrol/mdat-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#602---2026-02-28): See the package changelog.
- [@kitschpatrol/prettier-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#602---2026-02-28): See the package changelog.
- [@kitschpatrol/remark-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#602---2026-02-28): See the package changelog.
- [@kitschpatrol/repo-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#602---2026-02-28): Upgrade checkout to v6 in the starter release workflow.
- [@kitschpatrol/shared-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#602---2026-02-28): See the package changelog.
- [@kitschpatrol/stylelint-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#602---2026-02-28): See the package changelog.
- [@kitschpatrol/typescript-config 6.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#602---2026-02-28): See the package changelog.

## [6.0.1] - 2026-02-26

### Changed

- Allow nested test functions, disable conflicting member-ordering checks, and refresh package-metadata lint rules.
- [@kitschpatrol/eslint-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#601---2026-02-26): Refresh package.json and JSON validation rules.
- [@kitschpatrol/eslint-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#601---2026-02-26): Allow nested functions in tests.

### Fixed

- Restore the published Node.js requirement to 20.19.0 and calculate engine requirements separately for workspace packages, including projects with only development dependencies.
- [@kitschpatrol/cspell-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#601---2026-02-26): Restore the declared Node.js 20.19.0 minimum.
- [@kitschpatrol/eslint-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#601---2026-02-26): Restore Node.js 20.19.0 support.
- [@kitschpatrol/knip-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#601---2026-02-26): Restore the declared Node.js minimum to 20.19.0.
- [@kitschpatrol/mdat-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#601---2026-02-26): Restore the declared minimum Node.js version to 20.19.0.
- [@kitschpatrol/prettier-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#601---2026-02-26): Restore the declared minimum Node.js version to 20.19.0.
- [@kitschpatrol/remark-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#601---2026-02-26): Restore the supported runtime requirement to Node.js 20.19+.
- [@kitschpatrol/repo-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#601---2026-02-26): Restore compatibility with Node.js 20.19.0 and newer.
- [@kitschpatrol/repo-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#601---2026-02-26): Recommend a Node engine when only development dependencies declare Node requirements.
- [@kitschpatrol/repo-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#601---2026-02-26): Evaluate Node requirements separately for each workspace package instead of combining all lockfile importers.
- [@kitschpatrol/shared-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#601---2026-02-26): Restore the declared Node.js minimum to 20.19.0.
- [@kitschpatrol/stylelint-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#601---2026-02-26): Restore the supported Node.js engine range to 20.19 or newer.
- [@kitschpatrol/typescript-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#601---2026-02-26): Restore the supported Node.js engine range to 20.19 or newer.

### Maintenance

- Refresh dependencies, update metadata workflow actions, and mark packages as side-effect-free.
- [@kitschpatrol/cspell-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#601---2026-02-26): Update CSpell to 9.7.0 and Case Police to 2.2.0, and mark the package as side-effect free.
- [@kitschpatrol/knip-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#601---2026-02-26): Update Knip to 5.85.0 and mark the package as side-effect-free for bundlers.
- [@kitschpatrol/mdat-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#601---2026-02-26): Update MDAT to 1.3.5.
- [@kitschpatrol/mdat-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#601---2026-02-26): Mark the package as side-effect-free for bundlers.
- [@kitschpatrol/prettier-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#601---2026-02-26): Mark the package as side-effect-free for bundlers.
- [@kitschpatrol/remark-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#601---2026-02-26): Mark the package as side-effect-free in its distribution metadata.
- [@kitschpatrol/shared-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#601---2026-02-26): Refresh runtime dependencies and mark the package as side-effect-free.
- [@kitschpatrol/stylelint-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#601---2026-02-26): Update Stylelint to `^17.4.0` and mark the published package as side-effect-free for bundlers.
- [@kitschpatrol/typescript-config 6.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#601---2026-02-26): Mark the published package as side-effect-free for bundlers.

## [6.0.0] - 2026-02-20

### Added

- Check and update `engines.node` and `devEngines.runtime` from pnpm dependency constraints, exposing detected requirements through `ksc-repo print-config`.
- [@kitschpatrol/repo-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#600---2026-02-20): Check and fix `engines.node` and `devEngines.runtime` against dependency requirements from the pnpm lockfile, reporting the responsible direct dependencies.
- [@kitschpatrol/repo-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#600---2026-02-20): Add `ksc-repo print-config` to display detected Node.js requirements and the lockfile used.

### Changed

- **Breaking:** Raise the published minimum Node.js version to 22.21.0.
- **Breaking:** [@kitschpatrol/cspell-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#600---2026-02-20): Raise the minimum Node.js version to 22.21.0.
- **Breaking:** [@kitschpatrol/eslint-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#600---2026-02-20): Require Node.js 22.21.0 or later.
- [@kitschpatrol/eslint-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#600---2026-02-20): Enable Unicorn's isolated-functions rule.
- **Breaking:** [@kitschpatrol/knip-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#600---2026-02-20): Raise the minimum Node.js version to 22.21.0.
- **Breaking:** [@kitschpatrol/mdat-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#600---2026-02-20): Require Node.js 22.21.0 or later.
- **Breaking:** [@kitschpatrol/prettier-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#600---2026-02-20): Require Node.js 22.21.0 or later.
- **Breaking:** [@kitschpatrol/remark-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#600---2026-02-20): Raise the minimum supported Node.js version to 22.21.
- **Breaking:** [@kitschpatrol/repo-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#600---2026-02-20): Require Node.js 22.21.0 or newer.
- **Breaking:** [@kitschpatrol/shared-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#600---2026-02-20): Raise the minimum supported Node.js version to 22.21.0.
- **Breaking:** [@kitschpatrol/stylelint-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#600---2026-02-20): Require Node.js 22.21 or newer.
- **Breaking:** [@kitschpatrol/typescript-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#600---2026-02-20): Require Node.js 22.21 or newer.

### Removed

- **Breaking:** Remove deprecated `kpi` and `kpi-*` executable aliases.
- **Breaking:** [@kitschpatrol/cspell-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#600---2026-02-20): Remove the deprecated `kpi-cspell` executable alias; use `ksc-cspell`.
- **Breaking:** [@kitschpatrol/eslint-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#600---2026-02-20): Remove the deprecated `kpi-eslint` executable; use `ksc-eslint`.
- **Breaking:** [@kitschpatrol/knip-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#600---2026-02-20): Remove the deprecated `kpi-knip` executable alias; use `ksc-knip`.
- **Breaking:** [@kitschpatrol/mdat-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#600---2026-02-20): Remove the deprecated `kpi-mdat` executable; use `ksc-mdat`.
- **Breaking:** [@kitschpatrol/prettier-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#600---2026-02-20): Remove the deprecated `kpi-prettier` executable; use `ksc-prettier`.
- **Breaking:** [@kitschpatrol/remark-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#600---2026-02-20): Remove the deprecated `kpi-remark` executable alias; use `ksc-remark`.
- **Breaking:** [@kitschpatrol/shared-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#600---2026-02-20): Remove the deprecated `kpi` executable alias; use `ksc`.
- **Breaking:** [@kitschpatrol/stylelint-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#600---2026-02-20): Remove the deprecated `kpi-stylelint` executable; use `ksc-stylelint` instead.
- **Breaking:** [@kitschpatrol/typescript-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#600---2026-02-20): Remove the deprecated `kpi-typescript` executable; use `ksc-typescript` instead.

### Security

- Update the dependency tree to address CVE-2026-25547.
- [@kitschpatrol/cspell-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#600---2026-02-20): Update CSpell and its libraries to 9.6.4 to address CVE-2026-25547.

### Documentation

- Explain repository license-year and Node.js-version validation.

### Maintenance

- Migrate package builds to tsdown, externalize runtime dependencies, and refresh build and lint tooling.
- [@kitschpatrol/mdat-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#600---2026-02-20): Migrate builds to tsdown with package-specific TypeScript configuration and package/type validation.
- [@kitschpatrol/prettier-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#600---2026-02-20): Migrate builds to tsdown with package-specific TypeScript configuration and package/type validation.
- [@kitschpatrol/remark-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#600---2026-02-20): Migrate CLI and library builds to tsdown with package and type validation, and declare dependencies externally rather than bundling them.
- [@kitschpatrol/shared-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#600---2026-02-20): Migrate CLI builds from esbuild to tsdown and declare external runtime dependencies explicitly, including Yargs 18.
- [@kitschpatrol/stylelint-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#600---2026-02-20): Migrate builds from esbuild to tsdown with package validation and explicitly declared runtime dependencies.
- [@kitschpatrol/typescript-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#600---2026-02-20): Migrate builds from esbuild to tsdown with package validation and explicitly declared runtime dependencies.

### Fixed

- [@kitschpatrol/knip-config 6.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#600---2026-02-20): Ignore the repository and TypeScript configuration packages when checking for unused dependencies.

## [5.13.0] - 2026-01-25

### Changed

- Initialize CSpell and Prettier with TypeScript configuration files and expand VS Code nesting for TOML and Wrangler configuration.
- [@kitschpatrol/cspell-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#5130---2026-01-25): Generate `cspell.config.ts` instead of `cspell.config.js` during file-based initialization.
- [@kitschpatrol/prettier-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#5130---2026-01-25): Generate `prettier.config.ts` instead of `prettier.config.js` during initialization.
- [@kitschpatrol/repo-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#5130---2026-01-25): Extend VS Code nesting to TOML configuration and Wrangler JSON/JSONC files.

### Documentation

- Update configuration-filename guidance and correct the Perfectionist 5 example.
- [@kitschpatrol/cspell-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#5130---2026-01-25): Update configuration-location examples for the TypeScript starter file.
- [@kitschpatrol/prettier-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#5130---2026-01-25): Update configuration-storage examples for the TypeScript starter file.

### Maintenance

- Refresh dependencies and exclude the monorepo root from standalone package builds.
- [@kitschpatrol/cspell-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#5130---2026-01-25): Recognize TypeScript configuration files in dictionary harvesting and update Prettier.
- [@kitschpatrol/eslint-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#5130---2026-01-25): Refresh linting dependencies, including flat-config utilities 3 and newer YAML, TOML, and regexp plugins.
- [@kitschpatrol/knip-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#5130---2026-01-25): Update Knip to 5.82.1 and refresh Prettier.
- [@kitschpatrol/mdat-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#5130---2026-01-25): Update MDAT to 1.3.4 and Prettier to 3.8.1.
- [@kitschpatrol/prettier-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#5130---2026-01-25): Upgrade prettier-plugin-packagejson to version 3 and refresh Prettier/package-sorting dependencies.
- [@kitschpatrol/remark-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#5130---2026-01-25): Update Prettier to 3.8.1.
- [@kitschpatrol/repo-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#5130---2026-01-25): Update the Prettier runtime dependency.
- [@kitschpatrol/shared-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#5130---2026-01-25): Update Prettier to 3.8.1.
- [@kitschpatrol/stylelint-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#5130---2026-01-25): Update the Prettier runtime dependency to `^3.8.1`.
- [@kitschpatrol/typescript-config 5.13.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#5130---2026-01-25): Update the Prettier runtime dependency to `^3.8.1`.

## [5.12.0] - 2026-01-18

### Changed

- Refresh package metadata, JSON, and TypeScript lint rules.
- [@kitschpatrol/cspell-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#5120---2026-01-18): Expand custom dictionaries with additional names, brands, file extensions, and technical vocabulary.
- [@kitschpatrol/eslint-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#5120---2026-01-18): Refresh package.json validation rules and adopt updated YAML/TOML plugins and parsers.

### Fixed

- Avoid competing format-on-save actions by configuring tool-specific VS Code fix actions.
- [@kitschpatrol/eslint-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#5120---2026-01-18): Use `source.fixAll.eslint` in VS Code settings to prevent competing fix-on-save actions.
- [@kitschpatrol/stylelint-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#5120---2026-01-18): Use Stylelint-specific VS Code save actions to avoid races with other formatters.
- [@kitschpatrol/typescript-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#5120---2026-01-18): Use TypeScript-specific save actions in the starter VS Code settings to avoid formatter races.

### Maintenance

- Upgrade Stylelint to 17, refresh other dependencies, and use upstream ESLint-comments types.
- [@kitschpatrol/cspell-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#5120---2026-01-18): Update CSpell to 9.6.0 and Prettier to 3.8.
- [@kitschpatrol/eslint-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#5120---2026-01-18): Refresh linting dependencies and use upstream ESLint-comments type declarations.
- [@kitschpatrol/knip-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#5120---2026-01-18): Update Knip to 5.82.0 and Prettier to 3.8.0.
- [@kitschpatrol/mdat-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#5120---2026-01-18): Update the Prettier runtime dependency to 3.8.0.
- [@kitschpatrol/prettier-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#5120---2026-01-18): Update Prettier to 3.8.0 and the package.json formatting plugin.
- [@kitschpatrol/remark-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#5120---2026-01-18): Update Prettier to 3.8 and refresh the license copyright year.
- [@kitschpatrol/repo-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#5120---2026-01-18): Update Prettier and refresh license copyright dates.
- [@kitschpatrol/shared-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#5120---2026-01-18): Update Prettier to 3.8.
- [@kitschpatrol/stylelint-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#5120---2026-01-18): Upgrade to Stylelint 17 and `stylelint-config-standard` 40, and refresh Prettier.
- [@kitschpatrol/typescript-config 5.12.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#5120---2026-01-18): Update the Prettier runtime dependency to version 3.8.

## [5.11.0] - 2025-12-27

### Changed

- **Breaking:** Migrate Perfectionist integration to version 5 and change the exported sort helper's `customGroups` result to the array-based format.
- Enable additional HTML obsolete-attribute and Vitest assertion checks.
- **Breaking:** [@kitschpatrol/eslint-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#5110---2025-12-27): Migrate to Perfectionist 5, changing `generatePerfectionistSortConfig()` to return array-based `customGroups`.
- [@kitschpatrol/eslint-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#5110---2025-12-27): Add import/export attribute sorting and refresh TypeScript, HTML, and Vitest rules.
- [@kitschpatrol/repo-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#5110---2025-12-27): Nest `.template.env` beneath `.env` in VS Code.

### Fixed

- Ignore synthetic filenames when linting embedded Astro scripts.
- [@kitschpatrol/eslint-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#5110---2025-12-27): Disable filename-case checks for Astro's embedded virtual scripts.

### Maintenance

- Refresh linting and contributor dependencies.
- [@kitschpatrol/cspell-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#5110---2025-12-27): Refresh CSpell types and filesystem utilities.
- [@kitschpatrol/knip-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#5110---2025-12-27): Update Knip to 5.78.0 and refresh fs-extra.
- [@kitschpatrol/mdat-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#5110---2025-12-27): Update MDAT to 1.3.3 and refresh fs-extra.
- [@kitschpatrol/prettier-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#5110---2025-12-27): Update filesystem, package.json sorting, and Svelte formatting dependencies.
- [@kitschpatrol/remark-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#5110---2025-12-27): Update `fs-extra` to 11.3.3.
- [@kitschpatrol/repo-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#5110---2025-12-27): Update the fs-extra runtime dependency.
- [@kitschpatrol/shared-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#5110---2025-12-27): Update fs-extra.
- [@kitschpatrol/stylelint-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#5110---2025-12-27): Update the `fs-extra` runtime dependency to `^11.3.3`.
- [@kitschpatrol/typescript-config 5.11.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#5110---2025-12-27): Update the `fs-extra` runtime dependency to `^11.3.3`.

## [5.10.0] - 2025-12-06

### Changed

- Move generated pnpm hoisting settings to `pnpm-workspace.yaml` and include native-build dependency permissions.
- Enforce LF line endings through shared Prettier configuration.
- [@kitschpatrol/cspell-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#5100---2025-12-06): Expand technical vocabulary and package-manifest exclusions.
- [@kitschpatrol/prettier-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#5100---2025-12-06): Explicitly enforce LF line endings for consistent formatting across platforms.
- [@kitschpatrol/repo-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#5100---2025-12-06): Move pnpm hoisting rules into a starter `pnpm-workspace.yaml` and allow required dependency build scripts.

### Fixed

- Resolve CSpell glob roots correctly on Windows.
- [@kitschpatrol/cspell-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#5100---2025-12-06): Resolve CSpell's glob root from the working directory for Windows compatibility.

### Documentation

- Update repository setup instructions and document Windows and line-ending guidance.
- [@kitschpatrol/cspell-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#5100---2025-12-06): Update standalone setup guidance to describe repository configuration files rather than only `.npmrc`.
- [@kitschpatrol/eslint-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#5100---2025-12-06): Clarify that standalone setup installs the repository configuration files.
- [@kitschpatrol/knip-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#5100---2025-12-06): Update setup guidance to install the repository configuration files following the pnpm hoisting-configuration migration.
- [@kitschpatrol/mdat-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#5100---2025-12-06): Update setup guidance to install the repository configuration files following the pnpm hoisting-configuration migration.
- [@kitschpatrol/prettier-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#5100---2025-12-06): Describe repository initialization as installing the basic configuration files rather than only `.npmrc`.
- [@kitschpatrol/remark-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#5100---2025-12-06): Update installation guidance to describe the repository configuration files required for pnpm, rather than only `.npmrc`.
- [@kitschpatrol/repo-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#5100---2025-12-06): Correct bootstrap guidance to copy repository configuration into the project root.
- [@kitschpatrol/shared-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#5100---2025-12-06): Document LF line endings, Windows usage, and pnpm hoisting through pnpm-workspace.yaml.
- [@kitschpatrol/stylelint-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#5100---2025-12-06): Update setup instructions to describe repository configuration files after the pnpm hoisting configuration migration.
- [@kitschpatrol/typescript-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#5100---2025-12-06): Update setup instructions to describe repository configuration files after the pnpm hoisting configuration migration.

### Maintenance

- Refresh dependencies, including Prettier 3.7, and invoke build scripts through tsx for cross-platform development.
- [@kitschpatrol/eslint-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#5100---2025-12-06): Refresh dependencies and invoke build scripts through tsx for cross-platform builds.
- [@kitschpatrol/knip-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#5100---2025-12-06): Refresh runtime dependencies, including Knip 5.71.0 and Prettier 3.7, and invoke package builds through tsx for cross-platform compatibility.
- [@kitschpatrol/mdat-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#5100---2025-12-06): Refresh Execa and Prettier runtime dependencies, including Prettier 3.7, and invoke package builds through tsx for cross-platform compatibility.
- [@kitschpatrol/prettier-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#5100---2025-12-06): Upgrade Prettier to 3.7 and refresh formatting/CLI dependencies.
- [@kitschpatrol/remark-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#5100---2025-12-06): Update Prettier to 3.7.4 and Execa to 9.6.1.
- [@kitschpatrol/remark-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#5100---2025-12-06): Invoke the build script explicitly through tsx for cross-platform builds.
- [@kitschpatrol/repo-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#5100---2025-12-06): Refresh runtime dependencies and explicitly invoke tsx in build scripts for cross-platform development.
- [@kitschpatrol/shared-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#5100---2025-12-06): Invoke the CLI build through tsx for cross-platform compatibility and update Prettier and Execa.
- [@kitschpatrol/stylelint-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#5100---2025-12-06): Refresh runtime dependencies, including Prettier 3.7, and invoke build scripts explicitly with `tsx` for cross-platform compatibility.
- [@kitschpatrol/typescript-config 5.10.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#5100---2025-12-06): Refresh runtime dependencies, including Prettier 3.7, and invoke build scripts explicitly with `tsx` for cross-platform compatibility.

## [5.9.2] - 2025-11-26

### Added

- Support complete npm badge overrides through the updated mdat dependency.
- [@kitschpatrol/mdat-config 5.9.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#592---2025-11-26): Support complete npm badge overrides through MDAT 1.3.2.

### Maintenance

- [@kitschpatrol/cspell-config 5.9.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#592---2025-11-26): See the package changelog.
- [@kitschpatrol/eslint-config 5.9.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#592---2025-11-26): See the package changelog.
- [@kitschpatrol/knip-config 5.9.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#592---2025-11-26): See the package changelog.
- [@kitschpatrol/prettier-config 5.9.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#592---2025-11-26): See the package changelog.
- [@kitschpatrol/remark-config 5.9.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#592---2025-11-26): See the package changelog.
- [@kitschpatrol/repo-config 5.9.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#592---2025-11-26): See the package changelog.
- [@kitschpatrol/shared-config 5.9.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#592---2025-11-26): See the package changelog.
- [@kitschpatrol/stylelint-config 5.9.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#592---2025-11-26): See the package changelog.
- [@kitschpatrol/typescript-config 5.9.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#592---2025-11-26): See the package changelog.

## [5.9.1] - 2025-11-26

### Fixed

- Update mdat to correct badge-rule processing.
- [@kitschpatrol/mdat-config 5.9.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#591---2025-11-26): Fix MDAT badge-rule behavior by updating to 1.3.1.

### Maintenance

- Update the contributor Svelte dependency.
- [@kitschpatrol/cspell-config 5.9.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#591---2025-11-26): See the package changelog.
- [@kitschpatrol/eslint-config 5.9.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#591---2025-11-26): Update the Svelte development dependency.
- [@kitschpatrol/knip-config 5.9.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#591---2025-11-26): See the package changelog.
- [@kitschpatrol/prettier-config 5.9.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#591---2025-11-26): See the package changelog.
- [@kitschpatrol/remark-config 5.9.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#591---2025-11-26): See the package changelog.
- [@kitschpatrol/repo-config 5.9.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#591---2025-11-26): See the package changelog.
- [@kitschpatrol/shared-config 5.9.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#591---2025-11-26): See the package changelog.
- [@kitschpatrol/stylelint-config 5.9.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#591---2025-11-26): See the package changelog.
- [@kitschpatrol/typescript-config 5.9.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#591---2025-11-26): See the package changelog.

## [5.9.0] - 2025-11-26

### Added

- Apply De Morgan lint rules to simplify negated conjunctions and disjunctions.
- [@kitschpatrol/eslint-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#590---2025-11-26): Enable De Morgan rules for negated conjunctions and disjunctions.

### Changed

- Add pre/post semantic key sorting and refresh package-metadata and test lint rules.
- [@kitschpatrol/cspell-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#590---2025-11-26): Add LLM-related vocabulary and correct the `ASTC` dictionary entry.
- [@kitschpatrol/eslint-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#590---2025-11-26): Sort pre/post keys semantically and refresh package.json and Vitest checks.

### Fixed

- Correct Svelte TypeScript project-service configuration and support experimental generics.
- [@kitschpatrol/eslint-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#590---2025-11-26): Use TypeScript project services for Svelte, enable generic component parsing, and accept additional virtual import prefixes.

### Maintenance

- Refresh dependencies and CSpell dictionaries.
- [@kitschpatrol/cspell-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#590---2025-11-26): Update CSpell to 9.3.2 and Case Police to 2.1.1.
- [@kitschpatrol/knip-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#590---2025-11-26): Update Knip to 5.70.2.
- [@kitschpatrol/mdat-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#590---2025-11-26): Update MDAT to 1.3.0.
- [@kitschpatrol/prettier-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#590---2025-11-26): See the package changelog.
- [@kitschpatrol/remark-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#590---2025-11-26): See the package changelog.
- [@kitschpatrol/repo-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#590---2025-11-26): See the package changelog.
- [@kitschpatrol/shared-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#590---2025-11-26): See the package changelog.
- [@kitschpatrol/stylelint-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#590---2025-11-26): Update Stylelint to `^16.26.0` and upgrade `stylelint-config-clean-order` to version 8.
- [@kitschpatrol/typescript-config 5.9.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#590---2025-11-26): Add a pinned TypeScript 5.9.3 development dependency.

## [5.8.3] - 2025-11-07

### Changed

- Relax unused-name requirements for classes, enums, interfaces, and type declarations.
- [@kitschpatrol/eslint-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#583---2025-11-07): Stop requiring underscore prefixes on unused classes, enums, interfaces, and type declarations.

### Maintenance

- Refresh HTML linting dependencies and work around development-tool `url.parse()` deprecation warnings.
- [@kitschpatrol/cspell-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#583---2025-11-07): See the package changelog.
- [@kitschpatrol/eslint-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#583---2025-11-07): Update HTML linting dependencies.
- [@kitschpatrol/knip-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#583---2025-11-07): See the package changelog.
- [@kitschpatrol/prettier-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#583---2025-11-07): See the package changelog.
- [@kitschpatrol/remark-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#583---2025-11-07): See the package changelog.
- [@kitschpatrol/repo-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#583---2025-11-07): See the package changelog.
- [@kitschpatrol/shared-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#583---2025-11-07): See the package changelog.
- [@kitschpatrol/stylelint-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#583---2025-11-07): See the package changelog.
- [@kitschpatrol/typescript-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#583---2025-11-07): See the package changelog.

### Fixed

- [@kitschpatrol/mdat-config 5.8.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#583---2025-11-07): Update MDAT to 1.2.3 to avoid `url.parse()` deprecation warnings from `normalize-package-data`.

## [5.8.2] - 2025-11-06

### Changed

- Allow underscore-prefixed unused identifiers and validate package executable metadata.
- [@kitschpatrol/eslint-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#582---2025-11-06): Accept underscore-prefixed unused declarations without enforcing their usual naming format.

### Documentation

- Use the latest project-template release in setup instructions.
- [@kitschpatrol/shared-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#582---2025-11-06): Use the latest project template explicitly in the quick-start command.

### Maintenance

- Refresh linting, Knip, mdat, and contributor dependencies.
- [@kitschpatrol/cspell-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#582---2025-11-06): Update CSpell and its libraries to 9.3.0.
- [@kitschpatrol/eslint-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#582---2025-11-06): Refresh HTML, Astro, Vitest, package.json, and development dependencies.
- [@kitschpatrol/knip-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#582---2025-11-06): Update Knip to 5.68.0.
- [@kitschpatrol/mdat-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#582---2025-11-06): Update MDAT to 1.2.2.
- [@kitschpatrol/prettier-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#582---2025-11-06): See the package changelog.
- [@kitschpatrol/remark-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#582---2025-11-06): See the package changelog.
- [@kitschpatrol/repo-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#582---2025-11-06): See the package changelog.
- [@kitschpatrol/stylelint-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#582---2025-11-06): See the package changelog.
- [@kitschpatrol/typescript-config 5.8.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#582---2025-11-06): See the package changelog.

## [5.8.1] - 2025-11-04

### Removed

- **Breaking:** Remove bundled SQL formatting support and its SQL parser dependency.
- **Breaking:** [@kitschpatrol/prettier-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#581---2025-11-04): Remove bundled SQL formatting support and prettier-plugin-sql because of its large parser dependency.

### Documentation

- Explain removal of the SQL Prettier plugin.
- [@kitschpatrol/prettier-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#581---2025-11-04): Explain why SQL formatting support was removed.

### Changed

- [@kitschpatrol/knip-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#581---2025-11-04): Stop excluding `prettier-plugin-sql` from unused-dependency checks.

### Maintenance

- [@kitschpatrol/cspell-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#581---2025-11-04): See the package changelog.
- [@kitschpatrol/eslint-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#581---2025-11-04): See the package changelog.
- [@kitschpatrol/mdat-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#581---2025-11-04): See the package changelog.
- [@kitschpatrol/remark-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#581---2025-11-04): See the package changelog.
- [@kitschpatrol/repo-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#581---2025-11-04): See the package changelog.
- [@kitschpatrol/shared-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#581---2025-11-04): See the package changelog.
- [@kitschpatrol/stylelint-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#581---2025-11-04): See the package changelog.
- [@kitschpatrol/typescript-config 5.8.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#581---2025-11-04): See the package changelog.

## [5.8.0] - 2025-11-04

### Changed

- Require package licenses and enable additional Unicorn checks.
- Stop enabling declaration maps in starter build tsconfigs.
- [@kitschpatrol/cspell-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#580---2025-11-04): Expand technical vocabulary and normalize selected dictionary entries.
- [@kitschpatrol/eslint-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#580---2025-11-04): Require package.json license metadata and refresh Unicorn defaults.
- [@kitschpatrol/repo-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#580---2025-11-04): Configure the starter `.npmrc` to use `NPM_AUTH_TOKEN` for local publishing.
- [@kitschpatrol/typescript-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#580---2025-11-04): Stop enabling declaration maps in the starter build configuration.

### Fixed

- Use basename-specific VS Code nesting patterns so source maps and declarations attach to the correct source file.
- [@kitschpatrol/cspell-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#580---2025-11-04): Place the `types` export condition before `import` so TypeScript can resolve the published declarations correctly.
- [@kitschpatrol/eslint-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#580---2025-11-04): Order the `types` export condition before `import` so TypeScript can resolve declarations correctly.
- [@kitschpatrol/knip-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#580---2025-11-04): Place the `types` export condition before `import` so TypeScript resolves the published declarations.
- [@kitschpatrol/mdat-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#580---2025-11-04): Place the `types` export condition before `import` so TypeScript resolves the published declarations.
- [@kitschpatrol/repo-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#580---2025-11-04): Match source maps and declaration files by basename so VS Code nests them beneath the corresponding source file.

### Maintenance

- Refresh dependencies, adapt README help generation to mdat's plugin split, and update npm publishing authentication.
- [@kitschpatrol/cspell-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#580---2025-11-04): Update CSpell and its libraries to 9.2.2.
- [@kitschpatrol/eslint-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#580---2025-11-04): Refresh linting dependencies and build/release tooling.
- [@kitschpatrol/knip-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#580---2025-11-04): Update Knip to 5.67.1.
- [@kitschpatrol/mdat-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#580---2025-11-04): Update MDAT to 1.2.0.
- [@kitschpatrol/prettier-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#580---2025-11-04): Update the Tailwind formatting plugin.
- [@kitschpatrol/remark-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#580---2025-11-04): See the package changelog.
- [@kitschpatrol/shared-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#580---2025-11-04): Update README generation directives for the newer mdat syntax.
- [@kitschpatrol/stylelint-config 5.8.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#580---2025-11-04): See the package changelog.

## [5.7.4] - 2025-10-15

### Fixed

- Ship the missing JSDoc plugin dependency as a runtime dependency.
- [@kitschpatrol/eslint-config 5.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#574---2025-10-15): Install `to-valid-identifier` as a runtime dependency to compensate for eslint-plugin-jsdoc's missing dependency.

### Maintenance

- [@kitschpatrol/cspell-config 5.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#574---2025-10-15): See the package changelog.
- [@kitschpatrol/knip-config 5.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#574---2025-10-15): See the package changelog.
- [@kitschpatrol/mdat-config 5.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#574---2025-10-15): See the package changelog.
- [@kitschpatrol/prettier-config 5.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#574---2025-10-15): See the package changelog.
- [@kitschpatrol/remark-config 5.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#574---2025-10-15): See the package changelog.
- [@kitschpatrol/repo-config 5.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#574---2025-10-15): See the package changelog.
- [@kitschpatrol/shared-config 5.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#574---2025-10-15): See the package changelog.
- [@kitschpatrol/stylelint-config 5.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#574---2025-10-15): See the package changelog.
- [@kitschpatrol/typescript-config 5.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#574---2025-10-15): See the package changelog.

## [5.7.3] - 2025-10-15

### Changed

- Apply semantic sorting to object types and additional coordinate-key patterns.
- Generate declaration maps in starter build tsconfigs and nest associated source maps in VS Code.
- [@kitschpatrol/cspell-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#573---2025-10-15): Expand and correct the custom dictionaries.
- [@kitschpatrol/eslint-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#573---2025-10-15): Apply semantic key ordering to object types and expand coordinate ordering patterns.
- [@kitschpatrol/eslint-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#573---2025-10-15): Refresh JSDoc recommended rules.
- [@kitschpatrol/repo-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#573---2025-10-15): Nest JavaScript and TypeScript source maps and declaration files beneath their source files in VS Code.
- [@kitschpatrol/typescript-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#573---2025-10-15): Enable declaration maps in the starter build configuration.

### Documentation

- Disambiguate package binaries in pnpm installation commands and recommend the project starter template.
- [@kitschpatrol/cspell-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#573---2025-10-15): Disambiguate the repository-bootstrap executable in installation instructions.
- [@kitschpatrol/knip-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#573---2025-10-15): Disambiguate the repository setup command by selecting the package and `ksc-repo` binary explicitly.
- [@kitschpatrol/mdat-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#573---2025-10-15): Disambiguate the repository setup command by selecting the package and `ksc-repo` binary explicitly.
- [@kitschpatrol/prettier-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#573---2025-10-15): Disambiguate repository setup by explicitly selecting the `ksc-repo` executable in pnpm dlx instructions.
- [@kitschpatrol/remark-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#573---2025-10-15): Disambiguate the repository bootstrap executable with an explicit pnpm package selection and `ksc-repo init`.
- [@kitschpatrol/repo-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#573---2025-10-15): Make the bootstrap command explicitly select the `ksc-repo` executable.
- [@kitschpatrol/shared-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#573---2025-10-15): Add project-template setup instructions and explicitly select `ksc-repo` in pnpm dlx examples.
- [@kitschpatrol/stylelint-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#573---2025-10-15): Specify the `ksc-repo` executable explicitly in bootstrap installation instructions.
- [@kitschpatrol/typescript-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#573---2025-10-15): Specify the `ksc-repo` executable explicitly in bootstrap installation instructions.

### Maintenance

- Refresh dependencies and spelling dictionaries.
- [@kitschpatrol/cspell-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#573---2025-10-15): Update the TypeScript configuration loader.
- [@kitschpatrol/knip-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#573---2025-10-15): Update Knip to 5.65.0 and refresh the Cosmiconfig TypeScript loader.
- [@kitschpatrol/mdat-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#573---2025-10-15): Update the Cosmiconfig TypeScript loader to 6.2.0.
- [@kitschpatrol/prettier-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#573---2025-10-15): Update the TypeScript configuration loader and Tailwind formatting plugin.
- [@kitschpatrol/remark-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#573---2025-10-15): Update the Cosmiconfig TypeScript loader to 6.2.
- [@kitschpatrol/repo-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#573---2025-10-15): Update the TypeScript configuration loader dependency.
- [@kitschpatrol/shared-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#573---2025-10-15): Update cosmiconfig-typescript-loader.
- [@kitschpatrol/stylelint-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#573---2025-10-15): Update the TypeScript configuration loader to version 6.2.
- [@kitschpatrol/typescript-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#573---2025-10-15): Update the TypeScript configuration loader to version 6.2.

### Fixed

- [@kitschpatrol/eslint-config 5.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#573---2025-10-15): Pin eslint-react to 2.1.1 to retain the plugin structure expected by the React configuration.

## [5.7.2] - 2025-10-06

### Changed

- Allow underscore-only unused parameters and refresh React, JSDoc, and test lint rules.
- Include dotfiles in generated build tsconfigs.
- [@kitschpatrol/eslint-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#572---2025-10-06): Allow unused parameters named entirely with underscores and refresh React, JSDoc, and Vitest rule defaults.
- [@kitschpatrol/typescript-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#572---2025-10-06): Include dotfiles in the starter build configuration's file patterns.

### Maintenance

- Refresh ESLint, Knip, Stylelint, TypeScript, and contributor dependencies.
- [@kitschpatrol/cspell-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#572---2025-10-06): See the package changelog.
- [@kitschpatrol/eslint-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#572---2025-10-06): Refresh ESLint, parsers, and plugin dependencies.
- [@kitschpatrol/knip-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#572---2025-10-06): Update Knip to 5.64.2.
- [@kitschpatrol/mdat-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#572---2025-10-06): See the package changelog.
- [@kitschpatrol/prettier-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#572---2025-10-06): See the package changelog.
- [@kitschpatrol/remark-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#572---2025-10-06): See the package changelog.
- [@kitschpatrol/repo-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#572---2025-10-06): See the package changelog.
- [@kitschpatrol/shared-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#572---2025-10-06): See the package changelog.
- [@kitschpatrol/stylelint-config 5.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#572---2025-10-06): Refresh Stylelint and its standard preset.

## [5.7.1] - 2025-09-29

### Changed

- Refresh React and JSDoc lint presets.
- [@kitschpatrol/eslint-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#571---2025-09-29): Adopt eslint-react 2 and JSDoc 60 recommended rules, including stricter duplicate-key and nested-lazy-component checks.

### Documentation

- Explain CSpell and Case Police ignore syntax for files, words, and code blocks.
- [@kitschpatrol/cspell-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#571---2025-09-29): Explain file, word, and code-block exclusions for CSpell and Case Police.

### Maintenance

- Refresh tool and contributor dependencies.
- [@kitschpatrol/cspell-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#571---2025-09-29): Refresh filesystem utilities and dictionary-harvesting dependencies.
- [@kitschpatrol/eslint-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#571---2025-09-29): Refresh parsers, linting plugins, and development dependencies.
- [@kitschpatrol/knip-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#571---2025-09-29): Update Knip to 5.64.1 and refresh fs-extra.
- [@kitschpatrol/mdat-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#571---2025-09-29): Update MDAT to 1.1.0 and refresh fs-extra.
- [@kitschpatrol/prettier-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#571---2025-09-29): Update fs-extra.
- [@kitschpatrol/remark-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#571---2025-09-29): Update `fs-extra` to 11.3.2.
- [@kitschpatrol/repo-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#571---2025-09-29): Update fs-extra and the Globby build dependency.
- [@kitschpatrol/shared-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#571---2025-09-29): Update fs-extra and the globby development dependency.
- [@kitschpatrol/stylelint-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#571---2025-09-29): Update the `fs-extra` runtime dependency to `^11.3.2`.
- [@kitschpatrol/typescript-config 5.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#571---2025-09-29): Update the `fs-extra` runtime dependency to `^11.3.2`.

## [5.7.0] - 2025-09-08

### Added

- Provide `ksc` and `ksc-*` command names alongside existing aliases.
- [@kitschpatrol/cspell-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#570---2025-09-08): Provide `ksc-cspell` as the preferred CLI name.
- [@kitschpatrol/eslint-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#570---2025-09-08): Provide the `ksc-eslint` executable.
- [@kitschpatrol/knip-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#570---2025-09-08): Provide `ksc-knip` as the preferred executable and recognize the `ksc-*` tool binaries in the preset.
- [@kitschpatrol/mdat-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#570---2025-09-08): Provide `ksc-mdat` as the preferred CLI executable.
- [@kitschpatrol/prettier-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#570---2025-09-08): Provide `ksc-prettier` as the CLI executable.
- [@kitschpatrol/remark-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#570---2025-09-08): Add `ksc-remark` as the preferred executable name.
- [@kitschpatrol/repo-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#570---2025-09-08): Add `ksc-repo` as the preferred executable name.
- [@kitschpatrol/shared-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#570---2025-09-08): Add `ksc` as the preferred aggregate executable.
- [@kitschpatrol/stylelint-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#570---2025-09-08): Add `ksc-stylelint` as the preferred CLI executable.
- [@kitschpatrol/typescript-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#570---2025-09-08): Add `ksc-typescript` as the preferred CLI executable.

### Changed

- Suppress repeated TypeScript import-resolver warnings for multiple projects.
- [@kitschpatrol/cspell-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#570---2025-09-08): Expand the dictionaries with additional brands, names, rule terminology, and technical vocabulary.
- [@kitschpatrol/eslint-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#570---2025-09-08): Refresh Svelte and Unicorn defaults and suppress redundant multiple-project import-resolver warnings.

### Deprecated

- Deprecate `kpi` and `kpi-*` aliases for removal in the next major release.
- [@kitschpatrol/cspell-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#570---2025-09-08): Deprecate the `kpi-cspell` alias in favor of `ksc-cspell`, retaining it until the next major release.
- [@kitschpatrol/eslint-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#570---2025-09-08): Deprecate `kpi-eslint` in favor of `ksc-eslint`, retaining the old executable until the next major release.
- [@kitschpatrol/knip-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#570---2025-09-08): Deprecate the retained `kpi-knip` executable alias for removal in the next major release.
- [@kitschpatrol/mdat-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#570---2025-09-08): Deprecate the retained `kpi-mdat` executable alias for removal in the next major release.
- [@kitschpatrol/prettier-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#570---2025-09-08): Deprecate the `kpi-prettier` alias for removal in the next major release.
- [@kitschpatrol/remark-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#570---2025-09-08): Deprecate `kpi-remark` in favor of `ksc-remark`, retaining the alias until the next major release.
- [@kitschpatrol/repo-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#570---2025-09-08): Deprecate the `kpi-repo` executable alias ahead of its removal in the next major release.
- [@kitschpatrol/shared-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#570---2025-09-08): Deprecate the `kpi` executable alias ahead of its removal in the next major release.
- [@kitschpatrol/stylelint-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#570---2025-09-08): Deprecate the `kpi-stylelint` executable in preparation for its removal in the next major release.
- [@kitschpatrol/typescript-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#570---2025-09-08): Deprecate the `kpi-typescript` executable in preparation for its removal in the next major release.

### Documentation

- Update usage and installation examples for `ksc` command names.
- [@kitschpatrol/knip-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#570---2025-09-08): Update installation and command examples to use `ksc-knip`.
- [@kitschpatrol/mdat-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#570---2025-09-08): Update CLI examples and the generated `shared-config` section to use `ksc` command names.
- [@kitschpatrol/prettier-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#570---2025-09-08): Update setup, script examples, and CLI references to use `ksc-prettier`.
- [@kitschpatrol/remark-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#570---2025-09-08): Update setup instructions and the command reference to use `ksc-remark`.
- [@kitschpatrol/repo-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#570---2025-09-08): Update examples and CLI references to use `ksc-repo`.
- [@kitschpatrol/shared-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#570---2025-09-08): Update installation instructions and CLI examples to use `ksc`.
- [@kitschpatrol/stylelint-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#570---2025-09-08): Update command examples and CLI reference material to use the `ksc` names.
- [@kitschpatrol/typescript-config 5.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#570---2025-09-08): Update command examples and CLI reference material to use the `ksc` names.

### Maintenance

- Refresh dependencies and spelling dictionaries.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Raise the minimum Node.js version to 20.19.0.
- **Breaking:** Enable `erasableSyntaxOnly` in the shared TypeScript configuration.
- Allow uppercase constants throughout a project, treat `$` imports as internal, and refine semantic sorting and Svelte filenames.
- **Breaking:** [@kitschpatrol/cspell-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#560---2025-09-01): Raise the minimum Node.js version to 20.19.0.
- **Breaking:** [@kitschpatrol/eslint-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#560---2025-09-01): Require Node.js 20.19.0 or later.
- [@kitschpatrol/eslint-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#560---2025-09-01): Allow UPPER_CASE constants without exporting them, recognize `$` import aliases as internal, and sort open/close keys semantically.
- [@kitschpatrol/eslint-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#560---2025-09-01): Refresh TypeScript, HTML, package.json, Svelte, and Unicorn defaults and retire deprecated rules.
- **Breaking:** [@kitschpatrol/knip-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#560---2025-09-01): Raise the minimum Node.js version to 20.19.0.
- **Breaking:** [@kitschpatrol/mdat-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#560---2025-09-01): Raise the minimum Node.js version to 20.19.0.
- **Breaking:** [@kitschpatrol/prettier-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#560---2025-09-01): Raise the minimum Node.js version to 20.19.0.
- **Breaking:** [@kitschpatrol/remark-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#560---2025-09-01): Raise the minimum supported Node.js version to 20.19.
- **Breaking:** [@kitschpatrol/repo-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#560---2025-09-01): Require Node.js 20.19.0 or newer.
- **Breaking:** [@kitschpatrol/shared-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#560---2025-09-01): Raise the minimum supported Node.js version to 20.19.0.
- **Breaking:** [@kitschpatrol/stylelint-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#560---2025-09-01): Require Node.js 20.19 or newer.
- **Breaking:** [@kitschpatrol/typescript-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#560---2025-09-01): Require Node.js 20.19 or newer.
- **Breaking:** [@kitschpatrol/typescript-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#560---2025-09-01): Enable `erasableSyntaxOnly`, rejecting TypeScript syntax that requires transformation.

### Fixed

- Update mdat to eliminate deprecation warnings during linting.
- [@kitschpatrol/mdat-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#560---2025-09-01): Update MDAT to 1.0.4 to eliminate deprecation warnings during linting.

### Documentation

- Add another related linting project.
- [@kitschpatrol/shared-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#560---2025-09-01): Update Node.js requirements and add lintroll to related projects.

### Maintenance

- Refresh dependencies, regenerate ESLint presets, and update pnpm.
- [@kitschpatrol/cspell-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#560---2025-09-01): Update CSpell to 9.2.1 and refresh filesystem and formatting dependencies.
- [@kitschpatrol/knip-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#560---2025-09-01): Refresh runtime dependencies, including Knip 5.63.0, Prettier, and fs-extra.
- [@kitschpatrol/mdat-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#560---2025-09-01): Refresh Prettier and fs-extra runtime dependencies.
- [@kitschpatrol/prettier-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#560---2025-09-01): Update Prettier to 3.6.2 and refresh formatting, filesystem, and package-sorting dependencies.
- [@kitschpatrol/remark-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#560---2025-09-01): Update Prettier to 3.6.2 and refresh the filesystem dependency.
- [@kitschpatrol/repo-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#560---2025-09-01): Refresh runtime dependencies, including Prettier 3.6.
- [@kitschpatrol/shared-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#560---2025-09-01): Update Prettier and fs-extra.
- [@kitschpatrol/stylelint-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#560---2025-09-01): Refresh Stylelint, its standard preset, filesystem utilities, and Prettier.
- [@kitschpatrol/typescript-config 5.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#560---2025-09-01): Refresh filesystem and formatting dependencies.

## [5.5.0] - 2025-06-11

### Fixed

- Apply shared ESLint rules inside Svelte script blocks and include `.svelte.ts` and `.svelte.js` files.
- [@kitschpatrol/eslint-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#550---2025-06-11): Apply shared JavaScript/TypeScript rules inside Svelte script blocks and supply the project/parser configuration they need.

### Maintenance

- Refresh ESLint plugins and contributor dependencies.
- [@kitschpatrol/cspell-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#550---2025-06-11): See the package changelog.
- [@kitschpatrol/eslint-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#550---2025-06-11): Refresh TypeScript, Svelte, Vitest, and package.json linting dependencies.
- [@kitschpatrol/knip-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#550---2025-06-11): See the package changelog.
- [@kitschpatrol/mdat-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#550---2025-06-11): See the package changelog.
- [@kitschpatrol/prettier-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#550---2025-06-11): See the package changelog.
- [@kitschpatrol/remark-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#550---2025-06-11): See the package changelog.
- [@kitschpatrol/repo-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#550---2025-06-11): See the package changelog.
- [@kitschpatrol/shared-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#550---2025-06-11): See the package changelog.
- [@kitschpatrol/stylelint-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#550---2025-06-11): See the package changelog.
- [@kitschpatrol/typescript-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#550---2025-06-11): See the package changelog.

### Added

- [@kitschpatrol/eslint-config 5.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#550---2025-06-11): Recognize `.svelte.js` and `.svelte.ts` modules and export corresponding glob constants.

## [5.4.4] - 2025-06-09

No notable changes.

### Maintenance

- [@kitschpatrol/cspell-config 5.4.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#544---2025-06-09): See the package changelog.
- [@kitschpatrol/eslint-config 5.4.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#544---2025-06-09): See the package changelog.
- [@kitschpatrol/knip-config 5.4.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#544---2025-06-09): See the package changelog.
- [@kitschpatrol/mdat-config 5.4.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#544---2025-06-09): See the package changelog.
- [@kitschpatrol/prettier-config 5.4.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#544---2025-06-09): See the package changelog.
- [@kitschpatrol/remark-config 5.4.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#544---2025-06-09): See the package changelog.
- [@kitschpatrol/repo-config 5.4.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#544---2025-06-09): See the package changelog.
- [@kitschpatrol/shared-config 5.4.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#544---2025-06-09): See the package changelog.
- [@kitschpatrol/stylelint-config 5.4.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#544---2025-06-09): See the package changelog.
- [@kitschpatrol/typescript-config 5.4.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#544---2025-06-09): See the package changelog.

## [5.4.3] - 2025-06-09

### Changed

- Expand CSpell dictionaries and require the package `type` field through ESLint.
- [@kitschpatrol/cspell-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#543---2025-06-09): Expand custom dictionaries with additional file extensions, names, acronyms, brands, and technical vocabulary.
- [@kitschpatrol/eslint-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#543---2025-06-09): Require a package.json `type` field.

### Maintenance

- Update metadata workflows to support `metadata.json`, add dictionary word-harvesting tooling, and refresh dependencies.
- [@kitschpatrol/cspell-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#543---2025-06-09): Add a contributor script to harvest project-specific words and prepare dictionary-categorization suggestions.
- [@kitschpatrol/cspell-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#543---2025-06-09): Update Execa to 9.6.0.
- [@kitschpatrol/eslint-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#543---2025-06-09): Refresh ESLint, parsers, framework plugins, and CLI dependencies.
- [@kitschpatrol/knip-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#543---2025-06-09): Update Knip to 5.60.2 and refresh Execa.
- [@kitschpatrol/mdat-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#543---2025-06-09): Update the Execa runtime dependency to 9.6.0.
- [@kitschpatrol/prettier-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#543---2025-06-09): Update package.json/Tailwind formatting plugins and Execa.
- [@kitschpatrol/remark-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#543---2025-06-09): Update Execa to 9.6.
- [@kitschpatrol/repo-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#543---2025-06-09): Upgrade the metadata synchronization action to v3 for `metadata.json` support and remove redundant workflow validation steps.
- [@kitschpatrol/repo-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#543---2025-06-09): Update the Execa runtime dependency.
- [@kitschpatrol/shared-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#543---2025-06-09): Update Execa.
- [@kitschpatrol/stylelint-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#543---2025-06-09): Update Stylelint to `^16.20.0` and Execa to version 9.6.
- [@kitschpatrol/typescript-config 5.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#543---2025-06-09): Refresh runtime dependencies, including Execa 9.6.

## [5.4.2] - 2025-05-26

### Changed

- Enable the Svelte rule that prefers writable derived state.
- [@kitschpatrol/eslint-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#542---2025-05-26): Enable Svelte's preference for writable derived values.

### Maintenance

- Refresh linting, formatting, Knip, and contributor dependencies and extend MDX test fixtures.
- [@kitschpatrol/cspell-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#542---2025-05-26): Update CSpell and its libraries to 9.0.2.
- [@kitschpatrol/eslint-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#542---2025-05-26): Refresh ESLint, framework plugins, parsers, and build tooling.
- [@kitschpatrol/knip-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#542---2025-05-26): Update Knip to 5.58.0.
- [@kitschpatrol/mdat-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#542---2025-05-26): See the package changelog.
- [@kitschpatrol/prettier-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#542---2025-05-26): Update package.json and Svelte formatting plugins.
- [@kitschpatrol/remark-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#542---2025-05-26): See the package changelog.
- [@kitschpatrol/repo-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#542---2025-05-26): See the package changelog.
- [@kitschpatrol/shared-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#542---2025-05-26): Add an MDX fixture to CLI integration coverage.
- [@kitschpatrol/stylelint-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#542---2025-05-26): See the package changelog.
- [@kitschpatrol/typescript-config 5.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#542---2025-05-26): See the package changelog.

## [5.4.1] - 2025-05-11

### Changed

- Refresh ESLint presets for HTML, React, TypeScript, Unicorn, and package metadata.
- [@kitschpatrol/cspell-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#541---2025-05-11): Recognize `unrs` in the technical dictionary.
- [@kitschpatrol/eslint-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#541---2025-05-11): Refresh TypeScript, React, HTML, package.json, and Unicorn defaults, including package description and HTML baseline checks.

### Maintenance

- Upgrade CSpell to 9 and Case Police to 2, refresh other dependencies, and replace Chalk with Picocolors.
- [@kitschpatrol/cspell-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#541---2025-05-11): Update CSpell to 9.0.1 and Case Police to 2.0.
- [@kitschpatrol/cspell-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#541---2025-05-11): Replace Chalk with Picocolors in shared CLI logging.
- [@kitschpatrol/eslint-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#541---2025-05-11): Refresh linting dependencies and replace Chalk with Picocolors in the shared CLI.
- [@kitschpatrol/knip-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#541---2025-05-11): Refresh runtime dependencies, including Knip 5.55.1 and Execa, and replace Chalk with Picocolors in shared CLI logging.
- [@kitschpatrol/mdat-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#541---2025-05-11): Refresh MDAT and Execa runtime dependencies and replace Chalk with Picocolors in shared CLI logging.
- [@kitschpatrol/prettier-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#541---2025-05-11): Refresh formatting plugins, package.json sorting, and CLI process-execution dependencies.
- [@kitschpatrol/remark-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#541---2025-05-11): Refresh Execa and Remark rule dependencies, including fenced-code flags and reference validation.
- [@kitschpatrol/remark-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#541---2025-05-11): Replace Chalk with Picocolors in the bundled shared CLI implementation.
- [@kitschpatrol/repo-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#541---2025-05-11): Update Execa and replace Chalk with Picocolors in shared CLI logging.
- [@kitschpatrol/shared-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#541---2025-05-11): Replace Chalk with picocolors in CLI logging and update Execa.
- [@kitschpatrol/stylelint-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#541---2025-05-11): Update Stylelint, its standard preset, and Execa; replace Chalk with picocolors in the shared CLI.
- [@kitschpatrol/typescript-config 5.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#541---2025-05-11): Refresh Execa and the TypeScript peer baseline to 5.8.3; replace Chalk with picocolors in the shared CLI.

## [5.4.0] - 2025-03-28

### Changed

- Prefer separate top-level TypeScript type imports and refresh React and Svelte lint rules.
- [@kitschpatrol/eslint-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#540---2025-03-28): Prefer separate top-level type imports, update tsconfig key ordering, and refresh React and Svelte rule defaults.

### Fixed

- Use the correct JSON sorting rule for TypeScript configuration files.
- [@kitschpatrol/eslint-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#540---2025-03-28): Preserve falsy default exports when resolving dynamically imported modules.

### Maintenance

- Refresh linting, formatting, TypeScript, and test dependencies.
- [@kitschpatrol/cspell-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#540---2025-03-28): Update CSpell and its libraries to 8.18.0.
- [@kitschpatrol/eslint-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#540---2025-03-28): Refresh ESLint, parsers, plugins, and rule-generation tooling.
- [@kitschpatrol/knip-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#540---2025-03-28): Update Knip to 5.46.2.
- [@kitschpatrol/mdat-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#540---2025-03-28): See the package changelog.
- [@kitschpatrol/prettier-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#540---2025-03-28): See the package changelog.
- [@kitschpatrol/remark-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#540---2025-03-28): Refresh shared TypeScript, esbuild, and Vitest build and validation tooling.
- [@kitschpatrol/repo-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#540---2025-03-28): See the package changelog.
- [@kitschpatrol/shared-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#540---2025-03-28): See the package changelog.
- [@kitschpatrol/stylelint-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#540---2025-03-28): Update the Stylelint runtime dependency to `^16.17.0`.
- [@kitschpatrol/typescript-config 5.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#540---2025-03-28): See the package changelog.

## [5.3.1] - 2025-03-10

### Fixed

- Recognize Starlight virtual imports and remove the obsolete Markdown-plugin override after upgrading MDX integration.
- [@kitschpatrol/eslint-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#531---2025-03-10): Accept Starlight `virtual:` imports and update MDX dependencies so ESLint 9 no longer needs a Markdown plugin override.

### Maintenance

- Refresh ESLint plugins and contributor dependencies.
- [@kitschpatrol/cspell-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#531---2025-03-10): See the package changelog.
- [@kitschpatrol/eslint-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#531---2025-03-10): Refresh remaining linting and development dependencies.
- [@kitschpatrol/knip-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#531---2025-03-10): See the package changelog.
- [@kitschpatrol/mdat-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#531---2025-03-10): See the package changelog.
- [@kitschpatrol/prettier-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#531---2025-03-10): See the package changelog.
- [@kitschpatrol/remark-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#531---2025-03-10): See the package changelog.
- [@kitschpatrol/repo-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#531---2025-03-10): See the package changelog.
- [@kitschpatrol/shared-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#531---2025-03-10): See the package changelog.
- [@kitschpatrol/stylelint-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#531---2025-03-10): See the package changelog.
- [@kitschpatrol/typescript-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#531---2025-03-10): See the package changelog.

### Documentation

- [@kitschpatrol/eslint-config 5.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#531---2025-03-10): Remove the obsolete Markdown plugin compatibility warning.

## [5.3.0] - 2025-03-04

### Changed

- Refine semantic object sorting and relax ESLint rules that produce import and comment false positives.
- [@kitschpatrol/eslint-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#530---2025-03-04): Sort start/end keys semantically and relax default-member, unpublished-import, and comment-capitalization checks.

### Fixed

- Skip plain `tsc` checks in detected Svelte projects and correct width/height sorting precedence.
- [@kitschpatrol/eslint-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#530---2025-03-04): Prioritize width/height ordering over min/max ordering for overlapping property names.
- [@kitschpatrol/knip-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#530---2025-03-04): Avoid false missing-binary reports for `op` and `gh` and false unused-dependency reports for the Wiktionary CSpell dictionary.
- [@kitschpatrol/typescript-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#530---2025-03-04): Skip plain `tsc` in detected Svelte projects and recommend `svelte-check` to avoid unactionable errors.

### Documentation

- Explain the Svelte checker limitation and ESLint/MDX compatibility workaround.
- [@kitschpatrol/eslint-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#530---2025-03-04): Document the Markdown plugin override required for ESLint 9 compatibility.
- [@kitschpatrol/typescript-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#530---2025-03-04): Explain the Svelte type-checking caveat and why the lint command is skipped.

### Maintenance

- Refresh dependencies and expand Knip's default ignores.
- [@kitschpatrol/cspell-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#530---2025-03-04): See the package changelog.
- [@kitschpatrol/mdat-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#530---2025-03-04): Update MDAT to 1.0.1.
- [@kitschpatrol/prettier-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#530---2025-03-04): Upgrade sort-package-json to version 3.
- [@kitschpatrol/remark-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#530---2025-03-04): See the package changelog.
- [@kitschpatrol/repo-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#530---2025-03-04): See the package changelog.
- [@kitschpatrol/shared-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#530---2025-03-04): See the package changelog.
- [@kitschpatrol/stylelint-config 5.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#530---2025-03-04): See the package changelog.

## [5.2.0] - 2025-03-04

### Changed

- Allow `util` and `utils` abbreviations and expand Knip's default dependency ignores.
- [@kitschpatrol/eslint-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#520---2025-03-04): Allow `util` and `utils` without abbreviation-expansion errors.

### Removed

- **Breaking:** Disable `kpi-knip fix`, removing Knip's automatic code and dependency deletion from aggregate fixes.
- **Breaking:** [@kitschpatrol/knip-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#520---2025-03-04): Remove the `kpi-knip fix` command to prevent automatic deletion of code and dependencies.

### Documentation

- Correct usage documentation and remove Knip auto-fix instructions.
- [@kitschpatrol/shared-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#520---2025-03-04): Correct the README description of package-specific documentation.

### Fixed

- [@kitschpatrol/knip-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#520---2025-03-04): Ignore dynamically loaded Prettier plugins when checking for unused dependencies.

### Maintenance

- [@kitschpatrol/cspell-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#520---2025-03-04): See the package changelog.
- [@kitschpatrol/mdat-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#520---2025-03-04): See the package changelog.
- [@kitschpatrol/prettier-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#520---2025-03-04): See the package changelog.
- [@kitschpatrol/remark-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#520---2025-03-04): See the package changelog.
- [@kitschpatrol/repo-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#520---2025-03-04): See the package changelog.
- [@kitschpatrol/stylelint-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#520---2025-03-04): See the package changelog.
- [@kitschpatrol/typescript-config 5.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#520---2025-03-04): See the package changelog.

## [5.1.0] - 2025-03-03

### Changed

- **Breaking:** Change `generatePerfectionistSortConfig` to accept an `exact`, `leading`, or `trailing` match mode instead of the previous options object.
- Expand config-file detection, preserve project build-tsconfig overrides, and enforce consistent filename casing in TypeScript.
- **Breaking:** [@kitschpatrol/eslint-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#510---2025-03-03): Change `generatePerfectionistSortConfig()` from `{ matchTrailing }` options to `exact`, `leading`, or `trailing` modes and expand semantic key ordering.
- [@kitschpatrol/eslint-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#510---2025-03-03): Offer suggestions for restricted types instead of automatically replacing them.
- [@kitschpatrol/repo-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#510---2025-03-03): Extend VS Code nesting to additional configuration extensions, including `.mts`, `.cts`, JSONC, and JSON5.
- [@kitschpatrol/typescript-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#510---2025-03-03): Enforce consistent filename casing in the shared TypeScript configuration.
- [@kitschpatrol/typescript-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#510---2025-03-03): Allow TypeScript minor updates within version 5 instead of restricting peers to 5.7 patch releases.

### Fixed

- Avoid symlink loops in copyright-year checks, resolve imports in TypeScript configuration files, and reduce Astro and Svelte lint false positives.
- [@kitschpatrol/eslint-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#510---2025-03-03): Accept SvelteKit starter HTML without document-boilerplate errors.
- [@kitschpatrol/knip-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#510---2025-03-03): Resolve imports in TypeScript configuration files with the dedicated Cosmiconfig TypeScript loader.
- [@kitschpatrol/mdat-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#510---2025-03-03): Resolve imports in TypeScript configuration files with the dedicated Cosmiconfig TypeScript loader.
- [@kitschpatrol/prettier-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#510---2025-03-03): Use a TypeScript cosmiconfig loader that resolves module imports in configuration files.
- [@kitschpatrol/remark-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#510---2025-03-03): Load TypeScript configuration files with the dedicated Cosmiconfig TypeScript loader, avoiding module-resolution errors for imports inside config files.
- [@kitschpatrol/repo-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#510---2025-03-03): Prevent copyright checks from following symlink loops and recognize license filenames case-insensitively.
- [@kitschpatrol/shared-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#510---2025-03-03): Load TypeScript configuration files with a dedicated loader so relative module imports resolve.
- [@kitschpatrol/stylelint-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#510---2025-03-03): Load TypeScript configurations containing relative imports correctly when printing configuration.
- [@kitschpatrol/typescript-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#510---2025-03-03): Make the starter build configuration inherit project overrides from `./tsconfig.json`.

### Documentation

- Revise bootstrap examples and explain configuration location choices.
- [@kitschpatrol/shared-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#510---2025-03-03): Make quick-start commands generate standalone configuration files and clarify `--location` options.

### Maintenance

- Refresh linting and formatting dependencies.
- [@kitschpatrol/cspell-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#510---2025-03-03): Declare the shared TypeScript configuration-loader dependency and update Prettier.
- [@kitschpatrol/knip-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#510---2025-03-03): Update the Prettier runtime dependency.
- [@kitschpatrol/mdat-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#510---2025-03-03): Update the Prettier runtime dependency.
- [@kitschpatrol/prettier-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#510---2025-03-03): Update Prettier and the package.json formatting plugin.
- [@kitschpatrol/remark-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#510---2025-03-03): Update the Prettier runtime dependency to 3.5.3.
- [@kitschpatrol/repo-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#510---2025-03-03): Refresh runtime dependencies and add the TypeScript configuration loader used by shared CLI infrastructure.
- [@kitschpatrol/shared-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#510---2025-03-03): Update Prettier.
- [@kitschpatrol/stylelint-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#510---2025-03-03): Refresh Prettier and add the shared TypeScript configuration loader.

### Added

- [@kitschpatrol/knip-config 5.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#510---2025-03-03): Recognize JavaScript and TypeScript module extensions for scripts and shared-tool configuration entry points.

## [5.0.8] - 2025-03-02

### Fixed

- Stop passing Node.js 22-only type-stripping options to child processes on Node.js 20.

### Maintenance

- [@kitschpatrol/cspell-config 5.0.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#508---2025-03-02): See the package changelog.
- [@kitschpatrol/eslint-config 5.0.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#508---2025-03-02): See the package changelog.
- [@kitschpatrol/knip-config 5.0.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#508---2025-03-02): See the package changelog.
- [@kitschpatrol/mdat-config 5.0.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#508---2025-03-02): See the package changelog.
- [@kitschpatrol/prettier-config 5.0.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#508---2025-03-02): See the package changelog.
- [@kitschpatrol/remark-config 5.0.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#508---2025-03-02): See the package changelog.
- [@kitschpatrol/repo-config 5.0.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#508---2025-03-02): See the package changelog.
- [@kitschpatrol/shared-config 5.0.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#508---2025-03-02): See the package changelog.
- [@kitschpatrol/stylelint-config 5.0.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#508---2025-03-02): See the package changelog.
- [@kitschpatrol/typescript-config 5.0.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#508---2025-03-02): See the package changelog.

## [5.0.7] - 2025-03-02

### Changed

- Support Node.js 20.9+ and remove the pnpm engine restriction.
- Adopt updated Svelte lint rules and allow individual tool binaries in Knip.
- [@kitschpatrol/cspell-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#507---2025-03-02): Lower the declared Node.js minimum to 20.9.0 and remove the pnpm engine restriction.
- [@kitschpatrol/eslint-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#507---2025-03-02): Lower the Node.js requirement to 20.9.0 and remove the pnpm engine restriction.
- [@kitschpatrol/eslint-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#507---2025-03-02): Adopt eslint-plugin-svelte 3 and its refreshed recommended rules.
- [@kitschpatrol/knip-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#507---2025-03-02): Lower the declared Node.js minimum to 20.9.0 and remove the pnpm engine restriction.
- [@kitschpatrol/mdat-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#507---2025-03-02): Lower the declared Node.js minimum to 20.9.0 and remove the pnpm engine restriction.
- [@kitschpatrol/repo-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#507---2025-03-02): Support Node.js 20.9 or newer and remove the pnpm engine restriction.
- [@kitschpatrol/shared-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#507---2025-03-02): Lower the declared Node.js minimum to 20.9.0 and remove the pnpm engine requirement.
- [@kitschpatrol/stylelint-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#507---2025-03-02): Allow Node.js 20.9 or newer and remove the pnpm engine restriction.
- [@kitschpatrol/typescript-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#507---2025-03-02): Allow Node.js 20.9 or newer and remove the pnpm engine restriction.

### Fixed

- Exclude ignored dependencies from license-year checks and make distributed commands compatible with Node.js 20.
- [@kitschpatrol/cspell-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#507---2025-03-02): Fix CommonJS dependency loading in the distributed ES module CLI and target its builds at Node.js 20.
- [@kitschpatrol/knip-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#507---2025-03-02): Recognize individual `kpi-*` tool commands as provided binaries.
- [@kitschpatrol/prettier-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#507---2025-03-02): Restore support for Node.js 20.9.0 or later and remove the pnpm engine restriction.
- [@kitschpatrol/remark-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#507---2025-03-02): Restore Node.js 20.9+ support in package requirements and CLI builds, and remove the pnpm engine restriction.
- [@kitschpatrol/repo-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#507---2025-03-02): Replace Node's experimental glob API so copyright checks work on Node.js 20 and respect `.gitignore`, excluding dependency license files.
- [@kitschpatrol/shared-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#507---2025-03-02): Add a CommonJS require shim to the generated CLI for Node.js 20 interoperability.
- [@kitschpatrol/stylelint-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#507---2025-03-02): Build the CLI for Node.js 20 and provide CommonJS `require` support inside its ESM bundle.
- [@kitschpatrol/typescript-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#507---2025-03-02): Build the CLI for Node.js 20 and provide CommonJS `require` support inside its ESM bundle.

### Maintenance

- Refresh dependencies and contributor build tooling.
- [@kitschpatrol/eslint-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#507---2025-03-02): Make preset generation and builds compatible with Node.js 20 and refresh dependencies.
- [@kitschpatrol/knip-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#507---2025-03-02): Retarget CLI builds to Node.js 20 and add CommonJS interoperability to the ESM bundle.
- [@kitschpatrol/mdat-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#507---2025-03-02): Upgrade the MDAT runtime dependency to version 1.0.0.
- [@kitschpatrol/mdat-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#507---2025-03-02): Retarget CLI builds to Node.js 20 and add CommonJS interoperability to the ESM bundle.
- [@kitschpatrol/prettier-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#507---2025-03-02): Update package.json sorting dependencies.
- [@kitschpatrol/remark-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#507---2025-03-02): Upgrade `remark-directive` to version 4.
- [@kitschpatrol/stylelint-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#507---2025-03-02): Update the Stylelint runtime dependency to `^16.15.0`.

### Documentation

- [@kitschpatrol/shared-config 5.0.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#507---2025-03-02): Update installation requirements to describe Node.js 20 support and recommend pnpm.

## [5.0.6] - 2025-02-26

### Changed

- Refresh ESLint rules and permit the `sep` abbreviation.
- [@kitschpatrol/cspell-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#506---2025-02-26): Expand font and technical vocabulary and add a `RealSense` capitalization rule.
- [@kitschpatrol/eslint-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#506---2025-02-26): Refresh React and Unicorn rules and allow the Node.js `sep` abbreviation.

### Fixed

- Avoid false unresolved-import errors for Astro virtual modules and false default-import errors for CommonJS modules.
- [@kitschpatrol/eslint-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#506---2025-02-26): Avoid false import errors for Astro virtual modules and CommonJS default imports.

### Documentation

- Correct the Remark configuration-customization example.
- [@kitschpatrol/remark-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#506---2025-02-26): Correct the non-Git project customization example to use `remarkConfig({ rules })` instead of the removed `overrideRules()` export.
- [@kitschpatrol/shared-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#506---2025-02-26): Correct configuration-location instructions and tool names in the README.
- [@kitschpatrol/typescript-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#506---2025-02-26): Correct the starter tsconfig comment describing dotfiles.

### Maintenance

- Refresh dependencies and reorganize internal utility modules.
- [@kitschpatrol/cspell-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#506---2025-02-26): Update CSpell to 8.17.5, Case Police to 1.0, and Prettier.
- [@kitschpatrol/eslint-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#506---2025-02-26): Refresh linting dependencies and generation tools, including eslint-typegen 2.
- [@kitschpatrol/knip-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#506---2025-02-26): Refresh runtime dependencies, including Knip 5.45.0, deepmerge-ts, and Prettier.
- [@kitschpatrol/mdat-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#506---2025-02-26): Update the Prettier runtime dependency to 3.5.2.
- [@kitschpatrol/prettier-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#506---2025-02-26): Update Prettier, configuration merging, and shell/TOML formatting dependencies.
- [@kitschpatrol/remark-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#506---2025-02-26): Refresh Prettier, remark-gfm, and remark-validate-links runtime dependencies.
- [@kitschpatrol/repo-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#506---2025-02-26): Update the Prettier runtime dependency.
- [@kitschpatrol/shared-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#506---2025-02-26): Update Prettier and refactor internal utility imports.
- [@kitschpatrol/stylelint-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#506---2025-02-26): Update the Prettier runtime dependency to `^3.5.2`.
- [@kitschpatrol/typescript-config 5.0.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#506---2025-02-26): Update the Prettier runtime dependency to `^3.5.2`.

## [5.0.5] - 2025-02-10

### Changed

- **Breaking:** Raise the minimum Node.js version to 22.13.1.
- Require additional package metadata through ESLint.
- **Breaking:** [@kitschpatrol/cspell-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#505---2025-02-10): Raise the minimum Node.js version to 22.13.1.
- [@kitschpatrol/cspell-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#505---2025-02-10): Suppress experimental TypeScript-loading warnings from invoked tools.
- **Breaking:** [@kitschpatrol/eslint-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#505---2025-02-10): Raise the minimum Node.js version to 22.13.1.
- [@kitschpatrol/eslint-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#505---2025-02-10): Require package.json name, author, and keywords through refreshed package linting rules.
- **Breaking:** [@kitschpatrol/knip-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#505---2025-02-10): Raise the minimum Node.js version from 22.0.0 to 22.13.1.
- [@kitschpatrol/knip-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#505---2025-02-10): Enable TypeScript stripping in child tool processes and suppress experimental warnings.
- **Breaking:** [@kitschpatrol/mdat-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#505---2025-02-10): Raise the minimum Node.js version from 22.0.0 to 22.13.1.
- [@kitschpatrol/mdat-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#505---2025-02-10): Enable TypeScript stripping in child tool processes and suppress experimental warnings.
- **Breaking:** [@kitschpatrol/prettier-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#505---2025-02-10): Raise the minimum Node.js version to 22.13.1.
- **Breaking:** [@kitschpatrol/remark-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#505---2025-02-10): Raise the minimum supported Node.js version to 22.13.1.
- **Breaking:** [@kitschpatrol/repo-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#505---2025-02-10): Raise the minimum Node.js version to 22.13.1.
- **Breaking:** [@kitschpatrol/shared-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#505---2025-02-10): Raise the minimum supported Node.js version to 22.13.1.
- [@kitschpatrol/shared-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#505---2025-02-10): Enable native TypeScript configuration loading in spawned commands and suppress its experimental warnings.
- **Breaking:** [@kitschpatrol/stylelint-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#505---2025-02-10): Require Node.js 22.13.1 or newer and enable type stripping when invoking tools that load TypeScript configurations.
- **Breaking:** [@kitschpatrol/typescript-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#505---2025-02-10): Require Node.js 22.13.1 or newer and enable type stripping when invoking tools that load TypeScript configurations.

### Fixed

- Correct reversed repository lint and fix commands so linting does not update license years.
- [@kitschpatrol/repo-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#505---2025-02-10): Make `lint` report copyright-year issues without modifying files, and make `fix` update them.

### Documentation

- Correct the documented order of tool execution.
- [@kitschpatrol/shared-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#505---2025-02-10): Correct the initialization example to show the actual tool execution order.

### Maintenance

- Refresh dependencies, including Prettier 3.5, and adjust child-process Node.js options.
- [@kitschpatrol/cspell-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#505---2025-02-10): Update Prettier to 3.5.0.
- [@kitschpatrol/eslint-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#505---2025-02-10): Refresh ESLint, Vitest, package.json linting, and Prettier dependencies.
- [@kitschpatrol/knip-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#505---2025-02-10): Update the Prettier runtime dependency to 3.5.0.
- [@kitschpatrol/mdat-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#505---2025-02-10): Update the Prettier runtime dependency to 3.5.0.
- [@kitschpatrol/prettier-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#505---2025-02-10): Update Prettier to 3.5.0.
- [@kitschpatrol/remark-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#505---2025-02-10): Update the Prettier runtime dependency to 3.5.
- [@kitschpatrol/repo-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#505---2025-02-10): Update the Prettier runtime dependency.
- [@kitschpatrol/stylelint-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#505---2025-02-10): Update the Prettier runtime dependency to version 3.5.
- [@kitschpatrol/typescript-config 5.0.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#505---2025-02-10): Update the Prettier runtime dependency to version 3.5.

## [5.0.4] - 2025-02-07

### Documentation

- Correct package documentation links and GitHub alert syntax.
- [@kitschpatrol/cspell-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#504---2025-02-07): Correct package homepage/repository links and the installation recommendation's admonition markup.
- [@kitschpatrol/eslint-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#504---2025-02-07): Correct the package repository URL, add its homepage, and fix the README recommendation callout.
- [@kitschpatrol/knip-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#504---2025-02-07): Correct package repository and homepage links and restore the README's important-note rendering.
- [@kitschpatrol/mdat-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#504---2025-02-07): Correct package repository and homepage links and restore the README's important-note rendering.
- [@kitschpatrol/prettier-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#504---2025-02-07): Correct package repository/homepage links and render the README recommendation as a GitHub admonition.
- [@kitschpatrol/repo-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#504---2025-02-07): Correct repository and homepage links in package metadata and the README.
- [@kitschpatrol/shared-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#504---2025-02-07): Fix package README links so they resolve outside the repository.
- [@kitschpatrol/stylelint-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#504---2025-02-07): Correct GitHub alert markup in the usage documentation.
- [@kitschpatrol/typescript-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#504---2025-02-07): Correct GitHub alert markup in the usage documentation.

### Maintenance

- Repair repository URLs and add package homepage metadata.
- [@kitschpatrol/remark-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#504---2025-02-07): Correct the package repository URL and add its package-specific homepage.
- [@kitschpatrol/shared-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#504---2025-02-07): Correct the repository URL and add the package homepage.
- [@kitschpatrol/stylelint-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#504---2025-02-07): Correct repository URLs and add package homepage metadata.
- [@kitschpatrol/typescript-config 5.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#504---2025-02-07): Correct repository URLs and add package homepage metadata.

## [5.0.3] - 2025-02-07

### Fixed

- Use a resolvable mdat import when initializing configuration in `package.json`.
- [@kitschpatrol/mdat-config 5.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#503---2025-02-07): Generate a resolvable Cosmiconfig `$import` when initializing MDAT configuration in `package.json`.

### Maintenance

- [@kitschpatrol/cspell-config 5.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#503---2025-02-07): See the package changelog.
- [@kitschpatrol/eslint-config 5.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#503---2025-02-07): See the package changelog.
- [@kitschpatrol/knip-config 5.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#503---2025-02-07): See the package changelog.
- [@kitschpatrol/prettier-config 5.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#503---2025-02-07): See the package changelog.
- [@kitschpatrol/remark-config 5.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#503---2025-02-07): See the package changelog.
- [@kitschpatrol/repo-config 5.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#503---2025-02-07): See the package changelog.
- [@kitschpatrol/shared-config 5.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#503---2025-02-07): See the package changelog.
- [@kitschpatrol/stylelint-config 5.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#503---2025-02-07): See the package changelog.
- [@kitschpatrol/typescript-config 5.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#503---2025-02-07): See the package changelog.

## [5.0.2] - 2025-02-07

### Changed

- Recognize additional Knip entry paths and suppress configuration hints.
- [@kitschpatrol/knip-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#502---2025-02-07): Suppress Knip configuration hints during linting and automatic cleanup.
- [@kitschpatrol/knip-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#502---2025-02-07): Resume unused-dependency checks for `@kitschpatrol/repo-config` and `@kitschpatrol/typescript-config`.

### Fixed

- Declare the missing workspace-discovery runtime dependency across configuration packages.
- [@kitschpatrol/cspell-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#502---2025-02-07): Declare the missing `find-workspaces` runtime dependency used by shared CLI utilities.
- [@kitschpatrol/eslint-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#502---2025-02-07): Declare the missing `find-workspaces` runtime dependency used by CLI workspace utilities.
- [@kitschpatrol/prettier-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#502---2025-02-07): Declare `find-workspaces` as a runtime dependency so the standalone CLI can resolve its workspace utilities.
- [@kitschpatrol/remark-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#502---2025-02-07): Declare `find-workspaces` as a runtime dependency for configuration and workspace lookup.
- [@kitschpatrol/repo-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#502---2025-02-07): Declare the missing `find-workspaces` runtime dependency required by the CLI.
- [@kitschpatrol/shared-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#502---2025-02-07): Declare the missing `find-workspaces` runtime dependency required by the CLI.
- [@kitschpatrol/stylelint-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#502---2025-02-07): Declare the required `find-workspaces` runtime dependency so standalone CLI installations can start.
- [@kitschpatrol/typescript-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#502---2025-02-07): Declare the required `find-workspaces` runtime dependency so standalone CLI installations can start.

### Added

- [@kitschpatrol/knip-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#502---2025-02-07): Recognize entry points under `src/bin`, `src/lib`, and `src/cli`.

### Maintenance

- [@kitschpatrol/mdat-config 5.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#502---2025-02-07): See the package changelog.

## [5.0.1] - 2025-02-07

### Added

- Allow Remark configuration to be initialized in `package.json`.
- [@kitschpatrol/remark-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#501---2025-02-07): Add `init --location package` to store the Remark configuration in `package.json`, alongside the existing standalone-file mode.

### Changed

- Keep shared tool configuration keys together at the end of `package.json` and format initialized JSON with Prettier.
- [@kitschpatrol/cspell-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#501---2025-02-07): Format merged initialization files using the project's Prettier configuration.
- [@kitschpatrol/eslint-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#501---2025-02-07): Sort shared-config fields at the end of package.json and exempt commented-out `if`/`else` code from capitalization checks.
- [@kitschpatrol/prettier-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#501---2025-02-07): Sort shared-config tool configuration keys at the end of package.json to match ESLint's property order.
- [@kitschpatrol/remark-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#501---2025-02-07): Format configuration JSON written or merged by initialization with Prettier and include Prettier as a runtime dependency.
- [@kitschpatrol/repo-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#501---2025-02-07): Format initialized and merged JSON with Prettier, including the formatter as a runtime dependency.
- [@kitschpatrol/repo-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#501---2025-02-07): Update starter ignores for ESLint's configuration inspector and remove Parcel and tsup cache patterns.
- [@kitschpatrol/shared-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#501---2025-02-07): Include positional arguments and option flags in verbose function execution logs.
- [@kitschpatrol/stylelint-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#501---2025-02-07): Format configuration JSON written or merged by `init` using project Prettier settings.
- [@kitschpatrol/typescript-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#501---2025-02-07): Format configuration JSON written or merged by `init` using project Prettier settings.

### Fixed

- Correct CSpell's initialized filename, preserve package settings while merging initialization fragments, and forward aggregate `init --location` options.
- Restore Knip's default entry points and make Case Police respect CSpell ignore paths.
- [@kitschpatrol/cspell-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#501---2025-02-07): Honor configuration-location choices during initialization, including through the aggregate CLI, and use the correct `cspell.config.js` filename.
- [@kitschpatrol/cspell-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#501---2025-02-07): Apply CSpell's resolved ignore paths to Case Police checks.
- [@kitschpatrol/eslint-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#501---2025-02-07): Merge the Markdown plugin compatibility override into consumer package.json during initialization and format merged JSON with Prettier.
- [@kitschpatrol/knip-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#501---2025-02-07): Restore Knip's standard root and `src` entry points and ignore shared configuration packages to prevent false unused-code and dependency reports.
- [@kitschpatrol/knip-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#501---2025-02-07): Declare the Prettier runtime dependency needed by standalone CLI initialization and format generated JSON configuration.
- [@kitschpatrol/knip-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#501---2025-02-07): Preserve `init --location` when initialization is invoked through the aggregate CLI.
- [@kitschpatrol/mdat-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#501---2025-02-07): Declare the Prettier runtime dependency needed by standalone CLI initialization and format generated JSON configuration.
- [@kitschpatrol/mdat-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#501---2025-02-07): Preserve `init --location` when initialization is invoked through the aggregate CLI.
- [@kitschpatrol/prettier-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#501---2025-02-07): Honor initialization storage options and format copied or merged configuration files with Prettier.
- [@kitschpatrol/shared-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#501---2025-02-07): Forward `init --location` to tool initializers and tolerate packages without starter files.
- [@kitschpatrol/shared-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#501---2025-02-07): Merge starter package.json settings instead of overwriting existing metadata and overrides, and format merged JSON with Prettier.
- [@kitschpatrol/stylelint-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#501---2025-02-07): Honor `init --location` when initialization is invoked through the aggregate `kpi` command.

### Maintenance

- Declare Prettier for initialization formatting and update dependencies.
- [@kitschpatrol/eslint-config 5.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#501---2025-02-07): Commit generated rule types, simplify rule regeneration, and update runtime dependencies.

## [5.0.0] - 2025-02-06

### Added

- Integrate Knip, TypeScript checking, Case Police, unused CSpell-word detection, and copyright-year validation into the tool suite.
- Provide typed configuration factories and initialize supported tool settings in `package.json` with `--location package`.
- [@kitschpatrol/cspell-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#500---2025-02-06): Export a typed `cspellConfig()` factory for project-specific configuration.
- [@kitschpatrol/cspell-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#500---2025-02-06): Add `init --location file|package` to select a configuration file or a `package.json` configuration key.
- [@kitschpatrol/cspell-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#500---2025-02-06): Report unused entries in the local configuration's `words` array during linting.
- [@kitschpatrol/eslint-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#500---2025-02-06): Export a typed `eslintConfig()` factory, individual language/framework configurations, glob constants, and utilities for composing flat configs.
- [@kitschpatrol/eslint-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#500---2025-02-06): Add JSON/JSONC/JSON5, package.json, YAML, TOML, and React rule sets, with automatic framework detection and `.gitignore` support.
- [@kitschpatrol/knip-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#500---2025-02-06): Provide a default Knip preset and typed `knipConfig()` factory that deep-merges customizations with script and tool-configuration entry points.
- [@kitschpatrol/knip-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#500---2025-02-06): Provide workspace-aware `kpi-knip lint`, `fix`, and `print-config` commands for unused-code checks, automatic cleanup, and effective configuration output.
- [@kitschpatrol/knip-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/knip-config/changelog.md#500---2025-02-06): Initialize `knip.config.ts` or a `knip` field in `package.json` with `init --location file|package`, removing the alternative configuration.
- [@kitschpatrol/mdat-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#500---2025-02-06): Export a typed `mdatConfig()` factory that merges customizations with the shared configuration.
- [@kitschpatrol/mdat-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#500---2025-02-06): Support `init --location file|package` to write `mdat.config.ts` or package.json configuration and remove the alternative.
- [@kitschpatrol/prettier-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#500---2025-02-06): Add the typed `prettierConfig` factory for merging shared defaults with custom configuration.
- [@kitschpatrol/prettier-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#500---2025-02-06): Support `init --location file|package` to store configuration in `prettier.config.js` or package.json.
- [@kitschpatrol/remark-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#500---2025-02-06): Add a typed `remarkConfig()` factory for extending plugins, overriding rule options, and customizing serialization settings.
- [@kitschpatrol/repo-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#500---2025-02-06): Add repository `lint` and `fix` operations for detecting and updating outdated copyright years in license files.
- [@kitschpatrol/shared-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#500---2025-02-06): Integrate Knip for detecting unused files, exports, and dependencies.
- [@kitschpatrol/shared-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#500---2025-02-06): Integrate TypeScript checking and a shared tsconfig into the aggregate toolchain.
- [@kitschpatrol/shared-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#500---2025-02-06): Add `init --location file|package` to select standalone configuration files or package.json settings.
- [@kitschpatrol/stylelint-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#500---2025-02-06): Export a typed `stylelintConfig()` factory for customizing the shared configuration.
- [@kitschpatrol/stylelint-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#500---2025-02-06): Add `init --location file|package` to choose between a configuration file and a `package.json` entry.
- [@kitschpatrol/typescript-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#500---2025-02-06): Publish an extendable TypeScript configuration with strict and unused-code checks, ES2023/DOM libraries, React JSX, bundler resolution, JavaScript checking, and no-emit defaults.
- [@kitschpatrol/typescript-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#500---2025-02-06): Provide `kpi-typescript init`, `lint`, and `print-config` commands to install starter files, run `tsc --noEmit`, and display the effective compiler configuration.
- [@kitschpatrol/typescript-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/typescript-config/changelog.md#500---2025-02-06): Include starter `tsconfig.json` and `tsconfig.build.json` files plus VS Code settings that select the workspace TypeScript installation.

### Changed

- **Breaking:** Replace command names with `kpi` and `kpi-*`, using `init`, `lint`, `fix`, and `print-config` subcommands.
- **Breaking:** Migrate ESLint to ESLint 9 flat configurations with expanded framework and file-format support.
- **Breaking:** Require Node.js 22+ and pnpm 10+.
- **Breaking:** [@kitschpatrol/eslint-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#500---2025-02-06): Migrate from the CommonJS ESLint 8 config to an ESM ESLint 9 flat config initialized as `eslint.config.ts`.
- **Breaking:** [@kitschpatrol/mdat-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#500---2025-02-06): Replace `mdat-config` flag-based commands with the `kpi-mdat lint`, `fix`, `init`, and `print-config` subcommands.
- **Breaking:** [@kitschpatrol/prettier-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#500---2025-02-06): Replace the `prettier-config` executable and mode flags with `kpi-prettier` subcommands: `init`, `lint`, `fix`, and `print-config`.
- **Breaking:** [@kitschpatrol/remark-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#500---2025-02-06): Replace the `remark-config` executable and flag-based commands with `kpi-remark init` and `kpi-remark print-config` subcommands.
- **Breaking:** [@kitschpatrol/remark-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#500---2025-02-06): Require Node.js 22+ and declare pnpm 10+ as the supported package-manager version.
- **Breaking:** [@kitschpatrol/repo-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#500---2025-02-06): Rename the executable from `repo-config` to `kpi-repo` and replace operation flags with subcommands.
- **Breaking:** [@kitschpatrol/repo-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#500---2025-02-06): Require Node.js 22 or newer and pnpm 10 or newer.
- **Breaking:** [@kitschpatrol/stylelint-config 5.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#500---2025-02-06): Replace the `stylelint-config` executable and action flags with `kpi-stylelint` subcommands: `init`, `lint`, `fix`, and `print-config`.

### Removed

- **Breaking:** Remove the exported Remark `overrideRules` helper; customize rules through `remarkConfig`.

### Documentation

- Rewrite setup, customization, CLI, and workspace guidance for the new interfaces.

### Maintenance

- Add end-to-end CLI tests, refresh dependencies, and replace capability scraping with shared command definitions and ordered execution.

## [4.7.12] - 2024-11-08

### Maintenance

- Refresh CSpell, ESLint, mdat, Stylelint, and contributor tooling dependencies.
- [@kitschpatrol/cspell-config 4.7.12](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#4712---2024-11-08): Update the CSpell peer requirement to `^8.16.0`.
- [@kitschpatrol/eslint-config 4.7.12](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#4712---2024-11-08): Refresh Astro, JSX accessibility, Node, Perfectionist, and Svelte linting dependencies.
- [@kitschpatrol/mdat-config 4.7.12](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#4712---2024-11-08): Update the MDAT peer dependency to `^0.8.0`.
- [@kitschpatrol/prettier-config 4.7.12](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#4712---2024-11-08): See the package changelog.
- [@kitschpatrol/remark-config 4.7.12](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#4712---2024-11-08): Update `remark-validate-links` to 13.0.2.
- [@kitschpatrol/repo-config 4.7.12](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#4712---2024-11-08): See the package changelog.
- [@kitschpatrol/shared-config 4.7.12](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#4712---2024-11-08): See the package changelog.
- [@kitschpatrol/stylelint-config 4.7.12](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#4712---2024-11-08): Update the Stylelint peer dependency to `^16.10.0`.

## [4.7.11] - 2024-09-28

### Fixed

- Update mdat to resolve errors during Markdown processing.
- [@kitschpatrol/mdat-config 4.7.11](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#4711---2024-09-28): Resolve MDAT errors by updating its peer requirement to `^0.7.6`.

### Maintenance

- Refresh linting, formatting, and release-tool dependencies.
- [@kitschpatrol/cspell-config 4.7.11](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#4711---2024-09-28): Update the CSpell peer requirement to `^8.14.4`.
- [@kitschpatrol/eslint-config 4.7.11](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#4711---2024-09-28): Refresh HTML, Node, Perfectionist, and Svelte linting dependencies.
- [@kitschpatrol/prettier-config 4.7.11](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#4711---2024-09-28): Update Svelte and Tailwind formatting plugins.
- [@kitschpatrol/remark-config 4.7.11](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#4711---2024-09-28): See the package changelog.
- [@kitschpatrol/repo-config 4.7.11](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#4711---2024-09-28): See the package changelog.
- [@kitschpatrol/shared-config 4.7.11](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#4711---2024-09-28): See the package changelog.
- [@kitschpatrol/stylelint-config 4.7.11](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#4711---2024-09-28): Update the Stylelint peer dependency to `^16.9.0`.

### Changed

- **Breaking:** [@kitschpatrol/eslint-config 4.7.11](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#4711---2024-09-28): Require ESLint 8.57.1 or later within ESLint 8.
- **Breaking:** [@kitschpatrol/prettier-config 4.7.11](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#4711---2024-09-28): Raise the Prettier peer requirement to `^3.3.3`.

## [4.7.10] - 2024-09-15

### Maintenance

- Correct release build ordering and refresh ESLint plugins and contributor Node.js types.
- [@kitschpatrol/cspell-config 4.7.10](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#4710---2024-09-15): See the package changelog.
- [@kitschpatrol/eslint-config 4.7.10](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#4710---2024-09-15): Refresh Astro, Perfectionist, and Svelte linting dependencies.
- [@kitschpatrol/mdat-config 4.7.10](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#4710---2024-09-15): See the package changelog.
- [@kitschpatrol/prettier-config 4.7.10](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#4710---2024-09-15): See the package changelog.
- [@kitschpatrol/remark-config 4.7.10](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#4710---2024-09-15): See the package changelog.
- [@kitschpatrol/repo-config 4.7.10](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#4710---2024-09-15): See the package changelog.
- [@kitschpatrol/shared-config 4.7.10](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#4710---2024-09-15): See the package changelog.
- [@kitschpatrol/stylelint-config 4.7.10](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#4710---2024-09-15): See the package changelog.

## [4.7.9] - 2024-09-14

### Maintenance

- Separate README copying and formatting from package builds and repair release build sequencing.
- [@kitschpatrol/cspell-config 4.7.9](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#479---2024-09-14): See the package changelog.
- [@kitschpatrol/eslint-config 4.7.9](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#479---2024-09-14): See the package changelog.
- [@kitschpatrol/mdat-config 4.7.9](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#479---2024-09-14): See the package changelog.
- [@kitschpatrol/prettier-config 4.7.9](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#479---2024-09-14): See the package changelog.
- [@kitschpatrol/remark-config 4.7.9](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#479---2024-09-14): See the package changelog.
- [@kitschpatrol/repo-config 4.7.9](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#479---2024-09-14): See the package changelog.
- [@kitschpatrol/shared-config 4.7.9](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#479---2024-09-14): See the package changelog.
- [@kitschpatrol/stylelint-config 4.7.9](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#479---2024-09-14): See the package changelog.

## [4.7.8] - 2024-09-14

### Maintenance

- Remove the additional build invocation from the release command.
- [@kitschpatrol/cspell-config 4.7.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#478---2024-09-14): See the package changelog.
- [@kitschpatrol/eslint-config 4.7.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#478---2024-09-14): See the package changelog.
- [@kitschpatrol/mdat-config 4.7.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#478---2024-09-14): See the package changelog.
- [@kitschpatrol/prettier-config 4.7.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#478---2024-09-14): See the package changelog.
- [@kitschpatrol/remark-config 4.7.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#478---2024-09-14): See the package changelog.
- [@kitschpatrol/repo-config 4.7.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#478---2024-09-14): See the package changelog.
- [@kitschpatrol/shared-config 4.7.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#478---2024-09-14): See the package changelog.
- [@kitschpatrol/stylelint-config 4.7.8](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#478---2024-09-14): See the package changelog.

## [4.7.7] - 2024-09-14

### Changed

- Expand CSpell dictionaries.
- [@kitschpatrol/cspell-config 4.7.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#477---2024-09-14): Recognize `SXSW`, `outlers`, `datahub`, and `pytest`.

### Documentation

- Explain tab-versus-space formatting choices.
- [@kitschpatrol/prettier-config 4.7.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#477---2024-09-14): Explain the tabs-versus-spaces policy and the exceptions for YAML, Markdown, and MDX.

### Maintenance

- Clean up package metadata and revise local cleanup and publishing scripts.
- [@kitschpatrol/cspell-config 4.7.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#477---2024-09-14): Standardize repository and issue-tracker package metadata.
- [@kitschpatrol/eslint-config 4.7.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#477---2024-09-14): Clean up repository and issue-tracker metadata in the package manifest.
- [@kitschpatrol/mdat-config 4.7.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#477---2024-09-14): Standardize package repository and issue-tracker metadata.
- [@kitschpatrol/prettier-config 4.7.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#477---2024-09-14): Normalize package repository and issue metadata.
- [@kitschpatrol/remark-config 4.7.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#477---2024-09-14): Normalize package repository and issue-tracker metadata.
- [@kitschpatrol/repo-config 4.7.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#477---2024-09-14): Clean up package repository and issue-tracker metadata.
- [@kitschpatrol/shared-config 4.7.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#477---2024-09-14): Refresh package metadata and allow cleanup to continue after CLI placeholder restoration errors.
- [@kitschpatrol/stylelint-config 4.7.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#477---2024-09-14): Normalize repository and issue-tracker package metadata.

## [4.7.6] - 2024-09-13

### Changed

- Allow camelCase exported constants and exclude Parcel caches from generated ignore files.
- Expand CSpell dictionaries.
- [@kitschpatrol/cspell-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#476---2024-09-13): Expand and correct custom dictionaries with additional names, brands, acronyms, and technical vocabulary.
- [@kitschpatrol/eslint-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#476---2024-09-13): Exclude Parcel's cache in initialized projects.
- [@kitschpatrol/prettier-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#476---2024-09-13): Exclude Parcel's cache directory in the starter ignore file.
- [@kitschpatrol/repo-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#476---2024-09-13): Ignore Parcel's cache in the starter `.gitignore`.

### Maintenance

- Refresh dependencies and format generated documentation during builds.
- [@kitschpatrol/cspell-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#476---2024-09-13): Run README generation through pnpm.
- [@kitschpatrol/eslint-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#476---2024-09-13): Update Perfectionist and invoke README generation through pnpm during builds.
- [@kitschpatrol/mdat-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#476---2024-09-13): Invoke MDAT through pnpm during package builds.
- [@kitschpatrol/prettier-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#476---2024-09-13): Resolve the documentation generator through pnpm during package builds.
- [@kitschpatrol/remark-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#476---2024-09-13): Invoke README generation through pnpm and format generated output during the shared build.
- [@kitschpatrol/repo-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#476---2024-09-13): Invoke mdat through pnpm when building the package.
- [@kitschpatrol/shared-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#476---2024-09-13): Run README generation through pnpm during package builds.
- [@kitschpatrol/stylelint-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#476---2024-09-13): Run README generation through the workspace formatting workflow during package builds.

### Fixed

- [@kitschpatrol/eslint-config 4.7.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#476---2024-09-13): Allow camelCase exported constants alongside UPPER_CASE names.

## [4.7.5] - 2024-09-07

### Changed

- Expand spelling dictionaries and exclude additional audio and video formats from CSpell.
- [@kitschpatrol/cspell-config 4.7.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#475---2024-09-07): Expand custom dictionaries and exclude additional audio/video formats from spell checking.

### Maintenance

- Add dictionary sorting and duplicate-word checks.
- [@kitschpatrol/cspell-config 4.7.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#475---2024-09-07): Add dictionary sorting and duplicate-detection scripts.
- [@kitschpatrol/eslint-config 4.7.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#475---2024-09-07): See the package changelog.
- [@kitschpatrol/mdat-config 4.7.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#475---2024-09-07): See the package changelog.
- [@kitschpatrol/prettier-config 4.7.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#475---2024-09-07): See the package changelog.
- [@kitschpatrol/remark-config 4.7.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#475---2024-09-07): See the package changelog.
- [@kitschpatrol/repo-config 4.7.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#475---2024-09-07): See the package changelog.
- [@kitschpatrol/shared-config 4.7.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#475---2024-09-07): See the package changelog.
- [@kitschpatrol/stylelint-config 4.7.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#475---2024-09-07): See the package changelog.

## [4.7.4] - 2024-09-07

### Fixed

- Stop CSpell from traversing hidden folders by default.
- [@kitschpatrol/cspell-config 4.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#474---2024-09-07): Disable hidden-file and hidden-directory globbing during spell checking.

### Maintenance

- [@kitschpatrol/eslint-config 4.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#474---2024-09-07): See the package changelog.
- [@kitschpatrol/mdat-config 4.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#474---2024-09-07): See the package changelog.
- [@kitschpatrol/prettier-config 4.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#474---2024-09-07): See the package changelog.
- [@kitschpatrol/remark-config 4.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#474---2024-09-07): See the package changelog.
- [@kitschpatrol/repo-config 4.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#474---2024-09-07): See the package changelog.
- [@kitschpatrol/shared-config 4.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#474---2024-09-07): See the package changelog.
- [@kitschpatrol/stylelint-config 4.7.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#474---2024-09-07): See the package changelog.

## [4.7.3] - 2024-09-07

### Changed

- Allow uppercase exported constants in ESLint naming rules.
- Add a file-extension dictionary and expand CSpell handling of media files, Markdown math, identifiers, and hidden paths.
- [@kitschpatrol/cspell-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#473---2024-09-07): Expand dictionaries and default exclusions, including additional media formats and patch files.
- [@kitschpatrol/cspell-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#473---2024-09-07): Exclude MathJax expressions and long uppercase identifiers in Markdown, MDX, and JSON; enable hidden-file globbing.
- [@kitschpatrol/eslint-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#473---2024-09-07): Allow UPPER_CASE exported constants.
- [@kitschpatrol/repo-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#473---2024-09-07): Stop nesting CODEOWNERS files beneath the README in the starter VS Code settings.

### Maintenance

- Refresh dependencies, migrate Perfectionist's legacy configuration, and improve cleanup scripts.
- [@kitschpatrol/eslint-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#473---2024-09-07): Refresh linting dependencies, including Perfectionist 3 and XO TypeScript 5.
- [@kitschpatrol/mdat-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#473---2024-09-07): See the package changelog.
- [@kitschpatrol/prettier-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#473---2024-09-07): Refresh Astro, SQL, Svelte, and Tailwind formatting plugins.
- [@kitschpatrol/remark-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#473---2024-09-07): See the package changelog.
- [@kitschpatrol/shared-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#473---2024-09-07): Update the globby development dependency.
- [@kitschpatrol/stylelint-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#473---2024-09-07): Refresh the standard and property-ordering Stylelint presets.

### Added

- [@kitschpatrol/cspell-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#473---2024-09-07): Add the `kp-files` dictionary for file extensions and formats.

### Fixed

- [@kitschpatrol/eslint-config 4.7.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#473---2024-09-07): Use Perfectionist 3's legacy preset and current import-sorting options.

## [4.7.2] - 2024-06-14

### Documentation

- Correct generated CLI help tables and add Remark override examples.
- [@kitschpatrol/mdat-config 4.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#472---2024-06-14): Refresh generated CLI help with MDAT 0.7.1 to display short aliases alongside their long options.
- [@kitschpatrol/remark-config 4.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#472---2024-06-14): Expand starter rule-override examples to show disabling repository-based link validation.

### Maintenance

- Allow manual metadata-workflow runs and refresh mdat and other dependencies.
- [@kitschpatrol/cspell-config 4.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#472---2024-06-14): See the package changelog.
- [@kitschpatrol/eslint-config 4.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#472---2024-06-14): See the package changelog.
- [@kitschpatrol/prettier-config 4.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#472---2024-06-14): See the package changelog.
- [@kitschpatrol/repo-config 4.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#472---2024-06-14): Allow the metadata synchronization workflow to be triggered manually.
- [@kitschpatrol/shared-config 4.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#472---2024-06-14): See the package changelog.
- [@kitschpatrol/stylelint-config 4.7.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#472---2024-06-14): See the package changelog.

## [4.7.1] - 2024-06-09

### Documentation

- Clarify repository setup and document forked GitHub Actions.
- [@kitschpatrol/repo-config 4.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#471---2024-06-09): Clarify installation ordering and document the GitHub Actions forks used by the starter workflows.

### Maintenance

- Switch release and metadata workflows to project forks and correct an aggregate CLI type error.
- [@kitschpatrol/cspell-config 4.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#471---2024-06-09): See the package changelog.
- [@kitschpatrol/eslint-config 4.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#471---2024-06-09): See the package changelog.
- [@kitschpatrol/mdat-config 4.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#471---2024-06-09): See the package changelog.
- [@kitschpatrol/prettier-config 4.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#471---2024-06-09): See the package changelog.
- [@kitschpatrol/remark-config 4.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#471---2024-06-09): See the package changelog.
- [@kitschpatrol/repo-config 4.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#471---2024-06-09): Switch release, changelog, and metadata synchronization workflows to the kitschpatrol action forks.
- [@kitschpatrol/shared-config 4.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#471---2024-06-09): Correct TypeScript indexing of generated CLI capabilities.
- [@kitschpatrol/stylelint-config 4.7.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#471---2024-06-09): See the package changelog.

## [4.7.0] - 2024-06-07

### Added

- Include a starter `tsconfig.json` with ESLint initialization.
- [@kitschpatrol/eslint-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#470---2024-06-07): Include a starter `tsconfig.json` and broaden the ESLint tsconfig to cover project configuration files.

### Changed

- Include configuration dotfiles in ESLint's TypeScript project while excluding build output.
- [@kitschpatrol/cspell-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#470---2024-06-07): Recognize `hashbang` in the technical dictionary.
- **Breaking:** [@kitschpatrol/prettier-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#470---2024-06-07): Raise the Prettier peer requirement to `^3.3.1`.

### Documentation

- Explain generated TypeScript configuration files.
- [@kitschpatrol/eslint-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#470---2024-06-07): Explain the TypeScript configuration files installed during initialization.

### Maintenance

- Refresh linting and formatting dependencies and update the GitHub release action.
- [@kitschpatrol/eslint-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#470---2024-06-07): Refresh linting dependencies, including Astro parser/plugin 1, eslint-plugin-n 17, and Unicorn 53.
- [@kitschpatrol/mdat-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#470---2024-06-07): Update the MDAT peer dependency to `^0.7.0`.
- [@kitschpatrol/prettier-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#470---2024-06-07): Update Astro, Svelte, and Tailwind formatting plugins.
- [@kitschpatrol/remark-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#470---2024-06-07): See the package changelog.
- [@kitschpatrol/repo-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#470---2024-06-07): Upgrade the starter release workflow to `softprops/action-gh-release` v2.
- [@kitschpatrol/shared-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#470---2024-06-07): See the package changelog.
- [@kitschpatrol/stylelint-config 4.7.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#470---2024-06-07): Upgrade `stylelint-config-clean-order` to version 6.

## [4.6.7] - 2024-06-05

### Changed

- Add editable word and ignore-path lists to starter CSpell configuration and skip Apple application and script files.
- [@kitschpatrol/cspell-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#467---2024-06-05): Include editable `words` and `ignorePaths` arrays in starter configurations.
- [@kitschpatrol/cspell-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#467---2024-06-05): Exclude Apple application/script files and recognize `scpt`.
- **Breaking:** [@kitschpatrol/prettier-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#467---2024-06-05): Raise the Prettier peer requirement to `^3.3.0`.

### Maintenance

- Refresh tool and contributor dependencies and migrate README templates to atomic mdat directives.
- [@kitschpatrol/cspell-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#467---2024-06-05): Update the CSpell peer requirement to `^8.8.4`.
- [@kitschpatrol/eslint-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#467---2024-06-05): Update typescript-eslint dependencies and reorganize mdat README templates.
- [@kitschpatrol/mdat-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#467---2024-06-05): Update the MDAT peer dependency to `^0.6.15` and use separate README template directives for title, badges, and description.
- [@kitschpatrol/prettier-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#467---2024-06-05): Refine README generation using separate metadata templates.
- [@kitschpatrol/remark-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#467---2024-06-05): Migrate README generation to separate mdat title, badge, and description directives and refresh the associated build tooling.
- [@kitschpatrol/repo-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#467---2024-06-05): Migrate README generation from mdat's combined header directive to separate title, badge, and description directives.
- [@kitschpatrol/shared-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#467---2024-06-05): Migrate README generation to separate mdat title, badge, and description directives.
- [@kitschpatrol/stylelint-config 4.6.7](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#467---2024-06-05): Update the Stylelint peer dependency to `^16.6.1` and migrate README generation to individual template directives.

## [4.6.6] - 2024-05-20

### Fixed

- Resolve mdat integration errors by updating its peer dependency requirement to 0.6.12.
- [@kitschpatrol/mdat-config 4.6.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#466---2024-05-20): Resolve MDAT compatibility issues by updating its peer requirement to `^0.6.12`.

### Documentation

- [@kitschpatrol/shared-config 4.6.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#466---2024-05-20): Add eslint-config-current-thing to the related-project references.

### Maintenance

- [@kitschpatrol/cspell-config 4.6.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#466---2024-05-20): See the package changelog.
- [@kitschpatrol/eslint-config 4.6.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#466---2024-05-20): See the package changelog.
- [@kitschpatrol/prettier-config 4.6.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#466---2024-05-20): See the package changelog.
- [@kitschpatrol/remark-config 4.6.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#466---2024-05-20): See the package changelog.
- [@kitschpatrol/repo-config 4.6.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#466---2024-05-20): See the package changelog.
- [@kitschpatrol/stylelint-config 4.6.6](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#466---2024-05-20): See the package changelog.

## [4.6.5] - 2024-05-19

### Changed

- Expand custom spelling dictionaries.
- [@kitschpatrol/cspell-config 4.6.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#465---2024-05-19): Expand the dictionaries with file formats, technical vocabulary, brands, names, and acronyms.

### Maintenance

- Update CSpell, mdat, and Stylelint peer dependency requirements.
- [@kitschpatrol/cspell-config 4.6.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#465---2024-05-19): Update the CSpell peer requirement to `^8.8.1`.
- [@kitschpatrol/eslint-config 4.6.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#465---2024-05-19): See the package changelog.
- [@kitschpatrol/mdat-config 4.6.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#465---2024-05-19): Update the MDAT peer dependency to `^0.6.11`.
- [@kitschpatrol/prettier-config 4.6.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#465---2024-05-19): See the package changelog.
- [@kitschpatrol/remark-config 4.6.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#465---2024-05-19): See the package changelog.
- [@kitschpatrol/repo-config 4.6.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#465---2024-05-19): See the package changelog.
- [@kitschpatrol/shared-config 4.6.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#465---2024-05-19): See the package changelog.
- [@kitschpatrol/stylelint-config 4.6.5](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#465---2024-05-19): Update the Stylelint peer dependency to `^16.5.0`.

## [4.6.4] - 2024-05-19

### Changed

- Expand VS Code nesting for configuration, workspace, deployment, and documentation files.
- [@kitschpatrol/repo-config 4.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#464---2024-05-19): Expand VS Code file nesting for configuration, workspace, lock, and project documentation files.

### Documentation

- Add another related shared-configuration project.

### Maintenance

- Upgrade remark-lint and its rules, refresh linting dependencies, and move contributor tooling to pnpm 9.
- [@kitschpatrol/cspell-config 4.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#464---2024-05-19): See the package changelog.
- [@kitschpatrol/eslint-config 4.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#464---2024-05-19): Refresh TypeScript, HTML, Perfectionist, and Svelte linting dependencies.
- [@kitschpatrol/mdat-config 4.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#464---2024-05-19): See the package changelog.
- [@kitschpatrol/prettier-config 4.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#464---2024-05-19): See the package changelog.
- [@kitschpatrol/remark-config 4.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#464---2024-05-19): Upgrade remark-lint to version 10 and refresh its rule plugins and the Remark CLI dependency.
- [@kitschpatrol/shared-config 4.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#464---2024-05-19): See the package changelog.
- [@kitschpatrol/stylelint-config 4.6.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#464---2024-05-19): See the package changelog.

## [4.6.3] - 2024-04-18

### Changed

- Expand CSpell dictionaries.
- [@kitschpatrol/cspell-config 4.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#463---2024-04-18): Recognize `ABFR`, `emaculation`, and `mailarchiver`.

### Maintenance

- Refresh ESLint, Prettier, Remark, and contributor tooling dependencies.
- [@kitschpatrol/eslint-config 4.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#463---2024-04-18): Refresh TypeScript, HTML, Perfectionist, and Svelte linting dependencies.
- [@kitschpatrol/mdat-config 4.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#463---2024-04-18): See the package changelog.
- [@kitschpatrol/prettier-config 4.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#463---2024-04-18): Update Svelte and Tailwind formatting plugins.
- [@kitschpatrol/remark-config 4.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#463---2024-04-18): Update `remark-validate-links` to 13.0.1.
- [@kitschpatrol/repo-config 4.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#463---2024-04-18): See the package changelog.
- [@kitschpatrol/shared-config 4.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#463---2024-04-18): See the package changelog.
- [@kitschpatrol/stylelint-config 4.6.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#463---2024-04-18): See the package changelog.

## [4.6.2] - 2024-04-08

### Changed

- Expand CSpell vocabulary and constrain the ESLint peer dependency to supported ESLint 8 releases.
- [@kitschpatrol/cspell-config 4.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#462---2024-04-08): Expand the custom dictionaries with additional names, food, brands, and technical vocabulary.

### Documentation

- Explain disabling Git-based Remark link validation in projects without a repository.
- [@kitschpatrol/remark-config 4.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#462---2024-04-08): Document disabling repository-based link validation with `repository: false` for projects outside Git repositories.

### Maintenance

- Refresh linting and formatting dependencies and update contributor TypeScript to 5.4.
- [@kitschpatrol/eslint-config 4.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#462---2024-04-08): Refresh HTML, TypeScript, Perfectionist, and Svelte dependencies.
- [@kitschpatrol/mdat-config 4.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#462---2024-04-08): See the package changelog.
- [@kitschpatrol/prettier-config 4.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#462---2024-04-08): Update XML and Tailwind formatting plugins.
- [@kitschpatrol/repo-config 4.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#462---2024-04-08): See the package changelog.
- [@kitschpatrol/shared-config 4.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#462---2024-04-08): See the package changelog.
- [@kitschpatrol/stylelint-config 4.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#462---2024-04-08): Update `stylelint-config-clean-order` to `^5.4.2`.

### Fixed

- [@kitschpatrol/eslint-config 4.6.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#462---2024-04-08): Restrict the ESLint peer dependency to version 8 to avoid unsupported ESLint 9 installations.

## [4.6.1] - 2024-03-17

### Changed

- Expand and correct custom CSpell dictionaries.
- [@kitschpatrol/cspell-config 4.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#461---2024-03-17): Expand and reorganize the custom dictionaries with additional acronyms, brands, names, and technical vocabulary.

### Documentation

- Replace lingering markdownlint references with Remark.
- [@kitschpatrol/shared-config 4.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#461---2024-03-17): Replace obsolete Markdownlint references with remark in the hoisting guidance.

### Maintenance

- Remove obsolete markdownlint setup and update pnpm.
- [@kitschpatrol/eslint-config 4.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#461---2024-03-17): See the package changelog.
- [@kitschpatrol/mdat-config 4.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#461---2024-03-17): See the package changelog.
- [@kitschpatrol/prettier-config 4.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#461---2024-03-17): See the package changelog.
- [@kitschpatrol/remark-config 4.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#461---2024-03-17): See the package changelog.
- [@kitschpatrol/repo-config 4.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#461---2024-03-17): See the package changelog.
- [@kitschpatrol/stylelint-config 4.6.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#461---2024-03-17): See the package changelog.

## [4.6.0] - 2024-03-17

### Changed

- Organize CSpell vocabulary into selectable dictionaries, enable additional bundled dictionaries, and ignore fenced Markdown code.
- [@kitschpatrol/cspell-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#460---2024-03-17): Enable additional bundled CSpell dictionaries and expand the shared vocabulary.
- [@kitschpatrol/cspell-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#460---2024-03-17): Ignore fenced Markdown/MDX code blocks and generated `v2_c_` identifiers.
- **Breaking:** [@kitschpatrol/eslint-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#460---2024-03-17): Raise the minimum ESLint peer version to 8.57.0.
- **Breaking:** [@kitschpatrol/prettier-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#460---2024-03-17): Raise the Prettier peer requirement to `^3.2.5`.

### Documentation

- Explain CSpell dictionary customization and clarify Remark invocation.
- [@kitschpatrol/remark-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#460---2024-03-17): Explain the ESLint/MDX bridge used by editor integration and correct the direct Remark command example to use `pnpm`.

### Maintenance

- Refresh linting and formatting dependencies, pin contributor TypeScript to 5.3, and update GitHub workflows.
- [@kitschpatrol/eslint-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#460---2024-03-17): Refresh HTML, TypeScript, XO, and Perfectionist linting dependencies.
- [@kitschpatrol/mdat-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#460---2024-03-17): Update the MDAT peer dependency to `^0.6.8`.
- [@kitschpatrol/prettier-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#460---2024-03-17): Update the Tailwind formatting plugin.
- [@kitschpatrol/remark-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#460---2024-03-17): Refresh shared build and release tooling while retaining TypeScript 5.3 for the existing Svelte compatibility constraint.
- [@kitschpatrol/repo-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#460---2024-03-17): See the package changelog.
- [@kitschpatrol/shared-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#460---2024-03-17): See the package changelog.
- [@kitschpatrol/stylelint-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#460---2024-03-17): Update the Stylelint peer dependency to `^16.2.1`.

### Added

- [@kitschpatrol/cspell-config 4.6.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#460---2024-03-17): Provide five separately configurable dictionaries for acronyms, brands, miscellaneous vocabulary, names, and technical terms.

## [4.5.0] - 2024-02-29

### Documentation

- Clarify package responsibilities and GitHub workflow permissions.
- [@kitschpatrol/cspell-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#450---2024-02-29): Correct CSpell naming in the package overview and CLI reference.
- [@kitschpatrol/eslint-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#450---2024-02-29): Clarify the package description in the README and CLI reference.
- [@kitschpatrol/mdat-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#450---2024-02-29): Clarify the package overview and expand MDAT as Markdown Autophagic Template.
- [@kitschpatrol/prettier-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#450---2024-02-29): Standardize the package description in the README and CLI reference.
- [@kitschpatrol/remark-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#450---2024-02-29): Clarify the package and CLI descriptions as Markdown and MDX linting for shared-config.
- [@kitschpatrol/repo-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#450---2024-02-29): Document metadata synchronization and the personal access token permissions required by the starter workflows.
- [@kitschpatrol/shared-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#450---2024-02-29): Clarify the aggregate package's relationship to tool-specific packages and how commands are forwarded.

### Maintenance

- Add repository-metadata synchronization, update and pin release-action dependencies, and refresh package metadata and dependencies.
- [@kitschpatrol/cspell-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#450---2024-02-29): Standardize the package description and npm discovery keywords.
- [@kitschpatrol/eslint-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#450---2024-02-29): Update XO TypeScript rules and add package discovery keywords.
- [@kitschpatrol/mdat-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#450---2024-02-29): Update the MDAT peer dependency to `^0.6.6` and standardize package metadata and keywords.
- [@kitschpatrol/prettier-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#450---2024-02-29): Add package discovery keywords.
- [@kitschpatrol/remark-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#450---2024-02-29): Add package discovery keywords.
- [@kitschpatrol/repo-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#450---2024-02-29): Add a workflow that synchronizes GitHub repository metadata from `package.json`.
- [@kitschpatrol/repo-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#450---2024-02-29): Upgrade release workflow checkout to v4 and pin the changelog action revision.
- [@kitschpatrol/shared-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#450---2024-02-29): Add consistent package descriptions and discovery keywords.
- [@kitschpatrol/stylelint-config 4.5.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#450---2024-02-29): Add package discovery keywords and standardize package metadata.

## [4.4.3] - 2024-02-29

### Documentation

- Correct remaining markdownlint references in hoisting guidance.

### Maintenance

- Refresh mdat, ESLint, and Svelte formatting dependencies and remove obsolete markdownlint hoisting.
- [@kitschpatrol/eslint-config 4.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#443---2024-02-29): Update TypeScript ESLint and XO TypeScript dependencies.
- [@kitschpatrol/mdat-config 4.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#443---2024-02-29): Update the MDAT peer dependency to `^0.6.5`.
- [@kitschpatrol/prettier-config 4.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#443---2024-02-29): Update the Svelte formatting plugin.
- [@kitschpatrol/remark-config 4.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#443---2024-02-29): See the package changelog.
- [@kitschpatrol/repo-config 4.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#443---2024-02-29): Remove the obsolete Markdownlint hoisting rule from the starter `.npmrc`.
- [@kitschpatrol/shared-config 4.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#443---2024-02-29): See the package changelog.
- [@kitschpatrol/stylelint-config 4.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#443---2024-02-29): See the package changelog.

### Changed

- [@kitschpatrol/cspell-config 4.4.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#443---2024-02-29): Recognize additional CLI and identifier terms in the shared vocabulary.

## [4.4.2] - 2024-02-23

### Changed

- Expand CSpell vocabulary and ignore additional media and snapshot files.
- [@kitschpatrol/cspell-config 4.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#442---2024-02-23): Expand the shared vocabulary and exclude snapshots, audio files, and tldraw documents from spell checking.

### Fixed

- Disable Remark rules that conflict with mdat-generated Markdown.
- [@kitschpatrol/remark-config 4.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#442---2024-02-23): Disable `no-emphasis-as-heading`, `no-html`, and `no-missing-blank-lines` to avoid conflicts with mdat-generated Markdown.

### Maintenance

- Update mdat to 0.6.3.
- [@kitschpatrol/eslint-config 4.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#442---2024-02-23): See the package changelog.
- [@kitschpatrol/mdat-config 4.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#442---2024-02-23): Update the MDAT peer dependency to `^0.6.3`.
- [@kitschpatrol/prettier-config 4.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#442---2024-02-23): See the package changelog.
- [@kitschpatrol/repo-config 4.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#442---2024-02-23): Refresh the mdat tooling used by README generation.
- [@kitschpatrol/shared-config 4.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#442---2024-02-23): See the package changelog.
- [@kitschpatrol/stylelint-config 4.4.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#442---2024-02-23): See the package changelog.

## [4.4.1] - 2024-02-22

### Maintenance

- Update mdat to 0.6 and copy the root README after package documentation generation.
- [@kitschpatrol/cspell-config 4.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#441---2024-02-22): See the package changelog.
- [@kitschpatrol/eslint-config 4.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#441---2024-02-22): See the package changelog.
- [@kitschpatrol/mdat-config 4.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#441---2024-02-22): Update the MDAT peer dependency to `^0.6.0`.
- [@kitschpatrol/remark-config 4.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#441---2024-02-22): Update the mdat tooling used to generate package documentation.
- [@kitschpatrol/repo-config 4.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#441---2024-02-22): Update the mdat tooling used to generate package documentation.
- [@kitschpatrol/shared-config 4.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#441---2024-02-22): Update the README template for mdat's revised table-of-contents directive.
- [@kitschpatrol/stylelint-config 4.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#441---2024-02-22): See the package changelog.

### Documentation

- [@kitschpatrol/prettier-config 4.4.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#441---2024-02-22): Include the package name in the npm badge's accessible label.

## [4.4.0] - 2024-02-20

### Added

- Integrate mdat for checking and expanding Markdown templates, with a shared configuration and standalone CLI.
- [@kitschpatrol/mdat-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#440---2024-02-20): Provide a reusable default MDAT configuration with a `shared-config` rule that generates the project's tooling-description section.
- [@kitschpatrol/mdat-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#440---2024-02-20): Provide the `mdat-config` CLI with default/`--check` validation, `--fix` in-place placeholder expansion, `--init` starter configuration, and `--print-config` inspection, including file/glob arguments.
- [@kitschpatrol/prettier-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#440---2024-02-20): Include `.node-version` in the starter VS Code document selectors.
- [@kitschpatrol/repo-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#440---2024-02-20): Include mdat in the generated pnpm hoisting patterns.
- [@kitschpatrol/shared-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#440---2024-02-20): Bundle mdat configuration and include its supported operations in the aggregate CLI.

### Documentation

- Expand package guides and generate consistent installation, CLI, and license documentation.
- [@kitschpatrol/cspell-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#440---2024-02-20): Add a CLI reference and licensing information, and correct the package-script example.
- [@kitschpatrol/eslint-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#440---2024-02-20): Add CLI option reference, package badges, and license information.
- [@kitschpatrol/mdat-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/mdat-config/changelog.md#440---2024-02-20): Document pnpm installation, automatic MDAT peer installation, custom rules, and package-script usage.
- [@kitschpatrol/prettier-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#440---2024-02-20): Add a CLI reference, package/license information, and corrected usage examples.
- [@kitschpatrol/remark-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#440---2024-02-20): Add a CLI reference, package badges, and license information to the README, and clean up the script example.
- [@kitschpatrol/repo-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#440---2024-02-20): Add a CLI reference, package badges, and license information to the README.
- [@kitschpatrol/shared-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#440---2024-02-20): Add a package README with quick-start commands, tool/package references, CLI usage, and development guidance.
- [@kitschpatrol/stylelint-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#440---2024-02-20): Add a CLI reference and license information to the README.

### Maintenance

- Refresh linting and formatting dependencies and automate README generation during builds.
- [@kitschpatrol/cspell-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#440---2024-02-20): Generate README content during builds, include the MIT license, and refresh build dependencies.
- [@kitschpatrol/eslint-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#440---2024-02-20): Refresh linting dependencies, including typescript-eslint 7, and generate README sections with mdat.
- [@kitschpatrol/prettier-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#440---2024-02-20): Generate README content during package builds and include a package license file.
- [@kitschpatrol/remark-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#440---2024-02-20): Generate README content with mdat during package builds and include the MIT license file.
- [@kitschpatrol/shared-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#440---2024-02-20): Generate README sections with mdat during builds and refresh the capability-generation tooling.
- [@kitschpatrol/stylelint-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#440---2024-02-20): Adopt mdat for README generation and include an MIT license file in the package.
- [@kitschpatrol/stylelint-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#440---2024-02-20): Update the clean-order preset dependency.

### Changed

- [@kitschpatrol/cspell-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#440---2024-02-20): Recognize `mdat` and `mdatrc` in the shared vocabulary.
- [@kitschpatrol/repo-config 4.4.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#440---2024-02-20): Nest hidden TypeScript configuration files beneath `package.json` in VS Code.

## [4.3.3] - 2024-01-14

### Documentation

- Correct product-name capitalization and package-architecture documentation.
- [@kitschpatrol/cspell-config 4.3.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#433---2024-01-14): Correct the VS Code product name in the usage guidance.
- [@kitschpatrol/eslint-config 4.3.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#433---2024-01-14): Correct ESLint and VS Code capitalization in package metadata and usage guidance.
- [@kitschpatrol/remark-config 4.3.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#433---2024-01-14): Correct VS Code naming in the usage instructions.
- [@kitschpatrol/repo-config 4.3.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#433---2024-01-14): Correct GitHub naming in release authentication instructions.
- [@kitschpatrol/stylelint-config 4.3.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#433---2024-01-14): Correct VS Code naming in the usage instructions.

### Maintenance

- [@kitschpatrol/prettier-config 4.3.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#433---2024-01-14): See the package changelog.
- [@kitschpatrol/shared-config 4.3.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#433---2024-01-14): See the package changelog.

## [4.3.2] - 2024-01-14

### Changed

- **Breaking:** Require Stylelint 16 and update its standard configuration.
- [@kitschpatrol/cspell-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#432---2024-01-14): Expand the shared vocabulary with media, web-development, and project-specific terms.
- [@kitschpatrol/eslint-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#432---2024-01-14): Use the workspace TypeScript installation in initialized VS Code settings.
- **Breaking:** [@kitschpatrol/stylelint-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#432---2024-01-14): Require Stylelint 16 through the peer dependency, replacing Stylelint 15 support.

### Fixed

- Preserve `.env.example` through ignore rules and select the workspace TypeScript installation in VS Code.
- [@kitschpatrol/eslint-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#432---2024-01-14): Preserve the `.env.example` ignore exception and prevent inherited tsconfig exclusions from omitting lint targets.
- [@kitschpatrol/prettier-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#432---2024-01-14): Remove environment-file ignore patterns so `.env.example` is no longer excluded by the starter configuration.
- [@kitschpatrol/repo-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#432---2024-01-14): Place the `.env.example` exception after environment-file ignore patterns so example files remain trackable.

### Maintenance

- Refresh linting, formatting, and build dependencies and expand CSpell dictionaries.
- [@kitschpatrol/cspell-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#432---2024-01-14): Update bundled CLI parsing dependencies.
- [@kitschpatrol/eslint-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#432---2024-01-14): Refresh TypeScript, Astro, MDX, Node, and Unicorn linting dependencies.
- [@kitschpatrol/prettier-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#432---2024-01-14): Refresh PHP, Astro, SQL, and Tailwind formatting plugins.
- [@kitschpatrol/remark-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#432---2024-01-14): See the package changelog.
- [@kitschpatrol/shared-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#432---2024-01-14): See the package changelog.
- [@kitschpatrol/stylelint-config 4.3.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#432---2024-01-14): Update the standard and clean-order preset dependencies.

## [4.3.1] - 2023-12-23

### Changed

- Refine naming rules for imports, destructured component variables, and underscore-prefixed or suffixed variables.
- [@kitschpatrol/eslint-config 4.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#431---2023-12-23): Refine naming conventions to allow underscored variables, PascalCase imports, and destructured component names.

### Maintenance

- Update the MDX ESLint plugin and remove obsolete VS Code package hoisting.
- [@kitschpatrol/cspell-config 4.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#431---2023-12-23): See the package changelog.
- [@kitschpatrol/eslint-config 4.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#431---2023-12-23): Update eslint-plugin-mdx.
- [@kitschpatrol/prettier-config 4.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#431---2023-12-23): See the package changelog.
- [@kitschpatrol/remark-config 4.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#431---2023-12-23): See the package changelog.
- [@kitschpatrol/repo-config 4.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#431---2023-12-23): Remove the obsolete `@kitschpatrol/vscode-config` pnpm hoisting pattern.
- [@kitschpatrol/shared-config 4.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#431---2023-12-23): See the package changelog.
- [@kitschpatrol/stylelint-config 4.3.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#431---2023-12-23): See the package changelog.

## [4.3.0] - 2023-12-22

### Added

- Lint HTML markup for best practices, accessibility, and document structure, including JavaScript inside HTML script tags.
- [@kitschpatrol/eslint-config 4.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#430---2023-12-22): Lint HTML markup for accessibility, document structure, and best practices, lint inline scripts, and enable HTML validation in VS Code.

### Maintenance

- [@kitschpatrol/cspell-config 4.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#430---2023-12-22): See the package changelog.
- [@kitschpatrol/prettier-config 4.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#430---2023-12-22): See the package changelog.
- [@kitschpatrol/remark-config 4.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#430---2023-12-22): See the package changelog.
- [@kitschpatrol/repo-config 4.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#430---2023-12-22): See the package changelog.
- [@kitschpatrol/shared-config 4.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#430---2023-12-22): See the package changelog.
- [@kitschpatrol/stylelint-config 4.3.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#430---2023-12-22): See the package changelog.

## [4.2.2] - 2023-12-22

### Fixed

- Resolve ESLint TypeScript projects from the consuming project's directory and explicitly select `tsconfig.eslint.json` for framework files.
- [@kitschpatrol/eslint-config 4.2.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#422---2023-12-22): Resolve `tsconfig.eslint.json` from the consuming project's working directory, including TypeScript and Astro overrides.

### Maintenance

- [@kitschpatrol/cspell-config 4.2.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#422---2023-12-22): See the package changelog.
- [@kitschpatrol/prettier-config 4.2.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#422---2023-12-22): See the package changelog.
- [@kitschpatrol/remark-config 4.2.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#422---2023-12-22): See the package changelog.
- [@kitschpatrol/repo-config 4.2.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#422---2023-12-22): See the package changelog.
- [@kitschpatrol/shared-config 4.2.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#422---2023-12-22): See the package changelog.
- [@kitschpatrol/stylelint-config 4.2.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#422---2023-12-22): See the package changelog.

## [4.2.1] - 2023-12-21

### Changed

- Enforce TypeScript naming conventions while allowing quoted names, kebab-case Astro pages, and dynamic slug filenames.
- [@kitschpatrol/cspell-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#421---2023-12-21): Expand the shared vocabulary with HTML, TypeScript, CSS, and development-tool terminology.
- [@kitschpatrol/eslint-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#421---2023-12-21): Enforce TypeScript naming conventions and apply shared TypeScript rule overrides to JavaScript.
- [@kitschpatrol/eslint-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#421---2023-12-21): Exclude generated `env.d.ts` files in the starter ignore configuration.

### Fixed

- Allow empty Astro style blocks and ignore generated `env.d.ts` files.
- [@kitschpatrol/eslint-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#421---2023-12-21): Accept kebab-case Astro pages and `[slug].astro`.
- [@kitschpatrol/stylelint-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#421---2023-12-21): Allow empty style sources in Astro templates.

### Added

- [@kitschpatrol/cspell-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#421---2023-12-21): Include the CSpell JSON schema in generated starter configurations for editor assistance.

### Documentation

- [@kitschpatrol/stylelint-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#421---2023-12-21): Add Stylelint type annotations to the starter configuration.

### Maintenance

- [@kitschpatrol/prettier-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#421---2023-12-21): See the package changelog.
- [@kitschpatrol/remark-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#421---2023-12-21): See the package changelog.
- [@kitschpatrol/repo-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#421---2023-12-21): See the package changelog.
- [@kitschpatrol/shared-config 4.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#421---2023-12-21): See the package changelog.

## [4.2.0] - 2023-12-20

### Added

- Provide VS Code file nesting for environment files, package configuration, and project documentation.
- [@kitschpatrol/repo-config 4.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#420---2023-12-20): Enable VS Code file nesting for environment files, package configuration and lockfiles, and README-related license and changelog files.

### Documentation

- Correct the new-project bootstrap command and add instructions for existing projects.

### Maintenance

- Update the Node ESLint plugin and contributor editor recommendations.
- [@kitschpatrol/cspell-config 4.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#420---2023-12-20): See the package changelog.
- [@kitschpatrol/eslint-config 4.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#420---2023-12-20): Update eslint-plugin-n.
- [@kitschpatrol/prettier-config 4.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#420---2023-12-20): See the package changelog.
- [@kitschpatrol/remark-config 4.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#420---2023-12-20): See the package changelog.
- [@kitschpatrol/shared-config 4.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#420---2023-12-20): See the package changelog.
- [@kitschpatrol/stylelint-config 4.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#420---2023-12-20): See the package changelog.

## [4.1.3] - 2023-12-19

### Fixed

- Configure VS Code to format Ruby files with Prettier.
- [@kitschpatrol/prettier-config 4.1.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#413---2023-12-19): Configure VS Code to select Prettier for Ruby files and include them in document selectors.

### Documentation

- Add a quick-start command and explain global Ruby plugin configuration.
- [@kitschpatrol/prettier-config 4.1.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#413---2023-12-19): Explain that the Ruby plugin must be configured globally rather than in per-file overrides.

### Maintenance

- Update tsx and normalize license distribution.
- [@kitschpatrol/cspell-config 4.1.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#413---2023-12-19): See the package changelog.
- [@kitschpatrol/eslint-config 4.1.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#413---2023-12-19): See the package changelog.
- [@kitschpatrol/remark-config 4.1.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#413---2023-12-19): See the package changelog.
- [@kitschpatrol/repo-config 4.1.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#413---2023-12-19): See the package changelog.
- [@kitschpatrol/shared-config 4.1.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#413---2023-12-19): See the package changelog.
- [@kitschpatrol/stylelint-config 4.1.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#413---2023-12-19): See the package changelog.

## [4.1.2] - 2023-12-19

### Documentation

- Document GitHub token and personal-access-token configuration for releases.
- [@kitschpatrol/repo-config 4.1.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#412---2023-12-19): Add release-workflow authentication instructions for GitHub tokens and fine-grained personal access tokens.

### Maintenance

- Improve release-workflow authentication and update ESLint and build dependencies.
- [@kitschpatrol/cspell-config 4.1.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#412---2023-12-19): See the package changelog.
- [@kitschpatrol/eslint-config 4.1.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#412---2023-12-19): Update the TypeScript ESLint parser and plugin.
- [@kitschpatrol/prettier-config 4.1.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#412---2023-12-19): See the package changelog.
- [@kitschpatrol/remark-config 4.1.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#412---2023-12-19): See the package changelog.
- [@kitschpatrol/repo-config 4.1.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#412---2023-12-19): Allow the release workflow to use `PERSONAL_ACCESS_TOKEN` with a `GITHUB_TOKEN` fallback, and improve authentication and release-state logging.
- [@kitschpatrol/shared-config 4.1.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#412---2023-12-19): See the package changelog.
- [@kitschpatrol/stylelint-config 4.1.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#412---2023-12-19): See the package changelog.

## [4.1.1] - 2023-12-19

### Documentation

- Describe files and the GitHub release workflow installed by repository initialization.
- [@kitschpatrol/repo-config 4.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#411---2023-12-19): Describe the supplied npm, Git, VS Code, and GitHub workflow configuration.

### Maintenance

- Correct release-workflow branch validation for tag checkouts.
- [@kitschpatrol/cspell-config 4.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#411---2023-12-19): See the package changelog.
- [@kitschpatrol/eslint-config 4.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#411---2023-12-19): See the package changelog.
- [@kitschpatrol/prettier-config 4.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#411---2023-12-19): See the package changelog.
- [@kitschpatrol/remark-config 4.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#411---2023-12-19): See the package changelog.
- [@kitschpatrol/repo-config 4.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#411---2023-12-19): Correct release workflow branch validation to recognize tags on main when checkout uses a detached HEAD.
- [@kitschpatrol/shared-config 4.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#411---2023-12-19): See the package changelog.
- [@kitschpatrol/stylelint-config 4.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#411---2023-12-19): See the package changelog.

## [4.1.0] - 2023-12-18

### Changed

- Apply explicit shell-parser overrides to `.sh`, `.zsh`, `.bash`, and `.fish` files.
- [@kitschpatrol/cspell-config 4.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#410---2023-12-18): Recognize `webp` in the shared vocabulary.

### Maintenance

- Add a GitHub release workflow to repository initialization and use version-prefixed release tags.
- [@kitschpatrol/eslint-config 4.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#410---2023-12-18): See the package changelog.
- [@kitschpatrol/remark-config 4.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#410---2023-12-18): See the package changelog.
- [@kitschpatrol/repo-config 4.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#410---2023-12-18): Add a GitHub release workflow template for version tags, with main-branch validation, generated release notes, and documentation attachments.
- [@kitschpatrol/shared-config 4.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#410---2023-12-18): See the package changelog.
- [@kitschpatrol/stylelint-config 4.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#410---2023-12-18): See the package changelog.

### Added

- [@kitschpatrol/prettier-config 4.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#410---2023-12-18): Apply shell formatting overrides to `.sh`, `.zsh`, `.bash`, and `.fish` files.

## [4.0.0] - 2023-12-16

### Changed

- Install tool-specific VS Code recommendations and settings from each configuration package, merging existing VS Code JSON during initialization.
- **Breaking:** [@kitschpatrol/cspell-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#400---2023-12-16): Rename `main.json` to `cspell.config.json`; import the package root instead of the removed filename.
- [@kitschpatrol/cspell-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#400---2023-12-16): Merge existing VS Code JSON settings during initialization and overwrite other starter files without shell copying.
- [@kitschpatrol/prettier-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#400---2023-12-16): Merge existing VS Code JSON configuration during initialization instead of overwriting it.
- **Breaking:** [@kitschpatrol/remark-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#400---2023-12-16): Merge existing VS Code JSON configuration during initialization and overwrite other starter files without an interactive overwrite prompt.
- **Breaking:** [@kitschpatrol/repo-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#400---2023-12-16): Merge existing VS Code JSON configuration during initialization and overwrite other starter files without an interactive overwrite prompt.
- **Breaking:** [@kitschpatrol/shared-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#400---2023-12-16): Merge existing VS Code JSON settings and extension arrays during initialization; overwrite other starter files without interactive copy prompts.
- [@kitschpatrol/shared-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#400---2023-12-16): Obtain VS Code integration from individual tool packages instead of a standalone vscode-config dependency.
- **Breaking:** [@kitschpatrol/stylelint-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#400---2023-12-16): Initialize without overwrite prompts, replacing ordinary starter files and deep-merging existing VS Code JSON settings and recommendation arrays.

### Removed

- **Breaking:** Remove the standalone `@kitschpatrol/vscode-config` package and CLI.

### Maintenance

- Replace shell-based file copying with fs-extra and shared JSON merge utilities.
- [@kitschpatrol/eslint-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#400---2023-12-16): Migrate initialization file handling to fs-extra and rename the distributed config entry to `eslint.config.cjs`.
- [@kitschpatrol/prettier-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#400---2023-12-16): Rename the distributed configuration entry point to `prettier.config.js` and use fs-extra for initialization.
- [@kitschpatrol/remark-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#400---2023-12-16): Move the configuration entry file to `remark.config.js` while preserving package-level imports, and adopt `fs-extra` for initialization.
- [@kitschpatrol/repo-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#400---2023-12-16): Adopt `fs-extra` for repository file operations.
- [@kitschpatrol/shared-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#400---2023-12-16): Migrate initialization and capability-generation file operations to fs-extra.
- [@kitschpatrol/stylelint-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#400---2023-12-16): Replace shell-based initialization with fs-extra and rename the configuration entry file.

### Added

- [@kitschpatrol/cspell-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#400---2023-12-16): Initialize VS Code spell-checker settings and extension recommendations.
- [@kitschpatrol/eslint-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#400---2023-12-16): Initialize ESLint's VS Code extension recommendation, validation settings, and fix-on-save behavior, merging existing VS Code JSON files.
- [@kitschpatrol/prettier-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#400---2023-12-16): Include Prettier extension recommendations, format-on-save settings, and language formatter associations during initialization.
- [@kitschpatrol/remark-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#400---2023-12-16): Include the VS Code MDX extension recommendation in initialized projects.
- [@kitschpatrol/repo-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#400---2023-12-16): Include Astro and Svelte VS Code extension recommendations in initialized repositories.
- [@kitschpatrol/stylelint-config 4.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#400---2023-12-16): Include VS Code Stylelint extension recommendations, validation settings, and explicit fix-on-save configuration in initialization.

## [3.1.0] - 2023-12-16

### Changed

- Omit JavaScript semicolons and use spaces for Markdown and YAML indentation in Prettier defaults.
- [@kitschpatrol/prettier-config 3.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#310---2023-12-16): Omit semicolons by default and use spaces in Markdown, MDX, and `.yml` files.

### Maintenance

- Integrate 1Password-provided npm one-time passwords into local publishing.
- [@kitschpatrol/cspell-config 3.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#310---2023-12-16): See the package changelog.
- [@kitschpatrol/eslint-config 3.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#310---2023-12-16): See the package changelog.
- [@kitschpatrol/remark-config 3.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#310---2023-12-16): See the package changelog.
- [@kitschpatrol/repo-config 3.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#310---2023-12-16): See the package changelog.
- [@kitschpatrol/shared-config 3.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#310---2023-12-16): See the package changelog.
- [@kitschpatrol/stylelint-config 3.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#310---2023-12-16): See the package changelog.

### Documentation

- [@kitschpatrol/prettier-config 3.1.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#310---2023-12-16): Expand the starter configuration's per-file override example.

## [3.0.4] - 2023-12-16

### Changed

- Expand the CSpell vocabulary.
- [@kitschpatrol/cspell-config 3.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#304---2023-12-16): Expand the shared vocabulary with additional names and development terms.

### Fixed

- Return a successful exit status after initializing VS Code configuration.

### Documentation

- Clarify standalone package installation and shared repository setup.
- [@kitschpatrol/cspell-config 3.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#304---2023-12-16): Add the missing `--init` flag to repository-bootstrap instructions.
- [@kitschpatrol/eslint-config 3.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#304---2023-12-16): Correct repository initialization instructions to include `--init`.
- [@kitschpatrol/prettier-config 3.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#304---2023-12-16): Include the required `--init` flag in repository-configuration setup instructions.
- [@kitschpatrol/remark-config 3.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#304---2023-12-16): Correct repository bootstrap instructions to include the required `--init` flag.
- [@kitschpatrol/repo-config 3.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#304---2023-12-16): Correct one-off setup instructions to include `--init` and clarify the purpose of the pnpm hoisting configuration.
- [@kitschpatrol/stylelint-config 3.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#304---2023-12-16): Add the required `--init` flag to repository setup instructions.

### Maintenance

- Add bumpp-based release versioning.
- [@kitschpatrol/shared-config 3.0.4](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#304---2023-12-16): See the package changelog.

## [3.0.3] - 2023-12-15

### Fixed

- Declare missing configuration-discovery and JSON-coloring runtime dependencies so standalone package CLIs work after installation.
- [@kitschpatrol/cspell-config 3.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#303---2023-12-15): Declare missing `cosmiconfig` and JSON-colorizer runtime dependencies required by the CLI.
- [@kitschpatrol/repo-config 3.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#303---2023-12-15): Declare the Cosmiconfig and JSON-colorizer runtime dependencies required by the shared CLI implementation.
- [@kitschpatrol/shared-config 3.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#303---2023-12-15): Declare the JSON colorizer and Cosmiconfig runtime dependencies required by the distributed CLI.
- [@kitschpatrol/stylelint-config 3.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#303---2023-12-15): Declare the missing cosmiconfig runtime dependency required by the CLI.

### Documentation

- Clarify project setup instructions.

### Maintenance

- Remove unused Remark dependencies.
- [@kitschpatrol/eslint-config 3.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#303---2023-12-15): See the package changelog.
- [@kitschpatrol/prettier-config 3.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#303---2023-12-15): See the package changelog.
- [@kitschpatrol/remark-config 3.0.3](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#303---2023-12-15): Remove unused filename and heading-punctuation lint dependencies.

## [3.0.2] - 2023-12-15

### Fixed

- Run explicitly requested operations even when a tool has no default check command.
- [@kitschpatrol/shared-config 3.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#302---2023-12-15): Run explicitly requested operations instead of exiting through the no-default-check path.

### Maintenance

- [@kitschpatrol/cspell-config 3.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#302---2023-12-15): See the package changelog.
- [@kitschpatrol/eslint-config 3.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#302---2023-12-15): See the package changelog.
- [@kitschpatrol/prettier-config 3.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#302---2023-12-15): See the package changelog.
- [@kitschpatrol/remark-config 3.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#302---2023-12-15): See the package changelog.
- [@kitschpatrol/repo-config 3.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#302---2023-12-15): See the package changelog.
- [@kitschpatrol/stylelint-config 3.0.2](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#302---2023-12-15): See the package changelog.

## [3.0.1] - 2023-12-15

### Fixed

- Include required configuration and initialization files in published packages.
- [@kitschpatrol/cspell-config 3.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#301---2023-12-15): Correct npm file inclusion patterns for the CLI and starter configuration files.
- [@kitschpatrol/eslint-config 3.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#301---2023-12-15): Correct published file patterns so CLI and initialization assets are included.
- [@kitschpatrol/prettier-config 3.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#301---2023-12-15): Correct published file inclusion for the CLI and initialization templates.
- [@kitschpatrol/remark-config 3.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#301---2023-12-15): Correct published file patterns so the CLI and starter configuration assets are included.
- [@kitschpatrol/repo-config 3.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#301---2023-12-15): Correct published file patterns so the CLI and repository starter assets are included.
- [@kitschpatrol/stylelint-config 3.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#301---2023-12-15): Correct published-file patterns so executable and starter configuration assets are included.

### Maintenance

- [@kitschpatrol/shared-config 3.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#301---2023-12-15): Make published CLI file inclusion explicit with the `bin/*` package pattern.

## [3.0.0] - 2023-12-15

### Added

- Export `overrideRules` to customize or disable individual Remark rules.
- [@kitschpatrol/eslint-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#300---2023-12-15): Initialize a dedicated `tsconfig.eslint.json` and default ignores for generated files, dependencies, and local artifacts.
- [@kitschpatrol/remark-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#300---2023-12-15): Export `overrideRules()` to customize or disable existing plugins by rule name.
- [@kitschpatrol/repo-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#300---2023-12-15): Provide repository starter configuration with pnpm hoisting patterns and Git ignore rules for dependencies, build output, environment files, and framework-generated files.
- [@kitschpatrol/repo-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#300---2023-12-15): Provide `repo-config --init` to copy starter files into a package root and `--print-config` to inspect installed configuration files.

### Changed

- **Breaking:** Rename `@kitschpatrol/npm-config` and its command to `@kitschpatrol/repo-config`, adding shared `.gitignore` setup.
- **Breaking:** Enable type-checked ESLint rules with a dedicated `tsconfig.eslint.json` and revised Astro, Svelte, and MDX handling.
- [@kitschpatrol/cspell-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#300---2023-12-15): Exclude SVGs, MP4s, and patch directories from spell checking and recognize `antfu`.
- **Breaking:** [@kitschpatrol/eslint-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#300---2023-12-15): Enable type-aware TypeScript linting through `tsconfig.eslint.json` and update JavaScript globals and shared rule defaults.
- [@kitschpatrol/eslint-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#300---2023-12-15): Separate Markdown and MDX overrides, allow content or component filenames for MDX, and disable MDX code-block linting.
- [@kitschpatrol/prettier-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#300---2023-12-15): Reduce the default print width from 120 to 100 columns.
- [@kitschpatrol/prettier-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#300---2023-12-15): Expand the starter ignore rules to cover generated output, dependencies, temporary files, environment files, and npm lockfiles.
- **Breaking:** [@kitschpatrol/shared-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#300---2023-12-15): Replace the bundled `npm-config` tool with `repo-config`, expanding initialization to repository ignore files.
- [@kitschpatrol/shared-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#300---2023-12-15): Include command counts and clearer success/failure indicators in aggregate CLI summaries.

### Documentation

- Revise repository setup and demonstrate Remark rule overrides.
- [@kitschpatrol/cspell-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#300---2023-12-15): Update repository-bootstrap instructions to `@kitschpatrol/repo-config` and explain `.gitignore` support.
- [@kitschpatrol/prettier-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#300---2023-12-15): Update setup instructions to use `@kitschpatrol/repo-config`.
- [@kitschpatrol/remark-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#300---2023-12-15): Add rule-override examples to the starter configuration and update bootstrap instructions to use `@kitschpatrol/repo-config`.
- [@kitschpatrol/repo-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/repo-config/changelog.md#300---2023-12-15): Document one-off pnpm setup and installation as a development dependency, including applying repository configuration before other shared-config packages.
- [@kitschpatrol/stylelint-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#300---2023-12-15): Update setup instructions to use the renamed `@kitschpatrol/repo-config` package.

### Fixed

- [@kitschpatrol/remark-config 3.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#300---2023-12-15): Disable filename-extension and mixed-case filename checks that could crash with missing source-position errors.

## [2.2.1] - 2023-12-13

### Added

- Support Markdown frontmatter, GitHub Flavored Markdown, and directives.
- [@kitschpatrol/cspell-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#221---2023-12-13): Add `-p` as an alias for `--print-config`.
- [@kitschpatrol/eslint-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#221---2023-12-13): Add `-p` as an alias for `--print-config`.
- [@kitschpatrol/prettier-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#221---2023-12-13): Add the `-p` alias for `--print-config`.
- [@kitschpatrol/remark-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#221---2023-12-13): Support frontmatter, GitHub Flavored Markdown, and directives through dedicated Remark plugins.
- [@kitschpatrol/remark-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#221---2023-12-13): Implement configuration inspection through `--print-config`, using Cosmiconfig and compact, colorized JSON output.
- [@kitschpatrol/stylelint-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#221---2023-12-13): Add `-p` as a short alias for `--print-config`.

### Changed

- Print effective configurations as compact, colored JSON and provide configuration discovery for additional tools.
- Preserve existing Markdown heading capitalization.
- [@kitschpatrol/cspell-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#221---2023-12-13): Exclude `package.json` from spell checking and expand the shared vocabulary.
- [@kitschpatrol/eslint-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#221---2023-12-13): Render effective configuration output as compact, colorized JSON.
- [@kitschpatrol/prettier-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#221---2023-12-13): Use cosmiconfig for configuration discovery and print compact, colorized JSON with the configuration path.
- [@kitschpatrol/shared-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#221---2023-12-13): Print effective configurations as compact, colorized JSON and provide configuration lookup through Cosmiconfig.
- [@kitschpatrol/stylelint-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#221---2023-12-13): Print effective Stylelint configuration as compact, colorized JSON and default its target to the current directory.

### Fixed

- Limit the MDX ESLint preset to Markdown and MDX files.
- [@kitschpatrol/cspell-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#221---2023-12-13): Give `--print-config` a default project path and avoid error exits for debug output.
- [@kitschpatrol/eslint-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#221---2023-12-13): Limit MDX recommended rules to Markdown/MDX files instead of applying them to all source files.

### Removed

- [@kitschpatrol/remark-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#221---2023-12-13): Remove automatic Markdown heading capitalization from the shared preset.

### Documentation

- [@kitschpatrol/prettier-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#221---2023-12-13): Expand CLI help with configuration-printing, help, and version options.
- [@kitschpatrol/shared-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#221---2023-12-13): Expand CLI help for configuration printing, help, and version options.
- [@kitschpatrol/stylelint-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#221---2023-12-13): Expand generated CLI help with help, version, and print-config options.

### Maintenance

- [@kitschpatrol/shared-config 2.2.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#221---2023-12-13): Bundle most CLI support libraries instead of declaring them as separate runtime dependencies.

## [2.2.0] - 2023-12-12

### Changed

- **Breaking:** Replace `@kitschpatrol/markdownlint-config` with `@kitschpatrol/remark-config` and integrate Markdown and MDX linting through ESLint.
- [@kitschpatrol/cspell-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#220---2023-12-12): Recognize `linebreak` and `remarkrc` in the shared vocabulary.
- [@kitschpatrol/eslint-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#220---2023-12-12): Mark generated ESLint configurations as root configurations.
- [@kitschpatrol/shared-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#220---2023-12-12): Replace bundled Markdownlint configuration with remark configuration for Markdown and MDX.

### Documentation

- Update setup instructions and add the Remark package guide.
- [@kitschpatrol/prettier-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#220---2023-12-12): Separate local overrides from shared defaults in the starter configuration example.
- [@kitschpatrol/remark-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#220---2023-12-12): Document pnpm installation, starter configuration, direct Remark invocation, and integration through ESLint and editor plugins.

### Added

- [@kitschpatrol/eslint-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#220---2023-12-12): Lint Markdown/MDX files and embedded code blocks with the MDX parser and recommended rules.
- [@kitschpatrol/remark-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#220---2023-12-12): Provide a default ESM Remark preset for Markdown and MDX linting, covering headings, filenames, lists, code blocks, references, and link validation with Prettier integration.
- [@kitschpatrol/remark-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/remark-config/changelog.md#220---2023-12-12): Include automatic heading capitalization and a `remark-config --init` command that copies a customizable `.remarkrc.js` into the project.

### Maintenance

- [@kitschpatrol/cspell-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#220---2023-12-12): Refresh CLI dependency declarations.
- [@kitschpatrol/eslint-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#220---2023-12-12): Refresh shared CLI dependency declarations.
- [@kitschpatrol/prettier-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#220---2023-12-12): Adjust CLI runtime dependency declarations.
- [@kitschpatrol/stylelint-config 2.2.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#220---2023-12-12): Add the `up` runtime dependency.

## [2.1.1] - 2023-12-12

### Added

- Support file and glob arguments, default checking, help, version reporting, and effective-configuration inspection across tool CLIs.
- [@kitschpatrol/cspell-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#211---2023-12-12): Add `--print-config`, help/version output, and initialization/check aliases (`-i`, `-l`/`--lint`).
- [@kitschpatrol/eslint-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#211---2023-12-12): Add `--print-config`, help/version output, and action aliases (`-i`, `-l`/`--lint`, `-f`).
- [@kitschpatrol/prettier-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#211---2023-12-12): Add `--print-config` to display the resolved Prettier configuration for a file.
- [@kitschpatrol/shared-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#211---2023-12-12): Bundle CSpell, ESLint with Astro/Svelte/TypeScript support, Markdownlint, Prettier, Stylelint, npm settings, and VS Code integration behind one dependency.
- [@kitschpatrol/shared-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#211---2023-12-12): Provide the `shared-config` CLI with default checking, `--fix`, `--init`, and `--print-config` modes, file/glob forwarding, colored command summaries, and a failing exit status when any tool fails.
- [@kitschpatrol/stylelint-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#211---2023-12-12): Add `--print-config`, help, and version support to the Stylelint wrapper.

### Changed

- Add colored tool-prefixed output and a combined success/failure summary.
- [@kitschpatrol/cspell-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#211---2023-12-12): Accept file/glob arguments, run checks by default, and prefix tool output with colored CSpell labels.
- [@kitschpatrol/cspell-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#211---2023-12-12): Expand the shared vocabulary with additional development-tool terms.
- [@kitschpatrol/eslint-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#211---2023-12-12): Accept file/glob arguments, run checks by default, and prefix tool output with colored ESLint labels.
- [@kitschpatrol/eslint-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#211---2023-12-12): Adopt XO, XO TypeScript, and Node.js recommended presets, with separate preset stacks by file type.
- [@kitschpatrol/prettier-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#211---2023-12-12): Accept file/glob targets, check the current directory by default, and prefix CLI output with colored tool labels.
- [@kitschpatrol/stylelint-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#211---2023-12-12): Accept file and glob arguments, check the project by default, and allow multiple operation flags.
- [@kitschpatrol/stylelint-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#211---2023-12-12): Resolve initialization against the nearest package directory and prefix command output with colored Stylelint labels.

### Documentation

- Explain package architecture, local builds, and executable placeholders.
- [@kitschpatrol/shared-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/shared-config/changelog.md#211---2023-12-12): Provide pnpm installation, starter-configuration, helper-script, and editor setup instructions for Node.js 18+ and pnpm 8+.

### Maintenance

- Unify command handling in TypeScript and build package executables before publishing.

### Fixed

- [@kitschpatrol/prettier-config 2.1.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#211---2023-12-12): Route subprocess errors through the CLI's prefixed output stream.

## [2.0.1] - 2023-12-08

### Fixed

- Hoist zx so distributed executables can resolve their script interpreter.

## [2.0.0] - 2023-12-08

### Changed

- **Breaking:** Replace separate initialization, lint, and fix executables with `shared-config` and per-tool commands using `--init`, `--check`, and `--fix`.
- **Breaking:** [@kitschpatrol/cspell-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#200---2023-12-08): Replace `cspell-config-init` with `cspell-config --init` and add `--check` for project spell checking.
- [@kitschpatrol/cspell-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#200---2023-12-08): Recognize `markdownlint` and `nothrow` in the shared vocabulary.
- **Breaking:** [@kitschpatrol/eslint-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#200---2023-12-08): Replace `eslint-config-init` with the unified `eslint-config --init`, `--check`, and `--fix` CLI.
- [@kitschpatrol/eslint-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#200---2023-12-08): Enable browser and Node.js globals in the default environment.
- [@kitschpatrol/eslint-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#200---2023-12-08): Allow `props` and `args` abbreviations.
- **Breaking:** [@kitschpatrol/prettier-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#200---2023-12-08): Replace `prettier-config-init` with `prettier-config --init`.
- [@kitschpatrol/prettier-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#200---2023-12-08): Exclude `pnpm-lock.yaml` in the starter ignore file.
- **Breaking:** [@kitschpatrol/stylelint-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#200---2023-12-08): Replace `stylelint-config-init` with `stylelint-config --init`; require exactly one operation flag.

### Documentation

- Update installation and usage examples for the consolidated CLI commands.
- [@kitschpatrol/cspell-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#200---2023-12-08): Update initialization and package-script examples for the unified CLI.
- [@kitschpatrol/stylelint-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#200---2023-12-08): Update initialization and package-script examples for the unified CLI.

### Maintenance

- Move CLI scripting to zx and add argument-parsing dependencies.

### Added

- [@kitschpatrol/prettier-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#200---2023-12-08): Add plugin-aware formatting checks and automatic formatting through `--check` and `--fix`.
- [@kitschpatrol/stylelint-config 2.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#200---2023-12-08): Add `--check` and `--fix` CLI modes for CSS, SCSS, Sass, Svelte, HTML, and Astro files, respecting `.gitignore` and allowing empty matches.

## [1.0.2] - 2023-12-07

### Changed

- Reduce Prettier output to warnings and skip tools without automatic fixes during the fix pass.

## [1.0.1] - 2023-12-07

### Fixed

- Make Stylelint respect `.gitignore` in the combined lint and fix commands.

### Documentation

- Clarify individual configuration setup and Markdown and stylesheet linting behavior.
- [@kitschpatrol/cspell-config 1.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#101---2023-12-07): Install the configuration as a development dependency in the setup instructions.
- [@kitschpatrol/eslint-config 1.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#101---2023-12-07): Install the configuration as a development dependency in the setup instructions.
- [@kitschpatrol/prettier-config 1.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#101---2023-12-07): Correct installation instructions to add the package as a development dependency.
- [@kitschpatrol/stylelint-config 1.0.1](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#101---2023-12-07): Install the configuration as a development dependency and document `.gitignore` handling.

## [1.0.0] - 2023-12-07

### Added

- Ship shared ESLint, Prettier, Stylelint, CSpell, and markdownlint configurations, including Astro and Svelte support, repository and VS Code setup, and combined initialization, linting, and fixing commands.
- [@kitschpatrol/cspell-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#100---2023-12-07): Provide a shared CSpell 8 configuration with US English, custom vocabulary, Astro/Svelte/Markdown/MDX/patch support, and `.gitignore` exclusions.
- [@kitschpatrol/cspell-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#100---2023-12-07): Provide `cspell-config-init` to create a starter `.cspell.json` while preserving existing files.
- [@kitschpatrol/eslint-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#100---2023-12-07): Provide a CommonJS ESLint preset combining recommended JavaScript/TypeScript checks, Unicorn rules, natural sorting, and Prettier compatibility.
- [@kitschpatrol/eslint-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#100---2023-12-07): Include Astro/Svelte parsers and framework-specific overrides, with Astro JSX accessibility checks.
- [@kitschpatrol/eslint-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/eslint-config/changelog.md#100---2023-12-07): Provide `eslint-config-init` to create starter `.eslintrc.cjs` and `.eslintignore` files while preserving existing files.
- [@kitschpatrol/prettier-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#100---2023-12-07): Provide an ESM Prettier 3 preset for Node.js 18+ with single quotes, tabs, trailing commas, and a 120-column line width.
- [@kitschpatrol/prettier-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#100---2023-12-07): Bundle formatting support for Astro, Svelte, PHP, Ruby, XML, shell files, SQL, TOML, package.json sorting, and Tailwind CSS classes.
- [@kitschpatrol/prettier-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/prettier-config/changelog.md#100---2023-12-07): Provide `prettier-config-init` to copy starter configuration and ignore files while preserving existing files.
- [@kitschpatrol/stylelint-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#100---2023-12-07): Provide a CommonJS Stylelint configuration combining standard CSS rules, compact property ordering, and HTML/component style support.
- [@kitschpatrol/stylelint-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#100---2023-12-07): Allow `:global`, flexible class names and hex color lengths, and declarations and comments without mandatory blank lines.
- [@kitschpatrol/stylelint-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/stylelint-config/changelog.md#100---2023-12-07): Provide `stylelint-config-init` to copy a starter `.stylelintrc.cjs` while preserving existing files, with Node.js 18+, pnpm 8+, and Stylelint 15 peer support.

### Documentation

- Document pnpm installation, tool customization, CLI usage, and Ruby formatting prerequisites for Node.js 18+ and pnpm 8+.
- [@kitschpatrol/cspell-config 1.0.0](https://github.com/kitschpatrol/shared-config/blob/HEAD/packages/cspell-config/changelog.md#100---2023-12-07): Document standalone installation, project customization, editor integration, and spell-checking scripts.

### Maintenance

- Establish the pnpm workspace, contributor linting and formatting, MIT licensing, and public package distribution.

[Unreleased]: https://github.com/kitschpatrol/shared-config/compare/v8.14.1...HEAD
[1.0.0]: https://github.com/kitschpatrol/shared-config/releases/tag/v1.0.0
[1.0.1]: https://github.com/kitschpatrol/shared-config/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/kitschpatrol/shared-config/compare/v1.0.1...v1.0.2
[2.0.0]: https://github.com/kitschpatrol/shared-config/compare/v1.0.2...v2.0.0
[2.0.1]: https://github.com/kitschpatrol/shared-config/compare/v2.0.0...v2.0.1
[2.1.1]: https://github.com/kitschpatrol/shared-config/compare/v2.0.1...v2.1.1
[2.2.0]: https://github.com/kitschpatrol/shared-config/compare/v2.1.1...v2.2.0
[2.2.1]: https://github.com/kitschpatrol/shared-config/compare/v2.2.0...v2.2.1
[3.0.0]: https://github.com/kitschpatrol/shared-config/compare/v2.2.1...v3.0.0
[3.0.1]: https://github.com/kitschpatrol/shared-config/compare/v3.0.0...v3.0.1
[3.0.2]: https://github.com/kitschpatrol/shared-config/compare/v3.0.1...v3.0.2
[3.0.3]: https://github.com/kitschpatrol/shared-config/compare/v3.0.2...v3.0.3
[3.0.4]: https://github.com/kitschpatrol/shared-config/compare/v3.0.3...v3.0.4
[3.1.0]: https://github.com/kitschpatrol/shared-config/compare/v3.0.4...v3.1.0
[4.0.0]: https://github.com/kitschpatrol/shared-config/compare/v3.1.0...v4.0.0
[4.1.0]: https://github.com/kitschpatrol/shared-config/compare/v4.0.0...v4.1.0
[4.1.1]: https://github.com/kitschpatrol/shared-config/compare/v4.1.0...v4.1.1
[4.1.2]: https://github.com/kitschpatrol/shared-config/compare/v4.1.1...v4.1.2
[4.1.3]: https://github.com/kitschpatrol/shared-config/compare/v4.1.2...v4.1.3
[4.2.0]: https://github.com/kitschpatrol/shared-config/compare/v4.1.3...v4.2.0
[4.2.1]: https://github.com/kitschpatrol/shared-config/compare/v4.2.0...v4.2.1
[4.2.2]: https://github.com/kitschpatrol/shared-config/compare/v4.2.1...v4.2.2
[4.3.0]: https://github.com/kitschpatrol/shared-config/compare/v4.2.2...v4.3.0
[4.3.1]: https://github.com/kitschpatrol/shared-config/compare/v4.3.0...v4.3.1
[4.3.2]: https://github.com/kitschpatrol/shared-config/compare/v4.3.1...v4.3.2
[4.3.3]: https://github.com/kitschpatrol/shared-config/compare/v4.3.2...v4.3.3
[4.4.0]: https://github.com/kitschpatrol/shared-config/compare/v4.3.3...v4.4.0
[4.4.1]: https://github.com/kitschpatrol/shared-config/compare/v4.4.0...v4.4.1
[4.4.2]: https://github.com/kitschpatrol/shared-config/compare/v4.4.1...v4.4.2
[4.4.3]: https://github.com/kitschpatrol/shared-config/compare/v4.4.2...v4.4.3
[4.5.0]: https://github.com/kitschpatrol/shared-config/compare/v4.4.3...v4.5.0
[4.6.0]: https://github.com/kitschpatrol/shared-config/compare/v4.5.0...v4.6.0
[4.6.1]: https://github.com/kitschpatrol/shared-config/compare/v4.6.0...v4.6.1
[4.6.2]: https://github.com/kitschpatrol/shared-config/compare/v4.6.1...v4.6.2
[4.6.3]: https://github.com/kitschpatrol/shared-config/compare/v4.6.2...v4.6.3
[4.6.4]: https://github.com/kitschpatrol/shared-config/compare/v4.6.3...v4.6.4
[4.6.5]: https://github.com/kitschpatrol/shared-config/compare/v4.6.4...v4.6.5
[4.6.6]: https://github.com/kitschpatrol/shared-config/compare/v4.6.5...v4.6.6
[4.6.7]: https://github.com/kitschpatrol/shared-config/compare/v4.6.6...v4.6.7
[4.7.0]: https://github.com/kitschpatrol/shared-config/compare/v4.6.7...v4.7.0
[4.7.1]: https://github.com/kitschpatrol/shared-config/compare/v4.7.0...v4.7.1
[4.7.2]: https://github.com/kitschpatrol/shared-config/compare/v4.7.1...v4.7.2
[4.7.3]: https://github.com/kitschpatrol/shared-config/compare/v4.7.2...v4.7.3
[4.7.4]: https://github.com/kitschpatrol/shared-config/compare/v4.7.3...v4.7.4
[4.7.5]: https://github.com/kitschpatrol/shared-config/compare/v4.7.4...v4.7.5
[4.7.6]: https://github.com/kitschpatrol/shared-config/compare/v4.7.5...v4.7.6
[4.7.7]: https://github.com/kitschpatrol/shared-config/compare/v4.7.6...v4.7.7
[4.7.8]: https://github.com/kitschpatrol/shared-config/compare/v4.7.7...v4.7.8
[4.7.9]: https://github.com/kitschpatrol/shared-config/compare/v4.7.8...v4.7.9
[4.7.10]: https://github.com/kitschpatrol/shared-config/compare/v4.7.9...v4.7.10
[4.7.11]: https://github.com/kitschpatrol/shared-config/compare/v4.7.10...v4.7.11
[4.7.12]: https://github.com/kitschpatrol/shared-config/compare/v4.7.11...v4.7.12
[5.0.0]: https://github.com/kitschpatrol/shared-config/compare/v4.7.12...v5.0.0
[5.0.1]: https://github.com/kitschpatrol/shared-config/compare/v5.0.0...v5.0.1
[5.0.2]: https://github.com/kitschpatrol/shared-config/compare/v5.0.1...v5.0.2
[5.0.3]: https://github.com/kitschpatrol/shared-config/compare/v5.0.2...v5.0.3
[5.0.4]: https://github.com/kitschpatrol/shared-config/compare/v5.0.3...v5.0.4
[5.0.5]: https://github.com/kitschpatrol/shared-config/compare/v5.0.4...v5.0.5
[5.0.6]: https://github.com/kitschpatrol/shared-config/compare/v5.0.5...v5.0.6
[5.0.7]: https://github.com/kitschpatrol/shared-config/compare/v5.0.6...v5.0.7
[5.0.8]: https://github.com/kitschpatrol/shared-config/compare/v5.0.7...v5.0.8
[5.1.0]: https://github.com/kitschpatrol/shared-config/compare/v5.0.8...v5.1.0
[5.2.0]: https://github.com/kitschpatrol/shared-config/compare/v5.1.0...v5.2.0
[5.3.0]: https://github.com/kitschpatrol/shared-config/compare/v5.2.0...v5.3.0
[5.3.1]: https://github.com/kitschpatrol/shared-config/compare/v5.3.0...v5.3.1
[5.4.0]: https://github.com/kitschpatrol/shared-config/compare/v5.3.1...v5.4.0
[5.4.1]: https://github.com/kitschpatrol/shared-config/compare/v5.4.0...v5.4.1
[5.4.2]: https://github.com/kitschpatrol/shared-config/compare/v5.4.1...v5.4.2
[5.4.3]: https://github.com/kitschpatrol/shared-config/compare/v5.4.2...v5.4.3
[5.4.4]: https://github.com/kitschpatrol/shared-config/compare/v5.4.3...v5.4.4
[5.5.0]: https://github.com/kitschpatrol/shared-config/compare/v5.4.4...v5.5.0
[5.6.0]: https://github.com/kitschpatrol/shared-config/compare/v5.5.0...v5.6.0
[5.7.0]: https://github.com/kitschpatrol/shared-config/compare/v5.6.0...v5.7.0
[5.7.1]: https://github.com/kitschpatrol/shared-config/compare/v5.7.0...v5.7.1
[5.7.2]: https://github.com/kitschpatrol/shared-config/compare/v5.7.1...v5.7.2
[5.7.3]: https://github.com/kitschpatrol/shared-config/compare/v5.7.2...v5.7.3
[5.7.4]: https://github.com/kitschpatrol/shared-config/compare/v5.7.3...v5.7.4
[5.8.0]: https://github.com/kitschpatrol/shared-config/compare/v5.7.4...v5.8.0
[5.8.1]: https://github.com/kitschpatrol/shared-config/compare/v5.8.0...v5.8.1
[5.8.2]: https://github.com/kitschpatrol/shared-config/compare/v5.8.1...v5.8.2
[5.8.3]: https://github.com/kitschpatrol/shared-config/compare/v5.8.2...v5.8.3
[5.9.0]: https://github.com/kitschpatrol/shared-config/compare/v5.8.3...v5.9.0
[5.9.1]: https://github.com/kitschpatrol/shared-config/compare/v5.9.0...v5.9.1
[5.9.2]: https://github.com/kitschpatrol/shared-config/compare/v5.9.1...v5.9.2
[5.10.0]: https://github.com/kitschpatrol/shared-config/compare/v5.9.2...v5.10.0
[5.11.0]: https://github.com/kitschpatrol/shared-config/compare/v5.10.0...v5.11.0
[5.12.0]: https://github.com/kitschpatrol/shared-config/compare/v5.11.0...v5.12.0
[5.13.0]: https://github.com/kitschpatrol/shared-config/compare/v5.12.0...v5.13.0
[6.0.0]: https://github.com/kitschpatrol/shared-config/compare/v5.13.0...v6.0.0
[6.0.1]: https://github.com/kitschpatrol/shared-config/compare/v6.0.0...v6.0.1
[6.0.2]: https://github.com/kitschpatrol/shared-config/compare/v6.0.1...v6.0.2
[6.0.3]: https://github.com/kitschpatrol/shared-config/compare/v6.0.2...v6.0.3
[6.1.0]: https://github.com/kitschpatrol/shared-config/compare/v6.0.3...v6.1.0
[6.2.0]: https://github.com/kitschpatrol/shared-config/compare/v6.1.0...v6.2.0
[7.0.0]: https://github.com/kitschpatrol/shared-config/compare/v6.2.0...v7.0.0
[7.0.1]: https://github.com/kitschpatrol/shared-config/compare/v7.0.0...v7.0.1
[7.0.2]: https://github.com/kitschpatrol/shared-config/compare/v7.0.1...v7.0.2
[7.1.0]: https://github.com/kitschpatrol/shared-config/compare/v7.0.2...v7.1.0
[7.2.0]: https://github.com/kitschpatrol/shared-config/compare/v7.1.0...v7.2.0
[7.3.0]: https://github.com/kitschpatrol/shared-config/compare/v7.2.0...v7.3.0
[7.4.0]: https://github.com/kitschpatrol/shared-config/compare/v7.3.0...v7.4.0
[7.4.1]: https://github.com/kitschpatrol/shared-config/compare/v7.4.0...v7.4.1
[7.5.0]: https://github.com/kitschpatrol/shared-config/compare/v7.4.1...v7.5.0
[7.5.1]: https://github.com/kitschpatrol/shared-config/compare/v7.5.0...v7.5.1
[7.5.2]: https://github.com/kitschpatrol/shared-config/compare/v7.5.1...v7.5.2
[7.5.3]: https://github.com/kitschpatrol/shared-config/compare/v7.5.2...v7.5.3
[7.6.0]: https://github.com/kitschpatrol/shared-config/compare/v7.5.3...v7.6.0
[7.6.1]: https://github.com/kitschpatrol/shared-config/compare/v7.6.0...v7.6.1
[7.6.2]: https://github.com/kitschpatrol/shared-config/compare/v7.6.1...v7.6.2
[7.6.3]: https://github.com/kitschpatrol/shared-config/compare/v7.6.2...v7.6.3
[7.6.4]: https://github.com/kitschpatrol/shared-config/compare/v7.6.3...v7.6.4
[8.0.0]: https://github.com/kitschpatrol/shared-config/compare/v7.6.4...v8.0.0
[8.1.0]: https://github.com/kitschpatrol/shared-config/compare/v8.0.0...v8.1.0
[8.2.0]: https://github.com/kitschpatrol/shared-config/compare/v8.1.0...v8.2.0
[8.3.0]: https://github.com/kitschpatrol/shared-config/compare/v8.2.0...v8.3.0
[8.4.0]: https://github.com/kitschpatrol/shared-config/compare/v8.3.0...v8.4.0
[8.5.0]: https://github.com/kitschpatrol/shared-config/compare/v8.4.0...v8.5.0
[8.6.0]: https://github.com/kitschpatrol/shared-config/compare/v8.5.0...v8.6.0
[8.7.0]: https://github.com/kitschpatrol/shared-config/compare/v8.6.0...v8.7.0
[8.8.0]: https://github.com/kitschpatrol/shared-config/compare/v8.7.0...v8.8.0
[8.9.0]: https://github.com/kitschpatrol/shared-config/compare/v8.8.0...v8.9.0
[8.10.0]: https://github.com/kitschpatrol/shared-config/compare/v8.9.0...v8.10.0
[8.10.1]: https://github.com/kitschpatrol/shared-config/compare/v8.10.0...v8.10.1
[8.11.0]: https://github.com/kitschpatrol/shared-config/compare/v8.10.1...v8.11.0
[8.12.0]: https://github.com/kitschpatrol/shared-config/compare/v8.11.0...v8.12.0
[8.12.1]: https://github.com/kitschpatrol/shared-config/compare/v8.12.0...v8.12.1
[8.13.0]: https://github.com/kitschpatrol/shared-config/compare/v8.12.1...v8.13.0
[8.13.1]: https://github.com/kitschpatrol/shared-config/compare/v8.13.0...v8.13.1
[8.14.0]: https://github.com/kitschpatrol/shared-config/compare/v8.13.1...v8.14.0
[8.14.1]: https://github.com/kitschpatrol/shared-config/compare/v8.14.0...v8.14.1
