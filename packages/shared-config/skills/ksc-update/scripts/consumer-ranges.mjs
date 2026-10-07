/**
 * Builds the consumer-range table for step 3: for every runtime dependency of
 * every published workspace package, the declared range, the locked version,
 * and the newest stable version the range allows with its publish time. Rows
 * flag `ahead` when consumers can resolve something newer than the lockfile and
 * `young` when that newest version is under 24 hours old at the run start, so
 * it cannot be installed here and must be reviewed as consumer exposure.
 *
 * Range matching uses `pnpm view <name>@<range>`, so it honors the repository's
 * registry settings. `catalog:` specifiers are reported with
 * `needsManualReview` instead of being resolved.
 *
 * Usage: `node consumer-ranges.mjs [--run-start <iso-time>] >
 * consumer-ranges.json`, run from the workspace root. A human-readable summary
 * goes to stderr.
 */
import { join } from 'node:path'
import process from 'node:process'
import {
	asString,
	isRecord,
	mapLimit,
	MATURITY_MS,
	pnpmJson,
	pnpmView,
	publishTimes,
	readJson,
} from './lib.mjs'

const runStartIndex = process.argv.indexOf('--run-start')
const runStartText = runStartIndex === -1 ? undefined : process.argv[runStartIndex + 1]
const runStart = runStartText === undefined ? Date.now() : Date.parse(runStartText)
if (Number.isNaN(runStart)) {
	throw new TypeError(`Invalid --run-start value: ${runStartText}`)
}

/**
 * @typedef {object} Task
 * @property {string} package - Published workspace package name.
 * @property {string} name - Dependency name as declared.
 * @property {string} range - Declared specifier.
 * @property {string | undefined} locked - Version in the lockfile.
 */

/** @type {Task[]} */
const tasks = []
const projects = pnpmJson(['-r', 'ls', '--depth', '0', '--prod', '--json'])
if (!Array.isArray(projects)) {
	throw new TypeError('Expected a JSON array from pnpm -r ls')
}

for (const project of projects) {
	if (!isRecord(project) || project.private === true) {
		continue
	}

	const projectPath = asString(project.path)
	if (projectPath === undefined) {
		continue
	}

	const manifest = readJson(join(projectPath, 'package.json'))
	if (!isRecord(manifest) || manifest.private === true) {
		continue
	}

	const packageName = asString(manifest.name) ?? projectPath
	const declared = isRecord(manifest.dependencies) ? manifest.dependencies : {}
	const installed = isRecord(project.dependencies) ? project.dependencies : {}
	for (const [name, rangeValue] of Object.entries(declared)) {
		const range = asString(rangeValue)
		if (range === undefined || /^(?:workspace|link|file):/v.test(range)) {
			continue
		}

		const entry = installed[name]
		tasks.push({
			locked: isRecord(entry) ? asString(entry.version) : undefined,
			name,
			package: packageName,
			range,
		})
	}
}

const NPM_ALIAS_PATTERN = /^npm:(.+)@([^@]+)$/v

const rows = await mapLimit(tasks, 8, async (task) => {
	if (task.range.startsWith('catalog:')) {
		return { ...task, needsManualReview: 'catalog specifier' }
	}

	const alias = NPM_ALIAS_PATTERN.exec(task.range)
	const target = alias?.[1] ?? task.name
	const range = alias?.[2] ?? task.range
	const matched = await pnpmView([`${target}@${range}`, 'version'])
	const versions = Array.isArray(matched) ? matched.map(String) : [asString(matched)]
	const stable = versions.filter((version) => version !== undefined && !version.includes('-'))
	const newestAllowed = stable.at(-1)
	if (newestAllowed === undefined) {
		return { ...task, needsManualReview: 'no stable version satisfies the range' }
	}

	const times = await publishTimes(target)
	const time = times[newestAllowed]
	const young = time === undefined ? undefined : Date.parse(time) > runStart - MATURITY_MS
	return {
		...task,
		ahead: task.locked !== newestAllowed,
		newestAllowed,
		newestAllowedTime: time,
		target: target === task.name ? undefined : target,
		young,
	}
})

process.stdout.write(`${JSON.stringify(rows, undefined, 2)}\n`)

const flagged = rows.filter((row) => 'needsManualReview' in row || row.ahead)
process.stderr.write(`${rows.length} runtime dependency entries checked\n`)
for (const row of flagged) {
	const detail =
		'needsManualReview' in row
			? `needs manual review: ${row.needsManualReview}`
			: `locked ${row.locked ?? '?'} < newest allowed ${row.newestAllowed} (${row.newestAllowedTime ?? 'time unknown'}${row.young ? ', YOUNG' : ''})`
	process.stderr.write(`  ${row.package} > ${row.name} ${row.range}: ${detail}\n`)
}
