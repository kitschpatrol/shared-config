import { default as pluginJson } from 'eslint-plugin-jsonc'
import pluginJsonPackage from 'eslint-plugin-package-json'
import { default as parserJson } from 'jsonc-eslint-parser'

import type { OptionsOverrides, Rules, TypedFlatConfigItem } from '../types'

import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'

/* eslint-disable ts/naming-convention */

// Note that 'json-package/order-properties' defaults to 'sort-package-json'
const jsonPackageRecommendedRules: Rules = {
	// Begin expansion 'eslint-plugin-package-json/configs/recommended' 'rules'
	'json-package/order-properties': 'error',
	'json-package/repository-shorthand': 'error',
	'json-package/sort-collections': 'error',
	'json-package/unique-dependencies': 'error',
	'json-package/valid-local-dependency': 'error',
	'json-package/valid-name': 'error',
	'json-package/valid-package-definition': 'error',
	'json-package/valid-repository-directory': 'error',
	'json-package/valid-version': 'error',
	// End expansion
}

const jsonRecommendedWithJsonCommonRules: Rules = {
	// Begin expansion 'eslint-plugin-jsonc' 'flat/recommended-with-json[1]'
	'no-unused-expressions': 'off',
	'no-unused-vars': 'off',
	strict: 'off',
	// End expansion
}

const jsonRecommendedWithJsonRules: Rules = {
	// Begin expansion 'eslint-plugin-jsonc' 'flat/recommended-with-json[2]'
	'json/comma-dangle': 'error',
	'json/no-bigint-literals': 'error',
	'json/no-binary-expression': 'error',
	'json/no-binary-numeric-literals': 'error',
	'json/no-comments': 'error',
	'json/no-dupe-keys': 'error',
	'json/no-escape-sequence-in-identifier': 'error',
	'json/no-floating-decimal': 'error',
	'json/no-hexadecimal-numeric-literals': 'error',
	'json/no-infinity': 'error',
	'json/no-multi-str': 'error',
	'json/no-nan': 'error',
	'json/no-number-props': 'error',
	'json/no-numeric-separators': 'error',
	'json/no-octal': 'error',
	'json/no-octal-numeric-literals': 'error',
	'json/no-parenthesized': 'error',
	'json/no-plus-sign': 'error',
	'json/no-regexp-literals': 'error',
	'json/no-sparse-arrays': 'error',
	'json/no-template-literals': 'error',
	'json/no-undefined-value': 'error',
	'json/no-unicode-codepoint-escapes': 'error',
	'json/no-useless-escape': 'error',
	'json/quote-props': 'error',
	'json/quotes': 'error',
	'json/space-unary-ops': 'error',
	'json/valid-json-number': 'error',
	'json/vue-custom-block/no-parsing-error': 'error',
	// End expansion
}

const jsonRecommendedWithJsoncRules: Rules = {
	// Begin expansion 'eslint-plugin-jsonc' 'flat/recommended-with-jsonc[2]'
	'json/no-bigint-literals': 'error',
	'json/no-binary-expression': 'error',
	'json/no-binary-numeric-literals': 'error',
	'json/no-dupe-keys': 'error',
	'json/no-escape-sequence-in-identifier': 'error',
	'json/no-floating-decimal': 'error',
	'json/no-hexadecimal-numeric-literals': 'error',
	'json/no-infinity': 'error',
	'json/no-multi-str': 'error',
	'json/no-nan': 'error',
	'json/no-number-props': 'error',
	'json/no-numeric-separators': 'error',
	'json/no-octal': 'error',
	'json/no-octal-numeric-literals': 'error',
	'json/no-parenthesized': 'error',
	'json/no-plus-sign': 'error',
	'json/no-regexp-literals': 'error',
	'json/no-sparse-arrays': 'error',
	'json/no-template-literals': 'error',
	'json/no-undefined-value': 'error',
	'json/no-unicode-codepoint-escapes': 'error',
	'json/no-useless-escape': 'error',
	'json/quote-props': 'error',
	'json/quotes': 'error',
	'json/space-unary-ops': 'error',
	'json/valid-json-number': 'error',
	'json/vue-custom-block/no-parsing-error': 'error',
	// End expansion
}

const jsonRecommendedWithJson5Rules: Rules = {
	// Begin expansion 'eslint-plugin-jsonc' 'flat/recommended-with-json5[2]'
	'json/no-bigint-literals': 'error',
	'json/no-binary-expression': 'error',
	'json/no-binary-numeric-literals': 'error',
	'json/no-dupe-keys': 'error',
	'json/no-escape-sequence-in-identifier': 'error',
	'json/no-number-props': 'error',
	'json/no-numeric-separators': 'error',
	'json/no-octal': 'error',
	'json/no-octal-numeric-literals': 'error',
	'json/no-parenthesized': 'error',
	'json/no-regexp-literals': 'error',
	'json/no-sparse-arrays': 'error',
	'json/no-template-literals': 'error',
	'json/no-undefined-value': 'error',
	'json/no-unicode-codepoint-escapes': 'error',
	'json/no-useless-escape': 'error',
	'json/space-unary-ops': 'error',
	'json/vue-custom-block/no-parsing-error': 'error',
	// End expansion
}

const jsonPrettierRules: Rules = {
	// Begin expansion 'eslint-plugin-jsonc' 'flat/prettier[2]'
	'json/array-bracket-newline': 'off',
	'json/array-bracket-spacing': 'off',
	'json/array-element-newline': 'off',
	'json/comma-dangle': 'off',
	'json/comma-style': 'off',
	'json/indent': 'off',
	'json/key-spacing': 'off',
	'json/no-floating-decimal': 'off',
	'json/object-curly-newline': 'off',
	'json/object-curly-spacing': 'off',
	'json/object-property-newline': 'off',
	'json/quote-props': 'off',
	'json/quotes': 'off',
	'json/space-unary-ops': 'off',
	// End expansion
}

/* eslint-enable ts/naming-convention */

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
		// VSCode settings
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
				'json-package/order-properties': 'error',
				'json-package/valid-package-def': 'error',
			},
		},
		// Sort tsconfig
		{
			files: ['**/tsconfig.json', '**/tsconfig.*.json'],
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
