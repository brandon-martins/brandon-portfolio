// Shared shapes for the content layer. Every file in `data/` is typed against these,
// so a missing field or a bad cross-reference fails at typecheck/test time, not in the browser.

export type LensId = 'hire' | 'client' | 'look';
export type ProjectType = 'Capstone' | 'Client' | 'Personal';
// Short ids used by lenses to order the home page sections (anchors live in utils/sections.ts).
export type SectionId = 'exp' | 'qual' | 'proj' | 'skills' | 'proc' | 'test';
export type EnquiryType = 'job' | 'project' | 'other';
// Keys the Footer maps to an icon, so this data file never has to import UI components.
export type SocialIcon = 'email' | 'linkedin' | 'github' | 'website';

// One entry per kind of enquiry. The contact panel's heading and intro follow the *selected* enquiry type, which the
// lens only pre-selects, so the copy can never contradict the form next to it.
export interface EnquiryOption {
	id: EnquiryType;
	label: string;
	title: string;
	blurb: string;
}

export interface SiteConfig {
	name: string;
	domain: string;
	email: string;
	location: string;
	availability: { open: boolean; label: string };
	cvUrl: string;
	bookingUrl: string;
	responseTime: string;
	stats: { years: string; projects: string };
	social: { label: string; href: string; icon: SocialIcon }[];
}

export interface Role {
	id: string;
	title: string;
	org: string;
	start: string;
	end: string | null; // null = present
	/** Short "Title, Company" label for the hero's "Currently" card. Only needed for current roles. */
	badge?: string;
	bullets: string[];
	tech: string[];
	projectSlugs: string[];
}

export interface CaseStudy {
	context: string;
	problem: string;
	role: string;
	approach: string;
	outcome: string;
	retrospective: string;
}

export interface Project {
	slug: string;
	title: string;
	type: ProjectType;
	year: string;
	summary: string;
	tech: string[];
	institution?: string;
	links: { live?: string; github?: string };
	caseStudy: CaseStudy;
}

export interface Qualification {
	id: string;
	kind: 'Degree' | 'Certification';
	title: string;
	issuer: string;
	year: string;
	credentialUrl?: string;
	capstoneSlug?: string;
}

// Legal pages (privacy notice, terms). Strings may contain [label](link) markdown-style links, rendered by LegalPage.
export interface LegalSection {
	heading: string;
	paragraphs?: string[];
	items?: string[];
}
export interface LegalDocument {
	title: string;
	description: string;
	updated: string;
	intro: string;
	sections: LegalSection[];
}

export interface SkillGroup {
	title: string;
	skills: string[];
}
export interface Testimonial {
	quote: string;
	name: string;
	role: string;
	company: string;
}
export interface ProcessStep {
	title: string;
	description: string;
}

// A "lens" is a visitor intent (hire / start a project / look around). It re-orders sections
// and swaps the main call-to-action; it never hides content (enforced by data.test.ts).
export interface Lens {
	id: LensId;
	label: string;
	/** One-word name shown in the header chip, e.g. "Lens: Hiring". */
	short: string;
	description: string;
	note: string;
	cta: { label: string; href: string };
	enquiry: EnquiryType;
	order: SectionId[];
}
