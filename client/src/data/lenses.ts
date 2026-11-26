import type { Lens } from './types';

// Every lens lists all six sections, only in a different order (data.test.ts enforces this): the lens re-ranks,
// it never hides. Every section appears in every view, only the order changes.
export const lenses: Lens[] = [
	{
		id: 'hire',
		label: 'Hire Brandon',
		short: 'Hiring',
		description: 'Experience, qualifications and capstones first.',
		note: 'Showing the hiring view: experience, qualifications and capstones first.',
		cta: { label: 'Download CV', href: '/cv.pdf' },
		enquiry: 'job',
		order: ['exp', 'qual', 'proj', 'skills', 'proc', 'test'],
	},
	{
		id: 'client',
		label: 'Start a project',
		short: 'Project',
		description: 'Webify work, outcomes and how a project runs.',
		note: 'Showing the client view: selected work, testimonials and process first.',
		cta: { label: 'Start a project', href: '#contact' },
		enquiry: 'project',
		order: ['proj', 'test', 'proc', 'skills', 'exp', 'qual'],
	},
	{
		id: 'look',
		label: 'Just look around',
		short: 'Explore',
		description: 'A balanced tour of everything.',
		note: 'Showing the explore view: a balanced order of work, experience and skills.',
		cta: { label: 'See the work', href: '#projects' },
		enquiry: 'other',
		order: ['proj', 'exp', 'skills', 'qual', 'proc', 'test'],
	},
];

// Hiring first: recruiters are the primary audience, and this is the order that gets pre-rendered into the static HTML.
export const defaultLens = lenses[0];
