<script lang="ts">
	import type { paths } from './iconPaths';
	import SvgIcon from './SvgIcon.svelte';

	export let icon: keyof typeof paths;
	export let size: number = 24;
	export let color: string = '';
	export let disabled: boolean = false;
	export let margin = '0 0 0 0';
</script>

<button type="button" {disabled} class:disabled on:click style="margin: {margin}">
	<SvgIcon {icon} {size} color={disabled ? '#BBBBBBAA' : color ? color : '#EEEEEE'} />
	{#if $$slots.default}
		<div><slot /></div>
	{/if}
</button>

<style>
	button {
		color: var(--text-primary);
		background-color: #00000000;
		border: none;
		padding: 8px;
		border-radius: 10%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	button:hover:not(.disabled) {
		background-color: #ffffff11;
	}
	div {
		margin-left: 8px;
	}
	.disabled {
		color: var(--text-disabled);
	}
</style>
