import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useOverlay } from '../../hooks/useOverlay';

interface Props {
	open: boolean;
	onClose: () => void;
	/** Accessible name of the dialog. */
	label: string;
	children: ReactNode;
	initialFocusRef?: RefObject<HTMLElement | null>;
	/** Width cap, e.g. "max-w-xl". */
	className?: string;
}

// Animation lives next to the component that owns it (animations-and-overlays.md).
const backdrop = { hidden: { opacity: 0 }, show: { opacity: 1 } };
const panel = {
	hidden: { opacity: 0, y: -8, scale: 0.98 },
	show: { opacity: 1, y: 0, scale: 1 },
};

// Generic modal container. State stays with the component that opens it; this only decides where and how it renders.
// Portaled to <body> so no transform/opacity ancestor can trap it beneath other content, with one overlay z-index.
// Layout follows the scrollable-surface pattern: the panel owns the rounded corners and clips (overflow-hidden),
// and the content decides what scrolls (give the scrolling part `overflow-y-auto flex-1`).
export default function Modal({
	open,
	onClose,
	label,
	children,
	initialFocusRef,
	className = 'max-w-xl',
}: Props) {
	const panelRef = useRef<HTMLDivElement>(null);
	// Portals need `document`, which doesn't exist while pre-rendering; wait for the client so server and client HTML match.
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	useOverlay({ open, onClose, panelRef, initialFocusRef });

	if (!mounted) return null;
	return createPortal(
		<AnimatePresence>
			{open && (
				<motion.div
					key="modal"
					variants={backdrop}
					initial="hidden"
					animate="show"
					exit="hidden"
					transition={{ duration: 0.15 }}
					className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm"
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
						variants={panel}
						className={`flex max-h-[80vh] w-full flex-col overflow-hidden rounded-2xl border border-line-soft bg-surface text-ink shadow-2xl ${className}`}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body,
	);
}
