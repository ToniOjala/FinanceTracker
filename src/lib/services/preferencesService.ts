import { BaseDirectory, createDir, exists, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { userPreferences } from '$lib/stores';
import type { UserPreferences } from '$lib/types';

const defaults: UserPreferences = {
	dbPath: 'C:/Users/Toni/Repos/Personal/finance-tracker-tauri/db/testdb.db'
};

export async function readUserPreferences(): Promise<void> {
	const pathExists = await exists('preferences.json', { dir: BaseDirectory.AppData });
	if (!pathExists) await writeDefaultPreferences();

	const preferencesData = await readTextFile('preferences.json', { dir: BaseDirectory.AppData });
	userPreferences.set(JSON.parse(preferencesData));
}

export async function updateUserPreferences(preferences: UserPreferences): Promise<void> {
	await writeTextFile('preferences.json', JSON.stringify(preferences), {
		dir: BaseDirectory.AppData
	});
	userPreferences.set(preferences);
}

async function writeDefaultPreferences(): Promise<void> {
	await createDir('', { dir: BaseDirectory.AppData, recursive: true });
	await writeTextFile('preferences.json', JSON.stringify(defaults), { dir: BaseDirectory.AppData });
	userPreferences.set(defaults);
}
