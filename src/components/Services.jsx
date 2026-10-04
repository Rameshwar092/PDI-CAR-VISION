import { useEffect, useRef, useState } from 'react';
import { SERVICES, SERVICE_ORDER } from '../data.js';
import { Reveal, reduceMotion } from '../hooks.jsx';
import { serviceScene, svcTarget } from '../scenes.js';
import ServiceDetails from './ServiceDetails.jsx';

export default function Services() {
  const [active, setActive] = useState(SERVICE_ORDER[0]);
  const hold = useRef(false);   // true while a service is hovered or focused
  const step = useRef(0);
  const canvas = useRef(null);

  useEffect(() => serviceScene(canvas.current), []);
  useEffect(() => { svcTarget.angle = SERVICES[active].angle; }, [active]);

  // auto-cycle through the services unless the person is pointing at one
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      if (hold.current) return;
      step.current = (step.current + 1) % SERVICE_ORDER.length;
      setActive(SERVICE_ORDER[step.current]);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const pick = (i) => { hold.current = true; setActive(i); };
  const release = () => { hold.current = false; };

  return (
    <section id="services" style={{ paddingTop: 90 }}><div className="wrap">
      <Reveal className="eyebrow">Services</Reveal>
      <Reveal as="h2">Every system on your car, checked</Reveal>
      <Reveal as="p" className="lead">Watch the car turn to face the area being inspected, or hover a service to jump to it.</Reveal>
      <Reveal className="svc">
        {SERVICES.map(({ icon: Icon, title }, i) => (
          <a key={title} href="#inspect" className={`sv s${i}${active === i ? ' on' : ''}`}
             onMouseEnter={() => pick(i)} onFocus={() => pick(i)} onMouseLeave={release} onBlur={release}>
            <i><Icon size={44} /></i><h3>{title}</h3><span>Read more</span>
          </a>
        ))}
        <div className="svcar"><canvas id="sg" ref={canvas} aria-label="3D car turning to show each inspected area" /></div>
        <a className="btn va" href="#inspect">View all services →</a>
      </Reveal>
      <ServiceDetails />
    </div></section>
  );
}
