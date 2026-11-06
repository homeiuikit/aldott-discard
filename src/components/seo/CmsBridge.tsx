'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cmsSlugForPath, getCmsPage, type CmsPage } from '@/lib/api';

export default function CmsBridge() {
  const pathname = usePathname() || '/';
  const [page, setPage] = useState<CmsPage | null>(null);
  useEffect(() => {
    let live = true;
    setPage(null);
    getCmsPage(cmsSlugForPath(pathname))
      .then((record) => { if (live) setPage(record); })
      .catch(() => { if (live) setPage(null); });
    return () => { live = false; };
  }, [pathname]);

  useEffect(() => {
    if (!page) return;
    const title = page.seoMeta?.title || page.title;
    if (title) document.title = title;
    const description = page.seoMeta?.description;
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
      meta.content = description;
    }
    const heading = document.querySelector<HTMLElement>('#main h1');
    if (heading && page.title) heading.textContent = page.title;
  }, [page]);

  const html = page?.contentBlocks?.map((block) => block.html || block.text || '').filter(Boolean).join('\n');
  const pageUrl = typeof window === 'undefined' ? '' : `${window.location.origin}${pathname}`;
  return <>
    {page ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.seoMeta?.description || '', url: pageUrl }).replace(/</g, '\\u003c') }} /> : null}
    {html ? <section className="bg-page py-8"><div className="max-w-content mx-auto px-6 md:px-8"><div className="mx-auto max-w-3xl text-text-muted leading-relaxed cms-content" dangerouslySetInnerHTML={{ __html: html }} /></div></section> : null}
  </>;
}
