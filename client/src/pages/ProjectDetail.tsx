import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useScroll } from 'motion/react';
import { getProject, projects } from '../data';
import { GitHubLogo } from '../assets';
import Seo from '../components/Seo';
import BrandIcon from '../components/ui/BrandIcon';
import NotFound from './NotFound';

// One case-study page per project, pre-rendered from routes.tsx. Unknown slugs fall back to the 404 page.
export default function ProjectDetail() {
	const { slug = '' } = useParams();
	const { scrollYProgress } = useScroll();
	const project = getProject(slug);
	if (!project) return <NotFound />;

	// Previous/next wrap around, so the footer navigation always has somewhere to go.
	const i = projects.findIndex((p) => p.slug === slug);
	const prev = projects[(i - 1 + projects.length) % projects.length];
	const next = projects[(i + 1) % projects.length];
	const cs = project.caseStudy;
	const parts: [string, string][] = [
		['Context', cs.context],
		['Problem', cs.problem],
		['My role', cs.role],
		['Approach', cs.approach],
		['Outcome', cs.outcome],
		['What I’d do differently', cs.retrospective],
	];

	return (
		<article className="mx-auto w-full max-w-[760px] px-5 sm:px-8 pt-16">
			<Seo
				title={`${project.title} | Brandon Martins`}
				description={project.summary}
				path={`/projects/${project.slug}`}
			/>
			{/* Reading-progress bar. Motion drives it from scroll position; it is decorative, so aria-hidden. */}
			<motion.div
				aria-hidden
				style={{ scaleX: scrollYProgress }}
				className="fixed inset-x-0 top-0 z-[9999] h-0.5 origin-left bg-acc"
			/>
			<Link to="/projects" className="link inline-flex items-center gap-1.5">
				<ArrowLeft className="size-4" aria-hidden />
				All projects
			</Link>
			<div className="mt-6 flex items-center gap-2.5">
				<span className={`tag ${project.type === 'Capstone' ? 'tag-accent' : ''}`}>
					{project.type}
				</span>
				<span className="meta">
					{project.institution ? `${project.institution} · ` : ''}
					{project.year}
				</span>
			</div>
			<h1 className="mt-4 text-5xl leading-tight">{project.title}</h1>
			<p className="mt-4 text-xl leading-[1.55] text-muted">{project.summary}</p>
			<ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology">
				{project.tech.map((t) => (
					<li key={t} className="tag">
						{t}
					</li>
				))}
			</ul>
			<div className="mt-5 flex flex-wrap gap-5">
				{project.links.live && (
					<a
						className="link inline-flex items-center gap-1.5"
						href={project.links.live}
						target="_blank"
						rel="noopener noreferrer"
					>
						Live site
						<ArrowUpRight className="size-4" aria-hidden />
					</a>
				)}
				{project.links.github && (
					<a
						className="link inline-flex items-center gap-2"
						href={project.links.github}
						target="_blank"
						rel="noopener noreferrer"
					>
						<BrandIcon src={GitHubLogo} />
						GitHub
					</a>
				)}
			</div>
			<div className="placeholder mt-12 flex h-[360px] items-center justify-center">
				[Screenshot]
			</div>
			{parts.map(([heading, body]) => (
				<section key={heading} className="mt-12">
					<h2 className="text-2xl">{heading}</h2>
					<p className="mt-3 text-[17px] leading-relaxed text-muted">{body}</p>
				</section>
			))}
			<nav
				aria-label="Project navigation"
				className="mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-6"
			>
				<Link className="link inline-flex items-center gap-1.5" to={`/projects/${prev.slug}`}>
					<ArrowLeft className="size-4" aria-hidden />
					{prev.title}
				</Link>
				<Link className="link inline-flex items-center gap-1.5" to={`/projects/${next.slug}`}>
					{next.title}
					<ArrowRight className="size-4" aria-hidden />
				</Link>
			</nav>
		</article>
	);
}
