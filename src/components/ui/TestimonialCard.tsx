import type { Testimonial } from '@/data/testimonials';

type TestimonialCardProps = {
  testimonial: Testimonial;
  /** 'excerpt' shows the trimmed pull-quote; 'full' adds the scope of work and the quote as written. */
  variant?: 'excerpt' | 'full';
  /** Dark treatment for navy sections. */
  tone?: 'light' | 'dark';
};

/**
 * A client reference rendered as a signed, dated card. Attribution is never
 * optional here — an unsigned quote reads as marketing, a signed one reads as
 * evidence, which is the whole point of these references.
 */
export default function TestimonialCard({
  testimonial: t,
  variant = 'excerpt',
  tone = 'light',
}: TestimonialCardProps) {
  const dark = tone === 'dark';

  return (
    <figure
      className={`flex h-full flex-col rounded-card border p-6 md:p-7 ${
        dark ? 'bg-white/[0.04] border-white/10' : 'bg-surface border-border'
      }`}
    >
      <span
        aria-hidden="true"
        className={`block font-bold leading-[0.6] text-[2.75rem] mb-3 ${
          dark ? 'text-white/25' : 'text-accent/35'
        }`}
      >
        &ldquo;
      </span>

      {variant === 'full' && (
        <p
          className={`text-[12.5px] leading-relaxed mb-4 ${
            dark ? 'text-white/55' : 'text-text-soft'
          }`}
        >
          {t.scope}
        </p>
      )}

      <blockquote
        className={`m-0 flex-1 text-[14px] md:text-[14.5px] leading-relaxed ${
          dark ? 'text-white/85' : 'text-text-muted'
        }`}
      >
        {variant === 'full' ? t.quote : t.excerpt}
      </blockquote>

      <figcaption
        className={`mt-6 pt-5 border-t ${dark ? 'border-white/10' : 'border-border'}`}
      >
        <div
          className={`text-[14px] font-semibold ${dark ? 'text-white' : 'text-navy'}`}
        >
          {t.author}
        </div>
        <div
          className={`mt-1 text-[12.5px] leading-snug ${
            dark ? 'text-white/60' : 'text-text-soft'
          }`}
        >
          {t.authorRole}
          <br />
          {t.organisation}
        </div>
        <div
          className={`mt-2.5 text-[11.5px] tabular-nums ${
            dark ? 'text-white/40' : 'text-text-soft/80'
          }`}
        >
          {t.date} · {t.location}
        </div>

        {t.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {t.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-sm px-2 py-1 text-[10.5px] font-medium ${
                  dark
                    ? 'bg-white/[0.07] text-white/70'
                    : 'bg-accent-soft text-accent-dark'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  );
}
