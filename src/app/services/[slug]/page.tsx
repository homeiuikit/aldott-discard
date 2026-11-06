import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import CTABand from '@/components/ui/CTABand';
import Icon from '@/components/ui/Icon';
import PageHero from '@/components/ui/PageHero';
import StandardsTag from '@/components/ui/StandardsTag';
import { getService, services, type Service } from '@/data/services';
import { cmsMetadata } from '@/lib/metadata';
import { getPublicPostContent } from '@/lib/api';

export const dynamic = 'force-dynamic';

// Per-page meta descriptions (spec §25).
const metaDescriptions: Record<string, string> = {
  'custom-turbine-design':
    'Concept-to-detail wind turbine design — rotor, drivetrain, tower, and control architecture engineered as one integrated system to IEC 61400-1.',
  'loads-structural-analysis':
    'Integrated load calculations across turbine, tower, and support structure, including wind, wave, and soil-structure interaction, to IEC 61400-1 and -3.',
  'wind-resource-site-assessment':
    'Site-specific wind and metocean analysis with P50/P90 energy yield modelling and FEED-level feasibility for financing and investment decisions.',
  'owners-engineering':
    "Independent Owner's Engineer representation and technical due diligence across wind project development and construction.",
  'type-certification-support':
    'Design documentation, load verification, and technical file preparation aligned to IEC 61400-1 and IECRE schemes, with certification body liaison.',
  'certification-body-support':
    'Independent design review and load verification for certification bodies, including BSH-level foundation verification for German offshore waters.',
  'rd-center-outreach':
    'Fully outsourced or co-located wind R&D capacity — a dedicated senior engineering team working against your product roadmap.',
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getPublicPostContent<Service>(params.slug, 'service') || getService(params.slug);
  if (!service) return {};
  const fallback: Metadata = {
    title: service.title,
    description: metaDescriptions[service.slug] ?? service.shortDescription,
  };
  const metadata = await cmsMetadata(`services--${params.slug}`, fallback);
  const seo = (service as Service & { seoMeta?: { title?: string; description?: string } }).seoMeta;
  if (!seo?.title && !seo?.description) return metadata;
  const title = seo.title || service.title;
  const description = seo.description || metaDescriptions[service.slug] || service.shortDescription;
  return { ...metadata, title: { absolute: title }, description, openGraph: { ...metadata.openGraph, title, description } };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getPublicPostContent<Service>(params.slug, 'service') || getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow="SERVICE"
        title={service.title}
        subtitle={service.shortDescription}
        image={service.image}
        imageAlt={service.title}
      />

      <section className="bg-page py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-text font-semibold text-2xl mb-4">Overview</h2>
                <p className="text-text-muted text-base leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              <div>
                <h2 className="text-text font-semibold text-2xl mb-4">
                  Key Deliverables
                </h2>
                <ul className="space-y-3">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base text-text-muted"
                    >
                      <span className="text-accent mt-0.5 shrink-0">
                        <Icon name="CheckCircle" size={20} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-[96px] bg-surface border border-border rounded-lg p-6 space-y-6">
                {service.standards.length > 0 && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted mb-2">
                      Standards Referenced
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.standards.map((tag) => (
                        <StandardsTag key={tag} outlined>
                          {tag}
                        </StandardsTag>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted mb-2">
                    Other Services
                  </p>
                  <div className="space-y-2">
                    {others.slice(0, 4).map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-150"
                      >
                        {s.title} →
                      </Link>
                    ))}
                  </div>
                </div>

                <Button
                  href={`/contact?service=${service.slug}`}
                  variant="primary"
                  className="block w-full text-center"
                >
                  Discuss This Service
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
