import { siteConfig, offices } from '@/data/site';

/** Organization / ProfessionalService JSON-LD for search and knowledge panels. */
export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://aldott.in/#organization',
        name: siteConfig.name,
        url: 'https://aldott.in',
        email: siteConfig.email,
        logo: 'https://aldott.in/assets/logo-color.svg',
        sameAs: [siteConfig.linkedin],
        description:
          'Independent wind energy engineering consultancy. Turbine design, loads analysis, and type certification support for OEMs, developers, and certification bodies.',
        address: offices.map((o) => ({
          '@type': 'PostalAddress',
          addressLocality: o.city,
          addressCountry: o.country === 'Germany' ? 'DE' : 'IN',
        })),
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://aldott.in/#service',
        name: siteConfig.name,
        url: 'https://aldott.in',
        image: 'https://aldott.in/assets/photos/figma/blade.jpg',
        areaServed: ['Europe', 'India', 'Global'],
        serviceType: [
          'Wind turbine design',
          'Loads and structural analysis',
          'Type certification support',
          "Owner's engineering",
        ],
        provider: { '@id': 'https://aldott.in/#organization' },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://aldott.in/#website',
        url: 'https://aldott.in',
        name: siteConfig.name,
        publisher: { '@id': 'https://aldott.in/#organization' },
        inLanguage: 'en-GB',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
