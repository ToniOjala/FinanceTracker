import type { LayoutLoad } from './$types';

export const ssr = false;

export const load = (async ({ url }) => {
	return { path: url.pathname };
}) satisfies LayoutLoad;
