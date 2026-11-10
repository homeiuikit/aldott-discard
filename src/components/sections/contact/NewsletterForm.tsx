'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { submitPublicForm } from '@/lib/api';

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      await submitPublicForm('newsletter', { email: String(data.get('email') || ''), consent: data.get('consent') === 'on' ? 'true' : 'false' });
      form.reset(); setStatus('success');
    } catch { setStatus('error'); }
  }
  return <section aria-labelledby="newsletter-heading" className="border-t border-white/15 mt-12 pt-10 grid md:grid-cols-2 gap-6 md:gap-12">
    <div><h2 id="newsletter-heading" className="text-white text-xl font-semibold">Wind engineering insights, in your inbox</h2><p className="text-white/70 text-sm mt-3 max-w-md">Sign up for updates from Aldott on wind energy engineering, project news and new articles.</p></div>
    {status === 'success' ? <p role="status" className="text-white text-sm self-center">Thank you. Your newsletter signup request has been received.</p> : <form onSubmit={subscribe} className="space-y-3">
      <label htmlFor="newsletter-email" className="block text-white text-sm font-medium">Email address</label>
      <div className="flex flex-col sm:flex-row gap-3"><input id="newsletter-email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@company.com" disabled={status === 'sending'} className="min-w-0 flex-1 rounded-md px-4 py-3 bg-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-accent"/><button type="submit" disabled={status === 'sending'} className="rounded-md bg-accent hover:bg-accent-dark text-page px-5 py-3 text-sm font-semibold disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{status === 'sending' ? 'Subscribing…' : 'Subscribe'}</button></div>
      <label className="flex items-start gap-3 text-xs text-white/70 leading-relaxed"><input name="consent" type="checkbox" required disabled={status === 'sending'} className="mt-0.5 shrink-0"/><span>I agree to receive email updates from Aldott. I can unsubscribe at any time. See our <Link href="/privacy-policy" className="underline text-white">Privacy Policy</Link>.</span></label>
      {status === 'error' && <p role="alert" className="text-sm text-red-200">We couldn&apos;t save your signup. Please try again.</p>}
    </form>}
  </section>;
}
