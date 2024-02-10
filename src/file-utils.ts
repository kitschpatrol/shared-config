import fs from 'node:fs/promises'

export async function checkFileExists(file: string): Promise<boolean> {
	try {
		await fs.stat(file)
		return true // File exists
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
			return false // File does not exist
		}

		// Re-throw the error if it's not a 'File does not exist' error
		throw error
	}
}
