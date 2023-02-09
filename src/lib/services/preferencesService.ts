import { appDataDir, join } from '@tauri-apps/api/path';
import { createDir, exists, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { userPreferences } from '$lib/stores';
import type { UserPreferences } from '$lib/types';

const defaults: UserPreferences = {
	dbPath: 'C:/Users/Toni/Repos/Personal/finance-tracker-tauri/db/testdb.db'
};

export async function readUserPreferences(): Promise<void> {
	if (typeof window === 'undefined') return;
	const path = await join(await appDataDir(), 'preferences.json');
	const pathExists = await exists(path);
	if (!pathExists) writeDefaultPreferences(path);

	const preferencesData = await readTextFile(path);
	userPreferences.set(JSON.parse(preferencesData));
}

export async function updateUserPreferences(preferences: UserPreferences): Promise<void> {
	if (typeof window === 'undefined') return;
	const path = await join(await appDataDir(), 'preferences.json');
	await writeTextFile(path, JSON.stringify(preferences));
	userPreferences.set(preferences);
}

async function writeDefaultPreferences(path: string): Promise<void> {
	if (typeof window === 'undefined') return;
	await createDir(await appDataDir());
	await writeTextFile(path, JSON.stringify(defaults));
	userPreferences.set(defaults);
}
