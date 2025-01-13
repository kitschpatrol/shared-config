import React from 'react'

// eslint-disable-next-line @typescript-eslint/naming-convention
export function Component1({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>
}

export function jsx2() {
	const props = { a: 1, b: 2 }
	return (
		<a>
			<div>Inline Text</div>
			<Component1 {...props}>Block Text</Component1>
			<div>
				Mixed
				<div>Foo</div>
				Text<b> Bar</b>
			</div>
			<p>
				foo<i>bar</i>
				<b>baz</b>
			</p>
		</a>
	)
}
