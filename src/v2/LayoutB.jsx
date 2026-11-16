import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import VersionSwitch from '../components/VersionSwitch.jsx';
import { BASE, offerings } from '../data/content.js';
import { districtOf, photos } from './data.js';
import './v2.css';

const V2 = `/v2${BASE}`;
const LINKS = ['Solutions', 'About Us', 'Insights', 'Careers'];
const noop = (e) => e.preventDefault();

function HeaderB() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="vb-head">
      <div className="vb-wrap vb-head__in">
        <Link to={`${V2}/`} className="vb-head__logo" aria-label="ValueMomentum, Software & AI Assurance overview">
          <Logo height={34} animate={false} />
        </Link>

        <nav className="vb-head__nav" aria-label="Primary">
          <a href="#" onClick={noop}>Solutions</a>
          <div className="vb-drop">
            <Link to={`${V2}/`} className="vb-drop__trigger">Capabilities <ChevronDown size={14} aria-hidden="true" /></Link>
            <div className="vb-drop__panel">
              <Link to={`${V2}/`} className="vb-drop__item">
                <span className="vb-key vb-key--none" aria-hidden="true" />
                <span><strong>Software &amp; AI Assurance</strong><small>Overview</small></span>
              </Link>
              {offerings.map((o) => (
                <Link key={o.slug} to={`${V2}/${o.slug}`} className="vb-drop__item">
                  <span className={`vb-key vb-key--${districtOf[o.slug]}`} aria-hidden="true" />
                  <span><strong>{o.shortTitle || o.title}</strong><small>{o.summary}</small></span>
                </Link>
              ))}
            </div>
          </div>
          {LINKS.slice(1).map((l) => <a key={l} href="#" onClick={noop}>{l}</a>)}
        </nav>

        <div className="vb-head__end">
          <VersionSwitch className="vb-switch" />
          <a href="#contact" className="vb-btn vb-btn--primary vb-btn--sm vb-head__cta">Contact us</a>
          <button className="vb-head__menu" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="vb-sheet">
          <div className="vb-wrap">
            <Link to={`${V2}/`} className="vb-sheet__link">Software &amp; AI Assurance</Link>
            {offerings.map((o) => (
              <Link key={o.slug} to={`${V2}/${o.slug}`} className="vb-sheet__link vb-sheet__link--sub">
                <span className={`vb-key vb-key--${districtOf[o.slug]}`} aria-hidden="true" />{o.shortTitle || o.title}
              </Link>
            ))}
            {LINKS.map((l) => <a key={l} href="#" onClick={noop} className="vb-sheet__link vb-sheet__link--quiet">{l}</a>)}
            <a href="#contact" className="vb-btn vb-btn--primary" onClick={() => setOpen(false)}>Contact us</a>
          </div>
        </div>
      )}
    </header>
  );
}

function FooterB() {
  const credits = ['adjuster', 'ike', 'galveston', 'servers', 'sandy', 'sanborn'].map((k) => photos[k]);
  return (
    <footer className="vb-foot">
      <div className="vb-wrap">
        <div className="vb-foot__top">
          <div className="vb-foot__brand">
            <Logo height={38} animate={false} />
            <p>Software &amp; AI Assurance for property and casualty insurers: core platforms, rating, forms, data and the AI on top.</p>
          </div>
          <nav className="vb-foot__cols" aria-label="Footer">
            <div>
              <h2>Software &amp; AI Assurance</h2>
              <Link to={`${V2}/`}>Overview</Link>
              {offerings.map((o) => <Link key={o.slug} to={`${V2}/${o.slug}`}>{o.shortTitle || o.title}</Link>)}
            </div>
            <div>
              <h2>Company</h2>
              {['Solutions', 'Capabilities', 'About Us', 'Insights', 'Careers'].map((l) => <a key={l} href="#" onClick={noop}>{l}</a>)}
            </div>
          </nav>
        </div>
        <div className="vb-foot__credits">
          <h2>Photography and maps</h2>
          <ul>
            {credits.map((c) => <li key={c.src}>{c.caption} <span>{c.credit}</span></li>)}
          </ul>
        </div>
        <div className="vb-foot__base">
          <span>© 2026 ValueMomentum. All rights reserved.</span>
          <span className="vb-foot__legal"><a href="#" onClick={noop}>Privacy</a><a href="#" onClick={noop}>Terms</a><a href="#" onClick={noop}>Cookies</a></span>
        </div>
      </div>
    </footer>
  );
}

export default function LayoutB() {
  return (
    <div className="vb">
      <a href="#vb-main" className="vb-skip">Skip to content</a>
      <HeaderB />
      <main id="vb-main"><Outlet /></main>
      <FooterB />
    </div>
  );
}
