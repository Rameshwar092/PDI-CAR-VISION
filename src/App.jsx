
import { useState } from 'react';

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

  return (
    <>
      <div className="site-header">
  <Banner />
  <Navbar />
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
        onClose={() => setLoginOpen(false)}
      />
    </>
  );
}
