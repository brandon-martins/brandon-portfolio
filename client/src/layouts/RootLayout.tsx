import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { LensProvider, useLens } from '../hooks/useLens';
import { PaletteProvider } from '../hooks/usePalette';
import { ThemeProvider } from '../hooks/useTheme';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';
import BackToTopButton from '../components/BackToTopButton';

// Scrolls to the #hash target on in-site links, or back to the top on a new page. Needed because
// the router doesn't restore scroll position for hash links by default.
// A #hash waits for `ready`: the lens re-orders the sections once it is resolved after hydration, so scrolling to a section
// any earlier (e.g. a shared ?lens=client#projects link) would land where the section *was*, not where it ends up.
// The first jump after load is instant: someone opening a shared link expects to already be at the section, and a long
// smooth scroll from the top is slow. Later in-page navigation (nav links, palette) uses the CSS `scroll-behavior`.
function ScrollManager() {
	const { pathname, hash } = useLocation();
	const { ready } = useLens();
	const arrived = useRef(false);
	useEffect(() => {
		if (!hash) {
			window.scrollTo(0, 0);
		} else if (ready) {
			document
				.getElementById(hash.slice(1))
				?.scrollIntoView({ behavior: arrived.current ? 'auto' : 'instant' });
		}
		if (ready) {
			// Hand scrolling back to the stylesheet (smooth); index.html forced `auto` for the first jump.
			requestAnimationFrame(() => document.documentElement.style.removeProperty('scroll-behavior'));
			arrived.current = true;
		}
	}, [pathname, hash, ready]);
	return null;
}

// Shell shared by every page: providers, skip link, header, footer, back-to-top button and the command palette.
export default function RootLayout() {
	return (
		<ThemeProvider>
			<LensProvider>
				<PaletteProvider>
					<MotionConfig reducedMotion="user">
						{/* First tab stop: lets keyboard users skip the header. Visible only on focus. */}
						<a
							href="#main"
							className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-full focus:bg-acc focus:px-5 focus:py-2.5 focus:text-onacc"
						>
							Skip to content
						</a>
						<ScrollManager />
						<Header />
						<main id="main">
							<Outlet />
						</main>
						<Footer />
						<BackToTopButton />
						<CommandPalette />
					</MotionConfig>
				</PaletteProvider>
			</LensProvider>
		</ThemeProvider>
	);
}
