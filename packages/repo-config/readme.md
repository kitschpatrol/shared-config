# @kitschpatrol/repo-config

## Overview

It's a `pnpm`-flavored shared config with some essential files for a fresh repo.

This includes the following:

- [`.npmrc`](https://pnpm.io/npmrc) with hoisting patterns for \`shared-config\`\` tool access
- `.gitignore` with typical patterns
- `.vscode` extension recommendations (additional settings and recommendations come from other `shared-config` packages)
- `.github` folder with a workflow for turning vX.X.X tags into GitHub releases

It's needed to work around some hoisting issues related to plugin resolution in the other `@kitschpatrol/shared-config` packages.

It's critical that it is applied _before_ any other `@kitschpatrol/shared-config` packages are installed.

**See [`@kitschpatrol/shared-config`](https://www.npmjs.com/package/@kitschpatrol/shared-config) for the recommended single-package approach.**

## Setup

### Run-once approach

If you just need to set up your `.npmrc` in anticipation of installing another shared config, you can run the script via `dlx` to copy the `.npmrc` to your home folder:

```sh
pnpm dlx @kitschpatrol/repo-config --init
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

### GitHub Configuration

There are two options for authenticating the release workflow action:

#### GitHub Token

1. Ensure that read / write permissions are set for actions on the repository under Settings → Actions → General → Workflow permissions.

#### Personal Access token

If you want releases to come from your account instead of `github_actions`, then:

1. Create a [fine-grained personal access token](https://github.com/settings/tokens?type=beta) in your GitHub account with the "Contents" repository permission set to "Read and Write".
2. Add the token as a secret to the repository under the key `PERSONAL_ACCESS_TOKEN`.
