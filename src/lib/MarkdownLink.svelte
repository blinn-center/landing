<script>
	import { Link } from 'carbon-components-svelte';
	import { getContext } from 'svelte';
	import { WITHIN_LIST } from './markdown';

	const size = getContext(WITHIN_LIST) ? undefined : 'lg';
</script>

<Link {size} {...$$restProps}><slot /></Link>
