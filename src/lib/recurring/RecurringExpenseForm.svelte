<script lang="ts">
	import type { Category, NewRecurringExpense, RecurringExpense } from '../../types';
	import AmountField from '$lib/components/AmountField.svelte';
	import DropDown from '$lib/components/DropDown.svelte';
	import DropDownItem from '$lib/components/DropDownItem.svelte';
	import NumberField from '$lib/components/NumberField.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import Button from '$lib/components/Button.svelte';

	export let categories: Category[];
	export let handleExpense: (newExpense: RecurringExpense | NewRecurringExpense) => void;
	export let recurs: 'monthly' | 'yearly' = 'monthly';
	export let expenseToEdit: RecurringExpense | null;

	let expense: RecurringExpense | NewRecurringExpense = {
		name: '',
		categoryId: 1,
		amount: 0,
		day: 0,
		month: 0,
		notifyDaysBefore: 0,
		recurs,
	};

	$: selectedCategoryName = categories?.find(c => c.id === expense.categoryId)?.name || '';

	if (expenseToEdit) expense = expenseToEdit;

	function selectCategory(category) {
		expense.categoryId = category.id;
	}

	function handleSubmit() {
		expense.amount = Number(expense.amount);
		handleExpense(expense);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<TextField label="Name" bind:value={expense.name} autofocus />
	<AmountField label="Amount" bind:value={expense.amount} />
	<DropDown label="Category" type="bordered" text={selectedCategoryName} fullSize>
		{#each categories as category}
			<DropDownItem text={category.name} on:click={() => selectCategory(category)} />
		{/each}
	</DropDown>
	<NumberField label="Day of Month" bind:value={expense.day} />
	{#if recurs === 'yearly'}
		<NumberField label="Month of Year" bind:value={expense.month} />
	{/if}
	<NumberField label="Notify Days Before" bind:value={expense.notifyDaysBefore} />
	<Button type="submit" margin="16px 0 0 0">
		{(expenseToEdit && 'EDIT') || 'ADD'}
	</Button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 400px;
		overflow: visible;
	}
</style>
