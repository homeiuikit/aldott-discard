import Reveal from '@/components/ui/Reveal';
import { metrics } from '@/data/site';

/** Proof strip — institutional metric band under the hero. */
export default function ProofStrip() {
  return (
    <Reveal className="bg-navy text-white">
      <div className="max-w-content mx-auto px-6 md:px-8 py-10 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`lg:px-8 first:lg:pl-0 last:lg:pr-0 ${
                i > 0 ? 'lg:border-l lg:border-white/10' : ''
              }`}
            >
              <div className="text-[2rem] md:text-[2.5rem] font-bold tracking-[-0.03em] tabular-nums leading-none text-white">
                {m.value}
              </div>
              <div className="mt-2.5 text-[12px] font-medium tracking-[0.04em] uppercase text-white/50">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
