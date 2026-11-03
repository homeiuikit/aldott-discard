import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import SchematicPanel from '@/components/ui/SchematicPanel';
import StandardsTag from '@/components/ui/StandardsTag';
import type { Service } from '@/data/services';

type ServiceBlockProps = {
  service: Service;
  /** Alternate the background and image column side for visual rhythm. */
  index: number;
};

export default function ServiceBlock({ service, index }: ServiceBlockProps) {
  const alt = index % 2 === 1;
  return (
    <div
      id={service.slug}
      className={`${alt ? 'bg-surface-2' : 'bg-page'} py-16 md:py-20 border-b border-border scroll-mt-24`}
    >
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Content */}
          <div className={alt ? 'lg:order-2' : ''}>
            <h2 className="text-text font-semibold text-3xl md:text-4xl leading-tight mb-4">
              {service.title}
            </h2>
            <p className="text-text-muted text-base leading-relaxed mb-6">
              {service.fullDescription}
            </p>

            <div className="mb-6">
              <h3 className="text-text font-semibold text-sm uppercase tracking-wide mb-3">
                Key Deliverables
              </h3>
              <ul className="space-y-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <span className="text-accent mt-0.5 shrink-0">
                      <Icon name="CheckCircle" size={16} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {service.standards.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {service.standards.map((tag) => (
                  <StandardsTag key={tag}>{tag}</StandardsTag>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button href={`/contact?service=${service.slug}`} variant="primary">
                Discuss This Service
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className={alt ? 'lg:order-1' : ''}>
            <SchematicPanel
              image={service.image}
              alt={service.title}
              sizes="(max-width: 1024px) 100vw, 50vw"
              scrim={false}
              className="min-h-[280px] lg:min-h-[320px] w-full rounded-md"
            >
              <div className="relative z-10 h-full flex items-end p-4">
                <span className="inline-flex items-center gap-2 bg-page/90 backdrop-blur-sm border border-border rounded-md px-2.5 py-1.5 text-[11px] font-medium tracking-[0.06em] uppercase text-navy">
                  <span className="text-accent">
                    <Icon name={service.icon} size={14} />
                  </span>
                  {service.title}
                </span>
              </div>
            </SchematicPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
