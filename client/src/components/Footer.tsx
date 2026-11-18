import { Link } from 'react-router-dom';
import { Command, Globe, Mail, Moon, Sun } from 'lucide-react';
import { siteConfig, type SocialIcon as SocialIconKey } from '../data';
import { GitHubLogo, LinkedInLogo } from '../assets';
import { usePalette, useShortcutLabel } from '../hooks/usePalette';
import { useTheme } from '../hooks/useTheme';
import BrandIcon from './ui/BrandIcon';

// Generic icons come from lucide; brand logos (not in lucide) come from assets/icons/tech.
function SocialIcon({ name }: { name: SocialIconKey }) {
	switch (name) {
		case 'email':
			return <Mail className="size-4" aria-hidden />;
		case 'website':
			return <Globe className="size-4" aria-hidden />;
		case 'linkedin':
			return <BrandIcon src={LinkedInLogo} />;
		case 'github':
			return <BrandIcon src={GitHubLogo} />;
	}
}

export default function Footer() {
	const { theme, set } = useTheme();
	const { setOpen } = usePalette();
	const shortcut = useShortcutLabel();
	// pb-24 on phones: leaves room under the last buttons for the floating back-to-top button, so it never covers them.
	return (
		<footer className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-6 px-5 pb-24 pt-10 sm:px-8 sm:pb-12">
			{/* Legal links sit under the copyright line, not in the social row, so the footer doesn't get crowded. */}
			<div className="flex w-full flex-col gap-1 sm:w-auto">
				<p className="text-[15px] leading-[1.55] text-muted">
					© {new Date().getFullYear()} {siteConfig.name} · Johannesburg, South Africa
				</p>
				<nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
					<Link to="/privacy" className="py-1.5 text-ink no-underline hover:text-acc">
						Privacy (POPIA)
					</Link>
					<Link to="/terms" className="py-1.5 text-ink no-underline hover:text-acc">
						Terms
					</Link>
				</nav>
			</div>
			<nav
				aria-label="Social"
				className="grid w-full grid-cols-2 gap-x-6 gap-y-1 sm:flex sm:w-auto sm:flex-wrap"
			>
				{siteConfig.social.map((s) => (
					<a
						key={s.label}
						href={s.href}
						className="inline-flex items-center gap-2 py-2.5 text-[15px] text-ink no-underline hover:text-acc"
						{...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
					>
						<SocialIcon name={s.icon} />
						{s.label}
					</a>
				))}
			</nav>
			{/* ml-auto: when the controls wrap onto their own row they line up with the social links above, not the copyright. */}
			<div className="flex w-full flex-col gap-3 sm:ml-auto sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
				{/* Visible way into the command palette (also Ctrl/Cmd + K). The key hint only shows on devices with a
            hover-capable pointer, since phones and tablets have no keyboard shortcut to advertise. */}
				<button
					type="button"
					className="btn btn-toggle inline-flex w-full items-center justify-center gap-2 sm:w-auto"
					onClick={() => setOpen(true)}
					aria-haspopup="dialog"
					aria-keyshortcuts="Control+K Meta+K"
				>
					<Command className="size-4" aria-hidden />
					Quick search
					<kbd className="meta hidden rounded-md border border-line px-1.5 py-0.5 [@media(hover:hover)]:inline">
						{shortcut}
					</kbd>
				</button>
				{/* Explicit Light / Dark choice; the header button only flips between the two. */}
				<div role="group" aria-label="Theme" className="grid grid-cols-2 gap-2 sm:flex">
					<button
						type="button"
						className="btn btn-toggle inline-flex items-center justify-center gap-2"
						aria-pressed={theme === 'light'}
						onClick={() => set('light')}
					>
						<Sun className="size-4" aria-hidden />
						Light
					</button>
					<button
						type="button"
						className="btn btn-toggle inline-flex items-center justify-center gap-2"
						aria-pressed={theme === 'dark'}
						onClick={() => set('dark')}
					>
						<Moon className="size-4" aria-hidden />
						Dark
					</button>
				</div>
			</div>
		</footer>
	);
}
