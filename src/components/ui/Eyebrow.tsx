import type { ReactNode } from 'react';

type EyebrowTone = 'accent' | 'muted' | 'light';

/** Single source of truth for the section kicker/eyebrow label.
 *  Replaces the ~6 divergent inline implementations and the
 *  `.section-eyebrow` CSS class with one consistent treatment. */
const toneClass: Record<EyebrowTone, string> = {
  accent: 'text-accent-dark', // on light surfaces (default)
  muted: 'text-text-soft', // quieter light-surface variant
  light: 'text-white/60', // on navy / photo surfaces (AA-safe)
};

type EyebrowProps = {
  children: ReactNode;
  /** Color context. Defaults to the accent-on-light treatment. */
  tone?: EyebrowTone;
  /** Leading accent rule line — the hero / feature treatment. */
  rule?: boolean;
  className?: string;
};

const base =
  'text-[0.6875rem] font-semibold uppercase tracking-[0.14em] leading-none';

export default function Eyebrow({
  children,
  tone = 'accent',
  rule = false,
  className = '',
}: EyebrowProps) {
  if (rule) {
    return (
      <span
        className={`inline-flex items-center gap-3 ${base} ${toneClass[tone]} ${className}`}
      >
        <span className="w-7 h-px bg-accent shrink-0" aria-hidden="true" />
        {children}
      </span>
    );
  }

  return (
    <span className={`block ${base} ${toneClass[tone]} ${className}`}>
      {children}
    </span>
  );
}
