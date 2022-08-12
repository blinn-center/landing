<script lang="ts">
	import MarkdownParagraph from '$lib/MarkdownParagraph.svelte';
	import { ClickableTile } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

	export let description: string;
	export let query: string;

	const dispatch = createEventDispatcher();

	function use() {
		dispatch('use', query);
	}
</script>

<div class="example">
	<ClickableTile light class="example-tile" on:click={use}>
		<MarkdownParagraph>{description}</MarkdownParagraph>
		<code>{query}</code>
	</ClickableTile>
</div>

<style>
	.example {
		margin: 0.5rem 0;
	}
	.example :global(.example-tile p) {
		font-size: 14px;
	}
	.example :global(.example-tile code) {
		padding: 5px 10px;
		display: block;
		width: 100%;
		font-size: 12px;
		text-align: center;
	}
</style>
