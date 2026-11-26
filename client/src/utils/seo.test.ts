import { describe, expect, it } from 'vitest';
import { pageTitle } from './seo';

describe('pageTitle', () => {
	it('joins the page and the site name with a pipe', () => {
		expect(pageTitle('Projects')).toBe('Projects | Brandon Martins');
	});
});
