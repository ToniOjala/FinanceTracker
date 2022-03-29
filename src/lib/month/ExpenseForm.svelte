<script lang="ts">
	import type { Transaction, NewTransaction, Label } from '../../types';
	import AmountField from '$lib/components/AmountField.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import { formatDate } from '../../utils/dates';
	import { selectedDate } from '$lib/stores';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import AutoCompleteField from '$lib/components/AutoCompleteField.svelte';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';

	export let categoryId: number;
	export let labels: Label[];
	export let expenseToEdit: Transaction | null;
	export let handleExpense: (newExpense: Transaction | NewTransaction, close: boolean) => void;

	let expense = {
		id: expenseToEdit?.id || null,
		amount: expenseToEdit?.amount || 0,
		date: expenseToEdit?.date ? new Date(expenseToEdit?.date) : $selectedDate,
		label: expenseToEdit?.label || '',
		categoryId,
	};
	let errors = { amount: '' };
	let amountField: HTMLInputElement | undefined;
	let addAnother = false;

	$: options = labels.map(l => l.name);

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') event.preventDefault();
	}

	function handleSubmit() {
		// validate form
		if (isNaN(Number(expense.amount))) errors.amount = 'Amount should be a numeric value';
		else errors.amount = '';

		if (!errors.amount) handleExpense({ ...expense, amount: Number(expense.amount), date: formatDate(expense.date), ctype: 'expense' }, !addAnother);
		if (addAnother) {
			expense = {
				id: null,
				amount: 0,
				date: expense.date,
				label: '',
				categoryId,
			};
		}
	}

	function onDateChange(e: CustomEvent): void {
		expense.date = e.detail;
	}

	onMount(() => {
		amountField?.focus();
	});
</script>

<form on:submit|preventDefault={handleSubmit} on:keydown={handleKeyDown}>
	<DatePicker on:datechange={onDateChange} bind:selected={expense.date} />
	<AmountField label="Amount" bind:value={expense.amount} helperText={errors?.amount} autoFocus />
	<AutoCompleteField label="Label" bind:value={expense.label} {options} top={275} />
	{#if expenseToEdit == null}
		<Checkbox label="Add Another" bind:checked={addAnother} />	
	{/if}
	<Button margin="40px 0 0 0" type="submit">{expenseToEdit ? "EDIT" : "ADD"}</Button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 400px;
		overflow: visible;
	}
</style>
