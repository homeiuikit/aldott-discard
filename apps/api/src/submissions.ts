import type { Request } from 'express';
import { z } from 'zod';

export function submissionWhere(query: Request['query']) {
  const where: any = {};
  const status = String(query.status || '').trim();
  if (status && !['new', 'read', 'archived'].includes(status)) throw new Error('Invalid submission status');
  if (status) where.status = status;
  if (typeof query.formType === 'string' && query.formType.trim()) where.formType = query.formType.trim();
  const search = String(query.search || '').trim().slice(0, 200);
  if (search) where.OR = [
    { formType: { contains: search, mode: 'insensitive' } },
    ...['email', 'full_name', 'company_name', 'phone', 'service', 'message', 'source', 'country', 'job_title'].map(field => ({ data: { path: [field], string_contains: search, mode: 'insensitive' } })),
  ];
  return where;
}
export function pageNumber(value: unknown, fallback: number, max: number) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? Math.min(number, max) : fallback;
}
export const csvFields = ['id', 'formType', 'full_name', 'email', 'phone', 'company_name', 'job_title', 'country', 'service', 'budget', 'message', 'source', 'consent', 'consent_at', 'consent_version', 'status', 'createdAt', 'updatedAt', 'additional_fields'];
export function csvCell(value: unknown) {
  let text = value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
  // Prevent spreadsheet applications interpreting untrusted input as formulas.
  if (/^[\s\u0000-\u001f]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}
export function submissionCsvRow(row: any) {
  const data = row.data && typeof row.data === 'object' ? row.data : {};
  const extra = Object.fromEntries(Object.entries(data).filter(([key]) => !csvFields.slice(2, 15).includes(key)));
  return csvFields.map(key => csvCell(key === 'additional_fields' ? extra : ['id', 'formType', 'status', 'createdAt', 'updatedAt'].includes(key) ? row[key] instanceof Date ? row[key].toISOString() : row[key] : data[key])).join(',') + '\r\n';
}
export function publicSubmission(formType: string, body: unknown) {
  if (!['contact', 'demo', 'newsletter'].includes(formType)) throw new Error('Unsupported form type');
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid form submission');
  const entries = Object.entries(body);
  if (entries.length > 60 || entries.some(([key, value]) => key.length > 80 || typeof value !== 'string' || value.length > 5000)) throw new Error('Invalid form fields');
  const data: Record<string, string> = Object.fromEntries(entries.map(([key, value]) => [key, (value as string).trim()]));
  if (!z.string().email().max(254).safeParse(data.email).success) throw new Error('A valid email is required');
  if (formType === 'contact' && ['full_name', 'country', 'service', 'message'].some(field => !data[field])) throw new Error('Name, country, service and message are required');
  if (formType === 'newsletter') {
    if (data.consent !== 'true') throw new Error('Please agree to receive the newsletter');
    return { email: data.email.toLowerCase(), source: 'footer-newsletter', consent: 'true', consent_at: new Date().toISOString(), consent_version: 'newsletter-v1' };
  }
  return data;
}
