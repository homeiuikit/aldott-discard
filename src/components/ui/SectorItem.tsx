import Icon from './Icon';

type SectorItemProps = {
  label: string;
  icon: string;
  className?: string;
};

/** Dark-band pill used in the homepage Sectors section (spec §11.4). */
export default function SectorItem({ label, icon, className = '' }: SectorItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-6 py-4 border border-border rounded-lg hover:border-accent hover:bg-accent-soft transition-all duration-200 cursor-default ${className}`}
    >
      <span className="text-accent shrink-0">
        <Icon name={icon} size={20} />
      </span>
      <span className="text-text font-medium text-[15px]">{label}</span>
    </div>
  );
}
