/* eslint-disable complexity */
/* eslint-disable max-depth */
import { execa } from 'execa'
import fse from 'fs-extra'
import path from 'node:path'
import semver from 'semver'
import { getPackageDirectory } from '../../../src/path-utilities'
import { formatFileInPlace } from '../../../src/prettier-utilities'
import { pluralize } from '../../../src/string-utilities'

type DevEngineRuntime = {
	name: string
	onFail?: string
	version?: string
}

type DevEngines = {
	runtime?: DevEngineRuntime | DevEngineRuntime[]
}

/**
 * Parse ls-engines table output to extract the dependency graph's engines.node range.
 * The output has two columns: "package engines" (left) and "dependency graph engines" (right).
 * We look for the "node" value in the right column.
 */
function parseLsEnginesOutput(output: string): string | undefined {
	// Look for lines containing "node" in the two-column table.
	// Each row has cells separated by │. The right column is the dependency graph engines.
	for (const line of output.split('\n')) {
		// Only process lines that are table rows with "node" content
		if (!line.includes('"node"')) continue

		// Split by │ delimiter — cells are: [empty, left-content, right-content, empty]
		const cells = line.split('│')
		if (cells.length < 4) continue

		// The right column (dependency graph engines) is the third cell (index 2)
		const rightCell = cells[2]
		const match = /"node":\s*"([^"]+)"/.exec(rightCell)
		if (match) {
			return match[1]
		}
	}

	return undefined
}

/**
 * Run ls-engines and return the dependency graph's engines.node range.
 */
async function getLsEnginesRange(
	packageDirectory: string,
	includeDev: boolean,
): Promise<string | undefined> {
	try {
		const args = ['--no-current', '--mode', 'actual']
		if (includeDev) {
			args.push('--dev')
		}

		const result = await execa('ls-engines', args, {
			cwd: packageDirectory,
			preferLocal: true,
			reject: false,
		})

		const output = result.stdout + '\n' + result.stderr
		return parseLsEnginesOutput(output)
	} catch {
		return undefined
	}
}

/**
 * Compute the minimum version from a semver range and format as >=X.Y.Z.
 */
function rangeToMinVersion(range: string): string | undefined {
	const minVersion = semver.minVersion(range)
	if (!minVersion) return undefined
	return `>=${minVersion.version}`
}

/**
 * Get the devEngines.runtime entry for node from a package.json object.
 */
function getDevEnginesNodeVersion(packageJson: Record<string, unknown>): string | undefined {
	// eslint-disable-next-line ts/no-unsafe-type-assertion
	const devEngines = packageJson.devEngines as DevEngines | undefined
	if (!devEngines?.runtime) return undefined

	const runtimes = Array.isArray(devEngines.runtime) ? devEngines.runtime : [devEngines.runtime]
	const nodeRuntime = runtimes.find((r) => r.name === 'node')
	return nodeRuntime?.version
}

/**
 * Set the devEngines.runtime entry for node in a package.json object.
 */
function setDevEnginesNodeVersion(packageJson: Record<string, unknown>, version: string): void {
	// eslint-disable-next-line ts/no-unsafe-type-assertion
	const devEngines = (packageJson.devEngines as DevEngines | undefined) ?? {}

	if (devEngines.runtime) {
		if (Array.isArray(devEngines.runtime)) {
			const nodeIndex = devEngines.runtime.findIndex((r) => r.name === 'node')
			if (nodeIndex === -1) {
				devEngines.runtime.push({ name: 'node', version })
			} else {
				devEngines.runtime[nodeIndex].version = version
			}
		} else if (devEngines.runtime.name === 'node') {
			devEngines.runtime.version = version
		} else {
			// Existing runtime is for a different engine, convert to array
			devEngines.runtime = [devEngines.runtime, { name: 'node', version }]
		}
	} else {
		devEngines.runtime = { name: 'node', version }
	}

	packageJson.devEngines = devEngines
}

/**
 * Remove the devEngines.runtime entry for node from a package.json object.
 */
function removeDevEnginesNodeVersion(packageJson: Record<string, unknown>): void {
	// eslint-disable-next-line ts/no-unsafe-type-assertion
	const devEngines = packageJson.devEngines as DevEngines | undefined
	if (!devEngines?.runtime) return

	if (Array.isArray(devEngines.runtime)) {
		devEngines.runtime = devEngines.runtime.filter((r) => r.name !== 'node')
		if (devEngines.runtime.length === 0) {
			delete devEngines.runtime
		} else if (devEngines.runtime.length === 1) {
			// Unwrap single-element array back to object
			devEngines.runtime = devEngines.runtime[0]
		}
	} else if (devEngines.runtime.name === 'node') {
		delete devEngines.runtime
	}

	// Clean up empty devEngines object
	if (Object.keys(devEngines).length === 0) {
		delete packageJson.devEngines
	}
}

async function nodeVersionCheck(logStream: NodeJS.WritableStream, fix: boolean): Promise<number> {
	const packageDirectory = getPackageDirectory()
	const packageJsonPath = path.join(packageDirectory, 'package.json')

	if (!fse.existsSync(packageJsonPath)) {
		return 0
	}

	// eslint-disable-next-line ts/no-unsafe-type-assertion
	const packageJson = fse.readJsonSync(packageJsonPath) as Record<string, unknown>

	// Read current values from package.json
	// eslint-disable-next-line ts/no-unsafe-type-assertion
	const enginesNode = (packageJson.engines as Record<string, string> | undefined)?.node
	const devEnginesNodeVersion = getDevEnginesNodeVersion(packageJson)

	// Compute wanted versions via ls-engines
	const productionRange = await getLsEnginesRange(packageDirectory, false)
	const allRange = await getLsEnginesRange(packageDirectory, true)

	const minNodeVersionWanted = productionRange ? rangeToMinVersion(productionRange) : undefined
	const minNodeDevVersionWanted = allRange ? rangeToMinVersion(allRange) : undefined

	const issues: string[] = []

	// --- engines.node check ---
	if (minNodeVersionWanted !== undefined) {
		if (enginesNode === undefined) {
			issues.push(`Missing engines.node — suggest setting to "${minNodeVersionWanted}"`)
			if (fix) {
				// eslint-disable-next-line ts/no-unsafe-type-assertion
				const engines = (packageJson.engines as Record<string, string> | undefined) ?? {}
				engines.node = minNodeVersionWanted
				packageJson.engines = engines
			}
		} else {
			const currentMinVersion = rangeToMinVersion(enginesNode)
			if (currentMinVersion !== minNodeVersionWanted) {
				issues.push(
					`engines.node is "${enginesNode}" but dependencies require "${minNodeVersionWanted}"`,
				)
				if (fix) {
					// eslint-disable-next-line ts/no-unsafe-type-assertion
					;(packageJson.engines as Record<string, string>).node = minNodeVersionWanted
				}
			}
		}
	}

	// --- devEngines.runtime check ---
	if (minNodeVersionWanted !== undefined && minNodeDevVersionWanted !== undefined) {
		if (minNodeVersionWanted !== minNodeDevVersionWanted) {
			// Production and dev deps have different minimum node versions
			if (devEnginesNodeVersion === undefined) {
				issues.push(
					`devDependencies require a different Node.js minimum (${minNodeDevVersionWanted}) than production (${minNodeVersionWanted}) — suggest adding devEngines.runtime for node with version "${minNodeDevVersionWanted}"`,
				)
				if (fix) {
					setDevEnginesNodeVersion(packageJson, minNodeDevVersionWanted)
				}
			} else {
				const currentDevMinVersion = rangeToMinVersion(devEnginesNodeVersion)
				if (currentDevMinVersion !== minNodeDevVersionWanted) {
					issues.push(
						`devEngines.runtime.version for node is "${devEnginesNodeVersion}" but all dependencies require "${minNodeDevVersionWanted}"`,
					)
					if (fix) {
						setDevEnginesNodeVersion(packageJson, minNodeDevVersionWanted)
					}
				}
			}
		} else if (devEnginesNodeVersion !== undefined) {
			// Same minimum for prod and dev, but devEngines.runtime is set — redundant
			issues.push(
				`devEngines.runtime.version for node is redundant (same minimum as engines.node) — suggest removing`,
			)
			if (fix) {
				removeDevEnginesNodeVersion(packageJson)
			}
		}
	}

	if (issues.length > 0) {
		logStream.write(
			`${fix ? 'Fixed' : 'Found'} ${issues.length} Node.js version ${pluralize('issue', issues.length)}:\n`,
		)
		for (const issue of issues) {
			logStream.write(`  - ${issue}\n`)
		}

		if (fix) {
			fse.writeJsonSync(packageJsonPath, packageJson, { spaces: '\t' })
			await formatFileInPlace(packageJsonPath)
			return 0
		}

		return 1
	}

	return 0
}

/**
 * Linter for Node.js version constraints in package.json.
 */
export async function nodeVersionLinterCommand(logStream: NodeJS.WritableStream) {
	return nodeVersionCheck(logStream, false)
}

/**
 * Fixer for Node.js version constraints in package.json.
 */
export async function nodeVersionFixerCommand(logStream: NodeJS.WritableStream) {
	return nodeVersionCheck(logStream, true)
}
