// eslint-disable-next-line @typescript-eslint/naming-convention
/**
 *
 * @param root0
 * @param root0.greeted
 * @param root0.greeting
 * @param root0.onMouseOver
 * @param root0.silent
 */
export function HelloWorld({
	greeted = '"World"',
	greeting = 'hello',
	onMouseOver,
	silent = false,
}) {
	if (!greeting) {
		return
	}

	// TODO: Don't use random in render
	const number_ = Math.floor(Math.random() * 1e7)
		.toString()
		.replaceAll(/\.\d+/g, '')

	return (
		<div
			className="HelloWorld"
			onMouseOver={onMouseOver}
			title={`You are visitor number ${number_}`}
		>
			<strong>{greeting.slice(0, 1).toUpperCase() + greeting.slice(1).toLowerCase()}</strong>
			{greeting.endsWith(',') ? ' ' : <span style={{ color: 'grey' }}>", "</span>}
			<em>{greeted}</em>
			{silent ? '.' : '!'}
		</div>
	)
}
