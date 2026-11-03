import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://aldott.in';
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

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
