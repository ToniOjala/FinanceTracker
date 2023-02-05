<script lang="ts">
	import type { RecurringExpense } from '$lib/types';
	import { roundToDecimals } from '../../utils/round';
	import DropDown from '$lib/components/DropDown.svelte';
	import DropDownItem from '$lib/components/DropDownItem.svelte';

	export let expenses: RecurringExpense[];
	export let editExpense: (expense: RecurringExpense) => void;
	export let removeExpense: (expense: RecurringExpense) => void;
</script>

<table>
	<tr class="header">
		<th>Name</th>
		<th>Amount</th>
		<th>Occurs</th>
		<th>Notify</th>
		<th>Actions</th>
	</tr>
	{#each expenses as expense}
		<tr>
			<td>{expense.name}</td>
			<td>{roundToDecimals(expense.amount, 2)}</td>
			<td
				>{expense.day}{#if expense.recurs === 'yearly'}.{expense.month}{/if}</td
			>
			<td>{expense.notifyDaysBefore}</td>
			<td>
				<DropDown text="...">
					<DropDownItem text="Edit" on:click={() => editExpense(expense)} />
					<DropDownItem text="Remove" on:click={() => removeExpense(expense)} />
				</DropDown>
			</td>
		</tr>
	{/each}
</table>
