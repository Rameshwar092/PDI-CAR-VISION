import { useEffect, useRef } from 'react';
import { HIGHLIGHTS } from '../data.js';
import bmw from '../assets/bmw-m3.png';

export default function Hero() {
  const tun = useRef(null);

  // pointer parallax for the glowing frames (CSS reads --mx / --my)
  useEffect(() => {
    const move = (e) => {
      tun.current.style.setProperty('--mx', e.clientX / innerWidth - 0.5);
      tun.current.style.setProperty('--my', e.clientY / innerHeight - 0.5);
    };
    addEventListener('pointermove', move);
    return () => removeEventListener('pointermove', move);
  }, []);

  return (
    <section className="hx" id="home"><div className="wrap">
      <div>
        <h1>The gold standard in vehicle inspection &amp; intelligence.</h1>
        <p>Empowering trust and performance with next-generation digital PDI and auditing.</p>
        <div className="row">
          <a className="btn b2" href="#scan">Explore CarVision</a>
          <a className="btn b3" href="#contact">Speak with an expert</a>
        </div>
      </div>
      <div className="tun" ref={tun}><div className="tin">
        {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="fr" style={{ '--i': i }} />)}
        <img className="hero-car" src={bmw} alt="White BMW M3" />
      </div></div>
      <div className="hc">
        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
          <div className="gl" key={title}><Icon /><div><b>{title}</b><span>{text}</span></div></div>
        ))}
      </div>
    </div></section>
  );
}
