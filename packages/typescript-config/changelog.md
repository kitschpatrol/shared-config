# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [8.14.1] - 2026-11-03

No notable changes.

## [8.14.0] - 2026-10-27

### Maintenance

- Update Execa and Prettier and simplify checker-adapter validation.

## [8.13.1] - 2026-10-08

No notable changes.

## [8.13.0] - 2026-10-08

### Documentation

- Move the `exactOptionalPropertyTypes` recommendation into the README and remove obsolete starter-config comments.

### Maintenance

- Update Execa and npm package-discovery metadata.

## [8.12.1] - 2026-10-06

No notable changes.

## [8.12.0] - 2026-10-06

### Documentation

- Suppress the extra heading when generating CLI help in the package README.

## [8.11.0] - 2026-10-04

No notable changes.

## [8.10.1] - 2026-09-28

### Changed

- Exclude coverage directories from the base preset and let starter configurations inherit file-selection defaults.

### Maintenance

- Update fs-extra and Prettier.

## [8.10.0] - 2026-09-22

### Maintenance

- Update Prettier and Yargs.

## [8.9.0] - 2026-09-17

### Maintenance

- Update Prettier and simplify checker-adapter control flow.

## [8.8.0] - 2026-09-07

### Maintenance

- Update Cosmiconfig to 10.0.1.

## [8.7.0] - 2026-08-26

### Maintenance

- Upgrade Cosmiconfig to 10.

## [8.6.0] - 2026-07-31

### Changed

- Add project-relative default file inclusion, including dotfiles, and a `dist` exclusion to the base preset.
- Set Astro's `jsxImportSource` to `astro` and include dotfiles in the Astro preset.

### Maintenance

- Update Execa and Yargs.

## [8.5.0] - 2026-07-24

### Documentation

- Correct TypeScript directive, VS Code Problems panel, npm, and license links.

### Maintenance

- Update fs-extra.

## [8.4.0] - 2026-07-22

### Changed

- Identify the underlying checker in command logs and suppress non-actionable Astro output.

### Fixed

- Parse Astro and Svelte diagnostics into structured reports, including project warnings and fallback errors for unrecognized checker failures.
- Discover workspace packages and run their appropriate checkers without repeatedly checking an inherited root tsconfig.
- Locate initialization assets from the installed CLI package.

### Maintenance

- Update Prettier, separate checker adapters, and extend configuration-resolution tests.

## [8.3.0] - 2026-07-20

### Added

- Export dedicated `/astro` and `/svelte` tsconfig presets.
- Expose the shared `--cache` and `--no-cache` lint options.

### Changed

- Limit starter build configurations to `src/` and simplify project file selection and build-output exclusions.
- Refine JSON formatting and make terminal colors follow the output destination and color environment settings.
- Suppress non-diagnostic Svelte checker progress and successful-run summaries.

### Documentation

- Document Astro and SvelteKit configuration inheritance, framework limitations, and the cache option.

### Maintenance

- Upgrade Execa to 10 and test exported preset resolution and framework inheritance.

## [8.2.0] - 2026-07-16

### Added

- Add `--format json` and `--format machine` output for TypeScript diagnostics.
- Install a VS Code type-checking task that populates the Problems panel, merging existing tasks by label.

### Changed

- Stop enabling `exactOptionalPropertyTypes` by default and suggest it as an opt-in starter configuration option.

### Fixed

- Run declared Svelte and Astro checkers instead of skipping Svelte projects; use `tsc` when neither checker is declared.

### Documentation

- Explain framework-checker selection, structured output, and VS Code tasks.

## [8.1.0] - 2026-07-10

### Changed

- **Breaking:** Enable `exactOptionalPropertyTypes`, `noImplicitOverride`, `noImplicitReturns`, `noUncheckedIndexedAccess`, and `verbatimModuleSyntax` in the base configuration.

### Maintenance

- Update the bundled Prettier dependency.

## [8.0.0] - 2026-07-07

### Changed

- **Breaking:** Require TypeScript 6.
- **Breaking:** Require Node.js `^24.16.0 || >=26.3.0`.
- **Breaking:** Target ES2025 and use ES2025/DOM libraries, removing DOM.Iterable from the shared defaults.

### Fixed

- Explicitly include Node types in the starter configuration for TypeScript 6.
- Include source files in `bin` directories instead of excluding every `bin` directory from starter configurations.

### Maintenance

- Refresh configuration-loading, filesystem, and formatting dependencies.

## [7.6.4] - 2026-06-11

No notable changes.

## [7.6.3] - 2026-06-05

No notable changes.

## [7.6.2] - 2026-05-18

No notable changes.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Set supported Node.js versions to `^22.22.2 || >=24.0.0`.

## [7.6.0] - 2026-05-14

### Maintenance

- Refresh filesystem runtime dependencies.

## [7.5.3] - 2026-05-03

### Documentation

- Correct the MIT license badge link.

## [7.5.2] - 2026-04-28

No notable changes.

## [7.5.1] - 2026-04-27

No notable changes.

## [7.5.0] - 2026-04-22

### Maintenance

- Refresh runtime dependencies, including Prettier 3.8.3.

## [7.4.1] - 2026-04-13

No notable changes.

## [7.4.0] - 2026-04-13

### Maintenance

- Update the Prettier runtime dependency to `^3.8.2`.

## [7.3.0] - 2026-04-09

### Changed

- Allow TypeScript 6 alongside supported TypeScript 5 releases.

### Maintenance

- Update the TypeScript configuration loader to version 6.3.

## [7.2.0] - 2026-04-08

No notable changes.

## [7.1.0] - 2026-04-05

No notable changes.

## [7.0.2] - 2026-04-04

No notable changes.

## [7.0.1] - 2026-04-03

No notable changes.

## [7.0.0] - 2026-04-02

### Changed

- **Breaking:** Require Node.js 22.18 or newer, dropping Node.js 20 support.

## [6.2.0] - 2026-04-01

No notable changes.

## [6.1.0] - 2026-03-24

### Changed

- Update starter VS Code settings to the `js/ts.tsdk.path` and `js/ts.tsdk.promptToUseWorkspaceVersion` keys.

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

- Mark the published package as side-effect-free for bundlers.

## [6.0.0] - 2026-02-20

### Changed

- **Breaking:** Require Node.js 22.21 or newer.

### Removed

- **Breaking:** Remove the deprecated `kpi-typescript` executable; use `ksc-typescript` instead.

### Maintenance

- Migrate builds from esbuild to tsdown with package validation and explicitly declared runtime dependencies.
- Upgrade to Yargs 18 and refresh runtime dependencies.

## [5.13.0] - 2026-01-25

### Maintenance

- Update the Prettier runtime dependency to `^3.8.1`.

## [5.12.0] - 2026-01-18

### Fixed

- Use TypeScript-specific save actions in the starter VS Code settings to avoid formatter races.

### Maintenance

- Update the Prettier runtime dependency to version 3.8.

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

- Add a pinned TypeScript 5.9.3 development dependency.

## [5.8.3] - 2025-11-07

No notable changes.

## [5.8.2] - 2025-11-06

No notable changes.

## [5.8.1] - 2025-11-04

No notable changes.

## [5.8.0] - 2025-11-04

### Changed

- Stop enabling declaration maps in the starter build configuration.

## [5.7.4] - 2025-10-15

No notable changes.

## [5.7.3] - 2025-10-15

### Changed

- Enable declaration maps in the starter build configuration.

### Documentation

- Specify the `ksc-repo` executable explicitly in bootstrap installation instructions.

### Maintenance

- Update the TypeScript configuration loader to version 6.2.

## [5.7.2] - 2025-10-06

### Changed

- Include dotfiles in the starter build configuration's file patterns.

## [5.7.1] - 2025-09-29

### Maintenance

- Update the `fs-extra` runtime dependency to `^11.3.2`.

## [5.7.0] - 2025-09-08

### Added

- Add `ksc-typescript` as the preferred CLI executable.

### Deprecated

- Deprecate the `kpi-typescript` executable in preparation for its removal in the next major release.

### Documentation

- Update command examples and CLI reference material to use the `ksc` names.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Require Node.js 20.19 or newer.
- **Breaking:** Enable `erasableSyntaxOnly`, rejecting TypeScript syntax that requires transformation.

### Maintenance

- Refresh filesystem and formatting dependencies.

## [5.5.0] - 2025-06-11

No notable changes.

## [5.4.4] - 2025-06-09

No notable changes.

## [5.4.3] - 2025-06-09

### Maintenance

- Refresh runtime dependencies, including Execa 9.6.

## [5.4.2] - 2025-05-26

No notable changes.

## [5.4.1] - 2025-05-11

### Maintenance

- Refresh Execa and the TypeScript peer baseline to 5.8.3; replace Chalk with picocolors in the shared CLI.

## [5.4.0] - 2025-03-28

No notable changes.

## [5.3.1] - 2025-03-10

No notable changes.

## [5.3.0] - 2025-03-04

### Fixed

- Skip plain `tsc` in detected Svelte projects and recommend `svelte-check` to avoid unactionable errors.

### Documentation

- Explain the Svelte type-checking caveat and why the lint command is skipped.

## [5.2.0] - 2025-03-04

No notable changes.

## [5.1.0] - 2025-03-03

### Changed

- Enforce consistent filename casing in the shared TypeScript configuration.
- Allow TypeScript minor updates within version 5 instead of restricting peers to 5.7 patch releases.

### Fixed

- Make the starter build configuration inherit project overrides from `./tsconfig.json`.

### Maintenance

- Refresh Prettier and add the shared TypeScript configuration loader.

## [5.0.8] - 2025-03-02

No notable changes.

## [5.0.7] - 2025-03-02

### Changed

- Allow Node.js 20.9 or newer and remove the pnpm engine restriction.

### Fixed

- Build the CLI for Node.js 20 and provide CommonJS `require` support inside its ESM bundle.

## [5.0.6] - 2025-02-26

### Documentation

- Correct the starter tsconfig comment describing dotfiles.

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

## [5.0.0] - 2025-02-06

### Added

- Publish an extendable TypeScript configuration with strict and unused-code checks, ES2023/DOM libraries, React JSX, bundler resolution, JavaScript checking, and no-emit defaults.
- Provide `kpi-typescript init`, `lint`, and `print-config` commands to install starter files, run `tsc --noEmit`, and display the effective compiler configuration.
- Include starter `tsconfig.json` and `tsconfig.build.json` files plus VS Code settings that select the workspace TypeScript installation.

### Documentation

- Document pnpm installation, Node.js 22 and TypeScript 5.7 requirements, configuration inheritance, CLI usage, and exclusions.

### Maintenance

- Set up package distribution and shared build, lint, and release workflows for Node.js 22 and pnpm 10.

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
