# @kitschpatrol/vscode-config

## Overview

A bit of boilerplate for a fresh VSCode workspace, with a list of recommended extensions and the settings necessary to get various extensions to talk to the tools defined in `@kitschpatrol/shared-config`.

**See [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) for the recommended single-package approach.**

## Setup

### Run-once approach

If you just need to set up your `.vscode` folder in anticipation of installing another shared config, you can run the script via `dlx` to copy the `.npmrc` to your home folder:

```sh
pnpm dlx @kitschpatrol/vscode-config
```

### Installation approach

Optionally, you can install the package if you think you'll ever want to regenerate the `.vscode` folder.

1. Add the package:

   ```sh
   pnpm add -D @kitschpatrol/vscode-config
   ```

2. If / when you need to regenerate the `.vscode`, you can run the bundled script:

   ```sh
   pnpm exec vscode-config --init
   ```
