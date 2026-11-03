import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

/** Homepage hero — full-bleed photo with overlay copy (Option A). */
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border min-h-[min(85dvh,720px)] lg:min-h-[calc(100dvh-72px)]">
      <Image
        src="/assets/photos/hero-wind-turbine.jpg"
        alt="Offshore wind turbines over open water"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center saturate-[0.88] brightness-[0.82]"
      />

      {/* Left-weighted navy gradient for type legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(105deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.78) 38%, rgba(11,31,58,0.42) 68%, rgba(11,31,58,0.22) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] motif-grid-dark opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-[2] max-w-content mx-auto px-6 md:px-8 flex items-center min-h-[min(85dvh,720px)] lg:min-h-[calc(100dvh-72px)] py-16 md:py-20">
        <div className="max-w-2xl">
          <Eyebrow tone="light" rule className="hero-reveal hero-d1 mb-6">
            Independent wind energy engineering
          </Eyebrow>

          <h1 className="hero-reveal hero-d2 m-0 mb-5 font-bold text-[clamp(2.25rem,5vw,3.65rem)] leading-[1.05] tracking-[-0.03em] text-white max-w-[18ch]">
            Engineering and certification support for onshore and offshore wind
            projects.
          </h1>

          <p className="hero-reveal hero-d3 m-0 mb-9 text-[1.0625rem] md:text-[1.125rem] text-white/70 max-w-[40ch] leading-relaxed">
            Independent technical counsel for OEMs, developers, and certification
            bodies.
          </p>

          <div className="hero-reveal hero-d4 flex flex-wrap gap-4 items-center">
            <Button
              href="/contact"
              variant="primary"
              className="px-8 py-3.5 text-[15px] !bg-white !text-navy hover:!bg-white/90"
            >
              Discuss a project
            </Button>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-white/90 border-b border-white/35 pb-0.5 hover:border-white hover:text-white transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View our services
              <span className="inline-flex transition-transform duration-150 group-hover:translate-x-1">
                <Icon name="ArrowRight" size={16} />
              </span>
            </Link>
          </div>

          <div className="hero-reveal hero-d5 mt-12 pt-6 border-t border-white/15">
            <div className="flex flex-wrap gap-x-0 gap-y-3 text-[12.5px] text-white/55">
              {[
                { strong: 'IEC 61400-1 & -3', rest: null },
                { strong: null, rest: 'Loads & structural analysis' },
                { strong: null, rest: "Owner's engineering" },
                { strong: null, rest: 'Bremen & Bengaluru' },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && (
                    <span
                      className="mx-3 h-3.5 w-px bg-white/20 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {item.strong ? (
                    <span className="font-semibold text-white/80 tabular-nums">
                      {item.strong}
                    </span>
                  ) : (
                    <span>{item.rest}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
