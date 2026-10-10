
import { useEffect, useState } from 'react';

import { Banner, Navbar } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Scan from './components/Scan.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import { Footer, WhatsApp } from './components/Footer.jsx';
import LoginModal from './components/LoginModal.jsx';
import LegalPage from './components/LegalPage.jsx';

// #privacy-policy and #terms show a legal page inside the site (same tab).
const LEGAL_HASH = { '#privacy-policy': 'privacy', '#terms': 'terms' };
const pageFromHash = () => LEGAL_HASH[window.location.hash] || 'home';

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [page, setPage] = useState(pageFromHash);

  // Switch between the home page and the legal pages when the #hash changes.
  useEffect(() => {
    const onHash = () => {
      const next = pageFromHash();
      setPage(next);
      if (next === 'home') {
        // Coming back from a legal page to a section link like #about: scroll to it
        // once the home page is visible again.
        const id = window.location.hash.slice(1);
        requestAnimationFrame(() => {
          const el = id && document.getElementById(id);
          if (el) el.scrollIntoView();
          else if (!id || id === 'home') window.scrollTo(0, 0);
        });
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Legal pages have a light background, so give the see-through top bar its solid colour there.
  // and open each legal page at the top (after it has rendered).
  useEffect(() => {
    document.body.classList.toggle('on-legal', page !== 'home');
    if (page !== 'home') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  // pdicarvision.in/#get-report opens the report login directly
  // (used by links in SMS/WhatsApp and by the PDI report app).
  useEffect(() => {
    const check = () => { if (window.location.hash === '#get-report') setLoginOpen(true); };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  const closeLogin = () => {
    setLoginOpen(false);
    if (window.location.hash === '#get-report') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      <div className="site-header">
  <Banner />
  <Navbar onGetReport={() => setLoginOpen(true)} />
</div>

      {/* The home page stays mounted (just hidden) so its animations keep working. */}
      <main hidden={page !== 'home'}>
        <Hero />
        <About />
        <Scan />
        <Services />
        <Contact />
      </main>

      {page !== 'home' && <LegalPage page={page} />}

      <Footer onGetReport={() => setLoginOpen(true)} />

      <WhatsApp />

      <LoginModal
        open={loginOpen}
        onClose={closeLogin}
      />
    </>
  );
}