'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra id/aria props pass straight through to the <section>. */
  id?: string;
  'aria-label'?: string;
};

/**
 * Scroll-reveal section wrapper (spec §20). Fades + lifts content into view
 * once, on first intersection. Respects prefers-reduced-motion (handled in
 * globals.css) and is applied to every section EXCEPT the hero, which is
 * above the fold on load.
 */
export default function Reveal({ children, className = '', ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </section>
  );
}
