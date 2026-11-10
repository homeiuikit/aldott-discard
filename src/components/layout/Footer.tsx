import Link from 'next/link';
import NewsletterForm from '@/components/sections/contact/NewsletterForm';
import { services } from '@/data/services';
import { offices, siteConfig } from '@/data/site';
import Icon from '@/components/ui/Icon';
import { getPublicSettings } from '@/lib/api';

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Future Directions', href: '/vision' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export default async function Footer() {
  const settings = await getPublicSettings();
  const email = String(settings.email || siteConfig.email);
  const linkedin = String(settings.socialLinks?.linkedin || siteConfig.linkedin);
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-content mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" aria-label="Aldott TechSolution home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo-white.svg"
                alt="Aldott TechSolution"
                width={106}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mt-4 max-w-xs">
              {siteConfig.tagline}
            </p>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
            >
              <Icon name="Linkedin" size={16} />
              LinkedIn
            </a>
          </div>

          <div>
            <h2 className="text-white font-semibold text-sm uppercase tracking-[0.08em] mb-4">
              Services
            </h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-sm uppercase tracking-[0.08em] mb-4">
              Company
            </h2>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-sm uppercase tracking-[0.08em] mb-4">
              Contact
            </h2>
            <ul className="space-y-4">
              {offices.map((office) => (
                <li key={office.city} className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 shrink-0">
                    <Icon name="MapPin" size={16} />
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {office.city}, {office.country}
                    </p>
                    <p className="text-white/50 text-xs leading-relaxed mt-0.5">
                      {office.address.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < office.address.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <span className="text-accent shrink-0">
                  <Icon name="Mail" size={16} />
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <NewsletterForm />
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-content mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} {siteConfig.legalName} · Bremen, Germany ·
            20+ Years · 150+ Projects · 25+ Markets · 10+ Global Awards
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-white/60 text-xs hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/60 text-xs hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
            <a
              href="/assets/photos/CREDITS.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 text-xs hover:text-white transition-colors"
            >
              Image credits
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
