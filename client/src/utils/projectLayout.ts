// How many projects the home page features. Five fills the large-screen layout below: two wide cards, then three.
export const HOME_PROJECT_LIMIT = 5;

/** The projects the home page shows: the first few of whatever the filter leaves. The rest are on /projects. */
export const homeProjects = <T>(results: T[]): T[] => results.slice(0, HOME_PROJECT_LIMIT);

// Column spans of a project card, given how many cards are shown. The grid is 1 column on phones, 2 from `md` and 6 from
// `lg`, and a filter can change the count, so every count must still fill whole rows at both widths:
//   lg (6 cols): 5 cards -> 3+3, then 2+2+2 (the designed layout)   4 -> 3+3, 3+3   3 -> 2+2+2   2 -> 3+3   1 -> 6
//   md (2 cols): an odd count lets the last card span both columns instead of leaving a hole.
// Full class names (not built from fragments) so Tailwind can see them.
export function projectSpan(count: number, index: number): string {
	const md = count % 2 === 1 && index === count - 1 ? 'md:col-span-2' : '';
	let lg = 'lg:col-span-3';
	if (count >= 5) lg = index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
	else if (count === 3) lg = 'lg:col-span-2';
	else if (count === 1) lg = 'lg:col-span-6';
	return `${md} ${lg}`.trim();
}
