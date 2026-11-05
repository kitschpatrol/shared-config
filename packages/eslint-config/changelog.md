# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [Unreleased]

### Changed

- Exclude lowercase `changelog.md` files from default ESLint linting.

## [8.14.1] - 2026-11-03

### Fixed

- Prevent remark autofixes from corrupting Markdown/MDX lists and emphasis while retaining targeted Setext-to-ATX heading fixes.
- Accept MDX content expressions and JSX comments while retaining unused-expression checks inside exported JavaScript.

### Maintenance

- Refresh ESLint, MDX, package.json, regexp, and type-generation dependencies and expand Markdown regression tests.

## [8.14.0] - 2026-10-27

### Maintenance

- Refresh ESLint, framework plugins, CLI dependencies, and generated presets, and declare tslib as a runtime dependency.

## [8.13.1] - 2026-10-08

No notable changes.

## [8.13.0] - 2026-10-08

### Added

- Sort pnpm-workspace.yaml keys and selected list fields while preserving order-sensitive hoist patterns and hooks.

### Changed

- Allow `repo` as an abbreviation for `repository`.

### Maintenance

- Refresh React, Execa, and Svelte development dependencies and update package keywords.

## [8.12.1] - 2026-10-06

No notable changes.

## [8.12.0] - 2026-10-06

### Fixed

- Avoid unused-class errors for Svelte Tailwind classes, including package-local Tailwind installations in monorepos.
- Disable the array-splice rule that conflicts with negative-index autofixes.

### Maintenance

- Refresh TypeScript and React linting dependencies and add compatibility regression tests.

## [8.11.0] - 2026-10-04

### Added

- Support Agent Skills Markdown conventions, including `SKILL.md` filenames and unresolved example imports, and export skill/config-file glob patterns.

### Changed

- Refresh TypeScript and Unicorn recommended checks.

### Fixed

- Allow conventional top-level configuration calls in config files and code examples.
- Preserve Prettier's asterisk-prefixed JSDoc formatting by disabling the conflicting Unicorn rule.

### Maintenance

- Refresh linting dependencies and add Agent Skills regression tests.

## [8.10.1] - 2026-09-28

### Changed

- Allow known-safe `node:test` calls in floating-promise checks.

### Fixed

- Upgrade eslint-plugin-html and restore support for ESLint 10.11 and later.

### Documentation

- Remove the resolved ESLint version-pin warning.

### Maintenance

- Refresh ESLint, framework plugins, package.json linting, and development dependencies.

## [8.10.0] - 2026-09-22

### Fixed

- Disable ESLint caching to prevent stale results from type-aware and cross-file rules.
- Keep ESLint on 10.10.x to avoid an HTML-plugin crash with newer ESLint releases.
- Skip ignored or unmatched explicit file arguments without failing the warnings limit.

### Documentation

- Explain ESLint cache limitations and the temporary version pin.

### Maintenance

- Refresh linting dependencies and add CLI coverage for unmatched file arguments.

## [8.9.0] - 2026-09-17

### Changed

- Refresh TypeScript, JSDoc, and Unicorn rules, including generated empty-object types and newer async/iterator checks.

### Maintenance

- Refresh dependencies and disable Prettier caching during rule regeneration to prevent stale generated formatting.

## [8.8.0] - 2026-09-07

### Changed

- Exclude Vitest's generated `.vitest` directory by default.

### Fixed

- Keep parser extra-file extensions consistent across scripts and enabled frameworks to avoid repeated TypeScript project reloads.
- Parse JavaScript dependencies with the TypeScript parser when checking imports from Svelte or Astro files.

### Maintenance

- Refresh dependencies, update package validation and test configuration, and add parser regression tests.

## [8.7.0] - 2026-08-26

### Changed

- Refresh Unicorn recommended rules.

### Fixed

- Disable the block-comment style rule that conflicts with Prettier's JSDoc formatting.

### Documentation

- Expand `eslintConfig()` API documentation with a composition example and reference links.

### Maintenance

- Refresh linting and CLI dependencies, including Cosmiconfig 10, JSDoc 64, and Unicorn 73.

## [8.6.0] - 2026-07-31

### Maintenance

- Refresh ESLint, JSDoc, package.json, TOML, Execa, Yargs, globals, and development dependencies.

## [8.5.0] - 2026-07-24

### Changed

- Stop requiring complete JSDoc parameter descriptions and return documentation in Markdown/MDX code examples.

### Documentation

- Correct package, license, VS Code, and plugin reference links.

### Maintenance

- Fix Windows path comparisons in tests and refresh linting dependencies.

## [8.4.0] - 2026-07-22

### Added

- Support `tsconfigRootDirectory` and optional partial `typeAware` settings in configuration APIs.

### Changed

- Accept additional generated-code and directive patterns in capitalization checks.

### Removed

- **Breaking:** Remove the exported `GLOB_ASTRO_JS` constant for the unused Astro JavaScript virtual-file path.

### Fixed

- Discover tsconfig relative to the active ESLint config, enable typed rules only when appropriate, and honor inherited `checkJs` and per-language overrides.
- Separate Svelte components from script modules and correctly propagate type-aware settings and framework overrides.
- Isolate Astro client scripts from component type checking and apply embedded-script overrides with browser globals.
- Use a consistent parser and non-type-aware rules for Markdown and MDX code blocks.
- Scope HTML checks to HTML documents and supported tagged templates.
- Use the correct JSON language for JSON, JSONC, and JSON5 files.
- Apply shared script settings to JSX and TSX files.
- Match Vitest test files correctly so their test rules and globals apply.
- Resolve initialization assets from the installed CLI package.

### Maintenance

- Refactor configuration layers, add framework/format regression tests, and refresh dependencies.

## [8.3.0] - 2026-07-20

### Added

- Enable ESLint content caching for lint/fix commands, with `--cache` and `--no-cache` controls.

### Changed

- Make JSON reports compact and optionally colorized.
- Expand Svelte template checks, require TypeScript script blocks, and sort attributes.
- **Breaking:** Require kebab-case names for `.svelte.js` and `.svelte.ts` modules.
- Ignore `.worktrees` directories by default.

### Fixed

- Fail fix runs on remaining warnings consistently with lint.
- Respect color environment settings across CLI output and keep machine output free of ANSI codes.
- Avoid duplicate-import false positives for Svelte exports.

### Maintenance

- Refresh dependencies, including Execa 10, and add cache/output regression coverage.

## [8.2.0] - 2026-07-16

### Added

- Support `--format native`, `machine`, and `json` for lint and fix output.
- Initialize VS Code lint/fix tasks with Problems-panel integration, merging existing tasks by label.

### Changed

- Expand semantic object/type key ordering for dimensions, colors, coordinates, and Itson configurations.
- Relax capitalization checks for directives and commented-out code and refresh Astro, Unicorn, and XO defaults.

### Fixed

- Restore typed rule options and editor IntelliSense for flat configs.

### Documentation

- Document structured output and the initialized VS Code tasks.

### Maintenance

- Refresh parser/plugin dependencies and generated rule types.

## [8.1.0] - 2026-07-10

### Changed

- Require top-level type import/export statements.
- Disable the nested-call-depth rule.

### Fixed

- Avoid crashes when the fixing API receives no ESLint result for a file.

### Documentation

- Explain preset regeneration and the double-Prettier workaround for generated declarations.

### Maintenance

- Refresh dependencies, tighten development type checks, and stabilize rule-generation formatting.

## [8.0.0] - 2026-07-07

### Changed

- **Breaking:** Require Node.js `^24.16.0 || >=26.3.0`.
- **Breaking:** Migrate to ESLint 10 with updated XO, Astro, and Unicorn defaults, including renamed Unicorn rules.
- **Breaking:** Adopt eslint-react 5's unified `react/*` rule namespace and updated React checks.

### Fixed

- Lint source files in arbitrary `bin` directories instead of ignoring them by default.
- Disable document-level HTML requirements in Markdown and MDX code fences.

### Documentation

- Update the explanation of ESLint's removal of package.json configuration support.

### Maintenance

- Refresh parsers, plugins, and preset generation for the ESLint 10 migration.

## [7.6.4] - 2026-06-11

### Maintenance

- Refresh TypeScript, MDX, Svelte, JSDoc, package.json, import resolution, and sorting dependencies.

## [7.6.3] - 2026-06-05

### Maintenance

- Refresh linting dependencies and package-validation tooling.

## [7.6.2] - 2026-05-18

No notable changes.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Require Node.js `^22.22.2 || >=24.0.0`.
- Adopt eslint-plugin-package-json 1 and its expanded package metadata checks.

### Maintenance

- Update linting and Svelte development dependencies.

## [7.6.0] - 2026-05-14

### Changed

- **Breaking:** Restrict Node.js support to `^22.18.0 || >=24.0.0`.

### Maintenance

- Refresh linting dependencies, including eslint-plugin-n 18, and regenerate presets.

## [7.5.3] - 2026-05-03

### Fixed

- Use the renamed HTML spacing rule while retaining the override that delegates spacing to Prettier.

### Documentation

- Update the MIT license badge link.

### Maintenance

- Refresh e18e, HTML, flat-config, globals, and other linting dependencies.

## [7.5.2] - 2026-04-28

### Maintenance

- Update TypeScript ESLint and package.json linting dependencies.

## [7.5.1] - 2026-04-27

### Changed

- Require a blank line after block-like statements through the Stylistic plugin.

### Maintenance

- Add the Stylistic dependency and update the Svelte development dependency.

## [7.5.0] - 2026-04-22

### Changed

- Require braces for all control-flow bodies.

### Fixed

- Keep object types last in Astro intersections to avoid compiler errors.
- Allow null values in Stylelint configuration files.

### Maintenance

- Refresh TypeScript, Vitest, Perfectionist, Svelte, and Prettier dependencies.

## [7.4.1] - 2026-04-13

### Maintenance

- Update the TypeScript ESLint parser and plugin.

## [7.4.0] - 2026-04-13

### Maintenance

- Refresh global definitions, Prettier, Svelte development dependencies, and shared build tooling.

## [7.3.0] - 2026-04-09

### Maintenance

- Update Vitest linting and TypeScript configuration loading dependencies and simplify the publish build command.

## [7.2.0] - 2026-04-08

### Added

- Export `fix()`, `fixFile()`, `clearCache()`, and `FileType` for programmatic fixes with shared configuration, file-type hints, and per-call options.

### Documentation

- Document the fixing API, configuration options, and instance caching.

### Maintenance

- Add API regression tests and refresh TypeScript, Astro, and Svelte development dependencies.

## [7.1.0] - 2026-04-05

### Maintenance

- Update HTML linting and parsing dependencies.

## [7.0.2] - 2026-04-04

No notable changes.

## [7.0.1] - 2026-04-03

### Maintenance

- Update the Svelte linting dependency.

## [7.0.0] - 2026-04-02

### Added

- Enable recommended mathematical simplification rules and selected e18e modernization rules.

### Changed

- **Breaking:** Require Node.js 22.18.0 or later.

### Fixed

- Disable JSDoc tag spacing checks that conflict with Prettier's JSDoc formatting.

### Documentation

- Correct the `print-config` argument help and update the explanation of package.json configuration support.

### Maintenance

- Refresh Perfectionist and integrate the new rule plugins and generated types.

## [6.2.0] - 2026-04-01

### Changed

- Refresh Unicorn recommended rules.

### Fixed

- Treat imports with different query strings as distinct in duplicate-import checks.

### Maintenance

- Refresh TypeScript, Vitest, JSDoc, package.json, Unicorn, and development dependencies.

## [6.1.0] - 2026-03-24

### Changed

- Ignore `.agents`, `.claude`, and `skills-lock.json` by default and refresh package.json validation rules.

### Fixed

- Update initialized VS Code settings to the current workspace TypeScript SDK keys.

### Maintenance

- Refresh linting dependencies and simplify flat-config typings.

## [6.0.3] - 2026-03-08

### Maintenance

- Refresh linting dependencies and declare the newer Node.js requirement for development tooling separately from consumer engines.

## [6.0.2] - 2026-02-28

### Changed

- Check `fs/promises.glob` against the project's supported Node.js versions instead of exempting it.

### Maintenance

- Update MDX, package.json linting, and Svelte development dependencies.

## [6.0.1] - 2026-02-26

### Changed

- Refresh package.json and JSON validation rules.
- Allow nested functions in tests.

### Fixed

- Restore Node.js 20.19.0 support.
- Disable TypeScript member ordering that conflicts with Perfectionist.
- Allow CLI-only packages without an exports field.

### Maintenance

- Refresh linting dependencies and declare the package free of import-time side effects.

## [6.0.0] - 2026-02-20

### Changed

- **Breaking:** Require Node.js 22.21.0 or later.
- Enable Unicorn's isolated-functions rule.

### Removed

- **Breaking:** Remove the deprecated `kpi-eslint` executable; use `ksc-eslint`.

### Maintenance

- Migrate CLI/library builds to tsdown, externalize dependencies, declare their runtime requirements, and validate package exports and types.

## [5.13.0] - 2026-01-25

### Maintenance

- Refresh linting dependencies, including flat-config utilities 3 and newer YAML, TOML, and regexp plugins.

## [5.12.0] - 2026-01-18

### Changed

- Refresh package.json validation rules and adopt updated YAML/TOML plugins and parsers.

### Fixed

- Use `source.fixAll.eslint` in VS Code settings to prevent competing fix-on-save actions.

### Maintenance

- Refresh linting dependencies and use upstream ESLint-comments type declarations.

## [5.11.0] - 2025-12-27

### Changed

- **Breaking:** Migrate to Perfectionist 5, changing `generatePerfectionistSortConfig()` to return array-based `customGroups`.
- Add import/export attribute sorting and refresh TypeScript, HTML, and Vitest rules.

### Fixed

- Disable filename-case checks for Astro's embedded virtual scripts.

### Maintenance

- Refresh ESLint, parsers, plugins, and supporting dependencies.

## [5.10.0] - 2025-12-06

### Documentation

- Clarify that standalone setup installs the repository configuration files.

### Maintenance

- Refresh dependencies and invoke build scripts through tsx for cross-platform builds.

## [5.9.2] - 2025-11-26

No notable changes.

## [5.9.1] - 2025-11-26

### Maintenance

- Update the Svelte development dependency.

## [5.9.0] - 2025-11-26

### Added

- Enable De Morgan rules for negated conjunctions and disjunctions.

### Changed

- Sort pre/post keys semantically and refresh package.json and Vitest checks.

### Fixed

- Use TypeScript project services for Svelte, enable generic component parsing, and accept additional virtual import prefixes.

### Maintenance

- Refresh linting dependencies and build tooling.

## [5.8.3] - 2025-11-07

### Changed

- Stop requiring underscore prefixes on unused classes, enums, interfaces, and type declarations.

### Maintenance

- Update HTML linting dependencies.

## [5.8.2] - 2025-11-06

### Changed

- Accept underscore-prefixed unused declarations without enforcing their usual naming format.

### Maintenance

- Refresh HTML, Astro, Vitest, package.json, and development dependencies.

## [5.8.1] - 2025-11-04

No notable changes.

## [5.8.0] - 2025-11-04

### Changed

- Require package.json license metadata and refresh Unicorn defaults.

### Fixed

- Order the `types` export condition before `import` so TypeScript can resolve declarations correctly.

### Maintenance

- Refresh linting dependencies and build/release tooling.

## [5.7.4] - 2025-10-15

### Fixed

- Install `to-valid-identifier` as a runtime dependency to compensate for eslint-plugin-jsdoc's missing dependency.

## [5.7.3] - 2025-10-15

### Changed

- Apply semantic key ordering to object types and expand coordinate ordering patterns.
- Refresh JSDoc recommended rules.

### Fixed

- Pin eslint-react to 2.1.1 to retain the plugin structure expected by the React configuration.

### Documentation

- Disambiguate executable names in standalone installation commands.

### Maintenance

- Refresh dependencies and declaration-generation settings.

## [5.7.2] - 2025-10-06

### Changed

- Allow unused parameters named entirely with underscores and refresh React, JSDoc, and Vitest rule defaults.

### Maintenance

- Refresh ESLint, parsers, and plugin dependencies.

## [5.7.1] - 2025-09-29

### Changed

- Adopt eslint-react 2 and JSDoc 60 recommended rules, including stricter duplicate-key and nested-lazy-component checks.

### Maintenance

- Refresh parsers, linting plugins, and development dependencies.

## [5.7.0] - 2025-09-08

### Added

- Provide the `ksc-eslint` executable.

### Changed

- Refresh Svelte and Unicorn defaults and suppress redundant multiple-project import-resolver warnings.

### Deprecated

- Deprecate `kpi-eslint` in favor of `ksc-eslint`, retaining the old executable until the next major release.

### Documentation

- Update CLI reference and command examples for the `ksc` naming.

### Maintenance

- Refresh ESLint, framework plugins, JSDoc, and development dependencies.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Require Node.js 20.19.0 or later.
- Allow UPPER_CASE constants without exporting them, recognize `$` import aliases as internal, and sort open/close keys semantically.
- Refresh TypeScript, HTML, package.json, Svelte, and Unicorn defaults and retire deprecated rules.

### Fixed

- Allow callable Intl APIs and camelCase `.svelte.js`/`.svelte.ts` module names.

### Maintenance

- Refresh linting dependencies and preset generation.

## [5.5.0] - 2025-06-11

### Added

- Recognize `.svelte.js` and `.svelte.ts` modules and export corresponding glob constants.

### Fixed

- Apply shared JavaScript/TypeScript rules inside Svelte script blocks and supply the project/parser configuration they need.

### Maintenance

- Refresh TypeScript, Svelte, Vitest, and package.json linting dependencies.

## [5.4.4] - 2025-06-09

No notable changes.

## [5.4.3] - 2025-06-09

### Changed

- Require a package.json `type` field.

### Maintenance

- Refresh ESLint, parsers, framework plugins, and CLI dependencies.

## [5.4.2] - 2025-05-26

### Changed

- Enable Svelte's preference for writable derived values.

### Maintenance

- Refresh ESLint, framework plugins, parsers, and build tooling.

## [5.4.1] - 2025-05-11

### Changed

- Refresh TypeScript, React, HTML, package.json, and Unicorn defaults, including package description and HTML baseline checks.

### Maintenance

- Refresh linting dependencies and replace Chalk with Picocolors in the shared CLI.

## [5.4.0] - 2025-03-28

### Changed

- Prefer separate top-level type imports, update tsconfig key ordering, and refresh React and Svelte rule defaults.

### Fixed

- Preserve falsy default exports when resolving dynamically imported modules.

### Maintenance

- Refresh ESLint, parsers, plugins, and rule-generation tooling.

## [5.3.1] - 2025-03-10

### Fixed

- Accept Starlight `virtual:` imports and update MDX dependencies so ESLint 9 no longer needs a Markdown plugin override.

### Documentation

- Remove the obsolete Markdown plugin compatibility warning.

### Maintenance

- Refresh remaining linting and development dependencies.

## [5.3.0] - 2025-03-04

### Changed

- Sort start/end keys semantically and relax default-member, unpublished-import, and comment-capitalization checks.

### Fixed

- Prioritize width/height ordering over min/max ordering for overlapping property names.

### Documentation

- Document the Markdown plugin override required for ESLint 9 compatibility.

### Maintenance

- Update React, package.json linting, and Svelte development dependencies.

## [5.2.0] - 2025-03-04

### Changed

- Allow `util` and `utils` without abbreviation-expansion errors.

## [5.1.0] - 2025-03-03

### Changed

- **Breaking:** Change `generatePerfectionistSortConfig()` from `{ matchTrailing }` options to `exact`, `leading`, or `trailing` modes and expand semantic key ordering.
- Offer suggestions for restricted types instead of automatically replacing them.

### Fixed

- Accept SvelteKit starter HTML without document-boilerplate errors.
- Accept Astro package imports without unresolved-import errors.
- Preserve `@public` JSDoc annotations used to mark public APIs.
- Load TypeScript configuration imports correctly when printing the project configuration.

### Maintenance

- Refresh linting dependencies and regenerate React rules and rule types.

## [5.0.8] - 2025-03-02

No notable changes.

## [5.0.7] - 2025-03-02

### Changed

- Lower the Node.js requirement to 20.9.0 and remove the pnpm engine restriction.
- Adopt eslint-plugin-svelte 3 and its refreshed recommended rules.

### Maintenance

- Make preset generation and builds compatible with Node.js 20 and refresh dependencies.

## [5.0.6] - 2025-02-26

### Changed

- Refresh React and Unicorn rules and allow the Node.js `sep` abbreviation.

### Fixed

- Avoid false import errors for Astro virtual modules and CommonJS default imports.

### Maintenance

- Refresh linting dependencies and generation tools, including eslint-typegen 2.

## [5.0.5] - 2025-02-10

### Changed

- **Breaking:** Raise the minimum Node.js version to 22.13.1.
- Require package.json name, author, and keywords through refreshed package linting rules.

### Maintenance

- Refresh ESLint, Vitest, package.json linting, and Prettier dependencies.

## [5.0.4] - 2025-02-07

### Documentation

- Correct the package repository URL, add its homepage, and fix the README recommendation callout.

## [5.0.3] - 2025-02-07

No notable changes.

## [5.0.2] - 2025-02-07

### Fixed

- Declare the missing `find-workspaces` runtime dependency used by CLI workspace utilities.

## [5.0.1] - 2025-02-07

### Changed

- Sort shared-config fields at the end of package.json and exempt commented-out `if`/`else` code from capitalization checks.

### Fixed

- Merge the Markdown plugin compatibility override into consumer package.json during initialization and format merged JSON with Prettier.

### Maintenance

- Commit generated rule types, simplify rule regeneration, and update runtime dependencies.

## [5.0.0] - 2025-02-06

### Added

- Export a typed `eslintConfig()` factory, individual language/framework configurations, glob constants, and utilities for composing flat configs.
- Add JSON/JSONC/JSON5, package.json, YAML, TOML, and React rule sets, with automatic framework detection and `.gitignore` support.

### Changed

- **Breaking:** Migrate from the CommonJS ESLint 8 config to an ESM ESLint 9 flat config initialized as `eslint.config.ts`.
- **Breaking:** Replace `eslint-config` and its action flags with `kpi-eslint init`, `lint`, `fix`, and `print-config` subcommands.
- **Breaking:** Require Node.js 22 or later.
- Fail lint runs on warnings and support printing either the project configuration or the effective configuration for a file.

### Removed

- **Breaking:** Stop initializing TypeScript configuration files; install them through `@kitschpatrol/typescript-config` instead.

### Documentation

- Rewrite setup and CLI guidance for flat configuration and document the config's origins and customization differences.

### Maintenance

- Add preset/type generation, ESM library builds with declarations, and CLI regression tests; refresh linting and command-line dependencies.

## [4.7.12] - 2024-11-08

### Maintenance

- Refresh Astro, JSX accessibility, Node, Perfectionist, and Svelte linting dependencies.

## [4.7.11] - 2024-09-28

### Changed

- **Breaking:** Require ESLint 8.57.1 or later within ESLint 8.

### Maintenance

- Refresh HTML, Node, Perfectionist, and Svelte linting dependencies.

## [4.7.10] - 2024-09-15

### Maintenance

- Refresh Astro, Perfectionist, and Svelte linting dependencies.

## [4.7.9] - 2024-09-14

No notable changes.

## [4.7.8] - 2024-09-14

No notable changes.

## [4.7.7] - 2024-09-14

### Maintenance

- Clean up repository and issue-tracker metadata in the package manifest.

## [4.7.6] - 2024-09-13

### Changed

- Exclude Parcel's cache in initialized projects.

### Fixed

- Allow camelCase exported constants alongside UPPER_CASE names.

### Maintenance

- Update Perfectionist and invoke README generation through pnpm during builds.

## [4.7.5] - 2024-09-07

No notable changes.

## [4.7.4] - 2024-09-07

No notable changes.

## [4.7.3] - 2024-09-07

### Changed

- Allow UPPER_CASE exported constants.

### Fixed

- Use Perfectionist 3's legacy preset and current import-sorting options.

### Maintenance

- Refresh linting dependencies, including Perfectionist 3 and XO TypeScript 5.

## [4.7.2] - 2024-06-14

No notable changes.

## [4.7.1] - 2024-06-09

No notable changes.

## [4.7.0] - 2024-06-07

### Added

- Include a starter `tsconfig.json` and broaden the ESLint tsconfig to cover project configuration files.

### Documentation

- Explain the TypeScript configuration files installed during initialization.

### Maintenance

- Refresh linting dependencies, including Astro parser/plugin 1, eslint-plugin-n 17, and Unicorn 53.

## [4.6.7] - 2024-06-05

### Maintenance

- Update typescript-eslint dependencies and reorganize mdat README templates.

## [4.6.6] - 2024-05-20

No notable changes.

## [4.6.5] - 2024-05-19

No notable changes.

## [4.6.4] - 2024-05-19

### Maintenance

- Refresh TypeScript, HTML, Perfectionist, and Svelte linting dependencies.

## [4.6.3] - 2024-04-18

### Maintenance

- Refresh TypeScript, HTML, Perfectionist, and Svelte linting dependencies.

## [4.6.2] - 2024-04-08

### Fixed

- Restrict the ESLint peer dependency to version 8 to avoid unsupported ESLint 9 installations.

### Maintenance

- Refresh HTML, TypeScript, Perfectionist, and Svelte dependencies.

## [4.6.1] - 2024-03-17

No notable changes.

## [4.6.0] - 2024-03-17

### Changed

- **Breaking:** Raise the minimum ESLint peer version to 8.57.0.

### Maintenance

- Refresh HTML, TypeScript, XO, and Perfectionist linting dependencies.

## [4.5.0] - 2024-02-29

### Documentation

- Clarify the package description in the README and CLI reference.

### Maintenance

- Update XO TypeScript rules and add package discovery keywords.

## [4.4.3] - 2024-02-29

### Maintenance

- Update TypeScript ESLint and XO TypeScript dependencies.

## [4.4.2] - 2024-02-23

No notable changes.

## [4.4.1] - 2024-02-22

No notable changes.

## [4.4.0] - 2024-02-20

### Documentation

- Add CLI option reference, package badges, and license information.

### Maintenance

- Refresh linting dependencies, including typescript-eslint 7, and generate README sections with mdat.

## [4.3.3] - 2024-01-14

### Documentation

- Correct ESLint and VS Code capitalization in package metadata and usage guidance.

## [4.3.2] - 2024-01-14

### Changed

- Use the workspace TypeScript installation in initialized VS Code settings.

### Fixed

- Preserve the `.env.example` ignore exception and prevent inherited tsconfig exclusions from omitting lint targets.

### Maintenance

- Refresh TypeScript, Astro, MDX, Node, and Unicorn linting dependencies.

## [4.3.1] - 2023-12-23

### Changed

- Refine naming conventions to allow underscored variables, PascalCase imports, and destructured component names.

### Maintenance

- Update eslint-plugin-mdx.

## [4.3.0] - 2023-12-22

### Added

- Lint HTML markup for accessibility, document structure, and best practices, lint inline scripts, and enable HTML validation in VS Code.

## [4.2.2] - 2023-12-22

### Fixed

- Resolve `tsconfig.eslint.json` from the consuming project's working directory, including TypeScript and Astro overrides.

## [4.2.1] - 2023-12-21

### Changed

- Enforce TypeScript naming conventions and apply shared TypeScript rule overrides to JavaScript.
- Exclude generated `env.d.ts` files in the starter ignore configuration.

### Fixed

- Accept kebab-case Astro pages and `[slug].astro`.
- Apply shared rule overrides to MDX files.

## [4.2.0] - 2023-12-20

### Maintenance

- Update eslint-plugin-n.

## [4.1.3] - 2023-12-19

No notable changes.

## [4.1.2] - 2023-12-19

### Maintenance

- Update the TypeScript ESLint parser and plugin.

## [4.1.1] - 2023-12-19

No notable changes.

## [4.1.0] - 2023-12-18

No notable changes.

## [4.0.0] - 2023-12-16

### Added

- Initialize ESLint's VS Code extension recommendation, validation settings, and fix-on-save behavior, merging existing VS Code JSON files.

### Maintenance

- Migrate initialization file handling to fs-extra and rename the distributed config entry to `eslint.config.cjs`.

## [3.1.0] - 2023-12-16

No notable changes.

## [3.0.4] - 2023-12-16

### Documentation

- Correct repository initialization instructions to include `--init`.

## [3.0.3] - 2023-12-15

No notable changes.

## [3.0.2] - 2023-12-15

No notable changes.

## [3.0.1] - 2023-12-15

### Fixed

- Correct published file patterns so CLI and initialization assets are included.

## [3.0.0] - 2023-12-15

### Added

- Initialize a dedicated `tsconfig.eslint.json` and default ignores for generated files, dependencies, and local artifacts.

### Changed

- **Breaking:** Enable type-aware TypeScript linting through `tsconfig.eslint.json` and update JavaScript globals and shared rule defaults.
- Separate Markdown and MDX overrides, allow content or component filenames for MDX, and disable MDX code-block linting.

### Fixed

- Apply the correct Astro and Svelte plugins, with framework-specific rules for templates, reactive statements, props, and filenames.

### Documentation

- Update setup to use `repo-config` and explain that ESLint ignores must be configured separately from `.gitignore`.

## [2.2.1] - 2023-12-13

### Added

- Add `-p` as an alias for `--print-config`.

### Changed

- Render effective configuration output as compact, colorized JSON.

### Fixed

- Limit MDX recommended rules to Markdown/MDX files instead of applying them to all source files.

### Documentation

- Expand generated CLI help with configuration output, help, and version information.

### Maintenance

- Bundle shared CLI utilities and simplify runtime dependency declarations.

## [2.2.0] - 2023-12-12

### Added

- Lint Markdown/MDX files and embedded code blocks with the MDX parser and recommended rules.

### Changed

- Mark generated ESLint configurations as root configurations.

### Maintenance

- Refresh shared CLI dependency declarations.

## [2.1.1] - 2023-12-12

### Added

- Add `--print-config`, help/version output, and action aliases (`-i`, `-l`/`--lint`, `-f`).

### Changed

- Accept file/glob arguments, run checks by default, and prefix tool output with colored ESLint labels.
- Adopt XO, XO TypeScript, and Node.js recommended presets, with separate preset stacks by file type.
- Allow warning comments, `await` in loops, and the `acc` abbreviation.

### Fixed

- Forward subprocess error output and preserve interactive input for initialization.

### Maintenance

- Replace zx scripts with a shared TypeScript command builder, bundle CLI executables before publication, and refresh parser/plugin dependencies.

## [2.0.0] - 2023-12-08

### Changed

- **Breaking:** Replace `eslint-config-init` with the unified `eslint-config --init`, `--check`, and `--fix` CLI.
- Enable browser and Node.js globals in the default environment.
- Allow `props` and `args` abbreviations.

### Documentation

- Update initialization and lint/fix script examples for the unified CLI.

### Maintenance

- Add the zx-based command runner and argument-parsing dependencies.

## [1.0.1] - 2023-12-07

### Documentation

- Install the configuration as a development dependency in the setup instructions.

## [1.0.0] - 2023-12-07

### Added

- Provide a CommonJS ESLint preset combining recommended JavaScript/TypeScript checks, Unicorn rules, natural sorting, and Prettier compatibility.
- Include Astro/Svelte parsers and framework-specific overrides, with Astro JSX accessibility checks.
- Provide `eslint-config-init` to create starter `.eslintrc.cjs` and `.eslintignore` files while preserving existing files.

### Documentation

- Document standalone installation, configuration overrides, editor integration, and lint/fix package scripts.

### Maintenance

- Set up public npm distribution for ESLint 8.52 or newer, with Node.js 18 and pnpm 8 minimums.

[Unreleased]: https://github.com/kitschpatrol/shared-config/compare/v8.14.1...HEAD
[1.0.0]: https://github.com/kitschpatrol/shared-config/releases/tag/v1.0.0
[1.0.1]: https://github.com/kitschpatrol/shared-config/compare/v1.0.0...v1.0.1
[2.0.0]: https://github.com/kitschpatrol/shared-config/compare/v1.0.1...v2.0.0
[2.1.1]: https://github.com/kitschpatrol/shared-config/compare/v2.0.0...v2.1.1
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
