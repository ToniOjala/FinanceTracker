<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import Card from '$lib/components/Card.svelte';
	import { months } from '$lib/utils/constants';

	export let income: number[];
	export let expense: number[];

	let ctx: any;

	const chartData = {
		labels: months,
		datasets: [
			{
				label: 'Income',
				backgroundColor: '#66B08888',
				borderRadius: 4,
				data: income
			},
			{
				label: 'Expense',
				backgroundColor: '#FF5D7388',
				borderRadius: 4,
				data: expense
			}
		]
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				labels: {
					color: '#8E90B8'
				}
			}
		},
		scales: {
			yAxis: {
				grid: {
					display: false,
					drawBorder: false
				},
				ticks: {
					color: '#8E90B8'
				}
			},
			xAxis: {
				drawBorder: false,
				grid: {
					display: false,
					drawBorder: false
				},
				ticks: {
					color: '#8E90B8'
				}
			}
		}
	};

	onMount(async () => {
		new Chart(ctx, {
			type: 'bar',
			data: chartData,
			options: chartOptions
		});
	});
</script>

<Card margin="0 0 1rem 0" padding="16px">
	<div slot="content">
		<canvas bind:this={ctx} id="yearChart" width={1000} height={200} />
	</div>
</Card>

<style>
</style>
