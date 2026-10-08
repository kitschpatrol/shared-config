# Verification recipes

Use these recipes during Setup and step 5. Save commands, versions, raw logs,
and results in the run directory, `$KSC_UPDATE_RUN_DIR`, created once using the
[Environment instructions](../SKILL.md#environment),
under `baseline/` and `updated/`. Capture output without losing exit codes and
use the runner's normal permissions.

## Baselines

Keep these states distinct:

- **Original checkout:** the starting manifests, lockfile, and policy settings
  copied before any Setup edit. Identify the original locked tree without
  claiming it passed checks that only ran later.
- **Setup baseline:** every install attempt and build, test, lint, inventory,
  and advisory output under `baseline/`, with the actual pnpm version, policy
  changes, commands, environment, and lockfile diff. Label results after a
  lockfile repair as repaired. A failure here predates the dependency updates
  but may have been introduced by Setup; call it pre-existing only when evidence
  shows it.
- **Updated result:** compared with the Setup baseline, with every change
  explained.
- **Published release:** a fresh install resolving the currently allowed
  versions is not the historical dependency tree; that needs a known lockfile or
  preserved installation. A registry tarball alone does not recover it, so
  report missing historical evidence rather than relabeling a fresh install.

For build-producing repositories, save the baseline artifacts such as `dist/`,
disable nondeterministic steps such as encryption or timestamps through
repository switches, and record the matching commands and environment for later
comparison.

For each published package, record declared `engines.node`, the effective
consumer minimum and full supported range, and separate development
requirements. Inspect published dependency trees and artifacts, not just the
root or the current CI runtime. When support is undeclared, derive the existing
requirement from published code and dependencies rather than assuming the
developer runtime is the consumer floor. Capture the production inventory,
advisory report, isolated consumer installs, and representative fixture results
below before updates, and repeat them for the updated result.

## Production-tree engines

For each published package, run in its directory before and after updates:

```bash
pnpm list --prod --depth Infinity --json
```

Save stdout as `production-tree.json` in the matching results folder. If stdout
contains lines beginning with `[WARN]`, keep those warnings separately and strip
only those lines before parsing. Require a successful command and valid JSON;
never extract a JSON-looking substring from failed output. In a monorepo include
every published package, not only a private root.

The list supplies installed paths, and each installed `package.json` holds the
actual engine declaration. The skill's `scripts/production-engines.mjs` walks
the tree and prints one sorted row of name, version, and declared `engines.node`
per installed package:

```bash
node "<skill-directory>/scripts/production-engines.mjs" production-tree.json > production-engines.txt
```

Save the inventory and diff it after resolution and deduplication. A row with
`installed: false` is a dependency this host did not install, usually a
platform-specific optional dependency; review its engines from registry
metadata, because one host's installed tree cannot prove it. An omitted `node`
field means undeclared support, not compatibility. Check full semver ranges
against every supported consumer Node.js line, and check shipped or bundled code
separately. This inventory does not replace the newest-in-range registry review.

## Security advisories

Before and after updates, in each workspace root:

```bash
pnpm audit --prod --json > audit.json
echo $? > audit.exit
```

Diff the two reports and list advisories that are new, resolved, or still open,
with their advisory identifiers and dependency paths. Never run `pnpm audit
--fix`: it writes overrides and release-age exclusions outside the override and
exemption policies. Resolve an open advisory through an accepted update or a
reviewed override under the configuration policy, and otherwise report it as a
gap.

## Packed builds

Use this repository's tests and CLI fixtures for baseline comparisons.

1. Build the package with its development Node.js version and run `pnpm pack` in
   that package. Inspect the archive's contents and manifest, including exported
   entrypoints, engines, and dependency ranges.
2. Create an isolated fixture under the run directory with a `file:` dependency
   on that tarball. Install it and run representative API and CLI checks with
   the repository's fixtures. Verify the resolved path and version; the tarball
   checks what ships without borrowing the producer's `node_modules`.
3. Diff CLI output and fixture results against the Setup baseline. Inspect
   semantic differences that JSON can hide, such as object prototypes, missing
   versus undefined values, ordering, and error handling, and explain each
   change against accepted migrations and consumer expectations.

Also test a fresh isolated install of the published release with the newest
dependencies its ranges allow, kept distinct from the historical state as the
Baselines section describes.

`scripts/packed-fixture.mjs <state>` performs steps 1 and 2 up to the install:
it packs every published workspace package, records each tarball's manifest and
file list in `packed-manifests.json`, and installs a fixture under `<run
directory>/<state>/fixture`. With `--published name@version` it installs the
registry release instead, for the fresh-install check. Run the representative
checks inside the printed fixture directory yourself. Pitfalls it handles, which
a hand-built fixture must handle too:

- Packing rewrites `workspace:` ranges to registry versions, so a fixture that
  depends only on one tarball silently installs its siblings from the registry.
  Override every packed sibling to its tarball.
- Some consumer setup must exist before installing, for example an init command
  that writes `publicHoistPattern` so bins and plugins resolve. Follow the
  documented consumer installation order; `--before-install` runs such a
  command, with `FIXTURE_TARBALLS` naming a JSON map of package to tarball for
  `dlx` against a packed package.
- Exported JSON or JSONC files, such as tsconfig presets, cannot be imported as
  ES modules; check them with the consuming tool, for example `tsc
--showConfig`.
- Fixers mutate files in the fixture, including untracked probe scripts. Restore
  the tree (`git checkout -- .` after committing the setup, and regenerate
  untracked probes) before every run that should be comparable.
- pnpm may append `minimumReleaseAgeExclude` entries to the fixture's workspace
  file when it falls back to young versions; that is expected in a fixture and
  shows which young versions consumers resolve.

## Exact Node.js floor

Validate at the exact minimum supported release, not the same major or the
active developer runtime. For disjoint supported lines check each relevant
minimum. For an approved engine change compare the old release at its old floor
with the updated package at its new floor, and on an overlapping supported
runtime where one exists.

Obtain the exact runtime without changing the user's default. In the isolated
fixture declare the floor version:

```json
{
  "devEngines": {
    "runtime": { "name": "node", "version": "24.16.0", "onFail": "download" }
  }
}
```

Run `pnpm install` there and confirm `pnpm exec node --version`; pnpm downloads
the release, verifies it, and records the checksum in the fixture's lockfile. If
that is unavailable, download the official archive for the host from
`https://nodejs.org/dist/v<version>/` together with `SHASUMS256.txt`, verify the
SHA-256, extract it in the run directory, and use the binary by absolute path.
Record the binary's path and `--version` output with the results either way.

Install and build with the development runtime when the tooling requires it,
then invoke the packed package's built entrypoint and runtime fixtures with the
floor binary. For subprocesses that use `env node`, put the floor binary's
directory first in the test process's `PATH` only, and confirm which binary the
child used. If the test runner itself needs newer Node.js, run a small fixture
harness or the built CLI directly at the floor; running only the newer runner is
not floor validation. Report when installation or execution at the exact runtime
could not be verified.

`scripts/run-at-node.mjs <version> --cwd <fixture> -- <command>` does all of
this: it downloads and verifies the release through `devEngines.runtime` in the
run directory, puts a logging `node` shim first in `PATH`, runs the command, and
reports how many `node` processes started and with which versions. A count that
is implausibly low for the command means children bypassed `PATH`; treat that as
unverified rather than as a pass.

Record stdout, stderr, exit codes, and relevant API results for identical
fixtures across runtimes and dependency baselines. Normalize only known
nondeterministic fields with the same documented transformation for every run.
Save SHA-256 digests of normalized output for quick comparison, keep the actual
output for reviewing differences, and add targeted assertions for behavior that
serialization omits.

`scripts/compare-outputs.mjs <dir-a> <dir-b>` compares two result directories
with the standard normalization: state names only as path segments (`--token-a`,
`--token-b`), pnpm store directory names, git blob ids, and content-hashed
filenames. Never replace a state name as a bare word: `baseline` also occurs in
CSS properties and rule names. Use `--sort-lines` only for output whose parallel
tools interleave differently on each run, such as `ksc lint`.

## Updated validation

After resolution and deduplication, run:

```bash
pnpm build
pnpm fix
pnpm build # if fix changed source files or build configuration
pnpm test
pnpm lint
```

Skip a script the repository does not define and say so. Compare every check
with the recorded baseline, and use these procedures where applicable; later
cleanup steps reuse them for affected checks:

- **Published consumers:** diff the production-engine inventories; inspect
  packed manifests and artifacts; test isolated installations and representative
  fixtures at the exact supported floors above, separately from
  development-runtime checks. Review fixer edits to `engines.node` and
  `devEngines.runtime`. Passing on newer Node.js does not establish consumer
  compatibility. Validate new contracts and record changed baselines for
  authorized breaks.
- **Advisories:** diff the audit reports as described above.
- **Warnings:** trace and report new warnings, deprecations, and peer issues
  with the configuration policy's procedure, applying only its permitted
  suppressions or explicitly authorized exceptions.
- **Build output:** when a baseline exists, rebuild with its command and
  environment and diff the trees with content-hashed filenames normalized
  (`name.[hash].js`). Explain every remaining difference through an upstream
  changelog, issue, or reviewed migration or configuration change, and
  investigate the rest. Record effective targets before and after: unless
  configured explicitly, tsdown derives its target from `engines.node`. Changed
  syntax can be expected, but syntax lowering does not polyfill runtime APIs.
- **Fixer output:** review the diff and compare a required rebuild with the
  pre-fix build. Formatting changes must produce identical output; handle
  behavioral or browser-compatibility changes under the configuration policy's
  lint-fix rules and recheck the behavior after correction.

On failure, make the smallest change the authorization table allows and rerun
from the failing step, using the baseline logs to separate new failures, subject
to the baseline qualifications above. `git stash` does not restore
`node_modules`. To isolate an update, reset half of the accepted specifiers, run
`pnpm update -r --no-save`, and repeat the failing check; defer the culprit
unless an authorized migration resolves it. For a runtime release that published
ranges already allow, follow the consumer-range decision; resetting a specifier
or the lockfile may not exclude it.

## Tool behavior notes

Known behaviors that look like failures, or hide them:

- `ksc fix` prints nothing when everything was fixed; only remaining problems
  produce output. A silent exit code of 0 is success.
- `ksc lint` and `ksc fix` use tool caches. Before trusting a pass on files a
  fix or migration touched, rerun ESLint with `--no-cache` and `ksc-prettier
lint --no-cache`.
- Output from `ksc lint` interleaves its parallel tools differently on each run;
  compare it with sorted lines.
- mdat expands rules from the `package.json` nearest to where it runs. Never run
  `mdat expand` on a package readme from a monorepo root; it fills the title,
  description, and other rules from the private root manifest. Regenerate
  through the repository's own script.
- Use `pnpm -r ls --depth -1 --json` to enumerate workspace packages instead of
  globbing `packages/*`, which also matches stray entries such as `.DS_Store`.
- Recent pnpm lockfiles contain several YAML documents, the first describing the
  package manager's own dependencies; a lockfile parser must read every
  `packages:` section.

## Tool references

Check these primary sources or the installed tool's help when behavior differs:

- [GitHub Actions
  variables](https://docs.github.com/en/actions/reference/workflows-and-actions/variables):
  `GITHUB_ACTIONS` and `CI` identify unattended execution.
- [pnpm update](https://pnpm.io/cli/update): `--no-save` and what an update
  writes. The full refresh here uses no package selectors; do not assume
  exclusion syntax is identical in every pnpm version.
- [pnpm dedupe](https://pnpm.io/cli/dedupe),
  [pnpm list](https://pnpm.io/cli/list), and [pnpm audit](https://pnpm.io/cli/audit).
- [pnpm settings](https://pnpm.io/settings), including
  [minimumReleaseAge](https://pnpm.io/settings/dependency-resolution#minimumreleaseage),
  [trustPolicy](https://pnpm.io/settings/dependency-resolution#trustpolicy),
  [allowBuilds](https://pnpm.io/settings/build#allowbuilds), and
  [peer rules](https://pnpm.io/settings/peer-dependencies#peerdependencyrulesallowedversions).
  Current pnpm reads only registry and auth settings from `.npmrc`.
- [devEngines.runtime](https://pnpm.io/package_json#devenginesruntime): exact
  runtime downloads for fixtures.
- [Taze](https://github.com/antfu-collective/taze): candidate filters, maturity,
  and the pnpm settings it infers.
- [Actions Up](https://github.com/azat-io/actions-up): SHA pinning, cool-down,
  and `--min-age-exclude`.
- [Node.js release schedule](https://github.com/nodejs/Release): LTS lines and
  the annual all-LTS cycle from Node 27.
- [tsdown target](https://tsdown.dev/options/target): engine-derived targets
  affect emitted syntax and do not polyfill APIs.
- [Node.js release archives](https://nodejs.org/dist/): fallback runtime
  downloads and checksum manifests.
