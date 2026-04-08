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

// Ordered to match CLI `ksc fix`: mdat (2) → eslint (4) → stylelint (5) → prettier (9)

/**
 * Fix a source string by running all shared-config tools in sequence: Mdat →
 * ESLint → Stylelint → Prettier. Each tool silently skips content it doesn't
 * understand.
 *
 * @param source - The source code to fix.
 * @param fileType - A file extension (e.g. `'ts'`, `'css'`, `'md'`) or virtual
 *   filepath for parser inference. Defaults to `'ts'`.
 *
 * @returns The fixed source string.
 */
export async function fix(source: string, fileType?: FileType): Promise<string> {
	let result = source

	// Separate try-catch blocks allow partial failure / fall-through
	try {
		result = await mdatFix(result)
	} catch {}

	try {
		result = await eslintFix(result, fileType)
	} catch {}

	try {
		result = await stylelintFix(result, fileType)
	} catch {}

	try {
		result = await prettierFix(result, fileType)
	} catch {}

	return result
}

/**
 * Fix a file in place by running all shared-config tools in sequence: Mdat →
 * ESLint → Stylelint → Prettier. Each tool silently skips content it doesn't
 * understand.
 *
 * @param filePath - Path to the file to fix.
 */
export async function fixFile(filePath: string): Promise<void> {
	try {
		await mdatFixFile(filePath)
	} catch {}

	try {
		await eslintFixFile(filePath)
	} catch {}

	try {
		await stylelintFixFile(filePath)
	} catch {}

	try {
		await prettierFixFile(filePath)
	} catch {}
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

export { type FileType } from '@kitschpatrol/prettier-config'
