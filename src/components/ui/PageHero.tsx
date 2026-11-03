import Eyebrow from './Eyebrow';
import SchematicPanel from './SchematicPanel';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
};

/** Inner-page hero — light motif band or cool-graded photo. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = '',
}: PageHeroProps) {
  const content = (
    <div className="relative z-10 max-w-content mx-auto px-6 md:px-8">
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <h1 className="text-navy font-bold text-4xl md:text-5xl leading-tight tracking-[-0.02em] mb-4 max-w-2xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-text-muted text-lg leading-relaxed max-w-xl">{subtitle}</p>
      )}
    </div>
  );

  if (image) {
    return (
      <section className="relative border-b border-border">
        <SchematicPanel
          image={image}
          alt={imageAlt}
          priority
          sizes="100vw"
          overlayOpacity={0.55}
          className="w-full py-24 md:py-28"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-page/90 via-page/55 to-transparent pointer-events-none" />
          {content}
        </SchematicPanel>
      </section>
    );
  }

  return (
    <section className="relative bg-surface border-b border-border py-20 overflow-hidden">
      <div className="absolute inset-0 motif-grid opacity-70" aria-hidden="true" />
      {content}
    </section>
  );
}
