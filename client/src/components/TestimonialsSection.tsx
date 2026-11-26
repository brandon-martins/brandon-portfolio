import { testimonials } from '../data';
import SectionShell from './SectionShell';

// Quotes from clients and colleagues. Keep real quotes only: placeholders read as an unfinished site.
export default function TestimonialsSection() {
	return (
		<SectionShell id="testimonials" eyebrow="Kind words" title="What people say" band>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6">
				{testimonials.map((t, i) => (
					<figure key={i} className="card">
						<blockquote className="font-display text-2xl leading-[1.3]">“{t.quote}”</blockquote>
						<figcaption className="mt-4 text-[15px] leading-[1.55] text-muted">
							{t.name}, {t.role}, {t.company}
						</figcaption>
					</figure>
				))}
			</div>
		</SectionShell>
	);
}
