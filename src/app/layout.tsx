import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import CmsBridge from '@/components/seo/CmsBridge';
import { getCmsPage, getPublicSettings } from '@/lib/api';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage('home');
  const settings = await getPublicSettings();
  const pageTitle = page?.seoMeta?.title || settings.defaultSeo?.title || 'Aldott TechSolution — Wind Energy Engineering Consultancy';
  const pageDescription = page?.seoMeta?.description || settings.defaultSeo?.description || 'Independent wind energy engineering consultancy. Turbine design, loads analysis, IEC 61400 type certification support for OEMs, developers, and certification bodies. Bremen and Bengaluru.';
  return {
  metadataBase: new URL('https://aldott.de'),
  title: {
    default: pageTitle,
    template: '%s — Aldott TechSolution',
  },
  description:
    pageDescription,
  keywords: [
    'wind energy engineering',
    'turbine design',
    'loads analysis',
    'IEC 61400',
    'type certification',
    "owner's engineering",
    'offshore wind',
    'onshore wind',
    'Bremen',
    'Bengaluru',
  ],
  authors: [{ name: 'Aldott TechSolution' }],
  creator: 'Aldott TechSolution',
  openGraph: {
    type: 'website',
    siteName: 'aldott.de',
    locale: 'en_GB',
    url: 'https://aldott.de',
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: '/assets/photos/figma/blade.jpg',
        width: 1200,
        height: 630,
        alt: 'Aldott TechSolution — wind energy engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/assets/photos/figma/blade.jpg'],
  },
  alternates: {
    canonical: 'https://aldott.de',
  },
  robots: {
    index: true,
    follow: true,
  },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getPublicSettings();
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-page text-text">
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-3 focus:left-3 focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-btn"
        >
          Skip to content
        </a>
        <Nav logoUrl={settings.logo} />
        <main id="main">{children}</main>
        <CmsBridge />
        <Footer />
        {/* HubSpot tracking (portal 47084751) */}
        <Script
          id="hs-script-loader"
          src="https://js-na2.hs-scripts.com/47084751.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
