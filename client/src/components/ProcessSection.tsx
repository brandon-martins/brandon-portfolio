import { processSteps } from '../data';
import SectionShell from './SectionShell';

// "How a project runs". The client lens promotes this section; the hiring lens keeps it lower down.
export default function ProcessSection() {
	return (
		<SectionShell id="process" eyebrow="Process" title="How a project runs">
			<ol className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-6">
				{processSteps.map((s, i) => (
					<li key={s.title} className="card flex flex-col gap-2">
						<span className="meta">{String(i + 1).padStart(2, '0')}</span>
						<h3 className="text-xl">{s.title}</h3>
						<p className="text-[15px] leading-[1.55] text-muted">{s.description}</p>
					</li>
				))}
			</ol>
		</SectionShell>
	);
}
