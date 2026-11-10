'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Submission = { id: string; formType: string; data: Record<string, unknown>; status: string; createdAt: string; updatedAt: string };
type Props = { route: string; request: (path: string, options?: RequestInit) => Promise<Response>; onChange: () => void };
const fields = ['full_name', 'email', 'phone', 'company_name', 'service', 'message', 'source', 'country'];
const labels: Record<string, string> = { full_name: 'Name', company_name: 'Company', job_title: 'Job title', email: 'Email', phone: 'Phone', service: 'Service', message: 'Message', source: 'Source', country: 'Country', budget: 'Budget', consent: 'Newsletter consent', consent_at: 'Consent recorded', consent_version: 'Consent wording version' };
const display = (value: unknown) => value === undefined || value === null || value === '' ? '—' : typeof value === 'object' ? JSON.stringify(value) : String(value);
const date = (value: string) => new Date(value).toLocaleString();

export default function SubmissionInbox({ route, request, onChange }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Submission | null>(null);
  const [exporting, setExporting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  const [visible, setVisible] = useState(route === 'newsletter' ? ['email', 'source'] : fields);
  const formType = ({ contacts: 'contact', demos: 'demo', newsletter: 'newsletter' } as Record<string, string>)[route];
  useEffect(() => { if (selected && dialog.current && !dialog.current.open) dialog.current.showModal(); }, [selected]);
  const filters = useCallback(() => {
    const q = new URLSearchParams();
    if (formType) q.set('formType', formType);
    if (search.trim()) q.set('search', search.trim());
    if (status) q.set('status', status);
    return q;
  }, [formType, search, status]);

  useEffect(() => {
    let active = true;
    setLoading(true); setError(''); setRows([]);
    const timer = setTimeout(async () => {
      try {
        const q = filters(); q.set('paginate', '1'); q.set('page', String(page)); q.set('limit', '25');
        const response = await request(`/admin/submissions?${q}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not load submissions');
        if (active) {
          if (page > 1 && result.total <= (page - 1) * 25) { setPage(Math.max(1, Math.ceil(result.total / 25))); return; }
          setRows(result.rows.map((row: Submission) => ({ ...row, data: row.data && typeof row.data === 'object' ? row.data : {} }))); setTotal(result.total);
        }
      } catch (e) { if (active) setError(e instanceof Error ? e.message : 'Could not load submissions'); }
      finally { if (active) setLoading(false); }
    }, 250);
    return () => { active = false; clearTimeout(timer); };
  }, [filters, page, request, revision]);

  async function exportCsv() {
    setExporting(true); setError('');
    try {
      const response = await request(`/admin/submissions/export?${filters()}`);
      if (!response.ok) throw new Error((await response.json()).error || 'Export failed');
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement('a'); link.href = url;
      link.download = `aldott-${route}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) { setError(e instanceof Error ? e.message : 'Export failed'); }
    finally { setExporting(false); }
  }
  async function updateStatus(value: string) {
    if (!selected) return;
    setBusy(true); setError('');
    try {
      const response = await request(`/admin/submissions/${encodeURIComponent(selected.id)}`, { method: 'PUT', body: JSON.stringify({ status: value }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not update status');
      setSelected(result); setRevision(v => v + 1); onChange();
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not update status'); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (!selected || !window.confirm('Permanently delete this submission?')) return;
    setBusy(true); setError('');
    try {
      const response = await request(`/admin/submissions/${encodeURIComponent(selected.id)}`, { method: 'DELETE' });
      if (!response.ok) throw new Error((await response.json()).error || 'Could not delete submission');
      setSelected(null); setRevision(v => v + 1); onChange();
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not delete submission'); }
    finally { setBusy(false); }
  }
  return <section className="card inbox">
    <div className="inbox-heading"><div><h2>{route === 'newsletter' ? 'Newsletter signup requests' : route === 'demos' ? 'Demo requests' : route === 'submissions' ? 'All form submissions' : 'Contact messages'}</h2><p className="muted">{loading ? 'Loading submissions…' : `${total} matching ${total === 1 ? 'record' : 'records'}`}</p></div><div className="inline"><button className="secondary" onClick={() => setRevision(v => v + 1)} disabled={loading}>Refresh</button><button className="primary" onClick={exportCsv} disabled={exporting || loading || !!error || total === 0}>{exporting ? 'Exporting…' : 'Export CSV'}</button></div></div>
    {route === 'newsletter' && <p className="muted">Signup requests are stored here. Email delivery and confirmation require a mailing service connection.</p>}
    <div className="toolbar inbox-toolbar"><input aria-label="Search submissions" placeholder="Search name, email, company, service or message…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}/><select aria-label="Filter by status" value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}><option value="">All statuses</option>{['new', 'read', 'archived'].map(value => <option key={value}>{value}</option>)}</select><details className="column-picker"><summary className="secondary">Columns</summary><div>{fields.map(field => <label key={field}><input type="checkbox" checked={visible.includes(field)} onChange={e => setVisible(current => e.target.checked ? fields.filter(f => current.includes(f) || f === field) : current.filter(f => f !== field))}/>{labels[field]}</label>)}</div></details></div>
    {error && <p role="alert" className="error">{error}</p>}
    {loading ? <p className="empty" role="status">Loading…</p> : error ? null : rows.length === 0 ? <p className="empty">No submissions match these filters.</p> : <div className="tablewrap"><table className="submission-table"><caption className="sr-only">Form submissions</caption><thead><tr>{!formType && <th>Type</th>}{visible.map(field => <th key={field}>{labels[field]}</th>)}<th>Status</th><th>Received</th><th>Actions</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}>{!formType && <td>{row.formType}</td>}{visible.map(field => <td key={field}><div className={`submission-cell ${field === 'message' ? 'message-preview' : ''}`} title={display(row.data[field])}>{field === 'email' && row.data.email ? <a href={`mailto:${encodeURIComponent(String(row.data.email))}`}>{display(row.data.email)}</a> : display(row.data[field])}</div></td>)}<td><span className={`badge status-${row.status}`}>{row.status}</span></td><td className="muted date-cell">{date(row.createdAt)}</td><td><button className="small" onClick={() => { setSelected(row); setError(''); }}>View details</button></td></tr>)}</tbody></table></div>}
    <div className="inbox-pagination"><span className="muted">{total ? `Page ${page} of ${Math.ceil(total / 25)}` : 'No records'} · CSV includes all matching records and all fields</span><div className="inline"><button className="secondary" disabled={page === 1 || loading} onClick={() => setPage(p => p - 1)}>Previous</button><button className="secondary" disabled={page * 25 >= total || loading} onClick={() => setPage(p => p + 1)}>Next</button></div></div>
    {selected && <dialog ref={dialog} className="submission-dialog" aria-labelledby="submission-title" onCancel={e => { if (busy) e.preventDefault(); else setSelected(null); }} onClick={e => { if (e.target === e.currentTarget && !busy) setSelected(null); }}><section className="dialog"><div className="inbox-heading"><h2 id="submission-title">{selected.formType === 'newsletter' ? 'Newsletter signup request' : 'Submission details'}</h2><button autoFocus className="secondary" disabled={busy} onClick={() => setSelected(null)}>Close</button></div><p className="muted">Received {date(selected.createdAt)}</p>{error && <p className="error" role="alert">{error}</p>}<dl className="submission-details">{Object.entries(selected.data).map(([key, value]) => <div key={key}><dt>{labels[key] || key.replace(/_/g, ' ')}</dt><dd>{display(value)}</dd></div>)}</dl><div className="formbuttons"><button className="secondary danger" disabled={busy} onClick={remove}>Delete</button><label className="inline">Status<select aria-label="Submission status" disabled={busy} value={selected.status} onChange={e => updateStatus(e.target.value)}>{['new', 'read', 'archived'].map(value => <option key={value}>{value}</option>)}</select></label></div></section></dialog>}
  </section>;
}
