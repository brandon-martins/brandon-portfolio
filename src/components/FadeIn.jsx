import { motion } from 'framer-motion';
import { fadeUp } from '../hooks/useFadeIn.js';

/**
 * Scroll-triggered fade-up wrapper.
 * Replaces the old useReveal IntersectionObserver hook entirely.
 *
 * Props:
 *   delay    – seconds to wait before animating (default 0)
 *   y        – override vertical travel distance (default uses fadeUp variant)
 *   className – forwarded to the motion.div
 *   as        – element type (default 'div')
 */
export default function FadeIn({ children, delay = 0, className = '', as = 'div' }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      custom={delay}
    >
      {children}
    </Tag>
  );
}
