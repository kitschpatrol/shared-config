import type eslint from 'eslint'
import type { ESLint as ESLintClass } from 'eslint'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { OptionsConfig } from './types.js'
import { eslintConfig } from './config.js'

/**
 * File extension or filepath hint for parser inference. Accepts a bare
 * extension (e.g. `'tsx'`), a virtual filename (e.g. `'file.tsx'`), or a full
 * path. Known extensions supported by the default shared config are offered as
 * autocomplete suggestions.
 */
export type FileType =
	| 'astro'
	| 'cjs'
	| 'cjsx'
	| 'cts'
	| 'ctsx'
	| 'html'
	| 'js'
	| 'json5'
	| 'json'
	| 'jsonc'
	| 'jsx'
	| 'md'
	| 'mdx'
	| 'mjs'
	| 'mjsx'
	| 'mts'
	| 'mtsx'
	| 'svelte'
	| 'toml'
	| 'ts'
	| 'tsx'
	| 'yaml'
	| 'yml'
	| (string & {})

const PATH_CHARACTER_REGEX = /[./\\]/

/** Convert a bare extension to a virtual filepath, or pass through as-is. */
function resolveFileType(fileType: string): string {
	if (PATH_CHARACTER_REGEX.test(fileType)) return fileType
	return `file.${fileType}`
}

// --- Cached singletons ---

type EslintModule = typeof eslint
let eslintModule: EslintModule | undefined
let cachedInstances: Map<string, ESLintClass> | undefined

async function getEslintModule(): Promise<EslintModule> {
	eslintModule ??= await import('eslint')
	return eslintModule
}

async function getEslintInstance(options?: OptionsConfig): Promise<ESLintClass> {
	cachedInstances ??= new Map()

	const key = JSON.stringify(options ?? {})

	if (!cachedInstances.has(key)) {
		// eslint-disable-next-line ts/naming-convention
		const { ESLint } = await getEslintModule()
		// FlatConfigComposer is thenable — awaiting it resolves to the flat config array
		const configs = await eslintConfig({ isInEditor: false, ...options })

		const instance = new ESLint({
			baseConfig: [
				...configs,
				// Allow virtual/out-of-project files to use type-aware linting
				{
					languageOptions: {
						parserOptions: {
							projectService: {
								allowDefaultProject: ['*.ts', '*.tsx', '*.js', '*.jsx'],
							},
						},
					},
				},
			],
			fix: true,
			// Prevent ESLint from loading the project's eslint.config.ts on top of ours
			overrideConfigFile: true,
		})

		cachedInstances.set(key, instance)
	}

	return cachedInstances.get(key)!
}

// --- Public API ---

/**
 * Lint and fix a source string using the shared ESLint configuration.
 *
 * @param source - The source code to lint and fix.
 * @param fileTypeOrConfig - A file extension (e.g. `'tsx'`), virtual filepath
 *   (e.g. `'file.tsx'`), or an `OptionsConfig` object for configuration.
 *   Defaults to `'ts'`.
 * @param config - Optional `OptionsConfig` when a file type is provided as the
 *   second argument.
 *
 * @returns The fixed source string.
 */
export async function fix(
	source: string,
	fileTypeOrConfig?: FileType | OptionsConfig,
	config?: OptionsConfig,
): Promise<string> {
	let filepath = 'file.ts'
	let options: OptionsConfig | undefined = config

	if (typeof fileTypeOrConfig === 'string') {
		filepath = resolveFileType(fileTypeOrConfig)
	} else if (fileTypeOrConfig !== undefined) {
		options = fileTypeOrConfig
	}

	const eslint = await getEslintInstance(options)
	const [result] = await eslint.lintText(source, { filePath: filepath })

	return result.output ?? source
}

/**
 * Lint and fix a file in place using the shared ESLint configuration.
 *
 * @param filePath - Path to the file to lint and fix.
 * @param config - Optional `OptionsConfig` for configuration.
 */
export async function fixFile(filePath: string, config?: OptionsConfig): Promise<void> {
	const content = await fs.readFile(filePath, 'utf8')
	const eslint = await getEslintInstance(config)
	// Use basename so the virtual filepath matches allowDefaultProject globs
	const [result] = await eslint.lintText(content, { filePath: path.basename(filePath) })

	if (result.output !== undefined) {
		await fs.writeFile(filePath, result.output, 'utf8')
	}
}

/**
 * Clear the cached ESLint module and instances. Subsequent calls to `fix` or
 * `fixFile` will re-import ESLint and re-create instances.
 */
export function clearCache(): void {
	eslintModule = undefined
	cachedInstances = undefined
}
