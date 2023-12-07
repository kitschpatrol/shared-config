# @kitschpatrol/npm-config

## Overview

It's a `pnpm`-flavored [`.npmrc`](https://pnpm.io/npmrc) shared config.

It's needed to work around some hoisting issues related to plugin resolution in the other `@kitschpatrol/shared-config` packages.

It's critical that it is applied _before_ any other `@kitschpatrol/shared-config` packages are installed.

**See [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) for the recommended single-package approach.**

## Setup

### Run-once approach

If you just need to set up your `.npmrc` in anticipation of installing another shared config, you can run the script via `dlx` to copy the `.npmrc` to your home folder:

```sh
pnpm dlx @kitschpatrol/npm-config
```

### Installation approach

Optionally, you can install the package if you think you'll ever want to regenerate the `.npmrc`.

1. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/npm-config
   ```

2. If / when you need to regenerate the `.npmrc`, you can run the bundled script:

   ```sh
   pnpm exec npm-config-init
   ```
