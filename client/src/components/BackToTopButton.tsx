import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronUp } from 'lucide-react';

// Appears once the visitor has scrolled roughly one screen down a long page.
const SHOW_AFTER_PX = 600;
// Animation lives next to the component that owns it.
const fab = {
	hidden: { opacity: 0, y: 12, scale: 0.9 },
	show: { opacity: 1, y: 0, scale: 1 },
};

// Floating "back to top" button. It is page chrome (z-30), so modals and the mobile menu (z-[9999]) cover it.
export default function BackToTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const goTop = () => {
		// No `behavior` on purpose: it follows the CSS `scroll-behavior`, which is smooth, and instant under reduced motion.
		window.scrollTo({ top: 0 });
		// The button is about to disappear, so hand keyboard focus to the top of the page rather than losing it.
		document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true });
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					key="back-to-top"
					type="button"
					onClick={goTop}
					aria-label="Back to top"
					title="Back to top"
					variants={fab}
					initial="hidden"
					animate="show"
					exit="hidden"
					transition={{ duration: 0.2 }}
					// bottom respects the phone's home-indicator area; hidden when printing.
					className="no-print fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-30 flex size-10 cursor-pointer items-center justify-center rounded-full bg-ink text-bg shadow-lg transition-colors hover:bg-acc hover:text-onacc sm:bottom-8 sm:right-8"
				>
					<ChevronUp className="size-5" aria-hidden />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
