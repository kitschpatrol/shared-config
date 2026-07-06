/**
 * Converts a camelCase string to kebab-case.
 */
export function kebabCase(text: string): string {
	return text.replaceAll(/[A-Z\u{C0}-\u{D6}\u{D8}-\u{DE}]/gv, (match) => '-' + match.toLowerCase())
}

/**
 * Naively pluralizes a word based on a quantity.
 */
export function pluralize(text: string, quantity: number): string {
	return quantity === 1 ? text : text + 's'
}
