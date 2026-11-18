import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useOverlay } from '../../hooks/useOverlay';

interface Props {
	open: boolean;
	onClose: () => void;
	/** Accessible name of the dialog. */
	label: string;
	/** Visible heading in the fixed header. */
	title?: ReactNode;
	/** Fixed footer (primary actions). Stays visible while the body scrolls. */
	footer?: ReactNode;
	children: ReactNode;
}

const backdrop = { hidden: { opacity: 0 }, show: { opacity: 1 } };
const sheet = { hidden: { x: '100%' }, show: { x: 0 } };

// Generic side drawer (used for the mobile menu). Same rules as Modal: portaled to <body>, one z-index, state owned by
// the opener. Layout is the standard overlay pattern: fixed header and footer (shrink-0), and only the body scrolls.
export default function Drawer({ open, onClose, label, title, footer, children }: Props) {
	const panelRef = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	useOverlay({ open, onClose, panelRef });

	if (!mounted) return null;
	return createPortal(
		<AnimatePresence>
			{open && (
				<motion.div
					key="drawer"
					variants={backdrop}
					initial="hidden"
					animate="show"
					exit="hidden"
					transition={{ duration: 0.2 }}
					className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
					onMouseDown={(e) => {
						if (e.target === e.currentTarget) onClose();
					}}
				>
					<motion.div
						ref={panelRef}
						role="dialog"
						aria-modal="true"
						aria-label={label}
						tabIndex={-1}
						variants={sheet}
						transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
						className="absolute inset-y-0 right-0 flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-l-3xl border-l border-line-soft bg-surface text-ink shadow-2xl"
					>
						<div className="flex shrink-0 items-center justify-between gap-3 border-b border-line-soft px-5 py-3">
							<div>{title}</div>
							<button
								type="button"
								onClick={onClose}
								aria-label="Close menu"
								className="icon-btn flex size-11 items-center justify-center"
							>
								<X className="size-[18px]" aria-hidden />
							</button>
						</div>
						<div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
						{/* Respects the phone's home-indicator area so the buttons are never under it. */}
						{footer && (
							<div className="shrink-0 border-t border-line-soft px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
								{footer}
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body,
	);
}
