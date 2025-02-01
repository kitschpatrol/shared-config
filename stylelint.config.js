import { stylelintConfig } from '@kitschpatrol/stylelint-config'

export default stylelintConfig({
	ignoreFiles: [
		'test/fixtures/input/*.*',
		'test/fixtures/output-fixable/*.*',
		// TODO reenable this...
		'test/fixtures/output-fixed/*.*',
	],
})
