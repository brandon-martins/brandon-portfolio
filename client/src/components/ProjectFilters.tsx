import { projectTypes, useFilters } from '../hooks/useFilters';

// Type pills (All / Capstone / Client / Personal). `advanced` adds technology and year dropdowns on /projects.
export default function ProjectFilters({ advanced = false }: { advanced?: boolean }) {
	const { type, tech, year, setFilter, techOptions, yearOptions } = useFilters();
	const active = type || 'All';
	return (
		<div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
			{projectTypes.map((t) => (
				<button
					key={t}
					type="button"
					className="btn btn-toggle"
					aria-pressed={active === t}
					onClick={() => setFilter('type', t)}
				>
					{t}
				</button>
			))}
			{advanced && (
				<>
					<label className="sr-only" htmlFor="f-tech">
						Technology
					</label>
					<select
						id="f-tech"
						className="w-full sm:w-auto"
						value={tech}
						onChange={(e) => setFilter('tech', e.target.value)}
					>
						<option value="">All technologies</option>
						{techOptions.map((t) => (
							<option key={t}>{t}</option>
						))}
					</select>
					<label className="sr-only" htmlFor="f-year">
						Year
					</label>
					<select
						id="f-year"
						className="w-full sm:w-auto"
						value={year}
						onChange={(e) => setFilter('year', e.target.value)}
					>
						<option value="">All years</option>
						{yearOptions.map((y) => (
							<option key={y}>{y}</option>
						))}
					</select>
				</>
			)}
		</div>
	);
}
