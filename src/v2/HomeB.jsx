import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import EstateMap, { SURVEY_SECONDS, SURVEY_DELAY } from './EstateMap.jsx';
import ContactB from './ContactB.jsx';
import { Figure, InspectionReport } from './parts.jsx';
import Term from '../components/Term.jsx';
import useSeo from '../components/useSeo.js';
import { BASE, seo, hero, positioning, offerings, partners, insights, faqs, headlineProof } from '../data/content.js';
import { photos, buildings, defects, ledger, districtOf, offeringPhoto } from './data.js';

const V2 = `/v2${BASE}`;
const fmt = (p) => (p.display ? p.display : p.range ? `${p.range[0]}–${p.range[1]}${p.suffix}` : `${p.prefix || ''}${p.to}${p.suffix || ''}`);
const BAND = { platform: 'blue', coe: 'green', ai: 'yellow' };

function Legend({ active }) {
  const b = buildings.find((x) => x.id === active);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setDone(true), reduce ? 0 : (SURVEY_DELAY + SURVEY_SECONDS) * 1000 + 300);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="vb-legend">
      <ul className="vb-legend__key" aria-label="Map key">
        <li><span className="vb-key vb-key--platform" aria-hidden="true" />Platform Assurance</li>
        <li><span className="vb-key vb-key--coe" aria-hidden="true" />Assurance CoE</li>
        <li><span className="vb-key vb-key--ai" aria-hidden="true" />AI &amp; Agentic Systems</li>
        <li><span className="vb-key vb-key--defect" aria-hidden="true" />Defect found</li>
        <li><span className="vb-key vb-key--ok" aria-hidden="true" />Verified</li>
      </ul>
      <p className="vb-legend__note" aria-live="polite">
        {b ? <><strong>{b.label.join(' ')}.</strong> {b.note}</> : 'Point at any building to see what we check there.'}
      </p>
      <p className="vb-legend__status">
        {done ? <><strong>{defects.length} defects</strong> caught before release</> : 'Survey in progress'}
        <span>Illustrative survey</span>
      </p>
    </div>
  );
}

export default function HomeB() {
  const [active, setActive] = useState(null);
  const mapRef = useRef(null);
  useSeo({ ...seo, faqs, path: `${V2}/` });

  // On narrow screens the plan pans sideways; open it on the main estate (Quote Street onwards).
  useEffect(() => {
    const el = mapRef.current;
    if (el && el.scrollWidth > el.clientWidth + 4) el.scrollLeft = el.scrollWidth * (530 / 1200);
  }, []);

  return (
    <>
      {/* 1–2 · Title and first viewport: the estate plan */}
      <section className="vb-first" aria-labelledby="vb-h1">
        <div className="vb-wrap">
          <div className="vb-plate">
            <div className="vb-cartouche">
              <nav className="vb-crumbs" aria-label="Breadcrumb">
                <a href="#" onClick={(e) => e.preventDefault()}>Capabilities</a>
                <ChevronRight size={13} aria-hidden="true" />
                <span aria-current="page">Software &amp; AI Assurance</span>
              </nav>
              <h1 id="vb-h1">{hero.h1}</h1>
              <p className="vb-cartouche__line">{hero.line}</p>
              <div className="vb-actions">
                <a href="#contact" className="vb-btn vb-btn--primary">Talk to our team <ArrowRight size={18} aria-hidden="true" /></a>
                <a href="#offerings" className="vb-link">See the three offerings</a>
              </div>
            </div>
            <div className="vb-plate__map" ref={mapRef}>
              <EstateMap survey active={active} onActive={setActive} />
            </div>
          </div>
          <Legend active={active} />
          <p className="vb-pan-hint">Swipe the plan sideways to explore it.</p>
        </div>
      </section>

      {/* 3 · Positioning */}
      <section className="vb-sec" aria-labelledby="vb-why">
        <div className="vb-wrap vb-why">
          <Figure photo={photos.adjuster} className="vb-why__fig" eager />
          <div className="vb-why__copy">
            <h2 id="vb-why">{positioning.heading}</h2>
            <p className="vb-lead">{positioning.p1}</p>
            <p>
              {positioning.p2a}<Term k="pc">P&amp;C</Term>{positioning.p2b} Our people know insurance, hold platform certifications
              and use <Term k="agentic">AI agents</Term> to move faster.
            </p>
          </div>
        </div>

        <div className="vb-wrap">
          <h3 className="vb-h3">Where small mistakes hide</h3>
          <div className="vb-table-wrap">
            <table className="vb-table vb-table--ledger">
              <thead>
                <tr><th scope="col">Where</th><th scope="col">What goes wrong</th><th scope="col">What we check</th></tr>
              </thead>
              <tbody>
                {ledger.map((r) => (
                  <tr key={r.where}>
                    <th scope="row"><span className={`vb-key vb-key--${r.d}`} aria-hidden="true" />{r.where}</th>
                    <td>{r.wrong}</td>
                    <td>{r.check}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4 · Offerings as full-width districts */}
      <section id="offerings" aria-labelledby="vb-offerings">
        <div className="vb-sec vb-sec--intro">
          <div className="vb-wrap">
            <h2 id="vb-offerings" className="vb-h2-wide">Three offerings, one survey of everything you run.</h2>
            <p className="vb-lead vb-measure">Test the core platforms. Run quality as one accountable team. Check the AI that now prices risks and handles claims.</p>
          </div>
        </div>

        {offerings.map((o) => {
          const d = districtOf[o.slug];
          const photo = photos[offeringPhoto[o.slug]];
          const proofs = o.proof.filter((p) => !p.display || p.display === 'Near zero');
          return (
            <article key={o.slug} className={`vb-band vb-band--${BAND[d]}`} aria-labelledby={`vb-o-${o.slug}`}>
              <div className="vb-wrap">
                <div className="vb-band__head">
                  <div className="vb-band__copy">
                    <h3 id={`vb-o-${o.slug}`}>{o.title}</h3>
                    <p className="vb-band__desc">{o.card}</p>
                    <p className="vb-band__proof">
                      {proofs.map((p, i) => (
                        <span key={p.label}><strong>{fmt(p)}</strong> {p.label}{i < proofs.length - 1 ? ';' : '.'} </span>
                      ))}
                    </p>
                    <Link to={`${V2}/${o.slug}`} className="vb-band__more">
                      {o.shortTitle || o.title} in detail <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                  </div>
                  <Figure photo={photo} className="vb-band__fig" sizes="(min-width: 1100px) 55vw, 100vw" />
                </div>
                <ul className={`vb-index vb-index--${o.subs.length}`}>
                  {o.subs.map((s) => (
                    <li key={s.title}>
                      <Link to={`${V2}/${o.slug}#${s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                        <strong>{s.title}</strong>
                        <span>{s.card}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </section>

      {/* Heritage interlude */}
      <section className="vb-sec" aria-labelledby="vb-heritage">
        <div className="vb-wrap vb-heritage">
          <Figure photo={photos.sanborn} className="vb-heritage__sheet" sizes="(min-width: 1100px) 40vw, 100vw" />
          <div className="vb-heritage__copy">
            <h2 id="vb-heritage">Insurers have always surveyed risk, one building at a time.</h2>
            <p className="vb-lead">From the 1860s, fire-insurance surveyors drew every building in thousands of American towns and coloured each one by what it was made of, so an underwriter could price a risk they would never visit.</p>
            <p>We bring the same discipline to the systems and AI you run on: survey everything, mark what is at risk, and verify it before it reaches a policyholder.</p>
            <Figure photo={photos.sanbornDetail} className="vb-heritage__detail" sizes="(min-width: 1100px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      {/* AI assurance, demonstrated */}
      <section className="vb-sec vb-sec--tint" id="ai-lab" aria-labelledby="vb-ai">
        <div className="vb-wrap">
          <div className="vb-split-head">
            <h2 id="vb-ai">A simple pass or fail is not enough for AI.</h2>
            <p className="vb-lead">AI can give different answers to the same question and can get less accurate over time. So we check accuracy, fairness, drift and safety limits, and keep a record regulators can review.</p>
          </div>
          <InspectionReport />
        </div>
      </section>

      {/* Proof points */}
      <section className="vb-sec" aria-labelledby="vb-proof">
        <div className="vb-wrap vb-proof">
          <h2 id="vb-proof">What clients have measured.</h2>
          <div className="vb-table-wrap">
            <table className="vb-table vb-table--proof">
              <thead><tr><th scope="col">Offering</th><th scope="col" className="num">Result</th><th scope="col">Measure</th></tr></thead>
              <tbody>
                {headlineProof.map((p) => (
                  <tr key={p.label}>
                    <td>{p.tag}</td>
                    <td className="num vb-table__big">{fmt(p)}</td>
                    <td>{p.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5 · Partnerships */}
      <section className="vb-sec vb-sec--rule" id="partners" aria-labelledby="vb-partners">
        <div className="vb-wrap">
          <h2 id="vb-partners">Platforms and tools we work with.</h2>
          <div className="vb-gazetteer">
            {partners.map((g) => (
              <div key={g.group}>
                <h3>{g.group}</h3>
                <ul>{g.items.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Thought leadership */}
      <section className="vb-sec vb-sec--rule" aria-labelledby="vb-insights">
        <div className="vb-wrap">
          <h2 id="vb-insights">Stay ahead with P&amp;C-focused thought leadership.</h2>
          <ul className="vb-reading">
            {insights.map((it) => (
              <li key={it.title}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <span className="vb-reading__type">{it.type}</span>
                  <span className="vb-reading__title">{it.title}</span>
                  <span className="vb-reading__time">{it.read}</span>
                  <ArrowRight size={20} aria-hidden="true" className="vb-reading__arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 · FAQs */}
      <section className="vb-sec vb-sec--rule" id="faqs" aria-labelledby="vb-faq">
        <div className="vb-wrap vb-faq">
          <h2 id="vb-faq">Questions, answered plainly.</h2>
          <div className="vb-faq__list">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactB />
    </>
  );
}
