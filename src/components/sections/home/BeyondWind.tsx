import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';

/** Future Directions — slim quarantine teaser (solar/H₂ not in core narrative). */
export default function BeyondWind() {
  return (
    <Reveal className="bg-page border-b border-border py-12 md:py-14" aria-label="Future Directions">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="relative overflow-hidden rounded-card border border-border bg-surface">
          <div
            className="absolute inset-0 motif-grid opacity-40 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-7 md:px-9 py-8 md:py-9">
            <div className="max-w-2xl">
              <Eyebrow className="mb-2">Future Directions</Eyebrow>
              <h2 className="text-navy font-bold text-xl md:text-2xl tracking-[-0.02em] mb-2">
                Beyond wind: solar PV and green hydrogen
              </h2>
              <p className="text-[14px] text-text-muted leading-relaxed">
                A statement of engineering intent — not a current service catalogue. Wind
                remains our core practice.
              </p>
            </div>
            <Link
              href="/vision"
              className="group inline-flex items-center justify-center gap-2 shrink-0 self-start md:self-center bg-navy text-white text-[13px] font-semibold px-5 py-2.5 rounded-btn hover:bg-navy-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Explore vision
              <span className="transition-transform duration-150 group-hover:translate-x-0.5">
                <Icon name="ArrowRight" size={14} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
