<script lang="ts">
	import type { Category } from '$lib/types';
	import { categories, balanceLogs } from '$lib/stores';
	import Card from '$lib/components/Card.svelte';
	import BalancesTable from '$lib/balances/BalancesTable.svelte';
	import LogList from '$lib/balances/LogList.svelte';
	import ModifyBalanceForm from '$lib/balances/ModifyBalanceForm.svelte';
	import LogListPagination from '$lib/balances/LogListPagination.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import {
		getBalanceLogsByCategoryAndPage,
		getCountOfBalanceLogs
	} from '$lib/services/balanceLogService';
	import { getCategories } from '$lib/services/categoryService';
	import { onMount } from 'svelte';

	let selectedCategory: Category | undefined;
	let isBalanceDialogOpen = false;
	let balanceLogCount = 0;
	let activePage = 1;

	const selectCategory = (category: Category) => (selectedCategory = category);
	const openBalanceDialog = () => (isBalanceDialogOpen = true);

	function handleModifyBalance(amount: number) {
		isBalanceDialogOpen = false;
		console.log('Balance modified by ', amount);
	}

	$: {
		if (selectedCategory != undefined) {
			getCountOfBalanceLogs(selectedCategory.id).then((count) => (balanceLogCount = count));

			getBalanceLogsByCategoryAndPage(selectedCategory.id, activePage - 1).then((blogs) =>
				balanceLogs.set(blogs)
			);
		}
	}

	onMount(async () => {
		const cats = await getCategories(1);
		categories.set(cats);
	});
</script>

<div class="container">
	<div class="balances">
		<Card title="Balances">
			<BalancesTable
				slot="content"
				categories={$categories.filter((c) => c.ctype === 'expense')}
				{selectedCategory}
				{selectCategory}
				{openBalanceDialog}
			/>
		</Card>
	</div>
	<div class="logs">
		<Card title="Logs">
			<LogList slot="content" balanceLogs={$balanceLogs} />
		</Card>
		<LogListPagination count={balanceLogCount} bind:activePage />
	</div>
	<Modal title="Modify Balance" bind:isOpen={isBalanceDialogOpen}>
		<ModifyBalanceForm slot="content" {handleModifyBalance} />
	</Modal>
</div>

<style>
	.container {
		width: 100%;
		display: flex;
	}
	.balances {
		width: 66%;
		margin-right: 2rem;
	}
	.logs {
		width: 33%;
	}
</style>
