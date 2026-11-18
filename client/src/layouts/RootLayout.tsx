import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { LensProvider } from '../hooks/useLens';
import { PaletteProvider } from '../hooks/usePalette';
import { ThemeProvider } from '../hooks/useTheme';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';
import BackToTopButton from '../components/BackToTopButton';

// Scrolls to the #hash target on in-site links, or back to the top on a new page. Needed because
// the router doesn't restore scroll position for hash links by default.
function ScrollManager() {
	const { pathname, hash } = useLocation();
	useEffect(() => {
		if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
		else window.scrollTo(0, 0);
	}, [pathname, hash]);
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
