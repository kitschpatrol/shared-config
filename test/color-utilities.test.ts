/* eslint-disable ts/naming-convention */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getChildColorEnvironment, shouldColorStream } from '../src/color-utilities.js'

const tty = { isTTY: true }
const pipe = {}

/** Pin every color-related variable so ambient shell config can't leak in. */
function stubColorEnvironment(values: Record<string, string | undefined> = {}) {
	for (const name of ['CI', 'FORCE_COLOR', 'NO_COLOR', 'TERM']) {
		vi.stubEnv(name, values[name])
	}
}

afterEach(() => {
	vi.unstubAllEnvs()
})

describe('shouldColorStream', () => {
	it('colors a TTY and not a pipe in a clean environment', () => {
		stubColorEnvironment()
		expect(shouldColorStream(tty)).toBe(true)
		expect(shouldColorStream(pipe)).toBe(false)
	})

	it('NO_COLOR disables color even on a TTY and beats FORCE_COLOR', () => {
		stubColorEnvironment({ FORCE_COLOR: '1', NO_COLOR: '1' })
		expect(shouldColorStream(tty)).toBe(false)
	})

	it('empty NO_COLOR is ignored per the no-color.org spec', () => {
		stubColorEnvironment({ NO_COLOR: '' })
		expect(shouldColorStream(tty)).toBe(true)
	})

	it('FORCE_COLOR enables color on a pipe', () => {
		stubColorEnvironment({ FORCE_COLOR: '1' })
		expect(shouldColorStream(pipe)).toBe(true)
	})

	it('FORCE_COLOR "0" and "false" disable color even on a TTY', () => {
		stubColorEnvironment({ FORCE_COLOR: '0' })
		expect(shouldColorStream(tty)).toBe(false)
		stubColorEnvironment({ FORCE_COLOR: 'false' })
		expect(shouldColorStream(tty)).toBe(false)
	})

	it('TERM=dumb disables color on a TTY', () => {
		stubColorEnvironment({ TERM: 'dumb' })
		expect(shouldColorStream(tty)).toBe(false)
	})

	it('CI enables color on a pipe unless ciColor is disabled', () => {
		stubColorEnvironment({ CI: 'true' })
		expect(shouldColorStream(pipe)).toBe(true)
		expect(shouldColorStream(pipe, { ciColor: false })).toBe(false)
	})
})

describe('getChildColorEnvironment', () => {
	it('disables color in both the NO_COLOR and FORCE_COLOR conventions', () => {
		stubColorEnvironment()
		expect(getChildColorEnvironment(false)).toEqual({ FORCE_COLOR: '0', NO_COLOR: '1' })
	})

	it('forces color on for children, which write to pipes', () => {
		stubColorEnvironment()
		expect(getChildColorEnvironment(true)).toEqual({ FORCE_COLOR: '1' })
	})

	it('preserves a user-set FORCE_COLOR level via inheritance', () => {
		stubColorEnvironment({ FORCE_COLOR: '3' })
		expect(getChildColorEnvironment(true)).toEqual({})
	})
})
