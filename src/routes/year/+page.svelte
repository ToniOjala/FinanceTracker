<script lang="ts">
	import YearTable from './YearTable.svelte';
	import YearChart from './YearChart.svelte';
	import { categories, selectedDate } from '$lib/stores';
	import { getYearlyData } from '$lib/services/transactionService';
	import { getCategories } from '$lib/services/categoryService';

	$: getCategories($selectedDate.getFullYear()).then((cats) => categories.set(cats));
	$: yearlyDataPromise = getYearlyData($selectedDate.getFullYear());
</script>

{#await yearlyDataPromise}
	<p>Loading</p>
{:then yearlyData}
	<div class="container">
		<YearChart
			income={yearlyData['total_income'].slice(0, 12)}
			expense={yearlyData['total_expense'].slice(0, 12)}
		/>
		<YearTable
			title="Income"
			categories={$categories.filter((c) => c.ctype === 'income')}
			{yearlyData}
		/>
		<YearTable
			title="Expense"
			categories={$categories.filter((c) => c.ctype === 'expense')}
			{yearlyData}
		/>
	</div>
{/await}

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
