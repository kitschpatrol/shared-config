#!/usr/bin/env node
import chalk from 'chalk'
import { buildCommands, execute, type Subcommands } from '../../../src/command-builder.js'
import { capabilities } from '../build/capabilities.js'

function kebabCase(text: string): string {
	return text.replaceAll(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (match) => '-' + match.toLowerCase())
}

function pluralize(text: string, count: number): string {
	return count === 1 ? text : text + 's'
}

async function executeCommands(
	logStream: NodeJS.WritableStream,
	commands: string[],
	options: string[],
	args: string[],
): Promise<number> {
	const successfulCommands: string[] = []
	const failedCommands: string[] = []

	console.log('----------------------------------')
	console.log('commands:', commands)

	for (const command of commands) {
		logStream.write(`Running "${[command, ...args, ...options].join(' ')}"\n`)

		const exitCode = await execute(
			logStream,
			{
				command,
				options,
			},
			args,
		)

		if (exitCode === 0) {
			successfulCommands.push(command)
		} else {
			failedCommands.push(command)
		}
	}

	if (successfulCommands.length > 0) {
		logStream.write(
			`✅ ${chalk.green.bold(
				`${successfulCommands.length} Successful ${pluralize(
					'command',
					successfulCommands.length,
				)}:`,
			)} ${successfulCommands.join(', ')}\n`,
		)
	}

	if (failedCommands.length > 0) {
		logStream.write(
			`❌ ${chalk.green.bold(
				`${failedCommands.length} Failed ${pluralize('command', failedCommands.length)}:`,
			)} ${failedCommands.join(', ')}\n`,
		)
	}

	return failedCommands.length > 0 ? 1 : 0
}

await buildCommands(
	'shared-config',
	'🔬',
	'yellow',
	Object.keys(capabilities).reduce<Subcommands>((acc, capability) => {
		acc[capability as keyof Subcommands] = {
			async command(logStream, args) {
				return executeCommands(
					logStream,
					capabilities[capability as keyof typeof capabilities],
					[`${kebabCase(capability)}`],
					args,
				)
			},
			defaultArguments: [],
		}
		return acc
	}, {}),
)
