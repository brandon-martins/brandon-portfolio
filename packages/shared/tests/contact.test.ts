// The schema is the contract between client and server, so its rules are tested here, once.
import { describe, expect, it } from 'vitest';
import { contactSchema } from '../src/index.js';

const common = {
	name: 'Jane Recruiter',
	email: 'jane@example.com',
	message: 'We have a senior role for you.',
	consent: true,
};
const job = {
	...common,
	type: 'job',
	fields: { role: 'Senior engineer', company: 'Acme' },
};

describe('contactSchema', () => {
	it('accepts a valid job enquiry and trims whitespace', () => {
		const r = contactSchema.safeParse({ ...job, name: '  Jane Recruiter  ' });
		expect(r.success).toBe(true);
		if (r.success) expect(r.data.name).toBe('Jane Recruiter');
	});

	it('accepts a project enquiry and a free-form "other" message with no fields', () => {
		expect(
			contactSchema.safeParse({
				...common,
				type: 'project',
				fields: { scope: 'A booking platform' },
			}).success,
		).toBe(true);
		expect(contactSchema.safeParse({ ...common, type: 'other' }).success).toBe(true);
	});

	it('requires the fields that belong to the chosen type', () => {
		expect(
			contactSchema.safeParse({
				...common,
				type: 'job',
				fields: { role: 'Dev' },
			}).success,
		).toBe(false);
		expect(contactSchema.safeParse({ ...common, type: 'project', fields: {} }).success).toBe(false);
	});

	it('rejects a bad email, a short message and missing consent, with visitor-friendly messages', () => {
		const msg = (patch: object) => {
			const r = contactSchema.safeParse({ ...job, ...patch });
			return r.success ? null : r.error.issues[0]?.message;
		};
		expect(msg({ email: 'nope' })).toBe('Enter a valid email address.');
		expect(msg({ message: 'short' })).toMatch(/at least 10/);
		expect(msg({ consent: false })).toMatch(/privacy notice/);
	});

	it('lets a filled honeypot through, so the server can answer with a silent success', () => {
		expect(contactSchema.safeParse({ ...job, website: 'http://spam.example' }).success).toBe(true);
	});
});
