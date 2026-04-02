// eslint-disable-next-line depend/ban-dependencies
import { globby } from 'globby'
import fs from 'node:fs/promises'
import { getPackageDirectory } from '../../../src/path-utilities'
import { pluralize } from '../../../src/string-utilities'

/**
 * Patterns matching date-containing strings in standard open source license
 * texts. These dates are part of the license boilerplate and should not be
 * treated as the project's copyright year.
 */
const licenseBoilerplateDatePatterns: RegExp[] = [
	// Apache License 2.0
	/Version 2\.0,?\s*January 2004/g,
	// GPL v1
	/Version 1,?\s*February 1989/g,
	// GPL v2 / LGPL v2
	/Version 2,?\s*June 1991/g,
	// GPL v3 / LGPL v3
	/Version 3,?\s*29 June 2007/g,
	// LGPL v2.1
	/Version 2\.1,?\s*February 1999/g,
	// AGPL v3
	/Version 3,?\s*19 November 2007/g,
	// Boost Software License 1.0
	/Version 1\.0\s*-\s*August 17th,?\s*2003/g,
	// GFDL v1.1
	/Version 1\.1,?\s*March 2000/g,
	// GFDL v1.2
	/Version 1\.2,?\s*November 2002/g,
	// GFDL v1.3
	/Version 1\.3,?\s*3 November 2008/g,
	// SIL Open Font License 1.0
	/Version 1\.0\s*-\s*22 November 2005/g,
	// SIL Open Font License 1.1
	/Version 1\.1\s*-\s*26 February 2007/g,
	// WTFPL v2
	/Version 2,?\s*December 2004/g,
	// WIPO copyright treaty reference (GPL v3, AGPL v3, CC 4.0)
	/20 December 1996/g,
	/December 20,?\s*1996/g,
	// EU directive reference (CC 4.0, CC0)
	/11 March 1996/g,
	// GPL v3 / AGPL v3 patent clause date
	/28 March 2007/g,
	// GFDL v1.3 specific dates
	/November 1,?\s*2008/g,
	/August 1,?\s*2009/g,
	// GPL appendix example signature dates
	/1 April 19\d{2}/g,
	// Artistic License 2.0 copyright
	/Copyright \(c\) 2000-2006,?\s*The Perl Foundation/gi,
	// FSF copyright lines in license texts
	/Copyright \(C\) (?:\d{4},?\s*)+Free Software Foundation/g,
]

/**
 * Files to ignore when searching for license files.
 * .gitignore style patterns.
 */
const IGNORE_PATTERNS = ['node_modules/**', 'test/**']

/**
 * Mask digits in known license boilerplate date strings with 'X', preserving
 * string length so character indices remain stable for replacement.
 */
function maskLicenseBoilerplateDates(content: string): string {
	let masked = content
	for (const pattern of licenseBoilerplateDatePatterns) {
		pattern.lastIndex = 0
		masked = masked.replace(pattern, (match) => match.replaceAll(/\d/g, 'X'))
	}
	return masked
}

const YEAR_RANGE_REGEX = /(\d{4})\s*-\s*(\d{4})/
const YEAR_REGEX = /(\d{4})/

function updateLicenseContent(content: string, currentYear: number): string {
	const maskedContent = maskLicenseBoilerplateDates(content)

	// Match a four-digit range with optional spaces around the dash.
	const rangeRegex = YEAR_RANGE_REGEX
	const rangeMatch = rangeRegex.exec(maskedContent)

	if (rangeMatch) {
		const [, startYear, endYear] = rangeMatch
		if (Number.parseInt(endYear, 10) !== currentYear) {
			const newRange = `${startYear}-${currentYear}`
			const before = content.slice(0, rangeMatch.index)
			const after = content.slice(rangeMatch.index)
			return before + after.replace(rangeRegex, newRange)
		}
		return content
	}

	// If no range was found, try matching a single four-digit year.
	const singleYearRegex = YEAR_REGEX
	const singleMatch = singleYearRegex.exec(maskedContent)
	if (singleMatch) {
		const [, year] = singleMatch
		if (Number.parseInt(year, 10) !== currentYear) {
			const newRange = `${year}-${currentYear}`
			const before = content.slice(0, singleMatch.index)
			const after = content.slice(singleMatch.index)
			return before + after.replace(singleYearRegex, newRange)
		}
		return content
	}

	// Return original content if no year was found.
	return content
}

async function copyrightYear(logStream: NodeJS.WritableStream, fix = false): Promise<number> {
	const currentYear = new Date().getFullYear()
	const licenseFiles: string[] = []

	// Use multiple glob patterns to cover different casings for "license.txt"
	const patterns = ['**/license.txt', '**/license', ...IGNORE_PATTERNS.map((p) => `!${p}`)]

	const files = await globby(patterns, {
		caseSensitiveMatch: false,
		cwd: getPackageDirectory(),
		followSymbolicLinks: false, // Avoid infinite loops
		gitignore: true,
	})

	for (const filePath of files) {
		licenseFiles.push(filePath)
	}

	const outdatedLicenseFiles: string[] = []

	for (const filePath of licenseFiles) {
		try {
			const originalContent = await fs.readFile(filePath, 'utf8')
			const updatedContent = updateLicenseContent(originalContent, currentYear)

			if (updatedContent !== originalContent) {
				outdatedLicenseFiles.push(filePath)
				if (fix) {
					await fs.writeFile(filePath, updatedContent, 'utf8')
				}
			}
		} catch (error) {
			console.error(`Failed to process ${filePath}:`, error)
		}
	}

	if (outdatedLicenseFiles.length > 0) {
		logStream.write(
			`${fix ? 'Fixed' : 'Found'} ${outdatedLicenseFiles.length} license ${pluralize('file', outdatedLicenseFiles.length)} with outdated copyright year:\n`,
		)
		for (const outdatedLicenseFile of outdatedLicenseFiles) {
			logStream.write(`  - ${outdatedLicenseFile}\n`)
		}

		return fix ? 0 : 1
	}

	return 0
}

/**
 * Linter for the year in license files.
 */
export async function copyrightYearLinterCommand(logStream: NodeJS.WritableStream) {
	return copyrightYear(logStream, false)
}

/**
 * Fixer for the year in license files.
 */
export async function copyrightYearFixerCommand(logStream: NodeJS.WritableStream) {
	return copyrightYear(logStream, true)
}
