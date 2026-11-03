import type { Metadata } from 'next';
import Eyebrow from '@/components/ui/Eyebrow';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { insights } from '@/data/insights';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Technical notes and industry perspectives from Aldott TechSolution on wind energy engineering, loads analysis, and certification.',
  robots: { index: false, follow: true },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="INSIGHTS"
        title="Technical notes from the practice"
        subtitle="Long-form articles are in preparation. Below is a preview of topics we cover with clients — contact us to discuss any of these in depth."
      />

      <Reveal className="bg-page border-b border-border section-y">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {insights.map((item) => (
              <div
                key={item.title}
                className="border border-border rounded-card p-7 bg-surface"
              >
                <Eyebrow>{item.category}</Eyebrow>
                <h2 className="mt-2 text-[17px] font-semibold text-navy leading-snug">
                  {item.title}
                </h2>
                <p className="mt-3 text-[14px] text-text-muted leading-relaxed">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
            <Button href="/contact">Discuss a topic with us</Button>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-accent-dark"
            >
              Browse services
              <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
