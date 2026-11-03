'use client';

import { useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';

const serviceOptions = [
  'Custom Turbine Design',
  'Loads & Structural Analysis',
  'Wind Resource & Site Assessment',
  "Project Development & Owner's Engineering",
  'Type Certification Support',
  'Certification Body Support',
  'R&D Center Outreach',
  'Other / Not sure yet',
];

// Map the ?service=<slug> query (used by service/project CTAs) to a select label.
const slugToLabel: Record<string, string> = {
  'custom-turbine-design': 'Custom Turbine Design',
  'loads-structural-analysis': 'Loads & Structural Analysis',
  'wind-resource-site-assessment': 'Wind Resource & Site Assessment',
  'owners-engineering': "Project Development & Owner's Engineering",
  'type-certification-support': 'Type Certification Support',
  'certification-body-support': 'Certification Body Support',
  'rd-center-outreach': 'R&D Center Outreach',
};

const inputClass =
  'w-full bg-surface border border-border rounded-md px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselected = slugToLabel[searchParams.get('service') ?? ''] ?? '';
  const [status, setStatus] = useState<Status>('idle');

  // POST to the server route, which forwards the lead to the CRM.
  //
  // TEMPORARY: the server route is between backends (Kit removed, HubSpot form
  // id not yet configured) and currently answers 503. Meanwhile the HubSpot
  // tracking script in the root layout captures this submit event directly, so
  // enquiries do reach HubSpot as collected-form submissions. Until the route
  // is wired up, a route failure is logged but still shown as success, rather
  // than telling the visitor their enquiry failed when it actually arrived.
  // Remove this fallback once /api/contact is live again.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    const formEl = e.currentTarget;
    const payload = Object.fromEntries(new FormData(formEl).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) console.warn(`[contact] route returned ${res.status}`);
    } catch (err) {
      console.warn('[contact] route unreachable:', err);
    }

    formEl.reset();
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className="border border-border rounded-lg p-8 bg-surface-2">
        <h2 className="text-text font-semibold text-xl mb-2">Thank you — your enquiry is on its way.</h2>
        <p className="text-text-muted text-sm leading-relaxed">
          We&apos;ve received your details and aim to respond within 1 business day. If it&apos;s urgent,
          you can also reach us directly at{' '}
          <a href="mailto:info@aldott.in" className="text-accent underline">
            info@aldott.in
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Row 1: Full Name + Company Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-text mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input id="full_name" type="text" name="full_name" required placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-text mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input id="company_name" type="text" name="company_name" required placeholder="Your organisation" className={inputClass} />
        </div>
      </div>

      {/* Row 2: Job Title + Work Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="job_title" className="block text-sm font-medium text-text mb-1">
            Job Title
          </label>
          <input id="job_title" type="text" name="job_title" placeholder="Your role (optional)" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input id="email" type="email" name="email" required placeholder="Work email address" className={inputClass} />
        </div>
      </div>

      {/* Row 3: Phone + Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
            Phone Number
          </label>
          <input id="phone" type="tel" name="phone" placeholder="Phone number (optional)" className={inputClass} />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-text mb-1">
            Country / Region <span className="text-red-500">*</span>
          </label>
          <select id="country" name="country" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select country
            </option>
            <option>Germany</option>
            <option>United Kingdom</option>
            <option>Netherlands</option>
            <option>Denmark</option>
            <option>India</option>
            <option>United States</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Row 4: Service of Interest */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-text mb-1">
          Service of Interest <span className="text-red-500">*</span>
        </label>
        <select id="service" name="service" required defaultValue={preselected} className={inputClass}>
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Row 5: Project Description */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
          Project Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Briefly describe your project or requirement"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Row 6: How did you hear about us */}
      <div>
        <label htmlFor="source" className="block text-sm font-medium text-text mb-1">
          How did you hear about us?
        </label>
        <select id="source" name="source" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select an option
          </option>
          <option>Search engine</option>
          <option>LinkedIn</option>
          <option>Referral / Word of mouth</option>
          <option>Industry event or conference</option>
          <option>DNV / UL / Certification body referral</option>
          <option>Other</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-accent text-page font-semibold text-[15px] py-3 rounded-md hover:bg-accent-dark transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
      </button>

      {status === 'error' && (
        <p role="alert" className="text-red-500 text-sm text-center leading-relaxed">
          Something went wrong sending your enquiry. Please try again, or email us at{' '}
          <a href="mailto:info@aldott.in" className="underline">
            info@aldott.in
          </a>
          .
        </p>
      )}

      <p className="text-text-muted text-xs text-center leading-relaxed">
        We aim to respond within 1 business day. Your data is handled in line with our{' '}
        <a href="/privacy-policy" className="underline hover:text-accent transition-colors">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
