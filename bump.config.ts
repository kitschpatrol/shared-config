import { createBumppHook } from '@kitschpatrol/chagent/bumpp'
import { defineConfig } from 'bumpp'

export default defineConfig({
	// Adds only the generated changelogs to the release commit, where bumpp's
	// `--all` flag would stage every pending change in the working tree
	execute: createBumppHook(),
})
