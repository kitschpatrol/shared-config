/* eslint-disable complexity */
import fse from 'fs-extra'
import path from 'node:path'
import semver from 'semver'
import { stringify } from '../../../src/json-utilities'
import { findWorkspacePackageDirectories, getPackageDirectory } from '../../../src/path-utilities'
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

async function nodeVersionCheckSingle(
	logStream: NodeJS.WritableStream,
	fix: boolean,
	packageDirectory: string,
): Promise<number> {
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

	const enginesNodeVersionWanted = nodeVersions.dependencies?.version
	const enginesNodeCauses = nodeVersions.dependencies?.topLevelCauses ?? []
	const devEnginesVersionWanted = nodeVersions.version
	const devCauses = nodeVersions.devDependencies?.topLevelCauses ?? []

	const issues: string[] = []

	// --- engines.node check ---
	if (enginesNodeVersionWanted !== undefined) {
		if (enginesNode === undefined) {
			issues.push(
				`Missing engines.node — suggest setting to "${enginesNodeVersionWanted}"${formatCauses(enginesNodeCauses)}`,
			)
			if (fix) {
				// eslint-disable-next-line ts/no-unsafe-type-assertion
				const engines = (packageJson.engines as Record<string, string> | undefined) ?? {}
				engines.node = enginesNodeVersionWanted
				packageJson.engines = engines
			}
		} else {
			const currentMin = semver.minVersion(enginesNode)
			const wantedMin = semver.minVersion(enginesNodeVersionWanted)
			if (currentMin && wantedMin && semver.lt(currentMin, wantedMin)) {
				issues.push(
					`engines.node is "${enginesNode}" but production dependencies require at least "${enginesNodeVersionWanted}"${formatCauses(enginesNodeCauses)}`,
				)
				if (fix) {
					// eslint-disable-next-line ts/no-unsafe-type-assertion
					;(packageJson.engines as Record<string, string>).node = enginesNodeVersionWanted
				}
			}
		}
	}

	// --- devEngines.runtime check ---
	// Compare against the effective engines.node: the higher of what prod deps require
	// and what's already set (the engines.node check only upgrades, never downgrades).
	const effectiveEnginesNode = (() => {
		if (enginesNodeVersionWanted && enginesNode) {
			const wantedMin = semver.minVersion(enginesNodeVersionWanted)
			const currentMin = semver.minVersion(enginesNode)
			if (wantedMin && currentMin) {
				return semver.gt(wantedMin, currentMin) ? enginesNodeVersionWanted : enginesNode
			}
		}

		return enginesNodeVersionWanted ?? enginesNode
	})()
	const effectiveEnginesNodeMin = effectiveEnginesNode
		? semver.minVersion(effectiveEnginesNode)
		: undefined
	const devWantedMin = devEnginesVersionWanted
		? semver.minVersion(devEnginesVersionWanted)
		: undefined

	const devEnginesNeeded =
		devWantedMin && (!effectiveEnginesNodeMin || semver.gt(devWantedMin, effectiveEnginesNodeMin))

	if (devEnginesVersionWanted !== undefined && devEnginesNeeded) {
		// Dev deps require a higher Node.js minimum than engines.node
		if (devEnginesNodeVersion === undefined) {
			issues.push(
				`devDependencies require a higher Node.js minimum (${devEnginesVersionWanted}) than engines.node (${effectiveEnginesNode ?? 'none'}) — suggest adding devEngines.runtime for node with version "${devEnginesVersionWanted}"${formatCauses(devCauses)}`,
			)
			if (fix) {
				setDevEnginesNodeVersion(packageJson, devEnginesVersionWanted)
			}
		} else {
			const currentDevMin = semver.minVersion(devEnginesNodeVersion)
			if (currentDevMin && semver.lt(currentDevMin, devWantedMin)) {
				issues.push(
					`devEngines.runtime.version for node is "${devEnginesNodeVersion}" but all dependencies require at least "${devEnginesVersionWanted}"${formatCauses(devCauses)}`,
				)
				if (fix) {
					setDevEnginesNodeVersion(packageJson, devEnginesVersionWanted)
				}
			}
		}
	} else if (devEnginesNodeVersion !== undefined) {
		// DevEngines.runtime is set but redundant (engines.node already covers it)
		const currentDevMin = semver.minVersion(devEnginesNodeVersion)
		if (
			currentDevMin &&
			effectiveEnginesNodeMin &&
			semver.lte(currentDevMin, effectiveEnginesNodeMin)
		) {
			issues.push(
				`devEngines.runtime.version for node is redundant (engines.node already covers the requirement) — suggest removing`,
			)
			if (fix) {
				removeDevEnginesNodeVersion(packageJson)
			}
		}
	}

	if (issues.length > 0) {
		logStream.write(
			`${fix ? 'Fixed' : 'Found'} ${issues.length} Node.js version ${pluralize('issue', issues.length)} in ${packageJsonPath}:\n`,
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

async function nodeVersionCheck(logStream: NodeJS.WritableStream, fix: boolean): Promise<number> {
	const packageDirectories = findWorkspacePackageDirectories()
	let exitCode = 0

	for (const packageDirectory of packageDirectories) {
		const result = await nodeVersionCheckSingle(logStream, fix, packageDirectory)
		if (result !== 0) exitCode = 1
	}

	return exitCode
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
