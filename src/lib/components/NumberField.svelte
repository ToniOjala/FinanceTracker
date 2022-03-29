<script lang="ts">
	export let label: string;
	export let value: number | undefined;
	export let helperText: string = '';
	export let autofocus = false;
</script>

<div>
	<span class="label" class:error={helperText}>{label}</span>
	<!-- svelte-ignore a11y-autofocus -->
	<input type="number" {autofocus} class:error={helperText} bind:value />
	<span class="helperText">{helperText}</span>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}
	.label {
		color: var(--text-secondary);
		font-size: 0.85rem;
		margin-left: 5px;
	}
	input {
		margin: 8px 0;
		padding: 8px;
		background-color: transparent;
		border: 1px solid var(--text-secondary);
		border-radius: 8px;
		color: var(--text-primary);
	}
	input:hover:not(:focus) {
		padding: 6px;
		border: 3px solid var(--text-secondary);
	}
	input:focus {
		outline: none;
		border: 1px solid var(--primary-main);
	}
	div:focus-within .label {
		color: var(--primary-main);
	}
	.helperText {
		color: var(--accent-color);
		font-size: 0.9rem;
	}
	.error {
		color: var(--accent-color) !important;
		border-color: var(--accent-color) !important;
	}
</style>
