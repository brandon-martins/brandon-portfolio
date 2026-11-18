import type { ProcessStep, Testimonial } from './types';

// Real quotes only. Replace the placeholders before launch.
export const testimonials: Testimonial[] = [
	{
		quote: '[Testimonial from a client or colleague, one or two sentences.]',
		name: '[Name]',
		role: '[Role]',
		company: '[Company]',
	},
	{
		quote: '[Testimonial from a client or colleague, one or two sentences.]',
		name: '[Name]',
		role: '[Role]',
		company: '[Company]',
	},
];

// "How a project runs": shown mainly to the client lens, but present for every visitor.
export const processSteps: ProcessStep[] = [
	{ title: 'Discover', description: '[One-line description of this stage]' },
	{ title: 'Design', description: '[One-line description of this stage]' },
	{ title: 'Build', description: '[One-line description of this stage]' },
	{
		title: 'Launch & support',
		description: '[One-line description of this stage]',
	},
];
