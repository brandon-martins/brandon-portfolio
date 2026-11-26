import type { EnquiryOption, EnquiryType } from './types';

// The three kinds of enquiry: the pill label in the form, plus the heading and intro shown beside it.
// The location and reply-time sentences are added by the component from siteConfig, so each is stated once.
export const enquiryOptions: EnquiryOption[] = [
	{
		id: 'job',
		label: 'Job opportunity',
		title: 'Let’s talk about a role.',
		blurb: 'Tell me about the position and the team.',
	},
	{
		id: 'project',
		label: 'Project enquiry',
		title: 'Tell me about your project.',
		blurb: 'Share the scope, budget and timeline.',
	},
	{
		id: 'other',
		label: 'Something else',
		title: 'Say hello.',
		blurb: 'A role, a project or just a question: send it through.',
	},
];

export const getEnquiry = (id: EnquiryType): EnquiryOption =>
	enquiryOptions.find((o) => o.id === id) ?? enquiryOptions[0];
