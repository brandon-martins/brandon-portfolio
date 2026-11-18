import { useEffect, useRef } from 'react';

// Cloudflare Turnstile spam check. Renders nothing when VITE_TURNSTILE_SITE_KEY is unset (local dev),
// and the server skips verification in that case too. The script is loaded lazily, only when the form needs it.
interface TurnstileApi {
	render: (
		el: HTMLElement,
		opts: {
			sitekey: string;
			callback: (token: string) => void;
			'expired-callback': () => void;
		},
	) => string;
	remove: (id: string) => void;
}
declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

// Loads the Cloudflare script once, even if several widgets mount.
function loadScript(): Promise<void> {
	return new Promise((resolve, reject) => {
		if (window.turnstile) return resolve();
		const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
		const s =
			existing ??
			Object.assign(document.createElement('script'), {
				src: SCRIPT,
				async: true,
			});
		s.addEventListener('load', () => resolve());
		s.addEventListener('error', () => reject(new Error('Turnstile failed to load')));
		if (!existing) document.head.appendChild(s);
	});
}

export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!siteKey || !ref.current) return;
		let widgetId: string | undefined;
		let cancelled = false;
		loadScript()
			.then(() => {
				if (cancelled || !ref.current || !window.turnstile) return;
				widgetId = window.turnstile.render(ref.current, {
					sitekey: siteKey,
					callback: onToken,
					'expired-callback': () => onToken(''),
				});
			})
			.catch(() => onToken('')); // script blocked or offline: no token, so the server rejects the submit
		// Clean up so remounting (React strict mode, step changes) never leaves duplicate widgets.
		return () => {
			cancelled = true;
			if (widgetId) window.turnstile?.remove(widgetId);
		};
	}, [onToken]);
	return siteKey ? <div ref={ref} /> : null;
}
