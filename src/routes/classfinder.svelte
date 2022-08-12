<script>
	import ClassFinder from '$lib/classFinder/ClassFinder.svelte';
	import MarkdownParagraph from '$lib/MarkdownParagraph.svelte';
	import { Link } from 'carbon-components-svelte';
</script>

<h1>Rapid Class Finder</h1>
<div class="description">
	<MarkdownParagraph>
		Find the class and section you're looking for in the blink of an eye!
	</MarkdownParagraph>
	<MarkdownParagraph>
		The data that goes into this isn't very clean, if you have better data on Blinn class schedules,
		<Link size="lg" href="mailto:contact@blinn.center">let us know</Link>!
	</MarkdownParagraph>
</div>

<ClassFinder />
