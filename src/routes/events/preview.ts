import { ICAL_FEED, loadPreview } from '$lib/events/loadEvents';
import type { PreviewEvent } from '$lib/events/types';
import type { RequestHandler } from '@sveltejs/kit';

// From https://github.com/sveltejs/kit/issues/1997#issuecomment-887614097
type Typify<T> = { [K in keyof T]: Typify<T[K]> };

export const GET: RequestHandler = async ({ url }) => {
	let count = Number(url.searchParams.get('count') ?? '5');
	if (isNaN(count)) {
		count = 5;
	}
	const { status, previewEvents } = await loadPreview(fetch, count);
	return {
		status,
		body: {
			previewEvents: previewEvents as Typify<PreviewEvent[]>,
			dataSource: ICAL_FEED
		}
	};
};
