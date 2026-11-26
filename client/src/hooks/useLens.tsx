import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import { defaultLens, lenses, type Lens, type LensId } from '../data';

// Holds the visitor's chosen "lens" (hire / client / look). It drives section order, the hero CTA
// and the contact form's default enquiry type, and is remembered between visits.
const STORAGE_KEY = 'lens';
// Accepts the ids used in code plus the friendlier names from the spec (?lens=hiring|client), so a link
// like brandonmartins.co.za/?lens=hiring works as intended.
const lensAliases: Record<string, LensId> = {
	hire: 'hire',
	hiring: 'hire',
	client: 'client',
	project: 'client',
	look: 'look',
	explore: 'look',
};
const parseLens = (v: unknown): LensId | null =>
	typeof v === 'string' ? (lensAliases[v.toLowerCase()] ?? null) : null;
const byId = (id: LensId) => lenses.find((l) => l.id === id) ?? defaultLens;

interface LensCtx {
	lens: Lens;
	setLens: (id: LensId) => void;
	/** True once the lens has been resolved from the URL / saved choice (after hydration). Page order is final from here. */
	ready: boolean;
}
const Ctx = createContext<LensCtx | null>(null);

export function LensProvider({ children }: { children: ReactNode }) {
	// Starts on the default so server-rendered HTML and the first client render match (no hydration warning).
	const [lens, setLensState] = useState<Lens>(defaultLens);
	const [ready, setReady] = useState(false);

	// Priority: ?lens= URL param, then the stored choice, then the default.
	useEffect(() => {
		const fromUrl = new URLSearchParams(window.location.search).get('lens');
		let stored: string | null = null;
		try {
			stored = localStorage.getItem(STORAGE_KEY);
		} catch {
			/* ignore */
		}
		const id = parseLens(fromUrl) ?? parseLens(stored);
		if (id) setLensState(byId(id));
		setReady(true); // same batch as the lens update, so the page is already re-ordered when anything reacts to `ready`
	}, []);

	const setLens = useCallback((id: LensId) => {
		setLensState(byId(id));
		try {
			localStorage.setItem(STORAGE_KEY, id);
		} catch {
			/* ignore */
		}
		// Keep a shared ?lens= link in step with the choice; links without the param are left alone.
		const url = new URL(window.location.href);
		if (url.searchParams.has('lens')) {
			url.searchParams.set('lens', id);
			window.history.replaceState(null, '', url);
		}
	}, []);

	const value = useMemo(() => ({ lens, setLens, ready }), [lens, setLens, ready]);
	return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLens() {
	const ctx = useContext(Ctx);
	if (!ctx) throw new Error('useLens must be used inside LensProvider');
	return ctx;
}
