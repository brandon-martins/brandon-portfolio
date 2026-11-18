// Test-only environment values, so tests never depend on a real .env file or database.
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		env: {
			NODE_ENV: 'test',
			MONGODB_URI: 'mongodb://localhost:27017/portfolio-test',
			CLIENT_ORIGIN: 'http://localhost:5173',
			CONTACT_TO_EMAIL: 'owner@example.com',
			IP_HASH_SALT: 'test-salt',
		},
	},
});
