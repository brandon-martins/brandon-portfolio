import { describe, expect, it } from 'vitest';
import { RESPONSE_TIME } from '../src/index.js';

describe('RESPONSE_TIME', () => {
	it('promises one business day, in words, with no range', () => {
		expect(RESPONSE_TIME).toBe('one business day');
		expect(RESPONSE_TIME).not.toMatch(/\d/);
	});
});
