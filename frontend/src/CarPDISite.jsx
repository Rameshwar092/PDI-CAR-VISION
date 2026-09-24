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
  "Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Honda", "Toyota",
  "Kia", "Skoda", "Volkswagen", "MG", "Renault", "Nissan",
];

const WHATSAPP_NUMBER = "918800769789"; // placeholder — replace with client's number

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

function CTAStrip({ onNavigate }) {
  return (
    <section className="pdi-cta-strip">
      <Reveal className="pdi-shell pdi-cta-row">
        <div>
          <h2 className="pdi-h2" style={{ marginBottom: 6 }}>Taking delivery this week?</h2>
          <p className="pdi-muted">Book a slot and we'll have a report ready before you sign.</p>
        </div>
        <RippleButton className="pdi-btn-amber pdi-btn-lg" onClick={() => onNavigate("contact")}>
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

      <CTAStrip onNavigate={onNavigate} />
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

function AboutPage({ onNavigate }) {
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

      <CTAStrip onNavigate={onNavigate} />
    </>
  );
}

function ServicesPage({ onNavigate }) {
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

      <CTAStrip onNavigate={onNavigate} />
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
          <button className="pdi-logo pdi-logo-btn" onClick={() => navigate("home")}>
            <span className="pdi-logo-mark">◈</span>
            <span>PDICARVISI👁️N<span className="pdi-amber">.</span></span>
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
            <RippleButton className="pdi-btn-amber" onClick={() => navigate("contact")}>Book Inspection</RippleButton>
            <button className={`pdi-nav-toggle ${navOpen ? "is-open" : ""}`} aria-label="Toggle navigation" onClick={() => setNavOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main>
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "about" && <AboutPage onNavigate={navigate} />}
        {page === "services" && <ServicesPage onNavigate={navigate} />}
        {page === "contact" && <ContactPage />}
      </main>

      <footer className="pdi-footer">
        <div className="pdi-shell pdi-footer-grid">
          <div>
            <div className="pdi-logo"><span className="pdi-logo-mark">◈</span><span>PDICARVISI👁️N<span className="pdi-amber">.</span></span></div>
            <p className="pdi-muted">Independent pre-delivery inspection for new car buyers.</p>
          </div>
          <div>
            <h4>Coverage</h4>
            <p className="pdi-muted">{CITIES.join(" · ")}</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p className="pdi-muted">+91 98-XXXX-XXXX<br />hello@pdicarvision.in</p>
          </div>
        </div>
        <div className="pdi-shell pdi-footer-bottom">© 2026 PDICARVISI👁️N. All rights reserved.</div>
      </footer>

      <WhatsAppButton />
      {loginOpen && <ReportLoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                               */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

.pdi {
  --ink: #F3F6FA;
  --panel: #FFFFFF;
  --panel-2: #EAF0F8;
  --line: #E1E7EF;
  --steel: #4C6C93;
  --amber: #2563EB;
  --paper: #101828;
  --muted: #64748B;
  font-family: 'Inter', sans-serif;
  background: var(--ink);
  color: var(--paper);
  line-height: 1.5;
  position: relative;
}
.pdi * { box-sizing: border-box; }
.pdi h1, .pdi h2, .pdi h3 { font-family: 'Archivo', sans-serif; font-weight: 800; letter-spacing: -0.01em; margin: 0; }
.pdi a { color: inherit; text-decoration: none; }
.pdi-shell { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
.pdi-amber { color: var(--amber); }
.pdi-muted { color: var(--muted); }
.pdi-hint { color: var(--muted); font-size: 13px; margin: -26px 0 0; }

/* ---------- Scroll reveal ---------- */
.pdi-reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }
.pdi-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* ---------- Hero load-in sequence ---------- */
.pdi-hero-anim { opacity: 0; animation: heroIn .7s ease forwards; }
@keyframes heroIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

.pdi-ticker { background: var(--amber); color: #fff; font-weight: 600; font-size: 13px; padding: 7px 0; overflow: hidden; white-space: nowrap; }
.pdi-ticker-track { text-align: center; padding: 0 16px; }

.pdi-header { position: sticky; top: 0; z-index: 30; background: rgba(255,255,255,0.88); backdrop-filter: blur(6px); border-bottom: 1px solid var(--line); transition: box-shadow .25s ease, background .25s ease; }
.pdi-header.is-scrolled { box-shadow: 0 4px 18px rgba(16,24,40,0.06); background: rgba(255,255,255,0.96); }
.pdi-header-row { display: flex; align-items: center; justify-content: space-between; height: 68px; }
.pdi-logo { display: flex; align-items: center; gap: 8px; font-family: 'Archivo', sans-serif; font-weight: 800; font-size: 19px; letter-spacing: 0.01em; }
.pdi-logo-btn { background: none; border: none; cursor: pointer; color: inherit; padding: 0; }
.pdi-logo-mark { color: var(--amber); font-size: 18px; display: inline-block; transition: transform .4s ease; }
.pdi-logo-btn:hover .pdi-logo-mark { transform: rotate(90deg); }
.pdi-nav { display: flex; align-items: center; gap: 26px; font-size: 14px; font-weight: 500; }
.pdi-nav button { position: relative; background: none; border: none; cursor: pointer; color: var(--muted); font-size: 14px; font-weight: 500; font-family: 'Inter', sans-serif; padding: 4px 0; transition: color .15s; }
.pdi-nav button::after { content: ""; position: absolute; left: 0; right: 0; bottom: -4px; height: 2px; background: var(--amber); transform: scaleX(0); transform-origin: left; transition: transform .25s ease; }
.pdi-nav button:hover, .pdi-nav button.is-active { color: var(--paper); }
.pdi-nav button:hover::after, .pdi-nav button.is-active::after { transform: scaleX(1); }
.pdi-nav-report { display: none; color: var(--amber) !important; font-weight: 600 !important; }
.pdi-header-actions { display: flex; align-items: center; gap: 12px; }
.pdi-nav-toggle { display: none; flex-direction: column; gap: 4px; background: none; border: none; cursor: pointer; padding: 6px; }
.pdi-nav-toggle span { width: 20px; height: 2px; background: var(--paper); display: block; transition: transform .25s ease, opacity .25s ease; }
.pdi-nav-toggle.is-open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.pdi-nav-toggle.is-open span:nth-child(2) { opacity: 0; }
.pdi-nav-toggle.is-open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

.pdi-btn { display: inline-block; padding: 9px 18px; border-radius: 3px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; border: 1px solid transparent; cursor: pointer; transition: all .15s; }
.pdi-btn-amber { background: var(--amber); color: #fff; }
.pdi-btn-amber:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(37,99,235,0.28); }
.pdi-btn-outline { border-color: var(--line); color: var(--paper); background: none; }
.pdi-btn-outline:hover { border-color: var(--steel); transform: translateY(-1px); }
.pdi-btn-lg { padding: 13px 26px; font-size: 15px; }
.pdi-btn-block { width: 100%; text-align: center; margin-top: 6px; }
.pdi-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
.pdi-btn:focus-visible, .pdi-nav button:focus-visible, .pdi-dot:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }

.pdi-ripple-btn { position: relative; overflow: hidden; }
.pdi-btn-label { position: relative; z-index: 1; }
.pdi-ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.45); transform: scale(0); animation: rippleAnim .6s ease-out; pointer-events: none; }
@keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }

.pdi-page-hero { padding: 60px 0 20px; }
.pdi-hero { padding: 72px 0 88px; border-bottom: 1px solid var(--line); }
.pdi-hero-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 56px; align-items: center; }
.pdi-eyebrow { font-size: 12px; font-weight: 600; color: var(--steel); text-transform: uppercase; letter-spacing: 0.14em; margin: 0 0 14px; }
.pdi-h1 { font-size: 44px; line-height: 1.08; margin-bottom: 20px; }
.pdi-hero-copy { color: var(--muted); font-size: 16px; max-width: 52ch; margin-bottom: 28px; }
.pdi-hero-actions { display: flex; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
.pdi-hero-price { font-size: 14px; color: var(--muted); }
.pdi-hero-price strong { color: var(--paper); }

.pdi-scan-panel { background: var(--panel); border: 1px solid var(--line); border-radius: 6px; padding: 26px; transition: transform .15s ease, box-shadow .25s ease; will-change: transform; }
.pdi-scan-panel:hover { box-shadow: 0 16px 34px rgba(16,24,40,0.1); }
.pdi-scan-head { display: flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: 0.1em; color: var(--muted); font-weight: 600; margin-bottom: 18px; }
.pdi-scan-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--amber); box-shadow: 0 0 0 3px rgba(37,99,235,0.18); animation: scanPulse 1.8s ease-in-out infinite; }
@keyframes scanPulse { 0%, 100% { box-shadow: 0 0 0 3px rgba(37,99,235,0.18); } 50% { box-shadow: 0 0 0 6px rgba(37,99,235,0.1); } }
.pdi-scan-big { font-family: 'Archivo', sans-serif; font-size: 46px; font-weight: 800; color: var(--paper); }
.pdi-scan-label { color: var(--muted); font-size: 13px; margin-bottom: 22px; }
.pdi-scan-rows { border-top: 1px solid var(--line); padding-top: 16px; display: flex; flex-direction: column; gap: 12px; }
.pdi-scan-row { display: flex; justify-content: space-between; font-size: 13.5px; }
.pdi-scan-row span:first-child { color: var(--muted); }
.pdi-scan-row span:last-child { font-weight: 700; }

.pdi-section { padding: 76px 0; border-bottom: 1px solid var(--line); }
.pdi-section-head-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; }
.pdi-h2 { font-size: 30px; margin-bottom: 40px; max-width: 26ch; }

.pdi-why-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: start; }
.pdi-checklist { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--line); }
.pdi-checklist-stacked { grid-template-columns: 1fr; border-top: none; }
.pdi-checklist-stacked .pdi-check-item { border-left: none; padding: 20px 0; }
.pdi-check-item { display: block; width: 100%; text-align: left; background: none; border: none; border-left: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 26px 22px; font-family: inherit; cursor: pointer; }
.pdi-check-item:first-child { border-left: none; }
.pdi-check-interactive { cursor: pointer; }
.pdi-check-tick { color: var(--amber); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; margin-bottom: 14px; display: flex; gap: 6px; align-items: center; }
.pdi-check-item h3 { font-size: 18px; margin-bottom: 10px; }
.pdi-check-item p { color: var(--muted); font-size: 14.5px; margin: 0; }
.pdi-check-extra { color: var(--muted); font-size: 14px; margin: 0; }

.pdi-service-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
.pdi-chevron { color: var(--steel); font-size: 15px; transition: transform .3s ease; flex-shrink: 0; }
.is-expanded .pdi-chevron { transform: rotate(180deg); }

.pdi-collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; }
.pdi-collapse-inner { overflow: hidden; min-height: 0; }
.is-expanded .pdi-collapse { grid-template-rows: 1fr; margin-top: 10px; }

.pdi-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line); }
.pdi-stat { background: var(--panel); padding: 22px; }
.pdi-stat-num { font-family: 'Archivo', sans-serif; font-size: 30px; font-weight: 800; color: var(--amber); }
.pdi-stat div:last-child { font-size: 13px; color: var(--muted); margin-top: 4px; }

/* ---------- Process stepper ---------- */
.pdi-stepper { margin-top: 8px; }
.pdi-stepper-track { position: relative; display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; padding: 0 4px; }
.pdi-stepper-track-bg { position: absolute; left: 18px; right: 18px; top: 50%; height: 2px; background: var(--line); transform: translateY(-50%); z-index: 0; }
.pdi-stepper-track-fill { position: absolute; left: 18px; top: 50%; height: 2px; background: var(--amber); transform: translateY(-50%); z-index: 1; transition: width .35s ease; max-width: calc(100% - 36px); }
.pdi-stepper-dot { position: relative; z-index: 2; width: 36px; height: 36px; border-radius: 50%; background: var(--panel); border: 2px solid var(--line); color: var(--muted); font-family: 'Archivo', sans-serif; font-weight: 800; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: border-color .25s ease, color .25s ease, transform .2s ease, background .25s ease; }
.pdi-stepper-dot:hover { transform: scale(1.08); }
.pdi-stepper-dot.is-passed { border-color: var(--amber); color: var(--amber); }
.pdi-stepper-dot.is-current { background: var(--amber); border-color: var(--amber); color: #fff; }
.pdi-stepper-labels { display: flex; justify-content: space-between; margin-bottom: 26px; padding: 0 2px; }
.pdi-stepper-label { background: none; border: none; cursor: pointer; font-size: 12.5px; color: var(--muted); font-weight: 600; text-align: center; flex: 1; padding: 0 4px; transition: color .2s ease; }
.pdi-stepper-label.is-current { color: var(--paper); }
.pdi-stepper-panel { background: var(--panel); border: 1px solid var(--line); border-radius: 6px; padding: 26px; animation: panelIn .35s ease; }
@keyframes panelIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.pdi-process-num { font-family: 'Archivo', sans-serif; font-size: 15px; font-weight: 800; color: var(--steel); margin-bottom: 12px; }
.pdi-stepper-panel h3 { font-size: 18px; margin-bottom: 8px; }
.pdi-stepper-panel p { color: var(--muted); font-size: 14.5px; margin: 0; }

.pdi-service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
.pdi-service-grid-full { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
.pdi-service { background: var(--ink); padding: 24px; }
.pdi-service-full { padding: 28px; }
.pdi-service h3 { font-size: 16.5px; margin-bottom: 0; }
.pdi-service p { color: var(--muted); font-size: 14px; margin: 0; }
.pdi-service-points { margin: 0; padding-left: 18px; color: var(--muted); font-size: 13.5px; display: flex; flex-direction: column; gap: 6px; }
.pdi-service-img { margin-bottom: 18px; }

.pdi-service-interactive { display: block; width: 100%; text-align: left; border: none; font-family: inherit; cursor: pointer; transition: transform .25s ease, box-shadow .25s ease; }
.pdi-service-interactive:hover { transform: translateY(-4px); box-shadow: 0 10px 26px rgba(16,24,40,0.1); position: relative; z-index: 1; }
.pdi-service-interactive .pdi-real-img { transition: transform .5s ease; }
.pdi-service-interactive:hover .pdi-real-img { transform: scale(1.06); }

.pdi-banner { border-bottom: 1px solid var(--line); overflow: hidden; }
.pdi-about-hero-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; }
.pdi-process-banner { margin-bottom: 40px; }

.pdi-img-placeholder {
  width: 100%; border-radius: 6px; background: var(--panel-2);
  border: 1.5px dashed #B9C7DA; color: var(--muted);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 10px; text-align: center; padding: 16px; font-size: 12.5px; line-height: 1.4;
}
.pdi-img-placeholder svg { opacity: 0.6; }
.pdi-img-placeholder span { max-width: 30ch; }

.pdi-real-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.pdi-imgbox { width: 100%; overflow: hidden; border-radius: 6px; }
.pdi-avatar-img { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }

.pdi-quote-meta-row { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
.pdi-quote-meta-row > div:last-child > span:first-child { font-weight: 700; }
.pdi-avatar-placeholder {
  width: 42px; height: 42px; border-radius: 50%; background: var(--panel-2);
  border: 1px solid var(--line); color: var(--amber); font-family: 'Archivo', sans-serif;
  font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.pdi-quote-section { background: var(--panel); }
.pdi-quote-box { max-width: 640px; }
.pdi-quote-text { font-family: 'Archivo', sans-serif; font-size: 22px; font-weight: 600; line-height: 1.4; margin-bottom: 18px; }
.pdi-quote-meta { font-size: 14px; font-weight: 600; margin-bottom: 20px; }
.pdi-quote-progress { height: 3px; background: var(--line); border-radius: 2px; overflow: hidden; max-width: 220px; margin-bottom: 18px; }
.pdi-quote-progress-fill { height: 100%; width: 0%; background: var(--amber); animation: quoteFill 5s linear forwards; }
@keyframes quoteFill { to { width: 100%; } }
.pdi-quote-dots { display: flex; gap: 8px; }
.pdi-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--line); border: none; cursor: pointer; padding: 0; transition: background .2s ease, transform .2s ease; }
.pdi-dot:hover { transform: scale(1.3); }
.pdi-dot.is-active { background: var(--amber); }

.pdi-brands { padding: 30px 0; border-bottom: 1px solid var(--line); }
.pdi-brands-row { display: flex; flex-wrap: wrap; gap: 28px; justify-content: space-between; color: var(--muted); font-size: 13.5px; font-weight: 500; }

.pdi-cta-strip { padding: 56px 0; background: var(--panel-2); }
.pdi-cta-row { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }

.pdi-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
.pdi-contact-info { margin-top: 24px; display: flex; flex-direction: column; gap: 8px; font-size: 14.5px; color: var(--muted); }
.pdi-form { background: var(--panel); border: 1px solid var(--line); border-radius: 6px; padding: 28px; display: flex; flex-direction: column; gap: 16px; }
.pdi-form label { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--muted); font-weight: 600; }
.pdi-form input { background: var(--ink); border: 1px solid var(--line); border-radius: 4px; padding: 10px 12px; color: var(--paper); font-size: 14.5px; font-family: 'Inter', sans-serif; transition: border-color .2s ease, box-shadow .2s ease; }
.pdi-form input:focus { outline: 2px solid var(--amber); outline-offset: 1px; border-color: var(--amber); }
.pdi-form-success { padding: 20px 4px; text-align: center; }
.pdi-form-success strong { color: var(--amber); font-size: 16px; display: block; margin-top: 6px; }
.pdi-form-success p { color: var(--muted); margin-top: 8px; }
.pdi-form-error { color: #DC2626; font-size: 13.5px; margin: -4px 0 0; }
.pdi-success-check { display: flex; justify-content: center; margin-bottom: 4px; }
.pdi-success-circle { stroke: var(--amber); stroke-width: 2.5; stroke-dasharray: 145; stroke-dashoffset: 145; animation: successCircle .5s ease forwards; }
.pdi-success-tick { stroke: var(--amber); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 32; stroke-dashoffset: 32; animation: successTick .35s ease forwards .45s; }
@keyframes successCircle { to { stroke-dashoffset: 0; } }
@keyframes successTick { to { stroke-dashoffset: 0; } }
.pdi-shake { animation: formShake .45s ease; }
@keyframes formShake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-7px); } 40%, 60% { transform: translateX(7px); } }

.pdi-footer { padding: 56px 0 0; }
.pdi-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px; padding-bottom: 40px; }
.pdi-footer h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px; color: var(--paper); }
.pdi-footer-bottom { border-top: 1px solid var(--line); padding: 18px 24px; font-size: 12.5px; color: var(--muted); }

.pdi-whatsapp {
  position: fixed; right: 22px; bottom: 22px; z-index: 40;
  width: 54px; height: 54px; border-radius: 50%;
  background: #25D366; color: #0b1a10;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
  transition: transform .15s;
}
.pdi-whatsapp:hover { transform: scale(1.06); }
.pdi-whatsapp-ring { position: absolute; inset: -6px; border-radius: 50%; border: 2px solid #25D366; opacity: 0.6; animation: pulseRing 2.2s ease-out infinite; pointer-events: none; }
@keyframes pulseRing { 0% { transform: scale(0.9); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }

.pdi-modal-overlay {
  position: fixed; inset: 0; background: rgba(8,10,13,0.7); backdrop-filter: blur(2px);
  display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px;
  animation: overlayIn .2s ease;
}
@keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
.pdi-modal {
  background: var(--panel); border: 1px solid var(--line); border-radius: 8px;
  padding: 32px; width: 100%; max-width: 380px; position: relative;
  animation: modalIn .25s ease;
}
@keyframes modalIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
.pdi-modal-close {
  position: absolute; top: 14px; right: 14px; background: none; border: none;
  color: var(--muted); font-size: 22px; cursor: pointer; line-height: 1; transition: color .2s ease, transform .2s ease;
}
.pdi-modal-close:hover { color: var(--paper); transform: rotate(90deg); }

@media (prefers-reduced-motion: reduce) {
  .pdi-reveal { transition: none; opacity: 1; transform: none; }
  .pdi-hero-anim { animation: none; opacity: 1; }
  .pdi-scan-dot, .pdi-whatsapp-ring, .pdi-quote-progress-fill { animation: none; }
  .pdi-scan-panel, .pdi-service-interactive, .pdi-service-interactive .pdi-real-img { transition: none; }
}

@media (max-width: 860px) {
  .pdi-nav { position: fixed; inset: 68px 0 auto 0; background: var(--ink); border-bottom: 1px solid var(--line); flex-direction: column; align-items: flex-start; padding: 18px 24px; gap: 16px; display: none; }
  .pdi-nav.is-open { display: flex; }
  .pdi-nav-report { display: block; }
  .pdi-nav-toggle { display: flex; }
  .pdi-header-actions .pdi-btn { display: none; }
  .pdi-hero-grid, .pdi-contact-grid, .pdi-why-grid, .pdi-about-hero-grid { grid-template-columns: 1fr; }
  .pdi-about-hero-grid { flex-direction: column-reverse; display: flex; }
  .pdi-checklist, .pdi-service-grid, .pdi-service-grid-full { grid-template-columns: 1fr; }
  .pdi-check-item, .pdi-service { border-left: none; }
  .pdi-stat-grid { grid-template-columns: 1fr 1fr; }
  .pdi-stepper-labels { display: none; }
  .pdi-h1 { font-size: 32px; }
  .pdi-footer-grid { grid-template-columns: 1fr; }
  .pdi-whatsapp { right: 16px; bottom: 16px; }
}
`;




























