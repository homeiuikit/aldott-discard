import type { Metadata } from 'next';
import Eyebrow from '@/components/ui/Eyebrow';
import Link from 'next/link';
import CTABand from '@/components/ui/CTABand';
import Icon from '@/components/ui/Icon';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { visionIntro, beyondWind, roadmap } from '@/data/vision';
import { cmsMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> { return cmsMetadata('vision', {
  title: 'Future Directions',
  description:
    'Aldott is extending wind-grade engineering methodology into utility-scale solar PV and green hydrogen. A statement of intent — not a current service catalogue. Wind remains the core practice.',
  openGraph: {
    title: 'Future Directions — Aldott TechSolution',
    description:
      'Beyond wind: solar PV and green hydrogen as engineering intent, not a service catalogue.',
    url: 'https://aldott.de/vision',
  },
  alternates: { canonical: 'https://aldott.de/vision' },
}); }

export default function VisionPage() {
  return (
    <>
      <PageHero
        eyebrow="FUTURE DIRECTIONS"
        title="Beyond wind: engineering the next generation of clean energy"
        subtitle="Aldott was built on wind. What we are building next is broader — and it starts from the same discipline that got us here."
        image="/assets/photos/figma/project-1.jpg"
        imageAlt="Wind turbine nacelle against a blue sky"
      />

      {/* Intro */}
      <Reveal className="bg-page py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <p className="text-text-muted text-lg leading-relaxed max-w-3xl">
            {visionIntro}
          </p>
        </div>
      </Reveal>

      {/* Solar + Hydrogen */}
      <Reveal className="bg-surface-2 border-t border-border py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <Eyebrow tone="muted" className="mb-8">Where we are headed</Eyebrow>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
            {beyondWind.map((b) => (
              <div key={b.label} className="flex flex-col h-full bg-surface p-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-accent">
                    <Icon name={b.icon} size={22} />
                  </span>
                  <Eyebrow tone="muted">{b.label}</Eyebrow>
                </div>
                <h2 className="text-xl font-bold text-text tracking-[-0.02em] mb-5">
                  {b.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {b.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="text-accent mt-0.5 shrink-0">
                        <Icon name="CheckCircle2" size={14} />
                      </span>
                      <span className="text-[13px] leading-relaxed text-text-muted">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Roadmap */}
      <Reveal className="bg-page border-t border-border py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <Eyebrow tone="muted" className="mb-8">How we get there</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {roadmap.map((r, i) => (
              <div key={r.num} className="flex flex-col h-full bg-surface p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-bold text-accent tabular-nums">{r.num}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-soft">
                    Phase {i + 1}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-text mb-2.5">{r.title}</h3>
                <p className="text-[12px] leading-relaxed text-text-soft">{r.body}</p>
              </div>
            ))}
          </div>

          {/* Let's talk early */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-12 p-7 rounded-lg border border-border bg-surface">
            <p className="text-text-muted text-[14px] leading-relaxed max-w-xl">
              We are already in a position to have serious technical conversations
              about early-stage solar, hybrid, and hydrogen infrastructure projects.
              If you are a developer, OEM, or investor thinking about the next
              generation of assets, let’s talk early.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 shrink-0 text-[13px] font-semibold bg-text text-page px-6 py-3 rounded-md hover:bg-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Start the conversation <Icon name="ArrowUpRight" size={14} />
            </Link>
          </div>
        </div>
      </Reveal>

      <CTABand />
    </>
  );
}
