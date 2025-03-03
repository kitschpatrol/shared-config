import type { Rules } from '../types'

// Rule fishing shenanigans pending https://github.com/xojs/eslint-config-xo-typescript/issues/87
export const xoJavascriptRules: Rules = {
	// Begin expansion 'eslint-config-xo-typescript' '[0].rules'
	// "@stylistic/comma-dangle":["error","always-multiline"],
	'for-direction': 'error',
	'getter-return': 'error',
	'no-async-promise-executor': 'error',
	'no-await-in-loop': 'error',
	'no-compare-neg-zero': 'error',
	'no-cond-assign': 'error',
	'no-constant-condition': 'error',
	'no-control-regex': 'error',
	'no-debugger': 'error',
	'no-dupe-args': 'error',
	'no-dupe-else-if': 'error',
	'no-dupe-keys': 'error',
	'no-duplicate-case': 'error',
	'no-empty-character-class': 'error',
	'no-empty': ['error', { allowEmptyCatch: true }],
	'no-empty-static-block': 'error',
	'no-ex-assign': 'error',
	'no-extra-boolean-cast': 'error',
	// "@stylistic/no-extra-semi":"error",
	'no-func-assign': 'error',
	'no-import-assign': 'error',
	'no-inner-declarations': 'error',
	'no-invalid-regexp': 'error',
	'no-irregular-whitespace': 'error',
	'no-loss-of-precision': 'error',
	'no-misleading-character-class': 'error',
	'no-obj-calls': 'error',
	'no-promise-executor-return': 'error',
	'no-prototype-builtins': 'error',
	'no-regex-spaces': 'error',
	'no-setter-return': 'error',
	'no-sparse-arrays': 'error',
	'no-template-curly-in-string': 'error',
	'no-unreachable': 'error',
	'no-unreachable-loop': 'error',
	'no-unsafe-finally': 'error',
	'no-unsafe-negation': ['error', { enforceForOrderingRelations: true }],
	'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],
	'no-useless-backreference': 'error',
	'use-isnan': 'error',
	'valid-typeof': ['error', { requireStringLiterals: false }],
	'no-unexpected-multiline': 'error',
	'accessor-pairs': ['error', { enforceForClassMembers: true }],
	'array-callback-return': ['error', { allowImplicit: true }],
	'block-scoped-var': 'error',
	complexity: 'warn',
	curly: 'error',
	'default-case': 'error',
	'default-case-last': 'error',
	'dot-notation': 'error',
	// "@stylistic/dot-location":["error","property"],
	eqeqeq: 'error',
	'grouped-accessor-pairs': ['error', 'getBeforeSet'],
	'guard-for-in': 'error',
	'no-alert': 'error',
	'no-caller': 'error',
	'no-case-declarations': 'error',
	'no-constructor-return': 'error',
	'no-else-return': ['error', { allowElseIf: false }],
	'no-empty-pattern': 'error',
	'no-eq-null': 'error',
	'no-eval': 'error',
	'no-extend-native': 'error',
	'no-extra-bind': 'error',
	'no-extra-label': 'error',
	'no-fallthrough': 'error',
	// "@stylistic/no-floating-decimal":"error",
	'no-global-assign': 'error',
	'no-implicit-coercion': 'error',
	'no-implicit-globals': 'error',
	'no-implied-eval': 'error',
	'no-iterator': 'error',
	'no-labels': 'error',
	'no-lone-blocks': 'error',
	// "@stylistic/no-multi-spaces":"error",
	'no-multi-str': 'error',
	'no-new-func': 'error',
	'no-new-wrappers': 'error',
	'no-nonoctal-decimal-escape': 'error',
	'no-object-constructor': 'error',
	'no-new': 'error',
	'no-octal-escape': 'error',
	'no-octal': 'error',
	'no-proto': 'error',
	'no-redeclare': 'error',
	'no-return-assign': ['error', 'always'],
	'no-return-await': 'error',
	'no-script-url': 'error',
	'no-self-assign': ['error', { props: true }],
	'no-self-compare': 'error',
	'no-sequences': 'error',
	'no-throw-literal': 'error',
	'no-unmodified-loop-condition': 'error',
	'no-unused-expressions': ['error', { enforceForJSX: true }],
	'no-unused-labels': 'error',
	'no-useless-call': 'error',
	'no-useless-catch': 'error',
	'no-useless-concat': 'error',
	'no-useless-escape': 'error',
	'no-useless-return': 'error',
	'no-void': 'error',
	'no-warning-comments': 'warn',
	'no-with': 'error',
	'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
	'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
	radix: 'error',
	// "@stylistic/wrap-iife":["error","inside",{"functionPrototypeMethods":true}],
	yoda: 'error',
	'no-delete-var': 'error',
	'no-label-var': 'error',
	'no-restricted-globals': [
		'error',
		'event',
		{
			name: 'atob',
			message:
				'This API is deprecated. Use https://github.com/sindresorhus/uint8array-extras instead.',
		},
		{
			name: 'btoa',
			message:
				'This API is deprecated. Use https://github.com/sindresorhus/uint8array-extras instead.',
		},
	],
	'no-shadow-restricted-names': 'error',
	'no-undef-init': 'error',
	'no-undef': ['error', { typeof: true }],
	'no-unused-vars': [
		'error',
		{
			vars: 'all',
			varsIgnorePattern: '^_',
			args: 'after-used',
			ignoreRestSiblings: true,
			argsIgnorePattern: '^_',
			caughtErrors: 'all',
			caughtErrorsIgnorePattern: '^_$',
		},
	],
	'no-buffer-constructor': 'error',
	'no-restricted-imports': [
		'error',
		'domain',
		'freelist',
		'smalloc',
		'punycode',
		'sys',
		'querystring',
		'colors',
	],
	// "@stylistic/array-bracket-newline":["error","consistent"],
	// "@stylistic/array-bracket-spacing":["error","never"],
	// "@stylistic/array-element-newline":["error","consistent"],
	// "@stylistic/brace-style":["error","1tbs",{"allowSingleLine":false}],
	camelcase: ['error', { properties: 'always' }],
	'capitalized-comments': [
		'error',
		'always',
		{
			ignorePattern: String.raw`pragma|ignore|prettier-ignore|webpack\w+:|c8|type-coverage:`,
			ignoreInlineComments: true,
			ignoreConsecutiveComments: true,
		},
	],
	// "@stylistic/comma-spacing":["error",{"before":false,"after":true}],
	// "@stylistic/comma-style":["error","last"],
	// "@stylistic/computed-property-spacing":["error","never",{"enforceForClassMembers":true}],
	// "@stylistic/eol-last":"error",
	// "@stylistic/function-call-spacing":["error","never"],
	// "@stylistic/function-paren-newline":["error","multiline"],
	'func-name-matching': ['error', { considerPropertyDescriptor: true }],
	'func-names': ['error', 'never'],
	// "@stylistic/function-call-argument-newline":["error","consistent"],
	// "@stylistic/indent":["error","tab",{"SwitchCase":1}],
	// "@stylistic/jsx-quotes":["error","prefer-single"],
	// "@stylistic/key-spacing":["error",{"beforeColon":false,"afterColon":true}],
	// "@stylistic/keyword-spacing":"error",
	// "@stylistic/linebreak-style":["error","unix"],
	// "@stylistic/lines-between-class-members":["error",{"enforce":[{"blankLine":"always","prev":"*","next":"method"},{"blankLine":"always","prev":"method","next":"field"},{"blankLine":"never","prev":"field","next":"field"}]}],
	'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
	'max-depth': 'warn',
	// "@stylistic/max-len":["warn",{"code":200,"ignoreComments":true,"ignoreUrls":true}],
	'max-lines': ['warn', { max: 1500, skipComments: true }],
	'max-nested-callbacks': ['warn', 4],
	'max-params': ['warn', { max: 4 }],
	// "@stylistic/max-statements-per-line":"error",
	'new-cap': ['error', { newIsCap: true, capIsNew: true }],
	// "@stylistic/multiline-ternary":["error","always-multiline"],
	// "@stylistic/new-parens":"error",
	'no-array-constructor': 'error',
	'no-bitwise': 'error',
	'no-lonely-if': 'error',
	// "@stylistic/no-mixed-operators":"error",
	// "@stylistic/no-mixed-spaces-and-tabs":"error",
	'no-multi-assign': 'error',
	// "@stylistic/no-multiple-empty-lines":["error",{"max":1}],
	'no-negated-condition': 'error',
	// "@stylistic/no-whitespace-before-property":"error",
	// "@stylistic/no-trailing-spaces":"error",
	'no-unneeded-ternary': 'error',
	// "@stylistic/object-curly-spacing":["error","never"],
	// "@stylistic/object-curly-newline":["error",{"ObjectExpression":{"multiline":true,"minProperties":4,"consistent":true},"ObjectPattern":{"multiline":true,"consistent":true},"ImportDeclaration":{"multiline":true,"minProperties":4,"consistent":true},"ExportDeclaration":{"multiline":true,"minProperties":4,"consistent":true}}],
	'one-var': ['error', 'never'],
	// "@stylistic/one-var-declaration-per-line":"error",
	'operator-assignment': ['error', 'always'],
	// "@stylistic/operator-linebreak":["error","before"],
	// "@stylistic/padded-blocks":["error","never",{"allowSingleLineBlocks":false}],
	// "@stylistic/padding-line-between-statements":["error",{"blankLine":"always","prev":"multiline-block-like","next":"*"}],
	'prefer-exponentiation-operator': 'error',
	'prefer-object-spread': 'error',
	// "@stylistic/quote-props":["error","as-needed"],
	// "@stylistic/quotes":["error","single"],
	// "@stylistic/semi-spacing":["error",{"before":false,"after":true}],
	// "@stylistic/semi-style":["error","last"],
	// "@stylistic/semi":["error","always"],
	// "@stylistic/space-before-blocks":["error","always"],
	// "@stylistic/space-before-function-paren":["error",{"anonymous":"always","named":"never","asyncArrow":"always"}],
	// "@stylistic/space-in-parens":["error","never"],
	// "@stylistic/space-infix-ops":"error",
	// "@stylistic/space-unary-ops":"error",
	// "@stylistic/spaced-comment":["error","always",{"line":{"exceptions":["-","+","*"],"markers":["!","/","=>"]},"block":{"exceptions":["-","+","*"],"markers":["!","*"],"balanced":true}}],
	// "@stylistic/switch-colon-spacing":["error",{"after":true,"before":false}],
	// "@stylistic/template-tag-spacing":["error","never"],
	'unicode-bom': ['error', 'never'],
	'arrow-body-style': 'error',
	// "@stylistic/arrow-parens":["error","as-needed"],
	// "@stylistic/arrow-spacing":["error",{"before":true,"after":true}],
	// "@stylistic/block-spacing":["error","never"],
	'constructor-super': 'error',
	// "@stylistic/generator-star-spacing":["error","both"],
	'no-class-assign': 'error',
	'no-const-assign': 'error',
	'no-constant-binary-expression': 'error',
	'no-dupe-class-members': 'error',
	'no-new-native-nonconstructor': 'error',
	'no-this-before-super': 'error',
	'no-useless-computed-key': ['error', { enforceForClassMembers: true }],
	'no-useless-constructor': 'error',
	'no-useless-rename': 'error',
	'no-var': 'error',
	'object-shorthand': ['error', 'always', { avoidExplicitReturnArrows: true }],
	'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
	'prefer-const': ['error', { destructuring: 'all' }],
	'prefer-destructuring': [
		'error',
		{
			VariableDeclarator: { array: false, object: true },
			AssignmentExpression: { array: false, object: false },
		},
		{ enforceForRenamedProperties: false },
	],
	'prefer-numeric-literals': 'error',
	'prefer-object-has-own': 'error',
	'prefer-rest-params': 'error',
	'prefer-spread': 'error',
	'require-yield': 'error',
	// "@stylistic/rest-spread-spacing":["error","never"],
	'symbol-description': 'error',
	// "@stylistic/template-curly-spacing":"error",
	// "@stylistic/yield-star-spacing":["error","both"],
	// "@stylistic/indent-binary-ops":["error","tab"],
	// End expansion
}

export const xoTypescriptRules: Rules = {
	// Begin expansion 'eslint-config-xo-typescript' '[1].rules'
	'ts/adjacent-overload-signatures': 'error',
	'ts/array-type': ['error', { default: 'array-simple' }],
	'ts/await-thenable': 'error',
	'ts/ban-ts-comment': [
		'error',
		{ 'ts-expect-error': 'allow-with-description', minimumDescriptionLength: 4 },
	],
	'ts/ban-tslint-comment': 'error',
	'ts/no-restricted-types': [
		'error',
		{
			types: {
				object: {
					message:
						'The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
					suggest: ['Record<string, unknown>'],
				},
				null: {
					message: 'Use `undefined` instead. See: https://github.com/sindresorhus/meta/issues/7',
					suggest: ['undefined'],
				},
				Buffer: {
					message:
						'Use Uint8Array instead. See: https://sindresorhus.com/blog/goodbye-nodejs-buffer',
					suggest: ['Uint8Array'],
				},
				'[]': "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
				'[[]]':
					"Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
				'[[[]]]': "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
				'[[[[]]]]': 'ur drunk 🤡',
				'[[[[[]]]]]': '🦄💥',
			},
		},
	],
	'ts/class-literal-property-style': ['error', 'getters'],
	'ts/consistent-generic-constructors': ['error', 'constructor'],
	'ts/consistent-indexed-object-style': 'error',
	'brace-style': 'off',
	// "@stylistic/brace-style":["error","1tbs",{"allowSingleLine":false}],
	'comma-dangle': 'off',
	// "@stylistic/comma-dangle":["error","always-multiline"],
	'comma-spacing': 'off',
	// "@stylistic/comma-spacing":["error",{"before":false,"after":true}],
	'default-param-last': 'off',
	'ts/default-param-last': 'error',
	'dot-notation': 'off',
	'ts/dot-notation': 'error',
	'ts/consistent-type-assertions': [
		'error',
		{ assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
	],
	'ts/consistent-type-definitions': ['error', 'type'],
	'ts/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
	'ts/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
	'func-call-spacing': 'off',
	// "@stylistic/func-call-spacing":["error","never"],
	indent: 'off',
	// "@stylistic/indent":["error","tab",{"SwitchCase":1}],
	'keyword-spacing': 'off',
	// "@stylistic/keyword-spacing":"error",
	'lines-between-class-members': 'off',
	// "@stylistic/lines-between-class-members":["error","always",{"exceptAfterSingleLine":true}],
	// "@stylistic/member-delimiter-style":["error",{"multiline":{"delimiter":"semi","requireLast":true},"singleline":{"delimiter":"semi","requireLast":false}}],
	'ts/member-ordering': [
		'error',
		{
			default: [
				'signature',
				'public-static-field',
				'public-static-method',
				'protected-static-field',
				'protected-static-method',
				'private-static-field',
				'private-static-method',
				'static-field',
				'static-method',
				'public-decorated-field',
				'public-instance-field',
				'public-abstract-field',
				'public-field',
				'protected-decorated-field',
				'protected-instance-field',
				'protected-abstract-field',
				'protected-field',
				'private-decorated-field',
				'private-instance-field',
				'private-field',
				'instance-field',
				'abstract-field',
				'decorated-field',
				'field',
				'public-constructor',
				'protected-constructor',
				'private-constructor',
				'constructor',
				'public-decorated-method',
				'public-instance-method',
				'public-abstract-method',
				'public-method',
				'protected-decorated-method',
				'protected-instance-method',
				'protected-abstract-method',
				'protected-method',
				'private-decorated-method',
				'private-instance-method',
				'private-method',
				'instance-method',
				'abstract-method',
				'decorated-method',
				'method',
			],
		},
	],
	camelcase: 'off',
	'ts/naming-convention': [
		'error',
		{
			selector: [
				'variable',
				'function',
				'classProperty',
				'objectLiteralProperty',
				'parameterProperty',
				'classMethod',
				'objectLiteralMethod',
				'typeMethod',
				'accessor',
			],
			format: ['strictCamelCase'],
			leadingUnderscore: 'allowSingleOrDouble',
			trailingUnderscore: 'allow',
			filter: { regex: '[- ]', match: false },
		},
		{ selector: 'typeLike', format: ['StrictPascalCase'] },
		{
			selector: 'variable',
			types: ['boolean'],
			format: ['StrictPascalCase'],
			prefix: ['is', 'has', 'can', 'should', 'will', 'did'],
		},
		{ selector: 'interface', filter: '^(?!I)[A-Z]', format: ['StrictPascalCase'] },
		{ selector: 'typeParameter', filter: '^T$|^[A-Z][a-zA-Z]+$', format: ['StrictPascalCase'] },
		{
			selector: ['classProperty', 'objectLiteralProperty'],
			format: null,
			modifiers: ['requiresQuotes'],
		},
	],
	'ts/no-base-to-string': 'error',
	'no-array-constructor': 'off',
	'ts/no-array-constructor': 'error',
	'ts/no-array-delete': 'error',
	'no-dupe-class-members': 'off',
	'ts/no-dupe-class-members': 'error',
	'ts/no-confusing-void-expression': 'error',
	'ts/no-deprecated': 'error',
	'ts/no-duplicate-enum-values': 'error',
	'ts/no-duplicate-type-constituents': 'error',
	'ts/no-dynamic-delete': 'error',
	'no-empty-function': 'off',
	'ts/no-empty-function': 'error',
	'ts/no-empty-interface': ['error', { allowSingleExtends: true }],
	'ts/no-empty-object-type': 'error',
	'ts/no-extra-non-null-assertion': 'error',
	'no-extra-parens': 'off',
	'no-extra-semi': 'off',
	// "@stylistic/no-extra-semi":"error",
	'no-loop-func': 'off',
	'ts/no-loop-func': 'error',
	'ts/no-extraneous-class': [
		'error',
		{
			allowConstructorOnly: false,
			allowEmpty: false,
			allowStaticOnly: false,
			allowWithDecorator: true,
		},
	],
	'no-void': ['error', { allowAsStatement: true }],
	'ts/no-floating-promises': [
		'error',
		{ checkThenables: true, ignoreVoid: true, ignoreIIFE: true },
	],
	'ts/no-for-in-array': 'error',
	'ts/no-inferrable-types': 'error',
	'ts/no-meaningless-void-operator': 'error',
	'ts/no-misused-new': 'error',
	'ts/no-misused-promises': ['error', { checksConditionals: true, checksVoidReturn: false }],
	'ts/no-namespace': 'error',
	'ts/no-non-null-asserted-nullish-coalescing': 'error',
	'ts/no-non-null-asserted-optional-chain': 'error',
	'no-redeclare': 'off',
	'ts/no-redeclare': 'error',
	'no-restricted-imports': 'off',
	'ts/no-restricted-imports': [
		'error',
		{
			paths: ['error', 'domain', 'freelist', 'smalloc', 'punycode', 'sys', 'querystring', 'colors'],
		},
	],
	'ts/no-require-imports': 'error',
	'ts/no-this-alias': ['error', { allowDestructuring: true }],
	'no-throw-literal': 'off',
	'ts/only-throw-error': ['error', { allowThrowingUnknown: true, allowThrowingAny: false }],
	'ts/no-unnecessary-boolean-literal-compare': 'error',
	'no-constant-condition': 'error',
	'ts/no-unnecessary-parameter-property-assignment': 'error',
	'ts/no-unnecessary-qualifier': 'error',
	'ts/no-unnecessary-type-arguments': 'error',
	'ts/no-unnecessary-type-assertion': 'error',
	'ts/no-unnecessary-type-constraint': 'error',
	'ts/no-unsafe-argument': 'error',
	'ts/no-unsafe-assignment': 'error',
	'ts/no-unsafe-call': 'error',
	'ts/no-unsafe-declaration-merging': 'error',
	'ts/no-unsafe-enum-comparison': 'error',
	'ts/no-unsafe-function-type': 'error',
	'ts/no-unsafe-return': 'error',
	'ts/no-useless-empty-export': 'error',
	'no-unused-expressions': 'off',
	'ts/no-unused-expressions': 'error',
	'no-unused-vars': 'off',
	'no-useless-constructor': 'off',
	'ts/no-useless-constructor': 'error',
	'object-curly-spacing': 'off',
	// "@stylistic/object-curly-spacing":["error","never"],
	'padding-line-between-statements': 'off',
	// "@stylistic/padding-line-between-statements":["error",{"blankLine":"always","prev":"multiline-block-like","next":"*"}],
	'ts/no-wrapper-object-types': 'error',
	'ts/non-nullable-type-assertion-style': 'error',
	'ts/parameter-properties': ['error', { prefer: 'parameter-property' }],
	'ts/prefer-as-const': 'error',
	'ts/prefer-find': 'error',
	'ts/prefer-for-of': 'error',
	'ts/prefer-function-type': 'error',
	'ts/prefer-includes': 'error',
	'ts/prefer-literal-enum-member': 'error',
	'ts/prefer-namespace-keyword': 'error',
	'ts/prefer-nullish-coalescing': [
		'error',
		{
			ignoreTernaryTests: false,
			ignoreConditionalTests: false,
			ignoreMixedLogicalExpressions: false,
		},
	],
	'ts/prefer-optional-chain': 'error',
	'prefer-promise-reject-errors': 'off',
	'ts/prefer-promise-reject-errors': 'error',
	'ts/prefer-readonly': 'error',
	'ts/prefer-reduce-type-parameter': 'error',
	'ts/prefer-string-starts-ends-with': 'error',
	'ts/promise-function-async': 'error',
	quotes: 'off',
	// "@stylistic/quotes":["error","single"],
	'ts/restrict-plus-operands': ['error', { allowAny: false }],
	'ts/restrict-template-expressions': ['error', { allowNumber: true }],
	'ts/return-await': 'error',
	'ts/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
	'space-before-function-paren': 'off',
	// "@stylistic/space-before-function-paren":["error",{"anonymous":"always","named":"never","asyncArrow":"always"}],
	'space-infix-ops': 'off',
	// "@stylistic/space-infix-ops":"error",
	semi: 'off',
	// "@stylistic/semi":["error","always"],
	'space-before-blocks': 'off',
	// "@stylistic/space-before-blocks":["error","always"],
	'default-case': 'off',
	'ts/switch-exhaustiveness-check': [
		'error',
		{ allowDefaultCaseForExhaustiveSwitch: false, requireDefaultForNonUnion: true },
	],
	'ts/triple-slash-reference': ['error', { path: 'never', types: 'never', lib: 'never' }],
	// "@stylistic/type-annotation-spacing":"error",
	'ts/prefer-regexp-exec': 'error',
	'ts/prefer-return-this-type': 'error',
	'ts/unified-signatures': ['error', { ignoreDifferentlyNamedParameters: true }],
	'ts/use-unknown-in-catch-callback-variable': 'error',
	// "@stylistic/type-generic-spacing":"error",
	// "@stylistic/type-named-tuple-spacing":"error",
	'no-undef': 'off',
	'node/no-unsupported-features/es-syntax': 'off',
	'node/no-unsupported-features/es-builtins': 'off',
	'import/namespace': 'off',
	'import/named': 'off',
	'no-duplicate-imports': 'off',
	// End expansion
}

export const xoTypescriptDtsRules: Rules = {
	// Begin expansion 'eslint-config-xo-typescript' '[2].rules'
	'ts/no-unused-vars': 'off',
	// End expansion
}

export const xoTypescriptTestRules: Rules = {
	// Begin expansion 'eslint-config-xo-typescript' '[3].rules'
	'ts/no-unsafe-call': 'off',
	'ts/no-confusing-void-expression': 'off',
	// End expansion
}

export const xoTsxRules: Rules = {
	// Begin expansion 'eslint-config-xo-typescript' '[4].rules'
	'ts/naming-convention': [
		'error',
		{
			selector: [
				'variable',
				'function',
				'classProperty',
				'objectLiteralProperty',
				'parameterProperty',
				'classMethod',
				'objectLiteralMethod',
				'typeMethod',
				'accessor',
			],
			format: ['strictCamelCase', 'StrictPascalCase'],
			leadingUnderscore: 'allowSingleOrDouble',
			trailingUnderscore: 'allow',
			filter: { regex: '[- ]', match: false },
		},
		{ selector: 'typeLike', format: ['StrictPascalCase'] },
		{
			selector: 'variable',
			types: ['boolean'],
			format: ['StrictPascalCase'],
			prefix: ['is', 'has', 'can', 'should', 'will', 'did'],
		},
		{ selector: 'interface', filter: '^(?!I)[A-Z]', format: ['StrictPascalCase'] },
		{ selector: 'typeParameter', filter: '^T$|^[A-Z][a-zA-Z]+$', format: ['StrictPascalCase'] },
		{
			selector: ['classProperty', 'objectLiteralProperty'],
			format: null,
			modifiers: ['requiresQuotes'],
		},
	],
	// End expansion
}
