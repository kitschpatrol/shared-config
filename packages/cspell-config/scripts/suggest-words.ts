// Looks in a code project folder for words that I've had to add to the
// dictionary on a per-project basis, and suggests them here

import * as cspell from 'cspell-lib'
import { execa } from 'execa'
// eslint-disable-next-line depend/ban-dependencies
import { globby } from 'globby'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import untildify from 'untildify'

async function getWordListsFromProjects(directory: string): Promise<string[]> {
	const configFiles = await globby(['**/.cspell.json', '**/cspell.config.js', '**/.cspell.js'], {
		absolute: true,
		cwd: untildify(directory),
		deep: 3,
		ignore: [
			'**/ambient-novel/**',
			'**/ericmika.com/**',
			'**/frontiernerds.com/**',
			'**/infra/**',
			'**/scripts/**',
		],
	})

	const projectWords: string[] = []
	for (const configFile of configFiles) {
		const config = await cspell.loadConfig(configFile)
		projectWords.push(...(config.words ?? []))
	}

	return [...new Set(projectWords)].toSorted()
}

async function getSharedConfigWords(): Promise<string[]> {
	const dictionaries = await globby('../dictionaries/*.txt', {
		absolute: true,
		// eslint-disable-next-line node/no-unsupported-features/node-builtins
		cwd: import.meta.dirname,
	})

	const sharedConfigWords: string[] = []

	for (const file of dictionaries) {
		const content = await readFile(file, 'utf8')
		const lines = content.split('\n').filter((line) => line.trim() !== '')
		sharedConfigWords.push(...lines)
	}

	return [...new Set(sharedConfigWords)].toSorted()
}

async function getDictionaryCategories(): Promise<string[]> {
	const categories = await globby('../dictionaries/*.txt', {
		absolute: true,
		// eslint-disable-next-line node/no-unsupported-features/node-builtins
		cwd: import.meta.dirname,
	})

	return [
		...new Set(categories.map((c) => path.basename(c, path.extname(c)).replace(/^kp-/, ''))),
	].toSorted()
}

async function main() {
	const searchDirectory = process.argv[2] || '~/Code/'

	const projectWords = await getWordListsFromProjects(searchDirectory)
	const sharedConfigWords = await getSharedConfigWords()

	// Find words that are in the project words but not in the shared config words
	const suggestedWords = projectWords.filter((word) => !sharedConfigWords.includes(word))

	const categories = await getDictionaryCategories()

	const llmPrompt = `You are helping to categorize words for a spell checker dictionary used in code projects.

TASK: Categorize each word below into one of these categories:
${categories.map((c) => `- ${c.toUpperCase()}`).join('\n')}
- OBSCURE
	
INSTRUCTIONS:
- Assign each word to the most appropriate category based on its primary meaning or usage context
- Only use "Obscure" for words that are genuinely uncommon, archaic, or don't fit any other category
- Prioritize placing words in specific categories over using "Obscure"
- Consider programming/technical contexts when categorizing
- Do not make up and additional categories. Only use the ones provided above in TASK.
- Do not repeat words or duplicate them across categories.
- Do not make up and additional words. Only use the ones provided below in WORDS TO CATEGORIZE.
	
WORDS TO CATEGORIZE:
${suggestedWords.join('\n')}
	
OUTPUT FORMAT:
Return plain text with category headings in ALL CAPS, followed by words (one per line) that belong in that category.
	
REMEMBER:
- Do not make up and additional categories. Only use the ones provided above in TASK.
- Do not make up and additional words. Only use the ones provided above in WORDS TO CATEGORIZE.`

	// Copy to pasteboard
	await execa('pbcopy', { input: llmPrompt })

	console.log(
		`Found ${suggestedWords.length} words to suggest. An LLM prompt to assist categorization has been copied to the pasteboard.`,
	)
}

await main()
