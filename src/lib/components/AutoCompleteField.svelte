<script lang="ts">
	import { slide } from 'svelte/transition';

	export let label: string;
	export let value: string;
	export let options: string[];
	export let top: number;

	let suggestions: string[] = [];
	let selectedIndex = 0;

	function handleFocus() {
		prepareSuggestions();
	}

	function handleBlur() {
		suggestions = [];
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && suggestions.length > 0) {
			value = suggestions[selectedIndex];
			suggestions = [];
			selectedIndex = 0;
		} else if (event.key === 'ArrowDown' && suggestions.length > selectedIndex + 1) {
			event.preventDefault();
			selectedIndex++;
		} else if (event.key === 'ArrowUp' && selectedIndex > 0) {
			event.preventDefault();
			selectedIndex--;
		}
	}

	function prepareSuggestions() {
		suggestions = [];
		if (value.length > 0) {
			const regex = new RegExp(`^${value}`, 'i');
			suggestions = options.filter((opt) => regex.test(opt));
			if (suggestions.length === 1 && suggestions[0] === value) suggestions = [];
		}
	}

	function handleMouseOver(index: number) {
		selectedIndex = index;
	}

	function handleMouseDown() {
		if (suggestions.length === 0) return;
		value = suggestions[selectedIndex];
		suggestions = [];
		selectedIndex = 0;
	}

	$: if (value.length > 0) {
		prepareSuggestions();
	}

	$: if (value.length === 0) {
		suggestions = [];
	}
</script>

<div class="container">
	<span class="label">{label}</span>
	<input type="text" bind:value on:focus={handleFocus} on:blur={handleBlur} on:keydown={handleKeyDown} />
	{#if suggestions.length > 0}
		<ul class="list" transition:slide={{ duration: 300 }} style="top: {top}px">
			{#each suggestions as suggestion, i}
				<li
					class="list-item"
					class:selected-list-item={i === selectedIndex}
					on:mouseover={() => handleMouseOver(i)}
					on:mousedown={handleMouseDown}
				>
					{suggestion}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.container {
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
	.container:focus-within .label {
		color: var(--primary-main);
	}
	.list {
		position: fixed;
		list-style-type: none;
		padding: 0;
		width: 398px;
		background-color: var(--background-paper);
		border: 1px solid var(--primary-main);
		border-radius: 8px;
		z-index: 100;
	}
	.list-item {
		padding: 8px 8px;
		cursor: pointer;
	}
	.selected-list-item {
		background-color: var(--background-darker);
		border-radius: 8px;
	}
</style>
