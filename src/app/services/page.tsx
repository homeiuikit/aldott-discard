import type { Metadata } from 'next';
import CTABand from '@/components/ui/CTABand';
import PageHero from '@/components/ui/PageHero';
import ServiceBlock from '@/components/sections/services/ServiceBlock';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Engineering Services',
  description:
    'Seven wind energy engineering service lines: custom turbine design, loads & structural analysis, wind resource & site assessment, owner’s engineering, type certification support, certification body support, and R&D center outreach.',
  openGraph: {
    title: 'Engineering Services — Aldott TechSolution',
    description:
      'Turbine design, loads analysis, type certification, and owner’s engineering for onshore and offshore wind.',
    url: 'https://aldott.in/services',
  },
  alternates: { canonical: 'https://aldott.in/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="WHAT WE DO"
        title="Full-stack engineering, concept to certificate"
        subtitle="Seven service lines across the wind lifecycle, for OEMs, developers, and certification bodies."
        image="/assets/photos/figma/blade.jpg"
        imageAlt="Wind turbine nacelle and rotor hub"
      />

      <section className="bg-page py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto text-center">
            Aldott TechSolution is the engineering and R&amp;D engine behind turbine
            OEMs, developers, and certification bodies worldwide, delivering
            independent engineering across the full project lifecycle, grounded in
            the IEC 61400 series and IECRE schemes.
          </p>
        </div>
      </section>

      {services.map((service, index) => (
        <ServiceBlock key={service.slug} service={service} index={index} />
      ))}

      <CTABand />
    </>
  );
}
