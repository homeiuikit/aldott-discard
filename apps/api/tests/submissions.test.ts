import assert from 'node:assert/strict';
import { test } from 'node:test';
import { once } from 'node:events';
import { csvCell, csvFields, pageNumber, publicSubmission, submissionCsvRow, submissionWhere } from '../src/submissions';

test('CSV preserves quotes, multiline messages, Unicode and custom fields', () => {
  const row = { id: 'one', formType: 'contact', status: 'new', createdAt: new Date('2026-11-10T10:00:00Z'), data: { email: 'jörg@example.com', message: 'Hello, "Aldott"\nSecond line', custom_1: 'Wind & solar', status: 'a custom answer named status' } };
  const csv = submissionCsvRow(row);
  assert.ok(csv.includes('"Hello, ""Aldott""\nSecond line"'));
  assert.ok(csv.includes('jörg@example.com'));
  assert.ok(csv.includes('""custom_1"":""Wind & solar""'));
  assert.ok(csv.includes('2026-11-10T10:00:00.000Z'));
  assert.ok(csv.includes('a custom answer named status'));
  assert.equal(csvFields.length, 19);
});
test('CSV neutralizes formula injection, including whitespace prefixes', () => {
  for (const value of ['=1+1', '+cmd', '-1+2', '@SUM(1)', '  =1', '\t=1', '\n=1']) assert.ok(csvCell(value).startsWith('"\''));
  assert.equal(csvCell('ordinary'), '"ordinary"');
});
test('submission filters validate statuses and search all contact fields', () => {
  const where = submissionWhere({ status: 'read', formType: 'newsletter', search: 'Example' });
  assert.equal(where.formType, 'newsletter'); assert.equal(where.status, 'read');
  assert.ok(where.OR.some((filter: any) => filter.data?.path[0] === 'message' && filter.data.mode === 'insensitive'));
  assert.throws(() => submissionWhere({ status: 'invalid' }));
  assert.equal(pageNumber('-1', 25, 200), 25); assert.equal(pageNumber('500', 25, 200), 200);
});
test('newsletter requires explicit consent and records server-owned consent details', () => {
  assert.throws(() => publicSubmission('newsletter', { email: 'hello@example.com' }));
  assert.throws(() => publicSubmission('newsletter', { email: 'bad', consent: 'true' }));
  const data = publicSubmission('newsletter', { email: ' HELLO@example.com ', consent: 'true', consent_at: 'forged', source: 'forged' });
  assert.equal(data.email, 'hello@example.com'); assert.equal(data.source, 'footer-newsletter');
  assert.equal(data.consent_version, 'newsletter-v1'); assert.notEqual(data.consent_at, 'forged');
});
test('contact validation rejects unknown form types, missing required fields and nested payloads', () => {
  assert.throws(() => publicSubmission('unknown', { email: 'test@example.com' }));
  assert.throws(() => publicSubmission('contact', { email: 'test@example.com' }));
  assert.throws(() => publicSubmission('newsletter', { email: { nested: 'test@example.com' } }));
  assert.equal(publicSubmission('contact', { email: 'test@example.com', full_name: 'Test', country: 'Germany', service: 'Design', message: 'Test message', custom_1: 'Extra' }).custom_1, 'Extra');
});
test('HTTP: export authorization, full CSV beyond list limit, pagination, newsletter and roles', async () => {
  // No environment files are loaded and every database operation below is mocked.
  process.env.DATABASE_URL = 'postgresql://test:test@127.0.0.1:1/test';
  process.env.JWT_ACCESS_SECRET = 'isolated-test-access-secret';
  process.env.JWT_REFRESH_SECRET = 'isolated-test-refresh-secret';
  const { prisma } = await import('../src/db');
  const { app } = await import('../src/app');
  const { issueAccess } = await import('../src/auth');
  const records = Array.from({ length: 1026 }, (_, i) => ({ id: `submission-${i}`, formType: 'contact', status: 'new', createdAt: new Date('2026-11-10'), updatedAt: new Date('2026-11-10'), data: { full_name: `Contact ${i}`, email: `test${i}@example.com`, message: i === 0 ? '=HYPERLINK("bad")' : 'Test message' } }));
  const calls: any[] = [];
  (prisma.formSubmission as any).findMany = async (q: any) => { calls.push(q); const start = q.cursor ? records.findIndex(r => r.id === q.cursor.id) + 1 : q.skip || 0; return records.slice(start, start + q.take); };
  (prisma.formSubmission as any).count = async () => records.length;
  (prisma.formSubmission as any).create = async ({ data }: any) => ({ id: 'new-submission', ...data });
  (prisma.auditLog as any).create = async () => ({});
  (prisma.user as any).findUnique = async ({ where }: any) => ({ id: where.id, email: 'test@example.com', active: true, tokenVersion: 0, role: { name: where.id === 'admin-test' ? 'admin' : 'editor' } });
  (prisma.permission as any).findMany = async () => [{ id: 'permission-test' }];
  let roleWrite: any;
  (prisma.role as any).create = async ({ data }: any) => { roleWrite = data; return { id: 'role-test', ...data }; };
  const server = app.listen(0, '127.0.0.1'); await once(server, 'listening');
  const address = server.address() as { port: number };
  const base = `http://127.0.0.1:${address.port}/api/v1`;
  const admin = issueAccess({ id: 'admin-test', email: 'test@example.com', role: 'admin', tokenVersion: 0 });
  const editor = issueAccess({ id: 'editor-test', email: 'test@example.com', role: 'editor', tokenVersion: 0 });
  const headers = { Authorization: `Bearer ${admin}` };
  try {
    assert.equal((await fetch(`${base}/admin/submissions/export`)).status, 401);
    assert.equal((await fetch(`${base}/admin/submissions/export`, { headers: { Authorization: `Bearer ${editor}` } })).status, 403);
    const csvResponse = await fetch(`${base}/admin/submissions/export?formType=contact&status=new`, { headers });
    assert.equal(csvResponse.status, 200); assert.ok(csvResponse.headers.get('content-type')?.includes('text/csv'));
    assert.ok(csvResponse.headers.get('content-disposition')?.includes('.csv'));
    const csv = await csvResponse.text(); assert.equal(csv.split('\r\n').length, 1028);
    assert.ok(csv.includes('test1025@example.com')); assert.ok(csv.includes("'=HYPERLINK"));
    assert.equal(calls.length, 3); assert.equal(calls[2].where.formType, 'contact');
    const list = await fetch(`${base}/admin/submissions?paginate=1&page=2&limit=25`, { headers }).then(r => r.json());
    assert.equal(list.total, 1026); assert.equal(list.rows.length, 25); assert.equal(list.rows[0].id, 'submission-25');
    assert.equal((await fetch(`${base}/admin/submissions/export?status=bogus`, { headers })).status, 400);
    const submit = (body: any) => fetch(`${base}/forms/newsletter`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    assert.equal((await submit({ email: 'hello@example.com' })).status, 422);
    assert.equal((await submit({ email: 'hello@example.com', consent: 'true' })).status, 201);
    const role = await fetch(`${base}/admin/roles`, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'reviewer', permissions: ['posts.read'] }) });
    assert.equal(role.status, 201); assert.deepEqual(roleWrite.permissions, { create: [{ permissionId: 'permission-test' }] });
  } finally { server.closeAllConnections(); await new Promise<void>(resolve => server.close(() => resolve())); await prisma.$disconnect(); }
});
