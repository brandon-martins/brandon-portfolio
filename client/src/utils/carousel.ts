// Which cards of a horizontal scroller are fully in view. Pure (numbers in, numbers out) so it can be tested without a
// browser; the carousel feeds it each card's offsetLeft/offsetWidth and the scroller's scrollLeft/clientWidth.
export interface CardBox {
	left: number;
	width: number;
}

/** First and last fully visible card index, or null when none is (e.g. a card wider than the view). */
export function visibleRange(
	cards: CardBox[],
	scrollLeft: number,
	viewWidth: number,
	tolerance = 8,
): [number, number] | null {
	const right = scrollLeft + viewWidth;
	let first = -1;
	let last = -1;
	cards.forEach((c, i) => {
		if (c.left >= scrollLeft - tolerance && c.left + c.width <= right + tolerance) {
			if (first < 0) first = i;
			last = i;
		}
	});
	return first < 0 ? null : [first, last];
}
