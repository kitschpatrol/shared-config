/**
 * Release-age helpers for the exemption policy in configuration.md.
 *
 * `inventory` classifies every `minimumReleaseAgeExclude` entry in
 * `pnpm-workspace.yaml` against the lockfile, the registry publish time, and
 * the authored-package list, printing the policy action for each. Run it during
 * Setup before the baseline install and again during step 6 cleanup.
 *
 * `new-versions` lists every package version present in the after-lockfile but
 * not the before-lockfile that is under 24 hours old at the run start, with
 * whether it is authored and when it becomes installable. Run it after each
 * resolution to find authored versions that need an exact exemption and
 * third-party versions that must not get one.
 *
 * Usage, from the workspace root:
 *
 * ```
 * node release-age.mjs inventory [--workspace <file>] [--lockfile <file>] [--run-start <iso>] [--authored <file>]
 * node release-age.mjs new-versions <before-lock> [after-lock] [--run-start <iso>] [--authored <file>]
 * ```
 *
 * `--authored` defaults to `<run directory>/authored-packages.txt`, the
 * comma-separated ownership list from Setup step 5. `--workspace` and
 * `--lockfile` default to the files in the current directory; point them at
 * saved copies to inspect another state without touching the repository. Output
 * is JSON on stdout with a summary on stderr.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import {
	lockedPackages,
	mapLimit,
	MATURITY_MS,
	publishTimes,
	readYamlList,
	runDirectory,
	splitSpec,
} from './lib.mjs'

const [mode, ...rest] = process.argv.slice(2)
/** @type {string[]} */
const positional = []
/** @type {Record<string, string>} */
const options = {}
for (let index = 0; index < rest.length; index++) {
	const argument = rest[index] ?? ''
	if (argument.startsWith('--')) {
		options[argument.slice(2)] = rest[++index] ?? ''
	} else {
		positional.push(argument)
	}
}

const runStart = options['run-start'] === undefined ? Date.now() : Date.parse(options['run-start'])
if (Number.isNaN(runStart)) {
	throw new TypeError(`Invalid --run-start value: ${options['run-start']}`)
}

const authoredPath = options.authored ?? join(runDirectory(), 'authored-packages.txt')
if (!existsSync(authoredPath)) {
	throw new Error(
		`Authored package list not found at ${authoredPath}. Run Setup step 5 or pass --authored.`,
	)
}

const LIST_SEPARATOR = /[\s,]+/v
const RANGE_CHARACTERS = /[\s*<=>\|^~]/v
const authored = new Set(
	readFileSync(authoredPath, 'utf8')
		.split(LIST_SEPARATOR)
		.filter((name) => name !== ''),
)

/**
 * @typedef {object} Age
 * @property {boolean} authored - Whether kitschpatrol owns the package.
 * @property {string} [installableAt] - When the version turns 24 hours old.
 * @property {string} [published] - Registry publish time.
 * @property {boolean} [young] - Under 24 hours old at the run start; undefined
 *   when the publish time is unknown.
 */

/**
 * Looks up a version's publish time and derived maturity facts.
 *
 * @param {string} name - Package name.
 * @param {string} version - Exact version.
 *
 * @returns {Promise<Age>} The version's age facts.
 */
async function ageOf(name, version) {
	const times = await publishTimes(name)
	const published = times[version]
	if (published === undefined) {
		return { authored: authored.has(name) }
	}

	const publishedMs = Date.parse(published)
	return {
		authored: authored.has(name),
		installableAt: new Date(publishedMs + MATURITY_MS).toISOString(),
		published,
		young: publishedMs > runStart - MATURITY_MS,
	}
}

if (mode === 'inventory') {
	const locked = lockedPackages(options.lockfile ?? 'pnpm-lock.yaml')
	const lockedNames = Array.from(locked, (key) => splitSpec(key))
	const entries = readYamlList(
		options.workspace ?? 'pnpm-workspace.yaml',
		'minimumReleaseAgeExclude',
	)
	const rows = await mapLimit(entries, 8, async (entry) => {
		const spec = splitSpec(entry)
		if (spec === undefined || RANGE_CHARACTERS.test(spec.version) || spec.version === '') {
			const name = spec?.name ?? entry
			return {
				action: 'broad entry: rewrite as exact versions resolved from the lockfile',
				entry,
				lockedVersions: lockedNames
					.filter((part) => part?.name === name)
					.map((part) => part?.version),
			}
		}

		const age = await ageOf(spec.name, spec.version)
		const isLocked = locked.has(entry)
		/** @type {string} */
		let action
		if (age.published === undefined) {
			action = 'unknown version: check by hand'
		} else if (!age.young) {
			action = 'remove: at least 24 hours old'
		} else if (age.authored) {
			action = 'keep if installed or an accepted target'
		} else if (isLocked) {
			action = `keep only to avoid a downgrade; removable after ${age.installableAt}`
		} else {
			action = 'remove: young third-party version that is not locked'
		}

		return { action, entry, locked: isLocked, ...age }
	})
	process.stdout.write(`${JSON.stringify(rows, undefined, 2)}\n`)
	for (const row of rows) {
		process.stderr.write(`${row.entry}: ${row.action}\n`)
	}
} else if (mode === 'new-versions') {
	const [beforePath, afterPath = 'pnpm-lock.yaml'] = positional
	if (beforePath === undefined) {
		throw new Error('Usage: node release-age.mjs new-versions <before-lock> [after-lock]')
	}

	const before = lockedPackages(beforePath)
	const added = [...lockedPackages(afterPath).difference(before)]
	const rows = await mapLimit(added, 8, async (key) => {
		const spec = splitSpec(key)
		const age = spec === undefined ? { authored: false } : await ageOf(spec.name, spec.version)
		return { key, ...age }
	})
	const flagged = rows.filter((row) => row.young !== false)
	process.stdout.write(`${JSON.stringify(flagged, undefined, 2)}\n`)
	process.stderr.write(`${added.length} new versions, ${flagged.length} young or unknown\n`)
	for (const row of flagged) {
		const kind = row.authored ? 'authored' : 'third-party'
		const when =
			row.installableAt === undefined ? 'publish time unknown' : `installable ${row.installableAt}`
		process.stderr.write(`  ${row.key} (${kind}): ${when}\n`)
	}
} else {
	throw new Error('Usage: node release-age.mjs <inventory|new-versions> [options]')
}
