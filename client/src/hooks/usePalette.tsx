import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface PaletteCtx {
	open: boolean;
	setOpen: (open: boolean | ((current: boolean) => boolean)) => void;
}
const Ctx = createContext<PaletteCtx | null>(null);

// Open/closed state for the command palette, shared so the keyboard shortcut (inside CommandPalette)
// and the visible footer button open the very same dialog.
export function PaletteProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	const value = useMemo(() => ({ open, setOpen }), [open]);
	return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePalette() {
	const ctx = useContext(Ctx);
	if (!ctx) throw new Error('usePalette must be used inside PaletteProvider');
	return ctx;
}

// "Ctrl K" or "⌘ K" depending on the visitor's platform. It starts as "Ctrl K" so the pre-rendered HTML
// and the first client render match, then switches after mount (navigator isn't available at build time).
export function useShortcutLabel() {
	const [label, setLabel] = useState('Ctrl K');
	useEffect(() => {
		// Check both signals: `platform` is deprecated and can be empty or spoofed, the user agent covers those cases.
		const apple = /Mac|iPhone|iPad/;
		if (apple.test(navigator.platform) || apple.test(navigator.userAgent)) setLabel('⌘ K');
	}, []);
	return label;
}
