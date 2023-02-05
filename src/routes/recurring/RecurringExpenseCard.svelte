<script lang="ts">
	import type { RecurringExpense } from '$lib/types';
	import Card from '$lib/components/Card.svelte';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import IconButton from '$lib/components/IconButton.svelte';

	export let expense: RecurringExpense;
	export let editExpense: (expense: RecurringExpense) => void;
	export let removeExpense: (expense: RecurringExpense) => void;
</script>

<Card margin="0 0 16px 0" padding="8px 24px">
	<div slot="content" class="container">
		<div class="col1">
			<h2>{expense.name}</h2>
			<div class="alarm">
				<SvgIcon icon="alarm" size={24} />
				<div class="alarm-text">{expense.notifyDaysBefore}</div>
			</div>
		</div>
		<div class="col2">
			<div>{expense.amount} {expense.recurs}</div>
			{#if expense.recurs === 'monthly'}
				<div>Occurs on {expense.day}. of each month</div>
			{/if}
			{#if expense.recurs === 'yearly'}
				<div>Occurs on {expense.day}.{expense.month} of each year</div>
			{/if}
		</div>
		<div class="col3">
			<IconButton
				icon="edit"
				size={24}
				color="var(--text-secondary)"
				on:click={() => editExpense(expense)}
			/>
			<IconButton
				icon="delete"
				size={24}
				color="var(--accent-color)"
				on:click={() => removeExpense(expense)}
			/>
		</div>
	</div>
</Card>

<style>
	.container {
		display: flex;
		width: 100%;
	}
	.col1,
	.col2,
	.col3 {
		display: flex;
		flex-direction: column;
	}
	.col1 {
		width: 33%;
		justify-content: space-around;
	}
	.col1 h2 {
		font-size: 1.4rem;
		margin: 0;
	}
	.alarm {
		display: flex;
		align-items: center;
	}
	.alarm-text {
		margin-left: 5px;
		font-size: 0.9rem;
	}
	.col2 {
		width: 57%;
		justify-content: space-around;
		font-size: 1.1rem;
	}
	.col3 {
		width: 10%;
	}
</style>
