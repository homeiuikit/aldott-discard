import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import StandardsTag from '@/components/ui/StandardsTag';
import { services } from '@/data/services';

const HOME_SLUGS = [
  'custom-turbine-design',
  'loads-structural-analysis',
  'type-certification-support',
];

/** Homepage core services — three curated capability cards. */
export default function CoreServices() {
  const featured = HOME_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(
    Boolean
  ) as typeof services;

  return (
    <Reveal className="bg-page border-b border-border section-y">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-14">
          <div className="max-w-xl">
            <Eyebrow className="mb-3.5">What we do</Eyebrow>
            <h2 className="section-title">
              Core engineering capabilities
            </h2>
            <p className="mt-4 text-[15px] md:text-base text-text-muted leading-relaxed">
              Disciplines, named deliverables, and explicit standards — not adjectives.
              Full catalogue on the services page.
            </p>
          </div>
          <Link
            href="/services"
            className="group hidden sm:inline-flex items-center gap-2 text-[13px] font-semibold text-accent-dark pb-0.5 border-b border-accent/30 hover:border-accent hover:gap-2.5 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            All seven services
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {featured.map((service, i) => {
            const tags = service.standards.slice(0, 2);
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card-lift group relative flex flex-col bg-page border border-border rounded-card p-8 min-h-[280px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-btn bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-200">
                    <Icon name={service.icon} size={20} />
                  </span>
                  <span className="text-[11px] font-bold text-text-muted/50 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-[17px] font-semibold text-navy mb-3 leading-snug group-hover:text-accent-dark transition-colors">
                  {service.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-text-muted mb-6 flex-1">
                  {service.shortDescription}
                </p>

                <div className="flex items-center justify-between gap-3 mt-auto pt-1">
                  {tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <StandardsTag key={tag}>{tag}</StandardsTag>
                      ))}
                    </div>
                  ) : (
                    <span />
                  )}
                  <span className="shrink-0 text-accent opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0">
                    <Icon name="ArrowRight" size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="sm:hidden mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent-dark"
          >
            All seven services
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
