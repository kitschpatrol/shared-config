// eslint-disable-next-line depend/ban-dependencies
import { globby } from 'globby'
import fs from 'node:fs/promises'
import { getPackageDirectory } from '../../../src/path-utilities'
import { pluralize } from '../../../src/string-utilities'

function updateLicenseContent(content: string, currentYear: number): string {
	// Match a four-digit range with optional spaces around the dash.
	const rangeRegex = /(\d{4})\s*-\s*(\d{4})/
	const rangeMatch = rangeRegex.exec(content)

	if (rangeMatch) {
		const [, startYear, endYear] = rangeMatch
		if (Number.parseInt(endYear, 10) !== currentYear) {
			const newRange = `${startYear}-${currentYear}`
			return content.replace(rangeRegex, newRange)
		}
		return content
	}

	// If no range was found, try matching a single four-digit year.
	const singleYearRegex = /(\d{4})/
	const singleMatch = singleYearRegex.exec(content)
	if (singleMatch) {
		const [, year] = singleMatch
		if (Number.parseInt(year, 10) !== currentYear) {
			const newRange = `${year}-${currentYear}`
			return content.replace(singleYearRegex, newRange)
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
	const patterns = [
		'**/license.txt',
		'**/LICENSE.txt',
		'**/License.txt',
		'**/LICENSE',
		'!node_modules/**',
	]

	const files = await globby(patterns, {
		cwd: getPackageDirectory(),
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
