import type { ReactNode } from 'react';
import type { SectionId } from '../data';
import { useLens } from '../hooks/useLens';
import { sectionAnchors } from '../utils/sections';

interface Props {
	id: string;
	eyebrow: string;
	title: string;
	intro?: string;
	aside?: ReactNode;
	children: ReactNode;
	/** Full-width tinted background (--surface2) for this section only, to break up the page rhythm. */
	band?: boolean;
}

// Common frame for every home page section: numbered eyebrow, heading, optional intro and aside.
export default function SectionShell({
	id,
	eyebrow,
	title,
	intro,
	aside,
	children,
	band = false,
}: Props) {
	const { lens } = useLens();
	// The lens re-orders sections, so the "01 —" numbers follow the current order instead of being hard-coded.
	const key = (Object.keys(sectionAnchors) as SectionId[]).find((k) => sectionAnchors[k] === id);
	const n = key ? lens.order.indexOf(key) + 1 : 0;
	const label = n > 0 ? `${String(n).padStart(2, '0')} — ${eyebrow}` : eyebrow;
	// A band spans the full page width, so the centred 1200px container is an inner element. Its top padding is the same
	// --section-gap as every other section, so a jump to it clears the sticky header; mt adds the gap above the band,
	// because the section before it has no bottom padding of its own.
	return (
		<section
			id={id}
			aria-labelledby={`${id}-title`}
			className={
				band
					? 'mt-12 bg-surface2 pb-20 pt-[var(--section-gap)] md:mt-16 md:pb-24'
					: 'pt-[var(--section-gap)]'
			}
		>
			<div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
				<div className="flex flex-wrap items-end justify-between gap-6">
					<div>
						<span className="meta">{label}</span>
						<h2 id={`${id}-title`} className="mt-3 text-[clamp(32px,4vw,42px)] leading-[1.1]">
							{title}
						</h2>
						{intro && (
							<p className="mt-3 max-w-[560px] text-[15px] leading-[1.55] text-muted">{intro}</p>
						)}
					</div>
					{aside}
				</div>
				<div className="mt-10">{children}</div>
			</div>
		</section>
	);
}
