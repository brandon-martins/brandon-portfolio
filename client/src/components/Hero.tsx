import { ArrowRight, Download } from 'lucide-react';
import { siteConfig, experience } from '../data';
import { useLens } from '../hooks/useLens';
import LensSelector from './LensSelector';

// Top of the home page: who I am, the lens picker, the main call-to-action and a few quick facts.
export default function Hero() {
	const { lens } = useLens();
	const isDownload = lens.cta.href.endsWith('.pdf');
	// "Currently" chips come from the data layer (roles with no end date), so they can't drift from Experience.
	const current = experience.filter((r) => r.end === null).map((r) => r.badge ?? r.title);
	const stats = [
		{ value: siteConfig.stats.years, label: 'Years building digital products' },
		{ value: siteConfig.stats.projects, label: 'Projects shipped' },
	];
	return (
		<section className="mx-auto flex w-full max-w-[1200px] flex-wrap items-start gap-10 px-5 pt-6 sm:gap-12 sm:px-8 sm:pt-14">
			<div className="flex min-w-0 flex-[1_1_560px] flex-col gap-6 sm:gap-7">
				{siteConfig.availability.open && (
					<span className="badge-ok inline-flex items-center gap-2.5 self-start">
						<span className="size-2 rounded-full bg-ok" aria-hidden />
						{siteConfig.availability.label}
					</span>
				)}
				<h1 className="text-[clamp(40px,6vw,68px)] leading-[1.02]">
					Software that holds up in production.
				</h1>
				<p className="max-w-[560px] text-[19px] leading-[1.55] text-muted">
					I’m {siteConfig.name}, a full-stack developer and founder of Webify Web Solutions, with
					15+ years across enterprise banking, agency work and startups.
				</p>
				<LensSelector />
				<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
					<a
						className="btn btn-primary inline-flex w-full items-center justify-center gap-2 no-underline sm:w-auto"
						href={lens.cta.href}
						{...(isDownload ? { download: true } : {})}
					>
						{lens.cta.label}
						{isDownload ? (
							<Download className="size-4" aria-hidden />
						) : (
							<ArrowRight className="size-4" aria-hidden />
						)}
					</a>
					<a
						className="btn btn-secondary inline-flex w-full items-center justify-center gap-2 no-underline sm:w-auto"
						href="#projects"
					>
						View projects
						<ArrowRight className="size-4" aria-hidden />
					</a>
				</div>
			</div>
			<div className="grid flex-[1_1_360px] grid-cols-2 gap-4">
				<div className="placeholder col-span-2 flex h-[240px] items-center justify-center sm:h-[300px]">
					[Portrait photo]
				</div>
				{stats.map((s) => (
					<div key={s.label} className="card">
						<div className="font-display text-[44px] font-bold leading-tight">{s.value}</div>
						<p className="text-[15px] leading-[1.55] text-muted">{s.label}</p>
					</div>
				))}
				<div className="card col-span-2 flex flex-wrap items-center gap-2">
					<span className="meta mr-2">Currently</span>
					{current.map((c) => (
						<span key={c} className="tag">
							{c}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
