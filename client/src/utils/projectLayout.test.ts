// The home page grid must always produce full rows, whatever a filter leaves. Dummy counts stand in for real projects.
import { describe, expect, it } from 'vitest';
import { HOME_PROJECT_LIMIT, homeProjects, projectSpan } from './projectLayout';

// Reads the span a given breakpoint gives card `i`, falling back to the narrower breakpoint's span (CSS cascade).
const span = (count: number, i: number, bp: 'md' | 'lg', fallback: number) => {
	const m = projectSpan(count, i).match(new RegExp(`${bp}:col-span-(\\d)`));
	return m ? Number(m[1]) : fallback;
};

// Walks the cards in order and checks no row overshoots `cols` and the last row is exactly full.
function expectFullRows(spans: number[], cols: number, label: string) {
	let used = 0;
	for (const s of spans) {
		expect(used + s, `${label}: a card overshoots the row`).toBeLessThanOrEqual(cols);
		used = (used + s) % cols;
	}
	expect(used, `${label}: last row has a gap`).toBe(0);
}

describe('projectLayout', () => {
	it('features five projects: two wide cards, then three', () => {
		expect(HOME_PROJECT_LIMIT).toBe(5);
		expect(Array.from({ length: 5 }, (_, i) => span(5, i, 'lg', 1))).toEqual([3, 3, 2, 2, 2]);
	});

	it('caps the home page at the limit, for any number of filter results', () => {
		for (let n = 0; n <= 12; n++) {
			const dummy = Array.from({ length: n }, (_, i) => `p${i}`);
			expect(homeProjects(dummy)).toHaveLength(Math.min(n, HOME_PROJECT_LIMIT));
			expect(homeProjects(dummy)).toEqual(dummy.slice(0, HOME_PROJECT_LIMIT));
		}
	});

	it('fills every row on large screens (6 columns) for 1 to 5 shown', () => {
		for (let count = 1; count <= HOME_PROJECT_LIMIT; count++) {
			const spans = Array.from({ length: count }, (_, i) => span(count, i, 'lg', 1));
			expectFullRows(spans, 6, `lg, ${count} shown`);
		}
	});

	it('fills every row on medium screens (2 columns) for 1 to 5 shown', () => {
		for (let count = 1; count <= HOME_PROJECT_LIMIT; count++) {
			const spans = Array.from({ length: count }, (_, i) => span(count, i, 'md', 1));
			expectFullRows(spans, 2, `md, ${count} shown`);
		}
	});
});
