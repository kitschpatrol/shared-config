import { build } from 'esbuild'

await build({
	banner: {
		// https://github.com/evanw/esbuild/issues/1921#issuecomment-2302290651
		js: 'import { createRequire } from "module";\nconst require = createRequire(import.meta.url);',
	},
	bundle: true,
	entryPoints: ['src/cli.ts'],
	external: [
		'execa',
		'@pinojs/json-colorizer',
		'cosmiconfig',
		'cosmiconfig-typescript-loader',
		'fs-extra',
		'find-workspaces',
		'ls-engines',
		'cspell',
		'knip',
		'cspell-lib',
		'eslint',
		'mdat',
		'prettier',
		'semver',
		'stylelint',
		// Node.js built-in modules?
	],
	format: 'esm',
	minify: false,
	outfile: 'bin/cli.js',
	platform: 'node',
	target: 'node20',
})
