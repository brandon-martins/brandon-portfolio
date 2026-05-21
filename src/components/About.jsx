import FadeIn from './FadeIn.jsx';
import { personal, services } from '../utils/data.js';

const contactItems = [
  { icon: '📍', text: personal.location },
  { icon: '📞', text: personal.phone },
  { icon: '🌐', text: personal.website },
];

const companyMeta = [
  ['Sector',    'ICT / Web Development'],
  ['Founded',   '2019'],
  ['Ownership', '100% Black-Owned'],
  ['Province',  'Gauteng'],
  ['Director',  'Brandon Martins'],
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        <FadeIn className="mb-14">
          <span className="eyebrow">01 — About</span>
          <h2 className="section-heading">
            Developer. Founder.<br />
            <span className="italic font-normal text-accent">Digital Strategist.</span>
          </h2>
        </FadeIn>

        <div className="grid-auto-300 gap-12 md:gap-16 mb-20">

          <FadeIn delay={0.1}>
            <p className="text-muted leading-[1.85] text-[1.05rem] mb-6">
              Brandon Martins is a seasoned Full Stack Developer with over{' '}
              <strong className="text-text">15 years of experience</strong> in software engineering,
              web development, and IT leadership. He is the sole owner and founder of{' '}
              <strong className="text-accent">Webify (Pty) Ltd</strong>, a Johannesburg-based digital solutions company.
            </p>
            <p className="text-muted leading-[1.85] mb-6">
              In addition to leading Webify, Brandon serves on the board of Maxipharma as IT Director —
              a collaborative problem-solver with deep expertise across the full SDLC.
            </p>
            <p className="text-muted leading-[1.85]">
              From architecture and design through development, deployment, and ongoing support —
              bringing enterprise-level quality standards to the South African SME market.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {contactItems.map(({ icon, text }) => (
                <div key={text} className="contact-pill"><span>{icon}</span><span>{text}</span></div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="border border-border rounded-[4px] overflow-hidden">
            <div className="bg-accent-dim webify-card-header px-6 py-5 flex justify-between items-center">
              <span className="font-display font-bold text-accent text-[1.1rem]">Webify (Pty) Ltd</span>
              <span className="tag-pill">2019 – Present</span>
            </div>
            <div className="p-6">
              <p className="text-muted text-[0.9rem] leading-[1.7] mb-5">
                A Johannesburg-based web development and digital solutions company committed to helping
                South African businesses build a powerful online presence.
              </p>
              {companyMeta.map(([k, v]) => (
                <div key={k} className="flex justify-between border-t border-border py-[0.6rem] text-[0.82rem]">
                  <span className="font-mono text-muted tracking-[0.04em]">{k}</span>
                  <span className="text-text font-medium">{v}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <span className="block font-mono uppercase text-dim text-[0.7rem] tracking-[0.16em] mb-6">
            Services Offered via Webify
          </span>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="font-semibold text-[0.9rem] text-text mb-2">{s.title}</div>
                <div className="text-[0.82rem] text-muted leading-[1.6]">{s.desc}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
