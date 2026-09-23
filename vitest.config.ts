import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		exclude: [...configDefaults.exclude, '**/coverage/**'],
		testTimeout: 30_000,
	},
})
