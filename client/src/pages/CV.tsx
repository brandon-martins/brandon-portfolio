import { Download, Printer } from 'lucide-react';
import { experience, projects, qualifications, siteConfig, skillGroups } from '../data';
import { formatRange } from '../utils/sections';
import Seo from '../components/Seo';

// Printable CV page, built from the same data layer as the rest of the site so the two can never drift.
// `.no-print` hides the toolbar and the global print styles hide the header and footer.
export default function CV() {
	return (
		<article className="mx-auto w-full max-w-[820px] px-5 py-12 sm:px-8 sm:py-16">
			<Seo
				title="CV | Brandon Martins"
				description="Curriculum vitae of Brandon Martins, full-stack developer."
				path="/cv"
			/>
			<div className="no-print mb-8 flex flex-col gap-3 sm:flex-row">
				<a
					className="btn btn-primary inline-flex w-full items-center justify-center gap-2 no-underline sm:w-auto"
					href={siteConfig.cvUrl}
					download
				>
					<Download className="size-4" aria-hidden />
					Download PDF
				</a>
				<button
					type="button"
					className="btn btn-secondary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
					onClick={() => window.print()}
				>
					<Printer className="size-4" aria-hidden />
					Print
				</button>
			</div>
			<h1 className="text-4xl">{siteConfig.name}</h1>
			<p className="mt-1 text-muted">
				Full-stack developer · Johannesburg, South Africa · {siteConfig.email}
			</p>

			<h2 className="mt-10 border-b border-line pb-2 text-xl">Experience</h2>
			{experience.map((r) => (
				<section key={r.id} className="mt-5 break-inside-avoid">
					<h3 className="text-lg">
						{r.title} — {r.org}
					</h3>
					<p className="meta mt-1">{formatRange(r.start, r.end)}</p>
					<ul className="mt-2 list-disc pl-5 text-[15px] text-muted">
						{r.bullets.map((b) => (
							<li key={b}>{b}</li>
						))}
					</ul>
				</section>
			))}

			<h2 className="mt-10 border-b border-line pb-2 text-xl">Selected projects</h2>
			{projects.map((p) => (
				<section key={p.slug} className="mt-4 break-inside-avoid">
					<h3 className="text-lg">
						{p.title}{' '}
						<span className="meta">
							{p.type} · {p.year}
						</span>
					</h3>
					<p className="text-[15px] text-muted">{p.summary}</p>
				</section>
			))}

			<h2 className="mt-10 border-b border-line pb-2 text-xl">Education & certifications</h2>
			<ul className="mt-4 flex flex-col gap-2 text-[15px]">
				{qualifications.map((q) => (
					<li key={q.id}>
						{q.title} — {q.issuer}, {q.year}
					</li>
				))}
			</ul>

			<h2 className="mt-10 border-b border-line pb-2 text-xl">Skills</h2>
			<dl className="mt-4 flex flex-col gap-2 text-[15px]">
				{skillGroups.map((g) => (
					<div key={g.title} className="flex gap-3">
						<dt className="w-36 shrink-0 font-semibold">{g.title}</dt>
						<dd className="text-muted">{g.skills.join(', ')}</dd>
					</div>
				))}
			</dl>
		</article>
	);
}
