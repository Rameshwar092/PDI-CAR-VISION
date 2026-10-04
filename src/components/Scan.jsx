import { useEffect, useRef } from 'react';
import { READS } from '../data.js';
import { Reveal, Counter } from '../hooks.jsx';
import { scanScene } from '../scenes.js';

export default function Scan() {
  const canvas = useRef(null);
  useEffect(() => scanScene(canvas.current), []);
  return (
    <section className="scan" id="scan">
      <div className="wrap">
        <Reveal className="eyebrow">Live diagnostics</Reveal>
        <Reveal as="h2">Plug in the OBD scanner. See every fault.</Reveal>
        <Reveal as="p" className="lead">The scanner reads the car's computers while the inspector checks all 360° of the body, so hidden issues cannot hide.</Reveal>
      </div>
      <div id="cv"><canvas id="gl" ref={canvas} aria-label="3D car turning 360 degrees next to an OBD scanner" /></div>
      <div className="wrap">
        <Reveal className="reads">
          {READS.map(({ label, ...n }) => <div className="gl" key={label}><Counter {...n} /><span>{label}</span></div>)}
        </Reveal>
      </div>
    </section>
  );
}
