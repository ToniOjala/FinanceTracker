<script lang="ts">
	import type { Category } from '$lib/types';
	import { getCategories } from '$lib/services/categoryService';
	import { getTransactionsByMonth } from '$lib/services/transactionService';
	import { getLatestBudgets } from '$lib/services/budgetService';
	import { categories, transactions, selectedDate, budgets } from '$lib/stores';
	import { formatDate, getEndOfMonth } from '$lib/utils/dates';
	import SummaryContainer from './SummaryContainer.svelte';
	import MonthTableContainer from './MonthTableContainer.svelte';
	import TransactionContainer from './TransactionContainer.svelte';

	let selectedCategory: Category = {} as Category;

	function selectCategory(category: Category): void {
		selectedCategory = category;
	}

	$: {
		const year = $selectedDate.getFullYear();
		const month = $selectedDate.getMonth() + 1;
		getTransactionsByMonth(year, month).then((tr) => transactions.set(tr));
		getLatestBudgets(formatDate(getEndOfMonth(new Date(year, month - 1, 1)))).then((b) =>
			budgets.set(b)
		);
		getCategories(year).then((c) => categories.set(c));
	}
</script>

<div class="container">
	<SummaryContainer
		incomeCategoryIds={$categories.filter((c) => c.ctype === 'income').map((c) => c.id)}
		expenseCategoryIds={$categories.filter((c) => c.ctype === 'expense').map((c) => c.id)}
		transactions={$transactions}
	/>
	<MonthTableContainer {selectedCategory} {selectCategory} />
	<TransactionContainer {selectedCategory} />
</div>

<style>
	.container {
		display: flex;
		width: 100%;
	}
</style>
