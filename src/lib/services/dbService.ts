import { invoke } from '@tauri-apps/api/tauri';
import type { DBTable } from '$lib/types';

export async function sendDbRequest<T>(
	table: DBTable,
	route: string,
	data: unknown | null = null
): Promise<T> {
	const request = { table, route, data: JSON.stringify(data) };
	try {
		const response: string = await invoke('send_db_request', { request });
		return JSON.parse(response);
	} catch (error) {
		console.error(`Error when sending DB request to ${table}/${route}: `, error);
	}
}
