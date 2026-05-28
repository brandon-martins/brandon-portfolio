import { motion } from 'framer-motion';
import FadeIn from './FadeIn.jsx';
import { skills } from '../utils/data.js';

const icons = {
  'Front-End':       '◈',
  'Back-End':        '◉',
  'Databases':       '◎',
  'Cloud & DevOps':  '◆',
  'CMS & Platforms': '◇',
  'Other':           '○',
};

/**
 * Proficiency map — keys must exactly match the skill names in data.js.
 * Previously included 'JSP' which was not in the Back-End skills array;
 * replaced with 'Express' which is the actual entry. Any skill missing from
 * this map falls back to 75% via the `?? 75` default in SkillBar.
 */
const proficiency = {
  // Front-End
  'JavaScript': 95, 'React': 90, 'HTML5': 98, 'CSS3': 92, 'Progressive Web Apps': 80,
  // Back-End — 'Express' added, stale 'JSP' removed
  'PHP': 88, 'Java': 85, 'Node.js': 78, 'Express': 80, 'C#': 70,
  // Databases
  'MySQL': 88, 'MongoDB': 78, 'DB2': 75, 'SQL': 90,
  // Cloud & DevOps
  'AWS': 80, 'Linux': 82, 'cPanel': 88, 'Git': 85, 'cPanel Hosting': 90,
  // CMS & Platforms
  'WordPress': 90, 'Custom CMS': 85, 'E-commerce Platforms': 82,
  // Other
  'SEO': 80, 'Digital Marketing': 75, 'IT Consulting': 88, 'Agile / SDLC': 85,
};

function SkillBar({ name, delay = 0 }) {
  const pct = proficiency[name] ?? 75;
  return (
    <motion.div
      className="mb-[0.9rem]"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between mb-1.25 font-mono text-[0.75rem] tracking-[0.04em]">
        <span className="text-text">{name}</span>
        <span className="text-muted">{pct}%</span>
      </div>
      <div className="skill-bar-track">
        {/* width is runtime data — stays as style prop */}
        <div className="skill-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </motion.div>
  );
}

function CatHeader({ cat }) {
  return (
    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border">
      <span className="text-accent text-[0.9rem]">{icons[cat]}</span>
      <span className="font-mono uppercase text-text text-[0.75rem] tracking-widest">{cat}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        <FadeIn className="mb-14">
          <span className="eyebrow">03 — Skills</span>
          <h2 className="section-heading">Technical Stack</h2>
          <p className="text-muted mt-3 max-w-130">
            A breadth of languages, frameworks, and platforms built over 15 years of enterprise and product work.
          </p>
        </FadeIn>

        <div className="grid-auto-300 gap-10 md:gap-12 mb-14">
          {['Front-End', 'Back-End', 'Databases'].map((cat, ci) => (
            <FadeIn key={cat} delay={ci * 0.1}>
              <CatHeader cat={cat} />
              {skills[cat].map((s, si) => <SkillBar key={s} name={s} delay={si * 0.05} />)}
            </FadeIn>
          ))}
        </div>

        <div className="grid-auto-260 gap-6">
          {['Cloud & DevOps', 'CMS & Platforms', 'Other'].map((cat, i) => (
            <FadeIn key={cat} delay={i * 0.1} className="border border-border rounded-sm p-5 md:p-6 bg-surface-2">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-accent">{icons[cat]}</span>
                <span className="font-mono uppercase text-text text-[0.72rem] tracking-widest">{cat}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills[cat].map(s => <span key={s} className="tag-pill">{s}</span>)}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
