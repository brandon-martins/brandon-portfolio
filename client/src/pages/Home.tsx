import type { ComponentType } from 'react';
import { motion } from 'motion/react';
import { siteConfig, type SectionId } from '../data';
import { useLens } from '../hooks/useLens';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import QualificationsSection from '../components/QualificationsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ProcessSection from '../components/ProcessSection';
import ContactSection from '../components/ContactSection';

// Section id → component. The lens decides the order; see data/lenses.ts.
const sections: Record<SectionId, ComponentType> = {
	exp: ExperienceSection,
	qual: QualificationsSection,
	proj: ProjectsSection,
	skills: SkillsSection,
	proc: ProcessSection,
	test: TestimonialsSection,
};

// Structured data (schema.org Person) so search engines can show a rich result.
const personLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: siteConfig.name,
	url: `https://${siteConfig.domain}`,
	jobTitle: 'Full-stack developer',
	worksFor: { '@type': 'Organization', name: 'Webify Web Solutions (Pty) Ltd' },
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Johannesburg',
		addressCountry: 'ZA',
	},
};

// Home page: hero (with the lens picker), the lens-ordered sections, then contact.
export default function Home() {
	const { lens } = useLens();
	return (
		<>
			<Seo
				title="Brandon Martins | Full-stack developer, Johannesburg"
				description="Full-stack developer and founder of Webify Web Solutions with 15+ years across enterprise banking, agency work and startups."
				jsonLd={personLd}
			/>
			<Hero />
			{/* The lens re-orders sections; it never hides any of them. */}
			<div className="flex flex-col">
				{lens.order.map((id) => {
					const Section = sections[id];
					return (
						<motion.div key={id} layout="position" transition={{ duration: 0.3 }}>
							<Section />
						</motion.div>
					);
				})}
			</div>
			<ContactSection />
		</>
	);
}
