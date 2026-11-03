type ProcessStepProps = {
  number: string;
  title: string;
  body: string;
  /** Hide the desktop connector after the last step. */
  isLast?: boolean;
};

export default function ProcessStep({ number, title, body, isLast = false }: ProcessStepProps) {
  return (
    <div className="relative flex-1 bg-surface border border-border rounded-lg p-6">
      {!isLast && (
        <div
          className="hidden lg:block absolute top-8 -right-4 w-8 h-px bg-border z-10"
          aria-hidden="true"
        />
      )}
      <div className="text-accent font-bold text-2xl mb-3">{number}</div>
      <h3 className="text-text font-semibold text-lg mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{body}</p>
    </div>
  );
}
