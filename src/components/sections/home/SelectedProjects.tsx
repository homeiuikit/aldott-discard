import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import ProjectCard from '@/components/ui/ProjectCard';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import { projects } from '@/data/projects';

/** Selected work — three image-led project cards. */
export default function SelectedProjects() {
  const featured = projects.slice(0, 3);
  return (
    <Reveal className="bg-page border-b border-border section-y">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="flex items-end justify-between gap-4 mb-12 md:mb-14">
          <div>
            <Eyebrow className="mb-3.5">Selected work</Eyebrow>
            <h2 className="section-title">Projects that hold up under review</h2>
            <p className="mt-3 text-[15px] text-text-muted max-w-lg leading-relaxed">
              Representative engagements across fixed and floating offshore wind.
            </p>
          </div>
          <Link
            href="/projects"
            className="group hidden sm:inline-flex items-center gap-2 text-[13px] font-semibold text-accent-dark pb-0.5 border-b border-accent/30 hover:border-accent hover:gap-2.5 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            All projects
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
