<script lang="ts">
	import { page } from '$app/stores';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
</script>

<aside>
	<a sveltekit:prefetch href="/">
		<div class:active={$page.url.pathname === '/'}>
			<SvgIcon color={$page.url.pathname === '/' ? '#66B088' : '#EEE'} icon="month" />
			<div>MONTH</div>
		</div>
	</a>
	<a sveltekit:prefetch href="/year">
		<div class:active={$page.url.pathname === '/year'}>
			<SvgIcon color={$page.url.pathname === '/year' ? '#66B088' : '#EEE'} icon="year" />
			<div>YEAR</div>
		</div>
	</a>
	<a sveltekit:prefetch href="/recurring">
		<div class:active={$page.url.pathname === '/recurring'}>
			<SvgIcon color={$page.url.pathname === '/recurring' ? '#66B088' : '#EEE'} icon="recurring" />
			<div>RECURRING</div>
		</div>
	</a>
	<a sveltekit:prefetch href="/balances">
		<div class:active={$page.url.pathname === '/balances'}>
			<SvgIcon color={$page.url.pathname === '/balances' ? '#66B088' : '#EEE'} icon="balances" />
			<div>BALANCES</div>
		</div>
	</a>
	<a sveltekit:prefetch href="/settings">
		<div class:active={$page.url.pathname === '/settings'}>
			<SvgIcon color={$page.url.pathname === '/settings' ? '#66B088' : '#EEE'} icon="settings2" />
			<div>SETTINGS</div>
		</div>
	</a>
</aside>

<style>
	aside {
		height: 100vh;
		width: 80px;
		text-decoration: none;
		text-align: center;
		padding: 0;
		background-color: var(--background-paper);
		position: fixed;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	a > div {
		padding: 20px 0;
		font-size: 0.7rem;
	}
	a > div:not(.active):hover {
		background-color: var(--background-paper-hover);
	}
	a:hover {
		text-decoration: none;
	}
	.active {
		background-color: var(--background-darker);
		color: var(--primary-main);
		border-left: 3px solid var(--primary-main);
	}
</style>
