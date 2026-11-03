import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import { credibility } from '@/data/about';

/** Credibility strip — four proof points in a hairline row, directly under the
 *  hero (Figma "Implement Dark Theme Design"). */
export default function CredibilityStrip() {
  return (
    <Reveal
      className="bg-surface border-y border-border"
      aria-label="What we engineer to"
    >
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {credibility.map((c) => (
            <div
              key={c}
              className="flex items-start gap-2.5 bg-surface py-5 lg:px-6"
            >
              <span className="text-accent mt-0.5 shrink-0">
                <Icon name="Check" size={14} />
              </span>
              <span className="text-text-muted text-[13px] leading-snug">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
