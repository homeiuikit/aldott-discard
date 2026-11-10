import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import { cmsMetadata } from '@/lib/metadata';
import { privacyPolicySections, privacyPolicyUpdated } from '@/data/privacy-policy';

export async function generateMetadata(): Promise<Metadata> { return cmsMetadata('privacy-policy', {
  title: 'Privacy Policy',
  description: 'How Aldott handles personal data, contact enquiries, cookies and embedded services on this website.',
}); }

function PolicyText({ text }: { text: string }) {
  const links = /(https:\/\/knowledge\.hubspot\.com\/privacy-and-consent\/what-cookies-does-hubspot-set-in-a-visitor-s-browser|https:\/\/aldott\.de|info@aldott\.in)/g;
  return <>{text.split(links).map((part, index) => part === 'info@aldott.in'
    ? <a key={index} href={`mailto:${part}`} className="text-accent underline break-words">{part}</a>
    : part.startsWith('https://')
      ? <a key={index} href={part} className="text-accent underline break-words">{part}</a>
      : part)}</>;
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        subtitle="How we handle the information you share with us."
      />
      <article className="bg-page py-16 md:py-20" aria-label="Privacy Policy">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8 text-text-muted text-base leading-relaxed">
          <p className="text-sm mb-10">Last updated: <time dateTime="2026-11-06">{privacyPolicyUpdated}</time></p>
          <div className="space-y-10">
            {privacyPolicySections.map((section, sectionIndex) => (
              <section key={section.title} aria-labelledby={`privacy-section-${sectionIndex + 1}`}>
                <h2 id={`privacy-section-${sectionIndex + 1}`} className="text-text font-semibold text-xl mb-4">{section.title}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, index) => sectionIndex === 0 && index === 1
                    ? <address key={index} className="not-italic whitespace-pre-line"><PolicyText text={paragraph} /></address>
                    : <p key={index} className="whitespace-pre-line"><PolicyText text={paragraph} /></p>)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
