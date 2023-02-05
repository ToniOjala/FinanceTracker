<script lang="ts">
	import { onMount } from 'svelte';
	import { roundToDecimals } from '$lib/utils/round';

	export let label: string;
	export let value: string | number;
	export let helperText = '';
	export let autoFocus = false;

	let inputRef: HTMLInputElement;

	function handleBlur() {
		if (value.toString().length == 0) return;
		value = trim(value);
		value = replaceCommasWithDots(value);
		calculateMath(value);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			if (value.toString().length == 0) return;
			value = trim(value);
			value = replaceCommasWithDots(value);
			calculateMath(value);
		}
	}

	function trim(value: string | number) {
		let text = value.toString();
		while (isNaN(Number(text[0]))) text = text.substr(1);
		let length = text.length;
		while (isNaN(Number(text[length - 1]))) {
			text = text.substr(0, length - 1);
			length--;
		}
		return text;
	}

	function replaceCommasWithDots(value: string | number) {
		let text = value.toString();
		while (text.indexOf(',') !== -1) {
			text = text.replace(',', '.');
		}
		return text;
	}

	function calculateMath(input: string | number) {
		const math = input.toString();
		value = roundToDecimals(eval(math), 2);
	}

	onMount(() => {
		if (autoFocus) inputRef.focus();
	});
</script>

<div>
	<span class="label" class:error={helperText}>{label}</span>
	<input
		class:error={helperText.length > 0}
		bind:value
		bind:this={inputRef}
		on:blur={handleBlur}
		on:keydown={handleKeyDown}
	/>
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
