import { knipConfig } from '@kitschpatrol/knip-config'

export default knipConfig({
	ignore: ['**/init/**', 'test/fixtures/**'],
	ignoreBinaries: ['ksdiff'],
})
