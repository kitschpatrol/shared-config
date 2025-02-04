/* eslint-disable import/no-named-as-default-member */

import { findWorkspaces, findWorkspacesRoot } from 'find-workspaces'
// eslint-disable-next-line import/default
import fse from 'fs-extra'
import path from 'node:path'
import { packageUpSync } from 'package-up'

function isDirectoryBelow(directory: string, parent: string): boolean {
	return directory.startsWith(parent + path.sep)
}

/**
 * Returns list of package directories at or below the current working directory. Useful for monorepos. If not in a monorepo, returns the closest package directory.
 * @example
 * Calling from `/Users/mika/Code/shared-config` will yield:
 * ```ts
 * [
 *  '/Users/mika/Code/shared-config',
 *  '/Users/mika/Code/shared-config/packages/cspell-config',
 *  '/Users/mika/Code/shared-config/packages/eslint-config',
 *  '/Users/mika/Code/shared-config/packages/knip-config',
 *  '/Users/mika/Code/shared-config/packages/mdat-config',
 *  '/Users/mika/Code/shared-config/packages/prettier-config',
 *  '/Users/mika/Code/shared-config/packages/remark-config',
 *  '/Users/mika/Code/shared-config/packages/repo-config',
 *  '/Users/mika/Code/shared-config/packages/shared-config',
 *  '/Users/mika/Code/shared-config/packages/stylelint-config',
 *  '/Users/mika/Code/shared-config/packages/typescript-config',
 * ]
 * ```
 *
 * While calling from `/Users/mika/Code/shared-config/packages/mdat-config` will yield:
 * ```ts
 * [
 * '/Users/mika/Code/shared-config/packages/mdat-config',
 * ]
 * ```
 */
export function findWorkspacePackageDirectories(): string[] {
	const packageDirectory = getPackageDirectory()

	const directories = new Set<string>()
	directories.add(packageDirectory)

	// Find all workspaces
	const workspaces = findWorkspaces()
	if (workspaces !== null) {
		for (const workspace of workspaces) {
			if (isDirectoryBelow(workspace.location, packageDirectory)) {
				directories.add(workspace.location)
			}
		}
	}

	return [...directories]
}

/**
 * Returns the closest package directory to the current working directory. Throws an error if no package.json is found.
 */
export function getPackageDirectory(): string {
	const closestPackage = packageUpSync()
	if (closestPackage === undefined) {
		throw new Error('No package.json found.')
	}

	return path.dirname(closestPackage)
}

/**
 * True if the project is a monorepo.
 */
export function isMonorepo(): boolean {
	return findWorkspacesRoot() !== null
}

/**
 * Returns the root of the monorepo if you're in one, or the closest package directory if not in a monorepo.
 */
export function getWorkspaceRoot(): string {
	const workspaceRoot = findWorkspacesRoot()
	if (workspaceRoot !== null) {
		return workspaceRoot.location
	}

	return getPackageDirectory()
}

/**
 * Useful for searching for ignored files in the root of the workspace.
 */
export function getFilePathAtProjectRoot(fileName: string): string | undefined {
	const filePath = path.join(getWorkspaceRoot(), fileName)

	if (fse.existsSync(filePath)) {
		return filePath
	}

	return undefined
}

export type CwdOverrideOptions = 'package-dir' | 'workspace-root' | (string & {})
/**
 * Tries to get a specific cwd override, and safely falls back depending on monorepo etc.
 */
export function getCwdOverride(option?: CwdOverrideOptions): string {
	if (option === 'workspace-root') {
		// Falls back to package if not in a monorepo
		return getWorkspaceRoot()
	}

	if (option === 'package-dir') {
		return getPackageDirectory()
	}

	if (typeof option === 'string') {
		if (!fse.pathExistsSync(option)) {
			throw new Error(`Custom cwd directory does not exist: ${option}`)
		}
		return option
	}

	return process.cwd()
}
