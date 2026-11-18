// Vite + React + Tailwind. `ssgOptions` configures vite-react-ssg's static pre-rendering at build time.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
	// In dev, /api calls go to the Express server on :4000, so the browser never makes a cross-origin request (no CORS setup needed).
	server: { proxy: { '/api': 'http://localhost:4000' } },
	ssgOptions: {
		script: 'async',
		formatting: 'none',
		dirStyle: 'nested', // /projects/x → projects/x/index.html, which works on any static host
	},
});
