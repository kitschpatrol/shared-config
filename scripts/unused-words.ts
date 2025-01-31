/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable unicorn/no-useless-undefined */
import { lint } from 'cspell'
import { getDefaultConfigLoader } from 'cspell-lib'

export async function checkForUnusedWords(): Promise<string[]> {
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
		['.'],
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
						!(
							word.toLowerCase() === text.toLowerCase().replace(/['\u2019\u2018]s$/, '') &&
							uri !== url.href
						),
				)
			},
		},
	)

	return unusedWords
}

const unusedWords = await checkForUnusedWords()
// This is Blognortonadf's
console.log('Unused words:', unusedWords)
