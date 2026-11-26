import { describe, expect, it } from 'vitest';
import { RESPONSE_TIME } from '@portfolio/shared';
import { acknowledgementText } from '../services/acknowledgement.js';

describe('acknowledgementText', () => {
	it('states the shared reply time and addresses the visitor by name', () => {
		const text = acknowledgementText('Jane');
		expect(text).toContain('Hi Jane,');
		expect(text).toContain(`within ${RESPONSE_TIME}`);
	});
});
