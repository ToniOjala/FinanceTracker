import { redirect } from '@sveltejs/kit';
import { getCategories } from '$lib/services/categoryService';
import { handleStartup } from '$lib/startup';
import { categories } from '$lib/stores';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const cats = await getCategories(new Date().getFullYear());
	categories.set(cats);
	await handleStartup(cats);

	throw redirect(303, '/month');
};
