import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { BASE, offerings } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo tone="light" height={40} animate={false} />
            <p>Software &amp; AI Assurance for property and casualty insurers: core platforms, rating, forms, data and the AI sitting on top.</p>
          </div>
          <div className="footer__cols">
            <div>
              <h4>Software &amp; AI Assurance</h4>
              <Link to={`${BASE}/`}>Overview</Link>
              {offerings.map((o) => <Link key={o.slug} to={`${BASE}/${o.slug}`}>{o.shortTitle || o.title}</Link>)}
            </div>
            <div>
              <h4>Company</h4>
              {['Solutions', 'Capabilities', 'About Us', 'Insights', 'Careers'].map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()}>{l}</a>)}
            </div>
            <div>
              <h4>Explore</h4>
              <Link to={`${BASE}/#ai-lab`}>AI assurance demo</Link>
              <Link to={`${BASE}/#partners`}>Partnerships</Link>
              <Link to={`${BASE}/#faqs`}>FAQs</Link>
            </div>
          </div>
        </div>
        <div className="footer__giant" aria-hidden="true">Assurance</div>
        <div className="footer__bottom">
          <span>© 2026 ValueMomentum. All rights reserved.</span>
          <span className="footer__legal"><a href="#" onClick={(e) => e.preventDefault()}>Privacy</a><a href="#" onClick={(e) => e.preventDefault()}>Terms</a><a href="#" onClick={(e) => e.preventDefault()}>Cookies</a></span>
        </div>
      </div>
    </footer>
  );
}
