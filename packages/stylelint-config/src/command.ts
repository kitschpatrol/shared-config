import path from 'node:path'
import stylelint from 'stylelint'
import type { CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION, getCosmiconfigResult } from '../../../src/command-builder.js'
import { stringify } from '../../../src/json-utilities.js'
import { getCwdOverride, getFilePathAtProjectRoot } from '../../../src/path-utilities.js'

const sharedOptionFlags = [
	'--ignore-path',
	getFilePathAtProjectRoot('.gitignore') ?? '.gitignore',
	'--allow-empty-input',
]
const positionalArgumentDefaultSuffix = [
	'css',
	'scss',
	'sass',
	'svelte',
	'html',
	'astro',
	'tsx',
	'jsx',
	'php',
	'vue',
]
const positionalArgumentDefault = `**/*.{${positionalArgumentDefaultSuffix.join(',')}}`

async function printStylelintConfigCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
): Promise<number> {
	const configName = 'stylelint'

	// Print location of config:
	const result = await getCosmiconfigResult(configName)
	if (result === undefined) {
		return 1
	}

	const { filepath: configFilepath, isEmpty } = result

	if (isEmpty) {
		logStream.write('Configuration is empty.\n')
		return 0
	}

	logStream.write(`Found ${configName} configuration at "${configFilepath}"\n`)

	// Use stylelint's built-in method to print the config
	let filePath
	if (positionalArguments.length > 0) {
		filePath = path.join(process.cwd(), positionalArguments[0])
		logStream.write(`Showing config for file at "${filePath}"\n`)
	} else {
		filePath = getCwdOverride('package-dir')
	}

	const config = await stylelint.resolveConfig(filePath)
	const prettyAndColorfulJsonLines = stringify(config).split('\n')
	for (const line of prettyAndColorfulJsonLines) {
		logStream.write(`${line}\n`)
	}
	return 0
}

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					name: 'stylelint',
					optionFlags: [...sharedOptionFlags, '--fix'],
					receivePositionalArguments: true,
				},
			],
			description: `Fix your project with Stylelint. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault,
			positionalArgumentMode: 'optional',
		},
		init: {
			configFile: 'stylelint.config.js',
			configPackageJson: {
				stylelint: {
					extends: '@kitschpatrol/stylelint-config',
				},
			},
			locationOptionFlag: true,
		},
		lint: {
			commands: [
				{
					name: 'stylelint',
					optionFlags: sharedOptionFlags,
					receivePositionalArguments: true,
				},
			],
			description: `Lint your project with Stylelint. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault,
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			commands: [
				{
					execute: printStylelintConfigCommand,
					name: printStylelintConfigCommand.name,
				},
			],
			description: `Print the effective Stylelint configuration. ${DESCRIPTION.optionalFileRun}.`,
			positionalArgumentMode: 'optional',
		},
	},
	description: "Kitschpatrol's Stylelint shared configuration tools.",
	logColor: 'greenBright',
	logPrefix: '[Stylelint]',
	name: 'ksc-stylelint',
	order: 5,
}
