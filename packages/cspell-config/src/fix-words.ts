import { createReaderWriter } from 'cspell-config-lib'
import { getDefaultConfigLoader } from 'cspell-lib'
import { loadFile, writeFile } from 'magicast'
import { getDefaultExportOptions } from 'magicast/helpers'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { formatFileInPlace } from '../../../src/prettier-utilities.js'
import { checkForUnusedWords } from './unused-words.js'

const JAVASCRIPT_CONFIG_EXTENSIONS = new Set(['.cjs', '.cts', '.js', '.mjs', '.mts', '.ts'])

export type FixWordsResult = {
	/** Absolute path to the CSpell configuration file that was fixed. */
	configFilePath: string
	/** Words removed from the configuration's `words` array. */
	removedWords: string[]
	/** True if the `words` array was re-sorted or deduplicated. */
	reordered: boolean
}

/**
 * Removes unused words from the local CSpell configuration's `words` array and
 * sorts the remaining words alphabetically.
 *
 * @param fileGlobs - Files to spell-check when determining whether a word is
 *   used. Defaults to all files below the current working directory. Passing a
 *   subset of the tree removes words used solely in unlisted files, so callers
 *   must pass globs covering every file the configuration applies to.
 *
 * @returns A summary of the changes, or `undefined` if the configuration has no
 *   local `words` entries.
 * @throws {Error} If no configuration is found, if word usage can't be
 *   determined, or if the configuration file's format precludes automatic
 *   modification.
 */
export async function fixWordsInConfig(
	fileGlobs: string[] = ['**/*'],
): Promise<FixWordsResult | undefined> {
	const config = await getDefaultConfigLoader().searchForConfigFile(undefined)
	if (config === undefined) {
		throw new Error('No CSpell configuration found.')
	}

	const configFilePath = fileURLToPath(config.url)

	// Capture the original words before checkForUnusedWords clears them from
	// the loader's cached settings
	const originalWords = [...(config.settings.words ?? [])]
	if (originalWords.length === 0) {
		return undefined
	}

	const {
		errors,
		filesChecked,
		unusedWords: unusedWordsList,
	} = await checkForUnusedWords(fileGlobs)

	// Without a successful spell-check run, every word looks unused, so
	// modifying the configuration would wrongly wipe the whole words array
	if (filesChecked === 0 || errors > 0) {
		throw new Error(
			`Refusing to modify "${configFilePath}": CSpell checked ${filesChecked} files with ${errors} errors, so word usage can't be determined. Check your file globs and configuration.`,
		)
	}

	const unusedWords = new Set(unusedWordsList)
	const keptWords = originalWords.filter((word) => !unusedWords.has(word))
	const newWords = sortWords([...new Set(keptWords)])

	if (wordsAreEqual(newWords, originalWords)) {
		return {
			configFilePath,
			removedWords: [],
			reordered: false,
		}
	}

	await updateWordsInConfigFile(config.url, newWords)

	return {
		configFilePath,
		removedWords: [...unusedWords],
		reordered: !wordsAreEqual(newWords, keptWords),
	}
}

function sortWords(words: string[]): string[] {
	return words.toSorted((a, b) => {
		const caseInsensitiveOrder = a.toLowerCase().localeCompare(b.toLowerCase())
		return caseInsensitiveOrder === 0 ? a.localeCompare(b) : caseInsensitiveOrder
	})
}

function wordsAreEqual(a: string[], b: string[]): boolean {
	return a.length === b.length && a.every((word, index) => word === b[index])
}

async function updateWordsInConfigFile(configUrl: URL, words: string[]): Promise<void> {
	const configFilePath = fileURLToPath(configUrl)
	const extension = path.extname(configFilePath).toLowerCase()

	if (JAVASCRIPT_CONFIG_EXTENSIONS.has(extension)) {
		const configModule = await loadFile(configFilePath)
		const configObject = getDefaultExportOptions(configModule)
		configObject.words = words
		await writeFile(configModule, configFilePath)
		await formatFileInPlace(configFilePath)
		return
	}

	// JSON, YAML, TOML, and package.json configurations
	const readerWriter = createReaderWriter()
	const configFile = await readerWriter.readConfig(configUrl)
	if (configFile.readonly) {
		throw new Error(
			`CSpell configuration file "${configFilePath}" can't be modified automatically. Please update the words list manually.`,
		)
	}

	configFile.setValue('words', words)
	await readerWriter.writeConfig(configFile)
}
