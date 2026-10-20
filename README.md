# PDI CarVision — Website (pdicarvision.in)

The public website for **PDI CarVision**: pre-delivery inspection (PDI) for new and used cars.
Visitors read about the service, book on WhatsApp or by phone, and customers can log in with
their mobile number (OTP) to view and download their PDI reports.

**Tech:** React 18 · Vite 5 · three.js (3D car) · Firebase Phone Auth · hosted on Vercel.

---

## Features

- Hero with 3D car, price ("Starting @ ₹2,499/- Only"), About, OBD scanner scene, Services,
  Why us (Trust · Experience · Accuracy), Contact, Footer.
- **Floating WhatsApp button** (bottom right) and WhatsApp booking links with a ready message.
- **Get your PDI report** — mobile number → OTP (Firebase) → list of the customer's reports →
  View & download (opens the report in the PDI app, already signed in).
- **Privacy Policy** and **Terms & Conditions** pages inside the site (`#privacy-policy`, `#terms`).
- Social links (Instagram, Facebook, YouTube) in the footer.
- Tab icon / app icons and the Google Ads tag in `index.html`.

---

## Folder structure

```
index.html              ← page title, tab icon links, Google Ads tag
public/                 ← favicon.ico, favicon-*.png, apple-touch-icon.png, icon-*.png,
                          site.webmanifest, car.glb (3D model)
src/
  data.js               ← WhatsApp number, phone, email, address, service text, "Why us" items
  legal.js              ← Privacy Policy and Terms text
  firebase.js           ← Firebase setup (phone OTP)
  pdiReports.js         ← talks to the PDI app backend for customer reports
  components/
    Header.jsx  Hero.jsx  About.jsx  Scan.jsx  Services.jsx  Contact.jsx
    Footer.jsx            ← footer, social links, floating WhatsApp pill
    LoginModal.jsx        ← "Get your PDI report" OTP login + report list
    LegalPage.jsx         ← Privacy / Terms pages
    Icons.jsx
  scenes.js             ← three.js scenes
  styles/style.css
server/                 ← optional Node/Express API for website accounts (not needed for reports)
```

---

## Run on your computer

Run these in the **main folder** (the one with `package.json`), not in `src/`.
```bash
npm install               # first time only
npm run dev               # http://localhost:5173
npm run build             # production build in dist/
```

---

## Settings — `.env` (and Vercel → Settings → Environment Variables)

| Setting | What it is |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase console → Project settings → Your apps → Web app |
| `VITE_FIREBASE_AUTH_DOMAIN` | e.g. `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID (also put it in the PDI backend as `FIREBASE_PROJECT_ID`) |
| `VITE_FIREBASE_STORAGE_BUCKET` | From the same Firebase screen |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | From the same Firebase screen |
| `VITE_FIREBASE_APP_ID` | From the same Firebase screen |
| `VITE_PDI_API_URL` | PDI app backend, e.g. `https://pdi-car-vision-app-lsv1.vercel.app/api` |
| `VITE_PDI_APP_URL` | PDI web app address (where reports open) |
| `VITE_API_URL` | Optional website account API (`server/`) |

After changing settings on Vercel, **redeploy** — `VITE_*` values are built into the site.

**Never commit** `.env`, `.env.local`, `.vercel/` or `server/config/firebase-service-account.json`.

---

## Firebase phone OTP — one-time setup

1. Firebase console → **Authentication → Sign-in method → Phone → Enable**.
2. **Authentication → Settings → Authorized domains** → add `pdicarvision.in` (and `www.pdicarvision.in`).
3. For free testing: *Phone → Phone numbers for testing* — add a number with a fixed code.
4. Real SMS to all numbers needs the Firebase **Blaze** (pay-as-you-go) plan.

---

## Deploy

The site is on **Vercel**; every push to `main` deploys automatically.
```bash
git add .
git commit -m "Describe your change"
git pull --rebase origin main
git push origin HEAD:main
```

---

## Common changes

| I want to... | Edit |
|---|---|
| Change WhatsApp number / phone / email / address | `src/data.js` (`WHATSAPP_NUMBER`, `CONTACT`) |
| Change the WhatsApp message | `whatsappLink(...)` text in `src/data.js` / `Footer.jsx` |
| Change the price on the hero | `src/components/Hero.jsx` |
| Edit Privacy Policy / Terms | `src/legal.js` (and the `UPDATED` date) |
| Instagram / Facebook / YouTube links | `SOCIAL` list at the top of `src/components/Footer.jsx` |
| Tab icon | replace the files in `public/` (same names) |
| Google Ads tag ID | the two `AW-...` values in `index.html` |
| Colours / spacing | `src/styles/style.css` |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `Cannot find package 'vite'` | Run `npm install` in the main folder |
| `npm error ENOENT ... package.json` | You're in the wrong folder; `cd` to the main folder |
| OTP: `auth/unauthorized-domain` | Add the domain in Firebase → Authorized domains |
| OTP: SMS limit / quota error | Firebase daily limit reached; upgrade to Blaze or use test numbers |
| Reports list fails (CORS) | Add `https://pdicarvision.in` to `CORS_ORIGINS` in the PDI backend |
| "View & download" shows 404 | PDI web app needs its SPA rewrite in `frontend/vercel.json` |
| Old tab icon still showing | Hard refresh: **Cmd + Shift + R**, or open in Incognito |
| Google Ads shows "Misconfigured" | Check the `AW-...` ID in `index.html`; wait 24–48 h after deploying |
