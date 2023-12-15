# @kitschpatrol/repo-config

## Overview

It's a `pnpm`-flavored shared config with some essential files for a fresh repo.

This includes [`.npmrc`](https://pnpm.io/npmrc) and `.gitignore` for now.

It's needed to work around some hoisting issues related to plugin resolution in the other `@kitschpatrol/shared-config` packages.

It's critical that it is applied _before_ any other `@kitschpatrol/shared-config` packages are installed.

**See [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) for the recommended single-package approach.**

## Setup

### Run-once approach

If you just need to set up your `.npmrc` in anticipation of installing another shared config, you can run the script via `dlx` to copy the `.npmrc` to your home folder:

```sh
pnpm dlx @kitschpatrol/repo-config
```

### Installation approach

Optionally, you can install the package if you think you'll ever want to regenerate the repo config files.

1. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/repo-config
   ```

2. If / when you need to regenerate the repo config files, you can run the bundled script:

   ```sh
   pnpm exec repo-config --init
   ```
