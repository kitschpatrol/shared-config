import { describe, expect, it } from 'vitest'
import { updateLicenseContent } from '../src/copyright-year-updater.js'

const MIT_BODY = `Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM.
`

function mit(...copyrightLines: string[]): string {
	return `MIT License\n\n${copyrightLines.join('\n')}\n\n${MIT_BODY}`
}

describe('updateLicenseContent', () => {
	it('extends a single outdated year into a range', () => {
		expect(updateLicenseContent(mit('Copyright (c) 2021 Eric Mika'), 2026)).toBe(
			mit('Copyright (c) 2021-2026 Eric Mika'),
		)
	})

	it('updates the end of an outdated range', () => {
		expect(updateLicenseContent(mit('Copyright (c) 2021-2024 Eric Mika'), 2026)).toBe(
			mit('Copyright (c) 2021-2026 Eric Mika'),
		)
	})

	it('leaves a current year untouched', () => {
		const content = mit('Copyright (c) 2021-2026 Eric Mika')
		expect(updateLicenseContent(content, 2026)).toBe(content)
	})

	it('leaves upstream notices above a current last line untouched', () => {
		const content = mit(
			'Copyright (c) 2021-2023 0b5vr <0b5vr@0b5vr.com>',
			'Copyright (c) 2023-2026 Eric Mika (fork modifications)',
		)
		expect(updateLicenseContent(content, 2026)).toBe(content)
	})

	it('updates only the last copyright line when it is outdated', () => {
		expect(
			updateLicenseContent(
				mit(
					'Copyright (c) 2021 cocopon <cocopon@me.com>',
					'Copyright (c) 2022-2023 Simon Schödler',
					'Copyright (c) 2023-2025 Eric Mika (fork modifications)',
				),
				2026,
			),
		).toBe(
			mit(
				'Copyright (c) 2021 cocopon <cocopon@me.com>',
				'Copyright (c) 2022-2023 Simon Schödler',
				'Copyright (c) 2023-2026 Eric Mika (fork modifications)',
			),
		)
	})

	it('recognizes a © symbol without the word copyright', () => {
		expect(updateLicenseContent(mit('© 2024 Neil Shankar'), 2026)).toBe(
			mit('© 2024-2026 Neil Shankar'),
		)
	})

	it('falls back to the first year in the file when no copyright line has a year', () => {
		expect(updateLicenseContent('Released in 2020 by Eric Mika.\n', 2026)).toBe(
			'Released in 2020-2026 by Eric Mika.\n',
		)
	})

	it('ignores dates in license boilerplate', () => {
		const apache = 'Apache License\nVersion 2.0, January 2004\n\nCopyright 2021 Eric Mika\n'
		expect(updateLicenseContent(apache, 2026)).toBe(
			'Apache License\nVersion 2.0, January 2004\n\nCopyright 2021-2026 Eric Mika\n',
		)
	})

	it('preserves CRLF line endings', () => {
		const content = 'MIT License\r\n\r\nCopyright (c) 2020 A\r\nCopyright (c) 2021 B\r\n'
		expect(updateLicenseContent(content, 2026)).toBe(
			'MIT License\r\n\r\nCopyright (c) 2020 A\r\nCopyright (c) 2021-2026 B\r\n',
		)
	})
})
