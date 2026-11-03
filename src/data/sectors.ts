// src/data/sectors.ts

export type Sector = {
  title: string;
  description: string;
  icon: string; // Lucide icon name
  relatedServicesLink: string;
};

export const sectors: Sector[] = [
  {
    title: 'Onshore Wind Development',
    description:
      'Engineering and certification support for onshore wind farm development, ' +
      'covering turbine suitability, loads, project certification, and technical ' +
      'due diligence.',
    icon: 'Wind',
    relatedServicesLink: '/services',
  },
  {
    title: 'Offshore Wind Development',
    description:
      'Technical consultancy for offshore wind projects, including offshore load ' +
      'analysis, foundation interface reviews, and project certification ' +
      'coordination to IEC 61400-3.',
    icon: 'Anchor',
    relatedServicesLink: '/services',
  },
  {
    title: 'Turbine OEM & Manufacturing',
    description:
      'Design support, loads analysis, and type certification services for turbine ' +
      'manufacturers developing new products or adapting existing platforms for ' +
      'new markets.',
    icon: 'Cog',
    relatedServicesLink: '/services',
  },
  {
    title: 'Certification & Compliance',
    description:
      'End-to-end support for type and project certification processes, managing ' +
      'documentation, certification body liaison, and compliance verification ' +
      'across IEC and GL frameworks.',
    icon: 'ShieldCheck',
    relatedServicesLink: '/services',
  },
  {
    title: 'New Market Entry & Feasibility',
    description:
      'Technical feasibility studies, regulatory mapping, and market entry ' +
      'documentation for wind energy developers and manufacturers entering new ' +
      'international markets.',
    icon: 'Globe',
    relatedServicesLink: '/services',
  },
  {
    title: 'Research & Innovation',
    description:
      'R&D support for new turbine concepts, component innovation, and performance ' +
      "optimisation, drawing on Aldott's 20+ years of wind engineering experience.",
    icon: 'FlaskConical',
    relatedServicesLink: '/services',
  },
];
