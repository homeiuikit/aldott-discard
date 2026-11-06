import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { API_BASE } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://aldott.de';
  const now = new Date();
  try {
    const [pageResponse, postResponse] = await Promise.all([fetch(`${API_BASE}/pages`, { cache: 'no-store' }), fetch(`${API_BASE}/posts`, { cache: 'no-store' })]);
    if (pageResponse.ok && postResponse.ok) {
      const [cmsPages, cmsPosts] = await Promise.all([pageResponse.json(), postResponse.json()]);
      return [
        ...cmsPages.map((page: { slug: string; updatedAt: string }) => ({ url: page.slug === 'home' ? base : `${base}/${page.slug.replace(/--/g, '/')}`, lastModified: new Date(page.updatedAt), changeFrequency: 'monthly' as const, priority: page.slug === 'home' ? 1 : 0.7 })),
        ...cmsPosts.map((post: { slug: string; type: string; updatedAt: string }) => ({ url: `${base}/${post.type === 'service' ? 'services' : post.type === 'project' ? 'projects' : 'insights'}/${post.slug}`, lastModified: new Date(post.updatedAt), changeFrequency: 'monthly' as const, priority: 0.6 })),
      ];
    }
  } catch { /* The existing site route list below is the local fallback. */ }

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/services',
    '/projects',
    '/about',
    '/contact',
    '/vision',
    '/insights',
    '/privacy-policy',
    '/terms',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority:
      path === ''
        ? 1
        : path === '/contact' || path === '/services'
          ? 0.9
          : 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
