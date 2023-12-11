#!/usr/bin/env node
import { capabilities } from '../build/capabilities.js';
import { type OptionCommands, buildCommands, execute } from './utils/command-builder.js';

function kebabCase(text: string): string {
	return text.replaceAll(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (match) => '-' + match.toLowerCase());
}

async function executeCommands(commands: string[], options: string[], args: string[]): Promise<number> {
	const successfulCommands: string[] = [];
	const failedCommands: string[] = [];

	for (const command of commands) {
		console.log(`[shared-config] Running "${command} --check"`);
		const exitCode = await execute(
			{
				command,
				options: ['--check'],
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
		console.log(`[shared-config] Successful commands: ${successfulCommands.join(', ')}`);
	}

	if (failedCommands.length > 0) {
		console.log(`[shared-config] Failed commands: ${failedCommands.join(', ')}`);
	}

	return failedCommands.length > 0 ? 1 : 0;
}

await buildCommands(
	'shared-config',
	Object.keys(capabilities).reduce<OptionCommands>((acc, capability) => {
		acc[capability as keyof OptionCommands] = {
			async command(args) {
				return executeCommands(capabilities[capability] as string[], [`--${kebabCase(capability)}`], args);
			},
			defaultArguments: [],
		};
		return acc;
	}, {}),
);
