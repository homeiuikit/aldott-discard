import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';

const steps = [
  {
    num: '01',
    title: 'Initiation',
    body: 'Site-specific design basis, feasibility, and FEED-level studies that pressure-test viability before capital commitment.',
  },
  {
    num: '02',
    title: 'Development',
    body: 'Wind and metocean analysis, energy yield modelling, and concept design worked against IEC 61400-1 load cases.',
  },
  {
    num: '03',
    title: 'Engineering',
    body: 'Aero-elastic modelling, structural and foundation design, and load verification built for certification-grade scrutiny.',
  },
  {
    num: '04',
    title: 'Construction',
    body: "Owner's engineering, contractor coordination, and structural integrity management through build-out.",
  },
  {
    num: '05',
    title: 'Operation',
    body: 'Performance monitoring and design revisit using the same loads model built at concept.',
  },
];

/** Engagement process — horizontal methodology rail (desktop) + stacked (mobile). */
export default function ProcessLifecycle() {
  return (
    <Reveal className="bg-surface border-b border-border section-y">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="max-w-2xl mb-12 md:mb-14">
          <Eyebrow className="mb-3.5">Engagement process</Eyebrow>
          <h2 className="section-title">
            One team, one model — initiation to operation
          </h2>
          <p className="mt-4 text-[15px] text-text-muted leading-relaxed">
            A loads model built during concept is the same model we defend in certification
            and revisit in operation. Nothing re-engineered from scratch, because nothing
            was handed off.
          </p>
        </div>

        {/* Desktop horizontal rail */}
        <div className="hidden lg:block">
          <div className="relative grid grid-cols-5 gap-4">
            <div
              className="absolute top-[18px] left-[10%] right-[10%] process-rail opacity-60"
              aria-hidden="true"
            />
            {steps.map((s) => (
              <div key={s.num} className="relative flex flex-col">
                <div className="relative z-10 w-9 h-9 rounded-full bg-page border-2 border-accent flex items-center justify-center mb-5">
                  <span className="text-[11px] font-bold text-accent tabular-nums">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-navy mb-2">{s.title}</h3>
                <p className="text-[12.5px] leading-relaxed text-text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet stacked */}
        <div className="lg:hidden border-t border-border">
          {steps.map((s) => (
            <div
              key={s.num}
              className="flex items-start gap-5 py-6 border-b border-border"
            >
              <div className="w-9 h-9 shrink-0 rounded-full bg-page border-2 border-accent flex items-center justify-center">
                <span className="text-[11px] font-bold text-accent tabular-nums">
                  {s.num}
                </span>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-navy mb-1.5">{s.title}</h3>
                <p className="text-[13px] leading-relaxed text-text-muted">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
