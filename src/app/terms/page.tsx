import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import { cmsMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> { return cmsMetadata('terms', {
  title: 'Terms of Use',
  description: 'Terms governing the use of the Aldott website.',
}); }

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Terms of Use"
        subtitle="The terms that apply when you use this website."
      />
      <section className="bg-page py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-8 max-w-3xl space-y-6 text-text-muted text-base leading-relaxed">
          <p className="text-sm italic">
            Placeholder content, final terms of use pending legal review (spec §24).
          </p>
          <div>
            <h2 className="text-text font-semibold text-xl mb-2">Use of this site</h2>
            <p>
              This website and its content are provided for general information about
              Aldott&apos;s wind energy engineering services. Content may be updated or
              changed at any time without notice.
            </p>
          </div>
          <div>
            <h2 className="text-text font-semibold text-xl mb-2">No warranty</h2>
            <p>
              While we aim to keep information accurate and current, we make no warranties
              as to completeness or fitness for a particular purpose. Engagements are
              governed by the specific contract agreed with each client.
            </p>
          </div>
          <div>
            <h2 className="text-text font-semibold text-xl mb-2">Contact</h2>
            <p>
              Questions about these terms can be directed to{' '}
              <a href="mailto:info@aldott.in" className="text-accent underline">
                info@aldott.in
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
