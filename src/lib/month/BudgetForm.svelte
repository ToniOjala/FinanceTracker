<script lang="ts">
	import type { NewBudget } from '$lib/types';
	import AmountField from '$lib/components/AmountField.svelte';
	import Button from '$lib/components/Button.svelte';
	import { formatDate, getEndOfMonth } from '../../utils/dates';
	import { selectedDate } from '$lib/stores';

	export let categoryId: number;
	export let handleBudget: (budget: NewBudget) => void;

	let budget: NewBudget = {
		amount: 0,
		startDate: formatDate(getEndOfMonth($selectedDate)),
		categoryId: categoryId
	};

	let errors = { amount: '' };

	function handleSubmit() {
		if (isNaN(Number(budget.amount))) errors.amount = 'Amount should be a numeric value';
		else {
			errors.amount = '';
			handleBudget({ ...budget, amount: Number(budget.amount) });
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<AmountField label="Amount" bind:value={budget.amount} helperText={errors?.amount} autoFocus />
	<Button margin="40px 0 0 0" type="submit">SET</Button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 400px;
	}
</style>
