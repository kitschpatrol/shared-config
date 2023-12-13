import remarkCapitalizeHeadings from 'remark-capitalize-headings';
import remarkLint from 'remark-lint';
import remarkLintCheckboxCharacterStyle from 'remark-lint-checkbox-character-style';
import remarkLintCheckboxContentIndent from 'remark-lint-checkbox-content-indent';
import remarkLintCodeBlockStyle from 'remark-lint-code-block-style';
import remarkLintEmphasisMarker from 'remark-lint-emphasis-marker';
import remarkLintFencedCodeFlag from 'remark-lint-fenced-code-flag';
import remarkLintFencedCodeMarker from 'remark-lint-fenced-code-marker';
import remarkLintFileExtension from 'remark-lint-file-extension';
import remarkLintFinalDefinition from 'remark-lint-final-definition';
import remarkLintFirstHeadingLevel from 'remark-lint-first-heading-level';
import remarkLintHeadingIncrement from 'remark-lint-heading-increment';
import remarkLintLinebreakStyle from 'remark-lint-linebreak-style';
import remarkLintMaximumHeadingLength from 'remark-lint-maximum-heading-length';
import remarkLintNoDuplicateDefinedUrls from 'remark-lint-no-duplicate-defined-urls';
import remarkLintNoDuplicateDefinitions from 'remark-lint-no-duplicate-definitions';
import remarkLintNoDuplicateHeadings from 'remark-lint-no-duplicate-headings';
import remarkLintNoDuplicateHeadingsInSection from 'remark-lint-no-duplicate-headings-in-section';
import remarkLintNoEmphasisAsHeading from 'remark-lint-no-emphasis-as-heading';
import remarkLintNoEmptyUrl from 'remark-lint-no-empty-url';
import remarkLintNoFileNameArticles from 'remark-lint-no-file-name-articles';
import remarkLintNoFileNameConsecutiveDashes from 'remark-lint-no-file-name-consecutive-dashes';
import remarkLintNoFileNameIrregularCharacters from 'remark-lint-no-file-name-irregular-characters';
import remarkLintNoFileNameMixedCase from 'remark-lint-no-file-name-mixed-case';
import remarkLintNoFileNameOuterDashes from 'remark-lint-no-file-name-outer-dashes';
import remarkLintNoHeadingIndent from 'remark-lint-no-heading-indent';
import remarkLintNoHeadingLikeParagraph from 'remark-lint-no-heading-like-paragraph';
import remarkLintNoHtml from 'remark-lint-no-html';
import remarkLintNoLiteralUrls from 'remark-lint-no-literal-urls';
import remarkLintNoMissingBlankLines from 'remark-lint-no-missing-blank-lines';
import remarkLintNoMultipleToplevelHeadings from 'remark-lint-no-multiple-toplevel-headings';
import remarkLintNoParagraphContentIndent from 'remark-lint-no-paragraph-content-indent';
import remarkLintNoReferenceLikeUrl from 'remark-lint-no-reference-like-url';
import remarkLintNoShellDollars from 'remark-lint-no-shell-dollars';
import remarkLintNoShortcutReferenceImage from 'remark-lint-no-shortcut-reference-image';
import remarkLintNoShortcutReferenceLink from 'remark-lint-no-shortcut-reference-link';
import remarkLintNoTabs from 'remark-lint-no-tabs';
import remarkLintNoUndefinedReferences from 'remark-lint-no-undefined-references';
import remarkLintNoUnneededFullReferenceImage from 'remark-lint-no-unneeded-full-reference-image';
import remarkLintNoUnneededFullReferenceLink from 'remark-lint-no-unneeded-full-reference-link';
import remarkLintNoUnusedDefinitions from 'remark-lint-no-unused-definitions';
import remarkLintOrderedListMarkerStyle from 'remark-lint-ordered-list-marker-style';
import remarkLintRuleStyle from 'remark-lint-rule-style';
import remarkLintStrikethroughMarker from 'remark-lint-strikethrough-marker';
import remarkLintStrongMarker from 'remark-lint-strong-marker';
import remarkLintTableCellPadding from 'remark-lint-table-cell-padding';
import remarkLintUnorderedListMarkerStyle from 'remark-lint-unordered-list-marker-style';
import remarkPresetPrettier from 'remark-preset-prettier';
import remarkValidateLinks from 'remark-validate-links';

export default {
	plugins: [
		remarkLint,
		[remarkLintCheckboxCharacterStyle, 'x'],
		remarkLintCheckboxContentIndent,
		[remarkLintCodeBlockStyle, 'fenced'],
		[remarkLintEmphasisMarker, '*'],
		[remarkLintFencedCodeFlag, { allowEmpty: false }],
		[remarkLintFencedCodeMarker, '`'],
		[remarkLintFileExtension, 'md'],
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
		remarkLintNoEmphasisAsHeading,
		remarkLintNoEmptyUrl,
		remarkLintNoFileNameArticles,
		remarkLintNoFileNameConsecutiveDashes,
		remarkLintNoFileNameIrregularCharacters,
		remarkLintNoFileNameMixedCase,
		remarkLintNoFileNameOuterDashes,
		remarkLintNoHeadingIndent,
		remarkLintNoHeadingLikeParagraph,
		remarkLintNoHtml,
		remarkLintNoLiteralUrls,
		remarkLintNoMissingBlankLines,
		remarkLintNoMultipleToplevelHeadings,
		remarkLintNoParagraphContentIndent,
		remarkLintNoReferenceLikeUrl,
		remarkLintNoShellDollars,
		remarkLintNoShortcutReferenceImage,
		remarkLintNoShortcutReferenceLink,
		remarkLintNoTabs,
		remarkLintNoUndefinedReferences,
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
		remarkCapitalizeHeadings,
		remarkValidateLinks,
		remarkPresetPrettier,
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
};
