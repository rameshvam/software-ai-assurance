import { Link, useLocation } from 'react-router-dom';
import { BASE } from '../data/content.js';

// Switches between design Version A (/capabilities/...) and Version B (/v2/capabilities/...),
// keeping the visitor on the same page.
export default function VersionSwitch({ className = 'vswitch' }) {
  const { pathname } = useLocation();
  const isB = pathname.startsWith('/v2/');
  const rest = isB ? pathname.slice(3) : pathname;
  const pathA = rest.startsWith(BASE) ? rest : `${BASE}/`;
  const pathB = `/v2${pathA}`;
  return (
    <div className={className} role="group" aria-label="Design version">
      <Link to={pathA} aria-current={!isB ? 'page' : undefined}>Version A</Link>
      <Link to={pathB} aria-current={isB ? 'page' : undefined}>Version B</Link>
    </div>
  );
}
