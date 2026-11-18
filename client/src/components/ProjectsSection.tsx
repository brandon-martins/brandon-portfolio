import { useFilters } from '../hooks/useFilters';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import SectionShell from './SectionShell';

// Home page project grid with the type filter in the section header. The full list lives at /projects.
export default function ProjectsSection() {
	const { results } = useFilters();
	return (
		<SectionShell id="projects" eyebrow="Projects" title="Selected work" aside={<ProjectFilters />}>
			{/* min(…, 100%) stops the grid overflowing on phones narrower than the column minimum. */}
			<div
				className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6"
				aria-live="polite"
			>
				{results.map((p) => (
					<ProjectCard key={p.slug} project={p} />
				))}
			</div>
			{results.length === 0 && <p className="text-muted">No projects match this filter yet.</p>}
		</SectionShell>
	);
}
