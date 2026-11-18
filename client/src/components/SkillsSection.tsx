import { Link } from 'react-router-dom';
import { projectsUsing, skillGroups } from '../data';
import SectionShell from './SectionShell';

// Skills with evidence: each skill shows how many projects used it and links to the filtered list.
export default function SkillsSection() {
	return (
		<SectionShell
			id="skills"
			eyebrow="Skills"
			title="Skills, with evidence"
			intro="Each skill links to the projects where it was used."
		>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-6">
				{skillGroups.map((g) => (
					<div key={g.title} className="card">
						<h3 className="mb-3 text-xl">{g.title}</h3>
						<ul>
							{g.skills.map((s) => {
								const n = projectsUsing(s).length;
								return (
									<li
										key={s}
										className="flex justify-between border-t border-line-soft py-2.5 text-[15px]"
									>
										{s}
										{n > 0 ? (
											<Link
												to={`/projects?tech=${encodeURIComponent(s)}`}
												className="font-mono text-xs text-muted hover:text-acc"
											>
												{n} {n === 1 ? 'project' : 'projects'}
											</Link>
										) : (
											<span className="font-mono text-xs text-muted">—</span>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				))}
			</div>
		</SectionShell>
	);
}
