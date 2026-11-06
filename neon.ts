import { defineConfig } from '@neon/config/v1';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';

export default defineConfig({
  buckets: {
    'aldott-media': { access: 'private' },
  },
  functions: {
    apiverify: {
      name: 'aldott.de CMS API',
      source: 'apps/api/src/neon-function.ts',
      // Prisma's generated Node client reads its query compiler WASM from disk.
      // Include that asset explicitly and point the bundled client at its archive path.
      bundler: async () => {
        const result = await build({
          entryPoints: ['apps/api/src/neon-function.ts'],
          bundle: true,
          platform: 'node',
          format: 'esm',
          target: 'node24',
          packages: 'bundle',
          banner: {
            js: `import{createRequire as ___cr}from'module';import{fileURLToPath as ___f}from'url';import{dirname as ___d}from'path';const require=___cr(import.meta.url);const __filename=___f(import.meta.url);const __dirname=___d(__filename);`,
          },
          minify: true,
          write: false,
        });
        const wasmBase64 = (await readFile('apps/api/node_modules/.prisma/client/query_compiler_bg.wasm')).toString('base64');
        const bundle = result.outputFiles[0].text.replaceAll('__ALDOTT_PRISMA_WASM_BASE64__', wasmBase64);
        return {
          'index.mjs': new TextEncoder().encode(bundle),
        };
      },
      env: {
        NODE_ENV: 'production',
        PUBLIC_SITE_URL: 'https://aldott.de',
        ADMIN_URL: 'https://admin.aldott.de',
        NEON_MEDIA_BUCKET: 'aldott-media',
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
        GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
        ...(process.env.PASSWORD_RESET_WEBHOOK_URL
          ? { PASSWORD_RESET_WEBHOOK_URL: process.env.PASSWORD_RESET_WEBHOOK_URL }
          : {}),
        ...(process.env.PASSWORD_RESET_WEBHOOK_TOKEN
          ? { PASSWORD_RESET_WEBHOOK_TOKEN: process.env.PASSWORD_RESET_WEBHOOK_TOKEN }
          : {}),
      },
    },
  },
});
