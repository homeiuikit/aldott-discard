import type { Metadata } from 'next';
import { Suspense } from 'react';
import Icon from '@/components/ui/Icon';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/sections/contact/ContactForm';
import { offices, siteConfig } from '@/data/site';
import { cmsMetadata } from '@/lib/metadata';
import { getPublicSettings } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> { return cmsMetadata('contact', {
  title: 'Contact',
  description:
    "Contact Aldott's engineering team in Bremen and Bengaluru. Discuss wind turbine design, loads analysis, certification, or owner's engineering support.",
  openGraph: {
    title: 'Contact Aldott TechSolution',
    description:
      'Discuss your wind energy project with our engineers. Response within one business day.',
    url: 'https://aldott.de/contact',
  },
  alternates: { canonical: 'https://aldott.de/contact' },
}); }

export default async function ContactPage() {
  const settings = await getPublicSettings();
  const contactEmail = String(settings.email || siteConfig.email);
  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Contact Aldott"
        subtitle="Talk to our engineering team about your next wind energy project. We aim to respond within 1 business day."
      />

      <section className="bg-page py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form (60%) */}
            <div className="lg:col-span-3">
              <Suspense fallback={<div className="text-text-muted text-sm">Loading form…</div>}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Office details + maps (40%) */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-text font-semibold text-xl mb-2">Our Offices</h2>
                <p className="text-text-muted text-sm leading-relaxed">
                  Reach us directly at{' '}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-accent hover:underline"
                  >
                    {contactEmail}
                  </a>
                  , or use the form and we&apos;ll route your enquiry to the right team.
                </p>
              </div>

              {offices.map((office) => (
                <div
                  key={office.city}
                  className="border border-border rounded-lg overflow-hidden bg-surface"
                >
                  <div className="h-40 bg-elevated">
                    <iframe
                      src={office.mapEmbed}
                      title={`Map of ${office.city}, ${office.country}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-accent">
                        <Icon name="MapPin" size={18} />
                      </span>
                      <h3 className="text-text font-semibold text-lg">
                        {office.city}, {office.country}
                      </h3>
                    </div>
                    <div className="space-y-1.5 text-sm text-text-muted">
                      <p>{office.address.join(', ')}</p>
                      <p className="flex items-center gap-2">
                        <span className="text-accent">
                          <Icon name="Phone" size={14} />
                        </span>
                        {office.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
