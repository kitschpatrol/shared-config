---
name: ksc-update
description: >-
  Update dependencies in kitschpatrol shared config pnpm repositories and
  monorepos with compatible changes, explicitly approved breaking changes, or
  breaking changes for zero-versioned projects. Use when asked to update,
  upgrade, refresh, or audit repository dependencies or GitHub Actions. Applies
  a 24-hour release maturity policy with exceptions for kitschpatrol's packages,
  reviews fresh-install consumer compatibility, minimizes configuration
  overrides, and recommends a release level.
  Does not commit or release.
compatibility: Requires Node.js, pnpm/pnpx, curl, jq, git, Bash, and access to npm, GitHub, and upstream release documentation.
---

# Update dependencies

Accept dependency and GitHub Actions updates under the version policy below.
For projects at 1.0.0 or later, preserve existing contracts: public APIs, CLI
behavior, outputs, defaults, supported consumer environments, and peer
compatibility, unless the user explicitly approves a reviewed breaking change.
Make the migrations accepted updates require. Do not commit, push, tag, publish,
or release.

## Execution mode

Determine the mode before Setup and record it with the reason. Use unattended
mode when explicitly requested, when `GITHUB_ACTIONS=true` or `CI=true`, or when
the host cannot receive user replies. Otherwise use interactive mode; a missing
TTY alone does not establish that an agent session is unattended.

In unattended mode, never ask questions, wait for answers, or invoke a command
that requires an interactive response. Existing explicit approvals still apply;
silence and CI execution do not grant new approval. This mode overrides every
instruction below to ask, confirm, or await a decision:

- **Projects at 1.0.0 or later:** apply compatible changes and any reviewed
  breaks already explicitly authorized. Defer other breaking candidates and
  report them for a later decision. Judge consumer impact, not dependency
  version labels; a compatible dependency major remains eligible.
- **Zero-versioned projects:** retain the existing `0.x` allowance in unattended
  runs. Apply reviewed breaking changes, complete their migrations, validate
  the new contracts, and normally recommend a minor release. Do not defer them
  merely because no person is present to approve the break. Other requirements,
  including explicit approval for runtime-range restrictions and Node-types
  changes, still apply.
- **Other decisions and missing prerequisites:** without prior authorization,
  leave approval-dependent changes unapplied, including range restrictions.
  Scoped peer-warning suppressions with verified compatibility (step 5) are not
  approval-dependent: apply them and report them. Report missing credentials,
  permissions, or validation resources instead of
  requesting them. Continue independent work; if a required prerequisite
  prevents progress, report the affected work as blocked or incomplete without
  waiting or bypassing it.

Review and validation remain required in both modes. Defer candidates whose
impact cannot be established or whose migration cannot be validated. If safe
updates cannot be isolated without an unapproved change, leave those updates
unapplied and explain the blocker. Report incompatible releases already allowed
by published runtime ranges as existing consumer exposure; an older lockfile
does not resolve that exposure.

Produce changes and a report suitable for later PR automation. This skill does
not create workflows or pull requests, or split work into multiple PRs. If
nothing can be applied, produce the report without manufacturing a change.

## Policy

- **Compatible by default at 1.0.0 or later:** assess the effect on this repository
  and its consumers, not just the dependency's version label. Minor and patch
  updates can break compatibility; a dependency major can still be compatible.
  Present useful breaking candidates with their impact, migration, validation,
  and release implications before asking for approval; apply only within the
  approved scope. Existing explicit approval remains valid. Defer unapproved
  breaks and updates whose impact cannot be established. This includes authored
  packages, production transitives, and workflow actions.
- **Zero-versioned projects:** if the project's current release version has
  major version zero (`0.x.y`), any breaking change within this update workflow
  is permitted in both interactive and unattended modes, including changes to
  public contracts and consumer Node.js requirements. This exception overrides
  compatibility-preservation requirements below. Use the project's version, not
  the dependency's version; in monorepos,
  assess each affected published package or shared release version, not just a
  private workspace root. Review and report breaking changes, make required
  migrations, and validate the resulting behavior. All other policies still
  apply.
- **Release maturity:** third-party releases must be at least 24 hours old
  (`--maturity-period 1` for Taze, `--min-age 1` for Actions Up, pnpm
  `minimumReleaseAge` of 1440 minutes). The period governs which releases a run
  may introduce; it never requires downgrading a version that was locked before
  the run. Never disable installation safeguards to make an update succeed.
- **Authored packages:** packages owned by `kitschpatrol` (discovered at runtime
  in Setup) are exempt from maturity and target their latest stable release,
  including majors. pnpm enforces `minimumReleaseAge` silently by selecting the
  newest mature version, so the exemption is only real while a
  `minimumReleaseAgeExclude` entry for the young release exists: add it when
  needed (step 5) and keep it through cleanup (step 6). The maturity period
  must never hold an authored package back or downgrade it. The exemption does
  not bypass security or compatibility review.
- **Consumer ranges:** review the newest published version allowed by each
  runtime dependency's declared range, as well as the lockfile. A fresh consumer
  install can resolve that version even when CI locks an older one. Holding
  back an in-range release requires a genuinely restrictive published range
  (for example, `~1.8.0` instead of `^1.8.0` to exclude `1.9.0`), not just an
  older lockfile entry. Obtain explicit approval before narrowing a runtime
  range to hold a release back, even for a zero-versioned project; explain the
  consumer effect. Do not use local overrides as a substitute for that decision.
- **TypeScript:** select a compiler within the peer range of the accepted
  `@kitschpatrol/typescript-config` version, intersected with other required
  peers. Do not hard-code a compiler version. Offer the migration when an
  authored major requires a newer compiler; see step 3. If that config is not
  used, follow the project's compiler policy and peer requirements.
- **Node types:** preserve `@types/node` declarations, including catalogs and
  overrides, unless a reviewed migration has explicit authorization to change
  them. New compiler libraries do not establish runtime API availability.
- **Package manager:** only Setup manages `packageManager`. Exclude `pnpm`
  from Taze discovery and writes.
- **No weakening:** do not relax tests, lint rules, type checking, or security
  settings to get a pass; do not blindly accept changed snapshots or generated
  output. Compatibility-preserving lint disables described in step 5 are an
  exception.
- **No new noise:** every check is compared against the Setup baseline. A new
  warning, deprecation, or peer issue is a finding to trace and report, not
  background noise. Report compatibility-preserving lint disables and scoped
  peer-warning entries from step 5; ask before silencing other findings.

## Environment

Shell variables do not persist between commands. Save anything later steps need
under `node_modules/.cache/ksc-update/` and pass values literally.

Plan network access for `registry.npmjs.org`, `raw.githubusercontent.com`,
`api.github.com`, and `nodejs.org`; identify any additional upstream hosts as
needed. Prefer registry metadata and raw changelog files over GitHub API calls
for package reviews. Cache responses and share them between reviewers.

Under Claude Code's sandbox:

- **pnpm store:** pnpm 12 cannot take its store lock inside the sandbox
  (`ERR_PNPM_STORE_DIR_OPEN_OPERATION_LOCK`), even with writable store, cache,
  and temp directories. `pnpm install`, `pnpm update`, `pnpm dedupe`,
  `pnpx taze`, and `pnpx actions-up` must be listed in the user's
  `sandbox.excludedCommands` and `permissions.allow`. If the Setup install fails
  this way, stop the affected work and ask the user to add them in interactive
  mode; in unattended mode, report the missing prerequisite. Do not route around
  it. Run these commands bare (no pipes, redirects, or command substitution) so the
  exclusions match. Run each as its own invocation, without `&&` or `||`.
  Save captured tool output to log files in a separate operation.
- **Proxy:** Node-based tools ignore the proxy variables. If one fails with
  `ENOTFOUND`, rerun it with `NODE_USE_ENV_PROXY=1`.
- **Sockets:** the `tsx` CLI cannot open its IPC socket. Run the same script
  with `node --import tsx <script>` and report the substitution.
- **GitHub API:** without `GITHUB_TOKEN`, GitHub allows 60 requests per hour.
  One Actions Up run plus a few release-note lookups can exhaust it. The sandbox
  cannot read `gh` credentials, so budget lookups or ask for a token in
  interactive mode. In unattended mode, report any review blocked by missing
  credentials or exhausted API limits.
- **JSON output:** pnpm can emit `[WARN]` lines on stdout. Sync `packageManager`
  before parsing pnpm JSON; if warnings remain, save them separately, remove
  only lines beginning with `[WARN]`, and parse the rest strictly. Do not hide
  malformed output or other diagnostics.
- **Supply-chain settings:** an unreadable global config or `~/.npmrc` can make
  a sandboxed config query return `undefined`; this does not mean the policy is
  disabled. Read accessible workspace settings and record pnpm's successful
  `Lockfile passes supply-chain policies` message from the actual install.
  That message confirms the active checks passed, not the numeric release-age
  threshold. Verify the required 1440 minutes from accessible configuration or
  release timestamps when the effective setting cannot be read. Do not disable
  safeguards or access private config through a workaround.

## Setup

1. Read repository instructions. Note uncommitted changes in the working tree
   and preserve them. If files change during the run that you did not touch,
   leave them alone and report them.
   Keep compatibility validation within this repository and isolated
   package-install fixtures.
2. Map the workspace: root, every maintained package root, catalogs, overrides,
   `pnpm-workspace.yaml`, Taze config. Exclude fixtures, generated files, and
   dependency directories. Run each step once per shared-lockfile workspace and
   separately in any independent package root. Check Taze config for anything
   that overrides mode, adds maturity exemptions, or auto-writes/installs.
   Record current project and published package versions to determine where the
   zero-versioned exception applies. Record every existing
   `minimumReleaseAgeExclude` entry with the publish time of that exact version
   (`time` in the registry metadata), so step 6 can tell which entries still
   matter.
   Create the baseline folder and preserve the starting manifests and lockfile
   before the package-manager sync or any other edit.
3. Sync `packageManager` before installs and parsed pnpm output. Choose the
   newest of three versions, so the pin only ever moves up:

   - the current `packageManager` pin;
   - the pnpm installed on this host, read from a new empty directory under
     `${TMPDIR:-/tmp}` so the project's stale pin cannot select or download
     another version:

     ```bash
     pnpm --version
     ```

   - the newest stable pnpm release at least 24 hours old, from `versions` and
     `time` in `https://registry.npmjs.org/pnpm` (`dist-tags.latest` when it
     qualifies).

   A CI runner usually installs the pinned version itself, so the installed
   pnpm alone never moves the pin; the registry lookup is what keeps it
   current. Then edit only the workspace root's `packageManager` directly to
   `pnpm@<chosen-version>`, preserving all other manifest fields. Use the
   editor or a structured JSON edit, not `pnpm pkg set`; use direct edits for
   later specifiers and engines too. pnpm downloads and runs the pinned
   version on demand after the pin changes. If this crosses a pnpm major,
   report it, review the pnpm release notes for lockfile and settings changes,
   and verify the CI installer supports the selected version.

4. Install the starting dependency declarations and record a baseline before
   dependency updates. Keep the original files saved in Setup 2 even if
   installation fails.

   ```bash
   pnpm install --frozen-lockfile
   ```

   On `ERR_PNPM_OUTDATED_LOCKFILE` only, run this as a separate bare command:

   ```bash
   pnpm install --no-frozen-lockfile
   ```

   Save the lockfile diff against the starting copy in the baseline folder and
   report the drift. Treat checks after repair as the repaired baseline, not as
   proof that the original locked tree passed. Other installation failures need
   their own diagnosis; do not generalize this fallback or relax safeguards.

   Save the output of each install attempt and of `pnpm build`, `pnpm test`, and
   `pnpm lint` to `node_modules/.cache/ksc-update/baseline/`. If the repository
   produces build output (`dist/` or similar), copy it there as well. Use the
   repository's switches to disable nondeterministic build steps (encryption,
   timestamps) and note the exact command and environment; later comparison
   builds must match them. Baseline failures are pre-existing; record them.

   Record each published package's declared `engines.node`, effective consumer
   Node.js minimum and supported range, and separate development requirement.
   Include published dependency trees and built artifacts, not just the root
   manifest or current CI runtime. If no Node.js support policy is declared,
   establish the existing requirement from the published code and dependencies;
   do not assume the developer's Node.js version is the consumer minimum.
   Save production-tree engine inventories and baseline installation and fixture results using
   [the verification recipes](references/verification.md). Distinguish the
   starting locked tree, the newest versions a fresh consumer install can
   resolve, and the published release with its old dependencies when available.

5. Discover authored packages:

   ```bash
   set -euo pipefail
   mkdir -p node_modules/.cache/ksc-update
   curl -fsS https://registry.npmjs.org/-/user/kitschpatrol/package \
     | jq -er 'keys | join(",") | select(length > 0)' \
       > node_modules/.cache/ksc-update/authored-packages.txt
   ```

   If registry discovery fails or returns empty, stop and report. Intersect the
   result with direct dependency names across the maintained manifests in this
   workspace, including dev, optional, and peer dependencies and dependencies
   using catalogs or npm aliases. Save the intersection separately; an empty
   intersection is valid. `<authored-packages>` below means only those exact
   matching names, comma-separated and passed literally, with no wildcards.
   Omit `--maturity-period-exclude` if the intersection is empty. Keep the full
   ownership list only for evaluating other packages encountered later.

## 1. Workflow actions

```bash
pnpx actions-up --yes --min-age 1 --style sha
```

Read the whole output. Actions Up can print "All actions are up to date!" after
checks failed; any `Skipped`, `Failed`, or `Rate Limit` line means the run is
incomplete. Fix the cause and rerun.

Review the diff: major action bumps, runner, input, output, and permission
changes. Every external GitHub Action and reusable workflow must be pinned to
its full commit SHA, including `kitschpatrol/*`; retain version comments for
readability. Do not exclude first-party actions from pinning or allow their
floating refs in zizmor's `unpinned-uses` policy. Resolve skipped branch/tag
refs and unchanged versions to verified commits too; if an update is deferred,
pin the retained version. Check existing zizmor configuration for exceptions
that contradict this policy. Pin container actions by digest; local `./` actions
use the checked-out tree. Keep only reviewed changes without disturbing user
edits. Local tests say nothing about remote workflows.

## 2. Discover all candidates (read-only)

```bash
pnpx taze major -r --force --include-locked \
  --no-github-actions --no-node-version \
  --exclude '@types/node,pnpm' \
  --maturity-period 1 \
  --maturity-period-exclude '<authored-packages>'
```

Major mode lists every available update, minor and major. Confirm authored
packages are offered their latest stable release, not the latest within their
current major. Do not opt into new prerelease channels. Taze's newest candidate
does not replace the separate newest-in-range runtime review in step 3.

## 3. Evaluate candidates

### Runtime ranges and review scope

For each runtime dependency of a published package, inspect registry metadata
for the newest stable version satisfying its current declared range, accounting
for catalogs and aliases. Record declared range, locked version, newest allowed
version, and proposed range/version. Review that newest allowed release even
if it is already in range or too young for this run to install; consumer
package managers may not enforce this repository's maturity policy. Keep the
installation safeguards and report any untested consumer exposure.

Review direct candidates and production-tree changes fully. For development-only
transitives, check advisories, deprecations, and engines; investigate release
notes only when those checks, validation failures, or output differences give
cause. A package bundled or shipped with a CLI/config package belongs to the
consumer review even if this repository also uses it as development tooling.

An in-range behavior change may already reach the published release's consumers.
Do not describe an older lockfile as protecting them or infer a new breaking
release solely from the lockfile movement. Test the published release and
updated build against actual consumer resolution, and separately preserve the
old locked baseline. To hold back an incompatible allowed release, present a
specific narrower range and obtain the policy's required approval.

### Breaking candidates

Track breaking-candidate decisions throughout the run; report applied breaks
and deferred opportunities separately.
For each candidate, identify affected APIs, behavior, Node.js support,
migration work, validation results or gaps, and release implications.
Prepare a concrete proposal and, where useful, validate a trial migration in an
isolated copy before seeking a decision. For stable projects in interactive
mode, ask explicitly whether to accept each reviewed break unless that exact
scope was already authorized; continue independent updates while awaiting the
answer. In unattended mode, defer unapproved stable-project breaks and include
them under `Breaking changes available` in the report without asking. General
permission to update dependencies is not approval for an unspecified break.
For `0.x` projects, both modes authorize reviewed breaking migrations without
another question, but runtime-range narrowing still needs explicit approval.
Record accepted, declined, pending, and deferred decisions separately.

### Node.js compatibility

For every candidate, minor and patch included, distinguish consumer requirements
from development requirements:

- **Consumers:** for projects at 1.0.0 or later, keep the user-facing Node.js
  minimum and supported range unchanged unless explicitly approved under
  `Breaking candidates`. A higher effective consumer minimum or loss of any
  supported Node.js version is a break even if `engines.node` is left unchanged.
  Check direct, transitive, optional, peer, and workspace dependencies used by
  published packages, plus bundled code, emitted syntax, and runtime APIs.
  A tool used only for development here is still a consumer dependency if it
  ships in a published CLI or configuration package. Compare
  full engine ranges, not just the lowest version in each range.
  For authorized breaks or zero-versioned projects, update published
  `engines.node` to reflect the actual supported range and validate against it.
- **Development:** a higher Node.js requirement for development-only tools,
  builds, or CI is allowed when published artifacts remain compatible. If it
  exceeds the consumer requirement, add or update the Node.js entry in the
  relevant `package.json`'s `devEngines.runtime` with `name: "node"` and a
  `version` range covering the actual development requirement. Use the workspace
  root for shared tooling and package manifests for package-specific tooling;
  preserve other runtime entries and settings. This is the development Node.js
  dependency notice; do not raise published `engines.node` to satisfy dev tools.
  Align development version pins and build CI as needed while retaining consumer
  compatibility checks at the applicable supported minimums (the original ones
  unless an approved break or the zero-versioned exception changes them).

### TypeScript migrations

Read the accepted `@kitschpatrol/typescript-config` release's TypeScript peer
range and base configuration. If it requires a new compiler major, offer that
migration with its concrete effects rather than automatically deferring the
authored update. Apply it within existing authorization; ask only for additional
breaking or Node-types changes that the policy actually requires approval for.

- Add `"node"` to `compilerOptions.types` where Node globals are needed,
  preserving other required type entries and the separation from browser code.
- Fix errors exposed by newly enabled strict options; do not disable those
  options just to pass.
- Check the new base `lib`, emitted syntax, declarations, and APIs used by
  shipped code against the consumer Node.js floor and browser targets. A newer
  `lib` can make unavailable APIs type-check; it does not polyfill them.

Run type checks, build, and consumer validation after the migration, retaining
the distinction between development and consumer Node.js requirements.

### Compatibility review

For direct candidates and production-tree changes, read relevant upstream
release notes, migration guides, and advisories, and assess:

- **Security:** vulnerabilities fixed or introduced, ownership or publishing
  anomalies, new install scripts or permissions.
- **Breaking:** APIs, types, defaults, configuration, module format, peer
  ranges, runtime requirements, measured against this repository's actual use.
- **Coupling:** peer and engine requirements against the versions this update
  will produce, not the current ones. A major can require a newer minor of a
  sibling package (`@astrojs/mdx` 8 requires `astro` 7.2.10 or later).
- **Worth it:** fixes and performance adoptable under the version policy.
  Note features exposed by the update and optional feature opportunities for the
  report; do not implement new features as extra work.

When delegation is available, run independent release-note reviews in parallel,
split into authored packages, remaining runtime packages, and remaining direct
development packages. Give each reviewer its disjoint package list, a short
survey of actual usage and relevant source paths, consumer requirements, and
the version policy. Reviewers return decisions and sources without editing
dependencies; the primary agent resolves coupling and combines the results.
Share cached metadata and the GitHub API budget. Review sequentially when
delegation is unavailable.

Record current → proposed version, decision, and sources. Accept only when
compatibility is preserved, an explicit approval covers the break, or the
zero-versioned exception permits it; defer the rest with a reason. Do not
defer a migration merely because it needs a major release recommendation.

## 4. Apply

Apply only accepted candidates, including minors and patches, by exact package
name. Major mode can apply all accepted update sizes:

```bash
pnpx taze major -rw --force --include-locked \
  --no-github-actions --no-node-version \
  --include 'pkg-a,pkg-b' \
  --exclude '@types/node,pnpm' \
  --maturity-period 1 \
  --maturity-period-exclude '<authored-packages>'
```

Replace the example names with the accepted set; skip the command if it is
empty. If only an older compatible target was accepted, set that reviewed
version manually instead of letting Taze choose the latest. Then check the
diff: every manifest and catalog covered, only reviewed versions applied, no
excluded or deferred update slipped in, range style and `workspace:` references
intact. A package accepted in one workspace package is not automatically
accepted in every other one. Hand-edit anything Taze missed (catalogs,
overrides), and add any required development Node.js notice. Use direct edits
for reviewed compiler versions inside the required peer range and for
authorized Node-types changes; do not let Taze choose an incompatible compiler.
Verify `packageManager` remains at Setup's selected version.

## 5. Resolve and validate

Run each command as a separate invocation:

```bash
pnpm update -r
```

```bash
pnpm dedupe --check
```

Inspect the result. If it reports available deduplication, run the following
separately; other failures need diagnosis, not an unconditional retry:

```bash
pnpm dedupe
```

Then run the checks, each separately:

```bash
pnpm build
pnpm fix
pnpm build # only if fix changed source files
pnpm test
pnpm lint
```

Always use bare `pnpm update -r` for the full refresh, without package selectors.
Named-package updates do not provide the same transitive refresh; do not use
`!pkg` selectors as a workaround for deferred candidates. It resolves within
the written ranges and rechecks release age without discarding `node_modules`.
In pnpm 12 it can also raise range floors in `package.json` and catalogs
(for example, `^1.8.0` to `^1.9.0`), so review the manifest and catalog diffs
after every update, not just the lockfile. Preserve excluded declarations and
undo unreviewed range changes by direct edits, then synchronize the lockfile.

Deduplication consolidates compatible references onto newer versions already
in the tree; it is not a way to hold back or downgrade a dependency. Review
production changes fully and development-only transitives under step 3's
narrower checks. If a deferred version is still allowed by a published runtime
range, use the explicit range/consumer decision path rather than fighting the
resolver with an older lockfile or an unapproved override.
After every `pnpm update -r`, confirm each accepted authored package resolved
to its accepted version. pnpm does not report a maturity holdback, so a lower
resolved version means the release is blocked by `minimumReleaseAge`: add only
that package/version to `minimumReleaseAgeExclude`, never its dependencies,
and update again. If the release still cannot resolve because its own
third-party dependencies are too young, defer that authored update, keep the
previously locked version, and report the date it becomes installable.

Compare every result with the baseline:

- **Consumer compatibility:** recheck the resolved published dependency trees
  and build artifacts against the Node.js baseline, including transitive
  changes from resolution or deduplication. Validate consumer installation and
  representative runtime behavior at the applicable supported minimums separately
  from checks needing the newer development runtime. Review `pnpm fix` changes
  to `engines.node` and `devEngines.runtime`; a passing fixer or build on newer
  Node.js does not establish consumer compatibility. Diff the production-engine
  inventories, test an isolated install of the packed build, and run fixtures at the
  exact supported Node.js floor using [the verification recipes](references/verification.md).
  For stable projects, do not retain a newly introduced break outside explicit
  approval; present the candidate or defer it. Do not mask it with an unapproved
  `engines.node` increase. For authorized breaks and zero-versioned projects,
  validate the new contracts and Node.js range and report the baseline changes.
- **Logs:** for each new warning, deprecation, or peer issue, find the package
  that introduced it (`pnpm why`) and search upstream for a known issue. Report
  it with the link. For a peer declaration lagging a verified compatible
  version, add a scoped `peerDependencyRules.allowedVersions` entry such as
  `"parent@range>peer": "tested-range"` to `pnpm-workspace.yaml` in both modes,
  and report the entry, the evidence, and that it suppresses a warning rather
  than fixing incompatibility. Compatibility is verified when the checks pass
  with the installed combination and no upstream report contradicts it. Apply
  the entry even when the lagging declaration arrives through an authored
  package: the consumer's `pnpm-workspace.yaml` is where the warning is
  silenced, and the report flags the upstream fix separately. Do not use broad
  `allowAny` or disable strict peer checks. Revisit such workarounds during
  step 9.
- **Build output:** if the baseline includes build output, rebuild with the
  same command and environment and diff the trees with content-hashed filenames
  normalized (`name.[hash].js`). Explain every remaining difference with an
  upstream changelog entry, issue, or reviewed migration/configuration change;
  anything unexplained needs investigation. Unless explicitly configured,
  tsdown derives its build target from `engines.node`, so an engine change can
  legitimately alter emitted syntax. Record the effective targets before and
  after, distinguish expected output changes from regressions, and check runtime
  APIs separately because syntax lowering does not provide polyfills.
- **After `pnpm fix`:** review the diff, then rebuild and diff against the
  pre-fix build. Formatting changes must produce identical output. A lint
  rule's suggested fix can change behavior (default parameters do not replace
  `null`); in that case keep the code and add an inline disable that says why.
  If the project can or is likely to run in browsers, including alongside
  Node.js, disable the offending rule for the affected shipped code when its
  fix would introduce regex flags or DOM APIs unsupported by the project's
  browser targets. Explain the compatibility reason and keep the compatible
  code instead of applying the fix; revert the fix if already applied. This
  also applies to zero-versioned projects, but does not apply to Node.js-only
  projects.
  Resolve remaining lint errors by hand.

On failure, make the smallest change consistent with the version policy and
rerun from the failing step:

- To tell a new failure from a pre-existing one, check the baseline logs.
  `git stash` does not revert `node_modules`, so rerunning a check after
  stashing still uses the new dependencies.
- To isolate a breaking update: set half the accepted updates back to their
  previous specifiers, `pnpm update -r`, rerun the failing check, repeat.
  For an out-of-range update, defer the culprit unless an approval or the
  zero-versioned exception permits it and the migration resolves the failure.
  For an already allowed runtime release, follow the range decision path in
  step 3; resetting a specifier or lockfile may not exclude it.

Add focused tests only where a compatibility change touches behavior not
already covered. Review `readme.md` accuracy and automation opportunities in step 8.

## 6. Exclusion cleanup

Only if `minimumReleaseAgeExclude` is non-empty in any `pnpm-workspace.yaml`
(at the start, or after step 5). Cleanup removes entries that no longer do
anything; it never changes which version is installed and never downgrades a
package.

Decide each entry from the publish time recorded in Setup, or look it up now:

- **Mature** (published at least 24 hours before the run): remove it; the
  version resolves without it.
- **Young, authored package:** keep it while that version is the release this
  run installs. Removing it would hold the package back to an older release.
- **Young, third-party package:** keep it while it holds a version that is
  already locked; removing it would downgrade an installed package rather than
  block a new one. Report it as pending with the date it can be removed. Do not
  add new third-party entries.
- **Unused** (the version is neither locked nor targeted): remove it.

Edit the list directly, preserving neighboring keys and comments; use `[]` or
remove the key when nothing remains. Then repeat step 5's separate bare
`pnpm update -r` and `pnpm dedupe --check` invocations, followed by a separate
`pnpm dedupe` only when the check reports available changes, and run each check
separately:

```bash
pnpm build
pnpm test
pnpm lint
```

Compare the resolved versions with the lockfile saved before cleanup. pnpm
does not report a maturity holdback; it silently selects the newest mature
version. An authored package that resolved below its latest stable release, or
any package that resolved below its previous locked version, means a removed
entry was still needed: re-add that narrowest package/version entry and resolve
again. Never restore the whole previous list.

If `pnpm-lock.yaml` comes out byte-identical and no ranges or build settings
changed, the installed tree did not change; rerun only `pnpm lint`.

If the list was empty throughout, skip this section and continue to step 7.
If cleanup changes resolution, repeat step 5's consumer compatibility review
before reviewing documentation.

## 7. Side effects declaration

For each published package, check that `sideEffects` in `package.json` tells
the truth about the shipped code. Bundlers drop any import they consider
side-effect-free when the declaration says `false`, and keep every module
otherwise, so a wrong `false` silently removes code consumers rely on and a
missing `false` on a pure package forfeits tree shaking.

1. Read the declaration: `false`, an array of file patterns, `true`, or absent,
   which means `true`.
2. Inspect the published entry points and every module they reach, in the
   build output that actually ships (`dist/` and the `files` list), including
   bundled dependencies. Look for work that runs on import rather than on
   call: assignments to globals or prototypes, polyfills, registrations such
   as `customElements.define`, event listeners, process or environment setup,
   CSS and asset imports, and bare imports kept only for their effects.
3. Set the declaration to match: `false` when nothing runs on import, an array
   naming the exact shipped files that do when only some do, and `true` when
   most modules have effects. A package with no importable entry point, such
   as a `bin`-only CLI, is unaffected either way; leave its declaration as is.
4. Report every evaluation: the package, which modules were inspected, what
   runs on import if anything, the declaration before and after, and why it
   changed or stayed. A wrong `false` is a bug; a newly added `false` is a
   performance improvement. Count either under the release recommendation.

## 8. Documentation review

Review `readme.md` against the updated project. Correct stale installation
instructions, requirements, commands, examples, configuration guidance, and
feature descriptions. If `readme.md` is generated or copied from another file,
update its maintained source and regenerate it through the existing workflow.

Review each section for content that would be more reliably maintained through
mdat, especially content duplicated from package metadata, CLI help, source
files, or other documentation. Prefer a rule bundled with mdat when it fits,
then a suitable mdat plugin, or a custom rule in `mdat.config.ts` for
project-specific needs. Check the installed rules and relevant documentation
before choosing an implementation. Replace manually maintained sections where
generation reduces duplication or prevents drift while preserving their useful
content and readability; keep explanatory prose manual when automation adds
no benefit. Any new plugin dependency must satisfy the dependency review,
release maturity, and compatibility policies above.

Run the project's mdat generation and documentation checks, inspect the
rendered content for accuracy, and confirm that a second generation produces
no further changes. Validate any new dependency under steps 5 and 6 before
continuing. Include documentation corrections and mdat conversions in the
final report.

## 9. @kitschpatrol/shared-config override minimization

Run this as the final cleanup after all accepted updates, migrations,
validation, release-age exclusion cleanup, and documentation review, before
the release recommendation and report.

Review every shared-config-related configuration file in the project root,
including dotfiles, companion ignore files, and configuration stored in
`package.json`. Include the individual `@kitschpatrol/*-config` packages used by
the project. Inventory every local override beyond the upstream default export
or equivalent base configuration: rule settings, options, ignores, file globs,
and other customizations.
Include scoped peer-warning workarounds added during the update; remove them
when upstream peer declarations now cover the tested versions.

For each override, compare it with the defaults and effective configuration of
the exact versions installed after the updates. Check the current code it
targets and, for upstream workarounds, the relevant upstream changes or fixes.
Remove overrides that duplicate current defaults, target code or files that no
longer exist, or compensate for issues now fixed upstream. Do not infer that an
override is redundant merely because checks pass while it is still enabled.

Validate removals in small groups using the affected tools' checks without
caches, covering the affected files and any files newly included by removing
ignores. Recheck effective configuration where merge order or file matching
matters. Keep overrides that still serve a concrete project requirement,
including the behavior and browser-compatibility protections from step 5, and
record why each is needed. If necessity cannot be established, retain the
override and report the unresolved evidence instead of guessing.

After changing configuration, rerun the affected build, test, type, and lint
checks and compare results and build output as in step 5. The final report must
account for every override: removed with evidence, retained with a current
justification, or unresolved with the missing evidence identified.

## Release recommendation

Recommend `patch`, `minor`, or `major` from the final consumer-visible changes,
following the repository's release conventions. Do not infer the recommendation
from the largest dependency version bump:

- **Patch:** compatible bug or security fixes, performance improvements, or
  dependency/tooling maintenance with no new consumer-facing capability. A
  development-only Node.js increase with the required notice can remain a
  patch, and so does a corrected or newly added `sideEffects` declaration.
- **Minor:** backward-compatible functionality or capabilities actually exposed
  to consumers by the accepted updates. Explain what consumers gain; an upstream
  minor or major alone is not a reason for a minor release. For zero-versioned
  projects, also recommend a minor release for accepted consumer-facing breaking
  changes unless the repository's pre-1.0 release conventions specify otherwise.
- **Major:** explicitly approved consumer-facing breaks in projects at 1.0.0
  or later, including a raised consumer Node.js floor. A dependency major or
  development-only requirement by itself does not justify a project major.

Give a short rationale per affected published package, or one recommendation
for a shared release version using the highest applicable level. If nothing
releasable changed, say no release is needed. An approved major release is
within scope; an unapproved breaking candidate stays pending or deferred.
For `0.x`, accepted consumer breaks normally require a minor, not a patch;
follow an explicit repository convention if it differs. Assess changes already
reachable through the old published ranges separately from newly introduced
consumer breaks. Recommend only; do not bump repository versions.

## Report

State the execution mode and why it was selected. Include a `Breaking changes
available` section for deferred breaking candidates: current and proposed
versions, affected consumers/contracts, required migration, validation results
or gaps, recommended release level, and the decision still needed. Distinguish
these from applied breaks authorized explicitly or by the `0.x` policy. In
unattended mode, record decisions needed as follow-up items, not questions or
pending waits. Report unavailable checks and blocked work even when independent
updates succeeded.

Review the full diff for unrelated changes, excluded-package edits, and stray
exemptions first. Then summarize: applied updates; major decisions with
sources; consumer impact, approvals, declined/deferred decisions, and breaks
accepted under the zero-versioned policy;
output differences and their upstream or migration explanations;
consumer Node.js requirements before and after, development Node.js changes and
their `devEngines.runtime` notices; the release recommendation and its rationale;
baseline lockfile drift; the `packageManager` version chosen and its source;
`sideEffects` evaluations with their evidence and outcome; runtime ranges,
fresh-install exposure, and approved
range restrictions; TypeScript migrations; new warnings and scoped peer
workarounds; what was validated and at which exact Node.js versions,
including installation checks, CLI/fixture comparisons, and unavailable baselines;
remaining `minimumReleaseAgeExclude` entries with reasons and the dates they can
be removed; deferred upgrades,
documentation corrections and mdat conversions;
shared-config overrides removed or retained with their justifications and any
unresolved override reviews; unresolved failures, checks that could not run,
and steps run differently because of the environment. Passing checks do not
prove the absence of breaking changes. Leave everything uncommitted.
