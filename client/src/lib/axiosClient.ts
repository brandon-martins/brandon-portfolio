// The one axios instance for the API. Services import this; components never call axios directly.
import axios, { AxiosError } from 'axios';

const client = axios.create({
	// Empty in dev so requests hit the Vite /api proxy; set VITE_BACKEND_URL in production only.
	baseURL: import.meta.env.VITE_BACKEND_URL || '',
	timeout: 15000,
	headers: { 'Content-Type': 'application/json' },
});

// Unwrap `data` and turn failures into plain Error messages for the UI.
client.interceptors.response.use(
	(res) => res.data,
	(err: AxiosError<{ message?: string }>) => {
		const message =
			err.response?.data?.message ??
			(err.code === 'ECONNABORTED'
				? 'The request timed out.'
				: 'Something went wrong. Please try again.');
		return Promise.reject(new Error(message));
	},
);

export default client;
