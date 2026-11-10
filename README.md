# aldott.de

The public Next.js site and admin app run separately from the Express API. The API uses PostgreSQL through Prisma. Set local credentials in `.env`; no production credentials are included in this repository.

## Requirements

- Node.js 20 or newer
- PostgreSQL 14 or newer
- npm

## Install

```bash
npm install
npm run install:apps
cp .env.example .env
npm run api:generate
```

Edit `.env` and set `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. For Neon, use its pooled connection string for `DATABASE_URL` and the direct connection string for `DATABASE_URL_UNPOOLED`; keep both server-side. Prisma uses the pooled URL for the API and the direct URL for database migrations. The admin password must be at least 12 characters. Generate separate local signing secrets with `openssl rand -hex 32` and set them as `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`. Example local values for the non-secret URLs and port:

```dotenv
API_PORT=4000
ADMIN_URL=http://localhost:3001
PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

For Neon, create the database in the same region as the API and copy both connection strings from the Neon dashboard. For local PostgreSQL, set both variables to your local connection string.

## Database

```bash
npm run db:migrate
npm run db:seed
```

For an already-configured production database, run `npm run db:deploy` to apply committed migrations without creating a new migration.

## Production deployment

- Neon hosts PostgreSQL, the `apiverify` CMS API Function, and the private `aldott-media` Object Storage bucket. `neon.ts` declares the Function and bucket; the Function keeps the existing `api.aldott.de` mapping.
- Sign in with `neon login` if the CLI has not been authorized. The repository is linked to project `aldott-production` (project `misty-sky-58933950`, production branch `br-bold-boat-b96xkntl`).
- Set `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, and `GEMINI_API_KEY` in `.env`. Run `npm run neon:plan` to review changes and `npm run neon:deploy` to deploy from `neon.ts` with `.env`. Neon requires the `api.aldott.de` CNAME `fn-custom-domains.eu-central-1.aws.neon.tech` at the domain's DNS provider; TLS becomes available after DNS verification.
- Apply the Prisma migration to the Neon branch with `npm run db:deploy`. The database is already seeded for the current project; to seed a newly created database, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in its private environment and run `npm run db:seed` once.
- The public site remains on the existing Netlify site. `netlify.toml` points it at `https://api.aldott.de/api/v1`.
- Create a second Netlify site from this repository with base directory `admin` and custom domain `admin.aldott.de`; `admin/netlify.toml` uses the same API URL. Configure the domain's DNS with the target Netlify provides.
- Keep `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `GEMINI_API_KEY`, reset-mail credentials, and admin bootstrap credentials in the hosting environment only. Neon injects database and Object Storage credentials into the API Function. Never commit `.env`.

Neon Functions run the API beside the selected Postgres branch. Blog images are uploaded privately to Neon Object Storage and served through the API's `/uploads/:filename` route. The UI stays on Netlify; GitHub remains the source repository and deployment trigger.

The seed creates the first administrator from `ADMIN_EMAIL` and `ADMIN_PASSWORD`, default admin/editor roles and permissions, published page records matching current public routes, and the current Insights topics.

## Run locally

Run each process in its own terminal from the repository root:

```bash
npm run dev:api
npm run dev:admin
npm run dev
```

- Public site: http://localhost:3000
- Admin: http://localhost:3001
- API: http://localhost:4000/api/v1
- API health: http://localhost:4000/health
- API sitemap: http://localhost:4000/sitemap.xml

## API routes

Public routes under `/api/v1`:

- `GET /health`
- `GET /pages/:slug`
- `GET /posts`, `GET /posts/:slug`
- `GET /categories`, `GET /tags`, `GET /settings`
- `POST /forms/:formType`
- `GET /sitemap.xml`

Authentication routes:

- `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`
- `POST /auth/forgot-password`, `POST /auth/reset-password`

Authenticated admin routes:

- `GET /admin/me`, `GET /admin/dashboard`
- `GET|POST /admin/:resource`, `GET|PUT|DELETE /admin/:resource/:id`
- Resources: `pages`, `posts`, `categories`, `tags`, `media`, `settings`, `forms`/`submissions`, `redirects`, `users`, `roles`, `permissions`, `audit`, `apiKeys`
- `POST /admin/media/upload` accepts JPG, PNG, WEBP, or GIF up to 5 MB.

Login returns a short-lived access JWT for localStorage and sets a refresh token in an httpOnly cookie. Password reset tokens are random, stored only as SHA-256 hashes, and expire after one hour. In local development without a password-reset webhook configured, the reset URL is printed by the API process. Set `PASSWORD_RESET_WEBHOOK_URL` and optionally `PASSWORD_RESET_WEBHOOK_TOKEN` to deliver reset links through an internal mail service.

The public frontend requests published CMS page metadata and body blocks by route slug, fetches published Insight, Service, and Project records, and stores Contact form submissions through the API. The service and project editors use the same content fields as the existing frontend; when no API record is available, the existing content remains the fallback. The contact form can read its optional phone, company, budget, and custom-question configuration from the `contactFormConfig` setting. The public layout remains in the existing Next.js application. There is no careers or comment flow on the current public site, so those modules are not enabled.

The admin supports sign in, forgot/reset password, dashboard counts, page, Service, Project, and Insight editing (including SEO title/description and sanitized body HTML), categories, tags, image uploads, separate contact/demo/newsletter inbox views, a contact form builder setting, site settings, safe local redirects, user and role/permission management, API keys, and the audit log. External marketing dashboards, campaign sending, AI provider keys, and cloud sync from the aldott.in admin have not been connected to aldott.de; configure integrations separately when their credentials and destinations are ready.

### AI assisted article drafts

Open **Posts / Insights**, create or edit a post, enter a topic, and choose **Draft with AI**. The title, SEO title and description, summary, and article body are inserted for review. Upload the featured image in the same editor, save the post as a draft, then publish when ready. Published articles are available at `/insights/{slug}` with article metadata, structured data, and sitemap entries. AI is optional: add `GEMINI_API_KEY` to the root `.env` and restart the API. `GEMINI_MODEL` optionally selects a model supported by your Gemini API account. The key stays on the server. Manual editing and image uploads work without AI credentials.

AI text is an editable first draft; review factual and technical claims before publishing. Draft generation uses Google's [Gemini API](https://ai.google.dev/gemini-api/docs/generate-content).

## Inbox export and newsletter signup

Contacts, Demo requests, Newsletter and Forms inbox now use structured columns with search, status filters, column selection, full details and pagination. **Export CSV** downloads every record matching the current filters, including custom answers, regardless of visible page or columns. The endpoint is `GET /api/v1/admin/submissions/export` and requires the normal admin bearer token. A paginated list is available at `/api/v1/admin/submissions?paginate=1&page=1&limit=25`; clients omitting `paginate=1` retain the existing array response.

The public footer submits newsletter signup requests to `/api/v1/forms/newsletter` with `email` and `consent: "true"`. These are stored with the server timestamp and consent wording version; email sending, confirmation and unsubscribe automation still require a mailing service integration. No database migration is required. Deploy the API before the public and admin apps.

Run the isolated backend regression suite with `npm --prefix apps/api test`. See [WEBSITE_AUDIT.md](WEBSITE_AUDIT.md) for the source comparison, changes, checks and remaining integration gaps.
