<script>
	import { appWindow } from '@tauri-apps/api/window';
	import MonthSelector from './MonthSelector.svelte';
	import YearSelector from './YearSelector.svelte';
	import Notifications from './Notifications.svelte';
	import IconButton from '$lib/components/IconButton.svelte';

	let isMaximized = false;

	const minimize = () => appWindow.minimize();
	const close = () => appWindow.close();
	const toggleMaximize = () => {
		isMaximized ? appWindow.unmaximize() : appWindow.maximize();
		isMaximized = !isMaximized;
	}
</script>

<header data-tauri-drag-region>
	<h1>Finance Tracker</h1>
	<div class="actions">
		<MonthSelector />
		<YearSelector />
		<Notifications />
		<IconButton margin="0 8px 0 0" icon="minimize" on:click={minimize} />
		<IconButton margin="0 8px 0 0" icon={(isMaximized && 'unmaximize') || 'maximize'} on:click={toggleMaximize} />
		<IconButton margin="0 8px 0 0" icon="close" on:click={close} />
	</div>
</header>

<style>
	header {
		height: 50px;
		width: 100vw;
		background-color: var(--background-darker);
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		-webkit-app-region: drag;
	}
	h1 {
		font-size: 1.05rem;
		font-weight: 500;
		margin-left: 20px;
	}
	.actions {
		display: flex;
		justify-content: space-between;
		-webkit-app-region: no-drag;
	}
</style>
