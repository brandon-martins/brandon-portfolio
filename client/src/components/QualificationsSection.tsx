import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { qualifications } from '../data';
import SectionShell from './SectionShell';

// Degree and certifications. A degree links to its capstone project; a certification to its public credential.
export default function QualificationsSection() {
	return (
		<SectionShell id="qualifications" eyebrow="Qualifications" title="Education & certifications">
			<div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
				{qualifications.map((q) => (
					<article key={q.id} className="card flex flex-col gap-2.5">
						<span className="meta">{q.kind}</span>
						<h3 className="text-[22px] leading-tight">{q.title}</h3>
						<p className="text-[15px] leading-[1.55] text-muted">
							{q.issuer} · {q.year}
						</p>
						{q.capstoneSlug && (
							<Link
								className="link inline-flex items-center gap-1.5"
								to={`/projects/${q.capstoneSlug}`}
							>
								Capstone: view project
								<ArrowRight className="size-4" aria-hidden />
							</Link>
						)}
						{q.credentialUrl && (
							<a
								className="link inline-flex items-center gap-1.5"
								href={q.credentialUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								Verify credential
								<ArrowRight className="size-4" aria-hidden />
							</a>
						)}
					</article>
				))}
			</div>
		</SectionShell>
	);
}
