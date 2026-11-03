import type { Metadata } from 'next';
import CTABand from '@/components/ui/CTABand';
import PageHero from '@/components/ui/PageHero';
import ProjectsExplorer from '@/components/sections/projects/ProjectsExplorer';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected wind energy engineering and certification projects across European and international markets — fixed, floating, and site-specific structural work.',
  openGraph: {
    title: 'Projects — Aldott TechSolution',
    description:
      'Selected wind energy engineering projects delivered for OEMs, developers, and certification stakeholders.',
    url: 'https://aldott.in/projects',
  },
  alternates: { canonical: 'https://aldott.in/projects' },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="SELECTED WORK"
        title="Projects"
        subtitle="Engineering delivered across global wind markets, onshore, offshore, floating, and wind-to-hydrogen."
        image="/assets/photos/offshore-bw.jpg"
        imageAlt="Offshore wind turbines silhouetted across the North Sea"
      />
      <ProjectsExplorer projects={projects} />
      <CTABand />
    </>
  );
}
