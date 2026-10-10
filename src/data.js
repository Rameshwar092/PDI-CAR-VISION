import { Audit, Eye, Chart, Clock, Shield, Target, Doc, Wrench, Engine, Obd, Battery, Clipboard, Award} from './components/Icons.jsx';

export const CITIES = ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad', 'Manesar', 'Sohna', 'Bahadurgarh', 'Meerut', 'Panipat', 'Rohtak', 'Hisar'];
export const FORM_CITIES = ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad', 'Meerut', 'Other'];
export const BRANDS = ['Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Mahindra', 'Kia', 'Honda', 'Toyota', 'Skoda', 'Volkswagen', 'MG Motor', 'Renault', 'Nissan', 'Citroen', 'Jeep', 'BYD', 'Isuzu', 'BMW', 'Audi', 'Mercedes-Benz', 'Force Motors'];

// WhatsApp: country code 91 + number, digits only. The button opens a chat with this message ready to send.
export const WHATSAPP_NUMBER = '918448716150';
export const whatsappLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
export const WHATSAPP_URL = whatsappLink('Hi PDI CarVision, I want to book a PDI for my car.');

// TODO before launch: replace the placeholder email and address
export const CONTACT = { phone: '+91 8448716150', phoneHref: 'tel:+918448716150', email: 'pdi.carvision@outlook.com', address: '308 E babarpur Shahdara Delhi 110032' };

export const NAV = [['home', 'Home'], ['about', 'About'], ['services', 'Services'], ['contact', 'Contact']];

export const HIGHLIGHTS = [
  { icon: Audit, title: 'PDI digital audits', text: 'Accurate, instant inspections with zero errors.' },
  { icon: Eye, title: ' Damage detection', text: 'Spot defects, scratches and damage with computer vision.' },
  { icon: Chart, title: 'Advanced analytics portal', text: 'Get real-time insights for inventory and operations.' },
];
export const WHY = [
  { icon: Clock, title: 'Speed', text: 'Same-day inspections and a report within hours.' },
  { icon: Shield, title: 'Trust', text: 'Paid only by you, with zero dealer influence.' },
  { icon: Award, title: 'Experience', text: 'Run by industry experts with 10+ years of PDI experience.' },
  { icon: Target, title: 'Accuracy', text: '3,200+ checkpoints and a full diagnostic scan.' },
  { icon: Doc, title: 'Compliance', text: 'Invoice, chassis and paperwork checked on every car.' },
];
export const STATS = [
  { to: 3200, suf: '+', label: 'checkpoints per car' },
  { to: 12, label: 'cities covered' },
  { to: 2499, pre: '₹', label: 'onward per inspection' },
  { to: 0, label: 'dealer ties' },
];
export const READS = [
  { to: 0, label: 'fault codes found' },
  { to: 12.6, dec: 1, suf: ' V', label: 'battery voltage' },
  { to: 100, suf: '%', label: 'ECU modules read' },
];
// `angle` is how far the car turns to face the service; SERVICE_ORDER is the auto-cycle sequence
export const SERVICES = [
  { icon: Wrench, title: 'Mechanical defect scan', angle: 0.55 },
  { icon: Engine, title: 'Engine health check', angle: 0 },
  { icon: Obd, title: 'Software and OBD diagnosis', angle: -0.55 },
  { icon: Battery, title: 'Battery and tyre health', angle: 1.45 },
  { icon: Clipboard, title: 'Paint and body check', angle: -1.45 },
];
export const SERVICE_ORDER = [0, 2, 4, 3, 1];

// ---- Services page content ----
export const SERVICE_DETAILS = [
  { icon: Wrench, title: 'Mechanical defect scan', text: 'Checks the parts that keep the car safe and smooth on the road.',
    points: ['Suspension and steering', 'Brakes, discs and pads', 'Underbody damage or leaks', 'Mounts, joints and bolts'] },
  { icon: Engine, title: 'Engine health check', text: 'A close look at the engine bay before the car leaves the showroom.',
    points: ['Fluid levels and leaks', 'Belts, hoses and wiring', 'Cold start and idle sound', 'Cooling and exhaust'] },
  { icon: Obd, title: 'Software and OBD diagnosis', text: 'We plug in a scanner and read what the car’s computers say.',
    points: ['Full OBD-II scan', 'Fault codes in every ECU', 'Warning lights and resets', 'Software and module check'] },
  { icon: Battery, title: 'Battery and tyre health', text: 'Power and grip checked, so there are no surprises on day one.',
    points: ['Battery voltage and charging', 'Tyre make, age and tread', 'Tyre pressure and alignment', 'Spare wheel and tools'] },
  { icon: Clipboard, title: 'Paint and body check', text: 'A 360° walk-round for damage the dealer may not point out.',
    points: ['Scratches, dents and repaints', 'Panel gaps and alignment', 'Glass, lamps and mirrors', 'Photos of every defect'] },
  { icon: Audit, title: 'Interior and electronics', text: 'Everything you touch, press or switch on inside the car.',
    points: ['Seats, trims and upholstery', 'Infotainment and speakers', 'AC, windows and central lock', 'Lights, wipers and horn'] },
  { icon: Doc, title: 'Documents and paperwork', text: 'Paperwork errors are hard to fix after delivery, so we check them first.',
    points: ['Invoice and booking details', 'Chassis and engine numbers', 'Registration and insurance', 'Manuals, keys and warranty card'] },
  { icon: Target, title: 'Road test', text: 'A short drive to catch problems that only show on the move.',
    points: ['Steering pull and vibration', 'Braking and gear shifts', 'Noises and rattles', 'Odometer reading'] },
];

export const STEPS = [
  { title: 'Book', text: 'Send us your car model, city and showroom details through the form or WhatsApp.' },
  { title: 'We visit', text: 'Our inspector meets you at the showroom or delivery point on the day you choose.' },
  { title: 'Inspect and scan', text: 'We run every check, plug in the OBD scanner and photograph anything that needs attention.' },
  { title: 'Get your report', text: 'You receive one clear report, so you can accept delivery or ask the dealer to fix issues first.' },
];

export const FAQ = [
  { q: 'What is a pre-delivery inspection (PDI)?', a: 'A PDI is a detailed check of a new car before you accept delivery. Defects, damage and missing items are found while the dealer can still put them right.' },
  { q: 'Is the inspection really independent?', a: 'Yes. You pay us directly and we have no ties to any dealer or manufacturer, so the report shows exactly what we found.' },
  { q: 'How much does it cost?', a: 'Inspections start at ₹2,499. Tell us your car and city and we will confirm the price.' },
  { q: 'Which cars and cities do you cover?', a: `We inspect all major brands, including ${BRANDS.slice(0, 7).join(', ')}. We work in ${CITIES.slice(0, 6).join(', ')} and more.` },
  { q: 'How soon will I get the report?', a: 'Inspections can be done the same day, and your report follows within hours.' },
  { q: 'How do I book?', a: `Fill in the form on this page, use the WhatsApp button, or call ${CONTACT.phone}.` },
];
