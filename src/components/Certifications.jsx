import { useState } from 'react';
import FadeIn from './FadeIn.jsx';
import { certifications, education } from '../utils/data.js';

const FILTERS = ['All', 'AWS', 'Standard Bank / Oracle', 'SoloLearn', 'Eudonix', 'CTI'];

function matchFilter(cert, f) {
  if (f === 'All') return true;
  if (f === 'AWS') return cert.issuer.includes('Amazon');
  if (f === 'Standard Bank / Oracle') return cert.issuer.includes('Standard Bank') || cert.issuer.includes('Oracle');
  return cert.issuer === f;
}

export default function Certifications() {
  const [filter, setFilter] = useState('All');
  const filtered = certifications.filter(c => matchFilter(c, filter));
  const isAWS    = c => c.issuer.includes('Amazon');

  return (
    <section id="certifications" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        <FadeIn className="mb-12">
          <span className="eyebrow">05 — Education &amp; Certifications</span>
          <h2 className="section-heading">Qualifications</h2>
        </FadeIn>

        <FadeIn delay={0.1} className="grid-auto-260 gap-4 mb-16">
          {education.map((edu, i) => (
            <div key={i} className="bg-accent-dim border border-accent rounded-[4px] p-5 md:p-6">
              <div className="font-mono uppercase text-accent text-[0.68rem] tracking-[0.12em] mb-2">{edu.year}</div>
              <div className="font-display font-bold text-text text-[1.05rem] md:text-[1.1rem] leading-snug mb-1">{edu.degree}</div>
              {edu.grade && <div className="font-mono text-accent-bright text-[0.75rem] mb-1">Grade: {edu.grade}</div>}
              <div className="text-muted text-[0.85rem]">{edu.institution}</div>
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`filter-btn ${filter === f ? 'active' : ''}`}>{f}</button>
          ))}
        </FadeIn>

        <FadeIn delay={0.2} className="cert-grid">
          {filtered.map((cert, i) => (
            <div key={i} className="cert-row">
              <div className={`cert-icon ${isAWS(cert) ? 'cert-icon-aws' : 'cert-icon-default'}`}>
                {isAWS(cert) ? '☁' : '◆'}
              </div>
              <div>
                <div className="font-medium text-text text-[0.85rem] leading-snug mb-1">{cert.name}</div>
                <div className="font-mono text-muted text-[0.68rem] tracking-[0.04em]">{cert.issuer} · {cert.year}</div>
              </div>
            </div>
          ))}
        </FadeIn>

        <div className="text-right font-mono text-dim text-[0.7rem] tracking-[0.06em] mt-3">
          {filtered.length} certification{filtered.length !== 1 ? 's' : ''} shown
        </div>
      </div>
    </section>
  );
}
