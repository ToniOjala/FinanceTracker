<script lang="ts">
	import type { Category, Label, NewTransaction, Transaction } from '$lib/types';
	import { categories, transactions } from '$lib/stores';
	import {
		saveTransaction,
		deleteTransaction,
		updateTransaction
	} from '$lib/services/transactionService';
	import { getLabelsByCategory, saveLabel } from '$lib/services/labelService';
	import TransactionTable from './TransactionTable.svelte';
	import Card from '$lib/components/Card.svelte';
	import ExpenseForm from './ExpenseForm.svelte';
	import IncomeForm from './IncomeForm.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { isNewTransaction } from '$lib/typechecks';

	export let selectedCategory: Category;

	let selectedTransaction: Transaction | null;
	let expenseToEdit: Transaction | null;
	let isExpenseDialogOpen = false;
	let isIncomeDialogOpen = false;
	let labels: Label[] = [];

	function selectTransaction(transaction: Transaction) {
		selectedTransaction = transaction;
	}

	async function handleExpense(expense: Transaction | NewTransaction, close: boolean) {
		if (close) isExpenseDialogOpen = false;
		if (isNewTransaction(expense)) {
			const savedExpense = await saveTransaction(expense);
			transactions.update((tr) => tr.concat(savedExpense));
		} else {
			const updatedExpense = await updateTransaction(expense);
			transactions.update((tr) => tr.map((t) => (t.id === updatedExpense.id ? updatedExpense : t)));
		}

		if (expense.label && expense.label.length > 0) {
			const addedLabel = await saveLabel(expense as NewTransaction);
			if (labels.find((l) => l.name === addedLabel.name) === undefined) {
				labels.push(addedLabel);
			} else {
				labels = labels.map((l) => (l.name === addedLabel.name ? addedLabel : l));
			}
		}
	}

	async function handleIncome(newIncome: NewTransaction) {
		isIncomeDialogOpen = false;
		const savedIncome = await saveTransaction(newIncome);
		transactions.update((tr) => tr.concat(savedIncome));
	}

	function editTransaction(transaction: Transaction) {
		expenseToEdit = transaction;
		isExpenseDialogOpen = true;
	}

	async function removeTransaction(transaction: Transaction) {
		await deleteTransaction(transaction);
		transactions.update((tr) => tr.filter((t) => t.id !== transaction.id));
	}

	function onExpenseDialogClosed() {
		expenseToEdit = null;
	}

	$: if (selectedCategory.id != null)
		getLabelsByCategory(selectedCategory.id).then((fetchedLabels) => (labels = fetchedLabels));
</script>

<div class="container">
	<Card title={selectedCategory.name || ''}>
		<TransactionTable
			slot="content"
			transactions={$transactions.filter((t) => t.categoryId == selectedCategory.id)}
			{selectedTransaction}
			{selectTransaction}
			{editTransaction}
			{removeTransaction}
		/>
	</Card>
	{#if selectedCategory.ctype === 'expense'}
		<Modal
			title={expenseToEdit ? 'Edit Expense' : 'Add Expense'}
			bind:isOpen={isExpenseDialogOpen}
			onClose={onExpenseDialogClosed}
		>
			<IconButton slot="trigger" icon="plus" size={20}>New</IconButton>
			<ExpenseForm
				slot="content"
				categoryId={selectedCategory.id}
				{labels}
				{expenseToEdit}
				{handleExpense}
			/>
		</Modal>
	{:else}
		<Modal title="Add Income" bind:isOpen={isIncomeDialogOpen}>
			<IconButton slot="trigger" icon="plus" size={20}>New</IconButton>
			<IncomeForm
				slot="content"
				categoryId={selectedCategory.id}
				categories={$categories.filter((c) => c.ctype !== 'income')}
				{handleIncome}
			/>
		</Modal>
	{/if}
</div>

<style>
	.container {
		width: 800px;
		margin-left: 2rem;
	}
</style>
