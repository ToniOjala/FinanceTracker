<script lang="ts">
	import { onMount } from 'svelte';
	import { open } from '@tauri-apps/api/dialog';
	import { userPreferences } from '$lib/stores';
	import { appDataDir } from '@tauri-apps/api/path';
	import { updateUserPreferences } from '$lib/services/preferencesService';

	let dbPath = '';

	async function selectPath() {
		const thing = await open({
			filters: [
				{
					name: 'Database',
					extensions: ['db']
				}
			],
			defaultPath: await appDataDir()
		});
		if (typeof thing === 'string') dbPath = thing;
		updateUserPreferences({ dbPath });
	}

	onMount(() => {
		dbPath = $userPreferences.dbPath;
	});
</script>

<div class="wrapper">
	<div>Database path:</div>
	<input type="text" value={dbPath} />
	<button on:click={selectPath}>Select</button>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	input {
		width: 500px;
	}
	button {
		float: right;
	}
</style>
