import Hero from '@/components/sections/home/Hero';
import ProofStrip from '@/components/sections/home/ProofStrip';
import CoreServices from '@/components/sections/home/CoreServices';
import ImageBand from '@/components/sections/home/ImageBand';
import WhyAldott from '@/components/sections/home/WhyAldott';
import SelectedProjects from '@/components/sections/home/SelectedProjects';
import Testimonials from '@/components/sections/home/Testimonials';
import ProcessLifecycle from '@/components/sections/home/ProcessLifecycle';
import BeyondWind from '@/components/sections/home/BeyondWind';
import CTABand from '@/components/ui/CTABand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <CoreServices />
      <ImageBand />
      <WhyAldott />
      <SelectedProjects />
      <Testimonials />
      <ProcessLifecycle />
      <BeyondWind />
      <CTABand />
    </>
  );
}
