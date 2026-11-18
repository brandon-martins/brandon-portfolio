// Project filters live in the URL (?type=&tech=&year=) so a filtered view can be shared and survives refresh.
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { projects, type ProjectType } from '../data';

export const projectTypes: ('All' | ProjectType)[] = ['All', 'Capstone', 'Client', 'Personal'];

export function useFilters() {
	const [params, setParams] = useSearchParams();
	const type = params.get('type') ?? '';
	const tech = params.get('tech') ?? '';
	const year = params.get('year') ?? '';

	const setFilter = (key: 'type' | 'tech' | 'year', value: string) => {
		const next = new URLSearchParams(params);
		if (value && value !== 'All') next.set(key, value);
		else next.delete(key);
		// replace: don't pollute history per click; preventScrollReset: keep the page where the visitor is.
		setParams(next, { replace: true, preventScrollReset: true });
	};

	const results = useMemo(
		() =>
			projects.filter(
				(p) =>
					(!type || p.type === type) &&
					(!tech || p.tech.includes(tech)) &&
					(!year || p.year === year),
			),
		[type, tech, year],
	);
	// Placeholder values like '[Tech]' are hidden from the dropdowns.
	const techOptions = useMemo(
		() => [...new Set(projects.flatMap((p) => p.tech))].filter((t) => !t.startsWith('[')).sort(),
		[],
	);
	const yearOptions = useMemo(
		() =>
			[...new Set(projects.map((p) => p.year))]
				.filter((y) => !y.startsWith('['))
				.sort()
				.reverse(),
		[],
	);

	return { type, tech, year, setFilter, results, techOptions, yearOptions };
}
