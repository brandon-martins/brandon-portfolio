// Verifies a Cloudflare Turnstile token server-side. Fails closed: any error counts as a failed check.
import axios from 'axios';
import { env } from '../configs/env.js';

export async function verifyTurnstile(
	token: string | undefined,
	ip: string | undefined,
): Promise<boolean> {
	if (!env.TURNSTILE_SECRET) return true; // skipped in dev; enforced in production by env.ts
	if (!token) return false;
	try {
		const { data } = await axios.post<{ success: boolean }>(
			'https://challenges.cloudflare.com/turnstile/v0/siteverify',
			new URLSearchParams({
				secret: env.TURNSTILE_SECRET,
				response: token,
				...(ip ? { remoteip: ip } : {}),
			}),
			{ timeout: 5000 },
		);
		return data.success;
	} catch {
		return false;
	}
}
