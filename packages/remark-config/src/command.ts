import { type CommandDefinition, getCosmiconfigCommand } from '../../../src/command-builder.js'

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
		printConfig: {
			commands: [getCosmiconfigCommand('remark')],
			description: 'Print the Remark configuration.',
			positionalArgumentMode: 'none',
		},
	},
	description: 'TK. Linting and fixing of issues in Markdown files is managed through ESLint.',
	logColor: 'blue',
	logPrefix: '[remarklint]',
	name: 'kpsc-remark',
}
