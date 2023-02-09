<script lang="ts">
	import type { Category, NewCategory } from '$lib/types';
	import { categories } from '$lib/stores';
	import Card from '$lib/components/Card.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import CategoryTable from './CategoryTable.svelte';
	import RenameCategoryForm from './RenameCategoryForm.svelte';
	import RemoveCategoryForm from './RemoveCategoryForm.svelte';
	import {
		getCategories,
		saveCategory,
		deleteCategory,
		updateCategory
	} from '$lib/services/categoryService';
	import { onMount } from 'svelte';
	import UserPreferences from './UserPreferences.svelte';

	let showDialog = false;
	let selectedCategory: Category;
	let categoryToEdit: Category | null;
	let categoryToRemove: Category | null;

	function selectCategory(category: Category): void {
		selectedCategory = category;
	}

	async function submitCategory(category: NewCategory | Category) {
		showDialog = false;
		if (categoryToEdit) {
			const updatedCategory = await updateCategory(category as Category);
			categories.update((c) =>
				c.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
			);
		} else {
			const savedCategory = await saveCategory(category as NewCategory);
			categories.update((c) => c.concat(savedCategory));
		}
	}

	function editCategory(category: Category) {
		categoryToEdit = category;
		showDialog = true;
	}

	function startCategoryRemoval(category: Category) {
		categoryToRemove = category;
		showDialog = true;
	}

	async function removeCategory(year: string) {
		const updatedCategory = await deleteCategory(selectedCategory, year);
		categories.update((c) =>
			c.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
		);
	}

	function onDialogClosed() {
		categoryToEdit = null;
		categoryToRemove = null;
		showDialog = false;
	}

	onMount(async () => {
		const cats = await getCategories(1);
		categories.set(cats);
	});
</script>

<Card title="User preferences" width="800px" margin="0 0 2rem 0" padding="2rem">
	<UserPreferences slot="content" />
</Card>

<Card title="Categories" width="800px">
	<CategoryTable
		slot="content"
		categories={$categories}
		{selectedCategory}
		{selectCategory}
		{editCategory}
		{startCategoryRemoval}
	/>
	<IconButton slot="actions" icon="plus" size={20} on:click={() => (showDialog = true)}>
		New
	</IconButton>
</Card>
{#if categoryToRemove != null}
	<Modal title="Remove Category" isOpen={showDialog} onClose={onDialogClosed}>
		<RemoveCategoryForm slot="content" submit={removeCategory} />
	</Modal>
{:else}
	<Modal
		title={categoryToEdit ? 'Rename Category' : 'Add Category'}
		isOpen={showDialog}
		onClose={onDialogClosed}
	>
		<RenameCategoryForm slot="content" {categoryToEdit} submit={submitCategory} />
	</Modal>
{/if}

<style>
</style>
