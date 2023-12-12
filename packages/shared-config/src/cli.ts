#!/usr/bin/env node
import { type OptionCommands, buildCommands, execute } from '../../../src/command-builder.js';
import { capabilities } from '../build/capabilities.js';

function kebabCase(text: string): string {
	return text.replaceAll(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (match) => '-' + match.toLowerCase());
}

async function executeCommands(
	logStream: NodeJS.WritableStream,
	commands: string[],
	options: string[],
	args: string[],
): Promise<number> {
	const successfulCommands: string[] = [];
	const failedCommands: string[] = [];

	for (const command of commands) {
		logStream.write(`Running "${command} ${args.join(' ')} ${options.join(' ')}"\n`);

		const exitCode = await execute(
			logStream,
			{
				command,
				options,
			},
			args,
		);

		if (exitCode === 0) {
			successfulCommands.push(command);
		} else {
			failedCommands.push(command);
		}
	}

	if (successfulCommands.length > 0) {
		logStream.write(`Successful commands: ${successfulCommands.join(', ')}\n`);
	}

	if (failedCommands.length > 0) {
		logStream.write(`Failed commands: ${failedCommands.join(', ')}\n`);
	}

	return failedCommands.length > 0 ? 1 : 0;
}

await buildCommands(
	'shared-config',
	undefined, // Too much noise with 'Shared Config'?
	'yellow',
	Object.keys(capabilities).reduce<OptionCommands>((acc, capability) => {
		acc[capability as keyof OptionCommands] = {
			async command(logStream, args) {
				return executeCommands(logStream, capabilities[capability] as string[], [`--${kebabCase(capability)}`], args);
			},
			defaultArguments: [],
		};
		return acc;
	}, {}),
);
