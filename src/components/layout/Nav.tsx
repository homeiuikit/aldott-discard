'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks } from '@/data/site';
import Icon from '@/components/ui/Icon';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className={`sticky top-0 z-50 bg-elevated/97 backdrop-blur-md border-b transition-[box-shadow,border-color] duration-200 ${
        scrolled ? 'shadow-md border-border' : 'border-border/80'
      }`}
    >
      <div className="relative max-w-content mx-auto px-6 md:px-8 h-[72px] flex items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center shrink-0"
          aria-label="Aldott TechSolution home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-color.svg"
            alt="Aldott TechSolution"
            width={106}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[15px] font-medium py-2 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm ${
                  active ? 'text-navy' : 'text-text-muted hover:text-navy'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full transition-opacity duration-150 ${
                    active ? 'bg-accent opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="hidden md:inline-block bg-navy text-white text-[15px] font-semibold px-5 py-2.5 rounded-btn hover:bg-navy-hover transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Discuss a project
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-border rounded-btn text-navy bg-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Icon name={open ? 'X' : 'Menu'} size={20} />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-elevated border-t border-border px-6 py-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium ${
                isActive(link.href) ? 'text-navy' : 'text-text-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-navy text-white text-center text-[15px] font-semibold px-5 py-3 rounded-btn w-full mt-1"
          >
            Discuss a project
          </Link>
        </div>
      )}
    </nav>
  );
}
