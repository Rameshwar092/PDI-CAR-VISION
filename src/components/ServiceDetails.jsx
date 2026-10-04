import { SERVICE_DETAILS, STEPS, FAQ } from '../data.js';
import { Reveal } from '../hooks.jsx';

export default function ServiceDetails() {
  return (
    <div id="service-details">
      <Reveal as="h3" className="sub">What we check</Reveal>
      <Reveal className="sd">
        {SERVICE_DETAILS.map(({ icon: Icon, title, text, points }, i) => (
          <article key={title} id={`svc-${i}`}>
            <i><Icon size={34} /></i>
            <h4>{title}</h4>
            <p>{text}</p>
            <ul>{points.map((p) => <li key={p}>{p}</li>)}</ul>
          </article>
        ))}
      </Reveal>
      <Reveal as="h3" className="sub">How it works</Reveal>
      <Reveal className="steps">
        {STEPS.map(({ title, text }, i) => <div key={title}><b>{i + 1}</b><h4>{title}</h4><p>{text}</p></div>)}
      </Reveal>
      <Reveal as="h3" className="sub">Frequently asked questions</Reveal>
      <Reveal className="faq">
        {FAQ.map(({ q, a }) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </Reveal>
      <Reveal className="cta"><a className="btn" href="#contact">Book my PDI</a></Reveal>
    </div>
  );
}
