import Link from 'next/link';
import type { Insight } from '@/data/insights';

/**
 * Text-only insight card (Figma "Implement Dark Theme Design"). Tag, title,
 * summary, and a Read affordance. No article pages exist yet, so each links to
 * /contact to request the briefing — honest and functional.
 */
export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/contact?topic=${insight.slug}`}
      className="group flex h-full flex-col bg-surface p-6 transition-colors duration-200 hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
    >
      <span className="text-accent text-[10px] font-medium uppercase tracking-wide mb-4">
        {insight.category}
      </span>
      <h3 className="text-text font-semibold text-[14px] leading-snug mb-3">
        {insight.title}
      </h3>
      <p className="text-text-soft text-[13px] leading-relaxed mb-5 flex-1">
        {insight.summary}
      </p>
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-text-muted transition-all duration-150 group-hover:gap-2">
        Read →
      </span>
    </Link>
  );
}
