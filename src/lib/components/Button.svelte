<script lang="ts">
	export let type = 'button';
	export let backgroundColor = 'var(--primary-main)';
	export let color = '#111';
	export let margin = '0 0 0 0';
	export let disabled = false;
</script>

<button
	{type}
	{disabled}
	on:click
	style="background-color: {disabled ? '#66B08888' : backgroundColor}; color: {color}; margin: {margin}">
	<slot></slot>
</button>

<style>
	button {
		border: none;
		outline: none;
		padding: 8px;
		border-radius: 8px;
	}
	button:hover:enabled {
		cursor: pointer;
		filter: brightness(90%);
	}
</style>
