import type { CSpellUserSettings as CspellConfig } from '@cspell/cspell-types'

const sharedCspellConfig: CspellConfig = {
	allowCompoundWords: false,
	caseSensitive: false,
	dictionaries: [
		'lorem-ipsum',
		'git',
		'gaming-terms',
		'npm',
		'data-science',
		'fullstack',
		'kp-acronyms',
		'kp-brands',
		'kp-files',
		'kp-misc',
		'kp-names',
		'kp-tech',
	],
	dictionaryDefinitions: [
		{
			addWords: true,
			name: 'kp-acronyms',
			path: '../dictionaries/kp-acronyms.txt',
		},
		{
			addWords: true,
			name: 'kp-brands',
			path: '../dictionaries/kp-brands.txt',
		},
		{
			addWords: true,
			name: 'kp-files',
			path: '../dictionaries/kp-files.txt',
		},
		{
			addWords: true,
			name: 'kp-misc',
			path: '../dictionaries/kp-misc.txt',
		},
		{
			addWords: true,
			name: 'kp-names',
			path: '../dictionaries/kp-names.txt',
		},
		{
			addWords: true,
			name: 'kp-tech',
			path: '../dictionaries/kp-tech.txt',
		},
	],
	enabled: true,
	enableFiletypes: ['astro', 'md', 'mdx', 'patch', 'svelte'],
	enableGlobDot: false,
	globRoot: '/',
	ignorePaths: [
		'__snapshots__',
		'*.app',
		'*.avif',
		'*.m4a',
		'*.m4v',
		'*.mp3',
		'*.mp4',
		'*.patch',
		'*.scpt',
		'*.svg',
		'*.tif',
		'*.tldr',
		'*.3gp',
		'*.aac',
		'*.avi',
		'*.flac',
		'*.flv',
		'*.mkv',
		'*.mpeg',
		'*.oga',
		'*.ogg',
		'*.ogv',
		'*.ogx',
		'*.opus',
		'*.spx',
		'*.swf',
		'*.wav',
		'package.json',
		'patches/',
		'pnpm-lock.yaml',
	],
	ignoreRegExpList: ['tp-.+', 'tweakpane-plugin-.+', String.raw`v2_c_\w{21}`],
	language: 'en,en-US',
	languageSettings: [
		{
			ignoreRegExpList: [
				// TODO does regex really need to be global?
				'/^```(?:.|\\s)+?^```/mig', // Code fences
				String.raw`\$\$.*?\$\$`, // Ignore display MathJax $$...$$
				String.raw`\$[^$\n]*\$`, // Ignore inline MathJax $...$
				String.raw`[A-Z\d\-]{8,}`, // Probable IDs or model names, e.g. AK-68-S7KA-0004
			],
			languageId: 'markdown,mdx,json',
		},
	],
	useGitignore: true,
	version: '0.2',
}

/**
 * **\@Kitschpatrol's Shared Cspell Configuration**
 * @see [@kitschpatrol/cspell-config](https://github.com/kitschpatrol/shared-config/tree/main/packages/cspell-config)
 * @see [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config)
 * @example
 * ```js
 * export default cspellConfig({
 * 	ignorePaths: [
 * 		'/test/fixtures/input',
 * 	],
 * })
 * ```
 */
export function cspellConfig(config?: CspellConfig): CspellConfig {
	// TODO real merge?
	return {
		import: '@kitschpatrol/cspell-config',
		...config,
	}
}

export default sharedCspellConfig
