import { knipConfig, sharedKnipConfig } from '@kitschpatrol/knip-config'

// Root-level entry patterns apply only to the root workspace, so the shared
// patterns, including bundled skill scripts, are repeated for every workspace.
const sharedEntry = typeof sharedKnipConfig === 'function' ? [] : (sharedKnipConfig.entry ?? [])

export default knipConfig({
	ignore: [
		'**/init/**',
		'test/fixtures/**',
		'**/test/fixtures/**',
		'packages/eslint-config/src/presets/**',
	],
	ignoreBinaries: ['ksdiff', 'pbcopy'],
	ignoreDependencies: [
		// Consumed only via marker-driven dynamic imports in the preset generation script
		'@eslint/js',
		'@types/eslint-config-prettier',
		'@types/react',
		'case-police',
		'eslint-config-prettier',
		'eslint-config-xo',
		'stylelint-config-html',
		'stylelint-config-standard',
		'stylelint-plugin-defensive-css',
	],
	workspaces: {
		'.': { entry: sharedEntry },
		'packages/*': { entry: sharedEntry },
	},
})
