import FadeIn from './FadeIn.jsx';
import { projects } from '../utils/data.js';

function ProjectCard({ project, index }) {
  return (
    <FadeIn delay={index * 0.08} className="card-lift border border-border rounded-sm p-6 md:p-8 bg-surface-2 relative overflow-hidden cursor-default">
      <div className="absolute top-[-10px] right-5 font-display font-black text-[5rem] md:text-[6rem] leading-none pointer-events-none select-none opacity-50 text-dim">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="relative z-10">
        <div className="font-mono uppercase text-muted text-[0.68rem] tracking-[0.12em] mb-3">{project.year}</div>
        <h3 className="font-display font-bold text-text text-[1.15rem] md:text-[1.25rem] tracking-[-0.01em] leading-[1.3] mb-3">{project.name}</h3>
        <p className="text-muted text-[0.88rem] leading-[1.7] mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-[0.4rem]">
          {project.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
        </div>
      </div>
    </FadeIn>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        <FadeIn className="mb-14">
          <span className="eyebrow">04 — Projects</span>
          <h2 className="section-heading">Selected Work</h2>
          <p className="text-muted mt-3 max-w-130">
            A selection of projects spanning enterprise banking, NGO systems, and commercial web development.
          </p>
        </FadeIn>

        <div className="grid-fill-280 gap-5 md:gap-6 mb-10">
          {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>

        <FadeIn className="flex flex-wrap items-center justify-between gap-4 p-5 md:p-6 rounded-sm border border-dashed border-border">
          <div>
            <div className="font-mono text-muted text-[0.72rem] tracking-[0.06em] mb-1">More work available at</div>
            <div className="font-display font-bold text-accent text-[1.1rem]">www.webify.org.za</div>
          </div>
          <a href="https://www.webify.org.za" target="_blank" rel="noopener noreferrer" className="btn-accent-outline">
            Visit Webify →
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
