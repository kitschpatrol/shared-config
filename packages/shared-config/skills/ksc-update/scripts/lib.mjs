/**
 * Shared helpers for the ksc-update scripts. Everything here uses only Node.js
 * built-ins and the pnpm CLI so the scripts run in any repository without
 * installing anything.
 */
import { execFile, execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'

const NOT_FOUND_PATTERN = /E404|ERR_PNPM_NO_MATCHING_VERSION|not found/iv
const TOP_LEVEL_LINE_PATTERN = /^\S/v
const QUOTES_PATTERN = /^['"]|['"]$/gv
const LOCKFILE_KEY_PATTERN = /^ {2}'?([^\s']+?)'?:$/v

/** Milliseconds in the 24-hour maturity window. */
export const MATURITY_MS = 24 * 60 * 60 * 1000

/**
 * Narrows an unknown JSON value to a plain object.
 *
 * @param {unknown} value - Any parsed JSON value.
 *
 * @returns {value is Record<string, unknown>} Whether the value is a non-array
 *   object.
 */
export function isRecord(value) {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Returns the value when it is a string.
 *
 * @param {unknown} value - Any parsed JSON value.
 *
 * @returns {string | undefined} The string, or undefined for any other type.
 */
export function asString(value) {
	return typeof value === 'string' ? value : undefined
}

/**
 * Resolves the run directory the skill uses for logs and state, creating it.
 *
 * @returns {string} `${RUNNER_TEMP:-${TMPDIR:-/tmp}}/ksc-update`.
 */
export function runDirectory() {
	const base = process.env.RUNNER_TEMP ?? process.env.TMPDIR ?? tmpdir()
	const directory = join(base, 'ksc-update')
	mkdirSync(directory, { recursive: true })
	return directory
}

/**
 * Reads and parses a JSON file, failing with the path in the message.
 *
 * @param {string} path - File to read.
 *
 * @returns {unknown} The parsed value.
 */
export function readJson(path) {
	try {
		return JSON.parse(readFileSync(path, 'utf8'))
	} catch (error) {
		throw new Error(`Could not read JSON from ${path}`, { cause: error })
	}
}

/**
 * Runs pnpm synchronously and parses its JSON stdout, dropping `[WARN]` lines
 * that pnpm prints to stdout.
 *
 * @param {string[]} args - Arguments for pnpm.
 * @param {string} [cwd] - Working directory.
 *
 * @returns {unknown} Parsed JSON output.
 */
export function pnpmJson(args, cwd) {
	const stdout = execFileSync('pnpm', args, {
		cwd,
		encoding: 'utf8',
		maxBuffer: 1024 ** 3,
		stdio: ['ignore', 'pipe', 'pipe'],
	})
	return parsePnpmJson(stdout, args)
}

/**
 * Parses pnpm stdout as JSON after removing `[WARN]` lines.
 *
 * @param {string} stdout - Raw pnpm output.
 * @param {string[]} args - The pnpm arguments, for error messages.
 *
 * @returns {unknown} Parsed JSON, or undefined for empty output.
 */
function parsePnpmJson(stdout, args) {
	const text = stdout
		.split('\n')
		.filter((line) => !line.startsWith('[WARN]'))
		.join('\n')
		.trim()
	try {
		return text === '' ? undefined : JSON.parse(text)
	} catch (error) {
		throw new Error(`pnpm ${args.join(' ')} did not print valid JSON`, { cause: error })
	}
}

/**
 * Runs `pnpm view` asynchronously and parses its JSON output. A missing package
 * or an unsatisfiable range resolves to undefined instead of throwing.
 *
 * @param {string[]} args - Arguments after `pnpm view`.
 *
 * @returns {Promise<unknown>} Parsed JSON, or undefined when nothing matched.
 */
export async function pnpmView(args) {
	const fullArgs = ['view', ...args, '--json']
	/** @type {{ error: Error | null; stderr: string; stdout: string }} */
	const { error, stderr, stdout } = await new Promise((resolve) => {
		execFile('pnpm', fullArgs, { maxBuffer: 1024 ** 3 }, (failure, out, errorOutput) => {
			resolve({ error: failure, stderr: errorOutput, stdout: out })
		})
	})
	if (error === null) {
		return parsePnpmJson(stdout, fullArgs)
	}

	if (NOT_FOUND_PATTERN.test(stderr)) {
		return
	}

	throw new Error(`pnpm ${fullArgs.join(' ')} failed: ${stderr.trim()}`, { cause: error })
}

/**
 * Returns a package's publish times from the registry, cached as JSON under
 * `<run directory>/meta/` so reviewers and scripts share one fetch.
 *
 * @param {string} name - Package name.
 *
 * @returns {Promise<Record<string, string>>} Version to ISO publish time.
 */
export async function publishTimes(name) {
	const directory = join(runDirectory(), 'meta')
	mkdirSync(directory, { recursive: true })
	const file = join(directory, `${name.replaceAll('/', '_')}.time.json`)
	if (existsSync(file)) {
		const cached = readJson(file)
		if (isRecord(cached)) {
			return toStringRecord(cached)
		}
	}

	const times = await pnpmView([name, 'time'])
	const record = isRecord(times) ? toStringRecord(times) : {}
	writeFileSync(file, JSON.stringify(record))
	return record
}

/**
 * Keeps only the string-valued entries of an object.
 *
 * @param {Record<string, unknown>} value - Object to filter.
 *
 * @returns {Record<string, string>} The string entries.
 */
function toStringRecord(value) {
	/** @type {Record<string, string>} */
	const result = {}
	for (const [key, entry] of Object.entries(value)) {
		const text = asString(entry)
		if (text !== undefined) {
			result[key] = text
		}
	}

	return result
}

/**
 * Maps items through an async function with bounded concurrency, preserving
 * order.
 *
 * @template T, R
 * @param {T[]} items - Inputs.
 * @param {number} limit - Maximum concurrent calls.
 * @param {(item: T) => Promise<R>} worker - Async mapper.
 *
 * @returns {Promise<R[]>} Results in input order.
 */
export async function mapLimit(items, limit, worker) {
	/** @type {R[]} */
	const results = Array.from({ length: items.length })
	let next = 0
	const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
		while (next < items.length) {
			const index = next++

			results[index] = await worker(/** @type {T} */ (items[index]))
		}
	})
	await Promise.all(runners)
	return results
}

/**
 * Splits a `name@version` string, keeping the leading `@` of scoped names.
 *
 * @param {string} spec - A `name@version` string.
 *
 * @returns {{ name: string; version: string } | undefined} The parts, or
 *   undefined when there is no version.
 */
export function splitSpec(spec) {
	const at = spec.lastIndexOf('@')
	return at <= 0 ? undefined : { name: spec.slice(0, at), version: spec.slice(at + 1) }
}

/**
 * Lists the `name@version` keys of every `packages` section in a pnpm lockfile.
 * Recent pnpm lockfiles hold several YAML documents, including one for the
 * package manager's own dependencies, so all sections are read.
 *
 * @param {string} lockfilePath - Path to `pnpm-lock.yaml`.
 *
 * @returns {Set<string>} Package keys without quotes, excluding non-registry
 *   entries such as `file:` and `link:` specifiers.
 */
export function lockedPackages(lockfilePath) {
	const lines = readFileSync(lockfilePath, 'utf8').split('\n')
	/** @type {Set<string>} */
	const keys = new Set()
	let inPackages = false
	for (const line of lines) {
		if (TOP_LEVEL_LINE_PATTERN.test(line)) {
			inPackages = line === 'packages:'
			continue
		}

		if (!inPackages) {
			continue
		}

		const match = LOCKFILE_KEY_PATTERN.exec(line)
		if (match?.[1] !== undefined && !match[1].includes(':')) {
			keys.add(match[1])
		}
	}

	if (keys.size === 0) {
		throw new Error(`No package entries found in ${lockfilePath}`)
	}

	return keys
}

/**
 * Reads a top-level string list from a YAML file without a YAML parser. Handles
 * the block style pnpm and its fixers write: `key:` followed by ` - item`
 * lines, with optional quotes and comments.
 *
 * @param {string} path - YAML file.
 * @param {string} key - Top-level key.
 *
 * @returns {string[]} The list items, empty when the key is absent.
 */
export function readYamlList(path, key) {
	if (!existsSync(path)) {
		return []
	}

	const lines = readFileSync(path, 'utf8').split('\n')
	const start = lines.indexOf(`${key}:`)
	if (start === -1) {
		if (lines.some((line) => line.startsWith(`${key}:`))) {
			throw new Error(`${key} in ${path} is not a block list; read it by hand`)
		}

		return []
	}

	/** @type {string[]} */
	const items = []
	const following = lines.slice(start + 1)
	for (const line of following) {
		if (TOP_LEVEL_LINE_PATTERN.test(line)) {
			break
		}

		const trimmed = line.trim()
		if (!trimmed.startsWith('- ')) {
			continue
		}

		const [value = ''] = trimmed.slice(2).split(' #', 1)
		const item = value.trim().replaceAll(QUOTES_PATTERN, '')
		if (item !== '') {
			items.push(item)
		}
	}

	return items
}
