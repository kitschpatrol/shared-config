#!/usr/bin/env zx
/* eslint-disable unicorn/prefer-module */
import minimist from 'minimist';
import { $, fs, path } from 'zx';
import 'zx/globals';

async function main() {
	const options = ['init'];
	const args = minimist(process.argv.slice(2), {
		boolean: options,
	});

	const argumentCount = options.reduce((count, argument) => count + (args[argument] ? 1 : 0), 0);
	if (argumentCount !== 1) {
		console.error(`[VSCode-Config] Please provide exactly one of ${options.map((opt) => `--${opt}`).join(' or ')}`);
		process.exit(1);
	}

	process.env.FORCE_COLOR = '1';
	if (args.init) {
		const sourceDirectory = path.join(__dirname, 'init');
		const destinationDirectory = path.join(process.cwd(), '.vscode');

		// Create .vscode directory if it doesn't exist
		await $`mkdir -p ${destinationDirectory}`.nothrow();

		for (const file of await fs.readdir(sourceDirectory)) {
			const sourcePath = path.join(sourceDirectory, file);
			const destinationPath = path.join(destinationDirectory, file);

			// Merge with existing, if present
			if (await fs.exists(destinationPath)) {
				const [sourceData, destinationData] = await Promise.all([
					fs.readFile(sourcePath, 'utf8').then(JSON.parse),
					fs.readFile(destinationPath, 'utf8').then(JSON.parse),
				]);

				const mergedData = { ...destinationData, ...sourceData };

				await fs.writeFile(destinationPath, JSON.stringify(mergedData, undefined, 2));
				console.log(`Merged ${file} with the existing file in .vscode folder.`);
			} else {
				// Copy file if it doesn't exist
				await $`cp ${sourcePath} ${destinationPath}`.nothrow();
				console.log(`Copied ${file} to .vscode folder.`);
			}
		}
	}
}

await main();
