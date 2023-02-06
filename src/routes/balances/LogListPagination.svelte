<script lang="ts">
	export let count: number;
	export let activePage: number;

	let shownPages: number[] = [];

	$: pages = Math.floor(count / 10);
	$: {
		if (pages < 13) shownPages = Array.from({ length: pages }, (_, i) => i + 1);
		else {
			if (activePage < 9) shownPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, pages];
			else if (activePage >= 4 && activePage < pages - 4) {
				shownPages = [
					1,
					0,
					activePage - 4,
					activePage - 3,
					activePage - 2,
					activePage - 1,
					activePage,
					activePage + 1,
					activePage + 2,
					activePage + 3,
					0,
					pages
				];
			} else
				shownPages = [
					1,
					0,
					pages - 9,
					pages - 8,
					pages - 7,
					pages - 6,
					pages - 5,
					pages - 4,
					pages - 3,
					pages - 2,
					pages - 1,
					pages
				];
		}
	}
</script>

<div class="pagination">
	<div
		class="prev-button page-button"
		class:disabled={activePage === 1}
		on:click={() => (activePage > 1 ? activePage-- : null)}
		on:keypress
	>
		<span />
	</div>
	<div class="page-buttons">
		{#each shownPages as p}
			{#if p === 0}
				<span class="page-button">...</span>
			{:else}
				<div
					class="page-button"
					class:active={p === activePage}
					on:click={() => (activePage = p)}
					on:keypress
				>
					{p}
				</div>
			{/if}
		{/each}
	</div>
	<div
		class="next-button page-button"
		class:disabled={activePage === pages}
		on:click={() => (activePage < pages ? activePage++ : null)}
		on:keypress
	>
		<span />
	</div>
</div>

<style>
	.pagination {
		width: 100%;
		display: flex;
	}
	.prev-button span {
		border: solid white;
		border-width: 0 2px 2px 0;
		display: inline-block;
		transform: rotate(135deg);
		padding: 4px;
	}
	.next-button span {
		border: solid white;
		border-width: 0 2px 2px 0;
		display: inline-block;
		transform: rotate(315deg);
		padding: 4px;
	}
	.page-buttons {
		display: flex;
	}
	.page-button {
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
	}
	.page-button:hover:not(.active):not(.disabled):not(span) {
		background-color: #cccccc22;
		cursor: pointer;
	}
	.active {
		background-color: #cccccc44;
	}
	.disabled {
		border-color: #aaa;
	}
	.disabled span {
		border-color: #aaa;
	}
</style>
