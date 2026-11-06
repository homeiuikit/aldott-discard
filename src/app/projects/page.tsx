import type { Metadata } from 'next';
import CTABand from '@/components/ui/CTABand';
import PageHero from '@/components/ui/PageHero';
import ProjectsExplorer from '@/components/sections/projects/ProjectsExplorer';
import { projects as defaultProjects, type Project } from '@/data/projects';
import { cmsMetadata } from '@/lib/metadata';
import { getPublicPosts } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> { return cmsMetadata('projects', {
  title: 'Projects',
  description:
    'Selected wind energy engineering and certification projects across European and international markets — fixed, floating, and site-specific structural work.',
  openGraph: {
    title: 'Projects — Aldott TechSolution',
    description:
      'Selected wind energy engineering projects delivered for OEMs, developers, and certification stakeholders.',
    url: 'https://aldott.de/projects',
  },
  alternates: { canonical: 'https://aldott.de/projects' },
}); }

export default async function ProjectsPage() {
  const posts = await getPublicPosts('project');
  const projects: Project[] = posts.length
    ? posts.map((post) => post.contentBlocks?.find((block: any) => block?.type === 'project') || post.contentBlocks?.[0]).filter(Boolean).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    : defaultProjects;
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
