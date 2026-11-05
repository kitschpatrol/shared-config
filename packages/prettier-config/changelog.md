# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [8.14.1] - 2026-11-03

### Maintenance

- Update `prettier-plugin-packagejson` to 3.1 and `prettier-plugin-toml` to 4.1.

## [8.14.0] - 2026-10-27

### Maintenance

- Refresh Prettier, Astro, PHP, package.json formatting, Execa, and package-sorting dependencies.

## [8.13.1] - 2026-10-08

No notable changes.

## [8.13.0] - 2026-10-08

### Maintenance

- Update Execa to 10.1 and refresh package discovery keywords.

## [8.12.1] - 2026-10-06

### Changed

- Exclude `.agents/` from formatting in newly initialized projects.

## [8.12.0] - 2026-10-06

### Maintenance

- Specify heading options explicitly in the README's CLI-help generation template.

## [8.11.0] - 2026-10-04

No notable changes.

## [8.10.1] - 2026-09-28

### Maintenance

- Refresh Prettier and formatter plugins, including Astro, shell, and TOML support; upgrade the TOML plugin to version 3.

## [8.10.0] - 2026-09-22

### Changed

- Switch Astro formatting from the maintained fork back to upstream `prettier-plugin-astro` 1.x.

### Fixed

- Skip explicitly supplied files with unsupported extensions instead of failing with a missing-parser error.

### Documentation

- Document the temporary loss of Tailwind class sorting in Astro files with the upstream Astro plugin's new syntax tree.

### Maintenance

- Update Prettier to 3.9.8 and Yargs to 18.2.

## [8.9.0] - 2026-09-17

### Maintenance

- Update Prettier to 3.9.7 and simplify internal configuration-resolution helpers.

## [8.8.0] - 2026-09-07

### Maintenance

- Update Cosmiconfig to 10.0.1.
- Adapt package type validation to tsdown 0.23 and run package tests with the shared Vitest configuration.

## [8.7.0] - 2026-08-26

### Documentation

- Link the configuration factory's API documentation to Prettier.

### Maintenance

- Upgrade Cosmiconfig to version 10 and `deepmerge-ts` to version 8.

## [8.6.0] - 2026-07-31

### Maintenance

- Update Execa and Yargs runtime dependencies.

## [8.5.0] - 2026-07-24

### Maintenance

- Update `fs-extra` to 11.4.

## [8.4.0] - 2026-07-22

### Added

- Include Tailwind plugin options in the exported `PrettierConfig` type.

### Changed

- Restore Tailwind class sorting alongside JSDoc formatting, including Astro and Svelte parser overrides.

### Fixed

- Apply file-specific parser and formatting overrides in the programmatic API when using the shared configuration without a local config file.
- Apply space indentation overrides to `.markdown` and `.yaml` files.

### Documentation

- Explain the canonical Astro package alias used for compatibility with Tailwind's plugin resolution.

### Maintenance

- Update Prettier and the Tailwind plugin, and expand API integration coverage for parser overrides and plugin composition.

## [8.3.0] - 2026-07-20

### Added

- Enable content-based Prettier caching for lint and fix, stored under `node_modules/.cache/ksc`, with `--no-cache` to disable it.

### Changed

- Render compact JSON reports with terminal-aware coloring and consistent `NO_COLOR` and `FORCE_COLOR` handling.
- Exclude `.claude/` from formatting in newly initialized projects.

### Maintenance

- Upgrade Execa to version 10 and adapt subprocess exit-code handling.

## [8.2.0] - 2026-07-16

### Added

- Add `--format native|machine|json` to `ksc-prettier lint` and `fix`, supporting editor diagnostics and structured reports.
- Install VS Code lint and fix tasks through `init`, with problem matchers that populate the Problems panel.

### Documentation

- Document VS Code task usage, diagnostic reporting, and merging tasks into existing projects.

### Maintenance

- Update `prettier-plugin-sh` to 0.19.

## [8.1.0] - 2026-07-10

### Maintenance

- Update Prettier to 3.9.5 and adjust internal plugin-resolution typing for stricter TypeScript checks.

## [8.0.0] - 2026-07-07

### Changed

- **Breaking:** Require Node.js `^24.16.0 || >=26.3.0`, dropping support for earlier Node releases.

### Maintenance

- Upgrade Prettier to 3.9.4 and refresh configuration-loading and filesystem dependencies.

## [7.6.4] - 2026-06-11

### Maintenance

- Update the Astro formatter fork and upgrade `sort-package-json` to version 4.

## [7.6.3] - 2026-06-05

### Maintenance

- Update `prettier-plugin-jsdoc` to 1.8.1.
- Refresh build and package-validation tooling, resolving the Are the Types Wrong/fflate tooling issue and removing its dependency override.

## [7.6.2] - 2026-05-18

No notable changes.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Require Node.js `^22.22.2 || >=24.0.0`, raising the minimum supported Node 22 version.

## [7.6.0] - 2026-05-14

### Changed

- **Breaking:** Change supported Node.js versions to `^22.18.0 || >=24.0.0`.

### Maintenance

- Update filesystem/Svelte dependencies and migrate contributor/CI tooling to pnpm 11.
- Fix npm-token propagation during package publishing.

## [7.5.3] - 2026-05-03

### Fixed

- Keep the JSDoc plugin in Astro, Svelte, and shell overrides to eliminate unknown-option warnings without suppressing output.

### Documentation

- Update the README's MIT license link.

## [7.5.2] - 2026-04-28

### Fixed

- Explicitly load prettier-plugin-jsdoc in CLI commands so other `--plugin` flags do not disable JSDoc formatting.

## [7.5.1] - 2026-04-27

### Maintenance

- Update the Tailwind formatting plugin to 0.8.0.

## [7.5.0] - 2026-04-22

### Maintenance

- Update Prettier to 3.8.3.

## [7.4.1] - 2026-04-13

### Fixed

- Update the Astro plugin fork to restore module resolution through its default export.

## [7.4.0] - 2026-04-13

### Changed

- Use the @kitschpatrol/prettier-plugin-astro fork for Astro formatting.

### Documentation

- Explain the Astro plugin fork and its unmerged upstream fixes.

### Maintenance

- Update Prettier to 3.8.2 and refresh build tooling.

## [7.3.0] - 2026-04-09

### Maintenance

- Add CLI integration coverage for file/glob targeting, multiple arguments, and default-directory behavior.
- Update the TypeScript configuration loader and package release scripts.

## [7.2.0] - 2026-04-08

### Added

- Export `fix`, `fixFile`, and `clearCache` for formatting strings/files with parser inference, project configuration, and per-call overrides.
- Export `FileType`, `PrettierConfig`, and `sharedPrettierConfig` for programmatic use.

### Documentation

- Add API examples and clarify that Ruby installations other than rbenv are supported.

### Maintenance

- Add API regression tests, explicitly configure the library build entry point, and update the shell formatting plugin.

## [7.1.0] - 2026-04-05

No notable changes.

## [7.0.2] - 2026-04-04

No notable changes.

## [7.0.1] - 2026-04-03

No notable changes.

## [7.0.0] - 2026-04-02

### Added

- Format JSDoc comments and examples with prettier-plugin-jsdoc and shared JSDoc options.

### Changed

- **Breaking:** Require Node.js 22.18.0 or later.

### Removed

- **Breaking:** Disable built-in Tailwind CSS class sorting while its plugin conflicts with JSDoc formatting.

### Fixed

- Filter spurious unknown-JSDoc-option warnings from CLI output.

### Documentation

- Replace the placeholder description for the initialization `--location` option.

### Maintenance

- Add Linux, macOS, and Windows CI for building, linting, and testing.

## [6.2.0] - 2026-04-01

### Fixed

- Normalize Windows workspace-root paths used to locate project ignore files.

### Maintenance

- Update the PHP formatting plugin.

## [6.1.0] - 2026-03-24

### Changed

- Exclude `skills-lock.json` in the starter ignore file.

### Documentation

- Explain shared plugin configuration and pnpm dependency hoisting.

## [6.0.3] - 2026-03-08

### Maintenance

- Refresh formatting/configuration-loading dependencies and declare Node.js 22.18.0 or later for contributor builds.

## [6.0.2] - 2026-02-28

No notable changes.

## [6.0.1] - 2026-02-26

### Fixed

- Restore the declared minimum Node.js version to 20.19.0.

### Maintenance

- Mark the package as side-effect-free for bundlers.

## [6.0.0] - 2026-02-20

### Changed

- **Breaking:** Require Node.js 22.21.0 or later.

### Removed

- **Breaking:** Remove the deprecated `kpi-prettier` executable; use `ksc-prettier`.

### Maintenance

- Migrate builds to tsdown with package-specific TypeScript configuration and package/type validation.
- Externalize CLI dependencies, upgrade argument parsing to Yargs 18, and update the Svelte plugin.

## [5.13.0] - 2026-01-25

### Changed

- Generate `prettier.config.ts` instead of `prettier.config.js` during initialization.

### Documentation

- Update configuration-storage examples for the TypeScript starter file.

### Maintenance

- Upgrade prettier-plugin-packagejson to version 3 and refresh Prettier/package-sorting dependencies.

## [5.12.0] - 2026-01-18

### Maintenance

- Update Prettier to 3.8.0 and the package.json formatting plugin.

## [5.11.0] - 2025-12-27

### Maintenance

- Update filesystem, package.json sorting, and Svelte formatting dependencies.

## [5.10.0] - 2025-12-06

### Changed

- Explicitly enforce LF line endings for consistent formatting across platforms.

### Documentation

- Describe repository initialization as installing the basic configuration files rather than only `.npmrc`.

### Maintenance

- Upgrade Prettier to 3.7 and refresh formatting/CLI dependencies.
- Invoke build scripts through tsx for cross-platform compatibility.

## [5.9.2] - 2025-11-26

No notable changes.

## [5.9.1] - 2025-11-26

No notable changes.

## [5.9.0] - 2025-11-26

No notable changes.

## [5.8.3] - 2025-11-07

No notable changes.

## [5.8.2] - 2025-11-06

No notable changes.

## [5.8.1] - 2025-11-04

### Removed

- **Breaking:** Remove bundled SQL formatting support and prettier-plugin-sql because of its large parser dependency.

### Documentation

- Explain why SQL formatting support was removed.

## [5.8.0] - 2025-11-04

### Maintenance

- Update the Tailwind formatting plugin.

## [5.7.4] - 2025-10-15

No notable changes.

## [5.7.3] - 2025-10-15

### Documentation

- Disambiguate repository setup by explicitly selecting the `ksc-repo` executable in pnpm dlx instructions.

### Maintenance

- Update the TypeScript configuration loader and Tailwind formatting plugin.

## [5.7.2] - 2025-10-06

No notable changes.

## [5.7.1] - 2025-09-29

### Maintenance

- Update fs-extra.

## [5.7.0] - 2025-09-08

### Added

- Provide `ksc-prettier` as the CLI executable.

### Deprecated

- Deprecate the `kpi-prettier` alias for removal in the next major release.

### Documentation

- Update setup, script examples, and CLI references to use `ksc-prettier`.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Raise the minimum Node.js version to 20.19.0.

### Maintenance

- Update Prettier to 3.6.2 and refresh formatting, filesystem, and package-sorting dependencies.

## [5.5.0] - 2025-06-11

No notable changes.

## [5.4.4] - 2025-06-09

No notable changes.

## [5.4.3] - 2025-06-09

### Maintenance

- Update package.json/Tailwind formatting plugins and Execa.

## [5.4.2] - 2025-05-26

### Maintenance

- Update package.json and Svelte formatting plugins.

## [5.4.1] - 2025-05-11

### Maintenance

- Refresh formatting plugins, package.json sorting, and CLI process-execution dependencies.

## [5.4.0] - 2025-03-28

No notable changes.

## [5.3.1] - 2025-03-10

No notable changes.

## [5.3.0] - 2025-03-04

### Maintenance

- Upgrade sort-package-json to version 3.

## [5.2.0] - 2025-03-04

No notable changes.

## [5.1.0] - 2025-03-03

### Fixed

- Use a TypeScript cosmiconfig loader that resolves module imports in configuration files.

### Maintenance

- Update Prettier and the package.json formatting plugin.

## [5.0.8] - 2025-03-02

No notable changes.

## [5.0.7] - 2025-03-02

### Fixed

- Restore support for Node.js 20.9.0 or later and remove the pnpm engine restriction.

### Maintenance

- Update package.json sorting dependencies.

## [5.0.6] - 2025-02-26

### Maintenance

- Update Prettier, configuration merging, and shell/TOML formatting dependencies.

## [5.0.5] - 2025-02-10

### Changed

- **Breaking:** Raise the minimum Node.js version to 22.13.1.

### Maintenance

- Update Prettier to 3.5.0.

## [5.0.4] - 2025-02-07

### Documentation

- Correct package repository/homepage links and render the README recommendation as a GitHub admonition.

## [5.0.3] - 2025-02-07

No notable changes.

## [5.0.2] - 2025-02-07

### Fixed

- Declare `find-workspaces` as a runtime dependency so the standalone CLI can resolve its workspace utilities.

## [5.0.1] - 2025-02-07

### Changed

- Sort shared-config tool configuration keys at the end of package.json to match ESLint's property order.

### Fixed

- Honor initialization storage options and format copied or merged configuration files with Prettier.

## [5.0.0] - 2025-02-06

### Added

- Add the typed `prettierConfig` factory for merging shared defaults with custom configuration.
- Support `init --location file|package` to store configuration in `prettier.config.js` or package.json.

### Changed

- **Breaking:** Replace the `prettier-config` executable and mode flags with `kpi-prettier` subcommands: `init`, `lint`, `fix`, and `print-config`.
- **Breaking:** Require Node.js 22 or later and declare pnpm 10 or later in package engines.
- Replace prettier-plugin-pkg with prettier-plugin-packagejson to align package.json sorting with ESLint.
- Install Prettier as a direct dependency instead of requiring a separate peer installation.
- Resolve `.gitignore` and `.prettierignore` from the workspace root, including when invoked in subdirectories.

### Fixed

- Resolve the home directory correctly when locating the rbenv Ruby executable.

### Documentation

- Rewrite configuration and CLI examples for the new factory, subcommands, and storage locations.

### Maintenance

- Refresh formatting/CLI dependencies and generate compiled library exports with TypeScript declarations.

## [4.7.12] - 2024-11-08

No notable changes.

## [4.7.11] - 2024-09-28

### Changed

- **Breaking:** Raise the Prettier peer requirement to `^3.3.3`.

### Maintenance

- Update Svelte and Tailwind formatting plugins.

## [4.7.10] - 2024-09-15

No notable changes.

## [4.7.9] - 2024-09-14

No notable changes.

## [4.7.8] - 2024-09-14

No notable changes.

## [4.7.7] - 2024-09-14

### Documentation

- Explain the tabs-versus-spaces policy and the exceptions for YAML, Markdown, and MDX.

### Maintenance

- Normalize package repository and issue metadata.

## [4.7.6] - 2024-09-13

### Changed

- Exclude Parcel's cache directory in the starter ignore file.

### Maintenance

- Resolve the documentation generator through pnpm during package builds.

## [4.7.5] - 2024-09-07

No notable changes.

## [4.7.4] - 2024-09-07

No notable changes.

## [4.7.3] - 2024-09-07

### Maintenance

- Refresh Astro, SQL, Svelte, and Tailwind formatting plugins.

## [4.7.2] - 2024-06-14

No notable changes.

## [4.7.1] - 2024-06-09

No notable changes.

## [4.7.0] - 2024-06-07

### Changed

- **Breaking:** Raise the Prettier peer requirement to `^3.3.1`.

### Maintenance

- Update Astro, Svelte, and Tailwind formatting plugins.

## [4.6.7] - 2024-06-05

### Changed

- **Breaking:** Raise the Prettier peer requirement to `^3.3.0`.

### Maintenance

- Refine README generation using separate metadata templates.

## [4.6.6] - 2024-05-20

No notable changes.

## [4.6.5] - 2024-05-19

No notable changes.

## [4.6.4] - 2024-05-19

No notable changes.

## [4.6.3] - 2024-04-18

### Maintenance

- Update Svelte and Tailwind formatting plugins.

## [4.6.2] - 2024-04-08

### Maintenance

- Update XML and Tailwind formatting plugins.

## [4.6.1] - 2024-03-17

No notable changes.

## [4.6.0] - 2024-03-17

### Changed

- **Breaking:** Raise the Prettier peer requirement to `^3.2.5`.

### Maintenance

- Update the Tailwind formatting plugin.

## [4.5.0] - 2024-02-29

### Documentation

- Standardize the package description in the README and CLI reference.

### Maintenance

- Add package discovery keywords.

## [4.4.3] - 2024-02-29

### Maintenance

- Update the Svelte formatting plugin.

## [4.4.2] - 2024-02-23

No notable changes.

## [4.4.1] - 2024-02-22

### Documentation

- Include the package name in the npm badge's accessible label.

## [4.4.0] - 2024-02-20

### Added

- Include `.node-version` in the starter VS Code document selectors.

### Documentation

- Add a CLI reference, package/license information, and corrected usage examples.

### Maintenance

- Generate README content during package builds and include a package license file.
- Refresh bundled formatting plugins.

## [4.3.3] - 2024-01-14

No notable changes.

## [4.3.2] - 2024-01-14

### Fixed

- Remove environment-file ignore patterns so `.env.example` is no longer excluded by the starter configuration.

### Maintenance

- Refresh PHP, Astro, SQL, and Tailwind formatting plugins.

## [4.3.1] - 2023-12-23

No notable changes.

## [4.3.0] - 2023-12-22

No notable changes.

## [4.2.2] - 2023-12-22

No notable changes.

## [4.2.1] - 2023-12-21

No notable changes.

## [4.2.0] - 2023-12-20

No notable changes.

## [4.1.3] - 2023-12-19

### Fixed

- Configure VS Code to select Prettier for Ruby files and include them in document selectors.

### Documentation

- Explain that the Ruby plugin must be configured globally rather than in per-file overrides.

## [4.1.2] - 2023-12-19

No notable changes.

## [4.1.1] - 2023-12-19

No notable changes.

## [4.1.0] - 2023-12-18

### Added

- Apply shell formatting overrides to `.sh`, `.zsh`, `.bash`, and `.fish` files.

## [4.0.0] - 2023-12-16

### Added

- Include Prettier extension recommendations, format-on-save settings, and language formatter associations during initialization.

### Changed

- Merge existing VS Code JSON configuration during initialization instead of overwriting it.

### Maintenance

- Rename the distributed configuration entry point to `prettier.config.js` and use fs-extra for initialization.

## [3.1.0] - 2023-12-16

### Changed

- Omit semicolons by default and use spaces in Markdown, MDX, and `.yml` files.

### Documentation

- Expand the starter configuration's per-file override example.

## [3.0.4] - 2023-12-16

### Documentation

- Include the required `--init` flag in repository-configuration setup instructions.

## [3.0.3] - 2023-12-15

No notable changes.

## [3.0.2] - 2023-12-15

No notable changes.

## [3.0.1] - 2023-12-15

### Fixed

- Correct published file inclusion for the CLI and initialization templates.

## [3.0.0] - 2023-12-15

### Changed

- Reduce the default print width from 120 to 100 columns.
- Expand the starter ignore rules to cover generated output, dependencies, temporary files, environment files, and npm lockfiles.

### Documentation

- Update setup instructions to use `@kitschpatrol/repo-config`.

## [2.2.1] - 2023-12-13

### Added

- Add the `-p` alias for `--print-config`.

### Changed

- Use cosmiconfig for configuration discovery and print compact, colorized JSON with the configuration path.

### Documentation

- Expand CLI help with configuration-printing, help, and version options.

### Maintenance

- Refresh configuration-discovery, JSON-output, and Ruby-plugin dependencies.

## [2.2.0] - 2023-12-12

### Documentation

- Separate local overrides from shared defaults in the starter configuration example.

### Maintenance

- Adjust CLI runtime dependency declarations.

## [2.1.1] - 2023-12-12

### Added

- Add `--print-config` to display the resolved Prettier configuration for a file.

### Changed

- Accept file/glob targets, check the current directory by default, and prefix CLI output with colored tool labels.

### Fixed

- Route subprocess errors through the CLI's prefixed output stream.

### Maintenance

- Introduce a shared TypeScript command builder and bundled CLI builds with prepublish automation.

## [2.0.0] - 2023-12-08

### Added

- Add plugin-aware formatting checks and automatic formatting through `--check` and `--fix`.

### Changed

- **Breaking:** Replace `prettier-config-init` with `prettier-config --init`.
- Exclude `pnpm-lock.yaml` in the starter ignore file.

### Documentation

- Update initialization and package-script examples for the unified CLI.

### Maintenance

- Implement the CLI with zx and argument parsing dependencies.

## [1.0.1] - 2023-12-07

### Documentation

- Correct installation instructions to add the package as a development dependency.

## [1.0.0] - 2023-12-07

### Added

- Provide an ESM Prettier 3 preset for Node.js 18+ with single quotes, tabs, trailing commas, and a 120-column line width.
- Bundle formatting support for Astro, Svelte, PHP, Ruby, XML, shell files, SQL, TOML, package.json sorting, and Tailwind CSS classes.
- Provide `prettier-config-init` to copy starter configuration and ignore files while preserving existing files.

### Documentation

- Document installation, customization, npm script integration, editor usage, and Ruby prerequisites.

### Maintenance

- Set up public npm packaging and shared contributor tooling with pnpm 8+.

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
