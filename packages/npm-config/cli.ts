#!/usr/bin/env node
import { buildCommands } from '../../utils/command-builder.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { packageUp } from 'package-up';

await buildCommands('npm-config', {
	init: {},
	printConfig: {
		async command() {
			const packageFile = await packageUp();
			if (packageFile === undefined) {
				console.error('The `--printConfig` flag must be used in a directory with a package.json file');
				process.exit(1);
			}

			const packageDirectory = path.dirname(packageFile);
			const npmrcFile = path.join(packageDirectory, '.npmrc');
			return fs.readFile(npmrcFile, 'utf8');
		},
	},
});
