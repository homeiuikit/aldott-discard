import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

// Node 20 has fetch but does not provide a global WebSocket implementation.
// The Neon driver adapter uses WebSockets for pooled PostgreSQL connections.
if (typeof globalThis.WebSocket === 'undefined') {
  const { neonConfig } = require('@neondatabase/serverless') as typeof import('@neondatabase/serverless');
  neonConfig.webSocketConstructor = require('ws') as typeof import('ws');
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required to start the aldott.de API');
}

const adapter = new PrismaNeon({ connectionString });
export const prisma = new PrismaClient({ adapter });
