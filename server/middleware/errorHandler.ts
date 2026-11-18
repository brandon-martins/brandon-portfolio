// Last-resort handler: log the real error on the server, but never leak details to the visitor.
import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	console.error(err);
	res.status(500).json({
		message: 'Something went wrong on my side. Please email me directly.',
	});
};
