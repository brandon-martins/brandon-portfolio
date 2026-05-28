export const personal = {
	name: 'Brandon Martins',
	title: 'Full Stack Developer',
	subtitle: 'Digital Solutions Founder',
	tagline:
		'Building robust digital products for South African businesses — from architecture to deployment.',
	location: 'Johannesburg, South Africa',
	phone: '061 580 3040',
	email: 'brandon.martins@webify.org.za',
	website: 'www.webify.org.za',
	company: 'Webify (Pty) Ltd',
	yearsExp: 15,
	available: true,
};

export const skills = {
	'Front-End': ['JavaScript', 'React', 'HTML5', 'CSS3', 'Progressive Web Apps'],
	'Back-End': ['Node.js', 'Express', 'Java', 'C#', 'PHP'],
	Databases: ['MySQL', 'MongoDB', 'DB2', 'SQL'],
	'Cloud & DevOps': ['AWS', 'Linux', 'cPanel', 'Git', 'cPanel Hosting'],
	'CMS & Platforms': ['WordPress', 'Custom CMS', 'E-commerce Platforms'],
	Other: ['SEO', 'Digital Marketing', 'IT Consulting', 'Agile / SDLC'],
};

export const experience = [
	{
		role: 'Founder & Full Stack Developer',
		company: 'Webify (Pty) Ltd',
		location: 'Johannesburg, South Africa',
		period: '2019 – Present',
		type: 'Full-time · Founder',
		highlights: [
			'Founded and operates Webify full-time, delivering web development, design, e-commerce, SEO, and digital marketing to South African SMEs.',
			'Designs and develops custom, responsive websites and PWAs using JavaScript, PHP, React, HTML5, CSS3, and MySQL.',
			'Manages full client lifecycle: requirements gathering, prototyping, development, deployment, and post-launch support.',
			'Builds and maintains multi-domain hosting environments, staging pipelines, and CMS-based platforms.',
			'Leads SEO strategy and digital marketing campaigns for clients across multiple sectors.',
			'Serves on the board of Maxipharma (pharmaceutical startup) as IT Director in a non-executive capacity.',
		],
	},
	{
		role: 'Full Stack Web Developer',
		company: 'Bridgeway Communications',
		location: 'Johannesburg',
		period: 'January 2019 – 2019',
		type: 'Contractor',
		highlights: [
			'Developed application solutions using JavaScript, PHP, SQL, and HTML to business specifications.',
			'Designed and delivered performance-driven, user-centric websites.',
			'Conducted code reviews, debugging, and iterative enhancements based on client feedback.',
		],
	},
	{
		role: 'Java Developer',
		company: 'Bridgeway Communications',
		location: 'Johannesburg',
		period: 'October 2014 – December 2018',
		type: 'Contractor',
		highlights: [
			'Participated in full SDLC: analysis, design, development, testing, and documentation.',
			'Developed robust Java code for End-User Computing Training applications.',
			'Recognised as subject matter expert for the DigiView platform.',
			'Maintained software documentation and contributed to requirements gathering.',
		],
	},
	{
		role: 'Senior System Software Engineer',
		company: 'Standard Bank — Group IT',
		location: 'Johannesburg',
		period: 'May 2012 – September 2014',
		type: 'Permanent',
		highlights: [
			'Designed and developed solutions for Mobile and Internet Banking channels.',
			'Served as subject matter expert for client-facing and internal teams.',
			'Collaborated with testing teams to resolve bugs, manage deployments, and apply security patches.',
			'Presented at daily production meetings to drive continuous improvement.',
		],
	},
	{
		role: 'Functional Application Specialist',
		company: 'Standard Bank — Group IT',
		location: 'Johannesburg',
		period: 'September 2011 – April 2012',
		type: 'Permanent',
		highlights: [
			'Executed regression, functional, and system testing for Credit applications.',
			'Liaised between IT infrastructure and business teams.',
			'Mentored and coached junior staff members.',
		],
	},
	{
		role: 'Accounting Team Leader',
		company: 'Standard Bank — Recoveries',
		location: 'Johannesburg',
		period: 'August 2010 – August 2011',
		type: 'Permanent',
		highlights: [
			'Managed a 15-person accounting team overseeing the full accounting cycle for Recoveries and Uncleared ledger accounts.',
			'Achieved 90% reduction in uncleared expense through process improvements.',
			'Created training protocols for new and senior staff.',
		],
	},
];

export const education = [
	{
		degree: 'Information Systems Engineering',
		grade: 'Credit',
		institution: 'Computer Training Institute (CTI)',
		year: '2005',
	},
	{
		degree: 'High School Diploma',
		grade: null,
		institution: 'Chris J Botha Senior Secondary School',
		year: '2004',
	},
];

export const certifications = [
	{
		name: 'AWS — Computer Foundations: Security',
		issuer: 'Amazon Web Services',
		year: '2025',
	},
	{
		name: 'AWS — Computer Foundations: Storage & Databases',
		issuer: 'Amazon Web Services',
		year: '2025',
	},
	{
		name: 'AWS — Computer Foundations: Networking',
		issuer: 'Amazon Web Services',
		year: '2025',
	},
	{ name: 'Netflix Clone — React JS', issuer: 'Eudonix', year: '2022' },
	{
		name: 'JavaScript Developer Certificate',
		issuer: 'SoloLearn',
		year: '2017',
	},
	{
		name: 'Java Programming Fundamentals',
		issuer: 'Standard Bank Training',
		year: '2014',
	},
	{
		name: 'UNIX/LINUX Fundamentals',
		issuer: 'Standard Bank Training',
		year: '2014',
	},
	{
		name: 'Visual C# Fundamentals',
		issuer: 'Standard Bank Training',
		year: '2013',
	},
	{ name: 'COBOL Programming', issuer: 'Standard Bank Training', year: '2013' },
	{
		name: 'Java SE 7 Fundamentals (Ed 2)',
		issuer: 'Oracle / Standard Bank',
		year: '2012',
	},
	{
		name: 'Java SE 7 Programming (Ed 2)',
		issuer: 'Oracle / Standard Bank',
		year: '2012',
	},
	{
		name: 'DB2 SQL Fundamentals & Application',
		issuer: 'Standard Bank Training',
		year: '2012',
	},
	{
		name: 'Java EE Programming, Java SE Fundamentals',
		issuer: 'Standard Bank Training',
		year: '2012',
	},
	{
		name: 'Job Control Language (JCL) & Mainframe/MVS',
		issuer: 'Standard Bank Training',
		year: '2012',
	},
	{ name: 'Information Systems Engineering', issuer: 'CTI', year: '2005' },
];

/**
 * Projects data
 *
 * Recommended count: 6–8 projects is the industry sweet spot for a senior
 * developer portfolio. Enough to show range across domains and tech stacks,
 * not so many that it dilutes impact. Prioritise quality over quantity —
 * each entry should demonstrate a different skill, sector, or problem.
 *
 * Fields:
 *   name        — project title
 *   description — 1–2 sentence summary; focus on the problem solved, not just the tech
 *   year        — delivery or completion year
 *   tags        — tech stack / domain tags (keep to 3–5 per project)
 *   url         — live site URL, or null if unavailable
 *   github      — public repo URL, or null if private/NDA
 *   status      — 'live' | 'nda' | 'internal' | 'archived'
 *                 Drives the link rendering in ProjectCard
 */
export const projects = [
	{
		name: 'Troops Security Services Website',
		description:
			'Corporate website for a security services firm — custom-built, responsive, and brand-aligned. Delivered full design-to-deployment including mobile optimisation and SEO setup.',
		year: '2021',
		tags: ['Web Development', 'UI Design', 'Responsive'],
		url: null,       // TODO: add live URL if still active e.g. 'https://troops.co.za'
		github: null,    // Client project — private repo
		status: 'nda',   // Mark as NDA so the card renders the appropriate badge
	},
	{
		name: 'DigiView NPO Registration & Login System',
		description:
			'Full-stack system for NGO/NPO registration management, built for Bridgeway Communications. Handles multi-role auth, document uploads, and admin review workflows.',
		year: '2021',
		tags: ['Full Stack', 'PHP', 'MySQL', 'Java'],
		url: null,
		github: null,
		status: 'internal',
	},
	{
		name: 'End-User Computer Training Module',
		description:
			'Java-based training application developed for enterprise use at Bridgeway Communications. Delivered interactive assessments and progress tracking for internal staff.',
		year: '2018',
		tags: ['Java', 'Enterprise', 'Training Tech'],
		url: null,
		github: null,
		status: 'internal',
	},
	{
		name: 'SBG Customer 1st Application',
		description:
			'Customer-centric banking application at Standard Bank Group, built for Mobile and Internet Banking channels. Worked across full SDLC from spec through to production deployment.',
		year: '2014',
		tags: ['Banking', 'Java', 'Mobile', 'Standard Bank'],
		url: null,
		github: null,
		status: 'nda',
	},
	// ─── ADD MORE PROJECTS BELOW ───────────────────────────────────────────────
	// Aim for 6–8 total. Good candidates to add:
	//   • A Webify client e-commerce build (shows commercial full-stack work)
	//   • A personal/open-source project (gives recruiters a GitHub link to click)
	//   • The Maxipharma IT infrastructure work (shows non-dev leadership)
	// Example shape:
	// {
	//   name: 'Webify Client E-commerce Store',
	//   description: 'WooCommerce-based store with custom PHP checkout and MySQL inventory.',
	//   year: '2023',
	//   tags: ['E-commerce', 'PHP', 'WordPress', 'MySQL'],
	//   url: 'https://example.co.za',
	//   github: null,
	//   status: 'live',
	// },
];

export const services = [
	{
		title: 'Web Development',
		desc: 'Custom-built, scalable, secure websites optimised for performance.',
	},
	{
		title: 'Web Design',
		desc: 'Creative, responsive designs that reflect your brand identity.',
	},
	{
		title: 'E-commerce Solutions',
		desc: 'Robust online stores driving sales and seamless shopping experiences.',
	},
	{
		title: 'SEO & Digital Marketing',
		desc: 'Strategies to improve online visibility and attract quality traffic.',
	},
	{
		title: 'Progressive Web Apps',
		desc: 'PWAs that deliver app-like experiences across all devices.',
	},
	{
		title: 'Maintenance & Support',
		desc: 'Ongoing support to keep your site current, secure, and running smoothly.',
	},
];
