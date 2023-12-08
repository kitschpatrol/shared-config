#!/usr/bin/env zx
/* eslint-disable unicorn/prefer-module */
import minimist from 'minimist';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { $ } from 'zx';

const options = ['fix', 'init', 'check'];
async function main() {
	const args = minimist(process.argv.slice(2), {
		boolean: options,
	});

	const argumentCount = options.reduce((count, argument) => count + (args[argument] ? 1 : 0), 0);
	if (argumentCount !== 1) {
		console.error(`[SharedConfig] Please provide exactly one of ${options.map((opt) => `--${opt}`).join(' or ')}`);
		process.exit(1);
	}

	const commands = [
		'cspell-config',
		'eslint-config',
		'markdownlint-config',
		'npm-config',
		'prettier-config',
		'stylelint-config',
		'vscode-config',
	];

	const capabilities = await getCapabilities(commands);

	process.env.FORCE_COLOR = '1';
	if (args.init) {
		const capabilitiesWithInit = stylePrefixes(capabilities.filter((capability) => capability.init));

		for (const capability of capabilitiesWithInit) {
			console.log(`${capability.name} Running command: ${capability.command} --init`);
			await $`${capability.command} --init`;
			console.log('\n');
		}
		console.log('Initialization complete.');
	} else if (args.fix) {
		runAllCommands(capabilities, 'fix');
	} else if (args.check) {
		runAllCommands(capabilities, 'check');
	}
}

await main();

// helpers
async function runCommand(command, prefix) {
	// console.log(`${prefix} Running command: ${command}`);

	const subprocess = spawn(command, {
		env: { ...process.env, FORCE_COLOR: true },
		shell: true,
	});

	subprocess.stdout.on('data', (data) => {
		const lines = data.toString().split(/\r?\n/);
		const prefixedLines = lines
			.filter((line) => line.trim() !== '') // Filter out empty lines
			.map((line) => `${prefix} ${line}`)
			.join('\n');
		if (prefixedLines) {
			process.stdout.write(prefixedLines); // Add a newline at the end if there's output
		}
	});

	subprocess.stderr.on('data', (data) => {
		const lines = data.toString().split(/\r?\n/);
		const prefixedLines = lines
			.filter((line) => line.trim() !== '') // Filter out empty lines
			.map((line) => `${prefix} ${line}`)
			.join('\n');
		if (prefixedLines) {
			console.error(prefixedLines); // Add a newline at the end if there's output
		}
	});

	// Wait for the 'close' event
	const [code] = await once(subprocess, 'close');
	if (code !== 0) {
		throw new Error(`${prefix} Command failed with exit code ${code}`);
	}
}

function stylePrefixes(capabilities) {
	// ANSI color codes (excluding red and ANSI 256-colors)
	const colors = [
		'\u001B[32m', // Green
		'\u001B[34m', // Blue
		'\u001B[33m', // Yellow
		'\u001B[35m', // Magenta
		'\u001B[36m', // Cyan
		'\u001B[94m', // Bright Blue
		'\u001B[92m', // Bright Green
		'\u001B[93m', // Bright Yellow
		'\u001B[95m', // Bright Magenta
	];
	const boldCode = '\u001B[1m';
	const resetCode = '\u001B[0m';

	// Find the length of the longest prefix
	const longestPrefixLength = capabilities.reduce((max, capability) => Math.max(max, capability.name.length), 0);

	// Pad each prefix with spaces to match the length of the longest prefix
	return capabilities.map((cmd, index) => {
		const colorCode = boldCode + colors[index % colors.length];
		const paddedLength = longestPrefixLength;
		const paddingLength = paddedLength - cmd.name.length;
		const paddedPrefix = colorCode + '[' + cmd.name + ' '.repeat(paddingLength) + ']' + resetCode;
		return { ...cmd, name: paddedPrefix };
	});
}

export async function runAllCommands(capabilities, option) {
	const capabilitiesWithCommand = stylePrefixes(capabilities.filter((commandInfo) => commandInfo[option]));

	let errors = [];
	for (const cmd of capabilitiesWithCommand) {
		try {
			await runCommand(`${cmd.command} --${option}`, cmd.name);
		} catch (error) {
			errors.push(error.message);
		}
	}

	if (errors.length > 0) {
		console.error(`${errors.length} task(s) failed:`);
		for (const error of errors) console.error(error);
		process.exit(1);
	} else {
		console.log('All tasks completed successfully.');
		process.exit(0);
	}
}

async function getCapabilities(commands) {
	$.verbose = false;
	const capabilities = await Promise.all(
		commands.map(async (command) => {
			try {
				await $`${command}`;
				// console.log('Command completed successfully.');
			} catch (error) {
				return {
					command,
					...parseCapabilities(error.stderr.trim()),
				};
			}

			console.error(`[SharedConfig] ${command} did not return any capabilities.`);
			return '';
		}),
	);
	$.verbose = true;
	return capabilities;
}

function parseCapabilities(output) {
	const parts = output.match(/\[(.*?)] Please provide exactly one of (.*)/);
	if (!parts) return;

	const name = parts[1];
	const options = new Set(parts[2].split(' or ').map((opt) => opt.trim().replace('--', '')));

	return {
		check: options.has('check'),
		fix: options.has('fix'),
		init: options.has('init'),
		name,
	};
}
