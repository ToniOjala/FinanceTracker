<script lang="ts">
	import type { Category, NewBudget } from '../../types';
	import { saveBudget } from '$lib/services/budgetService';
	import MonthTable from './MonthTable.svelte';
	import BudgetForm from './BudgetForm.svelte';
	import Card from '$lib/components/Card.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { budgets, categories, transactions } from '$lib/stores';

	export let selectedCategory: Category;
	export let selectCategory: (category: Category) => void;

	let isBudgetDialogOpen = false;

	const setBudget = () => isBudgetDialogOpen = true;

	async function handleBudget(budget: NewBudget) {
		isBudgetDialogOpen = false;
		const savedBudget = await saveBudget(budget);

		const newBudgets = $budgets;
		newBudgets[savedBudget.categoryId.toString()] = savedBudget.amount;

		budgets.set(newBudgets);
	}
</script>

<div class="container">
	<Card title="Income" margin="0 0 24px 0">
		<MonthTable
			slot="content"
			title="Income"
			categories={$categories.filter((c) => c.ctype === 'income')}
			transactions={$transactions}
			budgets={$budgets}
			{selectedCategory}
			{selectCategory}
			{setBudget}
		/>
	</Card>
	<Card title="Expense">
		<MonthTable
			slot="content"
			title="Expense"
			categories={$categories.filter((c) => c.ctype === 'expense')}
			transactions={$transactions}
			budgets={$budgets}
			{selectedCategory}
			{selectCategory}
			{setBudget}
		/>
	</Card>
	<Modal title="Set Budget" bind:isOpen={isBudgetDialogOpen}>
		<BudgetForm
			slot="content"
			categoryId={selectedCategory.id}
			{handleBudget}
		/>
	</Modal>
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
