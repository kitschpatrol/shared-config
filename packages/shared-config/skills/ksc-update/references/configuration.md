# Configuration policy

Read this during Setup and apply it through the final cleanup. The authorization
table in the main skill governs decisions; the specific requirements here take
precedence over general preservation and minimization. Judge existing approvals,
hoist patterns, and pins from the starting checkout and need from the final
tree. Record each configuration decision, its evidence, and any unresolved issue
for the report.

## pnpm-workspace.yaml

### Build approvals

Keep `allowBuilds` limited to packages that remain in the dependency tree and
still need an explicit build-script decision. Inspect the resolved packages'
scripts and installation requirements; remove absent packages, packages whose
scripts no longer matter, and redundant entries. Do not copy the whole trust
list into every workspace.

These packages may be set to `true` whenever needed:

```text
@github/keytar
esbuild
@vscode/vsce-sign
unrs-resolver
skia-canvas
sharp
canvas
electron-winstaller
electron
netlify-cli
workerd
puppeteer
oxc-resolver
```

Preserve any other build already trusted in the starting checkout while it is
still needed; absence from the list above is not a reason to disable it. A new
approval outside the list needs explicit authorization. Without it, write `name:
false` so the install proceeds under `strictDepBuilds`, and report the pending
decision and any blocker it causes. pnpm itself appends placeholder entries for
unreviewed build scripts during installs; resolve them the same way.

`core-js` and `@tsparticles/engine` are always `false` when present, even if the
starting checkout enabled them; this denial beats prior approvals and broader
selectors. Keep an explicit denial while the installed package still needs a
decision, and remove entries for absent packages rather than keeping a permanent
deny list. Apply build decisions before any installation that can run dependency
scripts, including the baseline install, and record changes to the starting
policy.

### Overrides and peer rules

Review every `overrides` and `peerDependencyRules` entry, including existing
suppressions, with the [final minimization
procedure](#final-override-minimization). Remove peer rules for absent packages,
resolved upstream declarations, or versions no longer installed, and keep
remaining exceptions scoped to the affected parent and the tested peer range.
Never use broad `allowAny`, disable strict peer checks, or use overrides to
evade the consumer-range decision.

For each new warning, deprecation, or peer issue, trace its origin with `pnpm
why` and search upstream, then report the finding and its source. When checks
pass with the installed peer combination and no upstream report contradicts
compatibility, add a scoped `allowedVersions` entry such as
`"parent@range>peer": "tested-range"` to the consuming repository's
`pnpm-workspace.yaml`. This is authorized in both modes, including for warnings
that arrive through authored packages, but it is a suppression, not a fix:
report the evidence and the upstream fix separately. If the combination is
incompatible, resolve or defer the update instead. Every other suppression
follows the authorization table. Known entries are listed under [Current
exceptions](#current-exceptions).

### Hoisting and sorting

Preserve `publicHoistPattern` exactly, including patterns, order, and presence
or absence, and exclude it from minimization; negated patterns can be
order-sensitive. After the last workspace edit run `pnpm ksc-eslint fix
pnpm-workspace.yaml` and its lint check, keep the fixer's key ordering and
order-insensitive list ordering, including age exemptions, and verify
`publicHoistPattern` kept its original value.

### Release-age exemptions

Leave `minimumReleaseAge` as the repository declares it, or undeclared; do not
add or change it. pnpm 11 and later default to 1440 minutes, and Taze and
Actions Up enforce the same age for the candidates a run introduces. Without an
explicit setting pnpm falls back to a young version when no mature version
satisfies a range; report such a version as a finding instead of changing pnpm
settings. When it does so, pnpm 12 also appends the version to
`minimumReleaseAgeExclude` itself ("Added N entries to
minimumReleaseAgeExclude"), so after every install or update compare the list
with the entries the run added and apply the table below to each new one; a
young third-party entry pnpm added is removed and reported. pnpm also re-checks
the age of locked versions on install, so removing an exemption for a
still-young locked version can break or re-resolve the install; handle that with
the table below.

Every `minimumReleaseAgeExclude` entry names one exact `package@version`; no
package-only entries, wildcards, ranges, inequalities, or unions. Keep the
smallest effective set, remove the key when it is empty, and preserve
neighboring keys and comments. Exact entries implement the authored-package
exemption without exempting unreviewed future releases or third-party
dependencies.

**Before the baseline install:** inventory the starting exclusions, resolve
broad entries against the starting lockfile, and record the concrete versions
and their registry `time` values. Rewrite the list with these rules:

| Version state                                            | Action                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| Neither locked nor targeted                              | Remove.                                                                   |
| At least 24 hours old at the run's start                 | Remove; it needs no exemption.                                            |
| Young authored version installed or accepted as a target | Keep or add its exact exemption.                                          |
| Young third-party version already locked before this run | Keep only that exact version to avoid a downgrade; record when it can go. |
| Newly introduced young third-party version               | Do not exempt.                                                            |

**Before and after resolution:** add exact exemptions for accepted young
authored targets before `pnpm update`. Confirm afterwards that each accepted
version resolved. If one did not, inspect ranges, peers, overrides, and age
filtering; a lower version alone does not prove an age holdback. When age is the
cause, add the missing exact authored exemption and resolve again. Never exempt
an authored package's third-party dependencies: if they are too young, defer the
authored update, keep the previously locked version, and report the date it
becomes installable. Never silently settle for an older target or claim latest
was reached.

**Cleanup in step 6:** skip when the list was empty throughout. Otherwise save
the pre-cleanup lockfile, reevaluate every entry with the same rules, edit the
list, repeat step 5's resolution and deduplication, and run the workspace fixer.
Compare the result with the saved lockfile and the accepted targets, never with
an unaccepted latest candidate; cleanup must not downgrade a package or change
an accepted target. If a removed exemption caused a downgrade, restore only that
exact entry and resolve again. Then validate by the resulting diff: rerun only
`pnpm lint` when the lockfile is byte-identical and no range or build setting
changed; otherwise run build, test, and lint, and repeat the consumer
compatibility checks when resolution changed. Record retained exemptions with
reasons and removal dates. Cleanup must never undo the exemption of a
still-young accepted authored release.

### Trust policy

When `trustPolicy` is set, keep it. Treat `trustPolicyExclude` exactly like
release-age exclusions: exact `package@version` entries only, each reviewed,
reported, and removed when no longer needed. Never relax the policy to make an
install succeed; report the blocked update instead.

## CSpell

For each unknown word, use context to tell a misspelling from a legitimate term,
identifier, brand, or technical vocabulary. Fix misspellings; otherwise add the
word to `words` in `cspell.config.ts`. Err toward adding legitimate words rather
than rewriting correct text or renaming identifiers to satisfy the checker. `ksc
fix` removes unused words and sorts the array; accept that, do not restore
unused entries or manual ordering, and remove the `words` key if the array
becomes empty. Recheck after any later edit that adds or removes vocabulary.

## tsconfig.json

Select TypeScript within the accepted `@kitschpatrol/typescript-config`
release's compiler peer range, intersected with other required peers; never
hard-code a version. Without that config, follow the project's compiler policy
and peers. Read the accepted release's base configuration and evaluate the
effective settings before changing source to satisfy them, and prefer shared
defaults and the framework preset over copied local options.

Svelte projects inherit in this order:

```json
{
  "extends": ["@kitschpatrol/typescript-config/svelte", "./.svelte-kit/tsconfig.json"]
}
```

Astro projects use:

```json
{
  "extends": "@kitschpatrol/typescript-config/astro"
}
```

Review effective inheritance, including framework-generated settings; regenerate
those through the project workflow and edit only maintained configs. Remove
redundant or obsolete options only after checking the installed presets and
actual needs. Keep defensive exclusions for expected build and generated paths
such as `./dist`, even when absent. Document local overrides in adjacent JSONC
comments; basic `@types/` entries in `compilerOptions.types`, such as `"node"`,
need none.

During compiler or config migrations:

- Add `"node"` to `compilerOptions.types` where needed, preserving other entries
  and browser-code separation.
- Fix errors from newly enabled strict options instead of disabling them.
- Check `target`, `lib`, `types`, module settings, emitted syntax, declarations,
  and runtime APIs against browser targets and consumer Node.js floors. Compiler
  libraries do not polyfill runtime APIs. Keep documented compatibility
  overrides even when they add local configuration.

Run `ksc fix`, keep its ordering while preserving meaningful `extends` order,
verify the effective configuration, and run the relevant TypeScript or framework
checks, the build, and packed-install validation.

## Compatibility-preserving lint fixes

Review fixer changes before accepting them. If a fix changes behavior, retain or
restore the compatible code and add an inline disable that explains why, for
example that default parameters do not replace `null`. For code that can run in
browsers, including alongside Node.js, also disable fixes that introduce regex
flags or DOM APIs unsupported by the project's browser targets; this protection
applies to `0.x` too, but not to Node.js-only projects. Report every disable,
resolve remaining lint errors by hand, and use the output comparisons in the
verification reference.

## package.json

Apply these rules to each maintained package manifest, updating shared catalogs
where they supply the specifiers. Evaluate each package's own publication and
runtime requirements rather than copying root metadata.

### Node.js support

Published packages support LTS release lines only. Start from the minimum the
compatibility review establishes, or the declared minimum while it is still
true, and exclude every line between it and the newest release that never enters
LTS: the odd-numbered lines through Node 25. From Node 27 on, Node.js releases
annually and every major enters LTS, so no newer line is excluded. Write the
smallest union of ranges, for example `^24.16.0 || >=26.3.0` while an excluded
line sits between the floor and the newest release, or `>=26.3.0` when none
does; prerelease builds such as a Node 27 alpha never satisfy these ranges.
Apply the same shape to Node entries in `devEngines.runtime`, and align runtime
pins, CI matrices, and documented support with the result.

This exclusion is pre-authorized, but removing a line the package previously
declared is a consumer compatibility change for the release recommendation.
Raising the floor itself is a separate decision under the authorization table.

### Keywords

Add each keyword when its condition holds and remove it when incorrectly
present, preserving unrelated keywords.

| Keyword            | Condition                                                                     |
| ------------------ | ----------------------------------------------------------------------------- |
| `npm-package`      | The package is published to npm or another registry, including a private one. |
| `cli`              | The package ships a `bin` exposing a CLI.                                     |
| `homebrew-formula` | The package is distributed as a Homebrew formula.                             |
| `homebrew-cask`    | The package is distributed as a Homebrew cask.                                |

Check publish configuration, release workflows, shipped bins, documentation, and
the actual tap definition, starting with `kitschpatrol/homebrew-tap` and
verifying the formula or cask against the project's release configuration. Never
infer publication from a name or an installation snippet; a private workspace
root is not a published package because its children are.

A private workspace root's keywords are a special case, preserve any
hand-written keywords, and then make sure all the keywords from the table above
that are present in workspace projects are aggregated in the root package.json's
keywords list. Likewise, remove the table keywords if not present in any
workspace projects. Tooling such as `kitschpatrol/github-action-repo-sync`
publishes root keywords as repository topics, so a root may describe what its
children publish and ship.

### Version declarations

- **pnpm:** `packageManager` is the version in Homebrew's current stable formula
  from Step 0.3, even across a major. Keep it after dependency tools and fixers
  run.
- **TypeScript:** when present in `devDependencies`, declare the selected
  compatible version with `~`, for example `"typescript": "~6.0.3"`; the version
  is illustrative, the range style is the rule. For a catalog reference, put the
  `~` range in the catalog and keep the reference.
- **Node types:** when `@types/node` is present, find the minimum Node.js
  version the package supports through `engines.node`, match its major and minor
  with the highest patch the maturity policy allows, and declare
  `~<major>.<minor>.<patch>`. When engines describe only development, use the
  minimum development requirement, including `devEngines.runtime`; a published
  package with both uses the consumer minimum even though the types are a
  development dependency. If the exact minor is unavailable, use the highest
  lower minor in the same major and report the fallback; if the major has no
  suitable release, report the blocker rather than choosing an unrelated major.
  Verify runtime APIs against the actual minimum; types prove nothing. Update
  supplying catalogs and overrides consistently, splitting shared catalog
  entries when package minimums differ, and never add `@types/node` to a package
  that does not use it.
- **Exact pins:** inspect each exact version, including catalogs and overrides.
  Check nearby comments, history, and linked upstream issues for why it was
  pinned and whether the fix shipped. Keep a still-needed pin, updating it to a
  reviewed exact release when appropriate; restore the normal range only when
  the reason is resolved and validation supports it; when the reason is unclear,
  keep the pin and report the uncertainty. The `~` rules for TypeScript and Node
  types take precedence over pin preservation.

Recheck these declarations after resolution and `ksc fix`.

### Side effects

For each published package, inspect `sideEffects` against the shipped
entrypoints and every module they reach, including bundled dependencies,
`dist/`, and the `files` list. Look for import-time effects: global or prototype
assignments, polyfills, registrations such as `customElements.define`,
listeners, process or environment setup, CSS and assets, and bare imports kept
for their effects.

Use `false` for a pure package, an array naming the exact shipped files with
effects when only some have them, or `true` when most do; absence means `true`.
Leave bin-only packages without an importable entrypoint unchanged. An incorrect
`false` removes required consumer behavior; a newly valid `false` enables tree
shaking. Record each package's inspected modules, effects, declaration before
and after, and justification even when unchanged. Treat corrections as bug fixes
and a newly added `false` as a performance improvement for the release
recommendation.

## Final override minimization

After the full workflow, recheck every policy in this reference. Inventory all
shared-config-related root configuration: individual `@kitschpatrol/*-config`
packages, dotfiles, companion ignores, and settings in `package.json`, including
rules, options, globs, ignores, pnpm overrides, and peer workarounds added
during the run. Preserve the hoisting and the defensive and compatibility
exceptions defined above.

For every override, compare the exact installed defaults and effective
configuration, the current targeted code, the dependency graph and constraints,
and relevant upstream fixes. Remove duplicates, obsolete settings with no
defensive purpose, and resolved workarounds. Passing checks with an override
enabled prove neither its necessity nor its redundancy; when evidence is
insufficient, keep it and report what is missing.

Try removals in small groups, resolving again after dependency changes. Run
affected checks without caches, covering targeted files and files newly included
by ignore removal, and recheck effective configuration where matching or merge
order matters. Keep overrides that serve a concrete current requirement with a
recorded justification. After edits, run affected fixers, the build, test, type,
and lint checks, and the output comparisons from the verification reference.
Account for every override as removed with evidence, retained with
justification, or unresolved with the missing evidence named.

Trial removals without editing the real configuration where the tool allows it:

- **Knip:** configuration hints are truncated ("…N more similar hints") and the
  JSON reporter omits them. Write a temporary config next to the real one with
  the local `ignore*` lists removed, run `knip -c <temporary config>
--no-config-hints`, and keep exactly the entries whose removal produces a
  report. Also compare local entries with the shared config's defaults; a
  duplicate of a shared default is removable.
- **ESLint:** write a temporary config that imports the real one and filters out
  the blocks under test, then run `eslint --no-cache -c <temporary config>` on
  exactly the files those blocks target. A block whose `files` match nothing in
  the repository and in its generators is obsolete. A crash workaround is still
  needed when removing it reproduces the crash.
- Delete temporary configs afterwards; they must never reach the diff.

## Current exceptions

Time-bound entries that the rules above reference. Remove each one when its
condition is met and update this list.

- **`eslint-plugin-jsx-a11y` 6 with ESLint 10:** after verifying compatibility
  by the standard in [Overrides and peer rules](#overrides-and-peer-rules), use
  exactly this entry and these comments, merged with other still-needed rules.
  Remove it once the installed plugin declares ESLint 10 support.

  ```yaml
  peerDependencyRules:
    allowedVersions:
      # Remove once the installed version declares ESLint 10 support.
      # https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/1075
      # https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/pull/1081
      eslint-plugin-jsx-a11y@6>eslint: ^10.0.0
  ```
