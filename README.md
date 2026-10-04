# PDI CarVision (React)

Full PDI CarVision website in React + Vite: banner, smoky gray nav and hero, About, OBD scanner scene, Services, Contact, Footer, WhatsApp button.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/ (upload to Netlify, Vercel, cPanel, GitHub Pages)
```

## Where things are
- `src/data.js` – all copy lists, the WhatsApp number (`WHATSAPP_NUMBER`) and contact details (`CONTACT`)
- `src/components/` – Header, Hero, About, Scan, Services, Contact, Footer, Icons
- `src/hooks.jsx` – scroll reveal, count-up numbers, active nav link
- `src/scenes.js` – three.js scenes (r128, pinned): hero car, OBD scanner, services car
- `src/styles/style.css` – styling. Smoky gray nav and hero are the last two blocks; change the hex values to make them lighter or darker
- `public/car.glb` – placeholder Ferrari 458 Italia by vicent091036 (Sketchfab). Check its licence before commercial use

## WhatsApp
The floating button and the "Book your car PDI today" button in the footer open a WhatsApp chat with +91 96961 27630 and a ready-made message. Change the message in `WHATSAPP_URL` in `src/data.js`.

## Still to fill in
- Email and address in `CONTACT` (`src/data.js`)
- Social links, Privacy Policy and Terms links in `Footer.jsx`
- The booking form opens the visitor's email app. Swap `send()` in `Contact.jsx` for a form service, or for a WhatsApp message, to receive bookings directly
