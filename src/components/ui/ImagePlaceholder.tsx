import Image from 'next/image';
import Icon from './Icon';

type ImagePlaceholderProps = {
  /** Alt text / caption. Used as alt for real photos and as the stand-in label. */
  label: string;
  className?: string;
  /** Dark navy fill (default) or light gray. Only affects the stand-in. */
  tone?: 'dark' | 'light';
  icon?: string;
  /** When set, render a real photo from /public instead of the branded stand-in. */
  src?: string;
  /** Cool navy grade over the photo, for on-brand cohesion. */
  overlay?: boolean;
  /** Set true for above-the-fold images (e.g. hero) to opt out of lazy loading. */
  priority?: boolean;
  /** next/image responsive sizes hint. */
  sizes?: string;
};

/**
 * Renders real photography when `src` is supplied, otherwise a branded, cool-graded
 * navy stand-in carrying the engineering-axis motif so unfinished image slots look
 * intentional rather than broken. The photo branch fills its wrapper (next/image
 * `fill`), so the wrapper must be positioned: pass `relative` (or `absolute`) via
 * className, which every call site does.
 */
export default function ImagePlaceholder({
  label,
  className = '',
  tone = 'dark',
  icon = 'Wind',
  src,
  overlay = false,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 50vw',
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={`overflow-hidden rounded-lg ${className}`}>
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-navy-strong/40" aria-hidden="true" />
        )}
      </div>
    );
  }

  const dark = tone === 'dark';
  return (
    <div
      className={`relative overflow-hidden rounded-lg flex items-center justify-center ${
        dark
          ? 'bg-gradient-to-br from-navy-strong to-elevated'
          : 'bg-surface border border-border'
      } ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        className={dark ? 'absolute inset-0 motif-grid' : 'absolute inset-0 motif-grid-dark'}
        aria-hidden="true"
      />
      <div
        className={`relative flex flex-col items-center gap-3 text-center px-6 ${
          dark ? 'text-text/70' : 'text-text-muted'
        }`}
      >
        <Icon name={icon} size={40} className={dark ? 'text-accent' : 'text-accent'} />
        <span className="text-xs font-medium tracking-wide uppercase">{label}</span>
      </div>
    </div>
  );
}
