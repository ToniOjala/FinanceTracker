<script lang="ts">
	import { onMount } from 'svelte';
	import type { NewRecurringExpense, RecurringExpense } from '../types';
	import { categories, recurringExpenses } from '$lib/stores';
	import { isNewRecurringExpense } from '$lib/typechecks';
	import { getRecurringExpenses, saveRecurringExpense, updateRecurringExpense, deleteRecurringExpense } from '$lib/services/recurringExpenseService';
	import Card from '$lib/components/Card.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import RecurringExpenseForm from '$lib/recurring/RecurringExpenseForm.svelte';
	import RecurringExpenseTable from '$lib/recurring/RecurringExpenseTable.svelte';


	let isMonthlyRecurringDialogOpen = false;
	let isYearlyRecurringDialogOpen = false;
	let expenseToEdit: RecurringExpense | null;

	$: monthlyRecurring = $recurringExpenses?.filter(r => r.recurs === 'monthly') || [];
	$: yearlyRecurring = $recurringExpenses?.filter(r => r.recurs === 'yearly') || [];

	async function handleExpense(expense: RecurringExpense | NewRecurringExpense) {
		if (isNewRecurringExpense(expense)) {
			const savedExpense = await saveRecurringExpense(expense);
			recurringExpenses.update(r => r.concat(savedExpense));
		}
		else {
			const updatedExpense = await updateRecurringExpense(expense);
			recurringExpenses.update(r => r.map(re => re.id === updatedExpense.id ? updatedExpense : re));
		}
		isMonthlyRecurringDialogOpen = false;
		isYearlyRecurringDialogOpen = false;
	}

	function editExpense(expense: RecurringExpense) {
		expenseToEdit = expense;
		if (expense.recurs === 'monthly') isMonthlyRecurringDialogOpen = true;
		else isYearlyRecurringDialogOpen = true;
	}

	async function removeExpense(expense: RecurringExpense) {
		await deleteRecurringExpense(expense);
		recurringExpenses.update(r => r.filter(re => re.id !== expense.id));
	}

	function onDialogClose() {
		expenseToEdit = null;
	}

	onMount(async () => {
		const expenses = await getRecurringExpenses();
		recurringExpenses.set(expenses);
	});
</script>

<div class="container">
	<div class="column">
		<Card title="Monthly Recurring" width="100%">
			<RecurringExpenseTable
				slot="content"
				expenses={monthlyRecurring}
				{editExpense}
				{removeExpense}
			/>
			<IconButton
				slot="actions"
				icon="plus"
				size={20}
				on:click={() => isMonthlyRecurringDialogOpen = true}
			>
				New
			</IconButton>
		</Card>
	</div>
	<div class="column">
		<Card title="Yearly Recurring" width="100%">
			<RecurringExpenseTable
				slot="content"
				expenses={yearlyRecurring}
				{editExpense}
				{removeExpense}
			/>
			<IconButton
				slot="actions"
				icon="plus"
				size={20}
				on:click={() => isYearlyRecurringDialogOpen = true}
			>
				New
			</IconButton>
		</Card>
	</div>
	<Modal
		title={(expenseToEdit && 'Edit Recurring Expense') || 'Add Recurring Expense'}
		bind:isOpen={isMonthlyRecurringDialogOpen}
		onClose={onDialogClose}
	>
		<RecurringExpenseForm
			slot="content"
			categories={$categories.filter(c => c.ctype == 'expense')}
			{expenseToEdit}
			{handleExpense}
		/>
	</Modal>
	<Modal
		title={(expenseToEdit && 'Edit Recurring Expense') || 'Add Recurring Expense'}
		bind:isOpen={isYearlyRecurringDialogOpen}
		onClose={onDialogClose}
	>
		<RecurringExpenseForm
			slot="content"
			categories={$categories.filter(c => c.ctype == 'expense')}
			recurs="yearly"
			{expenseToEdit}
			{handleExpense}
		/>
	</Modal>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
	}
	.column {
		display: flex;
		flex-direction: column;
		width: 50%;
		padding-right: 2.5%;
	}
</style>
