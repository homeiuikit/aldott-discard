import Link from 'next/link';
import type { Project } from '@/data/projects';
import Icon from './Icon';
import SchematicPanel from './SchematicPanel';

/** Project card — image-led editorial tile. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-lift group flex flex-col bg-page border border-border rounded-card overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <SchematicPanel
        image={project.image}
        alt={project.title}
        schematic={false}
        warm={project.warm}
        scrim={false}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="w-full h-[220px] md:h-[240px]"
      >
        <span className="absolute top-4 left-4 z-10 bg-page/95 border border-border text-accent-dark text-[10px] font-semibold px-2.5 py-1 rounded-sm uppercase tracking-[0.06em]">
          {project.tag}
        </span>
        {project.region && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-page/95 border border-border rounded-sm px-2.5 py-1 text-text-muted">
            <Icon name="MapPin" size={11} />
            <span className="text-[10px] font-medium">{project.region}</span>
          </div>
        )}
      </SchematicPanel>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-[15px] md:text-[16px] font-semibold leading-snug text-navy mb-3 group-hover:text-accent-dark transition-colors">
          {project.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-text-muted mb-5 flex-1 line-clamp-3">
          {project.outcome}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent-dark transition-all duration-150 group-hover:gap-2.5">
          View project
          <Icon name="ArrowRight" size={13} />
        </span>
      </div>
    </Link>
  );
}
