#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js';

await buildCommands('remark-config', 'remarklint', 'blue', {
	init: {},
	printConfig: {
		async command(logStream) {
			logStream.write('TODO\n');
			return 0;
		},
	},
});
