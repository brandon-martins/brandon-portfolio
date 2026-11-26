import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../data';

// One project tile, used on the home page grid and on /projects. The title's heading level is a prop because the card sits
// under a section <h2> on the home page (so <h3>) but directly under the page <h1> on /projects (so <h2>).
export default function ProjectCard({
	project: p,
	headingLevel: Heading = 'h3',
}: {
	project: Project;
	headingLevel?: 'h2' | 'h3';
}) {
	return (
		<article className="card flex flex-col gap-3.5">
			<div className="placeholder flex h-[210px] items-center justify-center">[Screenshot]</div>
			<div className="flex items-center gap-2">
				{/* Capstones get the accent chip: they are the strongest proof for a hiring audience. */}
				<span className={`tag ${p.type === 'Capstone' ? 'tag-accent' : ''}`}>{p.type}</span>
				<span className="meta">{p.year}</span>
			</div>
			<Heading className="text-2xl leading-tight">{p.title}</Heading>
			<p className="text-[15px] leading-[1.55] text-muted">{p.summary}</p>
			<ul className="flex flex-wrap gap-2" aria-label="Technology">
				{p.tech.map((t) => (
					<li key={t} className="tag">
						{t}
					</li>
				))}
			</ul>
			<Link to={`/projects/${p.slug}`} className="link mt-auto inline-flex items-center gap-1.5">
				Read case study
				<span className="sr-only"> for {p.title}</span>
				<ArrowRight className="size-4" aria-hidden />
			</Link>
		</article>
	);
}
