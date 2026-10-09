import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { CITIES, NAV, WHATSAPP_URL } from '../data.js';
import { useActiveSection } from '../hooks.jsx';

const IDS = NAV.map(([id]) => id);
const BANNER = `Inspections available in ${CITIES.join(' · ')} — ₹2,499 onward. Terms apply.`;

export function Banner() {
  return (
    <div className="ban" aria-label={BANNER}>
      <div><span>{BANNER}</span><span aria-hidden="true">{BANNER}</span></div>
    </div>
  );
}

// export function Navbar() {
//   const [open, setOpen] = useState(false);
//   const active = useActiveSection(IDS);
//   const [scrolled, setScrolled] = useState(false);
//   useEffect(() => {
//     const onScroll = () => setScrolled(scrollY > 20);
//     onScroll();
//     addEventListener('scroll', onScroll, { passive: true });
//     return () => removeEventListener('scroll', onScroll);
//   }, []);
//   return (
//     <header className={' nav' + (scrolled ? ' scrolled' : '')}><div className="wrap">
//       <a href="#home" aria-label="PDI CarVision home"><img src={logo} alt="PDI CarVision" /></a>
//       <nav className={'links' + (open ? ' open' : '')} id="menu">
//         {NAV.map(([id, label]) => (
//           <a key={id} href={'#' + id} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>{label}</a>
//         ))}
//       </nav>
//       <div style={{ display: 'flex', gap: 10 }}>
//         <a className="btn top" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Book my PDI</a>
//         <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>☰</button>
//       </div>
//     </div></header>
//   );
// }


export function Navbar({ onGetReport }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 20);

    onScroll();

    addEventListener('scroll', onScroll, { passive: true });

    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={' nav' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap">
        <a href="#home" aria-label="PDI CarVision home">
          <img src={logo} alt="PDI CarVision" />
        </a>

        <nav className={'links' + (open ? ' open' : '')} id="menu">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={'#' + id}
              className={active === id ? 'on' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            className="menu-report"
            onClick={() => { setOpen(false); onGetReport?.(); }}
          >
            Get my PDI report
          </button>
        </nav>

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn ghost top report-btn" onClick={onGetReport}>
            Get PDI Report
          </button>

          <a
            className="btn top"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book my PDI
          </a>

          <button
            className="burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}