<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		addDays,
		formatDate,
		getMonthName,
		isFirstDayOfMonth,
		isLastDayOfMonth,
		removeDays
	} from '$lib/utils/dates';
	import Calendar from './Calendar.svelte';
	import IconButton from './IconButton.svelte';

	const dispatch = createEventDispatcher();

	export let label = 'Date';
	export let selected = new Date();

	let date: number, month: number, year: number, showDatePicker: boolean;

	$: {
		date = selected.getDate();
		month = selected.getMonth();
		year = selected.getFullYear();
	}

	const open = () => (showDatePicker = true);
	const close = () => (showDatePicker = false);

	function onDateChange(d: any) {
		showDatePicker = false;
		dispatch('datechange', d.detail);
	}

	function increaseDate() {
		if (isLastDayOfMonth(selected) == false) selected = addDays(selected, 1);
	}

	function decreaseDate() {
		if (isFirstDayOfMonth(selected) == false) selected = removeDays(selected, 1);
	}
</script>

<div class="input-container">
	<div class="input">
		<span class="label">{label}</span>
		<div class="date" on:click={open} on:keypress={() => {}}>
			{formatDate(selected, 'dd.MM.yyyy')}
		</div>
	</div>
	<div class="arrows">
		<IconButton icon="arrowUp" size={12} on:click={increaseDate} />
		<IconButton icon="arrowDown" size={12} on:click={decreaseDate} />
	</div>
</div>

{#if showDatePicker}
	<div class="box">
		<div class="back">
			<IconButton icon="arrowLeft" size={24} on:click={close} />
		</div>
		<div class="month-name">
			<div class="center">{getMonthName(month)} {year}</div>
		</div>
		<Calendar {month} {year} date={selected} on:datechange={onDateChange} />
	</div>
{/if}

<style>
	.input-container {
		display: flex;
		align-items: flex-end;
		width: 100%;
	}
	.input {
		width: 96%;
	}
	.label {
		color: var(--text-secondary);
		font-size: 0.85rem;
		margin-left: 5px;
	}
	.date {
		margin: 8px 0;
		padding: 8px;
		background-color: transparent;
		border: 1px solid var(--text-secondary);
		border-radius: 8px;
		color: var(--text-primary);
		cursor: pointer;
	}
	.date:hover:not(:focus) {
		padding: 6px;
		border: 3px solid var(--text-secondary);
	}
	.box {
		position: fixed;
		background-color: var(--background-paper);
		top: 0px;
		left: 0px;
		z-index: 50;
		width: 100%;
		height: 100%;
	}
	.back {
		position: absolute;
		top: 18px;
		left: 24px;
	}
	.month-name {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 24px;
		font-size: 1.2rem;
	}
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.arrows {
		display: 'flex';
		flex-direction: 'column';
	}
</style>
