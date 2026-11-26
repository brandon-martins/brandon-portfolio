import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { experience, getProject, type Role } from '../data';
import { formatRange } from '../utils/sections';
import SectionShell from './SectionShell';

// One role. The title and company are always visible; the highlights, tech and related projects sit in a native
// <details>. A closed <details> keeps its content in the pre-rendered HTML (search engines and recruiter tools still read
// it) but takes it out of the Tab order and the accessibility tree, so no hidden link can hold focus. `open` is
// controlled so "Expand all" can drive every role while a click on one summary still works natively.
function RoleItem({
	role: r,
	open,
	onToggle,
}: {
	role: Role;
	open: boolean;
	onToggle: (open: boolean) => void;
}) {
	return (
		<li className="flex flex-wrap gap-x-12 gap-y-4 border-t border-line py-8 last:border-b">
			<span className="meta w-full shrink-0 sm:w-[200px]">{formatRange(r.start, r.end)}</span>
			<div className="flex min-w-[min(260px,100%)] flex-1 flex-col gap-3">
				<h3 className="text-[26px] leading-tight">{r.title}</h3>
				<p className="font-medium">{r.org}</p>
				<details className="group" open={open} onToggle={(e) => onToggle(e.currentTarget.open)}>
					{/* A summary's children are presentational for assistive tech, so the heading stays outside it. The hidden
              text gives each toggle its own name instead of identical "Show details" buttons. */}
					<summary className="link inline-flex cursor-pointer list-none items-center gap-1.5 [&::-webkit-details-marker]:hidden">
						<span className="group-open:hidden">Show details</span>
						<span className="hidden group-open:inline">Hide details</span>
						<span className="sr-only">
							{' '}
							for {r.title}, {r.org}
						</span>
						<ChevronDown
							className="size-4 transition-transform group-open:rotate-180"
							aria-hidden
						/>
					</summary>
					<div className="mt-4 flex flex-col gap-3">
						<ul className="flex flex-col gap-3 text-[15px] leading-[1.55] text-muted">
							{r.bullets.map((b) => (
								<li key={b}>{b}</li>
							))}
						</ul>
						<ul className="flex flex-wrap gap-2" aria-label="Technology">
							{/* Index in the key: placeholder roles repeat a tag (two "[Domain]"), and duplicate keys can drop or repeat items. */}
							{r.tech.map((t, i) => (
								<li key={`${t}-${i}`} className="tag">
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
				</details>
			</div>
		</li>
	);
}

// Career timeline. The most recent role starts open (that is the one a recruiter reads first); the rest are collapsed so
// the section stays short, and "Expand all" is there for anyone who wants the full history.
export default function ExperienceSection() {
	const [openIds, setOpenIds] = useState<Set<string>>(
		() => new Set(experience.slice(0, 1).map((r) => r.id)),
	);
	const allOpen = openIds.size === experience.length;
	const setOpen = (id: string, open: boolean) =>
		setOpenIds((s) => {
			if (s.has(id) === open) return s;
			const n = new Set(s);
			if (open) n.add(id);
			else n.delete(id);
			return n;
		});

	return (
		<SectionShell
			id="experience"
			eyebrow="Experience"
			title="Where I’ve built things"
			aside={
				<button
					type="button"
					className="btn btn-toggle inline-flex w-full items-center justify-center gap-2 sm:w-auto"
					onClick={() => setOpenIds(allOpen ? new Set() : new Set(experience.map((r) => r.id)))}
				>
					{allOpen ? (
						<ChevronsDownUp className="size-4" aria-hidden />
					) : (
						<ChevronsUpDown className="size-4" aria-hidden />
					)}
					{allOpen ? 'Collapse all' : 'Expand all'}
				</button>
			}
		>
			<ol>
				{experience.map((r) => (
					<RoleItem
						key={r.id}
						role={r}
						open={openIds.has(r.id)}
						onToggle={(open) => setOpen(r.id, open)}
					/>
				))}
			</ol>
		</SectionShell>
	);
}
