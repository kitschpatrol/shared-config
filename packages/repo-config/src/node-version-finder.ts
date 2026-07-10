import type { PackageSnapshots, ProjectId } from '@pnpm/lockfile.types'
import { readWantedLockfile } from '@pnpm/lockfile.fs'
import fse from 'fs-extra'
import path from 'node:path'
import { gt, minVersion } from 'semver'
import { getWorkspaceRoot } from '../../../src/path-utilities'

const LOCKFILE_NAME = 'pnpm-lock.yaml'

type ConstraintInfo =
	| undefined
	| {
			/**
			 * Direct dependencies responsible for the highest minimum Node.js
			 * version.
			 */
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
	/**
	 * Overall minimum compatible Node.js version as a `>=` semver range. The
	 * greater of `dependencies` and `devDependencies`.
	 */
	version: string | undefined
}

/**
 * Find the directory containing pnpm-lock.yaml by walking up from
 * `startDirectory`, bounded by the workspace root (or closest package directory
 * if not in a monorepo).
 */
function findLockfileDirectory(startDirectory: string): string | undefined {
	const root = getWorkspaceRoot()
	let current = path.resolve(startDirectory)

	// eslint-disable-next-line ts/no-unnecessary-condition
	while (true) {
		if (fse.existsSync(path.join(current, LOCKFILE_NAME))) {
			return current
		}

		if (current === root) {
			break
		}

		const parent = path.dirname(current)
		if (parent === current) {
			break
		}

		current = parent
	}

	return undefined
}

/**
 * Resolve a dependency name + version ref to a key in the packages map. Handles
 * peer-dependency suffixes, e.g. "1001.1.30(@pnpm/logger@1001.0.1)".
 */
function resolvePackageKey(
	dependencyName: string,
	versionRef: string,
	packages: PackageSnapshots,
): string | undefined {
	// Try name@version first (most common)
	const full = `${dependencyName}@${versionRef}`
	if (Object.hasOwn(packages, full)) {
		return full
	}

	// Try just the version ref (it might already be a full key with peer suffixes)
	if (Object.hasOwn(packages, versionRef)) {
		return versionRef
	}

	return undefined
}

/**
 * Pick the greater of two optional semver versions, preferring `b` on ties.
 * Empty strings are treated as missing values.
 */
function pickGreaterVersion(a: string | undefined, b: string | undefined): string | undefined {
	if (a === undefined || a === '') {
		return b === undefined || b === '' ? undefined : b
	}

	if (b === undefined || b === '') {
		return a
	}

	return gt(a, b) ? a : b
}

/**
 * Reads the pnpm lockfile and returns the minimum compatible Node.js version
 * for dependencies and devDependencies, based on `engines.node` declarations
 * across the entire transitive dependency tree.
 */
export async function getMinimumNodeVersions(projectPath: string): Promise<MinimumNodeVersions> {
	const lockfileDirectory = findLockfileDirectory(projectPath)
	if (lockfileDirectory === undefined || lockfileDirectory === '') {
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

	function getSubtreeMaxNode(dependencyName: string, dependencyRef: string): string | undefined {
		let treeMaxNode: string | undefined
		const visited = new Set<string>()

		function traverse(name: string, versionRef: string) {
			if (versionRef.startsWith('link:')) {
				return
			}

			const key = resolvePackageKey(name, versionRef, packages)
			if (key === undefined || key === '' || visited.has(key)) {
				return
			}

			visited.add(key)

			const pkg = packages[key as keyof PackageSnapshots]
			if (pkg === undefined) {
				return
			}

			const engine = pkg.engines?.node

			if (engine !== undefined && engine !== '') {
				const pkgMin = minVersion(engine)?.version
				if (
					pkgMin !== undefined &&
					pkgMin !== '' &&
					(treeMaxNode === undefined || treeMaxNode === '' || gt(pkgMin, treeMaxNode))
				) {
					treeMaxNode = pkgMin
				}
			}

			// Traverse transitive dependencies
			if (pkg.dependencies) {
				for (const [childName, childRef] of Object.entries(pkg.dependencies)) {
					traverse(childName, childRef)
				}
			}
		}

		traverse(dependencyName, dependencyRef)
		return treeMaxNode
	}

	function processDependencies(
		dependencies: Record<string, string | { version: string }>,
		isDev: boolean,
	) {
		for (const [dependencyName, dependencyRef] of Object.entries(dependencies)) {
			const versionString =
				typeof dependencyRef === 'string' ? dependencyRef : dependencyRef.version
			const treeMax = getSubtreeMaxNode(dependencyName, versionString)

			if (treeMax !== undefined && treeMax !== '') {
				const causes = isDev ? devCauses : productionCauses
				causes[treeMax] ??= new Set()
				causes[treeMax].add(dependencyName)

				const currentMax = isDev ? overallDevMax : overallProductionMax
				if (currentMax === undefined || currentMax === '' || gt(treeMax, currentMax)) {
					if (isDev) {
						overallDevMax = treeMax
					} else {
						overallProductionMax = treeMax
					}
				}
			}
		}
	}

	// Only process the importer matching the requested project path, so that
	// each workspace package gets its own per-package engine constraints.
	const relativeProjectPath = path.relative(lockfileDirectory, projectPath)
	const importerKey = relativeProjectPath === '' ? '.' : relativeProjectPath
	const importer = lockfile.importers[importerKey as ProjectId]
	if (importer !== undefined) {
		if (importer.dependencies) {
			processDependencies(importer.dependencies, false)
		}

		if (importer.devDependencies) {
			processDependencies(importer.devDependencies, true)
		}
	}

	const overallMax = pickGreaterVersion(overallProductionMax, overallDevMax)
	const version = overallMax === undefined ? undefined : `>=${overallMax}`

	return {
		dependencies:
			overallProductionMax !== undefined && overallProductionMax !== ''
				? {
						topLevelCauses: [...(productionCauses[overallProductionMax] ?? [])],
						version: `>=${overallProductionMax}`,
					}
				: undefined,
		devDependencies:
			overallDevMax !== undefined && overallDevMax !== ''
				? {
						topLevelCauses: [...(devCauses[overallDevMax] ?? [])],
						version: `>=${overallDevMax}`,
					}
				: undefined,
		lockfile: lockfilePath,
		version,
	}
}
