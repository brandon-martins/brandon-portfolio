// Handles POST /api/contact after validation and rate limiting have already run.
import { createHash } from 'node:crypto';
import type { RequestHandler } from 'express';
import { env } from '../configs/env.js';
import ContactMessage from '../models/ContactMessage.js';
import type { ContactPayload } from '@portfolio/shared';
import { sendContactEmails } from '../services/mail.js';
import { verifyTurnstile } from '../services/turnstile.js';

// Stores a salted hash instead of the raw IP (POPIA data minimisation): enough to spot abuse, not to identify a visitor.
const hashIp = (ip = 'unknown') =>
	createHash('sha256')
		.update(ip + env.IP_HASH_SALT)
		.digest('hex');

export const createContact: RequestHandler = async (req, res, next) => {
	try {
		const input = req.body as ContactPayload;

		// Honeypot: pretend success so bots learn nothing, but store and send nothing.
		if (input.website) {
			res.status(201).json({ ok: true });
			return;
		}

		// Human check. Skipped automatically when no secret is configured (local dev).
		if (!(await verifyTurnstile(input.turnstileToken, req.ip))) {
			res.status(400).json({ message: 'Spam check failed. Please reload and try again.' });
			return;
		}

		// Save first, email second: the database is the source of truth, email is best-effort.
		await ContactMessage.create({
			name: input.name,
			email: input.email,
			type: input.type,
			fields: input.fields ?? {},
			message: input.message,
			ipHash: hashIp(req.ip),
		});

		// The message is already stored, so an email failure must not fail the request.
		sendContactEmails(input).catch((err) => console.error('[mail] failed', err));

		res.status(201).json({ ok: true });
	} catch (err) {
		next(err); // anything unexpected goes to the central error handler
	}
};
