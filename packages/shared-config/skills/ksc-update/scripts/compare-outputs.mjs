/**
 * Compares two directories of captured outputs, such as baseline and updated
 * fixture results or build trees, after normalizing only known nondeterministic
 * text, and reports each file as identical, different, or present on one side.
 *
 * Normalization:
 *
 * - `--token-a` and `--token-b` replace state names such as `baseline` and
 *   `updated` with `<STATE>`, but only where they appear as a path segment
 *   (bounded by `/`, `\`, or `+`). Bare-word replacement would also rewrite
 *   content such as the CSS property `alignment-baseline`.
 * - Store directory names that pnpm ends with `_` plus 32 hex characters become
 *   `<STORE-DIR>`. pnpm truncates long names before the hash, so the whole
 *   segment varies with the state name's length, not just the hash.
 * - Git blob ids in captured diffs (`index abc123..def456`) become `index
 *   <BLOBS>`.
 * - Content-hashed filenames (`name.<8+ characters>.js`) become `name.[hash].js`.
 * - `--sort-lines` sorts lines first, for output that parallel tools interleave
 *   differently on each run. Never use it where order is meaningful.
 *
 * Usage:
 *
 * ```
 * node compare-outputs.mjs <dir-a> <dir-b> [--token-a <name>] [--token-b <name>] [--sort-lines]
 * ```
 *
 * Prints a short `git diff --no-index` of each differing file and exits 1 when
 * anything differs.
 */
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import process from 'node:process'
import { runDirectory } from './lib.mjs'

/** @type {string[]} */
const positional = []
/** @type {Record<string, string>} */
const options = {}
let sortLines = false
const argv = process.argv.slice(2)
for (let index = 0; index < argv.length; index++) {
	const argument = argv[index] ?? ''
	if (argument === '--sort-lines') {
		sortLines = true
	} else if (argument.startsWith('--')) {
		options[argument.slice(2)] = argv[++index] ?? ''
	} else {
		positional.push(argument)
	}
}

const [directoryA, directoryB] = positional
if (directoryA === undefined || directoryB === undefined) {
	throw new Error(
		'Usage: node compare-outputs.mjs <dir-a> <dir-b> [--token-a x] [--token-b y] [--sort-lines]',
	)
}

/**
 * Lists files under a directory recursively, as paths relative to it.
 *
 * @param {string} root - Directory to walk.
 *
 * @returns {string[]} Relative file paths.
 */
function listFiles(root) {
	return readdirSync(root, { recursive: true, withFileTypes: true })
		.filter((entry) => entry.isFile())
		.map((entry) => relative(root, join(entry.parentPath, entry.name)))
		.toSorted()
}

/**
 * Normalizes one file's text for comparison.
 *
 * @param {string} text - File contents.
 * @param {string | undefined} token - State name to replace on this side.
 *
 * @returns {string} Normalized text.
 */
function normalize(text, token) {
	let result = text
	if (token !== undefined && token !== '') {
		const escaped = token.replaceAll(/[$\(\)*+.?\[\\\]^\{\|\}]/gv, String.raw`\$&`)
		result = result.replaceAll(
			new RegExp(String.raw`(?<=[\/\\+])${escaped}(?=[\/\\+])`, 'gv'),
			'<STATE>',
		)
	}

	result = result
		.replaceAll(/[^\s"'\/\\]*_[\da-f]{32}/gv, '<STORE-DIR>')
		.replaceAll(/^index [\da-f]+\.\.[\da-f]+/gmv, 'index <BLOBS>')
		.replaceAll(/\.[\w\-]{8,}\.(c?js|mjs|css)\b/gv, '.[hash].$1')
	return sortLines ? result.split('\n').toSorted().join('\n') : result
}

const filesA = new Set(listFiles(directoryA))
const filesB = new Set(listFiles(directoryB))
const scratch = mkdtempSync(join(runDirectory(), 'compare-'))
let differences = 0

for (const file of [...filesA.union(filesB)].toSorted()) {
	if (!filesA.has(file) || !filesB.has(file)) {
		differences++
		process.stdout.write(`only in ${filesA.has(file) ? 'A' : 'B'}: ${file}\n`)
		continue
	}

	const pathA = join(directoryA, file)
	const pathB = join(directoryB, file)
	if (statSync(pathA).size === 0 && statSync(pathB).size === 0) {
		continue
	}

	const textA = normalize(readFileSync(pathA, 'utf8'), options['token-a'])
	const textB = normalize(readFileSync(pathB, 'utf8'), options['token-b'])
	if (textA === textB) {
		continue
	}

	differences++
	const safeName = file.replaceAll(/[\/\\]/gv, '__')
	writeFileSync(join(scratch, `a-${safeName}`), textA)
	writeFileSync(join(scratch, `b-${safeName}`), textB)
	const diff = spawnSync(
		'git',
		['diff', '--no-index', '--no-color', '-U1', `a-${safeName}`, `b-${safeName}`],
		{ cwd: scratch, encoding: 'utf8' },
	)
	const lines = diff.stdout.split('\n')
	process.stdout.write(`differs: ${file}\n${lines.slice(4, 44).join('\n')}\n`)
	if (lines.length > 44) {
		process.stdout.write(`  ... ${lines.length - 44} more diff lines\n`)
	}
}

process.stdout.write(
	`${differences === 0 ? 'no differences' : `${differences} file(s) differ`} (normalized copies in ${scratch})\n`,
)
if (differences > 0) {
	process.exitCode = 1
}
