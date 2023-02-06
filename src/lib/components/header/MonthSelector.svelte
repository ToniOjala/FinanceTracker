<script lang="ts">
	import { slide } from 'svelte/transition';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import clickOutside from '$lib/actions/clickOutside';
	import { selectedDate } from '$lib/stores';
	import { getMonth, addMonths, removeMonths, setMonth } from '$lib/utils/dates';

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	let monthsOpen = false;

	$: activeMonth = getMonth($selectedDate);

	function toggleMonths() {
		monthsOpen = !monthsOpen;
	}

	function incrementMonth() {
		const newDate = addMonths($selectedDate, 1);
		selectedDate.set(newDate);
	}

	function decrementMonth() {
		const newDate = removeMonths($selectedDate, 1);
		selectedDate.set(newDate);
	}

	function selectMonth(month: string) {
		const newDate = setMonth(
			$selectedDate,
			months.findIndex((m) => m === month)
		);
		selectedDate.set(newDate);
	}
</script>

<div class="selector">
	<div class="arrow" on:click={decrementMonth} on:keypress={() => {}}>
		<SvgIcon icon="arrowLeftThin" size={24} color="#eee" />
	</div>
	<div
		use:clickOutside={() => (monthsOpen = false)}
		class="month box"
		on:click={toggleMonths}
		on:keypress={() => {}}
	>
		{activeMonth}
	</div>
	{#if monthsOpen}
		<div transition:slide={{ duration: 300 }} class="dropdown">
			{#each months as month}
				<div
					class="dropdown-item {activeMonth === month && 'active'}"
					on:click={() => selectMonth(month)}
					on:keypress={() => {}}
				>
					{month}
				</div>
			{/each}
		</div>
	{/if}
	<div class="arrow" on:click={incrementMonth} on:keypress={() => {}}>
		<SvgIcon icon="arrowRightThin" size={24} color="#eee" />
	</div>
</div>

<style>
	.selector {
		display: flex;
		align-items: center;
		user-select: none;
	}
	.month {
		min-width: 80px;
	}
	.box {
		max-height: 30px;
		border: 1px solid #aaa;
		border-radius: 8px;
		padding: 5px;
	}
	.box:hover {
		border: 1px solid #eee;
		cursor: pointer;
	}
	.box:active {
		border: 1px solid var(--primary-main);
	}
	.arrow {
		margin-top: 2px;
	}
	.arrow:hover {
		cursor: pointer;
		background-color: #eeeeee22;
		border-radius: 33%;
	}
	.dropdown {
		position: absolute;
		background-color: var(--background-paper);
		top: 50px;
		margin-left: 25px;
		border-radius: 8px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	.dropdown-item {
		padding: 8px 8px;
	}
	.dropdown-item:hover {
		background-color: var(--background-paper-hover);
		border-radius: 8px;
	}
	.active {
		color: var(--primary-main);
	}
</style>
