import { loadPreview } from '$lib/events/loadEvents';
import type { PreviewEvent } from '$lib/events/types';
import type { RequestHandler } from '@sveltejs/kit';

// From https://github.com/sveltejs/kit/issues/1997#issuecomment-887614097
type Typify<T> = { [K in keyof T]: Typify<T[K]> };

export const GET: RequestHandler = async () => {
	const { status, previewEvents } = await loadPreview(fetch, 5);
	return {
		status,
		body: {
			previewEvents: previewEvents as Typify<PreviewEvent[]>
		}
	};
};
