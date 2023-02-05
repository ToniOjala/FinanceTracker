<script lang="ts">
	import type { Category, NewTransaction, BalanceAdditions } from '$lib/types';
	import AmountField from '$lib/components/AmountField.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import Button from '$lib/components/Button.svelte';
	import AutoCompleteField from '$lib/components/AutoCompleteField.svelte';
	import { selectedDate } from '$lib/stores';
	import { roundToDecimals } from '$lib/utils/round';
	import { formatDate } from '$lib/utils/dates';

	export let categoryId: number;
	export let handleIncome: (newExpense: NewTransaction) => void;
	export let categories: Category[];

	let income = {
		amount: 0,
		date: $selectedDate,
		label: '',
		categoryId
	};
	let categoryAmounts: number[] = [0];
	let errors = { amount: '' };
	let categoryErrors: string[] = [''];
	let options = ['MagiCAD'];
	let page = 1;
	let allocated = 0;

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') event.preventDefault();
	}

	function handleSubmit() {
		// validate form
		if (isNaN(Number(income.amount))) errors.amount = 'Amount should be a numeric value';
		else errors.amount = '';

		let balanceAdditions: BalanceAdditions = {};
		for (let i = 0; i < categories.length; i++) {
			let category = categories[i];
			let amount = categoryAmounts[i];
			if (amount == null || amount === 0) continue;
			balanceAdditions[category.id] = Number(amount);
		}

		if (!errors.amount)
			handleIncome({
				...income,
				amount: Number(income.amount),
				date: formatDate(income.date),
				ctype: 'income',
				balanceAdditions
			});
	}

	function onDateChange(e: CustomEvent): void {
		income.date = e.detail;
	}

	$: allocated = categoryAmounts.reduce((a, b) => Number(a) + Number(b), 0);
</script>

<form on:submit|preventDefault={handleSubmit} on:keydown={handleKeyDown}>
	{#if page === 1}
		<DatePicker on:datechange={onDateChange} bind:selected={income.date} />
		<AmountField label="Amount" bind:value={income.amount} helperText={errors?.amount} autoFocus />
		<AutoCompleteField label="Label" bind:value={income.label} {options} top={275} />
		<Button margin="40px 0 0 0" on:click={() => page++}>NEXT</Button>
	{/if}
	{#if page === 2}
		<div class="category-grid" style="">
			{#each categories as category, i}
				<AmountField
					label={category.name}
					bind:value={categoryAmounts[i]}
					helperText={categoryErrors[i]}
				/>
			{/each}
		</div>
		<div>Income left to allocate: {roundToDecimals(income.amount - allocated, 2)}</div>
		<Button margin="40px 0 0 0" type="submit" disabled={income.amount - allocated !== 0}>ADD</Button
		>
	{/if}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 400px;
		overflow: visible;
	}
	.category-grid {
		display: grid;
		grid-template-columns: 120px 120px 120px;
		column-gap: 8px;
		row-gap: 4px;
	}
</style>
