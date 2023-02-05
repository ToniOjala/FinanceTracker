import type { Label, NewLabel, NewTransaction } from '$lib/types';
import { formatDate } from '$lib/utils/dates';
import { sendDbRequest } from './dbService';

const table = 'labels';

export async function saveLabel(expense: NewTransaction): Promise<Label> {
	try {
		const label: NewLabel = {
			categoryId: expense.categoryId,
			name: expense.label,
			lastUsed: formatDate(new Date())
		};
		const savedLabel = await sendDbRequest<Label>(table, 'create', label);
		return savedLabel;
	} catch (error) {
		console.error(error);
	}
}

export async function getLabelsByCategory(categoryId: number): Promise<Label[]> {
	try {
		const labels = await sendDbRequest<Label[]>(table, 'read_by_category', categoryId);
		return labels;
	} catch (error) {
		console.error(error);
	}
}
