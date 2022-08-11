<script lang="ts">
	import {
		Link,
		StructuredList,
		StructuredListBody,
		StructuredListCell,
		StructuredListHead,
		StructuredListRow,
		Tile
	} from 'carbon-components-svelte';
	import type { PreviewEvent } from './types';

	export let previewEvents: PreviewEvent[] = [];
</script>

<Tile>
	<h2>Upcoming Events</h2>
	<p>
		Sourced from the <Link href="https://www.blinn.edu/calendar/index.html">
			Blinn Academic Calendar
		</Link>
	</p>
	<StructuredList>
		<StructuredListHead>
			<StructuredListRow head>
				<StructuredListCell head>Category</StructuredListCell>
				<StructuredListCell head>Event</StructuredListCell>
				<StructuredListCell head>Date</StructuredListCell>
			</StructuredListRow>
		</StructuredListHead>
		<StructuredListBody>
			{#each previewEvents as event}
				<StructuredListRow label for="event-{event.id}">
					<StructuredListCell>{event.category}</StructuredListCell>
					<StructuredListCell>{event.event}</StructuredListCell>
					<StructuredListCell>{event.date}</StructuredListCell>
				</StructuredListRow>
			{/each}
		</StructuredListBody>
	</StructuredList>
</Tile>
