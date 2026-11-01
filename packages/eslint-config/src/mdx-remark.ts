import type { Rule } from 'eslint'
import * as pluginMdx from 'eslint-plugin-mdx'
import diff from 'fast-diff'

function splitFix(source: string, fix: Rule.Fix): Rule.Fix[] {
	const fixes: Rule.Fix[] = []
	let offset = fix.range[0]
	let pending: Rule.Fix | undefined
	const differences = diff(source.slice(...fix.range), fix.text)

	for (const [operation, text] of differences) {
		if (operation === diff.EQUAL) {
			if (pending !== undefined) {
				fixes.push(pending)
				pending = undefined
			}

			offset += text.length
		} else {
			pending ??= { range: [offset, offset], text: '' }
			if (operation === diff.DELETE) {
				pending.range[1] += text.length
				offset += text.length
			} else {
				pending.text += text
			}
		}
	}

	if (pending !== undefined) {
		fixes.push(pending)
	}

	return fixes
}

/**
 * Keep MDX 3.9's same-line fix batches from changing text outside a diagnostic.
 * A link fix must not change one list marker and split the surrounding list.
 */
export const localizedRemarkRule: Rule.RuleModule = {
	...pluginMdx.rules.remark,
	create(context) {
		const wrappedContext = Object.create(context) as Rule.RuleContext
		Object.defineProperty(wrappedContext, 'report', {
			value(descriptor: Rule.ReportDescriptor) {
				const originalFix = descriptor.fix
				if (originalFix === undefined || originalFix === null || !('loc' in descriptor)) {
					context.report(descriptor)
					return
				}

				const location = descriptor.loc
				const start = 'start' in location ? location.start : location
				const end = 'end' in location ? location.end : start
				context.report({
					...descriptor,
					fix(fixer) {
						const proposed = originalFix(fixer)
						if (proposed === null) {
							return []
						}

						const startOffset = context.sourceCode.getIndexFromLoc(start)
						const endOffset = context.sourceCode.getIndexFromLoc(end)
						const fixes = 'range' in proposed ? [proposed] : [...proposed]
						return fixes
							.flatMap((fix) => splitFix(context.sourceCode.text, fix))
							.filter((fix) => fix.range[0] <= endOffset && fix.range[1] >= startOffset)
					},
				})
			},
		})
		return pluginMdx.rules.remark.create(wrappedContext)
	},
}
