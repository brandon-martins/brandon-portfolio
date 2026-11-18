// The only file that reads process.env. Everything else imports the typed, validated `env` object,
// so a missing or malformed variable stops the server at boot instead of failing mid-request.
import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
	PORT: z.coerce.number().default(4000),
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	MONGODB_URI: z.string().min(1),
	CLIENT_ORIGIN: z.string().url(),
	CONTACT_TO_EMAIL: z.string().email(),
	SMTP_HOST: z.string().optional(),
	SMTP_PORT: z.coerce.number().default(587),
	SMTP_USER: z.string().optional(),
	SMTP_PASS: z.string().optional(),
	SMTP_FROM: z.string().optional(),
	TURNSTILE_SECRET: z.string().optional(),
	IP_HASH_SALT: z.string().default('dev-salt'),
});

// Fail fast with a readable message rather than starting in a half-configured state.
const parsed = schema.safeParse(process.env);
if (!parsed.success) {
	console.error('Invalid environment:', z.prettifyError(parsed.error));
	process.exit(1);
}
// Production must have spam protection; development may skip it.
if (parsed.data.NODE_ENV === 'production' && !parsed.data.TURNSTILE_SECRET) {
	console.error('TURNSTILE_SECRET is required in production.');
	process.exit(1);
}

export const env = parsed.data;
