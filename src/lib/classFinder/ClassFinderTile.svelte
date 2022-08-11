<script lang="ts">
	import { TextInput, Tile } from 'carbon-components-svelte';
</script>

<Tile>
	<h2>Rapid Class Finder</h2>
	<div class="description">
		<p>Find the class and section you're looking for in the blink of an eye!</p>
		<p>Coming soon... hopefully</p>
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
