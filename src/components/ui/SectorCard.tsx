import Link from 'next/link';
import type { Sector } from '@/data/sectors';
import Icon from './Icon';

export default function SectorCard({ sector }: { sector: Sector }) {
  return (
    <div className="relative flex flex-col bg-surface border border-border rounded-lg p-6 transition-all duration-200 hover:bg-surface-2 hover:border-accent/40 hover:shadow-md">
      <div className="text-accent mb-4">
        <Icon name={sector.icon} size={24} />
      </div>
      <h3 className="text-text font-semibold text-xl mb-2">{sector.title}</h3>
      <p className="text-text-muted text-base leading-relaxed mb-4">
        {sector.description}
      </p>
      <Link
        href={sector.relatedServicesLink}
        className="relative mt-auto text-accent font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-150 after:content-[''] after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
      >
        See relevant services →
      </Link>
    </div>
  );
}
