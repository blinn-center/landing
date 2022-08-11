export type TagType =
	| 'red'
	| 'magenta'
	| 'purple'
	| 'blue'
	| 'cyan'
	| 'teal'
	| 'green'
	| 'gray'
	| 'cool-gray'
	| 'warm-gray'
	| 'high-contrast'
	| 'outline'
	| null;

export interface PreviewEventTag {
	type: TagType;
	text: string;
}

export interface PreviewEvent {
	id: string;
	event: string;
	date: string;
	tags: PreviewEventTag[];
}
