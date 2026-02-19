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
	},
	// Shared config library
	{
		attw: {
			profile: 'esm-only',
		},
		fixedExtension: false,
		minify: true,
		publint: true,
	},
])
