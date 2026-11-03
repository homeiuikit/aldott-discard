// src/data/vision.ts
//
// "Beyond Wind" future-directions content, ported from the company's own drafted
// copy (aldott_vision_page.md). A statement of engineering intent — not a current
// service catalogue. Used by the /vision page and the homepage BeyondWind teaser.

export const visionIntro =
  'Aldott TechSolution was built on wind. What we are building next is broader — ' +
  'and it starts from the same discipline that got us here. We are extending the ' +
  'same R&D methodology that underpins our wind engineering practice into ' +
  'utility-scale solar PV and green hydrogen engineering. This is a statement of ' +
  'engineering intent, not a current service catalogue.';

export const beyondWind = [
  {
    icon: 'Sun',
    label: 'Solar',
    title: 'Wind-grade rigour for utility-scale PV',
    summary:
      'Applying our loads-analysis heritage, yield-modelling discipline, and grid ' +
      'engineering to utility-scale solar PV — not competing on installation volume.',
    points: [
      'Structural and energy yield analysis — foundation and racking loads, wind and snow load cases, single-axis tracker design.',
      'Irradiance and P50/P90 yield modelling for developer and financier confidence.',
      'Module discipline referenced to IEC 61215 and IEC 61730, with DC/AC ratio optimisation for lower LCOE.',
      'Grid integration engineering and interconnection studies for grid-integrated assets.',
      'Wind-solar hybrid convergence — shared yield modelling, grid studies, and structural governance.',
    ],
  },
  {
    icon: 'Atom',
    label: 'Hydrogen',
    title: 'Engineering the link from generation to infrastructure',
    summary:
      'Green hydrogen as a downstream application of renewable generation — ' +
      'building directly from work already underway on HT1 Aberdeen Bay.',
    points: [
      'Electrolysis and stack integration — PEM and alkaline sizing against the connected generation profile.',
      'Power-to-X engineering for ammonia, synthetic fuels, and industrial feedstock pathways.',
      'Storage, compression, and transport system design across the generation-to-offtake gap.',
      'Offshore wind-to-hydrogen integration — turbine-to-electrolyser interface, offshore vs onshore trade-offs.',
      'Safety and economics to IEC 62282 and ATEX/DSEAR, with LCOH analysis for offtake negotiation.',
    ],
  },
];

export const roadmap = [
  {
    num: '01',
    title: 'Extend the methodology',
    body: 'Apply our existing R&D and certification-grade engineering — loads analysis, yield modelling, documentation discipline — to solar PV, using wind as the reference discipline.',
  },
  {
    num: '02',
    title: 'Build hybrid delivery capability',
    body: 'Develop delivery capability for hybrid and co-located assets — wind-solar generation and wind-to-hydrogen integration — extending from work already underway on HT1 Aberdeen Bay.',
  },
  {
    num: '03',
    title: 'Full-spectrum clean energy R&D',
    body: 'Establish Aldott as a full-spectrum clean energy engineering house — one R&D methodology applied across wind, solar, and hydrogen as a single system.',
  },
];
