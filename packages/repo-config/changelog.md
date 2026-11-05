# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [8.14.1] - 2026-11-03

### Maintenance

- Update the pnpm lockfile reader and the dependency-update workflow's Skill to PR action.

## [8.14.0] - 2026-10-27

### Changed

- Use pnpm's built-in agent-skill linking into `.agents/skills` and `.claude/skills` instead of copying an embedded guide.

### Fixed

- Update only the last copyright notice containing a year, preserving earlier upstream notices in forked licenses.
- Explicitly include the starter `.gitignore` in published package files.

### Documentation

- Explain pnpm skill linking and squash-merge settings for dependency-update pull requests.

### Maintenance

- Add regression tests for copyright-year updates.
- Run scheduled dependency updates monthly and give their pull requests a consistent title.
- Refresh runtime dependencies and starter GitHub Actions pins.

## [8.13.1] - 2026-10-08

No notable changes.

## [8.13.0] - 2026-10-08

### Changed

- Ignore Netlify and Wrangler scratch directories in starter repositories.
- Narrow the ESLint peer-dependency exception and remove the starter minimum-release-age exemption for `@kitschpatrol/*`.

### Maintenance

- Allow loopback links and empty scan results in the starter link-check workflow.
- Refresh runtime dependencies, package metadata, and metadata/dependency-update action pins.

## [8.12.1] - 2026-10-06

### Changed

- Ignore agent directories and `skills-lock.json` in starter repositories.

### Documentation

- Document the Workflows token permission needed to update GitHub Actions.

### Maintenance

- Replace inline dependency-update orchestration with the reusable Skill to PR action.

## [8.12.0] - 2026-10-06

### Documentation

- Document dependency-update workflow secrets, token permissions, scheduling, and generated pull requests.

### Maintenance

- Ship a weekly and manually runnable Claude Code dependency-update workflow that runs `ksc-update` and opens a pull request with its report.

## [8.11.0] - 2026-10-04

### Documentation

- Rewrite the bundled agent guide with current lint/fix workflows, tool commands, rule prefixes, and configuration examples.

### Maintenance

- Update the pnpm lockfile reader dependency.

## [8.10.1] - 2026-09-28

### Fixed

- Allow ESLint 10 with eslint-plugin-jsx-a11y in starter pnpm peer-dependency rules.

### Maintenance

- Correct stderr capture during sitemap discovery in the link-check workflow.
- Refresh the pnpm lockfile reader, fs-extra, and Prettier runtime dependencies.

## [8.10.0] - 2026-09-22

### Maintenance

- Refresh runtime dependencies, including the pnpm lockfile reader, Prettier, and Yargs.

## [8.9.0] - 2026-09-17

### Maintenance

- Refresh runtime dependencies and pin release and metadata actions to specific revisions.

## [8.8.0] - 2026-09-07

### Changed

- Ignore `.vitest/` and exempt `@kitschpatrol/*` packages from pnpm's minimum release age in starter settings.

### Maintenance

- Update the pnpm lockfile reader and Cosmiconfig dependencies.

## [8.7.0] - 2026-08-26

### Changed

- Nest `lychee.toml` beneath `package.json` in VS Code.

### Documentation

- Correct the pnpm workspace settings documentation link.

### Maintenance

- Simplify the release workflow, validate tags against the repository's default branch, and use the triggering tag directly.
- Load Lychee configuration for website checks and discover sitemap links from the homepage.
- Refresh runtime dependencies, including Cosmiconfig 10, and update CI action pins.

## [8.6.0] - 2026-07-31

### Maintenance

- Migrate starter link checks from Linkinator to Lychee, with separate cached repository and website scans and sitemap-based URL discovery.
- Update runtime dependencies, including Execa and Yargs.

## [8.5.0] - 2026-07-24

### Documentation

- Correct README links for authentication setup, VS Code diagnostics, and package/license badges.

### Maintenance

- Ship a scheduled and manually runnable link-check workflow for repository Markdown and the configured project homepage.
- Refresh runtime dependencies, including the pnpm lockfile reader.

## [8.4.0] - 2026-07-22

### Changed

- Nest `electron-builder.ts` and `audit.json` beneath `package.json` in VS Code.

### Fixed

- Resolve initialization templates from the package containing the built CLI.

### Maintenance

- Update the Prettier runtime dependency.

## [8.3.0] - 2026-07-20

### Added

- Expose `--cache` and `--no-cache` options on repository lint and fix commands.

### Changed

- Refine JSON rendering and terminal colors to respect output destinations, `NO_COLOR`, and `FORCE_COLOR`.
- Ignore `.worktrees/` in starter repositories.

### Fixed

- Pin the pnpm lockfile reader to 1100.1.11 to avoid a broken published version.

### Documentation

- Document CLI cache-control options.

### Maintenance

- Upgrade Execa to v10 and refresh the starter CI Node setup action.

## [8.2.0] - 2026-07-16

### Added

- Support native, machine-readable, and JSON output through `--format` on repository `lint` and `fix` commands.
- Ship VS Code lint/fix tasks with problem matchers, merging existing tasks by label during initialization.

### Fixed

- Preserve readable `copyright-year` and `node-version` command labels in minified builds.

### Documentation

- Document output formats, VS Code tasks, and task-merging behavior; update the agent guide's TypeScript advice.

### Maintenance

- Update the pnpm lockfile reader and Globby dependencies.

## [8.1.0] - 2026-07-10

### Documentation

- Update the bundled agent guide for current ESLint, TypeScript, and code-style conventions.

### Maintenance

- Refresh starter GitHub Actions pins and align internal code with stricter TypeScript checks.

## [8.0.0] - 2026-07-07

### Changed

- **Breaking:** Require Node.js `^24.16.0 || >=26.3.0`, dropping Node.js 22 support.

### Maintenance

- Refresh runtime dependencies and tighten internal typing in Node-version analysis.

## [7.6.4] - 2026-06-11

### Maintenance

- Update the SemVer runtime dependency.

## [7.6.3] - 2026-06-05

### Maintenance

- Update the pnpm lockfile reader and SemVer runtime dependencies.

## [7.6.2] - 2026-05-18

No notable changes.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Set supported Node.js versions to `^22.22.2 || >=24.0.0`.
- Allow the unrs-resolver dependency build script in starter pnpm settings.

### Maintenance

- Update the lockfile reader and use `pnpm ci` in the starter CI workflow.

## [7.6.0] - 2026-05-14

### Changed

- Migrate starter workspace build permissions to pnpm 11's `allowBuilds`, including esbuild and oxc-resolver.

### Maintenance

- Refresh runtime dependencies and starter GitHub Actions pins.

## [7.5.3] - 2026-05-03

### Documentation

- Correct the README's MIT license link.

### Maintenance

- Update the pnpm lockfile reader dependency.

## [7.5.2] - 2026-04-28

No notable changes.

## [7.5.1] - 2026-04-27

No notable changes.

## [7.5.0] - 2026-04-22

### Maintenance

- Refresh the pnpm lockfile reader and Prettier runtime dependencies.

## [7.4.1] - 2026-04-13

No notable changes.

## [7.4.0] - 2026-04-13

### Maintenance

- Upgrade the pnpm lockfile reader to the 1100 series and update Prettier.

## [7.3.0] - 2026-04-09

### Changed

- Update starter ignore rules for the pnpm store and Claude configuration; environment-file patterns now also ignore `.env.example`.

### Maintenance

- Support release tags with or without a `v` prefix and simplify metadata workflow checkout.
- Update the TypeScript configuration loader dependency.

## [7.2.0] - 2026-04-08

No notable changes.

## [7.1.0] - 2026-04-05

No notable changes.

## [7.0.2] - 2026-04-04

No notable changes.

## [7.0.1] - 2026-04-03

### Added

- Ship a `.gitattributes` starter that enforces LF line endings across platforms.

## [7.0.0] - 2026-04-02

### Changed

- **Breaking:** Require Node.js 22.18.0 or newer.

### Removed

- Stop shipping the starter `.npmrc` authentication configuration.

### Documentation

- Update the starter-file overview for the removed `.npmrc` and added CI workflow.

### Maintenance

- Ship a CI workflow that installs, builds, lints, and tests on Linux, macOS, and Windows.

## [6.2.0] - 2026-04-01

### Changed

- Nest Git attribute files beneath `package.json` in VS Code.

### Fixed

- Avoid adding a development Node requirement when `engines.node` is absent.
- Normalize workspace paths on Windows for repository-wide package discovery.

### Maintenance

- Harden starter GitHub workflows with pinned checkout revisions, explicit permissions, disabled persisted credentials, and safer shell variable handling.
- Update the Globby runtime dependency.

## [6.1.0] - 2026-03-24

### Changed

- Nest `skills-lock.json` beneath `package.json` in VS Code.

### Fixed

- Avoid redundant development Node requirements when an existing `engines.node` already specifies a higher minimum.

### Documentation

- Ship a Claude Code guide covering shared-config conventions, configuration, and lint workflows.

### Maintenance

- Update the lockfile reader and metadata synchronization action.

## [6.0.3] - 2026-03-08

### Fixed

- Base `engines.node` on production dependencies and preserve intentionally higher development Node requirements.
- Exclude standard license boilerplate dates and test fixtures from copyright-year updates.

### Maintenance

- Remove deprecated `publish-branch` configuration and refresh runtime dependencies and contributor Node requirements.

## [6.0.2] - 2026-02-28

### Fixed

- Accept explicitly configured Node runtime and development minimums above the dependency requirements.

### Maintenance

- Upgrade checkout to v6 in the starter release workflow.

## [6.0.1] - 2026-02-26

### Fixed

- Restore compatibility with Node.js 20.19.0 and newer.
- Recommend a Node engine when only development dependencies declare Node requirements.
- Evaluate Node requirements separately for each workspace package instead of combining all lockfile importers.

### Maintenance

- Refresh the lockfile reader and starter checkout/metadata action versions.

## [6.0.0] - 2026-02-20

### Added

- Check and fix `engines.node` and `devEngines.runtime` against dependency requirements from the pnpm lockfile, reporting the responsible direct dependencies.
- Add `ksc-repo print-config` to display detected Node.js requirements and the lockfile used.

### Changed

- **Breaking:** Require Node.js 22.21.0 or newer.
- Nest `.node-version` and `tsconfig.*.json` beneath `package.json` in VS Code.

### Removed

- **Breaking:** Remove the deprecated `kpi-repo` executable alias.

### Documentation

- Explain repository lint/fix checks and the new Node-version reporting command.

### Maintenance

- Migrate CLI builds to tsdown, stop bundling runtime dependencies, and upgrade dependency declarations including Yargs 18.

## [5.13.0] - 2026-01-25

### Changed

- Extend VS Code nesting to TOML configuration and Wrangler JSON/JSONC files.

### Maintenance

- Update the Prettier runtime dependency.

## [5.12.0] - 2026-01-18

### Maintenance

- Update Prettier and refresh license copyright dates.

## [5.11.0] - 2025-12-27

### Changed

- Nest `.template.env` beneath `.env` in VS Code.

### Maintenance

- Update the fs-extra runtime dependency.

## [5.10.0] - 2025-12-06

### Changed

- Move pnpm hoisting rules into a starter `pnpm-workspace.yaml` and allow required dependency build scripts.

### Documentation

- Correct bootstrap guidance to copy repository configuration into the project root.

### Maintenance

- Refresh runtime dependencies and explicitly invoke tsx in build scripts for cross-platform development.

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

No notable changes.

## [5.8.0] - 2025-11-04

### Changed

- Configure the starter `.npmrc` to use `NPM_AUTH_TOKEN` for local publishing.

### Fixed

- Match source maps and declaration files by basename so VS Code nests them beneath the corresponding source file.

## [5.7.4] - 2025-10-15

No notable changes.

## [5.7.3] - 2025-10-15

### Changed

- Nest JavaScript and TypeScript source maps and declaration files beneath their source files in VS Code.

### Documentation

- Make the bootstrap command explicitly select the `ksc-repo` executable.

### Maintenance

- Update the TypeScript configuration loader dependency.

## [5.7.2] - 2025-10-06

No notable changes.

## [5.7.1] - 2025-09-29

### Maintenance

- Update fs-extra and the Globby build dependency.

## [5.7.0] - 2025-09-08

### Added

- Add `ksc-repo` as the preferred executable name.

### Deprecated

- Deprecate the `kpi-repo` executable alias ahead of its removal in the next major release.

### Documentation

- Update examples and CLI references to use `ksc-repo`.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Require Node.js 20.19.0 or newer.

### Maintenance

- Refresh runtime dependencies, including Prettier 3.6.

## [5.5.0] - 2025-06-11

No notable changes.

## [5.4.4] - 2025-06-09

No notable changes.

## [5.4.3] - 2025-06-09

### Maintenance

- Upgrade the metadata synchronization action to v3 for `metadata.json` support and remove redundant workflow validation steps.
- Update the Execa runtime dependency.

## [5.4.2] - 2025-05-26

No notable changes.

## [5.4.1] - 2025-05-11

### Maintenance

- Update Execa and replace Chalk with Picocolors in shared CLI logging.

## [5.4.0] - 2025-03-28

No notable changes.

## [5.3.1] - 2025-03-10

No notable changes.

## [5.3.0] - 2025-03-04

No notable changes.

## [5.2.0] - 2025-03-04

No notable changes.

## [5.1.0] - 2025-03-03

### Changed

- Extend VS Code nesting to additional configuration extensions, including `.mts`, `.cts`, JSONC, and JSON5.

### Fixed

- Prevent copyright checks from following symlink loops and recognize license filenames case-insensitively.

### Maintenance

- Refresh runtime dependencies and add the TypeScript configuration loader used by shared CLI infrastructure.

## [5.0.8] - 2025-03-02

No notable changes.

## [5.0.7] - 2025-03-02

### Changed

- Support Node.js 20.9 or newer and remove the pnpm engine restriction.

### Fixed

- Replace Node's experimental glob API so copyright checks work on Node.js 20 and respect `.gitignore`, excluding dependency license files.

## [5.0.6] - 2025-02-26

### Maintenance

- Update the Prettier runtime dependency.

## [5.0.5] - 2025-02-10

### Changed

- **Breaking:** Raise the minimum Node.js version to 22.13.1.

### Fixed

- Make `lint` report copyright-year issues without modifying files, and make `fix` update them.

### Maintenance

- Update the Prettier runtime dependency.

## [5.0.4] - 2025-02-07

### Documentation

- Correct repository and homepage links in package metadata and the README.

## [5.0.3] - 2025-02-07

No notable changes.

## [5.0.2] - 2025-02-07

### Fixed

- Declare the missing `find-workspaces` runtime dependency required by the CLI.

## [5.0.1] - 2025-02-07

### Changed

- Format initialized and merged JSON with Prettier, including the formatter as a runtime dependency.
- Update starter ignores for ESLint's configuration inspector and remove Parcel and tsup cache patterns.

## [5.0.0] - 2025-02-06

### Added

- Add repository `lint` and `fix` operations for detecting and updating outdated copyright years in license files.

### Changed

- **Breaking:** Rename the executable from `repo-config` to `kpi-repo` and replace operation flags with subcommands.
- **Breaking:** Require Node.js 22 or newer and pnpm 10 or newer.
- Extend starter pnpm hoisting rules for Knip, TypeScript configuration, and Case Police.

### Removed

- **Breaking:** Remove the command that prints starter configuration file contents.

### Documentation

- Rewrite setup instructions and CLI references for the new executable and repository checks.

### Maintenance

- Refresh runtime dependencies and reorganize CLI execution and build tooling.
- Rename the metadata workflow to `set-github-metadata.yml` and improve shell quoting in starter workflows.

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

- Clean up package repository and issue-tracker metadata.

## [4.7.6] - 2024-09-13

### Changed

- Ignore Parcel's cache in the starter `.gitignore`.

### Maintenance

- Invoke mdat through pnpm when building the package.

## [4.7.5] - 2024-09-07

No notable changes.

## [4.7.4] - 2024-09-07

No notable changes.

## [4.7.3] - 2024-09-07

### Changed

- Stop nesting CODEOWNERS files beneath the README in the starter VS Code settings.

## [4.7.2] - 2024-06-14

### Maintenance

- Allow the metadata synchronization workflow to be triggered manually.

## [4.7.1] - 2024-06-09

### Documentation

- Clarify installation ordering and document the GitHub Actions forks used by the starter workflows.

### Maintenance

- Switch release, changelog, and metadata synchronization workflows to the kitschpatrol action forks.

## [4.7.0] - 2024-06-07

### Maintenance

- Upgrade the starter release workflow to `softprops/action-gh-release` v2.

## [4.6.7] - 2024-06-05

### Maintenance

- Migrate README generation from mdat's combined header directive to separate title, badge, and description directives.

## [4.6.6] - 2024-05-20

No notable changes.

## [4.6.5] - 2024-05-19

No notable changes.

## [4.6.4] - 2024-05-19

### Changed

- Expand VS Code file nesting for configuration, workspace, lock, and project documentation files.

## [4.6.3] - 2024-04-18

No notable changes.

## [4.6.2] - 2024-04-08

No notable changes.

## [4.6.1] - 2024-03-17

No notable changes.

## [4.6.0] - 2024-03-17

No notable changes.

## [4.5.0] - 2024-02-29

### Documentation

- Document metadata synchronization and the personal access token permissions required by the starter workflows.

### Maintenance

- Add a workflow that synchronizes GitHub repository metadata from `package.json`.
- Upgrade release workflow checkout to v4 and pin the changelog action revision.

## [4.4.3] - 2024-02-29

### Maintenance

- Remove the obsolete Markdownlint hoisting rule from the starter `.npmrc`.

## [4.4.2] - 2024-02-23

### Maintenance

- Refresh the mdat tooling used by README generation.

## [4.4.1] - 2024-02-22

### Maintenance

- Update the mdat tooling used to generate package documentation.

## [4.4.0] - 2024-02-20

### Added

- Include mdat in the generated pnpm hoisting patterns.

### Changed

- Nest hidden TypeScript configuration files beneath `package.json` in VS Code.

### Documentation

- Add a CLI reference, package badges, and license information to the README.

### Maintenance

- Generate README content with mdat during package builds and include the MIT license file.

## [4.3.3] - 2024-01-14

### Documentation

- Correct GitHub naming in release authentication instructions.

## [4.3.2] - 2024-01-14

### Fixed

- Place the `.env.example` exception after environment-file ignore patterns so example files remain trackable.

## [4.3.1] - 2023-12-23

### Maintenance

- Remove the obsolete `@kitschpatrol/vscode-config` pnpm hoisting pattern.

## [4.3.0] - 2023-12-22

No notable changes.

## [4.2.2] - 2023-12-22

No notable changes.

## [4.2.1] - 2023-12-21

No notable changes.

## [4.2.0] - 2023-12-20

### Added

- Enable VS Code file nesting for environment files, package configuration and lockfiles, and README-related license and changelog files.

## [4.1.3] - 2023-12-19

No notable changes.

## [4.1.2] - 2023-12-19

### Documentation

- Add release-workflow authentication instructions for GitHub tokens and fine-grained personal access tokens.

### Maintenance

- Allow the release workflow to use `PERSONAL_ACCESS_TOKEN` with a `GITHUB_TOKEN` fallback, and improve authentication and release-state logging.

## [4.1.1] - 2023-12-19

### Documentation

- Describe the supplied npm, Git, VS Code, and GitHub workflow configuration.

### Maintenance

- Correct release workflow branch validation to recognize tags on main when checkout uses a detached HEAD.

## [4.1.0] - 2023-12-18

### Maintenance

- Add a GitHub release workflow template for version tags, with main-branch validation, generated release notes, and documentation attachments.

## [4.0.0] - 2023-12-16

### Added

- Include Astro and Svelte VS Code extension recommendations in initialized repositories.

### Changed

- **Breaking:** Merge existing VS Code JSON configuration during initialization and overwrite other starter files without an interactive overwrite prompt.

### Maintenance

- Adopt `fs-extra` for repository file operations.

## [3.1.0] - 2023-12-16

No notable changes.

## [3.0.4] - 2023-12-16

### Documentation

- Correct one-off setup instructions to include `--init` and clarify the purpose of the pnpm hoisting configuration.

## [3.0.3] - 2023-12-15

### Fixed

- Declare the Cosmiconfig and JSON-colorizer runtime dependencies required by the shared CLI implementation.

## [3.0.2] - 2023-12-15

No notable changes.

## [3.0.1] - 2023-12-15

### Fixed

- Correct published file patterns so the CLI and repository starter assets are included.

## [3.0.0] - 2023-12-15

### Added

- Provide repository starter configuration with pnpm hoisting patterns and Git ignore rules for dependencies, build output, environment files, and framework-generated files.
- Provide `repo-config --init` to copy starter files into a package root and `--print-config` to inspect installed configuration files.

### Documentation

- Document one-off pnpm setup and installation as a development dependency, including applying repository configuration before other shared-config packages.

### Maintenance

- Establish ESM CLI bundling, prepublish builds, and public npm distribution with declared Node.js 18+ and pnpm 8+ requirements.

[3.0.0]: https://github.com/kitschpatrol/shared-config/releases/tag/v3.0.0
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
