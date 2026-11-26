import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LegalDocument } from '../data';
import Seo from './Seo';
import { pageTitle } from '../utils/seo';

// Turns "text [label](link) text" into text with real links. Keeps the legal text in the data layer as plain strings.
// Internal links ("/terms") use the router; http(s) links open in a new tab; mailto: links stay in place.
function Inline({ text }: { text: string }) {
	const nodes: ReactNode[] = [];
	const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
	let last = 0;
	for (const m of text.matchAll(pattern)) {
		if (m.index > last) nodes.push(text.slice(last, m.index));
		const [, label, href] = m;
		nodes.push(
			href.startsWith('/') ? (
				<Link key={m.index} to={href} className="link">
					{label}
				</Link>
			) : (
				<a
					key={m.index}
					href={href}
					className="link"
					{...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
				>
					{label}
				</a>
			),
		);
		last = m.index + m[0].length;
	}
	if (last < text.length) nodes.push(text.slice(last));
	return (
		<>
			{nodes.map((n, i) => (
				<Fragment key={i}>{n}</Fragment>
			))}
		</>
	);
}

// Reading layout shared by the Privacy Notice and the Terms: one narrow column, numbered headings, plain prose.
export default function LegalPage({ doc, path }: { doc: LegalDocument; path: string }) {
	return (
		<article className="mx-auto w-full max-w-[760px] px-5 pt-12 sm:px-8 sm:pt-16">
			<Seo title={pageTitle(doc.title)} description={doc.description} path={path} />
			<p className="meta">Last updated {doc.updated}</p>
			<h1 className="mt-3 text-[clamp(34px,5vw,48px)] leading-[1.1]">{doc.title}</h1>
			<p className="mt-5 text-[17px] leading-relaxed text-muted">
				<Inline text={doc.intro} />
			</p>
			{doc.sections.map((s, i) => (
				<section key={s.heading} className="mt-10" aria-labelledby={`legal-${i}`}>
					<h2 id={`legal-${i}`} className="text-2xl">
						<span className="meta mr-3 align-middle">{String(i + 1).padStart(2, '0')}</span>
						{s.heading}
					</h2>
					{s.paragraphs?.map((p) => (
						<p key={p} className="mt-3 text-[17px] leading-relaxed text-muted">
							<Inline text={p} />
						</p>
					))}
					{s.items && (
						<ul className="mt-3 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-muted marker:text-acc">
							{s.items.map((it) => (
								<li key={it}>
									<Inline text={it} />
								</li>
							))}
						</ul>
					)}
				</section>
			))}
		</article>
	);
}
