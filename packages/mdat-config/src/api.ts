import type { expandString, mergeConfig } from 'mdat'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { MdatConfig } from './config.js'
import { sharedMdatConfig } from './config.js'

// --- Cached singletons ---

type MdatApi = {
	expandString: typeof expandString
	mergeConfig: typeof mergeConfig
}

let mdatModule: MdatApi | undefined

const MARKDOWN_EXTENSIONS = new Set(['.markdown', '.md'])

async function getMdat(): Promise<MdatApi> {
	if (!mdatModule) {
		const importedModule = await import('mdat')
		mdatModule = {
			expandString: importedModule.expandString,
			mergeConfig: importedModule.mergeConfig,
		}
	}

	return mdatModule
}

// --- Public API ---

/**
 * Expand Mdat comment placeholders in a Markdown string using the shared
 * configuration.
 *
 * @param source - The Markdown source string.
 * @param config - Optional `MdatConfig` overrides merged on top of the shared
 *   config.
 *
 * @returns The expanded Markdown string.
 */
export async function fix(source: string, config?: MdatConfig): Promise<string> {
	const { expandString: expand, mergeConfig: merge } = await getMdat()
	const effectiveConfig = config ? merge(sharedMdatConfig, config) : sharedMdatConfig
	const result = await expand(source, effectiveConfig, { format: true })
	return String(result)
}

/**
 * Expand Mdat comment placeholders in a Markdown file in place using the shared
 * configuration.
 *
 * Non-Markdown files are left unchanged.
 *
 * @param filePath - Path to the Markdown file.
 * @param config - Optional `MdatConfig` overrides merged on top of the shared
 *   config.
 */
export async function fixFile(filePath: string, config?: MdatConfig): Promise<void> {
	if (!MARKDOWN_EXTENSIONS.has(path.extname(filePath).toLowerCase())) {
		return
	}

	const content = await fs.readFile(filePath, 'utf8')
	const { expandString: expand, mergeConfig: merge } = await getMdat()
	const effectiveConfig = config ? merge(sharedMdatConfig, config) : sharedMdatConfig
	const result = await expand(content, effectiveConfig, { format: true })
	await fs.writeFile(filePath, String(result), 'utf8')
}

/**
 * Clear the cached Mdat module. Subsequent calls to `fix` or `fixFile` will
 * re-import Mdat.
 */
export function clearCache(): void {
	mdatModule = undefined
}
