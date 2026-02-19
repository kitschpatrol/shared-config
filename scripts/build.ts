import { build } from 'esbuild'

await build({
	banner: {
		// https://github.com/evanw/esbuild/issues/1921#issuecomment-2302290651
		js: 'import { createRequire } from "module";\nconst require = createRequire(import.meta.url);',
	},
	bundle: true,
	entryPoints: ['src/cli.ts'],
	format: 'esm',
	minify: false,
	outfile: 'bin/cli.js',
	packages: 'external',
	platform: 'node',
	target: 'node20',
})
