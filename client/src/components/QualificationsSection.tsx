import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { qualifications } from '../data';
import CertificationsCarousel from './CertificationsCarousel';
import SectionShell from './SectionShell';

// Degrees stay as full cards (there are few, and they link to their capstone project). Certifications are many, so they
// (with the courses) go in a scrollable carousel instead of a wall of cards.
export default function QualificationsSection() {
	const degrees = qualifications.filter((q) => q.kind === 'Degree');
	const certs = qualifications.filter((q) => q.kind !== 'Degree'); // certifications and courses
	return (
		<SectionShell id="qualifications" eyebrow="Qualifications" title="Education & certifications">
			{degrees.length > 0 && (
				<div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
					{degrees.map((q) => (
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
						</article>
					))}
				</div>
			)}
			{certs.length > 0 && (
				<div className={degrees.length > 0 ? 'mt-12' : ''}>
					<CertificationsCarousel certs={certs} />
				</div>
			)}
		</SectionShell>
	);
}
