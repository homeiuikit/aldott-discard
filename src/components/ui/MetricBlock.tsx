type MetricBlockProps = {
  value: string;
  label: string;
};

export default function MetricBlock({ value, label }: MetricBlockProps) {
  return (
    <div className="text-center px-4 sm:px-8 sm:border-r sm:border-border sm:last:border-0">
      <div className="text-text font-bold text-3xl md:text-4xl leading-none tabular-nums">
        {value}
      </div>
      <div className="text-text-soft text-sm mt-2 leading-snug">{label}</div>
    </div>
  );
}
