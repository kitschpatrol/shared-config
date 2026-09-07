import { defineConfig } from 'tsdown'

export default defineConfig([
	// CLI tool
	{
		dts: false,
		entry: 'src/cli.ts',
		fixedExtension: false,
		minify: true,
		outDir: 'bin',
		publint: true,
		tsconfig: false,
	},
	// Shared config library
	{
		attw: true,
		entry: 'src/index.ts',
		fixedExtension: false,
		minify: true,
		publint: true,
		tsconfig: 'tsconfig.build.json',
	},
])
