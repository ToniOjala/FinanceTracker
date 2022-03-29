<script lang="ts">
	import DropDown from '$lib/components/DropDown.svelte';
	import DropDownItem from '$lib/components/DropDownItem.svelte';
	import RatioBar from './RatioBar.svelte';
	import type { Category, Transaction, BudgetsByCategory } from '../../types';
	import { roundToDecimals } from '../../utils/round';
	import { sumOfTransactionsInCategory, sumOfTransactionsInCategories } from '../../utils/sums';

	export let title: 'Income' | 'Expense';
	export let categories: Category[];
	export let selectedCategory: Category;
	export let transactions: Transaction[];
	export let budgets: BudgetsByCategory;
	export let selectCategory: (category: Category) => void;
	export let setBudget: () => void;

	let sumOfTransactions: { [key: string]: string } = {};

	$: {
		categories.forEach(c => {
			sumOfTransactions[c.name] = sumOfTransactionsInCategory(c, transactions);
		})
	}
</script>

<table>
	<tr class="header">
		<th style="width: 25%">Category</th>
		<th style="width: 21%">Budgeted</th>
		<th style="width: 21%">Real</th>
		<th style="width: 21%">Ratio</th>
		<th style="width: 12%; text-align: center;">Actions</th>
	</tr>
	{#each categories as category}
		<tr class:selected={selectedCategory?.name == category.name} on:click={() => selectCategory(category)}>
			<td>{category.name}</td>
			<td>{roundToDecimals(budgets[category.id], 2)}</td>
			<td>{sumOfTransactions[category.name]}</td>
			<td><RatioBar ratio={Number(sumOfTransactions[category.name]) / budgets[category.id] * 100} /></td>
			<td class="table-action">
				<DropDown text="...">
					<DropDownItem text="Set Budget" on:click={() => setBudget()} />
				</DropDown>
			</td>
		</tr>
	{/each}
	<tr>
		<td>Total</td>
		<td>
			{title === 'Income' ? roundToDecimals(budgets['income'], 2) : roundToDecimals(budgets['expense'], 2)}
		</td>
		<td>{sumOfTransactionsInCategories(categories, transactions)}</td>
		<td></td>
		<td></td>
	</tr>
</table>
