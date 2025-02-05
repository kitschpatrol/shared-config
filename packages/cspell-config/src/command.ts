import { getDefaultConfigLoader, resolveConfigFileImports } from 'cspell-lib'
import { fileURLToPath } from 'node:url'
import { type CommandDefinition } from '../../../src/command-builder.js'
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
					// CwdOverride: 'package-dir',
					optionFlags: ['--quiet'],
					receivePositionalArguments: true,
				},
				{
					execute: checkForUnusedWordsCommand,
					name: 'unused words',
				},
			],
			description:
				'Check for spelling mistakes. This file-scoped command searches from the current working directory by default.',
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			commands: [
				{
					async execute(logStream) {
						const configName = 'cspell'

						// eslint-disable-next-line unicorn/no-useless-undefined
						const config = await getDefaultConfigLoader().searchForConfigFile(undefined)
						if (config === undefined) {
							throw new Error('No CSpell configuration found.')
						}

						logStream.write(
							`Found ${configName} readme configuration at "${fileURLToPath(config.url)}"\n`,
						)

						const resolvedConfig = await resolveConfigFileImports(config)
						const prettyAndColorfulJsonLines = stringify(resolvedConfig).split('\n')
						for (const line of prettyAndColorfulJsonLines) {
							logStream.write(`${line}\n`)
						}

						return 0
					},
					name: 'print mdat config',
				},
			],
			description: 'Print the Mdat configuration.',
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
	description: 'Spell-check your project with CSpell. (Automated fixes are handled by ESLint.)',
	logColor: 'cyan',
	logPrefix: '[CSpell]',
	name: 'cspell-config',
}
