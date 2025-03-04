#!/usr/bin/env tsx

import { getProperty } from 'dot-prop'
import { renamePluginsInRules } from 'eslint-flat-config-utils'
// eslint-disable-next-line depend/ban-dependencies
import { globby } from 'globby'
import fs from 'node:fs/promises'
import process from 'node:process'
import { formatTextAndSaveFile } from '../../../src/prettier-utilities'
import { defaultPluginRenaming } from '../src/factory'
import { interopDefault } from '../src/utilities'

type ExpansionConfig = {
	dotPath: string
	library: string
}

/**
 * Unused
 *
 * "Starts with" strings for rules to comment out in the expansion.
 *
 * Fixes type errors for rules from plugins that are not included in this shared
 * config, While sill leaving them visible. Useful or for deprecated rules for
 * which no type information can be found Otherwise, type errors from typegen's
 * output...
 *
 * Rename logic is applied, but using canonical names is recommended.
 *
 * MANY deprecated rules in prettierEslint, so that is handled in-situ.
 */
const deprecatedRules: string[] = ['astro/jsx-a11y/label-has-for', '@stylistic/']

const delimiters = {
	start: '// Begin expansion',
	end: '// End expansion',
} as const

/**
 * Adds new rule expansions where indicated by delimiter comments:
 * @example
 * ```ts
 * // Begin expansion 'eslint-plugin-jsdoc' 'flat/recommended-typescript-flavor'
 * // Rules will be expanded here...
 * // End expansion
 * ```
 * @param lines - Array of file lines
 * @returns Array of lines with expansions added
 */
async function addNewExpansions(lines: string[]): Promise<string[]> {
	const result: string[] = []

	for (const line of lines) {
		result.push(line)

		if (line.includes(delimiters.start)) {
			try {
				const config = parseExpansionConfig(line)
				const expansionLines = await generateExpansionLines(config)
				result.push(...expansionLines)
			} catch (error) {
				console.error(`Error processing expansion in line: ${line}`, error)
			}
		}
	}

	return result
}

/**
 * Generates the expanded rule lines for a given configuration
 * @param expansionConfig Library name and config rules path
 * @returns Array of expanded rule lines
 */
async function generateExpansionLines(expansionConfig: ExpansionConfig): Promise<string[]> {
	const { dotPath, library } = expansionConfig

	const importedLibrary = (await interopDefault(import(library))) as
		| Record<string, unknown>
		| unknown[]

	// Attempt some common paths... infer 'rules' key for final object
	const rules: Record<string, unknown> | undefined =
		getProperty(importedLibrary, dotPath) ??
		getProperty(importedLibrary, `${dotPath}.rules`) ??
		getProperty(importedLibrary, `configs.${dotPath}.rules`) ??
		getProperty(importedLibrary, `flatConfigs.${dotPath}.rules`)

	if (rules === undefined) {
		throw new Error(`Couldn't find rules for module "${library}" at path: "${dotPath}"`)
	}

	const renamedRules = renamePluginsInRules(rules, defaultPluginRenaming)
	const renamedDeprecatedRules = Object.keys(
		renamePluginsInRules(
			Object.fromEntries(deprecatedRules.map((key) => [key, undefined])),
			defaultPluginRenaming,
		),
	)

	const jsonLines: string[] = []
	for (const [key, value] of Object.entries(renamedRules)) {
		// eslint-disable-next-line ts/no-unsafe-assignment
		const line = `${JSON.stringify({ [key]: value }).slice(1, -1)},`

		const isDeprecated = renamedDeprecatedRules.some((deprecatedRulePrefix) =>
			key.startsWith(deprecatedRulePrefix),
		)

		if (isDeprecated) {
			jsonLines.push(`// ${line}`)
		} else {
			jsonLines.push(line)
		}
	}

	// Remove the opening and closing braces and add trailing comma to make prettier happy
	return [...jsonLines]
}

/**
 * Main function to process all TypeScript files
 */
async function main() {
	try {
		const files = await globby('src/**/*.ts')
		for (const file of files) {
			try {
				const ruleCount = await processFile(file)

				if (ruleCount !== undefined) {
					console.log(`Expanded ${String(ruleCount)} preset rules in file ${file}`)
				}
			} catch (error) {
				console.error(`Error processing file ${file}:`, error)
			}
		}
	} catch (error) {
		console.error('Fatal error:', error)
		process.exit(1)
	}
}

/**
 * Extracts library and config information from a comment line
 * @param line - The line containing the expansion comment
 * @returns Configuration object with library and config names
 * @throws {Error} If the line doesn't contain proper quote-wrapped strings
 */
function parseExpansionConfig(line: string): ExpansionConfig {
	const quoteRegex = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g
	const matches = line.match(quoteRegex)

	if (matches?.length === undefined || matches.length < 2) {
		throw new Error(`Invalid expansion config in line: ${line}`)
	}

	return {
		dotPath: matches[1].replaceAll(/['"]/g, ''),
		library: matches[0].replaceAll(/['"]/g, ''),
	}
}

/**
 * Processes a single file to expand ESLint rules
 * @param filePath - Path to the file to process
 * @returns Number of rules processed, or undefined if no processing was needed
 */
async function processFile(filePath: string): Promise<number | undefined> {
	const content = await fs.readFile(filePath, 'utf8')

	if (!content.includes(delimiters.start) || !content.includes(delimiters.end)) {
		return undefined
	}

	const lines = content.split('\n')
	let ruleCount = 0

	// First pass: Remove existing expansion content
	const cleanedLines = removeExistingExpansions(lines)

	// Second pass: Add new expansions
	const expandedLines = await addNewExpansions(cleanedLines)

	ruleCount = expandedLines.length - cleanedLines.length

	// Format and save the file
	await formatTextAndSaveFile(filePath, expandedLines.join('\n'))

	return ruleCount
}

/**
 * Removes existing expansion content between delimiters
 * @param lines - Array of file lines
 * @returns Cleaned array of lines
 */
function removeExistingExpansions(lines: string[]): string[] {
	const result: string[] = []
	let inExpansion = false

	for (const line of lines) {
		if (line.includes(delimiters.end)) {
			inExpansion = false
			result.push(line)
			continue
		}

		if (!inExpansion) {
			result.push(line)
		}

		if (line.includes(delimiters.start)) {
			inExpansion = true
		}
	}

	return result
}

await main()
