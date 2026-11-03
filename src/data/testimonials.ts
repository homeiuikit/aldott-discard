// src/data/testimonials.ts
//
// Client and partner recommendations, transcribed from Aldott TechSolution's
// own reference deck ("Aldott TechSolution.pptx", slides 8–16). Every quote,
// name, title, date, and location below comes from a written endorsement held
// on file — nothing here is paraphrased into new claims.
//
// `kind` distinguishes endorsements addressed to the firm from those written
// for Vikram Singh Rajput personally (Doosan, Rentel/C-Power, DEWI-OCC predate
// Aldott and reference his work at DEWI-OCC), so the two are never presented
// as the same thing.

export type Testimonial = {
  slug: string;
  /** 'client' = written for Aldott TechSolution. 'leadership' = written for the founder. */
  kind: 'client' | 'leadership';
  /** Organisation as it signs the reference. */
  organisation: string;
  /** Short label for compact strips and filters. */
  shortName: string;
  /** Scope of work the reference covers. */
  scope: string;
  /** Full quote as written. */
  quote: string;
  /** Trimmed pull-quote for the homepage band. */
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  location: string;
  /** Two or three capability tags shown under the quote. */
  tags: string[];
  /** Surfaced in the homepage testimonial band. */
  featured: boolean;
};

export const testimonials: Testimonial[] = [
  {
    slug: 'mingyang-european',
    kind: 'client',
    organisation: 'MingYang European Business & Engineering Center GmbH',
    shortName: 'MingYang (MySE)',
    scope:
      'Waterkant Offshore Wind Farm — MySE18.5-260 offshore turbine. Load input calculations, WRA/metocean consolidation, and Design Basis Part B.',
    quote:
      'The Design Basis Part B report prepared by Aldott was not only successfully approved by the UL certification body but was also accepted by BSH, marking a significant milestone for this project. We strongly recommend Aldott TechSolutions and your specialized services.',
    excerpt:
      'The Design Basis Part B prepared by Aldott was successfully approved by the UL certification body and accepted by BSH. We strongly recommend Aldott TechSolutions.',
    author: 'Shuopeng Wang',
    authorRole: 'Senior Project Manager',
    date: '12 March 2025',
    location: 'Hamburg, Germany',
    tags: ['Offshore ILA', 'Design Basis B', 'UL & BSH'],
    featured: true,
  },
  {
    slug: 'windguard-certification',
    kind: 'client',
    organisation: 'WindGuard Certification GmbH',
    shortName: 'WindGuard',
    scope:
      'Loads calculation to IEC 61400-1 and site suitability analysis, tower and foundation assessment for type-certification projects, and lifetime extension across various sites.',
    quote:
      'The performance has always been very high, demonstrating a professionalism and availability out of the ordinary. Their technical knowledge in wind turbine design and certification is commendable. WindGuard Certification highly recommends the professionals of Aldott TechSolution.',
    excerpt:
      'The performance has always been very high, demonstrating professionalism and availability out of the ordinary. We highly recommend the professionals of Aldott TechSolution.',
    author: 'Juan Campos',
    authorRole: 'Type & Project Certification Team Leader',
    date: '20 January 2021',
    location: 'Varel, Germany',
    tags: ['IEC 61400-1', 'Site Suitability', 'Lifetime Ext.'],
    featured: true,
  },
  {
    slug: 'pioneer-wincon',
    kind: 'client',
    organisation: 'Pioneer Wincon — Para Enterprises Pvt. Ltd.',
    shortName: 'Pioneer Wincon',
    scope:
      'Design assessment of turbine components — nacelle frame, rotor bearing housing, main shaft, and bolted calculations — plus nacelle-frame optimisation for type certification.',
    quote:
      'Our certification body evaluated the design calculation reports and approved them without a single query or open point — a great achievement from Aldott. The optimised nacelle frame reduced weight by around 1300 kg. We recommend Aldott for their consultancy services.',
    excerpt:
      'Approved without a single query on the feedback report — a great achievement. Aldott optimised the nacelle frame and reduced its weight by ~1300 kg.',
    author: 'R. Dhanasekaran',
    authorRole: 'Asst. General Manager — Engineering & Quality',
    date: '18 January 2021',
    location: 'Chennai, India',
    tags: ['Component Design', '−1300 kg Frame', 'Type Cert'],
    featured: true,
  },
  {
    slug: 'enbreeze',
    kind: 'client',
    organisation: 'enbreeze GmbH',
    shortName: 'enbreeze',
    scope:
      'Engineering consultancy within the loads and fatigue department — fatigue analysis of wind turbine components.',
    quote:
      'It’s our absolute pleasure to work with Aldott as an engineering consultant in our loads and fatigue department. The structured work combined with attention to detail of the consultants is praiseworthy. We are very happy to recommend Aldott as wind engineering consultant and look forward to working together again.',
    excerpt:
      'It’s our absolute pleasure to work with Aldott as an engineering consultant. The structured work and attention to detail is praiseworthy — we are very happy to recommend Aldott.',
    author: 'Jacques Fischbach',
    authorRole: 'Chief Executive Officer',
    date: '21 March 2019',
    location: 'Berlin, Germany',
    tags: ['Loads & Fatigue', 'Component Analysis'],
    featured: true,
  },
  {
    slug: 'doosan-heavy-industries',
    kind: 'leadership',
    organisation: 'Doosan Heavy Industries & Construction',
    shortName: 'Doosan',
    scope:
      'Offshore type certifications under the Germanischer Lloyd guideline for Doosan’s offshore wind turbine and its variant models, with Vikram Rajput as Project Manager.',
    quote:
      'Because of the team’s hard work, prompt response, technical expertise and experience in offshore wind business, we could manage the certification on time with quality. We look forward to a good cooperation now and forever.',
    excerpt:
      'Because of the team’s technical expertise and experience in offshore wind, we could manage the certification on time with quality.',
    author: 'Jeong-Il Kim',
    authorRole: 'Wind Power Project Manager',
    date: '19 October 2015',
    location: 'Changwon, Korea',
    tags: ['Offshore Type Cert', 'GL Guideline', 'On-time'],
    featured: false,
  },
  {
    slug: 'rentel-c-power',
    kind: 'leadership',
    organisation: 'Rentel NV / C-Power',
    shortName: 'Rentel / C-Power',
    scope:
      'Project certification of the Rentel 288 MW offshore project and C-Power Phase 2+3 (325 MW), delivered with Vikram Rajput at DEWI-OCC.',
    quote:
      'Selected for their flexible approach, challenging from the start with an open mind to enter technical discussions, and a turbine perspective from the foundation side. Expectations based on the negotiations and our previous cooperation are still fulfilled — a comfort towards the crucial project phases.',
    excerpt:
      'Selected for their flexible approach and a turbine perspective from the foundation side — a comfort towards the crucial project phases.',
    author: 'Annelies Demuynck',
    authorRole: 'Design & Certification Manager',
    date: '23 September 2015',
    location: 'Ostend, Belgium',
    tags: ['288 MW Offshore', 'Project Cert', 'Foundation & WTG'],
    featured: false,
  },
  {
    slug: 'dewi-occ',
    kind: 'leadership',
    organisation: 'DEWI-OCC Offshore & Certification Centre (a UL company)',
    shortName: 'DEWI-OCC (UL)',
    scope:
      'Senior Project Engineer, Loads & Mechanical Engineering (2012–2018) — led the offshore department, carried out project certification, and co-authored UL standard 4143 on lifetime extension.',
    quote:
      'Mr. Rajput recognised the key aspects and risks even in complicated cases and quickly found solutions, contributing to the further development of project management procedures. He always fulfilled the tasks assigned to him to our complete satisfaction.',
    excerpt:
      'Mr. Rajput recognised the key aspects and risks even in complicated cases and quickly found solutions. He always fulfilled the tasks assigned to him to our complete satisfaction.',
    author: 'Hergen Bolte',
    authorRole: 'Managing Director',
    date: '31 October 2018',
    location: 'Bremen, Germany',
    tags: ['Loads & Mech.', 'Offshore Dept.', 'UL 4143'],
    featured: false,
  },
];

export const featuredTestimonials = testimonials.filter((t) => t.featured);

/** Summary line under the client strip — derived, so it can never drift. */
export const testimonialSummary = {
  count: testimonials.length,
  countries: Array.from(
    new Set(testimonials.map((t) => t.location.split(',').pop()!.trim()))
  ).length,
};
