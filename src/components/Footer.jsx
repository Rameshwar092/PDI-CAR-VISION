import logo from '../assets/logo.png';
import { BRANDS, CITIES, CONTACT, WHATSAPP_URL } from '../data.js';
import { Chat, Facebook, Youtube, Instagram, Call, Mail, Hours, Pin, ArrowUp, Whatsapp } from './Icons.jsx';

const SOCIAL = [['Facebook', Facebook], ['YouTube', Youtube], ['Instagram', Instagram]];
const LEGAL = [['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Contact', '#contact'], ['Privacy Policy', '#'], ['Terms & Conditions', '#']];
const INFO = [
  [Call, CONTACT.phone, CONTACT.phoneHref],
  [Mail, CONTACT.email, 'mailto:' + CONTACT.email],
  [Hours, <>Monday – Saturday<br />10:00 AM – 6:30 PM</>],
  [Pin, CONTACT.address],
];
const wa = { href: WHATSAPP_URL, target: '_blank', rel: 'noopener noreferrer' };

export function Footer({onGetReport}) {
  return (
    <footer><div className="wrap">
      <div className="fg">
        <div className="brand">
          <img src={logo} alt="PDI Car Vision" />
          <h3>Exposing flaws.<br />Protecting buyers.</h3>
          <p>Independent pre-delivery inspection for new car buyers: 3,200+ checkpoints, one clear report, zero dealer influence.</p>
          <a className="btn" {...wa}><Chat size={20} />Book your car PDI today</a>
          <div className="soc">
            {SOCIAL.map(([name, Icon]) => <a key={name} href="#" aria-label={name}><Icon /></a>)}
          </div>
        </div>
        <div>
          <div className="fh">Brands we inspect</div>
          <ul className="ul two">{BRANDS.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
        <div>
          <div className="fh">PDI service in</div>
          <ul className="ul">{CITIES.map((c) => <li key={c}><a href="#contact">PDI Service in {c}</a></li>)}</ul>
        </div>
        <div>
          <div className="fh">Get in touch</div>
          <div className="ct">
            {INFO.map(([Icon, text, href], i) => (
              <div key={i}><Icon size={22} /><span>{href ? <a href={href}>{text}</a> : text}</span></div>
            ))}
          </div>
          <button type="button" className="btn ghost" onClick={onGetReport}>Get your PDI report →</button>
        </div>
      </div>
      <div className="bar">
        <nav aria-label="Footer">{LEGAL.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
        <small>© 2026 PDI CarVision. All rights reserved.<br /></small>
        <button className="up" aria-label="Back to top" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={20} /></button>
      </div>
    </div></footer>
  );
}

/* Floating button: opens WhatsApp chat with +91 96961 27630 */
export const WhatsApp = () => <a className="wa" {...wa} aria-label="Chat on WhatsApp"><Whatsapp size={32} /></a>;
