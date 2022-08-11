import type { PreviewEventTag } from './types';

export const TAGS: { search: string; tag: PreviewEventTag }[] = [
	{
		search: 'Spring',
		tag: {
			type: 'cyan',
			text: 'Spring'
		}
	},
	{
		search: 'Summer',
		tag: {
			type: 'blue',
			text: 'Summer'
		}
	},
	{
		search: 'Fall',
		tag: {
			type: 'teal',
			text: 'Fall'
		}
	},
	{
		search: 'Winter',
		tag: {
			type: 'warm-gray',
			text: 'Winter'
		}
	},
	{
		search: 'College Closed',
		tag: {
			type: 'high-contrast',
			text: 'Holiday'
		}
	},
	{
		search: 'Testing',
		tag: {
			type: 'cool-gray',
			text: 'Testing'
		}
	},
	{
		search: 'TAMU',
		tag: {
			type: 'maroon',
			text: 'A&M'
		}
	},
	{
		search: 'Dual Credit',
		tag: {
			type: 'green',
			text: 'Dual Credit'
		}
	},
	{
		search: 'Classes Begin',
		tag: {
			type: 'gray',
			text: 'Term Start'
		}
	},
	{
		search: 'Last Class Day',
		tag: {
			type: 'gray',
			text: 'Term End'
		}
	},
	{
		search: 'Final Exams',
		tag: {
			type: 'red',
			text: 'Finals'
		}
	},
	{
		search: 'Last Day to Receive',
		tag: {
			type: 'magenta',
			text: 'Refund Deadline'
		}
	},
	{
		search: 'Last Day to Drop',
		tag: {
			type: 'magenta',
			text: 'Drop Deadline'
		}
	},
	{
		search: 'Registration Opens',
		tag: {
			type: 'green',
			text: 'Registration'
		}
	},
	{
		search: 'Schedule will be visible to students',
		tag: {
			type: 'green',
			text: 'Schedule Release'
		}
	}
];
