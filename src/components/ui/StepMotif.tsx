type StepMotifProps = { className?: string };

/**
 * Subtle stepped/staircase block motif (WindFlow reference, Ref_5/Ref_6).
 * Reads as a quiet engineering "bar-chart" texture. Decorative only — placed
 * absolutely in section corners at low contrast so it never competes with copy.
 */
export default function StepMotif({ className = '' }: StepMotifProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <div className="flex flex-col items-end gap-1.5">
        <div className="h-9 w-44 bg-surface-2" />
        <div className="h-9 w-32 bg-surface-2" />
        <div className="h-9 w-20 bg-surface-2" />
      </div>
    </div>
  );
}
