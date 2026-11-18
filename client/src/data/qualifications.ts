import type { Qualification } from './types';

// Degree and certifications. A degree can link to its capstone project via `capstoneSlug`.
export const qualifications: Qualification[] = [
	{
		id: 'degree',
		kind: 'Degree',
		title: '[Degree or diploma title]',
		issuer: '[Institution]',
		year: '[Year]',
		capstoneSlug: 'capstone-placeholder',
	},
	{
		id: 'cert-1',
		kind: 'Certification',
		title: '[Certification title]',
		issuer: '[Issuer]',
		year: '[Year]',
		credentialUrl: '#',
	},
	{
		id: 'cert-2',
		kind: 'Certification',
		title: '[Certification title]',
		issuer: '[Issuer]',
		year: '[Year]',
		credentialUrl: '#',
	},
];
