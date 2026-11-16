import { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import { ContactProvider } from './components/ContactModal.jsx';
import Home from './pages/Home.jsx';
import Offering from './pages/Offering.jsx';
import LayoutB from './v2/LayoutB.jsx';
import HomeB from './v2/HomeB.jsx';
import OfferingB from './v2/OfferingB.jsx';
import { BASE } from './data/content.js';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60); return; }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

// Version A: the original dark, motion-led design
function LayoutA() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ContactProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to={`${BASE}/`} replace />} />
        <Route element={<LayoutA />}>
          <Route path={`${BASE}/`} element={<Home />} />
          <Route path={`${BASE}/:slug`} element={<Offering />} />
        </Route>
        <Route element={<LayoutB />}>
          <Route path={`/v2${BASE}/`} element={<HomeB />} />
          <Route path={`/v2${BASE}/:slug`} element={<OfferingB />} />
        </Route>
        <Route path="*" element={<Navigate to={`${BASE}/`} replace />} />
      </Routes>
    </ContactProvider>
  );
}
