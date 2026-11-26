import { RESPONSE_TIME } from '@portfolio/shared';
import type { SiteConfig } from './types';

// Site-wide facts used by the header, hero, footer, contact section and CV page.
export const siteConfig: SiteConfig = {
	name: 'Brandon Martins',
	domain: 'brandonmartins.co.za',
	email: 'brandon.martins@webify.co.za',
	location: 'Johannesburg, South Africa',
	availability: { open: true, label: 'Open to opportunities · Johannesburg' },
	cvUrl: '/cv.pdf',
	// Falls back to the on-page contact form until a booking link (e.g. Cal.com) is configured.
	bookingUrl: import.meta.env.VITE_BOOKING_URL || '#contact',
	responseTime: RESPONSE_TIME, // shared with the server's acknowledgement email
	stats: { years: '15+', projects: '[##]' },
	social: [
		{
			label: 'GitHub',
			href: 'https://github.com/brandon-martins',
			icon: 'github',
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/',
			icon: 'linkedin',
		}, // TODO
		{
			label: 'Email',
			href: 'mailto:hello@brandonmartins.co.za',
			icon: 'email',
		},
		{ label: 'Webify', href: 'https://webify.org.za', icon: 'website' },
	],
};
