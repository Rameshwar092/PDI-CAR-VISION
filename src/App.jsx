
import { useEffect, useState } from 'react';

import { Banner, Navbar } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Scan from './components/Scan.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import { Footer, WhatsApp } from './components/Footer.jsx';
import LoginModal from './components/LoginModal.jsx';

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);

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

      <main>
        <Hero />
        <About />
        <Scan />
        <Services />
        <Contact />
      </main>

      <Footer onGetReport={() => setLoginOpen(true)} />

      <WhatsApp />

      <LoginModal
        open={loginOpen}
        onClose={closeLogin}
      />
    </>
  );
}
