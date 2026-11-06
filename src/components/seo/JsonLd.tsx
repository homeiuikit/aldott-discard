import { siteConfig, offices } from '@/data/site';
import { getCmsPage, getPublicSettings } from '@/lib/api';

/** Organization / ProfessionalService JSON-LD for search and knowledge panels. */
export default async function JsonLd() {
  const page = await getCmsPage('home');
  const settings = await getPublicSettings();
  const description = page?.seoMeta?.description || settings.defaultSeo?.description || 'Independent wind energy engineering consultancy. Turbine design, loads analysis, and type certification support for OEMs, developers, and certification bodies.';
  const siteName = String(settings.siteName || 'aldott.de');
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://aldott.de/#organization',
        name: siteName,
        url: 'https://aldott.de',
        email: String(settings.email || siteConfig.email),
        telephone: String(settings.phone || ''),
        logo: `https://aldott.de${String(settings.logo || '/assets/logo-color.svg')}`,
        sameAs: [String((settings.socialLinks || {}).linkedin || siteConfig.linkedin)],
        description,
        address: Array.isArray(settings.address) ? settings.address.map((a: any) => ({
          '@type': 'PostalAddress',
          addressLocality: a.city,
          addressCountry: a.country === 'Germany' ? 'DE' : a.country === 'India' ? 'IN' : a.country,
        })) : offices.map((o) => ({ '@type': 'PostalAddress', addressLocality: o.city, addressCountry: o.country === 'Germany' ? 'DE' : 'IN' })),
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://aldott.de/#service',
        name: siteName,
        url: 'https://aldott.de',
        image: 'https://aldott.de/assets/photos/figma/blade.jpg',
        areaServed: ['Europe', 'India', 'Global'],
        serviceType: [
          'Wind turbine design',
          'Loads and structural analysis',
          'Type certification support',
          "Owner's engineering",
        ],
        provider: { '@id': 'https://aldott.de/#organization' },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://aldott.de/#website',
        url: 'https://aldott.de',
        name: siteName,
        publisher: { '@id': 'https://aldott.de/#organization' },
        inLanguage: 'en-GB',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
