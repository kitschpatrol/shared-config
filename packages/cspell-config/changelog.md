# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

(Node.js support requirements have sometimes increased in minor or patch releases.)

## [Unreleased]

### Changed

- Exclude `**/changelog.md` from default spell checks.

## [8.14.1] - 2026-11-03

No notable changes.

## [8.14.0] - 2026-10-27

### Maintenance

- Update CSpell to 10.4.0 and refresh CLI and formatting dependencies.

## [8.13.1] - 2026-10-08

No notable changes.

## [8.13.0] - 2026-10-08

### Fixed

- Ignore transient Vite configuration bundles that can disappear during concurrent CI scans.

### Maintenance

- Update Execa and package discovery keywords.

## [8.12.1] - 2026-10-06

No notable changes.

## [8.12.0] - 2026-10-06

### Changed

- Recognize additional shell, filesystem, and sandbox terminology.

### Maintenance

- Update README generation tooling and explicitly configure generated CLI-reference headings.

## [8.11.0] - 2026-10-04

### Maintenance

- Update CSpell and its libraries to 10.3.6.

## [8.10.1] - 2026-09-28

### Changed

- Exclude coverage directories from spell checking.
- Expand dictionaries and normalize acronym capitalization and possessive entries.

### Maintenance

- Improve dictionary-suggestion prompts with explicit file destinations and duplicate-handling guidance.
- Update CSpell to 10.3.5 and refresh filesystem and formatting dependencies.

## [8.10.0] - 2026-09-22

### Changed

- Recognize `rviscomi` in the names dictionary.

### Maintenance

- Update Prettier and Yargs.

## [8.9.0] - 2026-09-17

### Maintenance

- Update CSpell to 10.3.3 and refresh configuration-editing and formatting dependencies.

## [8.8.0] - 2026-09-07

### Changed

- Exclude Vitest scratch directories from spell checking.

### Fixed

- Skip unused-word reporting and removal for file-scoped runs so words used elsewhere are preserved.

### Documentation

- Explain that unused-word checks and pruning require a full-project run.

### Maintenance

- Update CSpell to 10.2.2, upgrade Vitest/tsdown tooling, and add scoped-run regression coverage.

## [8.7.0] - 2026-08-26

### Changed

- Enforce `CSpell` capitalization through Case Police.
- Expand and correct acronym, brand, miscellaneous, name, and technical dictionaries.

### Documentation

- Correct CSpell naming and add its reference link in configuration API documentation.

### Maintenance

- Update CSpell to 10.1.1, Cosmiconfig to 10, and configuration-editing/development dependencies.

## [8.6.0] - 2026-07-31

### Maintenance

- Update Execa and Yargs.

## [8.5.0] - 2026-07-24

### Changed

- Recognize `Beckwith` in the names dictionary.

### Documentation

- Correct VS Code Problems-panel, npm package, and license links.

### Maintenance

- Refresh filesystem and dictionary-harvesting dependencies.

## [8.4.0] - 2026-07-22

### Fixed

- Resolve initialization assets from the package containing the built executable.

### Maintenance

- Simplify Markdown code-fence exclusions and add CSpell API regression tests for multiple fenced blocks.
- Update Prettier to 3.9.6.

## [8.3.0] - 2026-07-20

### Added

- Enable content-based CSpell caches for lint/fix with `--cache` and `--no-cache` controls.

### Changed

- Make `fix` correct capitalization with Case Police, then check and report remaining spelling errors.
- Render compact JSON reports and respect terminal/color settings when coloring CLI output.
- Exclude worktree directories and expand ESLint/technical vocabulary.

### Documentation

- Update fix-command help and document cache controls.

### Maintenance

- Upgrade Execa to 10.

## [8.2.0] - 2026-07-16

### Added

- Support `--format native|machine|json` for lint and fix, including structured spelling, capitalization, and unused-word diagnostics.
- Install VS Code lint/fix tasks with problem matchers and merge existing tasks by label.

### Documentation

- Document output formats and running the VS Code tasks.

### Maintenance

- Refresh dictionary-harvesting dependencies and stabilize internal command names used in reports.

## [8.1.0] - 2026-07-10

### Maintenance

- Update Prettier and adapt source/type exports to stricter TypeScript checks.

## [8.0.0] - 2026-07-07

### Added

- Add `ksc-cspell fix` to remove unused local words, deduplicate entries, and sort configuration word lists across supported configuration formats.

### Changed

- **Breaking:** Drop Node.js 22 support; require `^24.15.0 || >=26.0.0`.
- Expand ESLint and technical dictionaries.

### Fixed

- Report failed or empty spell-check runs instead of treating every configured word as unused.

### Documentation

- Document configuration cleanup and distinguish it from fixing source spelling.

### Maintenance

- Add CLI regression tests for configuration cleanup and refresh runtime/build dependencies.

## [7.6.4] - 2026-06-11

### Changed

- Expand the custom dictionaries with additional tools, file types, names, brands, and acronyms.

### Maintenance

- Update CSpell and its libraries to 10.0.1 and refresh build/test dependencies.

## [7.6.3] - 2026-06-05

### Changed

- **Breaking:** Set supported Node.js versions to `^22.22.2 || ^24.15.0 || >=26.0.0`.

### Maintenance

- Refresh build/test tooling and update package-type validation to resolve its fflate compatibility issue.

## [7.6.2] - 2026-05-18

No notable changes.

## [7.6.1] - 2026-05-17

### Changed

- **Breaking:** Raise the supported Node.js 22 minimum to 22.22.2 while retaining Node.js 24 and newer.
- Recognize `fflate`, `gypfile`, and `libc`.

## [7.6.0] - 2026-05-14

### Changed

- **Breaking:** Restrict supported Node.js versions to `^22.18.0 || >=24.0.0`.

### Maintenance

- Update filesystem utilities.

## [7.5.3] - 2026-05-03

### Changed

- Recognize `Ango`, `Steph`, and `unlighthouse`.

## [7.5.2] - 2026-04-28

### Changed

- Recognize `Arjun`, `Ashuk`, and `oembed`.

## [7.5.1] - 2026-04-27

### Changed

- Expand acronym, ESLint, file-extension, and technical dictionaries.

## [7.5.0] - 2026-04-22

### Maintenance

- Update Case Police to 2.2.1 and refresh Prettier.

## [7.4.1] - 2026-04-13

No notable changes.

## [7.4.0] - 2026-04-13

### Changed

- Recognize `CCPL`, `unported`, `armadillu`, and `Berne`.

### Maintenance

- Update Prettier to 3.8.2.

## [7.3.0] - 2026-04-09

### Added

- Export the `CspellConfig` type and named `sharedCspellConfig` preset alongside the existing factory and default export.

### Maintenance

- Separate configuration definitions from the public entry point and update the TypeScript configuration loader.

## [7.2.0] - 2026-04-08

### Changed

- Recognize `cjsx`, `ctsx`, `mjsx`, and `mtsx` file-extension terminology.

### Maintenance

- Upgrade CSpell and its libraries to 10.0.0.

## [7.1.0] - 2026-04-05

### Maintenance

- Update CSpell and its libraries to 9.8.0.

## [7.0.2] - 2026-04-04

No notable changes.

## [7.0.1] - 2026-04-03

### Changed

- Recognize `cinderblock`, `pbxproj`, and `publiccode`.

## [7.0.0] - 2026-04-02

### Changed

- **Breaking:** Require Node.js 22.18.0 or newer, dropping Node.js 20 support.
- Recognize `canparse` in the technical dictionary.

### Documentation

- Replace placeholder `--location` help with an explanation of where configuration is stored.

### Maintenance

- Update README generation to MDAT 2 and simplify shared CLI/dictionary utilities.

## [6.2.0] - 2026-04-01

### Changed

- Recognize `farmfe` in the technical dictionary.

### Maintenance

- Update dictionary-harvesting dependencies.

## [6.1.0] - 2026-03-24

### Changed

- Exclude agent configuration directories and npm/skills lockfiles from spell checking.
- Recognize additional acronyms and `metascope`.

## [6.0.3] - 2026-03-08

### Maintenance

- Refresh configuration/filesystem dependencies and build tooling, and require Node.js 22.18 or newer for development.

## [6.0.2] - 2026-02-28

### Changed

- Expand the technical dictionary with additional development and research terminology.

## [6.0.1] - 2026-02-26

### Fixed

- Restore the declared Node.js 20.19.0 minimum.

### Maintenance

- Update CSpell to 9.7.0 and Case Police to 2.2.0, and mark the package as side-effect free.

## [6.0.0] - 2026-02-20

### Changed

- **Breaking:** Raise the minimum Node.js version to 22.21.0.

### Removed

- **Breaking:** Remove the deprecated `kpi-cspell` executable alias; use `ksc-cspell`.

### Security

- Update CSpell and its libraries to 9.6.4 to address CVE-2026-25547.

### Maintenance

- Migrate builds from esbuild to tsdown, externalize dependencies, and validate published package metadata and types.
- Upgrade Yargs to 18 and refresh development dependencies.

## [5.13.0] - 2026-01-25

### Changed

- Generate `cspell.config.ts` instead of `cspell.config.js` during file-based initialization.

### Documentation

- Update configuration-location examples for the TypeScript starter file.

### Maintenance

- Recognize TypeScript configuration files in dictionary harvesting and update Prettier.

## [5.12.0] - 2026-01-18

### Changed

- Expand custom dictionaries with additional names, brands, file extensions, and technical vocabulary.

### Maintenance

- Update CSpell to 9.6.0 and Prettier to 3.8.

## [5.11.0] - 2025-12-27

### Maintenance

- Refresh CSpell types and filesystem utilities.

## [5.10.0] - 2025-12-06

### Changed

- Expand technical vocabulary and package-manifest exclusions.

### Fixed

- Resolve CSpell's glob root from the working directory for Windows compatibility.

### Documentation

- Update standalone setup guidance to describe repository configuration files rather than only `.npmrc`.

### Maintenance

- Make builds invoke tsx explicitly for cross-platform use and refresh runtime dependencies.

## [5.9.2] - 2025-11-26

No notable changes.

## [5.9.1] - 2025-11-26

No notable changes.

## [5.9.0] - 2025-11-26

### Changed

- Add LLM-related vocabulary and correct the `ASTC` dictionary entry.

### Maintenance

- Update CSpell to 9.3.2 and Case Police to 2.1.1.

## [5.8.3] - 2025-11-07

No notable changes.

## [5.8.2] - 2025-11-06

### Maintenance

- Update CSpell and its libraries to 9.3.0.

## [5.8.1] - 2025-11-04

No notable changes.

## [5.8.0] - 2025-11-04

### Changed

- Expand technical vocabulary and normalize selected dictionary entries.

### Fixed

- Place the `types` export condition before `import` so TypeScript can resolve the published declarations correctly.

### Maintenance

- Update CSpell and its libraries to 9.2.2.
- Compare harvested dictionary suggestions case-insensitively to avoid duplicate recommendations.

## [5.7.4] - 2025-10-15

No notable changes.

## [5.7.3] - 2025-10-15

### Changed

- Expand and correct the custom dictionaries.

### Documentation

- Disambiguate the repository-bootstrap executable in installation instructions.

### Maintenance

- Update the TypeScript configuration loader.

## [5.7.2] - 2025-10-06

No notable changes.

## [5.7.1] - 2025-09-29

### Documentation

- Explain file, word, and code-block exclusions for CSpell and Case Police.

### Maintenance

- Refresh filesystem utilities and dictionary-harvesting dependencies.

## [5.7.0] - 2025-09-08

### Added

- Provide `ksc-cspell` as the preferred CLI name.

### Changed

- Expand the dictionaries with additional brands, names, rule terminology, and technical vocabulary.

### Deprecated

- Deprecate the `kpi-cspell` alias in favor of `ksc-cspell`, retaining it until the next major release.

### Documentation

- Update command examples and CLI reference headings to use `ksc-cspell`.

### Maintenance

- Refine the dictionary-harvesting helper.

## [5.6.0] - 2025-09-01

### Changed

- **Breaking:** Raise the minimum Node.js version to 20.19.0.

### Maintenance

- Update CSpell to 9.2.1 and refresh filesystem and formatting dependencies.

## [5.5.0] - 2025-06-11

No notable changes.

## [5.4.4] - 2025-06-09

No notable changes.

## [5.4.3] - 2025-06-09

### Changed

- Expand custom dictionaries with additional file extensions, names, acronyms, brands, and technical vocabulary.

### Maintenance

- Add a contributor script to harvest project-specific words and prepare dictionary-categorization suggestions.
- Update Execa to 9.6.0.

## [5.4.2] - 2025-05-26

### Maintenance

- Update CSpell and its libraries to 9.0.2.

## [5.4.1] - 2025-05-11

### Changed

- Recognize `unrs` in the technical dictionary.

### Maintenance

- Update CSpell to 9.0.1 and Case Police to 2.0.
- Replace Chalk with Picocolors in shared CLI logging.

## [5.4.0] - 2025-03-28

### Maintenance

- Update CSpell and its libraries to 8.18.0.

## [5.3.1] - 2025-03-10

No notable changes.

## [5.3.0] - 2025-03-04

No notable changes.

## [5.2.0] - 2025-03-04

No notable changes.

## [5.1.0] - 2025-03-03

### Maintenance

- Declare the shared TypeScript configuration-loader dependency and update Prettier.

## [5.0.8] - 2025-03-02

No notable changes.

## [5.0.7] - 2025-03-02

### Changed

- Lower the declared Node.js minimum to 20.9.0 and remove the pnpm engine restriction.

### Fixed

- Fix CommonJS dependency loading in the distributed ES module CLI and target its builds at Node.js 20.

## [5.0.6] - 2025-02-26

### Changed

- Expand font and technical vocabulary and add a `RealSense` capitalization rule.

### Maintenance

- Update CSpell to 8.17.5, Case Police to 1.0, and Prettier.

## [5.0.5] - 2025-02-10

### Changed

- **Breaking:** Raise the minimum Node.js version to 22.13.1.
- Suppress experimental TypeScript-loading warnings from invoked tools.

### Maintenance

- Update Prettier to 3.5.0.

## [5.0.4] - 2025-02-07

### Documentation

- Correct package homepage/repository links and the installation recommendation's admonition markup.

## [5.0.3] - 2025-02-07

No notable changes.

## [5.0.2] - 2025-02-07

### Fixed

- Declare the missing `find-workspaces` runtime dependency used by shared CLI utilities.

## [5.0.1] - 2025-02-07

### Changed

- Format merged initialization files using the project's Prettier configuration.

### Fixed

- Honor configuration-location choices during initialization, including through the aggregate CLI, and use the correct `cspell.config.js` filename.
- Apply CSpell's resolved ignore paths to Case Police checks.

## [5.0.0] - 2025-02-06

### Added

- Export a typed `cspellConfig()` factory for project-specific configuration.
- Add `init --location file|package` to select a configuration file or a `package.json` configuration key.
- Report unused entries in the local configuration's `words` array during linting.
- Check proper-name capitalization with Case Police and bundled capitalization overrides.
- Add a dictionary for ESLint rule terminology and expand the existing dictionaries.

### Changed

- **Breaking:** Replace `cspell-config` and its action flags with `kpi-cspell init`, `lint`, and `print-config` subcommands.
- **Breaking:** Replace the distributed JSON preset with an ES module default export and a JavaScript starter configuration.
- **Breaking:** Require Node.js 22 or newer and pnpm 10 or newer.
- Install CSpell directly instead of requiring it as a peer dependency.
- Print resolved CSpell configuration through its configuration loader instead of verbose debug output.

### Fixed

- Stop ignoring long uppercase identifiers that could conceal spelling mistakes in Markdown, MDX, and JSON.

### Documentation

- Document the new commands, configuration locations, dictionaries, unused-word checks, and capitalization checks.

### Maintenance

- Add declaration builds, migrate command parsing to Yargs, and refresh runtime dependencies.

## [4.7.12] - 2024-11-08

### Maintenance

- Update the CSpell peer requirement to `^8.16.0`.

## [4.7.11] - 2024-09-28

### Maintenance

- Update the CSpell peer requirement to `^8.14.4`.

## [4.7.10] - 2024-09-15

No notable changes.

## [4.7.9] - 2024-09-14

No notable changes.

## [4.7.8] - 2024-09-14

No notable changes.

## [4.7.7] - 2024-09-14

### Changed

- Recognize `SXSW`, `outlers`, `datahub`, and `pytest`.

### Maintenance

- Standardize repository and issue-tracker package metadata.

## [4.7.6] - 2024-09-13

### Changed

- Expand and correct custom dictionaries with additional names, brands, acronyms, and technical vocabulary.

### Maintenance

- Run README generation through pnpm.

## [4.7.5] - 2024-09-07

### Changed

- Expand custom dictionaries and exclude additional audio/video formats from spell checking.

### Maintenance

- Add dictionary sorting and duplicate-detection scripts.

## [4.7.4] - 2024-09-07

### Fixed

- Disable hidden-file and hidden-directory globbing during spell checking.

## [4.7.3] - 2024-09-07

### Added

- Add the `kp-files` dictionary for file extensions and formats.

### Changed

- Expand dictionaries and default exclusions, including additional media formats and patch files.
- Exclude MathJax expressions and long uppercase identifiers in Markdown, MDX, and JSON; enable hidden-file globbing.

### Documentation

- Describe the file-extension dictionary.

## [4.7.2] - 2024-06-14

No notable changes.

## [4.7.1] - 2024-06-09

No notable changes.

## [4.7.0] - 2024-06-07

### Changed

- Recognize `hashbang` in the technical dictionary.

## [4.6.7] - 2024-06-05

### Changed

- Include editable `words` and `ignorePaths` arrays in starter configurations.
- Exclude Apple application/script files and recognize `scpt`.

### Maintenance

- Update the CSpell peer requirement to `^8.8.4`.

## [4.6.6] - 2024-05-20

No notable changes.

## [4.6.5] - 2024-05-19

### Changed

- Expand the dictionaries with file formats, technical vocabulary, brands, names, and acronyms.

### Maintenance

- Update the CSpell peer requirement to `^8.8.1`.

## [4.6.4] - 2024-05-19

No notable changes.

## [4.6.3] - 2024-04-18

### Changed

- Recognize `ABFR`, `emaculation`, and `mailarchiver`.

## [4.6.2] - 2024-04-08

### Changed

- Expand the custom dictionaries with additional names, food, brands, and technical vocabulary.

## [4.6.1] - 2024-03-17

### Changed

- Expand and reorganize the custom dictionaries with additional acronyms, brands, names, and technical vocabulary.

## [4.6.0] - 2024-03-17

### Added

- Provide five separately configurable dictionaries for acronyms, brands, miscellaneous vocabulary, names, and technical terms.

### Changed

- Enable additional bundled CSpell dictionaries and expand the shared vocabulary.
- Ignore fenced Markdown/MDX code blocks and generated `v2_c_` identifiers.

### Documentation

- Explain disabling individual dictionaries and adding project-specific words.

### Maintenance

- Update the CSpell peer requirement to `^8.6.0` and add a dictionary-listing script.

## [4.5.0] - 2024-02-29

### Documentation

- Correct CSpell naming in the package overview and CLI reference.

### Maintenance

- Standardize the package description and npm discovery keywords.

## [4.4.3] - 2024-02-29

### Changed

- Recognize additional CLI and identifier terms in the shared vocabulary.

## [4.4.2] - 2024-02-23

### Changed

- Expand the shared vocabulary and exclude snapshots, audio files, and tldraw documents from spell checking.

## [4.4.1] - 2024-02-22

No notable changes.

## [4.4.0] - 2024-02-20

### Changed

- Recognize `mdat` and `mdatrc` in the shared vocabulary.

### Documentation

- Add a CLI reference and licensing information, and correct the package-script example.

### Maintenance

- Generate README content during builds, include the MIT license, and refresh build dependencies.

## [4.3.3] - 2024-01-14

### Documentation

- Correct the VS Code product name in the usage guidance.

## [4.3.2] - 2024-01-14

### Changed

- Expand the shared vocabulary with media, web-development, and project-specific terms.

### Maintenance

- Update bundled CLI parsing dependencies.

## [4.3.1] - 2023-12-23

No notable changes.

## [4.3.0] - 2023-12-22

No notable changes.

## [4.2.2] - 2023-12-22

No notable changes.

## [4.2.1] - 2023-12-21

### Added

- Include the CSpell JSON schema in generated starter configurations for editor assistance.

### Changed

- Expand the shared vocabulary with HTML, TypeScript, CSS, and development-tool terminology.

## [4.2.0] - 2023-12-20

No notable changes.

## [4.1.3] - 2023-12-19

No notable changes.

## [4.1.2] - 2023-12-19

No notable changes.

## [4.1.1] - 2023-12-19

No notable changes.

## [4.1.0] - 2023-12-18

### Changed

- Recognize `webp` in the shared vocabulary.

## [4.0.0] - 2023-12-16

### Added

- Initialize VS Code spell-checker settings and extension recommendations.

### Changed

- **Breaking:** Rename `main.json` to `cspell.config.json`; import the package root instead of the removed filename.
- Merge existing VS Code JSON settings during initialization and overwrite other starter files without shell copying.
- Recognize `mergeable` and `deepmerge` in the shared vocabulary.

## [3.1.0] - 2023-12-16

No notable changes.

## [3.0.4] - 2023-12-16

### Changed

- Expand the shared vocabulary with additional names and development terms.

### Documentation

- Add the missing `--init` flag to repository-bootstrap instructions.

## [3.0.3] - 2023-12-15

### Fixed

- Declare missing `cosmiconfig` and JSON-colorizer runtime dependencies required by the CLI.

## [3.0.2] - 2023-12-15

No notable changes.

## [3.0.1] - 2023-12-15

### Fixed

- Correct npm file inclusion patterns for the CLI and starter configuration files.

## [3.0.0] - 2023-12-15

### Changed

- Exclude SVGs, MP4s, and patch directories from spell checking and recognize `antfu`.

### Documentation

- Update repository-bootstrap instructions to `@kitschpatrol/repo-config` and explain `.gitignore` support.

## [2.2.1] - 2023-12-13

### Added

- Add `-p` as an alias for `--print-config`.

### Changed

- Exclude `package.json` from spell checking and expand the shared vocabulary.

### Fixed

- Give `--print-config` a default project path and avoid error exits for debug output.

### Documentation

- Expand generated CLI help with configuration output, help, and version information.

### Maintenance

- Bundle shared CLI utilities and reduce directly declared runtime dependencies.

## [2.2.0] - 2023-12-12

### Changed

- Recognize `linebreak` and `remarkrc` in the shared vocabulary.

### Maintenance

- Refresh CLI dependency declarations.

## [2.1.1] - 2023-12-12

### Added

- Add `--print-config`, help/version output, and initialization/check aliases (`-i`, `-l`/`--lint`).

### Changed

- Accept file/glob arguments, run checks by default, and prefix tool output with colored CSpell labels.
- Expand the shared vocabulary with additional development-tool terms.

### Fixed

- Forward subprocess error output and preserve interactive input for initialization.

### Maintenance

- Replace zx scripts with a shared TypeScript command builder and bundled Node.js executables built before publication.

## [2.0.0] - 2023-12-08

### Changed

- **Breaking:** Replace `cspell-config-init` with `cspell-config --init` and add `--check` for project spell checking.
- Recognize `markdownlint` and `nothrow` in the shared vocabulary.

### Documentation

- Update initialization and package-script examples for the unified CLI.

### Maintenance

- Add the zx-based command runner and argument-parsing dependencies.

## [1.0.1] - 2023-12-07

### Documentation

- Install the configuration as a development dependency in the setup instructions.

## [1.0.0] - 2023-12-07

### Added

- Provide a shared CSpell 8 configuration with US English, custom vocabulary, Astro/Svelte/Markdown/MDX/patch support, and `.gitignore` exclusions.
- Provide `cspell-config-init` to create a starter `.cspell.json` while preserving existing files.

### Documentation

- Document standalone installation, project customization, editor integration, and spell-checking scripts.

### Maintenance

- Set up public npm distribution and package metadata with Node.js 18 and pnpm 8 minimums.

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
