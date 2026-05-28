/**
 * BackToTopButton.jsx
 *
 * Floating action button that appears after the user scrolls past
 * 300px and smoothly scrolls back to the top on click.
 *
 * Uses a simple scroll event listener with cleanup. No external deps.
 */
import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from 'lucide-react';

const THRESHOLD = 300; // px scrolled before button appears

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > THRESHOLD);
    onScroll(); // evaluate immediately on mount (and after nav open/close re-mounts)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      /* Use text-text (CSS variable) instead of text-white so the icon stays
         legible in both dark and light themes. bg-accent-dim also responds to
         the theme token, so no additional override is needed here. */
      className="fixed bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-accent-dim text-text shadow-lg hover:scale-110 hover:opacity-90 transition-all duration-300"
    >
      <ChevronUpIcon className="w-5 h-5" />
    </button>
  );
};

export default BackToTopButton;