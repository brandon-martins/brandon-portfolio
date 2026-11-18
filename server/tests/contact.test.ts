// API tests with the database and mail service mocked, so they run fast and offline.
// Covers the happy path and every rejection: bad email, missing consent, honeypot, database failure.
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const create = vi.fn();
const sendContactEmails = vi.fn().mockResolvedValue(undefined);
vi.mock('../models/ContactMessage.js', () => ({ default: { create } }));
vi.mock('../services/mail.js', () => ({ sendContactEmails }));

const { createApp } = await import('../app.js');
const app = createApp();

const valid = {
	type: 'job',
	name: 'Jane Recruiter',
	email: 'jane@example.com',
	message: 'We have a senior role that suits you.',
	consent: true,
	fields: { role: 'Senior engineer', company: 'Acme' },
};

beforeEach(() => {
	create.mockReset();
	sendContactEmails.mockClear();
});

describe('POST /api/contact', () => {
	it('stores the message and sends emails for a valid submission', async () => {
		const res = await request(app).post('/api/contact').send(valid);
		expect(res.status).toBe(201);
		expect(create).toHaveBeenCalledOnce();
		expect(create.mock.calls[0][0]).not.toHaveProperty('ip');
		expect(create.mock.calls[0][0].ipHash).toMatch(/^[a-f0-9]{64}$/);
		expect(sendContactEmails).toHaveBeenCalledOnce();
	});

	it('rejects an invalid email with a 400 and stores nothing', async () => {
		const res = await request(app)
			.post('/api/contact')
			.send({ ...valid, email: 'nope' });
		expect(res.status).toBe(400);
		expect(create).not.toHaveBeenCalled();
	});

	it('rejects submissions without POPIA consent', async () => {
		const res = await request(app)
			.post('/api/contact')
			.send({ ...valid, consent: false });
		expect(res.status).toBe(400);
	});

	it('silently drops honeypot submissions', async () => {
		const res = await request(app)
			.post('/api/contact')
			.send({ ...valid, website: 'http://spam.example' });
		expect(res.status).toBe(201);
		expect(create).not.toHaveBeenCalled();
		expect(sendContactEmails).not.toHaveBeenCalled();
	});

	it('returns a clean 500 when the database fails', async () => {
		create.mockRejectedValueOnce(new Error('db down'));
		vi.spyOn(console, 'error').mockImplementation(() => {});
		const res = await request(app).post('/api/contact').send(valid);
		expect(res.status).toBe(500);
		expect(res.body.message).toMatch(/email me directly/i);
	});
});

describe('GET /api/health', () => {
	it('responds ok', async () => {
		const res = await request(app).get('/api/health');
		expect(res.body).toEqual({ ok: true });
	});
});
