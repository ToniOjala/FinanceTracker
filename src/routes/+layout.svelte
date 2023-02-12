<script lang="ts">
	import Header from '$lib/components/header/index.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Header />
<SideNav />

<PageTransition path={data.path}>
	<main>
		<slot />
	</main>
</PageTransition>

<style>
	:global(body) {
		background: linear-gradient(133deg, rgba(36, 42, 67, 1) 0%, rgba(27, 32, 52, 1) 100%);
	}
	main {
		padding: 1rem 2rem;
		width: calc(100% - 80px);
		height: calc(100vh - 48px);
		margin-left: 80px;
		box-sizing: border-box;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	main::-webkit-scrollbar {
		width: 20px;
	}
	main::-webkit-scrollbar-corner {
		background: rgba(0, 0, 0, 0);
	}
	main::-webkit-scrollbar-thumb {
		background-color: #eee;
		border-radius: 6px;
		border: 4px solid rgba(0, 0, 0, 0);
		background-clip: content-box;
		min-width: 32px;
		min-height: 32px;
	}
	main::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, 0);
	}
</style>
