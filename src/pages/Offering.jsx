import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronRight, Check } from 'lucide-react';
import HeroCanvas from '../components/HeroCanvas.jsx';
import OfferingArt from '../components/OfferingArt.jsx';
import Feature from '../components/Feature.jsx';
import { Reveal, Stat, Spotlight, SectionHead, SplitWords } from '../components/ui.jsx';
import { Partners, Insights, FAQ, CtaBand } from '../components/Sections.jsx';
import { useContact } from '../components/ContactModal.jsx';
import useSeo from '../components/useSeo.js';
import { BASE, offerings, faqs } from '../data/content.js';

export default function Offering() {
  const { slug } = useParams();
  const o = offerings.find((x) => x.slug === slug);
  if (!o) return <Navigate to={`${BASE}/`} replace />;
  return <OfferingPage key={o.slug} o={o} />;
}

function OfferingPage({ o }) {
  const { open } = useContact();
  const [active, setActive] = useState(0);
  const detailRef = useRef(null);
  useSeo({ title: o.seoTitle, description: `${o.summary} ${o.card}`, faqs, path: `${BASE}/${o.slug}` });

  const pick = (i) => {
    setActive(i);
    detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const others = offerings.filter((x) => x.slug !== o.slug);
  const cols = o.subs.length === 8 ? 4 : 3;

  return (
    <>
      {/* A · Title + one-line summary */}
      <section className="hero hero--sub" style={{ '--accent': o.accent }}>
        <HeroCanvas />
        <div className="hero__vignette" aria-hidden="true" />
        <div className="container hero__inner hero__inner--sub">
          <div className="hero__copy">
            <nav className="crumbs crumbs--light" aria-label="Breadcrumb">
              <a href="#" onClick={(e) => e.preventDefault()}>Home</a><ChevronRight size={12} />
              <a href="#" onClick={(e) => e.preventDefault()}>Capabilities</a><ChevronRight size={12} />
              <Link to={`${BASE}/`}>Software &amp; AI Assurance</Link><ChevronRight size={12} />
              <span aria-current="page">{o.shortTitle || o.title}</span>
            </nav>
            <span className="chip-eyebrow"><i className="diamond" /> Offering {o.num}</span>
            <h1 className="hero__title hero__title--sub" aria-label={o.title}><SplitWords text={o.title} delay={0.2} stagger={0.05} /></h1>
            <motion.p className="hero__line" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>{o.summary}</motion.p>
            <motion.div className="hero__ctas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <button className="btn btn--primary btn--lg" onClick={() => open(o.title)}>Talk to our team <ArrowRight size={18} /></button>
              <a href="#services" className="btn btn--glass btn--lg">See services</a>
            </motion.div>
          </div>
          <motion.div className="sub-banner" initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <OfferingArt kind={o.art} />
            <div className="sub-banner__stats">
              {o.proof.slice(0, 2).map((p) => (
                <div key={p.label}><Stat s={p} className="sub-banner__num" /><span>{p.label}</span></div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* B · Intro */}
      <section className="section">
        <div className="container intro">
          <div>
            <Reveal as="span" className="eyebrow">What it is &amp; who it is for</Reveal>
            <Reveal as="h2" delay={0.05} className="intro__title">{o.card}</Reveal>
          </div>
          <div className="intro__copy">
            {o.intro.map((p, i) => <Reveal as="p" key={i} delay={0.1 + i * 0.08} className={i === 0 ? 'lead' : ''}>{p}</Reveal>)}
          </div>
        </div>
      </section>

      {/* C · Sub-offerings */}
      <section className="section section--soft" id="services">
        <div className="container">
          <SectionHead eyebrow="Services" title={`${o.subs.length} ways we assure ${o.art === 'ai' ? 'your AI' : o.art === 'coe' ? 'quality at scale' : 'your platforms'}`} />
          <div className={`subs subs--${cols}`}>
            {o.subs.map((s, i) => (
              <Reveal key={s.title} delay={(i % cols) * 0.06}>
                <Spotlight
                  className="sub"
                  style={{ '--accent': o.accent }}
                  role="button"
                  tabIndex={0}
                  onClick={() => pick(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i); } }}
                >
                  <span className="sub__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.card}</p>
                  <span className="sub__more">Read more <ArrowRight size={14} /></span>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* D · Supporting text per sub-offering */}
      <section className="section" ref={detailRef} style={{ scrollMarginTop: 80 }}>
        <div className="container">
          <SectionHead eyebrow="In detail" title="How each service works" />
          <div className="detail">
            <div className="detail__list" role="tablist" aria-orientation="vertical">
              {o.subs.map((s, i) => (
                <button key={s.title} role="tab" aria-selected={active === i} className={`detail__tab ${active === i ? 'is-on' : ''}`} onClick={() => setActive(i)}>
                  {active === i && <motion.span layoutId={`dt-${o.slug}`} className="detail__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="detail__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="detail__t">{s.title}</span>
                </button>
              ))}
            </div>
            <div className="detail__panel" role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="detail__big">{String(active + 1).padStart(2, '0')}</span>
                  <h3>{o.subs[active].title}</h3>
                  <p className="lead">{o.subs[active].body}</p>
                  <div className="detail__card-line"><Check size={16} /> {o.subs[active].card}</div>
                  <div className="detail__nav">
                    <button className="btn btn--ghost-dark btn--sm" disabled={active === 0} onClick={() => setActive((a) => a - 1)}>Previous</button>
                    <button className="btn btn--primary btn--sm" onClick={() => (active < o.subs.length - 1 ? setActive((a) => a + 1) : open(o.title))}>
                      {active < o.subs.length - 1 ? <>Next: {o.subs[active + 1].title} <ArrowRight size={14} /></> : <>Talk to us <ArrowRight size={14} /></>}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Signature diagram per offering */}
      <Feature kind={o.art} />

      {/* E · Proof points */}
      <section className="section section--tight">
        <div className="container">
          <div className="proof-cards">
            {o.proof.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.08} className="proof-card" style={{ '--accent': o.accent }}>
                <Stat s={p} className="proof-card__num" />
                <span>{p.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* F · Tools and partners */}
      <Partners compact items={o.tools} />

      {/* G · FAQs */}
      <FAQ />

      <CtaBand interest={o.title} />

      {/* H · Related */}
      <section className="section section--soft">
        <div className="container">
          <SectionHead eyebrow="Keep exploring" title="Other offerings" />
          <div className="others">
            {others.map((x, i) => (
              <Reveal key={x.slug} delay={i * 0.08}>
                <Spotlight as={Link} to={`${BASE}/${x.slug}`} className="other" style={{ '--accent': x.accent }}>
                  <div className="other__art"><OfferingArt kind={x.art} /></div>
                  <div>
                    <span className="offer__num">{x.num}</span>
                    <h3>{x.title}</h3>
                    <p>{x.summary}</p>
                    <span className="offer__go">Learn more <ArrowUpRight size={16} /></span>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Insights />
    </>
  );
}
