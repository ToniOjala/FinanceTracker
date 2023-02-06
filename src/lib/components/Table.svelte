<script lang="ts">
	export let columnTitles = ['First', 'Second', 'Third'];
	export let padding: string;
	export let backgroundColor: string;
</script>

<table
	style="
    padding: {padding}
    backgroundColor: {backgroundColor}
  "
>
	<tr>
		{#each columnTitles as title}
			<th>{title}</th>
		{/each}
	</tr>
	<slot />
</table>

<style>
	tr {
		text-align: left;
		color: var(--text-secondary);
	}
</style>
