import { useEffect, useRef, type RefObject } from 'react';

// Everything an overlay (modal, drawer) needs to behave like a dialog, in one place so Modal and Drawer can't diverge:
// Escape closes it, Tab stays inside it, the page behind it doesn't scroll, and focus goes back to whatever opened it.
const FOCUSABLE =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Options {
	open: boolean;
	onClose: () => void;
	/** The dialog element: Tab is trapped inside it, and it is the fallback focus target. */
	panelRef: RefObject<HTMLElement | null>;
	/** Element to focus on open (e.g. a search input). Defaults to the first focusable element. */
	initialFocusRef?: RefObject<HTMLElement | null>;
}

export function useOverlay({ open, onClose, panelRef, initialFocusRef }: Options) {
	// Keep the latest onClose without re-running the effect below: re-running it would re-focus on every render.
	const closeRef = useRef(onClose);
	useEffect(() => {
		closeRef.current = onClose;
	});

	useEffect(() => {
		if (!open) return;
		const opener = document.activeElement as HTMLElement | null;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden'; // html has scrollbar-gutter: stable, so the page doesn't shift sideways

		const focusables = () =>
			Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
		// preventScroll: moving focus must never scroll the page (the dialog is position: fixed anyway).
		(initialFocusRef?.current ?? focusables()[0] ?? panelRef.current)?.focus({
			preventScroll: true,
		});

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeRef.current();
				return;
			}
			if (e.key !== 'Tab') return;
			const items = focusables();
			if (items.length === 0) {
				e.preventDefault();
				return;
			}
			const first = items[0],
				last = items[items.length - 1];
			const current = document.activeElement;
			if (e.shiftKey && (current === first || !panelRef.current?.contains(current))) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && (current === last || !panelRef.current?.contains(current))) {
				e.preventDefault();
				first.focus();
			}
		};
		document.addEventListener('keydown', onKey);

		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = previousOverflow;
			// Two details: preventScroll, or returning focus to an opener far up the page would scroll away from wherever the
			// chosen command or menu link just took the visitor. And the setTimeout: if the dialog was closed with the Enter
			// key, moving focus to a <button> *during* that keypress makes the browser "press" the button, re-opening the dialog.
			window.setTimeout(() => opener?.focus({ preventScroll: true }), 0);
		};
	}, [open, panelRef, initialFocusRef]);
}
