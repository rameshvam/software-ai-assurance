import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import { ContactProvider } from './components/ContactModal.jsx';
import Home from './pages/Home.jsx';
import Offering from './pages/Offering.jsx';
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

export default function App() {
  return (
    <ContactProvider>
      <ScrollToTop />
      <ScrollProgress />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={`${BASE}/`} replace />} />
          <Route path={`${BASE}/`} element={<Home />} />
          <Route path={`${BASE}/:slug`} element={<Offering />} />
          <Route path="*" element={<Navigate to={`${BASE}/`} replace />} />
        </Routes>
      </main>
      <Footer />
    </ContactProvider>
  );
}
