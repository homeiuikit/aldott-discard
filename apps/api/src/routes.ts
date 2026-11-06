import { Router, type Request, type Response } from 'express';
import { randomBytes, createHash } from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs/promises';
import sanitizeHtml from 'sanitize-html';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { prisma } from './db';
import { clearRefreshCookie, issueAccess, requireAdmin, requireAuth, setRefreshCookie, type SessionRequest } from './auth';
import { deleteStoredMedia, storeMedia } from './storage';
import { clientRateLimitKey } from './rate-limit';

const router = Router();
const loginLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false, keyGenerator: clientRateLimitKey });
const resetLimit = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false, keyGenerator: clientRateLimitKey });
const aiDraftLimit = rateLimit({ windowMs: 60 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false, keyGenerator: clientRateLimitKey });
const hash = (value: string) => createHash('sha256').update(value).digest('hex');
const slugify = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const param = (req: Request, key: string): string => { const value = req.params[key]; return Array.isArray(value) ? value[0] : value; };
const toPublicPage = (page: any) => ({ ...page, seoMeta: page.seoMeta, contentBlocks: page.contentBlocks });

// Authentication: access token is returned once; refresh token is only in an httpOnly cookie.
router.post('/auth/login', loginLimit, async (req, res) => {
  const parsed = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Email and password are required' });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() }, include: { role: true } });
  if (!user?.active || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return res.status(401).json({ error: 'Invalid email or password' });
  const accessToken = issueAccess({ id: user.id, email: user.email, role: user.role.name, tokenVersion: user.tokenVersion });
  setRefreshCookie(res, user);
  await prisma.auditLog.create({ data: { userId: user.id, action: 'login', entity: 'User', entityId: user.id } });
  return res.json({ accessToken, user: { id: user.id, email: user.email, name: user.name, role: user.role.name } });
});
router.post('/auth/refresh', async (req, res) => {
  const token = req.cookies?.aldott_refresh;
  if (!token) return res.status(401).json({ error: 'Refresh session is missing' });
  try {
    if (!process.env.JWT_REFRESH_SECRET) throw new Error('Refresh secret missing');
    const claims = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as { id: string; ver: number };
    const user = await prisma.user.findUnique({ where: { id: claims.id }, include: { role: true } });
    if (!user?.active || user.tokenVersion !== claims.ver) throw new Error('stale');
    setRefreshCookie(res, user);
    return res.json({ accessToken: issueAccess({ id: user.id, email: user.email, role: user.role.name, tokenVersion: user.tokenVersion }) });
  } catch { clearRefreshCookie(res); return res.status(401).json({ error: 'Refresh session is invalid or expired' }); }
});
router.post('/auth/logout', requireAuth, async (req: SessionRequest, res) => {
  await prisma.user.update({ where: { id: req.user!.id }, data: { tokenVersion: { increment: 1 } } });
  await prisma.auditLog.create({ data: { userId: req.user!.id, action: 'logout', entity: 'User', entityId: req.user!.id } });
  clearRefreshCookie(res);
  return res.json({ ok: true });
});
router.post('/auth/forgot-password', resetLimit, async (req, res) => {
  const email = String(req.body?.email || '').toLowerCase().trim();
  if (!z.string().email().safeParse(email).success) return res.status(400).json({ error: 'A valid email is required' });
  const user = await prisma.user.findUnique({ where: { email } });
  if (user?.active) {
    const token = randomBytes(32).toString('hex');
    await prisma.passwordResetToken.create({ data: { userId: user.id, tokenHash: hash(token), expiresAt: new Date(Date.now() + 60 * 60 * 1000) } });
    const resetUrl = `${process.env.ADMIN_URL || 'http://localhost:3001'}/reset-password?token=${token}`;
    if (process.env.PASSWORD_RESET_WEBHOOK_URL) {
      await fetch(process.env.PASSWORD_RESET_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(process.env.PASSWORD_RESET_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.PASSWORD_RESET_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify({ email, resetUrl }) });
    } else if (process.env.NODE_ENV !== 'production') console.info(`[aldott.de password reset] ${resetUrl}`);
  }
  return res.json({ message: 'If the account exists, password reset instructions will be sent.' });
});
router.post('/auth/reset-password', resetLimit, async (req, res) => {
  const parsed = z.object({ token: z.string().min(32), password: z.string().min(12) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Token and a password of at least 12 characters are required' });
  const reset = await prisma.passwordResetToken.findUnique({ where: { tokenHash: hash(parsed.data.token) } });
  if (!reset || reset.usedAt || reset.expiresAt < new Date()) return res.status(400).json({ error: 'Reset token is invalid or expired' });
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: reset.userId }, data: { passwordHash, tokenVersion: { increment: 1 } } }),
    prisma.passwordResetToken.update({ where: { id: reset.id }, data: { usedAt: new Date() } }),
  ]);
  return res.json({ message: 'Password updated. You can sign in now.' });
});
router.get('/admin/me', requireAuth, async (req: SessionRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id }, include: { role: { include: { permissions: { include: { permission: true } } } } } });
  return res.json(safeRecord(user));
});
router.get('/admin/dashboard', requireAuth, requireAdmin, async (_req, res) => {
  const [pages, posts, services, projects, submissions, contacts, demos, newsletter, media, users] = await Promise.all([
    prisma.page.count(), prisma.post.count({ where: { type: 'insight' } }), prisma.post.count({ where: { type: 'service' } }), prisma.post.count({ where: { type: 'project' } }),
    prisma.formSubmission.count({ where: { status: 'new' } }), prisma.formSubmission.count({ where: { formType: 'contact' } }), prisma.formSubmission.count({ where: { formType: 'demo' } }), prisma.formSubmission.count({ where: { formType: 'newsletter' } }), prisma.media.count(), prisma.user.count(),
  ]);
  return res.json({ pages, posts, services, projects, newSubmissions: submissions, contacts, demos, newsletter, media, users });
});

// Public content API.
router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.get('/pages/:slug', async (req, res) => {
  const page = await prisma.page.findFirst({ where: { slug: param(req, 'slug'), status: 'published' } });
  return page ? res.json(toPublicPage(page)) : res.status(404).json({ error: 'Page not found' });
});
router.get('/pages', async (_req, res) => res.json(await prisma.page.findMany({ where: { status: 'published' }, select: { title: true, slug: true, updatedAt: true, seoMeta: true } })));
router.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany({ where: { status: 'published', ...(req.query.type ? { type: String(req.query.type) } : {}) }, include: { categories: true, tags: true }, orderBy: { publishedAt: 'desc' } });
  return res.json(posts);
});
router.get('/posts/:slug', async (req, res) => {
  const post = await prisma.post.findFirst({ where: { slug: param(req, 'slug'), status: 'published' }, include: { categories: true, tags: true } });
  return post ? res.json(post) : res.status(404).json({ error: 'Post not found' });
});
router.get('/categories', async (_req, res) => res.json(await prisma.category.findMany({ orderBy: { name: 'asc' } })));
router.get('/tags', async (_req, res) => res.json(await prisma.tag.findMany({ orderBy: { name: 'asc' } })));
router.get('/settings', async (_req, res) => {
  const rows = await prisma.setting.findMany();
  const publicKeys = new Set(['siteName', 'logo', 'phone', 'email', 'address', 'socialLinks', 'defaultSeo', 'contactFormConfig']);
  return res.json(Object.fromEntries(rows.filter((r) => publicKeys.has(r.key)).map((r) => [r.key, r.value])));
});
router.post('/forms/:formType', async (req, res) => {
  const formType = slugify(param(req, 'formType'));
  if (!formType || !req.body || typeof req.body !== 'object' || Array.isArray(req.body)) return res.status(400).json({ error: 'Invalid form submission' });
  if (JSON.stringify(req.body).length > 30000) return res.status(413).json({ error: 'Submission is too large' });
  const data = Object.fromEntries(Object.entries(req.body).map(([k, v]) => [k.slice(0, 80), typeof v === 'string' ? v.trim().slice(0, 5000) : v]));
  if (typeof data.email !== 'string' || !z.string().email().safeParse(data.email).success) return res.status(422).json({ error: 'A valid email is required' });
  const saved = await prisma.formSubmission.create({ data: { formType, data: data as any } });
  return res.status(201).json({ ok: true, id: saved.id });
});

// Every dynamic admin resource uses the same authenticated JSON CRUD contract.
const resources: Record<string, { model: any; include?: any; defaults?: (body: any) => any }> = {
  pages: { model: prisma.page }, posts: { model: prisma.post, include: { categories: true, tags: true } }, categories: { model: prisma.category }, tags: { model: prisma.tag },
  media: { model: prisma.media }, settings: { model: prisma.setting }, forms: { model: prisma.formSubmission }, submissions: { model: prisma.formSubmission },
  redirects: { model: prisma.redirect }, users: { model: prisma.user, include: { role: true } }, roles: { model: prisma.role, include: { permissions: { include: { permission: true } } } },
  permissions: { model: prisma.permission }, audit: { model: prisma.auditLog }, apiKeys: { model: prisma.apiKey },
};
const mutable = (body: any, resource: string) => {
  const data = { ...body };
  delete data.id; delete data.createdAt; delete data.updatedAt; delete data.passwordHash; delete data.keyHash;
  if (resource === 'pages' || resource === 'posts') {
    if (typeof data.title === 'string') data.slug = slugify(data.slug || data.title);
    const cleanHtml = (value: string) => sanitizeHtml(value, { allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']), allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'width', 'height'] }, allowedSchemes: ['http', 'https', 'mailto'] });
    if (typeof data.contentBlocks === 'string') data.contentBlocks = [{ type: 'html', html: cleanHtml(data.contentBlocks) }];
    else if (Array.isArray(data.contentBlocks)) data.contentBlocks = data.contentBlocks.map((block: any) => block && typeof block.html === 'string' ? { ...block, html: cleanHtml(block.html) } : block);
    if (data.status === 'published' && resource === 'posts' && !data.publishedAt) data.publishedAt = new Date();
  }
  if (resource === 'redirects') {
    if (typeof data.source !== 'string' || !data.source.startsWith('/') || data.source.startsWith('//')) throw new Error('Redirect source must be a local path');
    if (typeof data.target !== 'string' || !data.target.startsWith('/') || data.target.startsWith('//') || /^[a-z]+:/i.test(data.target)) throw new Error('Redirect target must be a safe local path');
    if (![301, 302, 307, 308].includes(Number(data.statusCode))) throw new Error('Invalid redirect status code');
  }
  if (resource === 'settings') {
    if (typeof data.key !== 'string' || !data.key.trim()) throw new Error('Setting key is required');
    if (data.key === 'email' && (typeof data.value !== 'string' || !z.string().email().safeParse(data.value).success)) throw new Error('Setting email must be valid');
    if (data.key === 'logo' && (typeof data.value !== 'string' || (data.value.startsWith('//') || (!data.value.startsWith('/') && !/^https:\/\//i.test(data.value))))) throw new Error('Logo must be a local path or HTTPS URL');
    if (data.key === 'socialLinks' && (!data.value || typeof data.value !== 'object' || Object.values(data.value).some((link) => typeof link !== 'string' || !/^https:\/\//i.test(link)))) throw new Error('Social links must be HTTPS URLs');
  }
  if (resource === 'apiKeys' && data.key) { data.keyHash = hash(data.key); delete data.key; }
  return data;
};
router.use('/admin', requireAuth, requireAdmin);
router.post('/admin/ai/draft', aiDraftLimit, async (req, res) => {
  const topic = typeof req.body?.topic === 'string' ? req.body.topic.trim().slice(0, 500) : '';
  if (!topic) return res.status(400).json({ error: 'Enter a topic for the article' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI drafting is not configured. Add GEMINI_API_KEY to the local .env file, then restart the API.' });
  try {
    const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    const prompt = `You write useful, accurate first-draft engineering articles for aldott.de, an independent wind energy engineering consultancy. Do not invent company credentials, project facts, statistics, or citations. Where evidence is uncertain, use careful language and mark claims for editorial review. Return only a JSON object with string fields title, seoTitle, seoDescription, excerpt, html. html must use semantic article markup such as h2, h3, p, ul, li, and strong; no scripts, styles, images, or links to unverified sources. SEO description should be concise and accurately describe the article.\n\nDraft a long-form blog article for this topic: ${topic}\nTarget audience: ${String(req.body?.audience || 'wind energy professionals').slice(0, 300)}\nTarget keywords: ${String(req.body?.keywords || '').slice(0, 500)}\nAdditional direction: ${String(req.body?.direction || '').slice(0, 1200)}\nWrite a substantive 700–1000 word draft, but do not fabricate specific facts.`;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST', headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.5, maxOutputTokens: 8192 } }), signal: AbortSignal.timeout(60000),
    });
    const payload: any = await response.json();
    if (!response.ok) {
      const providerMessage = String(payload?.error?.message || '');
      console.error('Gemini draft provider error', response.status, providerMessage.slice(0, 300));
      if (response.status === 429) return res.status(429).json({ error: 'Gemini has reached this project’s current quota. Check AI Studio usage limits or try again later.' });
      if (response.status === 503) return res.status(503).json({ error: 'Gemini is temporarily overloaded. Please try again in a minute.' });
      if (response.status === 401 || response.status === 403) return res.status(502).json({ error: 'Gemini rejected this API key or the project does not have access to the selected model.' });
      return res.status(502).json({ error: 'Gemini could not create a draft. Check that the configured model is available to this project.' });
    }
    const raw = payload?.candidates?.[0]?.content?.parts?.map((part: any) => typeof part.text === 'string' ? part.text : '').join('');
    const draft = JSON.parse(raw || '{}');
    if (!draft.title || !draft.html) throw new Error('Incomplete AI response');
    const clean = (value: string) => sanitizeHtml(value, { allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h2', 'h3', 'img']), allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'width', 'height'] }, allowedSchemes: ['http', 'https', 'mailto'] });
    return res.json({ title: String(draft.title).slice(0, 250), seoTitle: String(draft.seoTitle || draft.title).slice(0, 250), seoDescription: String(draft.seoDescription || '').slice(0, 500), excerpt: String(draft.excerpt || draft.seoDescription || '').slice(0, 700), html: clean(String(draft.html)) });
  } catch (error) { console.error('AI draft failed', error); return res.status(502).json({ error: 'Could not generate the article draft. Please try again.' }); }
});
router.get('/admin/:resource', async (req, res) => {
  const resource = resources[param(req, 'resource')];
  if (!resource) return res.status(404).json({ error: 'Unknown resource' });
  const search = String(req.query.search || '').trim();
  const status = String(req.query.status || '').trim();
  const where: any = {};
  if (status) where.status = status;
  if (param(req, 'resource') === 'settings' && typeof req.query.key === 'string' && req.query.key.trim()) where.key = req.query.key.trim();
  if (param(req, 'resource') === 'posts' && typeof req.query.type === 'string' && req.query.type.trim()) where.type = req.query.type.trim();
  if (['forms', 'submissions'].includes(param(req, 'resource')) && typeof req.query.formType === 'string' && req.query.formType.trim()) where.formType = slugify(req.query.formType.trim());
  if (search && ['pages', 'posts', 'categories', 'tags', 'media', 'submissions', 'forms', 'redirects', 'users', 'roles', 'permissions', 'audit', 'apiKeys'].includes(param(req, 'resource'))) {
    const fields: Record<string, string[]> = { pages: ['title', 'slug'], posts: ['title', 'slug'], categories: ['name', 'slug'], tags: ['name', 'slug'], media: ['filename', 'originalName'], submissions: ['formType'], forms: ['formType'], redirects: ['source', 'target'], users: ['email', 'name'], roles: ['name'], permissions: ['key'], audit: ['action', 'entity'], apiKeys: ['name'] };
    where.OR = (fields[param(req, 'resource')] || []).map((field) => ({ [field]: { contains: search, mode: 'insensitive' } }));
    if (param(req, 'resource') === 'forms' || param(req, 'resource') === 'submissions') where.OR.push(...['email', 'full_name', 'company_name'].map((field) => ({ data: { path: [field], string_contains: search } })));
  }
  const orderBy = ['settings', 'permissions'].includes(param(req, 'resource')) ? { key: 'asc' } : { createdAt: 'desc' };
  const query: any = { where, orderBy, take: Math.min(Number(req.query.limit) || 100, 200) };
  if (resource.include) query.include = resource.include;
  try { return res.json(safeRecord(await resource.model.findMany(query))); } catch (error) { console.error(error); return res.status(400).json({ error: 'Could not list resource' }); }
});
router.get('/admin/:resource/:id', async (req, res) => {
  const resource = resources[param(req, 'resource')]; if (!resource) return res.status(404).json({ error: 'Unknown resource' });
  try { const value = await resource.model.findUnique({ where: param(req, 'resource') === 'settings' ? { key: param(req, 'id') } : { id: param(req, 'id') }, ...(resource.include ? { include: resource.include } : {}) }); return value ? res.json(safeRecord(value)) : res.status(404).json({ error: 'Record not found' }); } catch { return res.status(400).json({ error: 'Could not load record' }); }
});
function safeRecord(value: any): any { if (Array.isArray(value)) return value.map(safeRecord); if (!value || typeof value !== 'object') return value; const { passwordHash, keyHash, ...safe } = value; if (safe.role) safe.role = safeRecord(safe.role); return safe; }
router.post('/admin/:resource', async (req: SessionRequest, res) => {
  const resource = resources[param(req, 'resource')]; if (!resource) return res.status(404).json({ error: 'Unknown resource' });
  try {
    if (param(req, 'resource') === 'media') throw new Error('Upload media through /admin/media/upload');
    const generatedApiKey = param(req, 'resource') === 'apiKeys' ? String(req.body.key || randomBytes(32).toString('hex')) : '';
    const data = mutable(req.body, param(req, 'resource'));
    if (param(req, 'resource') === 'users') {
      const role = await prisma.role.findUnique({ where: { name: String(data.role || 'editor') } }); if (!role) throw new Error('Role not found');
      if (typeof req.body.password !== 'string' || req.body.password.length < 12) throw new Error('A password of at least 12 characters is required');
      data.roleId = role.id; delete data.role; data.passwordHash = await bcrypt.hash(req.body.password, 12); delete data.password;
    }
    if (param(req, 'resource') === 'apiKeys') data.keyHash = hash(generatedApiKey);
    if (param(req, 'resource') === 'roles' && Array.isArray(data.permissions)) { const keys = data.permissions; delete data.permissions; data.permissions = { connect: await prisma.permission.findMany({ where: { key: { in: keys } }, select: { id: true } }) }; }
    if (param(req, 'resource') === 'posts') {
      for (const relation of ['categories', 'tags']) if (Array.isArray(data[relation])) { const names = data[relation]; delete data[relation]; const found: any[] = relation === 'categories' ? await prisma.category.findMany({ where: { slug: { in: names } }, select: { id: true } }) : await prisma.tag.findMany({ where: { slug: { in: names } }, select: { id: true } }); data[relation] = { connect: found }; }
    }
    const raw = await resource.model.create({ data }); const saved = safeRecord(raw);
    await prisma.auditLog.create({ data: { userId: req.user!.id, action: 'create', entity: param(req, 'resource'), entityId: saved.id } });
    if (param(req, 'resource') === 'apiKeys') return res.status(201).json({ ...saved, key: generatedApiKey });
    return res.status(201).json(saved);
  } catch (error) { return res.status(400).json({ error: error instanceof Error ? error.message : 'Could not create record' }); }
});
router.put('/admin/:resource/:id', async (req: SessionRequest, res) => {
  const resource = resources[param(req, 'resource')]; if (!resource) return res.status(404).json({ error: 'Unknown resource' });
  try {
    const data = mutable(req.body, param(req, 'resource'));
    if (param(req, 'resource') === 'users') { if (data.role) { const role = await prisma.role.findUnique({ where: { name: data.role } }); if (!role) throw new Error('Role not found'); data.roleId = role.id; delete data.role; } if (req.body.password) { if (req.body.password.length < 12) throw new Error('A password of at least 12 characters is required'); data.passwordHash = await bcrypt.hash(req.body.password, 12); data.tokenVersion = { increment: 1 }; } delete data.password; }
    if (param(req, 'resource') === 'roles' && Array.isArray(data.permissions)) { const keys = data.permissions; delete data.permissions; data.permissions = { set: (await prisma.permission.findMany({ where: { key: { in: keys } }, select: { id: true } })).map(p => ({ id: p.id })) }; }
    if (param(req, 'resource') === 'posts') {
      for (const relation of ['categories', 'tags']) if (Array.isArray(data[relation])) { const names = data[relation]; delete data[relation]; const found: any[] = relation === 'categories' ? await prisma.category.findMany({ where: { slug: { in: names } }, select: { id: true } }) : await prisma.tag.findMany({ where: { slug: { in: names } }, select: { id: true } }); data[relation] = { set: found.map((item: any) => ({ id: item.id })) }; }
    }
    const raw = await resource.model.update({ where: param(req, 'resource') === 'settings' ? { key: param(req, 'id') } : { id: param(req, 'id') }, data }); const saved = safeRecord(raw);
    await prisma.auditLog.create({ data: { userId: req.user!.id, action: 'update', entity: param(req, 'resource'), entityId: saved.id } });
    return res.json(saved);
  } catch (error) { return res.status(400).json({ error: error instanceof Error ? error.message : 'Could not update record' }); }
});
router.delete('/admin/:resource/:id', async (req: SessionRequest, res) => {
  const resource = resources[param(req, 'resource')]; if (!resource) return res.status(404).json({ error: 'Unknown resource' });
  try {
    if (param(req, 'resource') === 'media') {
      const media = await prisma.media.findUnique({ where: { id: param(req, 'id') } });
      if (media && /^[a-f0-9]{32}\.(jpg|png|webp|gif)$/.test(media.filename)) {
        if (!await deleteStoredMedia(media.filename)) await fs.unlink(path.join(path.resolve(process.env.UPLOAD_DIR || './uploads'), media.filename)).catch(() => undefined);
      }
    }
    await resource.model.delete({ where: param(req, 'resource') === 'settings' ? { key: param(req, 'id') } : { id: param(req, 'id') } });
    await prisma.auditLog.create({ data: { userId: req.user!.id, action: 'delete', entity: param(req, 'resource'), entityId: param(req, 'id') } });
    return res.json({ ok: true });
  } catch { return res.status(400).json({ error: 'Could not delete record' }); }
});

// Uploads are restricted to common raster formats and 5 MB.
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_req, file, cb) => cb(null, ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.mimetype)) });
router.post('/admin/media/upload', requireAuth, requireAdmin, upload.single('file'), async (req: SessionRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a JPG, PNG, WEBP, or GIF image up to 5 MB' });
  const ext = ({ 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' } as Record<string, string>)[req.file.mimetype];
  const filename = `${randomBytes(16).toString('hex')}${ext}`;
  if (!await storeMedia(filename, req.file.buffer, req.file.mimetype)) {
    const dir = path.resolve(process.env.UPLOAD_DIR || './uploads'); await fs.mkdir(dir, { recursive: true }); await fs.writeFile(path.join(dir, filename), req.file.buffer, { flag: 'wx' });
  }
  const media = await prisma.media.create({ data: { filename, originalName: req.file.originalname.slice(0, 200), mimeType: req.file.mimetype, size: req.file.size, url: `/uploads/${filename}` } });
  await prisma.auditLog.create({ data: { userId: req.user!.id, action: 'upload', entity: 'Media', entityId: media.id } });
  return res.status(201).json(media);
});

// Canonical CMS sitemap endpoint.
router.get('/sitemap.xml', async (_req, res) => {
  const [pages, posts] = await Promise.all([prisma.page.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }), prisma.post.findMany({ where: { status: 'published' }, select: { slug: true, type: true, updatedAt: true } })]);
  const base = process.env.PUBLIC_SITE_URL || 'https://aldott.de';
  const urls = [...pages.map((p) => ({ loc: p.slug === 'home' ? base : `${base}/${p.slug.replace(/--/g, '/')}`, date: p.updatedAt })), ...posts.map((p) => ({ loc: `${base}/${p.type === 'service' ? 'services' : p.type === 'project' ? 'projects' : 'insights'}/${p.slug}`, date: p.updatedAt }))];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${u.loc.replace(/&/g, '&amp;')}</loc><lastmod>${u.date.toISOString()}</lastmod></url>`).join('')}</urlset>`;
  res.type('application/xml').send(xml);
});

export default router;
