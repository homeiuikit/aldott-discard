/* eslint-disable @next/next/no-img-element */

type MotifVariant = 'grid' | 'loadcurve' | 'bladeprofile';

type MotifLinesProps = {
  variant: MotifVariant;
  /** Final layer opacity. Spec §7: <=0.08 over content, up to 0.14 on navy. */
  opacity?: number;
  className?: string;
};

const DEFAULT_OPACITY: Record<MotifVariant, number> = {
  grid: 0.06,
  loadcurve: 0.35,
  bladeprofile: 0.08,
};

/**
 * Thin engineering line-work motif (spec §7). Renders an absolutely positioned,
 * aria-hidden SVG at low opacity. Never overlaps live copy at readable opacity.
 * SVG sources live in /public/assets/motif/.
 */
export default function MotifLines({ variant, opacity, className = '' }: MotifLinesProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: opacity ?? DEFAULT_OPACITY[variant] }}
    >
      <img
        src={`/assets/motif/${variant}.svg`}
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  );
}
