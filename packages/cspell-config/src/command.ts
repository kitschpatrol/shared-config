import { getDefaultConfigLoader, resolveConfigFileImports } from 'cspell-lib'
import { constants } from 'node:fs'
import { access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { packageUp } from 'package-up'
import { type CommandDefinition, DESCRIPTIONS } from '../../../src/command-builder.js'
import { stringify } from '../../../src/json-utils.js'
import { createStreamTransform } from '../../../src/stream-utils.js'
import { checkForUnusedWords } from './unused-words.js'

async function checkForUnusedWordsCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
): Promise<number> {
	// Run the check unused words script
	const unusedWords = await checkForUnusedWords(positionalArguments)

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

async function printCspellConfigCommand(logStream: NodeJS.WritableStream): Promise<number> {
	const configName = 'cspell'

	// eslint-disable-next-line unicorn/no-useless-undefined
	const config = await getDefaultConfigLoader().searchForConfigFile(undefined)
	if (config === undefined) {
		throw new Error('No CSpell configuration found.')
	}

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
		init: {
			configFile: 'cspell.config.json',
			configPackageJson: {
				cspell: {
					import: '@kitschpatrol/cspell-config',
				},
			},
			locationOptionFlag: true,
		},
		lint: {
			commands: [
				{
					name: 'cspell',
					optionFlags: ['--quiet'],
					receivePositionalArguments: true,
				},
				{
					execute: checkForUnusedWordsCommand,
					name: checkForUnusedWordsCommand.name,
				},
				{
					logColor: 'cyanBright',
					logPrefix: '[Case Police]',
					name: 'case-police',
					optionFlags: ['--dict', await getCasePoliceDictionaryPath()],
					receivePositionalArguments: true,
				},
			],
			description: `Check for spelling mistakes. ${DESCRIPTIONS.fileRun}`,
			positionalArgumentDefault: '**/*',
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			commands: [
				{
					execute: printCspellConfigCommand,
					name: printCspellConfigCommand.name,
				},
			],
			description: `Print the resolved CSpell configuration. ${DESCRIPTIONS.packageSearch} ${DESCRIPTIONS.monorepoSearch}`,
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
	description:
		"Kitschpatrol's CSpell shared configuration tools. (Automated fixes are handled by ESLint.)",
	logColor: 'cyan',
	logPrefix: '[CSpell]',
	name: 'kpsc-cspell',
}
