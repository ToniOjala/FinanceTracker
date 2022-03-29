<script lang="ts">
	export let title = '';
	export let margin = '0 0 0 0';
	export let padding = '0 0 0 0';
	export let width = '100%';
</script>

<div style="margin: {margin}; width: {width}">
	<div class="card">
		{#if title.length > 0}
			<div class="header">
				<h2>{title}</h2>
			</div>
		{/if}
		<div class="content" style="padding: {padding}">
			<slot name="content" />
		</div>
	</div>
	<div class="actions">
		<slot name="actions" />
	</div>
</div>

<style>
	.card {
		box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
		border-radius: 4px;
	}
	.header {
		background-color: var(--background-darker);
		padding: 16px;
		border-radius: 4px;
	}
	.header h2 {
		font-size: 1.3rem;
		font-weight: 600;
	}
	.content {
		box-sizing: border-box;
		width: 100%;
		background-color: var(--background-paper);
		border-radius: 4px;
	}
	.actions {
		margin-top: 8px;
		display: flex;
		justify-content: left;
	}
</style>
