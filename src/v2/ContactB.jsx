import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { offerings } from '../data/content.js';

const INTERESTS = [...offerings.map((o) => o.title), 'Not sure yet'];
const DEMO = import.meta.env.VITE_STATIC_DEMO === '1';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter your name.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a work email, like name@company.com.';
  if (f.company.trim().length < 2) e.company = 'Enter your company.';
  if (!f.interest) e.interest = 'Choose the area you want to talk about.';
  return e;
}

// The page's closing action: an inline form, not a modal. Posts to /api/contact (demo mode on GitHub Pages).
export default function ContactB({ interest = '' }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', interest, message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) { setMsg('Check the highlighted fields and send again.'); setStatus('error'); return; }
    setStatus('sending'); setMsg('');
    if (DEMO) { await new Promise((r) => setTimeout(r, 600)); setStatus('done'); return; }
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setStatus('done'); return; }
      setErrors(data.errors || {});
      setMsg(data.error || 'Check the highlighted fields and send again.');
      setStatus('error');
    } catch {
      setMsg('We could not reach the server. Your message is still here; try sending again in a moment.');
      setStatus('error');
    }
  };

  return (
    <section className="vb-contact" id="contact" aria-labelledby="vb-contact-title">
      <div className="vb-wrap vb-contact__grid">
        <div className="vb-contact__copy">
          <h2 id="vb-contact-title">Ready to talk about your platform?</h2>
          <p>Tell us what you are testing, upgrading or putting AI into. A quality engineering lead who knows insurance will reply.</p>
        </div>

        {status === 'done' ? (
          <div className="vb-contact__done" role="status">
            <span className="vb-contact__tick"><Check size={22} strokeWidth={3} /></span>
            <h3>Thanks, {form.name.trim().split(' ')[0]}.</h3>
            <p>{DEMO ? 'This is a review build, so the form is not connected and nothing was sent.' : 'Your message is with our team. We will be in touch soon.'}</p>
          </div>
        ) : (
          <form className="vb-form" onSubmit={submit} noValidate>
            <div className="vb-form__row">
              <Field id="vb-name" label="Full name" error={errors.name}>
                <input id="vb-name" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
              </Field>
              <Field id="vb-email" label="Work email" error={errors.email}>
                <input id="vb-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} />
              </Field>
            </div>
            <div className="vb-form__row">
              <Field id="vb-company" label="Company" error={errors.company}>
                <input id="vb-company" value={form.company} onChange={set('company')} autoComplete="organization" aria-invalid={!!errors.company} />
              </Field>
              <Field id="vb-interest" label="Area of interest" error={errors.interest}>
                <select id="vb-interest" value={form.interest} onChange={set('interest')} aria-invalid={!!errors.interest}>
                  <option value="">Choose one</option>
                  {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </Field>
            </div>
            <Field id="vb-message" label="What are you working on? (optional)">
              <textarea id="vb-message" rows={3} value={form.message} onChange={set('message')} />
            </Field>
            <input className="vb-hp" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />
            {msg && <p className="vb-form__msg" role="alert">{msg}</p>}
            <button className="vb-btn vb-btn--signal" disabled={status === 'sending'}>
              {status === 'sending' ? <><Loader2 size={18} className="vb-spin" /> Sending</> : <>Send message <ArrowRight size={18} /></>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div className={`vb-field ${error ? 'is-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="vb-field__err">{error}</span>}
    </div>
  );
}
