import 'remark-stringify'
import type { Pluggable, PluggableList, Preset as RemarkConfig } from 'unified'
import remarkDirective from 'remark-directive'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkLint from 'remark-lint'
import remarkLintCheckboxCharacterStyle from 'remark-lint-checkbox-character-style'
import remarkLintCheckboxContentIndent from 'remark-lint-checkbox-content-indent'
import remarkLintCodeBlockStyle from 'remark-lint-code-block-style'
import remarkLintEmphasisMarker from 'remark-lint-emphasis-marker'
import remarkLintFencedCodeFlag from 'remark-lint-fenced-code-flag'
import remarkLintFencedCodeMarker from 'remark-lint-fenced-code-marker'
import remarkLintFinalDefinition from 'remark-lint-final-definition'
import remarkLintFirstHeadingLevel from 'remark-lint-first-heading-level'
import remarkLintHeadingIncrement from 'remark-lint-heading-increment'
import remarkLintLinebreakStyle from 'remark-lint-linebreak-style'
import remarkLintMaximumHeadingLength from 'remark-lint-maximum-heading-length'
import remarkLintNoDuplicateDefinedUrls from 'remark-lint-no-duplicate-defined-urls'
import remarkLintNoDuplicateDefinitions from 'remark-lint-no-duplicate-definitions'
import remarkLintNoDuplicateHeadings from 'remark-lint-no-duplicate-headings'
import remarkLintNoDuplicateHeadingsInSection from 'remark-lint-no-duplicate-headings-in-section'
import remarkLintNoEmptyUrl from 'remark-lint-no-empty-url'
import remarkLintNoFileNameArticles from 'remark-lint-no-file-name-articles'
import remarkLintNoFileNameConsecutiveDashes from 'remark-lint-no-file-name-consecutive-dashes'
import remarkLintNoFileNameIrregularCharacters from 'remark-lint-no-file-name-irregular-characters'
import remarkLintNoFileNameOuterDashes from 'remark-lint-no-file-name-outer-dashes'
import remarkLintNoHeadingIndent from 'remark-lint-no-heading-indent'
import remarkLintNoHeadingLikeParagraph from 'remark-lint-no-heading-like-paragraph'
import remarkLintNoLiteralUrls from 'remark-lint-no-literal-urls'
import remarkLintNoMultipleToplevelHeadings from 'remark-lint-no-multiple-toplevel-headings'
import remarkLintNoParagraphContentIndent from 'remark-lint-no-paragraph-content-indent'
import remarkLintNoReferenceLikeUrl from 'remark-lint-no-reference-like-url'
import remarkLintNoShellDollars from 'remark-lint-no-shell-dollars'
import remarkLintNoShortcutReferenceImage from 'remark-lint-no-shortcut-reference-image'
import remarkLintNoShortcutReferenceLink from 'remark-lint-no-shortcut-reference-link'
import remarkLintNoTabs from 'remark-lint-no-tabs'
import remarkLintNoUndefinedReferences from 'remark-lint-no-undefined-references'
import remarkLintNoUnneededFullReferenceImage from 'remark-lint-no-unneeded-full-reference-image'
import remarkLintNoUnneededFullReferenceLink from 'remark-lint-no-unneeded-full-reference-link'
import remarkLintNoUnusedDefinitions from 'remark-lint-no-unused-definitions'
import remarkLintOrderedListMarkerStyle from 'remark-lint-ordered-list-marker-style'
import remarkLintRuleStyle from 'remark-lint-rule-style'
import remarkLintStrikethroughMarker from 'remark-lint-strikethrough-marker'
import remarkLintStrongMarker from 'remark-lint-strong-marker'
import remarkLintTableCellPadding from 'remark-lint-table-cell-padding'
import remarkLintUnorderedListMarkerStyle from 'remark-lint-unordered-list-marker-style'
import remarkPresetPrettier from 'remark-preset-prettier'
import remarkValidateLinks from 'remark-validate-links'

const remarkSharedConfig: RemarkConfig = {
	plugins: [
		remarkLint,
		remarkFrontmatter,
		remarkGfm,
		remarkDirective,
		[remarkLintCheckboxCharacterStyle, 'x'],
		remarkLintCheckboxContentIndent,
		[remarkLintCodeBlockStyle, 'fenced'],
		[remarkLintEmphasisMarker, '*'],
		[remarkLintFencedCodeFlag, { allowEmpty: false }],
		[remarkLintFencedCodeMarker, '`'],
		// Crashes with "Cannot use 'in' operator to search for 'start' in undefined"
		// [remarkLintFileExtension, 'md'],
		remarkLintFinalDefinition,
		remarkLintFirstHeadingLevel,
		remarkLintHeadingIncrement,
		// [remarkLintHeadingStyle, 'atx'], Prettier
		remarkLintLinebreakStyle,
		remarkLintMaximumHeadingLength,
		// RemarkLintNoAutoLinkWithoutProtocol, // Deprecated
		remarkLintNoDuplicateDefinedUrls,
		remarkLintNoDuplicateDefinitions,
		remarkLintNoDuplicateHeadings,
		remarkLintNoDuplicateHeadingsInSection,
		remarkLintNoEmptyUrl,
		remarkLintNoFileNameArticles,
		remarkLintNoFileNameConsecutiveDashes,
		remarkLintNoFileNameIrregularCharacters,
		// Crashes with "Cannot use 'in' operator to search for 'start' in undefined"
		// RemarkLintNoFileNameMixedCase,
		remarkLintNoFileNameOuterDashes,
		remarkLintNoHeadingIndent,
		remarkLintNoHeadingLikeParagraph,
		remarkLintNoLiteralUrls,
		remarkLintNoMultipleToplevelHeadings,
		remarkLintNoParagraphContentIndent,
		remarkLintNoReferenceLikeUrl,
		remarkLintNoShellDollars,
		remarkLintNoShortcutReferenceImage,
		remarkLintNoShortcutReferenceLink,
		remarkLintNoTabs,
		[
			remarkLintNoUndefinedReferences,
			{
				allow: [
					'…',
					'...',
					// GitHub Alerts / Admonitions
					// https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
					'!NOTE',
					'!TIP',
					'!IMPORTANT',
					'!WARNING',
					'!CAUTION',
				],
			},
		],
		remarkLintNoUnneededFullReferenceImage,
		remarkLintNoUnneededFullReferenceLink,
		remarkLintNoUnusedDefinitions,
		remarkLintNoUnusedDefinitions,
		[remarkLintOrderedListMarkerStyle, '.'],
		[remarkLintRuleStyle, '---'],
		remarkLintStrikethroughMarker,
		[remarkLintStrongMarker, '*'],
		[remarkLintTableCellPadding, 'padded'],
		[remarkLintUnorderedListMarkerStyle, '-'],
		remarkValidateLinks,
		remarkPresetPrettier as Pluggable, // TODO hmm,
	],
	settings: {
		bullet: '-',
		// 1stg settings
		// emphasis: '_',
		// listItemIndent: 'one',
		// quote: "'",
		// rule: '-',
		// strong: '*',
		// tightDefinitions: true,
	},
}

/**
 * Overrides specific rules in a set of plugins.
 *
 * This function searches through an array of plugins to find and override
 * multiple plugins by their names, replacing their arguments with new ones.
 *
 * See this link for why we need this:
 * https://github.com/remarkjs/remark-lint/issues/165
 *
 */
function overrideRules(
	plugins: PluggableList | undefined,
	rules: Array<[string, unknown]>,
): PluggableList {
	plugins ??= []

	for (let [ruleName, newArguments] of rules) {
		// Internally, function names are different from the package names
		ruleName = ruleName.replace(/^remark-lint-/, 'remark-lint:')

		let ruleFunction: unknown
		const index = plugins.findIndex((plugin) => {
			if (Array.isArray(plugin)) {
				if (plugin[0].name === ruleName) {
					ruleFunction = plugin[0]
					return true
				}
			} else if ('name' in plugin && plugin.name === ruleName) {
				ruleFunction = plugin
				return true
			}

			return false
		})

		if (index !== -1) {
			plugins.splice(index, 1, [ruleFunction, newArguments] as Pluggable)
		}
	}

	return plugins
}

/**
 * **Remark Shared Configuration**
 * @see [@kitschpatrol/remark-config](https://github.com/kitschpatrol/shared-config/tree/main/packages/remark-config)
 * @see [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config)
 * @example
 * ```js
 * export default remarkConfig({
 *   rules: [
 *		['remark-lint-first-heading-level', 2],
 *		['remarkValidateLinks', { repository: false }],
 *	],
 * })
 * ```
 */
export function remarkConfig(options?: {
	plugins?: PluggableList | undefined
	rules?: Array<[string, unknown]>
	settings?: RemarkConfig['settings']
}): RemarkConfig {
	const {
		plugins = [],
		rules = [],
		settings,
	} = options ?? {
		plugins: undefined,
		rules: undefined,
		settings: undefined,
	}
	return {
		...remarkSharedConfig,
		plugins: overrideRules([...(remarkSharedConfig.plugins ?? []), ...plugins], rules),
		settings: { ...remarkSharedConfig.settings, ...settings },
	}
}

export default remarkSharedConfig
