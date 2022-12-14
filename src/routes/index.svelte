<script lang="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';

	export async function load({ fetch }: LoadEvent) {
		const eventsResponse = await fetch('/events/preview?count=5');
		if (!eventsResponse.ok) {
			return {
				status: 200,
				props: {
					havePreviewEvents: false,
					previewEvents: []
				}
			};
		}
		const { previewEvents } = await eventsResponse.json();
		return {
			status: eventsResponse.status,
			props: {
				previewEvents,
				havePreviewEvents: true
			}
		};
	}
</script>

<script lang="ts">
	import {
		Column,
		Grid,
		InlineNotification,
		NotificationActionButton,
		Row
	} from 'carbon-components-svelte';
	import PreviewEventsTitle from '$lib/events/PreviewEventsTitle.svelte';
	import type { PreviewEvent } from '$lib/events/types';
	import ClassFinderTile from '$lib/classFinder/ClassFinderTile.svelte';

	export let havePreviewEvents: boolean;
	export let previewEvents: PreviewEvent[];

	let loadingEvents: boolean = false;

	async function fetchMoreEvents() {
		loadingEvents = true;
		const currentCount = previewEvents.length;
		const newCount = currentCount + 5;
		const eventsResponse = await fetch(`/events/preview?count=${newCount}`);
		if (!eventsResponse.ok) {
			loadingEvents = false;
			throw new Error('Failed to fetch more events');
		}
		({ previewEvents } = await eventsResponse.json());
		loadingEvents = false;
	}
</script>

<h1>Blinn Center</h1>
<h2>Improved online services for Blinn College students</h2>
<InlineNotification
	lowContrast
	hideCloseButton
	kind="info"
	subtitle="Blinn Center is an unofficial, student-run website and has no formal affiliation with Blinn College."
>
	<svelte:fragment slot="actions">
		<NotificationActionButton href="/about">Learn more</NotificationActionButton>
	</svelte:fragment>
</InlineNotification>

<Grid>
	<Row>
		<Column>
			<PreviewEventsTitle
				{havePreviewEvents}
				{previewEvents}
				{fetchMoreEvents}
				loading={loadingEvents}
			/>
		</Column>
		<Column>
			<ClassFinderTile />
		</Column>
	</Row>
</Grid>
