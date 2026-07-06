/* eslint-disable jsdoc/require-jsdoc */
import { lint } from 'cspell'
import { getDefaultConfigLoader } from 'cspell-lib'

const POSSESSIVE_SUFFIX_REGEX = /['\u{2019}\u{2018}]s$/v

export async function checkForUnusedWords(fileGlobs: string[] = ['.']): Promise<string[]> {
	const config = await getDefaultConfigLoader().searchForConfigFile(undefined)
	if (config === undefined) {
		throw new Error('No CSpell configuration found.')
	}

	const { settings, url } = config
	if (settings.words === undefined || settings.words.length === 0) {
		return []
	}

	let unusedWords = [...settings.words]
	settings.words = undefined

	await lint(
		fileGlobs,
		{
			config: { settings, url },
			progress: false,
			unique: true,
			wordsOnly: true,
		},
		{
			issue({ text, uri }) {
				unusedWords = unusedWords.filter(
					(word) =>
						word.toLowerCase() !== text.toLowerCase().replace(POSSESSIVE_SUFFIX_REGEX, '') ||
						uri === url.href,
				)
			},
		},
	)

	return unusedWords
}
