import serverlessHttp from 'serverless-http';
import type { PathOrFileDescriptor } from 'node:fs';
import { app } from './app';
const fs = require('fs') as typeof import('node:fs');

// Neon bundles functions into one file, while Prisma loads its compiler WASM
// through fs.readFileSync. Embed that asset at deploy time (neon.ts) and serve
// it from memory when Prisma requests the generated WASM file.
const prismaCompilerWasm = '__ALDOTT_PRISMA_WASM_BASE64__';
const originalReadFileSync = fs.readFileSync.bind(fs);
fs.readFileSync = ((file: PathOrFileDescriptor, ...args: any[]) =>
  String(file).endsWith('/query_compiler_bg.wasm')
    ? Buffer.from(prismaCompilerWasm, 'base64')
    : originalReadFileSync(file, ...(args as [any]))
) as typeof fs.readFileSync;

// Neon Functions expose the Fetch API. serverless-http adapts the existing
// Express app through an API Gateway v2 event, without opening a socket.
const expressHandler = serverlessHttp(app, { binary: true });
console.info('aldott.de API handler initialized');

export default {
  async fetch(request: Request): Promise<Response> {
    console.info('aldott.de API request received');
    try {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();
    const requestBody = method === 'GET' || method === 'HEAD'
      ? undefined
      : Buffer.from(await request.arrayBuffer()).toString('base64');
    const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

    const event = {
      version: '2.0',
      routeKey: '$default',
      rawPath: url.pathname,
      rawQueryString: url.search.slice(1),
      headers: Object.fromEntries(request.headers.entries()),
      cookies: request.headers.get('cookie')?.split(/;\s*/) ?? [],
      requestContext: {
        accountId: 'neon',
        apiId: 'neon-function',
        domainName: url.host,
        domainPrefix: 'neon-function',
        http: {
          method,
          path: url.pathname,
          protocol: 'HTTP/1.1',
          sourceIp: forwardedFor || '127.0.0.1',
          userAgent: request.headers.get('user-agent') || '',
        },
        requestId: crypto.randomUUID(),
        routeKey: '$default',
        stage: '$default',
        timeEpoch: Date.now(),
      },
      ...(requestBody === undefined ? {} : { body: requestBody, isBase64Encoded: true }),
    };

    const result = await expressHandler(event, {}) as {
      statusCode?: number;
      headers?: Record<string, string | number | boolean | string[]>;
      cookies?: string[];
      body?: string;
      isBase64Encoded?: boolean;
    };
    const headers = new Headers(result.headers as HeadersInit);
    for (const cookie of (result.cookies as string[] | undefined) || []) {
      headers.append('set-cookie', cookie);
    }
    const body = result.body
      ? Buffer.from(result.body as string, result.isBase64Encoded ? 'base64' : 'utf8')
      : null;
      return new Response(body, { status: Number(result.statusCode) || 500, headers });
    } catch (error) {
      console.error('aldott.de API request failed', error);
      return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
  },
};
