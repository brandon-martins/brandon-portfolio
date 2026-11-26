// Sends the owner notification and the visitor acknowledgement. Without SMTP settings (local dev) it only logs,
// so the form can be developed without an email account.
import nodemailer from 'nodemailer';
import { env } from '../configs/env.js';
import type { ContactPayload } from '@portfolio/shared';
import { acknowledgementText } from './acknowledgement.js';

const transporter = env.SMTP_HOST
	? nodemailer.createTransport({
			host: env.SMTP_HOST,
			port: env.SMTP_PORT,
			secure: env.SMTP_PORT === 465,
			auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
		})
	: null;

const from = env.SMTP_FROM ?? env.CONTACT_TO_EMAIL;

export async function sendContactEmails(input: ContactPayload): Promise<void> {
	if (!transporter) {
		console.log(`[mail] SMTP not configured — skipped emails for ${input.email}`);
		return;
	}
	const details = Object.entries(input.fields ?? {})
		.map(([k, v]) => `${k}: ${v}`)
		.join('\n');
	// replyTo on the owner email means hitting Reply goes straight to the visitor.
	await Promise.all([
		transporter.sendMail({
			from,
			to: env.CONTACT_TO_EMAIL,
			replyTo: input.email,
			subject: `[Portfolio] ${input.type} from ${input.name}`,
			text: `${input.name} <${input.email}>\n\n${details}\n\n${input.message}`,
		}),
		transporter.sendMail({
			from,
			to: input.email,
			subject: 'Thanks — I got your message',
			text: acknowledgementText(input.name),
		}),
	]);
}
