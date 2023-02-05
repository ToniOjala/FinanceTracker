import type { BalanceLog } from '$lib/types';
import { sendDbRequest } from './dbService';

const table = 'balanceLogs';

export async function getBalanceLogsByCategoryAndPage(
	categoryId: number,
	page: number
): Promise<BalanceLog[]> {
	try {
		const balanceLogs = await sendDbRequest<BalanceLog[]>(table, 'read', { categoryId, page });
		return balanceLogs;
	} catch (error) {
		console.error(error);
	}
}

export async function getCountOfBalanceLogs(categoryId: number): Promise<number> {
	try {
		const count = await sendDbRequest<number>(table, 'readCount', { categoryId });
		return count;
	} catch (error) {
		console.error(error);
	}
}
