import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, ShieldCheck } from 'lucide-react';

// Illustrative release-gate console shown in the hero (demo data, not client results)
const RUNS = [
  { sys: 'PolicyCenter', name: 'Renewal regression', meta: '2,481 checks' },
  { sys: 'Rating', name: 'Multi-state rate change', meta: '50 states' },
  { sys: 'Forms', name: 'Pixel-diff batch', meta: '12,400 docs' },
  { sys: 'Claims AI', name: 'Bias & drift evaluation', meta: 'within limits' },
  { sys: 'Load', name: 'Catastrophe claims surge', meta: '10× FNOL' },
];

export default function Console() {
  const [step, setStep] = useState(0); // number of finished rows
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setStep(RUNS.length); return; }
    const id = setInterval(() => setStep((s) => (s >= RUNS.length + 3 ? 0 : s + 1)), 1100);
    return () => clearInterval(id);
  }, []);

  const done = step >= RUNS.length;
  return (
    <motion.div
      className="console"
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="console__bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="console__title">release-gate · demo run</span>
        <span className={`console__live ${done ? 'is-done' : ''}`}>{done ? 'PASSED' : 'RUNNING'}</span>
      </div>
      <ul className="console__rows">
        {RUNS.map((r, i) => {
          const state = i < step ? 'ok' : i === step ? 'run' : 'wait';
          return (
            <li key={r.name} className={`crow crow--${state}`}>
              <span className="crow__icon">
                {state === 'ok' ? <Check size={13} strokeWidth={3} /> : state === 'run' ? <Loader2 size={13} className="spin" /> : <i />}
              </span>
              <span className="crow__sys">{r.sys}</span>
              <span className="crow__name">{r.name}</span>
              <span className="crow__meta">{state === 'wait' ? 'queued' : r.meta}</span>
              {state === 'run' && <span className="crow__bar" key={`b${step}`} />}
            </li>
          );
        })}
      </ul>
      <div className={`console__foot ${done ? 'is-done' : ''}`}>
        <ShieldCheck size={18} />
        <span>{done ? 'Release cleared · 0 defects reaching customers' : `Checking ${RUNS[Math.min(step, RUNS.length - 1)].sys}…`}</span>
      </div>
    </motion.div>
  );
}
