<!--+ Warning: Content inside HTML comment blocks was generated by mdat and may be overwritten. +-->

<!-- title -->

# @kitschpatrol/knip-config

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/knip-config](https://img.shields.io/npm/v/@kitschpatrol/knip-config.svg)](https://npmjs.com/package/@kitschpatrol/knip-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- /badges -->

<!-- description -->

**Knip configuration for @kitschpatrol/shared-config.**

<!-- /description -->

## Overview

It's a shared [Knip](https://knip.dev) config, plus a command-line tool `kpi-knip` to perform Knip-related project initialization, linting, and fixing.

<!-- recommendation -->

> [!IMPORTANT]
>
> **You can use this package on its own, but it's recommended to use [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) instead for a single-dependency and single-package approach to linting and fixing your project.**
>
> This package is included as a dependency in [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config), which also automatically invokes the command line functionality in this package via its `kpi` command

<!-- /recommendation -->

## Setup

To use just this Knip config in isolation:

1. Install the `.npmrc` in your project root. This is required for correct PNPM behavior:

   ```sh
   pnpm dlx @kitschpatrol/repo-config init
   ```

2. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/knip-config
   ```

3. Add the starter `knip.config.ts` files to your project root, and add any customizations you'd like:

   ```sh
   pnpm exec kpi-knip init
   ```

## Usage

Integrate with your `package.json` scripts as you see fit, for example:

```json
{
  "scripts": {
    "lint": "kpi-knip lint"
  }
}
```

### Configuration

To create a `knip.config.ts` in your project root:

```sh
pnpm exec kpi-knip init
```

(Note that this will delete the `knip` property in your `package.json`!)

_Or_

To create a `knip` property in `package.json`:

```sh
pnpm exec kpi-knip init --location package
```

(Note that this will delete the `knip.config.ts` file in your project root!)

### CLI

<!-- cli-help -->

#### Command: `kpi-knip`

Kitschpatrol's Knip shared configuration tools.

This section lists top-level commands for `kpi-knip`.

Usage:

```txt
kpi-knip <command>
```

| Command        | Description                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `init`         | Initialize by copying starter config files to your project root or to your package.json file.                                                |
| `lint`         | Check for unused code and dependencies. Package-scoped. In a monorepo, it will also run in all packages below the current working directory. |
| `print-config` | Print the effective Knip configuration. Package-scoped. Searches up to the root of a monorepo if necessary.                                  |

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

_See the sections below for more information on each subcommand._

#### Subcommand: `kpi-knip init`

Initialize by copying starter config files to your project root or to your package.json file.

Usage:

```txt
kpi-knip init
```

| Option              | Description         | Type                 | Default  |
| ------------------- | ------------------- | -------------------- | -------- |
| `--location`        | TK                  | `"file"` `"package"` | `"file"` |
| `--help`<br>`-h`    | Show help           | `boolean`            |          |
| `--version`<br>`-v` | Show version number | `boolean`            |          |

#### Subcommand: `kpi-knip lint`

Check for unused code and dependencies. Package-scoped. In a monorepo, it will also run in all packages below the current working directory.

Usage:

```txt
kpi-knip lint
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

#### Subcommand: `kpi-knip print-config`

Print the effective Knip configuration. Package-scoped. Searches up to the root of a monorepo if necessary.

Usage:

```txt
kpi-knip print-config
```

| Option              | Description         | Type      |
| ------------------- | ------------------- | --------- |
| `--help`<br>`-h`    | Show help           | `boolean` |
| `--version`<br>`-v` | Show version number | `boolean` |

<!-- /cli-help -->

<!-- license -->

## License

[MIT](license.txt) © Eric Mika

<!-- /license -->
