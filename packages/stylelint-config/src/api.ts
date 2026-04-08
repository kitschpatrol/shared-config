import type stylelint from 'stylelint'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { StylelintConfig } from './config.js'
import { sharedStylelintConfig } from './config.js'

/**
 * File extension or filepath hint for syntax inference. Accepts a bare
 * extension (e.g. `'scss'`), a virtual filename (e.g. `'file.scss'`), or a full
 * path. Known extensions supported by the default shared config are offered as
 * autocomplete suggestions.
 */
export type FileType =
	| 'astro'
	| 'css'
	| 'html'
	| 'jsx'
	| 'php'
	| 'sass'
	| 'scss'
	| 'svelte'
	| 'tsx'
	| 'vue'
	| (string & {})

const PATH_CHARACTER_REGEX = /[./\\]/

/** Convert a bare extension to a virtual filepath, or pass through as-is. */
function resolveFileType(fileType: string): string {
	if (PATH_CHARACTER_REGEX.test(fileType)) return fileType
	return `file.${fileType}`
}

// --- Cached singletons ---

type Stylelint = typeof stylelint
let stylelintModule: Stylelint | undefined

async function getStylelint(): Promise<Stylelint> {
	if (!stylelintModule) {
		const importedModule = await import('stylelint')
		// Stylelint uses a default export containing lint, resolveConfig, etc.
		stylelintModule = importedModule.default
	}

	return stylelintModule
}

// --- Public API ---

/**
 * Lint and fix a CSS source string using the shared Stylelint configuration.
 *
 * @param source - The CSS source code to lint and fix.
 * @param fileTypeOrConfig - A file extension (e.g. `'scss'`), virtual filepath
 *   (e.g. `'file.scss'`), or a `StylelintConfig` object for overrides. Defaults
 *   to `'css'`.
 * @param config - Optional `StylelintConfig` overrides when a file type is
 *   provided as the second argument.
 *
 * @returns The fixed CSS source string.
 */
export async function fix(
	source: string,
	fileTypeOrConfig?: FileType | StylelintConfig,
	config?: StylelintConfig,
): Promise<string> {
	let filepath = 'file.css'
	let overrides: StylelintConfig | undefined = config

	if (typeof fileTypeOrConfig === 'string') {
		filepath = resolveFileType(fileTypeOrConfig)
	} else if (fileTypeOrConfig !== undefined) {
		overrides = fileTypeOrConfig
	}

	const { lint } = await getStylelint()
	const result = await lint({
		code: source,
		codeFilename: filepath,
		config: overrides
			? {
					...sharedStylelintConfig,
					...overrides,
					rules: { ...sharedStylelintConfig.rules, ...overrides.rules },
				}
			: sharedStylelintConfig,
		fix: true,
	})

	return result.code ?? source
}

/**
 * Lint and fix a CSS file in place using the shared Stylelint configuration.
 *
 * @param filePath - Path to the file to lint and fix.
 * @param config - Optional `StylelintConfig` overrides.
 */
export async function fixFile(filePath: string, config?: StylelintConfig): Promise<void> {
	const content = await fs.readFile(filePath, 'utf8')
	const { lint } = await getStylelint()
	const result = await lint({
		code: content,
		codeFilename: path.basename(filePath),
		config: config
			? {
					...sharedStylelintConfig,
					...config,
					rules: { ...sharedStylelintConfig.rules, ...config.rules },
				}
			: sharedStylelintConfig,
		fix: true,
	})

	if (result.code !== undefined) {
		await fs.writeFile(filePath, result.code, 'utf8')
	}
}

/**
 * Clear the cached Stylelint module. Subsequent calls to `fix` or `fixFile`
 * will re-import Stylelint.
 */
export function clearCache(): void {
	stylelintModule = undefined
}
