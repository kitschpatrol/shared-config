import { type CommandDefinition } from '../../../src/command-builder-new.js'

export const commandDefinition: CommandDefinition = {
	command: 'remark-config',
	description: 'TK. Linting and fixing of issues in Markdown files is managed through ESLint.',
	logColor: 'blue',
	logPrefix: '[remarklint]',
	subcommands: {
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
}
