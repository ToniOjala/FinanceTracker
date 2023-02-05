import type { Category, NewCategory } from '$lib/types';
import { sendDbRequest } from './dbService';

const table = 'categories';

export async function saveCategory(category: NewCategory): Promise<Category> {
	try {
		const savedCategory = await sendDbRequest<Category>(table, 'create', category);
		return savedCategory;
	} catch (error) {
		console.error(error);
	}
}

export async function getCategories(year: number): Promise<Category[]> {
	try {
		const categories = await sendDbRequest<Category[]>(table, 'read', year);
		return categories;
	} catch (error) {
		console.error(error);
	}
}

export async function updateCategory(category: Category): Promise<Category> {
	try {
		const updatedCategory = await sendDbRequest<Category>(table, 'update', category);
		return updatedCategory;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteCategory(category: Category, year: string): Promise<Category> {
	try {
		const updatedCategory = await sendDbRequest<Category>(table, 'update', {
			...category,
			removed: year
		});
		return updatedCategory;
	} catch (error) {
		console.error(error);
	}
}
