import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline' | 'outline-white';

const base =
  'font-semibold text-[15px] rounded-btn transition-all duration-200 inline-flex items-center justify-center ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const variants: Record<Variant, string> = {
  primary:
    'bg-navy text-white px-6 py-3 hover:bg-navy-hover',
  ghost:
    'text-accent-dark gap-2 hover:gap-3 transition-[gap] duration-150',
  outline:
    'bg-page border border-border text-text px-6 py-3 hover:border-accent hover:bg-surface',
  'outline-white':
    'bg-transparent border border-white/40 text-white px-6 py-3 hover:border-white hover:bg-white/10',
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
