import { getDefaultConfigLoader, resolveConfigFileImports } from 'cspell-lib'
import { constants } from 'node:fs'
import { access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { packageUp } from 'package-up'
import type {
	CollectContext,
	CollectResult,
	CommandDefinition,
} from '../../../src/command-builder.js'
import type { Diagnostic } from '../../../src/diagnostics.js'
import { DESCRIPTION } from '../../../src/command-builder.js'
import { normalizeDiagnosticPath, toOutputLines } from '../../../src/diagnostics.js'
import { stringify } from '../../../src/json-utilities.js'
import { createStreamTransform } from '../../../src/stream-utilities.js'
import { fixWordsInConfig } from './fix-words.js'
import { checkForUnusedWords } from './unused-words.js'

async function getCspellConfigFilePath(): Promise<string | undefined> {
	const config = await getDefaultConfigLoader().searchForConfigFile(undefined)
	return config === undefined ? undefined : fileURLToPath(config.url)
}

async function getCspellIgnorePaths(): Promise<string> {
	// Resolve cspell ignore paths for Case Police

	const config = await getDefaultConfigLoader().searchForConfigFile(undefined)
	if (config === undefined) {
		throw new Error('No CSpell configuration found.')
	}

	const resolvedConfig = await resolveConfigFileImports(config)

	if (resolvedConfig.ignorePaths === undefined) {
		return ''
	}

	// Comma-delimited list of paths
	const globStrings: string[] = Array.from(resolvedConfig.ignorePaths, (ignorePathEntry) =>
		typeof ignorePathEntry === 'string' ? ignorePathEntry : ignorePathEntry.glob,
	)

	return globStrings.join(',')
}

// "src/foo.ts:12:5 - Unknown word (example) fix: (examples)"
const CSPELL_ISSUE_REGEX = /^(?<file>.+?):(?<line>\d+):(?<column>\d+) - (?<message>.+)$/v
const CSPELL_SUGGESTION_REGEX = / fix: \((?<suggestion>[^\)]+)\)$/v

/** Parses `cspell --quiet` text output into diagnostics. */
export function parseCspellOutput(context: CollectContext): CollectResult {
	const diagnostics: Diagnostic[] = []
	const unparsed: string[] = []

	for (const line of toOutputLines(`${context.stdout}\n${context.stderr}`)) {
		const match = CSPELL_ISSUE_REGEX.exec(line)
		if (match?.groups === undefined) {
			unparsed.push(line)
			continue
		}

		const { column, file, line: lineNumber, message } = match.groups
		const suggestionMatch = CSPELL_SUGGESTION_REGEX.exec(message ?? '')
		const suggestion = suggestionMatch?.groups?.suggestion

		diagnostics.push({
			column: Number(column),
			file: normalizeDiagnosticPath(file ?? '', context.cwd),
			line: Number(lineNumber),
			message:
				suggestionMatch === null
					? (message ?? '')
					: (message ?? '').slice(0, -suggestionMatch[0].length),
			...(suggestion !== undefined && { suggestion }),
			severity: 'warning',
			tool: 'cspell',
		})
	}

	return { diagnostics, unparsed }
}

async function checkForUnusedWordsCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
): Promise<number> {
	// Run the check unused words script
	const { errors, filesChecked, unusedWords } = await checkForUnusedWords(positionalArguments)

	// Without a successful spell-check run, every word looks unused
	if (errors > 0 || (filesChecked === 0 && unusedWords.length > 0)) {
		const subStream = createStreamTransform('[Unused Words]', 'cyanBright')
		subStream.pipe(logStream)
		subStream.write(
			`Could not check for unused words: CSpell checked ${filesChecked} files with ${errors} errors.\n`,
		)
		return 1
	}

	if (unusedWords.length > 0) {
		const subStream = createStreamTransform('[Unused Words]', 'cyanBright')
		subStream.pipe(logStream)

		// SubStream.write(
		// 	`Found ${unusedWords.length} unused ${pluralize('word', unusedWords.length)} in CSpell config "words" array:\n`,
		// )
		for (const unusedWord of unusedWords) {
			subStream.write(`${unusedWord}\n`)
		}

		// Consider this an error
		return 1
	}

	return 0
}

/** Structured counterpart to `checkForUnusedWordsCommand`. */
async function collectUnusedWords(
	positionalArguments: string[],
): Promise<CollectResult & { exitCode: number }> {
	const { errors, filesChecked, unusedWords } = await checkForUnusedWords(positionalArguments)

	// Without a successful spell-check run, every word looks unused
	if (errors > 0 || (filesChecked === 0 && unusedWords.length > 0)) {
		return {
			diagnostics: [
				{
					message: `Could not check for unused words: CSpell checked ${filesChecked} files with ${errors} errors`,
					severity: 'error',
					tool: 'unused-words',
				},
			],
			exitCode: 1,
			unparsed: [],
		}
	}

	const configFilePath = await getCspellConfigFilePath()
	const file =
		configFilePath === undefined
			? {}
			: { file: normalizeDiagnosticPath(configFilePath, process.cwd()) }

	return {
		diagnostics: unusedWords.map((word) => ({
			...file,
			message: `Unused word in CSpell config "words" array: ${word}`,
			severity: 'warning' as const,
			tool: 'unused-words',
		})),
		exitCode: unusedWords.length > 0 ? 1 : 0,
		unparsed: [],
	}
}

async function fixWordsCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
): Promise<number> {
	const subStream = createStreamTransform('[Words]', 'cyanBright')
	subStream.pipe(logStream)

	const result = await fixWordsInConfig(positionalArguments)

	if (result === undefined) {
		// Keep quiet
		// subStream.write('No "words" array found in the CSpell configuration. Nothing to fix.\n')
		return 0
	}

	for (const removedWord of result.removedWords) {
		subStream.write(`Removed unused word: ${removedWord}\n`)
	}

	if (result.reordered) {
		subStream.write('Sorted the "words" array alphabetically.\n')
	}

	return 0
}

async function getCasePoliceDictionaryPath(): Promise<string> {
	// This is the path to the directory containing the default export of the
	// package, so we still have to look "up" to get the root package directory.
	const packageDirectory = import.meta.resolve('@kitschpatrol/cspell-config')

	const sourcePackage = await packageUp({ cwd: path.dirname(fileURLToPath(packageDirectory)) })
	if (sourcePackage === undefined) {
		throw new Error('Could not find Case Police dictionary parent package.')
	}

	const source = path.join(path.dirname(sourcePackage), 'dictionaries', 'case-police.json')

	try {
		await access(source, constants.F_OK)
	} catch {
		throw new Error(`Case Police dictionary file "${source}" does not exist.`)
	}

	return source
}

// @case-police-ignore Github
// "Github → GitHub \t ./src/command.ts:63:27" (words are single tokens)
const CASE_POLICE_ISSUE_REGEX =
	/^(?<from>\S+) → (?<to>\S+)\s+(?<file>\S+):(?<line>\d+):(?<column>\d+)$/v

/**
 * Parses case-police text output into diagnostics. Only word recommendation
 * lines are considered; banner and summary noise is dropped, matching the
 * output filter used in native mode.
 */
export function parseCasePoliceOutput(context: CollectContext): CollectResult {
	const diagnostics: Diagnostic[] = []
	const unparsed: string[] = []

	for (const line of toOutputLines(`${context.stdout}\n${context.stderr}`)) {
		if (!line.includes('→')) {
			continue
		}

		const match = CASE_POLICE_ISSUE_REGEX.exec(line)
		if (match?.groups === undefined) {
			unparsed.push(line)
			continue
		}

		const { column, file, from, line: lineNumber, to } = match.groups
		diagnostics.push({
			column: Number(column),
			file: normalizeDiagnosticPath(file ?? '', context.cwd),
			line: Number(lineNumber),
			message: `Case error: "${from}" should be "${to}"`,
			severity: 'warning',
			...(to !== undefined && { suggestion: to }),
			tool: 'case-police',
		})
	}

	return { diagnostics, unparsed }
}

async function printCspellConfigCommand(logStream: NodeJS.WritableStream): Promise<number> {
	const config = await getDefaultConfigLoader().searchForConfigFile(undefined)
	if (config === undefined) {
		throw new Error('No CSpell configuration found.')
	}

	const configName = 'cspell'
	logStream.write(`Found ${configName} readme configuration at "${fileURLToPath(config.url)}"\n`)

	const resolvedConfig = await resolveConfigFileImports(config)
	const prettyAndColorfulJsonLines = stringify(resolvedConfig).split('\n')
	for (const line of prettyAndColorfulJsonLines) {
		logStream.write(`${line}\n`)
	}

	return 0
}

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			// Resolved lazily so the case-police dictionary and ignore paths are
			// looked up at execution time. Fixers run first so the spell check that
			// follows reports exactly what a subsequent lint would.
			async commands() {
				return [
					{
						collect: {
							parse: parseCasePoliceOutput,
						},
						logColor: 'cyanBright',
						logPrefix: '[Case Police]',
						name: 'case-police',
						optionFlags: [
							'--fix',
							'--dict',
							await getCasePoliceDictionaryPath(),
							'--ignore',
							await getCspellIgnorePaths(),
						],
						// Only show word recommendations, drop banner and summary noise
						outputFilter: (line) => !line.includes('→'),
						receivePositionalArguments: true,
					},
					{
						execute: fixWordsCommand,
						// Explicit name because function names are minified in builds
						name: 'words',
					},
					{
						cache: { flags: ['--cache', '--cache-strategy', 'content'], name: 'cspell' },
						collect: {
							parse: parseCspellOutput,
						},
						name: 'cspell',
						optionFlags: ['--quiet'],
						receivePositionalArguments: true,
					},
				]
			},
			description: `Fix letter casing issues, remove unused words from the local CSpell configuration's "words" array, and report remaining (unfixable) spelling errors. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault: '**/*',
			positionalArgumentMode: 'optional',
		},
		init: {
			configFile: 'cspell.config.ts',
			configPackageJson: {
				cspell: {
					import: '@kitschpatrol/cspell-config',
				},
			},
			locationOptionFlag: true,
		},
		lint: {
			// Resolved lazily so the case-police dictionary and ignore paths are
			// looked up at execution time
			async commands() {
				return [
					{
						cache: { flags: ['--cache', '--cache-strategy', 'content'], name: 'cspell' },
						collect: {
							parse: parseCspellOutput,
						},
						name: 'cspell',
						optionFlags: ['--quiet'],
						receivePositionalArguments: true,
					},
					{
						collect: collectUnusedWords,
						execute: checkForUnusedWordsCommand,
						// Explicit name because function names are minified in builds
						name: 'unused-words',
					},
					{
						collect: {
							parse: parseCasePoliceOutput,
						},
						logColor: 'cyanBright',
						logPrefix: '[Case Police]',
						name: 'case-police',
						optionFlags: [
							'--dict',
							await getCasePoliceDictionaryPath(),
							'--ignore',
							await getCspellIgnorePaths(),
						],
						// Only show word recommendations, drop banner and summary noise
						outputFilter: (line) => !line.includes('→'),
						receivePositionalArguments: true,
					},
				]
			},
			description: `Check for spelling mistakes. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault: '**/*',
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			commands: [
				{
					execute: printCspellConfigCommand,
					name: 'cspell-config',
				},
			],
			description: `Print the resolved CSpell configuration. ${DESCRIPTION.packageSearch} ${DESCRIPTION.monorepoSearch}`,
			positionalArgumentMode: 'none',
		},
		// Old approached prints too much...
		// printConfig: {
		// 	// Doesn't work with executeJsonOutput
		// 	// because of json parsing errors (regex related)
		// 	command: 'cspell',
		// 	defaultArguments: ['.'],
		// 	options: ['--debug', '--no-exit-code', '--no-color'],
		// },
	},
	description: "Kitschpatrol's CSpell shared configuration tools.",
	logColor: 'cyan',
	logPrefix: '[CSpell]',
	name: 'ksc-cspell',
	order: 6,
}
