import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 28, className, as = 'div', ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </M>
  );
}

// Word-by-word reveal for headlines
export function SplitWords({ text, className, delay = 0, stagger = 0.06, as = 'span', immediate = true }) {
  const M = motion[as];
  const words = text.split(' ');
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true } };
  return (
    <M className={className} initial="hidden" {...trigger}>
      {words.map((w, i) => (
        <span key={i} className="split-word" aria-hidden="true">
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%', opacity: 0 }, show: { y: '0%', opacity: 1 } }}
            transition={{ duration: 0.75, ease, delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </M>
  );
}

// Animated statistic: supports {display}, {prefix,to,suffix}, {range:[a,b],suffix}
export function Stat({ s, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = s.range ? s.range : [s.to ?? 0, 0];
    const c1 = animate(0, target[0], { duration: 1.6, ease, onUpdate: (v) => setA(v) });
    const c2 = s.range ? animate(0, target[1], { duration: 1.8, ease, onUpdate: (v) => setB(v) }) : null;
    // Guarantee the final value even if animation frames are throttled
    const snap = setTimeout(() => { setA(target[0]); setB(target[1]); }, 2000);
    return () => { c1.stop(); c2?.stop(); clearTimeout(snap); };
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  let value;
  if (s.display) value = s.display;
  else if (s.range) value = `${Math.round(a)}–${Math.round(b)}${s.suffix || ''}`;
  else value = `${s.prefix || ''}${Math.round(a)}${s.suffix || ''}`;

  return (
    <span ref={ref} className={className}>
      {s.display ? (
        <motion.span initial={{ opacity: 0, filter: 'blur(8px)' }} animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}} transition={{ duration: 1 }}>
          {value}
        </motion.span>
      ) : value}
    </span>
  );
}

// Card with a cursor-following spotlight + border glow
export function Spotlight({ children, className = '', style, as = 'div', ...rest }) {
  const ref = useRef(null);
  const Tag = as;
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Tag ref={ref} className={`spot ${className}`} onMouseMove={onMove} style={style} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false, light = false }) {
  return (
    <div className={`shead ${center ? 'shead--center' : ''} ${light ? 'shead--light' : ''}`}>
      {eyebrow && <Reveal as="span" className="eyebrow">{eyebrow}</Reveal>}
      <Reveal as="h2" delay={0.05} className="shead__title">{title}</Reveal>
      {sub && <Reveal as="p" delay={0.12} className="shead__sub">{sub}</Reveal>}
    </div>
  );
}
