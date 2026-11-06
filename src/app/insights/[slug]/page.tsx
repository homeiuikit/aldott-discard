import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { API_BASE, getPublicPost } from '@/lib/api';

export const dynamic = 'force-dynamic';
type Props = { params: { slug: string } };
const articleBody = (post: any) => (Array.isArray(post.contentBlocks) ? post.contentBlocks.find((block: any) => block.type === 'article' || block.type === 'html')?.html : '') || '';
const description = (post: any) => post.seoMeta?.description || post.contentBlocks?.find((block: any) => block.type === 'article')?.excerpt || post.contentBlocks?.find((block: any) => block.type === 'summary')?.text || '';
const imageUrl = (image: string) => image?.startsWith('http') ? image : image?.startsWith('/uploads/') ? `${API_BASE.replace('/api/v1', '')}${image}` : image;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublicPost(params.slug, 'insight');
  if (!post) return {};
  const title = post.seoMeta?.title || post.title;
  const desc = description(post);
  const image = post.featuredImage ? imageUrl(post.featuredImage) : undefined;
  return {
    title: { absolute: title }, description: desc,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { type: 'article', title, description: desc, url: `https://aldott.de/insights/${post.slug}`, publishedTime: post.publishedAt, images: image ? [{ url: image, alt: post.title }] : undefined },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description: desc, images: image ? [image] : undefined },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const post = await getPublicPost(params.slug, 'insight');
  if (!post) notFound();
  const summary = description(post);
  const html = articleBody(post);
  const image = post.featuredImage ? imageUrl(post.featuredImage) : undefined;
  const jsonLdImage = image?.startsWith('/') ? `https://aldott.de${image}` : image;
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title,
    description: summary, image: jsonLdImage ? [jsonLdImage] : undefined,
    datePublished: post.publishedAt, dateModified: post.updatedAt,
    mainEntityOfPage: `https://aldott.de/insights/${post.slug}`, publisher: { '@type': 'Organization', name: 'aldott.de', url: 'https://aldott.de' },
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <PageHero eyebrow={post.categories?.[0]?.name || 'INSIGHTS'} title={post.title} subtitle={summary} image={image} imageAlt={post.title} />
    <article className="bg-page section-y">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(260px,0.85fr)] lg:gap-16">
          <div>
            <Link href="/insights" className="text-sm font-semibold text-accent-dark">← All insights</Link>
            {post.publishedAt && <p className="mt-6 text-sm text-text-muted">{new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
            {html ? <div className="article-body mt-8 max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} /> : summary && <p className="mt-8 max-w-3xl text-base leading-relaxed text-text-muted">{summary}</p>}
          </div>
          <aside className="lg:pt-8">
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold text-navy">Discuss a topic with us</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">Talk with our team about how this relates to your project.</p>
              <Button href="/contact" className="mt-5 block w-full text-center">Contact aldott.de</Button>
            </div>
          </aside>
        </div>
      </div>
    </article>
  </>;
}
