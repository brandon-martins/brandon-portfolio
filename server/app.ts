import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './configs/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import contactRouter from './routes/contactRoutes.js';

// Builds the Express app without starting a server. Kept separate from server.ts (connect + listen)
// so Supertest can import it in tests without opening a port or touching the database.
export function createApp() {
	const app = express();
	app.set('trust proxy', 1); // behind a host's proxy, so rate limiting sees the visitor's IP, not the proxy's
	app.use(helmet()); // sensible security headers by default
	app.use(cors({ origin: env.CLIENT_ORIGIN })); // only the portfolio site may call this API from a browser
	app.use(express.json({ limit: '20kb' })); // a contact form never needs more; blocks oversized payloads

	// Uptime check for the host / monitoring.
	app.get('/api/health', (_req, res) => {
		res.json({ ok: true });
	});
	app.use('/api/contact', contactRouter);

	// Order matters: unknown routes fall through to the 404, and the error handler must come last.
	app.use((_req, res) => {
		res.status(404).json({ message: 'Not found.' });
	});
	app.use(errorHandler);
	return app;
}
