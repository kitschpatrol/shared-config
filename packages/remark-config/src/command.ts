import type { CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION, getCosmiconfigCommand } from '../../../src/command-builder.js'

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
			locationOptionFlag: true,
		},
		printConfig: {
			commands: [getCosmiconfigCommand('remark')],
			description: `Print the effective Remark configuration. ${DESCRIPTION.packageSearch} ${DESCRIPTION.monorepoSearch}`,
			positionalArgumentMode: 'none',
		},
	},
	description:
		"Kitschpatrol's Remark and Remark Lint shared configuration tools. (Actual linting and fixing is managed through @kitschpatrol/eslint-config.)",
	logColor: 'blue',
	logPrefix: '[remarklint]',
	name: 'kpi-remark',
	order: 8,
}
