import { Link } from 'react-router-dom';
import { experience, getProject } from '../data';
import { formatRange } from '../utils/sections';
import SectionShell from './SectionShell';

// Career timeline: date column on the left, role details on the right.
export default function ExperienceSection() {
	return (
		<SectionShell id="experience" eyebrow="Experience" title="Where I’ve built things">
			<ol>
				{experience.map((r) => (
					<li
						key={r.id}
						className="flex flex-wrap gap-x-12 gap-y-4 border-t border-line py-8 last:border-b"
					>
						<span className="meta w-full shrink-0 sm:w-[200px]">{formatRange(r.start, r.end)}</span>
						<div className="flex min-w-[min(260px,100%)] flex-1 flex-col gap-3">
							<h3 className="text-[26px] leading-tight">{r.title}</h3>
							<p className="font-medium">{r.org}</p>
							<ul className="flex flex-col gap-3 text-[15px] leading-[1.55] text-muted">
								{r.bullets.map((b) => (
									<li key={b}>{b}</li>
								))}
							</ul>
							<ul className="flex flex-wrap gap-2" aria-label="Technology">
								{r.tech.map((t) => (
									<li key={t} className="tag">
										{t}
									</li>
								))}
							</ul>
							{/* Links each role to its case studies, so claims are backed by evidence. */}
							{r.projectSlugs.length > 0 && (
								<p className="text-[15px]">
									<span className="text-muted">Related projects: </span>
									{r.projectSlugs.map((s, i) => {
										const p = getProject(s);
										return p ? (
											<span key={s}>
												{i > 0 && ', '}
												<Link className="link" to={`/projects/${s}`}>
													{p.title}
												</Link>
											</span>
										) : null;
									})}
								</p>
							)}
						</div>
					</li>
				))}
			</ol>
		</SectionShell>
	);
}
