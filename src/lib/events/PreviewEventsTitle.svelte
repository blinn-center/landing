<script lang="ts">
	import MarkdownLink from '$lib/MarkdownLink.svelte';
	import MarkdownParagraph from '$lib/MarkdownParagraph.svelte';
	import {
		Button,
		InlineLoading,
		Loading,
		StructuredList,
		StructuredListBody,
		StructuredListCell,
		StructuredListHead,
		StructuredListRow,
		Tag,
		Tile
	} from 'carbon-components-svelte';
	import type { PreviewEvent } from './types';

	export let previewEvents: PreviewEvent[] = [];
	export let fetchMoreEvents: (() => Promise<void>) | null = null;
	export let loading: boolean = false;
</script>

<Tile>
	<div class="preview-events-tile">
		<h2>Upcoming Events</h2>
		<MarkdownParagraph>
			Sourced from the <MarkdownLink href="https://www.blinn.edu/calendar/index.html">
				Blinn Academic Calendar
			</MarkdownLink>
		</MarkdownParagraph>
		<StructuredList>
			<StructuredListHead>
				<StructuredListRow head>
					<StructuredListCell head>Term/Semester</StructuredListCell>
					<StructuredListCell head>Event</StructuredListCell>
					<StructuredListCell head>Date</StructuredListCell>
				</StructuredListRow>
			</StructuredListHead>
			<StructuredListBody>
				{#each previewEvents as event}
					<StructuredListRow label for="event-{event.id}">
						<StructuredListCell>
							{#each event.tags as tag}
								<div><Tag type={tag.type ?? undefined}>{tag.text}</Tag></div>
							{/each}
						</StructuredListCell>
						<StructuredListCell>{event.event}</StructuredListCell>
						<StructuredListCell>{event.date}</StructuredListCell>
					</StructuredListRow>
				{/each}
			</StructuredListBody>
		</StructuredList>
		{#if fetchMoreEvents}
			{#if loading}
				<InlineLoading description="Loading more events..." />
			{:else}
				<Button on:click={fetchMoreEvents} disabled={loading}>Fetch more</Button>
			{/if}
		{/if}
	</div>
</Tile>

<style>
	.preview-events-tile {
		max-height: 500px;
		overflow-y: auto;
	}
</style>
