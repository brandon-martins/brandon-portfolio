import { describe, expect, it } from 'vitest';
import { RESPONSE_TIME } from '@portfolio/shared';
import {
	enquiryOptions,
	experience,
	getEnquiry,
	lenses,
	privacyNotice,
	projects,
	qualifications,
	siteConfig,
	termsOfUse,
} from './index';

// Guards the cross-references between data files, which the type system can't check.
const slugs = new Set(projects.map((p) => p.slug));

describe('data layer integrity', () => {
	it('has unique project slugs', () => {
		expect(slugs.size).toBe(projects.length);
	});
	it('links every role to projects that exist', () => {
		for (const r of experience)
			for (const s of r.projectSlugs) expect(slugs.has(s), `${r.id} → ${s}`).toBe(true);
	});
	it('links every capstone qualification to a project that exists', () => {
		for (const q of qualifications)
			if (q.capstoneSlug) expect(slugs.has(q.capstoneSlug)).toBe(true);
	});
	it('gives every lens all six sections, so the lens never hides content', () => {
		for (const l of lenses)
			expect([...l.order].sort()).toEqual(['exp', 'proc', 'proj', 'qual', 'skills', 'test']);
	});

	// The legal pages are data, so malformed [label](link) syntax or a link to a page that doesn't exist would only show up
	// in the browser. The footer and the consent checkbox both point at /privacy, so it must exist.
	it('keeps the legal documents well-formed, with internal links that point at real pages', () => {
		const pages = new Set(['/privacy', '/terms', '/contact']);
		for (const doc of [privacyNotice, termsOfUse]) {
			expect(doc.sections.length).toBeGreaterThan(0);
			const texts = [
				doc.intro,
				...doc.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.items ?? [])]),
			];
			for (const s of doc.sections)
				expect((s.paragraphs?.length ?? 0) + (s.items?.length ?? 0), s.heading).toBeGreaterThan(0);
			for (const t of texts) {
				expect(
					t.replace(/\[[^\]]+\]\([^)]+\)/g, ''),
					`unbalanced link syntax in: ${t}`,
				).not.toMatch(/[[\]]/);
				for (const m of t.matchAll(/\]\((\/[^)]*)\)/g))
					expect(pages.has(m[1]), `broken internal link ${m[1]}`).toBe(true);
			}
		}
	});

	// The reply time is stated in several places (page, form, email). They must all read the one shared constant.
	it('takes the reply time from the shared constant and never hard-codes it in contact copy', () => {
		expect(siteConfig.responseTime).toBe(RESPONSE_TIME);
		for (const o of enquiryOptions)
			expect(`${o.title} ${o.blurb}`, o.id).not.toMatch(/business day|\bhours?\b/i);
	});

	// The contact heading follows the selected enquiry type, and a lens only pre-selects one, so each must resolve.
	it('has contact copy for every enquiry type a lens can pre-select', () => {
		for (const l of lenses) expect(getEnquiry(l.enquiry).id).toBe(l.enquiry);
		expect(new Set(enquiryOptions.map((o) => o.id)).size).toBe(enquiryOptions.length);
	});

	// The carousel reads `qualifications` in order and shows a count, so ids must be unique and the list stays newest first.
	it('keeps certifications and courses complete, unique and newest first', () => {
		const ids = qualifications.map((q) => q.id);
		expect(new Set(ids).size).toBe(ids.length);
		const certs = qualifications.filter((q) => q.kind !== 'Degree');
		for (const c of certs) {
			expect(c.title.trim(), c.id).not.toBe('');
			expect(c.issuer.trim(), c.id).not.toBe('');
			expect(c.year, c.id).toMatch(/^\d{4}$/);
			// Optional, but when present it must be a real, secure link (not a '#' placeholder).
			if (c.credentialUrl) expect(c.credentialUrl, c.id).toMatch(/^https:\/\/\S+$/);
		}
		const years = certs.map((c) => Number(c.year));
		expect(years, 'certifications and courses must be newest first').toEqual(
			[...years].sort((a, b) => b - a),
		);
	});

	// The footer link and every other mailto must use the same address.
	it('uses one email address for the config and the social email link', () => {
		const link = siteConfig.social.find((s) => s.icon === 'email');
		expect(link?.href).toBe(`mailto:${siteConfig.email}`);
	});
});
