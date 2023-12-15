#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js';
import { checkFileExists } from '../../../src/file-utils.js';
import { stringify } from '../../../src/json-utils.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { packageUp } from 'package-up';

// TODO DRY or simplify this...
// Or move merge logic into default init implementation?

await buildCommands('vscode-config', '[VSCode Config]', 'gray', {
	init: {
		async command(logStream) {
			const destinationPackage = await packageUp();
			if (destinationPackage === undefined) {
				logStream.write(
					'Error: The `--init` flag must be used in a directory with a package.json file somewhere above it\n',
				);
				return 1;
			}

			const sourcePackage = await packageUp({ cwd: fileURLToPath(import.meta.url) });
			if (sourcePackage === undefined) {
				logStream.write('Error: The script being called was not in a package, weird.\n');
				return 1;
			}

			const sourceDirectory = path.join(path.dirname(sourcePackage), 'init/');
			const destinationDirectory = path.join(path.dirname(destinationPackage), '.vscode/');

			// Create .vscode directory if it doesn't exist
			await fs.mkdir(destinationDirectory, { recursive: true });

			for (const file of await fs.readdir(sourceDirectory)) {
				const sourcePath = path.join(sourceDirectory, file);
				const destinationPath = path.join(destinationDirectory, file);

				// Merge with existing, if present
				if (await checkFileExists(destinationPath)) {
					const [sourceData, destinationData] = await Promise.all([
						fs.readFile(sourcePath, 'utf8').then(JSON.parse) as Promise<Record<string, unknown>>,
						fs.readFile(destinationPath, 'utf8').then(JSON.parse) as Promise<
							Record<string, unknown>
						>,
					]);

					const mergedData = { ...destinationData, ...sourceData };

					await fs.writeFile(destinationPath, JSON.stringify(mergedData, undefined, 2));
					logStream.write(`Merged ${file} with the existing file in .vscode folder.\n`);
				} else {
					// Copy file if it doesn't exist
					await fs.copyFile(sourcePath, destinationPath);
					logStream.write(`Copied ${file} to .vscode folder.\n`);
				}
			}

			return 1;
		},
		defaultArguments: [],
	},
	printConfig: {
		async command(logStream) {
			const destinationPackage = await packageUp();
			if (destinationPackage === undefined) {
				logStream.write(
					'Error: The `--print-config` flag must be used in a directory with a package.json file somewhere above it\n',
				);
				return 1;
			}

			const sourcePackage = await packageUp({ cwd: fileURLToPath(import.meta.url) });
			if (sourcePackage === undefined) {
				logStream.write('Error: The script being called was not in a package, weird.\n');
				return 1;
			}

			const sourceDirectory = path.join(path.dirname(sourcePackage), 'init/');
			const destinationDirectory = path.join(path.dirname(destinationPackage), '.vscode/');

			let exitCode = 0;

			for (const file of await fs.readdir(sourceDirectory)) {
				const destinationPath = path.join(destinationDirectory, file);

				// Merge with existing, if present
				if (await checkFileExists(destinationPath)) {
					const fileContent = JSON.parse(await fs.readFile(destinationPath, 'utf8')) as Promise<
						Record<string, unknown>
					>;
					logStream.write(`💾 Contents of "${file}":\n`);
					logStream.write(stringify(fileContent));
					logStream.write('\n');
				} else {
					logStream.write(`Error: Could not find ${file}\n`);
					exitCode = 1;
				}
			}

			return exitCode;
		},
		defaultArguments: [],
	},
});
