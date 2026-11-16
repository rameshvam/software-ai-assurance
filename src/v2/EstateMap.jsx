import { useId } from 'react';
import { blocks, ghostBlocks, streets, buildings, surveyPath, surveyLength, defects } from './data.js';

const SURVEY_SECONDS = 6.5;
const SURVEY_DELAY = 0.9;

/**
 * A fire-insurance-atlas plan of an insurer's estate. Systems are buildings, coloured by the
 * offering that assures them; customer journeys are the streets.
 * - survey: a route draws through the estate once and every defect it passes turns verified.
 * - focus: fades every district but one (used on offering pages).
 * - active / onActive: hover or keyboard focus on a building reports it to the parent.
 */
export default function EstateMap({ survey = false, focus = null, active = null, onActive = () => {}, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const timeAt = (dist) => SURVEY_DELAY + (dist / surveyLength) * SURVEY_SECONDS;

  return (
    <svg
      viewBox="0 0 1200 640"
      className={`vb-map ${survey ? 'vb-map--survey' : ''} ${className}`}
      role="group"
      aria-label="Illustrative plan of an insurance estate: core systems drawn as buildings, coloured by the offering that assures them."
      style={{ '--survey-s': `${SURVEY_SECONDS}s`, '--survey-delay': `${SURVEY_DELAY}s` }}
    >
      <defs>
        <pattern id={`hatch-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" className="vb-map__hatch" />
        </pattern>
        {survey && (
          <mask id={`reveal-${uid}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="640">
            <path d={surveyPath} className="vb-map__reveal" pathLength={surveyLength} />
          </mask>
        )}
      </defs>

      <rect width="1200" height="640" className="vb-map__ground" />
      {ghostBlocks.map(([x, y, w, h], i) => <rect key={`g${i}`} x={x} y={y} width={w} height={h} className="vb-map__ghost" />)}
      {blocks.map(([x, y, w, h], i) => <rect key={`b${i}`} x={x} y={y} width={w} height={h} className="vb-map__block" />)}

      {streets.map((s) => (
        <text
          key={s.label}
          x={s.x}
          y={s.y}
          className="vb-map__street"
          transform={s.rotate ? `rotate(${s.rotate} ${s.x} ${s.y})` : undefined}
          dy={s.rotate ? 0 : 0}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {s.label}
        </text>
      ))}

      {buildings.map((b) => {
        const faded = focus && b.d !== focus;
        const isActive = active === b.id;
        const cx = b.x + b.w / 2;
        const lineH = 11.5;
        const startY = b.y + b.h / 2 - ((b.label.length - 1) * lineH) / 2;
        return (
          <g
            key={b.id}
            className={`vb-bld vb-bld--${b.d} ${faded ? 'is-faded' : ''} ${isActive ? 'is-active' : ''}`}
            tabIndex={faded ? -1 : 0}
            role="button"
            aria-label={`${b.label.join(' ')}: ${b.note}`}
            onMouseEnter={() => onActive(b.id)}
            onFocus={() => onActive(b.id)}
            onClick={() => onActive(b.id)}
          >
            <rect x={b.x} y={b.y} width={b.w} height={b.h} className="vb-bld__body" />
            {b.hatch && <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={`url(#hatch-${uid})`} className="vb-bld__hatch" />}
            {b.label.map((line, i) => (
              <text key={line} x={cx} y={startY + i * lineH} className="vb-bld__label" textAnchor="middle" dominantBaseline="middle">
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {survey && (
        <g className="vb-survey" aria-hidden="true">
          <path d={surveyPath} className="vb-survey__route" mask={`url(#reveal-${uid})`} />
          <circle r="6" className="vb-survey__surveyor" style={{ offsetPath: `path('${surveyPath}')` }} />
          {defects.map((d) => (
            <g key={d.building} transform={`translate(${d.x} ${d.y})`} className="vb-defect" style={{ '--t': `${timeAt(d.dist).toFixed(2)}s` }}>
              <g className="vb-defect__bad">
                <rect x="-6.5" y="-6.5" width="13" height="13" transform="rotate(45)" />
                <path d="M-3 -3 L3 3 M3 -3 L-3 3" />
              </g>
              <g className="vb-defect__ok">
                <circle r="8.5" />
                <path d="M-3.8 0.2 L-1 3 L4 -2.6" />
              </g>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

export { SURVEY_SECONDS, SURVEY_DELAY };
