import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import { whyAldott } from '@/data/about';

/** Why Aldott — editorial numbered differentiators. */
export default function WhyAldott() {
  const points = whyAldott.slice(0, 3);

  return (
    <Reveal className="bg-surface border-b border-border section-y">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">
          {/* Left intro */}
          <div className="lg:sticky lg:top-28">
            <Eyebrow className="mb-3.5">Why Aldott</Eyebrow>
            <h2 className="section-title max-w-[16ch]">
              Independent counsel. Senior hands. Full lifecycle.
            </h2>
            <p className="mt-5 text-[15px] text-text-muted leading-relaxed max-w-md">
              Wind energy has no shortage of engineering vendors. It has a shortage of
              firms that will tell a client the uncomfortable technical truth, and then
              stay on the project long enough to fix it.
            </p>
          </div>

          {/* Right numbered list */}
          <div className="border-t border-border">
            {points.map((w, i) => (
              <div
                key={w.title}
                className="group grid grid-cols-[auto_1fr] gap-5 md:gap-7 py-7 md:py-8 border-b border-border"
              >
                <span className="text-[13px] font-bold text-accent tabular-nums pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[16px] md:text-[17px] font-semibold text-navy mb-2.5 leading-snug">
                    {w.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-text-muted max-w-lg">
                    {w.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
