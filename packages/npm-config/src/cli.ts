#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { packageUp } from 'package-up';

await buildCommands('npm-config', 'NPM Config', 'gray', {
	init: {},
	printConfig: {
		async command(logStream) {
			const packageFile = await packageUp();
			if (packageFile === undefined) {
				logStream.write('Error: The `--printConfig` flag must be used in a directory with a package.json file\n');
				return 1;
			}

			const packageDirectory = path.dirname(packageFile);
			const npmrcFile = path.join(packageDirectory, '.npmrc');
			logStream.write(await fs.readFile(npmrcFile, 'utf8'));
			logStream.write('\n');
			return 1;
		},
	},
});
