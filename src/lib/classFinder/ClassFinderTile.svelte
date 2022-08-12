<script lang="ts">
	import MarkdownParagraph from '$lib/MarkdownParagraph.svelte';
	import { Link, Tile } from 'carbon-components-svelte';
	import ClassFinder from './ClassFinder.svelte';
</script>

<Tile>
	<h2>Rapid Class Finder</h2>
	<div class="description">
		<MarkdownParagraph>
			Find the class and section you're looking for in the blink of an eye!
		</MarkdownParagraph>
		<MarkdownParagraph>
			The data that goes into this isn't very clean, if you have better data on Blinn class
			schedules, <Link size="lg" href="mailto:contact@blinn.center">let us know</Link>!
		</MarkdownParagraph>
	</div>
	<ClassFinder />
</Tile>

<style>
	.description {
		margin-bottom: 2rem;
	}
</style>
