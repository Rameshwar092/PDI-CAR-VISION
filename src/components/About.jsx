import { WHY, STATS } from '../data.js';
import { Reveal, Counter } from '../hooks.jsx';

export default function About() {
  return (
    <section id="about" style={{ paddingTop: 60 }}><div className="wrap">
      <Reveal className="eyebrow">About us</Reveal>
      <Reveal as="h2">Why partner with CarVision</Reveal>
      <Reveal as="p" className="lead">We are independent of every dealer and manufacturer. Our inspectors and tools report what is really there, so you can take delivery or ask for fixes with confidence. PDI Car Vision is your one-stop solution to car pre-delivery inspection services. Automotive inspection is our forte, and providing you with first-grade services is our passion. Covering a total over 3200+ checkpoints, we leave no stone unturned to scan your car for any defects that might occur, backed with our team of experienced experts.
</Reveal>
      <Reveal className="why">
        {WHY.map(({ icon: Icon, title, text }) => (
          <div key={title}><Icon size={48} /><h3>{title}</h3><p>{text}</p></div>
        ))}
      </Reveal>
      <Reveal className="stats">
        {STATS.map(({ label, ...n }) => <div key={label}><Counter {...n} /><span>{label}</span></div>)}
      </Reveal>
    </div></section>
  );
}
