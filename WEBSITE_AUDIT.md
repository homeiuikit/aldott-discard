# aldott.de website review — 10 November 2026

## Source comparison

The supplied `/home/yasheel/AND/Aldott/aldott.de.zip` contains 137 files. All 137 are byte-for-byte identical to the current checkout's committed baseline (`545bf1f`). No tracked files are missing from the ZIP, and there are no extra source files. The archive therefore contains no additional developer changes relative to that baseline. The improvements below are new local changes on top of it.

## Implemented

- Replaced the generic raw-JSON contact view with a dedicated inbox shared by Contacts, Demo requests, Newsletter and Forms inbox. Separate contact fields, full submission details, column selection, record counts, refresh, status filtering, search and 25-record pagination.
- Added authenticated CSV export at `GET /api/v1/admin/submissions/export`. Exports every matching record, independently of the visible page and selected columns, in 500-record batches. Includes standard fields, status, dates and additional/custom answers. Supports the same search, form type and status filters as the inbox. Records exports in the audit log. Handles Unicode, multiline messages, quoted text and spreadsheet formula escaping.
- Added optional paginated submission responses with `?paginate=1&page=1&limit=25`, preserving the existing array response for existing clients.
- Added a footer newsletter signup form across the public site. Requires an email address and explicit consent. Stores the request, server timestamp, source and consent wording version in the existing submissions table. The UI accurately describes this as a signup request, without claiming an email was sent.
- Added server validation of public form types, contact fields, email and newsletter consent, plus a dedicated public-form rate limit.
- Fixed admin role-permission writes to use the actual RolePermission join table, and user editing to use the role name rather than an object.
- Made the initial contact-form configuration creatable, kept admin sign-out available on small screens, corrected toolbar sizing, constrained horizontal table scrolling, and marked admin pages noindex.
- Fixed canonical and Open Graph URLs for inner pages. The live crawl identified 19 pages with homepage canonical URLs.
- Kept built-in public routes in the sitemap when CMS collections are empty or partial.
- Fixed fallback Insights links to request a briefing when no published article exists, and prefilled the contact message for the requested topic.
- Kept contact-form success/error email links aligned with the configured contact email.
- Fixed service/project hero and card images using API-relative `/uploads/` paths or remote image URLs.

## Verification

- Public Next.js production build, admin Next.js production build and API TypeScript build, all successful.
- Read-only requests against the local production build confirmed corrected canonical URLs and newsletter markup on Contact, Privacy, Terms, a service and a project; checked the empty-CMS sitemap and fallback briefing links.
- `npm --prefix apps/api test`: six regression tests, including authenticated HTTP integration with an isolated mocked database. Checks unauthorized access (401), non-admin access (403), complete 1,026-record export, pagination, filter validation, newsletter consent, role relation writes, multiline/Unicode CSV and formula escaping.
- Local browser checks using fictional records: contact search, readable details, status change, CSV download and newsletter signup appearing in the admin inbox. Responsive preview exposed and led to a fix for whole-page horizontal overflow.
- Read-only live crawl: 32 public URLs (main pages, published service/project/article pages, robots and sitemap) all returned HTTP 200. Public health/pages/posts/categories/tags/settings endpoints returned 200. Unauthenticated admin me/submissions/users endpoints returned 401.
- No test enquiries, subscriptions or account changes were submitted to the production API. No production database migration or write was performed.

## Remaining findings and decisions

| Finding | Evidence / next step |
| --- | --- |
| Newsletter delivery is not connected | The API stores submissions; there is no mailing-provider integration, campaign sending, confirmation-mail or automated unsubscribe flow. Select/connect a mailing service before sending campaigns. Do not treat inbox `new/read/archived` as subscription confirmation. |
| Privacy Policy supplied; Terms still a placeholder | At the owner's request, the local Privacy Policy now contains sections 1–9 from the supplied 6 November 2026 draft. The unfilled DPO editorial placeholder was omitted. The Terms page is unchanged. The live pages still need deployment. The privacy draft predates the new newsletter feature; its newsletter coverage and provider details remain to be confirmed. |
| Redirects module is not connected to public routing | Redirect CRUD exists, but no public resolver or frontend middleware consumes these records. The `/sectors` redirect is separately hard-coded. |
| Permissions and API keys have incomplete consumers | Admin routes enforce the `admin` role. Permission records do not provide fine-grained editor access, and stored API keys are not accepted by an API authentication middleware. Saving role permissions now works, but does not add an authorization model. |
| Contact Form Builder is still a JSON settings editor | Configuration exists and can now be initialized, but it is not a visual drag-and-drop builder. |
| Some homepage/footer content remains static | Curated homepage services/projects and footer service links use source data; changing CMS records does not update every featured card or link. |
| Third-party tracking has no site-level consent UI | Root layout loads HubSpot tracking unconditionally. Review the intended tracking behavior and public notices before changing its activation policy. |
| Password reset delivery depends on configuration | A webhook is supported; actual mail delivery has not been verified. |

## Deployment and scope limits

The delivered changes are local source changes, not a live deployment. GitHub repository metadata is accessible, but nothing was pushed or merged. The existing deployment uses a Neon API and separate Netlify public/admin sites; it is not a Sites-hosted application.

Deploy the API before the admin/public apps: the new inbox requires the paginated response and CSV endpoint, and the newsletter requires the updated consent validation. No Prisma schema change or database migration is needed. Run the usual build checks and verify the deployed CSV download and newsletter request after all three deployments finish.

Authenticated production login, CRUD, password-reset delivery, real database CSV queries and provider sending were not exercised. The local HTTP tests use mocked data, not a staging database. This is a source review and a functional smoke test, not a complete security or legal audit.
