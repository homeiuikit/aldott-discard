import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { API_BASE } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://aldott.de';
  const now = new Date();
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

  const entries = new Map([...staticRoutes, ...serviceRoutes, ...projectRoutes].map(entry => [entry.url, entry]));
  // Static routes remain available even when CMS collections are empty or partial.
  try {
    const [pageResponse, postResponse] = await Promise.all([fetch(`${API_BASE}/pages`, { cache: 'no-store' }), fetch(`${API_BASE}/posts`, { cache: 'no-store' })]);
    if (pageResponse.ok) {
      const pages: Array<{ slug: string; updatedAt: string }> = await pageResponse.json();
      for (const page of pages) {
        const url = page.slug === 'home' ? base : `${base}/${page.slug.replace(/--/g, '/')}`;
        entries.set(url, { url, lastModified: new Date(page.updatedAt), changeFrequency: 'monthly', priority: page.slug === 'home' ? 1 : 0.7 });
      }
    }
    if (postResponse.ok) {
      const posts: Array<{ slug: string; type: string; updatedAt: string }> = await postResponse.json();
      for (const post of posts) {
        const url = `${base}/${post.type === 'service' ? 'services' : post.type === 'project' ? 'projects' : 'insights'}/${post.slug}`;
        entries.set(url, { url, lastModified: new Date(post.updatedAt), changeFrequency: 'monthly', priority: 0.6 });
      }
    }
  } catch { /* Keep known public routes when the API is unavailable. */ }
  return [...entries.values()];
}
