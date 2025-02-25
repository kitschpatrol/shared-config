import pluginJson from 'eslint-plugin-jsonc'
import pluginJsonPackage from 'eslint-plugin-package-json'
import parserJson from 'jsonc-eslint-parser'
import { sortOrder as sortPackageJsonSortOrder } from 'sort-package-json'
import type { OptionsOverrides, TypedFlatConfigItem } from '../types'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import {
	jsonPackageRecommendedRules,
	jsonPrettierRules,
	jsonRecommendedWithJson5Rules,
	jsonRecommendedWithJsonCommonRules,
	jsonRecommendedWithJsoncRules,
	jsonRecommendedWithJsonRules,
} from '../presets'

export async function json(options: OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
	const { overrides = {} } = options

	return [
		// Jsonc plugin
		{
			name: 'kp/json/setup',
			plugins: {
				json: pluginJson,
				'json-package': pluginJsonPackage,
			},
		},
		{
			files: [GLOB_JSON],
			languageOptions: {
				parser: parserJson,
			},
			name: 'kp/json/rules-json',
			rules: {
				...jsonRecommendedWithJsonRules,
			},
		},
		{
			files: [GLOB_JSONC],
			languageOptions: {
				parser: parserJson,
			},
			name: 'kp/json/rules-jsonc',
			rules: {
				...jsonRecommendedWithJsoncRules,
			},
		},
		{
			files: [GLOB_JSON5],
			languageOptions: {
				parser: parserJson,
			},
			name: 'kp/json/rules-json5',
			rules: {
				...jsonRecommendedWithJson5Rules,
			},
		},
		{
			files: [GLOB_JSON, GLOB_JSONC, GLOB_JSON5],
			name: 'kp/json/rules',
			rules: {
				...jsonRecommendedWithJsonCommonRules,
				...jsonPrettierRules,
			},
		},
		// VS Code settings
		{
			files: ['.vscode/**.json'],
			name: 'kp/json/rules-settings',
			rules: {
				...jsonRecommendedWithJsoncRules,
				'json/no-comments': 'off',
			},
		},
		// Package json
		{
			// TODO parser situation? Fine since it's already inheriting parser from above?
			files: ['**/package.json'],
			name: 'kp/json/rules-package',
			rules: {
				...jsonPackageRecommendedRules,
				'json-package/no-redundant-files': 'error',
				'json-package/order-properties': [
					'error',
					{
						// Put shared-config keys at the end...
						// otherwise sortPackageJsonSortOrder scatters them in the
						// middle of package.json.
						// This must stay in sync with packages/prettier-config/src/index.ts
						order: customizeSortOrder(sortPackageJsonSortOrder, [
							'cspell',
							'knip',
							'mdat',
							'prettier',
							'remarkConfig',
							'stylelint',
						]),
					},
				],
				'json-package/require-author': 'error',
				'json-package/require-keywords': 'error',
			},
		},
		// Sort tsconfig
		{
			files: [
				'**/tsconfig.json',
				'**/tsconfig.*.json',
				// Special case for boilerplate tsconfigs in
				// @kitschpatrol/typescript-config
				'**/tsconfigs/**/*.json',
			],
			name: 'kp/json/rules-tsconfig',
			rules: {
				'json/no-comments': 'off',
				'json/sort-keys': [
					'error',
					{
						order: ['extends', 'compilerOptions', 'references', 'files', 'include', 'exclude'],
						pathPattern: '^$',
					},
					{
						order: [
							/* Projects */
							'incremental',
							'composite',
							'tsBuildInfoFile',
							'disableSourceOfProjectReferenceRedirect',
							'disableSolutionSearching',
							'disableReferencedProjectLoad',
							/* Language and Environment */
							'target',
							'jsx',
							'jsxFactory',
							'jsxFragmentFactory',
							'jsxImportSource',
							'lib',
							'moduleDetection',
							'noLib',
							'reactNamespace',
							'useDefineForClassFields',
							'emitDecoratorMetadata',
							'experimentalDecorators',
							/* Modules */
							'baseUrl',
							'rootDir',
							'rootDirs',
							'customConditions',
							'module',
							'moduleResolution',
							'moduleSuffixes',
							'noResolve',
							'paths',
							'resolveJsonModule',
							'resolvePackageJsonExports',
							'resolvePackageJsonImports',
							'typeRoots',
							'types',
							'allowArbitraryExtensions',
							'allowImportingTsExtensions',
							'allowUmdGlobalAccess',
							/* JavaScript Support */
							'allowJs',
							'checkJs',
							'maxNodeModuleJsDepth',
							/* Type Checking */
							'strict',
							'strictBindCallApply',
							'strictFunctionTypes',
							'strictNullChecks',
							'strictPropertyInitialization',
							'allowUnreachableCode',
							'allowUnusedLabels',
							'alwaysStrict',
							'exactOptionalPropertyTypes',
							'noFallthroughCasesInSwitch',
							'noImplicitAny',
							'noImplicitOverride',
							'noImplicitReturns',
							'noImplicitThis',
							'noPropertyAccessFromIndexSignature',
							'noUncheckedIndexedAccess',
							'noUnusedLocals',
							'noUnusedParameters',
							'useUnknownInCatchVariables',
							/* Emit */
							'declaration',
							'declarationDir',
							'declarationMap',
							'downlevelIteration',
							'emitBOM',
							'emitDeclarationOnly',
							'importHelpers',
							'importsNotUsedAsValues',
							'inlineSourceMap',
							'inlineSources',
							'mapRoot',
							'newLine',
							'noEmit',
							'noEmitHelpers',
							'noEmitOnError',
							'outDir',
							'outFile',
							'preserveConstEnums',
							'preserveValueImports',
							'removeComments',
							'sourceMap',
							'sourceRoot',
							'stripInternal',
							/* Interop Constraints */
							'allowSyntheticDefaultImports',
							'esModuleInterop',
							'forceConsistentCasingInFileNames',
							'isolatedDeclarations',
							'isolatedModules',
							'preserveSymlinks',
							'verbatimModuleSyntax',
							/* Completeness */
							'skipDefaultLibCheck',
							'skipLibCheck',
						],
						pathPattern: '^compilerOptions$',
					},
				],
			},
		},
		{
			files: [GLOB_JSON, GLOB_JSONC, GLOB_JSON5],
			name: 'kp/json/rules-overrides',
			rules: {
				...overrides,
			},
		},
	]
}

/**
 * Merge custom keys into the `sort-package-json` `order` array. Where
 * duplicated, delete existing and prioritize new keys.
 */
function customizeSortOrder(keys: string[], newKeys: string[]): string[] {
	// If new keys are in keys, remove them
	const filteredKeys = keys.filter((key) => !newKeys.includes(key))

	// Append new keys to the end
	return [...filteredKeys, ...newKeys]
}
