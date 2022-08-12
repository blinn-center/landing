<script lang="ts">
	import MarkdownParagraph from '$lib/MarkdownParagraph.svelte';
	import MarkdownUnorderedList from '$lib/MarkdownUnorderedList.svelte';
	import {
		InlineLoading,
		InlineNotification,
		Slider,
		TextInput,
		Tile,
		ClickableTile,
		Accordion,
		AccordionItem,
		ListItem
	} from 'carbon-components-svelte';
	import ClassTile from './ClassTile.svelte';
	import Example from './Example.svelte';
	import { examples } from './examples';
	import type { Course } from './types';

	let query = '';
	let limit = 5;
	let results: null | Course[] = null;
	let error: null | string = null;
	let loading = false;
	let currentAbortController: null | AbortController = null;

	async function loadResults(query: string, limit: number) {
		if (currentAbortController) {
			currentAbortController.abort('reloading');
			currentAbortController = null;
		}

		if (query === '') {
			results = null;
			loading = false;
			return;
		}

		loading = true;

		const abortController = (currentAbortController = new AbortController());
		try {
			const endpoint = 'https://rapid-class-finder-api.blinn.center/';
			const params = new URLSearchParams({
				q: query,
				limit: `${limit}`
			});
			const url = `${endpoint}?${params}`;
			console.log(url);

			const response = await fetch(url, { signal: abortController.signal });
			const data = await response.json();
			if (data.error) {
				loading = false;
				error = data.error;
			} else {
				loading = false;
				error = null;
				results = data.data.courses;
			}
		} catch (e) {
			if (!abortController.signal.aborted) {
				loading = false;
				error = 'An internal error occurred.';
				console.error('An internal error occurred.', e);
			}
		}
	}

	$: loadResults(query, limit);

	const fields = [
		'name',
		'method',
		'crn',
		'subject',
		'course_number',
		'section',
		'associated_term',
		'registration_start',
		'registration_end',
		'levels',
		'campus',
		'schedule_type',
		'full_method',
		'credits',
		'catalog_entry_link'
	];
</script>

<TextInput
	labelText="Search query"
	placeholder={'"Calculus I" campus:Brenham associated_term:"Fall 2022"'}
	bind:value={query}
/>
<div class="accordion">
	<Accordion>
		<AccordionItem title="Advanced settings">
			<Slider labelText="Limit" bind:value={limit} min={1} max={100} />
		</AccordionItem>
		<AccordionItem title="Example queries">
			<MarkdownParagraph>Click a query to instantly search it!</MarkdownParagraph>
			{#each examples as example}
				<Example
					description={example.description}
					query={example.query}
					on:use={(e) => (query = e.detail)}
				/>
			{/each}
		</AccordionItem>
		<AccordionItem title="Available fields">
			<MarkdownParagraph>You can use the following fields in your queries:</MarkdownParagraph>
			<MarkdownUnorderedList>
				{#each fields as field}
					<ListItem><code>{field}</code></ListItem>
				{/each}
			</MarkdownUnorderedList>
		</AccordionItem>
	</Accordion>
</div>
{#if error}
	<InlineNotification
		kind="error"
		title="Query error:"
		subtitle={error}
		on:close={(e) => {
			e.preventDefault();
			error = null;
		}}
	/>
{/if}
{#if results}
	<div class="result-count">
		Found {results.length} classes!
	</div>
	<div class="results">
		{#each results as cls}
			{#if cls.catalog_entry_link}
				<ClickableTile href={cls.catalog_entry_link} target="_blank" class="class-tile" light>
					<ClassTile {cls} />
				</ClickableTile>
			{:else}
				<Tile class="class-tile" light>
					<ClassTile {cls} />
				</Tile>
			{/if}
		{/each}
	</div>
{:else if loading}
	<div class="loading">
		<InlineLoading description="Finding your classes..." />
	</div>
{/if}

<style>
	.loading {
		margin-top: 1rem;
	}

	.results :global(.class-tile) {
		margin: 0.5rem 0;
		width: 100%;
	}

	.result-count {
		width: 100%;
		text-align: center;
	}

	.accordion {
		margin: 1rem 0;
	}
</style>
