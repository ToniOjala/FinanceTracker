<script lang="ts">
	import { slide } from 'svelte/transition';

	export let label: string;
	export let value: string;
	export let options: string[];

	let selectedIndex = 0;
	let isOpen = false;
	let togglerEl: HTMLElement;

	function handleKeyDown(event: KeyboardEvent) {
		if (!isOpen && event.key === 'Enter') {
			isOpen = true;
			return;
		} else if (!isOpen) return;

		if (event.key === 'Enter') {
			value = options[selectedIndex];
			selectedIndex = 0;
			isOpen = false;
		} else if (event.key === 'ArrowDown' && options.length > selectedIndex + 1) {
			event.preventDefault();
			selectedIndex++;
		} else if (event.key === 'ArrowUp' && selectedIndex > 0) {
			event.preventDefault();
			selectedIndex--;
		}
	}

	function toggle(event: MouseEvent) {
		isOpen = !isOpen;
	}

	function handleMouseOver(index: number) {
		selectedIndex = index;
	}

	function handleMouseDown() {
		if (!isOpen) return;
		value = options[selectedIndex];
		isOpen = false;
		selectedIndex = 0;
	}

	$: if (value.length > 0 && isOpen) {
		selectedIndex = options.indexOf(value) || 0;
	}
</script>

<div class="select">
	<span class="label" class:focused-label={isOpen}>{label}</span>
	<input
		readonly
		bind:this={togglerEl}
		{value}
		class="toggler"
		class:focused={isOpen}
		on:mousedown={toggle}
		on:keydown={handleKeyDown}
	/>
	{#if isOpen}
		<div class="list" transition:slide={{ duration: 300 }}>
			{#each options as option, i}
				<div
					class="list-item"
					class:selected-list-item={i === selectedIndex}
					on:mouseover={() => handleMouseOver(i)}
					on:mousedown={handleMouseDown}
					on:focus={() => handleMouseOver(i)}
				>
					{option}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.select {
		position: relative;
		display: inline-block;
	}
	.label {
		color: var(--text-secondary);
		font-size: 0.85rem;
		margin-left: 5px;
	}
	.focused-label {
		color: var(--primary-main);
	}
	.toggler {
		margin: 8px 0;
		height: 18px;
		padding: 8px;
		background-color: transparent;
		border: 1px solid var(--text-secondary);
		border-radius: 8px;
		color: var(--text-primary);
		caret-color: transparent;
		outline: none;
	}
	.toggler:hover:not(.focused) {
		padding: 6px;
		border: 3px solid var(--text-secondary);
		cursor: pointer;
	}
	.focused {
		border: 1px solid var(--primary-main);
	}
	.focused:hover {
		cursor: pointer;
	}
	.list {
		position: absolute;
		list-style-type: none;
		padding: 0;
		width: 100%;
		background-color: var(--background-paper);
		border: 1px solid var(--primary-main);
		border-radius: 8px;
		z-index: 100;
		max-height: 400px;
		overflow-y: scroll;
	}
	.list::-webkit-scrollbar {
		width: 20px;
	}
	.list::-webkit-scrollbar-corner {
		background: rgba(0, 0, 0, 0);
	}
	.list::-webkit-scrollbar-thumb {
		background-color: #eee;
		border-radius: 6px;
		border: 4px solid rgba(0, 0, 0, 0);
		background-clip: content-box;
		min-width: 32px;
		min-height: 32px;
	}
	.list::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, 0);
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
