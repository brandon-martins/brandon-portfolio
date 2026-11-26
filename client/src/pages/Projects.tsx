import { useFilters } from '../hooks/useFilters';
import Seo from '../components/Seo';
import ProjectCard from '../components/ProjectCard';
import ProjectFilters from '../components/ProjectFilters';
import { pageTitle } from '../utils/seo';

// Full project list with type, technology and year filters (also reached from the skill → "N projects" links).
export default function Projects() {
	const { results } = useFilters();
	return (
		<section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 pt-16">
			<Seo
				title={pageTitle('Projects')}
				description="Capstone, client and personal projects, with case studies."
				path="/projects"
			/>
			<h1 className="text-5xl">Projects</h1>
			<div className="mt-8">
				<ProjectFilters advanced />
			</div>
			<div
				className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6"
				aria-live="polite"
			>
				{results.map((p) => (
					<ProjectCard key={p.slug} project={p} headingLevel="h2" />
				))}
			</div>
			{results.length === 0 && <p className="mt-8 text-muted">No projects match these filters.</p>}
		</section>
	);
}
