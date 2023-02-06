<script lang="ts">
	import { slide } from 'svelte/transition';
	import clickOutside from '$lib/actions/clickOutside';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import { selectedDate } from '$lib/stores';
	import { getYear, setYear, addYears, removeYears } from '$lib/utils/dates';

	$: activeYear = Number(getYear($selectedDate));

	let yearsOpen = false;
	let dropDown: HTMLElement;
	let dropDownItem: HTMLElement;

	function toggleYears() {
		yearsOpen = !yearsOpen;
		if (yearsOpen) {
			const pos = (activeYear - 2000 - 4) * 34.4;
			setTimeout(() => dropDown.scrollTo(0, pos), 1);
		}
	}

	function selectYear(year: number) {
		const newDate = setYear($selectedDate, year);
		selectedDate.set(newDate);
	}

	function incrementYear() {
		const newDate = addYears($selectedDate, 1);
		selectedDate.set(newDate);
	}

	function decrementYear() {
		const newDate = removeYears($selectedDate, 1);
		selectedDate.set(newDate);
	}
</script>

<div class="selector">
	<div class="arrow" on:click={decrementYear} on:keydown>
		<SvgIcon icon="arrowLeftThin" size={24} color="#eee" />
	</div>
	<div
		use:clickOutside={() => (yearsOpen = false)}
		class="year box"
		on:click={toggleYears}
		on:keydown
	>
		{activeYear}
	</div>
	{#if yearsOpen}
		<div bind:this={dropDown} transition:slide={{ duration: 300 }} class="dropdown">
			{#each Array(50) as _, year}
				<div
					bind:this={dropDownItem}
					class="dropdown-item {activeYear == year + 2000 && 'active'}"
					on:click={() => selectYear(year + 2000)}
					on:keydown
				>
					{year + 2000}
				</div>
			{/each}
		</div>
	{/if}
	<div class="arrow" on:click={incrementYear} on:keydown>
		<SvgIcon icon="arrowRightThin" size={24} color="#eee" />
	</div>
</div>

<style>
	.selector {
		display: flex;
		align-items: center;
		user-select: none;
	}
	.year {
		min-width: 50px;
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
		margin-left: 20px;
		max-height: 310px;
		overflow-y: scroll;
		border-radius: 8px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	.dropdown::-webkit-scrollbar {
		width: 10px;
	}
	.dropdown::-webkit-scrollbar-corner {
		background: rgba(0, 0, 0, 0);
	}
	.dropdown::-webkit-scrollbar-thumb {
		background-color: #eee;
		border-radius: 6px;
		border: 4px solid rgba(0, 0, 0, 0);
		background-clip: content-box;
		min-width: 32px;
		min-height: 32px;
	}
	.dropdown::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, 0);
	}
	.dropdown-item {
		padding: 8px 12px;
	}
	.dropdown-item:hover {
		background-color: var(--background-paper-hover);
	}
	.active {
		color: var(--primary-main);
	}
</style>
