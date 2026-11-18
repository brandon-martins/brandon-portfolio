import { siteConfig } from './config';
import type { LegalDocument } from './types';

// The text of the Privacy Notice (POPIA) and the website Terms. It is written to match what the site and API actually do
// (see server/controllers/contactController.ts), so change this file whenever that behaviour changes.
// Not legal advice: have both reviewed before launch, and confirm the TODO items below.
const email = siteConfig.email;
const UPDATED = '15 November 2026';

export const privacyNotice: LegalDocument = {
	title: 'Privacy Notice (POPIA)',
	description:
		'How personal information submitted through this website is collected, used and protected, under the Protection of Personal Information Act (POPIA).',
	updated: UPDATED,
	intro:
		'This notice explains what personal information this website collects, why, who sees it and what your rights are under the Protection of Personal Information Act 4 of 2013 (POPIA). It is short because the site collects very little.',
	sections: [
		{
			heading: 'Who is responsible',
			paragraphs: [
				`The responsible party is Brandon Martins, Johannesburg, South Africa. For anything about your information, email [${email}](mailto:${email}).`,
			],
		},
		{
			heading: 'What I collect, and why',
			paragraphs: [
				'The only way you give me personal information on this site is the contact form. When you send it, I collect:',
			],
			items: [
				'Your name and email address, so I can reply to you.',
				'Your enquiry type and the extra details you choose to add (for a job: role, company, location, how you found me; for a project: scope, budget, timeline), so I can understand and answer your enquiry.',
				'Your message.',
				'A salted, one-way hash of your IP address, to spot and block spam and abuse. It cannot be turned back into your IP address.',
				'The date and time of the submission, recorded automatically.',
			],
		},
		{
			heading: 'How I use it',
			paragraphs: [
				'I use your information only to respond to your enquiry and, if it leads somewhere, to follow it up. I do not use it for marketing, add you to any mailing list, sell it, or share it for advertising.',
				'I only store a message if you tick the consent box on the form. You do not have to send me anything, but I cannot reply without your name, email address and message.',
			],
		},
		{
			heading: 'Spam protection',
			paragraphs: [
				'The form is protected by Cloudflare Turnstile, which checks that a person (not a bot) is submitting it. To do this Cloudflare receives technical information from your browser, including your IP address, and its own privacy policy applies to that. Your IP address is also used briefly to limit how often the form can be submitted.',
			],
		},
		{
			heading: 'Who else sees it',
			paragraphs: [
				'Service providers process your information on my behalf, only to run this site: an email delivery service (to notify me of your message and to send you an acknowledgement), the database that stores your message, the website host, and Cloudflare (above). I do not give your information to anyone else unless the law requires it.',
				'Some of these providers may process information outside South Africa. Where that happens I choose providers that protect personal information to a standard comparable to POPIA.', // TODO: confirm the providers actually used
			],
		},
		{
			heading: 'Cookies and local storage',
			paragraphs: [
				'This site does not use advertising or tracking cookies. It remembers your theme (light or dark) and your chosen view in your browser\u2019s local storage. That stays on your device, and you can clear it in your browser settings at any time.',
			],
		},
		{
			heading: 'How long I keep it',
			paragraphs: [
				'I keep a message for as long as I need it to deal with your enquiry, and for a reasonable time afterwards, then delete it. You can ask me to delete yours sooner at any time.', // TODO: decide a fixed retention period
			],
		},
		{
			heading: 'How I protect it',
			paragraphs: [
				'The site is served over HTTPS, so your message is encrypted on its way to me. Messages are stored in an access-controlled database, IP addresses are only ever stored as hashes, and the form is rate-limited and spam-checked.',
			],
		},
		{
			heading: 'Your rights',
			paragraphs: ['Under POPIA you can:'],
			items: [
				'ask whether I hold personal information about you, and ask for a copy;',
				'ask me to correct or delete it;',
				'object to me processing it, or withdraw your consent (this does not affect anything I did while you had consented).',
			],
		},
		{
			heading: 'Complaints',
			paragraphs: [
				`Email [${email}](mailto:${email}) to use any of these rights, and I will respond within a reasonable time. If you are unhappy with how I handle your information, you can complain to the Information Regulator (South Africa) at [inforegulator.org.za](https://inforegulator.org.za).`,
			],
		},
		{
			heading: 'Changes',
			paragraphs: [
				'If this notice changes, the date at the top will change with it. See also the [Terms of use](/terms).',
			],
		},
	],
};

export const termsOfUse: LegalDocument = {
	title: 'Terms of use',
	description:
		'The terms for using this website: content, intellectual property, acceptable use and liability.',
	updated: UPDATED,
	intro:
		'These terms apply to your use of this website, the personal portfolio of Brandon Martins. By using the site you agree to them. If you do not agree, please do not use it.',
	sections: [
		{
			heading: 'About this site',
			paragraphs: [
				'The site presents my professional experience, qualifications and projects. It is provided for general information. I take reasonable care to keep it accurate and up to date, but I do not guarantee that it is complete, error-free or always available. Some project details are simplified or left out for confidentiality.',
			],
		},
		{
			heading: 'Intellectual property',
			paragraphs: [
				'Unless stated otherwise, the design, code, text and case-study write-ups on this site belong to Brandon Martins. You may view the site and share links to it. Please do not copy, republish or present my work as your own without my written permission.',
				'Names, logos and project materials belonging to clients, employers or institutions are shown for identification and remain theirs. Third-party trademarks (such as GitHub and LinkedIn) belong to their owners and appear only to link to those services. The site uses open-source software under the licences of its authors.',
			],
		},
		{
			heading: 'Using the contact form',
			paragraphs: ['Please use the form for genuine enquiries. Do not:'],
			items: [
				'send unlawful, abusive, misleading or unsolicited commercial messages;',
				'upload or send malware, or try to probe, overload or break the site or its API;',
				'bypass or interfere with the spam checks and rate limits.',
			],
		},
		{
			heading: 'No engagement until agreed in writing',
			paragraphs: [
				'Sending a message, booking a call or discussing a role or project does not create an employment, client or contractual relationship. Any work is only agreed in a separate written agreement.',
			],
		},
		{
			heading: 'Links to other sites',
			paragraphs: [
				'The site links to third-party websites. I do not control them and am not responsible for their content or privacy practices.',
			],
		},
		{
			heading: 'Liability',
			paragraphs: [
				'To the extent the law allows, I am not liable for any loss arising from using this site, being unable to use it, or relying on its content. Nothing in these terms excludes any liability that cannot be excluded by law.',
			],
		},
		{
			heading: 'Privacy',
			paragraphs: [
				'How personal information is handled is explained in the [Privacy Notice (POPIA)](/privacy).',
			],
		},
		{
			heading: 'Changes and governing law',
			paragraphs: [
				'I may update these terms, and the date at the top will change when I do; continuing to use the site means you accept the updated terms. These terms are governed by the laws of the Republic of South Africa, and the South African courts have jurisdiction.',
				`Questions about these terms: [${email}](mailto:${email}).`,
			],
		},
	],
};
