<script lang="ts">
	import { Doughnut } from 'svelte-chartjs';
	import type { Transaction } from '$lib/types';
	import Card from '$lib/components/Card.svelte';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import { roundToDecimals, roundToDecimalsAsNumber } from '$lib/utils/round';

	export let incomeCategoryIds: number[];
	export let expenseCategoryIds: number[];
	export let transactions: Transaction[];

	let chartOptions = {
		elements: {
			arc: {
				borderWidth: 0
			}
		},
		layout: {
			padding: 16
		},
		locale: 'fi-FI',
		plugins: {
			legend: {
				display: false
			}
		},
		responsive: true,
		aspectRatio: 1.2
	};

	$: income = transactions
		.filter((tr) => incomeCategoryIds.includes(tr.categoryId))
		.reduce((acc, tr) => acc + tr.amount, 0);

	$: expense = transactions
		.filter((tr) => expenseCategoryIds.includes(tr.categoryId))
		.reduce((acc, tr) => acc + tr.amount, 0);

	$: chartData =
		income >= expense
			? {
					labels: ['Expense', 'Income Left'],
					datasets: [
						{
							data: [expense, income > 0 ? income - expense : 0.01],
							backgroundColor: ['#66B088', '#8E90B8']
						}
					]
			  }
			: {
					labels: ['Overspenditure', 'Expense'],
					datasets: [
						{
							data: [income > 0 ? expense - income : 0.01, income > 0 ? expense : 100],
							backgroundColor: ['#FF5D73', '#8E90B8']
						}
					]
			  };

	$: incomeSpentPercentage = roundToDecimalsAsNumber((expense / income) * 100, 0);
</script>

<div class="summary-container">
	<Card margin="0 0 1rem 0">
		<div slot="content" class="summary-content">
			<SvgIcon icon="arrowUp2" color="#66B088" />
			<div>
				<span>{roundToDecimals(income, 2)}</span>
				<h3>Total Income</h3>
			</div>
		</div>
	</Card>
	<Card margin="0 0 1rem 0">
		<div slot="content" class="summary-content">
			<SvgIcon icon="arrowDown2" color="#FF5D73" />
			<div>
				<span>{roundToDecimals(expense, 2)}</span>
				<h3>Total Expense</h3>
			</div>
		</div>
	</Card>
	<Card margin="0 0 1rem 0">
		<div slot="content" class="summary-content">
			{#if income - expense >= 0}
				<SvgIcon icon="arrowUp2" color="#66B088" />
			{:else}
				<SvgIcon icon="arrowDown2" color="#FF5D73" />
			{/if}
			<div>
				<span>{roundToDecimals(income - expense, 2)}</span>
				<h3>Balance</h3>
			</div>
		</div>
	</Card>
	<Card>
		<div slot="content" class="income-spent">
			<h3>Income Spent</h3>
			<Doughnut data={chartData} options={chartOptions} />
			<span
				class="income-spent-percentage"
				style={incomeSpentPercentage < 100 ? 'left: 44%' : 'left: 43%'}
			>
				{#if income > 0}
					{incomeSpentPercentage}%
				{/if}
			</span>
		</div>
	</Card>
</div>

<style>
	.summary-container {
		width: 600px;
		margin-right: 2rem;
		display: flex;
		flex-direction: column;
	}
	.summary-content {
		padding: 16px 36px;
		display: flex;
		align-items: center;
		justify-content: start;
	}
	.summary-content div {
		margin-left: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: auto;
	}
	.summary-content h3 {
		color: var(--text-secondary);
		font-size: 0.95rem;
		letter-spacing: 0.03rem;
		margin: 8px 0;
	}
	.summary-content span {
		margin-top: 16px;
		font-size: 1.4rem;
	}
	.income-spent {
		position: relative;
		padding: 8px;
	}
	.income-spent h3 {
		margin-left: 8px;
	}
	.income-spent-percentage {
		position: absolute;
		top: 54.5%;
		font-size: 1.5rem;
	}
</style>
