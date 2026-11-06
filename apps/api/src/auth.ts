import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from './db';

const secret = () => { if (!process.env.JWT_ACCESS_SECRET) throw new Error('JWT_ACCESS_SECRET is not configured'); return process.env.JWT_ACCESS_SECRET; };
const refreshSecret = () => { if (!process.env.JWT_REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not configured'); return process.env.JWT_REFRESH_SECRET; };
export type SessionRequest = Request & { user?: { id: string; email: string; role: string } };
export function issueAccess(user: { id: string; email: string; role: string; tokenVersion: number }) {
  const expiresIn = (process.env.ACCESS_TOKEN_TTL || '15m') as jwt.SignOptions['expiresIn'];
  return jwt.sign(user, secret(), { expiresIn });
}
export function setRefreshCookie(res: Response, user: { id: string; tokenVersion: number }) {
  const token = jwt.sign({ id: user.id, ver: user.tokenVersion }, refreshSecret(), { expiresIn: '7d' });
  res.cookie('aldott_refresh', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/api/v1/auth', maxAge: 7 * 24 * 60 * 60 * 1000 });
}
export function clearRefreshCookie(res: Response) {
  res.clearCookie('aldott_refresh', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/api/v1/auth' });
}
export async function requireAuth(req: SessionRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    const payload = jwt.verify(token, secret()) as { id: string; email: string; role: string; tokenVersion: number };
    const user = await prisma.user.findUnique({ where: { id: payload.id }, include: { role: true } });
    if (!user?.active || user.tokenVersion !== payload.tokenVersion) return res.status(401).json({ error: 'Session is no longer valid' });
    req.user = { id: user.id, email: user.email, role: user.role.name };
    return next();
  } catch { return res.status(401).json({ error: 'Invalid or expired access token' }); }
}
export function requireAdmin(req: SessionRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin role required' });
  return next();
}
