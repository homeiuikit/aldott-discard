import Link from 'next/link';
import type { Service } from '@/data/services';
import Icon from './Icon';
import StandardsTag from './StandardsTag';

type ServiceCardProps = {
  service: Service;
  /** How many standards tags to show (0 to hide). */
  maxStandards?: number;
  /** Override the card link (e.g. combined homepage cards that point at /services). */
  href?: string;
};

export default function ServiceCard({ service, maxStandards = 2, href }: ServiceCardProps) {
  const tags = service.standards.slice(0, maxStandards);
  return (
    <div className="relative flex flex-col bg-surface border border-border rounded-lg p-6 transition-all duration-200 hover:bg-surface-2 hover:border-accent/40 hover:shadow-md">
      <div className="text-accent mb-4">
        <Icon name={service.icon} size={20} />
      </div>
      <h3 className="text-text font-semibold text-lg leading-snug mb-2">{service.title}</h3>
      <p className="text-text-muted text-sm leading-relaxed mb-5">
        {service.shortDescription}
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <StandardsTag key={tag}>{tag}</StandardsTag>
          ))}
        </div>
      )}
      <Link
        href={href ?? `/services/${service.slug}`}
        className="relative mt-auto text-accent font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-150 after:content-[''] after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
      >
        Learn more →
      </Link>
    </div>
  );
}
