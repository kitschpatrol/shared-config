import pluginCspell from '@cspell/eslint-plugin'
import { includeIgnoreFile } from '@eslint/compat'
import eslint from '@eslint/js'
import pluginImportX from 'eslint-plugin-import-x'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import fs from 'node:fs'
import path from 'node:path'
import typescriptEslint from 'typescript-eslint'

const gitignorePath = path.join(process.cwd(), '.gitignore')

export default typescriptEslint.config(
	// Use project .gitignore file for a basis of ignored files
	{
		ignores: fs.existsSync(gitignorePath) ? includeIgnoreFile(gitignorePath)?.ignores : [],
	},
	// 1st party eslint config
	eslint.configs.recommended,
	// Unicorn config
	pluginUnicorn.configs['flat/recommended'],
	// ImportX config
	pluginImportX.flatConfigs.recommended,
	// Enable cspell plugin
	{
		name: 'CSpell config',
		plugins: {
			'@cspell': pluginCspell,
		},
		rules: {
			'@cspell/spellchecker': 1,
		},
	},
	// Typescript config
	{
		name: 'Typescript config',
		files: ['**/*.ts'],
		extends: [
			...typescriptEslint.configs.recommendedTypeChecked,
			...typescriptEslint.configs.stylisticTypeChecked,
			pluginImportX.flatConfigs.typescript,
		],
		languageOptions: {
			parserOptions: {
				project: ['tsconfig.eslint.json'],
			},
		},
	},
	// Primary config
	{
		name: 'Primary config',
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			parserOptions: {
				requireConfigFile: false,
				ecmaVersion: 2024,
				sourceType: 'module',
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		settings: {
			'import-x/resolver': {
				node: {
					extensions: ['.js', '.mjs', '.cjs', '.ts'],
				},
				typescript: {
					alwaysTryTypes: true,
				},
			},
		},
		rules: {
			// ImportX rule overrides
			'import-x/exports-last': 'error',
			'import-x/first': 'error',
			'import-x/extensions': ['error', 'ignorePackages'],
			'import-x/newline-after-import': 'error',
			'import-x/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: [
						'./*.{mjs,cjs,js,ts}', // Any root project files
						'**/dev/**/', // Any files in a 'dev/' dir
						'**/dev.{mjs,cjs,js,ts}', // Any file named dev
						'**/*.{test}.{mjs,cjs,js,ts}', // Any test files
						'**/{test,tests,__tests__}/**/', // Any files in common test dirs
					],
				},
			],
			'import-x/no-absolute-path': 'error',
			'import-x/no-amd': 'error',
			'import-x/no-dynamic-require': 'error',
			'import-x/no-import-module-exports': 'error',
			'import-x/no-mutable-exports': 'error',
			'import-x/no-named-default': 'error',
			'import-x/no-relative-packages': 'error',
			'import-x/no-self-import': 'error',
			'import-x/no-useless-path-segments': 'error',
			'import-x/no-webpack-loader-syntax': 'error',
			// Unicorn rule overrides
			'unicorn/no-array-reduce': 'off',
			'unicorn/no-object-as-default-parameter': 'off',
			'unicorn/prefer-top-level-await': 'off',
			'unicorn/prevent-abbreviations': [
				'error',
				{
					allowList: {
						dev: true,
						useDevServer: true,
						args: true,
					},
				},
			],
		},
	},
	// Prettier must come last
	// Prettier config
	pluginPrettierRecommended,
	{
		name: 'Prettier config',
		rules: {
			'prettier/prettier': 'error',
		},
	},
)
