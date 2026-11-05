# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [8.14.1] - 2026-11-03

No notable changes.

## [8.14.0] - 2026-10-27

### Fixed

- Restrict directory arguments to supported file extensions so Stylelint does not lint unrelated files.

### Maintenance

- Refresh Execa and Prettier, and normalize published package inclusion paths.

## [8.13.1] - 2026-10-08

No notable changes.

## [8.13.0] - 2026-10-08

### Maintenance

- Update Execa to version 10.1 and refresh package discovery metadata.

## [8.12.1] - 2026-10-06

No notable changes.

## [8.12.0] - 2026-10-06

### Fixed

- Preserve string-form CSS imports and convert URL imports to strings so Tailwind's PostCSS plugin can inline its styles.

## [8.11.0] - 2026-10-04

### Maintenance

- Update the Stylelint runtime dependency to `^17.16.0`.

## [8.10.1] - 2026-09-28

### Maintenance

- Refresh filesystem and Prettier runtime dependencies.

## [8.10.0] - 2026-09-22

### Fixed

- Filter mixed explicit file lists to supported extensions and skip Stylelint when no applicable files remain.

### Maintenance

- Refresh Prettier and Yargs runtime dependencies.

## [8.9.0] - 2026-09-17

### Maintenance

- Update the Prettier runtime dependency to `^3.9.7`.

## [8.8.0] - 2026-09-07

### Maintenance

- Refresh Stylelint, Cosmiconfig, and the defensive CSS plugin.
- Use the shared Vitest configuration and update tsdown package-type validation settings.

## [8.7.0] - 2026-08-26

### Documentation

- Link Stylelint's homepage from configuration-factory API documentation.

### Maintenance

- Upgrade to Cosmiconfig 10 and `stylelint-config-html` 2, and refresh the defensive CSS plugin.

## [8.6.0] - 2026-07-31

### Maintenance

- Refresh Execa and Yargs runtime dependencies.

## [8.5.0] - 2026-07-24

### Documentation

- Correct package, license, Stylelint documentation, and VS Code Problems-panel links.

### Maintenance

- Update the `fs-extra` runtime dependency to version 11.4.

## [8.4.0] - 2026-07-22

### Fixed

- Locate starter files relative to the installed CLI package so `init` copies the correct configuration.
- Return failure in machine and JSON modes when parsed diagnostics contain errors, even if the tool exits successfully.

### Maintenance

- Refresh Stylelint, the defensive CSS plugin, and Prettier.

## [8.3.0] - 2026-07-20

### Added

- Enable content-based Stylelint caching under the workspace's `node_modules/.cache/ksc`, controlled by `--cache` and `--no-cache`.

### Changed

- Render JSON reports compactly and colorize them when appropriate for the output destination.

### Fixed

- Respect color overrides and output destinations, keeping machine-format diagnostics free of ANSI codes.

### Maintenance

- Upgrade the CLI subprocess dependency to Execa 10.

## [8.2.0] - 2026-07-16

### Added

- Add `--format native|machine|json` to lint and fix commands, including normalized diagnostics and aggregate JSON reports.
- Install VS Code lint and fix tasks with Problems-panel integration, merging existing tasks by label.

### Fixed

- Preserve complete CLI output lines when subprocess streams split them across chunks.

### Documentation

- Document structured output formats and the VS Code task workflow.

### Maintenance

- Add tests for diagnostic adapters and structured CLI output.

## [8.1.0] - 2026-07-10

### Maintenance

- Update the Prettier runtime dependency to `^3.9.5`.

## [8.0.0] - 2026-07-07

### Added

- Enable the recommended defensive CSS preset, with exceptions for intentional text-selection restrictions, simple grids, and scoped element selectors.

### Changed

- **Breaking:** Require Node.js `^24.16.0 || >=26.3.0`.

### Documentation

- Document the defensive CSS preset among the included rule sets.

### Maintenance

- Refresh Stylelint, Prettier, configuration-loading, and filesystem dependencies.

## [7.6.4] - 2026-06-11

No notable changes.

## [7.6.3] - 2026-06-05

### Maintenance

- Update Stylelint to `^17.12.0` and upgrade `stylelint-config-clean-order` to version 10.
- Refresh package-validation tooling to resolve the attw/fflate build compatibility issue.

## [7.6.2] - 2026-05-18

No notable changes.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Set supported Node.js versions to `^22.22.2 || >=24.0.0`.

### Maintenance

- Update the Stylelint runtime dependency to `^17.11.1`.

## [7.6.0] - 2026-05-14

### Maintenance

- Update Stylelint to `^17.11.0` and refresh filesystem runtime dependencies.

## [7.5.3] - 2026-05-03

### Documentation

- Correct the MIT license badge link.

## [7.5.2] - 2026-04-28

No notable changes.

## [7.5.1] - 2026-04-27

### Maintenance

- Update the Stylelint runtime dependency to `^17.9.1`.

## [7.5.0] - 2026-04-22

### Maintenance

- Update Stylelint to `^17.8.0` and Prettier to `^3.8.3`.

## [7.4.1] - 2026-04-13

No notable changes.

## [7.4.0] - 2026-04-13

### Maintenance

- Update Stylelint to `^17.7.0` and Prettier to `^3.8.2`.

## [7.3.0] - 2026-04-09

### Maintenance

- Update the TypeScript configuration loader to version 6.3.

## [7.2.0] - 2026-04-08

### Added

- Export `fix`, `fixFile`, and `clearCache` APIs with syntax hints and configuration overrides, plus `sharedStylelintConfig`, `FileType`, and `StylelintConfig`.

### Documentation

- Add examples for programmatic CSS fixing, per-call overrides, syntax selection, and cache clearing.

### Maintenance

- Add regression tests for the programmatic fixing API.

## [7.1.0] - 2026-04-05

No notable changes.

## [7.0.2] - 2026-04-04

No notable changes.

## [7.0.1] - 2026-04-03

No notable changes.

## [7.0.0] - 2026-04-02

### Changed

- **Breaking:** Require Node.js 22.18 or newer, dropping Node.js 20 support.

### Documentation

- Replace placeholder descriptions for `init --location` and `print-config` file arguments in CLI help.

## [6.2.0] - 2026-04-01

### Fixed

- Normalize Windows workspace paths when resolving package directories and project roots.

### Maintenance

- Update the Stylelint runtime dependency to `^17.6.0`.

## [6.1.0] - 2026-03-24

### Maintenance

- Update the Stylelint runtime dependency to `^17.5.0`.

## [6.0.3] - 2026-03-08

### Maintenance

- Refresh Cosmiconfig and filesystem runtime dependencies.
- Require Node.js 22.18 or newer for contributor build tooling.

## [6.0.2] - 2026-02-28

No notable changes.

## [6.0.1] - 2026-02-26

### Fixed

- Restore the supported Node.js engine range to 20.19 or newer.

### Maintenance

- Update Stylelint to `^17.4.0` and mark the published package as side-effect-free for bundlers.

## [6.0.0] - 2026-02-20

### Changed

- **Breaking:** Require Node.js 22.21 or newer.

### Removed

- **Breaking:** Remove the deprecated `kpi-stylelint` executable; use `ksc-stylelint` instead.

### Maintenance

- Migrate builds from esbuild to tsdown with package validation and explicitly declared runtime dependencies.
- Upgrade to Yargs 18 and Stylelint 17.3, and refresh runtime dependencies.

## [5.13.0] - 2026-01-25

### Maintenance

- Update the Prettier runtime dependency to `^3.8.1`.

## [5.12.0] - 2026-01-18

### Fixed

- Use Stylelint-specific VS Code save actions to avoid races with other formatters.

### Maintenance

- Upgrade to Stylelint 17 and `stylelint-config-standard` 40, and refresh Prettier.

## [5.11.0] - 2025-12-27

### Maintenance

- Update the `fs-extra` runtime dependency to `^11.3.3`.

## [5.10.0] - 2025-12-06

### Documentation

- Update setup instructions to describe repository configuration files after the pnpm hoisting configuration migration.

### Maintenance

- Refresh runtime dependencies, including Prettier 3.7, and invoke build scripts explicitly with `tsx` for cross-platform compatibility.

## [5.9.2] - 2025-11-26

No notable changes.

## [5.9.1] - 2025-11-26

No notable changes.

## [5.9.0] - 2025-11-26

### Maintenance

- Update Stylelint to `^16.26.0` and upgrade `stylelint-config-clean-order` to version 8.

## [5.8.3] - 2025-11-07

No notable changes.

## [5.8.2] - 2025-11-06

No notable changes.

## [5.8.1] - 2025-11-04

No notable changes.

## [5.8.0] - 2025-11-04

No notable changes.

## [5.7.4] - 2025-10-15

No notable changes.

## [5.7.3] - 2025-10-15

### Documentation

- Specify the `ksc-repo` executable explicitly in bootstrap installation instructions.

### Maintenance

- Update the TypeScript configuration loader to version 6.2.

## [5.7.2] - 2025-10-06

### Maintenance

- Refresh Stylelint and its standard preset.

## [5.7.1] - 2025-09-29

### Maintenance

- Update the `fs-extra` runtime dependency to `^11.3.2`.

## [5.7.0] - 2025-09-08

### Added

- Add `ksc-stylelint` as the preferred CLI executable.

### Deprecated

- Deprecate the `kpi-stylelint` executable in preparation for its removal in the next major release.

### Documentation

- Update command examples and CLI reference material to use the `ksc` names.

### Maintenance

- Update Stylelint to `^16.24.0`.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Require Node.js 20.19 or newer.

### Maintenance

- Refresh Stylelint, its standard preset, filesystem utilities, and Prettier.

## [5.5.0] - 2025-06-11

No notable changes.

## [5.4.4] - 2025-06-09

No notable changes.

## [5.4.3] - 2025-06-09

### Maintenance

- Update Stylelint to `^16.20.0` and Execa to version 9.6.

## [5.4.2] - 2025-05-26

No notable changes.

## [5.4.1] - 2025-05-11

### Maintenance

- Update Stylelint, its standard preset, and Execa; replace Chalk with picocolors in the shared CLI.

## [5.4.0] - 2025-03-28

### Maintenance

- Update the Stylelint runtime dependency to `^16.17.0`.

## [5.3.1] - 2025-03-10

No notable changes.

## [5.3.0] - 2025-03-04

No notable changes.

## [5.2.0] - 2025-03-04

No notable changes.

## [5.1.0] - 2025-03-03

### Fixed

- Load TypeScript configurations containing relative imports correctly when printing configuration.

### Maintenance

- Refresh Prettier and add the shared TypeScript configuration loader.

## [5.0.8] - 2025-03-02

No notable changes.

## [5.0.7] - 2025-03-02

### Changed

- Allow Node.js 20.9 or newer and remove the pnpm engine restriction.

### Fixed

- Build the CLI for Node.js 20 and provide CommonJS `require` support inside its ESM bundle.

### Maintenance

- Update the Stylelint runtime dependency to `^16.15.0`.

## [5.0.6] - 2025-02-26

### Maintenance

- Update the Prettier runtime dependency to `^3.5.2`.

## [5.0.5] - 2025-02-10

### Changed

- **Breaking:** Require Node.js 22.13.1 or newer and enable type stripping when invoking tools that load TypeScript configurations.

### Maintenance

- Update the Prettier runtime dependency to version 3.5.

## [5.0.4] - 2025-02-07

### Documentation

- Correct GitHub alert markup in the usage documentation.

### Maintenance

- Correct repository URLs and add package homepage metadata.

## [5.0.3] - 2025-02-07

No notable changes.

## [5.0.2] - 2025-02-07

### Fixed

- Declare the required `find-workspaces` runtime dependency so standalone CLI installations can start.

## [5.0.1] - 2025-02-07

### Changed

- Format configuration JSON written or merged by `init` using project Prettier settings.

### Fixed

- Honor `init --location` when initialization is invoked through the aggregate `kpi` command.

## [5.0.0] - 2025-02-06

### Added

- Export a typed `stylelintConfig()` factory for customizing the shared configuration.
- Add `init --location file|package` to choose between a configuration file and a `package.json` entry.

### Changed

- **Breaking:** Replace the `stylelint-config` executable and action flags with `kpi-stylelint` subcommands: `init`, `lint`, `fix`, and `print-config`.
- **Breaking:** Publish the configuration as ESM and generate `stylelint.config.js` instead of `.stylelintrc.cjs`.
- **Breaking:** Require Node.js 22 or newer.
- Include JSX, TSX, PHP, and Vue files in default lint and fix searches.
- Show the discovered configuration path and resolve file-specific settings in `print-config`.
- Install Stylelint automatically as a runtime dependency instead of requiring it as a peer.

### Fixed

- Resolve the default `.gitignore` path from the workspace root.

### Documentation

- Expand setup, configuration-storage, customization, ignore, and CLI usage guidance.

### Maintenance

- Add end-to-end CLI coverage and update package builds and contributor tooling, including pnpm 10.
- Refresh Stylelint presets and CLI runtime dependencies.

## [4.7.12] - 2024-11-08

### Maintenance

- Update the Stylelint peer dependency to `^16.10.0`.

## [4.7.11] - 2024-09-28

### Maintenance

- Update the Stylelint peer dependency to `^16.9.0`.

## [4.7.10] - 2024-09-15

No notable changes.

## [4.7.9] - 2024-09-14

No notable changes.

## [4.7.8] - 2024-09-14

No notable changes.

## [4.7.7] - 2024-09-14

### Maintenance

- Normalize repository and issue-tracker package metadata.

## [4.7.6] - 2024-09-13

### Maintenance

- Run README generation through the workspace formatting workflow during package builds.

## [4.7.5] - 2024-09-07

No notable changes.

## [4.7.4] - 2024-09-07

No notable changes.

## [4.7.3] - 2024-09-07

### Maintenance

- Refresh the standard and property-ordering Stylelint presets.

## [4.7.2] - 2024-06-14

No notable changes.

## [4.7.1] - 2024-06-09

No notable changes.

## [4.7.0] - 2024-06-07

### Maintenance

- Upgrade `stylelint-config-clean-order` to version 6.

## [4.6.7] - 2024-06-05

### Maintenance

- Update the Stylelint peer dependency to `^16.6.1` and migrate README generation to individual template directives.

## [4.6.6] - 2024-05-20

No notable changes.

## [4.6.5] - 2024-05-19

### Maintenance

- Update the Stylelint peer dependency to `^16.5.0`.

## [4.6.4] - 2024-05-19

No notable changes.

## [4.6.3] - 2024-04-18

No notable changes.

## [4.6.2] - 2024-04-08

### Maintenance

- Update `stylelint-config-clean-order` to `^5.4.2`.

## [4.6.1] - 2024-03-17

No notable changes.

## [4.6.0] - 2024-03-17

### Maintenance

- Update the Stylelint peer dependency to `^16.2.1`.

## [4.5.0] - 2024-02-29

### Maintenance

- Add package discovery keywords and standardize package metadata.

## [4.4.3] - 2024-02-29

No notable changes.

## [4.4.2] - 2024-02-23

No notable changes.

## [4.4.1] - 2024-02-22

No notable changes.

## [4.4.0] - 2024-02-20

### Documentation

- Add a CLI reference and license information to the README.

### Maintenance

- Adopt mdat for README generation and include an MIT license file in the package.
- Update the clean-order preset dependency.

## [4.3.3] - 2024-01-14

### Documentation

- Correct VS Code naming in the usage instructions.

## [4.3.2] - 2024-01-14

### Changed

- **Breaking:** Require Stylelint 16 through the peer dependency, replacing Stylelint 15 support.

### Maintenance

- Update the standard and clean-order preset dependencies.

## [4.3.1] - 2023-12-23

No notable changes.

## [4.3.0] - 2023-12-22

No notable changes.

## [4.2.2] - 2023-12-22

No notable changes.

## [4.2.1] - 2023-12-21

### Fixed

- Allow empty style sources in Astro templates.

### Documentation

- Add Stylelint type annotations to the starter configuration.

## [4.2.0] - 2023-12-20

No notable changes.

## [4.1.3] - 2023-12-19

No notable changes.

## [4.1.2] - 2023-12-19

No notable changes.

## [4.1.1] - 2023-12-19

No notable changes.

## [4.1.0] - 2023-12-18

No notable changes.

## [4.0.0] - 2023-12-16

### Added

- Include VS Code Stylelint extension recommendations, validation settings, and explicit fix-on-save configuration in initialization.

### Changed

- **Breaking:** Initialize without overwrite prompts, replacing ordinary starter files and deep-merging existing VS Code JSON settings and recommendation arrays.

### Maintenance

- Replace shell-based initialization with fs-extra and rename the configuration entry file.

## [3.1.0] - 2023-12-16

No notable changes.

## [3.0.4] - 2023-12-16

### Documentation

- Add the required `--init` flag to repository setup instructions.

## [3.0.3] - 2023-12-15

### Fixed

- Declare the missing cosmiconfig runtime dependency required by the CLI.

## [3.0.2] - 2023-12-15

No notable changes.

## [3.0.1] - 2023-12-15

### Fixed

- Correct published-file patterns so executable and starter configuration assets are included.

## [3.0.0] - 2023-12-15

### Documentation

- Update setup instructions to use the renamed `@kitschpatrol/repo-config` package.

## [2.2.1] - 2023-12-13

### Added

- Add `-p` as a short alias for `--print-config`.

### Changed

- Print effective Stylelint configuration as compact, colorized JSON and default its target to the current directory.

### Documentation

- Expand generated CLI help with help, version, and print-config options.

### Maintenance

- Refresh CLI runtime dependencies for JSON formatting.

## [2.2.0] - 2023-12-12

### Maintenance

- Add the `up` runtime dependency.

## [2.1.1] - 2023-12-12

### Added

- Add `--print-config`, help, and version support to the Stylelint wrapper.

### Changed

- Accept file and glob arguments, check the project by default, and allow multiple operation flags.
- Resolve initialization against the nearest package directory and prefix command output with colored Stylelint labels.

### Maintenance

- Replace the zx runner with a shared TypeScript command builder and build the executable before publishing.

## [2.0.0] - 2023-12-08

### Added

- Add `--check` and `--fix` CLI modes for CSS, SCSS, Sass, Svelte, HTML, and Astro files, respecting `.gitignore` and allowing empty matches.

### Changed

- **Breaking:** Replace `stylelint-config-init` with `stylelint-config --init`; require exactly one operation flag.

### Documentation

- Update initialization and package-script examples for the unified CLI.

### Maintenance

- Introduce a zx-based CLI runner and argument parsing.

## [1.0.1] - 2023-12-07

### Documentation

- Install the configuration as a development dependency and document `.gitignore` handling.

## [1.0.0] - 2023-12-07

### Added

- Provide a CommonJS Stylelint configuration combining standard CSS rules, compact property ordering, and HTML/component style support.
- Allow `:global`, flexible class names and hex color lengths, and declarations and comments without mandatory blank lines.
- Provide `stylelint-config-init` to copy a starter `.stylelintrc.cjs` while preserving existing files, with Node.js 18+, pnpm 8+, and Stylelint 15 peer support.

### Documentation

- Document standalone installation, configuration overrides, editor integration, and lint/fix script examples.

### Maintenance

- Set up monorepo linting and public npm package metadata.

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
