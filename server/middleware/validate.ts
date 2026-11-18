// Wraps a zod schema as Express middleware. Rejects bad input with a 400 and the first error message;
// on success it replaces req.body with the parsed value, so controllers receive typed, trimmed data.
import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

export const validate =
	(schema: ZodType): RequestHandler =>
	(req, res, next) => {
		const result = schema.safeParse(req.body);
		if (!result.success) {
			res.status(400).json({
				message: result.error.issues[0]?.message ?? 'Invalid request.',
			});
			return;
		}
		req.body = result.data;
		next();
	};
