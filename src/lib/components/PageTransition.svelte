<script lang="ts">
	import { fade } from 'svelte/transition';
	export let path: string;
</script>

{#key path}
	<div in:fade={{ duration: 250, delay: 300 }} out:fade={{ duration: 250 }}>
		<slot />
	</div>
{/key}

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
