// src/data/site.ts
// Shared, single-source-of-truth site constants: nav, offices, metrics, contact.

export const siteConfig = {
  name: 'Aldott TechSolution',
  legalName: 'Aldott TechSolution',
  email: 'info@aldott.in',
  linkedin: 'https://linkedin.com/company/aldott',
  tagline:
    'Global wind energy design house. We don’t chase the wind. We engineer it.',
};

export const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export type Metric = {
  value: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: '20+', label: 'Years of Engineering' },
  { value: '150+', label: 'Projects Delivered' },
  { value: '25+', label: 'Markets Served' },
  { value: '10+', label: 'Global Awards' },
];

export type Office = {
  city: string;
  country: string;
  role: string;
  address: string[];
  phone: string;
  mapEmbed: string;
};

export const offices: Office[] = [
  {
    city: 'Bremen',
    country: 'Germany',
    role: 'European headquarters, client engagement, project management, certification coordination',
    address: ['Bürger-m-Reuter-Str 32', '28327 Bremen, Germany'],
    phone: '+49 152 1181 8515',
    mapEmbed:
      'https://www.google.com/maps?q=B%C3%BCrger-m-Reuter-Str+32%2C+28327+Bremen%2C+Germany&output=embed',
  },
  {
    city: 'Bengaluru',
    country: 'India',
    role: 'Engineering office, loads analysis, design support, documentation',
    address: ['Bengaluru, India'],
    phone: '+91 8085 408113',
    mapEmbed: 'https://www.google.com/maps?q=Bengaluru,India&output=embed',
  },
];
