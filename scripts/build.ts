#!/usr/bin/env tsx
import esbuild from 'esbuild'

await esbuild.build({
	bundle: true,
	entryPoints: ['src/cli.ts'],
	external: ['execa', '@pinojs/json-colorizer', 'cosmiconfig', 'fs-extra'],
	format: 'esm',
	minify: false,
	outfile: 'bin/cli.js',
	platform: 'node',
	target: 'node22',
})
