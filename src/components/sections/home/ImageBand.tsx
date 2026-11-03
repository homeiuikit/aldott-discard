import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';

/** Mid-page photographic presence — cool technical field, factual caption. */
export default function ImageBand() {
  return (
    <Reveal className="bg-page border-b border-border">
      <div className="relative w-full min-h-[240px] md:min-h-[320px] lg:min-h-[380px] overflow-hidden">
        <Image
          src="/assets/photos/why-aldott.jpg"
          alt="Turbine nacelle and rotor hub seen from below — structural engineering detail"
          fill
          sizes="100vw"
          className="object-cover object-center saturate-[0.9] brightness-[0.88]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(11,31,58,0.72) 0%, rgba(11,31,58,0.35) 48%, rgba(11,31,58,0.15) 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 motif-grid-dark opacity-40 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-8 h-full min-h-[240px] md:min-h-[320px] lg:min-h-[380px] flex flex-col justify-end py-10 md:py-12">
          <Eyebrow tone="light" className="mb-3">Field context</Eyebrow>
          <p className="text-white font-semibold text-xl md:text-2xl lg:text-[1.75rem] leading-snug tracking-[-0.02em] max-w-xl">
            Certification-grade engineering for onshore and offshore wind — loads, design,
            and documentation built to be checked.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
