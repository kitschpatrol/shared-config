/**
 * Prints one sorted row per package in a `pnpm list --prod --depth Infinity
 * --json` tree: the name, version, and declared `engines.node`, read from each
 * installed `package.json` instead of trusting the list output. A dependency
 * whose installed directory is missing, typically a platform-specific optional
 * dependency not installed on this host, is reported with `installed: false`
 * and the name and version from the list; review its engines from registry
 * metadata.
 *
 * Usage: `node production-engines.mjs production-tree.json`
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

/**
 * Narrows an unknown JSON value to a plain object.
 *
 * @param {unknown} value - Any parsed JSON value.
 *
 * @returns {value is Record<string, unknown>} Whether the value is a non-array
 *   object.
 */
function isRecord(value) {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Returns the value when it is a string.
 *
 * @param {unknown} value - Any parsed JSON value.
 *
 * @returns {string | undefined} The string, or undefined for any other type.
 */
function asString(value) {
	return typeof value === 'string' ? value : undefined
}

const inputPath = process.argv[2]
if (inputPath === undefined) {
	throw new Error('Usage: node production-engines.mjs <pnpm-list-json-file>')
}

/** @type {unknown} */
const parsed = JSON.parse(readFileSync(inputPath, 'utf8'))
if (!Array.isArray(parsed)) {
	throw new TypeError(`Expected a JSON array from pnpm list in ${inputPath}`)
}

/** @type {Set<string>} */
const visited = new Set()
/** @type {Set<string>} */
const rows = new Set()

/**
 * Records one tree entry and recurses into its production and optional
 * dependencies, skipping subtrees already walked.
 *
 * @param {Record<string, unknown>} entry - A project or dependency node from
 *   the pnpm list output.
 */
function visit(entry) {
	const installedPath = asString(entry.path)
	if (installedPath === undefined) {
		const label = asString(entry.name) ?? asString(entry.version) ?? 'unnamed entry'
		throw new Error(`Missing path property for ${label}`)
	}

	if (visited.has(installedPath)) {
		return
	}

	visited.add(installedPath)

	const manifestPath = join(installedPath, 'package.json')
	if (existsSync(manifestPath)) {
		/** @type {unknown} */
		const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
		if (!isRecord(manifest)) {
			throw new TypeError(`Expected an object in ${manifestPath}`)
		}

		const engines = isRecord(manifest.engines) ? manifest.engines : {}
		rows.add(
			JSON.stringify({
				name: asString(manifest.name),
				node: asString(engines.node),
				version: asString(manifest.version),
			}),
		)
	} else {
		rows.add(
			JSON.stringify({
				installed: false,
				name: asString(entry.name) ?? asString(entry.from),
				version: asString(entry.version),
			}),
		)
	}

	for (const group of ['dependencies', 'optionalDependencies']) {
		const children = entry[group]
		if (isRecord(children)) {
			for (const [name, child] of Object.entries(children)) {
				if (isRecord(child)) {
					visit({ name, ...child })
				}
			}
		}
	}
}

for (const root of parsed) {
	if (isRecord(root)) {
		visit(root)
	}
}

process.stdout.write(`${[...rows].toSorted().join('\n')}\n`)
