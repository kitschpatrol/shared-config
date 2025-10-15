import type { Linter } from 'eslint'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { ConfigNames, RuleOptions } from './typegen'

export type Awaitable<T> = Promise<T> | T

export type OptionsConfig = {
	/**
	 * Enable Astro support.
	 * @default auto-detect based on the dependencies
	 * TODO typescript support?
	 */
	astro?: boolean | (OptionsOverrides & OptionsOverridesEmbeddedScripts & OptionsTypeAware)
	/**
	 * Enable gitignore support.
	 *
	 * Passing an object to configure the options.
	 * @see https://github.com/antfu/eslint-config-flat-gitignore
	 * @default true
	 */
	gitignore?: boolean | FlatGitignoreOptions
	/**
	 * Enable linting for HTML and HTML script tags.
	 * @default true
	 */
	html?: OptionsOverrides & OptionsOverridesEmbeddedScripts
	/**
	 * Control to disable some rules in editors.
	 * @default auto-detect based on the process.env
	 */
	isInEditor?: boolean
	/**
	 * Core rules. Can't be disabled.
	 */
	js?: OptionsOverrides & OptionsTypeAware
	/**
	 * Enable JSON support.
	 */
	json?: OptionsOverrides
	/**
	 * Core rules. Can't be disabled.
	 */
	jsx?: OptionsOverrides & OptionsTypeAware
	/**
	 * Enable linting for Markdown via Remark, and Markdown code snippets
	 * @default true
	 */
	md?: OptionsOverrides & OptionsOverridesEmbeddedScripts
	/**
	 * Enable linting for MDX via REmark, and MDX code snippets.
	 * @default true
	 */
	mdx?: OptionsOverrides & OptionsOverridesEmbeddedScripts
	/**
	 * Enable React support.
	 * @default auto-detect based on the dependencies
	 */
	react?: boolean | (OptionsOverrides & OptionsTypeAware)
	/**
	 * Enable Svelte support.
	 * @default auto-detect based on the dependencies
	 */
	svelte?: boolean | OptionsOverrides
	/**
	 * Enable test support.
	 */
	test?: OptionsOverrides
	/**
	 * Enable TOML support.
	 * @default true
	 */
	toml?: OptionsOverrides
	/**
	 * TypeScript rules. Can't be disabled.
	 */
	ts?: OptionsOverrides & OptionsTypeAware
	/**
	 * TypeScript rules. Can't be disabled.
	 */
	tsx?: OptionsOverrides & OptionsTypeAware
	/**
	 * Type of the project. `lib` will enable more strict rules for libraries.
	 * @default 'app'
	 */
	type?: 'app' | 'lib'
	/**
	 * Enable YAML support.
	 */
	yaml?: OptionsOverrides
}

// eslint-disable-next-line unicorn/prefer-export-from
export type { ConfigNames }

export type OptionsHasTypeScript = {
	typescript?: boolean
}

export type OptionsIsInEditor = {
	isInEditor?: boolean
}

export type OptionsOverrides = {
	overrides?: TypedFlatConfigItem['rules']
}

export type OptionsOverridesEmbeddedScripts = {
	overridesEmbeddedScripts?: TypedFlatConfigItem['rules']
}

export type OptionsTypeAware = {
	typeAware?: {
		/**
		 * Explicitly enable or disable type aware rules.
		 *
		 * If undefined, the type aware rules will be enabled automatically in TS if a
		 * tsconfig is found, and will be enabled in JS if TypeScript is detected
		 * _and_ `checkJs` is enabled in your tsconfig.
		 * @default undefined
		 */
		enabled?: boolean
		/**
		 * [Minimatch](https://github.com/isaacs/minimatch/tree/v3]) patterns of
		 * specific files to exclude from type aware rules.
		 */
		ignores: string[]
	}
}

export type Rules = RuleOptions

export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
	// Relax plugins type limitation, as most of the plugins did not have correct type info yet.
	/**
	 * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
	 * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
	 */
	// eslint-disable-next-line ts/no-explicit-any
	plugins?: Record<string, any>
}
