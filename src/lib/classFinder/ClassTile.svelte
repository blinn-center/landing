<script lang="ts">
	import type { Course } from './types';

	export let cls: Course;

	function classSecondLine(cls: Course): string {
		const segments = [];
		if (cls.subject && cls.course_number) {
			segments.push(`${cls.subject} ${cls.course_number}`);
		}
		if (cls.section) {
			segments.push(`Section ${cls.section}`);
		}
		if (cls.associated_term) {
			segments.push(cls.associated_term);
		}
		if (cls.crn) {
			segments.push(`CRN ${cls.crn}`);
		}
		const nbsp = '\xa0';
		return segments.map((segment) => segment.replace(' ', nbsp)).join(' • ');
	}

	$: secondLine = classSecondLine(cls);
</script>

<p class="name">{cls.name}</p>
<p class="body">{secondLine}</p>
{#if cls.campus}
	<p class="body">{cls.campus.replace(/Campus Campus$/, 'Campus')}</p>
{/if}
{#if cls.full_method}
	<p class="body">{cls.full_method}</p>
{/if}

<style>
	.name {
		font-weight: 500;
	}

	.body {
		font-weight: 300;
		font-size: 14px;
	}
</style>
