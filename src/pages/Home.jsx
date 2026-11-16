import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Play, Building2, BadgeCheck, Bot, ChevronRight } from 'lucide-react';
import HeroCanvas from '../components/HeroCanvas.jsx';
import Console from '../components/Console.jsx';
import OfferingArt from '../components/OfferingArt.jsx';
import AILab from '../components/AILab.jsx';
import Term from '../components/Term.jsx';
import { Reveal, SplitWords, Stat, Spotlight, SectionHead } from '../components/ui.jsx';
import { Partners, Insights, FAQ, CtaBand } from '../components/Sections.jsx';
import { useContact } from '../components/ContactModal.jsx';
import useSeo from '../components/useSeo.js';
import { BASE, seo, hero, positioning, pillars, offerings, headlineProof, marquee, faqs } from '../data/content.js';

const PILLAR_ICONS = [Building2, BadgeCheck, Bot];

export default function Home() {
  const { open } = useContact();
  useSeo({ ...seo, faqs, path: `${BASE}/` });

  return (
    <>
      {/* 1–2 · Page title + hero */}
      <section className="hero">
        <HeroCanvas />
        <div className="hero__vignette" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <motion.nav className="crumbs crumbs--light" aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <a href="#" onClick={(e) => e.preventDefault()}>Home</a><ChevronRight size={12} />
              <a href="#" onClick={(e) => e.preventDefault()}>Capabilities</a><ChevronRight size={12} />
              <span aria-current="page">Software &amp; AI Assurance</span>
            </motion.nav>

            <motion.span className="chip-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <i className="diamond" /> {hero.eyebrow}
            </motion.span>

            <h1 className="hero__title" aria-label={hero.h1}>
              <SplitWords text="Software &" delay={0.35} />{' '}
              <span className="grad-text"><SplitWords text="AI Assurance" delay={0.5} /></span>
            </h1>

            <motion.p className="hero__line" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }}>
              {hero.line}
            </motion.p>

            <motion.div className="hero__ctas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }}>
              <button className="btn btn--primary btn--lg" onClick={() => open()}>Talk to our team <ArrowRight size={18} /></button>
              <a href="#offerings" className="btn btn--glass btn--lg">Explore offerings</a>
            </motion.div>

            <motion.div className="hero__legend" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
              <span><i className="lg lg--amber" /> Defect found</span>
              <span><i className="lg lg--green" /> Caught &amp; verified</span>
              <span className="hero__legend-hint">Move your cursor across the field</span>
            </motion.div>
          </div>
          <Console />
        </div>

        <div className="marquee" aria-label="Platforms and systems we test">
          <span className="marquee__label">Platforms we assure</span>
          <div className="marquee__track">
            <div className="marquee__inner">
              {[...marquee, ...marquee].map((m, i) => <span key={i}>{m}<i className="diamond diamond--sm" /></span>)}
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Positioning */}
      <section className="section" id="positioning">
        <div className="container">
          <div className="pos">
            <div className="pos__copy">
              <Reveal as="span" className="eyebrow">Why it matters</Reveal>
              <Reveal as="h2" delay={0.05} className="pos__title">{positioning.heading}</Reveal>
              <Reveal as="p" delay={0.1} className="lead">{positioning.p1}</Reveal>
              <Reveal as="p" delay={0.15}>
                {positioning.p2a}<Term k="pc">P&amp;C</Term>{positioning.p2b}{' '}
                Our people know insurance, hold platform certifications and use <Term k="agentic">AI agents</Term> to move faster.
              </Reveal>
            </div>
            <Reveal delay={0.1} className="media">
              <div className="media__art" aria-hidden="true">
                <div className="media__ring r1" /><div className="media__ring r2" /><div className="media__ring r3" />
                <svg viewBox="310 -10 370 200" className="media__mark">
                  <polygon fill="#086afc" points="494.62 179.16 405.25 89.92 405.2 0 494.6 89.33 494.62 179.16" />
                  <polygon fill="#5eba46" points="494.62 179.16 584.07 89.92 584.12 0 494.61 89.33 494.62 179.16" />
                  <polygon fill="#9acf84" points="584.12 0 584.07 89.92 674.56 89.88 584.12 0" />
                  <polygon fill="#6ca7fe" points="405.2 0 405.25 89.92 314.76 89.75 405.2 0" />
                  <polygon fill="#febc10" points="494.57 35.34 517.96 58.73 494.57 82.12 471.17 58.73 494.57 35.34" />
                </svg>
              </div>
              <button className="media__play" aria-label="Introduction video coming soon" disabled>
                <Play size={22} fill="currentColor" />
              </button>
              <div className="media__cap">
                <strong>Meet the Software &amp; AI Assurance team</strong>
                <span>Introduction video coming soon</span>
              </div>
            </Reveal>
          </div>

          <div className="mistakes">
            {positioning.mistakes.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} className="mistake">
                <span className="mistake__label">{m.label}</span>
                <div className="mistake__wrong">
                  <span>{m.wrong}</span>
                  <motion.i className="mistake__strike" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.25, duration: 0.5 }} />
                </div>
                <motion.div className="mistake__right" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1 + i * 0.25 }}>
                  <span className="tick">✓</span> {m.right}
                </motion.div>
                <span className="mistake__note">{m.note}</span>
              </Reveal>
            ))}
          </div>

          <div className="pillars">
            {pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal key={p.title} delay={i * 0.08} className="pillar">
                  <span className="pillar__icon"><Icon size={20} /></span>
                  <div><h3>{p.title}</h3><p>{p.body}</p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 · Offerings */}
      <section className="section section--soft" id="offerings">
        <div className="container">
          <SectionHead center eyebrow="What we do" title="Our Offerings" sub="Three connected offerings: test the platforms, run quality as one team, and check the AI on top." />
          <div className="offers">
            {offerings.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.1}>
                <Spotlight as={Link} to={`${BASE}/${o.slug}`} className="offer" style={{ '--accent': o.accent }}>
                  <div className="offer__art"><OfferingArt kind={o.art} /></div>
                  <div className="offer__body">
                    <span className="offer__num">{o.num}</span>
                    <h3>{o.title}</h3>
                    <p>{o.card}</p>
                    <ul className="offer__subs">
                      {o.subs.slice(0, 4).map((s) => <li key={s.title}>{s.title.replace(' Services', '')}</li>)}
                      {o.subs.length > 4 && <li className="more">+{o.subs.length - 4} more</li>}
                    </ul>
                  </div>
                  <div className="offer__foot">
                    <span className="offer__proof"><Stat s={o.proof.find((p) => !p.display) || o.proof[0]} /> <small>{(o.proof.find((p) => !p.display) || o.proof[0]).label}</small></span>
                    <span className="offer__go">Learn more <ArrowUpRight size={16} /></span>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proof points */}
      <section className="section section--dark proof">
        <div className="container">
          <SectionHead light eyebrow="Proof points" title={<>Outcomes insurers <em className="serif">can measure</em>.</>} />
          <div className="proof__grid">
            {headlineProof.map((p, i) => (
              <Reveal key={p.label} delay={(i % 3) * 0.08} className="proof__item">
                <Stat s={p} className="proof__num" />
                <span className="proof__label">{p.label}</span>
                <span className="proof__tag">{p.tag}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AILab />

      {/* 5 · Partnerships */}
      <Partners />

      {/* 6 · Thought leadership */}
      <Insights />

      {/* 7 · FAQs */}
      <FAQ />

      <CtaBand />
    </>
  );
}
