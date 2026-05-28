/**
 * Projects.jsx
 *
 * Renders the Selected Work section.
 *
 * Each project card reads three new fields from data.js:
 *   url     — live site link (or null)
 *   github  — public repo link (or null)
 *   status  — 'live' | 'nda' | 'internal' | 'archived'
 *
 * The STATUS_META map controls the badge label and colour for each status.
 * To add a new status, add an entry here — no other changes needed.
 */
import FadeIn from './FadeIn.jsx';
import { projects } from '../utils/data.js';

/* Badge copy and colour-class for each project status value */
const STATUS_META = {
  live:     { label: 'Live',     colour: 'text-green border-green/30 bg-green/8'  },
  nda:      { label: 'Client NDA', colour: 'text-muted border-border bg-surface'  },
  internal: { label: 'Internal', colour: 'text-muted border-border bg-surface'    },
  archived: { label: 'Archived', colour: 'text-dim   border-border bg-surface'    },
};

/**
 * StatusBadge — small pill shown top-right of every card.
 * Gives visitors immediate context when no live link is available.
 */
function StatusBadge({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.internal;
  return (
    <span className={`
      inline-flex items-center px-2 py-0.5 rounded-sm border
      font-mono text-[0.62rem] tracking-[0.08em] uppercase
      ${meta.colour}
    `}>
      {meta.label}
    </span>
  );
}

/**
 * ProjectLinks — renders "View Site" and/or "GitHub" CTA buttons.
 * Only renders the buttons that have actual URLs; shows nothing if both are null.
 */
function ProjectLinks({ url, github }) {
  if (!url && !github) return null;
  return (
    <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-border">
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent-outline text-[0.68rem] py-[6px] px-4"
        >
          View Site →
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-[0.68rem] py-[6px] px-4"
        >
          GitHub →
        </a>
      )}
    </div>
  );
}

/**
 * ProjectCard — individual project tile.
 * The large ghost number in the background is decorative; pointer-events and
 * select are disabled so it never interferes with copy/click actions.
 */
function ProjectCard({ project, index }) {
  return (
    <FadeIn
      delay={index * 0.08}
      className="card-lift border border-border rounded-sm p-6 md:p-8 bg-surface-2 relative overflow-hidden cursor-default"
    >
      {/* Decorative background index number */}
      <div className="absolute top-[-10px] right-5 font-display font-black text-[5rem] md:text-[6rem] leading-none pointer-events-none select-none opacity-50 text-dim">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative z-10">
        {/* Year + status badge row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="font-mono uppercase text-muted text-[0.68rem] tracking-[0.12em]">
            {project.year}
          </div>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="font-display font-bold text-text text-[1.15rem] md:text-[1.25rem] tracking-[-0.01em] leading-[1.3] mb-3">
          {project.name}
        </h3>

        <p className="text-muted text-[0.88rem] leading-[1.7] mb-4">
          {project.description}
        </p>

        {/* Tech / domain tags */}
        <div className="flex flex-wrap gap-[0.4rem]">
          {project.tags.map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Live / GitHub links — renders only when URLs are provided */}
        <ProjectLinks url={project.url} github={project.github} />
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
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>

        {/* "More work" callout — links to the Webify site for additional case studies */}
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
