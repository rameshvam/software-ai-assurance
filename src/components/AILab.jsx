import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, ShieldCheck, FileCheck2, User, Sparkles } from 'lucide-react';
import { aiLab } from '../data/content.js';
import { SectionHead } from './ui.jsx';
import Term from './Term.jsx';

function Sparkline({ data }) {
  const W = 260, H = 64, min = 50, max = 75;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * W, H - ((v - min) / (max - min)) * H]);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const peak = pts.reduce((m, p, i) => (data[i] > data[m] ? i : m), 0);
  const isEvent = Math.max(...data) - Math.min(...data) > 5;
  return (
    <svg viewBox={`0 0 ${W} ${H + 8}`} className="spark" aria-hidden="true">
      <rect x="0" y={H - ((70 - min) / (max - min)) * H} width={W} height={((70 - 56) / (max - min)) * H} className="spark__band" />
      <motion.path d={`${d} L${W},${H + 8} L0,${H + 8} Z`} className="spark__area" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
      <motion.path d={d} className="spark__line" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
      {isEvent && (
        <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2 }} style={{ transformOrigin: `${pts[peak][0]}px ${pts[peak][1]}px` }}>
          <circle cx={pts[peak][0]} cy={pts[peak][1]} r="5" className="spark__event" />
          <circle cx={pts[peak][0]} cy={pts[peak][1]} r="11" className="spark__event-ring" />
        </motion.g>
      )}
    </svg>
  );
}

export default function AILab() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % aiLab.length), 7000);
    return () => clearInterval(id);
  }, [auto]);
  const s = aiLab[idx];

  return (
    <section className="section section--dark ailab" id="ai-lab">
      <div className="ailab__glow" aria-hidden="true" />
      <div className="container">
        <SectionHead
          light
          eyebrow="AI assurance, live"
          title={<>A simple pass or fail is not enough for <em className="serif">AI</em>.</>}
          sub="AI can give different answers to the same question and can drift over time. So we check accuracy, fairness, drift, guardrails and the audit trail, tailored to the job the AI does."
        />

        <div className="ailab__tabs" role="tablist" aria-label="AI use cases">
          {aiLab.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === idx}
              className={`ailab__tab ${i === idx ? 'is-on' : ''}`}
              onClick={() => { setIdx(i); setAuto(false); }}
            >
              {i === idx && <motion.span layoutId="tabpill" className="ailab__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="ailab__tabtxt">{t.tab}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            className="ailab__grid"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="lab-card lab-card--io">
              <p className="lab-risk"><Sparkles size={15} /> {s.risk}</p>
              <div className="bubble bubble--in">
                <span className="bubble__who"><User size={14} /> Input</span>
                <p>{s.input}</p>
              </div>
              <div className="bubble bubble--out">
                <span className="bubble__who"><Bot size={14} /> Model output</span>
                <p>{s.output}</p>
              </div>
              <div className="lab-drift">
                <div className="lab-drift__head">
                  <span>Accuracy over 12 weeks</span>
                  <span className="lab-tag">Drift watch</span>
                </div>
                <Sparkline data={s.drift} />
              </div>
            </div>

            <div className="lab-card lab-card--checks">
              <h4>Assurance checks</h4>
              <ul className="checks">
                {s.checks.map((c, i) => (
                  <li key={c.k}>
                    <div className="checks__row">
                      <span>{c.k}</span>
                      <motion.strong initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.25 }}>
                        {c.v}<small>{c.unit}</small>
                      </motion.strong>
                    </div>
                    <div className="meter">
                      <motion.span initial={{ width: 0 }} animate={{ width: `${c.v}%` }} transition={{ duration: 1.1, delay: 0.2 + i * 0.25, ease: [0.22, 1, 0.36, 1] }} />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="lab-audit">
                <FileCheck2 size={18} />
                <span>Audit trail generated for <Term k="naic">NAIC</Term>-style review</span>
              </div>
              <motion.div className="lab-verdict" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3 }}>
                <ShieldCheck size={20} /> {s.verdict}
              </motion.div>
              <p className="lab-note">Illustrative example</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
