<script lang="ts">
	import type { Category, NewCategory } from '$lib/types';
	import ChoiceChips from '$lib/components/ChoiceChips.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import Button from '$lib/components/Button.svelte';

	export let categoryToEdit: Category | null;

	export let submit: (category: Category | NewCategory) => void;
	let category = {
		id: categoryToEdit?.id || null,
		name: categoryToEdit?.name || '',
		ctype: categoryToEdit?.ctype || 'expense',
		balance: categoryToEdit?.balance || 0,
		created: categoryToEdit?.created || new Date().getFullYear().toString()
	} as Category;
	let errors = { name: '' };

	function handleSubmit() {
		// validate form
		if (category.name?.trim().length < 1) errors.name = 'Name is a required field';
		else errors.name = '';

		if (errors.name.length === 0) submit(category);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<TextField label="Name" bind:value={category.name} helperText={errors?.name} autofocus={true} />

	{#if categoryToEdit == null}
		<span class="form-label">Type</span>
		<ChoiceChips choices={['Expense', 'Income']} bind:value={category.ctype} />
	{/if}

	<Button margin="40px 0 0 0" type="submit">{categoryToEdit ? 'RENAME' : 'ADD'}</Button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
	.form-label {
		margin: 8px 0px;
	}
</style>
