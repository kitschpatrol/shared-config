import { lint } from 'cspell'
import { getDefaultConfigLoader } from 'cspell-lib'

const POSSESSIVE_SUFFIX_REGEX = /['\u{2019}\u{2018}]s$/v

export type UnusedWordsResult = {
	/** Number of errors encountered while spell-checking. */
	errors: number
	/** Number of files spell-checked to determine word usage. */
	filesChecked: number
	/** Entries in the configuration's `words` array that no checked file uses. */
	unusedWords: string[]
}

/**
 * Spell-checks the given files with the local CSpell configuration's `words`
 * array removed, and reports which of those words no file actually needs.
 *
 * @param fileGlobs - Files to spell-check when determining whether a word is
 *   used. Defaults to all files below the current working directory.
 * @throws {Error} If no CSpell configuration is found.
 */
export async function checkForUnusedWords(fileGlobs: string[] = ['.']): Promise<UnusedWordsResult> {
	const config = await getDefaultConfigLoader().searchForConfigFile(undefined)
	if (config === undefined) {
		throw new Error('No CSpell configuration found.')
	}

	const { settings, url } = config
	if (settings.words === undefined || settings.words.length === 0) {
		return {
			errors: 0,
			filesChecked: 0,
			unusedWords: [],
		}
	}

	let unusedWords = [...settings.words]
	delete settings.words

	const runResult = await lint(
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

	return {
		errors: runResult.errors,
		filesChecked: runResult.files,
		unusedWords,
	}
}
