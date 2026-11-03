// src/data/services.ts
//
// The seven service lines Aldott TechSolution delivers, ported from the
// company's own drafted copy (aldott_optimized_copy.md §Services). Each service
// renders a homepage tile, a footer link, and a full /services/[slug] page.

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  standards: string[];
  icon: string; // Lucide icon name (see components/ui/Icon.tsx registry)
  /** Illustrative photo for the service detail block (cool-graded panel). */
  image: string;
};

export const services: Service[] = [
  {
    slug: 'custom-turbine-design',
    title: 'Custom Turbine Design',
    shortDescription:
      'Concept-to-detail turbine design — rotor, drivetrain, tower, and control architecture engineered as one integrated system.',
    fullDescription:
      'Full concept-to-detail turbine design, treating rotor, drivetrain, tower, and ' +
      'control system architecture as one integrated system rather than siloed ' +
      'components. Aldott engineers turbine platforms to arrive at certification ' +
      'review pre-hardened, not pre-optimistic.',
    deliverables: [
      'Integrated concept-to-detail design across rotor, drivetrain, tower, and control architecture',
      'Aero-elastic modelling and dynamic design analysis against site-specific wind classes and IEC 61400-1 design load cases',
      'Design iteration backed by fatigue life and ultimate limit state calculations',
      'Certification-ready design documentation packages',
    ],
    standards: ['IEC 61400-1'],
    icon: 'Wind',
    image: '/assets/photos/services/turbine-design.jpg',
  },
  {
    slug: 'loads-structural-analysis',
    title: 'Loads & Structural Analysis',
    shortDescription:
      'Integrated load calculations across turbine, tower, and support structure, including wind, wave, and soil-structure interaction.',
    fullDescription:
      'Integrated load calculations covering turbine, tower, and support structure, ' +
      'including wind, wave, and soil-structure interaction for offshore foundations. ' +
      'Load verification and design basis documentation are structured for direct ' +
      'submission to certification bodies — built to be checked, not just believed.',
    deliverables: [
      'Integrated load calculations across turbine, tower, and support structure',
      'Wind, wave, and soil-structure interaction analysis for offshore foundations',
      'Fatigue assessment and stress concentration factor (SCF) analysis on welded and grouted connections',
      'Load verification and design basis documentation for certification submission',
    ],
    standards: ['IEC 61400-1', 'IEC 61400-3'],
    icon: 'BarChart2',
    image: '/assets/photos/services/loads-analysis.jpg',
  },
  {
    slug: 'wind-resource-site-assessment',
    title: 'Wind Resource & Site Assessment',
    shortDescription:
      'Site-specific wind and metocean analysis with P50/P90 energy yield modelling for financing and investment decisions.',
    fullDescription:
      'Site-specific wind and metocean data analysis to derive design-basis ' +
      'conditions, combined with statistically grounded energy yield modelling. ' +
      'Feasibility and FEED-level studies pressure-test site viability before ' +
      'capital commitments are made.',
    deliverables: [
      'Wind shear, turbulence, wave climate, seabed and soil parameter analysis',
      'Design-basis condition derivation for onshore and offshore sites',
      'Energy yield modelling with P50/P90 exceedance probability outputs',
      'Feasibility and FEED-level site viability studies',
    ],
    standards: ['Metocean', 'P50 / P90'],
    icon: 'Globe',
    image: '/assets/photos/services/project-certification.jpg',
  },
  {
    slug: 'owners-engineering',
    title: "Project Development & Owner's Engineering",
    shortDescription:
      "Independent Owner's Engineer representation and technical due diligence across development and construction.",
    fullDescription:
      "Independent Owner's Engineer representation across initiation, development, " +
      'engineering, and construction, coordinating designers, contractors, and ' +
      'certifiers under one technical line of sight, plus technical due diligence ' +
      'for investors and developers.',
    deliverables: [
      "Independent Owner's Engineer representation across the project lifecycle",
      'Coordination of designers, contractors, and certifiers under one technical line of sight',
      'Technical due diligence: design basis review, load process audit, and third-party risk opinion',
      'Structural integrity management and performance monitoring through construction into early operation',
    ],
    standards: ['Due Diligence'],
    icon: 'ShieldCheck',
    image: '/assets/photos/services/project-management.jpg',
  },
  {
    slug: 'type-certification-support',
    title: 'Type Certification Support',
    shortDescription:
      'Design documentation, load verification, and technical file preparation aligned to IEC 61400-1 and IECRE schemes.',
    fullDescription:
      'Design documentation, load case verification, and technical file preparation ' +
      'aligned to IEC 61400-1 and IECRE OD-501/OD-502 schemes. Direct engineering ' +
      'liaison with certification bodies closes review comments fast — we speak ' +
      'their language because we build to their standards.',
    deliverables: [
      'Design documentation and load case verification to IEC 61400-1 and IECRE schemes',
      'Technical file preparation for independent design assessment',
      'Prototype test planning and evidence packages',
      'Direct engineering liaison with certification bodies to close review comments',
    ],
    standards: ['IEC 61400-1', 'IECRE'],
    icon: 'FileCheck',
    image: '/assets/photos/services/type-certification.jpg',
  },
  {
    slug: 'certification-body-support',
    title: 'Certification Body Support',
    shortDescription:
      'Independent design review and load verification for certification bodies needing deep bench strength on complex files.',
    fullDescription:
      'Independent design review and load verification services for certification ' +
      'bodies needing deep bench strength on complex or contested files, including ' +
      'site-specific design assessment and grid code compliance review.',
    deliverables: [
      'Independent design review and load verification for certification bodies',
      'Foundation and support structure verification to BSH-level rigour for German offshore waters',
      'Site-specific design assessment support',
      'Grid code compliance review and documentation',
    ],
    standards: ['BSH-level'],
    icon: 'ClipboardList',
    image: '/assets/photos/services/project-certification.jpg',
  },
  {
    slug: 'rd-center-outreach',
    title: 'R&D Center Outreach',
    shortDescription:
      'Fully outsourced or co-located R&D capacity — a dedicated senior engineering team working against your product roadmap.',
    fullDescription:
      'Fully outsourced or co-located R&D capacity: a dedicated senior engineering ' +
      "team working exclusively against a client's product roadmap, with direct " +
      'access to the same engineers across a programme’s life — continuity that ' +
      'in-house teams lose to attrition and staffing benches lose to rotation.',
    deliverables: [
      'Dedicated outsourced or co-located senior engineering team',
      'Coverage across turbine architecture, structural analysis, and certification strategy',
      'Capacity scaled up or down as programme phases demand',
      'Programme-long continuity with the same engineers',
    ],
    standards: [],
    icon: 'GitMerge',
    image: '/assets/photos/services/supply-chain-npi.jpg',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
