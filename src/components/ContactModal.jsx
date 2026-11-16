import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, ArrowRight, Loader2 } from 'lucide-react';
import { offerings } from '../data/content.js';

const Ctx = createContext({ open: () => {} });
export const useContact = () => useContext(Ctx);

const INTERESTS = [...offerings.map((o) => o.title), 'Not sure yet'];
const DEMO = import.meta.env.VITE_STATIC_DEMO === '1';

export function ContactProvider({ children }) {
  const [state, setState] = useState({ open: false, interest: '' });
  const open = useCallback((interest = '') => setState({ open: true, interest }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>{state.open && <ContactModal interest={state.interest} onClose={close} />}</AnimatePresence>
    </Ctx.Provider>
  );
}

function ContactModal({ interest, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', interest: interest || '', message: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');
  const first = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    setTimeout(() => first.current?.focus(), 250);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending'); setErrors({}); setMsg('');
    if (DEMO) {
      // Static review build: validate locally, nothing is sent anywhere
      const errs = {};
      if (form.name.trim().length < 2) errs.name = 'Please tell us your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errs.email = 'Please use a valid work email.';
      if (form.company.trim().length < 2) errs.company = 'Please add your company.';
      if (!form.interest) errs.interest = 'Please choose an area of interest.';
      await new Promise((r) => setTimeout(r, 700));
      if (Object.keys(errs).length) { setErrors(errs); setMsg('Please check the highlighted fields.'); setStatus('error'); return; }
      setStatus('done');
      return;
    }
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setStatus('done'); return; }
      setErrors(data.errors || {});
      setMsg(data.error || (data.errors ? 'Please check the highlighted fields.' : 'Something went wrong. Please try again.'));
      setStatus('error');
    } catch {
      setMsg('We could not reach the server. Please try again shortly.');
      setStatus('error');
    }
  };

  return (
    <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className="modal__side">
          <span className="eyebrow eyebrow--light">Talk to our team</span>
          <h3>Ready to talk about your platform?</h3>
          <p>Tell us what you are testing, upgrading or putting AI into. A quality engineering lead who knows insurance will get back to you.</p>
          <ul>
            <li><Check size={16} /> Guidewire, Duck Creek &amp; more</li>
            <li><Check size={16} /> Rating, forms &amp; data</li>
            <li><Check size={16} /> AI &amp; agentic systems</li>
          </ul>
        </div>

        <div className="modal__body">
          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <motion.div key="done" className="modal__done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <motion.div className="modal__check" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}>
                  <Check size={34} strokeWidth={3} />
                </motion.div>
                <h3 id="contact-title">Thanks, {form.name.split(' ')[0]}.</h3>
                <p>{DEMO ? 'Review build: the form is not connected, so nothing was sent.' : 'We have your message and will be in touch soon.'}</p>
                <button className="btn btn--ghost-dark" onClick={onClose}>Close</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 id="contact-title" className="modal__title">Contact us</h3>
                <div className="field-row">
                  <Field label="Full name" error={errors.name}><input ref={first} value={form.name} onChange={set('name')} autoComplete="name" required /></Field>
                  <Field label="Work email" error={errors.email}><input type="email" value={form.email} onChange={set('email')} autoComplete="email" required /></Field>
                </div>
                <Field label="Company" error={errors.company}><input value={form.company} onChange={set('company')} autoComplete="organization" required /></Field>
                <Field label="Area of interest" error={errors.interest}>
                  <div className="chips">
                    {INTERESTS.map((i) => (
                      <button type="button" key={i} className={`chip ${form.interest === i ? 'chip--on' : ''}`} onClick={() => setForm((f) => ({ ...f, interest: i }))} aria-pressed={form.interest === i}>
                        {i}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="What are you working on? (optional)"><textarea rows={3} value={form.message} onChange={set('message')} /></Field>
                <input className="hp" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />
                {msg && <p className="form-msg" role="alert">{msg}</p>}
                <button className="btn btn--primary btn--block" disabled={status === 'sending'}>
                  {status === 'sending' ? <><Loader2 size={18} className="spin" /> Sending</> : <>Send message <ArrowRight size={18} /></>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className={`field ${error ? 'field--err' : ''}`}>
      <span>{label}</span>
      {children}
      {error && <em>{error}</em>}
    </label>
  );
}
