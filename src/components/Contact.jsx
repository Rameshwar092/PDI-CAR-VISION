import { useState } from 'react';
import { CONTACT, whatsappLink } from '../data.js';
import { Pin, Call, Mail, Whatsapp } from './Icons.jsx';

const INFO = [
  [Pin, 'Location', CONTACT.address],
  [Call, 'Phone', <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>],
  [Mail, 'Email', <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>],
];

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', email: '', message: '' });
  const bind = (k) => ({ value: f[k], onChange: (e) => setF({ ...f, [k]: e.target.value }) });

  // Opens WhatsApp with the message ready to send. To get emails instead, post `f` to a form service here.
  const send = (e) => {
    e.preventDefault();
    const text = `Hi PDI CarVision,\nName: ${f.name}\nPhone: ${f.phone}\nEmail: ${f.email}\nMessage: ${f.message}`;
    window.open(whatsappLink(text), '_blank', 'noopener');
  };

  return (
    <section id="contact" style={{ paddingTop: 20 }}><div className="wrap"><div className="contact">
      <div>
        <div className="eyebrow">Our info</div>
        <h2>Contact info</h2>
        <div className="ci">
          {INFO.map(([Icon, label, value]) => (
            <div key={label}><i><Icon size={28} /></i><div><h3>{label}</h3><p>{value}</p></div></div>
          ))}
        </div>
      </div>
      <form className="f" onSubmit={send}>
        <div className="eyebrow">Get in touch</div>
        <h2>Send us a message</h2>
        <div className="f2">
          <div><label htmlFor="n">Name</label><input id="n" required autoComplete="name" {...bind('name')} /></div>
          <div><label htmlFor="p">Phone</label><input id="p" type="tel" required autoComplete="tel" {...bind('phone')} /></div>
        </div>
        <div><label htmlFor="e">Email</label><input id="e" type="email" autoComplete="email" {...bind('email')} /></div>
        <div><label htmlFor="m">Message</label>
          <textarea id="m" required placeholder="Your car model, city and delivery date" {...bind('message')} /></div>
        <button className="btn" type="submit" style={{ justifyContent: 'center' }}><Whatsapp size={20} />Send message</button>
      </form>
    </div></div></section>
  );
}
