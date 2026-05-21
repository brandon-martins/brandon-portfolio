import { personal } from '../utils/data.js';

const navLinks = ['about', 'experience', 'skills', 'projects', 'certifications', 'contact'];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 footer-grid">
        <div>
          <div className="font-display font-bold text-text text-[1.35rem] mb-1">
            Brandon Martins<span className="text-accent">.</span>
          </div>
          <div className="font-mono text-muted text-[0.72rem] tracking-[0.06em]">
            Full Stack Developer · Johannesburg, ZA
          </div>
        </div>
        <div className="flex flex-wrap gap-5 md:gap-6">
          {navLinks.map(id => (
            <button key={id}
              onClick={() => document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })}
              className="nav-link text-[0.68rem]">
              {id}
            </button>
          ))}
        </div>
        <div className="md:text-right">
          <div className="font-mono text-dim text-[0.68rem] tracking-[0.06em] mb-1">© {year} Brandon Martins</div>
          <a href={`https://${personal.website}`} target="_blank" rel="noopener noreferrer"
             className="font-mono text-accent text-[0.68rem] no-underline">{personal.website}</a>
        </div>
      </div>
    </footer>
  );
}
