import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { glossary } from '../data/content.js';

// Inline plain-English glossary: hover or focus a dotted term to see its definition.
export default function Term({ k, children }) {
  const [show, setShow] = useState(false);
  const g = glossary[k];
  if (!g) return children;
  return (
    <span
      className="term"
      tabIndex={0}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      aria-describedby={`term-${k}`}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            id={`term-${k}`}
            role="tooltip"
            className="term__tip"
            initial={{ opacity: 0, y: 6, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 4, x: '-50%' }}
            transition={{ duration: 0.16 }}
          >
            <strong>{g.term}</strong>
            {g.def}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
