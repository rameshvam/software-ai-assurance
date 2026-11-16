import { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { aiLab } from '../data/content.js';
import Term from '../components/Term.jsx';

/* ---------- Figure with honest caption ---------- */
export function Figure({ photo, className = '', sizes = '(min-width: 1100px) 60vw, 100vw', eager = false }) {
  return (
    <figure className={`vb-fig ${className}`}>
      <img
        src={photo.src}
        srcSet={photo.src800 ? `${photo.src800} 800w, ${photo.src} ${photo.w}w` : undefined}
        sizes={photo.src800 ? sizes : undefined}
        width={photo.w}
        height={photo.h}
        alt={photo.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      <figcaption>{photo.caption} <span>{photo.credit}</span></figcaption>
    </figure>
  );
}

/* ---------- AI inspection report ---------- */
function DriftChart({ data }) {
  const W = 560, H = 210, L = 40, R = 12, T = 14, B = 30;
  const min = 50, max = 80;
  const base = data.slice(0, 4).reduce((a, b) => a + b, 0) / 4;
  const lo = base - 3, hi = base + 3;
  const x = (i) => L + (i / (data.length - 1)) * (W - L - R);
  const y = (v) => T + (1 - (v - min) / (max - min)) * (H - T - B);
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const outside = data.map((v, i) => ({ v, i })).filter((p) => p.v < lo || p.v > hi);
  return (
    <figure className="vb-chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Weekly accuracy over 12 weeks. ${outside.length ? `${outside.length} weeks fell outside the expected range and were flagged.` : 'All weeks stayed inside the expected range.'}`}>
        {[55, 65, 75].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="vb-chart__grid" />
            <text x={L - 8} y={y(t)} className="vb-chart__tick" textAnchor="end" dominantBaseline="middle">{t}</text>
          </g>
        ))}
        <rect x={L} y={y(hi)} width={W - L - R} height={y(lo) - y(hi)} className="vb-chart__band" />
        <text x={W - R - 6} y={y(hi) - 6} className="vb-chart__bandlabel" textAnchor="end">Expected range</text>
        <path d={line} className="vb-chart__line" />
        {data.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r={v < lo || v > hi ? 5 : 3} className={v < lo || v > hi ? 'vb-chart__pt is-out' : 'vb-chart__pt'} />
        ))}
        {data.map((_, i) => (i % 2 === 0 ? <text key={`w${i}`} x={x(i)} y={H - 8} className="vb-chart__tick" textAnchor="middle">W{i + 1}</text> : null))}
      </svg>
      <figcaption>
        Accuracy score by week{outside.length ? `: drift flagged in weeks ${outside.map((p) => p.i + 1).join(', ')}, model retrained and re-checked.` : ', all weeks inside the expected range.'}
      </figcaption>
    </figure>
  );
}

export function InspectionReport() {
  const [idx, setIdx] = useState(0);
  const s = aiLab[idx];
  return (
    <div className="vb-report">
      <div className="vb-tabs" role="tablist" aria-label="Choose an AI system to inspect">
        {aiLab.map((t, i) => (
          <button key={t.id} role="tab" id={`vb-tab-${t.id}`} aria-controls="vb-report-panel" aria-selected={i === idx} className="vb-tabs__tab" onClick={() => setIdx(i)}>
            {t.tab}
          </button>
        ))}
      </div>

      <article className="vb-sheet-doc" id="vb-report-panel" role="tabpanel" aria-labelledby={`vb-tab-${s.id}`}>
        <header className="vb-sheet-doc__head">
          <h3>Inspection report: {s.tab}</h3>
          <p className="vb-sheet-doc__risk">{s.risk}</p>
        </header>

        <dl className="vb-io">
          <div><dt>Input</dt><dd>{s.input}</dd></div>
          <div><dt>Model output</dt><dd>{s.output}</dd></div>
        </dl>

        <div className="vb-sheet-doc__body">
          <table className="vb-table vb-table--checks">
            <caption className="vb-sr">Assurance checks for {s.tab}</caption>
            <thead><tr><th scope="col">Check</th><th scope="col" className="num">Result</th><th scope="col">Status</th></tr></thead>
            <tbody>
              {s.checks.map((c) => (
                <tr key={c.k}>
                  <th scope="row">{c.k}</th>
                  <td className="num">{c.v}<small> {c.unit}</small></td>
                  <td><span className="vb-pass"><Check size={14} strokeWidth={3} aria-hidden="true" /> Within limits</span></td>
                </tr>
              ))}
              <tr>
                <th scope="row">Audit trail</th>
                <td className="num">Complete</td>
                <td><span className="vb-pass"><Check size={14} strokeWidth={3} aria-hidden="true" /> <span>Ready for <Term k="naic">NAIC</Term>-style review</span></span></td>
              </tr>
            </tbody>
          </table>
          <DriftChart data={s.drift} />
        </div>

        <footer className="vb-sheet-doc__foot">
          <p className="vb-verdict">
            {s.drift.some((v, i, a) => { const b = a.slice(0, 4).reduce((x, y) => x + y, 0) / 4; return v < b - 3 || v > b + 3; })
              ? <AlertTriangle size={18} aria-hidden="true" /> : <Check size={18} strokeWidth={3} aria-hidden="true" />}
            <strong>Verdict:</strong> {s.verdict}
          </p>
          <p className="vb-sign"><span>Approved by</span><i aria-hidden="true" /> <span>A person signs off. AI proposes, people approve.</span></p>
          <p className="vb-note">Illustrative example. Figures are synthetic, not client data.</p>
        </footer>
      </article>
    </div>
  );
}

/* ---------- Per-offering plans ---------- */
function JourneyStreet({ y, label, stops, id }) {
  const x0 = 70, x1 = 1030;
  const step = (x1 - x0) / (stops.length - 1);
  const path = `M${x0},${y} L${x1},${y}`;
  return (
    <g>
      <rect x="20" y={y - 18} width="1060" height="36" className="vb-plan__road" />
      <line x1="20" x2="1080" y1={y} y2={y} className="vb-plan__centre" />
      <text x="24" y={y - 30} className="vb-plan__streetname">{label}</text>
      {stops.map((s, i) => {
        const x = x0 + i * step;
        return (
          <g key={s} className="vb-plan__stop" style={{ '--t': `${0.6 + i * 0.55 + (id === 'claims' ? 0.4 : 0)}s` }}>
            <rect x={x - 26} y={y + 26} width="52" height="34" className="vb-plan__lot" />
            <text x={x} y={y + 80} className="vb-plan__stopname" textAnchor="middle">{s}</text>
            <g transform={`translate(${x} ${y})`} className="vb-plan__check">
              <circle r="9" />
              <path d="M-4 0.3 L-1.2 3.1 L4.2 -2.8" />
            </g>
          </g>
        );
      })}
      <circle r="6" className="vb-plan__walker" style={{ offsetPath: `path('${path}')`, animationDelay: id === 'claims' ? '0.4s' : '0s' }} />
    </g>
  );
}

export function JourneysPlan() {
  return (
    <figure className="vb-plan">
      <svg viewBox="0 0 1100 330" role="img" aria-label="Two customer journeys drawn as streets. Policy journey: quote, rate, bind, issue forms, endorse, renew. Claims journey: first report, triage, investigate, reserve, settle, pay. Each stop is checked in turn.">
        <JourneyStreet id="policy" y={70} label="POLICY JOURNEY" stops={['QUOTE', 'RATE', 'BIND', 'ISSUE FORMS', 'ENDORSE', 'RENEW']} />
        <JourneyStreet id="claims" y={225} label="CLAIMS JOURNEY" stops={['FNOL', 'TRIAGE', 'INVESTIGATE', 'RESERVE', 'SETTLE', 'PAY']} />
      </svg>
      <figcaption>Each journey is tested end to end, across Guidewire, Duck Creek, older systems and the data in between. <Term k="fnol">FNOL</Term> is the first report of a claim.</figcaption>
    </figure>
  );
}

export function CoePlan() {
  return (
    <figure className="vb-plan">
      <svg viewBox="0 0 900 470" role="img" aria-label="Floor plan of the Assurance CoE. Test Management Office along the top, a Standards hall beneath it, three rooms for Domain, Engineering and Process Assurance, and Enabling Functions along the base.">
        <defs>
          <pattern id="vb-coe-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" className="vb-map__hatch" />
          </pattern>
        </defs>
        <rect x="30" y="20" width="840" height="430" className="vb-plan__floor" />
        {/* rooms */}
        <rect x="30" y="20" width="840" height="96" className="vb-plan__room vb-plan__room--coe" />
        <rect x="30" y="20" width="840" height="96" fill="url(#vb-coe-hatch)" className="vb-plan__roomhatch" />
        <rect x="30" y="116" width="840" height="66" className="vb-plan__room vb-plan__room--hall" />
        <rect x="30" y="182" width="280" height="168" className="vb-plan__room" />
        <rect x="310" y="182" width="280" height="168" className="vb-plan__room" />
        <rect x="590" y="182" width="280" height="168" className="vb-plan__room" />
        <rect x="30" y="350" width="840" height="100" className="vb-plan__room vb-plan__room--base" />
        {/* outer wall */}
        <rect x="30" y="20" width="840" height="430" className="vb-plan__wall" />
        {/* door openings with swing arcs */}
        {[[170, 182], [450, 182], [730, 182], [90, 350], [330, 350], [810, 350]].map(([x, yy], i) => (
          <g key={i} className="vb-plan__door">
            <line x1={x - 20} x2={x + 20} y1={yy} y2={yy} className="vb-plan__gap" />
            <path d={`M${x + 20},${yy} A40,40 0 0 1 ${x - 20},${yy + 40}`} className="vb-plan__swing" />
            <line x1={x - 20} y1={yy} x2={x - 20} y2={yy + 40} className="vb-plan__leaf" />
          </g>
        ))}
        <line x1="430" x2="470" y1="116" y2="116" className="vb-plan__gap" />
        {/* labels */}
        <text x="450" y="60" className="vb-plan__roomname" textAnchor="middle">TEST MANAGEMENT OFFICE</text>
        <text x="450" y="84" className="vb-plan__roomnote" textAnchor="middle">Targets · reviews · planning · reporting</text>
        <text x="450" y="146" className="vb-plan__roomname" textAnchor="middle">ASSURANCE CoE STANDARDS</text>
        <text x="450" y="166" className="vb-plan__roomnote" textAnchor="middle">One rulebook, shared templates and tools</text>
        {[['DOMAIN', 'ASSURANCE', 'Journeys and scenario library'], ['ENGINEERING', 'ASSURANCE', 'Automation, data, environments'], ['PROCESS', 'ASSURANCE', 'Release gates and root cause']].map(([a, b, n], i) => (
          <g key={a}>
            <text x={170 + i * 280} y="250" className="vb-plan__roomname" textAnchor="middle">{a}</text>
            <text x={170 + i * 280} y="270" className="vb-plan__roomname" textAnchor="middle">{b}</text>
            <text x={170 + i * 280} y="296" className="vb-plan__roomnote" textAnchor="middle">{n}</text>
          </g>
        ))}
        <text x="450" y="396" className="vb-plan__roomname" textAnchor="middle">ENABLING FUNCTIONS</text>
        <text x="450" y="420" className="vb-plan__roomnote" textAnchor="middle">Speed testing · AI-driven automation · test data</text>
      </svg>
      <figcaption>How the Assurance CoE is organised: accountability on top, one rulebook beneath it, three assurance disciplines, and shared experts every team can call on.</figcaption>
    </figure>
  );
}

export function LoopPlan() {
  const cx = 300, cy = 220, r = 150;
  const stops = [
    { t: 'PLAN', n: 'Agents read the change', a: -90 },
    { t: 'WRITE', n: 'Tests in Playwright BDD', a: 0 },
    { t: 'RUN', n: 'Inside our platform', a: 90 },
    { t: 'REPAIR', n: 'Broken tests fixed', a: 180 },
  ];
  const ring = `M${cx},${cy - r} A${r},${r} 0 1 1 ${cx - 0.01},${cy - r}`;
  return (
    <figure className="vb-plan">
      <svg viewBox="0 0 1000 440" role="img" aria-label="The agentic testing loop drawn as a ring road with four stops: plan, write, run and repair. The only exit passes a gate marked human approval before release.">
        <circle cx={cx} cy={cy} r={r + 18} className="vb-plan__ringedge" />
        <circle cx={cx} cy={cy} r={r - 18} className="vb-plan__ringedge" />
        <circle cx={cx} cy={cy} r={r} className="vb-plan__ringroad" />
        <circle cx={cx} cy={cy} r={r} className="vb-plan__centre" fill="none" />
        <rect x={cx + r} y={cy - 18} width="520" height="36" className="vb-plan__road" />
        <line x1={cx + r} x2={cx + r + 520} y1={cy} y2={cy} className="vb-plan__centre" />
        {/* gate */}
        <g className="vb-plan__gate">
          <rect x="672" y={cy - 44} width="14" height="88" />
          <line x1="679" x2="679" y1={cy - 30} y2={cy + 30} />
          <text x="679" y={cy - 58} textAnchor="middle" className="vb-plan__roomname">HUMAN APPROVAL</text>
          <text x="679" y={cy + 70} textAnchor="middle" className="vb-plan__roomnote">Nothing ships without a person signing off</text>
        </g>
        <text x="920" y={cy - 30} textAnchor="middle" className="vb-plan__roomname">RELEASE</text>
        {stops.map((s) => {
          const rad = (s.a * Math.PI) / 180;
          const x = cx + Math.cos(rad) * r, y = cy + Math.sin(rad) * r;
          const lx = cx + Math.cos(rad) * (r - 70), ly = cy + Math.sin(rad) * (r - 70);
          return (
            <g key={s.t}>
              <rect x={x - 14} y={y - 14} width="28" height="28" className="vb-plan__lot vb-plan__lot--ai" />
              <text x={lx} y={ly - 4} textAnchor="middle" className="vb-plan__roomname">{s.t}</text>
              <text x={lx} y={ly + 14} textAnchor="middle" className="vb-plan__roomnote">{s.n}</text>
            </g>
          );
        })}
        <circle r="6" className="vb-plan__walker vb-plan__walker--loop" style={{ offsetPath: `path('${ring}')` }} />
      </svg>
      <figcaption>AI agents plan, write, run and repair tests on a loop. The only way out is through a person. The tools run inside our platform, so there is no separate automation license to buy.</figcaption>
    </figure>
  );
}
