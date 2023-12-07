// Copies configuration files for all tools to the root of the project
// It does not overwrite existing files

import { exec as execCallback } from 'node:child_process';
import console from 'node:console';
import { promisify } from 'node:util';

const exec = promisify(execCallback);

async function execCommand(command) {
	try {
		const { stderr, stdout } = await exec(command);
		if (stderr) {
			console.error(`stderr: ${stderr}`);
		}
		console.log(stdout);
		return stdout;
	} catch (error) {
		console.error(`Error: ${error}`);
		throw error; // Rethrow the error for further handling
	}
}

async function runCommands() {
	try {
		await execCommand('pnpm exec eslint-config-init');
		await execCommand('pnpm exec prettier-config-init');
		await execCommand('pnpm exec stylelint-config-init');
		await execCommand('pnpm exec npm-config-init');
		await execCommand('pnpm exec markdownlint-config-init');
		await execCommand('pnpm exec cspell-config-init');
		await execCommand('pnpm exec vscode-config-init');
		console.log('All configurations have been initialized successfully.');
	} catch (error) {
		console.error('An error occurred while initializing configurations:', error);
	}
}

await runCommands();
