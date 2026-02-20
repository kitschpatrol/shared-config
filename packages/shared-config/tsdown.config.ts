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
	// No shared config library
	// for shared-config
])
