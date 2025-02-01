#!/usr/bin/env node
import { buildCommands, execute } from '../../../src/command-builder.js'
import { pluralize } from '../../../src/string-utils.js'
import { checkForUnusedWords } from './unused-words.js'

// TODO fix? fixed through eslint?

await buildCommands('cspell-config', '[CSpell]', 'cyan', {
	init: {
		command: {
			configFile: 'cspell.config.json',
			configPackageJson: {
				cspell: {
					import: '@kitschpatrol/cspell-config',
				},
			},
		},
	},
	lint: {
		// Special case runs both cspell and the check unused words script!
		async command(logStream, args) {
			let resultAccumulator = 0

			// Run cspell itself
			resultAccumulator += await execute(
				logStream,
				{
					command: 'cspell',
					defaultArguments: ['.'],
					options: ['--quiet'],
				},
				args,
			)

			// Run the check unused words script
			const unusedWords = await checkForUnusedWords(args)
			if (unusedWords.length > 0) {
				// Consider this an error
				resultAccumulator += 1

				logStream.write(
					`Found ${unusedWords.length} unused ${pluralize('word', unusedWords.length)} in CSpell config "words" array:\n`,
				)
				for (const unusedWord of unusedWords) {
					logStream.write(`  - ${unusedWord}\n`)
				}
			}

			return resultAccumulator
		},
		defaultArguments: ['.'],
	},
	printConfig: {
		// Doesn't work with executeJsonOutput
		// because of json parsing errors (regex related)
		command: 'cspell',
		defaultArguments: ['.'],
		options: ['--debug', '--no-exit-code', '--no-color'],
	},
})
