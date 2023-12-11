#!/usr/bin/env node
import { type OptionCommands, buildCommands, execute } from './utils/command-builder.js';
import camelCase from 'camelcase';
import { execa } from 'execa';
import { globby } from 'globby';
import fs from 'node:fs/promises';

// Todo cache this stuff or write it to a file...
async function getBinNames(): Promise<string[]> {
	const paths = await globby('./packages/*/package.json');

	const names: string[] = [];
	for (const path of paths) {
		const packageJson = JSON.parse(await fs.readFile(path, 'utf8')) as Record<string, unknown>;
		const bin = packageJson.bin as Record<string, string> | undefined;

		if (bin) {
			for (const name of Object.keys(bin)) {
				names.push(name);
			}
		} else {
			console.error(`No bin key found in package.json for ${path}`);
		}
	}

	return names;
}

async function getCapabilities(binName: string): Promise<string[]> {
	const helpText = await execa(binName, ['--help']);

	if (helpText.exitCode !== 0 || helpText.stdout === undefined || helpText.stdout.length === 0) {
		console.error(`Error getting capabilities for ${binName}`);
		process.exit(1);
	}

	const capabilities: string[] = [];
	for (const match of helpText.stdout.matchAll(/--([a-z-]+)/g)) {
		capabilities.push(match[1]);
	}

	return capabilities;
}

type Capabilities = Record<string, string[]>;

const capabilities: Capabilities = {};
for (const binName of await getBinNames()) {
	for (const capability of await getCapabilities(binName)) {
		capabilities[capability] = [...(capabilities[capability] ?? []), binName];
	}
}

// Console.log(`capabilities: ${JSON.stringify(capabilities, undefined, 2)}`);

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
		acc[camelCase(capability) as keyof OptionCommands] = {
			async command(args) {
				return executeCommands(capabilities[capability], [`--${capability}`], args);
			},
			defaultArguments: [],
		};
		return acc;
	}, {}),
);
