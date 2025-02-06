import path from 'node:path'
import {
	type Command,
	type CommandDefinition,
	DESCRIPTION,
	executeCommands,
	getCosmiconfigCommand,
} from '../../../src/command-builder.js'

async function printEslintConfigCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
): Promise<number> {
	// Conditionally execute different commands based on presence
	// of optional positional argument
	let commandToExecute: Command

	if (positionalArguments.length > 0) {
		const resolvedFile = path.join(process.cwd(), positionalArguments[0])
		logStream.write(`Showing configuration for file: ${resolvedFile}\n`)

		commandToExecute = {
			name: 'eslint',
			optionFlags: ['--print-config'],
			receivePositionalArguments: true,
		}
	} else {
		commandToExecute = getCosmiconfigCommand('eslint')
	}

	return executeCommands(logStream, positionalArguments, [], [commandToExecute])
}

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					name: 'eslint',
					optionFlags: ['--fix'],
					receivePositionalArguments: true,
				},
			],
			description: `Fix your project with ESLint. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		init: {
			// ESLint 9 does not support configuration in package.json
			locationOptionFlag: false,
		},
		lint: {
			commands: [
				{
					name: 'eslint',
					optionFlags: ['--max-warnings', '0'],
					receivePositionalArguments: true,
				},
			],
			description: `Lint your project with ESLint. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			commands: [
				{
					execute: printEslintConfigCommand,
					name: printEslintConfigCommand.name,
				},
			],
			description: `Print the effective ESLint configuration. ${DESCRIPTION.optionalFileRun} Use \`@eslint/config-inspector\` for a more detailed view.`,
			positionalArgumentMode: 'optional',
		},
	},
	description: "Kitschpatrol's ESLint shared configuration tools.",
	logColor: 'magenta',
	logPrefix: `[ESLint]`,
	name: 'kpsc-eslint',
	order: 4,
}
