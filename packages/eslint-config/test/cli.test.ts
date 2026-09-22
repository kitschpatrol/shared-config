import { execaNode } from 'execa'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const packageRoot = path.resolve(import.meta.dirname, '..')
const cliBin = path.join(packageRoot, 'bin/cli.js')

/** Run the CLI with given args from the package root. */
async function runCli(...args: string[]) {
	return execaNode(cliBin, args, {
		cwd: packageRoot,
		// eslint-disable-next-line ts/naming-convention
		env: { NO_COLOR: '1' },
		reject: false,
	})
}

describe('cli positional arguments', () => {
	it('should skip explicit files that no configuration matches', async () => {
		const result = await runCli('lint', 'license.txt')

		expect(result.exitCode).toBe(0)
		expect(result.stdout).not.toContain('File ignored')
	})
})
