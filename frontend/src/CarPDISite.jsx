// import React, { useState, useEffect, useRef, useCallback } from "react";

// import serviceEngine from "./images/service-engine.png";
// import serviceMechanical from "./images/service-mechanical.png";
// import serviceElectronics from "./images/service-electronics.png";
// import servicepaint from "./images/service-paint.png";
// import servicebattery from "./images/service-battery.png";
// import serviceinterior from "./images/service-interior.png";
// import bannerYard from "./images/banner-yard.png";
// import diagnosticCloseup from "./images/diagnostic-closeup.png";
// import servicereport from  "./images/service-report.png";
// import pdiCarVisionLogo from "./images/pdi-car-vision-logo.png";

// /* ------------------------------------------------------------------ */
// /* Data                                                                 */
// /* ------------------------------------------------------------------ */

// const CITIES = [
//   "Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad", "Manesar",
//   "Sohna", "Bahadurgarh", "Meerut", "Panipat", "Rohtak", "Hisar",
// ];

// const WHY_US = [
//   {
//     tick: "3,200+ checkpoints",
//     title: "Nothing is eyeballed",
//     body:
//       "Every panel gap, torque value, fluid level and sensor reading is logged against a fixed checklist, not a technician's gut feel.",
//     detail:
//       "Every checklist item maps to a specific tool reading or reference photo, so two technicians inspecting the same car produce the same flags — the report doesn't depend on who showed up that day.",
//   },
//   {
//     tick: "Independent, always",
//     title: "No dealer, no manufacturer tie-ups",
//     body:
//       "We're paid by the buyer, not the showroom. If a car has a paint touch-up or a misaligned bumper, the report says so.",
//     detail:
//       "We turn down commissions and referral fees from dealers and workshops. The report goes to you first, in full, before anyone at the dealership sees it.",
//   },
//   {
//     tick: "Diagnostic-grade tools",
//     title: "OBD scanners, paint-depth gauges, thermal checks",
//     body:
//       "The same instrument-led process a workshop would use for a warranty claim — run before you take delivery, not after.",
//     detail:
//       "Calibrated hardware, not a flashlight and a checklist on a phone. Readings are logged directly from the tool, so there's no rounding up or eyeballing a gauge.",
//   },
// ];

// const SERVICES = [
//   {
//     code: "EN-01",
//     name: "Engine & drivetrain diagnosis",
//     desc: "Compression, idle behaviour, fluid condition, leak checks.",
//     points: ["Engine oil level & condition", "Coolant level & leak check", "Idle stability & unusual noise scan"],
//     img: serviceEngine,
//   },
//   {
//     code: "MC-02",
//     name: "Mechanical & suspension scan",
//     desc: "Underbody, brakes, steering linkages, wheel alignment.",
//     points: ["Underbody corrosion & damage check", "Brake pad thickness & disc condition", "Steering play & suspension bushings"],
//     img: serviceMechanical,
//   },
//   {
//     code: "EC-03",
//     name: "Electronics & ECU read-out",
//     desc: "OBD fault codes, infotainment, sensors, software version.",
//     points: ["OBD-II fault code scan", "Infotainment & camera function check", "Sensor calibration read-out"],
//     img: serviceElectronics,
//   },
//   {
//     code: "BT-04",
//     name: "Battery & tyre health",
//     desc: "Cranking voltage, charge state, tread depth, manufacture date.",
//     points: ["Battery voltage & load test", "Tyre tread depth, all 4 + spare", "Tyre manufacture date check"],
//     img: servicebattery,
//   },
//   {
//     code: "PT-05",
//     name: "Paint & body diagnosis",
//     desc: "Paint-depth gauge scan for repainted or repaired panels.",
//     points: ["Paint thickness scan, all panels", "Panel gap & alignment check", "Dent, scratch & touch-up log"],
//     img: servicepaint,
//   },
//   {
//     code: "IN-06",
//     name: "Interior & fitment check",
//     desc: "Panel gaps, upholstery, electricals, accessory fitment.",
//     points: ["Upholstery & trim inspection", "Power windows, AC & electricals", "Accessory & kit fitment check"],
//     img: serviceinterior,
//   },
// ];

// const PROCESS_STEPS = [
//   { n: "01", title: "Book a slot", body: "Share your delivery date, dealer location and car variant." },
//   { n: "02", title: "We inspect at the yard", body: "A technician runs the full checklist before you take delivery." },
//   { n: "03", title: "You get the report", body: "A clear, itemised report within 24 hours — photos included." },
//   { n: "04", title: "You decide", body: "Accept the car, ask the dealer to fix issues, or walk away informed." },
// ];

// const TESTIMONIALS = [
//   {
//     quote:
//       "The report flagged a repainted rear quarter panel the showroom never mentioned. Saved me from a bad delivery day.",
//     name: "Karan Mehta",
//     car: "New SUV, top variant",
//   },
//   {
//     quote:
//       "Technician walked me through every checkpoint on call before I signed the delivery form. Worth every rupee.",
//     name: "Priya Nair",
//     car: "New hatchback",
//   },
//   {
//     quote:
//       "Found a low coolant level and a loose battery terminal — both fixed by the dealer before I took the car home.",
//     name: "Sameer Bhalla",
//     car: "New sedan",
//   },
// ];

// const BRANDS = [
//   "Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Kia", "Honda",
//   "Toyota", "Skoda", "Volkswagen", "MG Motor",
//   "Renault", "Nissan", "Citroen", "Jeep", "BYD", "Isuzu", "BMW", "Audi",
//   "Mercedes-Benz", "Force Motors",
// ];

// const WHATSAPP_NUMBER = "918800769789"; // placeholder — replace with client's number

// /* ------------------------------------------------------------------ */
// /* Interaction hooks                                                    */
// /* ------------------------------------------------------------------ */

// /* Fires once, the first time the wrapped element enters the viewport. */
// function useInView(threshold = 0.18) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     if (typeof IntersectionObserver === "undefined") {
//       setInView(true);
//       return;
//     }
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           obs.disconnect();
//         }
//       },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);

//   return [ref, inView];
// }

// /* Scroll-reveal wrapper. One orchestrated fade+rise per block, not per
//    line — pass `delay` (ms) to stagger siblings such as a card grid. */
// function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
//   const [ref, inView] = useInView();
//   return (
//     <Tag
//       ref={ref}
//       className={`pdi-reveal ${inView ? "is-visible" : ""} ${className}`}
//       style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
//     >
//       {children}
//     </Tag>
//   );
// }

// /* Eases a number up from 0 to `target` once `active` becomes true. */
// function useCountUp(target, active, duration = 1200) {
//   const [value, setValue] = useState(0);
//   useEffect(() => {
//     if (!active) return;
//     let raf;
//     const start = performance.now();
//     const tick = (now) => {
//       const p = Math.min(1, (now - start) / duration);
//       const eased = 1 - Math.pow(1 - p, 3);
//       setValue(Math.floor(target * eased));
//       if (p < 1) raf = requestAnimationFrame(tick);
//     };
//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [active, target, duration]);
//   return value;
// }

// /* Subtle cursor-tilt for a "device" panel — used once, on the hero's
//    live read-out card, so it reads as a deliberate touch, not decoration. */
// function useTilt(ref, strength = 6) {
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
//     if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;

//     const onMove = (e) => {
//       const rect = el.getBoundingClientRect();
//       const px = (e.clientX - rect.left) / rect.width - 0.5;
//       const py = (e.clientY - rect.top) / rect.height - 0.5;
//       el.style.transform = `perspective(900px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg)`;
//     };
//     const onLeave = () => {
//       el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
//     };
//     el.addEventListener("mousemove", onMove);
//     el.addEventListener("mouseleave", onLeave);
//     return () => {
//       el.removeEventListener("mousemove", onMove);
//       el.removeEventListener("mouseleave", onLeave);
//     };
//   }, [ref, strength]);
// }

// /* ------------------------------------------------------------------ */
// /* Small line icons — generic pictograms, no brand artwork                */
// /* ------------------------------------------------------------------ */

// function IconPhone(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
//     </svg>
//   );
// }
// function IconMail(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <rect x="2" y="4" width="20" height="16" rx="2" />
//       <path d="m22 6-10 7L2 6" />
//     </svg>
//   );
// }
// function IconClock(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <circle cx="12" cy="12" r="9" />
//       <path d="M12 7v5l3 3" />
//     </svg>
//   );
// }
// function IconPin(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   );
// }
// function IconChat(props) {
//   return (
//     <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" {...props}>
//       <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
//     </svg>
//   );
// }
// function IconArrowUp(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <path d="M12 19V5" />
//       <path d="m5 12 7-7 7 7" />
//     </svg>
//   );
// }
// function IconFacebook(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
//       <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C16.5 3.1 15.4 3 14.2 3c-2.6 0-4.4 1.6-4.4 4.5v2.3H7v3.2h2.8v8h3.7Z" />
//     </svg>
//   );
// }
// function IconYoutube(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
//       <rect x="2.5" y="6" width="19" height="12" rx="3" />
//       <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
//     </svg>
//   );
// }
// function IconInstagram(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
//       <rect x="3" y="3" width="18" height="18" rx="5" />
//       <circle cx="12" cy="12" r="4" />
//       <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
//     </svg>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Small shared bits                                                    */
// /* ------------------------------------------------------------------ */

// function Eyebrow({ children }) {
//   return <p className="pdi-eyebrow">{children}</p>;
// }

// /* Image placeholder — swap the wrapping <div>'s background for a real
//    <img src="..."> once client photography or licensed stock is available. */
// function ImagePlaceholder({ caption, ratio = "16/10", className = "" }) {
//   return (
//     <div className={`pdi-img-placeholder ${className}`} style={{ aspectRatio: ratio }}>
//       <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
//         <rect x="3" y="5" width="18" height="14" rx="1.5" />
//         <circle cx="8.5" cy="10" r="1.6" />
//         <path d="M3 16l5-4.5 4 3 3.5-3L21 15" />
//       </svg>
//       <span>{caption}</span>
//     </div>
//   );
// }

// /* Wraps a real photo in a fixed-ratio box; a hover zoom is handled by the
//    parent card's CSS (.pdi-imgbox img scales on card :hover). */
// function ImageBox({ src, alt, ratio = "16/10", className = "" }) {
//   return (
//     <div className={`pdi-imgbox ${className}`} style={{ aspectRatio: ratio }}>
//       <img src={src} alt={alt} className="pdi-real-img" />
//     </div>
//   );
// }

// /* Primary CTA button with a click ripple, so the busiest actions on the
//    page (book, submit) give a clear tactile response. */
// function RippleButton({ className = "", children, onClick, ...rest }) {
//   const [ripples, setRipples] = useState([]);

//   const handleClick = (e) => {
//     if (rest.disabled) return;
//     const rect = e.currentTarget.getBoundingClientRect();
//     const size = Math.max(rect.width, rect.height) * 2.2;
//     const ripple = {
//       id: Date.now() + Math.random(),
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//       size,
//     };
//     setRipples((r) => [...r, ripple]);
//     window.setTimeout(() => {
//       setRipples((r) => r.filter((rp) => rp.id !== ripple.id));
//     }, 650);
//     onClick?.(e);
//   };

//   return (
//     <button className={`pdi-btn pdi-ripple-btn ${className}`} onClick={handleClick} {...rest}>
//       <span className="pdi-btn-label">{children}</span>
//       {ripples.map((r) => (
//         <span
//           key={r.id}
//           className="pdi-ripple"
//           style={{ left: r.x, top: r.y, width: r.size, height: r.size, marginLeft: -r.size / 2, marginTop: -r.size / 2 }}
//         />
//       ))}
//     </button>
//   );
// }

// function CTAStrip({ onNavigate }) {
//   return (
//     <section className="pdi-cta-strip">
//       <Reveal className="pdi-shell pdi-cta-row">
//         <div>
//           <h2 className="pdi-h2" style={{ marginBottom: 6 }}>Taking delivery this week?</h2>
//           <p className="pdi-muted">Book a slot and we'll have a report ready before you sign.</p>
//         </div>
//         <RippleButton className="pdi-btn-amber pdi-btn-lg" onClick={() => onNavigate("contact")}>
//           Book Inspection
//         </RippleButton>
//       </Reveal>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Interactive pieces                                                   */
// /* ------------------------------------------------------------------ */

// /* Expandable service card — click to reveal the exact checklist points
//    for that module. Only one open at a time on the home page grid. */
// function ServiceCard({ service, expanded, onToggle, ratio = "16/10" }) {
//   return (
//     <button
//       type="button"
//       className={`pdi-service pdi-service-interactive ${expanded ? "is-expanded" : ""}`}
//       onClick={onToggle}
//       aria-expanded={expanded}
//     >
//       {service.img
//         ? <ImageBox src={service.img} alt={service.name} ratio={ratio} className="pdi-service-img" />
//         : <ImagePlaceholder caption={`Photo: ${service.name.toLowerCase()}`} ratio={ratio} className="pdi-service-img" />}
//       <div className="pdi-service-head">
//         <h3>{service.name}</h3>
//         <span className="pdi-chevron" aria-hidden="true">⌄</span>
//       </div>
//       <p>{service.desc}</p>
//       <div className="pdi-collapse">
//         <div className="pdi-collapse-inner">
//           <ul className="pdi-service-points">
//             {service.points.map((p) => <li key={p}>{p}</li>)}
//           </ul>
//         </div>
//       </div>
//     </button>
//   );
// }

// /* Accordion item for the "Why choose us" checklist. */
// function WhyUsItem({ item, expanded, onToggle }) {
//   return (
//     <button
//       type="button"
//       className={`pdi-check-item pdi-check-interactive ${expanded ? "is-expanded" : ""}`}
//       onClick={onToggle}
//       aria-expanded={expanded}
//     >
//       <div className="pdi-check-tick"><span>✓</span> {item.tick}</div>
//       <div className="pdi-service-head">
//         <h3>{item.title}</h3>
//         <span className="pdi-chevron" aria-hidden="true">⌄</span>
//       </div>
//       <p>{item.body}</p>
//       <div className="pdi-collapse">
//         <div className="pdi-collapse-inner">
//           <p className="pdi-check-extra">{item.detail}</p>
//         </div>
//       </div>
//     </button>
//   );
// }

// /* Clickable process stepper — replaces the static 4-up grid with a
//    numbered track you can scrub through; the connecting line fills to
//    show progress, since this content really is a sequence. */
// function ProcessStepper({ steps }) {
//   const [active, setActive] = useState(0);
//   const fill = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0;

//   return (
//     <div className="pdi-stepper">
//       <div className="pdi-stepper-track">
//         <div className="pdi-stepper-track-bg" />
//         <div className="pdi-stepper-track-fill" style={{ width: `${fill}%` }} />
//         {steps.map((s, i) => (
//           <button
//             key={s.n}
//             type="button"
//             className={`pdi-stepper-dot ${i <= active ? "is-passed" : ""} ${i === active ? "is-current" : ""}`}
//             onClick={() => setActive(i)}
//           >
//             <span>{s.n}</span>
//           </button>
//         ))}
//       </div>
//       <div className="pdi-stepper-labels">
//         {steps.map((s, i) => (
//           <button
//             key={s.n}
//             type="button"
//             className={`pdi-stepper-label ${i === active ? "is-current" : ""}`}
//             onClick={() => setActive(i)}
//           >
//             {s.title}
//           </button>
//         ))}
//       </div>
//       <div className="pdi-stepper-panel" key={active}>
//         <div className="pdi-process-num">{steps[active].n}</div>
//         <h3>{steps[active].title}</h3>
//         <p>{steps[active].body}</p>
//       </div>
//     </div>
//   );
// }

// /* Stat that counts up once it scrolls into view. */
// function StatCounter({ target, suffix = "", label, format }) {
//   const [ref, inView] = useInView(0.4);
//   const value = useCountUp(target, inView);
//   const display = format ? format(value) : value;
//   return (
//     <div className="pdi-stat" ref={ref}>
//       <div className="pdi-stat-num">{display}{suffix}</div>
//       <div>{label}</div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Pages                                                                 */
// /* ------------------------------------------------------------------ */

// function HomePage({ onNavigate }) {
//   const [activeQuote, setActiveQuote] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [openService, setOpenService] = useState(null);
//   const [openWhy, setOpenWhy] = useState(0);
//   const scanRef = useRef(null);
//   useTilt(scanRef, 5);

//   useEffect(() => {
//     if (paused) return;
//     const id = setInterval(() => setActiveQuote((i) => (i + 1) % TESTIMONIALS.length), 5000);
//     return () => clearInterval(id);
//   }, [paused]);

//   return (
//     <>
//       <section className="pdi-hero">
//         <div className="pdi-shell pdi-hero-grid">
//           <div>
//             <Eyebrow>Pre-delivery vehicle inspection</Eyebrow>
//             <h1 className="pdi-h1 pdi-hero-anim" style={{ animationDelay: "80ms" }}>
//               Know exactly what you're<br />signing for, before you sign.
//             </h1>
//             <p className="pdi-hero-copy pdi-hero-anim" style={{ animationDelay: "160ms" }}>
//               A full diagnostic and visual inspection of your new car — engine,
//               electronics, paint and body — run at the dealer yard before delivery.
//               One clear report. No dealer influence.
//             </p>
//             <div className="pdi-hero-actions pdi-hero-anim" style={{ animationDelay: "240ms" }}>
//               <RippleButton className="pdi-btn-amber pdi-btn-lg" onClick={() => onNavigate("contact")}>
//                 Book my inspection
//               </RippleButton>
//               <button className="pdi-btn pdi-btn-outline pdi-btn-lg" onClick={() => onNavigate("services")}>
//                 See what's checked
//               </button>
//             </div>
//             <p className="pdi-hero-price pdi-hero-anim" style={{ animationDelay: "320ms" }}>
//               Starting at <strong>₹2,499</strong> · report in 24 hours
//             </p>
//           </div>

//           <div className="pdi-scan-panel pdi-hero-anim" style={{ animationDelay: "180ms" }} ref={scanRef}>
//             <div className="pdi-scan-head">
//               <span className="pdi-scan-dot" />
//               LIVE INSPECTION READ-OUT
//             </div>
//             <ScanCounter />
//             <div className="pdi-scan-rows">
//               <div className="pdi-scan-row"><span>Defect-free deliveries flagged clean</span><span className="pdi-amber">94%</span></div>
//               <div className="pdi-scan-row"><span>Avg. issues found per inspection</span><span className="pdi-amber">2.3</span></div>
//               <div className="pdi-scan-row"><span>Report turnaround</span><span className="pdi-amber">24 hrs</span></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="pdi-banner">
//         <ImageBox src={bannerYard} alt="Technician inspecting a car at the dealer yard" ratio="25/13" />
//       </section>

//       <section className="pdi-section">
//         <div className="pdi-shell pdi-why-grid">
//           <div>
//             <Eyebrow>Why choose us</Eyebrow>
//             <h2 className="pdi-h2">An inspection run like an audit, not a favour</h2>
//             <div className="pdi-checklist pdi-checklist-stacked">
//               {WHY_US.map((item, i) => (
//                 <WhyUsItem
//                   key={item.title}
//                   item={item}
//                   expanded={openWhy === i}
//                   onToggle={() => setOpenWhy(openWhy === i ? null : i)}
//                 />
//               ))}
//             </div>
//           </div>
//           <Reveal>
//             <ImageBox src={diagnosticCloseup} alt="OBD scanner plugged into a car's diagnostic port" ratio="5/5" />
//           </Reveal>
//         </div>
//       </section>

//       <section className="pdi-section">
//         <div className="pdi-shell">
//           <div className="pdi-section-head-row">
//             <div>
//               <Eyebrow>What we check</Eyebrow>
//               <h2 className="pdi-h2" style={{ marginBottom: 0 }}>Six inspection modules, one report</h2>
//             </div>
//             <button className="pdi-btn pdi-btn-outline" onClick={() => onNavigate("services")}>
//               View full checklist
//             </button>
//           </div>
//           <p className="pdi-hint">Tap a module to see exactly what's checked.</p>
//           <div className="pdi-service-grid" style={{ marginTop: 18 }}>
//             {SERVICES.map((s, i) => (
//               <Reveal key={s.code} delay={i * 60}>
//                 <ServiceCard
//                   service={s}
//                   expanded={openService === s.code}
//                   onToggle={() => setOpenService(openService === s.code ? null : s.code)}
//                 />
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="pdi-section pdi-quote-section">
//         <div className="pdi-shell">
//           <Eyebrow>From recent deliveries</Eyebrow>
//           <Reveal
//             className="pdi-quote-box"
//             as="div"
//           >
//             <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
//               <p className="pdi-quote-text">"{TESTIMONIALS[activeQuote].quote}"</p>
//               <div className="pdi-quote-meta pdi-quote-meta-row">
//                 <div className="pdi-avatar-placeholder" aria-hidden="true">
//                   {TESTIMONIALS[activeQuote].name.split(" ").map((n) => n[0]).join("")}
//                 </div>
//                 <div>
//                   <span>{TESTIMONIALS[activeQuote].name}</span>
//                   <span className="pdi-muted"> — {TESTIMONIALS[activeQuote].car}</span>
//                 </div>
//               </div>
//               <div className="pdi-quote-progress" key={activeQuote}>
//                 <div className="pdi-quote-progress-fill" style={{ animationPlayState: paused ? "paused" : "running" }} />
//               </div>
//               <div className="pdi-quote-dots">
//                 {TESTIMONIALS.map((_, i) => (
//                   <button
//                     key={i}
//                     className={`pdi-dot ${i === activeQuote ? "is-active" : ""}`}
//                     onClick={() => setActiveQuote(i)}
//                     aria-label={`Show testimonial ${i + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       <Reveal as="section" className="pdi-brands">
//         <div className="pdi-shell pdi-brands-row">
//           {BRANDS.map((b) => <span key={b}>{b}</span>)}
//         </div>
//       </Reveal>

//       <CTAStrip onNavigate={onNavigate} />
//     </>
//   );
// }

// /* Animated checkpoint counter, split out so it re-triggers cleanly. */
// function ScanCounter() {
//   const [ref, inView] = useInView(0.3);
//   const value = useCountUp(3247, inView, 1400);
//   return (
//     <div ref={ref}>
//       <div className="pdi-scan-big">{value.toLocaleString("en-IN")}</div>
//       <div className="pdi-scan-label">checkpoints scanned to date</div>
//     </div>
//   );
// }

// function AboutPage({ onNavigate }) {
//   return (
//     <>
//       <section className="pdi-page-hero">
//         <div className="pdi-shell pdi-about-hero-grid">
//           <div>
//             <Eyebrow>About PDICARVISI👁️N</Eyebrow>
//             <h1 className="pdi-h1" style={{ fontSize: 38 }}>
//               Fifteen years in automotive diagnostics, now working for the buyer
//             </h1>
//             <p className="pdi-hero-copy" style={{ marginTop: 18 }}>
//               Our technicians come from dealership service floors and independent
//               workshops. We built Checkpoint because pre-delivery inspection almost
//               always happens after the customer has already taken the keys — we
//               moved it to before. Every inspection is run against a fixed,
//               published checklist, and every report goes to the buyer first.
//             </p>
//           </div>
//           <ImagePlaceholder caption="Photo: founder or lead technician portrait, workshop setting" ratio="4/5" />
//         </div>
//       </section>

//       <section className="pdi-section">
//         <Reveal className="pdi-shell pdi-stat-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
//           <StatCounter target={15} suffix="+" label="Years combined experience" />
//           <StatCounter target={3200} suffix="+" label="Checkpoints per vehicle" format={(v) => v.toLocaleString("en-IN")} />
//           <StatCounter target={22} label="Brands covered" />
//           <StatCounter target={0} label="Dealer tie-ups" />
//         </Reveal>
//       </section>

//       <section className="pdi-section">
//         <div className="pdi-shell">
//           <Eyebrow>How it works</Eyebrow>
//           <h2 className="pdi-h2">From booking to decision, in four steps</h2>
//           <ImageBox
//             src={servicereport}
//             alt="Photo: technician handing over a printed/tablet report to a customer"
//             ratio="45/55"
//             className="pdi-process-banner"
//             style={{ objectPosition: "center 30%" }}
//           />
//           <Reveal>
//             <ProcessStepper steps={PROCESS_STEPS} />
//           </Reveal>
//         </div>
//       </section>

//       <CTAStrip onNavigate={onNavigate} />
//     </>
//   );
// }

// function ServicesPage({ onNavigate }) {
//   const [openService, setOpenService] = useState(null);

//   return (
//     <>
//       <section className="pdi-page-hero">
//         <div className="pdi-shell">
//           <Eyebrow>What we check</Eyebrow>
//           <h1 className="pdi-h1" style={{ fontSize: 38 }}>Six inspection modules, 3,200+ checkpoints</h1>
//           <p className="pdi-hero-copy" style={{ marginTop: 18 }}>
//             Every module below is run on every inspection, regardless of package.
//             The report you receive lists a pass/flag status for each item, with
//             photos for anything flagged.
//           </p>
//         </div>
//       </section>

//       <section className="pdi-section" style={{ borderBottom: "none" }}>
//         <div className="pdi-shell pdi-service-grid-full">
//           {SERVICES.map((s, i) => (
//             <Reveal key={s.code} delay={i * 50}>
//               <ServiceCard
//                 service={s}
//                 ratio="16/9"
//                 expanded={openService === null ? true : openService === s.code}
//                 onToggle={() => setOpenService(openService === s.code ? null : s.code)}
//               />
//             </Reveal>
//           ))}
//         </div>
//       </section>

//       <CTAStrip onNavigate={onNavigate} />
//     </>
//   );
// }

// function ContactPage() {
//   const [form, setForm] = useState({ name: "", phone: "", city: "", car: "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [shake, setShake] = useState(false);

//   const API_BASE_URL = "http://localhost:5000";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.phone) return;

//     setSubmitting(true);
//     setError("");

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/bookings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         const message =
//           data.errors?.[0]?.msg || data.message || "Something went wrong. Please try again.";
//         throw new Error(message);
//       }

//       setSubmitted(true);
//     } catch (err) {
//       setError(err.message || "Could not submit — please check your connection and try again.");
//       setShake(true);
//       window.setTimeout(() => setShake(false), 500);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="pdi-section pdi-contact" style={{ borderBottom: "none" }}>
//       <div className="pdi-shell pdi-contact-grid">
//         <Reveal>
//           <Eyebrow>Book an inspection</Eyebrow>
//           <h2 className="pdi-h2">Tell us about the car, we'll take it from there</h2>
//           <p className="pdi-hero-copy">
//             Share your delivery date and dealer location — we'll schedule a
//             technician to arrive before you take the car home.
//           </p>
//           <div className="pdi-contact-info">
//             <div>📞 +91 98-XXXX-XXXX</div>
//             <div>✉ hello@checkpointpdi.in</div>
//             <div>Mon–Sat, 10:00 AM – 6:30 PM</div>
//           </div>
//         </Reveal>

//         <Reveal delay={100}>
//           <form className={`pdi-form ${shake ? "pdi-shake" : ""}`} onSubmit={handleSubmit}>
//             {submitted ? (
//               <div className="pdi-form-success">
//                 <div className="pdi-success-check" aria-hidden="true">
//                   <svg viewBox="0 0 52 52" width="44" height="44">
//                     <circle className="pdi-success-circle" cx="26" cy="26" r="23" fill="none" />
//                     <path className="pdi-success-tick" fill="none" d="M14 27l7 7 17-17" />
//                   </svg>
//                 </div>
//                 <strong>Request received.</strong>
//                 <p>We'll call {form.name} shortly to confirm the inspection slot.</p>
//               </div>
//             ) : (
//               <>
//                 <label>Full name
//                   <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
//                 </label>
//                 <label>Phone number
//                   <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
//                 </label>
//                 <label>City
//                   <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. Gurgaon" />
//                 </label>
//                 <label>Car model
//                   <input type="text" value={form.car} onChange={(e) => setForm({ ...form, car: e.target.value })} placeholder="e.g. New Creta, top variant" />
//                 </label>
//                 {error && <p className="pdi-form-error">{error}</p>}
//                 <RippleButton className="pdi-btn-amber pdi-btn-lg pdi-btn-block" type="submit" disabled={submitting}>
//                   {submitting ? "Submitting…" : "Request inspection"}
//                 </RippleButton>
//               </>
//             )}
//           </form>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Report-portal login modal                                            */
// /* ------------------------------------------------------------------ */

// function ReportLoginModal({ onClose }) {
//   const [creds, setCreds] = useState({ id: "", password: "" });

//   useEffect(() => {
//     const onKey = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [onClose]);

//   return (
//     <div className="pdi-modal-overlay" onClick={onClose}>
//       <div className="pdi-modal" onClick={(e) => e.stopPropagation()}>
//         <button className="pdi-modal-close" onClick={onClose} aria-label="Close">×</button>
//         <Eyebrow>Customer portal</Eyebrow>
//         <h2 className="pdi-h2" style={{ fontSize: 22, marginBottom: 8 }}>Get your PDI report</h2>
//         <p className="pdi-muted" style={{ marginBottom: 22, fontSize: 14 }}>
//           Log in with the booking ID sent to you by SMS after your inspection.
//         </p>
//         <form
//           className="pdi-form"
//           style={{ background: "transparent", border: "none", padding: 0 }}
//           onSubmit={(e) => e.preventDefault()}
//         >
//           <label>Booking ID / phone number
//             <input type="text" value={creds.id} onChange={(e) => setCreds({ ...creds, id: e.target.value })} placeholder="e.g. CKP-10482" />
//           </label>
//           <label>Password
//             <input type="password" value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })} placeholder="••••••••" />
//           </label>
//           <RippleButton className="pdi-btn-amber pdi-btn-lg pdi-btn-block" type="submit">Log in</RippleButton>
//           <p className="pdi-muted" style={{ fontSize: 12.5, textAlign: "center" }}>
//             This is a demo screen — wire it to your report backend.
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Footer                                                                */
// /* ------------------------------------------------------------------ */

// function Footer({ onNavigate, onOpenLogin }) {
//   const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   return (
//     <footer className="pdi-footer">
//       <div className="pdi-footer-glow" aria-hidden="true" />

//       <div className="pdi-shell pdi-footer-grid-new">
//         <div className="pdi-footer-brand-col">
//           <div className="pdi-logo pdi-footer-logo">
//             <img className="pdi-brand-logo pdi-footer-brand-logo" src={pdiCarVisionLogo} alt="PDI Car Vision" />
//           </div>
//           <h3 className="pdi-footer-tagline">Exposing flaws.<br />Protecting buyers.</h3>
//           <p className="pdi-footer-desc">
//             Independent pre-delivery inspection for new car buyers — 3,200+
//             checkpoints, one clear report, zero dealer influence.
//           </p>
//           <button className="pdi-footer-cta" onClick={() => onNavigate("contact")}>
//             <IconChat /> Book your car PDI today
//           </button>
//           <div className="pdi-footer-social">
//             <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}><IconFacebook /></a>
//             <a href="#" aria-label="YouTube" onClick={(e) => e.preventDefault()}><IconYoutube /></a>
//             <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}><IconInstagram /></a>
//           </div>
//         </div>

//         <div className="pdi-footer-col">
//           <h4>Brands we inspect</h4>
//           <div className="pdi-footer-underline" />
//           <div className="pdi-footer-brands-grid">
//             {BRANDS.map((b) => <span key={b} className="pdi-footer-link">{b}</span>)}
//           </div>
//         </div>

//         <div className="pdi-footer-col">
//           <h4>PDI service in</h4>
//           <div className="pdi-footer-underline" />
//           <ul className="pdi-footer-list">
//             {CITIES.map((c) => (
//               <li key={c}><span className="pdi-footer-link">PDI Service in {c}</span></li>
//             ))}
//           </ul>
//         </div>

//         <div className="pdi-footer-col">
//           <h4>Get in touch</h4>
//           <div className="pdi-footer-underline" />
//           <div className="pdi-footer-contact-row"><IconPhone /><span>+91 98-XXXX-XXXX</span></div>
//           <div className="pdi-footer-contact-row"><IconMail /><span>hello@pdicarvision.in</span></div>
//           <div className="pdi-footer-contact-row"><IconClock /><span>Monday – Saturday<br />10:00 AM – 6:30 PM</span></div>
//           <div className="pdi-footer-contact-row"><IconPin /><span>Your office address line 1, Area,<br />City, State – PIN</span></div>
//           <button className="pdi-footer-outline-btn" onClick={onOpenLogin}>
//             Get your PDI report <span aria-hidden="true">→</span>
//           </button>
//         </div>
//       </div>

//       <div className="pdi-footer-bottom-new">
//         <div className="pdi-shell pdi-footer-links-row">
//           <span onClick={() => onNavigate("home")}>Home</span>
//           <span onClick={() => onNavigate("about")}>About</span>
//           <span onClick={() => onNavigate("services")}>Services</span>
//           <span onClick={() => onNavigate("contact")}>Contact</span>
//           <span>Privacy Policy</span>
//           <span>Terms &amp; Conditions</span>
//         </div>
//         <div className="pdi-shell pdi-footer-copy-row">
//           <span>© 2026 PDICARVISI👁️N. All rights reserved.</span>
//           <button className="pdi-footer-top-btn" onClick={scrollTop} aria-label="Back to top">
//             <IconArrowUp />
//           </button>
//         </div>
//       </div>
//     </footer>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* WhatsApp floating button                                             */
// /* ------------------------------------------------------------------ */

// function WhatsAppButton() {
//   return (
//     <a
//       className="pdi-whatsapp"
//       href={`https://wa.me/${WHATSAPP_NUMBER}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label="Chat on WhatsApp"
//     >
//       <span className="pdi-whatsapp-ring" aria-hidden="true" />
//       <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
//         <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.53 3.69-8.22 8.25-8.22 2.2 0 4.27.86 5.83 2.42a8.17 8.17 0 0 1 2.41 5.81c0 4.53-3.69 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z"/>
//       </svg>
//     </a>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Root: header, footer, routing                                        */
// /* ------------------------------------------------------------------ */

// const ROUTES = { "": "home", about: "about", services: "services", contact: "contact" };

// function routeFromHash() {
//   const h = window.location.hash.replace(/^#\/?/, "");
//   return ROUTES[h] || "home";
// }

// export default function CarPDISite() {
//   const [page, setPage] = useState("home");
//   const [navOpen, setNavOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     setPage(routeFromHash());
//     const onHash = () => setPage(routeFromHash());
//     window.addEventListener("hashchange", onHash);
//     return () => window.removeEventListener("hashchange", onHash);
//   }, []);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 8);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const navigate = (p) => {
//     window.location.hash = p === "home" ? "" : `/${p}`;
//     setPage(p);
//     setNavOpen(false);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="pdi">
//       <style>{CSS}</style>

//       <div className="pdi-ticker">
//         <div className="pdi-ticker-track">
//           Inspections available in {CITIES.join(" · ")} — ₹2,499 onward. Terms apply.
//         </div>
//       </div>

//       <header className={`pdi-header ${scrolled ? "is-scrolled" : ""}`}>
//         <div className="pdi-shell pdi-header-row">
//           <button className="pdi-logo pdi-logo-btn" onClick={() => navigate("home")} aria-label="PDI Car Vision home">
//             <img className="pdi-brand-logo" src={pdiCarVisionLogo} alt="PDI Car Vision" />
//           </button>

//           <nav className={`pdi-nav ${navOpen ? "is-open" : ""}`}>
//             <button className={page === "home" ? "is-active" : ""} onClick={() => navigate("home")}>Home</button>
//             <button className={page === "about" ? "is-active" : ""} onClick={() => navigate("about")}>About</button>
//             <button className={page === "services" ? "is-active" : ""} onClick={() => navigate("services")}>Services</button>
//             <button className={page === "contact" ? "is-active" : ""} onClick={() => navigate("contact")}>Contact</button>
//             <button className="pdi-nav-report" onClick={() => setLoginOpen(true)}>Get PDI Report</button>
//           </nav>

//           <div className="pdi-header-actions">
//             <button className="pdi-btn pdi-btn-outline" onClick={() => setLoginOpen(true)}>Get PDI Report</button>
//             <RippleButton className="pdi-btn-amber" onClick={() => navigate("contact")}>Book Inspection</RippleButton>
//             <button className={`pdi-nav-toggle ${navOpen ? "is-open" : ""}`} aria-label="Toggle navigation" onClick={() => setNavOpen((v) => !v)}>
//               <span /><span /><span />
//             </button>
//           </div>
//         </div>
//       </header>

//       <main>
//         {page === "home" && <HomePage onNavigate={navigate} />}
//         {page === "about" && <AboutPage onNavigate={navigate} />}
//         {page === "services" && <ServicesPage onNavigate={navigate} />}
//         {page === "contact" && <ContactPage />}
//       </main>

//       <Footer onNavigate={navigate} onOpenLogin={() => setLoginOpen(true)} />

//       <WhatsAppButton />
//       {loginOpen && <ReportLoginModal onClose={() => setLoginOpen(false)} />}
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Styles                                                               */
// /* ------------------------------------------------------------------ */

// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

// .pdi {
//   --bg: #07111f;
//   --bg-2: #0b1728;
//   --surface: #0e1d31;
//   --surface-2: #12243b;
//   --surface-3: #172c46;
//   --text: #f4f7fb;
//   --muted: #91a2b8;
//   --line: rgba(255,255,255,.10);
//   --line-strong: rgba(255,255,255,.16);
//   --accent: #ffb84d;
//   --accent-2: #ff8a3d;
//   --success: #4ade80;
//   --danger: #fb7185;
//   --shadow: 0 24px 70px rgba(0,0,0,.28);
//   min-height: 100vh;
//   background:
//     radial-gradient(circle at 80% 0%, rgba(255,184,77,.09), transparent 28%),
//     radial-gradient(circle at 0% 35%, rgba(44,117,255,.08), transparent 28%),
//     var(--bg);
//   color: var(--text);
//   font-family: 'DM Sans', sans-serif;
//   line-height: 1.55;
//   overflow-x: hidden;
// }

// .pdi *, .pdi *::before, .pdi *::after { box-sizing: border-box; }
// .pdi h1, .pdi h2, .pdi h3, .pdi h4 {
//   font-family: 'Space Grotesk', sans-serif;
//   letter-spacing: -.035em;
// }
// .pdi h1, .pdi h2, .pdi h3, .pdi p { margin-top: 0; }
// .pdi a { color: inherit; text-decoration: none; }
// .pdi button, .pdi input { font: inherit; }
// .pdi button { color: inherit; }
// .pdi-shell { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
// .pdi-amber { color: var(--accent); }
// .pdi-muted { color: var(--muted); }

// .pdi-reveal {
//   opacity: 0;
//   transform: translateY(24px);
//   transition: opacity .65s cubic-bezier(.2,.7,.2,1), transform .65s cubic-bezier(.2,.7,.2,1);
// }
// .pdi-reveal.is-visible { opacity: 1; transform: translateY(0); }

// .pdi-hero-anim {
//   opacity: 0;
//   animation: pdiHeroIn .8s cubic-bezier(.2,.7,.2,1) forwards;
// }
// @keyframes pdiHeroIn {
//   from { opacity: 0; transform: translateY(24px); }
//   to { opacity: 1; transform: translateY(0); }
// }

// .pdi-ticker {
//   position: relative;
//   z-index: 50;
//   background: linear-gradient(90deg, #ff9f43, #ffc45c, #ff9f43);
//   color: #1b1308;
//   font-size: 12px;
//   font-weight: 800;
//   letter-spacing: .04em;
//   text-transform: uppercase;
//   padding: 8px 0;
//   overflow: hidden;
//   white-space: nowrap;
// }
// .pdi-ticker-track {
//   text-align: center;
//   padding: 0 16px;
// }

// .pdi-header {
//   position: sticky;
//   top: 0;
//   z-index: 40;
//   background: rgba(7,17,31,.72);
//   backdrop-filter: blur(18px);
//   -webkit-backdrop-filter: blur(18px);
//   border-bottom: 1px solid transparent;
//   transition: .25s ease;
// }
// .pdi-header.is-scrolled {
//   background: rgba(7,17,31,.92);
//   border-bottom-color: var(--line);
//   box-shadow: 0 12px 35px rgba(0,0,0,.18);
// }
// .pdi-header-row {
//   min-height: 104px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 24px;
// }
// .pdi-logo {
//   display: inline-flex;
//   align-items: center;
//   flex: 0 0 auto;
// }
// .pdi-logo-btn {
//   background: none;
//   border: 0;
//   padding: 0;
//   cursor: pointer;
//   line-height: 0;
// }
// .pdi-brand-logo {
//   display: block;
//   width: 286px;
//   height: auto;
//   max-height: 116px;
//   object-fit: contain;
//   object-position: left center;
//   transition: transform .25s ease, filter .25s ease;
// }
// .pdi-logo-btn:hover .pdi-brand-logo {
//   transform: scale(1.025);
//   filter: drop-shadow(0 0 14px rgba(0,120,255,.18));
// }
// .pdi-footer-brand-logo {
//   width: 235px;
//   max-height: 130px;
// }


// .pdi-nav {
//   display: flex;
//   align-items: center;
//   gap: 6px;
// }
// .pdi-nav button {
//   position: relative;
//   border: 0;
//   background: transparent;
//   color: #aab8ca;
//   padding: 10px 13px;
//   border-radius: 10px;
//   cursor: pointer;
//   font-size: 13px;
//   font-weight: 600;
//   transition: .2s ease;
// }
// .pdi-nav button:hover, .pdi-nav button.is-active {
//   color: var(--text);
//   background: rgba(255,255,255,.06);
// }
// .pdi-nav button.is-active::after {
//   content: "";
//   position: absolute;
//   left: 13px;
//   right: 13px;
//   bottom: 4px;
//   height: 2px;
//   border-radius: 99px;
//   background: var(--accent);
// }
// .pdi-nav-report { display: none; color: var(--accent) !important; }

// .pdi-header-actions { display: flex; align-items: center; gap: 9px; }
// .pdi-nav-toggle {
//   display: none;
//   width: 42px;
//   height: 42px;
//   padding: 9px;
//   border: 1px solid var(--line);
//   border-radius: 10px;
//   background: rgba(255,255,255,.04);
//   cursor: pointer;
//   flex-direction: column;
//   justify-content: center;
//   gap: 5px;
// }
// .pdi-nav-toggle span {
//   width: 100%;
//   height: 2px;
//   border-radius: 10px;
//   background: var(--text);
//   transition: .25s ease;
// }
// .pdi-nav-toggle.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
// .pdi-nav-toggle.is-open span:nth-child(2) { opacity: 0; }
// .pdi-nav-toggle.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

// .pdi-btn {
//   position: relative;
//   overflow: hidden;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 44px;
//   padding: 0 17px;
//   border-radius: 11px;
//   border: 1px solid var(--line-strong);
//   background: rgba(255,255,255,.04);
//   color: var(--text);
//   font-size: 13px;
//   font-weight: 700;
//   cursor: pointer;
//   transition: transform .2s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease;
// }
// .pdi-btn:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.24); }
// .pdi-btn-amber {
//   border-color: transparent;
//   color: #1d1308;
//   background: linear-gradient(135deg, #ffd16f, #ff9e43);
//   box-shadow: 0 10px 30px rgba(255,160,65,.20);
// }
// .pdi-btn-amber:hover {
//   color: #1d1308;
//   box-shadow: 0 14px 35px rgba(255,160,65,.28);
// }
// .pdi-btn-outline { background: rgba(255,255,255,.035); }
// .pdi-btn-lg { min-height: 52px; padding: 0 23px; font-size: 14px; border-radius: 13px; }
// .pdi-btn-block { width: 100%; }
// .pdi-btn:disabled { opacity: .55; cursor: not-allowed; transform: none !important; }

// .pdi-ripple {
//   position: absolute;
//   border-radius: 50%;
//   background: rgba(255,255,255,.35);
//   pointer-events: none;
//   transform: scale(0);
//   animation: pdiRipple .65s ease-out;
// }
// @keyframes pdiRipple { to { transform: scale(1); opacity: 0; } }

// .pdi-hero {
//   position: relative;
//   padding: 92px 0 76px;
//   border-bottom: 1px solid var(--line);
//   background:
//     linear-gradient(90deg, rgba(7,17,31,.96) 0%, rgba(7,17,31,.86) 46%, rgba(7,17,31,.60) 100%),
//     radial-gradient(circle at 78% 45%, rgba(255,184,77,.13), transparent 30%);
// }
// .pdi-hero::before {
//   content: "";
//   position: absolute;
//   inset: 0;
//   pointer-events: none;
//   background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
//                     linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
//   background-size: 52px 52px;
//   mask-image: linear-gradient(to bottom, black, transparent 80%);
// }
// .pdi-hero-grid {
//   position: relative;
//   z-index: 1;
//   display: grid;
//   grid-template-columns: minmax(0,1.15fr) minmax(360px,.85fr);
//   gap: 70px;
//   align-items: center;
// }
// .pdi-eyebrow {
//   display: inline-flex;
//   align-items: center;
//   gap: 9px;
//   margin: 0 0 18px;
//   color: var(--accent);
//   font-size: 11px;
//   font-weight: 800;
//   letter-spacing: .14em;
//   text-transform: uppercase;
// }
// .pdi-eyebrow::before {
//   content: "";
//   width: 24px;
//   height: 1px;
//   background: var(--accent);
// }
// .pdi-h1 {
//   max-width: 760px;
//   font-size: clamp(42px, 6vw, 72px);
//   line-height: .98;
//   margin-bottom: 24px;
// }
// .pdi-hero-copy {
//   max-width: 620px;
//   color: var(--muted);
//   font-size: 16px;
//   line-height: 1.75;
//   margin-bottom: 30px;
// }
// .pdi-hero-actions { display: flex; flex-wrap: wrap; gap: 11px; margin-bottom: 18px; }
// .pdi-hero-price { color: #8496ad; font-size: 13px; }
// .pdi-hero-price strong { color: var(--text); }

// .pdi-scan-panel {
//   position: relative;
//   overflow: hidden;
//   padding: 26px;
//   border: 1px solid rgba(255,255,255,.12);
//   border-radius: 24px;
//   background:
//     linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.025)),
//     rgba(9,24,41,.88);
//   box-shadow: var(--shadow);
//   backdrop-filter: blur(18px);
//   transition: transform .18s ease, box-shadow .3s ease;
//   will-change: transform;
// }
// .pdi-scan-panel::before {
//   content: "";
//   position: absolute;
//   width: 240px;
//   height: 240px;
//   right: -100px;
//   top: -110px;
//   border-radius: 50%;
//   background: radial-gradient(circle, rgba(255,184,77,.22), transparent 68%);
// }
// .pdi-scan-panel::after {
//   content: "";
//   position: absolute;
//   left: 0;
//   right: 0;
//   top: 64px;
//   height: 1px;
//   background: linear-gradient(90deg, transparent, rgba(255,184,77,.5), transparent);
//   opacity: .5;
// }
// .pdi-scan-head {
//   position: relative;
//   z-index: 1;
//   display: flex;
//   align-items: center;
//   gap: 9px;
//   color: #aab8ca;
//   font-size: 10px;
//   letter-spacing: .14em;
//   font-weight: 800;
//   margin-bottom: 28px;
// }
// .pdi-scan-dot {
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
//   background: var(--success);
//   box-shadow: 0 0 0 5px rgba(74,222,128,.10);
//   animation: scanPulse 1.8s ease-in-out infinite;
// }
// @keyframes scanPulse {
//   0%,100% { box-shadow: 0 0 0 4px rgba(74,222,128,.10); }
//   50% { box-shadow: 0 0 0 9px rgba(74,222,128,.03); }
// }
// .pdi-scan-big {
//   position: relative;
//   z-index: 1;
//   font-family: 'Space Grotesk', sans-serif;
//   font-size: clamp(48px, 6vw, 68px);
//   font-weight: 700;
//   letter-spacing: -.05em;
// }
// .pdi-scan-label { color: var(--muted); font-size: 12px; margin: 0 0 28px; }
// .pdi-scan-rows {
//   position: relative;
//   z-index: 1;
//   display: flex;
//   flex-direction: column;
//   gap: 0;
//   border-top: 1px solid var(--line);
// }
// .pdi-scan-row {
//   display: flex;
//   justify-content: space-between;
//   gap: 18px;
//   padding: 15px 0;
//   border-bottom: 1px solid var(--line);
//   font-size: 12px;
// }
// .pdi-scan-row span:first-child { color: var(--muted); }
// .pdi-scan-row span:last-child { color: var(--accent); font-weight: 800; }

// .pdi-banner { border-bottom: 1px solid var(--line); padding: 20px; background: var(--bg-2); }
// .pdi-banner .pdi-imgbox {
//   width: min(1320px, 100%);
//   margin: 0 auto;
//   border-radius: 22px;
//   border: 1px solid var(--line);
//   box-shadow: 0 30px 80px rgba(0,0,0,.24);
// }
// .pdi-real-img { width: 100%; height: 100%; display: block; object-fit: cover; }
// .pdi-imgbox { width: 100%; overflow: hidden; border-radius: 18px; }
// .pdi-img-placeholder {
//   width: 100%;
//   border-radius: 18px;
//   min-height: 260px;
//   background: linear-gradient(145deg, var(--surface), var(--surface-2));
//   border: 1px dashed rgba(255,255,255,.18);
//   color: var(--muted);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;
//   text-align: center;
//   padding: 20px;
//   font-size: 12px;
// }
// .pdi-img-placeholder svg { opacity: .55; }

// .pdi-section {
//   padding: 96px 0;
//   border-bottom: 1px solid var(--line);
// }
// .pdi-section-head-row {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-end;
//   gap: 24px;
//   flex-wrap: wrap;
// }
// .pdi-h2 {
//   max-width: 760px;
//   font-size: clamp(30px, 4vw, 46px);
//   line-height: 1.04;
//   margin-bottom: 38px;
// }
// .pdi-hint { color: var(--muted); font-size: 12px; margin: -24px 0 0; }

// .pdi-why-grid {
//   display: grid;
//   grid-template-columns: minmax(0,1fr) minmax(300px,.72fr);
//   gap: 70px;
//   align-items: center;
// }
// .pdi-checklist { display: grid; gap: 10px; }
// .pdi-checklist-stacked { grid-template-columns: 1fr; }
// .pdi-check-item {
//   width: 100%;
//   text-align: left;
//   border: 1px solid var(--line);
//   border-radius: 17px;
//   padding: 22px;
//   background: linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.018));
//   cursor: pointer;
//   transition: .25s ease;
// }
// .pdi-check-item:hover, .pdi-check-item.is-expanded {
//   border-color: rgba(255,184,77,.34);
//   background: linear-gradient(145deg, rgba(255,184,77,.08), rgba(255,255,255,.025));
//   transform: translateX(4px);
// }
// .pdi-check-tick {
//   display: flex;
//   align-items: center;
//   gap: 7px;
//   color: var(--accent);
//   font-size: 10px;
//   letter-spacing: .1em;
//   text-transform: uppercase;
//   font-weight: 800;
//   margin-bottom: 10px;
// }
// .pdi-check-item h3 { font-size: 19px; margin-bottom: 7px; }
// .pdi-check-item p, .pdi-check-extra {
//   color: var(--muted);
//   font-size: 13.5px;
//   line-height: 1.65;
//   margin: 0;
// }
// .pdi-service-head {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 10px;
//   margin-bottom: 7px;
// }
// .pdi-chevron { color: var(--accent); transition: transform .3s ease; }
// .is-expanded .pdi-chevron { transform: rotate(180deg); }
// .pdi-collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; }
// .pdi-collapse-inner { min-height: 0; overflow: hidden; }
// .is-expanded .pdi-collapse { grid-template-rows: 1fr; margin-top: 13px; }

// .pdi-service-grid, .pdi-service-grid-full {
//   display: grid;
//   grid-template-columns: repeat(3,1fr);
//   gap: 14px;
//   background: transparent;
//   border: 0;
// }
// .pdi-service-grid-full { grid-template-columns: repeat(2,1fr); }
// .pdi-service {
//   position: relative;
//   overflow: hidden;
//   min-height: 100%;
//   padding: 16px;
//   border: 1px solid var(--line);
//   border-radius: 20px;
//   background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018));
//   transition: .3s ease;
// }
// .pdi-service::after {
//   content: "";
//   position: absolute;
//   inset: 0;
//   border-radius: inherit;
//   pointer-events: none;
//   background: linear-gradient(135deg, rgba(255,184,77,.10), transparent 35%);
//   opacity: 0;
//   transition: opacity .3s ease;
// }
// .pdi-service-interactive:hover {
//   transform: translateY(-7px);
//   border-color: rgba(255,184,77,.30);
//   box-shadow: 0 24px 45px rgba(0,0,0,.22);
//   z-index: 2;
// }
// .pdi-service-interactive:hover::after, .pdi-service.is-expanded::after { opacity: 1; }
// .pdi-service h3 { position: relative; z-index: 1; font-size: 17px; margin-bottom: 4px; }
// .pdi-service p { position: relative; z-index: 1; color: var(--muted); font-size: 12.5px; margin: 0; }
// .pdi-service-img {
//   position: relative;
//   z-index: 1;
//   margin-bottom: 17px;
//   border-radius: 14px;
// }
// .pdi-service-interactive .pdi-real-img { transition: transform .6s cubic-bezier(.2,.7,.2,1); }
// .pdi-service-interactive:hover .pdi-real-img { transform: scale(1.055); }
// .pdi-service-points {
//   position: relative;
//   z-index: 1;
//   margin: 0;
//   padding-left: 18px;
//   color: #aab8ca;
//   font-size: 12px;
//   display: flex;
//   flex-direction: column;
//   gap: 7px;
// }

// .pdi-quote-section { background: linear-gradient(180deg, rgba(255,255,255,.02), transparent); }
// .pdi-quote-box {
//   max-width: 850px;
//   padding: 38px;
//   border: 1px solid var(--line);
//   border-radius: 24px;
//   background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018));
//   box-shadow: 0 22px 55px rgba(0,0,0,.18);
// }
// .pdi-quote-text {
//   font-family: 'Space Grotesk', sans-serif;
//   font-size: clamp(22px, 3vw, 34px);
//   line-height: 1.3;
//   letter-spacing: -.035em;
//   margin-bottom: 24px;
// }
// .pdi-quote-meta-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
// .pdi-quote-meta-row > div:last-child > span:first-child { font-weight: 700; }
// .pdi-avatar-placeholder {
//   width: 44px; height: 44px;
//   border-radius: 50%;
//   border: 1px solid rgba(255,184,77,.35);
//   background: rgba(255,184,77,.08);
//   color: var(--accent);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 800;
// }
// .pdi-quote-progress {
//   height: 3px;
//   max-width: 280px;
//   background: var(--line);
//   border-radius: 99px;
//   overflow: hidden;
//   margin-bottom: 18px;
// }
// .pdi-quote-progress-fill {
//   height: 100%;
//   width: 0;
//   background: linear-gradient(90deg, var(--accent-2), var(--accent));
//   animation: quoteFill 5s linear forwards;
// }
// @keyframes quoteFill { to { width: 100%; } }
// .pdi-quote-dots { display: flex; gap: 8px; }
// .pdi-dot {
//   width: 8px; height: 8px;
//   border: 0;
//   border-radius: 50%;
//   background: #314158;
//   cursor: pointer;
//   padding: 0;
//   transition: .2s ease;
// }
// .pdi-dot.is-active { width: 24px; border-radius: 99px; background: var(--accent); }

// .pdi-brands {
//   padding: 28px 0;
//   background: #06101d;
//   border-bottom: 1px solid var(--line);
// }
// .pdi-brands-row {
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   gap: 16px 28px;
//   color: #71839a;
//   font-size: 12px;
//   font-weight: 700;
// }

// .pdi-page-hero {
//   padding: 82px 0 46px;
//   border-bottom: 1px solid var(--line);
//   background:
//     radial-gradient(circle at 70% 0%, rgba(255,184,77,.10), transparent 30%),
//     var(--bg);
// }
// .pdi-page-hero .pdi-h1 { font-size: clamp(38px,5vw,60px); }
// .pdi-about-hero-grid {
//   display: grid;
//   grid-template-columns: minmax(0,1fr) minmax(300px,.65fr);
//   gap: 70px;
//   align-items: center;
// }
// .pdi-process-banner {
//   margin-bottom: 34px;
//   max-width: 760px;
//   border-radius: 22px;
// }
// .pdi-stat-grid {
//   display: grid;
//   grid-template-columns: repeat(4,1fr);
//   gap: 12px;
//   background: transparent;
//   border: 0;
// }
// .pdi-stat {
//   padding: 26px;
//   border: 1px solid var(--line);
//   border-radius: 18px;
//   background: linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.018));
// }
// .pdi-stat-num {
//   font-family: 'Space Grotesk', sans-serif;
//   font-size: 34px;
//   font-weight: 700;
//   color: var(--accent);
//   letter-spacing: -.04em;
// }
// .pdi-stat div:last-child { color: var(--muted); font-size: 12px; margin-top: 6px; }

// .pdi-stepper { margin-top: 8px; }
// .pdi-stepper-track {
//   position: relative;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
//   padding: 0 5px;
// }
// .pdi-stepper-track-bg {
//   position: absolute;
//   left: 20px; right: 20px; top: 50%;
//   height: 2px;
//   background: var(--line);
//   transform: translateY(-50%);
// }
// .pdi-stepper-track-fill {
//   position: absolute;
//   left: 20px; top: 50%;
//   height: 2px;
//   background: linear-gradient(90deg, var(--accent-2), var(--accent));
//   transform: translateY(-50%);
//   transition: width .35s ease;
// }
// .pdi-stepper-dot {
//   position: relative;
//   z-index: 2;
//   width: 42px; height: 42px;
//   border-radius: 50%;
//   border: 1px solid var(--line-strong);
//   background: var(--surface);
//   color: var(--muted);
//   font-family: 'Space Grotesk', sans-serif;
//   font-weight: 700;
//   cursor: pointer;
//   transition: .25s ease;
// }
// .pdi-stepper-dot:hover { transform: scale(1.08); }
// .pdi-stepper-dot.is-passed { border-color: rgba(255,184,77,.5); color: var(--accent); }
// .pdi-stepper-dot.is-current {
//   border-color: var(--accent);
//   background: var(--accent);
//   color: #1c1308;
//   box-shadow: 0 0 0 6px rgba(255,184,77,.10);
// }
// .pdi-stepper-labels {
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 20px;
// }
// .pdi-stepper-label {
//   flex: 1;
//   border: 0;
//   background: none;
//   color: var(--muted);
//   cursor: pointer;
//   font-size: 12px;
//   font-weight: 700;
// }
// .pdi-stepper-label.is-current { color: var(--text); }
// .pdi-stepper-panel {
//   padding: 26px;
//   border: 1px solid var(--line);
//   border-radius: 18px;
//   background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018));
//   animation: panelIn .35s ease;
// }
// @keyframes panelIn { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
// .pdi-process-num { color: var(--accent); font-family: 'Space Grotesk', sans-serif; font-weight: 800; margin-bottom: 8px; }
// .pdi-stepper-panel h3 { font-size: 22px; margin-bottom: 7px; }
// .pdi-stepper-panel p { color: var(--muted); font-size: 13.5px; margin: 0; }

// .pdi-cta-strip {
//   padding: 54px 0;
//   background:
//     radial-gradient(circle at 85% 50%, rgba(255,184,77,.14), transparent 25%),
//     var(--surface);
//   border-bottom: 1px solid var(--line);
// }
// .pdi-cta-row { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
// .pdi-cta-row .pdi-h2 { font-size: 30px; margin: 0 0 6px; }

// .pdi-contact {
//   min-height: 70vh;
//   display: flex;
//   align-items: center;
// }
// .pdi-contact-grid {
//   display: grid;
//   grid-template-columns: minmax(0,.9fr) minmax(360px,.75fr);
//   gap: 70px;
//   align-items: start;
// }
// .pdi-contact-info {
//   display: grid;
//   gap: 12px;
//   margin-top: 28px;
//   color: #a6b5c8;
//   font-size: 13px;
// }
// .pdi-form {
//   padding: 28px;
//   border: 1px solid var(--line-strong);
//   border-radius: 22px;
//   background: linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.025));
//   box-shadow: var(--shadow);
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// }
// .pdi-form label { display: flex; flex-direction: column; gap: 7px; color: #9eafc2; font-size: 12px; font-weight: 700; }
// .pdi-form input {
//   width: 100%;
//   min-height: 48px;
//   padding: 0 13px;
//   border: 1px solid var(--line-strong);
//   border-radius: 11px;
//   background: rgba(2,10,19,.38);
//   color: var(--text);
//   outline: none;
//   transition: .2s ease;
// }
// .pdi-form input::placeholder { color: #5f7187; }
// .pdi-form input:focus {
//   border-color: rgba(255,184,77,.65);
//   box-shadow: 0 0 0 4px rgba(255,184,77,.09);
// }
// .pdi-form-success { padding: 28px 10px; text-align: center; }
// .pdi-form-success strong { color: var(--accent); font-size: 17px; display: block; margin-top: 8px; }
// .pdi-form-success p { color: var(--muted); font-size: 13px; }
// .pdi-form-error { color: var(--danger); font-size: 12px; margin: 0; }
// .pdi-success-check { display: flex; justify-content: center; }
// .pdi-success-circle { stroke: var(--success); stroke-width: 2.5; stroke-dasharray: 145; stroke-dashoffset: 145; animation: successCircle .5s ease forwards; }
// .pdi-success-tick { stroke: var(--success); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 32; stroke-dashoffset: 32; animation: successTick .35s ease forwards .45s; }
// @keyframes successCircle { to { stroke-dashoffset: 0; } }
// @keyframes successTick { to { stroke-dashoffset: 0; } }
// .pdi-shake { animation: formShake .45s ease; }
// @keyframes formShake {
//   10%,90% { transform: translateX(-2px); }
//   20%,80% { transform: translateX(4px); }
//   30%,50%,70% { transform: translateX(-7px); }
//   40%,60% { transform: translateX(7px); }
// }

// .pdi-footer {
//   --f-line: rgba(255,255,255,.09);
//   --f-muted: #71839a;
//   position: relative;
//   overflow: hidden;
//   color: var(--text);
//   background:
//     radial-gradient(circle at 90% 10%, rgba(255,184,77,.10), transparent 25%),
//     linear-gradient(180deg, #07111f, #040b14);
//   padding-top: 1px;
// }
// .pdi-footer::before {
//   content: "";
//   display: block;
//   height: 1px;
//   background: linear-gradient(90deg, transparent, var(--accent), transparent);
// }
// .pdi-footer-glow { position: absolute; inset: 0; pointer-events: none; }
// .pdi-footer-glow::before {
//   content: "";
//   position: absolute;
//   width: 600px; height: 600px;
//   right: -250px; bottom: -300px;
//   border-radius: 50%;
//   background: radial-gradient(circle, rgba(255,184,77,.08), transparent 68%);
// }
// .pdi-footer-grid-new {
//   position: relative;
//   z-index: 1;
//   display: grid;
//   grid-template-columns: 1.25fr 1fr 1fr 1fr;
//   gap: 42px;
//   padding: 70px 0 52px;
// }
// .pdi-footer-logo { color: var(--text); }
// .pdi-footer-tagline { font-size: 27px; line-height: 1.1; margin: 20px 0 14px; }
// .pdi-footer-desc { max-width: 38ch; color: var(--f-muted); font-size: 13px; margin-bottom: 22px; }
// .pdi-footer-cta {
//   display: inline-flex;
//   align-items: center;
//   gap: 9px;
//   border: 0;
//   border-radius: 12px;
//   padding: 12px 16px;
//   background: var(--accent);
//   color: #1d1308;
//   font-weight: 800;
//   font-size: 12px;
//   cursor: pointer;
//   transition: .2s ease;
// }
// .pdi-footer-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(255,184,77,.20); }
// .pdi-footer-social { display: flex; gap: 8px; margin-top: 20px; }
// .pdi-footer-social a {
//   width: 36px; height: 36px;
//   border: 1px solid var(--line);
//   border-radius: 10px;
//   display: flex; align-items: center; justify-content: center;
//   color: #a9b7c9;
//   background: rgba(255,255,255,.03);
//   transition: .2s ease;
// }
// .pdi-footer-social a:hover { color: #1d1308; background: var(--accent); border-color: var(--accent); transform: translateY(-2px); }
// .pdi-footer-col h4 {
//   margin: 0;
//   color: var(--text);
//   font-size: 11px;
//   letter-spacing: .12em;
//   text-transform: uppercase;
// }
// .pdi-footer-underline { width: 28px; height: 2px; background: var(--accent); margin: 12px 0 20px; }
// .pdi-footer-brands-grid {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 10px 20px;
//   font-size: 12px;
// }
// .pdi-footer-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; font-size: 12px; }
// .pdi-footer-link { color: var(--f-muted); transition: .2s ease; }
// .pdi-footer-list .pdi-footer-link:hover { color: var(--text); transform: translateX(2px); }
// .pdi-footer-contact-row {
//   display: flex;
//   align-items: flex-start;
//   gap: 10px;
//   color: var(--f-muted);
//   font-size: 12px;
//   margin-bottom: 14px;
// }
// .pdi-footer-contact-row svg { flex-shrink: 0; color: var(--accent); }
// .pdi-footer-outline-btn {
//   display: inline-flex;
//   align-items: center;
//   gap: 8px;
//   border: 1px solid var(--line-strong);
//   border-radius: 10px;
//   padding: 10px 13px;
//   background: rgba(255,255,255,.03);
//   color: var(--text);
//   font-size: 12px;
//   font-weight: 700;
//   cursor: pointer;
//   transition: .2s ease;
// }
// .pdi-footer-outline-btn:hover { border-color: var(--accent); color: var(--accent); }
// .pdi-footer-bottom-new { position: relative; z-index: 1; border-top: 1px solid var(--f-line); }
// .pdi-footer-links-row {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   padding: 20px 0 16px;
//   color: var(--f-muted);
//   font-size: 11px;
// }
// .pdi-footer-links-row span { cursor: pointer; }
// .pdi-footer-links-row span:hover { color: var(--text); }
// .pdi-footer-copy-row {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 16px;
//   padding: 0 0 24px;
//   color: var(--f-muted);
//   font-size: 11px;
// }
// .pdi-footer-top-btn {
//   width: 38px; height: 38px;
//   display: flex; align-items: center; justify-content: center;
//   border: 1px solid var(--line);
//   border-radius: 10px;
//   background: rgba(255,255,255,.03);
//   cursor: pointer;
//   transition: .2s ease;
// }
// .pdi-footer-top-btn:hover { color: #1d1308; background: var(--accent); border-color: var(--accent); }

// .pdi-whatsapp {
//   position: fixed;
//   right: 22px;
//   bottom: 22px;
//   z-index: 45;
//   width: 58px; height: 58px;
//   border-radius: 17px;
//   background: #25d366;
//   color: #062511;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 12px 30px rgba(37,211,102,.25);
//   transition: .2s ease;
// }
// .pdi-whatsapp:hover { transform: translateY(-4px) scale(1.03); }
// .pdi-whatsapp-ring {
//   position: absolute;
//   inset: -6px;
//   border-radius: 21px;
//   border: 1px solid #25d366;
//   animation: pulseRing 2.2s ease-out infinite;
// }
// @keyframes pulseRing {
//   0% { transform: scale(.9); opacity: .55; }
//   100% { transform: scale(1.45); opacity: 0; }
// }

// .pdi-modal-overlay {
//   position: fixed;
//   inset: 0;
//   z-index: 100;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
//   background: rgba(1,7,14,.76);
//   backdrop-filter: blur(14px);
//   animation: overlayIn .2s ease;
// }
// @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
// .pdi-modal {
//   width: min(430px,100%);
//   position: relative;
//   padding: 30px;
//   border: 1px solid var(--line-strong);
//   border-radius: 22px;
//   background: linear-gradient(145deg, #102137, #091626);
//   box-shadow: 0 30px 90px rgba(0,0,0,.45);
//   animation: modalIn .25s ease;
// }
// @keyframes modalIn {
//   from { opacity: 0; transform: translateY(15px) scale(.97); }
//   to { opacity: 1; transform: translateY(0) scale(1); }
// }
// .pdi-modal-close {
//   position: absolute;
//   top: 15px; right: 15px;
//   width: 36px; height: 36px;
//   border: 1px solid var(--line);
//   border-radius: 10px;
//   background: rgba(255,255,255,.04);
//   color: var(--muted);
//   font-size: 21px;
//   cursor: pointer;
//   transition: .2s ease;
// }
// .pdi-modal-close:hover { color: var(--text); transform: rotate(90deg); }

// @media (prefers-reduced-motion: reduce) {
//   .pdi-reveal { opacity: 1; transform: none; transition: none; }
//   .pdi-hero-anim { animation: none; opacity: 1; }
//   .pdi-scan-dot, .pdi-whatsapp-ring, .pdi-quote-progress-fill { animation: none; }
//   .pdi * { scroll-behavior: auto !important; }
// }

// @media (max-width: 980px) {
//   .pdi-nav { display: none; }
//   .pdi-nav.is-open {
//     position: fixed;
//     left: 0; right: 0; top: 78px;
//     display: flex;
//     flex-direction: column;
//     align-items: stretch;
//     gap: 4px;
//     padding: 14px 20px 20px;
//     background: rgba(7,17,31,.98);
//     border-bottom: 1px solid var(--line);
//     box-shadow: 0 20px 40px rgba(0,0,0,.25);
//   }
//   .pdi-nav.is-open button { text-align: left; padding: 13px; }
//   .pdi-nav-report { display: block; }
//   .pdi-header-actions > .pdi-btn { display: none; }
//   .pdi-nav-toggle { display: flex; }
//   .pdi-hero-grid, .pdi-contact-grid, .pdi-why-grid, .pdi-about-hero-grid {
//     grid-template-columns: 1fr;
//   }
//   .pdi-hero-grid { gap: 44px; }
//   .pdi-why-grid { gap: 38px; }
//   .pdi-service-grid { grid-template-columns: repeat(2,1fr); }
//   .pdi-service-grid-full { grid-template-columns: 1fr 1fr; }
//   .pdi-stat-grid { grid-template-columns: repeat(2,1fr); }
//   .pdi-footer-grid-new { grid-template-columns: repeat(2,1fr); }
// }

// @media (max-width: 680px) {
//   .pdi-brand-logo { width: 210px; max-height: 84px; }
//   .pdi-shell { width: min(100% - 28px, 1180px); }
//   .pdi-header-row { min-height: 82px; }
//   .pdi-nav.is-open { top: 82px; }
//   .pdi-hero { padding: 62px 0 58px; }
//   .pdi-h1 { font-size: 42px; }
//   .pdi-h2 { font-size: 31px; }
//   .pdi-banner { padding: 10px; }
//   .pdi-banner .pdi-imgbox { border-radius: 15px; }
//   .pdi-section { padding: 70px 0; }
//   .pdi-service-grid, .pdi-service-grid-full { grid-template-columns: 1fr; }
//   .pdi-stat-grid { grid-template-columns: 1fr 1fr; }
//   .pdi-stepper-labels { display: none; }
//   .pdi-cta-row { align-items: flex-start; flex-direction: column; }
//   .pdi-footer-grid-new { grid-template-columns: 1fr; gap: 34px; padding: 55px 0 40px; }
//   .pdi-footer-brands-grid { grid-template-columns: 1fr 1fr; }
//   .pdi-footer-copy-row { flex-direction: column; align-items: flex-start; }
//   .pdi-whatsapp { width: 54px; height: 54px; right: 14px; bottom: 14px; border-radius: 15px; }
//   .pdi-modal { padding: 24px; }
// }

// @media (max-width: 440px) {
//   .pdi-brand-logo { width: 178px; }
//   .pdi-stat-grid { grid-template-columns: 1fr; }
//   .pdi-h1 { font-size: 37px; }
//   .pdi-hero-actions { flex-direction: column; align-items: stretch; }
//   .pdi-hero-actions .pdi-btn { width: 100%; }
//   .pdi-scan-panel { padding: 21px; border-radius: 18px; }
// }
// `;





































import React, { useState, useEffect, useRef, useCallback } from "react";

import serviceEngine from "./images/service-engine.png";
import serviceMechanical from "./images/service-mechanical.png";
import serviceElectronics from "./images/service-electronics.png";
import servicepaint from "./images/service-paint.png";
import servicebattery from "./images/service-battery.png";
import serviceinterior from "./images/service-interior.png";
import bannerYard from "./images/banner-yard.png";
import diagnosticCloseup from "./images/diagnostic-closeup.png";
import servicereport from  "./images/service-report.png";
import pdiCarVisionLogo from "./images/pdi-car-vision-logo.png";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const CITIES = [
  "Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad", "Manesar",
  "Sohna", "Bahadurgarh", "Meerut", "Panipat", "Rohtak", "Hisar",
];

const WHY_US = [
  {
    tick: "3,200+ checkpoints",
    title: "Nothing is eyeballed",
    body:
      "Every panel gap, torque value, fluid level and sensor reading is logged against a fixed checklist, not a technician's gut feel.",
    detail:
      "Every checklist item maps to a specific tool reading or reference photo, so two technicians inspecting the same car produce the same flags — the report doesn't depend on who showed up that day.",
  },
  {
    tick: "Independent, always",
    title: "No dealer, no manufacturer tie-ups",
    body:
      "We're paid by the buyer, not the showroom. If a car has a paint touch-up or a misaligned bumper, the report says so.",
    detail:
      "We turn down commissions and referral fees from dealers and workshops. The report goes to you first, in full, before anyone at the dealership sees it.",
  },
  {
    tick: "Diagnostic-grade tools",
    title: "OBD scanners, paint-depth gauges, thermal checks",
    body:
      "The same instrument-led process a workshop would use for a warranty claim — run before you take delivery, not after.",
    detail:
      "Calibrated hardware, not a flashlight and a checklist on a phone. Readings are logged directly from the tool, so there's no rounding up or eyeballing a gauge.",
  },
];

const SERVICES = [
  {
    code: "EN-01",
    name: "Engine & drivetrain diagnosis",
    desc: "Compression, idle behaviour, fluid condition, leak checks.",
    points: ["Engine oil level & condition", "Coolant level & leak check", "Idle stability & unusual noise scan"],
    img: serviceEngine,
  },
  {
    code: "MC-02",
    name: "Mechanical & suspension scan",
    desc: "Underbody, brakes, steering linkages, wheel alignment.",
    points: ["Underbody corrosion & damage check", "Brake pad thickness & disc condition", "Steering play & suspension bushings"],
    img: serviceMechanical,
  },
  {
    code: "EC-03",
    name: "Electronics & ECU read-out",
    desc: "OBD fault codes, infotainment, sensors, software version.",
    points: ["OBD-II fault code scan", "Infotainment & camera function check", "Sensor calibration read-out"],
    img: serviceElectronics,
  },
  {
    code: "BT-04",
    name: "Battery & tyre health",
    desc: "Cranking voltage, charge state, tread depth, manufacture date.",
    points: ["Battery voltage & load test", "Tyre tread depth, all 4 + spare", "Tyre manufacture date check"],
    img: servicebattery,
  },
  {
    code: "PT-05",
    name: "Paint & body diagnosis",
    desc: "Paint-depth gauge scan for repainted or repaired panels.",
    points: ["Paint thickness scan, all panels", "Panel gap & alignment check", "Dent, scratch & touch-up log"],
    img: servicepaint,
  },
  {
    code: "IN-06",
    name: "Interior & fitment check",
    desc: "Panel gaps, upholstery, electricals, accessory fitment.",
    points: ["Upholstery & trim inspection", "Power windows, AC & electricals", "Accessory & kit fitment check"],
    img: serviceinterior,
  },
];

const PROCESS_STEPS = [
  { n: "01", title: "Book a slot", body: "Share your delivery date, dealer location and car variant." },
  { n: "02", title: "We inspect at the yard", body: "A technician runs the full checklist before you take delivery." },
  { n: "03", title: "You get the report", body: "A clear, itemised report within 24 hours — photos included." },
  { n: "04", title: "You decide", body: "Accept the car, ask the dealer to fix issues, or walk away informed." },
];

const TESTIMONIALS = [
  {
    quote:
      "The report flagged a repainted rear quarter panel the showroom never mentioned. Saved me from a bad delivery day.",
    name: "Karan Mehta",
    car: "New SUV, top variant",
  },
  {
    quote:
      "Technician walked me through every checkpoint on call before I signed the delivery form. Worth every rupee.",
    name: "Priya Nair",
    car: "New hatchback",
  },
  {
    quote:
      "Found a low coolant level and a loose battery terminal — both fixed by the dealer before I took the car home.",
    name: "Sameer Bhalla",
    car: "New sedan",
  },
];

const BRANDS = [
  "Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Kia", "Honda",
  "Toyota", "Skoda", "Volkswagen", "MG Motor",
  "Renault", "Nissan", "Citroen", "Jeep", "BYD", "Isuzu", "BMW", "Audi",
  "Mercedes-Benz", "Force Motors",
];

const WHATSAPP_NUMBER = "918800769789"; // placeholder — replace with client's number

/* Opens WhatsApp with a prefilled message. Used by every "Book" CTA so
   they all go straight to WhatsApp instead of the Contact page. */
function openWhatsApp(message = "Hi, I'd like to book a PDI for my new car.") {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

/* ------------------------------------------------------------------ */
/* Interaction hooks                                                    */
/* ------------------------------------------------------------------ */

/* Fires once, the first time the wrapped element enters the viewport. */
function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* Scroll-reveal wrapper. One orchestrated fade+rise per block, not per
   line — pass `delay` (ms) to stagger siblings such as a card grid. */
function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`pdi-reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

/* Eases a number up from 0 to `target` once `active` becomes true. */
function useCountUp(target, active, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

/* Subtle cursor-tilt for a "device" panel — used once, on the hero's
   live read-out card, so it reads as a deliberate touch, not decoration. */
function useTilt(ref, strength = 6) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, strength]);
}

/* ------------------------------------------------------------------ */
/* Small line icons — generic pictograms, no brand artwork                */
/* ------------------------------------------------------------------ */

function IconPhone(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function IconMail(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function IconClock(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
function IconPin(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconChat(props) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}
function IconArrowUp(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}
function IconFacebook(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C16.5 3.1 15.4 3 14.2 3c-2.6 0-4.4 1.6-4.4 4.5v2.3H7v3.2h2.8v8h3.7Z" />
    </svg>
  );
}
function IconYoutube(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconInstagram(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Small shared bits                                                    */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }) {
  return <p className="pdi-eyebrow">{children}</p>;
}

/* Image placeholder — swap the wrapping <div>'s background for a real
   <img src="..."> once client photography or licensed stock is available. */
function ImagePlaceholder({ caption, ratio = "16/10", className = "" }) {
  return (
    <div className={`pdi-img-placeholder ${className}`} style={{ aspectRatio: ratio }}>
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <circle cx="8.5" cy="10" r="1.6" />
        <path d="M3 16l5-4.5 4 3 3.5-3L21 15" />
      </svg>
      <span>{caption}</span>
    </div>
  );
}

/* Wraps a real photo in a fixed-ratio box; a hover zoom is handled by the
   parent card's CSS (.pdi-imgbox img scales on card :hover). */
function ImageBox({ src, alt, ratio = "16/10", className = "" }) {
  return (
    <div className={`pdi-imgbox ${className}`} style={{ aspectRatio: ratio }}>
      <img src={src} alt={alt} className="pdi-real-img" />
    </div>
  );
}

/* Primary CTA button with a click ripple, so the busiest actions on the
   page (book, submit) give a clear tactile response. */
function RippleButton({ className = "", children, onClick, ...rest }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (rest.disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const ripple = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      size,
    };
    setRipples((r) => [...r, ripple]);
    window.setTimeout(() => {
      setRipples((r) => r.filter((rp) => rp.id !== ripple.id));
    }, 650);
    onClick?.(e);
  };

  return (
    <button className={`pdi-btn pdi-ripple-btn ${className}`} onClick={handleClick} {...rest}>
      <span className="pdi-btn-label">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pdi-ripple"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size, marginLeft: -r.size / 2, marginTop: -r.size / 2 }}
        />
      ))}
    </button>
  );
}

function CTAStrip() {
  return (
    <section className="pdi-cta-strip">
      <Reveal className="pdi-shell pdi-cta-row">
        <div>
          <h2 className="pdi-h2" style={{ marginBottom: 6 }}>Taking delivery this week?</h2>
          <p className="pdi-muted">Book a slot and we'll have a report ready before you sign.</p>
        </div>
        <RippleButton className="pdi-btn-amber pdi-btn-lg" onClick={() => openWhatsApp()}>
          Book Inspection
        </RippleButton>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive pieces                                                   */
/* ------------------------------------------------------------------ */

/* Expandable service card — click to reveal the exact checklist points
   for that module. Only one open at a time on the home page grid. */
function ServiceCard({ service, expanded, onToggle, ratio = "16/10" }) {
  return (
    <button
      type="button"
      className={`pdi-service pdi-service-interactive ${expanded ? "is-expanded" : ""}`}
      onClick={onToggle}
      aria-expanded={expanded}
    >
      {service.img
        ? <ImageBox src={service.img} alt={service.name} ratio={ratio} className="pdi-service-img" />
        : <ImagePlaceholder caption={`Photo: ${service.name.toLowerCase()}`} ratio={ratio} className="pdi-service-img" />}
      <div className="pdi-service-head">
        <h3>{service.name}</h3>
        <span className="pdi-chevron" aria-hidden="true">⌄</span>
      </div>
      <p>{service.desc}</p>
      <div className="pdi-collapse">
        <div className="pdi-collapse-inner">
          <ul className="pdi-service-points">
            {service.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </div>
    </button>
  );
}

/* Accordion item for the "Why choose us" checklist. */
function WhyUsItem({ item, expanded, onToggle }) {
  return (
    <button
      type="button"
      className={`pdi-check-item pdi-check-interactive ${expanded ? "is-expanded" : ""}`}
      onClick={onToggle}
      aria-expanded={expanded}
    >
      <div className="pdi-check-tick"><span>✓</span> {item.tick}</div>
      <div className="pdi-service-head">
        <h3>{item.title}</h3>
        <span className="pdi-chevron" aria-hidden="true">⌄</span>
      </div>
      <p>{item.body}</p>
      <div className="pdi-collapse">
        <div className="pdi-collapse-inner">
          <p className="pdi-check-extra">{item.detail}</p>
        </div>
      </div>
    </button>
  );
}

/* Clickable process stepper — replaces the static 4-up grid with a
   numbered track you can scrub through; the connecting line fills to
   show progress, since this content really is a sequence. */
function ProcessStepper({ steps }) {
  const [active, setActive] = useState(0);
  const fill = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0;

  return (
    <div className="pdi-stepper">
      <div className="pdi-stepper-track">
        <div className="pdi-stepper-track-bg" />
        <div className="pdi-stepper-track-fill" style={{ width: `${fill}%` }} />
        {steps.map((s, i) => (
          <button
            key={s.n}
            type="button"
            className={`pdi-stepper-dot ${i <= active ? "is-passed" : ""} ${i === active ? "is-current" : ""}`}
            onClick={() => setActive(i)}
          >
            <span>{s.n}</span>
          </button>
        ))}
      </div>
      <div className="pdi-stepper-labels">
        {steps.map((s, i) => (
          <button
            key={s.n}
            type="button"
            className={`pdi-stepper-label ${i === active ? "is-current" : ""}`}
            onClick={() => setActive(i)}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="pdi-stepper-panel" key={active}>
        <div className="pdi-process-num">{steps[active].n}</div>
        <h3>{steps[active].title}</h3>
        <p>{steps[active].body}</p>
      </div>
    </div>
  );
}

/* Stat that counts up once it scrolls into view. */
function StatCounter({ target, suffix = "", label, format }) {
  const [ref, inView] = useInView(0.4);
  const value = useCountUp(target, inView);
  const display = format ? format(value) : value;
  return (
    <div className="pdi-stat" ref={ref}>
      <div className="pdi-stat-num">{display}{suffix}</div>
      <div>{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pages                                                                 */
/* ------------------------------------------------------------------ */

function HomePage({ onNavigate }) {
  const [activeQuote, setActiveQuote] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openService, setOpenService] = useState(null);
  const [openWhy, setOpenWhy] = useState(0);
  const scanRef = useRef(null);
  useTilt(scanRef, 5);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActiveQuote((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <>
      <section className="pdi-hero">
        <div className="pdi-shell pdi-hero-grid">
          <div>
            <Eyebrow>Pre-delivery vehicle inspection</Eyebrow>
            <h1 className="pdi-h1 pdi-hero-anim" style={{ animationDelay: "80ms" }}>
              Know exactly what you're<br />signing for, before you sign.
            </h1>
            <p className="pdi-hero-copy pdi-hero-anim" style={{ animationDelay: "160ms" }}>
              A full diagnostic and visual inspection of your new car — engine,
              electronics, paint and body — run at the dealer yard before delivery.
              One clear report. No dealer influence.
            </p>
            <div className="pdi-hero-actions pdi-hero-anim" style={{ animationDelay: "240ms" }}>
              <RippleButton className="pdi-btn-amber pdi-btn-lg" onClick={() => onNavigate("contact")}>
                Book my inspection
              </RippleButton>
              <button className="pdi-btn pdi-btn-outline pdi-btn-lg" onClick={() => onNavigate("services")}>
                See what's checked
              </button>
            </div>
            <p className="pdi-hero-price pdi-hero-anim" style={{ animationDelay: "320ms" }}>
              Starting at <strong>₹2,499</strong> · report in 24 hours
            </p>
          </div>

          <div className="pdi-scan-panel pdi-hero-anim" style={{ animationDelay: "180ms" }} ref={scanRef}>
            <div className="pdi-scan-head">
              <span className="pdi-scan-dot" />
              LIVE INSPECTION READ-OUT
            </div>
            <ScanCounter />
            <div className="pdi-scan-rows">
              <div className="pdi-scan-row"><span>Defect-free deliveries flagged clean</span><span className="pdi-amber">94%</span></div>
              <div className="pdi-scan-row"><span>Avg. issues found per inspection</span><span className="pdi-amber">2.3</span></div>
              <div className="pdi-scan-row"><span>Report turnaround</span><span className="pdi-amber">24 hrs</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="pdi-banner">
        <ImageBox src={bannerYard} alt="Technician inspecting a car at the dealer yard" ratio="25/13" />
      </section>

      <section className="pdi-section">
        <div className="pdi-shell pdi-why-grid">
          <div>
            <Eyebrow>Why choose us</Eyebrow>
            <h2 className="pdi-h2">An inspection run like an audit, not a favour</h2>
            <div className="pdi-checklist pdi-checklist-stacked">
              {WHY_US.map((item, i) => (
                <WhyUsItem
                  key={item.title}
                  item={item}
                  expanded={openWhy === i}
                  onToggle={() => setOpenWhy(openWhy === i ? null : i)}
                />
              ))}
            </div>
          </div>
          <Reveal>
            <ImageBox src={diagnosticCloseup} alt="OBD scanner plugged into a car's diagnostic port" ratio="5/5" />
          </Reveal>
        </div>
      </section>

      <section className="pdi-section">
        <div className="pdi-shell">
          <div className="pdi-section-head-row">
            <div>
              <Eyebrow>What we check</Eyebrow>
              <h2 className="pdi-h2" style={{ marginBottom: 0 }}>Six inspection modules, one report</h2>
            </div>
            <button className="pdi-btn pdi-btn-outline" onClick={() => onNavigate("services")}>
              View full checklist
            </button>
          </div>
          <p className="pdi-hint">Tap a module to see exactly what's checked.</p>
          <div className="pdi-service-grid" style={{ marginTop: 18 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.code} delay={i * 60}>
                <ServiceCard
                  service={s}
                  expanded={openService === s.code}
                  onToggle={() => setOpenService(openService === s.code ? null : s.code)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pdi-section pdi-quote-section">
        <div className="pdi-shell">
          <Eyebrow>From recent deliveries</Eyebrow>
          <Reveal
            className="pdi-quote-box"
            as="div"
          >
            <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <p className="pdi-quote-text">"{TESTIMONIALS[activeQuote].quote}"</p>
              <div className="pdi-quote-meta pdi-quote-meta-row">
                <div className="pdi-avatar-placeholder" aria-hidden="true">
                  {TESTIMONIALS[activeQuote].name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <span>{TESTIMONIALS[activeQuote].name}</span>
                  <span className="pdi-muted"> — {TESTIMONIALS[activeQuote].car}</span>
                </div>
              </div>
              <div className="pdi-quote-progress" key={activeQuote}>
                <div className="pdi-quote-progress-fill" style={{ animationPlayState: paused ? "paused" : "running" }} />
              </div>
              <div className="pdi-quote-dots">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={`pdi-dot ${i === activeQuote ? "is-active" : ""}`}
                    onClick={() => setActiveQuote(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className="pdi-brands">
        <div className="pdi-shell pdi-brands-row">
          {BRANDS.map((b) => <span key={b}>{b}</span>)}
        </div>
      </Reveal>

      <CTAStrip />
    </>
  );
}

/* Animated checkpoint counter, split out so it re-triggers cleanly. */
function ScanCounter() {
  const [ref, inView] = useInView(0.3);
  const value = useCountUp(3247, inView, 1400);
  return (
    <div ref={ref}>
      <div className="pdi-scan-big">{value.toLocaleString("en-IN")}</div>
      <div className="pdi-scan-label">checkpoints scanned to date</div>
    </div>
  );
}

function AboutPage() {
  return (
    <>
      <section className="pdi-page-hero">
        <div className="pdi-shell pdi-about-hero-grid">
          <div>
            <Eyebrow>About PDICARVISI👁️N</Eyebrow>
            <h1 className="pdi-h1" style={{ fontSize: 38 }}>
              Fifteen years in automotive diagnostics, now working for the buyer
            </h1>
            <p className="pdi-hero-copy" style={{ marginTop: 18 }}>
              Our technicians come from dealership service floors and independent
              workshops. We built Checkpoint because pre-delivery inspection almost
              always happens after the customer has already taken the keys — we
              moved it to before. Every inspection is run against a fixed,
              published checklist, and every report goes to the buyer first.
            </p>
          </div>
          <ImagePlaceholder caption="Photo: founder or lead technician portrait, workshop setting" ratio="4/5" />
        </div>
      </section>

      <section className="pdi-section">
        <Reveal className="pdi-shell pdi-stat-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <StatCounter target={15} suffix="+" label="Years combined experience" />
          <StatCounter target={3200} suffix="+" label="Checkpoints per vehicle" format={(v) => v.toLocaleString("en-IN")} />
          <StatCounter target={22} label="Brands covered" />
          <StatCounter target={0} label="Dealer tie-ups" />
        </Reveal>
      </section>

      <section className="pdi-section">
        <div className="pdi-shell">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="pdi-h2">From booking to decision, in four steps</h2>
          <ImageBox
            src={servicereport}
            alt="Photo: technician handing over a printed/tablet report to a customer"
            ratio="45/55"
            className="pdi-process-banner"
            style={{ objectPosition: "center 30%" }}
          />
          <Reveal>
            <ProcessStepper steps={PROCESS_STEPS} />
          </Reveal>
        </div>
      </section>

      <CTAStrip />
    </>
  );
}

function ServicesPage() {
  const [openService, setOpenService] = useState(null);

  return (
    <>
      <section className="pdi-page-hero">
        <div className="pdi-shell">
          <Eyebrow>What we check</Eyebrow>
          <h1 className="pdi-h1" style={{ fontSize: 38 }}>Six inspection modules, 3,200+ checkpoints</h1>
          <p className="pdi-hero-copy" style={{ marginTop: 18 }}>
            Every module below is run on every inspection, regardless of package.
            The report you receive lists a pass/flag status for each item, with
            photos for anything flagged.
          </p>
        </div>
      </section>

      <section className="pdi-section" style={{ borderBottom: "none" }}>
        <div className="pdi-shell pdi-service-grid-full">
          {SERVICES.map((s, i) => (
            <Reveal key={s.code} delay={i * 50}>
              <ServiceCard
                service={s}
                ratio="16/9"
                expanded={openService === null ? true : openService === s.code}
                onToggle={() => setOpenService(openService === s.code ? null : s.code)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <CTAStrip />
    </>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", car: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const API_BASE_URL = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        const message =
          data.errors?.[0]?.msg || data.message || "Something went wrong. Please try again.";
        throw new Error(message);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Could not submit — please check your connection and try again.");
      setShake(true);
      window.setTimeout(() => setShake(false), 500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pdi-section pdi-contact" style={{ borderBottom: "none" }}>
      <div className="pdi-shell pdi-contact-grid">
        <Reveal>
          <Eyebrow>Book an inspection</Eyebrow>
          <h2 className="pdi-h2">Tell us about the car, we'll take it from there</h2>
          <p className="pdi-hero-copy">
            Share your delivery date and dealer location — we'll schedule a
            technician to arrive before you take the car home.
          </p>
          <div className="pdi-contact-info">
            <div>📞 +91 98-XXXX-XXXX</div>
            <div>✉ hello@checkpointpdi.in</div>
            <div>Mon–Sat, 10:00 AM – 6:30 PM</div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form className={`pdi-form ${shake ? "pdi-shake" : ""}`} onSubmit={handleSubmit}>
            {submitted ? (
              <div className="pdi-form-success">
                <div className="pdi-success-check" aria-hidden="true">
                  <svg viewBox="0 0 52 52" width="44" height="44">
                    <circle className="pdi-success-circle" cx="26" cy="26" r="23" fill="none" />
                    <path className="pdi-success-tick" fill="none" d="M14 27l7 7 17-17" />
                  </svg>
                </div>
                <strong>Request received.</strong>
                <p>We'll call {form.name} shortly to confirm the inspection slot.</p>
              </div>
            ) : (
              <>
                <label>Full name
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </label>
                <label>Phone number
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </label>
                <label>City
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. Gurgaon" />
                </label>
                <label>Car model
                  <input type="text" value={form.car} onChange={(e) => setForm({ ...form, car: e.target.value })} placeholder="e.g. New Creta, top variant" />
                </label>
                {error && <p className="pdi-form-error">{error}</p>}
                <RippleButton className="pdi-btn-amber pdi-btn-lg pdi-btn-block" type="submit" disabled={submitting}>
                  {submitting ? "Submitting…" : "Request inspection"}
                </RippleButton>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Report-portal login modal                                            */
/* ------------------------------------------------------------------ */

function ReportLoginModal({ onClose }) {
  const [creds, setCreds] = useState({ id: "", password: "" });

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="pdi-modal-overlay" onClick={onClose}>
      <div className="pdi-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pdi-modal-close" onClick={onClose} aria-label="Close">×</button>
        <Eyebrow>Customer portal</Eyebrow>
        <h2 className="pdi-h2" style={{ fontSize: 22, marginBottom: 8 }}>Get your PDI report</h2>
        <p className="pdi-muted" style={{ marginBottom: 22, fontSize: 14 }}>
          Log in with the booking ID sent to you by SMS after your inspection.
        </p>
        <form
          className="pdi-form"
          style={{ background: "transparent", border: "none", padding: 0 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <label>Booking ID / phone number
            <input type="text" value={creds.id} onChange={(e) => setCreds({ ...creds, id: e.target.value })} placeholder="e.g. CKP-10482" />
          </label>
          <label>Password
            <input type="password" value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })} placeholder="••••••••" />
          </label>
          <RippleButton className="pdi-btn-amber pdi-btn-lg pdi-btn-block" type="submit">Log in</RippleButton>
          <p className="pdi-muted" style={{ fontSize: 12.5, textAlign: "center" }}>
            This is a demo screen — wire it to your report backend.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                                */
/* ------------------------------------------------------------------ */

function Footer({ onNavigate, onOpenLogin }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="pdi-footer">
      <div className="pdi-footer-glow" aria-hidden="true" />

      <div className="pdi-shell pdi-footer-grid-new">
        <div className="pdi-footer-brand-col">
          <div className="pdi-logo pdi-footer-logo">
            <img className="pdi-brand-logo pdi-footer-brand-logo" src={pdiCarVisionLogo} alt="PDI Car Vision" />
          </div>
          <h3 className="pdi-footer-tagline">Exposing flaws.<br />Protecting buyers.</h3>
          <p className="pdi-footer-desc">
            Independent pre-delivery inspection for new car buyers — 3,200+
            checkpoints, one clear report, zero dealer influence.
          </p>
          <button className="pdi-footer-cta" onClick={() => openWhatsApp("Hi, I'd like to book a PDI for my new car.")}>
            <IconChat /> Book your car PDI today
          </button>
          <div className="pdi-footer-social">
            <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}><IconFacebook /></a>
            <a href="#" aria-label="YouTube" onClick={(e) => e.preventDefault()}><IconYoutube /></a>
            <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}><IconInstagram /></a>
          </div>
        </div>

        <div className="pdi-footer-col">
          <h4>Brands we inspect</h4>
          <div className="pdi-footer-underline" />
          <div className="pdi-footer-brands-grid">
            {BRANDS.map((b) => <span key={b} className="pdi-footer-link">{b}</span>)}
          </div>
        </div>

        <div className="pdi-footer-col">
          <h4>PDI service in</h4>
          <div className="pdi-footer-underline" />
          <ul className="pdi-footer-list">
            {CITIES.map((c) => (
              <li key={c}><span className="pdi-footer-link">PDI Service in {c}</span></li>
            ))}
          </ul>
        </div>

        <div className="pdi-footer-col">
          <h4>Get in touch</h4>
          <div className="pdi-footer-underline" />
          <div className="pdi-footer-contact-row"><IconPhone /><span>+91 98-XXXX-XXXX</span></div>
          <div className="pdi-footer-contact-row"><IconMail /><span>hello@pdicarvision.in</span></div>
          <div className="pdi-footer-contact-row"><IconClock /><span>Monday – Saturday<br />10:00 AM – 6:30 PM</span></div>
          <div className="pdi-footer-contact-row"><IconPin /><span>Your office address line 1, Area,<br />City, State – PIN</span></div>
          <button className="pdi-footer-outline-btn" onClick={onOpenLogin}>
            Get your PDI report <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="pdi-footer-bottom-new">
        <div className="pdi-shell pdi-footer-links-row">
          <span onClick={() => onNavigate("home")}>Home</span>
          <span onClick={() => onNavigate("about")}>About</span>
          <span onClick={() => onNavigate("services")}>Services</span>
          <span onClick={() => onNavigate("contact")}>Contact</span>
          <span>Privacy Policy</span>
          <span>Terms &amp; Conditions</span>
        </div>
        <div className="pdi-shell pdi-footer-copy-row">
          <span>© 2026 PDICARVISI👁️N. All rights reserved.</span>
          <button className="pdi-footer-top-btn" onClick={scrollTop} aria-label="Back to top">
            <IconArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* WhatsApp floating button                                             */
/* ------------------------------------------------------------------ */

function WhatsAppButton() {
  return (
    <a
      className="pdi-whatsapp"
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className="pdi-whatsapp-ring" aria-hidden="true" />
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.53 3.69-8.22 8.25-8.22 2.2 0 4.27.86 5.83 2.42a8.17 8.17 0 0 1 2.41 5.81c0 4.53-3.69 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z"/>
      </svg>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Root: header, footer, routing                                        */
/* ------------------------------------------------------------------ */

const ROUTES = { "": "home", about: "about", services: "services", contact: "contact" };

function routeFromHash() {
  const h = window.location.hash.replace(/^#\/?/, "");
  return ROUTES[h] || "home";
}

export default function CarPDISite() {
  const [page, setPage] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setPage(routeFromHash());
    const onHash = () => setPage(routeFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (p) => {
    window.location.hash = p === "home" ? "" : `/${p}`;
    setPage(p);
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pdi">
      <style>{CSS}</style>

      <div className="pdi-ticker">
        <div className="pdi-ticker-track">
          Inspections available in {CITIES.join(" · ")} — ₹2,499 onward. Terms apply.
        </div>
      </div>

      <header className={`pdi-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="pdi-shell pdi-header-row">
          <button className="pdi-logo pdi-logo-btn" onClick={() => navigate("home")} aria-label="PDI Car Vision home">
            <img className="pdi-brand-logo" src={pdiCarVisionLogo} alt="PDI Car Vision" />
          </button>

          <nav className={`pdi-nav ${navOpen ? "is-open" : ""}`}>
            <button className={page === "home" ? "is-active" : ""} onClick={() => navigate("home")}>Home</button>
            <button className={page === "about" ? "is-active" : ""} onClick={() => navigate("about")}>About</button>
            <button className={page === "services" ? "is-active" : ""} onClick={() => navigate("services")}>Services</button>
            <button className={page === "contact" ? "is-active" : ""} onClick={() => navigate("contact")}>Contact</button>
            <button className="pdi-nav-report" onClick={() => setLoginOpen(true)}>Get PDI Report</button>
          </nav>

          <div className="pdi-header-actions">
            <button className="pdi-btn pdi-btn-outline" onClick={() => setLoginOpen(true)}>Get PDI Report</button>
            <RippleButton className="pdi-btn-amber" onClick={() => openWhatsApp()}>Book Inspection</RippleButton>
            <button className={`pdi-nav-toggle ${navOpen ? "is-open" : ""}`} aria-label="Toggle navigation" onClick={() => setNavOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main>
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "about" && <AboutPage />}
        {page === "services" && <ServicesPage />}
        {page === "contact" && <ContactPage />}
      </main>

      <Footer onNavigate={navigate} onOpenLogin={() => setLoginOpen(true)} />

      <WhatsAppButton />
      {loginOpen && <ReportLoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                               */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

.pdi {
  --bg: #07111f;
  --bg-2: #0b1728;
  --surface: #0e1d31;
  --surface-2: #12243b;
  --surface-3: #172c46;
  --text: #f4f7fb;
  --muted: #91a2b8;
  --line: rgba(255,255,255,.10);
  --line-strong: rgba(255,255,255,.16);
  --accent: #ffb84d;
  --accent-2: #ff8a3d;
  --success: #4ade80;
  --danger: #fb7185;
  --shadow: 0 24px 70px rgba(0,0,0,.28);
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 0%, rgba(255,184,77,.09), transparent 28%),
    radial-gradient(circle at 0% 35%, rgba(44,117,255,.08), transparent 28%),
    var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  line-height: 1.55;
  overflow-x: hidden;
}

.pdi *, .pdi *::before, .pdi *::after { box-sizing: border-box; }
.pdi h1, .pdi h2, .pdi h3, .pdi h4 {
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -.035em;
}
.pdi h1, .pdi h2, .pdi h3, .pdi p { margin-top: 0; }
.pdi a { color: inherit; text-decoration: none; }
.pdi button, .pdi input { font: inherit; }
.pdi button { color: inherit; }
.pdi-shell { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
.pdi-amber { color: var(--accent); }
.pdi-muted { color: var(--muted); }

.pdi-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .65s cubic-bezier(.2,.7,.2,1), transform .65s cubic-bezier(.2,.7,.2,1);
}
.pdi-reveal.is-visible { opacity: 1; transform: translateY(0); }

.pdi-hero-anim {
  opacity: 0;
  animation: pdiHeroIn .8s cubic-bezier(.2,.7,.2,1) forwards;
}
@keyframes pdiHeroIn {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.pdi-ticker {
  position: relative;
  z-index: 50;
  background: linear-gradient(90deg, #ff9f43, #ffc45c, #ff9f43);
  color: #1b1308;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .04em;
  text-transform: uppercase;
  padding: 8px 0;
  overflow: hidden;
  white-space: nowrap;
}
.pdi-ticker-track {
  text-align: center;
  padding: 0 16px;
}

.pdi-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(7,17,31,.72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid transparent;
  transition: .25s ease;
}
.pdi-header.is-scrolled {
  background: rgba(7,17,31,.92);
  border-bottom-color: var(--line);
  box-shadow: 0 12px 35px rgba(0,0,0,.18);
}
.pdi-header-row {
  min-height: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.pdi-logo {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
}
.pdi-logo-btn {
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  line-height: 0;
}
.pdi-brand-logo {
  display: block;
  width: 286px;
  height: auto;
  max-height: 116px;
  object-fit: contain;
  object-position: left center;
  transition: transform .25s ease, filter .25s ease;
}
.pdi-logo-btn:hover .pdi-brand-logo {
  transform: scale(1.025);
  filter: drop-shadow(0 0 14px rgba(0,120,255,.18));
}
.pdi-footer-brand-logo {
  width: 235px;
  max-height: 130px;
}


.pdi-nav {
  display: flex;
  align-items: center;
  gap: 6px;
}
.pdi-nav button {
  position: relative;
  border: 0;
  background: transparent;
  color: #aab8ca;
  padding: 10px 13px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: .2s ease;
}
.pdi-nav button:hover, .pdi-nav button.is-active {
  color: var(--text);
  background: rgba(255,255,255,.06);
}
.pdi-nav button.is-active::after {
  content: "";
  position: absolute;
  left: 13px;
  right: 13px;
  bottom: 4px;
  height: 2px;
  border-radius: 99px;
  background: var(--accent);
}
.pdi-nav-report { display: none; color: var(--accent) !important; }

.pdi-header-actions { display: flex; align-items: center; gap: 9px; }
.pdi-nav-toggle {
  display: none;
  width: 42px;
  height: 42px;
  padding: 9px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(255,255,255,.04);
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}
.pdi-nav-toggle span {
  width: 100%;
  height: 2px;
  border-radius: 10px;
  background: var(--text);
  transition: .25s ease;
}
.pdi-nav-toggle.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.pdi-nav-toggle.is-open span:nth-child(2) { opacity: 0; }
.pdi-nav-toggle.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.pdi-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 17px;
  border-radius: 11px;
  border: 1px solid var(--line-strong);
  background: rgba(255,255,255,.04);
  color: var(--text);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .2s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.pdi-btn:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.24); }
.pdi-btn-amber {
  border-color: transparent;
  color: #1d1308;
  background: linear-gradient(135deg, #ffd16f, #ff9e43);
  box-shadow: 0 10px 30px rgba(255,160,65,.20);
}
.pdi-btn-amber:hover {
  color: #1d1308;
  box-shadow: 0 14px 35px rgba(255,160,65,.28);
}
.pdi-btn-outline { background: rgba(255,255,255,.035); }
.pdi-btn-lg { min-height: 52px; padding: 0 23px; font-size: 14px; border-radius: 13px; }
.pdi-btn-block { width: 100%; }
.pdi-btn:disabled { opacity: .55; cursor: not-allowed; transform: none !important; }

.pdi-ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,.35);
  pointer-events: none;
  transform: scale(0);
  animation: pdiRipple .65s ease-out;
}
@keyframes pdiRipple { to { transform: scale(1); opacity: 0; } }

.pdi-hero {
  position: relative;
  padding: 92px 0 76px;
  border-bottom: 1px solid var(--line);
  background:
    linear-gradient(90deg, rgba(7,17,31,.96) 0%, rgba(7,17,31,.86) 46%, rgba(7,17,31,.60) 100%),
    radial-gradient(circle at 78% 45%, rgba(255,184,77,.13), transparent 30%);
}
.pdi-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: linear-gradient(to bottom, black, transparent 80%);
}
.pdi-hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0,1.15fr) minmax(360px,.85fr);
  gap: 70px;
  align-items: center;
}
.pdi-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 18px;
  color: var(--accent);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.pdi-eyebrow::before {
  content: "";
  width: 24px;
  height: 1px;
  background: var(--accent);
}
.pdi-h1 {
  max-width: 760px;
  font-size: clamp(42px, 6vw, 72px);
  line-height: .98;
  margin-bottom: 24px;
}
.pdi-hero-copy {
  max-width: 620px;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.75;
  margin-bottom: 30px;
}
.pdi-hero-actions { display: flex; flex-wrap: wrap; gap: 11px; margin-bottom: 18px; }
.pdi-hero-price { color: #8496ad; font-size: 13px; }
.pdi-hero-price strong { color: var(--text); }

.pdi-scan-panel {
  position: relative;
  overflow: hidden;
  padding: 26px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 24px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.025)),
    rgba(9,24,41,.88);
  box-shadow: var(--shadow);
  backdrop-filter: blur(18px);
  transition: transform .18s ease, box-shadow .3s ease;
  will-change: transform;
}
.pdi-scan-panel::before {
  content: "";
  position: absolute;
  width: 240px;
  height: 240px;
  right: -100px;
  top: -110px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,184,77,.22), transparent 68%);
}
.pdi-scan-panel::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 64px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,184,77,.5), transparent);
  opacity: .5;
}
.pdi-scan-head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 9px;
  color: #aab8ca;
  font-size: 10px;
  letter-spacing: .14em;
  font-weight: 800;
  margin-bottom: 28px;
}
.pdi-scan-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 0 5px rgba(74,222,128,.10);
  animation: scanPulse 1.8s ease-in-out infinite;
}
@keyframes scanPulse {
  0%,100% { box-shadow: 0 0 0 4px rgba(74,222,128,.10); }
  50% { box-shadow: 0 0 0 9px rgba(74,222,128,.03); }
}
.pdi-scan-big {
  position: relative;
  z-index: 1;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(48px, 6vw, 68px);
  font-weight: 700;
  letter-spacing: -.05em;
}
.pdi-scan-label { color: var(--muted); font-size: 12px; margin: 0 0 28px; }
.pdi-scan-rows {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--line);
}
.pdi-scan-row {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 15px 0;
  border-bottom: 1px solid var(--line);
  font-size: 12px;
}
.pdi-scan-row span:first-child { color: var(--muted); }
.pdi-scan-row span:last-child { color: var(--accent); font-weight: 800; }

.pdi-banner { border-bottom: 1px solid var(--line); padding: 20px; background: var(--bg-2); }
.pdi-banner .pdi-imgbox {
  width: min(1320px, 100%);
  margin: 0 auto;
  border-radius: 22px;
  border: 1px solid var(--line);
  box-shadow: 0 30px 80px rgba(0,0,0,.24);
}
.pdi-real-img { width: 100%; height: 100%; display: block; object-fit: cover; }
.pdi-imgbox { width: 100%; overflow: hidden; border-radius: 18px; }
.pdi-img-placeholder {
  width: 100%;
  border-radius: 18px;
  min-height: 260px;
  background: linear-gradient(145deg, var(--surface), var(--surface-2));
  border: 1px dashed rgba(255,255,255,.18);
  color: var(--muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  padding: 20px;
  font-size: 12px;
}
.pdi-img-placeholder svg { opacity: .55; }

.pdi-section {
  padding: 96px 0;
  border-bottom: 1px solid var(--line);
}
.pdi-section-head-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
}
.pdi-h2 {
  max-width: 760px;
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1.04;
  margin-bottom: 38px;
}
.pdi-hint { color: var(--muted); font-size: 12px; margin: -24px 0 0; }

.pdi-why-grid {
  display: grid;
  grid-template-columns: minmax(0,1fr) minmax(300px,.72fr);
  gap: 70px;
  align-items: center;
}
.pdi-checklist { display: grid; gap: 10px; }
.pdi-checklist-stacked { grid-template-columns: 1fr; }
.pdi-check-item {
  width: 100%;
  text-align: left;
  border: 1px solid var(--line);
  border-radius: 17px;
  padding: 22px;
  background: linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.018));
  cursor: pointer;
  transition: .25s ease;
}
.pdi-check-item:hover, .pdi-check-item.is-expanded {
  border-color: rgba(255,184,77,.34);
  background: linear-gradient(145deg, rgba(255,184,77,.08), rgba(255,255,255,.025));
  transform: translateX(4px);
}
.pdi-check-tick {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--accent);
  font-size: 10px;
  letter-spacing: .1em;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 10px;
}
.pdi-check-item h3 { font-size: 19px; margin-bottom: 7px; }
.pdi-check-item p, .pdi-check-extra {
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.65;
  margin: 0;
}
.pdi-service-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 7px;
}
.pdi-chevron { color: var(--accent); transition: transform .3s ease; }
.is-expanded .pdi-chevron { transform: rotate(180deg); }
.pdi-collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; }
.pdi-collapse-inner { min-height: 0; overflow: hidden; }
.is-expanded .pdi-collapse { grid-template-rows: 1fr; margin-top: 13px; }

.pdi-service-grid, .pdi-service-grid-full {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 14px;
  background: transparent;
  border: 0;
}
.pdi-service-grid-full { grid-template-columns: repeat(2,1fr); }
.pdi-service {
  position: relative;
  overflow: hidden;
  min-height: 100%;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018));
  transition: .3s ease;
}
.pdi-service::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(135deg, rgba(255,184,77,.10), transparent 35%);
  opacity: 0;
  transition: opacity .3s ease;
}
.pdi-service-interactive:hover {
  transform: translateY(-7px);
  border-color: rgba(255,184,77,.30);
  box-shadow: 0 24px 45px rgba(0,0,0,.22);
  z-index: 2;
}
.pdi-service-interactive:hover::after, .pdi-service.is-expanded::after { opacity: 1; }
.pdi-service h3 { position: relative; z-index: 1; font-size: 17px; margin-bottom: 4px; }
.pdi-service p { position: relative; z-index: 1; color: var(--muted); font-size: 12.5px; margin: 0; }
.pdi-service-img {
  position: relative;
  z-index: 1;
  margin-bottom: 17px;
  border-radius: 14px;
}
.pdi-service-interactive .pdi-real-img { transition: transform .6s cubic-bezier(.2,.7,.2,1); }
.pdi-service-interactive:hover .pdi-real-img { transform: scale(1.055); }
.pdi-service-points {
  position: relative;
  z-index: 1;
  margin: 0;
  padding-left: 18px;
  color: #aab8ca;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.pdi-quote-section { background: linear-gradient(180deg, rgba(255,255,255,.02), transparent); }
.pdi-quote-box {
  max-width: 850px;
  padding: 38px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018));
  box-shadow: 0 22px 55px rgba(0,0,0,.18);
}
.pdi-quote-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(22px, 3vw, 34px);
  line-height: 1.3;
  letter-spacing: -.035em;
  margin-bottom: 24px;
}
.pdi-quote-meta-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.pdi-quote-meta-row > div:last-child > span:first-child { font-weight: 700; }
.pdi-avatar-placeholder {
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,184,77,.35);
  background: rgba(255,184,77,.08);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}
.pdi-quote-progress {
  height: 3px;
  max-width: 280px;
  background: var(--line);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 18px;
}
.pdi-quote-progress-fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--accent-2), var(--accent));
  animation: quoteFill 5s linear forwards;
}
@keyframes quoteFill { to { width: 100%; } }
.pdi-quote-dots { display: flex; gap: 8px; }
.pdi-dot {
  width: 8px; height: 8px;
  border: 0;
  border-radius: 50%;
  background: #314158;
  cursor: pointer;
  padding: 0;
  transition: .2s ease;
}
.pdi-dot.is-active { width: 24px; border-radius: 99px; background: var(--accent); }

.pdi-brands {
  padding: 28px 0;
  background: #06101d;
  border-bottom: 1px solid var(--line);
}
.pdi-brands-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px 28px;
  color: #71839a;
  font-size: 12px;
  font-weight: 700;
}

.pdi-page-hero {
  padding: 82px 0 46px;
  border-bottom: 1px solid var(--line);
  background:
    radial-gradient(circle at 70% 0%, rgba(255,184,77,.10), transparent 30%),
    var(--bg);
}
.pdi-page-hero .pdi-h1 { font-size: clamp(38px,5vw,60px); }
.pdi-about-hero-grid {
  display: grid;
  grid-template-columns: minmax(0,1fr) minmax(300px,.65fr);
  gap: 70px;
  align-items: center;
}
.pdi-process-banner {
  margin-bottom: 34px;
  max-width: 760px;
  border-radius: 22px;
}
.pdi-stat-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 12px;
  background: transparent;
  border: 0;
}
.pdi-stat {
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.018));
}
.pdi-stat-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 34px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -.04em;
}
.pdi-stat div:last-child { color: var(--muted); font-size: 12px; margin-top: 6px; }

.pdi-stepper { margin-top: 8px; }
.pdi-stepper-track {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 5px;
}
.pdi-stepper-track-bg {
  position: absolute;
  left: 20px; right: 20px; top: 50%;
  height: 2px;
  background: var(--line);
  transform: translateY(-50%);
}
.pdi-stepper-track-fill {
  position: absolute;
  left: 20px; top: 50%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-2), var(--accent));
  transform: translateY(-50%);
  transition: width .35s ease;
}
.pdi-stepper-dot {
  position: relative;
  z-index: 2;
  width: 42px; height: 42px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  color: var(--muted);
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: .25s ease;
}
.pdi-stepper-dot:hover { transform: scale(1.08); }
.pdi-stepper-dot.is-passed { border-color: rgba(255,184,77,.5); color: var(--accent); }
.pdi-stepper-dot.is-current {
  border-color: var(--accent);
  background: var(--accent);
  color: #1c1308;
  box-shadow: 0 0 0 6px rgba(255,184,77,.10);
}
.pdi-stepper-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.pdi-stepper-label {
  flex: 1;
  border: 0;
  background: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
}
.pdi-stepper-label.is-current { color: var(--text); }
.pdi-stepper-panel {
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018));
  animation: panelIn .35s ease;
}
@keyframes panelIn { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
.pdi-process-num { color: var(--accent); font-family: 'Space Grotesk', sans-serif; font-weight: 800; margin-bottom: 8px; }
.pdi-stepper-panel h3 { font-size: 22px; margin-bottom: 7px; }
.pdi-stepper-panel p { color: var(--muted); font-size: 13.5px; margin: 0; }

.pdi-cta-strip {
  padding: 54px 0;
  background:
    radial-gradient(circle at 85% 50%, rgba(255,184,77,.14), transparent 25%),
    var(--surface);
  border-bottom: 1px solid var(--line);
}
.pdi-cta-row { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.pdi-cta-row .pdi-h2 { font-size: 30px; margin: 0 0 6px; }

.pdi-contact {
  min-height: 70vh;
  display: flex;
  align-items: center;
}
.pdi-contact-grid {
  display: grid;
  grid-template-columns: minmax(0,.9fr) minmax(360px,.75fr);
  gap: 70px;
  align-items: start;
}
.pdi-contact-info {
  display: grid;
  gap: 12px;
  margin-top: 28px;
  color: #a6b5c8;
  font-size: 13px;
}
.pdi-form {
  padding: 28px;
  border: 1px solid var(--line-strong);
  border-radius: 22px;
  background: linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.025));
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.pdi-form label { display: flex; flex-direction: column; gap: 7px; color: #9eafc2; font-size: 12px; font-weight: 700; }
.pdi-form input {
  width: 100%;
  min-height: 48px;
  padding: 0 13px;
  border: 1px solid var(--line-strong);
  border-radius: 11px;
  background: rgba(2,10,19,.38);
  color: var(--text);
  outline: none;
  transition: .2s ease;
}
.pdi-form input::placeholder { color: #5f7187; }
.pdi-form input:focus {
  border-color: rgba(255,184,77,.65);
  box-shadow: 0 0 0 4px rgba(255,184,77,.09);
}
.pdi-form-success { padding: 28px 10px; text-align: center; }
.pdi-form-success strong { color: var(--accent); font-size: 17px; display: block; margin-top: 8px; }
.pdi-form-success p { color: var(--muted); font-size: 13px; }
.pdi-form-error { color: var(--danger); font-size: 12px; margin: 0; }
.pdi-success-check { display: flex; justify-content: center; }
.pdi-success-circle { stroke: var(--success); stroke-width: 2.5; stroke-dasharray: 145; stroke-dashoffset: 145; animation: successCircle .5s ease forwards; }
.pdi-success-tick { stroke: var(--success); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 32; stroke-dashoffset: 32; animation: successTick .35s ease forwards .45s; }
@keyframes successCircle { to { stroke-dashoffset: 0; } }
@keyframes successTick { to { stroke-dashoffset: 0; } }
.pdi-shake { animation: formShake .45s ease; }
@keyframes formShake {
  10%,90% { transform: translateX(-2px); }
  20%,80% { transform: translateX(4px); }
  30%,50%,70% { transform: translateX(-7px); }
  40%,60% { transform: translateX(7px); }
}

.pdi-footer {
  --f-line: rgba(255,255,255,.09);
  --f-muted: #71839a;
  position: relative;
  overflow: hidden;
  color: var(--text);
  background:
    radial-gradient(circle at 90% 10%, rgba(255,184,77,.10), transparent 25%),
    linear-gradient(180deg, #07111f, #040b14);
  padding-top: 1px;
}
.pdi-footer::before {
  content: "";
  display: block;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}
.pdi-footer-glow { position: absolute; inset: 0; pointer-events: none; }
.pdi-footer-glow::before {
  content: "";
  position: absolute;
  width: 600px; height: 600px;
  right: -250px; bottom: -300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,184,77,.08), transparent 68%);
}
.pdi-footer-grid-new {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr 1fr;
  gap: 42px;
  padding: 70px 0 52px;
}
.pdi-footer-logo { color: var(--text); }
.pdi-footer-tagline { font-size: 27px; line-height: 1.1; margin: 20px 0 14px; }
.pdi-footer-desc { max-width: 38ch; color: var(--f-muted); font-size: 13px; margin-bottom: 22px; }
.pdi-footer-cta {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 0;
  border-radius: 12px;
  padding: 12px 16px;
  background: var(--accent);
  color: #1d1308;
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
  transition: .2s ease;
}
.pdi-footer-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(255,184,77,.20); }
.pdi-footer-social { display: flex; gap: 8px; margin-top: 20px; }
.pdi-footer-social a {
  width: 36px; height: 36px;
  border: 1px solid var(--line);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: #a9b7c9;
  background: rgba(255,255,255,.03);
  transition: .2s ease;
}
.pdi-footer-social a:hover { color: #1d1308; background: var(--accent); border-color: var(--accent); transform: translateY(-2px); }
.pdi-footer-col h4 {
  margin: 0;
  color: var(--text);
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.pdi-footer-underline { width: 28px; height: 2px; background: var(--accent); margin: 12px 0 20px; }
.pdi-footer-brands-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
  font-size: 12px;
}
.pdi-footer-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; font-size: 12px; }
.pdi-footer-link { color: var(--f-muted); transition: .2s ease; }
.pdi-footer-list .pdi-footer-link:hover { color: var(--text); transform: translateX(2px); }
.pdi-footer-contact-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--f-muted);
  font-size: 12px;
  margin-bottom: 14px;
}
.pdi-footer-contact-row svg { flex-shrink: 0; color: var(--accent); }
.pdi-footer-outline-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--line-strong);
  border-radius: 10px;
  padding: 10px 13px;
  background: rgba(255,255,255,.03);
  color: var(--text);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: .2s ease;
}
.pdi-footer-outline-btn:hover { border-color: var(--accent); color: var(--accent); }
.pdi-footer-bottom-new { position: relative; z-index: 1; border-top: 1px solid var(--f-line); }
.pdi-footer-links-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0 16px;
  color: var(--f-muted);
  font-size: 11px;
}
.pdi-footer-links-row span { cursor: pointer; }
.pdi-footer-links-row span:hover { color: var(--text); }
.pdi-footer-copy-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 0 24px;
  color: var(--f-muted);
  font-size: 11px;
}
.pdi-footer-top-btn {
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(255,255,255,.03);
  cursor: pointer;
  transition: .2s ease;
}
.pdi-footer-top-btn:hover { color: #1d1308; background: var(--accent); border-color: var(--accent); }

.pdi-whatsapp {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 45;
  width: 58px; height: 58px;
  border-radius: 17px;
  background: #25d366;
  color: #062511;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 30px rgba(37,211,102,.25);
  transition: .2s ease;
}
.pdi-whatsapp:hover { transform: translateY(-4px) scale(1.03); }
.pdi-whatsapp-ring {
  position: absolute;
  inset: -6px;
  border-radius: 21px;
  border: 1px solid #25d366;
  animation: pulseRing 2.2s ease-out infinite;
}
@keyframes pulseRing {
  0% { transform: scale(.9); opacity: .55; }
  100% { transform: scale(1.45); opacity: 0; }
}

.pdi-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(1,7,14,.76);
  backdrop-filter: blur(14px);
  animation: overlayIn .2s ease;
}
@keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
.pdi-modal {
  width: min(430px,100%);
  position: relative;
  padding: 30px;
  border: 1px solid var(--line-strong);
  border-radius: 22px;
  background: linear-gradient(145deg, #102137, #091626);
  box-shadow: 0 30px 90px rgba(0,0,0,.45);
  animation: modalIn .25s ease;
}
@keyframes modalIn {
  from { opacity: 0; transform: translateY(15px) scale(.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.pdi-modal-close {
  position: absolute;
  top: 15px; right: 15px;
  width: 36px; height: 36px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(255,255,255,.04);
  color: var(--muted);
  font-size: 21px;
  cursor: pointer;
  transition: .2s ease;
}
.pdi-modal-close:hover { color: var(--text); transform: rotate(90deg); }

@media (prefers-reduced-motion: reduce) {
  .pdi-reveal { opacity: 1; transform: none; transition: none; }
  .pdi-hero-anim { animation: none; opacity: 1; }
  .pdi-scan-dot, .pdi-whatsapp-ring, .pdi-quote-progress-fill { animation: none; }
  .pdi * { scroll-behavior: auto !important; }
}

@media (max-width: 980px) {
  .pdi-nav { display: none; }
  .pdi-nav.is-open {
    position: fixed;
    left: 0; right: 0; top: 78px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    padding: 14px 20px 20px;
    background: rgba(7,17,31,.98);
    border-bottom: 1px solid var(--line);
    box-shadow: 0 20px 40px rgba(0,0,0,.25);
  }
  .pdi-nav.is-open button { text-align: left; padding: 13px; }
  .pdi-nav-report { display: block; }
  .pdi-header-actions > .pdi-btn { display: none; }
  .pdi-nav-toggle { display: flex; }
  .pdi-hero-grid, .pdi-contact-grid, .pdi-why-grid, .pdi-about-hero-grid {
    grid-template-columns: 1fr;
  }
  .pdi-hero-grid { gap: 44px; }
  .pdi-why-grid { gap: 38px; }
  .pdi-service-grid { grid-template-columns: repeat(2,1fr); }
  .pdi-service-grid-full { grid-template-columns: 1fr 1fr; }
  .pdi-stat-grid { grid-template-columns: repeat(2,1fr); }
  .pdi-footer-grid-new { grid-template-columns: repeat(2,1fr); }
}

@media (max-width: 680px) {
  .pdi-brand-logo { width: 210px; max-height: 84px; }
  .pdi-shell { width: min(100% - 28px, 1180px); }
  .pdi-header-row { min-height: 82px; }
  .pdi-nav.is-open { top: 82px; }
  .pdi-hero { padding: 62px 0 58px; }
  .pdi-h1 { font-size: 42px; }
  .pdi-h2 { font-size: 31px; }
  .pdi-banner { padding: 10px; }
  .pdi-banner .pdi-imgbox { border-radius: 15px; }
  .pdi-section { padding: 70px 0; }
  .pdi-service-grid, .pdi-service-grid-full { grid-template-columns: 1fr; }
  .pdi-stat-grid { grid-template-columns: 1fr 1fr; }
  .pdi-stepper-labels { display: none; }
  .pdi-cta-row { align-items: flex-start; flex-direction: column; }
  .pdi-footer-grid-new { grid-template-columns: 1fr; gap: 34px; padding: 55px 0 40px; }
  .pdi-footer-brands-grid { grid-template-columns: 1fr 1fr; }
  .pdi-footer-copy-row { flex-direction: column; align-items: flex-start; }
  .pdi-whatsapp { width: 54px; height: 54px; right: 14px; bottom: 14px; border-radius: 15px; }
  .pdi-modal { padding: 24px; }
}

@media (max-width: 440px) {
  .pdi-brand-logo { width: 178px; }
  .pdi-stat-grid { grid-template-columns: 1fr; }
  .pdi-h1 { font-size: 37px; }
  .pdi-hero-actions { flex-direction: column; align-items: stretch; }
  .pdi-hero-actions .pdi-btn { width: 100%; }
  .pdi-scan-panel { padding: 21px; border-radius: 18px; }
}
`;