<script lang="ts">
	import YearTable from '$lib/year/YearTable.svelte';
	import { categories, selectedDate } from '$lib/stores';
	import { getYearlyData } from '$lib/services/transactionService';
	import { getCategories } from '$lib/services/categoryService';

	$: getCategories($selectedDate.getFullYear()).then(cats => categories.set(cats));
	$: yearlyDataPromise = getYearlyData($selectedDate.getFullYear());	
</script>

<div class="container">
	<div style="margin-bottom: 1.5rem">
		<YearTable
			title="Income"
			categories={$categories.filter(c => c.ctype === 'income')}
			{yearlyDataPromise}
		/>
	</div>
	<div>
		<YearTable
			title="Expense"
			categories={$categories.filter(c => c.ctype === 'expense')}
			{yearlyDataPromise}
		/>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
