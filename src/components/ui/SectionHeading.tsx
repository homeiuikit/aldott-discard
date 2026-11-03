import Eyebrow from './Eyebrow';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
  /** Small right-aligned editorial label opposite the title (WindFlow reference). */
  label?: string;
  /** Retained for API compatibility; both branches are light on the dark theme. */
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = '',
  label,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex items-start justify-between gap-6">
        <div>
          <Eyebrow className="mb-2">{eyebrow}</Eyebrow>
          <h2 className="text-text font-semibold text-3xl md:text-4xl leading-tight">
            {title}
          </h2>
        </div>
        {label && (
          <span className="hidden sm:block shrink-0 text-text-soft text-sm tracking-[0.04em] pt-2">
            {label}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-text-muted text-lg leading-relaxed max-w-2xl mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}
