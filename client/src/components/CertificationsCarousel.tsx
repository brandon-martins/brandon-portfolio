import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Qualification } from '../data';
import { visibleRange } from '../utils/carousel';

// A horizontal, swipeable strip of certification and course cards with previous/next buttons, a "1–3 of 15" position readout and a
// "View all" switch that turns the strip into a grid. Why: with many certifications a grid pushes everything below it far
// down the page, but a strip alone hides most of them, so both views are one click apart.
// It is a native scroll container (scroll-snap), so touch swipe, trackpad and keyboard arrow keys all work without
// custom code, and every card stays in the DOM for search engines and screen readers.
export default function CertificationsCarousel({ certs }: { certs: Qualification[] }) {
	const scrollerRef = useRef<HTMLUListElement>(null);
	const [expanded, setExpanded] = useState(false);
	const [canPrev, setCanPrev] = useState(false);
	const [canNext, setCanNext] = useState(certs.length > 1);
	const [range, setRange] = useState<[number, number]>([0, Math.min(2, certs.length - 1)]);

	// Works out which cards are fully in view and whether there is more to scroll to either side.
	const update = useCallback(() => {
		const el = scrollerRef.current;
		if (!el) return;
		setCanPrev(el.scrollLeft > 4);
		setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
		const cards = Array.from(el.children, (c) => ({
			left: (c as HTMLElement).offsetLeft,
			width: (c as HTMLElement).offsetWidth,
		}));
		const next = visibleRange(cards, el.scrollLeft, el.clientWidth);
		if (next) setRange(next);
	}, []);

	useEffect(() => {
		const el = scrollerRef.current;
		if (!el) return;
		let frame = 0;
		// At most one update per frame while scrolling or resizing.
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(update);
		};
		update();
		// Switching between strip and grid changes the layout after this effect runs, so measure once more next frame.
		frame = requestAnimationFrame(update);
		el.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			cancelAnimationFrame(frame);
			el.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, [update, expanded]);

	const page = (direction: 1 | -1) => {
		const el = scrollerRef.current;
		if (!el) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		// Scroll by almost a full view; scroll-snap then settles on the nearest card.
		el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: reduce ? 'auto' : 'smooth' });
	};

	return (
		<div role="group" aria-roledescription="carousel" aria-label="Certifications and courses">
			<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
				<div className="flex items-baseline gap-3">
					<h3 className="text-2xl">Certifications &amp; courses</h3>
					<span className="meta" aria-live="polite">
						{expanded
							? `${certs.length} total`
							: range[0] === range[1]
								? `${range[0] + 1} of ${certs.length}`
								: `${range[0] + 1}–${range[1] + 1} of ${certs.length}`}
					</span>
				</div>
				<div className="flex items-center gap-2">
					{!expanded && (
						<>
							<button
								type="button"
								onClick={() => page(-1)}
								disabled={!canPrev}
								aria-label="Previous certifications"
								className="icon-btn flex size-10 items-center justify-center disabled:pointer-events-none disabled:opacity-40"
							>
								<ChevronLeft className="size-5" aria-hidden />
							</button>
							<button
								type="button"
								onClick={() => page(1)}
								disabled={!canNext}
								aria-label="Next certifications"
								className="icon-btn flex size-10 items-center justify-center disabled:pointer-events-none disabled:opacity-40"
							>
								<ChevronRight className="size-5" aria-hidden />
							</button>
						</>
					)}
					<button
						type="button"
						onClick={() => setExpanded((v) => !v)}
						aria-expanded={expanded}
						className="btn btn-toggle ml-1 inline-flex items-center gap-2"
					>
						{expanded ? 'Show fewer' : `View all ${certs.length}`}
						<ChevronDown
							className={`size-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
							aria-hidden
						/>
					</button>
				</div>
			</div>

			{/* tabIndex 0 lets keyboard users focus the strip and scroll it with the arrow keys. */}
			<ul
				ref={scrollerRef}
				tabIndex={expanded ? undefined : 0}
				aria-label="Certifications and courses, scrollable"
				className={`relative mt-6 ${
					expanded
						? 'grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-4'
						: 'flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
				}`}
			>
				{certs.map((c) => (
					<li
						key={c.id}
						className={
							expanded
								? ''
								: 'w-[min(280px,82%)] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]'
						}
					>
						<article className="card flex h-full flex-col gap-1.5">
							<span className="meta">
								{c.kind} · {c.issuer}
							</span>
							<h4 className="font-display text-lg font-semibold leading-snug">{c.title}</h4>
							<p className="mt-auto pt-2 font-mono text-xs text-muted">{c.year}</p>
							{c.credentialUrl && (
								<a
									className="link inline-flex items-center gap-1.5 text-[15px]"
									href={c.credentialUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									Verify credential
									<ArrowRight className="size-4" aria-hidden />
									<span className="sr-only"> for {c.title} (opens in a new tab)</span>
								</a>
							)}
						</article>
					</li>
				))}
			</ul>
		</div>
	);
}
