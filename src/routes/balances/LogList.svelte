<script lang="ts">
	import type { BalanceLog } from '$lib/types';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import { formatDate } from '$lib/utils/dates';

	export let balanceLogs: BalanceLog[];
</script>

<div class="log-list">
	{#each balanceLogs as balanceLog}
		<div class="log-item">
			<div class="icon">
				{#if balanceLog.amount < 0}
					<SvgIcon icon="minus" size={30} color="var(--secondary-main)" />
				{:else}
					<SvgIcon icon="plus" size={30} color="var(--primary-main)" />
				{/if}
			</div>
			<div class="date-label">
				<span>{formatDate(new Date(balanceLog.date), 'dd.MM.yy')}</span>
				<span style="color: var(--text-secondary)">{balanceLog.label || ''}</span>
			</div>
			<div class="amount">{balanceLog.amount}</div>
		</div>
	{/each}
</div>

<style>
	.log-item {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 8px 16px;
	}
	.log-item:nth-child(even) {
		background-color: var(--background-lighter);
	}
	.icon {
		width: 15%;
	}
	.date-label {
		width: 60%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		font-size: 0.9rem;
	}
	.amount {
		width: 25%;
		font-size: 1.2rem;
		text-align: center;
	}
</style>
