import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import { cmsMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> { return cmsMetadata('privacy-policy', {
  title: 'Privacy Policy',
  description: 'How Aldott handles personal data submitted through this website.',
}); }

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        subtitle="How we handle the information you share with us."
      />
      <section className="bg-page py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-8 max-w-3xl space-y-6 text-text-muted text-base leading-relaxed">
          <p className="text-sm italic">
            Placeholder content, final privacy policy pending legal review (spec §24).
          </p>
          <div>
            <h2 className="text-text font-semibold text-xl mb-2">Data we collect</h2>
            <p>
              When you submit an enquiry through our contact form, we collect the details
              you provide, such as your name, company, email address, and the description
              of your project, so that we can respond to your request.
            </p>
          </div>
          <div>
            <h2 className="text-text font-semibold text-xl mb-2">How we use it</h2>
            <p>
              We use your information solely to respond to your enquiry and to communicate
              with you about your wind energy project. We do not sell your data.
            </p>
          </div>
          <div>
            <h2 className="text-text font-semibold text-xl mb-2">Contact</h2>
            <p>
              For any questions about how your data is handled, contact us at{' '}
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
