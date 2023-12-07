/* eslint-disable unicorn/no-process-exit */
// Helper to run multiple commands
import { spawn } from 'node:child_process';
import console from 'node:console';
import { once } from 'node:events';
import process from 'node:process';

const commands = stylePrefixes([
	{
		command: 'eslint .',
		fixArgument: '--fix',
		lintArgument: '',
		prefix: 'ESLint',
	},
	// Other commands...
	{
		command: 'stylelint --ignore-path .gitignore --allow-empty-input "**/*.{css,scss,sass,svelte,html,astro}"',
		fixArgument: '--fix',
		lintArgument: '',
		prefix: 'Stylelint',
	},
	{
		command:
			'prettier --plugin=@prettier/plugin-php --plugin=@prettier/plugin-ruby --plugin=@prettier/plugin-xml --plugin=prettier-plugin-astro --plugin=prettier-plugin-pkg --plugin=prettier-plugin-sh --plugin=prettier-plugin-sql --plugin=prettier-plugin-svelte --plugin=prettier-plugin-tailwindcss --plugin=prettier-plugin-toml .',
		fixArgument: '--write',
		lintArgument: '--check',
		prefix: 'Prettier',
	},
	{
		command: 'markdownlint "**/*.{md,mdx}" --ignore-path .gitignore',
		fixArgument: '--fix',
		lintArgument: '',
		prefix: 'markdownlint',
	},
	{
		command: 'cspell --quiet .',
		fixArgument: '',
		lintArgument: '',
		prefix: 'CSpell',
	},
]);

function stylePrefixes(commands) {
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
	const longestPrefixLength = commands.reduce((max, cmd) => Math.max(max, cmd.prefix.length), 0);

	// Pad each prefix with spaces to match the length of the longest prefix
	return commands.map((cmd, index) => {
		const colorCode = boldCode + colors[index % colors.length];
		const paddedLength = longestPrefixLength;
		const paddingLength = paddedLength - cmd.prefix.length;
		const paddedPrefix = colorCode + '[' + cmd.prefix + ' '.repeat(paddingLength) + ']' + resetCode;
		return { ...cmd, prefix: paddedPrefix };
	});
}

async function runCommand({ command, fixArgument, lintArgument, prefix }, fix = false) {
	const fullCommand = `${command} ${fix ? fixArgument : lintArgument}`;
	console.log(`${prefix} Running command: ${fullCommand}`);

	const subprocess = spawn(fullCommand, {
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
			process.stdout.write(prefixedLines + '\n'); // Add a newline at the end if there's output
		}
	});

	subprocess.stderr.on('data', (data) => {
		const lines = data.toString().split(/\r?\n/);
		const prefixedLines = lines
			.filter((line) => line.trim() !== '') // Filter out empty lines
			.map((line) => `${prefix} ${line}`)
			.join('\n');
		if (prefixedLines) {
			console.error(prefixedLines + '\n'); // Add a newline at the end if there's output
		}
	});

	// Wait for the 'close' event
	const [code] = await once(subprocess, 'close');
	if (code !== 0) {
		throw new Error(`${prefix} Command failed with exit code ${code}`);
	}
}

export async function runAllCommands(fix = false) {
	let errors = [];
	for (const cmd of commands) {
		try {
			await runCommand(cmd, fix);
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
