// Maps the lens's short section ids to the DOM anchors used by the nav, hash links and section numbering.
import type { SectionId } from '../data';

export const sectionAnchors: Record<SectionId, string> = {
	exp: 'experience',
	qual: 'qualifications',
	proj: 'projects',
	skills: 'skills',
	proc: 'process',
	test: 'testimonials',
};
// "2024 — Present" (a null end means the role is current).
export const formatRange = (start: string, end: string | null) => `${start} — ${end ?? 'Present'}`;
