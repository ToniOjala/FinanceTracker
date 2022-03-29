<script lang="ts">
	import DropDown from '$lib/components/DropDown.svelte';
	import DropDownItem from '$lib/components/DropDownItem.svelte';
	import type { Transaction } from '../../types';
	import { formatDateForDisplay } from '../../utils/dates';
	import { roundToDecimals } from '../../utils/round';

	export let transactions: Transaction[];
	export let selectedTransaction: Transaction | null;
	export let selectTransaction: (transaction: Transaction) => void;
	export let editTransaction: (transaction: Transaction) => void;
	export let removeTransaction: (transaction: Transaction) => void;
</script>

<table>
	<tr class="header">
		<th>Date</th>
		<th>Label</th>
		<th>Amount</th>
		<th>Actions</th>
	</tr>
	{#each transactions as transaction, index}
		<tr
			class:darkerRow={index % 2 == 0}
			class:selected={selectedTransaction?.id == transaction.id}
			on:click={() => selectTransaction(transaction)}
		>
			<td>{formatDateForDisplay(new Date(transaction.date), 'dd.MM.yy')}</td>
			<td>{transaction.label}</td>
			<td>{roundToDecimals(transaction.amount, 2)}</td>
			<td>
				<DropDown text="...">
					<DropDownItem text="Edit" on:click={() => editTransaction(transaction)} />
					<DropDownItem text="Remove" on:click={() => removeTransaction(transaction)} />
				</DropDown>
			</td>
		</tr>
	{/each}
</table>
