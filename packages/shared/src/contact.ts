// The contact form's contract, defined once and used on both sides:
//  - the client validates with it before sending (and shows the messages below to the visitor),
//  - the server validates with it again, because the server never trusts the client.
// Keeping one copy is the point of this package: the two schemas had already started to drift apart.
import { z } from 'zod';

const base = {
	name: z.string().trim().min(2, 'Enter your name.').max(120),
	email: z.string().trim().email('Enter a valid email address.').max(200),
	message: z.string().trim().min(10, 'Tell me a little more (at least 10 characters).').max(4000),
	// POPIA: storing anything requires explicit consent.
	consent: z.literal(true, {
		error: 'Please accept the privacy notice to continue.',
	}),
	// Honeypot: hidden from people. It is NOT rejected here on purpose, so a bot gets a silent "success" from the
	// server controller instead of a 400 telling it which field gave it away.
	website: z.string().optional(),
	turnstileToken: z.string().optional(),
};

// Discriminated on `type`, so each enquiry kind requires different extra fields.
export const contactSchema = z.discriminatedUnion('type', [
	z.object({
		...base,
		type: z.literal('job'),
		fields: z.object({
			role: z.string().trim().min(2, 'Enter the role.').max(120),
			company: z.string().trim().min(2, 'Enter the company.').max(120),
			location: z.string().trim().max(120).optional(),
			source: z.string().trim().max(200).optional(),
		}),
	}),
	z.object({
		...base,
		type: z.literal('project'),
		fields: z.object({
			scope: z.string().trim().min(5, 'Describe what you are building.').max(500),
			budget: z.string().trim().max(80).optional(),
			timeline: z.string().trim().max(80).optional(),
		}),
	}),
	z.object({
		...base,
		type: z.literal('other'),
		fields: z.object({}).optional(),
	}),
]);

/** The validated, trimmed shape of a contact submission. */
export type ContactPayload = z.infer<typeof contactSchema>;
