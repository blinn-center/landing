import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
import { optimizeImports } from 'carbon-preprocess-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		optimizeImports(),
		mdsvex({
			extensions: ['.md'],
			layout: './src/lib/MarkdownLayout.svelte'
		})
	],

	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter()
	}
};

export default config;
