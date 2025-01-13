import { execa } from 'execa'
import fse from 'fs-extra'
import path from 'node:path'
import process from 'node:process'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { version } from '../package.json'

describe('CLI basics', () => {
	it('should print version', async () => {
		const { exitCode, stdout } = await execa('shared-config', ['--version'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toBe(version)
	})

	it('should print help', async () => {
		const { exitCode, stdout } = await execa('shared-config', ['--help'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toMatchInlineSnapshot(`
			"
			  A collection of shared configurations for various linters and formatting tools. All managed as a single dependency, and invoked via a single command.

			  Usage
			    $ shared-config [<file|glob> ...]

			  Options
			    --check, -c               Check for and report issues. Same as \`shared-config\`.
			    --init, -i                Initialize by copying starter config files to your project root.
			    --print-config, -p <path> Print the effective configuration at a certain path.
			    --fix, -f                 Fix all auto-fixable issues, and report the un-fixable.
			    --help, -h                Print this help info.
			    --version, -v             Print the package version.
			"
		`)
	})

	describe('CLI rule configuration', () => {
		const tempDirectory = './input-copy/'

		beforeEach(async () => {
			await fse.rm(tempDirectory, { force: true, recursive: true })
		})

		afterAll(async () => {
			await fse.rm(tempDirectory, { force: true, recursive: true })
		})

		it('should not fix anything unless asked', { timeout: 60_000 }, async () => {
			const sourceDirectory = './test/fixtures/input/'
			await fse.copy(sourceDirectory, tempDirectory)

			await execa('shared-config', [], {
				localDir: process.cwd(),
				preferLocal: true,
				reject: false,
			})

			for (const file of await fse.readdir(tempDirectory)) {
				const fileContent = await fse.readFile(path.join(tempDirectory, file), 'utf8')
				const originalContent = await fse.readFile(path.join(sourceDirectory, file), 'utf8')
				expect(fileContent).toEqual(originalContent)
			}
		})

		it('should fix auto-fixable things', { timeout: 60_000 }, async () => {
			const sourceDirectory = './test/fixtures/input/'
			const destinationDirectory = './test/fixtures/output-fixable/'
			await fse.copy(sourceDirectory, tempDirectory)

			await execa('shared-config', ['--fix'], {
				localDir: process.cwd(),
				preferLocal: true,
				reject: false,
			})

			for (const file of await fse.readdir(tempDirectory)) {
				const fileContent = await fse.readFile(path.join(tempDirectory, file), 'utf8')
				const destinationFilePath = path.join('../', destinationDirectory, path.basename(file))

				await fse.createFile(destinationFilePath)
				await expect(fileContent).toMatchFileSnapshot(destinationFilePath)
			}
		})

		it('should catch errors as expected', { timeout: 60_000 }, async () => {
			const sourceDirectory = './test/fixtures/input/'
			await fse.copy(sourceDirectory, tempDirectory)

			const { exitCode, stdout } = await execa('shared-config', [], {
				// Disable color output
				env: {
					// Disable color output
					// eslint-disable-next-line @typescript-eslint/naming-convention
					NO_COLOR: '1',
				},
				localDir: process.cwd(),
				preferLocal: true,
				reject: false,
			})

			expect(exitCode).toMatchInlineSnapshot(`1`)
			//
			/* cspell:disable */
			expect(stdout).toMatchInlineSnapshot(`
				"🔬 Running "cspell-config --check"
				🔬 Running "eslint-config --check"
				🔬 [ESLint] /Users/mika/Code/shared-config/input-copy/astro.astro
				🔬 [ESLint]    2:1  error  Comments should not begin with a lowercase character                                                       capitalized-comments
				🔬 [ESLint]    3:7  error  Type boolean trivially inferred from a boolean literal, remove type annotation                             @typescript-eslint/no-inferrable-types
				🔬 [ESLint]    6:1  error  Unexpected var, use let or const instead                                                                   no-var
				🔬 [ESLint]    6:5  error  'f' is assigned a value but never used                                                                     @typescript-eslint/no-unused-vars
				🔬 [ESLint]   11:3  error  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  astro/jsx-a11y/alt-text
				🔬 [ESLint] /Users/mika/Code/shared-config/input-copy/html.html
				🔬 [ESLint]   2:1  error  Missing \`lang\` attribute in \`<html>\` tag  @html-eslint/require-lang
				🔬 [ESLint]   3:3  error  Missing \`<meta name="viewport">\`          @html-eslint/require-meta-viewport
				🔬 [ESLint] /Users/mika/Code/shared-config/input-copy/javascript.js
				🔬 [ESLint]    3:1   warning  Unused eslint-disable directive (no problems were reported from 'no-console')
				🔬 [ESLint]    4:1   error    Unexpected var, use let or const instead                                           no-var
				🔬 [ESLint]    4:5   error    Use object destructuring                                                           prefer-destructuring
				🔬 [ESLint]   27:8   error    Use \`for…of\` instead of \`.forEach(…)\`                                              unicorn/no-array-for-each
				🔬 [ESLint]   38:15  error    Expected "age" to come before "name"                                               perfectionist/sort-objects
				🔬 [ESLint]   55:16  error    The variable \`num\` should be named \`number_\`. A more descriptive name will do too  unicorn/prevent-abbreviations
				🔬 [ESLint]   64:1   error    Split 'let' declarations into multiple statements                                  one-var
				🔬 [ESLint] /Users/mika/Code/shared-config/input-copy/jsx.jsx
				🔬 [ESLint]    1:17  error  Function name \`HelloWorld\` must match one of the following formats: camelCase      @typescript-eslint/naming-convention
				🔬 [ESLint]    2:23  error  Expected "greeted" to come before "greeting"                                       perfectionist/sort-objects
				🔬 [ESLint]    2:60  error  Expected "onMouseOver" to come before "silent"                                     perfectionist/sort-objects
				🔬 [ESLint]    5:12  error  Use \`undefined\` instead of \`null\`                                                  unicorn/no-null
				🔬 [ESLint]    5:17  error  Expected blank line before this statement                                          padding-line-between-statements
				🔬 [ESLint]    8:7   error  The variable \`num\` should be named \`number_\`. A more descriptive name will do too  unicorn/prevent-abbreviations
				🔬 [ESLint]    8:7   error  'num' is never reassigned. Use 'const' instead                                     prefer-const
				🔬 [ESLint]   10:6   error  Prefer \`String#replaceAll()\` over \`String#replace()\`                               unicorn/prefer-string-replace-all
				🔬 [ESLint]   10:14  error  /\\.\\d+/ig can be optimized to /\\.\\d+/gi                                            unicorn/better-regex
				🔬 [ESLint]   12:80  error  Expected "onMouseOver" to come before "title"                                      perfectionist/sort-jsx-props
				🔬 [ESLint]   15:35  error  Unnecessary escape character: \\g                                                   no-useless-escape
				🔬 [ESLint] /Users/mika/Code/shared-config/input-copy/markdown.md
				🔬 [ESLint]   30:11  warning  Unexpected reference to undefined definition, expected corresponding definition (\`link\`) for a link or escaped opening bracket (\`\\[\`) for regular text  remark-lint-no-undefined-references
				🔬 [ESLint]   31:7   warning  Unexpected shortcut reference link (\`[text]\`), expected collapsed reference (\`[text][]\`)                                                                remark-lint-no-shortcut-reference-link
				🔬 [ESLint]   34:3   warning  Unexpected definition before last content, expected definitions after line \`37\`                                                                         remark-lint-final-definition
				🔬 [ESLint] /Users/mika/Code/shared-config/input-copy/tsx.tsx
				🔬 [ESLint]   1:17  error  Function name \`Component1\` must match one of the following formats: camelCase  @typescript-eslint/naming-convention
				🔬 [ESLint]   8:26  error  Expected "bar" to come before "foo"                                            perfectionist/sort-jsx-props
				🔬 [ESLint] /Users/mika/Code/shared-config/input-copy/typescript.ts
				🔬 [ESLint]    2:11  error    Use a \`type\` instead of an \`interface\`                                                                 @typescript-eslint/consistent-type-definitions
				🔬 [ESLint]    4:3   error    Expected "age" to come before "name"                                                                   perfectionist/sort-interfaces
				🔬 [ESLint]    9:20  error    Expected "age" to come before "name"                                                                   perfectionist/sort-objects
				🔬 [ESLint]   10:17  error    Expected "age" to come before "name"                                                                   perfectionist/sort-objects
				🔬 [ESLint]   12:3   error    Expected "age" to come before "name"                                                                   perfectionist/sort-objects
				🔬 [ESLint]   15:1   warning  Unused eslint-disable directive (no problems were reported from 'no-console')
				🔬 [ESLint]   16:1   error    Unexpected var, use let or const instead                                                               no-var
				🔬 [ESLint]   16:5   error    Use object destructuring                                                                               prefer-destructuring
				🔬 [ESLint]   34:11  error    Use a \`type\` instead of an \`interface\`                                                                 @typescript-eslint/consistent-type-definitions
				🔬 [ESLint]   49:19  error    Unexpected any. Specify a different type                                                               @typescript-eslint/no-explicit-any
				🔬 [ESLint]   54:3   error    Property name should be declared as a parameter property                                               @typescript-eslint/parameter-properties
				🔬 [ESLint]   54:3   error    Member 'name' is never reassigned; mark it as \`readonly\`                                               @typescript-eslint/prefer-readonly
				🔬 [ESLint]   58:3   error    Expected blank line between class members                                                              @typescript-eslint/lines-between-class-members
				🔬 [ESLint]   65:15  error    Member 'alias: string' is never reassigned; mark it as \`readonly\`                                      @typescript-eslint/prefer-readonly
				🔬 [ESLint]   68:3   error    Expected blank line between class members                                                              @typescript-eslint/lines-between-class-members
				🔬 [ESLint]   76:1   error    Unexpected var, use let or const instead                                                               no-var
				🔬 [ESLint]   76:24  error    Unexpected block statement surrounding arrow body; move the returned value immediately after the \`=>\`  arrow-body-style
				🔬 [ESLint] ✖ 47 problems (42 errors, 5 warnings)
				🔬 [ESLint]   32 errors and 3 warnings potentially fixable with the \`--fix\` option.
				🔬 Running "prettier-config --check"
				🔬 [Prettier] [warn] input-copy/astro.astro
				🔬 [Prettier] [warn] input-copy/css.css
				🔬 [Prettier] [warn] input-copy/html.html
				🔬 [Prettier] [warn] input-copy/javascript.js
				🔬 [Prettier] [warn] input-copy/jsx.jsx
				🔬 [Prettier] [warn] input-copy/markdown.md
				🔬 [Prettier] [warn] input-copy/Svelte.svelte
				🔬 [Prettier] [warn] input-copy/svg.svg
				🔬 [Prettier] [warn] input-copy/toml.toml
				🔬 [Prettier] [warn] input-copy/tsconfig.json
				🔬 [Prettier] [warn] input-copy/tsx.tsx
				🔬 [Prettier] [warn] input-copy/typescript.ts
				🔬 [Prettier] [warn] input-copy/xml.xml
				🔬 [Prettier] [warn] Code style issues found in 13 files. Run Prettier with --write to fix.
				🔬 Running "mdat-config --check"
				🔬 Running "stylelint-config --check"
				🔬 [Stylelint] input-copy/css.css
				🔬 [Stylelint]   1:8  ✖  Expected "context" media feature range notation  media-feature-range-notation
				🔬 [Stylelint] ✖ 1 problem (1 error, 0 warnings)
				🔬 [Stylelint]   1 error potentially fixable with the "--fix" option.
				🔬 ✅ 2 Successful commands: cspell-config, mdat-config
				🔬 ❌ 3 Failed commands: eslint-config, prettier-config, stylelint-config"
			`)
			//
			/* cspell:enable */
		})
	})
})
