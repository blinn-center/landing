export interface ExampleInfo {
	description: string;
	query: string;
}

export const examples: ExampleInfo[] = [
	{
		description: 'Just put together a query - the computer will figure it out!',
		query: 'Linear Algebra Fall 2022'
	},
	{
		description: 'Find that introductory Calculus class you need this fall in Brenham',
		query: '"Calculus I" campus:Brenham associated_term:"Fall 2022"'
	},
	{
		description: "Figure out all the different sections for a class you're thinking of taking",
		query: 'subject:PHIL course_number:1301 associated_term:"Fall 2022"'
	}
];
