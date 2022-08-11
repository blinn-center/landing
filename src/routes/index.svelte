<script lang="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';

	export async function load({ fetch }: LoadEvent) {
		const eventsResponse = await fetch('/events/preview');
		if (!eventsResponse.ok) {
			return {
				status: eventsResponse.status
			};
		}
		const { previewEvents } = await eventsResponse.json();
		return {
			status: eventsResponse.status,
			props: {
				previewEvents
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
		Row,
		Tile
	} from 'carbon-components-svelte';
	import PreviewEventsTitle from '$lib/events/PreviewEventsTitle.svelte';
	import type { PreviewEvent } from '$lib/events/types';
	import ClassFinderTile from '$lib/classFinder/ClassFinderTile.svelte';

	export let previewEvents: PreviewEvent[];
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
			<PreviewEventsTitle {previewEvents} />
		</Column>
		<Column>
			<ClassFinderTile />
		</Column>
	</Row>
</Grid>
