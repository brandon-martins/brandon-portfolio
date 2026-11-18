// Limits public form submissions per IP to curb spam (5 per hour). Needs `trust proxy` in app.ts when deployed.
import rateLimit from 'express-rate-limit';

export const contactLimiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	limit: 5,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	message: {
		message: 'Too many messages from this connection. Please try again later or email me directly.',
	},
});
