import { useState, useEffect } from 'react';

const links = [
  { label: 'About',          href: '#about' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goto = href => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar-base ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">

        <button onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
          className="font-display font-bold text-[1.15rem] text-text tracking-[-0.01em] bg-transparent border-none cursor-pointer">
          BM<span className="text-accent ml-0.5">.</span>
        </button>

        <nav className="hidden md:flex gap-7 items-center">
          {links.map(({ label, href }) => (
            <button key={href} onClick={() => goto(href)} className="nav-link">{label}</button>
          ))}
          <a href="mailto:brandon.martins@webify.org.za" className="nav-hire">Hire Me</a>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)}
          className="flex md:hidden flex-col gap-1.25 p-1 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu">
          <span className={`ham-bar ${menuOpen ? 'ham-bar-top-open' : ''}`} />
          <span className={`ham-bar ${menuOpen ? 'ham-bar-mid-open' : ''}`} />
          <span className={`ham-bar ${menuOpen ? 'ham-bar-bot-open' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-bg border-t border-border px-4 sm:px-8 py-6 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <button key={href} onClick={() => goto(href)} className="nav-link text-left">{label}</button>
          ))}
          <a href="mailto:brandon.martins@webify.org.za" className="nav-hire self-start mt-2">Hire Me</a>
        </div>
      )}
    </header>
  );
}
