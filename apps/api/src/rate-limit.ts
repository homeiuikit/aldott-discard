import type { Request } from 'express';

// Neon adapters can provide a socket address without Express's proxy-derived
// req.ip. Key directly from that address to avoid the rate limiter treating
// the empty proxy value as a fatal IP validation error.
export function clientRateLimitKey(req: Request): string {
  const address = req.socket?.remoteAddress?.replace(/^::ffff:/i, '').trim() || '';
  if (!address) return 'unknown';
  if (!address.includes(':')) return `v4:${address}`;

  // Group IPv6 clients by the prefix before their first compressed segment.
  // This keeps privacy extensions in one bucket without importing net APIs.
  const prefix = address.toLowerCase().split('::')[0]?.split(':').slice(0, 4).join(':');
  return `v6:${prefix || '0'}`;
}
