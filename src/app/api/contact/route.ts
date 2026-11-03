import { NextResponse } from 'next/server';

// Contact form backend — HubSpot Forms API lead capture.
//
// Submissions go to a HubSpot form in portal 47084751, which creates/updates
// the contact and records a form submission on it. The unauthenticated v3
// submit endpoint needs no API key; only the form id is configured. Set
// HUBSPOT_FORM_ID in .env.local (local) and in Netlify's environment
// variables (production).
//
// The visitor's `hubspotutk` cookie (set by the tracking script in the root
// layout) is forwarded so the submission links to their page-view history.

const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || '47084751';
const HUBSPOT_SUBMIT_URL = 'https://api.hsforms.com/submissions/v3/integration/submit';

type Payload = {
  full_name?: string;
  company_name?: string;
  job_title?: string;
  email?: string;
  phone?: string;
  country?: string;
  service?: string;
  message?: string;
  source?: string;
};

type Field = { objectTypeId: '0-1'; name: string; value: string };

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function field(name: string, value: string): Field {
  return { objectTypeId: '0-1', name, value };
}

export async function POST(request: Request) {
  const formId = process.env.HUBSPOT_FORM_ID;
  if (!formId) {
    // Misconfiguration — never silently swallow the lead.
    console.error('[contact] HUBSPOT_FORM_ID is not set; cannot capture lead.');
    return NextResponse.json(
      { ok: false, error: 'not_configured' },
      { status: 503 },
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const email = (body.email || '').trim();
  const fullName = (body.full_name || '').trim();
  const message = (body.message || '').trim();
  if (!email || !isEmail(email) || !fullName || !message) {
    return NextResponse.json({ ok: false, error: 'invalid_fields' }, { status: 422 });
  }

  const [firstname, ...rest] = fullName.split(/\s+/);
  const lastname = rest.join(' ');
  const service = (body.service || '').trim();
  const source = (body.source || '').trim();

  // Standard HubSpot contact properties. Service and source have no default
  // property, so they're also folded into the message (see `fallback`).
  const core: Field[] = [field('email', email), field('firstname', firstname)];
  if (lastname) core.push(field('lastname', lastname));

  const optional: Field[] = [];
  if (body.company_name?.trim()) optional.push(field('company', body.company_name.trim()));
  if (body.job_title?.trim()) optional.push(field('jobtitle', body.job_title.trim()));
  if (body.phone?.trim()) optional.push(field('phone', body.phone.trim()));
  if (body.country?.trim()) optional.push(field('country', body.country.trim()));

  const notes = [
    service && `Service of interest: ${service}`,
    source && `Heard about us via: ${source}`,
  ].filter(Boolean);
  const fullMessage = notes.length ? `${message}\n\n${notes.join('\n')}` : message;

  const cookie = request.headers.get('cookie') || '';
  const hutk = /(?:^|;\s*)hubspotutk=([^;]+)/.exec(cookie)?.[1];
  const ipAddress = request.headers.get('x-nf-client-connection-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const context = {
    ...(hutk ? { hutk } : {}),
    ...(ipAddress ? { ipAddress } : {}),
    pageUri: request.headers.get('referer') || 'https://aldott.de/contact',
    pageName: 'Contact — Aldott TechSolution',
  };

  async function submit(fields: Field[]) {
    return fetch(`${HUBSPOT_SUBMIT_URL}/${HUBSPOT_PORTAL_ID}/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields, context }),
    });
  }

  try {
    // Try with every field first; if HubSpot rejects one (e.g. it isn't on the
    // form), retry with just the core record so a lead is never lost over a
    // field mismatch.
    let res = await submit([...core, ...optional, field('message', fullMessage)]);
    if (res.status === 400) {
      console.warn('[contact] HubSpot rejected full submission:', await res.text());
      const extras = optional.map((f) => `${f.name}: ${f.value}`).join('\n');
      res = await submit([
        ...core,
        field('message', extras ? `${fullMessage}\n${extras}` : fullMessage),
      ]);
    }

    if (!res.ok) {
      console.error('[contact] HubSpot submission failed:', res.status, await res.text());
      return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] HubSpot request threw:', err);
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
  }
}
