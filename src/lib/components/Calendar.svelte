<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getDateRows } from '$lib/utils/dates';

	export let date: Date;
	export let month: number;
	export let year: number;

	const dispatch = createEventDispatcher();

	const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
	let cells: number[];

	const onChange = (d: number) => dispatch('datechange', new Date(year, month, d));

	$: cells = getDateRows(month, year);
</script>

<div class="container">
	<div class="row">
		{#each weekdays as day}
			<div class="cell">{day}</div>
		{/each}
	</div>

	<div class="row">
		{#each cells as cell}
			<div
				on:click={cell ? onChange.bind(this, cell) : () => {}}
				class:cell={true}
				class:highlight={cell}
				class:selected={date.getDate() === cell}
			>
				{cell || ''}
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		padding: 8px;
	}
	.row {
		display: flex;
		margin: 2px 6px;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.cell {
		display: inline-block;
		width: 11%;
		height: 24px;
		text-align: center;
		padding: 3px;
		padding-top: 9px;
		margin: 1px;
	}
	.selected {
		background: var(--primary-main);
	}
	.highlight {
		transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
	}
	.highlight:hover {
		background: var(--text-secondary);
		color: #fff;
		cursor: pointer;
		transform: scale(1.3);
	}
</style>
