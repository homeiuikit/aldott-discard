'use client';

import { useMemo, useState } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import type { Project } from '@/data/projects';

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  // Filters derive from the tags that actually exist in the data, so we never
  // show a category with zero matching projects.
  const categories = useMemo(() => {
    const tags = Array.from(new Set(projects.map((p) => p.tag)));
    return ['All', ...tags];
  }, [projects]);

  const [active, setActive] = useState('All');

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.tag === active)),
    [active, projects]
  );

  return (
    <>
      {/* Sticky filter bar */}
      <div className="bg-elevated border-b border-border sticky top-[72px] z-40">
        <div className="max-w-content mx-auto px-6 md:px-8 py-4 flex items-center gap-3 overflow-x-auto">
          {categories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive
                    ? 'bg-accent text-page'
                    : 'text-text-muted hover:bg-surface-2 hover:text-text'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <section className="bg-page py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
