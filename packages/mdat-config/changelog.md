# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [8.14.1] - 2026-11-03

No notable changes.

## [8.14.0] - 2026-10-27

### Maintenance

- Refresh MDAT, Prettier, and Execa dependencies.

## [8.13.1] - 2026-10-08

No notable changes.

## [8.13.0] - 2026-10-08

### Maintenance

- Update MDAT to 3.6.2 and Execa to 10.1.0.

## [8.12.1] - 2026-10-06

No notable changes.

## [8.12.0] - 2026-10-06

### Maintenance

- Update MDAT to 3.6.1 and adjust CLI-help generation settings.

## [8.11.0] - 2026-10-04

### Maintenance

- Update MDAT to 3.5.0.

## [8.10.1] - 2026-09-28

### Maintenance

- Update MDAT, Prettier, and filesystem dependencies.
- Update configuration-resolution tests for the newer MDAT loader.

## [8.10.0] - 2026-09-22

### Maintenance

- Update Yargs to 18.2.0 and Prettier to 3.9.8.

## [8.9.0] - 2026-09-17

### Maintenance

- Update MDAT to 3.2.1 and Prettier to 3.9.7.

## [8.8.0] - 2026-09-07

### Maintenance

- Update MDAT and configuration-loading dependencies.
- Adapt test/build configuration for Vitest 5 and tsdown 0.23, including the shared Vitest config and updated type validation.

## [8.7.0] - 2026-08-26

### Maintenance

- Update MDAT to 3.1.0 and cosmiconfig to 10.

## [8.6.0] - 2026-07-31

### Maintenance

- Update Execa and Yargs dependencies.
- Replace CI documentation-link checking with Lychee.

## [8.5.0] - 2026-07-24

### Fixed

- Upgrade to MDAT 3.0.0 to pick up its redirected-link fix.

### Documentation

- Correct README links to npm, the MIT license, MDAT documentation, and VS Code documentation.

### Maintenance

- Update filesystem dependencies, make configuration-path tests portable on Windows, and add CI documentation-link checks.

## [8.4.0] - 2026-07-22

### Fixed

- Leave files other than `.md` and `.markdown` unchanged in `fixFile`.
- Load `print-config` configuration once to avoid duplicating array-valued built-in rules.
- Locate initialization assets from the built CLI's package directory.

### Documentation

- Document the Markdown-only scope of `fixFile`.

### Maintenance

- Add API/configuration-resolution regression tests and update Prettier.

## [8.3.0] - 2026-07-20

### Added

- Expose shared `--cache` and `--no-cache` options on lint/fix commands.

### Changed

- Run independent workspace MDAT checks and expansions concurrently.
- Refine JSON output formatting and honor terminal, `NO_COLOR`, and `FORCE_COLOR` settings consistently.

### Maintenance

- Upgrade CLI process execution to Execa 10.

## [8.2.0] - 2026-07-16

### Added

- Support `--format native|machine|json` on `ksc-mdat lint` and `fix`.
- Install VS Code lint/fix tasks with problem matchers through `ksc-mdat init`.

### Fixed

- Keep the configuration-printer command label stable in minified builds.

### Documentation

- Document structured output, VS Code task usage, and task merging during initialization.

## [8.1.0] - 2026-07-10

### Maintenance

- Update the bundled Prettier dependency to 3.9.5.

## [8.0.0] - 2026-07-07

### Changed

- **Breaking:** Require Node.js `^24.16.0 || >=26.3.0`.

### Maintenance

- Refresh Prettier, filesystem, and configuration-loading dependencies.

## [7.6.4] - 2026-06-11

### Documentation

- Explain how an explicit pnpm workspace definition avoids spurious `No readme found` errors in repositories with fixture packages.

### Maintenance

- Update MDAT to 2.3.6.

## [7.6.3] - 2026-06-05

No notable changes.

## [7.6.2] - 2026-05-18

### Fixed

- Update MDAT to 2.3.5 to fix license and badge expansion regressions.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Change supported Node.js versions to `^22.22.2 || >=24.0.0`.

### Maintenance

- Update MDAT to 2.3.4.

## [7.6.0] - 2026-05-14

### Maintenance

- Refresh dependencies and migrate contributor/CI tooling to pnpm 11.
- Fix npm-token propagation during package publishing.

## [7.5.3] - 2026-05-03

### Documentation

- Update the README's MIT license link.

### Maintenance

- Update MDAT to 2.3.2.

## [7.5.2] - 2026-04-28

No notable changes.

## [7.5.1] - 2026-04-27

No notable changes.

## [7.5.0] - 2026-04-22

### Maintenance

- Update MDAT to 2.3.0 and Prettier to 3.8.3.

## [7.4.1] - 2026-04-13

No notable changes.

## [7.4.0] - 2026-04-13

### Maintenance

- Update the bundled Prettier dependency to 3.8.2.

## [7.3.0] - 2026-04-09

### Maintenance

- Update the TypeScript configuration loader and refresh package release scripts.

## [7.2.0] - 2026-04-08

### Added

- Export `fix`, `fixFile`, and `clearCache` for expanding Markdown strings and files with shared rules and per-call overrides.
- Export the shared configuration as `sharedMdatConfig` and expose the `MdatConfig` type.

### Documentation

- Add programmatic expansion examples and explain configuration merging and caching.

### Maintenance

- Add API tests and update MDAT to 2.2.1.

## [7.1.0] - 2026-04-05

No notable changes.

## [7.0.2] - 2026-04-04

### Maintenance

- Update MDAT to 2.2.0 and adjust documentation-generation tooling for CI.

## [7.0.1] - 2026-04-03

### Maintenance

- Update MDAT to 2.0.1.

## [7.0.0] - 2026-04-02

### Changed

- **Breaking:** Adopt MDAT 2's flat configuration: pass rules directly to `mdatConfig` instead of nesting them under `rules`.
- **Breaking:** Require Node.js 22.18.0 or later.
- Run MDAT's `check` and `expand` commands directly with formatting enabled.

### Documentation

- Update MDAT command/configuration guidance and replace placeholder descriptions in CLI help.

### Maintenance

- Add Linux, macOS, and Windows CI for building, linting, and testing.

## [6.2.0] - 2026-04-01

### Fixed

- Normalize Windows workspace paths when discovering packages and the workspace root.

### Maintenance

- Update MDAT to 1.4.2.

## [6.1.0] - 2026-03-24

No notable changes.

## [6.0.3] - 2026-03-08

### Maintenance

- Update MDAT and configuration-loading dependencies, and declare Node.js 22.18.0 or later for contributor builds.

## [6.0.2] - 2026-02-28

No notable changes.

## [6.0.1] - 2026-02-26

### Fixed

- Restore the declared minimum Node.js version to 20.19.0.

### Maintenance

- Update MDAT to 1.3.5.
- Mark the package as side-effect-free for bundlers.

## [6.0.0] - 2026-02-20

### Changed

- **Breaking:** Require Node.js 22.21.0 or later.

### Removed

- **Breaking:** Remove the deprecated `kpi-mdat` executable; use `ksc-mdat`.

### Maintenance

- Migrate builds to tsdown with package-specific TypeScript configuration and package/type validation.
- Externalize CLI dependencies and upgrade argument parsing to Yargs 18.

## [5.13.0] - 2026-01-25

### Maintenance

- Update MDAT to 1.3.4 and Prettier to 3.8.1.

## [5.12.0] - 2026-01-18

### Maintenance

- Update the Prettier runtime dependency to 3.8.0.

## [5.11.0] - 2025-12-27

### Maintenance

- Update MDAT to 1.3.3 and refresh fs-extra.

## [5.10.0] - 2025-12-06

### Documentation

- Update setup guidance to install the repository configuration files following the pnpm hoisting-configuration migration.

### Maintenance

- Refresh Execa and Prettier runtime dependencies, including Prettier 3.7, and invoke package builds through tsx for cross-platform compatibility.

## [5.9.2] - 2025-11-26

### Added

- Support complete npm badge overrides through MDAT 1.3.2.

## [5.9.1] - 2025-11-26

### Fixed

- Fix MDAT badge-rule behavior by updating to 1.3.1.

## [5.9.0] - 2025-11-26

### Maintenance

- Update MDAT to 1.3.0.

## [5.8.3] - 2025-11-07

### Fixed

- Update MDAT to 1.2.3 to avoid `url.parse()` deprecation warnings from `normalize-package-data`.

## [5.8.2] - 2025-11-06

### Maintenance

- Update MDAT to 1.2.2.

## [5.8.1] - 2025-11-04

No notable changes.

## [5.8.0] - 2025-11-04

### Fixed

- Place the `types` export condition before `import` so TypeScript resolves the published declarations.

### Maintenance

- Update MDAT to 1.2.0.

## [5.7.4] - 2025-10-15

No notable changes.

## [5.7.3] - 2025-10-15

### Documentation

- Disambiguate the repository setup command by selecting the package and `ksc-repo` binary explicitly.

### Maintenance

- Update the Cosmiconfig TypeScript loader to 6.2.0.

## [5.7.2] - 2025-10-06

No notable changes.

## [5.7.1] - 2025-09-29

### Maintenance

- Update MDAT to 1.1.0 and refresh fs-extra.

## [5.7.0] - 2025-09-08

### Added

- Provide `ksc-mdat` as the preferred CLI executable.

### Deprecated

- Deprecate the retained `kpi-mdat` executable alias for removal in the next major release.

### Documentation

- Update CLI examples and the generated `shared-config` section to use `ksc` command names.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Raise the minimum Node.js version to 20.19.0.

### Fixed

- Update MDAT to 1.0.4 to eliminate deprecation warnings during linting.

### Maintenance

- Refresh Prettier and fs-extra runtime dependencies.

## [5.5.0] - 2025-06-11

No notable changes.

## [5.4.4] - 2025-06-09

No notable changes.

## [5.4.3] - 2025-06-09

### Maintenance

- Update the Execa runtime dependency to 9.6.0.

## [5.4.2] - 2025-05-26

No notable changes.

## [5.4.1] - 2025-05-11

### Maintenance

- Refresh MDAT and Execa runtime dependencies and replace Chalk with Picocolors in shared CLI logging.

## [5.4.0] - 2025-03-28

No notable changes.

## [5.3.1] - 2025-03-10

No notable changes.

## [5.3.0] - 2025-03-04

### Maintenance

- Update MDAT to 1.0.1.

## [5.2.0] - 2025-03-04

No notable changes.

## [5.1.0] - 2025-03-03

### Fixed

- Resolve imports in TypeScript configuration files with the dedicated Cosmiconfig TypeScript loader.

### Maintenance

- Update the Prettier runtime dependency.

## [5.0.8] - 2025-03-02

No notable changes.

## [5.0.7] - 2025-03-02

### Changed

- Lower the declared Node.js minimum to 20.9.0 and remove the pnpm engine restriction.

### Maintenance

- Upgrade the MDAT runtime dependency to version 1.0.0.
- Retarget CLI builds to Node.js 20 and add CommonJS interoperability to the ESM bundle.

## [5.0.6] - 2025-02-26

### Maintenance

- Update the Prettier runtime dependency to 3.5.2.

## [5.0.5] - 2025-02-10

### Changed

- **Breaking:** Raise the minimum Node.js version from 22.0.0 to 22.13.1.
- Enable TypeScript stripping in child tool processes and suppress experimental warnings.

### Maintenance

- Update the Prettier runtime dependency to 3.5.0.

## [5.0.4] - 2025-02-07

### Documentation

- Correct package repository and homepage links and restore the README's important-note rendering.

## [5.0.3] - 2025-02-07

### Fixed

- Generate a resolvable Cosmiconfig `$import` when initializing MDAT configuration in `package.json`.

## [5.0.2] - 2025-02-07

No notable changes.

## [5.0.1] - 2025-02-07

### Fixed

- Declare the Prettier runtime dependency needed by standalone CLI initialization and format generated JSON configuration.
- Preserve `init --location` when initialization is invoked through the aggregate CLI.

## [5.0.0] - 2025-02-06

### Added

- Export a typed `mdatConfig()` factory that merges customizations with the shared configuration.
- Support `init --location file|package` to write `mdat.config.ts` or package.json configuration and remove the alternative.

### Changed

- **Breaking:** Replace `mdat-config` flag-based commands with the `kpi-mdat lint`, `fix`, `init`, and `print-config` subcommands.
- **Breaking:** Run lint and fix across package README files and descendant workspaces instead of accepting explicit file/glob arguments.
- Include MDAT's built-in README configuration and resolved user settings in `print-config` output.
- Install MDAT as a regular dependency instead of a peer dependency, updating it to 0.10.0.
- **Breaking:** Raise engine requirements to Node.js 22+ and pnpm 10+.

### Documentation

- Document config factories, file/package configuration, and the new CLI, and update generated project-description text to reference `kpi`.

### Maintenance

- Refresh runtime utilities and simplify shared CLI construction and build generation.

## [4.7.12] - 2024-11-08

### Maintenance

- Update the MDAT peer dependency to `^0.8.0`.

## [4.7.11] - 2024-09-28

### Fixed

- Resolve MDAT errors by updating its peer requirement to `^0.7.6`.

## [4.7.10] - 2024-09-15

No notable changes.

## [4.7.9] - 2024-09-14

No notable changes.

## [4.7.8] - 2024-09-14

No notable changes.

## [4.7.7] - 2024-09-14

### Maintenance

- Standardize package repository and issue-tracker metadata.

## [4.7.6] - 2024-09-13

### Maintenance

- Invoke MDAT through pnpm during package builds.

## [4.7.5] - 2024-09-07

No notable changes.

## [4.7.4] - 2024-09-07

No notable changes.

## [4.7.3] - 2024-09-07

No notable changes.

## [4.7.2] - 2024-06-14

### Documentation

- Refresh generated CLI help with MDAT 0.7.1 to display short aliases alongside their long options.

## [4.7.1] - 2024-06-09

No notable changes.

## [4.7.0] - 2024-06-07

### Maintenance

- Update the MDAT peer dependency to `^0.7.0`.

## [4.6.7] - 2024-06-05

### Maintenance

- Update the MDAT peer dependency to `^0.6.15` and use separate README template directives for title, badges, and description.

## [4.6.6] - 2024-05-20

### Fixed

- Resolve MDAT compatibility issues by updating its peer requirement to `^0.6.12`.

## [4.6.5] - 2024-05-19

### Maintenance

- Update the MDAT peer dependency to `^0.6.11`.

## [4.6.4] - 2024-05-19

No notable changes.

## [4.6.3] - 2024-04-18

No notable changes.

## [4.6.2] - 2024-04-08

No notable changes.

## [4.6.1] - 2024-03-17

No notable changes.

## [4.6.0] - 2024-03-17

### Maintenance

- Update the MDAT peer dependency to `^0.6.8`.

## [4.5.0] - 2024-02-29

### Documentation

- Clarify the package overview and expand MDAT as Markdown Autophagic Template.

### Maintenance

- Update the MDAT peer dependency to `^0.6.6` and standardize package metadata and keywords.

## [4.4.3] - 2024-02-29

### Maintenance

- Update the MDAT peer dependency to `^0.6.5`.

## [4.4.2] - 2024-02-23

### Maintenance

- Update the MDAT peer dependency to `^0.6.3`.

## [4.4.1] - 2024-02-22

### Maintenance

- Update the MDAT peer dependency to `^0.6.0`.

## [4.4.0] - 2024-02-20

### Added

- Provide a reusable default MDAT configuration with a `shared-config` rule that generates the project's tooling-description section.
- Provide the `mdat-config` CLI with default/`--check` validation, `--fix` in-place placeholder expansion, `--init` starter configuration, and `--print-config` inspection, including file/glob arguments.

### Documentation

- Document pnpm installation, automatic MDAT peer installation, custom rules, and package-script usage.

### Maintenance

- Set up ESM distribution, TypeScript declarations, and shared build/release tooling with Node.js 18+ and pnpm 8+ requirements.

[4.4.0]: https://github.com/kitschpatrol/shared-config/releases/tag/v4.4.0
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
