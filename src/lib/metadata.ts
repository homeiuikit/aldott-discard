import type { Metadata } from 'next';
import { getCmsPage } from './api';

export async function cmsMetadata(slug: string, fallback: Metadata): Promise<Metadata> {
  const page = await getCmsPage(slug);
  if (!page) return fallback;
  const titleValue = page.seoMeta?.title || page.title || fallback.title;
  const title = typeof titleValue === 'string' ? titleValue : titleValue && typeof titleValue === 'object' && 'absolute' in titleValue ? String(titleValue.absolute) : 'aldott.de';
  const descriptionValue = page.seoMeta?.description || fallback.description;
  const description = typeof descriptionValue === 'string' ? descriptionValue : undefined;
  return {
    ...fallback,
    title: { absolute: title },
    description,
    openGraph: { ...fallback.openGraph, title, description },
  };
}
