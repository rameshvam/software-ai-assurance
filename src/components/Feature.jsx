import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, UserCheck, ClipboardList, PenLine, Play, Wrench } from 'lucide-react';
import { SectionHead, Reveal } from './ui.jsx';
import Term from './Term.jsx';

export default function Feature({ kind }) {
  if (kind === 'platform') return <Journeys />;
  if (kind === 'coe') return <CoeStructure />;
  return <AgenticLoop />;
}

function useTicker(n, ms = 1200) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setI(n); return; }
    const id = setInterval(() => setI((x) => (x >= n + 2 ? 0 : x + 1)), ms);
    return () => clearInterval(id);
  }, [n, ms]);
  return i;
}

function Lane({ label, steps, offset = 0 }) {
  const i = useTicker(steps.length, 900 + offset);
  const pct = Math.min(i, steps.length - 1) / (steps.length - 1);
  return (
    <div className="lane">
      <span className="lane__label">{label}</span>
      <div className="lane__track">
        <div className="lane__line"><motion.span animate={{ scaleX: pct }} transition={{ duration: 0.6, ease: 'easeInOut' }} /></div>
        {steps.map((s, k) => (
          <div key={s} className={`lane__step ${k < i ? 'is-ok' : k === i ? 'is-run' : ''}`}>
            <span className="lane__dot">{k < i ? <Check size={12} strokeWidth={3} /> : null}</span>
            <span className="lane__name">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Journeys() {
  return (
    <section className="section section--dark feature">
      <div className="container">
        <SectionHead light eyebrow="Cross-platform" title={<>Customers do not care which system handles <em className="serif">which step</em>.</>} sub="So we test the whole journey, across Guidewire, Duck Creek, older systems and the connections and data in between." />
        <Reveal className="lanes">
          <Lane label="Policy journey" steps={['Quote', 'Rate', 'Bind', 'Issue forms', 'Endorse', 'Renew']} />
          <Lane label="Claims journey" steps={['FNOL', 'Triage', 'Investigate', 'Reserve', 'Settle', 'Pay']} offset={250} />
          <div className="lanes__systems">
            {['Guidewire', 'Duck Creek', 'Legacy PAS', 'Rating engine', 'Document generation', 'Partner data feeds'].map((s) => <span key={s}>{s}</span>)}
          </div>
          <p className="lanes__note"><Term k="fnol">FNOL</Term> = first report of a claim. Journeys shown are illustrative.</p>
        </Reveal>
      </div>
    </section>
  );
}

function CoeStructure() {
  const pillars = [
    { t: 'Domain Assurance', d: 'Journeys, scenario library, change checks' },
    { t: 'Engineering Assurance', d: 'Automation, data, environments, speed' },
    { t: 'Process Assurance', d: 'Shift-left, release gates, root cause' },
  ];
  return (
    <section className="section section--dark feature">
      <div className="container">
        <SectionHead light eyebrow="How the CoE is built" title={<>One structure. <em className="serif">Every</em> line of business.</>} sub="Accountability on top, a shared rulebook beneath it, three assurance pillars, and shared experts holding it all up." />
        <div className="temple">
          <Reveal className="temple__roof"><strong>Test Management Office</strong><span>Targets · reviews · planning · reporting</span></Reveal>
          <Reveal delay={0.1} className="temple__beam"><strong>Assurance CoE Standards</strong><span>Shared methods, templates and tools</span></Reveal>
          <div className="temple__pillars">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={0.2 + i * 0.08} className="temple__pillar"><strong>{p.t}</strong><span>{p.d}</span></Reveal>
            ))}
          </div>
          <Reveal delay={0.45} className="temple__base"><strong>Enabling Functions</strong><span>Speed testing · AI-driven automation · test data</span></Reveal>
        </div>
      </div>
    </section>
  );
}

function AgenticLoop() {
  const steps = [
    { t: 'Plan', d: 'Agents read the change and decide what to test', I: ClipboardList },
    { t: 'Write', d: 'Agents write the tests, in Playwright BDD', I: PenLine },
    { t: 'Run', d: 'Tests run inside our platform', I: Play },
    { t: 'Repair', d: 'Broken tests are fixed as the app changes', I: Wrench },
  ];
  const i = useTicker(steps.length, 1300);
  return (
    <section className="section section--dark feature">
      <div className="container">
        <SectionHead light eyebrow="AI-enabled quality engineering" title={<>AI agents do the work. <em className="serif">A person</em> approves it.</>} sub="AI agents plan, write, run and repair tests, and people approve what the AI produces. The tools run inside our platform, so there is no separate automation license to buy." />
        <Reveal className="loop">
          {steps.map((s, k) => (
            <div key={s.t} className={`loop__step ${k === i ? 'is-run' : k < i ? 'is-ok' : ''}`}>
              <span className="loop__icon"><s.I size={20} /></span>
              <strong>{s.t}</strong>
              <span>{s.d}</span>
              {k < steps.length - 1 && <i className="loop__arrow" />}
            </div>
          ))}
          <div className={`loop__gate ${i >= steps.length ? 'is-on' : ''}`}>
            <UserCheck size={22} />
            <div><strong>Human approval</strong><span>Nothing ships without a person signing off</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
