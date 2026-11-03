// src/data/about.ts
//
// Editorial About / Why-Aldott content, ported from the company's own drafted
// copy (aldott_optimized_copy.md §About / §Why Aldott). Used by the homepage
// WhyAldott section and the /about page.

/** Hero credibility strip — four proof points under the fold. */
export const credibility = [
  'Engineering to IEC 61400 series standards',
  'Site-specific load and metocean analysis',
  'Working to BSH-level design rigour',
  'Owner’s engineering, onshore & offshore',
];

/** Leadership. */
export const founder = {
  initials: 'VR',
  name: 'Vikram Singh Rajput',
  role: 'Founder & CEO',
  bio: '20+ years in wind turbine and offshore structural engineering · Holder of a US patent in turbine technology · Has led or directly reviewed 150+ projects across onshore, offshore fixed, and floating wind.',
};

/** About proof cards. */
export const proofCards = [
  {
    icon: 'ShieldCheck',
    title: 'Technical Mastery',
    body: 'Aero-elastic loads, structural integrity management, and certification-grade documentation built to withstand third-party scrutiny at every stage of a project’s design.',
  },
  {
    icon: 'Leaf',
    title: 'Sustainability Focus',
    body: 'Engineering decisions weighed against lifecycle performance, material efficiency, and grid code compliance — not just against the next design gate.',
  },
];

/** "What we deliver" — condensed capability lines by client type. */
export const capabilities = [
  {
    title: 'For OEMs',
    body: 'Turbine design, loads and structural validation, and patent-grade IP developed by senior engineers end to end.',
  },
  {
    title: 'For Developers',
    body: 'Site assessment, foundation design, owner’s engineering, and independent technical due diligence.',
  },
  {
    title: 'For Certification Bodies',
    body: 'Independent design review, load verification, and documentation aligned to IEC 61400 and IECRE schemes.',
  },
  {
    title: 'R&D Partnership',
    body: 'Embedded or fully outsourced R&D capacity, scaled to your roadmap without staffing-bench dilution.',
  },
];

/** About intro — who we are / how we work / what we deliver. */
export const aboutIntro = [
  {
    title: 'Who we are',
    body: 'A Bremen-headquartered design house serving the global wind industry. We operate as a full-stack engineering partner — not a staffing bench — covering aero-elastic modelling, structural and foundation engineering, certification, and project development for onshore and offshore wind.',
  },
  {
    title: 'How we work',
    body: 'We embed as an extension of a client’s own R&D function, or run a fully outsourced R&D centre against their roadmap. Every engagement is staffed by senior engineers who own the technical problem directly — load cases, design margins, and certification logic worked by the people who understand them, not passed down a chain.',
  },
  {
    title: 'What we deliver',
    body: 'For OEMs: turbine design, loads and structural validation, patent-grade IP. For developers: site assessment, foundation design, owner’s engineering, and technical due diligence. For certification bodies: independent design review, load verification, and documentation aligned to IEC 61400-1, -3, and IECRE schemes.',
  },
];

/** Why Aldott — the five differentiators. */
export const whyAldott = [
  {
    title: 'Independence of advice',
    body: 'Aldott is not owned by a turbine OEM, a developer, or a certification body. Our recommendations on load margins, foundation concepts, and certification readiness are not shaped by a parent company’s commercial interest — which is why OEMs, developers, and certifiers all bring us the same file without conflict.',
  },
  {
    title: 'Lifecycle framing, not project framing',
    body: 'We think in initiation, development, engineering, construction, and operation — not billable deliverables. A loads model built during concept design is the same one we defend at certification and revisit during operation. Nothing gets re-engineered from scratch, because nothing was ever handed off.',
  },
  {
    title: 'Senior access, not account layers',
    body: 'Every engagement is led by the engineers who actually run the numbers — not a client-facing lead backed by a junior bench. At 150+ projects and counting, that discipline is the reason clients return for the next phase instead of re-tendering.',
  },
  {
    title: 'Built to certification-grade rigour',
    body: 'Documentation, load verification, and design basis work structured to the same standard a certification body applies to itself — IEC 61400 series alignment, IECRE scheme logic, and BSH-level rigour for German offshore work. We build files that survive scrutiny because we’ve sat on both sides of the review table.',
  },
  {
    title: 'Leaner than the large certification houses',
    body: 'DNV and UL Solutions set the bar for independent technical authority at scale. Aldott operates at the scale a project actually needs — senior engineering depth without the queue, full lifecycle coverage without the overhead of a global certification body.',
  },
];
