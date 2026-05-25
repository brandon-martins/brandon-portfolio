import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personal } from '../utils/data.js';

const ticker = [
  'Full Stack Developer', 'React · PHP · Java · Node.js', '15+ Years Experience',
  'Webify (Pty) Ltd · Founder', 'Johannesburg, South Africa', 'AWS Certified 2025', 'Available for Projects',
];

const stats = [
  { num: '15+',  label: 'Years Experience' },
  { num: '2019', label: 'Webify Founded'   },
  { num: '100%', label: 'Black-Owned'      },
  { num: 'AWS',  label: 'Certified 2025'   },
];

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-24">

      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />
      <div className="hero-glow" />
      <div className="hero-corner-label hidden md:block" style={{ opacity: loaded ? 1 : 0 }}>
        Portfolio {new Date().toLocaleDateString('en-GB').replaceAll('/', '')} — ZA
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 w-full">

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mb-6"
        >
          <span className="eyebrow">◆ Full Stack Developer &amp; Digital Solutions Founder</span>
        </motion.div>

        <motion.h1
          className="hero-name mb-2"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          Brandon
        </motion.h1>

        <motion.h1
          className="hero-name-italic mb-10"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease }}
        >
          Martins
        </motion.h1>

        <motion.p
          className="font-light text-muted leading-[1.75] text-lg max-w-xl mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.44, ease }}
        >
          {personal.tagline}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 items-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.56, ease }}
        >
          <a href="#contact" className="btn-primary"
             onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Get In Touch <span>→</span>
          </a>
          <a href="#experience" className="btn-outline"
             onClick={e => { e.preventDefault(); document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View Experience
          </a>
          <div className="badge-available">
            <span className="dot-green animate-pulse-glow" />
            <span className="font-mono uppercase text-green text-[0.68rem] tracking-[0.08em]">Available for Work</span>
          </div>
        </motion.div>

        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.68, ease }}
        >
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="font-display font-bold text-accent text-2xl leading-none mb-1">{s.num}</div>
              <div className="font-mono uppercase text-muted text-[0.65rem] tracking-widest">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border py-[10px] overflow-hidden bg-surface">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="font-mono uppercase text-muted text-[0.7rem] tracking-widest px-10">
              {item}<span className="text-accent ml-10">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
