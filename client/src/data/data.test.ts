import { describe, expect, it } from 'vitest';
import { experience, lenses, privacyNotice, projects, qualifications, termsOfUse } from './index';

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
});
