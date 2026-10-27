import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/style.css';
import './styles/sections.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Google Ads: count WhatsApp and phone-call clicks as conversions
const GOOGLE_ADS_ID = 'AW-18379870900';
const WHATSAPP_LABEL = 'PASTE_WHATSAPP_LABEL_HERE';
const CALL_LABEL = 'PASTE_CALL_LABEL_HERE';

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link || typeof window.gtag !== 'function') return;
  if (link.href.includes('wa.me')) {
    window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${WHATSAPP_LABEL}` });
  } else if (link.href.startsWith('tel:')) {
    window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${CALL_LABEL}` });
  }
});