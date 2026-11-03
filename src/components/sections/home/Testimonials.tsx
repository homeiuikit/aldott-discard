import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import TestimonialCard from '@/components/ui/TestimonialCard';
import {
  featuredTestimonials,
  testimonials,
  testimonialSummary,
} from '@/data/testimonials';

/**
 * Client references — written endorsements from certification bodies, turbine
 * OEMs, and offshore developers. Signed and dated, because that is what
 * separates a reference from a testimonial.
 */
export default function Testimonials() {
  return (
    <Reveal
      className="relative bg-navy border-b border-border section-y overflow-hidden"
      aria-label="Client references"
    >
      <div
        className="absolute inset-0 motif-grid-dark opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-content mx-auto px-6 md:px-8">
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-14">
          <div>
            <Eyebrow tone="light" className="mb-3.5">
              Trusted by the industry
            </Eyebrow>
            <h2 className="m-0 font-bold text-white text-[1.875rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.025em]">
              What clients and certifiers say
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/65">
              Independent endorsements from certification bodies, turbine OEMs, and
              offshore developers we have delivered for — spanning 2015 to 2025.
            </p>
          </div>
          <Link
            href="/about#references"
            className="group hidden sm:inline-flex items-center gap-2 border-b border-white/30 pb-0.5 text-[13px] font-semibold text-white/90 transition-all duration-150 hover:gap-2.5 hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            All references
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {featuredTestimonials.map((t) => (
            <TestimonialCard key={t.slug} testimonial={t} tone="dark" />
          ))}
        </div>

        {/* Reference roll — every organisation on file, not just the four quoted. */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {testimonials.map((t) => (
              <li
                key={t.slug}
                className="text-[13px] font-semibold tracking-[0.01em] text-white/55"
              >
                {t.shortName}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[12px] text-white/40">
            {testimonialSummary.count} written endorsements ·{' '}
            {testimonialSummary.countries} countries · Certification bodies, OEMs &
            developers
          </p>
        </div>

        <Link
          href="/about#references"
          className="mt-8 inline-flex items-center gap-2 border-b border-white/30 pb-0.5 text-[13px] font-semibold text-white/90 transition-colors duration-150 hover:border-white hover:text-white sm:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          All references
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
    </Reveal>
  );
}
