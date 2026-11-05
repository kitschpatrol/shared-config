# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [8.14.1] - 2026-11-03

### Fixed

- Enable CSpell configuration discovery without a direct CSpell dependency, resolve dictionary imports across configuration locations, and report dictionaries that are no longer used.

### Maintenance

- Update Knip to 6.44.1 and add CSpell dependency-discovery integration tests.

## [8.14.0] - 2026-10-27

### Maintenance

- Refresh runtime dependencies, including Knip 6.43.0, Execa, and Prettier.

## [8.13.1] - 2026-10-08

No notable changes.

## [8.13.0] - 2026-10-08

### Documentation

- Explain monorepo entry-pattern behavior and show how to apply shared entries to the root and package workspaces.

### Maintenance

- Update Knip to 6.40.0 and Execa to 10.1.0.

## [8.12.1] - 2026-10-06

No notable changes.

## [8.12.0] - 2026-10-06

No notable changes.

## [8.11.0] - 2026-10-04

### Added

- Treat scripts bundled under `skills/*/scripts` as entry points.

### Fixed

- Avoid false unused-dependency reports for `svelte-check`.

### Maintenance

- Update Knip to 6.39.0.

## [8.10.1] - 2026-09-28

### Maintenance

- Refresh runtime dependencies, including Knip 6.38.0, fs-extra, and Prettier.

## [8.10.0] - 2026-09-22

### Maintenance

- Refresh runtime dependencies, including Knip 6.37.0, Yargs, and Prettier.

## [8.9.0] - 2026-09-17

### Maintenance

- Update Knip to 6.36.0 and refresh Prettier.

## [8.8.0] - 2026-09-07

### Maintenance

- Update Knip to 6.34.0 and refresh Cosmiconfig.
- Adapt package type validation to tsdown 0.23.

## [8.7.0] - 2026-08-26

### Fixed

- Avoid false unused-dependency reports for `@astrojs/check` and `sharp`.

### Documentation

- Link `knipConfig()` API documentation to Knip.

### Maintenance

- Refresh runtime dependencies, including Knip 6.32.2, Cosmiconfig 10, and deepmerge-ts 8.

## [8.6.0] - 2026-07-31

### Maintenance

- Refresh Execa and Yargs runtime dependencies.

## [8.5.0] - 2026-07-24

### Documentation

- Correct README links to npm, the MIT license, and VS Code's Problems-panel documentation.

### Maintenance

- Update Knip to 6.29.0 and refresh fs-extra.

## [8.4.0] - 2026-07-22

### Fixed

- Avoid false unused-dependency reports for native build tooling `node-addon-api` and `node-gyp`.

### Maintenance

- Update the Prettier runtime dependency.
- Harden initialization-asset lookup and JSON-stream handling in the shared CLI runner.

## [8.3.0] - 2026-07-20

### Added

- Expose the shared `--cache` and `--no-cache` options on `lint`.

### Changed

- Render JSON reports compactly and apply terminal-aware color handling consistently with `NO_COLOR`, `FORCE_COLOR`, and `TERM`.

### Maintenance

- Update Knip to 6.26.0 and Execa to version 10.

## [8.2.0] - 2026-07-16

### Added

- Add `lint --format native|machine|json` with normalized Knip diagnostics for editor integrations and structured reports.
- Have `init` install a VS Code lint task with a Problems-panel matcher, merging existing tasks by label.

### Documentation

- Document output formats, VS Code task usage, and task-merging behavior.

## [8.1.0] - 2026-07-10

### Maintenance

- Update Knip to 6.25.0 and refresh Prettier.

## [8.0.0] - 2026-07-07

### Changed

- **Breaking:** Require Node.js `^24.16.0 || >=26.3.0`, dropping Node.js 22 support.

### Maintenance

- Refresh runtime dependencies, including Knip 6.23.0, Cosmiconfig, Prettier, and fs-extra, and modernize shared CLI internals.

## [7.6.4] - 2026-06-11

### Maintenance

- Update Knip to 6.15.0.

## [7.6.3] - 2026-06-05

### Maintenance

- Update Knip to 6.14.2.
- Update package-type validation tooling and remove the fflate compatibility pin.

## [7.6.2] - 2026-05-18

No notable changes.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Require Node.js `^22.22.2 || >=24.0.0`.

### Maintenance

- Update Knip to 6.14.1.

## [7.6.0] - 2026-05-14

### Maintenance

- Update Knip to 6.13.1 and refresh fs-extra.

## [7.5.3] - 2026-05-03

### Documentation

- Correct the MIT license badge link.

### Maintenance

- Update Knip to 6.11.0.

## [7.5.2] - 2026-04-28

No notable changes.

## [7.5.1] - 2026-04-27

### Maintenance

- Update Knip to 6.7.0.

## [7.5.0] - 2026-04-22

### Documentation

- Link the README's license attribution to the author's website.

### Maintenance

- Update Knip to 6.6.1 and refresh Prettier.

## [7.4.1] - 2026-04-13

### Fixed

- Ignore `remark-attribute-list` and `remark-directive` dependencies required by certain Astro TypeScript configurations.

## [7.4.0] - 2026-04-13

### Maintenance

- Update Knip to 6.4.1 and refresh Prettier.

## [7.3.0] - 2026-04-09

### Added

- Export `sharedKnipConfig` and the `KnipConfig` type alongside the existing default preset and `knipConfig()` factory.

### Maintenance

- Update Knip to 6.3.1 and refresh the Cosmiconfig TypeScript loader.

## [7.2.0] - 2026-04-08

No notable changes.

## [7.1.0] - 2026-04-05

No notable changes.

## [7.0.2] - 2026-04-04

### Maintenance

- Update Knip to 6.3.0.

## [7.0.1] - 2026-04-03

No notable changes.

## [7.0.0] - 2026-04-02

### Changed

- **Breaking:** Require Node.js 22.18.0 or newer, replacing the separate contributor-runtime requirement.

### Documentation

- Replace placeholder `init --location` help with an explanation of configuration storage.

## [6.2.0] - 2026-04-01

### Fixed

- Normalize Windows workspace paths and pass POSIX workspace names to Knip to prevent workspace-directory errors.

### Maintenance

- Update Knip to 6.2.0.

## [6.1.0] - 2026-03-24

### Maintenance

- Upgrade the Knip runtime dependency from version 5 to 6.0.4.

## [6.0.3] - 2026-03-08

### Maintenance

- Refresh runtime dependencies, including Knip 5.86.0, Cosmiconfig, and fs-extra.
- Declare Node.js 22.18+ as the contributor runtime required by the updated tsdown build tooling.

## [6.0.2] - 2026-02-28

No notable changes.

## [6.0.1] - 2026-02-26

### Fixed

- Restore the declared Node.js minimum to 20.19.0.

### Maintenance

- Update Knip to 5.85.0 and mark the package as side-effect-free for bundlers.

## [6.0.0] - 2026-02-20

### Changed

- **Breaking:** Raise the minimum Node.js version to 22.21.0.

### Removed

- **Breaking:** Remove the deprecated `kpi-knip` executable alias; use `ksc-knip`.

### Fixed

- Ignore the repository and TypeScript configuration packages when checking for unused dependencies.

### Maintenance

- Migrate package builds from esbuild/tsc to tsdown with package and type validation, and externalize runtime dependencies.
- Refresh runtime dependencies, including Knip 5.84.1 and Yargs 18.

## [5.13.0] - 2026-01-25

### Maintenance

- Update Knip to 5.82.1 and refresh Prettier.

## [5.12.0] - 2026-01-18

### Maintenance

- Update Knip to 5.82.0 and Prettier to 3.8.0.

## [5.11.0] - 2025-12-27

### Maintenance

- Update Knip to 5.78.0 and refresh fs-extra.

## [5.10.0] - 2025-12-06

### Documentation

- Update setup guidance to install the repository configuration files following the pnpm hoisting-configuration migration.

### Maintenance

- Refresh runtime dependencies, including Knip 5.71.0 and Prettier 3.7, and invoke package builds through tsx for cross-platform compatibility.

## [5.9.2] - 2025-11-26

No notable changes.

## [5.9.1] - 2025-11-26

No notable changes.

## [5.9.0] - 2025-11-26

### Maintenance

- Update Knip to 5.70.2.

## [5.8.3] - 2025-11-07

No notable changes.

## [5.8.2] - 2025-11-06

### Maintenance

- Update Knip to 5.68.0.

## [5.8.1] - 2025-11-04

### Changed

- Stop excluding `prettier-plugin-sql` from unused-dependency checks.

## [5.8.0] - 2025-11-04

### Fixed

- Place the `types` export condition before `import` so TypeScript resolves the published declarations.

### Maintenance

- Update Knip to 5.67.1.

## [5.7.4] - 2025-10-15

No notable changes.

## [5.7.3] - 2025-10-15

### Documentation

- Disambiguate the repository setup command by selecting the package and `ksc-repo` binary explicitly.

### Maintenance

- Update Knip to 5.65.0 and refresh the Cosmiconfig TypeScript loader.

## [5.7.2] - 2025-10-06

### Maintenance

- Update Knip to 5.64.2.

## [5.7.1] - 2025-09-29

### Maintenance

- Update Knip to 5.64.1 and refresh fs-extra.

## [5.7.0] - 2025-09-08

### Added

- Provide `ksc-knip` as the preferred executable and recognize the `ksc-*` tool binaries in the preset.

### Deprecated

- Deprecate the retained `kpi-knip` executable alias for removal in the next major release.

### Documentation

- Update installation and command examples to use `ksc-knip`.

### Maintenance

- Update Knip to 5.63.1.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Raise the minimum Node.js version to 20.19.0.

### Maintenance

- Refresh runtime dependencies, including Knip 5.63.0, Prettier, and fs-extra.

## [5.5.0] - 2025-06-11

No notable changes.

## [5.4.4] - 2025-06-09

No notable changes.

## [5.4.3] - 2025-06-09

### Maintenance

- Update Knip to 5.60.2 and refresh Execa.

## [5.4.2] - 2025-05-26

### Maintenance

- Update Knip to 5.58.0.

## [5.4.1] - 2025-05-11

### Maintenance

- Refresh runtime dependencies, including Knip 5.55.1 and Execa, and replace Chalk with Picocolors in shared CLI logging.

## [5.4.0] - 2025-03-28

### Maintenance

- Update Knip to 5.46.2.

## [5.3.1] - 2025-03-10

No notable changes.

## [5.3.0] - 2025-03-04

### Fixed

- Avoid false missing-binary reports for `op` and `gh` and false unused-dependency reports for the Wiktionary CSpell dictionary.

## [5.2.0] - 2025-03-04

### Removed

- **Breaking:** Remove the `kpi-knip fix` command to prevent automatic deletion of code and dependencies.

### Fixed

- Ignore dynamically loaded Prettier plugins when checking for unused dependencies.

## [5.1.0] - 2025-03-03

### Added

- Recognize JavaScript and TypeScript module extensions for scripts and shared-tool configuration entry points.

### Fixed

- Resolve imports in TypeScript configuration files with the dedicated Cosmiconfig TypeScript loader.

### Maintenance

- Update the Prettier runtime dependency.

## [5.0.8] - 2025-03-02

No notable changes.

## [5.0.7] - 2025-03-02

### Changed

- Lower the declared Node.js minimum to 20.9.0 and remove the pnpm engine restriction.

### Fixed

- Recognize individual `kpi-*` tool commands as provided binaries.

### Maintenance

- Retarget CLI builds to Node.js 20 and add CommonJS interoperability to the ESM bundle.

## [5.0.6] - 2025-02-26

### Maintenance

- Refresh runtime dependencies, including Knip 5.45.0, deepmerge-ts, and Prettier.

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

No notable changes.

## [5.0.2] - 2025-02-07

### Added

- Recognize entry points under `src/bin`, `src/lib`, and `src/cli`.

### Changed

- Suppress Knip configuration hints during linting and automatic cleanup.
- Resume unused-dependency checks for `@kitschpatrol/repo-config` and `@kitschpatrol/typescript-config`.

### Fixed

- Include the missing `find-workspaces` runtime dependency for standalone CLI execution.

## [5.0.1] - 2025-02-07

### Fixed

- Restore Knip's standard root and `src` entry points and ignore shared configuration packages to prevent false unused-code and dependency reports.
- Declare the Prettier runtime dependency needed by standalone CLI initialization and format generated JSON configuration.
- Preserve `init --location` when initialization is invoked through the aggregate CLI.

## [5.0.0] - 2025-02-06

### Added

- Provide a default Knip preset and typed `knipConfig()` factory that deep-merges customizations with script and tool-configuration entry points.
- Provide workspace-aware `kpi-knip lint`, `fix`, and `print-config` commands for unused-code checks, automatic cleanup, and effective configuration output.
- Initialize `knip.config.ts` or a `knip` field in `package.json` with `init --location file|package`, removing the alternative configuration.

### Documentation

- Document pnpm installation, configuration customization, and package-script integration.

### Maintenance

- Set up ESM publishing, TypeScript declarations, and shared build tooling with Node.js 22+ and pnpm 10+ requirements.

[5.0.0]: https://github.com/kitschpatrol/shared-config/releases/tag/v5.0.0
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
