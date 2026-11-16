import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo.jsx';
import { useContact } from './ContactModal.jsx';
import VersionSwitch from './VersionSwitch.jsx';
import { BASE, offerings } from '../data/content.js';

const LINKS = ['Solutions', 'Capabilities', 'About Us', 'Insights', 'Careers'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { open } = useContact();
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { setMobile(false); setMenu(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : ''; }, [mobile]);

  const light = !scrolled && !mobile;

  return (
    <header className={`nav ${scrolled || mobile ? 'nav--solid' : ''} ${light ? 'nav--on-dark' : ''}`}>
      <div className="nav__inner container">
        <Link to={`${BASE}/`} className="nav__logo" aria-label="ValueMomentum home">
          <Logo tone={light ? 'light' : 'dark'} height={36} />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) =>
            l === 'Capabilities' ? (
              <div key={l} className="nav__item" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
                <button className="nav__link" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
                  {l} <ChevronDown size={14} className={menu ? 'rot' : ''} />
                </button>
                <AnimatePresence>
                  {menu && (
                    <motion.div
                      className="mega"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="mega__head">
                        <span className="eyebrow">Software &amp; AI Assurance</span>
                        <Link to={`${BASE}/`} className="mega__all">Overview <ArrowUpRight size={14} /></Link>
                      </div>
                      <div className="mega__grid">
                        {offerings.map((o) => (
                          <Link key={o.slug} to={`${BASE}/${o.slug}`} className="mega__card" style={{ '--accent': o.accent }}>
                            <span className="mega__num">{o.num}</span>
                            <strong>{o.shortTitle || o.title}</strong>
                            <span>{o.summary}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a key={l} href="#" className="nav__link" onClick={(e) => e.preventDefault()}>{l}</a>
            )
          )}
        </nav>

        <div className="nav__cta">
          <VersionSwitch />
          <button className="btn btn--primary btn--sm" onClick={() => open()}>Contact Us</button>
          <button className="nav__burger" aria-label={mobile ? 'Close menu' : 'Open menu'} onClick={() => setMobile((m) => !m)}>
            {mobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div className="mobile" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <span className="eyebrow">Software &amp; AI Assurance</span>
            <Link to={`${BASE}/`} className="mobile__link">Overview</Link>
            {offerings.map((o) => (
              <Link key={o.slug} to={`${BASE}/${o.slug}`} className="mobile__link">
                <span className="mobile__num">{o.num}</span>{o.shortTitle || o.title}
              </Link>
            ))}
            <div className="mobile__rule" />
            {LINKS.filter((l) => l !== 'Capabilities').map((l) => (
              <a key={l} href="#" className="mobile__link mobile__link--sm" onClick={(e) => e.preventDefault()}>{l}</a>
            ))}
            <button className="btn btn--primary" onClick={() => { setMobile(false); open(); }}>Contact Us</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
