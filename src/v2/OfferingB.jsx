import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import EstateMap from './EstateMap.jsx';
import ContactB from './ContactB.jsx';
import { Figure, JourneysPlan, CoePlan, LoopPlan } from './parts.jsx';
import useSeo from '../components/useSeo.js';
import { BASE, offerings, faqs } from '../data/content.js';
import { photos, buildings, districtOf, offeringPhoto } from './data.js';

const V2 = `/v2${BASE}`;
const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const fmt = (p) => (p.display ? p.display : p.range ? `${p.range[0]}–${p.range[1]}${p.suffix}` : `${p.prefix || ''}${p.to}${p.suffix || ''}`);
const BAND = { platform: 'blue', coe: 'green', ai: 'yellow' };

const PLAN = {
  platform: { title: 'Customers do not care which system handles which step.', body: 'So we test the whole journey, from quote to renewal and from the first report of a claim to settlement, including the connections and data in between.', C: JourneysPlan },
  coe: { title: 'One structure for every line of business.', body: 'Standards stop ten teams from testing ten different ways. The Assurance CoE puts one accountable team on top and a shared rulebook beneath it.', C: CoePlan },
  ai: { title: 'AI agents do the work. A person approves it.', body: 'We use AI in our own testing. AI agents plan, write, run and repair tests, and people approve what the AI produces.', C: LoopPlan },
};

export default function OfferingB() {
  const { slug } = useParams();
  const o = offerings.find((x) => x.slug === slug);
  if (!o) return <Navigate to={`${V2}/`} replace />;
  return <Page key={o.slug} o={o} />;
}

function Page({ o }) {
  const d = districtOf[o.slug];
  const [active, setActive] = useState(null);
  const b = buildings.find((x) => x.id === active);
  const photo = photos[offeringPhoto[o.slug]];
  const plan = PLAN[d];
  const others = offerings.filter((x) => x.slug !== o.slug);
  useSeo({ title: o.seoTitle, description: `${o.summary} ${o.card}`, faqs, path: `${V2}/${o.slug}` });

  return (
    <>
      {/* A · Title + summary */}
      <section className={`vb-title vb-title--${BAND[d]}`} aria-labelledby="vb-h1">
        <div className="vb-wrap vb-title__grid">
          <div className="vb-title__copy">
            <nav className="vb-crumbs" aria-label="Breadcrumb">
              <a href="#" onClick={(e) => e.preventDefault()}>Capabilities</a>
              <ChevronRight size={13} aria-hidden="true" />
              <Link to={`${V2}/`}>Software &amp; AI Assurance</Link>
              <ChevronRight size={13} aria-hidden="true" />
              <span aria-current="page">{o.shortTitle || o.title}</span>
            </nav>
            <h1 id="vb-h1">{o.title}</h1>
            <p className="vb-title__line">{o.summary}</p>
            <div className="vb-actions">
              <a href="#contact" className="vb-btn vb-btn--primary">Talk to our team <ArrowRight size={18} aria-hidden="true" /></a>
              <a href="#services" className="vb-link">See what is included</a>
            </div>
          </div>
          <div className="vb-title__map">
            <div className="vb-plate vb-plate--mini"><div className="vb-plate__map"><EstateMap focus={d} active={active} onActive={setActive} /></div></div>
            <p className="vb-title__mapnote" aria-live="polite">
              {b ? <><strong>{b.label.join(' ')}.</strong> {b.note}</> : `The ${o.shortTitle || o.title} district of a typical insurance estate. Point at a building to see what we check.`}
            </p>
          </div>
        </div>
      </section>

      {/* B · Intro */}
      <section className="vb-sec" aria-labelledby="vb-intro">
        <div className="vb-wrap vb-why vb-why--flip">
          <div className="vb-why__copy">
            <h2 id="vb-intro">{o.card}</h2>
            {o.intro.map((p, i) => <p key={i} className={i === 0 ? 'vb-lead' : ''}>{p}</p>)}
          </div>
          <Figure photo={photo} className="vb-why__fig" />
        </div>
      </section>

      {/* C + D · Services with full supporting text */}
      <section className="vb-sec vb-sec--rule" id="services" aria-labelledby="vb-services">
        <div className="vb-wrap">
          <h2 id="vb-services">What is included</h2>
          <nav className="vb-toc" aria-label="Services on this page">
            {o.subs.map((s) => <a key={s.title} href={`#${slugify(s.title)}`}>{s.title}</a>)}
          </nav>
          <ol className="vb-services">
            {o.subs.map((s) => (
              <li key={s.title} id={slugify(s.title)}>
                <h3>{s.title}</h3>
                <div>
                  <p className="vb-services__card">{s.card}</p>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Signature plan for this offering */}
      <section className="vb-sec vb-sec--tint" aria-labelledby="vb-plan">
        <div className="vb-wrap">
          <div className="vb-split-head">
            <h2 id="vb-plan">{plan.title}</h2>
            <p className="vb-lead">{plan.body}</p>
          </div>
          <plan.C />
        </div>
      </section>

      {/* E · Proof + F · tools */}
      <section className="vb-sec" aria-labelledby="vb-proof">
        <div className="vb-wrap vb-proof vb-proof--split">
          <div>
            <h2 id="vb-proof">What clients have measured.</h2>
            <table className="vb-table vb-table--proof">
              <thead><tr><th scope="col" className="num">Result</th><th scope="col">Measure</th></tr></thead>
              <tbody>
                {o.proof.map((p) => (
                  <tr key={p.label}><td className="num vb-table__big">{fmt(p)}</td><td>{p.label}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2>Tools and partners</h2>
            <ul className="vb-tools">{o.tools.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* G · FAQs */}
      <section className="vb-sec vb-sec--rule" aria-labelledby="vb-faq">
        <div className="vb-wrap vb-faq">
          <h2 id="vb-faq">Questions, answered plainly.</h2>
          <div className="vb-faq__list">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <ContactB interest={o.title} />

      {/* H · Related */}
      <section className="vb-sec" aria-labelledby="vb-more">
        <div className="vb-wrap">
          <h2 id="vb-more">The other two offerings</h2>
          <ul className="vb-others">
            {others.map((x) => (
              <li key={x.slug}>
                <Link to={`${V2}/${x.slug}`} className={`vb-others__link vb-others__link--${BAND[districtOf[x.slug]]}`}>
                  <strong>{x.title}</strong>
                  <span>{x.summary}</span>
                  <ArrowRight size={22} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
