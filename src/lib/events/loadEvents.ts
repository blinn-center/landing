import type { LoadEvent } from '@sveltejs/kit';
import ICAL from 'ical.js';
import type { PreviewEvent, PreviewEventTag } from './types';

export const ICAL_FEED = 'http://www.calendarwiz.com/CalendarWiz_iCal.php?crd=blinncollegeacademic';

const TAGS: { search: string; tag: PreviewEventTag }[] = [
	{
		search: 'Spring',
		tag: {
			type: 'cyan',
			text: 'Spring'
		}
	},
	{
		search: 'Summer',
		tag: {
			type: 'blue',
			text: 'Summer'
		}
	},
	{
		search: 'Fall',
		tag: {
			type: 'green',
			text: 'Fall'
		}
	},
	{
		search: 'Winter',
		tag: {
			type: 'teal',
			text: 'Winter'
		}
	}
];

function getTags(summary: string): PreviewEventTag[] {
	const tags: PreviewEventTag[] = [];
	const lowercase = summary.toLowerCase();
	for (const tag of TAGS) {
		if (lowercase.includes(tag.search.toLowerCase())) {
			tags.push(tag.tag);
		}
	}
	return tags;
}

function transformEventToPreview(event: ICAL.Event): PreviewEvent {
	const startDate = event.startDate
		.toJSDate()
		.toLocaleString('en-us', { month: 'numeric', day: 'numeric' });
	const endDate = event.endDate
		.toJSDate()
		.toLocaleString('en-us', { month: 'numeric', day: 'numeric' });
	const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`;
	return {
		id: event.uid,
		event: event.summary,
		date,
		tags: getTags(event.summary)
	};
}

function getPreviewEventsFromData(data: any[], maxEvents: number): PreviewEvent[] {
	const comp = new ICAL.Component(data);
	const rawEvents = comp.getAllSubcomponents('vevent');
	const events = rawEvents.map((event) => new ICAL.Event(event));
	const now = ICAL.Time.now();
	const startsAfterNow = events.filter((e) => e.startDate.compare(now) > 0);
	const eventsByDateInverseChrono = startsAfterNow.sort((a, b) => a.startDate.compare(b.startDate));
	const limited = eventsByDateInverseChrono.slice(0, maxEvents);
	return limited.map(transformEventToPreview);
}

// https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout
// missing in TypeScript: https://github.com/microsoft/TypeScript/issues/48003
declare var AbortSignal: {
	timeout(time: number): AbortSignal;
};

export async function loadPreview(
	fetch: LoadEvent['fetch'],
	maxEvents: number
): Promise<{ status: number; previewEvents: PreviewEvent[] }> {
	const response = await fetch(ICAL_FEED, { signal: AbortSignal.timeout(5000) });
	if (!response.ok) {
		return {
			status: response.status,
			previewEvents: []
		};
	}
	const icalData = await response.text();
	const jcalData = ICAL.parse(icalData);

	return {
		status: response.status,
		previewEvents: getPreviewEventsFromData(jcalData, maxEvents)
	};
}
