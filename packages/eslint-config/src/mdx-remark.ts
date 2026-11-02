import type { Rule } from 'eslint'
import * as pluginMdx from 'eslint-plugin-mdx'

// One line of content followed by an `=` or `-` underline, with no block quote marker
const setextHeadingPattern = /^(?<content>[^\n\r]+)(?:\r\n|\r|\n)[\t ]*(?<underline>=+|-+)[\t ]*$/v
// Trailing hashes would become an ATX closing sequence and drop out of the heading text
const closingSequencePattern = /(?:^|[\t ])#+$/v

function isHeadingStyleReport(descriptor: Rule.ReportDescriptor): boolean {
	if (!('message' in descriptor) || typeof descriptor.message !== 'string') {
		return false
	}

	const { ruleId, source } = JSON.parse(descriptor.message) as {
		ruleId?: unknown
		source?: unknown
	}
	return source === 'remark-lint' && ruleId === 'heading-style'
}

/**
 * Rewrite a reported single-line Setext heading as ATX, replacing only the
 * heading's own text. Returns undefined for headings where the rewrite could
 * change the document.
 */
function getSetextHeadingFix(
	text: string,
	descriptor: Rule.ReportDescriptor,
): Rule.Fix | undefined {
	if (!isHeadingStyleReport(descriptor) || !('loc' in descriptor) || !('start' in descriptor.loc)) {
		return undefined
	}

	// eslint-plugin-mdx passes remark's positions through, including source offsets
	type RemarkLocation = {
		start: { offset?: unknown }
		end: { offset?: unknown }
	}
	const { start, end } = descriptor.loc as RemarkLocation
	if (typeof start.offset !== 'number' || typeof end.offset !== 'number') {
		return undefined
	}

	const groups = setextHeadingPattern.exec(text.slice(start.offset, end.offset))?.groups
	const content = groups?.content?.trim()
	if (
		content === undefined ||
		groups?.underline === undefined ||
		closingSequencePattern.test(content)
	) {
		return undefined
	}

	const level = groups.underline.startsWith('=') ? 1 : 2
	return { range: [start.offset, end.offset], text: `${'#'.repeat(level)} ${content}` }
}

/**
 * The eslint-plugin-mdx remark rule without its own fixes, leaving Markdown
 * formatting to Prettier. Those fixes splice pieces of remark-stringify output
 * into the document, which can split a list or break emphasis. Setext headings
 * are still converted to ATX, which Prettier does not do in Markdown files, by
 * rewriting only the reported heading.
 */
export const remarkRule: Rule.RuleModule = {
	...pluginMdx.rules.remark,
	create(context) {
		const wrappedContext = Object.create(context) as Rule.RuleContext
		Object.defineProperty(wrappedContext, 'report', {
			value(descriptor: Rule.ReportDescriptor) {
				const fix = getSetextHeadingFix(context.sourceCode.text, descriptor)
				context.report({ ...descriptor, fix: fix === undefined ? undefined : () => fix })
			},
		})
		return pluginMdx.rules.remark.create(wrappedContext)
	},
}
