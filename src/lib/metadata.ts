import type { Metadata } from 'next';
import { getCmsPage } from './api';

export async function cmsMetadata(slug: string, fallback: Metadata): Promise<Metadata> {
  const page = await getCmsPage(slug);
  const path = slug === 'home' ? '/' : `/${slug.replace(/--/g, '/')}`;
  const base: Metadata = { ...fallback, alternates: { ...fallback.alternates, canonical: path }, openGraph: { ...fallback.openGraph, url: `https://aldott.de${path}` } };
  if (!page) return base;
  const titleValue = page.seoMeta?.title || page.title || fallback.title;
  const title = typeof titleValue === 'string' ? titleValue : titleValue && typeof titleValue === 'object' && 'absolute' in titleValue ? String(titleValue.absolute) : 'aldott.de';
  const descriptionValue = page.seoMeta?.description || fallback.description;
  const description = typeof descriptionValue === 'string' ? descriptionValue : undefined;
  return {
    ...base,
    title: { absolute: title },
    description,
    openGraph: { ...base.openGraph, title, description },
  };
}
