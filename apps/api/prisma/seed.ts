import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import dotenv from 'dotenv';
import path from 'node:path';
const { services: siteServices } = require('../../../src/data/services.ts') as { services: any[] };
const { projects: siteProjects } = require('../../../src/data/projects.ts') as { projects: any[] };
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required to seed aldott.de');
const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
const pageSeed = [
  ['Engineering and certification support for onshore and offshore wind projects.','home','Aldott TechSolution — Wind Energy Engineering Consultancy','Independent wind energy engineering consultancy. Turbine design, loads analysis, IEC 61400 type certification support for OEMs, developers, and certification bodies. Bremen and Bengaluru.'],
  ['Full-stack engineering, concept to certificate','services','Engineering Services','Seven wind energy engineering service lines across the wind lifecycle.'],
  ['Projects','projects','Projects','Selected wind energy engineering and certification projects across European and international markets.'],
  ['Our mission: to be your R&D powerhouse','about','About','A Bremen-headquartered wind energy design house and full-stack engineering partner.'],
  ['Technical notes from the practice','insights','Insights','Technical notes and industry perspectives from Aldott TechSolution on wind energy engineering, loads analysis, and certification.'],
  ['Beyond wind: engineering the next generation of clean energy','vision','Future Directions','Aldott is extending wind-grade engineering methodology into utility-scale solar PV and green hydrogen.'],
  ['Contact Aldott','contact','Contact','Contact Aldott engineering in Bremen and Bengaluru.'],
  ['Privacy Policy','privacy-policy','Privacy Policy','How Aldott handles personal data submitted through this website.'],
  ['Terms of Use','terms','Terms of Use','Terms governing the use of the aldott.de website.'],
];
const services = [
  ['Custom Turbine Design','custom-turbine-design','Concept-to-detail wind turbine design.'],['Loads & Structural Analysis','loads-structural-analysis','Integrated load calculations for turbines, towers, and support structures.'],['Wind Resource & Site Assessment','wind-resource-site-assessment','Site-specific wind and metocean analysis and energy yield modelling.'],["Project Development & Owner's Engineering",'owners-engineering',"Independent Owner's Engineer representation and technical due diligence."],['Type Certification Support','type-certification-support','Design documentation and technical file preparation aligned to IEC 61400-1 and IECRE.'],['Certification Body Support','certification-body-support','Independent design review and load verification for certification bodies.'],['R&D Center Outreach','rd-center-outreach','Outsourced or co-located senior engineering capacity.'],
];
const projects = [
  ['HT1 Aberdeen Bay','ht1-aberdeen-bay','Offshore wind and hydrogen platform integration.'],['Normandy I & II','normandy-i-ii','Offshore array layout and site-specific load studies.'],['Brittany Floating Wind','brittany-floating-wind','Floating substructure and mooring load concepts.'],['Stora Middelgrund','stora-middelgrund','Metocean studies and energy yield analysis.'],['Rentel Offshore','rentel-offshore','Offshore project certification.'],['Shepherds Flat','shepherds-flat','Onshore wind micrositing and execution support.'],['Sweetwater','sweetwater','Onshore wind development execution support.'],['Alta Wind Energy Center','alta-wind-center','Wind farm planning and delivery support.'],['P750-57 Upgrade','p750-57-upgrade','Turbine performance and design upgrade support.'],['SE9320 Type Certification','se9320-type-certification','Wind turbine type certification engineering.'],
];
const insights = [
  ['AI-Driven Analytics in Wind Engineering','ai-driven-analytics','Analytics','How machine learning is compressing load-case screening and design iteration cycles without compromising certification-grade rigour.','/assets/photos/services/loads-analysis.jpg'],
  ['Offshore Wind Trends 2025','offshore-wind-trends-2025','Market Outlook','Where floating substructures, grid code tightening, and BSH-level permitting rigour are pushing offshore engineering scope in the next investment cycle.','/assets/photos/services/project-certification.jpg'],
  ['Load Stress & Structural Design','load-stress-structural-design','Structural','Why fatigue life and SCF analysis, not ultimate load alone, are the quiet variables that decide whether a foundation design survives certification review.','/assets/photos/services/turbine-design.jpg'],
  ['The Wind Farm Design Guide','wind-farm-design-guide','Field Guide','A practical walkthrough of how site assessment, metocean data, and layout optimisation compound into (or erode) a wind farm’s bankable yield case.','/assets/photos/services/project-management.jpg'],
];

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in the project .env before seeding.');
  if (password.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters.');
  const adminRole = await prisma.role.upsert({ where: { name: 'admin' }, update: {}, create: { name: 'admin' } });
  await prisma.role.upsert({ where: { name: 'editor' }, update: {}, create: { name: 'editor' } });
  const permissionKeys = ['pages.read','pages.write','posts.read','posts.write','forms.read','forms.write','media.write','settings.write','users.write','audit.read','apiKeys.write'];
  for (const key of permissionKeys) {
    const permission = await prisma.permission.upsert({ where: { key }, update: {}, create: { key } });
    await prisma.rolePermission.upsert({ where: { roleId_permissionId: { roleId: adminRole.id, permissionId: permission.id } }, update: {}, create: { roleId: adminRole.id, permissionId: permission.id } });
  }
  await prisma.user.upsert({ where: { email }, update: { name: 'aldott.de Administrator', passwordHash: await bcrypt.hash(password, 12), roleId: adminRole.id, active: true }, create: { email, name: 'aldott.de Administrator', passwordHash: await bcrypt.hash(password, 12), roleId: adminRole.id } });
  for (const [title, slug, seoTitle, description] of [...pageSeed, ...services.map(([title, slug, description]) => [title, `services--${slug}`, title, description]), ...projects.map(([title, slug, description]) => [title, `projects--${slug}`, title, description])] as string[][]) {
    await prisma.page.upsert({ where: { slug }, update: {}, create: { title, slug, status: 'published', seoMeta: { title: seoTitle, description }, contentBlocks: [] } });
  }
  for (const [, , category] of insights) await prisma.category.upsert({ where: { slug: category.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') }, update: {}, create: { name: category, slug: category.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') } });
  for (const [title, slug, category, summary, featuredImage] of insights) {
    const catSlug = category.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    const cat = await prisma.category.findUniqueOrThrow({ where: { slug: catSlug } });
    await prisma.post.upsert({ where: { slug }, update: {}, create: { title, slug, type: 'insight', status: 'published', publishedAt: new Date(), seoMeta: { title, description: summary }, contentBlocks: [{ type: 'summary', text: summary }], featuredImage, categories: { connect: { id: cat.id } } } });
  }
  for (const [sortOrder, service] of siteServices.entries()) {
    const post = await prisma.post.upsert({
      where: { slug: service.slug }, update: {},
      create: { title: service.title, slug: service.slug, type: 'service', status: 'published', publishedAt: new Date(), seoMeta: { title: service.title, description: service.shortDescription }, featuredImage: service.image, contentBlocks: [{ type: 'service', ...service, sortOrder }] },
    });
    const block = Array.isArray(post.contentBlocks) ? post.contentBlocks[0] as Record<string, any> : null;
    if (block && typeof block.sortOrder !== 'number') await prisma.post.update({ where: { id: post.id }, data: { contentBlocks: [{ ...block, sortOrder }] } });
  }
  for (const [sortOrder, project] of siteProjects.entries()) {
    const post = await prisma.post.upsert({
      where: { slug: project.slug }, update: {},
      create: { title: project.title, slug: project.slug, type: 'project', status: 'published', publishedAt: new Date(), seoMeta: { title: project.title, description: project.outcome }, featuredImage: project.image, contentBlocks: [{ type: 'project', ...project, sortOrder }] },
    });
    const block = Array.isArray(post.contentBlocks) ? post.contentBlocks[0] as Record<string, any> : null;
    if (block && typeof block.sortOrder !== 'number') await prisma.post.update({ where: { id: post.id }, data: { contentBlocks: [{ ...block, sortOrder }] } });
  }
  const settings = {
    siteName: 'aldott.de', logo: '/assets/logo-color.svg', email: 'info@aldott.in',
    phone: '+49 152 1181 8515', address: [{ city: 'Bremen', country: 'Germany' }, { city: 'Bengaluru', country: 'India' }],
    socialLinks: { linkedin: 'https://linkedin.com/company/aldott' }, defaultSeo: { title: 'Aldott TechSolution — Wind Energy Engineering Consultancy', description: 'Independent wind energy engineering consultancy.' },
    contactFormConfig: { fields: { company: true, phone: true, budget: false }, customQuestions: [] },
  };
  for (const [key, value] of Object.entries(settings)) await prisma.setting.upsert({ where: { key }, update: {}, create: { key, value: value as any } });
  console.log(`Seeded aldott.de content and the administrator ${email}.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
