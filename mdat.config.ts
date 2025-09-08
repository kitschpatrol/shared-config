import { mdatConfig } from '@kitschpatrol/mdat-config'

export default mdatConfig({
	rules: {
		recommendation: `> [!IMPORTANT]
  >
  > **You can use this package on its own, but it's recommended to use [\`@kitschpatrol/shared-config\`](https://www.npmjs.com/package/@kitschpatrol/shared-config) instead for a single-dependency and single-package approach to linting and fixing your project.**
  >
  > This package is included as a dependency in [\`@kitschpatrol/shared-config\`](https://www.npmjs.com/package/@kitschpatrol/shared-config), which also automatically invokes the command line functionality in this package via its \`ksc\` command`,
	},
})
