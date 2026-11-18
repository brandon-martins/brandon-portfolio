import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lenses, projects, siteConfig } from '../data';
import { useLens } from '../hooks/useLens';
import { useTheme } from '../hooks/useTheme';
import { usePalette } from '../hooks/usePalette';
import Modal from './ui/Modal';

// Quick navigation: jump to sections and projects, download the CV, email, switch theme or lens.
// Opens with Ctrl/Cmd + K, or from the "Quick search" button in the footer. The overlay behaviour (portal, focus trap,
// Escape, scroll lock, focus return) comes from the shared Modal; this file only owns the search and the commands.
interface Command {
	id: string;
	label: string;
	group: string;
	run: () => void;
}

export default function CommandPalette() {
	const { open, setOpen } = usePalette();
	const [query, setQuery] = useState('');
	const [active, setActive] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const { setLens } = useLens();
	const { toggle } = useTheme();

	// Global shortcut: toggle with Ctrl/Cmd + K from anywhere on the site.
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				setOpen((o) => !o);
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [setOpen]);

	// Start from a clean search every time the palette opens (Modal focuses the input and returns focus on close).
	useEffect(() => {
		if (open) {
			setQuery('');
			setActive(0);
		}
	}, [open]);

	// Built from the data layer, so new projects and lenses appear in the palette automatically.
	const commands = useMemo<Command[]>(() => {
		const go = (to: string) => () => navigate(to);
		return [
			...(['experience', 'projects', 'skills', 'qualifications', 'contact'] as const).map((s) => ({
				id: `sec-${s}`,
				group: 'Sections',
				label: `Go to ${s}`,
				run: go(`/#${s}`),
			})),
			...projects.map((p) => ({
				id: `p-${p.slug}`,
				group: 'Projects',
				label: p.title,
				run: go(`/projects/${p.slug}`),
			})),
			{
				id: 'cv',
				group: 'Actions',
				label: 'Download CV',
				run: () => {
					window.location.href = siteConfig.cvUrl;
				},
			},
			{
				id: 'mail',
				group: 'Actions',
				label: 'Email Brandon',
				run: () => {
					window.location.href = `mailto:${siteConfig.email}`;
				},
			},
			{ id: 'theme', group: 'Actions', label: 'Toggle theme', run: toggle },
			...lenses.map((l) => ({
				id: `lens-${l.id}`,
				group: 'Actions',
				label: `Switch view: ${l.label}`,
				run: () => setLens(l.id),
			})),
		];
	}, [navigate, setLens, toggle]);

	const results = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));
	const choose = (c?: Command) => {
		if (!c) return;
		setOpen(false);
		c.run();
	};

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			label="Command palette"
			initialFocusRef={inputRef}
		>
			<input
				ref={inputRef}
				type="text"
				role="combobox"
				aria-expanded="true"
				aria-controls="cmd-list"
				aria-autocomplete="list"
				aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
				placeholder="Type a command or search…"
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					setActive(0);
				}}
				onKeyDown={(e) => {
					if (e.key === 'ArrowDown') {
						e.preventDefault();
						setActive((a) => Math.min(a + 1, results.length - 1));
					} else if (e.key === 'ArrowUp') {
						e.preventDefault();
						setActive((a) => Math.max(a - 1, 0));
					} else if (e.key === 'Enter') {
						e.preventDefault();
						choose(results[active]);
					}
				}}
				className="h-14 w-full shrink-0 rounded-none border-0 border-b border-line"
			/>
			{/* Only this list scrolls; the Modal panel above owns the rounded corners. */}
			<ul id="cmd-list" role="listbox" className="flex-1 overflow-y-auto p-2">
				{results.length === 0 && <li className="px-3 py-2 text-sm text-muted">No matches.</li>}
				{results.map((c, i) => (
					<li
						key={c.id}
						id={`cmd-${c.id}`}
						role="option"
						aria-selected={i === active}
						onMouseEnter={() => setActive(i)}
						onClick={() => choose(c)}
						className={`flex cursor-pointer justify-between gap-4 rounded-lg px-3 py-2 text-[15px] ${i === active ? 'bg-surface2' : ''}`}
					>
						<span>{c.label}</span>
						<span className="meta shrink-0">{c.group}</span>
					</li>
				))}
			</ul>
		</Modal>
	);
}
