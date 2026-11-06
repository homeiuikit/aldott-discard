import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import fs from 'node:fs';
import api from './routes';
import { prisma } from './db';
import { getStoredMedia, usesNeonStorage } from './storage';
import { clientRateLimitKey } from './rate-limit';

export const app = express();
const allowed = new Set([
  'https://aldott.de', 'https://www.aldott.de', 'https://admin.aldott.de',
  'http://localhost:3000', 'http://localhost:3001', 'http://localhost:4000',
  'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:4000',
]);
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin(origin, cb) { if (!origin || allowed.has(origin)) return cb(null, true); cb(new Error('Origin not allowed')); }, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false, keyGenerator: clientRateLimitKey }));

// Local uploads stay on disk; production media is stored in Neon Object Storage.
if (usesNeonStorage()) {
  app.get('/uploads/:filename', async (req, res, next) => {
    if (!/^[a-f0-9]{32}\.(jpg|png|webp|gif)$/.test(req.params.filename)) return res.status(404).end();
    try {
      const object = await getStoredMedia(req.params.filename);
      if (!object?.Body) return res.status(404).end();
      res.setHeader('Content-Type', object.ContentType || 'application/octet-stream');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.end(Buffer.from(await object.Body.transformToByteArray()));
    } catch (error) { next(error); }
  });
} else {
  const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads');
  fs.mkdirSync(uploadDir, { recursive: true });
  app.use('/uploads', express.static(uploadDir, { maxAge: '1d', immutable: true }));
}

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/sitemap.xml', async (_req, res, next) => {
  try {
    const [pages, posts] = await Promise.all([
      prisma.page.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }),
      prisma.post.findMany({ where: { status: 'published' }, select: { slug: true, type: true, updatedAt: true } }),
    ]);
    const base = process.env.PUBLIC_SITE_URL || 'https://aldott.de';
    const urls = [...pages.map((page) => ({ loc: page.slug === 'home' ? base : `${base}/${page.slug.replace(/--/g, '/')}`, date: page.updatedAt })), ...posts.map((post) => ({ loc: `${base}/${post.type === 'service' ? 'services' : post.type === 'project' ? 'projects' : 'insights'}/${post.slug}`, date: post.updatedAt }))];
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url.loc.replace(/&/g, '&amp;')}</loc><lastmod>${url.date.toISOString()}</lastmod></url>`).join('')}</urlset>`);
  } catch (error) { next(error); }
});
app.use('/api/v1', api);
app.use('/api/v1', (_req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof Error && err.message === 'Origin not allowed') return res.status(403).json({ error: 'Origin not allowed' });
  console.error(err);
  const status = typeof err === 'object' && err && 'status' in err ? Number((err as { status: unknown }).status) : 500;
  return res.status(status >= 400 && status < 600 ? status : 500).json({ error: err instanceof Error && status < 500 ? err.message : 'Internal server error' });
});

