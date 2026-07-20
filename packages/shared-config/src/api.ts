import type { FileType } from '@kitschpatrol/prettier-config'
import {
	clearCache as eslintClearCache,
	fix as eslintFix,
	fixFile as eslintFixFile,
} from '@kitschpatrol/eslint-config'
import {
	clearCache as mdatClearCache,
	fix as mdatFix,
	fixFile as mdatFixFile,
} from '@kitschpatrol/mdat-config'
import {
	clearCache as prettierClearCache,
	fix as prettierFix,
	fixFile as prettierFixFile,
} from '@kitschpatrol/prettier-config'
import {
	clearCache as stylelintClearCache,
	fix as stylelintFix,
	fixFile as stylelintFixFile,
} from '@kitschpatrol/stylelint-config'
import path from 'node:path'

// Ordered to match CLI `ksc fix`: mdat (2) → eslint (4) → stylelint (5) → prettier (9)

const MARKDOWN_EXTENSIONS = new Set(['markdown', 'md'])
const DOT_PREFIX_REGEX = /^\./v

/** Return whether a file type hint or path identifies a Markdown file. */
function isMarkdown(fileTypeOrPath: string | undefined): boolean {
	if (fileTypeOrPath === undefined) {
		return false
	}

	const pathExtension = path.extname(fileTypeOrPath)
	const extension = pathExtension === '' ? fileTypeOrPath : pathExtension
	return MARKDOWN_EXTENSIONS.has(extension.replace(DOT_PREFIX_REGEX, '').toLowerCase())
}

/**
 * Fix a source string by running all shared-config tools in sequence: Mdat →
 * ESLint → Stylelint → Prettier. Mdat only runs for Markdown file type hints.
 * ESLint and Stylelint silently skip content they don't understand, while
 * Prettier errors are propagated.
 *
 * @param source - The source code to fix.
 * @param fileType - A file extension (e.g. `'ts'`, `'css'`, `'md'`) or virtual
 *   filepath for parser inference. Defaults to `'ts'`.
 *
 * @returns The fixed source string.
 */
export async function fix(source: string, fileType?: FileType): Promise<string> {
	let result = source

	if (isMarkdown(fileType)) {
		result = await mdatFix(result)
	}

	try {
		result = await eslintFix(result, fileType)
	} catch {}

	try {
		result = await stylelintFix(result, fileType)
	} catch {}

	result = await prettierFix(result, fileType)

	return result
}

/**
 * Fix a file in place by running all shared-config tools in sequence: Mdat →
 * ESLint → Stylelint → Prettier. Mdat only runs for Markdown files. ESLint and
 * Stylelint silently skip files they don't understand, while Prettier errors
 * are propagated.
 *
 * @param filePath - Path to the file to fix.
 */
export async function fixFile(filePath: string): Promise<void> {
	if (isMarkdown(filePath)) {
		await mdatFixFile(filePath)
	}

	try {
		await eslintFixFile(filePath)
	} catch {}

	try {
		await stylelintFixFile(filePath)
	} catch {}

	await prettierFixFile(filePath)
}

/**
 * Clear all cached tool modules and instances. Subsequent calls to `fix` or
 * `fixFile` will re-import all tools.
 */
export function clearCache(): void {
	mdatClearCache()
	eslintClearCache()
	stylelintClearCache()
	prettierClearCache()
}

export type { FileType } from '@kitschpatrol/prettier-config'
