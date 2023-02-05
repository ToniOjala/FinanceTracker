<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Notification } from '$lib/types';
	import clickOutside from '$lib/actions/clickOutside';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import { markNotificationAsRead } from '$lib/services/notificationService';
	import { notifications } from '$lib/stores';
	import { getNotificationDate } from '$lib/utils/dates';

	let showNotifications = false;

	const toggleNotifications = () => (showNotifications = !showNotifications);

	async function markAsRead(notification: Notification) {
		const updatedNotification = await markNotificationAsRead(notification);
		const nots = $notifications.map((n) =>
			n.id === updatedNotification.id ? updatedNotification : n
		);
		notifications.set(nots);
	}

	$: numUnread = $notifications.filter((n) => n.read === false).length;
</script>

<div use:clickOutside={() => (showNotifications = false)} class="notifications">
	<Badge text={numUnread > 0 ? numUnread.toString() : ''}>
		<SvgIcon icon="alarm" color="#EEE" size={28} on:click={toggleNotifications} />
	</Badge>
	{#if showNotifications}
		<div transition:slide={{ duration: 300 }} class="dropdown">
			{#each $notifications as notification}
				<div class="dropdown-item">
					<div class="dropdown-item-text">
						<span class="dropdown-item-date"
							>{getNotificationDate(new Date(notification.date))}</span
						>
						<span class:bold={notification.read == false}>{notification.message}</span>
					</div>
					<button on:click={() => markAsRead(notification)}>M</button>
				</div>
				{#if notification.id < $notifications.length}<div class="divider" />{/if}
			{:else}
				<div class="dropdown-item">No notifications</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.notifications {
		margin-left: 24px;
		margin-right: 48px;
		padding: 6px;
		border-radius: 50%;
	}
	.notifications:hover {
		background-color: #eeeeee1c;
	}
	.dropdown {
		position: absolute;
		background-color: var(--background-paper);
		width: 400px;
		top: 50px;
		right: 100px;
		border-radius: 8px;
		font-size: 0.95rem;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	.dropdown-item {
		padding: 24px 16px;
		user-select: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.dropdown-item:hover {
		background-color: var(--background-paper-hover);
	}
	.dropdown-item:nth-child(1):hover {
		border-radius: 8px 8px 0 0;
	}
	.dropdown-item:nth-last-child(1):hover {
		border-radius: 0 0 8px 8px;
	}
	.dropdown-item-text {
		display: flex;
		flex-direction: column;
	}
	.dropdown-item-date {
		color: var(--text-secondary);
		font-size: 0.85rem;
		margin-bottom: 4px;
	}
	.bold {
		font-weight: bold;
	}
	button {
		border: none;
		color: white;
		background-color: transparent;
		border-radius: 50%;
		width: 34px;
		height: 34px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.1rem;
	}
	button:hover {
		cursor: pointer;
		background-color: rgba(355, 355, 355, 0.1);
	}
	.divider {
		border-top: 1px solid #cccccc44;
	}
</style>
