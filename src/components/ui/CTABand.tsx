import Link from 'next/link';
import Eyebrow from './Eyebrow';
import Icon from './Icon';
import Reveal from './Reveal';
import { offices, siteConfig } from '@/data/site';

/** Contact CTA — high-weight navy close for the homepage primary action. */
export default function CTABand() {
  return (
    <Reveal className="relative bg-navy py-20 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 motif-grid-dark opacity-50 pointer-events-none"
        aria-hidden="true"
      />
      {/* Subtle radial accent */}
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-accent/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-content mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow tone="light" className="mb-5">Next step</Eyebrow>
            <h2 className="text-white font-bold text-[2rem] md:text-4xl lg:text-[2.75rem] leading-[1.08] tracking-[-0.03em] mb-5 max-w-[16ch]">
              Discuss a project with our engineers
            </h2>
            <p className="text-white/60 text-[15px] md:text-base leading-relaxed max-w-md mb-9">
              Talk to our engineering team about your next wind energy project. We aim to
              respond within one business day.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-navy text-[15px] font-semibold px-7 py-3.5 rounded-btn hover:bg-white/92 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Discuss a project
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white text-[15px] font-semibold px-6 py-3.5 rounded-btn hover:border-white/50 hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon name="Mail" size={15} />
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {offices.map((office) => (
              <div
                key={office.city}
                className="px-6 py-5 rounded-card border border-white/12 bg-white/[0.03]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent">
                    <Icon name="MapPin" size={14} />
                  </span>
                  <span className="text-[13px] font-semibold text-white">
                    {office.city}, {office.country}
                  </span>
                </div>
                <p className="text-[12px] text-white/60 leading-relaxed pl-6">
                  {office.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
