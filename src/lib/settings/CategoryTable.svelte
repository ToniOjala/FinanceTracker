<script lang="ts">
	import DropDown from '$lib/components/DropDown.svelte';
	import DropDownItem from '$lib/components/DropDownItem.svelte';
	import type { Category } from '$lib/types';

	export let categories: Category[];
	export let selectedCategory: Category;
	export let selectCategory: (category: Category) => void;
	export let editCategory: (category: Category) => void;
	export let startCategoryRemoval: (category: Category) => void;
</script>

<table>
	<tr class="header">
		<th>Category</th>
		<th>Type</th>
		<th>Created</th>
		<th>Removed</th>
		<th>Actions</th>
	</tr>
	{#each categories as category}
		<tr
			class:selected={selectedCategory?.name == category.name}
			on:click={() => selectCategory(category)}
		>
			<td>{category.name}</td>
			<td>{category.ctype.charAt(0).toUpperCase() + category.ctype.substr(1)}</td>
			<td>{category.created}</td>
			<td>{category.removed ? category.removed : '-'}</td>
			<td>
				<DropDown text="...">
					<DropDownItem text="Rename" on:click={() => editCategory(selectedCategory)} />
					<DropDownItem text="Remove" on:click={() => startCategoryRemoval(selectedCategory)} />
				</DropDown>
			</td>
		</tr>
	{/each}
</table>
