<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Category, YearlyData } from '../../types';
	import { months } from '../../utils/constants';
	import { roundToDecimals } from '../../utils/round';

	export let title: 'Income' | 'Expense';
	export let categories: Category[];
	export let yearlyDataPromise: Promise<YearlyData>;
</script>

{#await yearlyDataPromise}
	<p>Loading</p>
{:then yearlyData}
<Card {title}>
	<table slot="content">
		<tr class="header">
			<th style="width: 10%">Category</th>
			{#each months as month}
				<th style="width: 7.5%">{month}</th>
			{/each}
		</tr>
		{#each categories as category}
			<tr>
				<td>{category.name}</td>
				{#each months as _, monthIndex}
					<td>{roundToDecimals(yearlyData[category.name][monthIndex], 2)}</td>
				{/each}
			</tr>
		{/each}
		<tr>
			<td>Total</td>
			{#each months as _, monthIndex}
				{#if title === 'Expense'}
					<td>
						{yearlyData['total_expense'] && roundToDecimals(yearlyData['total_expense'][monthIndex], 2)}
					</td>
				{:else}
					<td>
						{yearlyData['total_income'] && roundToDecimals(yearlyData['total_income'][monthIndex], 2)}
					</td>
				{/if}
			{/each}
		</tr>
	</table>
</Card>
{/await}
