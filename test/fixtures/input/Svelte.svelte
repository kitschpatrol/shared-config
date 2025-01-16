<script lang='ts'>
  export const content = "hi!"
</script>
  
<article>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <div>{@html content}</div>
</article>

<style lang="postcss">
	/* Stylelint should work here */

	button div {
		position: relative;
		box-shadow: -2px 3px 5px #00000067;
	}

  

	@media (hover: hover) {
		button:not(:disabled):hover div:not(.down) {
			color: white;
			/* background-color: theme(colors.vm-magenta); */
			background-color: #f01ef6;
			/* text-shadow: 0 0 3px white; */
		}

		/* button:not(:hover) div { */
		/* transition: 500ms; */
		/* } */
	}

	button:not(:disabled):active div {
		right: 2px;
		top: 2px;
		/* background-color: theme(colors.vm-magenta-mild); */
		box-shadow: 0 1px 3px #00000067;
		background-color: #c63bee;
	}

  button {
		cursor: pointer;
		user-select: none;
		transition: opacity 500ms;
	}

	button div.down {
    right: 2px;
		top: 2px;
		/* stylelint-disable-next-line function-no-unknown */
		background-color: #ef1ef68f;
		box-shadow: 0 1px 3px #00000067;
	}

	button:disabled {
		opacity: 50%;
	}
</style>
