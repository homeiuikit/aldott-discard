import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SectorItem from '@/components/ui/SectorItem';

const items = [
  { label: 'Onshore Wind Development', icon: 'Wind' },
  { label: 'Offshore Wind Development', icon: 'Anchor' },
  { label: 'Turbine OEM & Manufacturing Support', icon: 'Cog' },
  { label: 'Certification & Compliance', icon: 'ShieldCheck' },
  { label: 'New Market Entry & Feasibility', icon: 'Globe' },
];

export default function Sectors() {
  return (
    <Reveal className="relative bg-navy-strong border-y border-border py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 motif-grid" aria-hidden="true" />
      <div className="relative max-w-content mx-auto px-6 md:px-8">
        <SectionHeading
          dark
          eyebrow="INDUSTRIES WE SERVE"
          title="Specialist support across the full wind energy value chain."
          subtitle="Aldott works with OEMs, developers, and certification bodies across onshore and offshore wind markets worldwide."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {items.map((item, i) => (
            <SectorItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              // Center the lone 5th item on the final desktop row.
              className={i === 4 ? 'lg:col-start-2' : ''}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
