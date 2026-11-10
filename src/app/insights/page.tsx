import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { insights } from '@/data/insights';
import { cmsMetadata } from '@/lib/metadata';
import { API_BASE, getPublicPosts } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await cmsMetadata('insights', {
    title: 'Insights',
    description: 'Technical notes and industry perspectives from Aldott TechSolution on wind energy engineering, loads analysis, and certification.',
    robots: { index: true, follow: true },
  });
  return { ...metadata, alternates: { ...metadata.alternates, canonical: '/insights' }, openGraph: { ...metadata.openGraph, type: 'website', url: 'https://aldott.de/insights' } };
}

const imageUrl = (image: string) => image?.startsWith('http') ? image : image?.startsWith('/uploads/') ? `${API_BASE.replace('/api/v1', '')}${image}` : image;

export default async function InsightsPage() {
  const posts = await getPublicPosts('insight');
  const topics = posts.length ? posts.map((post: any) => ({
    slug: post.slug,
    category: post.categories?.[0]?.name || 'Insight',
    title: post.title,
    summary: post.seoMeta?.description || post.contentBlocks?.find((block: any) => block.type === 'article')?.excerpt || post.contentBlocks?.find((block: any) => block.type === 'summary')?.text || '',
    image: post.featuredImage || '',
  })) : insights;

  return <>
    <PageHero
      eyebrow="INSIGHTS"
      title="Technical notes from the practice"
      subtitle="Practical perspectives on wind energy engineering, project delivery, and certification."
    />
    <Reveal className="bg-page border-b border-border section-y">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topics.map((item) => (
            <Link key={item.slug} href={posts.length ? `/insights/${item.slug}` : `/contact?topic=${encodeURIComponent(item.slug)}`} className="group overflow-hidden border border-border rounded-card bg-surface transition-colors hover:bg-surface-2">
              {item.image && <div className="relative aspect-[16/8] w-full overflow-hidden bg-surface-2"><Image src={imageUrl(item.image)} alt={item.title} fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" /></div>}
              <div className="p-7">
                <Eyebrow>{item.category}</Eyebrow>
                <h2 className="mt-2 text-[17px] font-semibold text-navy leading-snug">{item.title}</h2>
                <p className="mt-3 text-[14px] text-text-muted leading-relaxed">{item.summary}</p>
                <span className="inline-block mt-5 text-sm font-semibold text-accent-dark">{posts.length ? 'Read article →' : 'Request briefing →'}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
          <Button href="/contact">Discuss a topic with us</Button>
          <Link href="/services" className="inline-flex items-center gap-2 text-[14px] font-semibold text-accent-dark">Browse services <Icon name="ArrowRight" size={14} /></Link>
        </div>
      </div>
    </Reveal>
  </>;
}
