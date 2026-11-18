import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';

export type Theme = 'light' | 'dark';
interface ThemeCtx {
	theme: Theme;
	/** Flip between light and dark (header icon button). */
	toggle: () => void;
	/** Choose a specific theme (footer Light / Dark buttons, command palette). */
	set: (theme: Theme) => void;
}
const Ctx = createContext<ThemeCtx | null>(null);

// Light/dark state. Light is the default for every visitor; dark is opt-in and remembered. The CSS tokens react to
// `data-theme` on <html>; the inline script in index.html applies a saved choice before first paint, so this provider
// only keeps React in sync. (Not following the OS setting is deliberate: the design is light-first, and the
// pre-rendered HTML is light, so there is never a flash for the default case.)
const THEME_COLOR = { light: '#F5F6F8', dark: '#0B0F17' } as const;

export function ThemeProvider({ children }: { children: ReactNode }) {
	// Server and first client render agree on 'light'; a saved 'dark' is applied after mount.
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		let stored: string | null = null;
		try {
			stored = localStorage.getItem('theme');
		} catch {
			/* storage unavailable */
		}
		if (stored === 'dark') setTheme('dark');
	}, []);

	// Keep the browser's address-bar / status-bar colour in step with the page.
	useEffect(() => {
		document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
	}, [theme]);

	const set = useCallback((next: Theme) => {
		setTheme(next);
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {
			/* ignore */
		}
	}, []);

	const toggle = useCallback(() => set(theme === 'dark' ? 'light' : 'dark'), [theme, set]);

	const value = useMemo(() => ({ theme, toggle, set }), [theme, toggle, set]);
	return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
	const ctx = useContext(Ctx);
	if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
	return ctx;
}
