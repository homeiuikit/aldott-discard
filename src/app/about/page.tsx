import type { Metadata } from 'next';
import CTABand from '@/components/ui/CTABand';
import Icon from '@/components/ui/Icon';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialCard from '@/components/ui/TestimonialCard';
import ValueCard from '@/components/ui/ValueCard';
import { offices } from '@/data/site';
import { aboutIntro, founder, proofCards } from '@/data/about';
import { testimonials } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Aldott TechSolution is a Bremen-headquartered wind energy design house — a full-stack engineering partner covering loads, structural and foundation engineering, certification, and project development for onshore and offshore wind.',
  openGraph: {
    title: 'About Aldott TechSolution',
    description:
      'Independent wind energy design house. Bremen headquarters, Bengaluru engineering office.',
    url: 'https://aldott.in/about',
  },
  alternates: { canonical: 'https://aldott.in/about' },
};

const values = [
  {
    icon: 'Shield',
    title: 'Independence',
    body: 'Aldott is not owned by a turbine OEM, developer, or certification body. Our advice is based on technical merit and project requirements, not a parent company’s commercial interest.',
  },
  {
    icon: 'Microscope',
    title: 'Technical Rigour',
    body: 'Every deliverable is grounded in the IEC 61400 series, IECRE logic, and BSH-level rigour, structured to survive independent certification review.',
  },
  {
    icon: 'CheckSquare',
    title: 'Delivery Focus',
    body: 'We define clear milestones, communicate proactively, and manage scope carefully. Clients know exactly where their project stands at every stage.',
  },
  {
    icon: 'Handshake',
    title: 'Long-Term Partnership',
    body: 'At 150+ projects, clients return for the next phase instead of re-tendering — the senior engineers who ran the numbers stay on the file.',
  },
];

const clientReferences = testimonials.filter((t) => t.kind === 'client');
const leadershipReferences = testimonials.filter((t) => t.kind === 'leadership');

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="Our mission: to be your R&D powerhouse"
        subtitle="A Bremen-headquartered design house serving the global wind industry — a full-stack engineering partner, not a staffing bench."
        image="/assets/photos/turbine-rotor.jpg"
        imageAlt="A wind turbine rotor and nacelle against an open sky"
      />

      {/* Who we are / How we work / What we deliver */}
      <Reveal className="bg-page py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {aboutIntro.map((col) => (
              <div key={col.title} className="flex flex-col bg-surface p-7">
                <h2 className="text-text font-semibold text-lg mb-3">{col.title}</h2>
                <p className="text-text-muted text-[15px] leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Leadership + proof cards */}
      <Reveal className="bg-surface-2 py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <SectionHeading eyebrow="LEADERSHIP" title="Senior hands on every file" />

          <div className="flex items-center gap-4 p-5 rounded-lg border border-border bg-surface mb-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-[15px] font-bold bg-accent-soft text-accent">
              {founder.initials}
            </div>
            <div>
              <div className="text-[15px] font-semibold text-text">{founder.name}</div>
              <div className="text-[13px] text-text-soft leading-snug">
                {founder.role} · {founder.bio}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
            {proofCards.map((p) => (
              <div key={p.title} className="flex flex-col bg-surface p-6">
                <span className="text-accent mb-4">
                  <Icon name={p.icon} size={22} />
                </span>
                <h3 className="text-text font-semibold text-base mb-2">{p.title}</h3>
                <p className="text-text-soft text-[13px] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Client references */}
      <Reveal className="bg-page py-16 md:py-24" id="references">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <SectionHeading
            eyebrow="CLIENT REFERENCES"
            title="Written endorsements, signed and dated"
            subtitle="Recommendations held on file from certification bodies, turbine OEMs, and offshore developers, spanning 2015 to 2025."
            label={`${clientReferences.length + leadershipReferences.length} references`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientReferences.map((t) => (
              <TestimonialCard key={t.slug} testimonial={t} variant="full" />
            ))}
          </div>

          {leadershipReferences.length > 0 && (
            <div className="mt-14">
              <h3 className="text-text font-semibold text-xl mb-2">
                Leadership references
              </h3>
              <p className="text-text-muted text-[15px] leading-relaxed max-w-2xl mb-8">
                Endorsements written for Vikram Singh Rajput for work delivered
                before Aldott TechSolution, including his tenure at DEWI-OCC.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leadershipReferences.map((t) => (
                  <TestimonialCard key={t.slug} testimonial={t} variant="full" />
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>

      {/* Locations */}
      <Reveal className="bg-surface-2 py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <SectionHeading eyebrow="WHERE WE WORK" title="Our Offices" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office) => (
              <div
                key={office.city}
                className="bg-surface border border-border rounded-lg overflow-hidden"
              >
                <div className="h-48 bg-elevated">
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
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-accent">
                      <Icon name="MapPin" size={20} />
                    </span>
                    <h3 className="text-text font-semibold text-xl">
                      {office.city}, {office.country}
                    </h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">{office.role}</p>
                  <div className="space-y-2 text-sm text-text-muted">
                    <p className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">
                        <Icon name="Building2" size={16} />
                      </span>
                      <span>{office.address.join(', ')}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-accent">
                        <Icon name="Phone" size={16} />
                      </span>
                      {office.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-accent">
                        <Icon name="Mail" size={16} />
                      </span>
                      <a
                        href="mailto:info@aldott.in"
                        className="hover:text-accent transition-colors"
                      >
                        info@aldott.in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Our approach */}
      <Reveal className="bg-page py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <SectionHeading eyebrow="HOW WE WORK" title="Our Approach" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <ValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                body={value.body}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <CTABand />
    </>
  );
}
