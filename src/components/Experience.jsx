import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn.jsx';
import { experience } from '../utils/data.js';

function ExperienceCard({ job, index }) {
	const [open, setOpen] = useState(index === 0);

	return (
		<FadeIn delay={index * 0.07} className="exp-row">
			<button
				onClick={() => setOpen(!open)}
				className="exp-btn-grid w-full bg-transparent border-none cursor-pointer py-6 md:py-8 text-left"
			>
				<div>
					<div className="flex items-center gap-3 flex-wrap mb-[0.4rem]">
						<h3 className="font-display font-bold text-text text-[1.1rem] md:text-[1.2rem] tracking-[-0.01em]">
							{job.role}
						</h3>
						<span className="tag-pill">{job.type}</span>
					</div>
					<div className="flex flex-wrap gap-x-4 gap-y-1">
						<span className="font-mono text-accent text-[0.78rem] tracking-[0.04em]">
							{job.company}
						</span>
						<span className="font-mono text-muted text-[0.75rem]">
							· {job.period}
						</span>
						<span className="font-mono text-dim   text-[0.75rem]">
							{job.location}
						</span>
					</div>
				</div>
				<span
					className={`font-mono text-accent text-[1.1rem] mt-1 inline-block transition-transform duration-300 ${open ? 'acc-icon-open' : 'acc-icon-closed'}`}
				>
					+
				</span>
			</button>

			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						key="content"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
						className="overflow-hidden"
					>
						<ul className="flex flex-col gap-[0.6rem] list-none pb-8">
							{job.highlights.map((h, i) => (
								<li
									key={i}
									className="flex gap-3 text-muted text-[0.93rem] leading-[1.7]"
								>
									<span className="text-accent shrink-0 mt-0.5">→</span>
									<span>{h}</span>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</FadeIn>
	);
}

export default function Experience() {
	return (
		<section id="experience" className="py-24 md:py-32 bg-bg">
			<div className="max-w-6xl mx-auto px-4 sm:px-8">
				<FadeIn className="mb-14">
					<span className="eyebrow">02 — Experience</span>
					<h2 className="section-heading">Career Timeline</h2>
					<p className="text-muted mt-3 max-w-140">
						Over 15 years spanning enterprise banking, software contracting, and
						full-time entrepreneurship.
					</p>
				</FadeIn>

				<div className="exp-timeline-grid">
					{/* Spine — hidden on very small screens, shown sm+ */}
					<div className="hidden sm:flex flex-col items-center pt-[2.1rem]">
						{experience.map((_, i) => (
							<div key={i} className="flex flex-col items-center flex-1">
								<div
									className={`spine-dot ${i === 0 ? 'spine-dot-active' : ''}`}
								/>
								{i < experience.length - 1 && <div className="spine-line" />}
							</div>
						))}
					</div>
					<div>
						{experience.map((job, i) => (
							<ExperienceCard key={i} job={job} index={i} />
						))}
					</div>
				</div>

				{/* Calc based on width of [spine-dot + gap] - sm:pl-[calc(10px+2.5rem)] */}
				<p className="font-mono text-dim text-[0.75rem] tracking-[0.06em] mt-8 pl-0 sm:pl-12.5">
					Earlier roles: System Analyst Intern — Standard Bank (2007–2008) ·
					Data Entry Specialist — City of Johannesburg (2006)
				</p>
			</div>
		</section>
	);
}
