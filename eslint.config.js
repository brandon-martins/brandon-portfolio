// One flat config for the whole workspace: TypeScript rules everywhere, React hooks rules for the client,
// Node globals for the server and build scripts. Run from the repo root with `npm run lint`.
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['**/dist', '**/node_modules', '**/.vite-react-ssg-temp'] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['client/**/*.{ts,tsx}'],
		languageOptions: { globals: globals.browser },
		plugins: { 'react-hooks': reactHooks },
		rules: {
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		},
	},
	{
		files: ['server/**/*.ts', 'client/scripts/**/*.mjs', 'client/vite.config.ts'],
		languageOptions: { globals: globals.node },
	},
);
