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
	// No shared config library
	// for typescript-config
])
