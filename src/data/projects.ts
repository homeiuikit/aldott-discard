// src/data/projects.ts
//
// Featured projects, ported from Aldott TechSolution's own drafted copy
// (aldott_optimized_copy.md §Projects; HT1 Aberdeen Bay also described in
// aldott_vision_page.md). Detail-page narrative is written from that source
// without inventing figures — expand once real project specifics are supplied.

export type Project = {
  slug: string;
  /** Illustrative thematic photo (cool-graded figma set). */
  image: string;
  /** Warm-graded panel for the wind + hydrogen (sunset-toned) card. */
  warm?: boolean;
  tag: string;
  /** Omitted where the source material states no location for the engagement. */
  region?: string;
  /** Installed / rated capacity, where the figure is on record. */
  capacity?: string;
  title: string;
  outcome: string;
  challenge: string;
  approach: string;
  approachPoints: string[];
  result: string;
  standards: string[];
  relatedServices: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: 'ht1-aberdeen-bay',
    image: '/assets/photos/figma/project-1.jpg',
    warm: false,
    tag: 'Offshore Wind + Hydrogen',
    region: 'Aberdeen Bay, UK',
    title: 'HT1 Aberdeen Bay',
    outcome:
      'Led site-specific load analysis and structural integration for a combined ' +
      'offshore wind and hydrogen production platform, aligning turbine loads, ' +
      'foundation design, and hydrogen infrastructure into a single certifiable ' +
      'structural system.',
    challenge:
      'The project set out to integrate offshore wind generation with hydrogen ' +
      'production on a single platform. That required turbine loads, foundation ' +
      'design, and hydrogen infrastructure to be engineered and certified together ' +
      'as one structural system, rather than as separate contracts run in parallel.',
    approach:
      'Aldott provided site-specific load analysis and structural integration across ' +
      'the combined asset, coordinating the turbine, foundation, and hydrogen ' +
      'infrastructure engineering under one technical line of sight and carrying the ' +
      'technical and commercial coordination between the disciplines.',
    approachPoints: [
      'Performed site-specific load analysis for the offshore wind element',
      'Integrated turbine loads and foundation design with the hydrogen production platform',
      'Coordinated wind generation and hydrogen infrastructure as one certifiable system',
      'Carried technical and commercial coordination across the combined project',
    ],
    result:
      'The engagement demonstrates Aldott’s wind-to-hydrogen integration capability: ' +
      'offshore generation and hydrogen production engineered as a single certifiable ' +
      'system. It is the reference project behind the firm’s broader move into ' +
      'hydrogen engineering.',
    standards: ['IEC 61400-3', 'IEC 61400-1'],
    relatedServices: [
      { label: 'Loads & Structural Analysis', href: '/services/loads-structural-analysis' },
      { label: "Project Development & Owner's Engineering", href: '/services/owners-engineering' },
    ],
  },
  {
    slug: 'normandy-i-ii',
    image: '/assets/photos/offshore-array.jpg',
    tag: 'Large-Scale Offshore',
    region: 'Normandy, France',
    title: 'Normandy I & II',
    outcome:
      'Delivered layout design and site-specific load studies across two large ' +
      'offshore arrays, optimising turbine spacing and foundation loading against ' +
      'metocean data and wake-interaction effects at scale.',
    challenge:
      'Two large offshore arrays required layout design and site-specific load ' +
      'studies where turbine spacing, foundation loading, and wake-interaction ' +
      'effects all had to be optimised together against real metocean data — at ' +
      'array scale, not single-turbine scale.',
    approach:
      'Aldott developed the array layouts and ran site-specific load studies across ' +
      'both projects, balancing turbine spacing against wake-interaction losses and ' +
      'foundation loading against the site’s metocean conditions.',
    approachPoints: [
      'Developed layout design across two large offshore arrays',
      'Ran site-specific load studies against site metocean data',
      'Optimised turbine spacing against wake-interaction effects',
      'Balanced foundation loading across the array at scale',
    ],
    result:
      'Array layouts and load studies delivered for both projects, with turbine ' +
      'spacing and foundation loading optimised against site-specific metocean and ' +
      'wake-interaction conditions.',
    standards: ['IEC 61400-3', 'IEC 61400-1'],
    relatedServices: [
      { label: 'Wind Resource & Site Assessment', href: '/services/wind-resource-site-assessment' },
      { label: 'Loads & Structural Analysis', href: '/services/loads-structural-analysis' },
    ],
  },
  {
    slug: 'brittany-floating-wind',
    image: '/assets/photos/figma/project-3.jpg',
    tag: 'Floating Offshore',
    region: 'Brittany, France',
    title: 'Brittany Floating Wind',
    outcome:
      'Engineered floating substructure and mooring load concepts through dynamic ' +
      'design analysis across combined wind, wave, and platform-motion load cases.',
    challenge:
      'A floating offshore wind development needed floating substructure and mooring ' +
      'load concepts where wind, wave, and platform-motion effects combine into ' +
      'coupled dynamic load cases that a fixed-foundation approach cannot capture.',
    approach:
      'Aldott engineered the floating substructure and mooring load concepts through ' +
      'dynamic design analysis, resolving the combined wind, wave, and ' +
      'platform-motion load cases into a coherent structural concept.',
    approachPoints: [
      'Engineered floating substructure load concepts',
      'Developed mooring load concepts for the floating platform',
      'Ran dynamic design analysis across combined wind, wave, and platform-motion load cases',
      'Resolved coupled load cases into a coherent structural concept',
    ],
    result:
      'Floating substructure and mooring load concepts delivered, with the coupled ' +
      'wind-wave-motion dynamics resolved through dynamic design analysis.',
    standards: ['IEC 61400-3'],
    relatedServices: [
      { label: 'Loads & Structural Analysis', href: '/services/loads-structural-analysis' },
      { label: 'Custom Turbine Design', href: '/services/custom-turbine-design' },
    ],
  },
  {
    slug: 'stora-middelgrund',
    image: '/assets/photos/services/loads-analysis.jpg',
    tag: 'Large-Scale Offshore',
    region: 'Kattegat, Sweden',
    capacity: '864 MW',
    title: 'Stora Middelgrund',
    outcome:
      'Delivered comprehensive metocean studies and energy yield analysis for an ' +
      '864 MW Swedish offshore development, worked against the environmental ' +
      'constraints attached to the site.',
    challenge:
      'An 864 MW offshore development in Swedish waters carried environmental ' +
      'constraints that bore directly on how the array could be laid out and ' +
      'operated. Those constraints had to be reconciled with a metocean ' +
      'characterisation thorough enough to underpin both the design conditions and ' +
      'the energy yield case at full array scale.',
    approach:
      'Aldott ran the metocean study programme for the site and carried the energy ' +
      'yield analysis, translating the environmental constraints into inputs the ' +
      'layout and design basis could be built against rather than worked around ' +
      'after the fact.',
    approachPoints: [
      'Comprehensive metocean studies establishing site design conditions',
      'Environmental constraint assessment folded into layout and design inputs',
      'Energy yield (AEP) analysis across the 864 MW array',
      'Design-basis conditions derived for the offshore support structures',
    ],
    result:
      'Metocean design conditions, environmental constraint inputs, and array-scale ' +
      'energy yield analysis delivered for the 864 MW development.',
    standards: ['IEC 61400-3', 'Metocean'],
    relatedServices: [
      { label: 'Wind Resource & Site Assessment', href: '/services/wind-resource-site-assessment' },
      { label: 'Loads & Structural Analysis', href: '/services/loads-structural-analysis' },
    ],
  },
  {
    slug: 'rentel-offshore',
    image: '/assets/photos/services/project-certification.jpg',
    tag: 'Certification',
    region: 'Belgian North Sea',
    capacity: '288 MW',
    title: 'Rentel Offshore',
    outcome:
      'Project certification of a 288 MW Belgian offshore wind farm under ' +
      'DNV-OS-J901, including evaluation of mechanical components across the ' +
      'turbine and support structure interface.',
    challenge:
      'A 288 MW offshore wind farm in the Belgian North Sea required project ' +
      'certification under DNV-OS-J901, with mechanical components assessed across ' +
      'the interface between turbine and foundation — the boundary where turbine ' +
      'scope and foundation scope meet, and where certification findings most often ' +
      'surface late.',
    approach:
      'The certification work was carried out with Vikram Singh Rajput at DEWI-OCC, ' +
      'running project certification under DNV-OS-J901 and evaluating mechanical ' +
      'components with a turbine perspective applied from the foundation side.',
    approachPoints: [
      'Project certification under the DNV-OS-J901 offshore standard',
      'Mechanical component evaluation across the turbine and support structure',
      'Technical review across the turbine-to-foundation interface',
      'Certification coordination through the crucial project phases',
    ],
    result:
      'Project certification delivered for the 288 MW development, alongside C-Power ' +
      'Phase 2+3 (325 MW) for the same client group — work the written client ' +
      'reference describes as fulfilling the expectations set during negotiation.',
    standards: ['DNV-OS-J901', 'IEC 61400-3'],
    relatedServices: [
      { label: 'Certification Body Support', href: '/services/certification-body-support' },
      { label: 'Loads & Structural Analysis', href: '/services/loads-structural-analysis' },
    ],
  },
  {
    slug: 'shepherds-flat',
    image: '/assets/photos/why-aldott.jpg',
    tag: 'Onshore Wind',
    region: 'United States',
    capacity: '845 MW',
    title: 'Shepherds Flat',
    outcome:
      'Micrositing and execution support across an 845 MW onshore wind farm in the ' +
      'United States built on GE 2.5 MW turbines — one of the largest onshore ' +
      'arrays of its generation.',
    challenge:
      'An 845 MW onshore wind farm running GE 2.5 MW machines needed turbine ' +
      'micrositing and execution support at a scale where small per-turbine siting ' +
      'decisions compound into material differences in yield and constructability ' +
      'across the whole array.',
    approach:
      'Aldott worked the micrositing for the array and supported execution through ' +
      'delivery, positioning turbines against site conditions and carrying the ' +
      'technical coordination through the build programme.',
    approachPoints: [
      'Turbine micrositing across the 845 MW array',
      'Siting optimisation against site conditions and constructability',
      'Execution support through the delivery programme',
      'Technical coordination for a GE 2.5 MW turbine fleet',
    ],
    result:
      'Micrositing and execution delivered across 845 MW of installed onshore ' +
      'capacity in the United States.',
    standards: ['IEC 61400-1'],
    relatedServices: [
      { label: 'Wind Resource & Site Assessment', href: '/services/wind-resource-site-assessment' },
      { label: "Project Development & Owner's Engineering", href: '/services/owners-engineering' },
    ],
  },
  {
    slug: 'sweetwater',
    image: '/assets/photos/services/project-management.jpg',
    tag: 'Onshore Wind',
    region: 'Texas, United States',
    capacity: '585 MW',
    title: 'Sweetwater',
    outcome:
      'Execution support on a Texas onshore wind development, contributing to ' +
      '585 MW of installed capacity across one of the state’s large-scale wind ' +
      'build-outs.',
    challenge:
      'A large-scale Texas onshore wind development required execution support ' +
      'sustained across a 585 MW build programme, where delivery pace and technical ' +
      'coordination have to hold together over a long construction horizon.',
    approach:
      'Aldott carried execution support through the programme, maintaining technical ' +
      'coordination across the phases that took the project to its installed ' +
      'capacity.',
    approachPoints: [
      'Execution support across the 585 MW build programme',
      'Technical coordination through construction phases',
      'Delivery oversight at large-scale onshore array scale',
    ],
    result: 'Contributed to 585 MW of installed onshore capacity in Texas.',
    standards: ['IEC 61400-1'],
    relatedServices: [
      { label: "Project Development & Owner's Engineering", href: '/services/owners-engineering' },
    ],
  },
  {
    slug: 'alta-wind-center',
    image: '/assets/photos/turbine-rotor.jpg',
    tag: 'Onshore Wind',
    region: 'California, United States',
    title: 'Alta Wind Energy Center',
    outcome:
      'Full planning and delivery support on one of California’s largest wind ' +
      'farms, running GE turbines across the development.',
    challenge:
      'One of California’s largest wind farms required planning and delivery ' +
      'support end to end — a GE turbine fleet taken from planning through to ' +
      'delivery without the handoffs between phases that normally fragment a project ' +
      'of that size.',
    approach:
      'Aldott supported the project across planning and delivery, holding technical ' +
      'continuity from the planning stage through execution on a GE turbine fleet.',
    approachPoints: [
      'Planning support across the development',
      'Delivery support through project execution',
      'Technical coordination for a GE turbine fleet',
      'Continuity held across planning and delivery phases',
    ],
    result:
      'Planning and delivery support provided across one of California’s largest ' +
      'wind farms.',
    standards: ['IEC 61400-1'],
    relatedServices: [
      { label: "Project Development & Owner's Engineering", href: '/services/owners-engineering' },
      { label: 'Wind Resource & Site Assessment', href: '/services/wind-resource-site-assessment' },
    ],
  },
  {
    slug: 'p750-57-upgrade',
    image: '/assets/photos/figma/blade.jpg',
    tag: 'Turbine Design & Upgrade',
    title: 'P750/57 Turbine Upgrade',
    outcome:
      'Upgraded an existing turbine platform to the latest IEC Edition 3 load ' +
      'standards, with feasibility studies assessing the platform against new hub ' +
      'heights.',
    challenge:
      'An existing turbine platform had to be brought up to the latest IEC ' +
      'Edition 3 load standards — a re-assessment against a moved goalpost, where ' +
      'design margins that cleared the previous edition cannot be assumed to clear ' +
      'the new one. New hub heights were assessed in parallel.',
    approach:
      'Aldott recalculated the platform’s loads against IEC Edition 3 requirements ' +
      'and ran feasibility studies for the proposed hub heights, establishing where ' +
      'the existing design held and where it needed revisiting.',
    approachPoints: [
      'Load recalculation against IEC Edition 3 requirements',
      'Design assessment of the existing platform under the updated standard',
      'Feasibility studies for new hub heights',
      'Identification of design margins requiring revision',
    ],
    result:
      'The platform was assessed and upgraded against IEC Edition 3 load standards, ' +
      'with hub height feasibility established for the proposed variants.',
    standards: ['IEC 61400-1 Ed. 3'],
    relatedServices: [
      { label: 'Custom Turbine Design', href: '/services/custom-turbine-design' },
      { label: 'Loads & Structural Analysis', href: '/services/loads-structural-analysis' },
    ],
  },
  {
    slug: 'se9320-type-certification',
    image: '/assets/photos/services/type-certification.jpg',
    tag: 'Certification',
    title: 'SE9320 Type Certification',
    outcome:
      'Design evaluation supporting SANY’s first Type Certificate, delivered ' +
      'alongside training for the client’s own engineers in load calculation.',
    challenge:
      'SANY was pursuing its first Type Certificate. Beyond the design evaluation ' +
      'itself, the engagement had to leave the client’s engineering team able to ' +
      'run load calculations themselves — a capability transfer, not just a ' +
      'deliverable.',
    approach:
      'Aldott carried out the design evaluation for the SE9320 turbine and trained ' +
      'the client’s engineers in load calculation methodology alongside the ' +
      'certification work.',
    approachPoints: [
      'Design evaluation for the SE9320 turbine platform',
      'Load calculation work supporting the type certification file',
      'Training of client engineers in load calculation methodology',
      'Documentation prepared for certification body review',
    ],
    result:
      'SANY’s first Type Certificate achieved, with the client’s engineering team ' +
      'trained in the load calculation methodology behind it.',
    standards: ['IEC 61400-1'],
    relatedServices: [
      { label: 'Type Certification Support', href: '/services/type-certification-support' },
      { label: 'Loads & Structural Analysis', href: '/services/loads-structural-analysis' },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
