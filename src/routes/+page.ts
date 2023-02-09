import { redirect } from '@sveltejs/kit';
import { handleStartup } from '$lib/startup';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	await handleStartup();

	throw redirect(303, '/month');
};
