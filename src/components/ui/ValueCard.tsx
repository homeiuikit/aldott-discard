import Icon from './Icon';

type ValueCardProps = {
  icon: string;
  title: string;
  body: string;
};

export default function ValueCard({ icon, title, body }: ValueCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="text-accent mb-4">
        <Icon name={icon} size={24} />
      </div>
      <h3 className="text-text font-semibold text-xl mb-2">{title}</h3>
      <p className="text-text-muted text-base leading-relaxed">{body}</p>
    </div>
  );
}
