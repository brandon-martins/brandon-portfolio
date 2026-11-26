import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useFilters } from '../hooks/useFilters';
import { homeProjects, projectSpan } from '../utils/projectLayout';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import SectionShell from './SectionShell';

// Home page project grid with the type filter in the section header. It features at most five projects (two wide cards,
// then three, on large screens); the full, filterable list lives at /projects.
export default function ProjectsSection() {
	const { results } = useFilters();
	const shown = homeProjects(results);
	return (
		<SectionShell id="projects" eyebrow="Projects" title="Selected work" aside={<ProjectFilters />}>
			{/* 1 column on phones, 2 from md, and a 6-column grid from lg so cards can span 3 or 2 columns. */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6" aria-live="polite">
				{shown.map((p, i) => (
					<ProjectCard key={p.slug} project={p} className={projectSpan(shown.length, i)} />
				))}
			</div>
			{results.length === 0 && <p className="text-muted">No projects match this filter yet.</p>}
			{results.length > shown.length && (
				<Link to="/projects" className="link mt-8 inline-flex items-center gap-1.5">
					View all {results.length} projects
					<ArrowRight className="size-4" aria-hidden />
				</Link>
			)}
		</SectionShell>
	);
}
