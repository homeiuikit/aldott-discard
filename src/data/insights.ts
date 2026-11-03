// src/data/insights.ts
//
// Editorial "Latest insights" content for the homepage insights band
// (new_Dark_theme.md §9). These are real, factual briefing decks drafted by
// Aldott — NOT invented news. There are no standalone article pages yet, so
// each card links to /contact to request the briefing (see Insights section).

export type Insight = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  /** Illustrative thematic photo (reuses existing open-license stock). */
  image: string;
};

export const insights: Insight[] = [
  {
    slug: 'ai-driven-analytics',
    category: 'Analytics',
    title: 'AI-Driven Analytics in Wind Engineering',
    summary:
      'How machine learning is compressing load-case screening and design ' +
      'iteration cycles without compromising certification-grade rigour.',
    image: '/assets/photos/services/loads-analysis.jpg',
  },
  {
    slug: 'offshore-wind-trends-2025',
    category: 'Market Outlook',
    title: 'Offshore Wind Trends 2025',
    summary:
      'Where floating substructures, grid code tightening, and BSH-level ' +
      'permitting rigour are pushing offshore engineering scope in the next ' +
      'investment cycle.',
    image: '/assets/photos/services/project-certification.jpg',
  },
  {
    slug: 'load-stress-structural-design',
    category: 'Structural',
    title: 'Load Stress & Structural Design',
    summary:
      'Why fatigue life and SCF analysis, not ultimate load alone, are the ' +
      'quiet variables that decide whether a foundation design survives ' +
      'certification review.',
    image: '/assets/photos/services/turbine-design.jpg',
  },
  {
    slug: 'wind-farm-design-guide',
    category: 'Field Guide',
    title: 'The Wind Farm Design Guide',
    summary:
      'A practical walkthrough of how site assessment, metocean data, and ' +
      'layout optimisation compound into (or erode) a wind farm’s bankable ' +
      'yield case.',
    image: '/assets/photos/services/project-management.jpg',
  },
];
