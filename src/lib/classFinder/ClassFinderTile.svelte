<script lang="ts">
	import MarkdownParagraph from '$lib/MarkdownParagraph.svelte';
	import { TextInput, Tile } from 'carbon-components-svelte';
</script>

<Tile>
	<h2>Rapid Class Finder</h2>
	<div class="description">
		<MarkdownParagraph>
			Find the class and section you're looking for in the blink of an eye!
		</MarkdownParagraph>
		<MarkdownParagraph>
			Coming soon, pending finding a good way to scrape/aggregate the data
		</MarkdownParagraph>
	</div>
	<TextInput
		labelText="Search query"
		placeholder={'Calculus @campus:Brenham @semester:"Fall 2022"'}
		disabled
	/>
</Tile>

<style>
	.description {
		padding-bottom: 2rem;
	}
</style>
