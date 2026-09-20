# Checkpoint — Car PDI Inspection Website

A single-file React component for a pre-delivery vehicle inspection business,
built in the style of pdiboss.in but with original copy, branding, and layout.

## What's inside

`src/CarPDISite.jsx` — the whole site as one default-exported component:

- **Home / About / Services / Contact** pages, hash-routed (`#/about`, etc.)
  so links are shareable and the back button works — no router library needed.
- Animated "live inspection" counter, testimonial carousel, and a working
  contact form (currently local state only — see "Wiring it up" below).
- WhatsApp floating button (bottom-right).
- "Get PDI Report" login modal — a front-end-only stand-in for a customer
  report portal.
- Dashed image placeholders in the hero banner, "Why choose us", service
  cards, About page, and testimonials — each captioned with what to shoot.

## Using it

This is a plain React component with no external dependencies beyond
`react` itself (fonts load via an `@import` inside the component's own
`<style>` tag). Drop `CarPDISite.jsx` into any React project:

```jsx
import CarPDISite from "./CarPDISite";

function App() {
  return <CarPDISite />;
}
```

Or open it directly as a Claude artifact / in any sandbox that renders a
single default-exported React component.

## Before this goes live for a real client

1. **Branding** — swap the "Checkpoint" name, logo mark (◈), phone number,
   email, and city list (`CITIES` near the top of the file) for the
   client's real details.
2. **WhatsApp number** — update the `WHATSAPP_NUMBER` constant.
3. **Images** — replace each `<ImagePlaceholder caption="..." />` with a
   real `<img src="..." />` (client photography, or licensed stock from
   Unsplash/Pexels as a placeholder).
4. **Contact form** — `ContactPage`'s `handleSubmit` only sets local state
   right now. Wire it to an email service, CRM, or backend endpoint.
5. **Report portal login** — `ReportLoginModal` is a UI shell. Connect it
   to whatever system actually issues inspection reports.

## Structure

```
checkpoint-pdi-site/
├── README.md
└── src/
    └── CarPDISite.jsx
```
