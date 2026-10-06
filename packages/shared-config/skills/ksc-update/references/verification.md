# Consumer verification recipes

Use these recipes during Setup and step 5. Save commands, versions, raw logs,
and results under `node_modules/.cache/ksc-update/`. Run pnpm commands as separate
bare invocations; save their captured output in a later operation so sandbox
command exclusions still match.

## Production-tree engines

For each published package, run in its directory before and after updates:

```bash
pnpm list --prod --depth Infinity --json
```

Save stdout as `production-tree.json` in the corresponding baseline or updated
results folder. If stdout contains lines beginning with `[WARN]`, preserve those
warnings separately and remove only those lines before parsing. Require a
successful command and valid JSON; do not extract an arbitrary JSON-looking
substring from failed output. In a monorepo, include every published package,
not only a private root with no production dependencies.

The list supplies installed paths; read each installed `package.json` for its
actual engine declaration. Save this helper in the run's cache as
`production-engines.mjs` and run it with the saved JSON path as its argument:

```js
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const roots = JSON.parse(readFileSync(process.argv[2], 'utf8'))
if (!Array.isArray(roots)) {
  throw new TypeError('Expected pnpm list JSON array')
}

const manifests = new Map()
const rows = new Set()

function visit(pkg) {
  if (!pkg.path) {
    throw new Error(`Missing installed path: ${pkg.name ?? pkg.version}`)
  }

  if (!manifests.has(pkg.path)) {
    manifests.set(pkg.path, JSON.parse(readFileSync(join(pkg.path, 'package.json'), 'utf8')))
  }

  const manifest = manifests.get(pkg.path)
  rows.add(
    JSON.stringify({
      name: manifest.name,
      node: manifest.engines?.node,
      version: manifest.version,
    }),
  )
  for (const group of ['dependencies', 'optionalDependencies']) {
    const children = Object.values(pkg[group] ?? {})
    for (const child of children) {
      visit(child)
    }
  }
}

for (const root of roots) {
  visit(root)
}

process.stdout.write(`${[...rows].toSorted().join('\n')}\n`)
```

Save the resulting inventory and diff it after resolution and deduplication.
Investigate missing installed paths instead of omitting them. An omitted `node`
field means undeclared support, not proof of compatibility. Check full semver ranges
against every supported consumer Node.js line; check platform-specific optional
dependencies and shipped/bundled code separately because one host's installed
tree cannot prove their compatibility. This inventory does not replace the
newest-in-range registry review.

## Packed builds

Use this repository's tests and CLI fixtures for baseline comparisons.

1. Build the updated package with its development Node.js version and run
   `pnpm pack` as a bare command in that package. Inspect the archive's contents
   and manifest, including exported entrypoints, engines, and dependency ranges.
2. Create an isolated fixture under `${TMPDIR:-/tmp}` with a `file:` dependency
   pointing to that tarball. Install it and run representative API and CLI
   checks using the repository's fixtures. Verify the resolved path/version;
   the tarball checks what ships without borrowing the producer's `node_modules`.
3. Diff CLI output and fixture results against the Setup baseline. Inspect semantic differences, including
   behavior JSON may hide, such as object prototypes, missing versus undefined
   values, ordering, and error handling. Explain each change against accepted
   migrations and consumer expectations.

Also test a fresh isolated install of the published release with the newest
dependencies its ranges allow. Keep this distinct from the published release
running on its old dependencies: reproduce the latter from a known historical
lockfile or preserved installation where possible. A registry tarball alone
does not recover the old transitive tree. If it cannot be reconstructed, report
that gap instead of labeling a fresh install the historical baseline.

## Exact Node.js floor

Use the exact minimum supported release, not just the same major or the active
developer runtime. For disjoint supported Node.js lines, check each relevant
minimum. For an approved engine bump, compare the old release at its old floor
with the updated package at its new floor and on an overlapping supported
runtime where available.

If the version manager has no suitable installed binary, download the exact
official archive from `https://nodejs.org/dist/v<version>/` for the host's OS and
architecture into a temporary folder, alongside `SHASUMS256.txt`. Verify the
archive's SHA-256 against that file, then extract it there. Use the resulting
Node binary by absolute path; do not install globally or change the user's
default runtime. Record `<absolute-node-path> --version` with the results.

Install/build with the development runtime if the tooling requires it, then
invoke the packed package's built JavaScript entrypoint and runtime fixtures
with the exact-floor binary. For subprocesses that use `env node`, put that
binary's directory first in the test process's `PATH` only. Confirm which
binary the child process uses. If the test runner itself requires newer Node,
run a small fixture harness or the built CLI directly at the floor; running
only the newer test runner is not floor validation. Report when installation
or execution on the exact runtime could not be verified.

Record stdout, stderr, exit codes, and relevant API results for identical
fixtures across runtimes and dependency baselines. Normalize only known
nondeterministic fields using the same documented transformation for all runs.
Save SHA-256 digests of normalized fixture output for quick comparison, retain
the actual output for reviewing differences, and add targeted assertions for
behavior that serialization omits.

## Tool references

Check these primary sources or the installed tool's help when behavior differs:

- [GitHub Actions variables](https://docs.github.com/en/actions/reference/workflows-and-actions/variables):
  `GITHUB_ACTIONS` and `CI` identify unattended execution in Actions.
- [pnpm update](https://pnpm.io/cli/update): manifest/catalog writes and selectors.
  This workflow uses a bare update for its full dependency refresh; do not
  assume exclusion syntax works identically in every pnpm implementation.
- [pnpm dedupe](https://pnpm.io/cli/dedupe) and
  [pnpm list](https://pnpm.io/cli/list): deduplication checks and tree inventories.
- [pnpm settings](https://pnpm.io/settings) and
  [peer rules](https://pnpm.io/settings/peer-dependencies#peerdependencyrulesallowedversions):
  current configuration locations and scoped warning allowances. Current pnpm
  uses `.npmrc` for registry/auth settings, not all policy settings.
- [Taze](https://github.com/antfu-collective/taze): candidate filters and maturity.
- [Actions Up](https://github.com/azat-io/actions-up#update-style): SHA pinning.
- [tsdown target](https://tsdown.dev/options/target): implicit engine-derived
  targets affect emitted syntax and do not provide API polyfills.
- [Node.js release archives](https://nodejs.org/dist/): exact runtime downloads
  and checksum manifests.
