import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';

export default function NotFound() {
  return (
    <section className="relative bg-navy-strong overflow-hidden min-h-[60vh] flex items-center">
      <div className="absolute inset-0 motif-grid" aria-hidden="true" />
      <div className="relative max-w-content mx-auto px-6 md:px-8 text-center w-full">
        <Eyebrow className="mx-auto">ERROR 404</Eyebrow>
        <h1 className="text-text font-bold text-4xl md:text-5xl leading-tight mb-4">
          Page not found
        </h1>
        <p className="text-text-muted text-lg leading-relaxed max-w-xl mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button href="/" variant="outline-white">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
