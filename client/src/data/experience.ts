import type { Role } from './types';

// Roles, newest first. `projectSlugs` must match slugs in projects.ts (checked by data.test.ts).
// TODO: replace bracketed placeholders with real, quantified impact bullets.
export const experience: Role[] = [
	{
		id: 'webify',
		title: 'Founder & Director',
		org: 'Webify Web Solutions (Pty) Ltd',
		start: '2024',
		end: null,
		badge: 'Founder, Webify Web Solutions',
		bullets: [
			'[Impact bullet: what changed, with a number]',
			'[Impact bullet: scope, team or clients served]',
		],
		tech: ['React', 'Node.js', 'MongoDB'],
		projectSlugs: ['webify-platform', 'maxipharma-website'],
	},
	{
		id: 'maxipharma',
		title: 'Non-Executive IT Director',
		org: 'MaxiPharma Laboratories',
		start: '[Year]',
		end: null,
		badge: 'Non-Exec IT Director, MaxiPharma',
		bullets: ['[Impact bullet: governance or technology direction]', '[Impact bullet: outcome]'],
		tech: ['[Domain]', '[Domain]'],
		projectSlugs: ['maxipharma-website'],
	},
	{
		id: 'standard-bank',
		title: 'Senior System Software Engineer',
		org: 'Standard Bank Group IT',
		start: '[Year]',
		end: '[Year]',
		bullets: ['[Impact bullet: scale or reliability]', '[Impact bullet: outcome]'],
		tech: ['Java', 'C#', '[Tech]'],
		projectSlugs: [],
	},
];
