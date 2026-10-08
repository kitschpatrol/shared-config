---
name: ksc-update
description: >-
  Run full dependency and repository maintenance in kitschpatrol shared config
  pnpm repositories and monorepos. Use when asked to update, upgrade, refresh,
  or audit dependencies or GitHub Actions. Includes compatibility review,
  migrations, configuration and documentation cleanup, packed-install
  validation, and a release recommendation. Does not commit or release.
license: MIT
---

# Update dependencies

Every invocation is a full maintenance run, including audits and requests that
mention only GitHub Actions; there is no report-only or Actions-only mode. The
caller's only decision is whether consumer-breaking changes are pre-approved for
packages at 1.0.0 or later. Make the migrations that accepted updates require.

Supporting files sit beside this file. [configuration.md](references/configuration.md)
owns every per-file rule; read it during Setup and apply it through the final
cleanup. [verification.md](references/verification.md) owns baselines,
validation procedures, and the bundled scripts.

## Execution and authorization

Record the execution mode and its reason before Setup. Use unattended mode when
explicitly requested, when `GITHUB_ACTIONS=true` or `CI=true`, or when the host
cannot receive replies; a missing TTY alone does not establish it. Unattended
runs never ask, wait, or run a command that needs an interactive response, and
report needed decisions as follow-up items.

Judge compatibility by effect on public APIs, CLI behavior, outputs, defaults,
supported consumer environments, and peers, never by a dependency's version
label: minors and patches can break those contracts and majors can preserve
them. This applies to authored packages, production transitives, and actions
alike. A package is `0.x` by its own published version, or the shared release
version in a monorepo, never a private root's version.

| Change                                                                                                                                                                                                               | Rule                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Compatible update                                                                                                                                                                                                    | Apply after review and validation.             |
| Consumer break in a package at 1.0.0 or later                                                                                                                                                                        | Apply only within existing explicit approval.  |
| Consumer break in a `0.x` package, including Node.js support changes                                                                                                                                                 | Apply after review, migration, and validation. |
| Pre-authorized by the configuration policy: Homebrew pnpm alignment, LTS-only Node.js ranges, Node-types alignment, compatibility-preserving lint disables, scoped suppression of a verified-compatible peer warning | Apply and report.                              |
| Other restrictions and suppressions: a published runtime-range restriction to hold a release back, including in `0.x`; a build approval outside the trust list; any other warning suppression                        | Apply only within existing explicit approval.  |

Where approval is missing, present the reviewed proposal and ask in interactive
mode; defer in unattended mode. General permission to update dependencies never
approves an unspecified break. For each approval-dependent candidate record
concrete effects, migration work, validation results or gaps, and release
implications, trialing an isolated migration when useful. Continue independent
work while a decision is pending; track accepted, declined, pending, and
deferred decisions separately. Defer candidates with unknown impact or
unvalidated migrations, and leave acceptable updates unapplied when they cannot
be separated from an unauthorized change. Report missing credentials,
permissions, and validation resources instead of bypassing them.

Produce working-tree changes and a report suitable for later PR automation even
when nothing can be applied. Do not manufacture changes, create workflows or
pull requests, split work into PRs, bump repository versions, commit, push, tag,
publish, or release.

### Pacing

Unattended runs have a turn limit, and a run that stops early publishes nothing.
Finish Setup and steps 1 to 5 before steps 6 to 9 and the fresh-install
exposure checks, and reserve budget for the report. Delegate per-package reviews
when subagents are available. If budget runs short, skip the remaining optional
work, list it in the report as not done, and write the report.

## Version policy

- **Third-party maturity:** a run introduces only releases at least 24 hours
  old: Taze `--maturity-period 1` and Actions Up `--min-age 1` enforce it for
  candidates, and pnpm's default `minimumReleaseAge` of 1440 minutes covers
  resolution. Do not add or change `minimumReleaseAge` in `pnpm-workspace.yaml`,
  never disable an installation safeguard, and never downgrade a previously
  locked version to satisfy age.
- **Authored packages:** npm packages and GitHub Actions owned by `kitschpatrol`
  always target their latest stable release, including majors, however young.
  They still get security and compatibility review and required migrations, but
  age alone never causes an older target, a deferral, or a downgrade. The
  commands below and the configuration policy's exact-version rules make the
  exemption effective in Taze, pnpm, and Actions Up. If another policy blocks
  latest, report the blocker and the retained version.
- **Consumer ranges:** review the newest stable version allowed by each runtime
  dependency's declared range, not only the locked version; consumers resolve
  it regardless of this repository's lockfile and maturity settings. Holding one
  back needs an approved, genuinely restrictive published range such as `~1.8.0`
  instead of `^1.8.0`; an older lockfile or a local override is no substitute.
- **No weakening:** never relax tests, lint rules, type checking, or security to
  get a pass, and never accept changed snapshots or generated output unread.
  Trace and report every new warning, deprecation, and peer issue against the
  recorded baseline; the configuration policy defines the only permitted
  suppressions.

## Environment

Expect Claude Code in GitHub Actions with Node.js, pnpm and pnpx, curl, jq, git,
Bash, and network access to `registry.npmjs.org`, `raw.githubusercontent.com`,
`api.github.com`, `nodejs.org`, and upstream documentation hosts. Prefer
registry metadata and raw changelogs over GitHub API calls, and cache responses
for reuse between reviewers. Diagnose actual failures rather than assuming
sandbox restrictions, and never add sandbox workarounds.

Before saving any starting files, create a fresh run directory once per run:

```bash
set -euo pipefail
repo_name="$(basename "$(git rev-parse --show-toplevel)")"
run_dir="$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/ksc-update-${repo_name}.XXXXXX")"
export KSC_UPDATE_RUN_DIR="$run_dir"
```

The repository name identifies the run; the random suffix prevents collisions
between concurrent runs, including separate checkouts of the same repository.
Record the absolute path and reuse it for every command and reviewer in this
run. In later shells, restore `KSC_UPDATE_RUN_DIR` and `run_dir` to that recorded
path rather than rerunning initialization. Bundled scripts require
`KSC_UPDATE_RUN_DIR`; never use a shared fixed directory or overwrite another
run's saved files.

Keep every baseline, log, fetched metadata file, and decision record there; it survives
pnpm rebuilding `node_modules` and never enters the pull request. Preserve exit
codes when capturing logs, for example with `set -o pipefail` before
`cmd 2>&1 | tee log`.

### Bundled scripts

`scripts/` holds helpers for the mechanical parts of a run. Each documents its
usage in a header comment; the references say where each fits.

| Script                   | Purpose                                                       |
| ------------------------ | ------------------------------------------------------------- |
| `consumer-ranges.mjs`    | Newest version each published runtime range allows (step 3)   |
| `release-age.mjs`        | Exemption inventory and young-version detection (steps 0–6)   |
| `production-engines.mjs` | Declared engines across a production tree                     |
| `packed-fixture.mjs`     | Packed or published consumer fixture install                  |
| `run-at-node.mjs`        | Command at an exact Node.js release, with child-process proof |
| `compare-outputs.mjs`    | Normalized comparison of captured outputs and build trees     |

The scripts are conveniences, not requirements; the procedures they serve are.
When one fails for a reason that is not the repository's fault, produces output
that disagrees with what direct inspection shows, or does not fit this
repository's layout, make at most one quick attempt to understand why, then
abandon it: write a replacement for that step in the run directory, or do the
step by hand, and continue. Never let a broken helper stall the run, never edit
the bundled copy during a run (it is synced from the published package and
overwritten), and never weaken a check to make a script pass. Name each
abandoned or replaced script and the reason in the report's gaps so it can be
fixed upstream. Verify any script's result against one or two direct
observations before relying on it.

## Step 0: Setup

1. Read repository instructions, including run-specific instructions, and
   preserve uncommitted changes. Run-specific instructions also live in the
   `instructions:` input of the skill-running step in
   `.github/workflows/update-dependencies.yml`; read it even when running
   locally, where the workflow does not pass it, and follow it as if it had
   been. Leave files changed by others during the run alone and report them.
   Keep compatibility validation inside this repository and isolated
   package-install fixtures. Record the latest release tag and the commits
   since it (`git describe --tags --abbrev=0`, then `git log <tag>..HEAD`);
   they explain differences between the published release and the current
   build and feed the release recommendation.
2. Map maintained package roots, shared lockfiles, catalogs, overrides,
   `pnpm-workspace.yaml`, and Taze config, excluding fixtures, generated files,
   and dependency directories. Run the workflow once per shared-lockfile
   workspace and separately for each independent root. Check Taze config for
   mode overrides, maturity exemptions, and automatic writes or installs; Taze
   and `pnpm update` also read `minimumReleaseAge`, `minimumReleaseAgeExclude`,
   and `update.ignoreDeps` from `pnpm-workspace.yaml`. Record project and
   published package versions. Before any edit, copy the starting manifests,
   lockfile, build approvals, and exact `publicHoistPattern` into the run
   directory, and inventory release-age exclusions as the configuration policy
   describes; `scripts/release-age.mjs inventory` classifies each entry once
   the authored list from item 5 exists.
3. Sync the workspace root's `packageManager` before any install or parsed pnpm
   output: fetch the [Homebrew pnpm formula](https://raw.githubusercontent.com/Homebrew/homebrew-core/refs/heads/main/Formula/p/pnpm.rb),
   read the stable version from its source URL or explicit `version`, and set
   `pnpm@<homebrew-version>` by direct manifest edit, even across a major.
   Homebrew is the only source and need not be installed; never substitute the
   installed pnpm, npm's `latest` tag, or an age-filtered version, and report an
   unavailable or unreadable formula as an incomplete sync. Review pnpm release
   notes for lockfile and settings changes, confirm CI installs the selected
   version, and record the formula URL and version. Make all later specifier
   and engine changes by direct edit too, preserving other fields.
4. Apply the configuration policy's build-trust decisions and exclusion
   normalization, then install the starting declarations:

   ```bash
   pnpm install --frozen-lockfile
   ```

   Use `--no-frozen-lockfile` only for `ERR_PNPM_OUTDATED_LOCKFILE` and diagnose
   every other failure individually; a pnpm major change can require a lockfile
   format migration, which is expected drift to record. Keep the saved originals
   even if installation fails, and label checks after a repair as repaired.
   Record the [baseline](references/verification.md#baselines): install
   attempts, build, test, lint, build artifacts, Node.js requirements, the
   production-engine inventory, the advisory report, and packed-install fixture
   results.

5. Discover authored packages, those whose registry metadata lists
   `kitschpatrol` in `maintainers`. The ownership endpoint is a shortcut for the
   full list:

   ```bash
   set -euo pipefail
   run_dir="${KSC_UPDATE_RUN_DIR:?Restore the recorded run directory first}"
   curl -fsS https://registry.npmjs.org/-/user/kitschpatrol/package \
     | jq -er 'keys | join(",") | select(length > 0)' \
       > "$run_dir/authored-packages.txt"
   ```

   If it fails or returns nothing, check each direct dependency's registry
   metadata instead and report the fallback; do not stop the run. Intersect
   ownership with the direct dependency names across maintained manifests,
   including dev, optional, peer, catalog, and npm-alias dependencies, and save
   that intersection separately; it may be empty. `<authored-packages>` below
   means those exact names, comma-separated, with no wildcards; omit
   `--maturity-period-exclude` when the list is empty. Keep the full ownership
   list for packages met later.

## Step 1: Workflow actions

```bash
pnpx actions-up --yes --min-age 1 --min-age-exclude '^kitschpatrol/' --style sha \
  --dir .github
```

Add a `--dir` for every other directory of workflows the repository maintains or
ships, such as templates that an init command copies into consumer projects
(for example `packages/*/init/.github`); by default only `.github` is scanned.
Find them with a search for `workflows` directories outside dependency and
fixture folders.

Treat `Skipped N actions` as a failure even when Actions Up also says "All
actions are up to date" or exits successfully. Any `Skipped`, `Failed`, or
`Rate Limit` output means the workflow-action check failed; fix the cause and
rerun, and report unresolved failures instead of claiming success.

Review major bumps and runner, input, output, and permission changes. Pin every
external action and reusable workflow, including `kitschpatrol/*`, to a verified
full commit SHA with its version comment, covering branch and tag refs,
unchanged versions, and the retained version of a deferred update. Pin container
actions by digest; local `./` actions use the checkout. Remove zizmor
`unpinned-uses` exceptions the pins make contradictory. Keep only reviewed
changes and preserve user edits; local tests do not validate remote workflows.

## Step 2: Discover candidates

```bash
pnpx taze major -r --force --include-locked \
  --no-github-actions --no-node-version \
  --exclude '@types/node,pnpm' \
  --maturity-period 1 \
  --maturity-period-exclude '<authored-packages>'
```

Major mode lists every update size; confirm authored candidates are the latest
stable across majors. Do not opt into new prerelease channels.
`--include-locked` surfaces exact pins without authorizing their removal;
`@types/node` and `pnpm` are managed by the configuration policy and Setup. This
discovery does not replace the consumer-range review in step 3.

## Step 3: Evaluate candidates

### Scope and consumer ranges

For every runtime dependency of a published package, read registry metadata for
the newest stable version its declared range allows, accounting for catalogs and
aliases, and record the range, locked version, newest allowed version, and
proposed range or version. Review the allowed release even when it is already in
range or too young to install here, and report untested consumer exposure. Keep
the published release's fresh-install behavior, the updated build, and the old
locked baseline distinct; existing in-range exposure is not a break introduced
by this release. `scripts/consumer-ranges.mjs` builds this table from the
workspace root and flags rows where consumers resolve something newer than the
lockfile or something too young to install here; resolve catalog specifiers it
marks for manual review by hand.

Review direct candidates and production-tree changes fully; shipped or bundled
tooling belongs to consumer review even when used only for development here.
For development-only transitives, check advisories, deprecations, and engines,
and read release notes when those findings, validation failures, or output
differences warrant it. A full review reads release notes, migration guides, and
advisories and assesses:

- Security fixes or regressions, publishing or ownership anomalies, and new
  install scripts or permissions.
- APIs, types, defaults, configuration, module format, peers, and engines
  against actual repository usage and the versions this update produces,
  reviewing coupled packages together since one update may need a newer
  sibling.
- Adoptable fixes, performance, capabilities exposed to consumers, and optional
  feature opportunities for the report. Do not implement extra features.

When delegating, split independent reviews among authored packages, remaining
runtime packages, and remaining development packages. Give each reviewer a
disjoint list, actual usage and source paths, consumer requirements, and the
version policy; reviewers return decisions and sources without editing, the
primary agent resolves coupling, and all share fetched metadata and the GitHub
API budget.

Record current and proposed versions, decision, evidence, and approval scope per
the authorization table. Do not defer a migration merely because it implies a
major release recommendation. Review exact pins under
[Version declarations](references/configuration.md#version-declarations).

### Node.js compatibility

For every candidate, including minors and patches, check consumer and
development requirements separately:

- **Consumers:** compare full supported Node.js ranges across direct,
  transitive, optional, peer, and workspace dependencies, bundled code, emitted
  syntax, and runtime APIs. A higher effective minimum or a lost supported line
  is a break even when `engines.node` is unchanged. Preserve the contract under
  the authorization table; for accepted changes publish truthful engines in the
  [LTS-only shape](references/configuration.md#nodejs-support) and validate the
  resulting range.
- **Development:** higher requirements for development-only tools, builds, or
  CI are fine while artifacts stay consumer-compatible. When they exceed
  consumer requirements, add or update `devEngines.runtime` with `name: "node"`
  and the actual range, at the root for shared tooling and in package manifests
  for package-specific tools, preserving other entries. Align development pins
  and CI while keeping tests at the applicable consumer minimums. Never raise
  published `engines.node` for development tooling.

### TypeScript migrations

Follow the [tsconfig.json policy](references/configuration.md#tsconfigjson)
with the accepted config release. When an authored update needs a newer compiler
major, offer that migration with its concrete effects instead of deferring the
update, apply it within the authorization table, then run type checks, the
build, and packed-install validation.

## Step 4: Apply

Apply accepted candidates by exact package name, replacing the example list;
skip this when nothing was accepted:

```bash
pnpx taze major -rw --force --include-locked \
  --no-github-actions --no-node-version \
  --include 'pkg-a,pkg-b' \
  --exclude '@types/node,pnpm' \
  --maturity-period 1 \
  --maturity-period-exclude '<authored-packages>'
```

Set a reviewed older target by direct edit when latest was not accepted.
Acceptance in one workspace package does not apply to the others. Afterwards
check every manifest and catalog: only reviewed versions, range styles and
`workspace:` references intact, no deferred or excluded updates. Directly edit
missed catalogs and overrides, the reviewed compiler and Node-types versions,
and development Node.js notices. Apply the configuration policy's manifest rules
and keep Setup's `packageManager`.

## Step 5: Resolve and validate

Before anything can run install scripts, apply build-trust decisions, review
overrides and peer rules, and add the exact release-age exemptions that accepted
young authored targets need, all under the
[pnpm-workspace.yaml policy](references/configuration.md#pnpm-workspaceyaml).
Then resolve:

```bash
pnpm update -r --no-save
pnpm dedupe --check
```

`pnpm update -r --no-save` refreshes every direct and transitive dependency
within the declared ranges without rewriting manifests or catalogs; named
updates and `!pkg` selectors do not give that transitive refresh. Run
`pnpm dedupe` only when the check reports available deduplication, and diagnose
other failures; deduplication moves compatible references onto newer versions
already in the tree and cannot hold back a deferred release. Review newly
resolved packages under step 3, apply the consumer-range decision to deferred
in-range runtime releases, and confirm after each resolution that authored
packages reached their accepted targets, investigating mismatches with the
configuration policy's maturity procedure rather than assuming an age holdback.
After each resolution, run `scripts/release-age.mjs new-versions` against the
saved pre-resolution lockfile to list young versions it introduced, and diff
`minimumReleaseAgeExclude` against the entries you added: pnpm appends entries
itself when it falls back to young versions, and each one needs the policy's
review.

Run the [validation procedure](references/verification.md#updated-validation):
build, fix, rebuild when needed, test, lint, baseline and output comparison,
warning review, advisory comparison, packed consumer installs, and exact-floor
checks. Apply the configuration policy's compatibility fixes and warning rules.
Keep only changes the authorization table permits, revise decisions when
validation reveals a break, and add focused tests only for affected behavior
that is not already covered.

## Step 6: Exclusion cleanup

If `minimumReleaseAgeExclude` was ever non-empty during the run, follow the
[release-age cleanup](references/configuration.md#release-age-exemptions), which
is version-preserving and names its own validation.

## Step 7: Side effects

Evaluate each published package's shipped code against its `sideEffects`
declaration under the [side-effects policy](references/configuration.md#side-effects),
recording evidence and outcome even when nothing changes.

## Step 8: Documentation

Review `readme.md` for stale installation instructions, requirements, commands,
examples, configuration guidance, and feature descriptions; for generated or
copied readmes, edit the maintained source and regenerate through the existing
workflow, never by running mdat from a different package's directory. Convert
sections that duplicate metadata, CLI help, source files, or other documentation
to mdat generation where that reduces duplication or drift without hurting
readability, preferring a bundled rule, then a suitable plugin, then a custom
rule in `mdat.config.ts`; keep explanatory prose that automation adds nothing
to. New plugin dependencies get the same review as any other candidate and go
through steps 5 and 6. Run generation and documentation checks, inspect the
rendered result, confirm a second generation changes nothing, and record
corrections and conversions.

## Step 9: Final configuration cleanup

Recheck the complete configuration policy against the final tree and perform
[override minimization](references/configuration.md#final-override-minimization).
Run affected fixers and checks after the last edit, and account for every
override before recommending a release.

## Release recommendation

Recommend from the final consumer-visible changes, following repository
conventions, with a rationale per published package or the highest level for a
shared release:

- **Patch:** compatible bug and security fixes, performance, and dependency or
  tooling maintenance without new consumer capability, including
  development-only Node.js increases with their notice and corrected or newly
  added `sideEffects` declarations.
- **Minor:** backward-compatible functionality actually exposed to consumers;
  explain the gain. For `0.x`, also accepted consumer breaks unless explicit
  pre-1.0 repository conventions differ.
- **Major:** authorized consumer breaks in packages at 1.0.0 or later, including
  a raised Node.js floor or a declared line removed by the LTS-only range.

Dependency version labels and development-only requirements never decide the
level. Separate pre-existing exposure through published ranges from new breaks.
Say that no release is needed when nothing releasable changed, and leave
repository versions unchanged.

The next release also ships every unreleased commit recorded in Setup. Give the
level this run's changes need and, when the unreleased commits raise it, the
level for the next release overall, citing those commits.

## Report

Review the full diff for unrelated changes, excluded-package edits, and stray
exemptions. Start the report with a summary of at most ten lines: what was
applied, the release recommendation per package, and the decisions needed. Raw
logs stay in the run directory. Then cover, from the decisions and evidence
recorded above and in both references:

- **Updates and decisions:** execution mode and reason, applied versions with
  sources, approvals and applied breaks including `0.x`, declined and deferred
  candidates, migrations, and optional feature opportunities. Under a
  `Breaking changes available` heading list each deferred break's versions,
  consumer impact, migration, validation or gaps, release level, and the
  decision needed.
- **Consumer impact and release:** runtime ranges and fresh-install exposure,
  approved restrictions, consumer Node.js before and after, development
  requirements and notices, TypeScript migrations, and the release
  recommendation with rationale.
- **Maintenance:** the Homebrew pnpm selection; every configuration decision
  with its justification, including build trust, overrides and peers, preserved
  hoisting, keywords, Node.js ranges and types, exact pins, CSpell, and side
  effects; remaining age exemptions with reasons and removal dates;
  documentation changes and mdat conversions.
- **Evidence and gaps:** the original versus Setup baseline distinction and any
  lockfile drift, checks with their exact runtimes, installation and fixture
  results, explained output differences, advisories, warnings and suppressions,
  missing historical baselines, unresolved failures, blocked work, skipped
  optional steps, and environment-driven deviations.

Passing checks do not prove the absence of breaks. Leave all changes
uncommitted.
