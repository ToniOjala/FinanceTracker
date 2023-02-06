import type { Category, NewCategory } from '$lib/types';
import { sendDbRequest } from './dbService';

const table = 'categories';

export async function saveCategory(category: NewCategory): Promise<Category> {
	const savedCategory = await sendDbRequest<Category>(table, 'create', category);
	return savedCategory;
}

export async function getCategories(year: number): Promise<Category[]> {
	const categories = await sendDbRequest<Category[]>(table, 'read', year);
	return categories;
}

export async function updateCategory(category: Category): Promise<Category> {
	const updatedCategory = await sendDbRequest<Category>(table, 'update', category);
	return updatedCategory;
}

export async function deleteCategory(category: Category, year: string): Promise<Category> {
	const updatedCategory = await sendDbRequest<Category>(table, 'update', {
		...category,
		removed: year
	});
	return updatedCategory;
}
