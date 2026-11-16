import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, ArrowUpRight, ArrowRight } from 'lucide-react';
import { faqs as defaultFaqs, insights, partners } from '../data/content.js';
import { Reveal, SectionHead, Spotlight } from './ui.jsx';
import { useContact } from './ContactModal.jsx';

export function Partners({ compact = false, items }) {
  const groups = items ? [{ group: 'Tools and partners', items }] : partners;
  return (
    <section className={`section ${compact ? 'section--tight' : ''}`} id="partners">
      <div className="container">
        <SectionHead center eyebrow="Ecosystem" title={compact ? 'Tools and partners' : 'Our Partnerships'} sub={compact ? null : 'The insurance platforms we test and the tools we test them with.'} />
        <div className="partners">
          {groups.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.08} className="partners__group">
              {!compact && <span className="partners__label">{g.group}</span>}
              <div className="partners__row">
                {g.items.map((p) => (
                  <div key={p} className="logo-tile"><span>{p}</span></div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightArt({ kind }) {
  if (kind === 'rating') {
    return (
      <svg viewBox="0 0 300 170" className="iart" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={24 + i * 30} y={150 - (30 + ((i * 37) % 90))} width="18" height={30 + ((i * 37) % 90)} rx="4" className={i === 5 ? 'iart__hot' : 'iart__bar'} />
        ))}
        <path d="M20 120 C80 90 120 110 170 60 S260 40 285 30" className="iart__line" />
      </svg>
    );
  }
  if (kind === 'cloud') {
    return (
      <svg viewBox="0 0 300 170" className="iart" aria-hidden="true">
        <path d="M95 112 a30 30 0 0 1 8-59 a42 42 0 0 1 80-6 a32 32 0 0 1 22 65 z" className="iart__cloud" />
        {[0, 1, 2].map((i) => <rect key={i} x={110 + i * 30} y="125" width="22" height="22" rx="5" className="iart__box" style={{ animationDelay: `${i * 0.4}s` }} />)}
        <path d="M150 112 v10" className="iart__line" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 170" className="iart" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 40 + (i % 8) * 31, y = 40 + Math.floor(i / 8) * 40;
        return <circle key={i} cx={x} cy={y} r={i === 13 ? 9 : 5} className={i === 13 ? 'iart__hot-c' : 'iart__dot'} />;
      })}
      <path d="M40 80 L102 40 L164 120 L226 80 L257 80" className="iart__line" />
    </svg>
  );
}

export function Insights() {
  return (
    <section className="section section--soft" id="insights">
      <div className="container">
        <div className="shead-row">
          <SectionHead eyebrow="Insights" title="Stay ahead with P&C-focused thought leadership" />
          <Reveal><a href="#" className="link-arrow" onClick={(e) => e.preventDefault()}>All insights <ArrowRight size={16} /></a></Reveal>
        </div>
        <div className="insights">
          {insights.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.1}>
              <Spotlight as="a" href="#" className="insight" onClick={(e) => e.preventDefault()}>
                <div className={`insight__media insight__media--${it.art}`}><InsightArt kind={it.art} /></div>
                <div className="insight__body">
                  <div className="insight__meta"><span className="pill">{it.type}</span><span>{it.read}</span></div>
                  <h3>{it.title}</h3>
                  <span className="insight__more">Learn more <ArrowUpRight size={16} /></span>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ({ items = defaultFaqs, title = 'Questions, answered plainly' }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faqs">
      <div className="container faq-wrap">
        <div className="faq-side">
          <SectionHead eyebrow="FAQs" title={title} />
          <Reveal as="p" delay={0.15} className="muted">Still curious? Our quality engineering leads are happy to talk it through.</Reveal>
        </div>
        <div className="faq">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <button className="faq__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{f.q}</span>
                  <motion.span className="faq__icon" animate={{ rotate: isOpen ? 45 : 0 }}><Plus size={18} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div className="faq__a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ title = 'Ready to talk about your platform?', interest = '' }) {
  const { open } = useContact();
  return (
    <section className="cta">
      <div className="container">
        <Reveal className="cta__card">
          <div className="cta__mesh" aria-hidden="true" />
          <div className="cta__content">
            <h2>{title}</h2>
            <p>Ship insurance releases with confidence, from core platforms to the AI sitting on top.</p>
          </div>
          <button className="btn btn--white btn--lg" onClick={() => open(interest)}>Contact Us <ArrowRight size={18} /></button>
        </Reveal>
      </div>
    </section>
  );
}
