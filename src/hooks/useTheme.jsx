/**
 * useTheme.js
 *
 * Provides a global dark/light theme system via React Context.
 *
 * HOW IT WORKS
 * ─────────────
 * The active theme is stored in state and synced to three places:
 *   1. data-theme attribute on <html>  — CSS variable overrides cascade from here
 *   2. <meta name="theme-color">       — updates the mobile browser chrome colour
 *   3. localStorage ('bm-theme')       — persists the preference across reloads
 *
 * WHY data-theme OVER Tailwind dark: CLASS
 * ─────────────────────────────────────────
 * This project uses a CSS custom-property token system (--color-bg, --color-accent, etc.)
 * defined in index.css. Overriding those tokens per-theme in one CSS block is cleaner
 * and more maintainable than scattering dark: prefixes across every component.
 * Tailwind v4's @theme block is itself built on CSS custom properties, so this approach
 * is aligned with the framework's own direction.
 *
 * USAGE
 * ──────
 * Wrap your app once (already done in main.jsx):
 *   <ThemeProvider> ... </ThemeProvider>
 *
 * Consume anywhere:
 *   const { theme, toggleTheme } = useTheme();
 */
import { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Read from localStorage on first render so the preference survives reloads.
    // Falls back to 'dark' if localStorage is unavailable (e.g. private browsing).
    try { return localStorage.getItem('bm-theme') || 'dark'; }
    catch { return 'dark'; }
  });

  useEffect(() => {
    // 1. Apply data-theme to <html> — all CSS variable overrides cascade from here.
    document.documentElement.setAttribute('data-theme', theme);

    // 2. Keep the browser's theme-color meta in sync so the mobile address bar
    //    and PWA chrome reflects the active theme background colour.
    //    The colours here must match --color-bg in each theme block in index.css.
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = theme === 'dark' ? '#0a0a0a' : '#f5f0e8';
    }

    // 3. Persist preference across page reloads.
    try { localStorage.setItem('bm-theme', theme); } catch {}
  }, [theme]);

  // Simple binary toggle — extend this to setTheme(value) if you ever add
  // a third theme (e.g. 'high-contrast').
  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme — consume theme state and the toggle function.
 * Must be called inside a component that is a descendant of ThemeProvider.
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
