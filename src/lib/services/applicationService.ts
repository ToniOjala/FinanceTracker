import type { ApplicationData } from '$lib/types';
import { sendDbRequest } from './dbService';

const table = 'application';

export async function getAppData(): Promise<ApplicationData> {
	const appData = await sendDbRequest<ApplicationData>(table, 'read');
	return appData;
}

export async function updateLastOpenedDate(date: string): Promise<void> {
	return await sendDbRequest(table, 'update_last_opened', date);
}
