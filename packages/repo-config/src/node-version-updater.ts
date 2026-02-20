/* eslint-disable complexity */
/* eslint-disable max-depth */
import fse from 'fs-extra'
import path from 'node:path'
import semver from 'semver'
import { stringify } from '../../../src/json-utilities'
import { getPackageDirectory } from '../../../src/path-utilities'
import { formatFileInPlace } from '../../../src/prettier-utilities'
import { pluralize } from '../../../src/string-utilities'
import { getMinimumNodeVersions } from './node-version-finder'

type DevEngineRuntime = {
	name: string
	onFail?: string
	version?: string
}

type DevEngines = {
	runtime?: DevEngineRuntime | DevEngineRuntime[]
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

function formatCauses(causes: string[]): string {
	if (causes.length === 0) return ''
	return ` (from ${causes.join(', ')})`
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

	// Compute wanted versions from the pnpm lockfile
	const nodeVersions = await getMinimumNodeVersions(packageDirectory)

	const minNodeVersionWanted = nodeVersions.dependencies?.version
	const minNodeDevVersionWanted = nodeVersions.version
	const productionCauses = nodeVersions.dependencies?.topLevelCauses ?? []
	const devCauses = nodeVersions.devDependencies?.topLevelCauses ?? []

	const issues: string[] = []

	// --- engines.node check ---
	if (minNodeVersionWanted !== undefined) {
		if (enginesNode === undefined) {
			issues.push(
				`Missing engines.node — suggest setting to "${minNodeVersionWanted}"${formatCauses(productionCauses)}`,
			)
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
					`engines.node is "${enginesNode}" but dependencies require "${minNodeVersionWanted}"${formatCauses(productionCauses)}`,
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
					`devDependencies require a different Node.js minimum (${minNodeDevVersionWanted}) than production (${minNodeVersionWanted}) — suggest adding devEngines.runtime for node with version "${minNodeDevVersionWanted}"${formatCauses(devCauses)}`,
				)
				if (fix) {
					setDevEnginesNodeVersion(packageJson, minNodeDevVersionWanted)
				}
			} else {
				const currentDevMinVersion = rangeToMinVersion(devEnginesNodeVersion)
				if (currentDevMinVersion !== minNodeDevVersionWanted) {
					issues.push(
						`devEngines.runtime.version for node is "${devEnginesNodeVersion}" but all dependencies require "${minNodeDevVersionWanted}"${formatCauses(devCauses)}`,
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
 * Print minimum Node.js version constraints from the pnpm lockfile.
 */
export async function printNodeVersionCommand(logStream: NodeJS.WritableStream) {
	const result = await getMinimumNodeVersions(getPackageDirectory())
	const prettyAndColorfulJsonLines = stringify(result).split('\n')
	for (const line of prettyAndColorfulJsonLines) {
		logStream.write(`${line}\n`)
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
