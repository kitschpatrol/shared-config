#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder-new.js'

await buildCommands(
	'remark-config',
	'TK. Linting and fixing of issues in Markdown files is managed through ESLint.',
	'[remarklint]',
	'blue',
	{
		init: {
			// Note that remark.config.js is not detected by the config resolver ಠ_ಠ
			configFile: '.remarkrc.js',
			configPackageJson: {
				remarkConfig: {
					plugins: ['@kitschpatrol/remark-config'],
				},
			},
			locationOptionFlag: false,
		},
		// printConfig: {}, // Use default implementation,
	},
)
