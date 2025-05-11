import type { Parents, Text } from 'mdast'
import type { Info, State } from 'mdast-util-to-markdown'
import type { Pluggable, PluggableList, Preset as RemarkConfig } from 'unified'
import { defaultHandlers as mdastToTextHandlers } from 'mdast-util-to-markdown'
import remarkDirective from 'remark-directive'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkLint from 'remark-lint'
import remarkValidateLinks from 'remark-validate-links'
// export { commandDefinition } from './command.js'
// Necessary for side-effect type definitions?
import 'remark-stringify'
// See https://github.com/remarkjs/remark-lint?tab=readme-ov-file#rules
// Official
import remarkLintCheckboxContentIndent from 'remark-lint-checkbox-content-indent' // Warn when too much whitespace follows list item checkboxes
// import remarkLintCorrectMediaSyntax from 'remark-lint-correct-media-syntax' // Check for accidental bracket and paren mixup for images and links
// import remarkLintDefinitionSort from 'remark-lint-definition-sort' // Check definition order
// import remarkLintDirectiveAttributeSort from 'remark-lint-directive-attribute-sort' // Check directive attribute order
// import remarkLintDirectiveCollapsedAttribute from 'remark-lint-directive-collapsed-attribute' // Check that collapsed attributes are used in directives
// import remarkLintDirectiveQuoteStyle from 'remark-lint-directive-quote-style' // Check quotes of directive attributes
// import remarkLintDirectiveShortcutAttribute from 'remark-lint-directive-shortcut-attribute' // Check that shortcut attributes are used in directives
// import remarkLintDirectiveUniqueAttributeName from 'remark-lint-directive-unique-attribute-name' // Check that attribute names are unique
import remarkLintFencedCodeFlag from 'remark-lint-fenced-code-flag' // Warn when fenced code blocks occur without language flag
// import remarkLintFileExtension from 'remark-lint-file-extension' // (Crashes with "Cannot use 'in' operator to search for 'start' in undefined") Warn when the file’s extension violates the given style
import remarkLintFinalDefinition from 'remark-lint-final-definition' // Warn when definitions are not placed at the end of the file
import remarkLintFirstHeadingLevel from 'remark-lint-first-heading-level' // Warn when the first heading has a level other than a specified value
import remarkLintHeadingIncrement from 'remark-lint-heading-increment' // Warn when headings increment with more than 1 level at a time
import remarkLintLinebreakStyle from 'remark-lint-linebreak-style' // Warn when linebreaks violate a given or detected style
import remarkLintMaximumHeadingLength from 'remark-lint-maximum-heading-length' // Warn when headings are too long
// import remarkLintMdxJsxAttributeSort from 'remark-lint-mdx-jsx-attribute-sort' // Check mdx jsx attribute order
// import remarkLintMdxJsxNoVoidChildren from 'remark-lint-mdx-jsx-no-void-children' // Check mdx jsx quotes
// import remarkLintMdxJsxQuoteStyle from 'remark-lint-mdx-jsx-quote-style' // Check mdx jsx quotes
// import remarkLintMdxJsxSelfClose from 'remark-lint-mdx-jsx-self-close' // Check that self-closing tags are used when possible
// import remarkLintMdxJsxShorthandAttribute from 'remark-lint-mdx-jsx-shorthand-attribute' // Check that shorthand attributes are used in MDX JSX
// import remarkLintMdxJsxUniqueAttributeName from 'remark-lint-mdx-jsx-unique-attribute-name' // Check that mdx jsx attributes are unique
// import remarkLintMediaStyle from 'remark-lint-media-style' // Check whether references or resources are used
import remarkLintNoDuplicateDefinedUrls from 'remark-lint-no-duplicate-defined-urls' // Warn on definitions that define the same urls
import remarkLintNoDuplicateDefinitions from 'remark-lint-no-duplicate-definitions' // Warn on duplicate definitions
import remarkLintNoDuplicateHeadings from 'remark-lint-no-duplicate-headings' // Warn on duplicate headings
import remarkLintNoDuplicateHeadingsInSection from 'remark-lint-no-duplicate-headings-in-section' // Warn on duplicate headings in a section
// import remarkLintNoEmphasisAsHeading from 'remark-lint-no-emphasis-as-heading' // Warn when emphasis or importance is used instead of a heading
import remarkLintNoEmptyUrl from 'remark-lint-no-empty-url' // Warn on empty URLs in links and images
import remarkLintNoFileNameArticles from 'remark-lint-no-file-name-articles' // Warn when file name start with an article
import remarkLintNoFileNameConsecutiveDashes from 'remark-lint-no-file-name-consecutive-dashes' // Warn when file names contain consecutive dashes
import remarkLintNoFileNameIrregularCharacters from 'remark-lint-no-file-name-irregular-characters' // Warn when file names contain irregular characters
// import remarkLintNoFileNameMixedCase from 'remark-lint-no-file-name-mixed-case' // (Crashes with "Cannot use 'in' operator to search for 'start' in undefined") Warn when file names use mixed case
import remarkLintNoFileNameOuterDashes from 'remark-lint-no-file-name-outer-dashes' // Warn when file names contain initial or final dashes
import remarkLintNoHeadingIndent from 'remark-lint-no-heading-indent' // Warn when headings are indented
import remarkLintNoHeadingLikeParagraph from 'remark-lint-no-heading-like-paragraph' // For too many hashes (h7+ “headings”)
// import remarkLintNoHeadingPunctuation from 'remark-lint-no-heading-punctuation' // Warn when headings end in illegal characters
// import remarkLintNoHiddenTableCell from 'remark-lint-no-hidden-table-cell' // Check superfluous table cells
// import remarkLintNoHtml from 'remark-lint-no-html' // Warn when HTML nodes are used
// import remarkLintNoLiteralUrls from 'remark-lint-no-literal-urls' // Warn when URLs without angle brackets are used
// import remarkLintNoMissingBlankLines from 'remark-lint-no-missing-blank-lines' // Warn when missing blank lines
import remarkLintNoMultipleToplevelHeadings from 'remark-lint-no-multiple-toplevel-headings' // Warn when multiple top level headings are used
import remarkLintNoParagraphContentIndent from 'remark-lint-no-paragraph-content-indent' // Warn when the content in paragraphs are indented
import remarkLintNoReferenceLikeUrl from 'remark-lint-no-reference-like-url' // Warn when URLs are also defined identifiers
import remarkLintNoShellDollars from 'remark-lint-no-shell-dollars' // Warn when shell code is prefixed by dollars
import remarkLintNoShortcutReferenceImage from 'remark-lint-no-shortcut-reference-image' // Warn when shortcut reference images are used
import remarkLintNoShortcutReferenceLink from 'remark-lint-no-shortcut-reference-link' // Warn when shortcut reference links are used
import remarkLintNoTabs from 'remark-lint-no-tabs' // Warn when hard tabs are used instead of spaces
import remarkLintNoUndefinedReferences from 'remark-lint-no-undefined-references' // Warn when references to undefined definitions are found
import remarkLintNoUnneededFullReferenceImage from 'remark-lint-no-unneeded-full-reference-image' // Check that full reference images can be collapsed
import remarkLintNoUnneededFullReferenceLink from 'remark-lint-no-unneeded-full-reference-link' // Check that full reference links can be collapsed
import remarkLintNoUnusedDefinitions from 'remark-lint-no-unused-definitions' // Warn when unused definitions are found
import remarkLintStrikethroughMarker from 'remark-lint-strikethrough-marker' // Warn when strikethrough markers violate the given style

// Official rules with Prettier conflicts
// Maintained manually via https://github.com/un-ts/remark-preset-prettier?tab=readme-ov-file#disabled-remark-lint-plugins
// import remarkLintBlockquoteIndentation from 'remark-lint-blockquote-indentation' // Check whitespace after block quote markers
// import remarkLintCheckboxCharacterStyle from 'remark-lint-checkbox-character-style' // Check list item checkbox characters
// import remarkLintCodeBlockStyle from 'remark-lint-code-block-style' // Warn when code blocks do not adhere to a given style
// import remarkLintDefinitionCase from 'remark-lint-definition-case' // Warn when definition labels are not lowercase
// import remarkLintDefinitionSpacing from 'remark-lint-definition-spacing' // Warn when consecutive whitespace is used in a definition
// import remarkLintEmphasisMarker from 'remark-lint-emphasis-marker' // Warn when emphasis markers violate the given style
// import remarkLintFencedCodeMarker from 'remark-lint-fenced-code-marker' // Warn when fenced code markers violate the given style
// import remarkLintFinalNewline from 'remark-lint-final-newline' //  Warn when a newline at the end of a file is missing
// import remarkLintHardBreakSpaces from 'remark-lint-hard-break-spaces' //  Warn when too many spaces are used to create a hard break
// import remarkLintHeadingStyle from 'remark-lint-heading-style' //  Warn when heading style violates the given style
// import remarkLintBlankLines102 from 'remark-lint-blank-lines-1-0-2' // Ensure a specific number of lines between blocks
// import remarkLintHeadingWhitespace from 'remark-lint-heading-whitespace' //  Ensure heading parsing is not broken by weird whitespace
// import remarkLintLinkTitleStyle from 'remark-lint-link-title-style' // Warn when link and definition titles occur with incorrect quotes
// import remarkLintListItemBulletIndent from 'remark-lint-list-item-bullet-indent' // Warn when list item bullets are indented
// import remarkLintListItemContentIndent from 'remark-lint-list-item-content-indent' // Warn when the content of a list item has mixed indentation
// import remarkLintListItemIndent from 'remark-lint-list-item-indent' // Check the spacing between list item bullets and content
// import remarkLintListItemSpacing from 'remark-lint-list-item-spacing' // Warn when list looseness is incorrect
// import remarkLintMaximumLineLength from 'remark-lint-maximum-line-length' // Warn when lines are too long
// import remarkLintNoBlockquoteWithoutMarker from 'remark-lint-no-blockquote-without-marker' // Warn when block quotes have blank lines without markers
// import remarkLintNoConsecutiveBlankLines from 'remark-lint-no-consecutive-blank-lines' // Warn for too many consecutive blank lines
// import remarkLintNoHeadingContentIndent from 'remark-lint-no-heading-content-indent' // Warn when heading content is indented
// import remarkLintNoTableIndentation from 'remark-lint-no-table-indentation' // Warn when tables are indented
// import remarkLintOrderedListMarkerStyle from 'remark-lint-ordered-list-marker-style' // Warn when the markers of ordered lists violate a given style
// import remarkLintOrderedListMarkerValue from 'remark-lint-ordered-list-marker-value' // Check the marker value of ordered lists
// import remarkLintRuleStyle from 'remark-lint-rule-style' // Warn when horizontal rules violate a given style
// import remarkLintStrongMarker from 'remark-lint-strong-marker' // Warn when importance (strong) markers violate the given style
// import remarkLintTableCellPadding from 'remark-lint-table-cell-padding' // Warn when table cells are incorrectly padded
// import remarkLintTablePipeAlignment from 'remark-lint-table-pipe-alignment' // Warn when table pipes are not aligned
// import remarkLintTablePipes from 'remark-lint-table-pipes' // Warn when table rows are not fenced with pipes
// import remarkLintUnorderedListMarkerStyle from 'remark-lint-unordered-list-marker-style' // Warn when markers of unordered lists violate a given style

// Community maintained rules
// import remarkLintAlphabetizeLists from 'remark-lint-alphabetize-lists' // Ensure list items are in alphabetical order
// import remarkLintAppropriateHeading from 'remark-lint-appropriate-heading' // Check that the top level heading matches the directory name
// import remarkLintAreLinksValid from 'remark-lint-are-links-valid' // Check if your links are reachable and/or unique
// import remarkLintCheckToc from 'remark-lint-check-toc' // Ensure TOC is correct
// import remarkLintCode from 'remark-lint-code' // Lint fenced code blocks by corresponding language tags, currently supporting ESLint
// import remarkLintCodeBlockSplitList from 'remark-lint-code-block-split-list' // Ensure code block inside list doesn't split the list
// import remarkLintDoubleLink from 'remark-lint-double-link' // Ensure the same URL is not linked multiple times.
// import remarkLintEmojiLimit from 'remark-lint-emoji-limit' // Enforce a limit of emoji per paragraph
// import remarkLintFencedCodeFlagCase from 'remark-lint-fenced-code-flag-case' // Warn when fenced code blocks have improperly cased language flags
// import remarkLintFrontmatterSchema from 'remark-lint-frontmatter-schema' // Validate YAML frontmatter against a JSON schema
// import remarkLintHeadingCapitalization from 'remark-lint-heading-capitalization' // Ensure headings capitalization is correct
// import remarkLintHeadingLength from 'remark-lint-heading-length' // Ensure headings have the appropriate length
// import remarkLintHeadingWordLength from 'remark-lint-heading-word-length' // Warn when headings have too many or too few words with unicode support
// import remarkLintListItemStyle from 'remark-lint-list-item-style' // Warn when list items violate a given capitalization or punctuation style
// import remarkLintMatchPunctuation from 'remark-lint-match-punctuation' // Ensures punctuations are used in pairs if necessary.
// import remarkLintMdashStyle from 'remark-lint-mdash-style' // Ensure em-dash (—) style follows a standard format
// import remarkLintNoChinesePunctuationInNumber from 'remark-lint-no-chinese-punctuation-in-number' // Ensures that Chinese punctuation’s not used in numbers
// import remarkLintNoDeadUrls from 'remark-lint-no-dead-urls' // Check that external links are alive
// import remarkLintNoEmptySections from 'remark-lint-no-empty-sections' // Ensure every heading is followed by content (forming a section)
// import remarkLintNoRepeatPunctuation from 'remark-lint-no-repeat-punctuation' // Ensures punctuation is not repeated
// import remarkLintNoUrlTrailingSlash from 'remark-lint-no-url-trailing-slash' // Ensure that the href of links has no trailing slash
// import remarkLintWriteGood from 'remark-lint-write-good' // Wrapper for write-good

// Community maintained rules with Prettier conflicts
// Maintained manually via https://github.com/un-ts/remark-preset-prettier?tab=readme-ov-file#disabled-remark-lint-plugins
// import remarkLintBooksLinks from 'remark-lint-books-links' // Ensure links in lists of books follow a standard format
// import remarkLintNoLongCode from 'remark-lint-no-long-code' // Ensures that each line in code block won't be too long.
// import remarkLintSpacesAroundNumber from 'remark-lint-spaces-around-number' // Ensures there are spaces around number and Chinese.
// import remarkLintSpacesAroundWord from 'remark-lint-spaces-around-word' // Ensures there are spaces around English word and Chinese.

const remarkSharedConfig: RemarkConfig = {
	plugins: [
		remarkLint,
		remarkFrontmatter,
		remarkGfm,
		remarkDirective,
		remarkLintCheckboxContentIndent,
		[remarkLintFencedCodeFlag, { allowEmpty: false }],
		remarkLintFinalDefinition,
		remarkLintFirstHeadingLevel,
		remarkLintHeadingIncrement,
		remarkLintLinebreakStyle,
		remarkLintMaximumHeadingLength,
		remarkLintNoDuplicateDefinedUrls,
		remarkLintNoDuplicateDefinitions,
		remarkLintNoDuplicateHeadings,
		remarkLintNoDuplicateHeadingsInSection,
		remarkLintNoEmptyUrl,
		remarkLintNoFileNameArticles,
		remarkLintNoFileNameConsecutiveDashes,
		remarkLintNoFileNameIrregularCharacters,
		remarkLintNoFileNameOuterDashes,
		remarkLintNoHeadingIndent,
		remarkLintNoHeadingLikeParagraph,
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
					// See also the custom text handler below in settings
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
		remarkLintStrikethroughMarker,
		remarkValidateLinks,
	],
	// Prettier will enforce some of these?
	settings: {
		bullet: '-',
		emphasis: '_',
		handlers: {
			// Prevent escaping GFM alerts / admonitions
			// https://github.com/Xunnamius/symbiote/blob/main/src/assets/transformers/_.remarkrc.mjs.ts
			// This is necessary in addition to the remark-lint-no-undefined-references rule customization below.
			text(node: Text, parent: Parents | undefined, state: State, info: Info) {
				// Call the default text handler, then strip the leading "\" from GFM alerts
				// Case insensitivity is important!
				const markdownString = mdastToTextHandlers.text(node, parent, state, info)
				return markdownString.replace(/^\\(?=\[!(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION)\])/i, '')
			},
		},
		rule: '-',
		strong: '*',
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
			// eslint-disable-next-line ts/no-unsafe-type-assertion
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
