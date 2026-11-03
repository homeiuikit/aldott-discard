import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aldott.in'),
  title: {
    default: 'Aldott TechSolution — Wind Energy Engineering Consultancy',
    template: '%s — Aldott TechSolution',
  },
  description:
    'Independent wind energy engineering consultancy. Turbine design, loads analysis, IEC 61400 type certification support for OEMs, developers, and certification bodies. Bremen and Bengaluru.',
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
    siteName: 'Aldott TechSolution',
    locale: 'en_GB',
    url: 'https://aldott.in',
    title: 'Aldott TechSolution — Wind Energy Engineering Consultancy',
    description:
      'Independent wind energy engineering: turbine design, loads analysis, and type certification support. Offices in Bremen and Bengaluru.',
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
    title: 'Aldott TechSolution — Wind Energy Engineering Consultancy',
    description:
      'Independent wind energy engineering: turbine design, loads analysis, and type certification support.',
    images: ['/assets/photos/figma/blade.jpg'],
  },
  alternates: {
    canonical: 'https://aldott.in',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <Nav />
        <main id="main">{children}</main>
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
