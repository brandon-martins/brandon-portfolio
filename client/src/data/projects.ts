import type { Project } from './types';

// Placeholder case-study text until each project is written up.
const todo = '[To be written]';
const blankStudy = {
	context: todo,
	problem: todo,
	role: todo,
	approach: todo,
	outcome: todo,
	retrospective: todo,
};

export const projects: Project[] = [
	{
		slug: 'capstone-placeholder',
		title: '[Capstone project title]',
		type: 'Capstone',
		year: '[Year]',
		summary: '[Problem, approach and outcome in one line]',
		tech: ['[Tech]'],
		institution: '[Institution]',
		links: {},
		caseStudy: blankStudy,
	},
	{
		slug: 'propflow',
		title: 'PropFlow',
		type: 'Personal',
		year: '[Year]',
		summary:
			'South African property portal with WhatsApp enquiries, a bond calculator and ZAR formatting.',
		tech: ['MongoDB', 'Express', 'React', 'Node.js'],
		links: {},
		caseStudy: {
			...blankStudy,
			context: 'A full-stack MERN property portal built for the South African market.',
		},
	},
	{
		slug: 'maxipharma-website',
		title: 'MaxiPharma Laboratories',
		type: 'Client',
		year: '[Year]',
		summary:
			'Brand identity and multipage website for a pharmaceutical startup, including POPIA-compliant legal pages.',
		tech: ['React', 'Vite', 'Tailwind CSS'],
		links: {},
		caseStudy: {
			...blankStudy,
			context: 'Brand identity and website for MaxiPharma Laboratories.',
		},
	},
	{
		slug: 'webify-platform',
		title: 'Webify platform',
		type: 'Client',
		year: '2024',
		summary: 'Staff dashboard, client portal and billing platform with PayFast subscriptions.',
		tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
		links: {},
		caseStudy: {
			...blankStudy,
			context:
				'Internal multi-domain platform for Webify: staff workspace, client portal and billing.',
		},
	},
];

// Lookup helpers: getProject powers /projects/:slug, projectsUsing powers the skill → project counts.
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsUsing = (tech: string) => projects.filter((p) => p.tech.includes(tech));
