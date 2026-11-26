import type { Qualification } from './types';

// Degree and certifications. A degree can link to its capstone project via `capstoneSlug`.
// Certifications and courses are listed newest first, which is also the order the carousel shows them in. `kind` says
// which each is. Add `credentialUrl` to an entry to show a "Verify credential" link on its card. Only add a link that
// anyone can open to confirm the credential (an issuer's or badge platform's public page); leave it out for entries with
// none, such as internal training. It must be an https URL (a test checks this).
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
		id: 'aws-security',
		kind: 'Certification',
		title: 'AWS Computer Foundations: Security',
		issuer: 'Amazon Web Services',
		year: '2025',
	},
	{
		id: 'aws-storage-databases',
		kind: 'Certification',
		title: 'AWS Computer Foundations: Storage & Databases',
		issuer: 'Amazon Web Services',
		year: '2025',
	},
	{
		id: 'aws-networking',
		kind: 'Certification',
		title: 'AWS Computer Foundations: Networking',
		issuer: 'Amazon Web Services',
		year: '2025',
	},
	{
		id: 'netflix-clone-react',
		kind: 'Course',
		title: 'Netflix Clone: React JS',
		issuer: 'Eudonix',
		year: '2022',
	},
	{
		id: 'javascript-developer',
		kind: 'Certification',
		title: 'JavaScript Developer Certificate',
		issuer: 'SoloLearn',
		year: '2017',
	},
	{
		id: 'java-fundamentals',
		kind: 'Certification',
		title: 'Java Programming Fundamentals',
		issuer: 'Standard Bank Training',
		year: '2014',
	},
	{
		id: 'unix-linux',
		kind: 'Certification',
		title: 'UNIX/LINUX Fundamentals',
		issuer: 'Standard Bank Training',
		year: '2014',
	},
	{
		id: 'visual-csharp',
		kind: 'Certification',
		title: 'Visual C# Fundamentals',
		issuer: 'Standard Bank Training',
		year: '2013',
	},
	{
		id: 'cobol',
		kind: 'Certification',
		title: 'COBOL Programming',
		issuer: 'Standard Bank Training',
		year: '2013',
	},
	{
		id: 'java-se7-fundamentals',
		kind: 'Certification',
		title: 'Java SE 7 Fundamentals (Ed 2)',
		issuer: 'Oracle / Standard Bank',
		year: '2012',
	},
	{
		id: 'java-se7-programming',
		kind: 'Certification',
		title: 'Java SE 7 Programming (Ed 2)',
		issuer: 'Oracle / Standard Bank',
		year: '2012',
	},
	{
		id: 'db2-sql',
		kind: 'Certification',
		title: 'DB2 SQL Fundamentals & Application',
		issuer: 'Standard Bank Training',
		year: '2012',
	},
	{
		id: 'java-ee-programming',
		kind: 'Course',
		title: 'Java EE Programming',
		issuer: 'Standard Bank Training',
		year: '2012',
	},
	{
		id: 'java-se-fundamentals',
		kind: 'Course',
		title: 'Java SE Fundamentals',
		issuer: 'Standard Bank Training',
		year: '2012',
	},
	{
		id: 'jcl-mainframe',
		kind: 'Certification',
		title: 'Job Control Language (JCL) & Mainframe/MVS',
		issuer: 'Standard Bank Training',
		year: '2012',
	},
	{
		id: 'information-systems-engineering',
		kind: 'Certification',
		title: 'Information Systems Engineering',
		issuer: 'Computer Training Institute (CTI)',
		year: '2005',
	},
];
