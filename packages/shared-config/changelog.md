# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [8.14.1] - 2026-11-03

### Fixed

- Normalize Windows directory arguments before glob expansion and escape literal backslashes in POSIX directory names.

### Maintenance

- Update pnpm lockfile tooling.

## [8.14.0] - 2026-10-27

### Fixed

- Expand directory arguments to globs restricted to each tool's supported extensions, escaping special characters in directory names.

### Documentation

- Bundle mdat usage and plugin-authoring skills and document automatic skill linking with pnpm 12.11 or later.
- Update dependency-workflow scheduling guidance and add an npm download badge.

### Maintenance

- Refresh runtime dependencies and simplify published-file inclusion patterns.

## [8.13.1] - 2026-10-08

### Documentation

- Require a unique per-run directory in `ksc-update` to avoid collisions between concurrent checkouts.

### Maintenance

- Require verification helpers to use an absolute `KSC_UPDATE_RUN_DIR` instead of a shared temporary directory.

## [8.13.0] - 2026-10-08

### Documentation

- Expand `ksc-update` into a full repository maintenance workflow with configuration policies and revised verification guidance.

### Maintenance

- Add maintenance helpers for release-age checks, consumer dependency resolution, packed installs, engine inventories, and output comparisons.
- Update Execa, mdat, and pnpm lockfile tooling.

## [8.12.1] - 2026-10-06

### Documentation

- Refine `ksc-update` guidance for pnpm upgrades, release-age exemptions, scoped peer warnings, and side-effect declarations.

## [8.12.0] - 2026-10-06

### Documentation

- Bundle the `ksc-update` skill with dependency compatibility, migration, and verification guidance.
- Document dependency-update workflow credentials and global skill installation.

### Maintenance

- Update mdat.

## [8.11.0] - 2026-10-04

### Documentation

- Bundle the `ksc` agent skill covering code conventions, configuration, and lint workflows, with installation instructions.

### Maintenance

- Refresh runtime dependencies and simplify aggregate command construction.

## [8.10.1] - 2026-09-28

### Documentation

- Recommend pnpm 12.

### Maintenance

- Refresh runtime dependencies, including CSpell, mdat, Prettier, fs-extra, and pnpm lockfile tooling.

## [8.10.0] - 2026-09-22

### Fixed

- Filter mixed explicit file lists for each tool's supported extensions and skip tools with no applicable files.

### Documentation

- Explain which tools use caches and why ESLint caching is disabled.

### Maintenance

- Update Prettier, Yargs, and pnpm lockfile tooling.

## [8.9.0] - 2026-09-17

### Maintenance

- Refresh runtime dependencies, including CSpell, mdat, Prettier, magicast, and pnpm lockfile tooling.

## [8.8.0] - 2026-09-07

### Maintenance

- Refresh runtime dependencies and update test and package-type validation settings for newer Vitest and tsdown.

## [8.7.0] - 2026-08-26

### Documentation

- Fix the repository-configuration guide link.

### Maintenance

- Refresh runtime dependencies, including cosmiconfig 10, deepmerge-ts 8, CSpell, and mdat.

## [8.6.0] - 2026-07-31

### Maintenance

- Update Execa, Yargs, and pnpm lockfile tooling.

## [8.5.0] - 2026-07-24

### Documentation

- Refresh outdated documentation links.

### Maintenance

- Refresh runtime dependencies, including mdat 3, fs-extra, globby, and pnpm lockfile tooling.

## [8.4.0] - 2026-07-22

### Changed

- Show the underlying checker commands in aggregate TypeScript execution logs.
- **Breaking:** Propagate Mdat and Prettier errors from `fix` and `fixFile` instead of silently swallowing them.

### Fixed

- Apply Mdat only to Markdown in `fix` and `fixFile`, preventing other source formats from being rewritten as Markdown.
- Resolve initializer assets from the built CLI package directory.
- Treat collected error diagnostics and unsuccessful child reports as failures even when a tool exits successfully.

### Documentation

- Clarify file-type handling and error propagation in the formatting APIs.

### Maintenance

- Update Prettier and Stylelint and add API and command-runner regression tests.

## [8.3.0] - 2026-07-20

### Added

- Enable tool-native caches for lint and fix, with `--no-cache` to disable them and storage under the workspace's `node_modules/.cache/ksc`.

### Changed

- Run lint tools concurrently and schedule fixes in ordered stages under a shared concurrency limit.
- Render compact JSON reports with terminal-aware color handling and respect `NO_COLOR`, `FORCE_COLOR`, and redirected output.

### Fixed

- Run checks from tools without automatic fixes after `ksc fix` so remaining errors match a subsequent lint.
- Pin pnpm lockfile tooling to avoid the broken 1100.1.12 release.

### Documentation

- Update CLI help for caching and post-fix checks.

### Maintenance

- Upgrade Execa to 10 and expand scheduler, cache, color, and cross-platform test coverage.

## [8.2.0] - 2026-07-16

### Added

- Add `--format native|machine|json` to `ksc lint` and `ksc fix`, with normalized diagnostics and aggregate JSON reports.
- Install aggregate VS Code lint and fix tasks with Problems panel matchers, merging existing tasks by label.

### Documentation

- Document output formats and VS Code task integration.

### Maintenance

- Update globby and pnpm lockfile tooling and add structured-output tests.

## [8.1.0] - 2026-07-10

### Maintenance

- Update Prettier and align internal code with stricter TypeScript checks.

## [8.0.0] - 2026-07-07

### Changed

- **Breaking:** Require Node.js versions matching `^24.16.0 || >=26.3.0`.

### Documentation

- Update the documented Node.js requirement.

### Maintenance

- Refresh runtime dependencies, including Prettier, Stylelint, and CSpell configuration-editing utilities.

## [7.6.4] - 2026-06-11

### Maintenance

- Refresh CSpell, mdat, and semver dependencies and package metadata.

## [7.6.3] - 2026-06-05

### Maintenance

- Update Stylelint, semver, and pnpm lockfile tooling.

## [7.6.2] - 2026-05-18

### Fixed

- Update mdat to fix license and badge expansion regressions.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Change supported Node.js versions to `^22.22.2 || >=24.0.0`.

### Documentation

- Update the documented Node.js requirement.

### Maintenance

- Update mdat, Stylelint, and pnpm lockfile tooling.

## [7.6.0] - 2026-05-14

### Documentation

- Recommend pnpm 11, correct CLI help grammar, and add Vite+ to related projects.

### Maintenance

- Update Stylelint, fs-extra, semver, and pnpm lockfile tooling.

## [7.5.3] - 2026-05-03

### Maintenance

- Update mdat and pnpm lockfile tooling.

## [7.5.2] - 2026-04-28

No notable changes.

## [7.5.1] - 2026-04-27

### Maintenance

- Update Stylelint and package discovery keywords.

## [7.5.0] - 2026-04-22

### Maintenance

- Update mdat, Prettier, Stylelint, and pnpm lockfile tooling.

## [7.4.1] - 2026-04-13

No notable changes.

## [7.4.0] - 2026-04-13

### Maintenance

- Update pnpm lockfile tooling, Prettier, and Stylelint.

## [7.3.0] - 2026-04-09

### Maintenance

- Update the TypeScript configuration loader and simplify package build scripts.

## [7.2.0] - 2026-04-08

### Added

- Export typed `fix`, `fixFile`, `clearCache`, and `FileType` APIs for the Mdat → ESLint → Stylelint → Prettier pipeline.

### Documentation

- Add API usage examples for formatting strings and files and clearing cached tool instances.

### Maintenance

- Add API tests and library declaration builds, and update dependencies including CSpell 10.

## [7.1.0] - 2026-04-05

### Added

- Add `--skip` to aggregate commands, accepting tool names with or without `ksc-` prefixes and comma-separated or repeated values.

### Documentation

- Document the `--skip` option for each aggregate subcommand.

### Maintenance

- Update CSpell dependencies.

## [7.0.2] - 2026-04-04

### Maintenance

- Update mdat to 2.2.

## [7.0.1] - 2026-04-03

### Maintenance

- Simplify badge generation to repair the documentation build and update mdat.

## [7.0.0] - 2026-04-02

### Changed

- **Breaking:** Require Node.js 22.18.0 or later.

### Documentation

- Replace placeholder CLI help for configuration locations and print-config arguments.

### Maintenance

- Upgrade mdat to 2.0 and migrate README generation directives.

## [6.2.0] - 2026-04-01

### Fixed

- Normalize workspace paths on Windows before resolving package directories.

### Maintenance

- Update globby, mdat, and Stylelint.

## [6.1.0] - 2026-03-24

### Maintenance

- Update pnpm lockfile tooling and Stylelint dependencies.

## [6.0.3] - 2026-03-08

### Maintenance

- Update cosmiconfig, fs-extra, and mdat, and declare Node.js 22.18 or later for development tooling.

## [6.0.2] - 2026-02-28

No notable changes.

## [6.0.1] - 2026-02-26

### Fixed

- Restore the declared Node.js minimum to 20.19.0.

### Maintenance

- Refresh runtime dependencies and mark the package as side-effect-free.

## [6.0.0] - 2026-02-20

### Changed

- **Breaking:** Raise the minimum supported Node.js version to 22.21.0.

### Removed

- **Breaking:** Remove the deprecated `kpi` executable alias; use `ksc`.

### Maintenance

- Migrate CLI builds from esbuild to tsdown and declare external runtime dependencies explicitly, including Yargs 18.

## [5.13.0] - 2026-01-25

### Maintenance

- Update Prettier to 3.8.1.

## [5.12.0] - 2026-01-18

### Maintenance

- Update Prettier to 3.8.

## [5.11.0] - 2025-12-27

### Maintenance

- Update fs-extra.

## [5.10.0] - 2025-12-06

### Documentation

- Document LF line endings, Windows usage, and pnpm hoisting through pnpm-workspace.yaml.

### Maintenance

- Invoke the CLI build through tsx for cross-platform compatibility and update Prettier and Execa.

## [5.9.2] - 2025-11-26

No notable changes.

## [5.9.1] - 2025-11-26

No notable changes.

## [5.9.0] - 2025-11-26

No notable changes.

## [5.8.3] - 2025-11-07

No notable changes.

## [5.8.2] - 2025-11-06

### Documentation

- Use the latest project template explicitly in the quick-start command.

## [5.8.1] - 2025-11-04

No notable changes.

## [5.8.0] - 2025-11-04

### Maintenance

- Update README generation directives for the newer mdat syntax.

## [5.7.4] - 2025-10-15

No notable changes.

## [5.7.3] - 2025-10-15

### Documentation

- Add project-template setup instructions and explicitly select `ksc-repo` in pnpm dlx examples.

### Maintenance

- Update cosmiconfig-typescript-loader.

## [5.7.2] - 2025-10-06

No notable changes.

## [5.7.1] - 2025-09-29

### Maintenance

- Update fs-extra and the globby development dependency.

## [5.7.0] - 2025-09-08

### Added

- Add `ksc` as the preferred aggregate executable.

### Deprecated

- Deprecate the `kpi` executable alias ahead of its removal in the next major release.

### Documentation

- Update installation instructions and CLI examples to use `ksc`.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Raise the minimum supported Node.js version to 20.19.0.

### Documentation

- Update Node.js requirements and add lintroll to related projects.

### Maintenance

- Update Prettier and fs-extra.

## [5.5.0] - 2025-06-11

No notable changes.

## [5.4.4] - 2025-06-09

No notable changes.

## [5.4.3] - 2025-06-09

### Maintenance

- Update Execa.

## [5.4.2] - 2025-05-26

### Maintenance

- Add an MDX fixture to CLI integration coverage.

## [5.4.1] - 2025-05-11

### Maintenance

- Replace Chalk with picocolors in CLI logging and update Execa.

## [5.4.0] - 2025-03-28

No notable changes.

## [5.3.1] - 2025-03-10

No notable changes.

## [5.3.0] - 2025-03-04

No notable changes.

## [5.2.0] - 2025-03-04

### Documentation

- Correct the README description of package-specific documentation.

## [5.1.0] - 2025-03-03

### Fixed

- Load TypeScript configuration files with a dedicated loader so relative module imports resolve.

### Documentation

- Make quick-start commands generate standalone configuration files and clarify `--location` options.

### Maintenance

- Update Prettier.

## [5.0.8] - 2025-03-02

No notable changes.

## [5.0.7] - 2025-03-02

### Changed

- Lower the declared Node.js minimum to 20.9.0 and remove the pnpm engine requirement.

### Fixed

- Add a CommonJS require shim to the generated CLI for Node.js 20 interoperability.

### Documentation

- Update installation requirements to describe Node.js 20 support and recommend pnpm.

## [5.0.6] - 2025-02-26

### Documentation

- Correct configuration-location instructions and tool names in the README.

### Maintenance

- Update Prettier and refactor internal utility imports.

## [5.0.5] - 2025-02-10

### Changed

- **Breaking:** Raise the minimum supported Node.js version to 22.13.1.
- Enable native TypeScript configuration loading in spawned commands and suppress its experimental warnings.

### Documentation

- Correct the initialization example to show the actual tool execution order.

### Maintenance

- Update Prettier and globby dependencies.

## [5.0.4] - 2025-02-07

### Documentation

- Fix package README links so they resolve outside the repository.

### Maintenance

- Correct the repository URL and add the package homepage.

## [5.0.3] - 2025-02-07

No notable changes.

## [5.0.2] - 2025-02-07

### Fixed

- Declare the missing `find-workspaces` runtime dependency required by the CLI.

## [5.0.1] - 2025-02-07

### Changed

- Include positional arguments and option flags in verbose function execution logs.

### Fixed

- Forward `init --location` to tool initializers and tolerate packages without starter files.
- Merge starter package.json settings instead of overwriting existing metadata and overrides, and format merged JSON with Prettier.

## [5.0.0] - 2025-02-06

### Added

- Integrate Knip for detecting unused files, exports, and dependencies.
- Integrate TypeScript checking and a shared tsconfig into the aggregate toolchain.
- Add `init --location file|package` to select standalone configuration files or package.json settings.

### Changed

- **Breaking:** Rename the aggregate executable from `shared-config` to `kpi`.
- **Breaking:** Replace operation flags with `init`, `lint`, `fix`, and `print-config` subcommands.
- **Breaking:** Require Node.js 22 or later and pnpm 10 or later.
- Execute tools in a defined order, with repository setup first and Prettier last.

### Documentation

- Expand setup instructions, tool descriptions, CLI reference, and GitHub Actions credential guidance.

### Maintenance

- Replace generated capability discovery with shared command definitions and add CLI integration tests.
- Refresh runtime and development dependencies, including Execa 9.

## [4.7.12] - 2024-11-08

No notable changes.

## [4.7.11] - 2024-09-28

No notable changes.

## [4.7.10] - 2024-09-15

No notable changes.

## [4.7.9] - 2024-09-14

No notable changes.

## [4.7.8] - 2024-09-14

No notable changes.

## [4.7.7] - 2024-09-14

### Maintenance

- Refresh package metadata and allow cleanup to continue after CLI placeholder restoration errors.

## [4.7.6] - 2024-09-13

### Maintenance

- Run README generation through pnpm during package builds.

## [4.7.5] - 2024-09-07

No notable changes.

## [4.7.4] - 2024-09-07

No notable changes.

## [4.7.3] - 2024-09-07

### Maintenance

- Update the globby development dependency.

## [4.7.2] - 2024-06-14

No notable changes.

## [4.7.1] - 2024-06-09

### Maintenance

- Correct TypeScript indexing of generated CLI capabilities.

## [4.7.0] - 2024-06-07

No notable changes.

## [4.6.7] - 2024-06-05

### Maintenance

- Migrate README generation to separate mdat title, badge, and description directives.

## [4.6.6] - 2024-05-20

### Documentation

- Add eslint-config-current-thing to the related-project references.

## [4.6.5] - 2024-05-19

No notable changes.

## [4.6.4] - 2024-05-19

No notable changes.

## [4.6.3] - 2024-04-18

No notable changes.

## [4.6.2] - 2024-04-08

No notable changes.

## [4.6.1] - 2024-03-17

### Documentation

- Replace obsolete Markdownlint references with remark in the hoisting guidance.

## [4.6.0] - 2024-03-17

No notable changes.

## [4.5.0] - 2024-02-29

### Documentation

- Clarify the aggregate package's relationship to tool-specific packages and how commands are forwarded.

### Maintenance

- Add consistent package descriptions and discovery keywords.

## [4.4.3] - 2024-02-29

No notable changes.

## [4.4.2] - 2024-02-23

No notable changes.

## [4.4.1] - 2024-02-22

### Maintenance

- Update the README template for mdat's revised table-of-contents directive.

## [4.4.0] - 2024-02-20

### Added

- Bundle mdat configuration and include its supported operations in the aggregate CLI.

### Documentation

- Add a package README with quick-start commands, tool/package references, CLI usage, and development guidance.

### Maintenance

- Generate README sections with mdat during builds and refresh the capability-generation tooling.

## [4.3.3] - 2024-01-14

No notable changes.

## [4.3.2] - 2024-01-14

No notable changes.

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

No notable changes.

## [4.1.2] - 2023-12-19

No notable changes.

## [4.1.1] - 2023-12-19

No notable changes.

## [4.1.0] - 2023-12-18

No notable changes.

## [4.0.0] - 2023-12-16

### Changed

- **Breaking:** Merge existing VS Code JSON settings and extension arrays during initialization; overwrite other starter files without interactive copy prompts.
- Obtain VS Code integration from individual tool packages instead of a standalone vscode-config dependency.

### Maintenance

- Migrate initialization and capability-generation file operations to fs-extra.

## [3.1.0] - 2023-12-16

No notable changes.

## [3.0.4] - 2023-12-16

No notable changes.

## [3.0.3] - 2023-12-15

### Fixed

- Declare the JSON colorizer and Cosmiconfig runtime dependencies required by the distributed CLI.

## [3.0.2] - 2023-12-15

### Fixed

- Run explicitly requested operations instead of exiting through the no-default-check path.

## [3.0.1] - 2023-12-15

### Maintenance

- Make published CLI file inclusion explicit with the `bin/*` package pattern.

## [3.0.0] - 2023-12-15

### Changed

- **Breaking:** Replace the bundled `npm-config` tool with `repo-config`, expanding initialization to repository ignore files.
- Include command counts and clearer success/failure indicators in aggregate CLI summaries.

## [2.2.1] - 2023-12-13

### Changed

- Print effective configurations as compact, colorized JSON and provide configuration lookup through Cosmiconfig.

### Documentation

- Expand CLI help for configuration printing, help, and version options.

### Maintenance

- Bundle most CLI support libraries instead of declaring them as separate runtime dependencies.

## [2.2.0] - 2023-12-12

### Changed

- Replace bundled Markdownlint configuration with remark configuration for Markdown and MDX.

## [2.1.1] - 2023-12-12

### Added

- Bundle CSpell, ESLint with Astro/Svelte/TypeScript support, Markdownlint, Prettier, Stylelint, npm settings, and VS Code integration behind one dependency.
- Provide the `shared-config` CLI with default checking, `--fix`, `--init`, and `--print-config` modes, file/glob forwarding, colored command summaries, and a failing exit status when any tool fails.

### Documentation

- Provide pnpm installation, starter-configuration, helper-script, and editor setup instructions for Node.js 18+ and pnpm 8+.

### Maintenance

- Establish bundled CLI builds, generated tool-capability discovery, and prepublish build scripts.

[2.1.1]: https://github.com/kitschpatrol/shared-config/releases/tag/v2.1.1
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
