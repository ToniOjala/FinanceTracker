<script lang="ts">
	import type { Category } from '../../types';
	import { sumOfCategoryBalances } from '../../utils/sums';
	import { roundToDecimals } from '../../utils/round';
	import DropDown from '$lib/components/DropDown.svelte';
	import DropDownItem from '$lib/components/DropDownItem.svelte';

	export let categories: Category[];
	export let selectedCategory: Category | undefined;
	export let selectCategory: (category: Category) => void;
	export let openBalanceDialog: () => void;
</script>

<table style="width: 100%">
	<tr class="header">
		<th style="width: 50%">Category</th>
		<th style="width: 25%">Balance</th>
		<th style="width: 25%; text-align: center">Actions</th>
	</tr>
	{#each categories as category}
		<tr class:selected={selectedCategory?.name == category.name} on:click={() => selectCategory(category)}>
			<td>{category.name}</td>
			<td>{roundToDecimals(category.balance, 2)}</td>
			<td class="table-action">
				<DropDown text="...">
					<DropDownItem text="Modify Balance" on:click={openBalanceDialog} />
				</DropDown>
			</td>
		</tr>
	{/each}
	<tr>
		<td>Total</td>
		<td>{sumOfCategoryBalances(categories)}</td>
		<td></td>
	</tr>
</table>
