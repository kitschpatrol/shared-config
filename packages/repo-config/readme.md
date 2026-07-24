<!-- title -->

# @kitschpatrol/repo-config

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/repo-config](https://img.shields.io/npm/v/@kitschpatrol/repo-config.svg)](https://npmjs.com/package/@kitschpatrol/repo-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit/)

<!-- /badges -->

<!-- description -->

**Repository configuration and GitHub workflows for @kitschpatrol/shared-config.**

<!-- /description -->

## Overview

It's a `pnpm`-flavored shared config with some essential files for a fresh repo, plus automated linting and fixing via a bundled CLI tool named `ksc-repo`.

The `lint` and `fix` commands check and correct:

- **License year**: Ensures the copyright year in `license.txt` matches the current year.
- **Node.js version**: Ensures `engines.node` and `devEngines.runtime` in `package.json` reflect the minimum Node.js versions actually required by your dependency tree (derived from the pnpm lockfile). If dev dependencies require a higher Node.js version than production dependencies, a separate `devEngines.runtime` entry is managed automatically.

This includes the following:

- [`pnpm-workspace.yaml`](https://pnpm.io/pnpm-workspace_yaml) with hoisting patterns for `ksc` tool access and trusted dependency installation scripts.
- `.gitignore` with typical patterns
- `.vscode` extension recommendations (additional settings and recommendations come from other `@kitschpatrol/shared-config` packages)
- `.vscode/tasks.json` with `ksc-repo lint` and `ksc-repo fix` [tasks](https://code.visualstudio.com/docs/debugtest/tasks) that run the checks above in `--format machine` mode and feed reported issues into VS Code's Problems panel via a problem matcher. (The other `@kitschpatrol/shared-config` packages contribute tasks for their own tools the same way.) If a `tasks.json` already exists, `init` merges by task label, leaving your own tasks untouched.
- `.github` folder with workflows:
  - `github-release.yml` Automates turning turning vX.X.X tags on main into GitHub releases with changelogs
  - `set-github-metadata.yml` Populates GitHub repo metadata from package.json
  - `ci.yml` Basic cross-platform CI action

In order to work around some hoisting issues related to plugin resolution in the other `@kitschpatrol/shared-config` packages, it's critical that it is applied _before_ any other `@kitschpatrol/shared-config` packages are installed.

<!-- recommendation -->

> [!IMPORTANT]
>
> **You can use this package on its own, but it's recommended to use [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) instead for a single-dependency and single-package approach to linting and fixing your project.**
>
> This package is included as a dependency in [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config), which also automatically invokes the command line functionality in this package via its `ksc` command

<!-- /recommendation -->

## Setup

### Run-once approach

If you just need to set up your basic repository configuration files in anticipation of installing another `@kitschpatrol` shared configuration dependency, you can run the script via `dlx` to copy them to your project's root:

```sh
pnpm --package=@kitschpatrol/repo-config dlx ksc-repo init
```

### Installation approach

Optionally, you can install the package if you think you'll ever want to regenerate the repo config files.

1. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/repo-config
   ```

2. If / when you need to regenerate the repo config files, you can run the bundled script:

   ```sh
   pnpm exec ksc-repo init
   ```

### GitHub Configuration

There are two options for authenticating the release workflow action:

#### GitHub Token

1. Ensure that read / write permissions are set for actions on the repository under Settings → Actions → General → Workflow permissions.

#### Personal Access token

If you want releases to come from your account instead of `github_actions`, then:

1. Create a [fine-grained personal access token](https://github.com/settings/personal-access-tokens) in your GitHub account with the following permissions:

   | Permission     | Access         |
   | -------------- | -------------- |
   | Administration | Read and write |
   | Contents       | Read and write |
   | Metadata       | Read-only      |

2. Add the token as a secret to your new GitHub repository.

   You can do this through the GitHub website under the _Settings → Secrets and variables → Actions_ page under the key `PERSONAL_ACCESS_TOKEN`.

   Alternately, you can do this locally with the [GitHub CLI](https://cli.github.com) and a credential manager like [1Password CLI](https://www.1password.dev/cli/get-started):

   ```sh
   gh secret set PERSONAL_ACCESS_TOKEN --app actions --body $(op read 'op://Personal/GitHub Mika/PERSONAL_ACCESS_TOKEN')
   ```

### GitHub Actions

Note: Action dependencies have been forked.

| Original                                                                                      | Fork                                                                                                            | Modifications |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------- |
| [bullrich/generate-release-changelog](https://github.com/bullrich/generate-release-changelog) | [kitschpatrol/github-action-release-changelog](https://github.com/kitschpatrol/github-action-release-changelog) | ❌            |
| [softprops/action-gh-release](https://github.com/softprops/action-gh-release)                 | [kitschpatrol/github-action-release](https://github.com/kitschpatrol/github-action-release)                     | ❌            |
| [kbrashears5/github-action-repo-sync](https://github.com/kbrashears5/github-action-repo-sync) | [kitschpatrol/github-action-repo-sync](https://github.com/kitschpatrol/github-action-repo-sync)                 | ✅            |

## Usage

### CLI

<!-- cli-help -->

#### Command: `ksc-repo`

Kitschpatrol's repository-related shared configuration tools.

This section lists top-level commands for `ksc-repo`.

Usage:

```txt
ksc-repo <command>
```

| Command        | Description                                                                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `init`         | Initialize by copying starter config files to your project root.                                                                                                       |
| `lint`         | Check the repo for common issues. Package-scoped. In a monorepo, it will also run in all packages below the current working directory.                                 |
| `fix`          | Fix common issues like outdated copyright years in license files. Package-scoped. In a monorepo, it will also run in all packages below the current working directory. |
| `print-config` | Print minimum Node.js version constraints from the pnpm lockfile.                                                                                                      |

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

_See the sections below for more information on each subcommand._

#### Subcommand: `ksc-repo init`

Initialize by copying starter config files to your project root.

Usage:

```txt
ksc-repo init
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

#### Subcommand: `ksc-repo lint`

Check the repo for common issues. Package-scoped. In a monorepo, it will also run in all packages below the current working directory.

Usage:

```txt
ksc-repo lint
```

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-repo fix`

Fix common issues like outdated copyright years in license files. Package-scoped. In a monorepo, it will also run in all packages below the current working directory.

Usage:

```txt
ksc-repo fix
```

| Option              | Description                                                                                                                                                           | Type                            | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `--format`          | Output format: "native" streams each tool's own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report. | `"json"` `"machine"` `"native"` | `"native"` |
| `--cache`           | Use tool-native caches stored below node\_modules/.cache/ksc at the workspace root. Disable with --no-cache.                                                          | `boolean`                       | `true`     |
| `--help`<br>`-h`    | Show help                                                                                                                                                             | `boolean`                       |            |
| `--version`<br>`-v` | Show version number                                                                                                                                                   | `boolean`                       |            |

#### Subcommand: `ksc-repo print-config`

Print minimum Node.js version constraints from the pnpm lockfile.

Usage:

```txt
ksc-repo print-config
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

<!-- /cli-help -->

### VS Code tasks

`ksc-repo init` adds a `.vscode/tasks.json` with two tasks:

- **`ksc-repo lint`** runs `ksc-repo lint --format machine` across the whole project
- **`ksc-repo fix`** runs `ksc-repo fix --format machine`, applying auto-fixes and reporting whatever couldn't be fixed

If you're using the complete [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) package, you'd more likely want to run:

- **`ksc lint`** runs `ksc lint --format machine`, which runs all `ksc lint` tools across the whole project
- **`ksc fix`** runs `ksc fix --format machine`, which applies all `ksc fix` auto-fixes and reports anything unfixable

Run them via the _Tasks: Run Task_ command (or the _Terminal → Run Task…_ menu item).

Each task's problem matcher parses the machine-format output and populates VS Code's [Problems panel](https://code.visualstudio.com/docs/editing/editingevolved#_errors-warnings) with every reported issue, pointing to the offending file, line, and column.

The tasks share a problem matcher owner with the other `@kitschpatrol/shared-config` tasks, so the panel reflects the most recent run rather than stacking duplicates.

If your project already has a `.vscode/tasks.json`, `init` merges by task label: your own tasks are left alone, and same-label tasks are replaced with the latest definitions.

<!-- license -->

## License

[MIT](license.txt) © [Eric Mika](https://ericmika.com)

<!-- /license -->
