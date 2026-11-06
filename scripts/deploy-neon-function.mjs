import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { setTimeout as delay } from 'node:timers/promises';

const require = createRequire(import.meta.url);
const { parse } = require('../apps/api/node_modules/dotenv');
const { readFileSync } = require('node:fs');

const projectId = 'misty-sky-58933950';
const branchId = 'br-bold-boat-b96xkntl';
const profile = 'aldott-production';
const env = parse(readFileSync('.env.neon'));
const required = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'GEMINI_API_KEY'];
const missing = required.filter((key) => !env[key]);
if (missing.length) throw new Error(`Missing required settings in .env.neon: ${missing.join(', ')}`);

const version = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(2, 14);
const slug = `api${version}`;
const functionEnv = {
  NODE_ENV: 'production',
  PUBLIC_SITE_URL: 'https://aldott.de',
  ADMIN_URL: 'https://admin.aldott.de',
  NEON_MEDIA_BUCKET: 'aldott-media',
  GEMINI_MODEL: env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
  JWT_ACCESS_SECRET: env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: env.JWT_REFRESH_SECRET,
  GEMINI_API_KEY: env.GEMINI_API_KEY,
  ...(env.PASSWORD_RESET_WEBHOOK_URL ? { PASSWORD_RESET_WEBHOOK_URL: env.PASSWORD_RESET_WEBHOOK_URL } : {}),
  ...(env.PASSWORD_RESET_WEBHOOK_TOKEN ? { PASSWORD_RESET_WEBHOOK_TOKEN: env.PASSWORD_RESET_WEBHOOK_TOKEN } : {}),
};

function runNeon(args) {
  const result = spawnSync('./node_modules/.bin/neon', [
    ...args,
    '--project-id', projectId,
    '--branch', branchId,
    '--profile', profile,
  ], { stdio: 'inherit', encoding: 'utf8' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

runNeon(['config', 'apply', '--config', 'neon.ts', '--update-existing', '--no-env-pull']);

runNeon([
  'functions', 'deploy', slug,
  '--src', 'apps/api/src/neon-function.ts',
  '--runtime', 'nodejs24',
  '--wait',
  ...Object.entries(functionEnv).flatMap(([key, value]) => ['--env', `${key}=${value}`]),
]);

const invocationUrl = `https://${branchId}-${slug}.compute.c-7.eu-central-1.aws.neon.tech/`;
let healthy = false;
let consecutiveHealthy = 0;
for (let attempt = 0; attempt < 10; attempt += 1) {
  try {
    const response = await fetch(new URL('/health', invocationUrl), { signal: AbortSignal.timeout(10000) });
    if (response.ok && (await response.json()).status === 'ok') {
      consecutiveHealthy += 1;
      if (consecutiveHealthy === 3) {
        healthy = true;
        break;
      }
    } else {
      consecutiveHealthy = 0;
    }
  } catch {
    consecutiveHealthy = 0;
  }
  await delay(1000);
}
if (!healthy) throw new Error(`New Neon Function ${slug} did not pass /health; custom domain was not changed.`);

console.log(`Verified ${slug} at ${invocationUrl}. The api.aldott.de mapping was left unchanged.`);
