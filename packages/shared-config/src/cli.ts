#!/usr/bin/env node
import chalk from 'chalk'
import { buildCommands, execute, type Subcommands } from '../../../src/command-builder.js'
import { kebabCase, pluralize } from '../../../src/string-utils.js'
import { capabilities } from '../build/capabilities.js'

async function executeCommands(
	logStream: NodeJS.WritableStream,
	commands: string[],
	options: string[],
	args: string[],
): Promise<number> {
	const successfulCommands: string[] = []
	const failedCommands: string[] = []

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

const subcommands: Subcommands = {}
for (const capability of Object.keys(capabilities)) {
	subcommands[capability as keyof Subcommands] = {
		async command(logStream, args) {
			return executeCommands(
				logStream,
				capabilities[capability as keyof typeof capabilities],
				[kebabCase(capability)],
				args,
			)
		},
		defaultArguments: [],
	}
}

await buildCommands('shared-config', '🔬', 'yellow', subcommands)
