<script lang="ts">
	import clickOutside from '$lib/actions/clickOutside';
	import { slide } from 'svelte/transition';

	export let text = 'Text';
	export let label = '';
	export let type: 'blank' | 'bordered' = 'blank';
	export let fullSize = false;

	let showDropdown = false;

	const toggle = () => (showDropdown = !showDropdown);
</script>

<div class="dropdown">
	{#if label.length > 0}
		<span class="label" class:active-label={showDropdown}>
			{label}
		</span>
	{/if}
	<div
		class="toggle-button"
		class:bordered={type === 'bordered'}
		class:active={showDropdown}
		use:clickOutside={() => (showDropdown = false)}
		on:click={toggle}
		on:keypress={() => {}}
	>
		{text}
	</div>
	{#if showDropdown}
		<div
			transition:slide={{ duration: 300 }}
			class="dropdown-content"
			style={`${fullSize ? 'width: 100%' : ''}`}
		>
			<slot />
		</div>
	{/if}
</div>

<style>
	.dropdown {
		width: 100%;
		position: relative;
	}
	.label {
		color: var(--text-secondary);
		font-size: 0.85rem;
		margin-left: 5px;
	}
	.active-label {
		color: var(--primary-main);
	}
	.toggle-button {
		padding: 8px;
		cursor: pointer;
	}
	.dropdown-content {
		position: absolute;
		max-height: 400px;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: var(--background-paper);
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		font-size: 0.95rem;
		border-radius: 0.5rem;
		cursor: pointer;
		z-index: 50;
	}
	.dropdown-content::-webkit-scrollbar {
		width: 20px;
	}
	.dropdown-content::-webkit-scrollbar-corner {
		background: rgba(0, 0, 0, 0);
	}
	.dropdown-content::-webkit-scrollbar-thumb {
		background-color: #eee;
		border-radius: 6px;
		border: 4px solid rgba(0, 0, 0, 0);
		background-clip: content-box;
		min-width: 32px;
		min-height: 32px;
	}
	.dropdown-content::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, 0);
	}
	.bordered {
		margin: 8px 0;
		border: 1px solid var(--text-secondary);
		border-radius: 8px;
	}
	.bordered:hover:not(.active) {
		padding: 6px;
		border: 3px solid var(--text-secondary);
	}
	.bordered.active {
		padding: 8px;
		border: 1px solid var(--primary-main) !important;
	}
</style>
