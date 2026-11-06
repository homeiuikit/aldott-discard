import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import CTABand from '@/components/ui/CTABand';
import Icon from '@/components/ui/Icon';
import PageHero from '@/components/ui/PageHero';
import ProjectCard from '@/components/ui/ProjectCard';
import StandardsTag from '@/components/ui/StandardsTag';
import { getProject, projects, type Project } from '@/data/projects';
import { cmsMetadata } from '@/lib/metadata';
import { getPublicPostContent } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getPublicPostContent<Project>(params.slug, 'project') || getProject(params.slug);
  if (!project) return {};
  const metadata = await cmsMetadata(`projects--${params.slug}`, {
    title: project.title,
    description: project.outcome,
  });
  const seo = (project as Project & { seoMeta?: { title?: string; description?: string } }).seoMeta;
  if (!seo?.title && !seo?.description) return metadata;
  const title = seo.title || project.title;
  const description = seo.description || project.outcome;
  return { ...metadata, title: { absolute: title }, description, openGraph: { ...metadata.openGraph, title, description } };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getPublicPostContent<Project>(params.slug, 'project') || getProject(params.slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={project.tag}
        title={project.title}
        subtitle={project.outcome}
        image={project.image}
        imageAlt={project.title}
      />

      {/* Mobile CTA — sidebar CTA is only reachable after a long scroll otherwise (spec §15) */}
      <div className="lg:hidden bg-page border-b border-border px-6 py-5">
        <Button
          href={`/contact?service=${project.relatedServices[0]?.href.split('/').pop() ?? ''}`}
          variant="primary"
          className="block w-full text-center"
        >
          Discuss a Similar Project
        </Button>
      </div>

      <section className="py-16 md:py-20 bg-page">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-text font-semibold text-2xl mb-4 flex items-center gap-2">
                  <span className="text-accent">
                    <Icon name="AlertCircle" size={20} />
                  </span>
                  The Challenge
                </h2>
                <p className="text-text-muted text-base leading-relaxed">{project.challenge}</p>
              </div>

              <div>
                <h2 className="text-text font-semibold text-2xl mb-4 flex items-center gap-2">
                  <span className="text-accent">
                    <Icon name="GitBranch" size={20} />
                  </span>
                  Our Approach
                </h2>
                <p className="text-text-muted text-base leading-relaxed mb-4">
                  {project.approach}
                </p>
                <ul className="space-y-2">
                  {project.approachPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-text-muted"
                    >
                      <span className="text-accent mt-0.5 shrink-0">
                        <Icon name="CheckCircle" size={16} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-text font-semibold text-2xl mb-4 flex items-center gap-2">
                  <span className="text-accent">
                    <Icon name="TrendingUp" size={20} />
                  </span>
                  The Outcome
                </h2>
                <p className="text-text-muted text-base leading-relaxed">{project.result}</p>
              </div>
            </div>

            {/* Sticky sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-[96px] bg-surface border border-border rounded-lg p-6 space-y-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    Service Type
                  </p>
                  <span className="bg-accent text-page text-xs font-semibold px-2 py-1 rounded">
                    {project.tag}
                  </span>
                </div>

                {project.region && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                      Region
                    </p>
                    <p className="text-text font-medium text-sm">{project.region}</p>
                  </div>
                )}

                {project.capacity && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                      Capacity
                    </p>
                    <p className="text-text font-medium text-sm tabular-nums">
                      {project.capacity}
                    </p>
                  </div>
                )}

                {project.standards.length > 0 && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted mb-2">
                      Standards Referenced
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.standards.map((tag) => (
                        <StandardsTag key={tag} outlined>
                          {tag}
                        </StandardsTag>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted mb-2">
                    Related Services
                  </p>
                  <div className="space-y-2">
                    {project.relatedServices.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-150"
                      >
                        {svc.label} →
                      </Link>
                    ))}
                  </div>
                </div>

                <Button
                  href={`/contact?service=${project.relatedServices[0]?.href.split('/').pop() ?? ''}`}
                  variant="primary"
                  className="block w-full text-center"
                >
                  Discuss a Similar Project
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="bg-surface-2 py-16">
          <div className="max-w-content mx-auto px-6 md:px-8">
            <h2 className="text-text font-semibold text-2xl mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
