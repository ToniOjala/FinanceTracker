<script>
	export let text = 'Item';
</script>

<div on:click on:keypress>{text}</div>

<style>
	div {
		padding: 12px;
		border-radius: 8px;
		user-select: none;
	}
	div:hover {
		background-color: var(--background-paper-hover);
		border-radius: 8px;
	}
</style>
