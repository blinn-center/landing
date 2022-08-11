import type { LoadEvent } from '@sveltejs/kit';
import ICAL from 'ical.js';
import type { PreviewEvent } from './types';

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
		category: event.component.getFirstPropertyValue('categories'),
		event: event.summary,
		date,
		color: event.color
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
	const url = 'http://www.calendarwiz.com/CalendarWiz_iCal.php?crd=blinncollegeacademic';
	const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
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
