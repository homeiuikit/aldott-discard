type StandardsTagProps = {
  children: string;
  outlined?: boolean;
};

export default function StandardsTag({ children, outlined = false }: StandardsTagProps) {
  return (
    <span
      className={
        outlined
          ? 'bg-page border border-border text-text-muted text-xs font-medium px-2 py-1 rounded-sm'
          : 'bg-accent-soft border border-accent/20 text-accent-dark text-xs font-medium px-2 py-1 rounded-sm'
      }
    >
      {children}
    </span>
  );
}
