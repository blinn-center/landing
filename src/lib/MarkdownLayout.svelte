<script context="module" lang="ts">
	import { ListItem } from 'carbon-components-svelte';
	import MarkdownUnorderedList from './MarkdownUnorderedList.svelte';
	import MarkdownParagraph from './MarkdownParagraph.svelte';
	import MarkdownLink from './MarkdownLink.svelte';
	export { MarkdownUnorderedList as ul, ListItem as li, MarkdownLink as a, MarkdownParagraph as p };
</script>

<slot />
