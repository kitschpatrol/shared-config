# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [8.14.1] - 2026-11-03

### Changed

- Require ATX (`#`) headings through `remark-lint-heading-style`, since Prettier preserves the existing heading style.

### Maintenance

- Update `mdast-util-to-markdown` to 2.2.1.

## [8.14.0] - 2026-10-27

### Maintenance

- Update Execa to 10.2.1 and Prettier to 3.9.10.

## [8.13.1] - 2026-10-08

No notable changes.

## [8.13.0] - 2026-10-08

### Maintenance

- Update Execa to 10.1 and refresh package discovery keywords.

## [8.12.1] - 2026-10-06

No notable changes.

## [8.12.0] - 2026-10-06

### Maintenance

- Specify heading options explicitly in the README's CLI-help generation template.

## [8.11.0] - 2026-10-04

### Maintenance

- Update `mdast-util-to-markdown` to 2.2.

## [8.10.1] - 2026-09-28

### Maintenance

- Refresh mdast-util-to-markdown, Prettier, and filesystem runtime dependencies.

## [8.10.0] - 2026-09-22

### Maintenance

- Update Prettier to 3.9.8 and Yargs to 18.2.

## [8.9.0] - 2026-09-17

### Maintenance

- Update the Prettier runtime dependency to 3.9.7.

## [8.8.0] - 2026-09-07

### Maintenance

- Update Cosmiconfig to 10.0.1.
- Adapt package type-validation configuration to tsdown 0.23.

## [8.7.0] - 2026-08-26

### Documentation

- Clarify the configuration factory's API description and link it to Remark.

### Maintenance

- Upgrade Cosmiconfig to version 10 while retaining the dedicated TypeScript configuration loader.

## [8.6.0] - 2026-07-31

### Maintenance

- Update Execa and Yargs runtime dependencies.

## [8.5.0] - 2026-07-24

### Documentation

- Update npm and license badge links to their canonical URLs.

### Maintenance

- Update `fs-extra` to 11.4.

## [8.4.0] - 2026-07-22

### Maintenance

- Update the Prettier runtime dependency to 3.9.6.

## [8.3.0] - 2026-07-20

### Fixed

- Make printed configuration colors respect terminal detection, `NO_COLOR`, and `FORCE_COLOR`, keeping redirected output plain by default.

### Maintenance

- Upgrade Execa to version 10.

## [8.2.0] - 2026-07-16

No notable changes.

## [8.1.0] - 2026-07-10

### Maintenance

- Update the Prettier runtime dependency to 3.9.5.

## [8.0.0] - 2026-07-07

### Changed

- **Breaking:** Require Node.js `^24.16.0 || >=26.3.0`, dropping support for earlier Node releases.

### Maintenance

- Refresh Prettier, Cosmiconfig, and filesystem runtime dependencies.

## [7.6.4] - 2026-06-11

No notable changes.

## [7.6.3] - 2026-06-05

No notable changes.

## [7.6.2] - 2026-05-18

No notable changes.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Require Node.js `^22.22.2 || >=24.0.0`, raising the Node 22 minimum and dropping Node 23 support.

## [7.6.0] - 2026-05-14

### Maintenance

- Update `fs-extra` to 11.3.5.

## [7.5.3] - 2026-05-03

### Documentation

- Correct the README's MIT license link.

## [7.5.2] - 2026-04-28

No notable changes.

## [7.5.1] - 2026-04-27

No notable changes.

## [7.5.0] - 2026-04-22

### Documentation

- Link the README's license attribution to the author's website.

### Maintenance

- Update the Prettier runtime dependency to 3.8.3.

## [7.4.1] - 2026-04-13

No notable changes.

## [7.4.0] - 2026-04-13

### Maintenance

- Update the Prettier runtime dependency to 3.8.2.

## [7.3.0] - 2026-04-09

### Added

- Support Markdown attribute-list syntax through `remark-attribute-list`.
- Export the `RemarkConfig` type and named `remarkSharedConfig` preset alongside the existing factory and default export.

### Maintenance

- Separate configuration implementation from the package entry point and update the Cosmiconfig TypeScript loader to 6.3.

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

- **Breaking:** Require Node.js 22.18+, replacing the previous Node.js 20 runtime support.

### Documentation

- Replace the placeholder `--location` help text with an explanation of configuration storage, and improve factory API examples.

## [6.2.0] - 2026-04-01

No notable changes.

## [6.1.0] - 2026-03-24

No notable changes.

## [6.0.3] - 2026-03-08

### Maintenance

- Refresh Cosmiconfig and filesystem runtime dependencies.
- Declare Node.js 22.18+ for development tooling separately from the package's Node.js 20.19+ runtime requirement.

## [6.0.2] - 2026-02-28

No notable changes.

## [6.0.1] - 2026-02-26

### Fixed

- Restore the supported runtime requirement to Node.js 20.19+.

### Maintenance

- Mark the package as side-effect-free in its distribution metadata.

## [6.0.0] - 2026-02-20

### Changed

- **Breaking:** Raise the minimum supported Node.js version to 22.21.

### Removed

- **Breaking:** Remove the deprecated `kpi-remark` executable alias; use `ksc-remark`.

### Maintenance

- Migrate CLI and library builds to tsdown with package and type validation, and declare dependencies externally rather than bundling them.
- Upgrade Yargs to version 18.

## [5.13.0] - 2026-01-25

### Maintenance

- Update Prettier to 3.8.1.

## [5.12.0] - 2026-01-18

### Maintenance

- Update Prettier to 3.8 and refresh the license copyright year.

## [5.11.0] - 2025-12-27

### Maintenance

- Update `fs-extra` to 11.3.3.

## [5.10.0] - 2025-12-06

### Documentation

- Update installation guidance to describe the repository configuration files required for pnpm, rather than only `.npmrc`.

### Maintenance

- Update Prettier to 3.7.4 and Execa to 9.6.1.
- Invoke the build script explicitly through tsx for cross-platform builds.

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

No notable changes.

## [5.7.4] - 2025-10-15

No notable changes.

## [5.7.3] - 2025-10-15

### Documentation

- Disambiguate the repository bootstrap executable with an explicit pnpm package selection and `ksc-repo init`.

### Maintenance

- Update the Cosmiconfig TypeScript loader to 6.2.

## [5.7.2] - 2025-10-06

No notable changes.

## [5.7.1] - 2025-09-29

### Maintenance

- Update `fs-extra` to 11.3.2.

## [5.7.0] - 2025-09-08

### Added

- Add `ksc-remark` as the preferred executable name.

### Deprecated

- Deprecate `kpi-remark` in favor of `ksc-remark`, retaining the alias until the next major release.

### Documentation

- Update setup instructions and the command reference to use `ksc-remark`.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Raise the minimum supported Node.js version to 20.19.

### Maintenance

- Update Prettier to 3.6.2 and refresh the filesystem dependency.

## [5.5.0] - 2025-06-11

No notable changes.

## [5.4.4] - 2025-06-09

No notable changes.

## [5.4.3] - 2025-06-09

### Maintenance

- Update Execa to 9.6.

## [5.4.2] - 2025-05-26

No notable changes.

## [5.4.1] - 2025-05-11

### Maintenance

- Refresh Execa and Remark rule dependencies, including fenced-code flags and reference validation.
- Replace Chalk with Picocolors in the bundled shared CLI implementation.

## [5.4.0] - 2025-03-28

### Maintenance

- Refresh shared TypeScript, esbuild, and Vitest build and validation tooling.

## [5.3.1] - 2025-03-10

No notable changes.

## [5.3.0] - 2025-03-04

No notable changes.

## [5.2.0] - 2025-03-04

No notable changes.

## [5.1.0] - 2025-03-03

### Fixed

- Load TypeScript configuration files with the dedicated Cosmiconfig TypeScript loader, avoiding module-resolution errors for imports inside config files.

### Maintenance

- Update the Prettier runtime dependency to 3.5.3.

## [5.0.8] - 2025-03-02

No notable changes.

## [5.0.7] - 2025-03-02

### Fixed

- Restore Node.js 20.9+ support in package requirements and CLI builds, and remove the pnpm engine restriction.

### Maintenance

- Upgrade `remark-directive` to version 4.

## [5.0.6] - 2025-02-26

### Documentation

- Correct the non-Git project customization example to use `remarkConfig({ rules })` instead of the removed `overrideRules()` export.

### Maintenance

- Refresh Prettier, remark-gfm, and remark-validate-links runtime dependencies.

## [5.0.5] - 2025-02-10

### Changed

- **Breaking:** Raise the minimum supported Node.js version to 22.13.1.

### Maintenance

- Update the Prettier runtime dependency to 3.5.

## [5.0.4] - 2025-02-07

### Maintenance

- Correct the package repository URL and add its package-specific homepage.

## [5.0.3] - 2025-02-07

No notable changes.

## [5.0.2] - 2025-02-07

### Fixed

- Declare `find-workspaces` as a runtime dependency for configuration and workspace lookup.

## [5.0.1] - 2025-02-07

### Added

- Add `init --location package` to store the Remark configuration in `package.json`, alongside the existing standalone-file mode.

### Changed

- Format configuration JSON written or merged by initialization with Prettier and include Prettier as a runtime dependency.

## [5.0.0] - 2025-02-06

### Added

- Add a typed `remarkConfig()` factory for extending plugins, overriding rule options, and customizing serialization settings.

### Changed

- **Breaking:** Replace the `remark-config` executable and flag-based commands with `kpi-remark init` and `kpi-remark print-config` subcommands.
- **Breaking:** Require Node.js 22+ and declare pnpm 10+ as the supported package-manager version.
- Use underscores for emphasis and hyphens for thematic breaks when Remark serializes Markdown.

### Removed

- **Breaking:** Remove the public `overrideRules()` export; configure rule overrides through `remarkConfig({ rules })`.
- **Breaking:** Stop including the standalone `remark-cli` dependency; the shared-config linting and fixing workflow runs through ESLint.

### Fixed

- Allow bracketed ellipses and GitHub alert markers in undefined-reference validation.
- Preserve GitHub alert markers during Markdown serialization instead of inserting escape characters, including lowercase alert names.

### Documentation

- Document the new CLI subcommands and configuration factory, and clarify the ESLint-based linting workflow.

### Maintenance

- Build the library from TypeScript with declaration files and explicit ESM exports, refresh runtime dependencies, and replace remark-preset-prettier with an explicit rule selection.

## [4.7.12] - 2024-11-08

### Maintenance

- Update `remark-validate-links` to 13.0.2.

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

- Normalize package repository and issue-tracker metadata.

## [4.7.6] - 2024-09-13

### Maintenance

- Invoke README generation through pnpm and format generated output during the shared build.

## [4.7.5] - 2024-09-07

No notable changes.

## [4.7.4] - 2024-09-07

No notable changes.

## [4.7.3] - 2024-09-07

No notable changes.

## [4.7.2] - 2024-06-14

### Documentation

- Expand starter rule-override examples to show disabling repository-based link validation.

## [4.7.1] - 2024-06-09

No notable changes.

## [4.7.0] - 2024-06-07

No notable changes.

## [4.6.7] - 2024-06-05

### Maintenance

- Migrate README generation to separate mdat title, badge, and description directives and refresh the associated build tooling.

## [4.6.6] - 2024-05-20

No notable changes.

## [4.6.5] - 2024-05-19

No notable changes.

## [4.6.4] - 2024-05-19

### Maintenance

- Upgrade remark-lint to version 10 and refresh its rule plugins and the Remark CLI dependency.

## [4.6.3] - 2024-04-18

### Maintenance

- Update `remark-validate-links` to 13.0.1.

## [4.6.2] - 2024-04-08

### Documentation

- Document disabling repository-based link validation with `repository: false` for projects outside Git repositories.

## [4.6.1] - 2024-03-17

No notable changes.

## [4.6.0] - 2024-03-17

### Documentation

- Explain the ESLint/MDX bridge used by editor integration and correct the direct Remark command example to use `pnpm`.

### Maintenance

- Refresh shared build and release tooling while retaining TypeScript 5.3 for the existing Svelte compatibility constraint.

## [4.5.0] - 2024-02-29

### Documentation

- Clarify the package and CLI descriptions as Markdown and MDX linting for shared-config.

### Maintenance

- Add package discovery keywords.

## [4.4.3] - 2024-02-29

No notable changes.

## [4.4.2] - 2024-02-23

### Fixed

- Disable `no-emphasis-as-heading`, `no-html`, and `no-missing-blank-lines` to avoid conflicts with mdat-generated Markdown.

## [4.4.1] - 2024-02-22

### Maintenance

- Update the mdat tooling used to generate package documentation.

## [4.4.0] - 2024-02-20

### Documentation

- Add a CLI reference, package badges, and license information to the README, and clean up the script example.

### Maintenance

- Generate README content with mdat during package builds and include the MIT license file.

## [4.3.3] - 2024-01-14

### Documentation

- Correct VS Code naming in the usage instructions.

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

### Added

- Include the VS Code MDX extension recommendation in initialized projects.

### Changed

- **Breaking:** Merge existing VS Code JSON configuration during initialization and overwrite other starter files without an interactive overwrite prompt.

### Maintenance

- Move the configuration entry file to `remark.config.js` while preserving package-level imports, and adopt `fs-extra` for initialization.

## [3.1.0] - 2023-12-16

No notable changes.

## [3.0.4] - 2023-12-16

### Documentation

- Correct repository bootstrap instructions to include the required `--init` flag.

## [3.0.3] - 2023-12-15

### Maintenance

- Remove unused filename and heading-punctuation lint dependencies.

## [3.0.2] - 2023-12-15

No notable changes.

## [3.0.1] - 2023-12-15

### Fixed

- Correct published file patterns so the CLI and starter configuration assets are included.

## [3.0.0] - 2023-12-15

### Added

- Export `overrideRules()` to customize or disable existing plugins by rule name.

### Fixed

- Disable filename-extension and mixed-case filename checks that could crash with missing source-position errors.

### Documentation

- Add rule-override examples to the starter configuration and update bootstrap instructions to use `@kitschpatrol/repo-config`.

## [2.2.1] - 2023-12-13

### Added

- Support frontmatter, GitHub Flavored Markdown, and directives through dedicated Remark plugins.
- Implement configuration inspection through `--print-config`, using Cosmiconfig and compact, colorized JSON output.

### Removed

- Remove automatic Markdown heading capitalization from the shared preset.

## [2.2.0] - 2023-12-12

### Added

- Provide a default ESM Remark preset for Markdown and MDX linting, covering headings, filenames, lists, code blocks, references, and link validation with Prettier integration.
- Include automatic heading capitalization and a `remark-config --init` command that copies a customizable `.remarkrc.js` into the project.

### Documentation

- Document pnpm installation, starter configuration, direct Remark invocation, and integration through ESLint and editor plugins.

### Maintenance

- Establish CLI bundling, prepublish builds, and public npm distribution with declared Node.js 18+ and pnpm 8+ requirements.

[2.2.0]: https://github.com/kitschpatrol/shared-config/releases/tag/v2.2.0
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
