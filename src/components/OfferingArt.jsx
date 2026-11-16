// Animated SVG illustrations, one per offering. Pure SVG + CSS animation.

export default function OfferingArt({ kind, className = '' }) {
  if (kind === 'platform') return <PlatformArt className={className} />;
  if (kind === 'coe') return <CoeArt className={className} />;
  return <AiArt className={className} />;
}

function PlatformArt({ className }) {
  const layers = [
    { y: 34, label: 'POLICY', w: 0.92 },
    { y: 84, label: 'CLAIMS', w: 0.78 },
    { y: 134, label: 'BILLING', w: 0.86 },
  ];
  return (
    <svg viewBox="0 0 320 200" className={`oart oart--platform ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="pa-scan" x1="0" x2="1">
          <stop offset="0" stopColor="#086afc" stopOpacity="0" />
          <stop offset="1" stopColor="#6ca7fe" stopOpacity=".55" />
        </linearGradient>
        <clipPath id="pa-clip"><rect x="20" y="20" width="280" height="160" rx="14" /></clipPath>
      </defs>
      {layers.map((l, i) => (
        <g key={l.label} className="pa-layer" style={{ animationDelay: `${i * 0.35}s` }}>
          <rect x="28" y={l.y} width="264" height="36" rx="9" className="pa-slab" />
          <text x="44" y={l.y + 22} className="pa-label">{l.label}</text>
          <rect x="120" y={l.y + 15} width={150 * l.w} height="6" rx="3" className="pa-track" />
          <rect x="120" y={l.y + 15} width={150 * l.w} height="6" rx="3" className="pa-fill" style={{ animationDelay: `${0.4 + i * 0.5}s` }} />
          <g className="pa-check" style={{ animationDelay: `${1.1 + i * 0.5}s` }} transform={`translate(${126 + 150 * l.w} ${l.y + 18})`}>
            <circle r="8" />
            <path d="M-3.5 0 l2.5 2.5 l4.5 -5" />
          </g>
        </g>
      ))}
      <g clipPath="url(#pa-clip)"><rect className="pa-beam" x="-60" y="20" width="60" height="160" fill="url(#pa-scan)" /></g>
    </svg>
  );
}

function CoeArt({ className }) {
  const nodes = ['TMO', 'STD', 'DOM', 'ENG', 'PRO', 'ENB'];
  const R = 70;
  return (
    <svg viewBox="0 0 320 200" className={`oart oart--coe ${className}`} aria-hidden="true">
      <circle cx="160" cy="100" r={R} className="coe-ring" />
      <circle cx="160" cy="100" r={R + 18} className="coe-ring coe-ring--outer" />
      <g className="coe-orbit">
        {nodes.map((n, i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = 160 + Math.cos(a) * R, y = 100 + Math.sin(a) * R;
          return (
            <g key={n}>
              <line x1="160" y1="100" x2={x} y2={y} className="coe-spoke" style={{ animationDelay: `${i * 0.25}s` }} />
              <g transform={`translate(${x} ${y})`}>
                <g className="coe-node-wrap">
                  <circle r="15" className="coe-node" />
                  <text className="coe-txt" y="3.5">{n}</text>
                </g>
              </g>
            </g>
          );
        })}
      </g>
      <circle cx="160" cy="100" r="26" className="coe-hub" />
      <text x="160" y="104" className="coe-hub-txt">CoE</text>
    </svg>
  );
}

function AiArt({ className }) {
  const cols = [[50, 70, 130, 150].map((y) => [60, y]), [40, 80, 120, 160].map((y) => [140, y]), [65, 100, 135].map((y) => [220, y])];
  const out = [280, 100];
  const edges = [];
  cols[0].forEach((a) => cols[1].forEach((b) => edges.push([a, b])));
  cols[1].forEach((a) => cols[2].forEach((b) => edges.push([a, b])));
  cols[2].forEach((a) => edges.push([a, out]));
  return (
    <svg viewBox="0 0 320 200" className={`oart oart--ai ${className}`} aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={`ai-edge ${i % 5 === 0 ? 'ai-edge--hot' : ''}`} style={{ animationDelay: `${(i % 7) * 0.3}s` }} />
      ))}
      {cols.flat().map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5.5" className="ai-node" style={{ animationDelay: `${(i % 6) * 0.25}s` }} />)}
      <g transform={`translate(${out[0]} ${out[1]})`}>
        <circle r="17" className="ai-out" />
        <path d="M-6 0 l4 4 l8 -9" className="ai-tick" />
      </g>
    </svg>
  );
}
