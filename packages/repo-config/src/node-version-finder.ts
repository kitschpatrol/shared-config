/* eslint-disable ts/no-unsafe-argument */
/* eslint-disable ts/no-unsafe-member-access */
/* eslint-disable ts/no-unsafe-assignment */
import type { PackageSnapshots } from '@pnpm/lockfile.types'
import { readWantedLockfile } from '@pnpm/lockfile.fs'
import fse from 'fs-extra'
import path from 'node:path'
import { gt, minVersion } from 'semver'
import { getWorkspaceRoot } from '../../../src/path-utilities'

const LOCKFILE_NAME = 'pnpm-lock.yaml'

type ConstraintInfo =
	| undefined
	| {
			/** Direct dependencies responsible for the highest minimum Node.js version. */
			topLevelCauses: string[]
			/** Minimum compatible Node.js version as a `>=` semver range. */
			version: string
	  }

type MinimumNodeVersions = {
	/** Minimum Node.js version constraint from production dependencies. */
	dependencies: ConstraintInfo
	/** Minimum Node.js version constraint from dev dependencies. */
	devDependencies: ConstraintInfo
	/** Absolute path to the pnpm lockfile used. */
	lockfile: string
	/** Overall minimum compatible Node.js version as a `>=` semver range. The greater of `dependencies` and `devDependencies`. */
	version: string | undefined
}

/**
 * Find the directory containing pnpm-lock.yaml by walking up from `startDirectory`,
 * bounded by the workspace root (or closest package directory if not in a monorepo).
 */
function findLockfileDirectory(startDirectory: string): string | undefined {
	const root = getWorkspaceRoot()
	let current = path.resolve(startDirectory)

	// eslint-disable-next-line ts/no-unnecessary-condition
	while (true) {
		if (fse.existsSync(path.join(current, LOCKFILE_NAME))) {
			return current
		}

		if (current === root) break

		const parent = path.dirname(current)
		if (parent === current) break
		current = parent
	}

	return undefined
}

/**
 * Resolve a dependency name + version ref to a key in the packages map.
 * Handles peer-dependency suffixes, e.g. "1001.1.30(@pnpm/logger@1001.0.1)".
 */
function resolvePackageKey(
	depName: string,
	versionRef: string,
	packages: PackageSnapshots,
): string | undefined {
	// Try name@version first (most common)
	const full = `${depName}@${versionRef}`
	if (full in packages) return full

	// Try just the version ref (it might already be a full key with peer suffixes)
	if (versionRef in packages) return versionRef

	return undefined
}

/**
 * Reads the pnpm lockfile and returns the minimum compatible Node.js version
 * for dependencies and devDependencies, based on `engines.node` declarations
 * across the entire transitive dependency tree.
 */
export async function getMinimumNodeVersions(projectPath: string): Promise<MinimumNodeVersions> {
	const lockfileDirectory = findLockfileDirectory(projectPath)
	if (!lockfileDirectory) {
		throw new Error(`${LOCKFILE_NAME} not found at or above "${projectPath}".`)
	}

	const lockfilePath = path.join(lockfileDirectory, LOCKFILE_NAME)

	const lockfile = await readWantedLockfile(lockfileDirectory, {
		ignoreIncompatible: false,
	})

	if (!lockfile?.importers) {
		throw new Error(`Lockfile at "${lockfilePath}" is unreadable or missing importers.`)
	}

	// In this version of @pnpm/lockfile.fs, snapshots are merged into packages
	const packages: PackageSnapshots = lockfile.packages ?? {}

	let overallProductionMax: string | undefined
	let overallDevMax: string | undefined

	const productionCauses: Record<string, Set<string>> = {}
	const devCauses: Record<string, Set<string>> = {}

	function getSubtreeMaxNode(depName: string, depRef: string): string | undefined {
		let treeMaxNode: string | undefined
		const visited = new Set<string>()

		function traverse(name: string, versionRef: string) {
			if (versionRef.startsWith('link:')) return

			const key = resolvePackageKey(name, versionRef, packages)
			if (!key || visited.has(key)) return
			visited.add(key)

			// @ts-expect-error - Type issues
			const pkg = packages[key]
			const engine = pkg?.engines?.node

			if (engine) {
				const pkgMin = minVersion(engine)?.version
				if (pkgMin && (!treeMaxNode || gt(pkgMin, treeMaxNode))) {
					treeMaxNode = pkgMin
				}
			}

			// Traverse transitive dependencies
			if (pkg?.dependencies) {
				for (const [childName, childRef] of Object.entries(pkg.dependencies)) {
					if (typeof childRef === 'string') {
						traverse(childName, childRef)
					}
				}
			}
		}

		traverse(depName, depRef)
		return treeMaxNode
	}

	function processDependencies(
		dependencies: Record<string, string | { version: string }>,
		isDev: boolean,
	) {
		for (const [depName, depRef] of Object.entries(dependencies)) {
			const versionString = typeof depRef === 'string' ? depRef : depRef.version
			const treeMax = getSubtreeMaxNode(depName, versionString)

			if (treeMax) {
				const causes = isDev ? devCauses : productionCauses
				causes[treeMax] ??= new Set()
				causes[treeMax].add(depName)

				const currentMax = isDev ? overallDevMax : overallProductionMax
				if (!currentMax || gt(treeMax, currentMax)) {
					if (isDev) overallDevMax = treeMax
					else overallProductionMax = treeMax
				}
			}
		}
	}

	// Only process the importer matching the requested project path, so that
	// each workspace package gets its own per-package engine constraints.
	const importerKey = path.relative(lockfileDirectory, projectPath) || '.'
	// @ts-expect-error - String key
	const importer = lockfile.importers[importerKey]
	if (importer) {
		if (importer.dependencies) processDependencies(importer.dependencies, false)
		if (importer.devDependencies) processDependencies(importer.devDependencies, true)
	}

	const version =
		overallProductionMax && overallDevMax
			? gt(overallProductionMax, overallDevMax)
				? `>=${overallProductionMax}`
				: `>=${overallDevMax}`
			: overallProductionMax
				? `>=${overallProductionMax}`
				: overallDevMax
					? `>=${overallDevMax}`
					: undefined

	return {
		dependencies: overallProductionMax
			? {
					topLevelCauses: [...productionCauses[overallProductionMax]],
					version: `>=${overallProductionMax}`,
				}
			: undefined,
		devDependencies: overallDevMax
			? {
					topLevelCauses: [...devCauses[overallDevMax]],
					version: `>=${overallDevMax}`,
				}
			: undefined,
		lockfile: lockfilePath,
		version,
	}
}
