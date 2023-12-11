#!/usr/bin/env node
import { buildCommands } from '../../utils/command-builder.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { packageUp } from 'package-up';

// TODO DRY or simplify this...
// Or move merge logic into default init implementation?

async function checkFileExists(file: string): Promise<boolean> {
	try {
		await fs.stat(file);
		return true; // File exists
	} catch (error) {
		if (error.code === 'ENOENT') {
			return false; // File does not exist
		}

		// Re-throw the error if it's not a 'File does not exist' error
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw error;
	}
}

await buildCommands('vscode-config', {
	init: {
		async command() {
			const destinationPackage = await packageUp();
			if (destinationPackage === undefined) {
				console.error('The `--init` flag must be used in a directory with a package.json file somewhere above it');
				process.exit(1);
			}

			const sourcePackage = await packageUp({ cwd: fileURLToPath(import.meta.url) });
			if (sourcePackage === undefined) {
				console.error('The script being called was not in a package, weird.');
				process.exit(1);
			}

			const sourceDirectory = path.join(path.dirname(sourcePackage), 'init/');
			const destinationDirectory = path.join(path.dirname(destinationPackage), '.vscode/');

			// Create .vscode directory if it doesn't exist
			await fs.mkdir(destinationDirectory, { recursive: true });

			let output = '';

			for (const file of await fs.readdir(sourceDirectory)) {
				const sourcePath = path.join(sourceDirectory, file);
				const destinationPath = path.join(destinationDirectory, file);

				// Merge with existing, if present
				if (await checkFileExists(destinationPath)) {
					const [sourceData, destinationData] = await Promise.all([
						fs.readFile(sourcePath, 'utf8').then(JSON.parse) as Promise<Record<string, unknown>>,
						fs.readFile(destinationPath, 'utf8').then(JSON.parse) as Promise<Record<string, unknown>>,
					]);

					const mergedData = { ...destinationData, ...sourceData };

					await fs.writeFile(destinationPath, JSON.stringify(mergedData, undefined, 2));
					output += `Merged ${file} with the existing file in .vscode folder.\n`;
				} else {
					// Copy file if it doesn't exist
					await fs.copyFile(sourcePath, destinationPath);
					output += `Copied ${file} to .vscode folder.\n`;
				}
			}

			return output;
		},
		defaultArguments: [],
	},
	printConfig: {
		async command() {
			const destinationPackage = await packageUp();
			if (destinationPackage === undefined) {
				console.error('The `--init` flag must be used in a directory with a package.json file somewhere above it');
				process.exit(1);
			}

			const sourcePackage = await packageUp({ cwd: fileURLToPath(import.meta.url) });
			if (sourcePackage === undefined) {
				console.error('The script being called was not in a package, weird.');
				process.exit(1);
			}

			const sourceDirectory = path.join(path.dirname(sourcePackage), 'init/');
			const destinationDirectory = path.join(path.dirname(destinationPackage), '.vscode/');

			let output = '';
			for (const file of await fs.readdir(sourceDirectory)) {
				const destinationPath = path.join(destinationDirectory, file);

				// Merge with existing, if present
				if (await checkFileExists(destinationPath)) {
					const fileContent = JSON.parse(await fs.readFile(destinationPath, 'utf8')) as Promise<
						Record<string, unknown>
					>;
					output += `Contents of ${file}:\n${JSON.stringify(fileContent, undefined, 2)}\n`;
				} else {
					output += `Could not find ${file}\n`;
				}
			}

			return output;
		},
		defaultArguments: [],
	},
});
