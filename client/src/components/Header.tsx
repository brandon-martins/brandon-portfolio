import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Menu, Moon, RefreshCw, Sun } from 'lucide-react';
import { lenses, siteConfig } from '../data';
import { useLens } from '../hooks/useLens';
import { useTheme } from '../hooks/useTheme';
import Drawer from './ui/Drawer';
import LensButtons from './LensButtons';

// Nav anchors match the section ids on the home page. Links go through the router
// ('/' + hash) so they also work from /projects, /cv and other pages.
const nav = [
	['Experience', 'experience'],
	['Projects', 'projects'],
	['Skills', 'skills'],
	['Qualifications', 'qualifications'],
	['Contact', 'contact'],
] as const;

// Breakpoints: the full nav needs ~950px, so it appears from `lg` (1024px) and the menu button takes over below it.
// The lens chip needs another ~150px, so it waits for `xl`; narrower screens switch lens in the hero card or the menu.
export default function Header() {
	const { lens, setLens } = useLens();
	const { theme, toggle } = useTheme();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const closeMenu = useCallback(() => setMenuOpen(false), []);
	// Clicking the chip steps through the lenses in order and wraps around (Hiring → Project → Explore → Hiring).
	const nextLens = lenses[(lenses.findIndex((l) => l.id === lens.id) + 1) % lenses.length];

	// The header is sticky so the menu and the "Get in touch" button are always reachable. It is transparent at the top of the
	// page (exactly like the mockup) and gains a blurred background and a hairline once content scrolls underneath it.
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// If the window grows into the desktop layout while the menu is open (rotating a tablet), close it.
	useEffect(() => {
		const mq = window.matchMedia('(min-width: 1024px)');
		const onChange = (e: MediaQueryListEvent) => {
			if (e.matches) setMenuOpen(false);
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);

	return (
		// The full-width wrapper carries the sticky behaviour and background; the <header> inside keeps the 1200px content width.
		// z-30 is page chrome, below the single overlay layer (z-[9999]) used by Modal and Drawer.
		<div
			className={`no-print sticky top-0 z-30 w-full border-b transition-colors ${scrolled ? 'border-line-soft bg-bg/85 backdrop-blur-md' : 'border-transparent'}`}
		>
			<header className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4">
				<Link
					to="/"
					className="flex shrink-0 items-center gap-3 font-semibold text-ink no-underline"
				>
					{/* The very same file as the browser-tab favicon, so the two can never drift apart. Decorative: the link's text names it. */}
					<img src="/favicon.svg" alt="" width={36} height={36} className="size-9 shrink-0" />
					{siteConfig.name}
				</Link>

				<nav aria-label="Main" className="hidden gap-6 lg:flex">
					{nav.map(([label, id]) => (
						<Link
							key={id}
							to={{ pathname: '/', hash: `#${id}` }}
							className="px-1 py-2.5 text-[15px] text-ink no-underline hover:text-acc"
						>
							{label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-2 sm:gap-3">
					{/* Quick lens switch. The hero card is the explicit three-way picker; this is a shortcut for stepping to the
              next view. The icon and tooltip make it read as a control, and the hero's aria-live note announces the change. */}
					<button
						type="button"
						onClick={() => setLens(nextLens.id)}
						className="meta hidden cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 hover:bg-surface2 xl:inline-flex"
						title={`Switch to the ${nextLens.short.toLowerCase()} view`}
						aria-label={`View: ${lens.short}. Switch to the ${nextLens.short.toLowerCase()} view`}
					>
						Lens: {lens.short}
						<RefreshCw className="size-3.5" aria-hidden />
					</button>
					<button
						type="button"
						className="icon-btn flex size-11 items-center justify-center"
						onClick={toggle}
						aria-label="Toggle theme"
						aria-pressed={theme === 'dark'}
					>
						{theme === 'dark' ? (
							<Sun className="size-[18px]" aria-hidden />
						) : (
							<Moon className="size-[18px]" aria-hidden />
						)}
					</button>
					<Link
						to={{ pathname: '/', hash: '#contact' }}
						className="btn btn-primary hidden items-center justify-center no-underline lg:inline-flex"
					>
						Get in touch
					</Link>
					<button
						type="button"
						className="icon-btn flex size-11 items-center justify-center lg:hidden"
						onClick={() => setMenuOpen(true)}
						aria-label="Open menu"
						aria-haspopup="dialog"
						aria-expanded={menuOpen}
					>
						<Menu className="size-5" aria-hidden />
					</button>
				</div>

				{/* Mobile menu. Everything the desktop header offers is here too: sections, the lens switch and the two main actions. */}
				<Drawer
					open={menuOpen}
					onClose={closeMenu}
					label="Site menu"
					title={<span className="meta">Menu</span>}
					footer={
						<div className="flex flex-col gap-3">
							<Link
								to={{ pathname: '/', hash: '#contact' }}
								onClick={closeMenu}
								className="btn btn-primary inline-flex w-full items-center justify-center no-underline"
							>
								Get in touch
							</Link>
							<a
								href={siteConfig.cvUrl}
								download
								className="btn btn-secondary inline-flex w-full items-center justify-center gap-2 no-underline"
							>
								<Download className="size-4" aria-hidden />
								Download CV
							</a>
						</div>
					}
				>
					<nav aria-label="Mobile">
						<ul>
							{nav.map(([label, id]) => (
								<li key={id} className="border-b border-line-soft first:border-t">
									<Link
										to={{ pathname: '/', hash: `#${id}` }}
										onClick={closeMenu}
										className="flex items-center justify-between py-4 font-display text-xl font-semibold text-ink no-underline"
									>
										{label}
										<ArrowRight className="size-4 text-muted" aria-hidden />
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className="mt-7 flex flex-col gap-3">
						<span id="menu-lens-heading" className="meta">
							I’m here to…
						</span>
						<LensButtons stacked labelledBy="menu-lens-heading" onSelect={closeMenu} />
					</div>
				</Drawer>
			</header>
		</div>
	);
}
