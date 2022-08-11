<script>
	import { UnorderedList } from 'carbon-components-svelte';
	import { setContext } from 'svelte';
	import { WITHIN_LIST } from './markdown';

	setContext(WITHIN_LIST, true);
</script>

<UnorderedList class="markdown-unordered-list" {...$$restProps}><slot /></UnorderedList>

<style>
	:global(.markdown-unordered-list) {
		margin-left: 1.5rem;
	}
</style>
