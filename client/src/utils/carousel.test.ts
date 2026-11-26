import { describe, expect, it } from 'vitest';
import { visibleRange, type CardBox } from './carousel';

// Three cards per 600px view, 16px gaps, as in the certifications strip.
const cards: CardBox[] = Array.from({ length: 9 }, (_, i) => ({ left: i * 200, width: 184 }));

describe('visibleRange', () => {
	it('reports the first page as 0 to 2', () => {
		expect(visibleRange(cards, 0, 600)).toEqual([0, 2]);
	});

	it('follows the scroll position', () => {
		expect(visibleRange(cards, 600, 600)).toEqual([3, 5]);
	});

	it('ignores a card that is only partly in view', () => {
		expect(visibleRange(cards, 100, 600)).toEqual([1, 2]);
	});

	it('returns null when no card fits in the view', () => {
		expect(visibleRange(cards, 0, 100)).toBeNull();
		expect(visibleRange([], 0, 600)).toBeNull();
	});
});
