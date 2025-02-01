/**
 * Converts a camelCase string to kebab-case.
 */
export function kebabCase(text: string): string {
	return text.replaceAll(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (match) => '-' + match.toLowerCase())
}

/**
 * Naively pluralizes a word based on a quantity.
 */
export function pluralize(text: string, quantity: number): string {
	return quantity === 1 ? text : text + 's'
}
