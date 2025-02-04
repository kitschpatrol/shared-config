import { type CommandDefinition } from '../../../src/command-builder.js'

export const commandDefinition: CommandDefinition = {
	commands: {
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
	description: 'TK. Linting and fixing of issues in Markdown files is managed through ESLint.',
	logColor: 'blue',
	logPrefix: '[remarklint]',
	name: 'remark-config',
}
